/**
 * Données de démo — équivalent des tables MySQL (categorie, gamme, produit, magasin).
 * Remplace le back-end PHP / mysqli pour la version HTML statique.
 */
window.FM_DATA = {
  categories: [
    { id: 1, libelle: "Salon" },
    { id: 2, libelle: "Chambre" },
    { id: 3, libelle: "Salle à manger" },
    { id: 4, libelle: "Bureau" },
  ],
  gammes: [
    { id: 1, libelle: "Essentiel" },
    { id: 2, libelle: "Confort" },
    { id: 3, libelle: "Premium" },
    { id: 4, libelle: "Scandinave" },
  ],
  magasins: [
    {
      code: "PAR01",
      nom: "France-Mobilier Paris Bastille",
      adresse: "12 rue de la Roquette",
      cpVille: "75011 Paris",
    },
    {
      code: "LYO01",
      nom: "France-Mobilier Lyon Part-Dieu",
      adresse: "45 cours Lafayette",
      cpVille: "69003 Lyon",
    },
    {
      code: "MAR01",
      nom: "France-Mobilier Marseille",
      adresse: "8 la Canebière",
      cpVille: "13001 Marseille",
    },
  ],
  produits: [
    { id: 1, reference: "SL-CAN-01", designation: "Canapé 3 places tissu gris", prixTTC: 599.9, photo: "canape", categorie: 1, gamme: 2 },
    { id: 2, reference: "SL-TAB-02", designation: "Table basse chêne massif", prixTTC: 249.0, photo: "tablebasse", categorie: 1, gamme: 3 },
    { id: 3, reference: "SL-BIB-03", designation: "Bibliothèque 5 niveaux blanc", prixTTC: 189.5, photo: "biblio", categorie: 1, gamme: 1 },
    { id: 4, reference: "CH-LIT-01", designation: "Lit 160×200 avec tête de lit", prixTTC: 449.0, photo: "lit", categorie: 2, gamme: 2 },
    { id: 5, reference: "CH-ARM-02", designation: "Armoire 2 portes miroir", prixTTC: 379.0, photo: "armoire", categorie: 2, gamme: 1 },
    { id: 6, reference: "CH-COM-03", designation: "Commode 6 tiroirs chêne", prixTTC: 299.0, photo: "commode", categorie: 2, gamme: 4 },
    { id: 7, reference: "SA-TAB-01", designation: "Table à manger 6 personnes", prixTTC: 529.0, photo: "tablesam", categorie: 3, gamme: 3 },
    { id: 8, reference: "SA-CHA-02", designation: "Lot de 4 chaises velours", prixTTC: 320.0, photo: "chaises", categorie: 3, gamme: 2 },
    { id: 9, reference: "SA-BUF-03", designation: "Buffet 3 portes laqué blanc", prixTTC: 410.0, photo: "buffet", categorie: 3, gamme: 4 },
    { id: 10, reference: "BU-BUR-01", designation: "Bureau plateau 140 cm + caisson", prixTTC: 289.0, photo: "bureau", categorie: 4, gamme: 1 },
    { id: 11, reference: "BU-FAU-02", designation: "Fauteuil de bureau ergonomique", prixTTC: 199.0, photo: "fauteuil", categorie: 4, gamme: 2 },
    { id: 12, reference: "BU-ETG-03", designation: "Étagère murale 3 tablettes", prixTTC: 79.9, photo: "etagere", categorie: 4, gamme: 1 },
  ],
};
