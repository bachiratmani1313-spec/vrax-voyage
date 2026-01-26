# ✅ CHECK-LIST DE DÉPLOIEMENT - VRAX VOYAGE

## 🎯 OBJECTIF

Déployer vrax-voyage.com sur Vercel avec GitHub Desktop en moins de 10 minutes.

---

## 📋 PRÉPARATION (AVANT DE COMMENCER)

### Vérifiez que vous avez tout
- [ ] Compte GitHub créé (https://github.com/signup)
- [ ] Email de compte GitHub vérifié
- [ ] GitHub Desktop installé
- [ ] Domaine vrax-voyage.com acheté (6,79$/an)
- [ ] DNS Namecheap configuré (@ et www vers 76.76.21.21)
- [ ] Email redirection configurée (contact@vrax-voyage.com → votre Gmail)
- [ ] Projet Vrax à `/home/z/my-project`

---

## 📋 ÉTAPE 1 : GITHUB (5 minutes)

### Créez le dépôt
- [ ] Allez sur : https://github.com
- [ ] Connectez-vous
- [ ] Cliquez sur "+" → "New repository"
- [ ] Repository name : vrax-voyage
- [ ] Description : Agence de voyages en ligne
- [ ] ☑️ Public
- [ ] ☑️ Add a README file
- [ ] ☑️ Add .gitignore
- [ ] ☑️ Choose a license : MIT License
- [ ] Cliquez : "Create repository"

### Téléchargez GitHub Desktop
- [ ] Allez sur : https://desktop.github.com/
- [ ] Téléchargez : https://desktop.github.com/
- [ ] Exécutez le fichier
- [ ] Installez avec options par défaut
- [ ] Cochez : "Log in automatically"

### Connectez GitHub Desktop
- [ ] Ouvrez GitHub Desktop
- [ ] Cliquez sur "File" → "Clone repository"
- [ ] Entrez URL : https://github.com/VOTRE_NOM_UTILISATEUR/vrax-voyage.git
- [ ] Choisir dossier : /home/z/my-project
- [ ] Cliquez : "Clone"
- [ ] Attendez que tous les fichiers soient copiés

---

## 📋 ÉTAPE 2 : PREMIER COMMIT (2 minutes)

### Dans GitHub Desktop
- [ ] Sélectionnez le dépôt : vrax-voyage
- [ ] Vérifiez que vous voyez : README.md, .gitignore, LICENSE, vercel.json
- [ ] Cliquez sur "Commit" (icône de livre en haut)
- [ ] Remplissez : "Initial commit - Projet Vrax Voyage complet"
- [ ] Cliquez : "Commit"

### Poussez vers GitHub
- [ ] Cliquez sur "Publish branch" (en haut)
- [ ] Sélectionnez : main
- [ ] Cliquez : "Publish branch"
- [ ] Attendez que le push soit terminé

### Vérifiez
- [ ] Allez sur : https://github.com/VOTRE_NOM_UTILISATEUR/vrax-voyage
- [ ] Vérifiez que vous voyez tous les fichiers
- [ ] Notez l'URL de votre dépôt pour la prochaine étape

---

## 📋 ÉTAPE 3 : VERCEL (5 minutes)

### Connectez Vercel à GitHub
- [ ] Allez sur : https://vercel.com/
- [ ] Cliquez sur "Log In"
- [ ] Cliquez sur "Continue with GitHub"
- [ ] Connectez-vous avec votre compte GitHub
- [ ] Authorisez Vercel à accéder à vos dépôts

### Importez le projet
- [ ] Cliquez sur "Add New..." → "Project"
- [ ] Sélectionnez : "vrax-voyage" (dans la liste)
- [ ] Cliquez sur : "Import"
- [ ] Vercel détecte automatiquement Next.js
- [ ] Root Directory : ./ (laissez vide)
- [ ] Cliquez : "Deploy"
- [ ] Attendez ~2 minutes

### Configurez le domaine
- [ ] Une fois déployé, Vercel demande : "Configure vrax-voyage.com?"
- [ ] Cliquez sur : "Yes"
- [ ] Attendez que Vercel génère le certificat SSL

---

## 📋 ÉTAPE 4 : VÉRIFICATION (2 minutes)

### Testez le site
- [ ] Ouvrez : https://vrax-voyage.com
- [ ] Vérifiez que la page se charge
- [ ] Testez la navigation
- [ ] Vérifiez HTTPS (cadenas verte dans la barre d'adresse)
- [ ] Testez quelques fonctionnalités

### Configurez les variables d'environnement (IMPORTANT)
- [ ] Allez sur Vercel dashboard
- [ ] Sélectionnez : Projet → vrax-voyage
- [ ] Cliquez : Settings → Environment Variables
- [ ] Ajoutez : NEXT_PUBLIC_APP_URL = https://vrax-voyage.com
- [ ] Ajoutez : NEXTAUTH_SECRET = [généré avec: openssl rand -base64 32]
- [ ] Cliquez sur "Save"

---

## 📋 ÉTAPE 5 : POST-DÉPLOIEMENT (À FAIRE PLUS TARD)

### Obtenir les liens d'affiliation
- [ ] S'inscrire sur Booking.com : https://partners.booking.com/
- [ ] S'inscrire sur Airbnb : https://www.airbnb.com/partners/affiliate
- [ ] Obtenir liens pour les 6 autres partenaires

### Modifier le code Vrax
- [ ] Remplacer les liens démo par les vrais liens
- [ ] Ajouter les liens d'affiliation dans la base de données
- [ ] Créer les pages de redirection

### Créer les réseaux sociaux
- [ ] Instagram : @vrax.voyage.com
- [ ] TikTok : @vrax.voyage.com
- [ ] Facebook : Vrax Voyage

---

## 📊 RÉSUMÉ DU SETUP

| Élément | Coût | Temps | Statut |
|---------|------|-------|--------|
| **Compte GitHub** | Gratuit | 3 min | ⏳ |
| **GitHub Desktop** | Gratuit | 2 min | ⏳ |
| **Dépôt créé** | Gratuit | 2 min | ⏳ |
| **Premier commit** | Gratuit | 1 min | ⏳ |
| **Premier push** | Gratuit | 1 min | ⏳ |
| **Vercel déployé** | Gratuit | 3 min | ⏳ |
| **Domaine ajouté** | Gratuit | 1 min | ⏳ |
| **Variables configurées** | Gratuit | 2 min | ⏳ |
| **Testé et fonctionnel** | Gratuit | 2 min | ⏳ |
| **TOTAL ESTIMÉ** | 0€ | 16 min | ⏳ |

---

## 🎯 CE QUI SE PASSE APRÈS DÉPLOIEMENT

Une fois toutes les étapes cochées, votre site est **EN LIGNE** !

- ✅ **URL publique** : https://vrax-voyage.com
- ✅ **HTTPS actif** : Certificat SSL
- ✅ **Hébergement** : Gratuit sur Vercel
- ✅ **DNS configuré** : Pointe vers Vercel
- ✅ **Emails professionnels** : contact@vrax-voyage.com, info@vrax-voyage.com
- ✅ **Réseaux sociaux** : Préparés

---

## 💡 CONSEILS FINAUX

### Avant de commencer
✅ **Lisez** le fichier `GUIDE-ULTRA-SIMPLE.md` pour comprendre les étapes
✅ **Prenez votre temps** - Ne vous précipitez pas
✅ **Assurez-vous d'avoir une connexion internet stable**
✅ **Ayez votre compte GitHub à portée de main**

### Pendant le déploiement
✅ **Ne fermez pas** GitHub Desktop pendant le clone
✅ **Ne fermez pas** Vercel pendant le déploiement
✅ **Attendez** que chaque étape soit terminée avant la suivante
✅ **Lisez les messages** d'erreur et suivez les instructions

### Après le déploiement
✅ **Testez** votre site en mode privé d'abord
✅ **Partagez** avec quelques amis pour feedback
✅ **Soyez patient** - la DNS peut prendre 24-48h à se propager
✅ **Commencez petit** - recrutez quelques affiliés d'abord

---

## 📞 SAVOIR OÙ DEMANDER DE L'AIDE

### Problèmes de déploiement Vercel
- 📚 Documentation : https://vercel.com/docs
- 💬 Support : https://vercel.com/support
- 📖 Issues : https://vercel.com/docs/troubleshooting

### Problèmes Git
- 📚 Guide Git : https://docs.github.com/
- 📖 GitHub Desktop : https://desktop.github.com/

### Questions sur le projet Vrax
- 📚 Documentation : Lisez les fichiers dans ce dossier
- 📧 Email : contact@vrax-voyage.com
- 🌐 Site : https://vrax-voyage.com (une fois déployé)

---

## 🎊 CONGRATULATIONS !

🎉 Vous êtes sur le point de déployer votre projet !

**Suivez la check-liste étape par étape et cochez chaque case quand terminé !**

---

<div align="center">

## 🚀 VOTRE SITE SERA ACCESSIBLE PARTOUT

### [ ] vrax-voyage.com
### [ ] https://www.vraxis.voyages.com
### [ ] Hébergé gratuitement
### [ ] Avec HTTPS sécurisé

---

**Commencez maintenant !** 🎯

</div>
