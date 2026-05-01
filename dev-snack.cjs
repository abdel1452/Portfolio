/**
 * Sert le portfolio en local et ouvre Snack Palace dans le navigateur.
 * Port : http://127.0.0.1:8080
 */
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

const ROOT = __dirname;
const STATIC_PORT = 8080;
const ORIGIN = `http://127.0.0.1:${STATIC_PORT}`;
const PUBLIC_BASE = `${ORIGIN}/Projets/SnackPalace`;

function log(...a) {
  console.log("[dev-snack]", ...a);
}

function freeLocalPort(port) {
  if (process.platform !== "win32") return;
  try {
    const { execSync } = require("child_process");
    execSync(
      `powershell -NoProfile -Command "$c = Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue; if ($c) { $c | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }"`,
      { stdio: "ignore" }
    );
  } catch (_) {
    /* ignore */
  }
}

function waitForUrl(url, label, ms = 120000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + ms;
    const tryOnce = () => {
      const u = new URL(url);
      const req = http.request(
        {
          hostname: u.hostname,
          port: u.port,
          path: u.pathname || "/",
          method: "GET",
          timeout: 2500,
        },
        (res) => {
          res.resume();
          resolve();
        }
      );
      req.on("error", () => {
        if (Date.now() > deadline) reject(new Error(`${label} injoignable : ${url}`));
        else setTimeout(tryOnce, 400);
      });
      req.on("timeout", () => {
        req.destroy();
        if (Date.now() > deadline) reject(new Error(`${label} timeout`));
        else setTimeout(tryOnce, 400);
      });
      req.end();
    };
    tryOnce();
  });
}

function openBrowser(winUrl) {
  const { exec } = require("child_process");
  const cmd =
    process.platform === "win32"
      ? `start "" "${winUrl}"`
      : process.platform === "darwin"
        ? `open "${winUrl}"`
        : `xdg-open "${winUrl}"`;
  exec(cmd, (err) => {
    if (err) log("Ouverture navigateur :", err.message);
  });
}

function main() {
  freeLocalPort(STATIC_PORT);

  const listen = `tcp://127.0.0.1:${STATIC_PORT}`;
  const staticSrv = spawn(
    "npx",
    ["--yes", "serve@14", "-l", listen, "-n", path.resolve(ROOT)],
    {
      cwd: ROOT,
      stdio: "inherit",
      shell: true,
      env: { ...process.env, FORCE_COLOR: "1" },
    }
  );

  staticSrv.on("error", (e) => {
    console.error("[dev-snack] serve :", e);
    process.exit(1);
  });

  const page = `${PUBLIC_BASE}/`;
  log(`Site → ${page}`);
  log("Ctrl+C pour arrêter.");

  waitForUrl(ORIGIN + "/", "serve", 120000)
    .then(() => {
      openBrowser(page);
      log("Navigateur ouvert.");
      log("READY_SNACK_DEV");
    })
    .catch((e) => log(e.message));

  const shutdown = () => {
    log("Arrêt…");
    try {
      staticSrv.kill("SIGTERM");
    } catch (_) {}
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main();
