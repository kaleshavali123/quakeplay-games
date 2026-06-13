const fs = require("fs");
const path = require("path");
const axios = require("axios");
const Papa = require("papaparse");

// Matches the CSV source used by the app
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1mZbunkAWxw_l5h8zHGNL6E19kULA32SJ-rCX93AdEQU/export?format=csv";

// Base URL
const BASE_URL =
  process.env.SITEMAP_BASE_URL || "https://www.quakeplay.com";

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

async function fetchGamesCsv() {
  const res = await axios.get(CSV_URL, {
    responseType: "text",
  });

  return Papa.parse(res.data, {
    header: true,
    skipEmptyLines: true,
  }).data;
}

function escapeXml(unsafe) {
  return safeString(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function buildSitemap() {
  console.log("Fetching game list...");

  const rows = await fetchGamesCsv();

  const games = rows
    .filter((r) => r.Name && r.Link)
    .map((r, index) => {
      const name = safeString(r.Name);
      const rawSlug =
        r.Slug && r.Slug.trim()
          ? r.Slug
          : name;

      const slug = slugify(
        rawSlug || `game-${index}`
      );

      return {
        name,
        slug,
      };
    });

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
    "Adventure",
    "Arcade",
    "Brain",
    "Cards",
    "Coloring",
    "Fantasy",
    "Girls",
    "Kids",
    "Match-3",
    "Multiplayer",
    "Puzzle",
    "Racing",
    "Simulation",
    "Sports",
  ];

  categories.forEach((category) => {
    urls.push({
      loc: `${BASE_URL}/search?cat=${encodeURIComponent(
        category
      )}`,
      lastmod: formatDate(),
      changefreq: "weekly",
      priority: "0.8",
    });
  });

  // Game pages
  unique.forEach((game) => {
    urls.push({
      loc: `${BASE_URL}/game/${encodeURIComponent(
        game.slug
      )}`,
      lastmod: formatDate(),
      changefreq: "weekly",
      priority: "0.7",
    });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(
          url.loc
        )}</loc>`,
        `    <lastmod>${url.lastmod}</lastmod>`,
        `    <changefreq>${url.changefreq}</changefreq>`,
        `    <priority>${url.priority}</priority>`,
        "  </url>",
      ].join("\n");
    }),
    "</urlset>",
  ].join("\n");

  // Write sitemap.xml into public folder
  const outPath = path.join(
    __dirname,
    "public",
    "sitemap.xml"
  );

  const outDir = path.dirname(outPath);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    outPath,
    xml,
    "utf8"
  );

  console.log(
    `✅ Wrote sitemap with ${urls.length} entries to ${outPath}`
  );
}

buildSitemap().catch((err) => {
  console.error(
    "❌ Failed to generate sitemap:",
    err
  );
  process.exit(1);
});