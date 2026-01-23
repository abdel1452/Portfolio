# Compte Rendu - Projet Coach v1

## 📋 Informations générales

**Nom du projet** : Coach v1 - Application de calcul d'IMG  
**Date de création** : Projet BTS SIO SLAM  
**Auteur** : Abdelmalek Elidrissi  
**Type** : Application mobile multiplateforme (.NET MAUI)  

---

## 🎯 Objectifs du projet

Développer une application mobile multiplateforme permettant :
- Le calcul de l'IMG (Indice de Masse Grasse)
- L'évaluation de la condition physique selon le sexe
- L'affichage visuel des résultats avec des indicateurs
- Une interface utilisateur simple et intuitive

---

## 🛠️ Technologies utilisées

### Framework
- **.NET MAUI** : Framework Microsoft pour applications multiplateformes
- **C#** : Langage de programmation orienté objet
- **XAML** : Langage de balisage pour les interfaces utilisateur

### Plateformes supportées
- **Android** : Application native Android
- **iOS** : Application native iOS
- **Windows** : Application Windows
- **macOS** : Application macOS (MacCatalyst)

### Architecture
- **MVVM Pattern** : Séparation entre Modèle, Vue et Vue-Modèle
- **Modèle de données** : Classe `Profil` pour gérer les calculs
- **Tests unitaires** : Tests avec MSTest

---

## 📁 Structure du projet

```
Coach V1/
├── MauiAppCoach/              # Application principale
│   ├── MainPage.xaml          # Interface utilisateur principale
│   ├── MainPage.xaml.cs       # Code-behind de la page principale
│   ├── App.xaml               # Application XAML
│   ├── App.xaml.cs            # Point d'entrée de l'application
│   ├── AppShell.xaml          # Navigation et structure de l'app
│   ├── Platforms/            # Code spécifique par plateforme
│   │   ├── Android/
│   │   ├── iOS/
│   │   ├── Windows/
│   │   └── MacCatalyst/
│   ├── Resources/            # Ressources (images, styles)
│   │   ├── Images/
│   │   │   ├── smiley_parfait.png
│   │   │   ├── smiley_surpoids.png
│   │   │   ├── smiley_tropmaigre.png
│   │   │   └── smiley.png
│   │   └── Styles/
│   └── Tests/                # Tests unitaires
├── MauiAppCoach.Core/         # Bibliothèque de classes partagée
│   └── Modele/
│       └── Profil.cs         # Modèle de données pour le calcul IMG
├── TestProjectCoach/         # Projet de tests
└── MauiAppCoach.slnx         # Solution Visual Studio
```

---

## 🔧 Fonctionnalités implémentées

### 1. Calcul de l'IMG (Indice de Masse Grasse)

L'application calcule l'IMG selon la formule :
```
IMG = (1.2 × poids / taille²) + (0.23 × âge) - (10.83 × sexe) - 5.4
```

Où :
- **poids** : en kilogrammes
- **taille** : en centimètres (convertie en mètres)
- **âge** : en années
- **sexe** : 1 pour homme, 0 pour femme

### 2. Évaluation selon le sexe

#### Pour les femmes (sexe = 0)
- **IMG < 25** : Trop maigre
- **25 ≤ IMG < 30** : Parfait
- **IMG ≥ 30** : Surpoids

#### Pour les hommes (sexe = 1)
- **IMG < 15** : Trop maigre
- **15 ≤ IMG < 20** : Parfait
- **IMG ≥ 20** : Surpoids

### 3. Interface utilisateur

- **Champs de saisie** :
  - Poids (en kg)
  - Taille (en cm)
  - Âge (en années)
  - Sélection du sexe (Homme/Femme) via radio buttons

- **Affichage des résultats** :
  - Message textuel (Trop maigre / Parfait / Surpoids)
  - Valeur de l'IMG avec une décimale
  - Image indicative (smiley) selon le résultat

### 4. Modèle de données

La classe `Profil` encapsule :
- Les données d'entrée (sexe, poids, taille, âge)
- Le calcul de l'IMG
- La détermination du message et de l'image à afficher
- Les méthodes getters pour accéder aux résultats

---

## 💻 Code principal

### Classe Profil

```csharp
public class Profil
{
    private int sexe;
    private int poids;
    private int taille;
    private int age;
    private double img;
    private string message;
    private string image;

    public Profil(int sexe, int poids, int taille, int age)
    {
        this.sexe = sexe;
        this.poids = poids;
        this.taille = taille;
        this.age = age;
        
        CalculIMG();
        ResultatIMG();
    }

    private void CalculIMG()
    {
        double tailleEnMetres = taille / 100.0;
        img = (1.2 * poids / (tailleEnMetres * tailleEnMetres))
               + (0.23 * age)
               - (10.83 * sexe)
               - 5.4;
    }

    private void ResultatIMG()
    {
        // Logique d'évaluation selon le sexe
        // Détermine message et image
    }
}
```

### MainPage.xaml.cs

```csharp
private void btCalculer_Clicked(object sender, EventArgs e)
{
    int poids = Convert.ToInt32(entPoids.Text);
    int taille = Convert.ToInt32(entTaille.Text);
    int age = Convert.ToInt32(entAge.Text);
    int sexe = rdHomme.IsChecked ? 1 : 0;

    Profil profil = new Profil(sexe, poids, taille, age);

    CounterLabel.Text = "Votre IMG : " + profil.GetMessage() + profil.GetImg().ToString("0.0");
    imgResultat.Source = profil.GetImage();
}
```

