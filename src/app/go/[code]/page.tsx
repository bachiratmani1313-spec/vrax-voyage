import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

interface PageProps {
  params: {
    code: string;
  };
  searchParams: {
    type?: string;
    id?: string;
  };
}

/**
 * Page de tracking et de redirection
 * Tracke chaque clic avant de rediriger vers la destination
 */
export default async function TrackingRedirectPage({ params, searchParams }: PageProps) {
  const { code } = params;
  const { type, id } = searchParams;

  try {
    // Trouver l'affilié par son code de parrainage
    const affiliate = await db.affiliate.findUnique({
      where: { referralCode: code },
    });

    if (!affiliate || (affiliate.status !== 'active' && affiliate.status !== 'pending')) {
      redirect('/');
    }

    // Incrémenter le compteur de clics
    await db.affiliate.update({
      where: { id: affiliate.id },
      data: { totalClicks: { increment: 1 } },
    });

    // Créer un cookie de tracking (valide 30 jours)
    const cookieStore = await cookies();
    cookieStore.set('affiliate_tracking', JSON.stringify({
      affiliateId: affiliate.id,
      referralCode: affiliate.referralCode,
      type,
      id,
      timestamp: Date.now(),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 jours
    });

    // Déterminer la destination de redirection
    let destination = '/';

    // Gérer les paramètres de query (nouveau format)
    if (type) {
      switch (type) {
        case 'home':
          destination = `/?ref=${code}`;
          break;
        case 'partners':
        case 'partner':
          destination = `/?tab=partners&ref=${code}`;
          break;
        case 'promotions':
        case 'promotion':
          if (id) {
            destination = `/?tab=promotions&promo=${id}&ref=${code}`;
          } else {
            destination = `/?tab=promotions&ref=${code}`;
          }
          break;
        case 'join':
          destination = `/?tab=affiliation&ref=${code}`;
          break;
        default:
          destination = `/?ref=${code}`;
      }
    } else {
      // Ancien format avec underscores (compatibilité)
      const parts = code.split('_');
      const referralCode = parts[0];

      if (parts.length >= 3) {
        const oldType = parts[1];
        const oldId = parts[2];

        switch (oldType) {
          case 'partner':
            destination = `/?tab=partners&ref=${referralCode}`;
            break;
          case 'promo':
            destination = `/?tab=promotions&promo=${oldId}&ref=${referralCode}`;
            break;
          case 'partners':
            destination = `/?tab=partners&ref=${referralCode}`;
            break;
          case 'promos':
            destination = `/?tab=promotions&ref=${referralCode}`;
            break;
          case 'join':
            destination = `/?tab=affiliation&ref=${referralCode}`;
            break;
          default:
            destination = `/?ref=${referralCode}`;
        }
      } else {
        destination = `/?ref=${code}`;
      }
    }

    // Rediriger vers la destination
    redirect(destination);

  } catch (error) {
    console.error('Erreur lors du tracking:', error);
    redirect('/');
  }
}
