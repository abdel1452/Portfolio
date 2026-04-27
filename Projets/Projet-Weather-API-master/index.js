const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
require('dotenv').config();
const app = express();
app.use(express.json({limit: '1mb'}));
 
const db = new sqlite3.Database('./weatherApp.db', (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Connecté à la base de données SQLite.');
    }
});
db.serialize(() => {
    const sql = `
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
        )
    `;

    db.run(sql, err => {
        if (err) {
            console.error("❌ Erreur création table :", err.message);
        } else {
            console.log("✅ Table geoloc prête");
        }
    });
});
db.serialize(() => {
    
    // Ajouter les colonnes si elles n'existent pas déjà
    db.run(`ALTER TABLE geoloc ADD COLUMN condition TEXT`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            // Ignorer l'erreur si la colonne existe déjà
        }
    });
    db.run(`ALTER TABLE geoloc ADD COLUMN defra REAL`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            // Ignorer l'erreur si la colonne existe déjà
        }
    });
    db.run(`ALTER TABLE geoloc ADD COLUMN pm25 REAL`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            // Ignorer l'erreur si la colonne existe déjà
        }
    });
});
 
 
function Inserer(lat, long, timestamp, mood, pays, ville, temperature, condition, defra, pm25) {
    const sql = `
        INSERT INTO geoloc
        (latitude, longitude, timestamp, mood, pays, ville, temperature, condition, defra, pm25)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [lat, long, timestamp, mood, pays, ville, temperature, condition, defra, pm25],
        function (err) {
            if (err) {
                console.error("❌ ERREUR SQLITE :", err.message);
            } else {
                console.log("✅ INSERT OK, ID =", this.lastID);
            }
        }
    );
}

 
function Afficher(callback) {
    db.all(`SELECT * FROM geoloc ORDER BY timestamp DESC`, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

function databaseInsert(lat, long, timestamp, mood, pays, ville, temperature, condition, defra, pm25) {
    Inserer(lat, long, timestamp, mood, pays, ville, temperature, condition, defra, pm25);
}
 
app.post('/api', (request, response) => {
    console.log('I got a request!');
    console.log(request.body);

    const { lat, long, mood, country, city, condition, temperature, defra, pm25 } = request.body;
    const timestamp = Date.now();
    
    const pays = country || '';
    const ville = city || '';

    // Insertion dans la base de données avec toutes les données
    databaseInsert(lat, long, timestamp, mood, pays, ville, temperature, condition, defra, pm25);

    response.json({
        status: 'success',
        latitude: lat,
        longitude: long,
        timestamp: timestamp,
        mood: mood,
        pays: pays,
        ville: ville,
        temperature: temperature,
        condition: condition,
        defra: defra,
        pm25: pm25
    });
});
 
// Route GET /weather pour récupérer les données météo directement
app.get('/weather', async (request, response) => {
    try {
        const { country, lat, lon, apiKey } = request.query;
        
        // Utiliser la clé API depuis la requête ou depuis les variables d'environnement
        const weatherApiKey = apiKey || process.env.WEATHER_API_KEY;
        
        console.log('🔑 Clé API:', weatherApiKey ? weatherApiKey.substring(0, 10) + '...' : 'AUCUNE');
        console.log('📍 Coordonnées:', lat, lon);
        console.log('🌍 Pays:', country);
        
        if (!weatherApiKey) {
            return response.status(400).json({ 
                status: 'error', 
                message: 'Clé API WeatherAPI requise. Veuillez la configurer dans l\'interface.' 
            });
        }
        
        let apiUrl;
        
        // Si un pays est fourni, utiliser le nom du pays
        if (country) {
            apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${encodeURIComponent(country)}&days=7&aqi=yes&alerts=yes`;
        } else if (lat && lon) {
            // Utiliser les coordonnées avec forecast pour avoir les données complètes
            apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=7&aqi=yes&alerts=yes`;
        } else {
            return response.status(400).json({ 
                status: 'error', 
                message: 'Coordonnées (lat, lon) ou pays requis' 
            });
        }
        
        console.log('🌤️ Appel API WeatherAPI:', apiUrl.replace(weatherApiKey, 'API_KEY_HIDDEN'));
        
        const weatherResponse = await fetch(apiUrl);
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
            console.log('✅ Données météo récupérées avec succès');
            response.json(weatherData);
        } else {
            console.error('❌ Erreur API WeatherAPI:', weatherData);
            response.status(weatherResponse.status).json(weatherData);
        }
    } catch (error) {
        console.error('❌ Erreur:', error);
        response.status(500).json({
            status: 'error',
            message: 'Erreur lors de la récupération météo: ' + error.message
        });
    }
});

// Route GET /forecast pour récupérer les prévisions météo
app.get('/forecast', async (request, response) => {
    try {
        const { lat, lon, apiKey } = request.query;
        
        // Utiliser la clé API depuis la requête ou depuis les variables d'environnement
        const weatherApiKey = apiKey || process.env.WEATHER_API_KEY;
        
        console.log('🔑 Clé API (forecast):', weatherApiKey ? weatherApiKey.substring(0, 10) + '...' : 'AUCUNE');
        console.log('📍 Coordonnées (forecast):', lat, lon);
        
        if (!weatherApiKey) {
            return response.status(400).json({ 
                status: 'error', 
                message: 'Clé API WeatherAPI requise. Veuillez la configurer dans l\'interface.' 
            });
        }
        
        if (!lat || !lon) {
            return response.status(400).json({ 
                status: 'error', 
                message: 'Coordonnées (lat, lon) requises' 
            });
        }
        
        // Appel à l'API WeatherAPI pour les prévisions (7 jours avec prévisions horaires)
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=7&aqi=yes&alerts=yes`;
        
        console.log('📅 Appel API Prévisions:', apiUrl.replace(weatherApiKey, 'API_KEY_HIDDEN'));
        
        const forecastResponse = await fetch(apiUrl);
        const forecastData = await forecastResponse.json();

        if (forecastResponse.ok) {
            console.log('✅ Prévisions récupérées avec succès');
            response.json(forecastData);
        } else {
            console.error('❌ Erreur API WeatherAPI (forecast):', forecastData);
            response.status(forecastResponse.status).json(forecastData);
        }
    } catch (error) {
        console.error('❌ Erreur:', error);
        response.status(500).json({
            status: 'error',
            message: 'Erreur lors de la récupération des prévisions: ' + error.message
        });
    }
});

