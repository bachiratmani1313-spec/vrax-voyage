# 🏦 Guide de Configuration Bancaire et Automatisation

## 📋 Configuration Actuelle

### Coordonnées Bancaires Enregistrées
- **IBAN** : `BE5306379709253`
- **BIC** : `BE5306379709253`
- **Banque** : `BANQUE BELGE`
- **Pays** : `Belgique`
- **Nom Entreprise** : `Compte personnel`
- **Titulaire** : `Bachir Atmani`
- **Email** : `bachiratmani1313@gmail.com`

### 13 Partenaires d'Affiliation Configurés
1. Expedia (10%)
2. Booking.com (10%)
3. Airbnb (10%)
4. TUI (10%)
5. Kayak (8%)
6. GetYourGuide (12%)
7. Viator (10%)
8. HRS (9%)
9. Agoda (10%)
10. Trip.com (9%)
11. Hostelworld (8%)
12. Egencia (10%)
13. Discover Cars (8%)

## ⚠️ LIMITATIONS IMPORTANTES

### 🚫 Ce Qui NE PEUT PAS ÊTRE AUTOMATIQUE

1. **Incription réelle aux sites partenaires**
   - Chaque partenaire a sa propre API et système
   - L'inscription nécessite une validation humaine
   - Les boutons de captchas doivent être complétés manuellement
   - Les documents KYC (Know Your Customer) doivent être fournis

2. **Poster directement sur les sites partenaires**
   - Les sites partenaires n'ont PAS d'API publique
   - La création de promotions nécessite l'accès au dashboard partenaire
   - Chaque partenaire a son propre système et format

3. **Paiements automatiques**
   - Les partenaires ne peuvent PAS envoyer de paiements automatiquement
   - Chaque partenaire gère ses propres virements
   - Les commissions sont cumulées puis payées selon leur fréquence

## ✅ CE QUI EST POSSIBLE AVEC LE SYSTÈME ACTUEL

### 1️⃣ Génération des Liens d'Inscription
Le système génère automatiquement les URL d'inscription pour chaque partenaire avec vos informations pré-remplies :

**Cliquez sur "Inscription Auto (IBAN)"** → Obtenir les 13 liens d'inscription

Chaque lien contient :
- Votre email et coordonnées bancaires
- Votre nom et entreprise
- Instructions pour compléter l'inscription
- Mode de paiement préféré

### 2️⃣ Génération des Promotions Locales
Le système crée automatiquement des promotions avec vos liens de tracking :

**Cliquez sur "Poster Promotions"** → Créer 4 promotions types

Les promotions incluent :
- Vos liens de tracking d'affiliation
- Prix et réductions attractifs
- Images et descriptions professionnelles
- Calcul automatique de vos commissions estimées

### 3️⃣ Détection Automatique d'Opportunités
Le système détecte automatiquement :
- Réductions élevées (≥30%)
- Promotions expirant bientôt (<3 jours)
- Gains potentiels élevés (>100€)
- Crée des alertes en temps réel

## 📖 PROCESSUS RECOMMANDÉ

### Étape 1: Inscription aux Programmes d'Affiliation (Manuelle)

**IMPORTANT :** Vous devez vous inscrire MANUELLEMENT à chaque programme

1. Cliquez sur **"Inscription Auto (IBAN)"**
2. Copiez chaque lien d'inscription affiché
3. Ouvrez le lien dans un navigateur
4. Complétez le formulaire d'inscription avec :
   - **Email** : bachiratmani1313@gmail.com
   - **Nom** : Bachir Atmani
   - **Entreprise** : Compte personnel
   - **IBAN** : BE5306379709253
   - **BIC** : BE5306379709253
   - **Site web** : Laissez vide ou mettez votre site futur
5. Sélectionnez le mode de paiement : **Virement bancaire**
6. Attendez l'approbation (24-72h)

### Étape 2: Configuration du Paiement

Une fois approuvé, dans chaque dashboard partenaire :

1. Allez dans **"Payment Settings"** ou **"Compte"**
2. Ajoutez/Modifiez vos coordonnées bancaires :
   ```
   IBAN: BE5306379709253
   BIC: GKCCBEBB
   Banque: BANQUE BELGE
   Titulaire: Bachir Atmani
   ```
3. Sauvegardez les changements
4. Notez la fréquence de paiement (généralement mensuelle)

### Étape 3: Création des Liens de Tracking

Dans chaque dashboard partenaire :

1. Cliquez sur **"Liens"** ou **"Bannières"**
2. Créez un nouveau lien pour chaque promotion
3. Mettez l'URL : `https://votre-site.com?partner={partner}&promo={promo_id}`
4. Copiez le lien de tracking généré

### Étape 4: Configuration de la Redirection des Acheteurs

