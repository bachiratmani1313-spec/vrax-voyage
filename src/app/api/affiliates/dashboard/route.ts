import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/affiliates/dashboard
 * Récupérer les statistiques du dashboard d'un affilié
 */
export async function GET(request: NextRequest) {
  try {
    // Récupérer l'ID de l'affilié depuis les headers ou les params
    const affiliateId = request.headers.get('x-affiliate-id') ||
                       request.nextUrl.searchParams.get('affiliateId');

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'ID d\'affilié requis' },
        { status: 400 }
      );
    }

    // Récupérer l'affilié avec ses données
    const affiliate = await db.affiliate.findUnique({
      where: { id: affiliateId },
      include: {
        sales: {
          orderBy: { saleDate: 'desc' },
          take: 10,
        },
        payoutRequests: {
          orderBy: { requestedAt: 'desc' },
          take: 5,
        },
        referrals: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            level: true,
            status: true,
            createdAt: true,
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

    // Calculer les statistiques des ventes
    const salesByStatus = {
      pending: affiliate.sales.filter(s => s.status === 'pending'),
      confirmed: affiliate.sales.filter(s => s.status === 'confirmed'),
      rejected: affiliate.sales.filter(s => s.status === 'rejected'),
    };

    const pendingSalesAmount = salesByStatus.pending.reduce((sum, s) => sum + s.affiliateShare, 0);
    const confirmedSalesAmount = salesByStatus.confirmed.reduce((sum, s) => sum + s.affiliateShare, 0);

    // Récupérer les statistiques des affiliés recommandés
    const referralStats = affiliate.referrals.length > 0 ? {
      totalReferrals: affiliate.referrals.length,
      activeReferrals: affiliate.referrals.filter(r => r.status === 'active').length,
      totalReferralSales: 0, // À calculer en requêtant les ventes des filleuls
      totalReferralCommission: 0, // À calculer
    } : null;

    // Calculer le pourcentage de progression vers le seuil de paiement
    const MIN_PAYOUT_THRESHOLD = 50; // 50€
    const payoutProgress = Math.min((confirmedSalesAmount / MIN_PAYOUT_THRESHOLD) * 100, 100);
    const canRequestPayout = confirmedSalesAmount >= MIN_PAYOUT_THRESHOLD;

    return NextResponse.json({
      success: true,
      affiliate: {
        id: affiliate.id,
        email: affiliate.email,
        firstName: affiliate.firstName,
        lastName: affiliate.lastName,
        referralCode: affiliate.referralCode,
        level: affiliate.level,
        status: affiliate.status,
        createdAt: affiliate.createdAt,
      },
      stats: {
        totalClicks: affiliate.totalClicks,
        totalSales: affiliate.totalSales,
        totalCommission: affiliate.totalCommission.toFixed(2),
        paidAmount: affiliate.paidAmount.toFixed(2),
        pendingAmount: affiliate.pendingAmount.toFixed(2),
        availableAmount: confirmedSalesAmount.toFixed(2),
        conversionRate: affiliate.totalClicks > 0
          ? ((affiliate.totalSales / affiliate.totalClicks) * 100).toFixed(2)
          : '0.00',
      },
      sales: {
        total: affiliate.sales.length,
        pending: salesByStatus.pending.length,
        confirmed: salesByStatus.confirmed.length,
        rejected: salesByStatus.rejected.length,
        pendingAmount: pendingSalesAmount.toFixed(2),
        confirmedAmount: confirmedSalesAmount.toFixed(2),
        recent: affiliate.sales.slice(0, 5).map(sale => ({
          id: sale.id,
          partnerName: sale.partnerName,
          saleAmount: sale.saleAmount.toFixed(2),
          affiliateShare: sale.affiliateShare.toFixed(2),
          vraxShare: sale.vraxShare.toFixed(2),
          level: sale.level,
          status: sale.status,
          saleDate: sale.saleDate,
        })),
      },
      payouts: {
        total: affiliate.payoutRequests.length,
        pending: affiliate.payoutRequests.filter(p => p.status === 'pending').length,
        processing: affiliate.payoutRequests.filter(p => p.status === 'processing').length,
        completed: affiliate.payoutRequests.filter(p => p.status === 'completed').length,
        recent: affiliate.payoutRequests.map(request => ({
          id: request.id,
          amount: request.amount.toFixed(2),
          status: request.status,
          requestedAt: request.requestedAt,
          completedAt: request.completedAt,
        })),
      },
      referrals: {
        total: affiliate.referrals.length,
        active: referralStats?.activeReferrals || 0,
        list: affiliate.referrals.slice(0, 5),
      },
      payout: {
        canRequest: canRequestPayout,
        threshold: MIN_PAYOUT_THRESHOLD,
        progress: payoutProgress.toFixed(2),
        availableAmount: confirmedSalesAmount.toFixed(2),
        message: canRequestPayout
          ? '✅ Vous pouvez demander un paiement maintenant'
          : `⏳ Il vous manque ${(MIN_PAYOUT_THRESHOLD - confirmedSalesAmount).toFixed(2)}€ pour pouvoir demander un paiement`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du dashboard:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du dashboard' },
      { status: 500 }
    );
  }
}
