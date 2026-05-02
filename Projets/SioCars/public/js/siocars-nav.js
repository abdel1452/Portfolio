/**
 * Navbar dynamique : compact au scroll, filet d’accent, indicateur section (optionnel).
 */
(function () {
  const navs = document.querySelectorAll(".sc-nav-dynamic");
  if (!navs.length) return;

  let ticking = false;
  const THRESHOLD = 12;

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const on = y > THRESHOLD;
    navs.forEach((nav) => {
      nav.classList.toggle("sc-nav--scrolled", on);
      nav.setAttribute("data-sc-scrolled", on ? "true" : "false");
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

  /* Liens : micro-feedback au clic */
  navs.forEach((nav) => {
    nav.querySelectorAll(".nav-link[href]").forEach((link) => {
      link.addEventListener("click", function () {
        this.classList.add("sc-nav-link--pulse");
        setTimeout(() => this.classList.remove("sc-nav-link--pulse"), 450);
      });
    });
  });
})();
