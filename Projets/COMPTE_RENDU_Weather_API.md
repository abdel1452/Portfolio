# Compte Rendu - Projet Weather API

## 📋 Informations générales

**Nom du projet** : Weather API - Application Météo  
**Date de création** : Projet BTS SIO SLAM  
**Auteur** : Abdelmalek Elidrissi  
**Type** : Application web météo avec géolocalisation  

---

## 🎯 Objectifs du projet

Développer une application web de météo qui permet :
- La consultation de la météo en temps réel basée sur la géolocalisation
- L'affichage des prévisions météorologiques (horaires et 7 jours)
- La sauvegarde de l'historique des localisations consultées
- L'affichage de la qualité de l'air
- Une interface utilisateur moderne et responsive

---

## 🛠️ Technologies utilisées

### Backend
- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express.js** : Framework web minimaliste pour Node.js (version 5.2.1)
- **SQLite3** : Base de données légère embarquée (version 5.1.7)
- **Node-fetch** : Module pour effectuer des requêtes HTTP vers l'API WeatherAPI (version 2.7.0)
- **Dotenv** : Gestion des variables d'environnement (version 17.2.3)

### Frontend
- **HTML5** : Structure sémantique de l'application
- **CSS3** : Styles et design responsive avec Bootstrap 5
- **JavaScript (ES6+)** : Interactivité et logique métier
- **Bootstrap 5** : Framework CSS pour le design responsive
- **Google Fonts** : Polices Inter et Poppins

### API externe
- **WeatherAPI.com** : Service météorologique fournissant les données météo complètes

---

## 📁 Structure du projet

```
Projet-Weather-API-master/
├── index.js                 # Serveur Express principal (292 lignes)
├── package.json             # Configuration npm et dépendances
├── package-lock.json        # Version verrouillée des dépendances
├── .gitignore              # Fichiers ignorés par Git
├── weatherApp.db           # Base de données SQLite (créée automatiquement)
├── weatherApp.db-journal   # Journal SQLite
├── weatherApp.sqbpro       # Projet SQLite
├── README.md               # Documentation principale
├── README_LOCAL.md         # Documentation locale
└── public/
    ├── index.html          # Page principale de l'application (~1450 lignes)
    ├── all.html            # Page d'affichage de l'historique
    ├── Images/
    │   └── Meteo.jpg       # Images du projet
    └── Meteo.jpg           # Image météo
```

---

## 🔧 Fonctionnalités implémentées

### 1. Géolocalisation automatique
- Détection de la position de l'utilisateur via l'API Geolocation du navigateur
- Récupération des coordonnées GPS (latitude/longitude)
- Gestion des erreurs de géolocalisation avec messages explicites
- Demande de permission utilisateur avec gestion des refus

### 2. Récupération des données météo
- **Météo actuelle** :
  - Température (en Celsius)
  - Conditions météorologiques (description, icônes)
  - Humidité
  - Vitesse et direction du vent
  - Pression atmosphérique
  - Visibilité
  - Indice UV
  
- **Prévisions météo** :
  - Prévisions horaires (prochaines 24 heures)
  - Prévisions sur 7 jours
  - Températures maximales et minimales
  - Probabilité de précipitations
  
- **Qualité de l'air** :
  - Indice DEFRA (UK Air Quality Index)
  - Concentration de PM2.5 (particules fines)
  - Niveaux de pollution

### 3. Base de données SQLite

#### Structure de la table `geoloc`
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Identifiant unique |
| `latitude` | REAL NOT NULL | Coordonnée latitude |
| `longitude` | REAL NOT NULL | Coordonnée longitude |
| `timestamp` | INTEGER NOT NULL | Date et heure de la requête (Unix timestamp) |
| `mood` | TEXT NOT NULL | Humeur de l'utilisateur (optionnel) |
| `pays` | TEXT | Nom du pays |
| `ville` | TEXT | Nom de la ville |
| `temperature` | REAL | Température enregistrée |
| `condition` | TEXT | Conditions météorologiques |
| `defra` | REAL | Indice de qualité de l'air DEFRA |
| `pm25` | REAL | Concentration de PM2.5 |

#### Fonctionnalités
- Insertion automatique des données après chaque consultation
- Récupération de l'historique complet
- Tri par date (du plus récent au plus ancien)
- Gestion des migrations de schéma (ajout de colonnes conditionnelles)

