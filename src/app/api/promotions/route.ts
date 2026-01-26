import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Récupérer toutes les promotions actives
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const partnerId = searchParams.get('partnerId');

    const where: any = {
      active: true,
      expiresAt: { gte: new Date() }
    };

    if (featured === 'true') {
      where.featured = true;
    }

    if (partnerId) {
      where.partnerId = partnerId;
    }

    const promotions = await db.promotion.findMany({
      where,
      include: {
        partner: true
      },
      orderBy: [
        { featured: 'desc' },
        { discount: 'desc' },
        { detectedAt: 'desc' }
      ]
    });

    return NextResponse.json(promotions);
  } catch (error) {
    console.error('Erreur lors de la récupération des promotions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des promotions' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      partnerId,
      title,
      description,
      originalPrice,
      discountedPrice,
      discount,
      destination,
      duration,
      imageUrl,
      affiliateLink,
      expiresAt,
      featured,
      estimatedEarnings
    } = body;

    // Validation
    if (!partnerId || !title || !discountedPrice || !originalPrice) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    const promotion = await db.promotion.create({
      data: {
        partnerId,
        title,
        description,
        originalPrice: parseFloat(originalPrice),
        discountedPrice: parseFloat(discountedPrice),
        discount: parseFloat(discount) || 
          Math.round((1 - parseFloat(discountedPrice) / parseFloat(originalPrice)) * 100),
        destination,
        duration,
        imageUrl,
        affiliateLink,
        expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        featured: featured || false,
        estimatedEarnings: parseFloat(estimatedEarnings) || 0,
        active: true
      }
    });

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la promotion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la promotion' },
      { status: 500 }
    );
  }
}
