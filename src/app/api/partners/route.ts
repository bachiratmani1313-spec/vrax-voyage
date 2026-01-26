import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Récupérer tous les partenaires
export async function GET(request: NextRequest) {
  try {
    const partners = await db.partner.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { promotions: true, opportunities: true }
        }
      }
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error('Erreur lors de la récupération des partenaires:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des partenaires' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau partenaire
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logo, category, link, commission, rating } = body;

    // Validation
    if (!name || !category || !link || !commission) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    const partner = await db.partner.create({
      data: {
        name,
        logo: logo || '🌐',
        category,
        link,
        commission: parseFloat(commission),
        rating: rating || 4.5,
        active: true
      }
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du partenaire:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du partenaire' },
      { status: 500 }
    );
  }
}
