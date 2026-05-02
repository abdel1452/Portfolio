/**
 * Jeu de données volumineux (génération procédurale) + persistance localStorage.
 * Cible : > 500 enregistrements au total (clients + véhicules + ventes + employés).
 */
(function (w) {
  const STORAGE_KEY = "siocars-console-v2";
  const MIN_TOTAL_RECORDS = 500;

  const PRENOMS_M = [
    "Thomas", "Lucas", "Hugo", "Nathan", "Enzo", "Louis", "Gabriel", "Léo", "Raphaël", "Arthur",
    "Jules", "Ethan", "Noah", "Adam", "Tom", "Sacha", "Maxime", "Paul", "Antoine", "Alexandre",
    "Pierre", "Nicolas", "Julien", "Kevin", "Florian", "Romain", "Baptiste", "Valentin", "Matteo", "Théo",
    "Karim", "Mehdi", "Yanis", "Ryan", "Simon", "Benjamin", "Clément", "Damien", "Olivier", "Marc",
  ];
  const PRENOMS_F = [
    "Emma", "Léa", "Chloé", "Manon", "Camille", "Sarah", "Laura", "Julie", "Pauline", "Marine",
    "Clara", "Inès", "Zoé", "Lucie", "Alice", "Charlotte", "Sarah", "Élise", "Anaïs", "Margaux",
    "Océane", "Justine", "Audrey", "Céline", "Émilie", "Sophie", "Nathalie", "Isabelle", "Sandrine", "Patricia",
    "Léa", "Mia", "Rose", "Anna", "Elena", "Sofia", "Jade", "Lola", "Nina", "Eva",
  ];
  const NOMS = [
    "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau",
    "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier",
    "Girard", "Bonnet", "Dupont", "Lambert", "Fontaine", "Rousseau", "Blanc", "Guerin", "Muller", "Henry",
    "Roussel", "Nicolas", "Perrin", "Morin", "Mathieu", "Clement", "Gauthier", "Dumont", "Lopez", "Fabre",
    "Elidrissi", "Benali", "Kowalski", "Nguyen", "Silva", "Costa", "Jensen", "Schmidt", "Rossi", "Keller",
  ];
  const RUES = [
    "rue de la Paix", "avenue Victor Hugo", "boulevard Carnot", "rue Nationale", "impasse des Lilas",
    "chemin des Vignes", "rue du Stade", "avenue de la République", "route de Paris", "rue Pasteur",
    "place du Marché", "rue des Écoles", "boulevard Maritime", "rue Neuve", "allée des Tilleuls",
    "rue Gambetta", "avenue Jean Jaurès", "rue d’Amiens", "route nationale", "zone artisanale Nord",
  ];
  const VILLES = [
    { cp: "80000", ville: "Amiens" }, { cp: "75011", ville: "Paris" }, { cp: "59000", ville: "Lille" },
    { cp: "33000", ville: "Bordeaux" }, { cp: "69001", ville: "Lyon" }, { cp: "13001", ville: "Marseille" },
    { cp: "44000", ville: "Nantes" }, { cp: "35000", ville: "Rennes" }, { cp: "67000", ville: "Strasbourg" },
    { cp: "06000", ville: "Nice" }, { cp: "31000", ville: "Toulouse" }, { cp: "42000", ville: "Saint-Étienne" },
    { cp: "51100", ville: "Reims" }, { cp: "45000", ville: "Orléans" }, { cp: "21000", ville: "Dijon" },
    { cp: "14000", ville: "Caen" }, { cp: "76000", ville: "Rouen" }, { cp: "37000", ville: "Tours" },
    { cp: "25000", ville: "Besançon" }, { cp: "60200", ville: "Compiègne" }, { cp: "60800", ville: "Creil" },
    { cp: "02100", ville: "Saint-Quentin" }, { cp: "62200", ville: "Boulogne-sur-Mer" }, { cp: "76800", ville: "Saint-Étienne-du-Rouvray" },
  ];
  const PROFESSIONS = [
    "Commerçant", "Infirmier", "Enseignant", "Ingénieur", "Technicien", "Cadre", "Ouvrier", "Retraité",
    "Étudiant", "Avocat", "Architecte", "Pharmacien", "Agriculteur", "Artisan", "Consultant IT", "Chef d’entreprise",
    "Livreur", "Conducteur", "Agent administratif", "Commercial",
  ];
  const FIDELITES = ["Bronze", "Argent", "Or", "Platinum"];
  /* Modèles réels (gammes courantes EU) + silhouette pour l’illustration CSS/SVG (pas de photo) */
  const MARQUES = [
    {
      m: "Peugeot",
      mo: [
        ["208", "citadine"],
        ["e-208", "citadine"],
        ["2008", "suv"],
        ["308", "berline"],
        ["308 SW", "break"],
        ["3008", "suv"],
        ["5008", "suv"],
        ["408", "berline"],
        ["e-3008", "suv"],
      ],
    },
    {
      m: "Citroën",
      mo: [
        ["C3", "citadine"],
        ["ë-C3", "citadine"],
        ["C4", "berline"],
        ["ë-C4", "berline"],
        ["C5 Aircross", "suv"],
        ["C3 Aircross", "suv"],
        ["ë-C4 X", "suv"],
        ["Ami", "citadine"],
      ],
    },
    {
      m: "Renault",
      mo: [
        ["Clio", "citadine"],
        ["Captur", "suv"],
        ["Mégane E-Tech", "berline"],
        ["Austral", "suv"],
        ["Rafale", "suv"],
        ["Scenic E-Tech", "monospace"],
        ["Symbioz", "suv"],
        ["5 E-Tech", "berline"],
      ],
    },
    {
      m: "Dacia",
      mo: [
        ["Sandero", "citadine"],
        ["Sandero Stepway", "suv"],
        ["Duster", "suv"],
        ["Jogger", "monospace"],
        ["Spring", "citadine"],
      ],
    },
    {
      m: "Volkswagen",
      mo: [
        ["Polo", "citadine"],
        ["Golf", "berline"],
        ["T-Roc", "suv"],
        ["Tiguan", "suv"],
        ["Taigo", "suv"],
        ["ID.3", "berline"],
        ["ID.4", "suv"],
        ["ID.7", "berline"],
      ],
    },
    {
      m: "Škoda",
      mo: [
        ["Fabia", "citadine"],
        ["Scala", "berline"],
        ["Octavia", "berline"],
        ["Octavia Combi", "break"],
        ["Superb", "berline"],
        ["Kamiq", "suv"],
        ["Karoq", "suv"],
        ["Kodiaq", "suv"],
        ["Enyaq iV", "suv"],
      ],
    },
    {
      m: "Toyota",
      mo: [
        ["Yaris", "citadine"],
        ["Yaris Cross", "suv"],
        ["Corolla", "berline"],
        ["Corolla Touring Sports", "break"],
        ["C-HR", "suv"],
        ["RAV4", "suv"],
        ["bZ4X", "suv"],
        ["Prius", "berline"],
      ],
    },
    {
      m: "Ford",
      mo: [
        ["Puma", "suv"],
        ["Kuga", "suv"],
        ["Mustang Mach-E", "sport"],
        ["Explorer", "suv"],
      ],
    },
    {
      m: "BMW",
      mo: [
        ["Série 1", "berline"],
        ["Série 3", "berline"],
        ["X1", "suv"],
        ["X3", "suv"],
        ["iX1", "suv"],
        ["i4", "sport"],
        ["iX3", "suv"],
      ],
    },
    {
      m: "Mercedes",
      mo: [
        ["Classe A", "berline"],
        ["CLA", "berline"],
        ["GLA", "suv"],
        ["GLB", "suv"],
        ["EQA", "suv"],
      ],
    },
    {
      m: "Audi",
      mo: [
        ["A3 Sportback", "berline"],
        ["Q3", "suv"],
        ["Q4 e-tron", "suv"],
      ],
    },
    {
      m: "Nissan",
      mo: [
        ["Micra", "citadine"],
        ["Juke", "suv"],
        ["Qashqai", "suv"],
        ["Ariya", "suv"],
      ],
    },
    {
      m: "Hyundai",
      mo: [
        ["i20", "citadine"],
        ["Tucson", "suv"],
        ["Ioniq 5", "berline"],
        ["Ioniq 6", "berline"],
        ["Kona Electric", "suv"],
      ],
    },
    {
      m: "Kia",
      mo: [
        ["Ceed", "berline"],
        ["Sportage", "suv"],
        ["EV6", "sport"],
        ["Niro EV", "suv"],
      ],
    },
    {
      m: "Opel",
      mo: [
        ["Corsa", "citadine"],
        ["Mokka", "suv"],
        ["Astra", "berline"],
        ["Frontera", "suv"],
      ],
    },
    {
      m: "Fiat",
      mo: [
        ["500", "citadine"],
        ["500e", "citadine"],
        ["Panda", "citadine"],
        ["600e", "suv"],
      ],
    },
    {
      m: "Volvo",
      mo: [
        ["XC40", "suv"],
        ["XC60", "suv"],
        ["EX30", "suv"],
      ],
    },
    {
      m: "Tesla",
      mo: [
        ["Model 3", "berline"],
        ["Model Y", "suv"],
        ["Model S", "sport"],
      ],
    },
    {
      m: "Alpine",
      mo: [
        ["A110", "sport"],
        ["A290", "sport"],
      ],
    },
    {
      m: "DS",
      mo: [
        ["DS 3", "suv"],
        ["DS 7", "suv"],
        ["DS 9", "berline"],
      ],
    },
    {
      m: "MG",
      mo: [
        ["MG4 Electric", "berline"],
        ["ZS EV", "suv"],
      ],
    },
  ];
  const COULEURS = [
    "Blanc Nacré", "Noir Perla", "Gris Artense", "Bleu Magnetic", "Rouge Rubi", "Vert Mamba",
    "Orange Fusion", "Argent Highland", "Beige Dune", "Bleu Celadon",
  ];
  const FINITIONS = ["Active", "Allure", "GT", "Shine", "R-Line", "Intens", "Techno", "Business", "Luxury", "Sportline"];
  const MOTOS = [
    "Essence TCe 90", "Essence TCe 130", "Essence eTSI 150", "Hybride 136", "Hybride rechargeable 180",
    "Diesel BlueHDi 130", "Électrique 115 kW", "Électrique 150 kW", "E-Tech full hybrid 145",
  ];
  const FINANCEMENTS = ["Comptant", "Crédit", "LOA", "LLD"];
  const ASSURANCES = ["Standard", "Premium", "Premium + casco", "Pack conducteur", "Tous risques étendu"];
  const POSTES = [
    ["Conseiller vente VN", "Showroom"],
    ["Conseiller vente VO", "Occasion"],
    ["Responsable finance", "Finance & assurance"],
    ["Gestionnaire SAV", "Après-vente"],
    ["Chef atelier", "Mécanique"],
    ["Carrossier", "Carrosserie"],
    ["Livreur", "Logistique"],
    ["Chargée CRC", "Relation client"],
    ["Coordinateur atelier", "Après-vente"],
    ["Vendeur pièces", "Magasin"],
  ];

  function rnd(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pad(n, l) {
    let s = String(n);
    while (s.length < l) s = "0" + s;
    return s;
  }

  function randomVin() {
    const chars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";
    let s = rnd(["VF1", "VF3", "VF7", "WVW", "TMB", "WBA", "WDC"]);
    for (let i = 0; i < 14; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  function randomImmat() {
    const lettres = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const n = pad(rndInt(1, 999), 3);
    let a = "";
    for (let i = 0; i < 2; i++) a += lettres[rndInt(0, lettres.length - 1)];
    let b = "";
    for (let i = 0; i < 2; i++) b += lettres[rndInt(0, lettres.length - 1)];
    return `${a}-${n}-${b}`;
  }

  function slugEmail(prenom, nom, i) {
    let base = `${prenom}.${nom}`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/gi, "")
      .toLowerCase();
    if (!base || base === ".") base = `client${i}`;
    const dom = rnd(["email.fr", "outlook.fr", "gmail.com", "proton.me", "laposte.net"]);
    return `${base}${i % 17 === 0 && i > 0 ? rndInt(1, 9) : ""}@${dom}`;
  }

  function generateClients(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      const fem = Math.random() < 0.52;
      const prenom = fem ? rnd(PRENOMS_F) : rnd(PRENOMS_M);
      const nom = rnd(NOMS);
      const civ = fem ? "Mme" : "M.";
      const villeObj = rnd(VILLES);
      const hasCompl = Math.random() < 0.25;
      list.push({
        id: `CLI-2025-${pad(i + 1, 5)}`,
        civilite: civ,
        nom,
        prenom,
        email: slugEmail(prenom, nom, i),
        mobile: `0${rndInt(6, 7)} ${pad(rndInt(10, 99), 2)} ${pad(rndInt(10, 99), 2)} ${pad(rndInt(10, 99), 2)} ${pad(rndInt(10, 99), 2)}`,
        adresse: `${rndInt(1, 120)} ${rnd(RUES)}`,
        complement: hasCompl ? rnd(["Bât. A", "Appt. 4", "Rés. Les Glycines", "Étage 2", "Porte 12"]) : "",
        cp: villeObj.cp,
        ville: villeObj.ville,
        pays: "France",
        profession: rnd(PROFESSIONS),
        fidelite: rnd(FIDELITES),
        dateInscription: `20${rndInt(18, 25)}-${pad(rndInt(1, 12), 2)}-${pad(rndInt(1, 28), 2)}`,
        notes: Math.random() < 0.12 ? rnd(["Préfère RDV le samedi", "Allergie aux appels avant 9h", "Intéressé par l’électrique", "Reprise à estimer", ""]) : "",
      });
    }
    return list;
  }

  function generateVehicles(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      const pack = rnd(MARQUES);
      const moPick = rnd(pack.mo);
      const modele = moPick[0];
      const silhouette = moPick[1];
      const annee = rndInt(2022, 2026);
      list.push({
        id: `VEH-${pad(88000 + i, 5)}`,
        vin: randomVin(),
        immatriculation: "—",
        marque: pack.m,
        modele,
        silhouette,
        finition: rnd(FINITIONS),
        anneeModele: annee,
        motorisation: rnd(MOTOS),
        puissanceCh: rndInt(90, 320),
        co2: rndInt(0, 145),
        couleur: rnd(COULEURS),
        kilometrageLivraison: rndInt(5, 45),
        prixCatalogue: rndInt(18900, 62900),
        statut: "stock",
      });
    }
    return list;
  }

  function generateEmployees(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      const fem = Math.random() < 0.45;
      const prenom = fem ? rnd(PRENOMS_F) : rnd(PRENOMS_M);
      const nom = rnd(NOMS);
      const [poste, service] = rnd(POSTES);
      list.push({
        matricule: `EMP-${pad(i + 1, 3)}`,
        nom,
        prenom,
        poste,
        service,
        email: `${prenom[0].toLowerCase()}.${nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@siocars.demo`,
        dateEmbauche: `20${rndInt(14, 24)}-${pad(rndInt(1, 12), 2)}-${pad(rndInt(1, 28), 2)}`,
        actif: Math.random() > 0.06,
      });
    }
    return list;
  }

  function generateSales(numSales, clients, vehicles) {
    const sales = [];
    const idxV = vehicles.map((_, i) => i).sort(() => Math.random() - 0.5);
    const counts = {};
    const maxPerClient = 5;

    for (let k = 0; k < numSales && k < idxV.length; k++) {
      const vi = idxV[k];
      const v = vehicles[vi];
      let c;
      let guard = 0;
      do {
        c = rnd(clients);
        guard++;
      } while ((counts[c.id] || 0) >= maxPerClient && guard < 80);
      counts[c.id] = (counts[c.id] || 0) + 1;

      v.statut = "vendu";
      v.immatriculation = randomImmat();

      const fin = rnd(FINANCEMENTS);
      const prix = Math.round(v.prixCatalogue * (0.92 + Math.random() * 0.08));
      const duree = fin === "Comptant" ? 0 : rnd([24, 36, 48, 60, 72]);
      const apport = fin === "Comptant" ? prix : rndInt(2000, 12000);
      const mensualite =
        fin === "Comptant" ? 0 : Math.round((prix - apport) / duree + rndInt(15, 85));

      sales.push({
        idVente: `VEN-2025-${pad(3000 + k, 4)}`,
        refContrat: `CONC-SIO-2025-${pad(7000 + k, 5)}`,
        clientId: c.id,
        vehicleId: v.id,
        dateVente: `2025-${pad(rndInt(1, 6), 2)}-${pad(rndInt(1, 28), 2)}`,
        dateLivraison: `2025-${pad(rndInt(3, 9), 2)}-${pad(rndInt(1, 28), 2)}`,
        prixVenteTTC: prix,
        financement: fin,
        dureeMois: duree,
        apport,
        mensualite,
        assurancePack: rnd(ASSURANCES),
        repriseMontant: Math.random() < 0.55 ? rndInt(0, 14500) : 0,
        vendeurMatricule: `EMP-${pad(rndInt(1, 48), 3)}`,
      });
    }
    return sales;
  }

  function generateFullDataset() {
    const clients = generateClients(430);
    const vehicles = generateVehicles(400);
    const sales = generateSales(340, clients, vehicles);
    const employees = generateEmployees(48);
    return { clients, vehicles, sales, employees, generatedAt: new Date().toISOString() };
  }

  function totalRecords(d) {
    return d.clients.length + d.vehicles.length + d.sales.length + d.employees.length;
  }

  function loadOrCreate() {
    let data = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) data = JSON.parse(raw);
    } catch (e) {
      data = null;
    }
    if (!data || !data.clients || totalRecords(data) < MIN_TOTAL_RECORDS) {
      data = generateFullDataset();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    return data;
  }

  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return loadOrCreate();
  }

  w.SioCarsData = {
    STORAGE_KEY,
    loadOrCreate,
    save,
    reset,
    totalRecords,
    generateFullDataset,
  };
})(window);