**IMPORTANT :** Vous devez configurer votre propre serveur de redirection

1. Créez une page de redirection sur votre site :
   ```javascript
   // Page: /redirect
   const urlParams = new URLSearchParams(window.location.search);
   const partner = urlParams.get('partner');
   const promo = urlParams.get('promo');
   
   // Rediriger vers le lien partenaire avec tracking
   window.location.href = `https://${partner}.com/book?ref=${votre_code_tracking}`;
   ```

2. Alternativement, utilisez directement les liens partenaires sans redirection :
   ```html
   <a href="https://www.expedia.fr/ref=votre_code" target="_blank">
     Réserver maintenant
   </a>
   ```

### Étape 5: Intégration dans le Système Vrax

Mettez à jour les liens dans votre base de données :

```sql
-- Mettre à jour chaque partenaire avec vos vrais liens de tracking
UPDATE Partner 
SET link = 'https://www.expedia.fr/ref=VRAX001',
    trackingCode = 'VRAX001'
WHERE name = 'Expedia';
```

### Étape 6: Publication des Promotions

**Option A : Utiliser "Poster Promotions" (Création locale)**

1. Cliquez sur **"Poster Promotions"**
2. Le système crée les promotions dans votre base de données locale
3. Copiez les détails depuis chaque promotion
4. Publiez-les manuellement sur chaque dashboard partenaire

**Option B : Création directe sur chaque site**

Pour chaque partenaire :
1. Connectez-vous au dashboard
2. Cliquez sur "Créer une promotion" / "Ajouter une offre"
3. Remplissez avec les détails de la promotion
4. Utilisez vos liens de tracking
5. Configurez la date d'expiration
6. Publiez la promotion

## 💰 RÉCEPTION DES COMMISSIONS

### Processus Naturel

1. **Les acheteurs réservent** via vos liens de tracking
2. **Le partenaire tracke** la conversion
3. **La commission est calculée** automatiquement
4. **La commission s'accumule** dans votre dashboard partenaire
5. **Au seuil minimum**, un virement est déclenché automatiquement

### Seuils de Paiement Typiques

| Partenaire | Minimum Payout | Fréquence | Délai |
|------------|---------------|------------|--------|
| Expedia | $50 | Mensuel | 30-45 jours |
| Booking.com | €50 | Mensuel | 30-45 jours |
| Airbnb | $100 | Mensuel | 30-60 jours |
| TUI | €100 | Mensuel | 30-45 jours |
| Kayak | $100 | Mensuel | 30-60 jours |
| GetYourGuide | $50 | Mensuel | 30-45 jours |
| Viator | €100 | Mensuel | 30-60 jours |
| HRS | €50 | Mensuel | 30-45 jours |
| Agoda | $100 | Mensuel | 30-45 jours |
| Trip.com | $100 | Mensuel | 30-60 jours |
| Hostelworld | €50 | Mensuel | 30-45 jours |
| Egencia | €100 | Mensuel | 30-60 jours |
| Discover Cars | $50 | Mensuel | 30-45 jours |

### Vérification des Virements

Sur votre compte bancaire :
- Surveillez les arrivées de fonds
- Notez le partenaire expéditeur (ex: "Expedia Affiliate")
- Vérifiez le montant correspond à vos commissions

## 🔧 AUTOMATISATIONS POSSIBLES

### Ce qui peut être automatisé avec le système actuel :

✅ **Création de liens d'inscription** - Avec vos informations bancaires
✅ **Génération de templates de promotions** - Avec calcul automatique des commissions
✅ **Détection d'opportunités** - Analyses automatiques des promotions
✅ **Alertes en temps réel** - Notifications des nouvelles opportunités
✅ **Calcul automatique des gains** - Estimation précise des revenus
✅ **Statistiques et analytics** - Suivi des performances par partenaire

### Ce qui nécessite une intervention manuelle ou développement supplémentaire :

⚠️ **Inscription réelle** - Doit être faite manuellement (captcha, KYC)
⚠️ **Publication sur les sites** - Doit être faite via les dashboards partenaires
⚠️ **Configuration des paiements** - Doit être configurée dans chaque dashboard
⚠️ **API Integration** - Nécessite développement backend avec Selenium/Puppeteer

## 🚀 AUTOMATISATION AVANCÉE (Requiert développement)

Pour automatiser complètement l'inscription et publication, vous auriez besoin de :

### 1. Service de Scraping avec Authentication

```typescript
// Mini-service: browser-automation-service
const puppeteer = require('puppeteer');

