# Déploiement sur GitHub Pages

## 📋 Étapes pour déployer votre portfolio sur GitHub Pages

### 1. Créer le dépôt sur GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. **Nom du dépôt** : `portfolio` (ou un autre nom de votre choix)
3. **Description** : "Portfolio BTS SIO SLAM - Abdelmalek Elidrissi"
4. Cochez **"Public"**
5. **Ne cochez PAS** "Initialize this repository with a README"
6. Cliquez sur **"Create repository"**

### 2. Pousser votre code sur GitHub

Une fois le dépôt créé, exécutez ces commandes dans votre terminal :

```powershell
cd "C:\Users\abdel\Downloads\portfolio-responsive-complete-main\portfolio-responsive-complete-main"

# Vérifier que vous êtes sur la branche main
git branch

# Ajouter le remote (remplacez VOTRE_USERNAME par votre username GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/portfolio.git

# Pousser le code
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub** (probablement `abdel1452`)

### 3. Activer GitHub Pages

1. Allez sur votre dépôt GitHub (ex: `github.com/abdel1452/portfolio`)
2. Cliquez sur **"Settings"** (en haut du dépôt)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Cliquez sur **"Save"**

### 4. Accéder à votre portfolio

Après quelques minutes (2-5 minutes), votre portfolio sera accessible à :
```
https://VOTRE_USERNAME.github.io/portfolio/
```

Par exemple : `https://abdel1452.github.io/portfolio/`

---

## 🔄 Mettre à jour votre portfolio

Chaque fois que vous modifiez votre portfolio :

```powershell
cd "C:\Users\abdel\Downloads\portfolio-responsive-complete-main\portfolio-responsive-complete-main"

git add .
git commit -m "Description de vos modifications"
git push
```

Les modifications seront visibles sur GitHub Pages après quelques minutes.

---

## ✅ Vérifications importantes

- ✅ Le fichier `index.html` est à la racine du dépôt
- ✅ Tous les chemins sont relatifs (pas de chemins absolus)
- ✅ Le fichier `.nojekyll` est présent (pour éviter les problèmes avec Jekyll)
- ✅ Le workflow GitHub Actions est configuré (fichier `.github/workflows/deploy.yml`)

---

## 🐛 Résolution de problèmes

### Le site ne s'affiche pas
- Vérifiez que le dépôt est **Public**
- Attendez 5-10 minutes après l'activation
- Vérifiez l'onglet "Actions" dans votre dépôt pour voir s'il y a des erreurs

### Les images ne s'affichent pas
- Vérifiez que tous les chemins d'images sont relatifs (commencent par `assets/` ou `./`)
- Vérifiez que les fichiers images existent dans le dépôt

### Les styles ne s'appliquent pas
- Vérifiez que le chemin vers `assets/css/styles.css` est correct
- Ouvrez la console du navigateur (F12) pour voir les erreurs

---

## 📝 Note importante

Le fichier `.nojekyll` est nécessaire pour que GitHub Pages serve correctement les fichiers statiques sans passer par Jekyll.

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) permet un déploiement automatique à chaque push sur la branche `main`.
