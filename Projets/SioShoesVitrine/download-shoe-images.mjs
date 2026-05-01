/**
 * Télécharge les visuels vers ./image shoes/{id}.jpg
 * Ordre des IDs Unsplash = ordre des entrées dans data.js (30).
 */
import { readFileSync, mkdirSync, createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import https from "https";
import { pipeline } from "stream/promises";

const UNSPLASH_IDS = [
  "1595950653106-6c9ebd614d3a",
  "1600269452121-4f2416e55c28",
  "1552346154-21d32810aba3",
  "1608667508764-33cf0726b13a",
  "1626379616459-b2ce1d9decbc",
  "1512374382149-233c42b6a83b",
  "1579338559194-a162d19bf842",
  "1556906781-9a412961c28c",
  "1565814636199-ae8133055c1c",
  "1465453869711-7e174808ace9",
  "1491553895911-0055eca6402d",
  "1586525198428-225f6f12cff5",
  "1549298916-f52d724204b4",
  "1597045566677-8cf032ed6634",
  "1514989940723-e8e51635b782",
  "1562183241-b937e95585b6",
  "1542291026-7eec264c27ff",
  "1597892657493-6847b9640bac",
  "1606107557195-0e29a4b5b4aa",
  "1585944672394-4c58a015c1fb",
  "1469395446868-fb6a048d5ca3",
  "1571008887538-b36bb32f4571",
  "1709258228137-19a8c193be39",
  "1639843093167-ed40b985c01e",
  "1587587448924-b5a1db520d29",
  "1602190420103-683df5093e86",
  "1644055154268-758a78b62d48",
  "1676041669566-fead69bd7007",
  "1581888748626-2a3f240a6f9f",
  "1460353581641-37baddab0fa2",
];

function u(id) {
  return "https://images.unsplash.com/photo-" + id + "?w=600&h=600&q=80&auto=format&fit=crop";
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "data.js");
const outDir = join(__dirname, "image shoes");

const code = readFileSync(dataPath, "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInNewContext(code, sandbox);
const products = sandbox.window.SIO_SHOES_PRODUCTS;

if (products.length !== UNSPLASH_IDS.length) {
  console.error("UNSPLASH_IDS et SIO_SHOES_PRODUCTS : même nombre d’entrées requis.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "SioShoesVitrine-local-assets/1" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          res.resume();
          if (!loc) return reject(new Error("Redirect sans Location"));
          return resolve(download(loc.startsWith("http") ? loc : new URL(loc, url).href, dest));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} ${url}`));
        }
        pipeline(res, file).then(resolve).catch(reject);
      })
      .on("error", reject);
  });
}

let ok = 0;
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const url = u(UNSPLASH_IDS[i]);
  const dest = join(outDir, `${p.id}.jpg`);
  process.stdout.write(`${p.id} ... `);
  try {
    await download(url, dest);
    console.log("OK");
    ok++;
  } catch (e) {
    console.log(e.message);
  }
}
console.log(`Terminé: ${ok}/${products.length}`);
