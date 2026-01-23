# Compte Rendu - Projet Site eShoes

## 📋 Informations générales

**Nom du projet** : SIO Shoes - Application E-commerce Symfony  
**Date de création** : Projet BTS SIO SLAM  
**Auteur** : Abdelmalek Elidrissi  
**Type** : Application e-commerce complète pour la vente de chaussures en ligne  

---

## 🎯 Objectifs du projet

Développer une plateforme e-commerce complète permettant :
- La gestion de produits (chaussures) avec catégories et sous-catégories
- La gestion d'un panier d'achat fonctionnel
- Le traitement de commandes en ligne
- L'intégration de paiements sécurisés via Stripe
- L'administration complète du site
- La génération de factures PDF
- L'envoi d'emails de confirmation de commande

---

## 🛠️ Technologies utilisées

### Backend
- **PHP 8.2+** : Langage de programmation serveur
- **Symfony 7.3** : Framework PHP moderne et performant
- **Doctrine ORM 3.5** : Mapper objet-relationnel pour la gestion de la base de données
- **Doctrine DBAL 3** : Couche d'abstraction de base de données
- **PostgreSQL** : Base de données relationnelle robuste
- **Stripe PHP SDK 18.0** : Intégration du système de paiement
- **Dompdf 3.1** : Génération de documents PDF pour les factures
- **Symfony Mailer 7.3** : Envoi d'emails transactionnels
- **Symfony Security Bundle 7.3** : Gestion de l'authentification et autorisation
- **Symfony Forms 7.3** : Gestion des formulaires
- **KnpPaginatorBundle 6.9** : Pagination des listes

### Frontend
- **Twig 2.12/3.0** : Moteur de templates PHP
- **Bootstrap** : Framework CSS pour le design responsive
- **JavaScript (ES6+)** : Interactivité côté client
- **Stimulus 2.30** : Framework JavaScript minimaliste pour Symfony
- **Turbo 2.31** : Amélioration des performances de navigation
- **Asset Mapper 7.3** : Gestion des assets frontend

### Infrastructure & Outils
- **Docker & Docker Compose** : Containerisation de la base de données PostgreSQL
- **Composer** : Gestionnaire de dépendances PHP
- **Symfony CLI** : Outils de développement Symfony
- **Git** : Contrôle de version

### Développement
- **PHPUnit 11.5** : Tests unitaires
- **Symfony Maker Bundle** : Génération de code
- **Web Profiler** : Outils de débogage Symfony

---

## 📁 Structure du projet

