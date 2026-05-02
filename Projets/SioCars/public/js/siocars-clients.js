(function () {
  if (!SioCarsAuth.requireAuth()) return;

  const PER_PAGE = 50;
  let state = SioCarsData.loadOrCreate();
  let page = 1;
  let selectedId = null;

  const tbody = document.querySelector("#table-clients tbody");
  const pagEl = document.getElementById("pagination-clients");
  const searchEl = document.getElementById("search-clients");
  const toolbarHint = document.getElementById("list-toolbar-hint");
  const toolbarSelection = document.getElementById("list-toolbar-selection");
  const toolbarOpen = document.getElementById("list-toolbar-open");

  function getFiltered() {
    const q = (searchEl?.value || "").trim().toLowerCase();
    if (!q) return state.clients;
    return state.clients.filter(
      (c) =>
        c.id.toLowerCase().includes(q) ||
        `${c.prenom} ${c.nom}`.toLowerCase().includes(q) ||
        c.ville.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }

  function clientLabel(id) {
    const c = state.clients.find((x) => x.id === id);
    if (!c) return id;
    return `${c.id} · ${c.prenom} ${c.nom}`;
  }

  function updateToolbar() {
    if (!toolbarOpen || !toolbarSelection || !toolbarHint) return;
    if (selectedId && state.clients.some((c) => c.id === selectedId)) {
      toolbarHint.classList.add("d-none");
      toolbarSelection.classList.remove("d-none");
      toolbarSelection.textContent = clientLabel(selectedId);
      toolbarOpen.disabled = false;
    } else {
      selectedId = null;
      toolbarHint.classList.remove("d-none");
      toolbarSelection.classList.add("d-none");
      toolbarSelection.textContent = "";
      toolbarOpen.disabled = true;
    }
  }

  function selectClient(id) {
    selectedId = id === selectedId ? null : id;
    updateToolbar();
    tbody.querySelectorAll("tr.sc-row-selected").forEach((tr) => tr.classList.remove("sc-row-selected"));
    if (selectedId) {
      const tr = tbody.querySelector(`tr[data-client-id="${CSS.escape(selectedId)}"]`);
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
    slice.forEach((c) => {
      const n = SioCarsUI.salesForClient(state, c.id).length;
      const tr = document.createElement("tr");
      tr.className = "sc-row-selectable" + (c.id === selectedId ? " sc-row-selected" : "");
      tr.dataset.clientId = c.id;
      tr.innerHTML = `
        <td><span class="sc-badge-vin text-sc-muted">${c.id}</span></td>
        <td>${c.civilite} ${c.prenom} ${c.nom}</td>
        <td class="d-none d-md-table-cell small">${c.ville} (${c.cp})</td>
        <td class="d-none d-lg-table-cell small">${c.email}</td>
        <td><span class="badge bg-secondary bg-opacity-25 text-light border border-secondary">${c.fidelite}</span></td>
        <td><span class="badge ${n ? "text-bg-primary" : "text-bg-secondary"}">${n}</span></td>`;
      tr.addEventListener("click", () => selectClient(c.id));
      tbody.appendChild(tr);
    });

    updateToolbar();

    document.getElementById("clients-count-label").textContent = `${filtered.length} client(s)`;

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
      window.location.href = `client-detail.html?id=${encodeURIComponent(selectedId)}`;
    }
  });

  document.getElementById("btn-reset-demo")?.addEventListener("click", () => {
    if (confirm("Régénérer tout le jeu de données démo ?")) {
      state = SioCarsData.reset();
      page = 1;
      selectedId = null;
      render();
    }
  });

  searchEl?.addEventListener("input", () => {
    page = 1;
    render();
  });

  render();
})();
