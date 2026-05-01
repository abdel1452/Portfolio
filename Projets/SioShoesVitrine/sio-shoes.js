(function () {
  "use strict";

  const CART_KEY = "sio-shoes-cart-v1";

  const PRODUCTS = Array.isArray(window.SIO_SHOES_PRODUCTS) ? window.SIO_SHOES_PRODUCTS : [];

  const CAT_LABEL = {
    all: "Tout",
    running: "Running",
    lifestyle: "Lifestyle",
    basket: "Basket",
  };

  let filter = "all";
  let searchQ = "";
  let cart = [];

  function loadCart() {
    try {
      cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(cart)) cart = [];
    } catch (_) {
      cart = [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function formatPrice(n) {
    return n.toFixed(2).replace(".", ",") + " €";
  }

  function cartCount() {
    return cart.reduce((s, l) => s + l.qty, 0);
  }

  function cartTotal() {
    return cart.reduce((s, l) => s + l.price * l.qty, 0);
  }

  function updateBadge() {
    const b = document.getElementById("sio-cart-badge");
    const n = cartCount();
    if (!b) return;
    b.textContent = String(n);
    b.hidden = n === 0;
  }

  function renderGrid() {
    const grid = document.getElementById("sio-grid");
    if (!grid) return;
    if (!PRODUCTS.length) {
      grid.innerHTML =
        '<p style="grid-column:1/-1;color:var(--sio-muted);text-align:center;padding:2rem;">Chargez <code>data.js</code> avant <code>sio-shoes.js</code>.</p>';
      return;
    }
    let list = filter === "all" ? PRODUCTS.slice() : PRODUCTS.filter((p) => p.cat === filter);
    const q = searchQ.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          String(p.name).toLowerCase().includes(q) || String(p.desc).toLowerCase().includes(q)
      );
    }
    grid.innerHTML = "";
    list.forEach((p) => {
      const el = document.createElement("article");
      el.className = "sio-card";
      el.innerHTML =
        '<img class="sio-card__img" src="' +
        p.img +
        '" alt="' +
        String(p.name).replace(/"/g, "&quot;") +
        '" loading="lazy" width="400" height="400">' +
        '<div class="sio-card__body">' +
        '<div class="sio-card__cat">' +
        (CAT_LABEL[p.cat] || p.cat) +
        "</div>" +
        '<h3 class="sio-card__title"></h3>' +
        '<p class="sio-card__desc"></p>' +
        '<div class="sio-card__row">' +
        '<span class="sio-price"></span>' +
        '<button type="button" class="sio-add" aria-label="Ajouter">+</button>' +
        "</div></div>";
      el.querySelector(".sio-card__title").textContent = p.name;
      el.querySelector(".sio-card__desc").textContent = p.desc;
      el.querySelector(".sio-price").textContent = formatPrice(p.price);
      el.querySelector(".sio-add").addEventListener("click", () => {
        const line = cart.find((x) => x.id === p.id);
        if (line) line.qty += 1;
        else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
        saveCart();
        updateBadge();
        renderDrawer();
      });
      grid.appendChild(el);
    });
  }

  function renderDrawer() {
    const body = document.getElementById("sio-drawer-body");
    const totalEl = document.getElementById("sio-drawer-total");
    if (!body) return;
    body.innerHTML = "";
    if (!cart.length) {
      body.innerHTML = '<p style="color:var(--sio-muted);text-align:center;padding:2rem;">Panier vide — ajoutez une paire depuis la grille.</p>';
    } else {
      cart.forEach((line) => {
        const row = document.createElement("div");
        row.style.cssText =
          "display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--sio-gray);gap:0.5rem;";
        row.innerHTML =
          "<div><strong style=font-size:0.9rem>" +
          line.name +
          "</strong><br><small style=color:var(--sio-muted)>× " +
          line.qty +
          " · " +
          formatPrice(line.price * line.qty) +
          '</small></div><button type="button" style="background:none;border:1px solid #555;color:#fff;padding:0.25rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">−</button>';
        row.querySelector("button").addEventListener("click", () => {
          line.qty -= 1;
          if (line.qty <= 0) cart = cart.filter((x) => x.id !== line.id);
          saveCart();
          updateBadge();
          renderDrawer();
        });
        body.appendChild(row);
      });
    }
    if (totalEl) totalEl.textContent = formatPrice(cartTotal());
  }

  function openDrawer() {
    renderDrawer();
    document.getElementById("sio-drawer-overlay").classList.add("is-open");
    document.getElementById("sio-drawer").classList.add("is-open");
  }

  function closeDrawer() {
    document.getElementById("sio-drawer-overlay").classList.remove("is-open");
    document.getElementById("sio-drawer").classList.remove("is-open");
  }

  document.querySelectorAll(".sio-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter || "all";
      document.querySelectorAll(".sio-filter").forEach((b) => b.classList.toggle("is-on", b === btn));
      renderGrid();
    });
  });

  document.getElementById("sio-search")?.addEventListener("input", (e) => {
    searchQ = e.target && "value" in e.target ? String(e.target.value) : "";
    renderGrid();
  });

  document.getElementById("sio-cart-btn")?.addEventListener("click", openDrawer);
  document.getElementById("sio-drawer-close")?.addEventListener("click", closeDrawer);
  document.getElementById("sio-drawer-overlay")?.addEventListener("click", closeDrawer);

  document.querySelectorAll('.sio-nav__links a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      document.querySelectorAll(".sio-nav__links a").forEach((x) => x.classList.remove("is-active"));
      a.classList.add("is-active");
    });
  });

  async function loadRetailApis() {
    const el = document.getElementById("sio-api-info");
    if (!el) return;
    const parts = [];
    try {
      const r = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true"
      );
      const j = await r.json();
      const t = j && j.current_weather && typeof j.current_weather.temperature === "number" ? j.current_weather.temperature : null;
      if (t != null) parts.push("Météo indicative Paris (Open-Meteo) : " + Math.round(t) + " °C");
    } catch (_) {}
    try {
      const r2 = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD");
      const j2 = await r2.json();
      const usd = j2 && j2.rates && typeof j2.rates.USD === "number" ? j2.rates.USD : null;
      if (usd != null) {
        parts.push("Change indicatif 1 € ≈ " + usd.toFixed(2) + " USD (Frankfurter" + (j2.date ? ", " + j2.date : "") + ")");
      }
    } catch (_) {}
    el.textContent = parts.join(" · ");
  }

  loadCart();
  updateBadge();
  renderGrid();
  loadRetailApis();
})();