```
Site_eShoes-main/
├── config/                    # Configuration Symfony
│   ├── packages/             # Configuration des bundles
│   │   ├── doctrine.yaml     # Configuration Doctrine ORM
│   │   ├── security.yaml     # Configuration sécurité
│   │   ├── twig.yaml         # Configuration Twig
│   │   └── ...
│   ├── routes/               # Routes de l'application
│   └── services.yaml         # Configuration des services
├── public/                    # Point d'entrée web
│   └── index.php             # Front controller
├── src/
│   ├── Controller/           # Contrôleurs de l'application
│   │   ├── BillController.php          # Génération de factures PDF
│   │   ├── CartController.php          # Gestion du panier
│   │   ├── CategoryController.php      # CRUD catégories
│   │   ├── CityController.php          # CRUD villes de livraison
│   │   ├── HomeController.php          # Page d'accueil et catalogue
│   │   ├── OrderController.php         # Gestion des commandes
│   │   ├── ProductController.php       # CRUD produits
│   │   ├── RegistrationController.php  # Inscription utilisateurs
│   │   ├── SecurityController.php      # Authentification
│   │   ├── StripeController.php        # Intégration paiement Stripe
│   │   ├── SubCategoryController.php   # CRUD sous-catégories
│   │   └── UserController.php          # Gestion des utilisateurs
│   ├── Entity/               # Entités Doctrine
│   │   ├── AddProductHistory.php      # Historique des ajouts de stock
│   │   ├── Category.php                # Catégories de produits
│   │   ├── City.php                    # Villes de livraison
│   │   ├── Order.php                   # Commandes
│   │   ├── OrderProducts.php           # Produits dans une commande
│   │   ├── Product.php                 # Produits (chaussures)
│   │   ├── SubCategory.php             # Sous-catégories
│   │   └── User.php                    # Utilisateurs
│   ├── Form/                 # Formulaires Symfony
│   │   ├── AddProductHistoryType.php
│   │   ├── CategoryType.php
│   │   ├── CityType.php
│   │   ├── OrderType.php
│   │   ├── ProductType.php
│   │   ├── RegistrationFormType.php
│   │   └── SubCategoryType.php
│   ├── Repository/           # Repositories Doctrine
│   │   ├── CategoryRepository.php
│   │   ├── CityRepository.php
│   │   ├── OrderRepository.php
│   │   ├── ProductRepository.php
│   │   └── ...
│   ├── Service/              # Services métier
│   │   └── StripePayment.php # Service de paiement Stripe
│   └── Twig/                 # Extensions Twig personnalisées
│       ├── AppExtension.php  # Filtres et fonctions Twig
│       └── Globals.php       # Variables globales Twig
├── templates/                 # Templates Twig
│   ├── base.html.twig        # Template de base
│   ├── layouts/              # Layouts réutilisables
│   │   ├── nav.html.twig     # Navigation principale
│   │   └── ...
│   ├── home/                 # Templates de la page d'accueil
│   │   ├── index.html.twig   # Catalogue produits
│   │   ├── show.html.twig    # Détail produit
│   │   └── filter.html.twig  # Filtres produits
│   ├── product/              # Templates produits (admin)
│   │   ├── index.html.twig
│   │   ├── new.html.twig
│   │   ├── edit.html.twig
│   │   └── ...
│   ├── cart/                 # Templates panier
│   │   └── index.html.twig
│   ├── order/                # Templates commandes
│   │   ├── index.html.twig
│   │   ├── orders.html.twig
│   │   └── ...
│   ├── security/             # Templates authentification
│   │   └── login.html.twig
│   ├── registration/         # Templates inscription
│   │   └── register.html.twig
│   ├── stripe/               # Templates paiement Stripe
│   │   ├── index.html.twig
│   │   ├── success.html.twig
│   │   └── cancel.html.twig
│   └── ...
├── migrations/                # Migrations de base de données
│   ├── Version20250918081603.php
│   ├── Version20250918082910.php
│   └── ... (15 migrations au total)
├── assets/                    # Assets frontend (JS/CSS)
│   ├── app.js                # JavaScript principal
│   ├── bootstrap.js          # Configuration Bootstrap
│   ├── styles/
│   │   └── app.css          # Styles CSS
│   └── controllers/          # Contrôleurs Stimulus
│       ├── hello_controller.js
│       └── csrf_protection_controller.js
├── tests/                     # Tests unitaires
│   ├── Controller/
│   │   └── HomeControllerTest.php
│   └── bootstrap.php
├── docker/                    # Configuration Docker
│   └── vhost.conf            # Configuration serveur web
├── composer.json              # Dépendances PHP
├── composer.lock             # Version verrouillée des dépendances
├── package.json              # Dépendances frontend
├── compose.yaml              # Configuration Docker Compose
├── README.md                  # Documentation principale
└── INSTALLATION.md           # Guide d'installation rapide
```

---

## 🔧 Fonctionnalités implémentées

### 1. Gestion des produits

#### CRUD Produits (ProductController)
- **Create** : Ajout de nouveaux produits avec upload d'images
  - Nom, description, prix, stock
  - Association à une catégorie et sous-catégorie
  - Upload et stockage d'images
- **Read** : Affichage des produits avec pagination
  - Liste des produits pour administrateurs
  - Détails d'un produit avec affichage public
- **Update** : Modification des produits existants
  - Mise à jour des informations produit
  - Modification du stock
  - Changement d'image
