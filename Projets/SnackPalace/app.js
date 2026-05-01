(function () {
  "use strict";

  const meta = window.SNACK_META;
  const categories = window.SNACK_CATEGORIES;
  const items = window.SNACK_ITEMS;
  const CART_KEY = "snack-palace-cart";

  let activeCat = "all";
  let cart = [];

  const drawer = document.getElementById("sp-drawer");
  const drawerOverlay = document.getElementById("sp-drawer-overlay");
  const navCartBtn = document.getElementById("sp-nav-cart");

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      cart = raw ? JSON.parse(raw) : [];
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

  function fetchHeroWeather() {
    const el = document.getElementById("sp-weather-line");
    if (!el) return;
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=49.8942&longitude=2.2957&current_weather=true"
    )
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        const t = j && j.current_weather && typeof j.current_weather.temperature === "number" ? j.current_weather.temperature : null;
        if (t == null) return;
        el.hidden = false;
        el.textContent =
          "Météo indicative " +
          meta.area +
          " (Open-Meteo) : " +
          Math.round(t) +
          " °C — parfait pour une livraison ou un retrait au chaud.";
      })
      .catch(function () {});
  }

  function renderHero() {
    const promo = document.getElementById("sp-promo-bar");
    if (promo && meta.promoBar != null) promo.textContent = meta.promoBar;

    const brand = document.getElementById("sp-hero-brand");
    if (brand) brand.textContent = meta.name;

    const hl = document.getElementById("sp-hero-headline");
    if (hl) hl.textContent = meta.headline || meta.name;

    const sh = document.getElementById("sp-hero-subhead");
    if (sh) sh.textContent = meta.subhead || "";

    const introEl = document.getElementById("sp-hero-intro");
    if (introEl) introEl.textContent = meta.intro || "";

    const tag = document.getElementById("sp-hero-tagline");
    if (tag) tag.textContent = meta.tagline || "";

    const uberCta = document.getElementById("sp-hero-uber-cta");
    if (uberCta && meta.uberEats) uberCta.href = meta.uberEats;

    const contact = document.getElementById("sp-header-contact");
    if (contact) {
      contact.href = meta.phoneTel;
      contact.textContent = meta.phone;
    }

    const rating = document.getElementById("sp-hero-rating");
    if (rating) rating.textContent = "★ " + meta.rating;

    const eta = document.getElementById("sp-hero-eta");
    if (eta) eta.textContent = meta.deliveryEta;

    const addr = document.getElementById("sp-hero-address");
    if (addr)
      addr.innerHTML =
        "<strong>À emporter / livraison / sur place</strong><br>" +
        meta.address +
        "<br><span>" +
        meta.area +
        "</span>";

    const phoneEl = document.getElementById("sp-hero-phone");
    if (phoneEl) {
      phoneEl.href = meta.phoneTel;
      phoneEl.textContent = meta.phone;
    }

    const hoursEl = document.getElementById("sp-hero-hours");
    if (hoursEl)
      hoursEl.innerHTML = meta.hours
        .map((h) => "<div><strong>" + h.days + "</strong> · " + h.time + "</div>")
        .join("");

    const off = document.getElementById("sp-official-link");
    if (off) off.href = meta.official;

    const uber = document.getElementById("sp-uber-link");
    const uberFoot = document.getElementById("sp-footer-uber");
    if (meta.uberEats) {
      if (uber) uber.href = meta.uberEats;
      if (uberFoot) uberFoot.href = meta.uberEats;
    }

    const del = document.getElementById("sp-delivery-note");
    if (del) del.textContent = meta.deliveryNote || "";
  }

  function renderTrust() {
    const grid = document.getElementById("sp-values-grid");
    if (!grid || !meta.trustBlocks || !meta.trustBlocks.length) return;
    grid.innerHTML = "";
    meta.trustBlocks.forEach(function (b) {
      const card = document.createElement("article");
      card.className = "sp-value-card";
      card.innerHTML =
        '<div class="sp-value-card__icon" aria-hidden="true"></div>' +
        '<h3 class="sp-value-card__title"></h3>' +
        '<p class="sp-value-card__text"></p>';
      card.querySelector(".sp-value-card__icon").textContent = b.icon || "";
      card.querySelector(".sp-value-card__title").textContent = b.title;
      card.querySelector(".sp-value-card__text").textContent = b.text;
      grid.appendChild(card);
    });
  }

  function renderChips() {
    const el = document.getElementById("sp-categories");
    el.innerHTML = "";
    categories.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sp-chip" + (c.id === activeCat ? " is-active" : "");
      btn.textContent = c.icon + " " + c.label;
      btn.addEventListener("click", () => {
        activeCat = c.id;
        document.getElementById("sp-search-input").value = "";
        renderChips();
        renderGrid();
      });
      el.appendChild(btn);
    });
  }

  function getFilteredItems() {
    const q = document.getElementById("sp-search-input").value.trim().toLowerCase();
    let list = activeCat === "all" ? items.slice() : items.filter((i) => i.cat === activeCat);
    if (q) {
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function renderGrid() {
    const el = document.getElementById("sp-menu");
    const list = getFilteredItems();
    el.innerHTML = "";
    if (!list.length) {
      el.innerHTML = '<p class="sp-empty">Aucun plat ne correspond.</p>';
      return;
    }
    list.forEach((item) => {
      const card = document.createElement("article");
      card.className = "sp-dish";
      card.innerHTML =
        '<img class="sp-dish__img" src="' +
        item.img +
        '" alt="' +
        String(item.name).replace(/"/g, "&quot;") +
        '" loading="lazy">' +
        '<div class="sp-dish__body">' +
        '<h3 class="sp-dish__name"></h3>' +
        '<p class="sp-dish__desc"></p>' +
        '<div class="sp-dish__row">' +
        '<span class="sp-price"></span>' +
        '<button type="button" class="sp-add" aria-label="Ajouter au panier">+</button>' +
        "</div></div>";
      card.querySelector(".sp-dish__name").textContent = item.name;
      card.querySelector(".sp-dish__desc").textContent = item.desc;
      card.querySelector(".sp-price").textContent = formatPrice(item.price);
      card.querySelector(".sp-add").addEventListener("click", () => addToCart(item));
      el.appendChild(card);
    });
  }

  function addToCart(item) {
    const line = cart.find((l) => l.id === item.id);
    if (line) line.qty += 1;
    else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    saveCart();
    updateCartBar();
    if (isDrawerOpen()) renderDrawer();
  }

  function setQty(lineId, delta) {
    const found = cart.find((l) => l.id === lineId);
    if (!found) return;
    found.qty += delta;
    if (found.qty <= 0) cart = cart.filter((l) => l.id !== lineId);
    saveCart();
    updateCartBar();
    renderDrawer();
  }

  function cartTotal() {
    return cart.reduce((s, l) => s + l.price * l.qty, 0);
  }

  function cartCount() {
    return cart.reduce((s, l) => s + l.qty, 0);
  }

  function updateCartBar() {
    const bar = document.getElementById("sp-cart-bar");
    const n = cartCount();
    const total = cartTotal();
    bar.disabled = n === 0;
    document.getElementById("sp-cart-label").textContent =
      n === 0 ? "Panier vide" : "Voir le panier · " + n + " article" + (n > 1 ? "s" : "");
    document.getElementById("sp-cart-total").textContent = n ? formatPrice(total) : "—";

    const badge = document.getElementById("sp-nav-cart-badge");
    if (badge) {
      if (n === 0) {
        badge.hidden = true;
        badge.textContent = "0";
      } else {
        badge.hidden = false;
        badge.textContent = String(n);
      }
    }
  }

  function renderDrawer() {
    const body = document.getElementById("sp-drawer-lines");
    if (!body) return;
    body.innerHTML = "";
    if (!cart.length) {
      body.innerHTML =
        '<p class="sp-drawer__empty">Aucun plat pour l’instant. Ajoutez des pizzas depuis la carte.</p>';
    } else {
      cart.forEach((line) => {
        const row = document.createElement("div");
        row.className = "sp-drawer-line";
        row.innerHTML =
          '<div class="sp-drawer-line__info">' +
          '<div class="sp-drawer-line__name"></div>' +
          '<div class="sp-drawer-line__unit"></div>' +
          "</div>" +
          '<div class="sp-drawer-line__controls">' +
          '<button type="button" class="sp-qty" data-delta="-1" aria-label="Diminuer">−</button>' +
          '<span class="sp-qty-val"></span>' +
          '<button type="button" class="sp-qty" data-delta="1" aria-label="Augmenter">+</button>' +
          "</div>" +
          '<div class="sp-drawer-line__sub"></div>';
        row.querySelector(".sp-drawer-line__name").textContent = line.name;
        row.querySelector(".sp-drawer-line__unit").textContent =
          formatPrice(line.price) + " / unité";
        row.querySelector(".sp-qty-val").textContent = String(line.qty);
        row.querySelector(".sp-drawer-line__sub").textContent = formatPrice(
          line.price * line.qty
        );
        row.querySelectorAll(".sp-qty").forEach((btn) => {
          btn.addEventListener("click", () =>
            setQty(line.id, Number(btn.getAttribute("data-delta")))
          );
        });
        body.appendChild(row);
      });
    }
    const sumEl = document.getElementById("sp-drawer-sum");
    if (sumEl) sumEl.textContent = formatPrice(cartTotal());
    const co = document.getElementById("sp-checkout");
    if (co) co.disabled = cart.length === 0;
  }

  function isDrawerOpen() {
    return drawer && drawer.classList.contains("is-open");
  }

  function openDrawer() {
    renderDrawer();
    drawer.classList.add("is-open");
    drawerOverlay.hidden = false;
    requestAnimationFrame(() => drawerOverlay.classList.add("is-visible"));
    drawer.setAttribute("aria-hidden", "false");
    navCartBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("sp-drawer-open");
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawerOverlay.classList.remove("is-visible");
    drawer.setAttribute("aria-hidden", "true");
    navCartBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("sp-drawer-open");
    window.setTimeout(() => {
      if (!drawer.classList.contains("is-open")) drawerOverlay.hidden = true;
    }, 220);
  }

  document.getElementById("sp-search-input").addEventListener("input", () => {
    renderGrid();
  });

  document.getElementById("sp-cart-bar").addEventListener("click", () => {
    openDrawer();
  });

  navCartBtn.addEventListener("click", () => {
    if (isDrawerOpen()) closeDrawer();
    else openDrawer();
  });

  document.getElementById("sp-drawer-close").addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isDrawerOpen()) closeDrawer();
  });

  document.getElementById("sp-checkout").addEventListener("click", () => {
    if (!cart.length) return;
    cart = [];
    saveCart();
    updateCartBar();
    closeDrawer();
    window.location.href = "success.html";
  });

  loadCart();
  renderHero();
  renderTrust();
  fetchHeroWeather();
  renderChips();
  renderGrid();
  updateCartBar();
})();
