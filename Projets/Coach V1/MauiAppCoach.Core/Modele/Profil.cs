
using System;

namespace MauiAppCoach.Core.Modele
{
    [Serializable]
   
    public class Profil
    {
        private int sexe;
        private int poids;
        private int taille;
        private int age;
        private double img;
        private string message = "";



        public Profil(int sexe, int poids, int taille, int age)
        {
            this.sexe = sexe;
            this.poids = poids;
            this.taille = taille;
            this.age = age;

            CalculIMG();
            ResultatIMG();
        }
      
       public Profil()
        {
            sexe = 0;
            poids = 0;
            taille = 0;
            age = 0;
            img = 0.0;
            message = "";
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
            if (sexe == 0) // Femme
            {
                if (img < 25)
                {
                    message = "Trop maigre.";
                }
                else if (img < 30)
                {
                    message = "Parfait.";
                }
                else
                {
                    message = "Surpoids.";
                }
            }
            else // Homme
            {
                if (img < 15)
                {
                    message = "Trop maigre.";
                }
                else if (img < 20)
                {
                    message = "Parfait.";
                }
                else
                {
                    message = "Surpoids.";
                }
            }
        }

        // Propriétés (utilisées par l'UI / sérialisation)
        public int Sexe
        {
            get { return sexe; }
            set { sexe = value; }
        }
        public int Poids
        {
            get { return poids; }
            set { poids = value; }
        }
        public int Taille
        {
            get { return taille; }
            set { taille = value; }
        }
        public int Age
        {
            get { return age; }
            set { age = value; }
        }
        public double Img
        {
            get { return img; }
            set { img = value; }
        }
        public string Message
        {
            get { return message; }
            set { message = value; }
        }

        // Anciens getters (compatibilité avec le code/tests existants)
        public int GetSexe() => Sexe;
        public double GetPoids() => Poids;
        public double GetTaille() => Taille;
        public int GetAge() => Age;
        public double GetImg() => Img;
        public string GetMessage() => Message;

        // Retourne le nom d'image correspondant au message
        public string GetImage()
        {
            return message switch
            {
                "Trop maigre." => "smiley_tropmaigre.png",
                "Parfait." => "smiley_parfait.png",
                "Surpoids." => "smiley_surpoids.png",
                _ => ""
            };
        }
    }
}
