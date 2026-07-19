const fs = require("fs");
const path = require("path");

// Base URL
const BASE_URL = process.env.SITEMAP_BASE_URL || "https://www.quakeplay.com";

// NOTE: this now reads the local games.json that generate-games-json.js
// already produced, instead of fetching Google Sheets again. Run
// generate-games-json.js FIRST (see package.json "prebuild" script).
const GAMES_JSON_PATH = path.join(__dirname, "public", "games.json");

function safeString(value) {
  return String(value || "").trim();
}

function slugify(value) {
  return safeString(value)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$|^\s+|\s+$/g, "");
}

function formatDate(d = new Date()) {
  return d.toISOString().split("T")[0];
}

function escapeXml(unsafe) {
  return safeString(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function loadGames() {
  if (!fs.existsSync(GAMES_JSON_PATH)) {
    throw new Error(
      `${GAMES_JSON_PATH} not found. Run generate-games-json.js before ` +
        `generate-sitemap.js (see the "prebuild" script in package.json).`
    );
  }

  const raw = fs.readFileSync(GAMES_JSON_PATH, "utf8");
  const rows = JSON.parse(raw);

  return rows.map((r, index) => {
    const name = safeString(r.Name);
    const rawSlug = r.Slug && r.Slug.trim() ? r.Slug : name;
    const slug = slugify(rawSlug || `game-${index}`);
    return { name, slug };
  });
}

function buildSitemap() {
  console.log("Reading game list from public/games.json...");

  const games = loadGames();

  // Remove duplicate slugs
  const seen = new Set();
  const unique = [];
  for (const game of games) {
    if (!seen.has(game.slug)) {
      seen.add(game.slug);
      unique.push(game);
    }
  }

  const urls = [];

  // Homepage
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: formatDate(),
    changefreq: "daily",
    priority: "1.0",
  });

  // Search page
  urls.push({
    loc: `${BASE_URL}/search`,
    lastmod: formatDate(),
    changefreq: "weekly",
    priority: "0.8",
  });

  // Category pages
  const categories = [
    "Adventure", "Arcade", "Brain", "Cards", "Coloring", "Fantasy",
    "Girls", "Kids", "Match-3", "Multiplayer", "Puzzle", "Racing",
    "Simulation", "Sports",
  ];

  categories.forEach((category) => {
    urls.push({
      loc: `${BASE_URL}/search?cat=${encodeURIComponent(category)}`,
      lastmod: formatDate(),
      changefreq: "weekly",
      priority: "0.8",
    });
  });

  // Game pages
  unique.forEach((game) => {
    urls.push({
      loc: `${BASE_URL}/game/${encodeURIComponent(game.slug)}`,
      lastmod: formatDate(),
      changefreq: "weekly",
      priority: "0.7",
    });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) =>
      [
        "  <url>",
        `    <loc>${escapeXml(url.loc)}</loc>`,
        `    <lastmod>${url.lastmod}</lastmod>`,
        `    <changefreq>${url.changefreq}</changefreq>`,
        `    <priority>${url.priority}</priority>`,
        "  </url>",
      ].join("\n")
    ),
    "</urlset>",
  ].join("\n");

  const outPath = path.join(__dirname, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");

  console.log(`✅ Wrote sitemap with ${urls.length} entries to ${outPath}`);
}

try {
  buildSitemap();
} catch (err) {
  console.error("❌ Failed to generate sitemap:", err.message);
  process.exit(1);
}