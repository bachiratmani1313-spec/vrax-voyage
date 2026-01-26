import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * API Route pour l'inscription automatique aux programmes d'affiliation
 * avec coordonnées bancaires et configuration complète
 */

// Configuration du propriétaire
const OWNER_CONFIG = {
  email: 'bachiratmani1313@gmail.com',
  firstName: 'Bachir',
  lastName: 'Atmani',
  iban: 'BE5306379709253',
  bic: 'GKCCBEBB', // VRAI code BIC de Belfius Banque
  bankName: 'BANQUE BELGE',
  country: 'Belgique',
  language: 'Français',
  website: '', // À compléter avec le site web si disponible
  companyName: 'Compte personnel', // Compte standard personnel
  vatNumber: '', // Numéro de TVA si applicable
};

// URLs d'inscription directes aux programmes d'affiliation
const AFFILIATE_SIGNUP_URLS = [
  {
    name: 'Expedia',
    commission: 10,
    signupUrl: 'https://www.expedia.com/affiliate/signup',
    directLink: 'https://www.expedia.fr/affiliates/earn-commissions',
    payoutMethod: 'Bank Transfer / PayPal',
    minPayout: '$50',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Booking.com',
    commission: 10,
    signupUrl: 'https://www.booking.com/affiliate/signup',
    directLink: 'https://www.booking.com/affiliate/program',
    payoutMethod: 'Bank Transfer',
    minPayout: '€50',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Airbnb',
    commission: 10,
    signupUrl: 'https://www.airbnb.com/affiliate-program/signup',
    directLink: 'https://www.airbnb.com/affiliate-program',
    payoutMethod: 'Bank Transfer / Payoneer',
    minPayout: '$100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'TUI',
    commission: 10,
    signupUrl: 'https://www.tui.fr/affiliation/signup',
    directLink: 'https://www.tui.fr/affiliation',
    payoutMethod: 'Bank Transfer',
    minPayout: '€100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Kayak',
    commission: 8,
    signupUrl: 'https://www.kayak.com/affiliate/signup',
    directLink: 'https://www.kayak.fr/affiliate/program',
    payoutMethod: 'Bank Transfer',
    minPayout: '$100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'GetYourGuide',
    commission: 12,
    signupUrl: 'https://www.getyourguide.com/affiliate/signup',
    directLink: 'https://www.getyourguide.com/affiliate',
    payoutMethod: 'Bank Transfer',
    minPayout: '$50',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Viator',
    commission: 10,
    signupUrl: 'https://www.viator.com/affiliate/signup',
    directLink: 'https://www.viator.com/partner/affiliate-signup',
    payoutMethod: 'Bank Transfer',
    minPayout: '€100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'HRS',
    commission: 9,
    signupUrl: 'https://www.hrs.com/affiliate/signup',
    directLink: 'https://www.hrs.com/en/affiliate/program',
    payoutMethod: 'Bank Transfer',
    minPayout: '€50',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Agoda',
    commission: 10,
    signupUrl: 'https://www.agoda.com/affiliate/signup',
    directLink: 'https://www.agoda.com/affiliate/program',
    payoutMethod: 'Bank Transfer / PayPal',
    minPayout: '$100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Trip.com',
    commission: 9,
    signupUrl: 'https://www.trip.com/affiliate/signup',
    directLink: 'https://www.trip.com/affiliate/program',
    payoutMethod: 'Bank Transfer',
    minPayout: '$100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Hostelworld',
    commission: 8,
    signupUrl: 'https://www.hostelworld.com/affiliate/signup',
    directLink: 'https://www.hostelworld.com/affiliate/program',
    payoutMethod: 'Bank Transfer',
    minPayout: '$50',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Egencia',
    commission: 10,
    signupUrl: 'https://www.egencia.fr/affiliate/signup',
    directLink: 'https://www.egencia.fr/affiliate',
    payoutMethod: 'Bank Transfer',
    minPayout: '€100',
    payoutFrequency: 'Monthly'
  },
  {
    name: 'Discover Cars',
    commission: 8,
    signupUrl: 'https://www.discovercars.com/fr/affiliate?utm_source=bing&utm_medium=cpc&utm_campaign=Affiliate_FR&keyword=programme%20affiliation%20voyage&network=o&msclkid=af9de02eb07014911748895b7efcc726&utm_source=bing&utm_medium=cpc&utm_campaign=Affiliate%20FR&utm_term=programme%20affiliation%20voyage&utm_content=Travel%20Affiliate%20Program',
    directLink: 'https://www.discovercars.com/fr/affiliate',
    payoutMethod: 'Bank Transfer / PayPal',
    minPayout: '$50',
    payoutFrequency: 'Monthly'
  }
];

