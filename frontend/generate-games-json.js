const fs = require("fs");
const path = require("path");
const axios = require("axios");
const Papa = require("papaparse");

/**
 * IMPORTANT: replace this with your "Publish to web" CSV URL, NOT the
 * /export?format=csv URL. The export URL requires an authenticated Google
 * session and fails for bots/crawlers/build servers. The published URL
 * looks like:
 *   https://docs.google.com/spreadsheets/d/e/2PACX-XXXXXXXX/pub?output=csv
 *
 * Get it via: Google Sheets -> File -> Share -> Publish to web
 *             -> select the correct tab -> format: CSV -> Publish
 */
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOHnWpynDycFvN0wu-2n6tyOcImptBzgkKtApKzaHLdsI7W6aWWMuXBeDFFo4r3-bdGH5uMnqeD5Nc/pub?gid=0&single=true&output=csv";

const OUT_PATH = path.join(__dirname, "public", "games.json");

function safeString(value) {
  return String(value || "").trim();
}

async function fetchGamesCsv() {
  const res = await axios.get(CSV_URL, { responseType: "text" });

  const parsed = Papa.parse(res.data, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length) {
    console.warn("CSV parsing warnings:", parsed.errors);
  }

  return parsed.data;
}

async function main() {
  console.log("Fetching game list from published Google Sheet...");

  const rows = await fetchGamesCsv();

  // Keep the same "valid row" rule already used in useGames.js and the
  // sitemap generator, so all three stay consistent.
  const games = rows.filter((r) => safeString(r.Name) && safeString(r.Link));

  if (!games.length) {
    throw new Error(
      "Parsed 0 valid games (rows need both Name and Link). Check that " +
        "CSV_URL points to the right published sheet/tab."
    );
  }

  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(games, null, 2), "utf8");

  console.log(`✅ Wrote ${games.length} games to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("❌ Failed to generate games.json:", err.message);
  process.exit(1);
});