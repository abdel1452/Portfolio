(function () {
  if (!SioCarsAuth.requireAuth()) return;

  const PER_PAGE = 18;
  let state = SioCarsData.loadOrCreate();
  let page = 1;
  let selectedId = null;

  const gridEl = document.getElementById("vehicle-grid");
  const emptyEl = document.getElementById("vehicle-grid-empty");
  const pagEl = document.getElementById("pagination-vehicles");
  const filterStatut = document.getElementById("filter-statut");
  const searchEl = document.getElementById("search-vehicles");
  const toolbarHint = document.getElementById("list-toolbar-hint");
  const toolbarSelection = document.getElementById("list-toolbar-selection");
  const toolbarOpen = document.getElementById("list-toolbar-open");

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function getFiltered() {
    const q = (searchEl?.value || "").trim().toLowerCase();
    const st = filterStatut?.value || "tous";
    return state.vehicles.filter((v) => {
      if (st !== "tous" && v.statut !== st) return false;
      if (!q) return true;
      return (
        v.id.toLowerCase().includes(q) ||
        v.vin.toLowerCase().includes(q) ||
        `${v.marque} ${v.modele}`.toLowerCase().includes(q) ||
        (v.immatriculation && v.immatriculation.toLowerCase().includes(q))
      );
    });
  }

  function vehicleLabel(id) {
    const v = state.vehicles.find((x) => x.id === id);
    if (!v) return id;
    return `${v.id} · ${v.marque} ${v.modele}`;
  }

  function updateToolbar() {
    if (!toolbarOpen || !toolbarSelection || !toolbarHint) return;
    if (selectedId && state.vehicles.some((v) => v.id === selectedId)) {
      toolbarHint.classList.add("d-none");
      toolbarSelection.classList.remove("d-none");
      toolbarSelection.textContent = vehicleLabel(selectedId);
      toolbarOpen.disabled = false;
    } else {
      selectedId = null;
      toolbarHint.classList.remove("d-none");
      toolbarSelection.classList.add("d-none");
      toolbarSelection.textContent = "";
      toolbarOpen.disabled = true;
    }
  }

  function selectVehicle(id) {
    selectedId = id === selectedId ? null : id;
    updateToolbar();
    document.querySelectorAll(".sc-vehicle-card--selected").forEach((el) => {
      el.classList.remove("sc-vehicle-card--selected");
    });
    if (selectedId) {
      gridEl.querySelectorAll(".sc-vehicle-card[data-vehicle-id]").forEach((card) => {
        if (card.dataset.vehicleId === selectedId) card.classList.add("sc-vehicle-card--selected");
      });
    }
  }

  function render() {
    const filtered = getFiltered();
    const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (page > pages) page = pages;
    const start = (page - 1) * PER_PAGE;
    const slice = filtered.slice(start, start + PER_PAGE);

    if (!gridEl) return;

    if (filtered.length === 0) {
      gridEl.innerHTML = "";
      emptyEl?.classList.remove("d-none");
    } else {
      emptyEl?.classList.add("d-none");
      gridEl.innerHTML = "";
      slice.forEach((v, i) => {
        const hue = SioCarsUI.brandHue(v.marque);
        const statutClass =
          v.statut === "vendu" ? "sc-vehicle-card__statut--sold" : "sc-vehicle-card__statut--stock";
        const statutLabel = v.statut === "vendu" ? "Vendu" : "En stock";
        const immat =
          v.immatriculation && v.immatriculation !== "—"
            ? escapeHtml(v.immatriculation)
            : '<span class="text-sc-muted">Sans immat.</span>';
        const col = document.createElement("div");
        col.className = "col";
        col.setAttribute("role", "listitem");
        col.style.setProperty("--sc-v-hue", String(hue));
        col.style.setProperty("--sc-anim-delay", `${Math.min(i, 12) * 0.04}s`);
        const isSel = v.id === selectedId;
        col.innerHTML = `
          <article class="sc-vehicle-card sc-vehicle-card--selectable h-100${isSel ? " sc-vehicle-card--selected" : ""}" data-vehicle-id="${escapeHtml(v.id)}" tabindex="0" role="button" aria-pressed="${isSel}" aria-label="Sélectionner ${escapeHtml(v.marque)} ${escapeHtml(v.modele)}">
            <div class="sc-vehicle-card__body">
              <div class="sc-vehicle-card__head">
                <span class="sc-vehicle-card__ref">${escapeHtml(v.id)}</span>
                <span class="sc-vehicle-card__statut ${statutClass}">${statutLabel}</span>
              </div>
              <h2 class="sc-vehicle-card__title">${escapeHtml(v.marque)} <span class="sc-vehicle-card__model">${escapeHtml(v.modele)}</span></h2>
              <p class="sc-vehicle-card__finition">${escapeHtml(v.finition)}</p>
              <div class="sc-vehicle-card__chips">
                <span class="sc-vehicle-chip"><i class="bi bi-calendar3"></i>${escapeHtml(String(v.anneeModele))}</span>
                <span class="sc-vehicle-chip" title="Motorisation"><i class="bi bi-lightning-charge"></i>${escapeHtml(v.motorisation)}</span>
              </div>
              <div class="sc-vehicle-card__ids small">
                <span class="sc-vehicle-card__vin" title="VIN"><i class="bi bi-upc-scan me-1"></i>${escapeHtml(v.vin)}</span>
                <span class="sc-vehicle-card__plate">${immat}</span>
              </div>
              <div class="sc-vehicle-card__footer">
                <span class="sc-vehicle-card__price-label">Prix catalogue</span>
                <span class="sc-vehicle-card__price">${SioCarsUI.formatMoney(v.prixCatalogue)}</span>
              </div>
            </div>
          </article>`;
        gridEl.appendChild(col);
      });

      gridEl.querySelectorAll(".sc-vehicle-card[data-vehicle-id]").forEach((card) => {
        const vid = card.getAttribute("data-vehicle-id");
        card.addEventListener("click", () => selectVehicle(vid));
        card.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            selectVehicle(vid);
          }
        });
      });
    }

    updateToolbar();

    document.getElementById("vehicles-count-label").textContent = `${filtered.length} véhicule(s)`;

    SioCarsUI.renderPagination(pagEl, {
      page,
      pages,
      onPage: (p) => {
        page = p;
        render();
      },
    });
  }

  toolbarOpen?.addEventListener("click", () => {
    if (selectedId) {
      window.location.href = `product-detail.html?id=${encodeURIComponent(selectedId)}`;
    }
  });

  filterStatut?.addEventListener("change", () => {
    page = 1;
    render();
  });
  searchEl?.addEventListener("input", () => {
    page = 1;
    render();
  });

  document.getElementById("btn-reset-demo")?.addEventListener("click", () => {
    if (confirm("Régénérer tout le jeu de données démo ?")) {
      state = SioCarsData.reset();
      page = 1;
      selectedId = null;
      render();
    }
  });

  render();
})();
