import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Récupérer toutes les opportunités
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unreadOnly = searchParams.get('unreadOnly');
    const type = searchParams.get('type');
    const urgency = searchParams.get('urgency');

    const where: any = { dismissed: false };

    if (unreadOnly === 'true') {
      where.read = false;
    }

    if (type) {
      where.type = type;
    }

    if (urgency) {
      where.urgency = urgency;
    }

    const opportunities = await db.opportunity.findMany({
      where,
      orderBy: [
        { urgency: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 50
    });

    // Compter les alertes non lues
    const unreadAlertsCount = await db.opportunity.count({
      where: {
        type: 'alert',
        read: false,
        dismissed: false
      }
    });

    return NextResponse.json({ 
      opportunities,
      unreadAlertsCount
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des opportunités:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des opportunités' },
      { status: 500 }
    );
  }
}

// POST - Marquer comme lu ou créer une nouvelle opportunité
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, opportunityId, opportunityData } = body;

    // Marquer comme lu
    if (action === 'markAsRead' && opportunityId) {
      await db.opportunity.update({
        where: { id: opportunityId },
        data: { read: true }
      });
      return NextResponse.json({ success: true });
    }

    // Marquer comme dismissed
    if (action === 'dismiss' && opportunityId) {
      await db.opportunity.update({
        where: { id: opportunityId },
        data: { dismissed: true }
      });
      return NextResponse.json({ success: true });
    }

    // Marquer tout comme lu
    if (action === 'markAllAsRead') {
      await db.opportunity.updateMany({
        where: { read: false },
        data: { read: true }
      });
      return NextResponse.json({ success: true });
    }

    // Créer une nouvelle opportunité
    if (opportunityData) {
      const { type, title, description, potentialEarnings, urgency, partnerId, partnerName, promotionId } = opportunityData;

      const opportunity = await db.opportunity.create({
        data: {
          type: type || 'opportunity',
          title,
          description,
          potentialEarnings: parseFloat(potentialEarnings) || 0,
          urgency: urgency || 'medium',
          partnerId,
          partnerName,
          promotionId,
          read: false
        }
      });

      return NextResponse.json(opportunity, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Action non valide' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erreur lors du traitement de l\'opportunité:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de l\'opportunité' },
      { status: 500 }
    );
  }
}
