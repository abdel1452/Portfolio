(function () {
  if (!SioCarsAuth.requireAuth()) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const missingEl = document.getElementById("detail-missing");
  const mainEl = document.getElementById("detail-main");
  const feedbackEl = document.getElementById("save-feedback");

  function feedback(msg, isErr) {
    if (!feedbackEl) return;
    feedbackEl.textContent = msg;
    feedbackEl.className = "sc-save-feedback" + (isErr ? " sc-save-feedback--err" : "");
    clearTimeout(feedbackEl._t);
    feedbackEl._t = setTimeout(() => {
      feedbackEl.className = "d-none";
      feedbackEl.textContent = "";
    }, 3200);
  }

  if (!id || !mainEl || !missingEl) return;

  function buildVenteHtml(state, v) {
    const sale = SioCarsUI.saleForVehicle(state, v.id);
    const e = SioCarsUI.escapeHtml;
    if (!sale) {
      return `<p class="text-sc-muted small mb-0">Pas de dossier de vente associé (véhicule en stock ou données sans contrat).</p>`;
    }
    const client = SioCarsUI.clientById(state, sale.clientId);
    const vendeur = SioCarsUI.employeeByMatricule(state, sale.vendeurMatricule);
    const vendeurLine = vendeur
      ? `<a class="link-light fw-semibold" href="employee-detail.html?id=${encodeURIComponent(vendeur.matricule)}">${e(
          vendeur.prenom
        )} ${e(vendeur.nom)}</a> <span class="text-sc-muted small">(${e(vendeur.matricule)})</span>`
      : `<span class="text-sc-muted">${e(sale.vendeurMatricule)}</span>`;

    const clientBlock = client
      ? `<a class="btn btn-sm sc-btn-cta sc-btn-cta--compact" href="client-detail.html?id=${encodeURIComponent(client.id)}">Fiche client · ${e(
          client.prenom
        )} ${e(client.nom)}</a>`
      : `<span class="text-sc-muted">${e(sale.clientId)}</span>`;

    return `
      <div class="row g-3">
        <div class="col-md-6">
          <div class="small text-sc-muted text-uppercase mb-1">Client</div>
          ${clientBlock}
        </div>
        <div class="col-md-6">
          <div class="small text-sc-muted text-uppercase mb-1">Vendeur</div>
          <div>${vendeurLine}</div>
        </div>
        <div class="col-sm-6 col-lg-4">
          <div class="small text-sc-muted text-uppercase mb-1">Prix vente TTC</div>
          <div class="fw-bold fs-5 text-primary">${SioCarsUI.formatMoney(sale.prixVenteTTC)}</div>
        </div>
        <div class="col-sm-6 col-lg-4">
          <div class="small text-sc-muted text-uppercase mb-1">Contrat</div>
          <code class="text-light">${e(sale.refContrat)}</code>
        </div>
        <div class="col-sm-6 col-lg-4">
          <div class="small text-sc-muted text-uppercase mb-1">Date vente / livraison</div>
          <div>${e(sale.dateVente)} · <span class="text-sc-muted">${e(sale.dateLivraison)}</span></div>
        </div>
        <div class="col-sm-6 col-lg-4">
          <div class="small text-sc-muted text-uppercase mb-1">Financement</div>
          <div>${e(sale.financement)}${sale.dureeMois ? ` · ${sale.dureeMois} mois` : ""}</div>
        </div>
        <div class="col-sm-6 col-lg-4">
          <div class="small text-sc-muted text-uppercase mb-1">Mensualité</div>
          <div>${sale.mensualite ? SioCarsUI.formatMoney(sale.mensualite) : "—"}</div>
        </div>
        <div class="col-sm-6 col-lg-4">
          <div class="small text-sc-muted text-uppercase mb-1">Assurance</div>
          <div>${e(sale.assurancePack)}</div>
        </div>
      </div>`;
  }

  function statutBadgeHtml(statut) {
    return statut === "vendu"
      ? '<span id="hero-statut" class="badge text-bg-secondary px-3 py-2">Vendu</span>'
      : '<span id="hero-statut" class="badge text-bg-success px-3 py-2">En stock</span>';
  }

  let state = SioCarsData.loadOrCreate();
  let v = SioCarsUI.vehicleById(state, id);

  if (!v) {
    missingEl.classList.remove("d-none");
    document.title = "Sio Cars — Véhicule introuvable";
    return;
  }

  const hue = SioCarsUI.brandHue(v.marque);
  const e = SioCarsUI.escapeHtml;

  document.title = `Sio Cars — ${v.marque} ${v.modele}`;

  mainEl.innerHTML = `
    <div class="row g-4 sc-detail-layout">
      <div class="col-lg-4 sc-detail-sidebar">
        <div id="detail-hero" class="sc-detail-hero" style="--sc-v-hue:${hue}">
          <div class="sc-detail-hero__body">
            <div class="d-flex flex-wrap align-items-start justify-content-between gap-2 mb-2">
              <div>
                <span class="sc-badge-vin d-block mb-1">${e(v.id)}</span>
                <h1 id="hero-title" class="h3 text-white mb-0 fw-bold">${e(v.marque)} ${e(v.modele)}</h1>
                <p id="hero-finition" class="text-sc-muted mb-0 mt-1">${e(v.finition)}</p>
              </div>
              ${statutBadgeHtml(v.statut)}
            </div>
            <p class="sc-detail-price mb-0 mt-3" id="hero-price">${SioCarsUI.formatMoney(v.prixCatalogue)} <span class="small text-sc-muted fw-normal d-block mt-1" style="filter:none;color:var(--sc-muted);background:none;-webkit-text-fill-color:var(--sc-muted);">Prix catalogue</span></p>
          </div>
        </div>
        <section class="sc-table-wrap p-3 p-md-4">
          <h2 class="h6 text-uppercase text-sc-muted fw-bold mb-3" style="letter-spacing:0.1em;">Vente &amp; livraison</h2>
          <div id="vente-panel">${buildVenteHtml(state, v)}</div>
        </section>
      </div>
      <div class="col-lg-8">
        <form id="form-vehicle" class="sc-table-wrap p-3 p-md-4">
          <h2 class="sc-form-section-title">Modifier le véhicule</h2>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-id">Référence</label>
              <input type="text" class="form-control sc-input-dark" id="f-id" value="${e(v.id)}" readonly disabled>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-statut">Statut parc</label>
              <select class="form-select sc-input-dark" id="f-statut" name="statut">
                <option value="stock" ${v.statut === "stock" ? "selected" : ""}>En stock</option>
                <option value="vendu" ${v.statut === "vendu" ? "selected" : ""}>Vendu</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-marque">Marque</label>
              <input type="text" class="form-control sc-input-dark" id="f-marque" name="marque" required value="${e(v.marque)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-modele">Modèle</label>
              <input type="text" class="form-control sc-input-dark" id="f-modele" name="modele" required value="${e(v.modele)}">
            </div>
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-finition">Finition</label>
              <input type="text" class="form-control sc-input-dark" id="f-finition" name="finition" value="${e(v.finition)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-vin">VIN</label>
              <input type="text" class="form-control sc-input-dark font-monospace" id="f-vin" name="vin" value="${e(v.vin)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-immat">Immatriculation</label>
              <input type="text" class="form-control sc-input-dark" id="f-immat" name="immatriculation" value="${e(v.immatriculation === "—" ? "" : v.immatriculation)}" placeholder="— si vide">
            </div>
            <div class="col-md-4">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-annee">Année modèle</label>
              <input type="number" class="form-control sc-input-dark" id="f-annee" name="anneeModele" min="1990" max="2030" value="${v.anneeModele}">
            </div>
            <div class="col-md-8">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-moto">Motorisation</label>
              <input type="text" class="form-control sc-input-dark" id="f-moto" name="motorisation" value="${e(v.motorisation)}">
            </div>
            <div class="col-md-4">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-puiss">Puissance (ch)</label>
              <input type="number" class="form-control sc-input-dark" id="f-puiss" name="puissanceCh" min="1" max="999" value="${v.puissanceCh}">
            </div>
            <div class="col-md-4">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-co2">CO₂ (g/km)</label>
              <input type="number" class="form-control sc-input-dark" id="f-co2" name="co2" min="0" max="999" value="${v.co2}">
            </div>
            <div class="col-md-4">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-km">Km à la livraison</label>
              <input type="number" class="form-control sc-input-dark" id="f-km" name="kilometrageLivraison" min="0" max="999999" value="${v.kilometrageLivraison}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-couleur">Couleur</label>
              <input type="text" class="form-control sc-input-dark" id="f-couleur" name="couleur" value="${e(v.couleur)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-prix">Prix catalogue (€)</label>
              <input type="number" class="form-control sc-input-dark" id="f-prix" name="prixCatalogue" min="0" step="100" value="${v.prixCatalogue}">
            </div>
            <input type="hidden" id="f-silhouette" name="silhouette" value="${e(v.silhouette || "berline")}">
          </div>
          <div class="d-flex flex-wrap gap-2 mt-4">
            <button type="submit" class="btn sc-btn-cta sc-btn-cta--compact"><i class="bi bi-check2-circle me-1"></i> Enregistrer</button>
            <a href="products.html" class="btn btn-outline-light btn-sm align-self-center">Annuler</a>
          </div>
        </form>
      </div>
    </div>`;

  mainEl.classList.remove("d-none");

  document.getElementById("form-vehicle").addEventListener("submit", (ev) => {
    ev.preventDefault();
    state = SioCarsData.loadOrCreate();
    const target = SioCarsUI.vehicleById(state, id);
    if (!target) {
      feedback("Véhicule introuvable.", true);
      return;
    }

    const statut = document.getElementById("f-statut").value;
    const hadSale = !!SioCarsUI.saleForVehicle(state, target.id);

    target.marque = document.getElementById("f-marque").value.trim();
    target.modele = document.getElementById("f-modele").value.trim();
    target.finition = document.getElementById("f-finition").value.trim();
    target.vin = document.getElementById("f-vin").value.trim();
    const immat = document.getElementById("f-immat").value.trim();
    target.immatriculation = immat || "—";
    target.anneeModele = parseInt(document.getElementById("f-annee").value, 10) || target.anneeModele;
    target.motorisation = document.getElementById("f-moto").value.trim();
    target.puissanceCh = parseInt(document.getElementById("f-puiss").value, 10) || target.puissanceCh;
    target.co2 = parseInt(document.getElementById("f-co2").value, 10);
    if (Number.isNaN(target.co2)) target.co2 = 0;
    target.kilometrageLivraison = parseInt(document.getElementById("f-km").value, 10) || 0;
    target.couleur = document.getElementById("f-couleur").value.trim();
    target.prixCatalogue = parseInt(document.getElementById("f-prix").value, 10) || target.prixCatalogue;
    target.statut = statut === "vendu" ? "vendu" : "stock";
    const silVal = document.getElementById("f-silhouette")?.value?.trim();
    if (silVal) target.silhouette = silVal;

    if (target.statut === "stock" && hadSale) {
      state.sales = state.sales.filter((s) => s.vehicleId !== target.id);
    }

    SioCarsData.save(state);

    document.getElementById("detail-hero").style.setProperty("--sc-v-hue", String(SioCarsUI.brandHue(target.marque)));
    document.getElementById("hero-title").textContent = `${target.marque} ${target.modele}`;
    document.getElementById("hero-finition").textContent = target.finition;
    document.getElementById("hero-price").innerHTML = `${SioCarsUI.formatMoney(target.prixCatalogue)} <span class="small text-sc-muted fw-normal d-block mt-1" style="filter:none;color:var(--sc-muted);background:none;-webkit-text-fill-color:var(--sc-muted);">Prix catalogue</span>`;
    const badgeWrap = document.getElementById("hero-statut");
    if (badgeWrap) {
      badgeWrap.outerHTML = statutBadgeHtml(target.statut);
    }
    state = SioCarsData.loadOrCreate();
    document.getElementById("vente-panel").innerHTML = buildVenteHtml(state, target);
    document.title = `Sio Cars — ${target.marque} ${target.modele}`;

    feedback("Modifications enregistrées.");
  });
})();
