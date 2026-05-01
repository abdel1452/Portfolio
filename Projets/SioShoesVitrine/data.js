/**
 * SIO Shoes — 3 catégories × 10 modèles (30). Noms commerciaux réels.
 * Visuels locaux : dossier « image shoes », fichier = id produit (.jpg).
 * Retéléchargement : node download-shoe-images.mjs (IDs Unsplash dans ce script).
 */
(function () {
  function img(id) {
    return "image shoes/" + id + ".jpg";
  }

  window.SIO_SHOES_PRODUCTS = [
    { id: "nk-pegasus-41", cat: "running", name: "Nike Air Zoom Pegasus 41", desc: "Route polyvalente, ReactX, Zoom Air avant-pied.", price: 139.99, img: img("nk-pegasus-41") },
    { id: "nk-vaporfly-3", cat: "running", name: "Nike Vaporfly 3", desc: "Compétition, plaque carbone, ZoomX.", price: 249.99, img: img("nk-vaporfly-3") },
    { id: "nk-invincible-3", cat: "running", name: "Nike Invincible 3", desc: "Max confort ZoomX, longues distances.", price: 189.99, img: img("nk-invincible-3") },
    { id: "nk-infinityrn-4", cat: "running", name: "Nike InfinityRN 4", desc: "Stabilité légère, Flyknit quotidien.", price: 159.99, img: img("nk-infinityrn-4") },
    { id: "nk-zoom-fly-5", cat: "running", name: "Nike Zoom Fly 5", desc: "Tempo, fibre carbone, ZoomX.", price: 169.99, img: img("nk-zoom-fly-5") },
    { id: "ad-ultraboost-light", cat: "running", name: "adidas Ultraboost Light", desc: "Boost léger, Primeknit+.", price: 179.99, img: img("ad-ultraboost-light") },
    { id: "ad-adios-pro-3", cat: "running", name: "adidas Adizero Adios Pro 3", desc: "Course, EnergyRods, Lightstrike Pro.", price: 229.99, img: img("ad-adios-pro-3") },
    { id: "ad-boston-12", cat: "running", name: "adidas Adizero Boston 12", desc: "Entraînement rapide, Lightstrike Pro.", price: 149.99, img: img("ad-boston-12") },
    { id: "as-kayano-31", cat: "running", name: "ASICS Gel-Kayano 31", desc: "Stabilité, Gel, tige technique.", price: 189.99, img: img("as-kayano-31") },
    { id: "as-nimbus-26", cat: "running", name: "ASICS Gel-Nimbus 26", desc: "Neutre max confort, FF Blast+ Eco.", price: 179.99, img: img("as-nimbus-26") },

    { id: "nk-af1-07", cat: "lifestyle", name: "Nike Air Force 1 '07", desc: "Basket basse cuir, unit Air.", price: 119.99, img: img("nk-af1-07") },
    { id: "nk-dunk-low", cat: "lifestyle", name: "Nike Dunk Low Retro", desc: "Skate / lifestyle, semelle gomme.", price: 119.99, img: img("nk-dunk-low") },
    { id: "nk-airmax-90", cat: "lifestyle", name: "Nike Air Max 90", desc: "Iconique 90s, bulle Air visible.", price: 139.99, img: img("nk-airmax-90") },
    { id: "nk-blazer-mid", cat: "lifestyle", name: "Nike Blazer Mid '77 Vintage", desc: "Montante suédée rétro.", price: 109.99, img: img("nk-blazer-mid") },
    { id: "ad-samba-og", cat: "lifestyle", name: "adidas Samba OG", desc: "Heritage indoor, cuir et daim.", price: 99.99, img: img("ad-samba-og") },
    { id: "ad-gazelle", cat: "lifestyle", name: "adidas Gazelle", desc: "Classique daim, semelle gomme.", price: 109.99, img: img("ad-gazelle") },
    { id: "ad-campus-00s", cat: "lifestyle", name: "adidas Campus 00s", desc: "Chunky 2000s, daim épais.", price: 119.99, img: img("ad-campus-00s") },
    { id: "nb-550", cat: "lifestyle", name: "New Balance 550", desc: "Rétro 80s, cuir.", price: 119.99, img: img("nb-550") },
    { id: "nb-574", cat: "lifestyle", name: "New Balance 574", desc: "Outdoor lifestyle, suede mesh.", price: 99.99, img: img("nb-574") },
    { id: "puma-suede-classic", cat: "lifestyle", name: "Puma Suede Classic XXI", desc: "Daim, semelle contrastée.", price: 79.99, img: img("puma-suede-classic") },

    { id: "nk-jordan-1-high", cat: "basket", name: "Air Jordan 1 Retro High OG", desc: "Montante cuir, semelle Air.", price: 189.99, img: img("nk-jordan-1-high") },
    { id: "nk-lebron-21", cat: "basket", name: "Nike LeBron 21", desc: "Soutien cheville, Zoom Air salle.", price: 179.99, img: img("nk-lebron-21") },
    { id: "nk-gt-cut-3", cat: "basket", name: "Nike G.T. Cut 3", desc: "Jeu rapide, ZoomX bas-top.", price: 169.99, img: img("nk-gt-cut-3") },
    { id: "nk-zoom-freak-6", cat: "basket", name: "Nike Giannis Freak 6", desc: "Signature Giannis Antetokounmpo.", price: 119.99, img: img("nk-zoom-freak-6") },
    { id: "ad-harden-vol8", cat: "basket", name: "adidas Harden Vol. 8", desc: "James Harden, Lightstrike.", price: 149.99, img: img("ad-harden-vol8") },
    { id: "ad-dame-9", cat: "basket", name: "adidas Dame 9", desc: "Damian Lillard.", price: 119.99, img: img("ad-dame-9") },
    { id: "nb-two-wxy-v4", cat: "basket", name: "New Balance TWO WXY v4", desc: "Performance salle.", price: 129.99, img: img("nb-two-wxy-v4") },
    { id: "puma-mb03", cat: "basket", name: "Puma MB.03", desc: "LaMelo Ball.", price: 129.99, img: img("puma-mb03") },
    { id: "aj4-retro", cat: "basket", name: "Air Jordan 4 Retro", desc: "Iconique 1989, Air visible.", price: 209.99, img: img("aj4-retro") },
    { id: "nk-kd-17", cat: "basket", name: "Nike KD 17", desc: "Kevin Durant, Zoom.", price: 149.99, img: img("nk-kd-17") },
  ];
})();
