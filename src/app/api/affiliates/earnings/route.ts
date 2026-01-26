import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
 * GET /api/affiliates/earnings?affiliateId={id}
 * Calculer les commissions multi-niveaux en temps réel
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

    // Récupérer l'affilié
    const affiliate = await db.affiliate.findUnique({
      where: { id: affiliateId },
      include: {
        sales: {
          where: {
            status: 'confirmed',
          },
        },
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affilié non trouvé' },
        { status: 404 }
      );
    }

    // Calculer les commissions par niveau
    const earningsByLevel = {
      level1: affiliate.sales
        .filter(s => s.level === 1)
        .reduce((sum, s) => sum + s.affiliateShare, 0),
      level2: affiliate.sales
        .filter(s => s.level === 2)
        .reduce((sum, s) => sum + s.affiliateShare, 0),
      level3: affiliate.sales
        .filter(s => s.level === 3)
        .reduce((sum, s) => sum + s.affiliateShare, 0),
    };

    // Calculer ce que Vrax a gagné sur cet affilié
    const vraxEarnings = affiliate.sales.reduce((sum, s) => sum + s.vraxShare, 0);

    // Calculer les commissions par partenaire
    const earningsByPartner = new Map<string, number>();
    affiliate.sales.forEach(sale => {
      const current = earningsByPartner.get(sale.partnerName) || 0;
      earningsByPartner.set(sale.partnerName, current + sale.affiliateShare);
    });

    // Calculer les commissions mensuelles
    const now = new Date();
    const earningsByMonth = new Map<string, number>();

    affiliate.sales.forEach(sale => {
      const saleDate = new Date(sale.saleDate);
      const monthKey = `${saleDate.getFullYear()}-${String(saleDate.getMonth() + 1).padStart(2, '0')}`;
      const current = earningsByMonth.get(monthKey) || 0;
      earningsByMonth.set(monthKey, current + sale.affiliateShare);
    });

    // Calculer les commissions des 6 derniers mois
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      last6Months.push({
        month: monthKey,
        earnings: (earningsByMonth.get(monthKey) || 0).toFixed(2),
      });
    }

    // Calculer les projections
    const lastMonthEarnings = last6Months[last6Months.length - 1]?.earnings || 0;
    const avgMonthlyEarnings = last6Months.reduce((sum, m) => sum + parseFloat(m.earnings), 0) / last6Months.length;
    const projectedYearlyEarnings = avgMonthlyEarnings * 12;

    // Taux de commission actuel
    const currentCommissionRate = (() => {
      switch (affiliate.level) {
        case 1: return AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_1 * 100;
        case 2: return AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_2 * 100;
        case 3: return AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_3 * 100;
        default: return AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_1 * 100;
      }
    })();

    return NextResponse.json({
      success: true,
      affiliate: {
        id: affiliate.id,
        email: affiliate.email,
        firstName: affiliate.firstName,
        lastName: affiliate.lastName,
        level: affiliate.level,
        currentCommissionRate: `${currentCommissionRate}%`,
      },
      earnings: {
        total: {
          affiliate: affiliate.totalCommission.toFixed(2),
          vrax: vraxEarnings.toFixed(2),
          total: (affiliate.totalCommission + vraxEarnings).toFixed(2),
        },
        byLevel: {
          level1: {
            count: affiliate.sales.filter(s => s.level === 1).length,
            earnings: earningsByLevel.level1.toFixed(2),
            commissionRate: `${AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_1 * 100}%`,
          },
          level2: {
            count: affiliate.sales.filter(s => s.level === 2).length,
            earnings: earningsByLevel.level2.toFixed(2),
            commissionRate: `${AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_2 * 100}%`,
          },
          level3: {
            count: affiliate.sales.filter(s => s.level === 3).length,
            earnings: earningsByLevel.level3.toFixed(2),
            commissionRate: `${AFFILIATE_CONFIG.COMMISSION_RATES.LEVEL_3 * 100}%`,
          },
        },
        byPartner: Array.from(earningsByPartner.entries()).map(([partner, earnings]) => ({
          partner,
          earnings: earnings.toFixed(2),
        })).sort((a, b) => parseFloat(b.earnings) - parseFloat(a.earnings)),
        byMonth: last6Months,
      },
      projections: {
        monthly: avgMonthlyEarnings.toFixed(2),
        yearly: projectedYearlyEarnings.toFixed(2),
        lastMonth: lastMonthEarnings,
      },
      payout: {
        available: (affiliate.totalCommission - affiliate.paidAmount).toFixed(2),
        paid: affiliate.paidAmount.toFixed(2),
        pending: affiliate.pendingAmount.toFixed(2),
      },
    });
  } catch (error) {
    console.error('Erreur lors du calcul des commissions:', error);
    return NextResponse.json(
      { error: 'Erreur lors du calcul des commissions' },
      { status: 500 }
    );
  }
}
