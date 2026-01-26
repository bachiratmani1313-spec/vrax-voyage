import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Détecter automatiquement les nouvelles opportunités
export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer les promotions actives
    const activePromotions = await db.promotion.findMany({
      where: {
        active: true,
        expiresAt: { gte: new Date() }
      },
      include: {
        partner: true
      }
    });

    const newOpportunities: any[] = [];

    // 2. Analyser chaque promotion pour détecter des opportunités
    for (const promo of activePromotions) {
      // Règle 1: Réduction élevée (>30%)
      if (promo.discount >= 30) {
        const existingOpportunity = await db.opportunity.findFirst({
          where: {
            promotionId: promo.id,
            type: 'alert'
          }
        });

        if (!existingOpportunity) {
          const opportunity = await db.opportunity.create({
            data: {
              type: 'alert',
              title: `🔥 Grande réduction détectée: ${promo.title}`,
              description: `${promo.partner.name} propose une réduction de ${promo.discount}% sur ${promo.destination}. Excellent potentiel de conversion!`,
              potentialEarnings: promo.estimatedEarnings || (promo.discountedPrice * (promo.partner.commission / 100)),
              urgency: promo.discount >= 40 ? 'high' : 'medium',
              partnerId: promo.partnerId,
              partnerName: promo.partner.name,
              promotionId: promo.id,
              read: false
            }
          });
          newOpportunities.push(opportunity);
        }
      }

      // Règle 2: Promotion快要过期 (< 3 jours)
      const daysUntilExpiry = Math.floor((new Date(promo.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiry <= 3 && daysUntilExpiry >= 0) {
        const existingUrgent = await db.opportunity.findFirst({
          where: {
            promotionId: promo.id,
            type: 'alert',
            urgency: 'high',
            createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
          }
        });

        if (!existingUrgent) {
          const opportunity = await db.opportunity.create({
            data: {
              type: 'alert',
              title: `⏰ Derniers jours: ${promo.title}`,
              description: `Cette promotion expire dans ${daysUntilExpiry} jour(s). Partagez-la rapidement!`,
              potentialEarnings: promo.estimatedEarnings || (promo.discountedPrice * (promo.partner.commission / 100)),
              urgency: 'high',
              partnerId: promo.partnerId,
              partnerName: promo.partner.name,
              promotionId: promo.id,
              read: false
            }
          });
          newOpportunities.push(opportunity);
        }
      }

      // Règle 3: Gains potentiels élevés (>100€)
      const potentialEarnings = promo.estimatedEarnings || (promo.discountedPrice * (promo.partner.commission / 100));
      if (potentialEarnings > 100 && promo.discount >= 20) {
        const existingOpportunity = await db.opportunity.findFirst({
          where: {
            promotionId: promo.id,
            title: { contains: 'Gains élevés' },
            createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        });

        if (!existingOpportunity) {
          const opportunity = await db.opportunity.create({
            data: {
              type: 'opportunity',
              title: `💰 Opportunité à fort gain: ${promo.title}`,
              description: `Commission potentielle de ${potentialEarnings.toFixed(0)}€ sur cette promotion. Période idéale pour maximiser vos revenus.`,
              potentialEarnings: potentialEarnings,
              urgency: 'medium',
              partnerId: promo.partnerId,
              partnerName: promo.partner.name,
              promotionId: promo.id,
              read: false
            }
          });
          newOpportunities.push(opportunity);
        }
      }
    }

    // 3. Vérifier s'il y a des promotions nouvelles ou mises à jour
    // Dans un environnement réel, cela ferait du scraping sur les sites partenaires
    // Ici, nous simulons avec des règles de détection

    return NextResponse.json({
      success: true,
      newOpportunities: newOpportunities.length,
      opportunities: newOpportunities,
      message: newOpportunities.length > 0 
        ? `${newOpportunities.length} nouvelles opportunités détectées!`
        : 'Aucune nouvelle opportunité détectée'
    });

  } catch (error) {
    console.error('Erreur lors de la détection des opportunités:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la détection des opportunités' },
      { status: 500 }
    );
  }
}
