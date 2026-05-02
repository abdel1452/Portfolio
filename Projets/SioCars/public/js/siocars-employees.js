(function () {
  if (!SioCarsAuth.requireAuth()) return;

  const PER_PAGE = 50;
  let state = SioCarsData.loadOrCreate();
  let page = 1;
  let selectedMatricule = null;

  const tbody = document.querySelector("#table-employees tbody");
  const pagEl = document.getElementById("pagination-employees");
  const searchEl = document.getElementById("search-employees");
  const toolbarHint = document.getElementById("list-toolbar-hint");
  const toolbarSelection = document.getElementById("list-toolbar-selection");
  const toolbarOpen = document.getElementById("list-toolbar-open");

  function getFiltered() {
    const q = (searchEl?.value || "").trim().toLowerCase();
    if (!q) return state.employees;
    return state.employees.filter(
      (e) =>
        e.matricule.toLowerCase().includes(q) ||
        `${e.prenom} ${e.nom}`.toLowerCase().includes(q) ||
        e.poste.toLowerCase().includes(q) ||
        e.service.toLowerCase().includes(q)
    );
  }

  function employeeLabel(mat) {
    const e = state.employees.find((x) => x.matricule === mat);
    if (!e) return mat;
    return `${e.matricule} · ${e.prenom} ${e.nom}`;
  }

  function updateToolbar() {
    if (!toolbarOpen || !toolbarSelection || !toolbarHint) return;
    if (selectedMatricule && state.employees.some((e) => e.matricule === selectedMatricule)) {
      toolbarHint.classList.add("d-none");
      toolbarSelection.classList.remove("d-none");
      toolbarSelection.textContent = employeeLabel(selectedMatricule);
      toolbarOpen.disabled = false;
    } else {
      selectedMatricule = null;
      toolbarHint.classList.remove("d-none");
      toolbarSelection.classList.add("d-none");
      toolbarSelection.textContent = "";
      toolbarOpen.disabled = true;
    }
  }

  function selectEmployee(mat) {
    selectedMatricule = mat === selectedMatricule ? null : mat;
    updateToolbar();
    tbody.querySelectorAll("tr.sc-row-selected").forEach((tr) => tr.classList.remove("sc-row-selected"));
    if (selectedMatricule) {
      const tr = tbody.querySelector(`tr[data-employee-id="${CSS.escape(selectedMatricule)}"]`);
      tr?.classList.add("sc-row-selected");
    }
  }

  function render() {
    const filtered = getFiltered();
    const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (page > pages) page = pages;
    const start = (page - 1) * PER_PAGE;
    const slice = filtered.slice(start, start + PER_PAGE);

    tbody.innerHTML = "";
    slice.forEach((e) => {
      const tr = document.createElement("tr");
      tr.className = "sc-row-selectable" + (e.matricule === selectedMatricule ? " sc-row-selected" : "");
      tr.dataset.employeeId = e.matricule;
      tr.innerHTML = `
        <td><code>${e.matricule}</code></td>
        <td>${e.prenom} ${e.nom}</td>
        <td>${e.poste}</td>
        <td class="d-none d-md-table-cell">${e.service}</td>
        <td class="d-none d-lg-table-cell small"><a class="link-light sc-stop-select" href="mailto:${e.email}">${e.email}</a></td>
        <td>${e.dateEmbauche}</td>
        <td><span class="badge ${e.actif ? "text-bg-success" : "text-bg-danger"}">${e.actif ? "Actif" : "Inactif"}</span></td>`;
      tr.addEventListener("click", (ev) => {
        if (ev.target.closest(".sc-stop-select")) return;
        selectEmployee(e.matricule);
      });
      tbody.appendChild(tr);
    });

    updateToolbar();

    document.getElementById("employees-count-label").textContent = `${filtered.length} employé(s)`;

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
    if (selectedMatricule) {
      window.location.href = `employee-detail.html?id=${encodeURIComponent(selectedMatricule)}`;
    }
  });

  searchEl?.addEventListener("input", () => {
    page = 1;
    render();
  });

  document.getElementById("btn-reset-demo")?.addEventListener("click", () => {
    if (confirm("Régénérer tout le jeu de données démo ?")) {
      state = SioCarsData.reset();
      page = 1;
      selectedMatricule = null;
      render();
    }
  });

  render();
})();