### 4. Configuration API
- Configuration de la clé API WeatherAPI via l'interface web (recommandé)
- Alternative : configuration via fichier `.env`
- Sauvegarde de la clé API dans la session serveur
- Validation de la clé API avant utilisation

### 5. Historique des localisations
- Page dédiée (`/all.html`) affichant toutes les localisations enregistrées
- Affichage formaté avec Bootstrap cards
- Tri par date (du plus récent au plus ancien)
- Affichage des informations météo enregistrées :
  - Date et heure
  - Localisation (ville, pays)
  - Température
  - Conditions météorologiques
  - Qualité de l'air (DEFRA, PM2.5)

---

## 🌐 Routes API exposées

### Routes GET

| Route | Description | Paramètres |
|-------|-------------|------------|
| `/` | Page principale de l'application | Aucun |
| `/all.html` | Page HTML affichant l'historique | Aucun |
| `/weather` | Récupère les données météo actuelles et prévisions | `lat`, `lon`, `apiKey`, `country` (optionnel) |
| `/forecast` | Récupère uniquement les prévisions météo | `lat`, `lon`, `apiKey` |
| `/all` | Récupère toutes les localisations sauvegardées (JSON) | Aucun |
| `/api/countries` | Liste des pays disponibles | Aucun |

### Routes POST

| Route | Description | Body JSON |
|-------|-------------|-----------|
| `/api` | Sauvegarde une localisation dans la base de données | `latitude`, `longitude`, `timestamp`, `mood`, `country`, `city`, `temperature`, `condition`, `defra`, `pm25` |

### Exemples d'utilisation

**GET /weather**
```javascript
GET /weather?lat=48.8566&lon=2.3522&apiKey=YOUR_API_KEY
```

**POST /api**
```json
{
  "lat": 48.8566,
  "long": 2.3522,
  "timestamp": 1234567890,
  "mood": "Happy",
  "country": "France",
  "city": "Paris",
  "temperature": 15.5,
  "condition": "Sunny",
  "defra": 2,
  "pm25": 10.5
}
```

---

## 📊 Schéma de base de données

```sql
CREATE TABLE IF NOT EXISTS geoloc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    timestamp INTEGER NOT NULL,
    mood TEXT NOT NULL,
    pays TEXT,
    ville TEXT,
    temperature REAL,
    condition TEXT,
    defra REAL,
    pm25 REAL
);
```

### Migrations
Le code gère automatiquement l'ajout de colonnes si elles n'existent pas déjà :
- `condition` : Conditions météorologiques
- `defra` : Indice de qualité de l'air DEFRA
- `pm25` : Concentration de PM2.5

---

## 🚀 Installation et démarrage