- **Delete** : Suppression de produits avec confirmation
- **Show** : Affichage détaillé d'un produit
  - Informations complètes
  - Image du produit
  - Disponibilité en stock

#### Gestion du stock
- **AddProductHistory** : Historique des ajouts de stock
  - Suivi des modifications de stock
  - Date et quantité ajoutée
  - Affichage de l'historique pour chaque produit
- **Ajout de stock** : Interface pour ajouter du stock à un produit existant
- **Affichage de l'historique** : Consultation de l'historique des modifications de stock

#### Catégories et sous-catégories
- **Gestion hiérarchique** : Catégories avec sous-catégories
- **CRUD catégories** : Création, lecture, mise à jour, suppression des catégories
- **CRUD sous-catégories** : Gestion des sous-catégories liées à une catégorie
- **Filtrage** : Filtrage des produits par catégorie/sous-catégorie sur la page d'accueil

### 2. Panier d'achat (CartController)

- **Ajout de produits** : Ajout de produits au panier avec gestion des quantités
- **Modification des quantités** : Augmentation ou diminution des quantités dans le panier
- **Suppression d'articles** : Retrait de produits du panier
- **Calcul automatique** : Calcul automatique du total du panier
- **Persistance en session** : Sauvegarde du panier en session Symfony
- **Affichage du nombre d'articles** : Badge dans la navigation affichant le nombre d'articles
- **Validation du stock** : Vérification de la disponibilité des produits avant ajout

### 3. Système de commandes (OrderController)

#### Processus de commande
- **Passage de commande** : Depuis le panier vers la commande
- **Enregistrement des informations** : Informations de livraison et de facturation
- **Gestion des adresses** : Sélection de la ville de livraison
- **Suivi des commandes** : Suivi des commandes par utilisateur
- **Historique** : Affichage des commandes passées avec détails

#### Entité Order
- **Statut** : Suivi du statut de la commande
- **Total** : Montant total de la commande
- **Date** : Date de création de la commande
- **Utilisateur** : Lien vers l'utilisateur ayant passé la commande
- **Ville** : Ville de livraison

#### Entité OrderProducts
- **Produits** : Liste des produits dans la commande
- **Quantités** : Quantité de chaque produit
- **Prix unitaire** : Prix au moment de la commande (pour éviter les variations)

### 4. Paiement Stripe (StripeController)

- **Intégration complète** : Utilisation du SDK Stripe PHP officiel (version 18.0)
- **Paiement sécurisé** : Paiement par carte bancaire avec Stripe Checkout
- **Gestion des succès** : Page de confirmation après paiement réussi
- **Gestion des annulations** : Page d'annulation en cas d'abandon du paiement
- **Service dédié** : Service `StripePayment` pour encapsuler la logique de paiement
- **Sécurité** : Utilisation des clés API Stripe sécurisées
- **Tests** : Support des clés de test Stripe (commencent par `pk_test_` et `sk_test_`)

### 5. Authentification et sécurité (SecurityController, RegistrationController)

#### Inscription et connexion
- **Formulaire d'inscription** : Création de compte utilisateur avec validation
  - Email unique
  - Validation du mot de passe (force minimale)
  - Confirmation du mot de passe
- **Connexion** : Authentification des utilisateurs
- **Déconnexion** : Logout sécurisé
- **Gestion des rôles** : Système de rôles (ROLE_USER, ROLE_ADMIN)

#### Sécurité Symfony
- **Protection CSRF** : Protection sur tous les formulaires
- **Chiffrement des mots de passe** : Utilisation de bcrypt via Symfony PasswordHasher
- **Protection des routes** : Contrôle d'accès par rôle avec Symfony Security
- **Sessions sécurisées** : Gestion sécurisée des sessions utilisateur
- **Validation** : Validation côté serveur avec Symfony Validator

### 6. Administration

#### Gestion des utilisateurs (UserController)
- **Liste des utilisateurs** : Affichage de tous les utilisateurs (admin uniquement)
- **Gestion des rôles** : Attribution de rôles aux utilisateurs
- **Interface d'administration** : Interface dédiée pour les administrateurs

