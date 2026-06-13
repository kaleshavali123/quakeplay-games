const fs = require("fs");
const path = require("path");
const axios = require("axios");
const Papa = require("papaparse");

// Matches the CSV source used by the app
const CSV_URL = "https://docs.google.com/spreadsheets/d/1mZbunkAWxw_l5h8zHGNL6E19kULA32SJ-rCX93AdEQU/export?format=csv";

// Base URL for sitemap entries. Can be overridden with SITEMAP_BASE_URL env var.
const BASE_URL = process.env.SITEMAP_BASE_URL || "https://quakeplay.com";

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
  const res = await axios.get(CSV_URL, { responseType: "text" });
  return Papa.parse(res.data, { header: true, skipEmptyLines: true }).data;
}

function escapeXml(unsafe) {
  return safeString(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function buildSitemap() {
  console.log("Fetching game list...");
  const rows = await fetchGamesCsv();

  const games = rows
    .filter(r => r.Name && r.Link)
    .map((r, index) => {
      const name = safeString(r.Name);
      const rawSlug = r.Slug && r.Slug.trim() ? r.Slug : name;
      const slug = slugify(rawSlug || `game-${index}`);
      return { name, slug };
    });

  // Deduplicate slugs
  const seen = new Set();
  const unique = [];
  for (const g of games) {
    if (!seen.has(g.slug)) {
      seen.add(g.slug);
      unique.push(g);
    }
  }

  const urls = [];

  // Homepage
  urls.push({ loc: `${BASE_URL}/`, lastmod: formatDate(), changefreq: "daily", priority: "1.0" });

  // Search page
  urls.push({ loc: `${BASE_URL}/search`, lastmod: formatDate(), changefreq: "weekly", priority: "0.8" });

  // Game pages
  unique.forEach(g => {
    urls.push({
      loc: `${BASE_URL}/game/${encodeURIComponent(g.slug)}`,
      lastmod: formatDate(),
      changefreq: "weekly",
      priority: "0.7"
    });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => {
      return [
        "  <url>",
        `    <loc>${escapeXml(u.loc)}</loc>`,
        `    <lastmod>${u.lastmod}</lastmod>`,
        `    <changefreq>${u.changefreq}</changefreq>`,
        `    <priority>${u.priority}</priority>`,
        "  </url>"
      ].join("\n");
    }),
    "</urlset>"
  ].join("\n");

  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`Wrote sitemap with ${urls.length} entries to ${outPath}`);
}

buildSitemap().catch(err => {
  console.error("Failed to generate sitemap:", err);
  process.exit(1);
});
