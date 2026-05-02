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

  let state = SioCarsData.loadOrCreate();
  const c = SioCarsUI.clientById(state, id);

  if (!c) {
    missingEl.classList.remove("d-none");
    document.title = "Sio Cars — Client introuvable";
    return;
  }

  const sales = SioCarsUI.salesForClient(state, id);
  const e = SioCarsUI.escapeHtml;

  const achatsHtml =
    sales.length === 0
      ? `<p class="text-sc-muted small mb-0">Aucun véhicule enregistré.</p>`
      : sales
          .map((s) => {
            const v = SioCarsUI.vehicleById(state, s.vehicleId);
            if (!v) return "";
            return `
        <div class="card mb-3 border-secondary border-opacity-25 bg-dark bg-opacity-25">
          <div class="card-body py-3">
            <div class="d-flex flex-wrap justify-content-between gap-2 align-items-start">
              <div>
                <div class="fw-semibold">${e(v.marque)} ${e(v.modele)} <span class="text-sc-muted fw-normal">· ${e(v.finition)}</span></div>
                <div class="small text-sc-muted">VIN ${e(v.vin)} · ${e(v.couleur)} · ${e(v.motorisation)}</div>
              </div>
              <div class="d-flex flex-column align-items-end gap-2">
                <span class="badge text-bg-primary">${SioCarsUI.formatMoney(s.prixVenteTTC)}</span>
                <a class="btn btn-sm btn-outline-light" href="product-detail.html?id=${encodeURIComponent(v.id)}">Fiche véhicule</a>
              </div>
            </div>
            <hr class="border-secondary border-opacity-25 my-2"/>
            <div class="row g-2 small">
              <div class="col-sm-6"><span class="text-sc-muted">Contrat</span><br/><code>${e(s.refContrat)}</code></div>
              <div class="col-sm-6"><span class="text-sc-muted">Livraison</span><br/>${e(s.dateLivraison)}</div>
              <div class="col-sm-6"><span class="text-sc-muted">Financement</span><br/>${e(s.financement)}${s.dureeMois ? ` · ${s.dureeMois} mois` : ""}</div>
              <div class="col-sm-6"><span class="text-sc-muted">Mensualité</span><br/>${s.mensualite ? SioCarsUI.formatMoney(s.mensualite) : "—"}</div>
              <div class="col-sm-6"><span class="text-sc-muted">Reprise</span><br/>${s.repriseMontant ? SioCarsUI.formatMoney(s.repriseMontant) : "—"}</div>
              <div class="col-sm-6"><span class="text-sc-muted">Assurance</span><br/>${e(s.assurancePack)}</div>
            </div>
          </div>
        </div>`;
          })
          .join("");

  document.title = `Sio Cars — ${c.prenom} ${c.nom}`;

  mainEl.innerHTML = `
    <header class="sc-page-hero mb-4">
      <h1 id="client-page-title" class="text-white mb-1 d-flex align-items-center gap-2 flex-wrap"><i class="bi bi-person-vcard text-primary"></i> ${e(c.prenom)} ${e(c.nom)}</h1>
      <p class="text-sc-muted small mb-0"><span class="sc-badge-vin">${e(c.id)}</span></p>
    </header>

    <div class="row g-4 sc-detail-layout">
      <div class="col-lg-7">
        <form id="form-client" class="sc-table-wrap p-3 p-md-4">
          <h2 class="sc-form-section-title">Modifier la fiche client</h2>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-id">ID client</label>
              <input type="text" class="form-control sc-input-dark" id="f-id" value="${e(c.id)}" readonly disabled>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-civilite">Civilité</label>
              <select class="form-select sc-input-dark" id="f-civilite" name="civilite">
                <option value="M." ${c.civilite === "M." ? "selected" : ""}>M.</option>
                <option value="Mme" ${c.civilite === "Mme" ? "selected" : ""}>Mme</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-prenom">Prénom</label>
              <input type="text" class="form-control sc-input-dark" id="f-prenom" name="prenom" required value="${e(c.prenom)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-nom">Nom</label>
              <input type="text" class="form-control sc-input-dark" id="f-nom" name="nom" required value="${e(c.nom)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-email">Email</label>
              <input type="email" class="form-control sc-input-dark" id="f-email" name="email" required value="${e(c.email)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-mobile">Mobile</label>
              <input type="text" class="form-control sc-input-dark" id="f-mobile" name="mobile" value="${e(c.mobile)}">
            </div>
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-adresse">Adresse</label>
              <input type="text" class="form-control sc-input-dark" id="f-adresse" name="adresse" value="${e(c.adresse)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-complement">Complément</label>
              <input type="text" class="form-control sc-input-dark" id="f-complement" name="complement" value="${e(c.complement)}">
            </div>
            <div class="col-md-3">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-cp">Code postal</label>
              <input type="text" class="form-control sc-input-dark" id="f-cp" name="cp" value="${e(c.cp)}">
            </div>
            <div class="col-md-3">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-ville">Ville</label>
              <input type="text" class="form-control sc-input-dark" id="f-ville" name="ville" value="${e(c.ville)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-pays">Pays</label>
              <input type="text" class="form-control sc-input-dark" id="f-pays" name="pays" value="${e(c.pays)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-profession">Profession</label>
              <input type="text" class="form-control sc-input-dark" id="f-profession" name="profession" value="${e(c.profession)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-fidelite">Fidélité</label>
              <select class="form-select sc-input-dark" id="f-fidelite" name="fidelite">
                ${["Bronze", "Argent", "Or", "Platinum"]
                  .map(
                    (fid) =>
                      `<option value="${fid}" ${c.fidelite === fid ? "selected" : ""}>${fid}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-dateins">Client depuis</label>
              <input type="date" class="form-control sc-input-dark" id="f-dateins" name="dateInscription" value="${e(c.dateInscription)}">
            </div>
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-notes">Notes</label>
              <textarea class="form-control sc-input-dark" id="f-notes" name="notes" rows="2">${e(c.notes || "")}</textarea>
            </div>
          </div>
          <div class="d-flex flex-wrap gap-2 mt-4">
            <button type="submit" class="btn sc-btn-cta sc-btn-cta--compact"><i class="bi bi-check2-circle me-1"></i> Enregistrer</button>
            <a href="clients.html" class="btn btn-outline-light btn-sm align-self-center">Retour liste</a>
          </div>
        </form>
      </div>
      <div class="col-lg-5 sc-detail-sidebar">
        <section class="sc-table-wrap p-3 p-md-4 h-100">
          <h2 class="h6 text-uppercase text-sc-muted fw-bold mb-3" style="letter-spacing:0.1em;">Véhicules achetés (${sales.length})</h2>
          ${achatsHtml}
        </section>
      </div>
    </div>`;

  mainEl.classList.remove("d-none");

  document.getElementById("form-client").addEventListener("submit", (ev) => {
    ev.preventDefault();
    state = SioCarsData.loadOrCreate();
    const target = SioCarsUI.clientById(state, id);
    if (!target) {
      feedback("Client introuvable.", true);
      return;
    }

    target.civilite = document.getElementById("f-civilite").value;
    target.prenom = document.getElementById("f-prenom").value.trim();
    target.nom = document.getElementById("f-nom").value.trim();
    target.email = document.getElementById("f-email").value.trim();
    target.mobile = document.getElementById("f-mobile").value.trim();
    target.adresse = document.getElementById("f-adresse").value.trim();
    target.complement = document.getElementById("f-complement").value.trim();
    target.cp = document.getElementById("f-cp").value.trim();
    target.ville = document.getElementById("f-ville").value.trim();
    target.pays = document.getElementById("f-pays").value.trim();
    target.profession = document.getElementById("f-profession").value.trim();
    target.fidelite = document.getElementById("f-fidelite").value;
    target.dateInscription = document.getElementById("f-dateins").value;
    target.notes = document.getElementById("f-notes").value.trim();

    SioCarsData.save(state);
    document.getElementById("client-page-title").innerHTML = `<i class="bi bi-person-vcard text-primary"></i> ${SioCarsUI.escapeHtml(
      `${target.prenom} ${target.nom}`
    )}`;
    document.title = `Sio Cars — ${target.prenom} ${target.nom}`;
    feedback("Modifications enregistrées.");
  });
})();
