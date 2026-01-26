import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

/**
 * Configuration du système multi-niveaux
 */
const AFFILIATE_CONFIG = {
  COMMISSION_RATES: {
    LEVEL_1: 0.85, // 85% pour l'affilié direct
    LEVEL_2: 0.70, // 70% pour le niveau 2
    LEVEL_3: 0.55, // 55% pour le niveau 3
  },
  VRAX_SHARE: {
    LEVEL_1: 0.15, // 15%
    LEVEL_2: 0.30, // 30%
    LEVEL_3: 0.45, // 45%
  },
};

/**
 * Générer un ID de clic unique
 */
function generateClickId(): string {
  return `click_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
}

/**
 * POST /api/affiliates/track/click
 * Enregistrer un clic sur un lien affilié
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { referralCode, partnerId, promotionId, userAgent, ip } = body;

    // Validation
    if (!referralCode || !partnerId) {
      return NextResponse.json(
        { error: 'Code de parrainage et partenaire requis' },
        { status: 400 }
      );
    }

    // Trouver l'affilié
    const affiliate = await db.affiliate.findUnique({
      where: { referralCode },
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Code de parrainage invalide' },
        { status: 404 }
      );
    }

    if (affiliate.status !== 'active') {
      return NextResponse.json(
        { error: 'Affilié non actif' },
        { status: 403 }
      );
    }

    // Générer un ID de clic
    const clickId = generateClickId();

    // Enregistrer le clic (dans une session ou cookie)
    const response = NextResponse.json({
      success: true,
      clickId,
      trackingData: {
        affiliateId: affiliate.id,
        referralCode,
        level: affiliate.level,
        partnerId,
        promotionId,
        clickId,
        timestamp: new Date().toISOString(),
      },
    });

    // Set tracking cookie (valide 30 jours)
    response.cookies.set('affiliate_tracking', JSON.stringify({
      affiliateId: affiliate.id,
      referralCode,
      level: affiliate.level,
      clickId,
      partnerId,
      promotionId,
      timestamp: Date.now(),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 jours
    });

    // Incrémenter le compteur de clics
    await db.affiliate.update({
      where: { id: affiliate.id },
      data: { totalClicks: { increment: 1 } },
    });

    return response;
  } catch (error) {
    console.error('Erreur lors du tracking:', error);
    return NextResponse.json(
      { error: 'Erreur lors du tracking' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/affiliates/track/conversion
 * Enregistrer une conversion et calculer les commissions multi-niveaux
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      partnerId,
      partnerName,
      promotionId,
      saleAmount,
      commissionRate,
      affiliateId,
      referralCode,
      level,
    } = body;

    // Validation
    if (!partnerId || !saleAmount || !commissionRate || !affiliateId || !level) {
      return NextResponse.json(
        { error: 'Données de conversion incomplètes' },
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

    // Calculer les commissions selon le niveau
    let affiliateShareRate: number;
    let vraxShareRate: number;

    switch (level) {
      case 1:
        affiliateShareRate = AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_1;
        vraxShareRate = AFFILIATE_CONFIG.VRAX_SHARE.LEVEL_1;
        break;
      case 2:
        affiliateShareRate = AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_2;
        vraxShareRate = AFFILIATE_CONFIG.VRAX_SHARE.LEVEL_2;
        break;
      case 3:
        affiliateShareRate = AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_3;
        vraxShareRate = AFFILIATE_CONFIG.VRAX_SHARE.LEVEL_3;
        break;
      default:
        affiliateShareRate = AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_1;
        vraxShareRate = AFFILIATE_CONFIG.VRAX_SHARE.LEVEL_1;
    }

    // Calculer les montants
    const totalCommission = saleAmount * (commissionRate / 100);
    const affiliateShare = totalCommission * affiliateShareRate;
    const vraxShare = totalCommission * vraxShareRate;

    // Créer la vente affilié
    const sale = await db.affiliateSale.create({
      data: {
        affiliateId,
        partnerId,
        partnerName,
        promotionId,
        saleAmount,
        commissionRate,
        level,
        affiliateShare,
        vraxShare,
        trackingLink: `/promo/${promotionId}?ref=${referralCode}`,
        referralCode,
        clickId: generateClickId(),
        status: 'pending',
      },
    });

    // Mettre à jour les statistiques de l'affilié
    await db.affiliate.update({
      where: { id: affiliateId },
      data: {
        totalSales: { increment: 1 },
        totalCommission: { increment: affiliateShare },
        pendingAmount: { increment: affiliateShare },
      },
    });

    return NextResponse.json({
      success: true,
      sale: {
        id: sale.id,
        saleAmount: sale.saleAmount,
        totalCommission: totalCommission.toFixed(2),
        affiliateShare: affiliateShare.toFixed(2),
        vraxShare: vraxShare.toFixed(2),
        level: sale.level,
        status: sale.status,
      },
      summary: {
        totalSales: affiliate.totalSales + 1,
        totalCommission: (affiliate.totalCommission + affiliateShare).toFixed(2),
        pendingAmount: (affiliate.pendingAmount + affiliateShare).toFixed(2),
      },
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la conversion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement de la conversion' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/affiliates/track/confirm
 * Confirmer une vente (après validation par le partenaire)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const { saleId } = body;

    if (!saleId) {
      return NextResponse.json(
        { error: 'ID de vente requis' },
        { status: 400 }
      );
    }

    // Récupérer la vente
    const sale = await db.affiliateSale.findUnique({
      where: { id: saleId },
      include: { affiliate: true },
    });

    if (!sale) {
      return NextResponse.json(
        { error: 'Vente non trouvée' },
        { status: 404 }
      );
    }

    // Si déjà confirmée, retourner les données existantes
    if (sale.status === 'confirmed') {
      return NextResponse.json({
        success: true,
        sale,
      });
    }

    // Mettre à jour le statut
    const updatedSale = await db.affiliateSale.update({
      where: { id: saleId },
      data: {
        status: 'confirmed',
        confirmedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      sale: updatedSale,
      message: 'Vente confirmée avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la confirmation de la vente:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la confirmation de la vente' },
      { status: 500 }
    );
  }
}