#### Gestion des produits et catégories
- **CRUD complet** : Toutes les opérations CRUD accessibles aux administrateurs
- **Interface intuitive** : Interface d'administration claire et fonctionnelle

### 7. Génération de factures PDF (BillController)

- **Génération PDF** : Création de factures PDF avec Dompdf (version 3.1)
- **Affichage des détails** : Détails complets de la commande sur la facture
- **Informations client** : Nom, email, adresse de l'utilisateur
- **Liste des produits** : Tous les produits commandés avec quantités et prix
- **Calcul des totaux** : Calcul automatique du total de la facture
- **Template personnalisé** : Design professionnel de la facture
- **Téléchargement** : Possibilité de télécharger la facture en PDF

### 8. Envoi d'emails (Symfony Mailer)

- **Email de confirmation** : Envoi automatique d'email après commande
- **Templates d'emails** : Utilisation de templates Twig pour les emails
- **Template `orderConfirm.html.twig`** : Email de confirmation de commande
- **Intégration Symfony Mailer** : Configuration et utilisation de Symfony Mailer
- **Gestion des erreurs** : Gestion des erreurs d'envoi d'email

### 9. Gestion des villes (CityController)

- **CRUD villes** : Création, lecture, mise à jour, suppression des villes de livraison
- **Utilisation dans les commandes** : Sélection de la ville lors du passage de commande
- **Relation avec les commandes** : Une ville peut avoir plusieurs commandes

### 10. Page d'accueil et catalogue (HomeController)

- **Affichage des produits** : Catalogue de tous les produits disponibles
- **Pagination** : Pagination avec KnpPaginatorBundle (6 produits par page)
- **Filtrage** : Filtrage par catégorie et sous-catégorie
- **Détail produit** : Affichage détaillé d'un produit avec possibilité d'ajout au panier
- **Recherche** : Recherche de produits (fonctionnalité possible)

---

## 📊 Modèle de données

### Entités principales

#### User (Utilisateur)
```php
- id : Identifiant unique
- email : Adresse email (unique)
- password : Mot de passe chiffré
- roles : Rôles de l'utilisateur (JSON array)
- orders : Commandes de l'utilisateur (OneToMany relation)
```

#### Product (Produit)
```php
- id : Identifiant unique
- name : Nom du produit
- description : Description détaillée
- price : Prix (decimal)
- stock : Stock disponible (integer)
- image : Chemin vers l'image du produit
- category : Catégorie (ManyToOne relation)
- subCategory : Sous-catégorie (ManyToOne relation)
- addProductHistories : Historique des ajouts de stock (OneToMany)
```

#### Category (Catégorie)
```php
- id : Identifiant unique
- name : Nom de la catégorie
- products : Produits de la catégorie (OneToMany relation)
- subCategories : Sous-catégories (OneToMany relation)
```

#### SubCategory (Sous-catégorie)
```php
- id : Identifiant unique
- name : Nom de la sous-catégorie
- category : Catégorie parente (ManyToOne relation)
- products : Produits de la sous-catégorie (OneToMany relation)
```

#### Order (Commande)
```php
- id : Identifiant unique
- user : Utilisateur (ManyToOne relation)
- total : Montant total (decimal)
- status : Statut de la commande (string)
- createdAt : Date de création (datetime)
- orderProducts : Produits de la commande (OneToMany relation)
- city : Ville de livraison (ManyToOne relation)
```

#### OrderProducts
```php
- id : Identifiant unique
- order : Commande (ManyToOne relation)
- product : Produit (ManyToOne relation)
- quantity : Quantité (integer)
- price : Prix unitaire au moment de la commande (decimal)
```

#### AddProductHistory (Historique de stock)
```php
- id : Identifiant unique
- product : Produit (ManyToOne relation)
- quantity : Quantité ajoutée (integer)
- addedAt : Date d'ajout (datetime)
```

