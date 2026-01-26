import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * API Route pour initialiser les liens d'affiliation des partenaires
 * avec l'email de l'utilisateur
 */

const AFFILIATE_PARTNERS = [
  {
    name: 'Expedia',
    logo: '🌐',
    category: 'Agence en ligne',
    link: 'https://www.expedia.fr/affiliates/earn-commissions',
    commission: 10,
    rating: 4.8,
    website: 'https://www.expedia.fr'
  },
  {
    name: 'Booking.com',
    logo: '🏨',
    category: 'Réservation hôtels',
    link: 'https://www.booking.com/affiliate/program',
    commission: 10,
    rating: 4.9,
    website: 'https://www.booking.com'
  },
  {
    name: 'Airbnb',
    logo: '🏠',
    category: 'Locations vacances',
    link: 'https://www.airbnb.com/affiliate-program',
    commission: 10,
    rating: 4.7,
    website: 'https://www.airbnb.com'
  },
  {
    name: 'TUI',
    logo: '✈️',
    category: 'Tours et croisières',
    link: 'https://www.tui.fr/affiliation',
    commission: 10,
    rating: 4.6,
    website: 'https://www.tui.fr'
  },
  {
    name: 'Kayak',
    logo: '🔍',
    category: 'Comparateur de vols',
    link: 'https://www.kayak.fr/affiliate/program',
    commission: 8,
    rating: 4.5,
    website: 'https://www.kayak.fr'
  },
  {
    name: 'GetYourGuide',
    logo: '🎫',
    category: 'Activités et excursions',
    link: 'https://www.getyourguide.com/affiliate',
    commission: 12,
    rating: 4.6,
    website: 'https://www.getyourguide.com'
  },
  {
    name: 'Viator',
    logo: '🗺',
    category: 'Activités et excursions',
    link: 'https://www.viator.com/affiliate/program',
    commission: 10,
    rating: 4.5,
    website: 'https://www.viator.com'
  },
  {
    name: 'HRS',
    logo: '🏢',
    category: 'Réservation hôtels',
    link: 'https://www.hrs.com/en/affiliate/program',
    commission: 9,
    rating: 4.4,
    website: 'https://www.hrs.com'
  },
  {
    name: 'Agoda',
    logo: '🏩',
    category: 'Réservation hôtels',
    link: 'https://www.agoda.com/affiliate/program',
    commission: 10,
    rating: 4.5,
    website: 'https://www.agoda.com'
  },
  {
    name: 'Trip.com',
    logo: '🧳',
    category: 'Agence en ligne',
    link: 'https://www.trip.com/affiliate/program',
    commission: 9,
    rating: 4.4,
    website: 'https://www.trip.com'
  },
  {
    name: 'Hostelworld',
    logo: '🏛️',
    category: 'Auberges de jeunesse',
    link: 'https://www.hostelworld.com/affiliate/program',
    commission: 8,
    rating: 4.3,
    website: 'https://www.hostelworld.com'
  },
  {
    name: 'Egencia',
    logo: '💼',
    category: 'Voyages d\'affaires',
    link: 'https://www.egencia.fr/affiliate',
    commission: 10,
    rating: 4.4,
    website: 'https://www.egencia.fr'
  }
];

const USER_EMAIL = 'bachiratmani1313@gmail.com';

// POST - Initialiser les partenaires d'affiliation
export async function POST(request: NextRequest) {
  try {
    const createdPartners = [];
    const updatedPartners = [];

    for (const partnerData of AFFILIATE_PARTNERS) {
      // Vérifier si le partenaire existe déjà
      const existingPartner = await db.partner.findFirst({
        where: { name: partnerData.name }
      });

      if (existingPartner) {
        // Mettre à jour le lien d'affiliation
        const updated = await db.partner.update({
          where: { id: existingPartner.id },
          data: {
            link: partnerData.link,
            commission: partnerData.commission,
            rating: partnerData.rating,
            active: true
          }
        });
        updatedPartners.push(updated);
      } else {
        // Créer le nouveau partenaire
        const partner = await db.partner.create({
          data: {
            name: partnerData.name,
            logo: partnerData.logo,
            category: partnerData.category,
            link: partnerData.link,
            commission: partnerData.commission,
            rating: partnerData.rating,
            active: true
          }
        });
        createdPartners.push(partner);
      }
    }

    // Créer un utilisateur avec l'email fourni
    const existingUser = await db.user.findFirst({
      where: { email: USER_EMAIL }
    });

    if (!existingUser) {
      await db.user.create({
        data: {
          email: USER_EMAIL,
          name: 'Bachir Atmani'
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Partenaires d\'affiliation initialisés avec succès',
      userEmail: USER_EMAIL,
      createdPartners: createdPartners.length,
      updatedPartners: updatedPartners.length,
      partners: {
        created: createdPartners,
        updated: updatedPartners
      },
      totalPartners: AFFILIATE_PARTNERS.length
    });

  } catch (error) {
    console.error('Erreur lors de l\'initialisation des partenaires:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation des partenaires', details: error },
      { status: 500 }
    );
  }
}

// GET - Vérifier le statut de l'initialisation
export async function GET(request: NextRequest) {
  try {
    const user = await db.user.findFirst({
      where: { email: USER_EMAIL }
    });

    const partners = await db.partner.findMany({
      where: { active: true }
    });

    return NextResponse.json({
      userEmail: USER_EMAIL,
      userExists: !!user,
      totalPartners: partners.length,
      partners: partners
    });

  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
}
