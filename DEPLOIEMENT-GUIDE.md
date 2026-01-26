# 📦 Guide Complet de Déploiement - Vrax Voyage

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Télécharger GitHub Desktop](#télécharger-github-desktop)
3. [Créer un compte GitHub](#créer-un-compte-github)
4. [Créer le dépôt GitHub](#créer-le-dépôt-github)
5. [Connecter GitHub Desktop](#connecter-github-desktop)
6. [Cloner ou ajouter le projet](#cloner-ou-ajouter-le-projet)
7. [Faire le premier push](#faire-le-premier-push)
8. [Connecter Vercel à GitHub](#connecter-vercel-à-github)
9. [Déployer sur Vercel](#déployer-sur-vercel)
10. [Ajouter le domaine personnalisé](#ajouter-le-domaine-personnalisé)
11. [Configurer les variables d'environnement](#configurer-les-variables-denvironnement)

---

## 📋 PRÉREQUIS

### Ce dont vous avez besoin maintenant :

- ✅ **Compte GitHub créé**
- ✅ **GitHub Desktop installé**
- ✅ **Domaine vrax-voyage.com acheté**
- ✅ **DNS Namecheap configuré** (A Records)
- ✅ **Email redirection configurée**
- ✅ **Projet Vrax à déployer**

---

## 🖥 TÉLÉCHARGER GITHUB DESKTOP

### Étape 1 : Téléchargez GitHub Desktop

1. **Allez sur** : https://desktop.github.com/
2. **Cliquez sur** : "Download for Windows" (ou votre OS)
3. **Exécutez** le fichier téléchargé
4. **Installez-le** avec les options par défaut

---

## 📝 CRÉER UN COMPTE GITHUB

### Étape 2 : Créez votre compte

1. **Allez sur** : https://github.com/signup
2. **Entrez** :
   - Email : bachiratman@vrax-voyages.be (votre Gmail)
   - Mot de passe : choisissez-en un fort
   - Nom d'utilisateur : bachiratman-vrax ou autre disponible
3. **Cochez** : "I agree to the GitHub Terms"
4. **Cliquez sur** : "Create account"
5. **Vérifiez** votre email et cliquez sur le lien de confirmation

---

## 📁 CRÉER LE DÉPÔT GITHUB

### Étape 3 : Créez le dépôt

1. **Connectez-vous** à votre compte GitHub
2. **Cliquez sur** : le bouton "+" en haut à droite → "New repository"
3. **Remplissez** le formulaire :
   ```
   Repository name : vrax-voyage
   Description : Agence de voyages en ligne - Comparateur de promotions exclusives Expedia, Booking.com, Airbnb
   
   ☑ Public [COCHEZ CETTE CASE]
   ☐ Add a README file [COCHEZ CETTE CASE - RECOMMANDÉ]
   ☐ Add .gitignore [COCHEZ CETTE CASE]
   ☑ Choose a license : MIT License
   ```
4. **Cliquez sur** : "Create repository"

---

## 🔗 CONNECTER GITHUB DESKTOP

### Étape 4 : Connectez votre compte

1. **Ouvrez** GitHub Desktop
2. **Cliquez sur** : "File" → "Clone repository"
3. **Entrez** l'URL :
   ```
   https://github.com/VOTRE_NOM_UTILISATEUR/vrax-voyage.git
   ```
4. **Choisissez** : le dossier de destination
   ```
   Exemple : C:\Users\VOTRE_NOM\Documents\GitHub\vrax-voyage
   ```
5. **Cliquez sur** : "Clone"

**GitHub va télécharger tout le projet dans le dossier choisi !**

---

## 📂 CLONER OU AJOUTER LE PROJET

### Méthode A : Cloner (RECOMMANDÉE POUR PREMIER UTILISATEUR)

Si c'est la première fois que vous utilisez GitHub Desktop, suivez ces étapes :

1. **Après le clone**, GitHub Desktop va vous demander où cloner
2. **Ouvrez un explorateur de fichiers** et allez dans :
   ```
   C:\Users\VOTRE_NOM\Documents\GitHub\vrax-voyage
   ```
3. **Vous devriez voir** :
   - Tous les fichiers du projet Vrax
   - README.md
   - .gitignore
   - vercel.json
   - .env.example

### Méthode B : Ajouter le dépôt existant (SI vous avez déjà un clone)

Si vous avez déjà cloné le projet autre part, utilisez GitHub Desktop pour l'ajouter :

1. **GitHub Desktop** → "File" → "Add Local Repository"
2. **Cherchez** le dossier `/home/z/my-project` (où est le code actuel)
3. **Cliquez sur** : "Add repository"

---

## 🚀 FAIRE LE PREMIER PUSH

### Étape 5 : Commit initial

#### Option A : Via GitHub Desktop (SIMPLE)

1. **Ouvrez** GitHub Desktop
2. **Sélectionnez** le dépôt "vrax-voyage"
3. **Vérifiez** que vous voyez le code dans l'explorateur
4. **Cliquez sur** : "Publish branch" (icône de flèche vers le haut) dans la barre en haut
5. **Remplissez** le résumé :
   ```
   Summary: Initial commit - Projet Vrax Voyage complet avec comparateur de promotions
   Description: (optionnel)
   Extended description: (optionnel)
   ```
6. **Cliquez sur** : "Commit to main"
7. **Patientez** que le commit soit complété

#### Option B : Via ligne de commande

Si vous préférez utiliser le terminal, faites ceci depuis le dossier du projet :

```bash
cd /home/z/my-project
git init
git add .
git commit -m "Initial commit - Projet Vrax Voyage complet"
```

---

## 🔌 CONNECTER VERCEL À GITHUB

### Étape 6 : Connecter Vercel à votre compte

1. **Allez sur** : https://vercel.com/
2. **Cliquez sur** : "Log In" (en haut à droite)
3. **Sélectionnez** : "Continue with GitHub"
4. **Autorisez** Vercel à accéder à votre compte GitHub
5. **Vercel va scanner** votre compte et afficher vos dépôts GitHub

---

## 🚀 DÉPLOYER SUR VERCEL

### Étape 7 : Importer le dépôt sur Vercel

Une fois connecté à GitHub, Vercel affichera votre dépôt "vrax-voyage" :

1. **Allez sur** : https://vercel.com/dashboard
2. **Vérifiez** que vous voyez "vrax-voyage" dans "Recent Projects" ou utilisez le champ de recherche
3. **Cliquez sur** : "Import" (sur le dépôt vrax-voyage)
4. **Vercel va détecter automatiquement** :
   - Framework : Next.js
   - Build command : bun run build
   - Project settings dans vercel.json
5. **Vérifiez** les options :
   - Framework Preset : Next.js
   - Root Directory : ./ (ou laisser vide)
   - Build Command : bun run build
6. **Cliquez sur** : "Deploy"

Vercel va maintenant :
1. Cloner votre dépôt GitHub
2. Installer les dépendances (bun install)
3. Builder le projet (bun run build)
4. Déployer sur leur infrastructure

Attendez le déploiement (environ 2-5 minutes) !

---

## 🌐 AJOUTER LE DOMAINE PERSONNALISÉ

### Étape 8 : Configurer vrax-voyage.com

#### Option A : Via le dashboard Vercel (RECOMMANDÉ)

1. **Une fois le déploiement terminé**, Vercel vous demandera :
   ```
   Voulez-vous configurer vrax-voyage.com ?
   ```

2. **Cliquez sur** : "Yes"

3. Vercel va automatiquement :
   - Ajouter le domaine à votre projet
   - Générer le certificat SSL (HTTPS)
   - Configurer le DNS automatiquement

4. **Vérifiez** que le statut passe à "Ready"

#### Option B : Via le dashboard manuellement

1. **Allez sur** : https://vercel.com/dashboard
2. **Cliquez sur** le projet "vrax-voyage"
3. **Allez dans** : "Settings" → "Domains"
4. **Cliquez sur** : "Add Domain"
5. **Entrez** : vrax-voyage.com
6. **Suivez** les instructions de Vercel

### Étape 9 : Vérifier la configuration DNS

Si Vercel ne détecte pas automatiquement votre DNS, vous devez :

1. **Allez sur** : https://vercel.com/dashboard
2. **Sélectionnez** : le projet "vrax-voyage"
3. **Cliquez sur** : "Domains"
4. **Vérifiez** que vous voyez : vrax-voyage.com
5. **Notez** l'adresse IP affichée par Vercel (pour référence)

---

## 🔧 CONFIGURER LES VARIABLES D'ENVIRONNEMENT

### Étape 10 : Ajouter les variables

1. **Allez sur** : https://vercel.com/dashboard
2. **Sélectionnez** : le projet "vrax-voyage"
3. **Allez dans** : "Settings" → "Environment Variables"
4. **Ajoutez** les variables essentielles :

| Nom | Valeur | Environnement |
|-----|--------|----------------|
| NEXT_PUBLIC_APP_URL | https://vrax-voyage.com | Production, Preview, Development |
| NEXTAUTH_SECRET | [généré aléatoirement] | Production, Preview, Development |
| DATABASE_URL | [fourni par Vercel] | Production, Preview |

5. **Cliquez sur** : "Save" après chaque variable

**IMPORTANT :** N'ajoutez PAS de secrets bancaires réels dans les variables d'environnement !

---

## ✅ VÉRIFICATION DU DÉPLOIEMENT

### Comment vérifier que tout fonctionne

1. **Ouvrez** : https://vrax-voyage.com
2. **Vérifiez** que la page se charge
3. **Testez** les fonctionnalités :
   - Navigation entre les onglets
   - Affichage des promotions
   - Système d'affiliation
   - Partage sur les réseaux sociaux
4. **Vérifiez** HTTPS (cadenas verte dans la barre d'adresse)

---

## 📊 COMPARAISON : DÉPLOIEMENT LOCAL vs VERCEL

| Aspect | Local | Vercel |
|--------|-------|---------|
| **Accessibilité** | localhost:3000 uniquement | 🌐 Public partout |
| **Performance** | Dépend de votre machine | 🚀 Très rapide |
| **HTTPS** | À configurer | ✅ Automatique |
| **Domaine** | .vercel.app | ✅ vrax-voyage.com |
| **Mises à jour** | Manuel | ✅ Automatique |
| **Coût** | 0€ | Gratuit |

---

## 🔄 FLUX DE TRAVAIL RECOMMANDÉ POUR LE DÉVELOPPEMENT

### Pour les nouvelles fonctionnalités

```bash
# 1. Créer une branche
git checkout -b feature/nouvelle-fonction

# 2. Apporter les modifications
# ...code...

# 3. Tester localement
bun run dev

# 4. Commiter
git add .
git commit -m "Ajouter: nouvelle fonction"

# 5. Pusher
git push origin feature/nouvelle-fonction

# 6. Créer une Pull Request sur GitHub
```

### Pour les corrections de bugs

```bash
# 1. Modifier et tester
# ...

# 2. Commiter directement sur main
git add .
git commit -m "Corriger: description du bug"

# 3. Pusher
git push origin main
```

---

## 📋 CHECKLIST DE DÉPLOIEMENT

### Avant de commencer

- [ ] Compte GitHub créé
- [ ] GitHub Desktop installé
- [ ] Domaine vrax-voyage.com acheté
- [ ] DNS Namecheap configuré (@ et www)
- [ ] Email redirection configurée

### Pendant le déploiement

- [ ] Dépôt GitHub créé
- [ ] Projet cloné ou ajouté dans GitHub Desktop
- [ ] Premier commit fait
- [ ] Vercel connecté à GitHub
- [ ] Déploiement lancé
- [ ] Domaine configuré sur Vercel
- [ ] Variables d'environnement ajoutées

### Après le déploiement

- [ ] https://vrax-voyage.com accessible
- [ ] HTTPS fonctionnel
- [ ] Toutes les fonctionnalités testées
- [ ] DNS Namecheap vérifié

---

## 💡 CONSEILS IMPORTANTS

### Sécurité

- ✅ **N'AJOUTEZ PAS** les secrets bancaires dans les variables d'environnement
- ✅ Utilisez des mots de passe forts pour GitHub
- ✅ Ne commitez JAMAIS de secrets dans le code
- ✅ Utilisez des variables d'environnement pour les clés API

### Performance

- ✅ Optimisez les images avant de les uploader
- ✅ Utilisez des requêtes optimisées avec Prisma
- ✅ Implémentez le caching pour les requêtes répétitives
- ✅ Utilisez les générateurs d'images statiques (Next.js)

### SEO

- ✅ Utilisez les méta-tags optimisés (déjà configurés)
- ✅ Créez un sitemap.xml
- ✅ Utilisez des balises sémantiques HTML5
- ✅ Optimisez les images avec des alt textes

---

## 🚨 RÉSOLUTION DES PROBLÈMES COURANTS

### Déploiement échoue

**Problème :** Vercel ne peut pas détecter Next.js
**Solution :** 
```bash
# Assurez-vous que next.config.js existe à la racine
# Vérifiez que vercel.json existe à la racine
```

### Variables d'environnement non accessibles

**Problème :** Les variables ne sont pas disponibles dans le code
**Solution :**
```typescript
// Utilisez process.env.NEXT_PUBLIC_VARIABLE
// Pas process.env.VARIABLE
```

### Erreur de build

**Problème :** Le build échoue avec des erreurs
**Solution :**
```bash
# Nettoyez le cache
rm -rf .next
bun run build
```

---

## 📞 SUPPORT

Pour toute question sur le déploiement :

- **Documentation Vercel** : https://vercel.com/docs
- **Documentation GitHub** : https://docs.github.com/en
- **Issues Vercel** : https://vercel.com/support

---

## 📝 LICENCE

MIT License - voir le fichier [LICENSE](LICENSE) pour les détails complets.

---

<div align="center">

**🌍 Vrax Voyage - Guide de Déploiement**

Made with ❤️ by [Vrax Voyage Team](https://vrax-voyage.com)

</div>