// Route GET /all pour récupérer toutes les données enregistrées
app.get('/all', (request, response) => {
    Afficher((err, rows) => {
        if (err) {
            response.status(500).json({ status: 'error', message: err.message });
        } else {
            response.json({ status: 'success', data: rows });
        }
    });
});

// Route GET /api/countries pour les sensors
app.get('/api/countries', (request, response) => {
    const countries = [
        { name: 'France', capital: 'Paris', lat: 48.8566, lon: 2.3522 },
        { name: 'United Kingdom', capital: 'London', lat: 51.5074, lon: -0.1278 },
        { name: 'Germany', capital: 'Berlin', lat: 52.5200, lon: 13.4050 },
        { name: 'Spain', capital: 'Madrid', lat: 40.4168, lon: -3.7038 },
        { name: 'Italy', capital: 'Rome', lat: 41.9028, lon: 12.4964 },
        { name: 'United States', capital: 'Washington', lat: 38.9072, lon: -77.0369 },
        { name: 'Canada', capital: 'Ottawa', lat: 45.4215, lon: -75.6972 },
        { name: 'Japan', capital: 'Tokyo', lat: 35.6762, lon: 139.6503 },
        { name: 'China', capital: 'Beijing', lat: 39.9042, lon: 116.4074 },
        { name: 'India', capital: 'New Delhi', lat: 28.6139, lon: 77.2090 },
        { name: 'Australia', capital: 'Canberra', lat: -35.2809, lon: 149.1300 },
        { name: 'Brazil', capital: 'Brasilia', lat: -15.7942, lon: -47.8822 },
        { name: 'Mexico', capital: 'Mexico City', lat: 19.4326, lon: -99.1332 },
        { name: 'Russia', capital: 'Moscow', lat: 55.7558, lon: 37.6173 },
        { name: 'South Korea', capital: 'Seoul', lat: 37.5665, lon: 126.9780 },
        { name: 'Argentina', capital: 'Buenos Aires', lat: -34.6118, lon: -58.3960 },
        { name: 'Morocco', capital: 'Rabat', lat: 34.0209, lon: -6.8416 },
        { name: 'Egypt', capital: 'Cairo', lat: 30.0444, lon: 31.2357 },
        { name: 'South Africa', capital: 'Cape Town', lat: -33.9249, lon: 18.4241 },
        { name: 'Turkey', capital: 'Ankara', lat: 39.9334, lon: 32.8597 }
    ];
    
    response.json({ status: 'success', data: countries });
});

// Servir les fichiers statiques APRÈS les routes API
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir index.html à la racine
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log('📄 Servir index.html depuis:', indexPath);
    res.sendFile(indexPath);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('✅ Serveur démarré sur http://localhost:3000');
    console.log('📁 Répertoire de travail:', __dirname);
    console.log('📁 Fichiers statiques servis depuis:', path.join(__dirname, 'public'));
    console.log('🌐 Accédez à l\'application sur: http://localhost:3000');
    console.log('📋 Routes disponibles:');
    console.log('   - GET  /              → Page d\'accueil');
    console.log('   - GET  /weather       → API météo');
    console.log('   - POST /api           → Enregistrer données');
    console.log('   - GET  /all           → Liste des données');
});

 