# Instructions pour publier sur GitHub Pages

## 📋 Étapes pour publier votre portfolio

### 1. Créer un dépôt sur GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**
3. Nommez votre dépôt : `portfolio` (ou `portfolio-abdelmalek`)
4. **IMPORTANT** : Ne cochez PAS "Initialize this repository with a README"
5. Cliquez sur **"Create repository"**

### 2. Connecter votre dépôt local à GitHub

Une fois le dépôt créé, GitHub vous donnera des instructions. Exécutez ces commandes dans votre terminal :

```bash
cd "C:\Users\abdel\Downloads\portfolio-responsive-complete-main\portfolio-responsive-complete-main"
git remote add origin https://github.com/VOTRE_USERNAME/portfolio.git
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub** (probablement `abdel1452`)

### 3. Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **"Settings"** (en haut du dépôt)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez **"Deploy from a branch"**
5. Choisissez la branche **"main"** et le dossier **"/ (root)"**
6. Cliquez sur **"Save"**

### 4. Accéder à votre portfolio

Après quelques minutes, votre portfolio sera accessible à :
```
https://VOTRE_USERNAME.github.io/portfolio/
```

Par exemple : `https://abdel1452.github.io/portfolio/`

## 🔄 Mettre à jour votre portfolio

Chaque fois que vous modifiez votre portfolio :

```bash
cd "C:\Users\abdel\Downloads\portfolio-responsive-complete-main\portfolio-responsive-complete-main"
git add .
git commit -m "Description de vos modifications"
git push
```

Les modifications seront visibles sur GitHub Pages après quelques minutes.

## ⚠️ Note importante

Assurez-vous que votre fichier `index.html` est à la racine du dépôt (ce qui est déjà le cas).
