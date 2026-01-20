# Weather API - Application Météo

Application web de météo fonctionnant entièrement côté client, sans serveur.

## 🚀 Utilisation

### Depuis le portfolio

1. Cliquez sur le projet "Weather API" dans la section projets
2. Le projet s'ouvrira dans un nouvel onglet
3. Configurez votre clé API WeatherAPI (gratuite sur [weatherapi.com](https://www.weatherapi.com/signup.aspx))
4. Autorisez la géolocalisation
5. Les données météo s'afficheront automatiquement

### En local

1. Ouvrez `index.html` dans votre navigateur
2. Configurez votre clé API
3. Utilisez l'application

## ⚠️ Important

- **CORS** : Si vous ouvrez le fichier directement (file://), l'API peut ne pas fonctionner à cause des restrictions CORS
- **Solution** : Utilisez un serveur web local (VS Code Live Server, Python http.server, etc.) ou déployez le projet
- **Géolocalisation** : Nécessite une connexion HTTPS ou localhost pour fonctionner

## 📋 Fonctionnalités

- ✅ Géolocalisation automatique
- ✅ Données météo en temps réel
- ✅ Qualité de l'air (index DEFRA et PM2.5)
- ✅ Stockage local des données (localStorage)
- ✅ Liste des localisations enregistrées

## 🔧 Technologies

- HTML5 / CSS3 / JavaScript
- API WeatherAPI
- localStorage
- Géolocalisation HTML5
