# 🌴 Vrax Agence de Voyages - Site d'Affiliation

## 🎯 À Propos

Site web complet pour la gestion des partenariats d'affiliation voyages avec détection automatique des opportunités de gains.

**Utilisateur :** bachiratmani1313@gmail.com  
**12 Partenaires installés :** Expedia, Booking.com, Airbnb, TUI, Kayak, GetYourGuide, Viator, HRS, Agoda, Trip.com, Hostelworld, Egencia

## ✨ Fonctionnalités

### 🤖️ Frontend
- ✅ Interface moderne et responsive
- ✅ 4 onglets : Promotions, Partenaires, Alertes, Gains
- ✅ Recherche et filtrage des promotions
- ✅ Cartes promotionnelles avec images et statistiques
- ✅ Dashboard de gains et analytics
- ✅ Système d'alertes en temps réel
- ✅ Bouton "Installer Affiliations" pour initialisation automatique

### 🔧 Backend
- ✅ API RESTful complète
- ✅ Base de données Prisma (SQLite)
- ✅ Gestion des partenaires d'affiliation
- ✅ Gestion des promotions et opportunités
- ✅ Détection automatique des promotions lucratives

### 🤖️ Services Automatiques
- ✅ **Scraping Service** (port 3030) - Scrape toutes les 10 min
- ✅ **Detection Service** (port 3031) - Détecte toutes les 30 sec
- ✅ Alertes automatiques pour :
  - Réductions ≥ 30%
  - Promotions expirant dans < 3 jours
  - Gains potentiels > 100€

### 🔍 SEO Optimisé
- ✅ Meta tags optimisés
- ✅ Open Graph et Twitter Cards
- ✅ Schema.org JSON-LD (TravelAgency)
- ✅ Sitemap.xml
- ✅ Robots.txt

## 🚀 Comment Utiliser

### 1. Démarrer le Site

Le site est déjà démarré automatiquement. Les URLs sont :

- **Site principal** : http://localhost:3000
- **Preview Panel** : Cliquez sur "Preview" dans l'interface

### 2. Initialiser les Affiliations

Cliquez sur le bouton **"Installer Affiliations"** dans le header pour :
- Ajouter automatiquement les 12 partenaires d'affiliation
- Créer votre compte utilisateur
- Configurer les liens d'affiliation

### 3. Suivre les Opportunités

Le système détecte automatiquement :
- 🔴 **Alertes urgentes** - Réductions importantes ou promotions expirantes
- 🟡 **Opportunités moyennes** - Offres intéressantes
- 🟢 **Gains potentiels** - Calcul automatique des commissions

### 4. Consulter le Guide d'Inscription

Voir le fichier **INSCRIPTION-AFFILIATION.md** pour :
- Liens vers chaque programme d'affiliation
- Instructions d'inscription détaillées
- Commissions et caractéristiques de chaque partenaire
- Conseils pour maximiser vos revenus

## 📊 Structure de l'Application

```
src/
├── app/
│   ├── page.tsx                 # Page principale
│   ├── layout.tsx               # Layout avec SEO
│   ├── globals.css              # Styles globaux
│   └── api/                    # API Routes
│       ├── partners/            # Gestion partenaires
│       ├── promotions/           # Gestion promotions
│       ├── opportunities/        # Gestion alertes
│       ├── detect-opportunities/ # Détection automatique
│       ├── scrape-promotions/    # Réception scraping
│       └── init-affiliates/     # Initialisation affiliations
└── components/
    └── ui/                     # Composants shadcn/ui

mini-services/
├── scraping-service/             # Service scraping (port 3030)
└── detection-service/            # Service détection (port 3031)
```

## 🎨 Personnalisation

### Changer l'Email Utilisateur

Éditez `src/app/api/init-affiliates/route.ts` :

```typescript
const USER_EMAIL = 'votre-email@gmail.com';
```

### Ajouter des Partenaires

Éditez le tableau `AFFILIATE_PARTNERS` dans le même fichier.

### Modifier les Taux de Commission

Les taux de commission sont configurables dans chaque partenaire.

## 🔑 Inscription aux Programmes d'Affiliation

Pour maximiser vos revenus :

1. **Lisez le guide** : `INSCRIPTION-AFFILIATION.md`
2. **Inscrivez-vous** à chaque programme avec votre email
3. **Attendez l'approbation** (24-48h en général)
4. **Récupérez vos liens** de tracking dans les tableaux de bord partenaires
5. **Mettez-les à jour** dans votre base de données si nécessaire

## 💡 Bonnes Pratiques

✅ **Révisez régulièrement les opportunités** (dans l'onglet Alertes)
✅ **Priorisez les promotions** avec réduction ≥ 30%
✅ **Surveillez les expirations** (alertes automatiques)
✅ **Utilisez les liens partenaires** pour maximiser vos conversions
✅ **Consultez vos statistiques** de gains dans l'onglet Gains

## 🛠️ Développement

### Lancer le site en développement
```bash
# Le site démarre automatiquement
# Logs disponibles dans : /home/z/my-project/dev.log
```

### Vérifier les logs
```bash
# Dev server
tail -f /home/z/my-project/dev.log

# Scraping service
tail -f /tmp/scraping-service.log

# Detection service
tail -f /tmp/detection-service.log
```

### Linter
```bash
bun run lint
```

## 📈 Métriques et Gains

Le système calcule automatiquement :
- **Gains totaux** - Somme des commissions potentielles
- **Opportunités actives** - Nombre d'alertes non lues
- **Alertes urgentes** - Promotions nécessitant action immédiate
- **Performance par partenaire** - Revenus par agence d'affiliation

## 🆘 Support

Pour toute question ou problème :
- ✅ Consultez le guide `INSCRIPTION-AFFILIATION.md`
- ✅ Vérifiez les logs de développement
- ✅ Contactez les programmes d'affiliation directement

## 📝 License

Projet créé pour Vrax Agence de Voyages - Utilisation commerciale uniquement avec autorisation.

---

**Créé avec ❤️ par Z.ai Code**
