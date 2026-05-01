/**
 * Amsom Habitat – CRUD applications (localStorage)
 */
(function () {
  "use strict";

  const STORAGE_KEY = "amsom-habitat-projects-v5";

  /** Environnements type SI d’entreprise (qualification vs production) */
  const AMSOM_PREPROD_ORIGIN = "https://qualif-si.amsom-habitat.fr/app";
  const AMSOM_PROD_ORIGIN = "https://si.amsom-habitat.fr/app";
  const LEGACY_KEY = "projects-demo";

  const loginView = document.getElementById("login-view");
  const dashboard = document.getElementById("dashboard");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");

  const projectsBody = document.getElementById("projects-body");
  const searchInput = document.getElementById("search-input");
  const emptyState = document.getElementById("empty-state");
  const tableMeta = document.getElementById("table-meta");

  const statTotal = document.getElementById("stat-total");
  const statPreprod = document.getElementById("stat-preprod");
  const statProd = document.getElementById("stat-prod");
  const statFiltered = document.getElementById("stat-filtered");

  const projectModalEl = document.getElementById("projectModal");
  const projectModal = () => bootstrap.Modal.getOrCreateInstance(projectModalEl);
  const projectModalTitle = document.getElementById("projectModalTitle");
  const projectForm = document.getElementById("project-form");
  const fieldId = document.getElementById("project-id");
  const fieldName = document.getElementById("field-name");
  const fieldDescription = document.getElementById("field-description");
  const fieldImageUrl = document.getElementById("field-image-url");
  const fieldPreprod = document.getElementById("field-preprod");
  const fieldProd = document.getElementById("field-prod");
  const fieldImageFile = document.getElementById("field-image-file");
  const imagePreviewWrap = document.getElementById("image-preview-wrap");
  const imagePreview = document.getElementById("image-preview");

  const deleteModalEl = document.getElementById("deleteModal");
  const deleteModal = () => bootstrap.Modal.getOrCreateInstance(deleteModalEl);
  const deleteTargetName = document.getElementById("delete-target-name");
  const deleteConfirmBtn = document.getElementById("delete-confirm-btn");

  const resetBtn = document.getElementById("reset-data");
  const logoutBtn = document.getElementById("logout-dropdown");
  const btnOpenCreate = document.getElementById("btn-open-create");

  let pendingImageData = null;
  let deletePendingId = null;
  let searchQuery = "";

  const state = {
    projects: [],
  };

  function escapeHtml(s) {
    if (s == null) return "";
    const div = document.createElement("div");
    div.textContent = String(s);
    return div.innerHTML;
  }

  function normalizeProject(raw) {
    const image =
      raw.image && String(raw.image).trim() !== ""
        ? raw.image
        : "https://placehold.co/96x96/f4f6f5/1e3344?text=App";
    const name =
      raw.name ||
      (raw.description && String(raw.description).slice(0, 80)) ||
      "Application";
    return {
      id: Number(raw.id) || Date.now(),
      name: String(name).trim(),
      description: raw.description != null ? String(raw.description) : "",
      image,
      preprodUrl: raw.preprodUrl != null ? String(raw.preprodUrl).trim() : "",
      prodUrl: raw.prodUrl != null ? String(raw.prodUrl).trim() : "",
    };
  }

  function slugify(name) {
    return String(name)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  /** Catalogue type promoteur / bailleur social (Amsom Habitat — maquette) */
  function createDefaultProjects() {
    const samples = [
      ["Portail intranet groupe", "Accueil SSO et liens vers les 45 applications métiers du groupe."],
      ["GED corporate", "Gestion électronique des documents, workflows de validation et archivage."],
      ["Suivi de chantiers OPC", "Avancement travaux, réceptions, réserves et reporting opérationnel."],
      ["Planning ressources travaux", "Affectation équipes, sous-traitants et plannings mutualisés."],
      ["Achats & marchés", "Consultations, offres, attribution et suivi des marchés publics et privés."],
      ["Facturation fournisseurs", "Réception, contrôle et validation des factures achats."],
      ["Comptabilité analytique chantiers", "Imputation budgets, centres de coûts et suivi de marge."],
      ["Trésorerie & cash-flow", "Prévisions, rapprochements bancaires et pilotage de la trésorerie."],
      ["SIRH — dossiers salariés", "Contrats, entretiens, compétences et documents RH."],
      ["Temps & activités", "Saisie des temps sur chantiers et projets internes."],
      ["Congés & absences", "Demandes, validations et planning des équipes."],
      ["Recrutement & onboarding", "Offres, candidatures et intégration des nouveaux collaborateurs."],
      ["Formation & certifications", "Catalogue de formations et habilitations sécurité / qualité."],
      ["Parc véhicules & carburant", "Affectation, entretien et suivi des consommations."],
      ["GMAO bâtiments", "Maintenance préventive et corrective des équipements techniques."],
      ["Stocks matériaux", "Inventaires, mouvements et valorisation des stocks chantier."],
      ["Magasins chantier", "Réservation et distribution matériel vers les opérations."],
      ["Planning livraisons", "Organisation des flux logistiques et créneaux livraison."],
      ["CRM commercial logements", "Prospects, visites, réservations et suivi commercial."],
      ["Réservation & options lots", "Blocage d’appartements, acomptes et levée d’option."],
      ["Extranet acquéreurs", "Suivi de dossier, pièces et échanges avec les futurs propriétaires."],
      ["Portail copropriétaires", "Assemblées, convocations et documents de syndic."],
      ["Portail locataires", "Demandes d’intervention, quittances et messagerie locative."],
      ["Gestion des baux", "Baux commerciaux et résidentiels, indexation et avenants."],
      ["Encaissements loyers & charges", "Prélèvements, relances et lettrage des paiements."],
      ["Recouvrement & contentieux", "Suivi des impayés et procédures amiables / judiciaires."],
      ["Assurance & sinistres", "Déclarations, experts et suivi des dossiers sinistres."],
      ["Qualité & QSE chantier", "Contrôles, audits internes et plans d’actions qualité."],
      ["HSE — hygiène sécurité", "DUERP, autorisations de travail et registres sécurité."],
      ["Permis de construire & dossiers", "Instruction, pièces administratives et échéances réglementaires."],
      ["SIG & foncier", "Cartographie des opérations, parcelles et servitudes."],
      ["Visionneuse BIM", "Consultation des maquettes numériques et coordination projet."],
      ["Reporting direction", "Tableaux de bord consolidés pour la direction générale."],
      ["Entrepôt de données BI", "Historisation et restitution des indicateurs groupe."],
      ["ETL & interfaces métiers", "Échanges entre ERP, CRM et applications métiers."],
      ["Annuaire entreprise", "Contacts, organigramme et rattachements hiérarchiques."],
      ["Service desk IT", "Tickets incidents, demandes et base de connaissances."],
      ["Parc informatique", "Inventaire postes, mobiles et logiciels déployés."],
      ["Supervision & sauvegardes", "Monitoring infrastructure et politique de sauvegarde."],
      ["Conformité RGPD", "Registre des traitements, DPA et exercice des droits."],
      ["Archivage légal", "Conservation à valeur probante et plans de classement."],
      ["Veille réglementaire BTP", "Alertes normes, décrets et évolutions sectorielles."],
      ["Voix du client", "Enquêtes satisfaction et traitement des réclamations."],
      ["Veille prix & concurrence", "Indicateurs marché et positionnement offres."],
      ["Portail fournisseurs", "Dépôt factures dématérialisées et échanges achats."],
    ];
    return samples.map(([name, description], i) => {
      const slug = slugify(name);
      return {
        id: i + 1,
        name,
        description,
        image: `https://placehold.co/96x96/f4f6f5/1e3344?text=${encodeURIComponent(name.slice(0, 3))}`,
        preprodUrl: `${AMSOM_PREPROD_ORIGIN}/${slug}`,
        prodUrl: `${AMSOM_PROD_ORIGIN}/${slug}`,
      };
    });
  }

  function loadProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          state.projects = parsed.map(normalizeProject);
          return;
        }
      }
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed)) {
          state.projects = parsed.map((p) =>
            normalizeProject({
              ...p,
              name: p.description || `Projet ${p.id}`,
            })
          );
          persist();
          return;
        }
      }
    } catch (_) {
      /* ignore */
    }
    state.projects = createDefaultProjects();
    persist();
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
  }

  function nextId() {
    const ids = state.projects.map((p) => p.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  function filterProjects() {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return state.projects.slice();
    return state.projects.filter((p) => {
      const blob = [p.name, p.description, p.preprodUrl, p.prodUrl]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }

  function updateStats(filteredCount) {
    const all = state.projects;
    statTotal.textContent = String(all.length);
    statPreprod.textContent = String(
      all.filter((p) => p.preprodUrl && p.preprodUrl !== "#").length
    );
    statProd.textContent = String(
      all.filter((p) => p.prodUrl && p.prodUrl !== "#").length
    );
    statFiltered.textContent =
      searchQuery.trim() === ""
        ? "—"
        : `${filteredCount} / ${all.length}`;
  }

  function linkCell(url, label) {
    const u = url && url.trim() !== "" && url !== "#" ? url : "";
    if (!u) {
      return `<span class="text-muted">—</span>`;
    }
    const safe = escapeHtml(u);
    return `<a href="${safe}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer" title="${safe}"><i class="bi bi-box-arrow-up-right"></i> ${label}</a>`;
  }

  function render() {
    const list = filterProjects();
    updateStats(list.length);

    projectsBody.innerHTML = "";
    if (list.length === 0) {
      emptyState.classList.remove("d-none");
      tableMeta.textContent = "";
      return;
    }
    emptyState.classList.add("d-none");

    list.forEach((p, index) => {
      const tr = document.createElement("tr");
      tr.dataset.id = String(p.id);
      const descShort =
        p.description.length > 80
          ? escapeHtml(p.description.slice(0, 80)) + "…"
          : escapeHtml(p.description);
      const imgSrc = escapeHtml(p.image);

      tr.innerHTML = `
        <td class="text-muted small">${index + 1}</td>
        <td>
          <img src="${imgSrc}" alt="" class="rounded object-fit-cover thumb-img" width="48" height="48" loading="lazy">
        </td>
        <td>
          <div class="fw-semibold">${escapeHtml(p.name)}</div>
          <div class="text-muted small d-xl-none">${descShort || "—"}</div>
        </td>
        <td class="text-muted small d-none d-xl-table-cell">${escapeHtml(p.description) || "—"}</td>
        <td class="small">${linkCell(p.preprodUrl, "Préprod")}</td>
        <td class="small">${linkCell(p.prodUrl, "Prod")}</td>
        <td class="text-end text-nowrap">
          <button type="button" class="btn btn-sm btn-outline-primary btn-edit" data-id="${p.id}" title="Modifier">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger btn-delete" data-id="${p.id}" title="Supprimer">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      projectsBody.appendChild(tr);
    });

    tableMeta.textContent =
      list.length === state.projects.length
        ? `${list.length} application${list.length > 1 ? "s" : ""}`
        : `${list.length} résultat${list.length > 1 ? "s" : ""} sur ${state.projects.length}`;

    projectsBody.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => openEditModal(Number(btn.dataset.id)));
    });
    projectsBody.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => openDeleteModal(Number(btn.dataset.id)));
    });
  }

  function showToast(message, variant) {
    const container = document.getElementById("toast-container");
    const id = "toast-" + Date.now();
    const bg =
      variant === "success"
        ? "text-bg-success"
        : variant === "danger"
          ? "text-bg-danger"
          : "text-bg-primary";
    const el = document.createElement("div");
    el.className = `toast align-items-center ${bg} border-0`;
    el.id = id;
    el.setAttribute("role", "alert");
    el.setAttribute("aria-live", "polite");
    el.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${escapeHtml(message)}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fermer"></button>
      </div>`;
    container.appendChild(el);
    const t = new bootstrap.Toast(el, { delay: 3200 });
    t.show();
    el.addEventListener("hidden.bs.toast", () => el.remove());
  }

  function resetImagePreview() {
    pendingImageData = null;
    fieldImageFile.value = "";
    imagePreview.src = "";
    imagePreviewWrap.hidden = true;
  }

  function openCreateModal() {
    projectModalTitle.textContent = "Nouvelle application";
    projectForm.reset();
    fieldId.value = "";
    resetImagePreview();
    fieldImageUrl.value = "";
    projectForm.classList.remove("was-validated");
    projectModal().show();
  }

  function openEditModal(id) {
    const p = state.projects.find((x) => x.id === id);
    if (!p) return;
    projectModalTitle.textContent = "Modifier l’application";
    projectForm.reset();
    fieldId.value = String(p.id);
    fieldName.value = p.name;
    fieldDescription.value = p.description;
    fieldImageUrl.value =
      p.image && !String(p.image).startsWith("data:") ? p.image : "";
    fieldPreprod.value = p.preprodUrl === "#" ? "" : p.preprodUrl;
    fieldProd.value = p.prodUrl === "#" ? "" : p.prodUrl;
    resetImagePreview();
    if (p.image && String(p.image).startsWith("data:")) {
      imagePreview.src = p.image;
      imagePreviewWrap.hidden = false;
      pendingImageData = p.image;
    }
    projectForm.classList.remove("was-validated");
    projectModal().show();
  }

  function openDeleteModal(id) {
    const p = state.projects.find((x) => x.id === id);
    if (!p) return;
    deletePendingId = id;
    deleteTargetName.textContent = p.name;
    deleteModal().show();
  }

  function submitProjectForm(e) {
    e.preventDefault();
    if (!projectForm.checkValidity()) {
      projectForm.classList.add("was-validated");
      return;
    }

    const name = fieldName.value.trim();
    const description = fieldDescription.value.trim();
    const preprodUrl = fieldPreprod.value.trim() || "#";
    const prodUrl = fieldProd.value.trim() || "#";

    const existingId = fieldId.value ? Number(fieldId.value) : null;
    const placeholder =
      "https://placehold.co/96x96/f4f6f5/1e3344?text=App";

    let image;
    if (pendingImageData) {
      image = pendingImageData;
    } else if (fieldImageUrl.value.trim()) {
      image = fieldImageUrl.value.trim();
    } else if (existingId) {
      const prev = state.projects.find((x) => x.id === existingId);
      image = prev && prev.image ? prev.image : placeholder;
    } else {
      image = placeholder;
    }

    if (existingId) {
      const idx = state.projects.findIndex((x) => x.id === existingId);
      if (idx !== -1) {
        state.projects[idx] = normalizeProject({
          id: existingId,
          name,
          description,
          image,
          preprodUrl,
          prodUrl,
        });
        showToast("Application mise à jour.", "success");
      }
    } else {
      state.projects.push(
        normalizeProject({
          id: nextId(),
          name,
          description,
          image,
          preprodUrl,
          prodUrl,
        })
      );
      showToast("Application ajoutée.", "success");
    }

    persist();
    render();
    projectModal().hide();
    resetImagePreview();
  }

  function confirmDelete() {
    if (deletePendingId == null) return;
    const removed = deletePendingId;
    state.projects = state.projects.filter((p) => p.id !== removed);
    deletePendingId = null;
    persist();
    render();
    deleteModal().hide();
    showToast("Application supprimée.", "success");
  }

  function onResetData() {
    if (
      !window.confirm(
        "Réinitialiser toutes les données avec le jeu de démonstration ? Les modifications seront perdues."
      )
    ) {
      return;
    }
    state.projects = createDefaultProjects();
    persist();
    render();
    showToast("Données réinitialisées.", "primary");
  }

  fieldImageFile.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      resetImagePreview();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      pendingImageData = reader.result;
      imagePreview.src = pendingImageData;
      imagePreviewWrap.hidden = false;
      fieldImageUrl.value = "";
    };
    reader.readAsDataURL(file);
  });

  projectForm.addEventListener("submit", submitProjectForm);

  projectModalEl.addEventListener("hidden.bs.modal", () => {
    projectForm.classList.remove("was-validated");
  });

  deleteConfirmBtn.addEventListener("click", confirmDelete);

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    render();
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('[name="username"]').value.trim();
    const password = loginForm.querySelector('[name="password"]').value;
    loginError.classList.add("d-none");
    if (username === "admin" && password === "admin") {
      loginView.classList.add("d-none");
      dashboard.classList.remove("d-none");
      loadProjects();
      render();
    } else {
      loginError.textContent = "Identifiant ou mot de passe incorrect.";
      loginError.classList.remove("d-none");
    }
  });

  resetBtn.addEventListener("click", onResetData);

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      dashboard.classList.add("d-none");
      loginView.classList.remove("d-none");
      loginForm.reset();
      loginError.classList.add("d-none");
      const userField = document.getElementById("login-user");
      const passField = document.getElementById("login-pass");
      if (userField) userField.value = "admin";
      if (passField) passField.value = "admin";
    });
  }

  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

  btnOpenCreate.addEventListener("click", () => {
    openCreateModal();
  });

  function setNavActive(activeId) {
    document.querySelectorAll("#ahNavbarNav .nav-link").forEach((a) => {
      const on = a.id === activeId;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  document.getElementById("ah-nav-catalogue")?.addEventListener("click", (e) => {
    e.preventDefault();
    setNavActive("ah-nav-catalogue");
    document
      .getElementById("ah-catalogue")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("ah-nav-stats")?.addEventListener("click", (e) => {
    e.preventDefault();
    setNavActive("ah-nav-stats");
    document
      .getElementById("ah-stats-row")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
