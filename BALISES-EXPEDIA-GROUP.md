# 🔧 LES 3 BALISES EXPEDIA GROUP POUR TRAVEL SHOPS

---

## 📍 INSCRIPTION EXPEDIA GROUP

**Programme :** Expedia Group Travel Shops
**Lien :** https://creator.expediagroup.com/app/travel-shops
**Statut :** Déjà inscrit ✅

---

## 📋 LES 3 BALISES À AJOUTER À VOTRE SITE

### BALISE 1 : Pixel de Tracking (Meta Tag)

Cette balise doit être ajoutée dans la section `<head>` de votre site, entre les balises `<meta>`.

```html
<!-- Expedia Group Travel Shop Tracking Pixel -->
<meta name="expedia-partner" content="VRAX_PARTNER_ID" />
<meta property="expedia:shop_id" content="YOUR_SHOP_ID" />
```

**Où l'ajouter :**
- Dans `src/app/layout.tsx` dans le composant `<head>`
- Entre les autres balises `<meta>`

---

### BALISE 2 : Script de Tracking (JavaScript)

Ce script doit être ajouté avant la fermeture de la balise `</body>`.

```html
<!-- Expedia Group Tracking Script -->
<script type="text/javascript">
  (function(e,t,n,s,u,a){
    e[t]=e[t]||[];
    e[t].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=t.getElementsByTagName(s)[0],
    j=t.createElement(s),
    dl=l!='dataLayer'?'&l='+s:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-EXPEDIA_SHOP');
</script>
```

**Où l'ajouter :**
- Dans `src/app/page.tsx` tout à la fin du JSX
- Avant le dernier `</div>`

---

### BALISE 3 : NoScript pour IE (Fallback)

Cette balise s'assure que le tracking fonctionne même si JavaScript est désactivé.

```html
<!-- Expedia Group NoScript Fallback -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-EXPEDIA_SHOP" 
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

**Où l'ajouter :**
- Dans `src/app/page.tsx` tout à la fin du JSX
- Juste après la balise script

---

## 🚀 COMMENT INTÉGRER DANS VOTRE SITE VRA X

### ÉTAPE 1 : Ajouter les balises meta (layout.tsx)

Ouvrez `src/app/layout.tsx` et ajoutez dans le `<head>` :

```typescript
export const metadata: Metadata = {
  title: 'Vrax Agence de Voyages',
  description: 'Comparez et réservez vos voyages au meilleur prix',
  // Ajoutez ces métadonnées Expedia
  other: {
    'expedia-partner': 'VRAX_TRAVEL_SHOP',
    'expedia:shop_id': 'VRAx_Shop_ID', // Remplacez par votre Shop ID
  },
}
```

---

### ÉTAPE 2 : Ajouter les scripts de tracking (page.tsx)

Créez un composant de tracking dans `src/components/TrackingScripts.tsx` :

```typescript
'use client';

export function TrackingScripts() {
  return (
    <>
      {/* Expedia Group GTM Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+s:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-EXPEDIA_SHOP');
          `
        }}
      />

      {/* Expedia NoScript Fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-EXPEDIA_SHOP"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
```

Puis importez-le et utilisez-le dans `src/app/page.tsx` :

```typescript
import { TrackingScripts } from '@/components/TrackingScripts';

export default function VraxTravelSite() {
  // ... votre code existant ...

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50">
      {/* ... votre contenu existant ... */}

      {/* Ajoutez ça tout à la fin, avant le dernier </div> */}
      <TrackingScripts />
    </div>
  );
}
```

---

## 🔍 COMMENT TROUVER VOS IDENTIFIANTS EXPEDIA

### 1. Connectez-vous à Expedia Travel Shops
1. Allez sur : https://creator.expediagroup.com/app/travel-shops
2. Connectez-vous avec vos identifiants
3. Cliquez sur "Travel Shop" dans le menu
4. Cherchez les informations de tracking

### 2. Copiez vos identifiants
Vous trouverez probablement :
- **Shop ID** : Votre identifiant unique (ex: VRAX12345)
- **Partner ID** : Votre code partenaire
- **GTM Container ID** : Le conteneur Google Tag Manager (ex: GTM-XXXXXX)

### 3. Remplacez dans les balises
Remplacez les valeurs fictives dans les exemples ci-dessus par vos vraies valeurs.

---

## ✅ LISTE DE VÉRIFICATION AVANT VALIDATION

- [ ] Balise 1 (Meta tag) ajoutée dans `<head>`
- [ ] Shop ID correctement configuré
- [ ] Balise 2 (Script) ajoutée avant `</body>`
- [ ] GTM Container ID correct
- [ ] Balise 3 (NoScript) ajoutée
- [ ] Aucune erreur dans la console du navigateur
- [ ] Les balises sont visibles dans le code source de la page

---

## 🧪 COMMENT TESTER LES BALISES

### Méthode 1 : Inspecter le code source
1. Ouvrez votre site
2. Faites clic droit → "Inspecter"
3. Allez dans l'onglet "Elements"
4. Cherchez `expedia-partner` ou `GTM-EXPEDIA_SHOP`

### Méthode 2 : Network Tab (pour vérifier le tracking)
1. Ouvrez votre site
2. Faites clic droit → "Inspecter"
3. Allez dans l'onglet "Network"
4. Cherchez les requêtes vers `googletagmanager.com`

### Méthode 3 : Google Tag Assistant
1. Installez l'extension "Google Tag Assistant" (Chrome/Firefox)
2. Ouvrez votre site
3. Cliquez sur l'icône de l'extension
4. Vérifiez que GTM est détecté

---

## 📧 EMAIL POUR DEMANDER DE L'AIDE (SI NÉCESSAIRE)

Si vous avez des problèmes avec les 3 balises :

```
Bonjour à l'équipe Expedia Travel Shops,

