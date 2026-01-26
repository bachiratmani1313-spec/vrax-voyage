import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/affiliates/share?affiliateId={id}
 * Générer les liens de partage pour les réseaux sociaux
 */
export async function GET(request: NextRequest) {
  try {
    const affiliateId = request.nextUrl.searchParams.get('affiliateId');
    const type = request.nextUrl.searchParams.get('type') || 'general'; // 'general', 'partner', 'promotion'
    const itemId = request.nextUrl.searchParams.get('itemId'); // partnerId ou promotionId

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'ID d\'affilié requis' },
        { status: 400 }
      );
    }

    // Récupérer l'affilié
    const affiliate = await db.affiliate.findUnique({
      where: { id: affiliateId },
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affilié non trouvé' },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Générer le lien de tracking
    let trackingLink: string;
    let shareTitle: string;
    let shareDescription: string;
    let shareImageUrl: string;

    switch (type) {
      case 'partner':
        trackingLink = `${baseUrl}/go/${affiliate.referralCode}_partner_${itemId}`;
        shareTitle = '🌍 Réservez vos voyages avec nos meilleurs partenaires !';
        shareDescription = 'Découvrez des offres exclusives et économisez sur vos voyages avec Vrax !';
        shareImageUrl = `${baseUrl}/images/travel-partners.jpg`;
        break;

      case 'promotion':
        trackingLink = `${baseUrl}/go/${affiliate.referralCode}_promo_${itemId}`;
        shareTitle = '🔥 Promotion voyage exclusive !';
        shareDescription = 'Profitez de réductions incroyables sur vos prochaines vacances !';
        shareImageUrl = `${baseUrl}/images/travel-promo.jpg`;
        break;

      default:
        trackingLink = `${baseUrl}/go/${affiliate.referralCode}`;
        shareTitle = '💰 Gagnez de l\'argent en partageant vos liens voyage !';
        shareDescription = 'Devenez affilié Vrax et touchez jusqu\'à 85% de commission sur chaque vente !';
        shareImageUrl = `${baseUrl}/images/vrax-affiliate.jpg`;
    }

    // Textes de partage pour chaque réseau
    const affiliateName = `${affiliate.firstName} ${affiliate.lastName}`;
    const shareTexts = {
      tiktok: `🌍 Préparez vos prochaines vacances !\n\n${shareTitle}\n\n✨ Liens exclusifs | Réductions garanties\n\n👉 ${trackingLink}\n\n#Voyage #Vacances #Travel #${affiliateName.replace(/\s/g, '')}`,
      instagram: `🌍 ${shareTitle}\n\n${shareDescription}\n\n✅ Plus de 1000 destinations\n✅ Réductions exclusives\n✅ Garantie meilleur prix\n\n🔗 ${trackingLink}\n\n#Voyage #Travel #Vacances #${affiliateName.replace(/\s/g, '')} #Vrax`,
      facebook: `🌍 ${shareTitle}\n\n${shareDescription}\n\n📍 Plus de 1000 destinations dans le monde\n🎁 Réductions exclusives pour nos abonnés\n💳 Paiement sécurisé\n\n👉 Cliquez ici : ${trackingLink}\n\nRejoignez le programme et économisez sur vos voyages ! ✈️`,
      linkedin: `🌍 ${shareTitle}\n\n${shareDescription}\n\n🏢 Vrax Agence de Voyages\n📍 Plus de 1000 destinations mondiales\n💯 Partenaires de confiance\n💰 Commissions jusqu'à 85%\n\n🔗 ${trackingLink}\n\n#Voyage #Business #Travel #VoyagesProfessionnels`,
      snapchat: `🌍 ${shareTitle}\n\n${shareDescription}\n\n👉 ${trackingLink}\n\nSwipe pour voir les offres ! 🔥`,
      whatsapp: `🌍 ${shareTitle}\n\n${shareDescription}\n\n👉 ${trackingLink}\n\nProfites-en maintenant ! ✈️`,
    };

    // URLs de partage pour chaque réseau
    const shareUrls = {
      tiktok: `https://www.tiktok.com/share?text=${encodeURIComponent(shareTexts.tiktok)}&url=${encodeURIComponent(trackingLink)}`,
      instagram: `https://www.instagram.com/`, // Instagram utilise des liens dans les stories/posts
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackingLink)}&title=${encodeURIComponent(shareTitle)}&quote=${encodeURIComponent(shareDescription)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackingLink)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`,
      snapchat: `https://www.snapchat.com/scan`, // Snapchat utilise des snapcodes
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTexts.whatsapp)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTexts.facebook)}&url=${encodeURIComponent(trackingLink)}`,
    };

    return NextResponse.json({
      success: true,
      affiliate: {
        id: affiliate.id,
        name: affiliateName,
        referralCode: affiliate.referralCode,
      },
      trackingLink,
      shareTitle,
      shareDescription,
      shareImageUrl,
      shareTexts,
      shareUrls,
      platforms: [
        {
          id: 'tiktok',
          name: 'TikTok',
          icon: '🎵',
          color: '#000000',
          shareUrl: shareUrls.tiktok,
          shareText: shareTexts.tiktok,
        },
        {
          id: 'instagram',
          name: 'Instagram',
          icon: '📸',
          color: '#E4405F',
          shareUrl: shareUrls.instagram,
          shareText: shareTexts.instagram,
          note: 'Copiez le texte et ajoutez le lien dans votre story ou post',
        },
        {
          id: 'facebook',
          name: 'Facebook',
          icon: '👥',
          color: '#1877F2',
          shareUrl: shareUrls.facebook,
          shareText: shareTexts.facebook,
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          icon: '💼',
          color: '#0A66C2',
          shareUrl: shareUrls.linkedin,
          shareText: shareTexts.linkedin,
        },
        {
          id: 'snapchat',
          name: 'Snapchat',
          icon: '👻',
          color: '#FFFC00',
          shareUrl: shareUrls.snapchat,
          shareText: shareTexts.snapchat,
          note: 'Créez un snapcode pour ce lien',
        },
        {
          id: 'whatsapp',
          name: 'WhatsApp',
          icon: '💬',
          color: '#25D366',
          shareUrl: shareUrls.whatsapp,
          shareText: shareTexts.whatsapp,
        },
        {
          id: 'twitter',
          name: 'Twitter/X',
          icon: '🐦',
          color: '#1DA1F2',
          shareUrl: shareUrls.twitter,
          shareText: shareTexts.facebook,
        },
      ],
    });
  } catch (error) {
    console.error('Erreur lors de la génération des liens de partage:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération des liens de partage' },
      { status: 500 }
    );
  }
}
