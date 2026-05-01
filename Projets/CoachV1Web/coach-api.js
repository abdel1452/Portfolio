/**
 * Données en direct : Open-Meteo (Amiens) + ZenQuotes (citation).
 * Aucune clé API — usage portfolio / maquette.
 */
(function () {
  "use strict";

  const mount = document.getElementById("coach-live-api");
  if (!mount) return;

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  Promise.all([
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=49.8942&longitude=2.2957&current_weather=true"
    ).then(function (r) {
      return r.json();
    }),
    fetch("https://zenquotes.io/api/random").then(function (r) {
      return r.json();
    }),
  ])
    .then(function (results) {
      const weatherJson = results[0];
      const quoteArr = results[1];
      const t =
        weatherJson &&
        weatherJson.current_weather &&
        typeof weatherJson.current_weather.temperature === "number"
          ? weatherJson.current_weather.temperature
          : null;
      const lineWeather =
        t != null
          ? "<strong>Météo Amiens</strong> (Open-Meteo) : " + Math.round(t) + " °C — idéal pour enchaîner cardio ou sortie footing."
          : "";
      let lineQuote = "";
      if (Array.isArray(quoteArr) && quoteArr[0] && quoteArr[0].q) {
        lineQuote =
          "<strong>Motivation</strong> (ZenQuotes) : « " +
          esc(quoteArr[0].q) +
          " » <span class=\"coach-live__author\">— " +
          esc(quoteArr[0].a || "") +
          "</span>";
      }
      mount.innerHTML =
        '<div class="coach-live__card">' +
        (lineWeather || "<p>Données météo momentanément indisponibles.</p>") +
        "</div>" +
        '<div class="coach-live__card coach-live__card--quote">' +
        (lineQuote || "<p>Citation indisponible.</p>") +
        "</div>";
    })
    .catch(function () {
      mount.innerHTML =
        '<p class="coach-live__err">Impossible de joindre les APIs (réseau ou blocage). Réessayez plus tard.</p>';
    });
})();