Je suis actuellement inscrit à votre programme Travel Shops (VOTRE PARTNER ID).

Je suis en train d'intégrer les 3 balises de tracking sur mon site pour finaliser l'installation.

📍 MES COORDONNÉES :
Nom : VOTRE NOM
Email : bachiratmani1313@gmail.com
Shop ID : VOTRE_SHOP_ID
Site web : VOTRE_SITE_WEB

❓ QUESTIONS :
1. Quelle est mon GTM Container ID exact ?
2. Le Shop ID est-il bien configuré dans votre système ?
3. Y a-t-il d'autres balises ou pixels à intégrer ?

🔍 CE QUE J'AI FAIT :
- Ajouté les métadonnées Expedia dans le <head>
- Intégré le script GTM sur le site
- Ajouté le fallback <noscript>

📋 SITE TECHNIQUE :
Framework : Next.js 16
Type : SSR (Server Side Rendering)
URL : VOTRE_SITE_WEB

Pourriez-vous vérifier mes balises et me confirmer si tout est correct ?

Merci d'avance pour votre aide !

Cordialement,
VOTRE NOM
Vrax Agence de Voyages
```

---

## 🚀 ÉTAPES SUIVANTES

### Étape 1 : Obtenir vos identifiants Expedia
✅ Déjà inscrit → Connectez-vous et récupérez Shop ID + GTM ID

### Étape 2 : Intégrer les 3 balises
✅ Ajouter la balise meta dans `<head>`
✅ Ajouter le script GTM avant `</body>`
✅ Ajouter le fallback `<noscript>`

### Étape 3 : Tester
✅ Vérifier que les balises apparaissent dans le code source
✅ Tester le tracking avec Google Tag Assistant
✅ Faire quelques clics de test

### Étape 4 : Valider
✅ Demander à Expedia de valider l'installation
✅ Attendre la confirmation (1-3 jours ouvrés)
✅ Commencer à recevoir les commissions !

---

## 💡 CONSEILS POUR LA VALIDATION

### ✅ Bonnes pratiques :
- Utilisez vos vraies valeurs (Shop ID, GTM ID)
- Testez sur votre environnement de production
- Attendez 24-48h avant de contacter le support
- Gardez une copie de vos identifiants

### ❌ À éviter :
- N'utilisez pas les valeurs d'exemple
- N'attendez pas trop longtemps pour contacter le support
- Ne modifiez pas les scripts sans savoir ce que vous faites
- Ne cachez pas les balises (elles doivent être visibles)

---

## 📞 SI VOUS AVEZ BESOIN D'AIDE

**Support Expedia Travel Shops :**
- Email : partners@expediagroup.com
- Help Center : https://partners.expediagroup.com/help
- Portal : https://creator.expediagroup.com/app/travel-shops

**Votre Shop ID :** [À récupérer dans votre dashboard]
**Votre Partner ID :** [À récupérer dans votre dashboard]

---

Vous avez maintenant toutes les informations pour ajouter les 3 balises Expedia ! 🎯

Une fois les balises intégrées et validées, les liens affiliés Expedia fonctionneront parfaitement et vous pourrez générer des commissions ! 💰
