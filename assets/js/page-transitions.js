/**
 * Transitions douces entre pages HTML du portfolio (même onglet).
 * Les ancres #section restent gérées par le scroll fluide dans main.js.
 */
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ensureOverlay() {
    let el = document.getElementById("page-transition");
    if (!el) {
      el = document.createElement("div");
      el.id = "page-transition";
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
    }
    return el;
  }

  function shouldUsePageTransition(anchor) {
    const hrefAttr = anchor.getAttribute("href");
    if (!hrefAttr || hrefAttr === "#" || hrefAttr.startsWith("#")) return false;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
    if (/^(mailto:|tel:|javascript:)/i.test(hrefAttr)) return false;

    let resolved;
    try {
      resolved = new URL(anchor.href, window.location.href);
    } catch {
      return false;
    }

    if (/\.pdf(\?|#|$)/i.test(resolved.pathname)) return false;

    if (/^https?:/i.test(hrefAttr)) {
      return resolved.origin === window.location.origin;
    }

    return /\.html(\?|#|$)/i.test(resolved.pathname);
  }

  document.addEventListener("click", function (e) {
    if (prefersReducedMotion) return;
    const a = e.target.closest("a");
    if (!a || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!shouldUsePageTransition(a)) return;

    e.preventDefault();
    const overlay = ensureOverlay();
    const go = a.href;
    overlay.classList.add("is-visible");
    window.setTimeout(function () {
      window.location.href = go;
    }, 320);
  });
})();
