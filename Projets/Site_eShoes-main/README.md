# SIO Shoes - Application E-commerce Symfony

Application e-commerce développée avec Symfony pour la vente de chaussures en ligne.

## 🚀 Prérequis

- **PHP** >= 8.2
- **Composer** (gestionnaire de dépendances PHP)
- **Docker** et **Docker Compose** (pour la base de données)
- **Node.js** et **npm** (pour les assets)
- **Symfony CLI** (optionnel, mais recommandé)

## 📦 Installation

### 1. Installer les dépendances PHP

```bash
cd Projets/Site_eShoes-main
composer install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Copiez le fichier .env et modifiez les valeurs selon vos besoins
cp .env .env.local
```

Modifiez les variables suivantes dans `.env.local` :

```env
# Base de données
DATABASE_URL="postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8"

# Clés Stripe (pour les paiements)
STRIPE_PUBLIC_KEY="votre_clé_publique_stripe"
STRIPE_SECRET_KEY="votre_clé_secrète_stripe"

# Mailer (pour les emails de confirmation)
MAILER_DSN="smtp://localhost:1025"
```

### 3. Démarrer Docker Compose (base de données)

```bash
docker compose up -d
```

Cela démarre un conteneur PostgreSQL sur le port 5432.

### 4. Créer la base de données et exécuter les migrations

```bash
# Créer la base de données
php bin/console doctrine:database:create

# Exécuter les migrations
php bin/console doctrine:migrations:migrate
```

### 5. Installer les assets frontend

```bash
npm install
npm run build
```

### 6. Créer un utilisateur administrateur (optionnel)

```bash
php bin/console app:create-admin
```

Ou créez un utilisateur via l'interface d'inscription.

## 🏃 Lancer l'application

### Option 1 : Utiliser le serveur PHP intégré (développement)

```bash
symfony server:start
```

Ou avec PHP natif :

```bash
php -S localhost:8000 -t public
```

L'application sera accessible sur : `http://localhost:8000`

### Option 2 : Utiliser Docker (production)

```bash
docker compose up -d
```

Puis configurez un serveur web (Apache/Nginx) pour pointer vers le dossier `public/`.

## 📁 Structure du projet

```
Site_eShoes-main/
├── config/          # Configuration Symfony
├── public/          # Point d'entrée web (index.php)
├── src/
│   ├── Controller/  # Contrôleurs
│   ├── Entity/      # Entités Doctrine
│   ├── Form/        # Formulaires
│   └── Repository/  # Repositories
├── templates/       # Templates Twig
├── migrations/      # Migrations de base de données
└── assets/          # Assets frontend (JS/CSS)
```

## 🔑 Fonctionnalités

- ✅ Gestion des produits et catégories
- ✅ Panier d'achat
- ✅ Système de commandes
- ✅ Paiement Stripe intégré
- ✅ Interface d'administration
- ✅ Gestion des utilisateurs
- ✅ Génération de factures PDF
- ✅ Envoi d'emails de confirmation

## 🛠️ Commandes utiles

```bash
# Vider le cache
php bin/console cache:clear

# Créer une nouvelle migration
php bin/console make:migration

# Créer une entité
php bin/console make:entity

# Créer un contrôleur
php bin/console make:controller

# Voir les routes disponibles
php bin/console debug:router
```

## 📝 Notes importantes

- **Base de données** : Le projet utilise PostgreSQL. Assurez-vous que Docker est démarré avant de lancer l'application.
- **Stripe** : Pour tester les paiements, utilisez les clés de test Stripe (commencent par `pk_test_` et `sk_test_`).
- **Environnement** : En développement, utilisez `.env.local` pour vos configurations personnelles.

## 🐛 Dépannage

**Erreur de connexion à la base de données**
- Vérifiez que Docker Compose est démarré : `docker compose ps`
- Vérifiez les variables `DATABASE_URL` dans `.env.local`

**Erreur 404 sur les routes**
- Videz le cache : `php bin/console cache:clear`
- Vérifiez que le serveur web pointe vers le dossier `public/`

**Erreur lors de l'installation des dépendances**
- Vérifiez votre version de PHP : `php -v` (doit être >= 8.2)
- Vérifiez que Composer est à jour : `composer self-update`

## 📞 Support

Pour toute question ou problème, consultez la documentation Symfony : https://symfony.com/doc/current/index.html
