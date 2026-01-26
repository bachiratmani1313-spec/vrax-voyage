# 🚀 Guide Rapide de Déploiement - Vrax Voyage

## ✅ PRÉPARATION

1. ✅ **Téléchargez GitHub Desktop** : https://desktop.github.com/
2. ✅ **Créez votre compte GitHub** : https://github.com/signup
3. ✅ **Domaine acheté** : vrax-voyage.com
4. ✅ **DNS configuré** sur Namecheap

---

## 📋 ÉTAPES GITHUB (3 minutes)

### 1. Créez le dépôt

```
1. Connectez-vous à GitHub
2. Cliquez sur "+" → "New repository"
3. Repository name : vrax-voyage
4. Description : Agence de voyages en ligne - Comparateur de promotions
5. ☑ Public, ☑ Add README, ☑ Add .gitignore, ☑ MIT License
6. Cliquez : "Create repository"
```

### 2. Ouvrez GitHub Desktop

```
1. Ouvrez GitHub Desktop
2. File → Clone repository
3. Entrez URL : https://github.com/VOTRE_COMPTE/vrax-voyage.git
4. Choisissez dossier : /home/z/my-project
5. Cliquez : "Clone"
```

### 3. Commit initial

```
1. GitHub Desktop s'ouvre automatiquement
2. Vérifiez les fichiers : README.md, .gitignore, LICENSE, vercel.json, .env.example
3. File → Commit → "Initial commit - Projet Vrax Voyage complet"
```

---

## 🚀 ÉTAPES VERCEL (5 minutes)

### 4. Connectez Vercel à GitHub

```
1. Allez sur : https://vercel.com/
2. Cliquez sur "Log In"
3. "Continue with GitHub"
4. Authorisez Vercel
5. Vercel scanne vos dépôts
```

### 5. Déployez le projet

```
1. Cliquez sur "Add New..." → "Project"
2. Sélectionnez : vrax-voyage (votre dépôt)
3. Cliquez : "Import"
4. Next.js détecté automatiquement
5. Root Directory : ./ (default)
6. Cliquez : "Deploy"
```

### 6. Attendez ~2 minutes

Vercel va :
- Cloner le dépôt
- Installer les dépendances (bun install)
- Builder le projet (bun run build)
- Déployer sur leur infrastructure

---

## 🌐 ÉTAPE FINALE : AJOUTEZ LE DOMAINE

### 7. Configurez le domaine

```
1. Une fois déployé, Vercel vous demande : "Configure vrax-voyage.com?"
2. Cliquez sur : "Yes"
3. Vercel ajoutera le domaine à votre projet
4. Certificat SSL généré automatiquement
```

### 8. Testez le site

```
1. Allez sur : https://vrax-voyage.com
2. Vérifiez que la page se charge
3. Testez quelques fonctionnalités
4. Vérifiez HTTPS (cadenas verte dans la barre d'adresse)
```

---

## ✅ RÉSUMÉ

**Coût total du setup :**
- Domaine : 6,79$/an (déjà acheté)
- GitHub : GRATUIT
- Vercel : GRATUIT
- Total : 6,79$/an UNIQUEMENT

---

## 🔧 VARIABLES D'ENVIRONNEMENT

Ajoutez dans Vercel → Settings → Environment Variables :

```
NEXT_PUBLIC_APP_URL = https://vrax-voyage.com
NEXTAUTH_SECRET = [générer un secret aléatoire]
DATABASE_URL = [fourni par Vercel]
```

---

## 📞 SUPPORT

Problème de déploiement ?
→ Documentation Vercel : https://vercel.com/docs
→ Support GitHub : https://github.com/VOTRE_COMPTE/vrax-voyage/issues

---

<div align="center">

🚀 **VRAIMENT 2 MINUTES POUR DÉPLOYER !**

[Next.js](https://img.shields.io/badge/Next.js-16-black) | 
[GitHub](https://img.shields.io/badge/DEPLOYÉ-GITHUB-success-green) | 
[HTTPS](https://img.shields.io/badge/SSL-Active-success) | 
[vrax-voyage.com](https://img.shields.io/badge/domaine-vrax--voyage.com-blue)

---

**VOTRE SITE SERA ACCESSIBLE PARTOUT DANS LE MONDE !** 🌍✈️

</div>
