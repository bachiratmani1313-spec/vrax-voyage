import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

/**
 * POST /api/affiliates/generate-link
 * Générer un lien de tracking unique pour un affilié
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { affiliateId, partnerId, promotionId, type } = body;

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

    // Générer un code de tracking unique
    const trackingCode = `${affiliate.referralCode}_${crypto.randomBytes(4).toString('hex').substring(0, 8)}`;

    // Construire l'URL de tracking
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    let trackingUrl: string;
    let originalUrl: string;

    if (type === 'partner' && partnerId) {
      trackingUrl = `${baseUrl}/go/${trackingCode}`;
      originalUrl = `${baseUrl}/partners?ref=${affiliate.referralCode}`;
    } else if (type === 'promotion' && promotionId) {
      trackingUrl = `${baseUrl}/go/${trackingCode}`;
      originalUrl = `${baseUrl}/promotions?ref=${affiliate.referralCode}`;
    } else {
      // Lien général vers le site avec le code de parrainage
      trackingUrl = `${baseUrl}/go/${trackingCode}`;
      originalUrl = `${baseUrl}/?ref=${affiliate.referralCode}`;
    }

    return NextResponse.json({
      success: true,
      trackingLink: trackingUrl,
      originalLink: originalUrl,
      trackingCode,
      metadata: {
        affiliateId: affiliate.id,
        affiliateName: `${affiliate.firstName} ${affiliate.lastName}`,
        referralCode: affiliate.referralCode,
        partnerId,
        promotionId,
        type,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération du lien:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du lien' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/affiliates/generate-link?affiliateId={id}
 * Récupérer tous les liens d'un affilié
 */
export async function GET(request: NextRequest) {
  try {
    const affiliateId = request.nextUrl.searchParams.get('affiliateId');

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'ID d\'affilié requis' },
        { status: 400 }
      );
    }

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

    // Générer différents types de liens
    const links = [
      {
        type: 'general',
        name: 'Site Vrax (Accueil)',
        description: 'Lien général vers le site Vrax',
        trackingLink: `${baseUrl}/go/${affiliate.referralCode}`,
        originalLink: `${baseUrl}/?ref=${affiliate.referralCode}`,
      },
      {
        type: 'partners',
        name: 'Partenaires',
        description: 'Page des partenaires de voyage',
        trackingLink: `${baseUrl}/go/${affiliate.referralCode}_partners`,
        originalLink: `${baseUrl}/partners?ref=${affiliate.referralCode}`,
      },
      {
        type: 'promotions',
        name: 'Promotions',
        description: 'Page des promotions en cours',
        trackingLink: `${baseUrl}/go/${affiliate.referralCode}_promos`,
        originalLink: `${baseUrl}/promotions?ref=${affiliate.referralCode}`,
      },
      {
        type: 'register',
        name: 'Devenir Affilié',
        description: 'Inscription au programme d\'affiliation',
        trackingLink: `${baseUrl}/go/${affiliate.referralCode}_join`,
        originalLink: `${baseUrl}/affiliation?ref=${affiliate.referralCode}`,
      },
    ];

    return NextResponse.json({
      success: true,
      affiliate: {
        id: affiliate.id,
        name: `${affiliate.firstName} ${affiliate.lastName}`,
        referralCode: affiliate.referralCode,
      },
      links,
      message: 'Ces liens trackent automatiquement chaque clic et commission',
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des liens:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des liens' },
      { status: 500 }
    );
  }
}