// Modèles de promotions automatiques
const AUTO_PROMOTIONS_TEMPLATE = [
  {
    partner: 'Expedia',
    title: 'Offre Exclusive Maldives - Vrax Voyages',
    description: '7 nuits en villa de luxe sur pilotis avec petit-déjeuner inclus. Offre exclusive partenaires.',
    originalPrice: 4500,
    discount: 35,
    destination: 'Maldives',
    duration: '7 nuits',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    featured: true
  },
  {
    partner: 'Booking.com',
    title: 'Week-end Paris - Vrax Exclusive',
    description: '2 nuits en hôtel 5 étoiles avec petit-déjeuner et visite Eiffel. Tarif partenaire.',
    originalPrice: 550,
    discount: 30,
    destination: 'Paris, France',
    duration: '2 nuits',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    featured: true
  },
  {
    partner: 'TUI',
    title: 'Croisière Méditerranée - Vrax Premium',
    description: '7 jours en croisière tout compris. Offre spéciale partenaires VRAX.',
    originalPrice: 3200,
    discount: 40,
    destination: 'Méditerranée',
    duration: '7 jours',
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
    featured: true
  },
  {
    partner: 'Airbnb',
    title: 'Villa Bali Exotique - Vrax Sélection',
    description: 'Villa privée avec piscine et vue rizières. Sélection VRAX exclusive.',
    originalPrice: 1500,
    discount: 25,
    destination: 'Bali, Indonésie',
    duration: '5 nuits',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    featured: true
  },
  {
    partner: 'Discover Cars',
    title: 'Location voiture Italie - Vrax Premium',
    description: 'Location voiture premium en Italie. Offre exclusive Discover Cars avec assurances incluses.',
    originalPrice: 450,
    discount: 30,
    destination: 'Italie',
    duration: '7 jours',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    featured: true
  }
];

