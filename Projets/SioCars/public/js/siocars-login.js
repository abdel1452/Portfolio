(function () {
  const DEMO_USER = "admin";
  const DEMO_PASS = "admin";
  const form = document.getElementById("login-form");
  const err = document.getElementById("login-error");

  if (SioCarsAuth.isAuthenticated()) {
    window.location.replace("dashboard.html");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    err.classList.add("d-none");
    const u = form.querySelector('[name="username"]').value.trim();
    const p = form.querySelector('[name="password"]').value;
    if (u === DEMO_USER && p === DEMO_PASS) {
      SioCarsAuth.login(u);
      window.location.href = "dashboard.html";
    } else {
      err.textContent = "Identifiant ou mot de passe incorrect.";
      err.classList.remove("d-none");
    }
  });
})();
