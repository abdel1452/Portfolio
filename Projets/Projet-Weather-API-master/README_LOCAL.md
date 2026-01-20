# Weather API - Version Locale (Sans Serveur)

Cette version du projet fonctionne entièrement dans le navigateur, sans nécessiter de serveur Node.js.

## 🚀 Utilisation

### 1. Obtenir une clé API WeatherAPI

1. Allez sur [https://www.weatherapi.com/signup.aspx](https://www.weatherapi.com/signup.aspx)
2. Créez un compte gratuit
3. Copiez votre clé API

### 2. Ouvrir l'application

1. Ouvrez le fichier `public/index.html` dans votre navigateur
   - Double-cliquez sur le fichier, ou
   - Faites un clic droit → "Ouvrir avec" → votre navigateur

2. Configurez votre clé API
   - Entrez votre clé API dans le champ "Clé API WeatherAPI"
   - Cliquez sur "💾 Enregistrer la clé API"

3. Utilisez l'application
   - Cliquez sur "📍 Autoriser la géolocalisation"
   - Autorisez l'accès à votre position dans votre navigateur
   - Les données météo s'afficheront automatiquement
   - Vous pouvez enregistrer vos localisations avec votre humeur

## 📋 Fonctionnalités

- ✅ Géolocalisation automatique
- ✅ Données météo en temps réel
- ✅ Qualité de l'air (index DEFRA et PM2.5)
- ✅ Enregistrement des localisations dans le navigateur (localStorage)
- ✅ Liste de toutes les localisations enregistrées
- ✅ Fonctionne sans serveur, uniquement avec un navigateur

## 💾 Stockage des données

Les données sont stockées dans le **localStorage** de votre navigateur. Cela signifie :
- Les données restent sur votre ordinateur
- Elles persistent même après la fermeture du navigateur
- Vous pouvez les supprimer via le bouton "Supprimer tous les enregistrements"

## 🔧 Fichiers modifiés

- `public/index.html` - Application principale (fonctionne sans serveur)
- `public/all.html` - Liste des localisations (lit depuis localStorage)

## ⚠️ Notes importantes

- La clé API est stockée dans le localStorage de votre navigateur
- Les données météo nécessitent une connexion Internet
- La géolocalisation nécessite une autorisation du navigateur
- Pour fonctionner en HTTPS (production), vous devrez peut-être configurer CORS

## 🆘 Dépannage

**La géolocalisation ne fonctionne pas ?**
- Vérifiez que vous avez autorisé l'accès à la position dans votre navigateur
- Assurez-vous d'utiliser `localhost` ou HTTPS (pas HTTP sur un domaine distant)

**Les données météo ne s'affichent pas ?**
- Vérifiez que votre clé API est correctement configurée
- Vérifiez votre connexion Internet
- Consultez la console du navigateur (F12) pour les erreurs

**Les données ne s'enregistrent pas ?**
- Vérifiez que localStorage est activé dans votre navigateur
- Vérifiez la console du navigateur pour les erreurs
