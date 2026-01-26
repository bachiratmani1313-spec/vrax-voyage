import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

/**
 * POST /api/affiliates/login
 * Connecter un affilié existant
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation des champs requis
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Trouver l'affilié par email
    const affiliate = await db.affiliate.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        iban: true,
        bic: true,
        bankName: true,
        referralCode: true,
        status: true,
        totalClicks: true,
        totalSales: true,
        totalCommission: true,
        paidAmount: true,
        pendingAmount: true,
        level: true,
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, affiliate.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Retourner les informations de l'affilié (sans le mot de passe)
    const { password: _, ...affiliateData } = affiliate;

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie !',
      affiliate: affiliateData,
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    );
  }
}
