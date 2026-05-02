(function () {
  if (!SioCarsAuth.requireAuth()) return;

  document.getElementById("dash-user").textContent = SioCarsAuth.getUsername();

  const data = SioCarsData.loadOrCreate();
  document.getElementById("stat-total").textContent = String(SioCarsData.totalRecords(data));
  document.getElementById("stat-clients").textContent = String(data.clients.length);
  document.getElementById("stat-vehicles").textContent = String(data.vehicles.length);
  document.getElementById("stat-sales").textContent = String(data.sales.length);

  document.getElementById("btn-logout").addEventListener("click", () => SioCarsAuth.logout());
})();