---

## 🚀 Installation et démarrage

### Prérequis
- **Visual Studio 2022** ou supérieur
- **.NET MAUI workload** installé
- **SDK Android** (pour Android)
- **Xcode** (pour iOS, sur macOS uniquement)
- **Windows SDK** (pour Windows)

### Étapes d'installation

1. **Ouvrir la solution**
   ```bash
   Ouvrir MauiAppCoach.slnx dans Visual Studio
   ```

2. **Restaurer les packages NuGet**
   ```bash
   dotnet restore
   ```

3. **Compiler l'application**
   ```bash
   dotnet build
   ```

4. **Lancer l'application**
   - Sélectionner la plateforme cible (Android, iOS, Windows)
   - Appuyer sur F5 ou cliquer sur "Démarrer"

### Plateformes disponibles

- **Android** : Émulateur ou appareil physique
- **iOS** : Simulateur iOS (sur macOS uniquement)
- **Windows** : Application Windows native
- **macOS** : Application macOS via MacCatalyst

---

## 💡 Points techniques remarquables

### Architecture
- **Séparation des responsabilités** : Modèle `Profil` séparé de l'interface
- **Code partagé** : Logique métier dans `MauiAppCoach.Core`
- **Code spécifique par plateforme** : Dans le dossier `Platforms/`

### Calculs
- **Formule IMG validée** : Utilisation de la formule standard de Deurenberg
- **Gestion des unités** : Conversion automatique cm → mètres
- **Précision** : Affichage avec une décimale

### Interface utilisateur
- **XAML** : Définition déclarative de l'interface
- **Code-behind** : Logique d'interaction dans C#
- **Ressources** : Images et styles centralisés

### Tests
- **Tests unitaires** : Tests de la classe `Profil`
- **MSTest** : Framework de tests Microsoft
- **Validation** : Tests des calculs et des résultats

---

## 🐛 Difficultés rencontrées et solutions

### Problème 1 : Configuration multiplateforme
**Problème** : Configuration des différentes plateformes (Android, iOS, Windows).  
**Solution** : Utilisation de .NET MAUI qui simplifie la configuration multiplateforme avec des fichiers manifestes spécifiques par plateforme.

### Problème 2 : Conversion des unités
**Problème** : Conversion correcte de la taille de centimètres en mètres pour le calcul.  
**Solution** : Division par 100.0 pour obtenir des mètres avec précision décimale.

### Problème 3 : Gestion des résultats selon le sexe
**Problème** : Seuils différents pour hommes et femmes.  
**Solution** : Implémentation de la méthode `ResultatIMG()` avec conditions spécifiques selon la valeur de `sexe`.

---

## 📈 Améliorations possibles

1. **Validation des entrées** : Vérification que les valeurs saisies sont valides
2. **Gestion des erreurs** : Try-catch pour les conversions et calculs
3. **Historique** : Sauvegarde des calculs précédents
4. **Graphiques** : Visualisation de l'évolution de l'IMG dans le temps
5. **Objectifs** : Définition d'objectifs de poids/IMG
6. **Export** : Export des données en PDF ou CSV
7. **Localisation** : Support multilingue
8. **Thèmes** : Mode sombre/clair
9. **Base de données** : Persistance des profils utilisateur
10. **Synchronisation cloud** : Synchronisation entre appareils

---

## 📚 Compétences développées

### Développement mobile
- **.NET MAUI** : Framework multiplateforme Microsoft
- **XAML** : Création d'interfaces utilisateur déclaratives
- **C#** : Programmation orientée objet avancée

### Architecture
- **MVVM Pattern** : Séparation Modèle-Vue-VueModèle
- **Code partagé** : Réutilisation de code entre plateformes
- **Modularité** : Organisation en projets séparés

### Calculs et logique métier
- **Algorithmes** : Implémentation de formules mathématiques
- **Validation** : Gestion des données d'entrée
- **Tests** : Écriture de tests unitaires

### Développement multiplateforme
- **Android** : Configuration et développement Android
- **iOS** : Configuration iOS (sur macOS)
- **Windows** : Application Windows native
- **macOS** : Application macOS via MacCatalyst

---

## 🎓 Conclusion

Ce projet a permis de découvrir le développement d'applications mobiles multiplateformes avec .NET MAUI. L'application combine une interface utilisateur simple avec une logique de calcul précise pour fournir un outil utile de calcul d'IMG.

L'utilisation de .NET MAUI démontre la capacité à créer des applications natives pour plusieurs plateformes à partir d'un seul code source, ce qui est un avantage majeur pour le développement moderne.

**Points forts** :
- Application multiplateforme fonctionnelle
- Code bien structuré avec séparation des responsabilités
- Interface utilisateur intuitive
- Tests unitaires pour valider la logique

**Prochaines étapes** : Amélioration de l'interface utilisateur, ajout de fonctionnalités avancées (historique, graphiques), validation des entrées et gestion des erreurs.

---

*Compte rendu généré le : 2025-01-27*
