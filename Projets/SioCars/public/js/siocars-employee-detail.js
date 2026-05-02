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
  const emp = SioCarsUI.employeeByMatricule(state, id);

  if (!emp) {
    missingEl.classList.remove("d-none");
    document.title = "Sio Cars — Employé introuvable";
    return;
  }

  const sales = SioCarsUI.salesForSeller(state, emp.matricule);
  const e = SioCarsUI.escapeHtml;

  const ventesHtml =
    sales.length === 0
      ? `<p class="text-sc-muted small mb-0">Aucune vente attribuée à ce matricule dans la démo.</p>`
      : sales
          .map((s) => {
            const v = SioCarsUI.vehicleById(state, s.vehicleId);
            const cl = SioCarsUI.clientById(state, s.clientId);
            const vehLabel = v ? `${e(v.marque)} ${e(v.modele)}` : e(s.vehicleId);
            return `
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 py-3 border-bottom border-secondary border-opacity-25">
          <div>
            <div class="fw-semibold">${vehLabel}</div>
            <div class="small text-sc-muted">${e(s.dateVente)} · ${e(s.refContrat)}</div>
            ${
              cl
                ? `<a class="small link-light" href="client-detail.html?id=${encodeURIComponent(cl.id)}">${e(cl.prenom)} ${e(cl.nom)}</a>`
                : ""
            }
          </div>
          <div class="d-flex flex-column align-items-end gap-2">
            <span class="badge text-bg-primary">${SioCarsUI.formatMoney(s.prixVenteTTC)}</span>
            ${
              v
                ? `<a class="btn btn-sm btn-outline-light" href="product-detail.html?id=${encodeURIComponent(v.id)}">Fiche véhicule</a>`
                : ""
            }
          </div>
        </div>`;
          })
          .join("");

  document.title = `Sio Cars — ${emp.prenom} ${emp.nom}`;

  mainEl.innerHTML = `
    <header class="sc-page-hero mb-4">
      <h1 id="emp-page-title" class="text-white mb-1 d-flex align-items-center gap-2 flex-wrap"><i class="bi bi-person-badge text-primary"></i> ${e(emp.prenom)} ${e(emp.nom)}</h1>
      <p class="text-sc-muted small mb-0"><code id="emp-page-mat" class="text-light">${e(emp.matricule)}</code> · <span id="emp-page-poste">${e(emp.poste)}</span></p>
    </header>

    <div class="row g-4 sc-detail-layout">
      <div class="col-lg-5">
        <form id="form-employee" class="sc-table-wrap p-3 p-md-4">
          <h2 class="sc-form-section-title">Modifier la fiche employé</h2>
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-mat">Matricule</label>
              <input type="text" class="form-control sc-input-dark font-monospace" id="f-mat" value="${e(emp.matricule)}" readonly disabled>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-prenom">Prénom</label>
              <input type="text" class="form-control sc-input-dark" id="f-prenom" name="prenom" required value="${e(emp.prenom)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-nom">Nom</label>
              <input type="text" class="form-control sc-input-dark" id="f-nom" name="nom" required value="${e(emp.nom)}">
            </div>
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-poste">Poste</label>
              <input type="text" class="form-control sc-input-dark" id="f-poste" name="poste" value="${e(emp.poste)}">
            </div>
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-service">Service</label>
              <input type="text" class="form-control sc-input-dark" id="f-service" name="service" value="${e(emp.service)}">
            </div>
            <div class="col-12">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-email">Email professionnel</label>
              <input type="email" class="form-control sc-input-dark" id="f-email" name="email" value="${e(emp.email)}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-sc-muted text-uppercase fw-bold" for="f-emb">Date d’embauche</label>
              <input type="date" class="form-control sc-input-dark" id="f-emb" name="dateEmbauche" value="${e(emp.dateEmbauche)}">
            </div>
            <div class="col-md-6 d-flex align-items-end">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="f-actif" name="actif" ${emp.actif ? "checked" : ""}>
                <label class="form-check-label text-light" for="f-actif">Actif</label>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap gap-2 mt-4">
            <button type="submit" class="btn sc-btn-cta sc-btn-cta--compact"><i class="bi bi-check2-circle me-1"></i> Enregistrer</button>
            <a href="employees.html" class="btn btn-outline-light btn-sm align-self-center">Retour liste</a>
          </div>
        </form>
      </div>
      <div class="col-lg-7 sc-detail-sidebar">
        <section class="sc-table-wrap p-3 p-md-4">
          <h2 class="h6 text-uppercase text-sc-muted fw-bold mb-2" style="letter-spacing:0.1em;">Ventes signées (${sales.length})</h2>
          <p class="small text-sc-muted mb-3">Lecture seule — les montants viennent des dossiers générés.</p>
          <div>${ventesHtml}</div>
        </section>
      </div>
    </div>`;

  mainEl.classList.remove("d-none");

  document.getElementById("form-employee").addEventListener("submit", (ev) => {
    ev.preventDefault();
    state = SioCarsData.loadOrCreate();
    const target = SioCarsUI.employeeByMatricule(state, id);
    if (!target) {
      feedback("Employé introuvable.", true);
      return;
    }

    target.prenom = document.getElementById("f-prenom").value.trim();
    target.nom = document.getElementById("f-nom").value.trim();
    target.poste = document.getElementById("f-poste").value.trim();
    target.service = document.getElementById("f-service").value.trim();
    target.email = document.getElementById("f-email").value.trim();
    target.dateEmbauche = document.getElementById("f-emb").value;
    target.actif = document.getElementById("f-actif").checked;

    SioCarsData.save(state);
    document.getElementById("emp-page-title").innerHTML = `<i class="bi bi-person-badge text-primary"></i> ${SioCarsUI.escapeHtml(
      `${target.prenom} ${target.nom}`
    )}`;
    document.getElementById("emp-page-poste").textContent = target.poste;
    document.title = `Sio Cars — ${target.prenom} ${target.nom}`;
    feedback("Modifications enregistrées.");
  });
})();