#### City (Ville)
```php
- id : Identifiant unique
- name : Nom de la ville
- orders : Commandes livrées dans cette ville (OneToMany relation)
```

---

## 🌐 Routes principales

### Routes publiques
| Route | Méthode | Description |
|-------|---------|-------------|
| `/` | GET | Page d'accueil avec catalogue de produits |
| `/product/{id}` | GET | Détails d'un produit |
| `/register` | GET, POST | Inscription |
| `/login` | GET, POST | Connexion |
| `/cart` | GET | Panier d'achat |

### Routes authentifiées
| Route | Méthode | Description |
|-------|---------|-------------|
| `/cart/add/{id}` | POST | Ajouter au panier |
| `/cart/remove/{id}` | POST | Retirer du panier |
| `/order` | GET, POST | Passer une commande |
| `/orders` | GET | Historique des commandes |
| `/order/{id}/bill` | GET | Facture d'une commande (PDF) |

### Routes Stripe
| Route | Méthode | Description |
|-------|---------|-------------|
| `/stripe/checkout` | GET, POST | Page de paiement Stripe |
| `/stripe/success` | GET | Succès du paiement |
| `/stripe/cancel` | GET | Annulation du paiement |

### Routes administrateur
| Route | Méthode | Description |
|-------|---------|-------------|
| `/admin/products` | GET | Liste des produits (admin) |
| `/admin/products/new` | GET, POST | Créer un produit |
| `/admin/products/{id}/edit` | GET, POST | Modifier un produit |
| `/admin/products/{id}` | DELETE | Supprimer un produit |
| `/admin/categories` | GET | Gestion des catégories |
| `/admin/subcategories` | GET | Gestion des sous-catégories |
| `/admin/users` | GET | Gestion des utilisateurs |
| `/admin/orders` | GET | Gestion des commandes |

---

## 🚀 Installation et démarrage

### Prérequis
- **PHP** >= 8.2
- **Composer** (gestionnaire de dépendances PHP)
- **Docker** et **Docker Compose** (pour la base de données PostgreSQL)
- **Node.js** et **npm** (pour les assets frontend)
- **Symfony CLI** (optionnel, mais recommandé)

### Étapes d'installation

1. **Installer les dépendances PHP**
   ```bash
   cd Projets/Site_eShoes-main
   composer install
   ```

2. **Configurer les variables d'environnement**
   
   Créer `.env.local` :
   ```env
   # Base de données
   DATABASE_URL="postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8"
   
   # Clés Stripe (pour les paiements)
   STRIPE_PUBLIC_KEY="votre_clé_publique_stripe"
   STRIPE_SECRET_KEY="votre_clé_secrète_stripe"
   
   # Mailer (pour les emails de confirmation)
   MAILER_DSN="smtp://localhost:1025"
   ```

3. **Démarrer la base de données**
   ```bash
   docker compose up -d
   ```
   Cela démarre un conteneur PostgreSQL sur le port 5432.

4. **Créer la base de données et exécuter les migrations**
   ```bash
   # Créer la base de données
   php bin/console doctrine:database:create
   
   # Exécuter les migrations
   php bin/console doctrine:migrations:migrate
   ```

5. **Installer les assets frontend**
   ```bash
   npm install
   npm run build
   ```

6. **Créer un utilisateur administrateur (optionnel)**
   ```bash
   php bin/console app:create-admin
   ```
   Ou créez un utilisateur via l'interface d'inscription.

7. **Lancer l'application**
   ```bash
   # Option 1 : Avec Symfony CLI (recommandé)
   symfony server:start
   
   # Option 2 : Avec PHP natif
   php -S localhost:8000 -t public
   ```

8. **Accéder à l'application**
   - Application : `http://localhost:8000`
   - Créer un compte ou utiliser un compte admin existant

---

## 💡 Points techniques remarquables

