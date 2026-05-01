/**
 * France-Mobilier — logique côté client (équivalent index.php + c_consulterProduits).
 */
(function () {
  "use strict";

  const data = window.FM_DATA;
  if (!data) return;

  const selCateg = document.getElementById("categ");
  const selGam = document.getElementById("gam");
  const viewAccueil = document.getElementById("view-accueil");
  const viewListe = document.getElementById("view-liste");
  const titreListe = document.getElementById("titre-liste");
  const tbody = document.getElementById("tbody-produits");
  const formFiltre = document.getElementById("form-filtre");
  const formNews = document.getElementById("form-newsletter");

  function fmtPrix(n) {
    return (
      n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
    );
  }

  function photoUrl(basename) {
    return "images/produits/" + encodeURIComponent(basename) + ".jpg";
  }

  function remplirSelects() {
    data.categories.forEach(function (c) {
      const o = document.createElement("option");
      o.value = String(c.id);
      o.textContent = c.libelle;
      selCateg.appendChild(o);
    });
    data.gammes.forEach(function (g) {
      const o = document.createElement("option");
      o.value = String(g.id);
      o.textContent = g.libelle;
      selGam.appendChild(o);
    });
  }

  function magasinsHtml() {
    const el = document.getElementById("liste-magasins");
    if (!el) return;
    el.innerHTML = data.magasins
      .map(function (m) {
        return (
          "<h3 class=\"h6 mb-2\">" +
          escapeHtml(m.nom) +
          " — " +
          escapeHtml(m.adresse) +
          ", " +
          escapeHtml(m.cpVille) +
          "</h3>"
        );
      })
      .join("");
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function filtrerProduits(idCateg, idGam) {
    const c = parseInt(idCateg, 10) || 0;
    const g = parseInt(idGam, 10) || 0;
    return data.produits.filter(function (p) {
      if (c && p.categorie !== c) return false;
      if (g && p.gamme !== g) return false;
      return true;
    });
  }

  function libelleCateg(id) {
    const x = data.categories.find(function (c) {
      return c.id === id;
    });
    return x ? x.libelle : "";
  }

  function libelleGamme(id) {
    const x = data.gammes.find(function (g) {
      return g.id === id;
    });
    return x ? x.libelle : "";
  }

  function afficherAccueil() {
    viewAccueil.hidden = false;
    viewListe.hidden = true;
  }

  function afficherListe(idCateg, idGam) {
    const c = parseInt(idCateg, 10) || 0;
    const g = parseInt(idGam, 10) || 0;
    const liste = filtrerProduits(idCateg, idGam);

    let sousTitre = "";
    if (!c && !g) {
      sousTitre = "Tous les produits";
    } else if (c && g) {
      sousTitre = "Catégorie : " + libelleCateg(c) + " — Gamme : " + libelleGamme(g);
    } else if (c) {
      sousTitre = "Catégorie : " + libelleCateg(c);
    } else {
      sousTitre = "Gamme : " + libelleGamme(g);
    }
    titreListe.textContent = sousTitre;

    tbody.innerHTML = "";
    liste.forEach(function (p) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        escapeHtml(p.reference) +
        "</td>" +
        "<td><img src=\"" +
        photoUrl(p.photo) +
        "\" alt=\"" +
        escapeHtml(p.designation) +
        "\" class=\"img-thumbnail\" style=\"max-width:80px;height:auto;\"></td>" +
        "<td>" +
        escapeHtml(p.designation) +
        "</td>" +
        "<td><strong>" +
        fmtPrix(p.prixTTC) +
        "</strong></td>";
      tbody.appendChild(tr);
    });

    viewAccueil.hidden = true;
    viewListe.hidden = false;
  }

  document.getElementById("btn-accueil").addEventListener("click", function (e) {
    e.preventDefault();
    afficherAccueil();
  });

  formFiltre.addEventListener("submit", function (e) {
    e.preventDefault();
    afficherListe(selCateg.value, selGam.value);
  });

  formNews.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = formNews.querySelector('[name="email"]').value.trim();
    if (!email) return;
    alert(
      "Version HTML statique : aucun envoi réel.\n\nEmail saisi : " +
        email +
        "\n\nEn production PHP, cette demande irait vers index.php?page=newsletter."
    );
    formNews.reset();
  });

  remplirSelects();
  magasinsHtml();
  afficherAccueil();
})();
