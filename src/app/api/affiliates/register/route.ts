import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * Configuration du système multi-niveaux
 */
const AFFILIATE_CONFIG = {
  // Taux de commission pour chaque niveau
  COMMISSION_RATES: {
    LEVEL_1: 0.85, // 85% pour l'affilié direct
    LEVEL_2: 0.70, // 70% pour le niveau 2
    LEVEL_3: 0.55, // 55% pour le niveau 3
  },
  // Ce que Vrax garde sur chaque niveau
  VRAX_SHARE: {
    LEVEL_1: 0.15, // 15%
    LEVEL_2: 0.30, // 30%
    LEVEL_3: 0.45, // 45%
  },
  // Seuil minimum pour demander un paiement
  MIN_PAYOUT_THRESHOLD: 50, // 50€
};

/**
 * Générer un code de parrainage unique
 */
function generateReferralCode(firstName: string, lastName: string): string {
  const base = `${firstName.charAt(0)}${lastName}`.toLowerCase().replace(/[^a-z0-9]/g, '');
  const random = crypto.randomBytes(3).toString('hex').substring(0, 6);
  return `${base}${random}`;
}

/**
 * Valider un code IBAN
 */
function validateIBAN(iban: string): boolean {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  // Accepte BE avec 11 à 16 chiffres (flexible pour tous les formats)
  if (!/^BE\d{11,16}$/.test(cleaned)) {
    return false;
  }
  return true;
}

/**
 * Valider un code BIC
 */
function validateBIC(bic: string): boolean {
  const cleaned = bic.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(cleaned)) {
    return false;
  }
  return true;
}

/**
 * POST /api/affiliates/register
 * Inscrire un nouvel affilié
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      password,
      firstName,
      lastName,
      iban,
      bic,
      bankName,
      referralCode,
      phone,
      address,
    } = body;

    // Validation des champs requis
    if (!email || !password || !firstName || !lastName || !iban || !bic || !bankName) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Valider le format de l'email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Valider la longueur du mot de passe
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Valider l'IBAN (format belge)
    if (!validateIBAN(iban)) {
      return NextResponse.json(
        { error: 'Format IBAN invalide. Doit commencer par BE suivi de 11 à 16 chiffres (ex: BE530637970253)' },
        { status: 400 }
      );
    }

    // Valider le BIC
    if (!validateBIC(bic)) {
      return NextResponse.json(
        { error: 'Format BIC invalide (8 ou 11 caractères)' },
        { status: 400 }
      );
    }

    // Vérifier si l'email est déjà utilisé
    const existingAffiliate = await db.affiliate.findUnique({
      where: { email },
    });

    if (existingAffiliate) {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit comme affilié' },
        { status: 409 }
      );
    }

    // Valider le code de parrainage si fourni
    let referrer: any = null;
    let level = 1;

    if (referralCode) {
      const referringAffiliate = await db.affiliate.findUnique({
        where: { referralCode },
      });

      if (!referringAffiliate) {
        return NextResponse.json(
          { error: 'Code de parrainage invalide' },
          { status: 400 }
        );
      }

      // Vérifier que le parrain n'a pas dépassé 3 niveaux
      if (referringAffiliate.level >= 3) {
        return NextResponse.json(
          { error: 'Impossible de s\'inscrire avec ce parrain. Le niveau maximum a été atteint.' },
          { status: 400 }
        );
      }

      referrer = referringAffiliate;
      level = referringAffiliate.level + 1;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Générer un code de parrainage unique
    let newReferralCode = generateReferralCode(firstName, lastName);
    let attempts = 0;

    // S'assurer que le code est unique
    while (await db.affiliate.findUnique({ where: { referralCode: newReferralCode } }) && attempts < 10) {
      newReferralCode = generateReferralCode(firstName, lastName);
      attempts++;
    }

    // Créer l'affilié
    const affiliate = await db.affiliate.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        iban: iban.toUpperCase(),
        bic: bic.toUpperCase(),
        bankName,
        referralCode: newReferralCode,
        referredBy: referrer?.id || null,
        level,
        status: 'pending', // Seras activé après vérification manuelle
        phone,
        address,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        referralCode: true,
        level: true,
        status: true,
        createdAt: true,
      },
    });

    // Envoyer une notification email (à implémenter)
    // await sendWelcomeEmail(affiliate.email, affiliate.firstName);

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Votre compte est en attente de validation.',
      affiliate,
      nextSteps: [
        '1. Vérifiez votre email pour confirmer votre inscription',
        '2. Votre compte sera activé après vérification manuelle',
        '3. Une fois activé, vous pourrez accéder à votre dashboard et commencer à partager vos liens',
        `4. Seuil minimum de paiement : ${AFFILIATE_CONFIG.MIN_PAYOUT_THRESHOLD}€`,
      ],
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription affilié:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/affiliates/register
 * Récupérer les informations sur le programme d'affiliation
 */
export async function GET() {
  return NextResponse.json({
    program: {
      name: 'Vrax Agence de Voyages - Programme d\'Affiliation',
      commissionRates: AFFILIATE_CONFIG.COMMISSION_RATES,
      payoutThreshold: AFFILIATE_CONFIG.MIN_PAYOUT_THRESHOLD,
      payoutMethod: 'Virement SEPA automatique',
      currency: 'EUR',
      maxLevels: 3,
      benefits: [
        'Jusqu\'à 85% de commission sur vos ventes',
        '3 niveaux de parrainage pour maximiser vos revenus',
        'Paiements automatiques par virement SEPA',
        'Accès à un dashboard en temps réel',
        'Outils de partage pour réseaux sociaux',
        'Support dédié',
      ],
    },
  });
}