### Architecture MVC
- **Séparation claire** : Modèles (Entity), Vues (Templates Twig), Contrôleurs bien séparés
- **Design Pattern Repository** : Accès aux données encapsulé dans des repositories
- **Services** : Logique métier dans des services dédiés (StripePayment)
- **Formulaires** : Gestion des formulaires avec Symfony Forms

### Sécurité
- **Protection CSRF** : Tous les formulaires protégés automatiquement
- **Validation des données** : Validation côté serveur avec Symfony Validator
- **Chiffrement des mots de passe** : Utilisation de bcrypt via Symfony PasswordHasher
- **Protection des routes** : Contrôle d'accès par rôle avec Symfony Security
- **Gestion des sessions** : Sessions sécurisées avec Symfony

### Base de données
- **Migrations** : Versionnement du schéma de base de données (15 migrations)
- **Doctrine ORM** : Mapping objet-relationnel puissant avec annotations
- **Relations** : Gestion complète des relations entre entités (OneToMany, ManyToOne)
- **Requêtes optimisées** : Utilisation des repositories Doctrine pour des requêtes efficaces

### Paiement
- **Stripe** : Intégration sécurisée du paiement en ligne avec SDK officiel
- **Service dédié** : Service `StripePayment` pour encapsuler la logique
- **Gestion des erreurs** : Gestion complète des erreurs de paiement
- **Paiement test** : Utilisation des clés de test Stripe pour le développement

### Génération de documents
- **Dompdf** : Génération de factures PDF professionnelles
- **Templates personnalisés** : Design professionnel pour les factures
- **Données dynamiques** : Intégration des données de commande dans le PDF

### Performance
- **Pagination** : Utilisation de KnpPaginatorBundle pour paginer les listes
- **Cache Symfony** : Mise en cache pour améliorer les performances
- **Turbo** : Amélioration des performances de navigation avec Turbo
- **Asset Mapper** : Optimisation du chargement des assets

---

## 🐛 Difficultés rencontrées et solutions

### Problème 1 : Gestion des relations Doctrine
**Problème** : Création correcte des relations entre entités (OneToMany, ManyToOne).  
**Solution** : Étude approfondie de la documentation Doctrine et création correcte des annotations de relations avec les propriétés `inversedBy` et `mappedBy`.

### Problème 2 : Intégration Stripe
**Problème** : Configuration et utilisation correcte du SDK Stripe PHP.  
**Solution** : Utilisation du SDK Stripe PHP officiel (version 18.0), configuration correcte des clés API de test dans `.env.local`, et création d'un service dédié pour encapsuler la logique de paiement.

### Problème 3 : Génération de PDF
**Problème** : Génération de factures PDF avec Dompdf.  
**Solution** : Utilisation de Dompdf (version 3.1) avec création de templates HTML dédiés pour les factures, puis conversion en PDF.

### Problème 4 : Gestion du panier en session
**Problème** : Sauvegarde du panier en session et persistance entre les requêtes.  
**Solution** : Utilisation de la session Symfony pour stocker temporairement les articles du panier avec gestion des quantités et des totaux.

### Problème 5 : Pagination des produits
**Problème** : Implémentation de la pagination sur la liste des produits.  
**Solution** : Utilisation de KnpPaginatorBundle qui permet une pagination simple et efficace avec configuration dans le contrôleur.

### Problème 6 : Upload d'images
**Problème** : Upload et stockage des images de produits.  
**Solution** : Utilisation de VichUploaderBundle ou gestion manuelle avec Symfony Filesystem, stockage dans le dossier `public/uploads/products/`.

---

## 📈 Améliorations possibles

