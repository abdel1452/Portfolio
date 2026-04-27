using MauiAppCoach.Core.Modele;
using MauiAppCoach.outils;
using Microsoft.Maui.Graphics;
using System;

namespace MauiAppCoach
{
    public partial class MainPage : ContentPage
    {
        private readonly string nomFichier = "saveprofil";

        public MainPage()
        {
            InitializeComponent();
            InitialiserChamps();
            RecupProfil();
        }

        private void btCalculer_Clicked(object sender, EventArgs e)
        {
            try
            {
                var poids = int.Parse(entPoids.Text);
                var taille = int.Parse(entTaille.Text);
                var age = int.Parse(entAge.Text);

                int sexe = rdHomme.IsChecked ? 1 : 0;

                // Création du modèle
                Profil unProfil = new Profil(sexe, poids, taille, age);

                // Affichage des résultats
                AfficherResultat(unProfil);

                // Sauvegarde du profil
                 Serializer.serialize(nomFichier, unProfil);
            }
            catch (Exception ex)
            {
                DisplayAlert("Erreur", "Saisie incorrecte", "OK");
            }
        }

        private void RecupProfil()
        {
            try
            {
                Profil unProfil = null;
                // unProfil = Serializer.deserialize(nomFichier);

                if (unProfil != null)
                {
                    entPoids.Text = unProfil.Poids.ToString();
                    entTaille.Text = unProfil.Taille.ToString();
                    entAge.Text = unProfil.Age.ToString();

                    if (unProfil.Sexe == 1)
                    {
                        rdHomme.IsChecked = true;
                    }
                    else
                    {
                        rdFemme.IsChecked = true;
                    }

                    // Affichage des résultats sauvegardés
                    AfficherResultat(unProfil);
                }
                else
                {
                    // Si aucun profil sauvegardé, on initialise les champs à zéro
                    InitialiserChamps();
                }
            }
            catch (Exception ex)
            {
                DisplayAlert("Erreur", "Erreur lors de la récupération des données", "OK");
                InitialiserChamps();
            }
        }

        private void InitialiserChamps()
        {
            // Initialisation des champs Entry à zéro
            entPoids.Text = "0";
            entTaille.Text = "0";
            entAge.Text = "0";

            // Initialisation du RadioButton (Homme par défaut)
            rdHomme.IsChecked = true;
            rdFemme.IsChecked = false;

            // Réinitialisation de l'affichage
            lblImg.Text = "Votre IMG :";
            lblImg.TextColor = Colors.Black;
            imgResultat.Source = null;
        }

        private void AfficherResultat(Profil profil)
        {
            // Affichage du texte avec l'IMG et le message
            lblImg.Text = "Votre IMG : " + profil.Img.ToString("F2") + "% - " + profil.Message;

            // Affichage de l'image
          /*  imgResultat.Source = profil.GetImage();*/

            // Application de la couleur selon le message
            string message = profil.Message;
            if (message == "Trop maigre.")
            {
                imgResultat.Source = "smiley_tropmaigre";
                lblImg.TextColor = Colors.Red;
            }
            else if (message == "Parfait.")
            {
                imgResultat.Source = "smiley_parfait";
                lblImg.TextColor = Colors.Green;
            }
            else if (message == "Surpoids.")
            {
                imgResultat.Source = "smiley_surpoids";
                lblImg.TextColor = Colors.Red;
            }
            else
            {
                lblImg.TextColor = Colors.Black;
            }
        }
    }
}
