# Weather API - Application Météo

Application web de météo utilisant la géolocalisation, Node.js, Express et SQLite. Affiche la température, les conditions météorologiques, la qualité de l'air et les prévisions météo.

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (généralement inclus avec Node.js)
- Une clé API WeatherAPI (gratuite sur [weatherapi.com](https://www.weatherapi.com/signup.aspx))

### Installation des dépendances

```bash
cd Projets/Projet-Weather-API-master
npm install
```

### Configuration de la clé API

Vous avez deux options pour configurer votre clé API WeatherAPI :

**Option 1 : Via l'interface web (recommandé)**
1. Lancez le serveur (voir ci-dessous)
2. Ouvrez `http://localhost:3000`
3. Entrez votre clé API dans la section "Configuration API"
4. Cliquez sur "Enregistrer la clé API"

**Option 2 : Via un fichier .env**
1. Créez un fichier `.env` à la racine du projet
2. Ajoutez la ligne suivante :
   ```
   WEATHER_API_KEY=votre_cle_api_ici
   ```

### Lancement du serveur

```bash
node index.js
```

Le serveur démarre sur `http://localhost:3000`

### Accès à l'application

Ouvrez votre navigateur et accédez à :
- **Page principale** : `http://localhost:3000`
- **Page historique** : `http://localhost:3000/all.html`

## 📋 Fonctionnalités

- ✅ **Géolocalisation automatique** : Détection de votre position via le navigateur
- ✅ **Météo actuelle** : Température, conditions, qualité de l'air
- ✅ **Prévisions météo** : Prévisions horaires et sur 7 jours
- ✅ **Historique** : Sauvegarde de toutes vos localisations dans une base SQLite
- ✅ **Interface moderne** : Design responsive avec Bootstrap et polices modernes

## 🛠️ Technologies utilisées

- **Backend** : Node.js, Express
- **Base de données** : SQLite3
- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS** : Bootstrap 5
- **API externe** : WeatherAPI.com
- **Polices** : Inter & Poppins (Google Fonts)

## 📁 Structure du projet

```
Projet-Weather-API-master/
├── index.js              # Serveur Node.js/Express
├── package.json          # Dépendances npm
├── weatherApp.db         # Base de données SQLite (créée automatiquement)
├── public/
│   ├── index.html        # Page principale
│   └── all.html          # Page historique
└── README.md             # Ce fichier
```

## 🔧 Routes API

Le serveur expose les routes suivantes :

- `GET /` - Page principale
- `GET /weather?lat={latitude}&lon={longitude}&apiKey={clé}` - Récupère les données météo actuelles et prévisions
- `GET /forecast?lat={latitude}&lon={longitude}&apiKey={clé}` - Récupère uniquement les prévisions
- `POST /api` - Sauvegarde une localisation dans la base de données
- `GET /all` - Récupère toutes les localisations sauvegardées
- `GET /api/countries` - Liste des pays disponibles

## 📝 Notes importantes

- L'application nécessite une connexion Internet pour appeler l'API WeatherAPI
- La géolocalisation nécessite l'autorisation du navigateur
- Les données sont stockées localement dans la base SQLite `weatherApp.db`
- La clé API peut être configurée via l'interface web ou le fichier `.env`

## 🐛 Dépannage

**Le serveur ne démarre pas**
- Vérifiez que Node.js est installé : `node --version`
- Vérifiez que les dépendances sont installées : `npm install`

**Erreur "Cannot GET /weather"**
- Assurez-vous que le serveur Node.js est bien démarré
- Vérifiez que vous accédez à `http://localhost:3000` et non à un autre port

**Les données météo ne s'affichent pas**
- Vérifiez que votre clé API est correctement configurée
- Vérifiez que vous avez autorisé la géolocalisation dans votre navigateur
- Consultez la console du navigateur (F12) pour voir les erreurs

**Erreur CORS**
- L'application fonctionne uniquement via le serveur Node.js sur `http://localhost:3000`
- N'ouvrez pas directement le fichier HTML dans le navigateur

## 📄 Licence

Ce projet est fourni à des fins éducatives.