### Prérequis
- **Node.js** : Version 14 ou supérieure
- **npm** : Généralement inclus avec Node.js
- **Clé API WeatherAPI** : Gratuite sur [weatherapi.com](https://www.weatherapi.com/signup.aspx)

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   cd Projets/Projet-Weather-API-master
   npm install
   ```

2. **Configurer la clé API**
   
   **Option 1 - Via l'interface web (recommandé)** :
   - Lancer le serveur : `node index.js`
   - Ouvrir `http://localhost:3000`
   - Entrer la clé API dans la section "Configuration API"
   - Cliquer sur "Enregistrer la clé API"
   
   **Option 2 - Via fichier `.env`** :
   - Créer un fichier `.env` à la racine du projet
   - Ajouter : `WEATHER_API_KEY=votre_cle_api_ici`

3. **Lancer le serveur**
   ```bash
   node index.js
   ```

4. **Accéder à l'application**
   - Page principale : `http://localhost:3000`
   - Page historique : `http://localhost:3000/all.html`

---

## 💡 Points techniques remarquables

### Architecture
- **Architecture REST** : Routes API bien structurées et séparées
- **Séparation des responsabilités** : Code backend/frontend séparé
- **Base de données légère** : SQLite pour un stockage simple et efficace

### Gestion des erreurs
- Gestion complète des erreurs de géolocalisation
- Gestion des erreurs d'API externe avec messages explicites
- Validation des paramètres d'entrée
- Messages d'erreur explicites pour l'utilisateur

### Sécurité
- Validation des données entrantes
- Protection contre les injections SQL (utilisation de paramètres préparés)
- Gestion sécurisée de la clé API (masquage dans les logs)
- Gestion des erreurs CORS (serveur Express)

### Performance
- Requêtes SQL optimisées avec index automatique
- Gestion de la session pour la clé API
- Interface responsive pour différents appareils
- Chargement asynchrone des données météo

### Code qualité
- Code JavaScript moderne (ES6+)
- Utilisation de `async/await` pour les requêtes asynchrones
- Logs détaillés pour le débogage
- Gestion des erreurs avec try/catch

---

## 🐛 Difficultés rencontrées et solutions

### Problème 1 : Géolocalisation non disponible
**Problème** : L'API de géolocalisation nécessite une autorisation explicite de l'utilisateur.  
**Solution** : Ajout d'un message d'erreur explicite demandant à l'utilisateur d'autoriser la géolocalisation dans son navigateur. Gestion des cas où la géolocalisation n'est pas disponible.

### Problème 2 : Gestion des erreurs CORS
**Problème** : Les requêtes directes depuis le navigateur vers l'API WeatherAPI génèrent des erreurs CORS.  
**Solution** : Utilisation d'un serveur Express pour servir les fichiers statiques et agir comme proxy vers l'API externe, évitant ainsi les problèmes CORS.

### Problème 3 : Migration de schéma de base de données
**Problème** : Ajout de nouvelles colonnes à la table existante sans perdre les données.  
**Solution** : Ajout de colonnes conditionnelles avec gestion des erreurs pour les colonnes déjà existantes. Utilisation d'ALTER TABLE avec vérification des erreurs.

### Problème 4 : Gestion de la clé API
**Problème** : Stockage sécurisé de la clé API côté client ou serveur.  
**Solution** : Stockage de la clé API dans la session serveur Express, permettant une configuration unique par utilisateur sans exposer la clé dans le code client.

---

## 📈 Améliorations possibles

1. **Authentification utilisateur** : Système de comptes pour sauvegarder l'historique par utilisateur
2. **Graphiques** : Visualisation des données météo avec des graphiques (Chart.js, D3.js)
3. **Notifications** : Alertes météo personnalisées (p. ex., notification de pluie)
4. **Export de données** : Export de l'historique en CSV ou JSON
5. **Recherche de ville** : Recherche manuelle de villes en plus de la géolocalisation
6. **Mode hors-ligne** : Mise en cache pour consultation hors ligne (Service Workers)
7. **PWA** : Transformation en Progressive Web App avec installation sur mobile
8. **Tests unitaires** : Ajout de tests pour valider les fonctionnalités (Jest, Mocha)
9. **API REST complète** : Documentation Swagger/OpenAPI
10. **Multi-langue** : Internationalisation de l'interface

---

## 📚 Compétences développées

### Backend
- Développement d'API REST avec Node.js et Express
- Gestion de base de données SQLite
- Intégration d'API externes (WeatherAPI)
- Gestion des sessions et variables d'environnement
- Gestion des erreurs et logs

### Frontend
- Développement d'interfaces web interactives
- Utilisation de Bootstrap 5 pour le responsive design
- Gestion de la géolocalisation côté navigateur
- Manipulation du DOM avec JavaScript moderne
- Gestion asynchrone des données (fetch, async/await)

### Base de données
- Modélisation et gestion de base de données SQLite
- Création et migration de schémas
- Requêtes SQL optimisées
- Gestion de l'historique des données

### Général
- Architecture REST
- Sécurité web (protection SQL injection, gestion CORS)
- Documentation de projet
- Gestion de projet et organisation du code

---

## 🎓 Conclusion

Ce projet a permis de mettre en pratique les compétences en développement web full-stack. L'application combine efficacement les technologies backend (Node.js, Express) et frontend (HTML, CSS, JavaScript) pour créer une solution fonctionnelle et utilisable.

L'utilisation de SQLite pour la persistance des données et l'intégration d'une API externe démontre la capacité à travailler avec différents types de services et technologies. La gestion de la géolocalisation et l'interface utilisateur moderne montrent une bonne compréhension des technologies web modernes.

**Points forts** :
- Architecture bien structurée
- Interface utilisateur moderne et responsive
- Gestion complète des erreurs
- Documentation claire

**Prochaines étapes** : Amélioration de l'interface utilisateur, ajout de fonctionnalités avancées (graphiques, notifications), optimisation des performances et transformation en PWA.

---

*Compte rendu généré le : 2025-01-27*