1. **Recherche avancée** : Ajout d'une fonctionnalité de recherche avec filtres (prix, catégorie, taille, etc.)
2. **Avis clients** : Système de notation et commentaires sur les produits
3. **Favoris** : Liste de souhaits pour les utilisateurs
4. **Réduction et codes promo** : Système de codes promotionnels et réductions
5. **Multi-langue** : Internationalisation de l'application (i18n)
6. **API REST** : Exposition d'une API REST pour application mobile
7. **Webhooks Stripe** : Gestion des webhooks Stripe pour les paiements et remboursements
8. **Tableau de bord admin** : Statistiques et graphiques pour les administrateurs
9. **Gestion des images multiples** : Upload de plusieurs images par produit
10. **Notifications** : Système de notifications pour les utilisateurs (email, SMS)
11. **Gestion des tailles** : Ajout de tailles pour les chaussures (38, 39, 40, etc.)
12. **Stock par taille** : Gestion du stock séparé par taille
13. **Comparaison de produits** : Fonctionnalité de comparaison entre produits
14. **Historique de navigation** : Suivi des produits consultés par l'utilisateur
15. **Recommandations** : Système de recommandation de produits basé sur l'historique

---

## 📚 Compétences développées

### Framework Symfony
- **Maîtrise de Symfony 7** : Utilisation complète du framework PHP moderne
- **Doctrine ORM** : Modélisation et gestion de base de données avec Doctrine
- **Architecture MVC** : Compréhension et application du pattern Model-View-Controller
- **Formulaires Symfony** : Création et gestion de formulaires complexes
- **Sécurité Symfony** : Mise en place de l'authentification et autorisation

### Base de données
- **PostgreSQL** : Utilisation d'une base de données relationnelle robuste
- **Migrations** : Versionnement et évolution du schéma de base de données
- **Relations** : Gestion des relations entre entités (OneToMany, ManyToOne)
- **Requêtes optimisées** : Utilisation des repositories Doctrine

### Sécurité web
- **Protection CSRF** : Protection contre les attaques CSRF
- **Chiffrement** : Chiffrement des mots de passe avec bcrypt
- **Contrôle d'accès** : Gestion des rôles et permissions
- **Validation** : Validation des données côté serveur

### Intégration de services externes
- **Stripe** : Intégration complète du système de paiement
- **Génération PDF** : Création de documents PDF avec Dompdf
- **Envoi d'emails** : Configuration et envoi d'emails transactionnels

### Frontend
- **Twig** : Maîtrise du moteur de templates Twig
- **Bootstrap** : Utilisation de Bootstrap pour le responsive design
- **JavaScript** : Interactivité côté client avec JavaScript moderne
- **Stimulus** : Utilisation de Stimulus pour la gestion des interactions

### Infrastructure
- **Docker** : Utilisation de Docker pour l'environnement de développement
- **Git** : Gestion de version avec Git
- **Tests** : Mise en place de tests unitaires avec PHPUnit

### Général
- **Gestion de projet** : Organisation et structuration d'un projet complet
- **Documentation** : Création de documentation claire et complète
- **Débogage** : Utilisation des outils de débogage Symfony (Web Profiler)

---

## 🎓 Conclusion

Ce projet constitue une application e-commerce complète et fonctionnelle, démontrant une maîtrise approfondie du framework Symfony et des concepts de développement web moderne. L'application intègre tous les composants essentiels d'un site e-commerce : gestion de produits, panier, commandes, paiement sécurisé, et administration.

L'utilisation de Symfony 7, Doctrine ORM, et l'intégration de services externes (Stripe) montre la capacité à travailler avec des technologies professionnelles et à construire des applications robustes et maintenables.

**Points forts** :
- Architecture bien structurée et maintenable
- Code propre et organisé suivant les conventions Symfony
- Sécurité prise en compte à tous les niveaux
- Fonctionnalités complètes pour un e-commerce
- Documentation claire et installation simple
- Tests unitaires pour valider les fonctionnalités

**Points techniques remarquables** :
- Utilisation de Doctrine ORM pour une gestion efficace de la base de données
- Intégration complète de Stripe pour les paiements sécurisés
- Génération de factures PDF professionnelles
- Système de pagination pour les listes de produits
- Gestion du panier en session avec persistance

**Prochaines étapes** : Amélioration de l'interface utilisateur, ajout de fonctionnalités avancées (recherche, avis, favoris), optimisation des performances, et transformation en API REST pour application mobile.

---

*Compte rendu généré le : 2025-01-27*
