/**
 * Télécharge les visuels vers ./images/plats/{id}.jpg
 * Photos Unsplash (licence Unsplash) — thème pizza / italien, illustratif.
 * Correspondance : id plat = nom fichier (aligné sur data.js).
 */
import { mkdirSync, createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import https from "https";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "images", "plats");

/** 16 visuels pizza distincts ; 23 plats → quelques réutilisations espacées dans la carte. */
const UNSPLASH = [
  "1513104890138-7c749659a591",
  "1565299624946-b28f40a0ae38",
  "1574071318508-1cdbab80d002",
  "1628840042765-356cda07504e",
  "1571997478779-2adcbbe9ab2f",
  "1593560708920-61dd98c46a4e",
  "1594007654729-407eedc4be65",
  "1579751626657-72bc17010498",
  "1593504049359-74330189a345",
  "1555072956-7758afb20e8f",
  "1534308983496-4fabb1a015ee",
  "1546549032-9571cd6b27df",
  "1571066811602-716837d681de",
  "1604382354936-07c5d9983bd3",
  "1611915365928-565c527a0590",
  "1613564834361-9436948817d1",
];

/** Ordre = window.SNACK_ITEMS ; chiffre = index dans UNSPLASH */
const PLATS = [
  { id: "ue-chicago", u: 0 },
  { id: "ue-french-burger", u: 1 },
  { id: "ue-saumon", u: 2 },
  { id: "ue-savoyarde", u: 3 },
  { id: "ue-forestiere", u: 4 },
  { id: "ue-chevre-miel", u: 5 },
  { id: "ue-hawaienne", u: 6 },
  { id: "ue-chef", u: 7 },
  { id: "ue-milano", u: 8 },
  { id: "ue-normande", u: 9 },
  { id: "ue-4fromages", u: 10 },
  { id: "ue-royale", u: 11 },
  { id: "ue-sicilienne", u: 12 },
  { id: "ue-marguerita", u: 13 },
  { id: "ue-orientale", u: 14 },
  { id: "ue-sorento", u: 15 },
  { id: "ue-reine", u: 0 },
  { id: "ue-vegetarienne", u: 3 },
  { id: "ue-fruits-mer", u: 8 },
  { id: "ue-buffalo", u: 6 },
  { id: "ue-texas", u: 11 },
  { id: "ue-indienne", u: 9 },
  { id: "ue-palace", u: 14 },
];

function srcUrl(photoId) {
  return (
    "https://images.unsplash.com/photo-" +
    photoId +
    "?w=800&h=600&fit=crop&q=80&auto=format"
  );
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https
      .get(
        url,
        { headers: { "User-Agent": "SnackPalace-local-assets/1" } },
        (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            const loc = res.headers.location;
            res.resume();
            if (!loc) return reject(new Error("Redirect sans Location"));
            const next = loc.startsWith("http")
              ? loc
              : new URL(loc, url).href;
            return resolve(download(next, dest));
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode} ${url}`));
          }
          pipeline(res, file).then(resolve).catch(reject);
        }
      )
      .on("error", reject);
  });
}

mkdirSync(outDir, { recursive: true });

let ok = 0;
for (const p of PLATS) {
  const photoId = UNSPLASH[p.u];
  const dest = join(outDir, `${p.id}.jpg`);
  process.stdout.write(`${p.id} ... `);
  try {
    await download(srcUrl(photoId), dest);
    console.log("OK");
    ok++;
  } catch (e) {
    console.log(e.message);
  }
}
console.log(`Terminé: ${ok}/${PLATS.length}`);
