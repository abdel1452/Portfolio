# Instructions pour pousser tout le portfolio sur GitHub

## 📋 Étapes complètes

### 1. Créer le dépôt sur GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. **Nom du dépôt** : `portfolio`
3. **Description** : "Portfolio BTS SIO SLAM - Abdelmalek Elidrissi"
4. Cochez **"Public"**
5. **Ne cochez PAS** "Initialize this repository with a README"
6. Cliquez sur **"Create repository"**

### 2. Connecter et pousser le code

Une fois le dépôt créé, exécutez ces commandes dans PowerShell :

```powershell
cd "C:\Users\abdel\Downloads\portfolio-responsive-complete-main\portfolio-responsive-complete-main"

# Ajouter le remote
git remote add origin https://github.com/abdel1452/portfolio.git

# Vérifier que tout est bien commité
git status

# Pousser tout le code
git push -u origin main
```

### 3. Activer GitHub Pages

1. Allez dans votre dépôt GitHub : `github.com/abdel1452/portfolio`
2. Cliquez sur **"Settings"** (en haut)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"** :
   - Sélectionnez **"Deploy from a branch"**
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Cliquez sur **"Save"**

### 4. Attendre et vérifier

- Attendez **2-5 minutes**
- Votre portfolio sera accessible sur : `https://abdel1452.github.io/portfolio/`
- Vérifiez dans l'onglet **"Actions"** que le déploiement est réussi (icône verte)

---

## ✅ Fichiers importants inclus

- ✅ `index.html` - Page principale
- ✅ `.nojekyll` - Pour éviter les problèmes avec Jekyll
- ✅ `.github/workflows/deploy.yml` - Déploiement automatique
- ✅ Tous les assets (CSS, JS, images)
- ✅ Tous les fichiers de configuration

---

## 🚀 Après le déploiement

Votre portfolio sera accessible sur :
```
https://abdel1452.github.io/portfolio/
```

Vous pourrez ensuite :
- Partager cette URL
- L'ajouter dans votre CV
- L'ajouter dans votre profil LinkedIn
- L'ajouter dans votre bio GitHub
