import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

/**
 * Configuration du système de paiement
 */
const PAYOUT_CONFIG = {
  MIN_PAYOUT_THRESHOLD: 50, // 50€ minimum
  MAX_PAYOUT_AMOUNT: 10000, // 10,000€ maximum par demande
  PROCESSING_TIME_HOURS: 48, // Délai de traitement max
};

/**
 * Générer un numéro de référence unique
 */
function generateReferenceNumber(): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `PAYOUT-${timestamp}-${random}`;
}

/**
 * POST /api/affiliates/payout/request
 * Créer une demande de paiement
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { affiliateId } = body;

    if (!affiliateId) {
      return NextResponse.json(
        { error: 'ID d\'affilié requis' },
        { status: 400 }
      );
    }

    // Récupérer l'affilié avec ses ventes confirmées
    const affiliate = await db.affiliate.findUnique({
      where: { id: affiliateId },
      include: {
        sales: {
          where: {
            status: 'confirmed',
          },
        },
        payoutRequests: {
          where: {
            status: {
              in: ['pending', 'processing'],
            },
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

    // Vérifier le statut de l'affilié
    if (affiliate.status !== 'active') {
      return NextResponse.json(
        { error: 'Votre compte doit être actif pour demander un paiement' },
        { status: 403 }
      );
    }

    // Vérifier s'il y a déjà une demande en cours
    if (affiliate.payoutRequests.length > 0) {
      return NextResponse.json(
        { error: 'Vous avez déjà une demande de paiement en cours' },
        { status: 400 }
      );
    }

    // Calculer le montant disponible (ventes confirmées non payées)
    const confirmedSalesAmount = affiliate.sales.reduce((sum, s) => sum + s.affiliateShare, 0);
    const availableAmount = confirmedSalesAmount - affiliate.paidAmount;

    // Vérifier le seuil minimum
    if (availableAmount < PAYOUT_CONFIG.MIN_PAYOUT_THRESHOLD) {
      return NextResponse.json(
        {
          error: 'Montant insuffisant pour demander un paiement',
          availableAmount: availableAmount.toFixed(2),
          threshold: PAYOUT_CONFIG.MIN_PAYOUT_THRESHOLD,
          needed: (PAYOUT_CONFIG.MIN_PAYOUT_THRESHOLD - availableAmount).toFixed(2),
        },
        { status: 400 }
      );
    }

    // Limiter le montant maximum
    const payoutAmount = Math.min(availableAmount, PAYOUT_CONFIG.MAX_PAYOUT_AMOUNT);

    // Générer un numéro de référence
    const referenceNumber = generateReferenceNumber();

    // Créer la demande de paiement
    const payoutRequest = await db.payoutRequest.create({
      data: {
        affiliateId,
        amount: payoutAmount,
        iban: affiliate.iban,
        bic: affiliate.bic,
        bankName: affiliate.bankName,
        status: 'pending',
        referenceNumber,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Demande de paiement créée avec succès',
      payoutRequest: {
        id: payoutRequest.id,
        amount: payoutRequest.amount.toFixed(2),
        referenceNumber,
        status: payoutRequest.status,
        requestedAt: payoutRequest.requestedAt,
      },
      estimatedProcessingTime: `${PAYOUT_CONFIG.PROCESSING_TIME_HOURS} heures`,
      bankDetails: {
        iban: `${affiliate.iban.substring(0, 8)}...${affiliate.iban.substring(affiliate.iban.length - 4)}`,
        bankName: affiliate.bankName,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la création de la demande de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la demande de paiement' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/affiliates/payout/process
 * Approuver et traiter une demande de paiement (admin)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const { payoutRequestId, action, notes } = body; // action: 'approve' | 'reject'

    if (!payoutRequestId || !action) {
      return NextResponse.json(
        { error: 'ID de demande et action requis' },
        { status: 400 }
      );
    }

    // Récupérer la demande de paiement
    const payoutRequest = await db.payoutRequest.findUnique({
      where: { id: payoutRequestId },
      include: { affiliate: true },
    });

    if (!payoutRequest) {
      return NextResponse.json(
        { error: 'Demande de paiement non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier que la demande n'est pas déjà traitée
    if (payoutRequest.status === 'completed' || payoutRequest.status === 'rejected') {
      return NextResponse.json(
        { error: 'Cette demande a déjà été traitée' },
        { status: 400 }
      );
    }

    if (action === 'reject') {
      // Rejeter la demande
      const updatedRequest = await db.payoutRequest.update({
        where: { id: payoutRequestId },
        data: {
          status: 'rejected',
          rejectionReason: notes || 'Demande rejetée',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Demande de paiement rejetée',
        payoutRequest: updatedRequest,
      });
    }

    if (action === 'approve') {
      // Approuver et marquer comme en cours de traitement
      const approvedRequest = await db.payoutRequest.update({
        where: { id: payoutRequestId },
        data: {
          status: 'approved',
          approvedAt: new Date(),
        },
      });

      // Ici, le service de paiement automatique traitera le virement
      // Le payment-service (port 3004) surveillera les demandes 'approved'
      // et effectuera les virements SEPA automatiquement

      return NextResponse.json({
        success: true,
        message: 'Demande de paiement approuvée',
        payoutRequest: approvedRequest,
        nextStep: 'Le paiement sera traité automatiquement par le service de paiement SEPA',
      });
    }

    return NextResponse.json(
      { error: 'Action invalide. Utilisez "approve" ou "reject"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande de paiement' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/affiliates/payout/{id}
 * Récupérer les détails d'une demande de paiement
 */
export async function GET(request: NextRequest) {
  try {
    const payoutId = request.nextUrl.searchParams.get('payoutId');

    if (!payoutId) {
      return NextResponse.json(
        { error: 'ID de demande de paiement requis' },
        { status: 400 }
      );
    }

    const payoutRequest = await db.payoutRequest.findUnique({
      where: { id: payoutId },
      include: { affiliate: true },
    });

    if (!payoutRequest) {
      return NextResponse.json(
        { error: 'Demande de paiement non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payoutRequest: {
        id: payoutRequest.id,
        amount: payoutRequest.amount.toFixed(2),
        status: payoutRequest.status,
        referenceNumber: payoutRequest.referenceNumber,
        transactionId: payoutRequest.transactionId,
        requestedAt: payoutRequest.requestedAt,
        approvedAt: payoutRequest.approvedAt,
        processedAt: payoutRequest.processedAt,
        completedAt: payoutRequest.completedAt,
        notes: payoutRequest.notes,
        rejectionReason: payoutRequest.rejectionReason,
        affiliate: {
          id: payoutRequest.affiliate.id,
          email: payoutRequest.affiliate.email,
          firstName: payoutRequest.affiliate.firstName,
          lastName: payoutRequest.affiliate.lastName,
        },
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la demande de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la demande de paiement' },
      { status: 500 }
    );
  }
}
