/**
 * Snack Palace — carte alignée sur Uber Eats (fiche restaurant Amiens).
 * Source menu / prix / descriptions : https://www.ubereats.com/fr/store/le-snack-palace/8mM4xDSKSPe6TTBLXY8hMg
 * (consultation janvier 2026 — tarifs et dispo sous réserve du restaurant).
 * Images locales : images/plats/{id}.jpg — le nom de fichier = l’id du plat (ex. ue-chicago.jpg).
 * Visuels : pizzas / cuisine italienne (Unsplash, illustratif). Retélécharger : node download-plat-images.mjs
 */
window.SNACK_META = {
  name: "Le Snack Palace",
  /** Accroche type « Mosaïque Pizza c'est la base ! » — ton convivial, slogan fort */
  headline: "Snack Palace, c'est la base !",
  /** Sous-titre type site pizzeria nationale */
  subhead: "Pizzas en livraison, à emporter et sur place",
  /** Paragraphe d’accueil (promesse qualité, comme les grandes enseignes) */
  intro:
    "Pâte fraîche faite maison, garnitures généreuses et recettes qui ont du caractère. À Amiens, retrouvez nos classiques sauce tomate, crème, barbecue ou Brazil — commandez sur Uber Eats, retirez au comptoir ou installez-vous sur place.",
  /** Bandeau promo (exemple — les vraies offres sont sur Uber Eats) */
  promoBar:
    "Exemple d’offre (maquette) : pensez à vérifier les promos en cours sur Uber Eats et au restaurant.",
  tagline: "Pizzeria artisanale · Amiens",
  address: "41 rue Pierre Corneille, 80080 Amiens",
  area: "Amiens",
  phone: "09 83 23 97 83",
  phoneTel: "tel:+33983239783",
  hours: [
    { days: "Lun — jeu", time: "11h30 — 14h · 18h — 22h" },
    { days: "Ven", time: "18h — 22h" },
    { days: "Sam", time: "11h30 — 14h · 18h — 22h" },
    { days: "Dim", time: "18h — 22h" },
  ],
  deliveryEta: "Selon Uber Eats",
  deliveryNote: "Frais de livraison affichés sur Uber Eats (ex. 4,99 € selon zone)",
  rating: "4,7",
  reviews: "75+",
  official: "https://snack-palace.eatbu.com/?lang=fr",
  uberEats:
    "https://www.ubereats.com/fr/store/le-snack-palace/8mM4xDSKSPe6TTBLXY8hMg",
  /** Blocs « confiance » façon site vitrine pizzeria (Mosaïque / grandes enseignes) */
  trustBlocks: [
    {
      title: "Pâte faite maison",
      text: "Travail artisanal sur place : pâte reposée et façonnée pour un moelleux au rendez-vous.",
      icon: "🍕",
    },
    {
      title: "Livraison, à emporter ou sur place",
      text: "Uber Eats, retrait au Snack Palace ou moment sur place : vous choisissez.",
      icon: "🛵",
    },
    {
      title: "Ouvert le week-end & soirs",
      text: "Des horaires pensés pour les petits creux du midi et les soirées pizza entre amis.",
      icon: "⭐",
    },
  ],
};

function platImg(id) {
  return "images/plats/" + id + ".jpg";
}

window.SNACK_CATEGORIES = [
  { id: "all", label: "Tout", icon: "✦" },
  { id: "pizza-creme", label: "Crème fraîche", icon: "🍕" },
  { id: "pizza-tomate", label: "Sauce tomate", icon: "🍅" },
  { id: "pizza-bbq", label: "Sauce barbecue", icon: "🔥" },
  { id: "pizza-brazil", label: "Sauce Brazil", icon: "🌶" },
];

