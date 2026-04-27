using MauiAppCoach.Core.Modele;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace MauiAppCoach.outils
{
    abstract class Serializer
    {
        public static void serialize(string nomFichier, Profil profil)
        { 
            string fichier =
            Path.Combine(System.Environment.GetFolderPath(System.Environment.SpecialFolder.
            LocalApplicationData), nomFichier);

            if(File.Exists(fichier))
            {
                File.Delete(fichier);
            }
            try
            {
                // Sérialisation des objets de la collection
                string jsonString = JsonSerializer.Serialize(profil);

                // WriteAllText tronque et remplace le fichier cible s'il existe déjà
                File.WriteAllText(fichier, jsonString);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine($"Erreur lors de la sérialisation : ");
            }
        }

        public static Profil deserialize(string nomFichier)
        {
            Profil profil = null;
            string fichier =
            Path.Combine(System.Environment.GetFolderPath(System.Environment.SpecialFolder.
            LocalApplicationData), nomFichier);
            if (File.Exists(fichier))
            {
                try
                {
                   
                    string jsonString = File.ReadAllText(fichier);

                    // Récupération des données sérialisées
                    profil = JsonSerializer.Deserialize<Profil>(jsonString);
                }
                catch (Exception e)
                {
                    System.Diagnostics.Debug.WriteLine($"Erreur lors de la désérialisation : ");
                }
            }
            return profil;
        }
    }
}
