using System;

namespace MauiAppCoach.Tests
{
    // Copie de la classe Profil pour les tests
    public class Profil
    {
        // Champs privés
        private int sexe;        // 0 = femme, 1 = homme
        private double poids;    // en kg
        private double taille;   // en cm
        private int age;         // en années
        private double img;      // indice de masse grasse
        private string message;  // interprétation

        /// <summary>
        /// Constructeur
        /// </summary>
        public Profil(int sexe, double poids, double taille, int age, string message)
        {
            this.sexe = sexe;
            this.poids = poids;
            this.taille = taille;
            this.age = age;
            this.message = message;

            CalculIMG();
            ResultatIMG();
        }

        /// <summary>
        /// Calcul de l'IMG
        /// Formule :
        /// IMG = (1.2 × poids / taille²) + (0.23 × âge) − (10.83 × sexe) − 5.4
        /// </summary>
        private void CalculIMG()
        {
            double tailleEnMetres = taille / 100.0;

            img = (1.2 * poids / (tailleEnMetres * tailleEnMetres))
                  + (0.23 * age)
                  - (10.83 * sexe)
                  - 5.4;
        }

        /// <summary>
        /// Détermination du message selon l'IMG
        /// </summary>
        private void ResultatIMG()
        {
            if (sexe == 0) // Femme
            {
                if (img < 25)
                    message = "Trop maigre.";
                else if (img < 30)
                    message = "Parfait.";
                else
                    message = "Surpoids.";
            }
            else // Homme
            {
                if (img < 15)
                    message = "Trop maigre.";
                else if (img < 20)
                    message = "Parfait.";
                else
                    message = "Surpoids.";
            }
        }

        // Getters
        public int GetSexe() => sexe;
        public double GetPoids() => poids;
        public double GetTaille() => taille;
        public int GetAge() => age;
        public double GetImg() => img;
        public string GetMessage() => message;
    }
}