window.SNACK_ITEMS = [
  {
    id: "ue-chicago",
    cat: "pizza-creme",
    name: "Pizza Chicago",
    desc: "Pâte fraîche, crème fraîche, viande hachée, blanc de poulet fumé, cheddar et œuf. Taille au choix.",
    price: 13.0,
    img: platImg("ue-chicago"),
  },
  {
    id: "ue-french-burger",
    cat: "pizza-creme",
    name: "Pizza French burger",
    desc: "Pâte fraîche, crème fraîche, viande hachée, cheddar, oignons rouges, pickles et ketchup. Taille au choix.",
    price: 13.0,
    img: platImg("ue-french-burger"),
  },
  {
    id: "ue-saumon",
    cat: "pizza-creme",
    name: "Pizza saumon",
    desc: "Pâte fraîche, crème fraîche, saumon fumé et tomates fraîches. Taille au choix.",
    price: 13.0,
    img: platImg("ue-saumon"),
  },
  {
    id: "ue-savoyarde",
    cat: "pizza-creme",
    name: "Pizza savoyarde",
    desc: "Pâte fraîche, crème fraîche, pommes de terre, lardons et reblochon. Taille au choix.",
    price: 13.0,
    img: platImg("ue-savoyarde"),
  },
  {
    id: "ue-forestiere",
    cat: "pizza-creme",
    name: "Pizza forestière",
    desc: "Pâte fraîche, crème fraîche, viande hachée, chèvre, pommes de terre et oignons rouges. Taille au choix.",
    price: 13.0,
    img: platImg("ue-forestiere"),
  },
  {
    id: "ue-chevre-miel",
    cat: "pizza-creme",
    name: "Pizza chèvre miel",
    desc: "Pâte fraîche, crème fraîche, fromage de chèvre, miel et olives. Taille au choix.",
    price: 13.0,
    img: platImg("ue-chevre-miel"),
  },
  {
    id: "ue-hawaienne",
    cat: "pizza-creme",
    name: "Pizza hawaïenne",
    desc: "Pâte fraîche, crème fraîche, poulet, poivrons et ananas. Taille au choix.",
    price: 13.0,
    img: platImg("ue-hawaienne"),
  },
  {
    id: "ue-chef",
    cat: "pizza-creme",
    name: "Pizza chef",
    desc: "Pâte fraîche, crème fraîche, poulet, lardons, pommes de terre et olives. Taille au choix.",
    price: 13.0,
    img: platImg("ue-chef"),
  },
  {
    id: "ue-milano",
    cat: "pizza-creme",
    name: "Pizza Milano",
    desc: "Pâte fraîche, crème fraîche, pommes de terre, œuf, lardons et jambon. Taille au choix.",
    price: 13.0,
    img: platImg("ue-milano"),
  },
  {
    id: "ue-normande",
    cat: "pizza-creme",
    name: "Pizza normande",
    desc: "Pâte fraîche, crème fraîche, poulet, champignons et oignons rouges. Taille au choix.",
    price: 13.0,
    img: platImg("ue-normande"),
  },
  {
    id: "ue-4fromages",
    cat: "pizza-tomate",
    name: "Pizza 4 fromages",
    desc: "Pâte fraîche, sauce tomate, mozzarella, fromage de chèvre, brie et emmental. Taille au choix.",
    price: 13.0,
    img: platImg("ue-4fromages"),
  },
  {
    id: "ue-royale",
    cat: "pizza-tomate",
    name: "Pizza royale",
    desc: "Pâte fraîche, sauce tomate, poulet, viande hachée et merguez. Taille au choix.",
    price: 13.0,
    img: platImg("ue-royale"),
  },
  {
    id: "ue-sicilienne",
    cat: "pizza-tomate",
    name: "Pizza sicilienne",
    desc: "Pâte fraîche, sauce tomate, viande hachée, jambon et merguez. Taille au choix.",
    price: 13.0,
    img: platImg("ue-sicilienne"),
  },
  {
    id: "ue-marguerita",
    cat: "pizza-tomate",
    name: "Pizza Marguerita",
    desc: "Pâte fraîche, sauce tomate, mozzarella et origan. Taille au choix.",
    price: 11.0,
    img: platImg("ue-marguerita"),
  },
  {
    id: "ue-orientale",
    cat: "pizza-tomate",
    name: "Pizza orientale",
    desc: "Pâte fraîche, sauce tomate, merguez, poivrons et œuf. Taille au choix.",
    price: 13.0,
    img: platImg("ue-orientale"),
  },
  {
    id: "ue-sorento",
    cat: "pizza-tomate",
    name: "Pizza sorento",
    desc: "Pâte fraîche, sauce tomate, chorizo et merguez. Taille au choix.",
    price: 13.0,
    img: platImg("ue-sorento"),
  },
  {
    id: "ue-reine",
    cat: "pizza-tomate",
    name: "Pizza Reine",
    desc: "Pâte fraîche, sauce tomate, jambon et champignons. Taille au choix.",
    price: 13.0,
    img: platImg("ue-reine"),
  },
  {
    id: "ue-vegetarienne",
    cat: "pizza-tomate",
    name: "Pizza végétarienne",
    desc: "Pâte fraîche, sauce tomate, olives, champignons, poivrons, oignons rouges et tomates fraîches. Taille au choix.",
    price: 13.0,
    img: platImg("ue-vegetarienne"),
  },
  {
    id: "ue-fruits-mer",
    cat: "pizza-tomate",
    name: "Pizza fruits de mer",
    desc: "Sauce tomate et cocktail de fruits de mer. Taille au choix.",
    price: 13.0,
    img: platImg("ue-fruits-mer"),
  },
  {
    id: "ue-buffalo",
    cat: "pizza-bbq",
    name: "Pizza Buffalo",
    desc: "Pâte fraîche, sauce barbecue, lardons, viande hachée, poivrons et oignons rouges. Taille au choix.",
    price: 13.0,
    img: platImg("ue-buffalo"),
  },
  {
    id: "ue-texas",
    cat: "pizza-bbq",
    name: "Pizza Texas",
    desc: "Pâte fraîche, sauce barbecue, chorizo, pickles et oignons rouges. Taille au choix.",
    price: 13.0,
    img: platImg("ue-texas"),
  },
  {
    id: "ue-indienne",
    cat: "pizza-brazil",
    name: "Pizza indienne",
    desc: "Pâte fraîche, sauce Brazil, poulet au curry, poivrons et oignons rouges. Taille au choix.",
    price: 13.0,
    img: platImg("ue-indienne"),
  },
  {
    id: "ue-palace",
    cat: "pizza-brazil",
    name: "Pizza palace",
    desc: "Pâte fraîche, sauce Brazil, poulet, viande hachée et pommes de terre. Taille au choix.",
    price: 13.0,
    img: platImg("ue-palace"),
  },
];
