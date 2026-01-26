import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vrax Agence de Voyages | Partenaires & Promotions Exclusives",
  description: "Découvrez les meilleures offres de voyages et promotions exclusives grâce à nos partenariats avec les plus grandes agences. Détection automatique des opportunités pour maximiser vos gains.",
  keywords: ["Vrax", "agence de voyages", "voyages pas chers", "promotions voyages", "partenaires voyages", "offres voyages", "vacances", "Maldives", "Paris", "Bali", "croisière", "booking", "expedia", "airbnb"],
  authors: [{ name: "Vrax Agence de Voyages" }],
  icons: {
    icon: "/logo.svg",
  },
  metadataBase: new URL('https://vrax-voyages.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vrax Agence de Voyages - Partenaires & Promotions Exclusives",
    description: "Maximisez vos revenus avec nos partenariats de voyages. Détection automatique des meilleures promotions.",
    url: 'https://vrax-voyages.com',
    siteName: "Vrax Agence de Voyages",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vrax Agence de Voyages"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrax Agence de Voyages - Partenaires & Promotions",
    description: "Découvrez les meilleures offres de voyages et promotions exclusives",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Vrax Agence de Voyages",
            "description": "Partenaire de voyages avec détection automatique des meilleures promotions",
            "url": "https://vrax-voyages.com",
            "logo": "https://vrax-voyages.com/logo.svg",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            },
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "120"
            },
            "sameAs": [
              "https://www.facebook.com/vraxvoyages",
              "https://www.instagram.com/vraxvoyages",
              "https://www.twitter.com/vraxvoyages"
            ]
          })}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