// POST - Lancer l'inscription automatique
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'getSignupUrls') {
      // Retourner les URLs d'inscription pour inscription manuelle
      return NextResponse.json({
        success: true,
        owner: OWNER_CONFIG,
        affiliates: AFFILIATE_SIGNUP_URLS
      });
    }

    if (action === 'autoRegister') {
      // Inscription automatique (simulée - nécessite réellement d'accéder aux sites)
      const registrationResults = [];

      for (const affiliate of AFFILIATE_SIGNUP_URLS) {
        // En réalité, cela nécessiterait d'utiliser Selenium/Puppeteer
        // ou les APIs réelles des partenaires
        registrationResults.push({
          name: affiliate.name,
          status: 'pending',
          message: 'Url d\'inscription générée',
          signupUrl: affiliate.signupUrl,
          instructions: `
            1. Accédez à: ${affiliate.signupUrl}
            2. Remplissez avec ces informations:
               - Email: ${OWNER_CONFIG.email}
               - Prénom: ${OWNER_CONFIG.firstName}
               - Nom: ${OWNER_CONFIG.lastName}
               - Nom entreprise: ${OWNER_CONFIG.companyName}
               - IBAN: ${OWNER_CONFIG.iban}
               - BIC: ${OWNER_CONFIG.bic}
               - Pays: ${OWNER_CONFIG.country}
            3. Sélectionnez le mode de paiement: ${affiliate.payoutMethod}
            4. Minimum de paiement: ${affiliate.minPayout}
            5. Fréquence: ${affiliate.payoutFrequency}
            6. Attendez l'approbation (24-72h)
            7. Une fois approuvé, ajoutez vos liens ici
          `
        });
      }

      // Sauvegarder les résultats dans la base de données
      const user = await db.user.findFirst({
        where: { email: OWNER_CONFIG.email }
      });

      if (!user) {
        await db.user.create({
          data: {
            email: OWNER_CONFIG.email,
            name: `${OWNER_CONFIG.firstName} ${OWNER_CONFIG.lastName}`,
          }
        });
      }

      // Mettre à jour les partenaires avec les informations bancaires
      for (const affiliate of AFFILIATE_SIGNUP_URLS) {
        const existingPartner = await db.partner.findFirst({
          where: { name: affiliate.name }
        });

        if (existingPartner) {
          await db.partner.update({
            where: { id: existingPartner.id },
            data: {
              commission: affiliate.commission,
              active: true
            }
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Génération des inscriptions automatique réussie',
        owner: OWNER_CONFIG,
        registrations: registrationResults,
        note: 'ACCÈS AUX SITES REQUIS - Veuillez vous inscrire manuellement avec les informations fournies'
      });
    }

    if (action === 'postPromotions') {
      // Poster automatiquement les promotions
      const postedPromotions = [];

      for (const promoTemplate of AUTO_PROMOTIONS_TEMPLATE) {
        const partner = await db.partner.findFirst({
          where: { name: promoTemplate.partner }
        });

        if (partner) {
          // Créer la promotion dans la base de données
          const discountedPrice = promoTemplate.originalPrice * (1 - promoTemplate.discount / 100);
          const estimatedEarnings = discountedPrice * (partner.commission / 100);

          const promotion = await db.promotion.create({
            data: {
              partnerId: partner.id,
              title: promoTemplate.title,
              description: promoTemplate.description,
              originalPrice: promoTemplate.originalPrice,
              discountedPrice: discountedPrice,
              discount: promoTemplate.discount,
              destination: promoTemplate.destination,
              duration: promoTemplate.duration,
              imageUrl: promoTemplate.imageUrl,
              affiliateLink: partner.link,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
              featured: promoTemplate.featured,
              estimatedEarnings: estimatedEarnings,
              active: true
            }
          });

          postedPromotions.push({
            partner: promoTemplate.partner,
            title: promoTemplate.title,
            price: discountedPrice,
            discount: promoTemplate.discount,
            earnings: estimatedEarnings,
            affiliateLink: partner.link,
            status: 'created',
            note: 'Promotion créée - à publier sur le site partenaire'
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Promotions créées avec succès',
        promotions: postedPromotions,
        instructions: `
          INSTRUCTIONS POUR PUBLIER LES PROMOTIONS:
          
          1. Connectez-vous à chaque compte partenaire
          2. Allez dans votre tableau de bord d'affiliation
          3. Cliquez sur "Créer une promotion" / "Ajouter une offre"
          4. Remplissez avec les détails ci-dessus
          5. Utilisez vos liens de tracking pour recevoir les commissions
          
          Pour que les acheteurs soient redirigés avec votre tracking:
          - Format de lien: ${partner.link}?promotion_id={promotion_id}
          - Les acheteurs cliqueront sur Vrax, seront redirigés vers le partenaire avec votre tracking
          - Commissions payées directement sur votre IBAN: ${OWNER_CONFIG.iban}
        `
      });
    }

    if (action === 'getConfig') {
      // Retourner la configuration complète
      return NextResponse.json({
        owner: OWNER_CONFIG,
        affiliates: AFFILIATE_SIGNUP_URLS,
        promotionsTemplate: AUTO_PROMOTIONS_TEMPLATE,
        totalPotential: AUTO_PROMOTIONS_TEMPLATE.reduce((sum, p) => {
          const partner = AFFILIATE_SIGNUP_URLS.find(a => a.name === p.partner);
          return sum + (p.originalPrice * (1 - p.discount / 100) * (partner?.commission || 10) / 100);
        }, 0)
      });
    }

    return NextResponse.json(
      { error: 'Action non valide', actions: ['getSignupUrls', 'autoRegister', 'postPromotions', 'getConfig'] },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription automatique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription automatique', details: error },
      { status: 500 }
    );
  }
}

// GET - Obtenir la configuration et URLs
export async function GET(request: NextRequest) {
  try {
    const user = await db.user.findFirst({
      where: { email: OWNER_CONFIG.email }
    });

    const partners = await db.partner.findMany({
      where: { active: true }
    });

    return NextResponse.json({
      owner: OWNER_CONFIG,
      affiliates: AFFILIATE_SIGNUP_URLS,
      userExists: !!user,
      totalPartners: partners.length,
      currentPartners: partners
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la configuration' },
      { status: 500 }
    );
  }
}
