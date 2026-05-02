/**
 * Session applicative Sio Cars (pages indépendantes).
 * Sans connexion valide, les modules redirigent vers index.html.
 */
(function (w) {
  const AUTH_KEY = "siocars-session-v1";
  const USER_KEY = "siocars-user-v1";

  w.SioCarsAuth = {
    AUTH_KEY,
    isAuthenticated() {
      return localStorage.getItem(AUTH_KEY) === "ok";
    },
    login(username) {
      localStorage.setItem(AUTH_KEY, "ok");
      if (username) localStorage.setItem(USER_KEY, username);
    },
    logout() {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(USER_KEY);
      w.location.href = "index.html";
    },
    requireAuth() {
      if (!this.isAuthenticated()) {
        w.location.replace("index.html");
        return false;
      }
      return true;
    },
    getUsername() {
      return localStorage.getItem(USER_KEY) || "admin";
    },
  };
})(window);
