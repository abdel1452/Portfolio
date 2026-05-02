/**
 * Utilitaires UI partagés (pagination, formatage).
 */
(function (w) {
  w.SioCarsUI = {
    escapeHtml(s) {
      const d = document.createElement("div");
      d.textContent = s == null ? "" : String(s);
      return d.innerHTML;
    },

    formatMoney(n) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(n);
    },

    vehicleById(state, id) {
      return state.vehicles.find((v) => v.id === id);
    },

    clientById(state, id) {
      return state.clients.find((c) => c.id === id);
    },

    employeeByMatricule(state, matricule) {
      return state.employees.find((e) => e.matricule === matricule);
    },

    saleForVehicle(state, vehicleId) {
      return state.sales.find((s) => s.vehicleId === vehicleId);
    },

    salesForClient(state, clientId) {
      return state.sales.filter((s) => s.clientId === clientId);
    },

    salesForSeller(state, matricule) {
      return state.sales.filter((s) => s.vendeurMatricule === matricule);
    },

    brandHue(marque) {
      const known = {
        Peugeot: 210,
        Renault: 12,
        Citroën: 195,
        Citroen: 195,
        Volkswagen: 205,
        Audi: 215,
        BMW: 220,
        Mercedes: 265,
        "Mercedes-Benz": 265,
        Ford: 225,
        Toyota: 155,
        Nissan: 175,
        Hyundai: 200,
        Kia: 185,
        Fiat: 25,
        Opel: 35,
        Dacia: 30,
        Skoda: 175,
        Škoda: 175,
        Seat: 200,
        Cupra: 200,
        Tesla: 350,
        Volvo: 200,
        Mazda: 5,
        Honda: 340,
        Suzuki: 140,
        Mini: 330,
        Jeep: 28,
        Land: 95,
        Jaguar: 160,
        Porsche: 25,
        Alpine: 265,
        DS: 265,
        MG: 32,
      };
      if (known[marque] != null) return known[marque];
      let h = 0;
      for (let i = 0; i < marque.length; i++) {
        h = (h + marque.charCodeAt(i) * (i + 1)) % 360;
      }
      return h;
    },

    /** Silhouette parc (donnée générée ou défaut pour anciennes données localStorage) */
    silhouetteForVehicle(v) {
      if (v && v.silhouette) return v.silhouette;
      return "berline";
    },

    /** Regroupe les silhouettes pour un SVG simplifié (pas de photo) */
    silhouetteSvgKind(silhouette) {
      const s = silhouette || "berline";
      if (s === "citadine") return "compact";
      if (s === "suv" || s === "monospace") return "suv";
      return "sedan";
    },

    /**
     * Illustration vectorielle type “photo de profil” (SVG inline, pas d’URL image).
     */
    vehicleSilhouetteSvg(silhouette) {
      const kind = this.silhouetteSvgKind(silhouette);
      const paths = {
        compact: "M22 76 L38 58 L102 52 L178 54 L202 64 L208 76 L204 88 L26 88 Z",
        sedan: "M16 78 L36 54 L118 48 L192 50 L214 62 L222 76 L218 90 L20 90 Z",
        suv: "M14 80 L34 50 L120 44 L188 46 L212 56 L226 72 L228 80 L224 92 L18 92 Z",
      };
      const d = paths[kind];
      return `<svg class="sc-vehicle-svg sc-vehicle-svg--${kind}" viewBox="0 0 240 100" aria-hidden="true" focusable="false"><path class="sc-vehicle-svg__body" d="${d}" /></svg>`;
    },

    /** Monogramme marque + modèle (texte seulement) */
    vehicleMonogramHtml(marque, modele) {
      const m = modele.length > 20 ? `${modele.slice(0, 18)}…` : modele;
      return `<div class="sc-vehicle-card__monogram"><span class="sc-vehicle-card__monogram-model">${this.escapeHtml(m)}</span><span class="sc-vehicle-card__monogram-brand">${this.escapeHtml(marque.toUpperCase())}</span></div>`;
    },

    /**
     * @param {HTMLElement} container - élément qui recevra les boutons
     * @param {{page:number,pages:number,onPage:(n:number)=>void}} opts
     */
    renderPagination(container, opts) {
      const { page, pages, onPage } = opts;
      if (pages <= 1) {
        container.innerHTML = "";
        container.classList.add("d-none");
        return;
      }
      container.classList.remove("d-none");
      const ul = document.createElement("ul");
      ul.className = "pagination pagination-sm mb-0 justify-content-center flex-wrap";

      function li(label, p, disabled, active) {
        const item = document.createElement("li");
        item.className = `page-item${disabled ? " disabled" : ""}${active ? " active" : ""}`;
        const a = document.createElement("button");
        a.type = "button";
        a.className = "page-link";
        a.textContent = label;
        if (!disabled && !active) a.addEventListener("click", () => onPage(p));
        item.appendChild(a);
        return item;
      }

      ul.appendChild(li("«", page - 1, page <= 1, false));
      const win = 5;
      let start = Math.max(1, page - 2);
      let end = Math.min(pages, start + win - 1);
      if (end - start < win - 1) start = Math.max(1, end - win + 1);
      for (let p = start; p <= end; p++) {
        ul.appendChild(li(String(p), p, false, p === page));
      }
      ul.appendChild(li("»", page + 1, page >= pages, false));
      container.innerHTML = "";
      container.appendChild(ul);
    },
  };
})(window);
