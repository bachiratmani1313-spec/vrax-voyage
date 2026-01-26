# 🖥 Comment Commencer avec GitHub Desktop

## 📋 PRÉREQUIS

Avant de commencer, assurez-vous d'avoir :
- ✅ Compte GitHub créé (https://github.com/signup)
- ✅ GitHub Desktop téléchargé (https://desktop.github.com/)
- ✅ Email de confirmation vérifié

---

## 🎯 OBJECTIF

Ce guide vous apprendra à :
1. Installer et configurer GitHub Desktop
2. Cloner votre dépôt local
3. Faire vos premiers commits
4. Pousser vos modifications sur GitHub

---

## 📋 ÉTAPE 1 : PREMIÈRE OUVERTURE

### 1. Lancez GitHub Desktop

**Après installation**, vous verrez cette fenêtre** :

```
Welcome to GitHub Desktop
[ ] Start with a new project
[ ] Add an existing local repository
[ ] Continue working
```

**Choisissez** : ☑️ **"Start with a new project"**

---

### 2. Connectez votre compte

Si ce n'est pas déjà fait :

1. **Cliquez sur** : "Sign in to GitHub.com"
2. **Entrez** :
   - Email : bachiratman@vrax-voyages.be (ou l'email que vous avez utilisé)
   - Mot de passe : celui que vous avez choisi
3. **Cliquez sur** : "Sign in"

---

### 3. Authorisez Vercel (si demandé)

Parfois, lors du déploiement sur Vercel, vous devrez autoriser Vercel à accéder à votre compte GitHub :

1. **Cliquez sur** : "Continue with GitHub"
2. **Authorizez** Vercel avec votre compte
3. **Vercel peut scanner** vos dépôts maintenant

---

## 📋 ÉTAPE 2 : CLONER VOTRE DÉPÔT

### 1. Cliquez sur l'onglet "File"

En haut de l'interface GitHub Desktop.

---

### 2. Sélectionnez "Clone repository"

---

### 3. Entrez l'URL de votre dépôt

```
https://github.com/VOTRE_NOM_UTILISATEUR/vrax-voyage.git
```

### 4. Choisissez le dossier de destination

**Cherchez le dossier** : `/home/z/my-project`

C'est là où se trouve votre projet Vrax Voyage.

---

### 5. Cliquez sur "Clone"

**GitHub Desktop va** :
1. Télécharger tous les fichiers de votre dépôt
2. Les placer dans `/home/z/my-project/vrax-voyage/`
3. Afficher la progression en temps réel

**Patientez quelques minutes** (selon votre connexion internet).

---

## 📋 ÉTAPE 3 : PREMIER COMMIT

Une fois le clone terminé, vous verrez les fichiers dans GitHub Desktop.

### 1. Sélectionnez le dépôt "vrax-voyage"

Dans la barre latérale gauche, vous devriez voir :
```
Repositories
├─ vrax-voyage
│  ├─ Current branch: main
│  └─ Recent changes
```

---

### 2. Cliquez sur l'icône "Commit"

**En haut de l'interface**, cliquez sur l'icône Commit** (icône de livre avec un crochet).

---

### 3. Remplissez les détails du commit

Remplissez comme ceci :

```
Summary : Initial commit - Projet Vrax Voyage complet
Description : (optionnel) Ajouter une description plus détaillée si vous le souhaitez
Author : [Votre nom]
```

---

### 4. Cliquez sur "Commit"

**Votre premier commit est maintenant créé !**

---

## 📋 ÉTAPE 4 : POUSSER VERS GITHUB

### 1. Cliquez sur "Publish branch"

En haut de l'interface GitHub Desktop.

---

### 2. Sélectionnez la branche

Sélectionnez : **main** (votre branche principale).

---

### 3. Cliquez sur "Publish branch"

Vos fichiers seront uploadés vers GitHub.com !

---

### 4. Vérifiez sur GitHub

Allez sur : https://github.com/VOTRE_NOM_UTILISATEUR/vrax-voyage

Vous devriez voir tous vos fichiers :
- README.md
- .gitignore
- LICENSE
- vercel.json
- .env.example
- src/app/page.tsx
- etc.

---

## 🎯 CONSEILS POUR LES COMMITS

### Messages de commit clairs

✅ **Bon** : "Ajouter: Page contact" - Simple et clair
✅ **Bon** : "Corriger: Fix navigation bug" - Expliquez le problème
✅ **Bon** : "Mise à jour: V2.0 - Version avec nouvelles fonctionnalités"
✅ **Mauvais** : "fix bug" - Pas assez spécifique

### Format conventionnel

```
[type]: Ajouter: | Corriger: | Mise à jour: | Refactor: | etc.
[titre] brève description
```

Exemples :
- `fix: navigation bug` - Problème avec le menu hamburger
- `ajouter: page contact` - Nouvelle page de contact avec formulaire
- `refactor: api routes` - Optimisation des routes API
```

---

## 📋 ÉTAPE 5 : TRAVAILLER AVEC PLUSIEURS BRANCHES

Si vous travaillez sur plusieurs fonctionnalités en même temps :

### Créez une branche par fonctionnalité

```bash
git checkout -b feature/page-contact
```

### Faites vos modifications

Ajoutez la nouvelle page, testez-la, etc.

### Committez

```bash
git add .
git commit -m "Ajouter: Page contact"
```

### Pushez

```bash
git push origin feature/page-contact
```

### Créez une Pull Request sur GitHub

1. Allez sur github.com
2. Cliquez sur "Pull request"
3. Sélectionnez : feature/page-contact → main
4. Ajoutez votre description
5. Cliquez sur "Create pull request"

---

## 📋 ÉTAPE 6 : FUSIONNER (OPTIONNEL)

Une fois votre Pull Request approuvée :

1. Sur GitHub, cliquez sur "Merge pull request"
2. Les modifications seront fusionnées dans main
3. La branche feature peut être supprimée :
   ```bash
   git branch -d feature/page-contact
   ```

---

## 💡 ASTUCES PRO

### Pour éviter les erreurs courantes

✅ **Sauvegardez souvent** - Faites des commits réguliers
✅ **Commitez des messages clairs** - Pour comprendre l'historique
✅ **Pushez après chaque étape majeure** - Pour ne rien perdre
✅ **Lisez les messages de GitHub** - Il vous guideront en cas d'erreur

### Pour la collaboration

✅ **Utilisez les Pull Requests** - Pour faire une revue du code
✅ **Commentez les PR** - Pour donner du feedback constructif
✅ **Soyez courtois** - C'est une communauté open source !

---

## 📋 RÉSUMÉ

### Workflow complet

```
1. ☑️ Compte GitHub créé
2. ☑️ GitHub Desktop installé
3. ☑️ Dépôt cloné localement
4. ☑️ Premier commit fait
5. ☑️ Premier push fait
6. ⏳ Déploiement Vercel en cours
7. ⏳ Site accessible : vrax-voyage.com
```

---

## 🎯 PROCHAINE ÉTAPE APRÈS DÉPLOIEMENT

Une fois votre site en ligne, vous devez :

1. ✅ **Modifier** `src/app/page.tsx` pour utiliser `vrax-voyage.com`
2. ✅ **Ajouter** les vrais liens d'affiliation
3. ✅ **Configurer** les variables d'environnement sur Vercel
4. ✅ **S'inscrire** sur Booking.com, Airbnb, etc.
5. ✅ **Créer** les comptes réseaux sociaux
6. ✅ **Commencer** le marketing

---

## 📞 PROBLÈMES

### Clone ne fonctionne pas

**Vérifiez** :
1. URL du dépôt correcte ?
2. Votre compte GitHub est connecté ?
3. Vous avez les permissions sur le dépôt ?

### Commit ne fonctionne pas

**Vérifiez** :
1. Message de commit rédigé ?
2. Fichiers ajoutés ? (`git status`)
3. Y a-t-il des erreurs ?

### Push ne fonctionne pas

**Vérifiez** :
1. Avez-vous un accès internet ?
2. L'URL remote est correcte ?
3. Connexion GitHub toujours active ?

---

## 📞 BESOIN D'AIDE ?

### Ressources

- **Guide de déploiement** : `GUIDE-ULTRA-SIMPLE.md`
- **Guide détaillé** : `DEPLOIEMENT-GUIDE.md`
- **Support GitHub** : https://github.com/VOTRE_NOM_UTILISATEUR/vrax-voyage/issues
- **Support Vercel** : https://vercel.com/support

---

## 🎊 CONCLUSION

GitHub Desktop est votre outil principal pour :

✅ Cloner votre projet
✅ Commiter vos changements
✅ Pousser vers GitHub
✅ Gérer votre historique
✅ Collaborer avec d'autres développeurs

**Commencez maintenant et votre site sera bientôt en ligne !** 🚀

---

<div align="center">

**GitHub Desktop = Votre Commande Centre**

[📦 Clone] → [💾 Commit] → [🚀 Push]

</div>
