# Guide d'installation rapide - SIO Shoes

## Installation en 5 étapes

### 1️⃣ Installer les dépendances

```bash
cd Projets/Site_eShoes-main
composer install
```

### 2️⃣ Démarrer la base de données

```bash
docker compose up -d
```

### 3️⃣ Configurer l'environnement

Créez `.env.local` et configurez :

```env
DATABASE_URL="postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8"
```

### 4️⃣ Créer la base de données

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

### 5️⃣ Lancer l'application

```bash
symfony server:start
```

Ou avec PHP :

```bash
php -S localhost:8000 -t public
```

🌐 Accédez à : **http://localhost:8000**

---

**Note** : Ce projet nécessite PHP 8.2+, Composer et Docker pour fonctionner.
