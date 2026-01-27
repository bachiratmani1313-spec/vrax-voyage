'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Plane,
  MapPin,
  Calendar,
  Users,
  Star,
  TrendingUp,
  Bell,
  CheckCircle2,
  AlertCircle,
  Search,
  Heart,
  Share2,
  DollarSign,
  Clock,
  Flame,
  Award,
  Sparkles,
  Mail,
  UserPlus,
  Copy,
  Wallet,
  LineChart,
  ArrowRight
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  link: string;
  commission: number;
  rating: number;
  _count?: {
    promotions: number;
    opportunities: number;
  };
}

interface Promotion {
  id: string;
  partnerId: string;
  partner: {
    id: string;
    name: string;
    logo: string;
  };
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  destination: string;
  duration: string;
  imageUrl: string;
  expiresAt: string;
  featured: boolean;
  estimatedEarnings: number;
}

interface Opportunity {
  id: string;
  type: 'alert' | 'opportunity';
  title: string;
  description: string;
  potentialEarnings: number;
  urgency: 'high' | 'medium' | 'low';
  createdAt: string;
  partnerId?: string;
  partnerName?: string;
  promotionId?: string;
}

export default function VraxTravelSite() {
  const [activeTab, setActiveTab] = useState('promotions');
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadAlerts, setUnreadAlerts] = useState(0);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializingAffiliates, setInitializingAffiliates] = useState(false);
  
  // États pour l'affiliation
  const [showAffiliateForm, setShowAffiliateForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [affiliateEmail, setAffiliateEmail] = useState('');
  const [affiliatePassword, setAffiliatePassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [affiliateFirstName, setAffiliateFirstName] = useState('');
  const [affiliateLastName, setAffiliateLastName] = useState('');
  const [affiliateIban, setAffiliateIban] = useState('');
  const [affiliateBic, setAffiliateBic] = useState('');
  const [affiliateBankName, setAffiliateBankName] = useState('');
  const [affiliatePhone, setAffiliatePhone] = useState('');
  const [affiliateAddress, setAffiliateAddress] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [registering, setRegistering] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [requestingPayout, setRequestingPayout] = useState(false);

  // Fonctions de chargement de données
  const loadInitialData = useCallback(async () => {
    try {
      // Charger les promotions
      const promosResponse = await fetch('/api/promotions');
      if (promosResponse.ok) {
        const data = await promosResponse.json();
        setPromotions(data);
      } else {
        // Données de démonstration
        setPromotions([
          {
            id: '1',
            partnerId: '1',
            partner: { id: '1', name: 'Expedia', logo: '🌐' },
            title: 'Offre Spéciale Maldives',
            description: 'Package tout compris 7 nuits en villa sur pilotis avec petit-déjeuner inclus',
            originalPrice: 3500,
            discountedPrice: 2100,
            discount: 40,
            destination: 'Maldives',
            duration: '7 nuits',
            imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
            expiresAt: '2025-01-20',
            featured: true,
            estimatedEarnings: 210
          },
          {
            id: '2',
            partnerId: '2',
            partner: { id: '2', name: 'Booking.com', logo: '🏨' },
            title: 'Week-end Paris',
            description: '2 nuits en hôtel 4 étoiles avec petit-déjeuner et visite guidée',
            originalPrice: 450,
            discountedPrice: 270,
            discount: 40,
            destination: 'Paris, France',
            duration: '2 nuits',
            imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
            expiresAt: '2025-01-15',
            featured: true,
            estimatedEarnings: 27
          },
          {
            id: '3',
            partnerId: '3',
            partner: { id: '3', name: 'Airbnb', logo: '🏠' },
            title: 'Villa Bali Exotique',
            description: 'Villa privée avec piscine et vue sur la rizière',
            originalPrice: 1200,
            discountedPrice: 840,
            discount: 30,
            destination: 'Bali, Indonésie',
            duration: '5 nuits',
            imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
            expiresAt: '2025-01-25',
            featured: false,
            estimatedEarnings: 84
          },
          {
            id: '4',
            partnerId: '4',
            partner: { id: '4', name: 'TUI', logo: '✈️' },
            title: 'Croisière Méditerranée',
            description: '7 jours en tout compris avec escales inoubliables',
            originalPrice: 2800,
            discountedPrice: 1680,
            discount: 40,
            destination: 'Méditerranée',
            duration: '7 jours',
            imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
            expiresAt: '2025-02-01',
            featured: true,
            estimatedEarnings: 168
          }
        ]);
      }

      // Charger les partenaires
      const partnersResponse = await fetch('/api/partners');
      if (partnersResponse.ok) {
        const data = await partnersResponse.json();
        setPartners(data);
      } else {
        // Données de démonstration
        setPartners([
          {
            id: '1',
            name: 'Expedia',
            logo: '🌐',
            category: 'Agence en ligne',
            link: 'https://www.expedia.fr/partner/vrax',
            commission: 10,
            rating: 4.8
          },
          {
            id: '2',
            name: 'Booking.com',
            logo: '🏨',
            category: 'Réservation hôtels',
            link: 'https://www.booking.com/partner/vrax',
            commission: 10,
            rating: 4.9
          },
          {
            id: '3',
            name: 'Airbnb',
            logo: '🏠',
            category: 'Locations vacances',
            link: 'https://www.airbnb.com/v/vrax',
            commission: 10,
            rating: 4.7
          },
          {
            id: '4',
            name: 'TUI',
            logo: '✈️',
            category: 'Tours et croisières',
            link: 'https://www.tui.fr/partner/vrax',
            commission: 10,
            rating: 4.6
          }
        ]);
      }

      // Charger les opportunités
      const oppResponse = await fetch('/api/opportunities');
      if (oppResponse.ok) {
        const data = await oppResponse.json();
        // L'API renvoie { opportunities, unreadAlertsCount }
        setOpportunities(data.opportunities || []);
        setUnreadAlerts(data.unreadAlertsCount || 0);
      } else {
        // Données de démonstration
        const demoOpportunities: Opportunity[] = [
          {
            id: '1',
            type: 'alert',
            title: '🚨 Nouvelle promotion Expedia détectée!',
            description: 'Expedia vient de lancer une promotion de 40% sur les Maldives - excellent potentiel de gains!',
            potentialEarnings: 210,
            urgency: 'high',
            createdAt: new Date().toISOString(),
            partnerId: '1',
            partnerName: 'Expedia'
          },
          {
            id: '2',
            type: 'opportunity',
            title: '💰 Opportunité Booking.com',
            description: 'Week-end Paris à -40% - période de haute demande à venir',
            potentialEarnings: 27,
            urgency: 'medium',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            partnerId: '2',
            partnerName: 'Booking.com'
          },
          {
            id: '3',
            type: 'alert',
            title: '🔥 Croisière TUI - Offre limitée!',
            description: 'Nouvelle croisière Méditerranée avec commission augmentée temporairement',
            potentialEarnings: 168,
            urgency: 'high',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            partnerId: '4',
            partnerName: 'TUI'
          }
        ];
        setOpportunities(demoOpportunities);
        setUnreadAlerts(demoOpportunities.filter(o => o.type === 'alert').length);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setLoading(false);
    }
  }, []);

  const detectNewOpportunities = useCallback(async () => {
    try {
      const response = await fetch('/api/detect-opportunities', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        if (data.newOpportunities && data.newOpportunities.length > 0) {
          setOpportunities(prev => [...data.newOpportunities, ...prev]);
          setUnreadAlerts(prev => prev + data.newOpportunities.filter((o: Opportunity) => o.type === 'alert').length);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la détection des opportunités:', error);
    }
  }, []);

  useEffect(() => {
    // Charger les données initiales
    loadInitialData();
    
    // Simuler la détection automatique d'opportunités
    const interval = setInterval(() => {
      detectNewOpportunities();
    }, 30000); // Vérifier toutes les 30 secondes

    return () => clearInterval(interval);
  }, [loadInitialData, detectNewOpportunities]);

  // Gérer les paramètres URL (ref, tab, promo)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const refParam = urlParams.get('ref');
    const promoParam = urlParams.get('promo');

    if (tabParam && ['promotions', 'partners', 'alerts', 'earnings', 'affiliation'].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    // Stocker le code de référence si présent
    if (refParam) {
      setReferralCode(refParam);
    }

    // Si un promoId est spécifié, on pourrait mettre en évidence cette promotion
    if (promoParam) {
      // Optionnel : stocker l'ID de la promotion à mettre en évidence
      console.log('Promotion en vedette:', promoParam);
    }
  }, []);

  const filteredPromotions = promotions.filter(promo =>
    promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEarnings = opportunities.reduce((sum, opp) => sum + opp.potentialEarnings, 0);
  const highUrgencyCount = opportunities.filter(o => o.urgency === 'high').length;

  // Initialiser les affiliations
  const initializeAffiliates = async () => {
    try {
      setInitializingAffiliates(true);
      const response = await fetch('/api/init-affiliates', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        // Recharger les partenaires
        const partnersResponse = await fetch('/api/partners');
        if (partnersResponse.ok) {
          const partnersData = await partnersResponse.json();
          setPartners(partnersData);
        }

        alert(`✅ Succès ! ${data.createdPartners} nouveaux partenaires ajoutés et ${data.updatedPartners} mis à jour.`);
      } else {
        alert('❌ Erreur lors de l\'initialisation des affiliations.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'initialisation des affiliations.');
    } finally {
      setInitializingAffiliates(false);
    }
  };

  // Initialiser les affiliations avec coordonnées bancaires
  const autoRegisterAffiliates = async () => {
    try {
      setInitializingAffiliates(true);
      const response = await fetch('/api/init-affiliates-auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'autoRegister' })
      });
      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}\n\nNOTE: ${data.note}`);
        // Recharger les partenaires
        const partnersResponse = await fetch('/api/partners');
        if (partnersResponse.ok) {
          const partnersData = await partnersResponse.json();
          setPartners(partnersData);
        }
      } else {
        alert('❌ Erreur lors de l\'inscription automatique.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'inscription automatique.');
    } finally {
      setInitializingAffiliates(false);
    }
  };

  // Poster automatiquement les promotions
  const autoPostPromotions = async () => {
    try {
      setInitializingAffiliates(true);
      const response = await fetch('/api/init-affiliates-auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'postPromotions' })
      });
      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}\n\n${data.instructions}`);
        // Recharger les promotions
        const promosResponse = await fetch('/api/promotions');
        if (promosResponse.ok) {
          const promosData = await promosResponse.json();
          setPromotions(promosData);
        }
      } else {
        alert('❌ Erreur lors du post des promotions.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors du post des promotions.');
    } finally {
      setInitializingAffiliates(false);
    }
  };

  // Inscrire un nouvel affilié
  const registerAffiliate = async () => {
    try {
      setRegistering(true);
      const response = await fetch('/api/affiliates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: affiliateEmail,
          password: affiliatePassword,
          firstName: affiliateFirstName,
          lastName: affiliateLastName,
          iban: affiliateIban,
          bic: affiliateBic,
          bankName: affiliateBankName,
          phone: affiliatePhone,
          address: affiliateAddress,
          referralCode: referralCode || undefined,
        })
      });
      const data = await response.json();

      if (data.success) {
        setRegisterSuccess(true);
        setAffiliateId(data.affiliate.id);
        // Charger automatiquement le dashboard après inscription
        const dashboardResponse = await fetch(`/api/affiliates/dashboard?affiliateId=${data.affiliate.id}`);
        const dashboardDataResponse = await dashboardResponse.json();
        if (dashboardDataResponse.success) {
          setDashboardData(dashboardDataResponse);
        }
        alert(`✅ ${data.message}\n\n${data.nextSteps.join('\n')}`);
        // Réinitialiser le formulaire
        setAffiliateEmail('');
        setAffiliatePassword('');
        setAffiliateFirstName('');
        setAffiliateLastName('');
        setAffiliateIban('');
        setAffiliateBic('');
        setAffiliateBankName('');
        setReferralCode('');
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'inscription.');
    } finally {
      setRegistering(false);
    }
  };

  // Charger les données du dashboard affilié
  const loadAffiliateDashboard = async () => {
    if (!affiliateId) return;
    try {
      const response = await fetch(`/api/affiliates/dashboard?affiliateId=${affiliateId}`);
      const data = await response.json();
      if (data.success) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Demander un paiement
  const requestPayout = async () => {
    if (!affiliateId) return;
    try {
      setRequestingPayout(true);
      const response = await fetch('/api/affiliates/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliateId })
      });
      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}\n\nMontant: ${data.payoutRequest.amount}€\nRéférence: ${data.payoutRequest.referenceNumber}\n\n${data.estimatedProcessingTime}`);
        // Recharger le dashboard
        loadAffiliateDashboard();
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de la demande de paiement.');
    } finally {
      setRequestingPayout(false);
    }
  };

  // Connecter un affilié existant
  const loginAffiliate = async () => {
    if (!loginEmail || !loginPassword) {
      alert('❌ Veuillez remplir votre email et mot de passe.');
      return;
    }

    try {
      setLoggingIn(true);
      const response = await fetch('/api/affiliates/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        })
      });
      const data = await response.json();

      if (data.success) {
        setAffiliateId(data.affiliate.id);
        setShowLoginForm(false);
        // Charger le dashboard après connexion
        const dashboardResponse = await fetch(`/api/affiliates/dashboard?affiliateId=${data.affiliate.id}`);
        const dashboardDataResponse = await dashboardResponse.json();
        if (dashboardDataResponse.success) {
          setDashboardData(dashboardDataResponse);
        }
        alert(`✅ ${data.message}\n\nBienvenue, ${data.affiliate.firstName} !`);
        // Réinitialiser le formulaire de login
        setLoginEmail('');
        setLoginPassword('');
      } else {
        alert(`❌ ${data.error}\n\nVérifiez votre email et mot de passe.`);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('❌ Erreur lors de la connexion. Veuillez réessayer.');
    } finally {
      setLoggingIn(false);
    }
  };

  // Copier le code de parrainage
  const copyReferralCode = () => {
    if (dashboardData?.affiliate?.referralCode) {
      navigator.clipboard.writeText(dashboardData.affiliate.referralCode);
      alert('✅ Code de parrainage copié !');
    }
  };

  // Générer l'URL de tracking pour une promotion
  const getPromotionTrackingUrl = (promoId: string) => {
    const referralCode = dashboardData?.affiliate?.referralCode;
    if (!referralCode) return null;
    return `${window.location.origin}/go/${referralCode}?type=promotion&id=${promoId}`;
  };

  // Générer l'URL directe d'une promotion (sans tracking)
  const getDirectPromotionUrl = (promo: Promotion) => {
    // Pour l'instant, utilise le lien partenaire (sera remplacé par les vrais liens)
    return promo.partner.link;
  };

  // Copier le lien de promotion
  const copyPromotionLink = (promo: Promotion) => {
    // Essayer d'abord le lien avec tracking affilié
    const trackingUrl = getPromotionTrackingUrl(promo.id);
    // Si pas connecté, utiliser le lien direct
    const url = trackingUrl || getDirectPromotionUrl(promo);
    if (url) {
      navigator.clipboard.writeText(url);
      alert('✅ Lien de promotion copié ! Partagez-le sur les réseaux sociaux.');
    } else {
      alert('❌ Impossible de générer le lien.');
    }
  };

  // Partager sur TikTok
  const shareToTikTok = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    window.open(`https://www.tiktok.com/share?url=${encodeURIComponent(url)}`, '_blank');
  };

  // Partager sur Instagram
  const shareToInstagram = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    const text = `✈️ ${promo.title}\n\n🏢 ${promo.partner.name}\n\n${promo.description}\n\n📍 ${promo.destination}\n⏱️ ${promo.duration}\n💰 ${promo.discountedPrice}€ (-${promo.discount}%)\n\n👉 ${url}\n\n#Voyage #Vacances #Travel #${promo.partner.name.replace(/\s+/g, '')} #${promo.destination.replace(/\s+/g, '')}`;
    navigator.clipboard.writeText(text);
    alert('✅ Texte copié ! Collez-le sur Instagram (Story ou Post).');
  };

  // Partager sur Facebook
  const shareToFacebook = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    const text = `✈️ Offre exclusive ${promo.partner.name} : ${promo.title}\n\n${promo.description}\n\n📍 ${promo.destination} | ⏱️ ${promo.duration} | 💰 ${promo.discountedPrice}€ (-${promo.discount}%)\n\n👉 ${url}\n\n#${promo.partner.name.replace(/\s+/g, '')} #Voyage #Travel`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
  };

  // Partager sur LinkedIn
  const shareToLinkedIn = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    const text = `✈️ Offre voyage exclusive chez ${promo.partner.name}\n\n${promo.title}\n\n${promo.description}\n\nDestination : ${promo.destination}\nDurée : ${promo.duration}\nPrix : ${promo.discountedPrice}€ (-${promo.discount}%)\n\n👉 ${url}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  // Partager sur WhatsApp
  const shareToWhatsApp = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    const text = `✈️ *${promo.title}*\n\n🏢 *${promo.partner.name}*\n\n${promo.description}\n\n📍 ${promo.destination}\n⏱️ ${promo.duration}\n💰 ${promo.discountedPrice}€ (-${promo.discount}%)\n\n👉 ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Partager sur Twitter/X
  const shareToTwitter = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    const text = `✈️ ${promo.partner.name} : ${promo.title}\n\n${promo.destination} | ${promo.duration}\n💰 ${promo.discountedPrice}€ (-${promo.discount}%)\n\n👉 ${url}\n\n#Voyage #Travel #${promo.partner.name.replace(/\s+/g, '')} #${promo.destination.replace(/\s+/g, '')}`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  // Partager sur Snapchat
  const shareToSnapchat = (promo: Promotion) => {
    const url = getPromotionTrackingUrl(promo.id) || getDirectPromotionUrl(promo);
    const text = `${promo.partner.name} : ${promo.title} - ${promo.destination}\n\n👉 ${url}`;
    navigator.clipboard.writeText(url);
    alert('✅ Lien copié ! Collez-le dans Snapchat pour partager.');
  };

  // Voir une promotion depuis une alerte
  const viewPromotionFromAlert = (opp: Opportunity) => {
    if (opp.promotionId) {
      // Ouvrir l'onglet promotions et scroller vers la promotion
      setActiveTab('promotions');
      setTimeout(() => {
        const promoElement = document.getElementById(`promo-${opp.promotionId}`);
        if (promoElement) {
          promoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          promoElement.classList.add('ring-2', 'ring-orange-500');
          setTimeout(() => {
            promoElement.classList.remove('ring-2', 'ring-orange-500');
          }, 3000);
        }
      }, 300);
    } else {
      alert('❌ Cette alerte n\'est pas liée à une promotion spécifique.');
    }
  };

  // Ignorer une alerte/opportunité
  const dismissAlert = (opp: Opportunity) => {
    setOpportunities(prev => prev.filter(o => o.id !== opp.id));
    if (opp.type === 'alert') {
      setUnreadAlerts(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  Vrax Agence de Voyages
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Partenaires & Opportunités</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={initializeAffiliates}
                disabled={initializingAffiliates}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Users className="h-4 w-4 mr-2" />
                {initializingAffiliates ? 'Initialisation...' : 'Initialiser Partenaires'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={autoRegisterAffiliates}
                disabled={initializingAffiliates}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              >
                <Award className="h-4 w-4 mr-2" />
                {initializingAffiliates ? 'Inscription...' : 'Inscription Auto (IBAN)'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={autoPostPromotions}
                disabled={initializingAffiliates}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {initializingAffiliates ? 'Post...' : 'Poster Promotions'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('alerts')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadAlerts}
                  </span>
                )}
              </Button>
              <Avatar className="h-10 w-10 border-2 border-orange-200">
                <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                  VR
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Détection automatique des opportunités activée</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Maximisez vos revenus avec nos
              <span className="block text-orange-100">partenaires de voyages</span>
            </h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Un système intelligent qui détecte automatiquement les meilleures promotions et vous alerte 
              des opportunités de gains en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl">
                <DollarSign className="h-5 w-5 mr-2" />
                Voir les opportunités ({totalEarnings}€)
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/30">
                <TrendingUp className="h-5 w-5 mr-2" />
                Tableau de bord
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-orange-100 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-1">
              <div className="text-3xl font-bold text-orange-600">{partners.length}</div>
              <div className="text-sm text-muted-foreground">Partenaires actifs</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl font-bold text-orange-600">{promotions.length}</div>
              <div className="text-sm text-muted-foreground">Promotions actives</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl font-bold text-orange-600">{totalEarnings}€</div>
              <div className="text-sm text-muted-foreground">Gains potentiels</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl font-bold text-orange-600">{highUrgencyCount}</div>
              <div className="text-sm text-muted-foreground">Alertes urgentes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-orange-200 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="promotions" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Flame className="h-4 w-4 mr-2" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Award className="h-4 w-4 mr-2" />
              Partenaires
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white relative">
              <Bell className="h-4 w-4 mr-2" />
              Alertes
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              Gains
            </TabsTrigger>
            <TabsTrigger value="affiliation" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Affiliation
            </TabsTrigger>
          </TabsList>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une promotion..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <Card key={i} className="border-orange-200">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
                        <div className="h-6 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredPromotions.map((promo) => (
                  <Card id={`promo-${promo.id}`} key={promo.id} className="overflow-hidden border-orange-200 hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white font-bold px-3 py-1">
                        -{promo.discount}%
                      </Badge>
                      {promo.featured && (
                        <Badge className="absolute top-3 left-3 bg-orange-500 text-white font-bold">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Vedette
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      {/* Nom et logo de l'agence partenaire */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-orange-50 border-orange-300 text-orange-700 font-semibold">
                          <span className="mr-1">{promo.partner.logo}</span>
                          {promo.partner.name}
                        </Badge>
                        {promo.featured && (
                          <Badge className="bg-orange-500 text-white">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Vedette
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2">{promo.title}</CardTitle>
                      </div>
                      <CardDescription className="line-clamp-2">{promo.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          {promo.destination}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          {promo.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-600">{promo.discountedPrice}€</span>
                        <span className="text-sm text-muted-foreground line-through">{promo.originalPrice}€</span>
                      </div>
                      <Alert className="bg-green-50 border-green-200">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700 font-medium">
                          Commission estimée: {promo.estimatedEarnings}€
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="space-y-4">
                      <div className="w-full">
                        <Button
                          onClick={() => copyPromotionLink(promo)}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copier le lien de tracking
                        </Button>
                      </div>
                      <div className="w-full">
                        <p className="text-xs text-muted-foreground mb-2">Partager sur les réseaux sociaux :</p>
                        <div className="grid grid-cols-4 gap-2">
                          <Button
                            onClick={() => shareToTikTok(promo)}
                            size="sm"
                            className="bg-black hover:bg-gray-800 text-white text-xs"
                          >
                            🎵 TikTok
                          </Button>
                          <Button
                            onClick={() => shareToInstagram(promo)}
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs"
                          >
                            📸 Insta
                          </Button>
                          <Button
                            onClick={() => shareToFacebook(promo)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                          >
                            👥 FB
                          </Button>
                          <Button
                            onClick={() => shareToLinkedIn(promo)}
                            size="sm"
                            className="bg-blue-700 hover:bg-blue-800 text-white text-xs"
                          >
                            💼 LinkedIn
                          </Button>
                          <Button
                            onClick={() => shareToWhatsApp(promo)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white text-xs"
                          >
                            💬 WhatsApp
                          </Button>
                          <Button
                            onClick={() => shareToTwitter(promo)}
                            size="sm"
                            className="bg-sky-500 hover:bg-sky-600 text-white text-xs"
                          >
                            🐦 Twitter
                          </Button>
                          <Button
                            onClick={() => shareToSnapchat(promo)}
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs"
                          >
                            👻 Snapchat
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-orange-200">
                        <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                          {partner.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">{partner.name}</CardTitle>
                          <Badge className="bg-orange-100 text-orange-700">
                            {partner.commission}% commission
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">{partner.category}</CardDescription>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(partner.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({partner.rating})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Lien partenaire
                      </label>
                      <div className="flex gap-2">
                        <Input 
                          value={partner.link}
                          readOnly
                          className="bg-gray-50 border-orange-200"
                        />
                        <Button variant="outline" size="icon" className="border-orange-200">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Partenaire vérifié</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="text-muted-foreground">Haut taux de conversion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  Ajouter un nouveau partenaire
                </CardTitle>
                <CardDescription>
                  Configurez facilement vos liens de partenariat pour commencer à générer des revenus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom du partenaire</label>
                    <Input placeholder="Ex: Expedia" className="border-orange-200" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Catégorie</label>
                    <Input placeholder="Ex: Agence en ligne" className="border-orange-200" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Lien d'affiliation</label>
                  <Input placeholder="https://..." className="border-orange-200" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Commission (%)</label>
                  <Input type="number" placeholder="10" className="border-orange-200" />
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Ajouter le partenaire
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {opportunities.map((opp, index) => (
                  <Alert 
                    key={opp.id} 
                    className={`${
                      opp.type === 'alert' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-green-50 border-green-200'
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        {opp.type === 'alert' ? (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-base">{opp.title}</h4>
                            <p className="text-sm mt-1 text-muted-foreground">{opp.description}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              opp.urgency === 'high' 
                                ? 'border-red-400 text-red-700 bg-red-50'
                                : opp.urgency === 'medium'
                                ? 'border-orange-400 text-orange-700 bg-orange-50'
                                : 'border-gray-400 text-gray-700 bg-gray-50'
                            }`}
                          >
                            {opp.urgency === 'high' ? '🔴 Urgent' : opp.urgency === 'medium' ? '🟡 Moyen' : '🟢 Normal'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 font-semibold text-green-700">
                            <DollarSign className="h-4 w-4" />
                            +{opp.potentialEarnings}€
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(opp.createdAt).toLocaleString('fr-FR')}
                          </div>
                          <Badge variant="secondary" className="bg-white">
                            {opp.partnerName}
                          </Badge>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => viewPromotionFromAlert(opp)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            Voir la promotion
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => dismissAlert(opp)}
                          >
                            Ignorer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Alert>
                ))}
                {opportunities.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Aucune alerte pour le moment</p>
                    <p className="text-sm">Le système vous alertera dès qu'une opportunité sera détectée</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
                <CardHeader>
                  <CardTitle className="text-white">Gains totaux</CardTitle>
                  <CardDescription className="text-orange-100">Estimation mensuelle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{totalEarnings}€</div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-orange-100">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12.5% vs mois dernier</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
                <CardHeader>
                  <CardTitle className="text-white">Opportunités actives</CardTitle>
                  <CardDescription className="text-green-100">À exploiter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{opportunities.length}</div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-100">
                    <Flame className="h-4 w-4" />
                    <span>{highUrgencyCount} urgentes</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
                <CardHeader>
                  <CardTitle className="text-white">Taux de conversion</CardTitle>
                  <CardDescription className="text-purple-100">Moyenne globale</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">4.7%</div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-purple-100">
                    <Star className="h-4 w-4" />
                    <span>Excellente performance</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des gains par partenaire</CardTitle>
                <CardDescription>Visualisez vos revenus par partenaire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partners.map((partner) => {
                    const earnings = opportunities
                      .filter(o => o.partnerId === partner.id)
                      .reduce((sum, o) => sum + o.potentialEarnings, 0);
                    const percentage = totalEarnings > 0 ? (earnings / totalEarnings) * 100 : 0;
                    
                    return (
                      <div key={partner.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{partner.logo}</span>
                            <span className="font-medium">{partner.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-orange-600">{earnings}€</span>
                            <span className="text-muted-foreground ml-2">({percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affiliation Tab */}
          <TabsContent value="affiliation" className="space-y-6">
            {!affiliateId && (
              // Si non connecté → afficher message d'information
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <AlertDescription className="ml-2">
                  <strong>Non connecté</strong> - Si vous êtes déjà inscrit, cliquez sur "Déjà inscrit ? Se connecter" ci-dessous.
                </AlertDescription>
              </Alert>
            )}

            {affiliateId && dashboardData ? (
              // Si connecté et dashboard chargé → afficher dashboard
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertDescription className="ml-2">
                    {registerSuccess ? 'Inscription réussie ! ' : ''}Bienvenue, {dashboardData.affiliate.firstName} ! Vous êtes connecté.
                  </AlertDescription>
                </Alert>

                {/* Stats principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="border-orange-200">
                        <CardHeader className="pb-2">
                          <CardDescription>Commissions totales</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-orange-500" />
                            <span className="text-2xl font-bold text-orange-600">{dashboardData.stats.totalCommission}€</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-orange-200">
                        <CardHeader className="pb-2">
                          <CardDescription>Ventes</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-500" />
                            <span className="text-2xl font-bold text-orange-600">{dashboardData.stats.totalSales}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-orange-200">
                        <CardHeader className="pb-2">
                          <CardDescription>Clics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Search className="h-5 w-5 text-orange-500" />
                            <span className="text-2xl font-bold text-orange-600">{dashboardData.stats.totalClicks}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-orange-200">
                        <CardHeader className="pb-2">
                          <CardDescription>Taux de conversion</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <LineChart className="h-5 w-5 text-orange-500" />
                            <span className="text-2xl font-bold text-orange-600">{dashboardData.stats.conversionRate}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Code de parrainage */}
                    {dashboardData && dashboardData.affiliate && (
                      <Card className="border-orange-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-orange-500" />
                            Votre code de parrainage
                          </CardTitle>
                          <CardDescription>
                            Partagez ce code pour recruter des affiliés et gagner des commissions sur leurs ventes
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <Input
                              value={dashboardData.affiliate.referralCode}
                              readOnly
                              className="font-mono text-lg"
                            />
                            <Button
                              onClick={copyReferralCode}
                              variant="outline"
                              className="flex-shrink-0"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copier
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Partage sur les réseaux sociaux */}
                    {dashboardData && dashboardData.affiliate && (
                      <Card className="border-orange-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-orange-500" />
                            Partagez vos liens sur les réseaux sociaux
                          </CardTitle>
                          <CardDescription>
                            Chaque clic généré depuis ces liens sera automatiquement tracké et rémunéré !
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <AlertDescription className="ml-2">
                            <strong>Tous vos liens incluent votre code de parrainage !</strong> Partagez-les sur TikTok, Instagram, Facebook, LinkedIn, Snapchat ou WhatsApp pour gagner des commissions.
                          </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Button
                            onClick={() => window.open(`https://www.tiktok.com/share?url=${encodeURIComponent(window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}`, '_blank')}
                            className="bg-black hover:bg-gray-800 text-white"
                          >
                            🎵 TikTok
                          </Button>
                          <Button
                            onClick={() => navigator.clipboard.writeText(`🌍 Réservez vos voyages avec Vrax !\n\nLiens exclusifs | Réductions garanties\n\n👉 ${window.location.origin}/go/${dashboardData.affiliate.referralCode}\n\n#Voyage #Vacances #Travel`)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          >
                            📸 Instagram
                          </Button>
                          <Button
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}`, '_blank')}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            👥 Facebook
                          </Button>
                          <Button
                            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}`, '_blank')}
                            className="bg-blue-700 hover:bg-blue-800 text-white"
                          >
                            💼 LinkedIn
                          </Button>
                          <Button
                            onClick={() => navigator.clipboard.writeText(`🌍 Offres voyage exclusives !\n\n👉 ${window.location.origin}/go/${dashboardData.affiliate.referralCode}\n\nProfites-en maintenant ! ✈️`)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black"
                          >
                            👻 Snapchat
                          </Button>
                          <Button
                            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('🌍 Réservez vos voyages avec Vrax !\n\nLiens exclusifs | Réductions garanties\n\n👉 ' + window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}`, '_blank')}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            💬 WhatsApp
                          </Button>
                          <Button
                            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}&text=${encodeURIComponent('🌍 Réservez vos voyages avec Vrax ! Liens exclusifs et réductions garanties ! 👉')}`, '_blank')}
                            className="bg-sky-500 hover:bg-sky-600 text-white"
                          >
                            🐦 Twitter
                          </Button>
                          <Button
                            onClick={() => navigator.clipboard.writeText(window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}
                            variant="outline"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copier le lien
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Vos liens de tracking :</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm">🏠 Accueil :</span>
                              <code className="flex-1 text-xs bg-white px-2 py-1 rounded font-mono">{window.location.origin}/go/{dashboardData.affiliate.referralCode}</code>
                              <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(window.location.origin + '/go/' + dashboardData.affiliate.referralCode)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm">🏨 Partenaires :</span>
                              <code className="flex-1 text-xs bg-white px-2 py-1 rounded font-mono">{window.location.origin}/go/{dashboardData.affiliate.referralCode}_partners</code>
                              <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(window.location.origin + '/go/' + dashboardData.affiliate.referralCode + '_partners')}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm">🔥 Promotions :</span>
                              <code className="flex-1 text-xs bg-white px-2 py-1 rounded font-mono">{window.location.origin}/go/{dashboardData.affiliate.referralCode}_promos</code>
                              <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(window.location.origin + '/go/' + dashboardData.affiliate.referralCode + '_promos')}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Paiement disponible */}
                    <Card className="border-orange-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-orange-500" />
                          Demande de paiement
                        </CardTitle>
                        <CardDescription>
                          {dashboardData.payout.message}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progression vers le seuil de paiement</span>
                            <span className="font-semibold">{dashboardData.payout.progress}%</span>
                          </div>
                          <Progress value={parseFloat(dashboardData.payout.progress)} className="h-3" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Montant disponible: {dashboardData.payout.availableAmount}€</span>
                            <span>Seuil minimum: {dashboardData.payout.threshold}€</span>
                          </div>
                        </div>
                        <Button
                          onClick={requestPayout}
                          disabled={!dashboardData.payout.canRequest || requestingPayout}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                        >
                          {requestingPayout ? (
                            'Traitement...'
                          ) : (
                            <>
                              <Wallet className="h-4 w-4 mr-2" />
                              Demander le paiement ({dashboardData.payout.availableAmount}€)
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Ventes récentes */}
                    <Card className="border-orange-200">
                      <CardHeader>
                        <CardTitle>Ventes récentes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {dashboardData.sales.recent.length > 0 ? (
                            dashboardData.sales.recent.map((sale: any) => (
                              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-semibold">{sale.partnerName}</p>
                                  <p className="text-sm text-muted-foreground">Niveau {sale.level} • {new Date(sale.saleDate).toLocaleDateString('fr-FR')}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-orange-600">+{sale.affiliateShare}€</p>
                                  <Badge className={sale.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                                    {sale.status}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-muted-foreground py-4">Aucune vente pour le moment</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            ) : showAffiliateForm ? (
              <Card className="border-orange-200 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-orange-500" />
                    Devenez affilié Vrax
                  </CardTitle>
                  <CardDescription>
                    Gagnez jusqu'à 85% de commission sur chaque vente et recrutez d'autres affiliés pour multiplier vos revenus !
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Prénom *</label>
                      <Input
                        value={affiliateFirstName}
                        onChange={(e) => setAffiliateFirstName(e.target.value)}
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Nom *</label>
                      <Input
                        value={affiliateLastName}
                        onChange={(e) => setAffiliateLastName(e.target.value)}
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email *</label>
                    <Input
                      type="email"
                      value={affiliateEmail}
                      onChange={(e) => setAffiliateEmail(e.target.value)}
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Mot de passe *</label>
                    <Input
                      type="password"
                      value={affiliatePassword}
                      onChange={(e) => setAffiliatePassword(e.target.value)}
                      placeholder="Min. 8 caractères"
                    />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Coordonnées bancaires *</h4>
                    <div>
                      <label className="text-sm font-medium mb-1 block">IBAN *</label>
                      <Input
                        value={affiliateIban}
                        onChange={(e) => setAffiliateIban(e.target.value)}
                        placeholder="BEXX XXXX XXXX XXXX"
                        className="font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">BIC *</label>
                        <Input
                          value={affiliateBic}
                          onChange={(e) => setAffiliateBic(e.target.value)}
                          placeholder="XXXXXXXX"
                          className="font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Nom de la banque *</label>
                        <Input
                          value={affiliateBankName}
                          onChange={(e) => setAffiliateBankName(e.target.value)}
                          placeholder="BANQUE BELGE"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Code de parrainage (optionnel)</label>
                    <Input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Code de votre parrain"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Téléphone</label>
                    <Input
                      type="tel"
                      value={affiliatePhone}
                      onChange={(e) => setAffiliatePhone(e.target.value)}
                      placeholder="+32 4XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Adresse</label>
                    <Input
                      value={affiliateAddress}
                      onChange={(e) => setAffiliateAddress(e.target.value)}
                      placeholder="Rue, Code postal, Ville, Pays"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAffiliateForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={registerAffiliate}
                    disabled={registering}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                  >
                    {registering ? 'Inscription...' : "S'inscrire maintenant"}
                  </Button>
                </CardFooter>
              </Card>
            ) : showLoginForm ? (
              <Card className="border-orange-200 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    Connexion affilié
                  </CardTitle>
                  <CardDescription>
                    Connectez-vous pour accéder à votre dashboard et partager vos liens de voyage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email *</label>
                    <Input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Mot de passe *</label>
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Votre mot de passe"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowLoginForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={loginAffiliate}
                    disabled={loggingIn}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                  >
                    {loggingIn ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-500" />
                      Programme d'affiliation Vrax
                    </CardTitle>
                    <CardDescription>
                      Gagnez de l'argent en partageant vos liens de voyage et recrutez d'autres affiliés
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Wallet className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">85%</p>
                        <p className="text-sm text-muted-foreground">Commission sur vos ventes</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">3</p>
                        <p className="text-sm text-muted-foreground">Niveaux de parrainage</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">50€</p>
                        <p className="text-sm text-muted-foreground">Seuil de paiement</p>
                      </div>
                    </div>
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <AlertDescription className="ml-2">
                        <strong>Paiements automatiques SEPA</strong> - Vos commissions sont transférées automatiquement sur votre compte bancaire une fois le seuil atteint.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Comment ça marche ?</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                          <p>Inscrivez-vous gratuitement avec vos coordonnées bancaires</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                          <p>Partagez vos liens de voyage sur vos réseaux sociaux</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                          <p>Gagnez jusqu'à 85% de commission sur chaque vente</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
                          <p>Recrutez des affiliés et gagnez jusqu'à 45% sur leurs commissions</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">5</span>
                          <p>Recevez automatiquement vos paiements par virement SEPA</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="space-y-2">
                    <Button
                      onClick={() => setShowAffiliateForm(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Devenir affilié maintenant
                    </Button>
                    <Button
                      onClick={() => setShowLoginForm(true)}
                      variant="outline"
                      className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Déjà inscrit ? Se connecter
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle>Structure des commissions multi-niveaux</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <p className="font-semibold">Niveau 1 - Vos ventes directes</p>
                          <p className="text-sm text-muted-foreground">Ventes effectuées grâce à vos liens</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">85%</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                        <div>
                          <p className="font-semibold">Niveau 2 - Vos affiliés directs</p>
                          <p className="text-sm text-muted-foreground">Ventes de vos filleuls directs</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">70%</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-200 rounded-lg">
                        <div>
                          <p className="font-semibold">Niveau 3 - Affiliés de vos affiliés</p>
                          <p className="text-sm text-muted-foreground">Ventes du second niveau</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">55%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-orange-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-600">Vrax Agence de Voyages</h3>
              <p className="text-sm text-muted-foreground">
                Votre partenaire de confiance pour maximiser vos revenus grâce aux partenariats de voyages.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compte</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-muted-foreground">bachiratmani1313@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  <span className="text-muted-foreground">{partners.length} Partenaires actifs</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-orange-600">Accueil</a></li>
                <li><a href="#" className="hover:text-orange-600">Partenaires</a></li>
                <li><a href="#" className="hover:text-orange-600">Promotions</a></li>
                <li><a href="#" className="hover:text-orange-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-orange-600">Détection automatique</a></li>
                <li><a href="#" className="hover:text-orange-600">Alertes en temps réel</a></li>
                <li><a href="#" className="hover:text-orange-600">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-orange-600">Mentions légales</a></li>
                <li><a href="#" className="hover:text-orange-600">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-orange-600">CGV</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Vrax Agence de Voyages. Tous droits réservés.</p>
            <p className="mt-2">
              Utilisateur : <span className="font-semibold text-orange-600">bachiratmani1313@gmail.com</span> | 
              Partenaires : <span className="font-semibold text-orange-600">{partners.length} actifs</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
