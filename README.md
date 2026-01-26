# 🌍 Vrax Voyage - Agence de voyages en ligne

![Vrax Voyage](https://img.shields.io/badge/vraxe-voyage-2.0-brightgreen.svg)

**Plateforme de comparaison de voyages et d'offres exclusives** - Comparez les prix Expedia, Booking.com, Airbnb et économisez sur vos prochaines vacances !

## ✨ Caractéristiques

- 🔍 **Comparateur multi-partenaires** : Expedia, Booking.com, Airbnb, TUI, eDreams, etc.
- 💰 **Offres exclusives** : Promotions jusqu'à -50%
- 📊 **Système d'affiliation** : Gagnez des commissions en partageant vos liens
- 🎯 **Filtres avancés** : Destination, budget, dates, nombre de voyageurs
- 📱 **Design responsive** : Fonctionne sur mobile, tablette et desktop
- 🚀 **Performance optimisée** : Next.js 16 avec Vercel

## 🚀 Démarrage rapide

### Prérequis

```bash
Node.js 18.x ou supérieur
npm ou bun
```

### Installation

```bash
# Installer les dépendances
bun install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables
nano .env
```

### Démarrage en développement

```bash
bun run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
vrax-voyage/
├── src/
│   ├── app/
│   │   ├── (pages pour l'application)
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/           (composants shadcn/ui)
│   │   └── (composants personnalisés)
│   ├── lib/
│   │   ├── db.ts          (Prisma ORM)
│   │   └── (fonctions utilitaires)
│   └── (types TypeScript)
├── public/
│   ├── vrax-profile-image.png
│   └── (images et assets statiques)
├── prisma/
│   └── schema.prisma       (schéma de base de données)
├── mini-services/
│   ├── payment-service/   (service de paiement SEPA)
│   └── (autres micro-services)
├── lib/
│   ├── db.ts              (client Prisma)
│   └── (autres utilitaires)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🗄️ Base de données

Ce projet utilise **Prisma ORM** avec SQLite.

### Principaux modèles

- **Affiliate** : Gestion des affiliés et commissions
- **Partner** : Partenaires de voyage (Expedia, Booking, Airbnb, etc.)
- **Promotion** : Offres promotionnelles avec liens d'affiliation
- **Opportunity** : Opportunités et alertes pour les affiliés
- **PayoutRequest** : Demandes de paiement et historique
- **Sale** : Ventes suivies et commissions

### Migrations de base de données

```bash
# Pousser le schéma vers la base de données
bun run db:push

# Créer une nouvelle migration
bun run db:studio
```

## 🔑 Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL="file:./dev.db"

# Secret Next.js
NEXTAUTH_SECRET="votre-secret-ici"

# URL de l'application (à mettre à jour après déploiement)
NEXT_PUBLIC_APP_URL="https://vrax-voyage.com"

# Clés API des partenaires (à configurer après inscription)
NEXT_PUBLIC_EXPEDIA_API_KEY=""
NEXT_PUBLIC_BOOKING_API_KEY=""
NEXT_PUBLIC_AIRBNB_API_KEY=""

# Paiements SEPA
NEXT_PUBLIC_STRIPE_SECRET_KEY=""
NEXT_PUBLIC_BANK_IBAN="BE5306379709253"
NEXT_PUBLIC_BANK_BIC="GKCCBEBB"
NEXT_PUBLIC_BANK_NAME="Belfius"
```

## 🎨 Personnalisation

### Thèmes de couleurs

Le projet utilise un thème **orange** par défaut, cohérent avec l'image de marque.

Modifier les couleurs dans `src/app/globals.css` :

```css
:root {
  --primary: 251 106 0;    /* Orange principal */
  --primary-foreground: 255 255 255;
  --background: 255 255 255;
  --foreground: 15 23 42;
}
```

### Logo et image de marque

Le logo et l'image de profil sont disponibles dans `/public/` :

- `vrax-profile-image.png` : Image de profil actuelle

## 🚀 Déploiement

### Sur Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Connecter à Vercel
vercel login

# Déployer
vercel

# Vercel détectera automatiquement Next.js et le configurera
```

### Variables d'environnement sur Vercel

Ajoutez ces variables dans les settings Vercel :

- `DATABASE_URL` : URL de base de données de production
- `NEXTAUTH_SECRET` : Secret aléatoire pour NextAuth
- `NEXT_PUBLIC_APP_URL` : `https://vrax-voyage.com`

### Domaine personnalisé

Le projet utilise **vrax-voyage.com** comme domaine principal.

Configurez votre DNS pour pointer vers Vercel :

```
Type   | Host     | Value
--------|----------|---------------
A       | @        | 76.76.21.21 (adresse IP Vercel)
A       | www       | 76.76.21.21
CNAME   | @        | cname.vercel.app (alternative)
CNAME   | www       | cname.vercel.app (alternative)
```

## 📊 Scripts disponibles

```bash
# Développement
bun run dev              # Démarrer le serveur de développement
bun run build            # Construire pour la production
bun run lint             # Vérifier le code
bun run type-check        # Vérifier les types TypeScript

# Base de données
bun run db:push           # Appliquer les migrations
bun run db:studio         # Ouvrir Prisma Studio
bun run db:generate         # Générer le client Prisma

# Tests (si ajoutés)
bun run test             # Exécuter les tests
bun run test:watch       # Surveiller les tests
```

## 🔄 Flux de travail recommandé

### Pour les nouvelles fonctionnalités

1. Créer une nouvelle branche :
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```

2. Apporter les modifications
3. Commiter et pusher :
   ```bash
   git add .
   git commit -m "Ajouter: nouvelle fonctionnalite"
   git push origin feature/nouvelle-fonctionnalite
   ```

4. Créer une Pull Request sur GitHub

5. Fusionner après revue

### Pour les corrections de bugs

1. Modifier directement sur `main`
2. Tester soigneusement
3. Commiter :
   ```bash
   git commit -m "Corriger: description du bug"
   git push origin main
   ```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Veuillez :

1. Forker ce dépôt
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonction`)
3. Commiter vos modifications avec des messages clairs
4. Pusher vers votre fork (`git push origin feature/ma-fonction`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Support

Pour toute question ou problème :

- **Documentation** : Voir le dossier `/docs` pour la documentation détaillée
- **Issues** : Signaler les bugs via [GitHub Issues](https://github.com/VOTRE_COMPTE_GITHUB/vrax-voyage/issues)
- **Discussions** : Participer aux [GitHub Discussions](https://github.com/VOTRE_COMPTE_GITHUB/vrax-voyage/discussions)

## 🌐 Lien en direct

**[vrax-voyage.com](https://vrax-voyage.com)**

---

<div align="center">
  
  **Made with ❤️ using Next.js**
  
  [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2FF?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  
</div>