async function autoRegisterPartner(partnerName) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Naviguer vers la page d'inscription
  await page.goto('https://www.expedia.com/affiliate/signup');
  
  // Remplir le formulaire
  await page.type('#email', 'bachiratmani1313@gmail.com');
  await page.type('#firstName', 'Bachir');
  await page.type('#lastName', 'Atmani');
  await page.type('#company', 'Compte personnel');
  await page.type('#iban', 'BE5306379709253');
  await page.type('#bic', 'BE5306379709253');
  
  // Gérer le captcha (nécessite un service de résolution)
  await handleCaptcha(page);
  
  // Attendre l'approbation (manuelle)
  await browser.close();
}
```

### 2. API Integration Partners

Certains partenaires offrent des API d'affiliation :

- **Booking.com API** : Pour créer des liens et promotions par API
- **Expedia API** : Pour les grandes entreprises
- **Airbnb API** : Disponible avec application spéciale
- **Viator API** : Pour les plateformes partenaires

### 3. Système de Redirection Interne

Créez un serveur qui gère la redirection des acheteurs :

```javascript
// /api/redirect
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const partner = searchParams.get('partner');
  const promo = searchParams.get('promo');
  
  // Log de la conversion pour analytics
  await logConversion({ partner, promo, timestamp: Date.now() });
  
  // Redirection vers le partenaire avec tracking
  const redirectUrl = getAffiliateLink(partner, promo);
  return Response.redirect(redirectUrl);
}
```

## 📊 Tableau de Bord Recommandé

### Quotidiennement :

1. **Vérifier les dashboards partenaires** pour :
   - Nouvelles commandes
   - Commissions accumulées
   - Statistiques de clics et conversions
   - Alertes sur les paiements

2. **Surveiller votre compte bancaire** pour :
   - Arrivée de virements
   - Rapprochement des montants

3. **Consulter le système Vrax** pour :
   - Alertes d'opportunités
   - Performances par partenaire
   - Promotions expirant
   - Optimisations suggérées

### Hebdomadairement :

1. **Revoir les performances** par partenaire
2. **Ajuster les stratégies** basées sur les conversions
3. **Explorer de nouvelles promotions** à créer
4. **Optimiser les liens** les plus performants

## 🎯 STRATÉGIES POUR MAXIMISER LES REVENUS

### 1. Focalisation sur les Promotions Lucratives

- Prioritisez les réductions ≥30% (meilleur taux de conversion)
- Misez en avant les destinations populaires
- Utilisez des images de haute qualité
- Créez un sentiment d'urgence (expirations imminentes)

### 2. Contenu Marketing

- Créez des descriptions détaillées et attractives
- Utilisez des mots-clés SEO pertinentes
- Incluez des appels à l'action clairs
- Ajoutez des témoignages clients (réels ou simulés)

### 3. Distribution Multicanal

- Site web Vrax (central)
- Réseaux sociaux (Facebook, Instagram, TikTok)
- Email marketing
- Blogs et articles voyage
- Partenaires locaux

### 4. Optimisation Continue

- Testez différents angles promotionnels
- Surveillez les concurrents
- Adaptez-vous aux saisons (été, hiver, vacances)
- Utilisez les analytics pour prendre des décisions data-driven

## ⚠️ CONFORMITÉ LÉGALE

### Obligations :

1. **Mention de partenariat** sur toutes les promotions
2. **Transparence** sur la nature du lien (lien d'affiliation)
3. **RGPD** : Protection des données personnelles des utilisateurs
4. **Conditions de vente** : CGC accessibles
5. **Droit de rétractation** : Conforme à la législation belge (14 jours)
6. **Facturation** : Émettre des factures pour chaque commission reçue
7. **Déclaration fiscale** : Enregistrement des revenus en Belgique

## 📞 SUPPORT TECHNIQUE

En cas de problème :

1. **Consultez les logs** :
   ```bash
   tail -f /home/z/my-project/dev.log
   ```

2. **Vérifiez les mini-services** :
   ```bash
   # Scraping service
   tail -f /tmp/scraping-service.log
   
   # Detection service
   tail -f /tmp/detection-service.log
   ```

3. **Testez les API** :
   ```bash
   curl http://localhost:3000/api/init-affiliates-auto
   ```

## ✅ CHECKLIST DE DÉMARRAGE

- [ ] Inscription manuelle aux 13 programmes d'affiliation
- [ ] Configuration des coordonnées bancaires dans chaque dashboard
- [ ] Création des liens de tracking pour chaque partenaire
- [ ] Configuration de la page de redirection des acheteurs
- [ ] Publication de 3-5 promotions par partenaire
- [ ] Test des liens de tracking
- [ ] Configuration des notifications de paiement
- [ ] Mise en place du suivi bancaire

---

**IMPORTANT :** Le système actuel génère les inscriptions et promotions AUTOMATIQUEMENT, mais vous devez VALIDER et PUBLIER manuellement sur les sites partenaires pour activer les paiements.
