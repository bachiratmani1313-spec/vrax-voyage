import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * API Route pour le scraping automatique des promotions
 * Cette route peut être appelée par un cron job ou un service de scraping externe
 */

interface ScrapedPromotion {
  partnerName: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  destination: string;
  duration: string;
  imageUrl: string;
  affiliateLink: string;
  expiresAt: string;
}

// POST - Ajouter des promotions scrapées depuis les partenaires
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { promotions } = body;

    if (!Array.isArray(promotions) || promotions.length === 0) {
      return NextResponse.json(
        { error: 'Aucune promotion fournie' },
        { status: 400 }
      );
    }

    const createdPromotions = [];
    const updatedPromotions = [];
    const skippedPromotions = [];

    for (const scraped of promotions as ScrapedPromotion[]) {
      try {
        // Trouver ou créer le partenaire
        let partner = await db.partner.findFirst({
          where: { name: scraped.partnerName }
        });

        if (!partner) {
          // Créer le partenaire s'il n'existe pas
          partner = await db.partner.create({
            data: {
              name: scraped.partnerName,
              logo: '🌐',
              category: 'Agence en ligne',
              link: scraped.affiliateLink,
              commission: 10,
              rating: 4.5,
              active: true
            }
          });
        }

        // Vérifier si la promotion existe déjà (basé sur le titre et le partenaire)
        const existingPromotion = await db.promotion.findFirst({
          where: {
            partnerId: partner.id,
            title: scraped.title,
            destination: scraped.destination
          }
        });

        const discount = Math.round((1 - scraped.discountedPrice / scraped.originalPrice) * 100);
        const estimatedEarnings = scraped.discountedPrice * (partner.commission / 100);

        if (existingPromotion) {
          // Mettre à jour si le prix a changé
          if (existingPromotion.discountedPrice !== scraped.discountedPrice) {
            const updated = await db.promotion.update({
              where: { id: existingPromotion.id },
              data: {
                originalPrice: scraped.originalPrice,
                discountedPrice: scraped.discountedPrice,
                discount,
                estimatedEarnings,
                updatedAt: new Date()
              }
            });
            updatedPromotions.push(updated);
          } else {
            skippedPromotions.push(scraped.title);
          }
        } else {
          // Créer la promotion
          const newPromotion = await db.promotion.create({
            data: {
              partnerId: partner.id,
              title: scraped.title,
              description: scraped.description,
              originalPrice: scraped.originalPrice,
              discountedPrice: scraped.discountedPrice,
              discount,
              destination: scraped.destination,
              duration: scraped.duration,
              imageUrl: scraped.imageUrl,
              affiliateLink: scraped.affiliateLink,
              expiresAt: new Date(scraped.expiresAt),
              featured: discount >= 30,
              estimatedEarnings,
              active: true
            }
          });
          createdPromotions.push(newPromotion);
        }
      } catch (error) {
        console.error(`Erreur pour la promotion ${scraped.title}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      created: createdPromotions.length,
      updated: updatedPromotions.length,
      skipped: skippedPromotions.length,
      createdPromotions,
      updatedPromotions
    });

  } catch (error) {
    console.error('Erreur lors du scraping des promotions:', error);
    return NextResponse.json(
      { error: 'Erreur lors du scraping des promotions' },
      { status: 500 }
    );
  }
}

// GET - Récupérer les statistiques de scraping
export async function GET(request: NextRequest) {
  try {
    const totalPromotions = await db.promotion.count({
      where: { active: true }
    });

    const featuredPromotions = await db.promotion.count({
      where: { active: true, featured: true }
    });

    const expiringSoon = await db.promotion.count({
      where: {
        active: true,
        expiresAt: {
          gte: new Date(),
          lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        }
      }
    });

    const totalPartners = await db.partner.count({
      where: { active: true }
    });

    const opportunities = await db.opportunity.count({
      where: { dismissed: false, read: false }
    });

    return NextResponse.json({
      totalPromotions,
      featuredPromotions,
      expiringSoon,
      totalPartners,
      unreadOpportunities: opportunities
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}
