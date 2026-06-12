const CATEGORY_RULES = {
  Racing: ["driving", "bikes", "drifting", "traffic", "trucks"],
  Sports: ["football", "basketball", "golf", "bowling", "billiards", "penalty"],
  Puzzle: ["logic", "blocks", "sorting", "maze", "matching"],
  "Match-3": ["jewels", "bubbles", "candy", "connect", "mahjong"],
  Arcade: ["endless", "tap", "score-based", "reflex"],
  Action: ["fighting", "shooting", "running", "combat"],
  Adventure: ["exploration", "quests", "story", "storyplay", "story gameplay"],
  Girls: ["makeup", "dress-up", "fashion", "salon", "romance"],
  Kids: ["educational", "animal care", "animals", "simple", "kids"],
  Cards: ["solitaire", "poker", "blackjack", "chess", "board", "card"],
  Brain: ["quiz", "iq", "word", "memory"],
  Coloring: ["painting", "drawing", "pixel art", "creative"],
  Simulation: ["cooking", "parking", "surgery", "management", "simulator"],
  Fantasy: ["dragons", "unicorns", "magical", "fairytale", "fairy tale"],
  Multiplayer: ["io", "online", "pvp", "multiplayer", "competition"]
};

export const CATEGORY_META = {
  Racing: { icon: "🏎️", color: "#ff7f50" },
  Sports: { icon: "🏀", color: "#38bdf8" },
  Puzzle: { icon: "🧩", color: "#8b5cf6" },
  "Match-3": { icon: "💎", color: "#f97316" },
  Arcade: { icon: "🎮", color: "#22c55e" },
  Action: { icon: "⚔️", color: "#ef4444" },
  Adventure: { icon: "🌍", color: "#0ea5e9" },
  Girls: { icon: "💄", color: "#ec4899" },
  Kids: { icon: "🧸", color: "#fbbf24" },
  Cards: { icon: "🃏", color: "#0f766e" },
  Brain: { icon: "🧠", color: "#4338ca" },
  Coloring: { icon: "🎨", color: "#ef4444" },
  Simulation: { icon: "🛠️", color: "#14b8a6" },
  Fantasy: { icon: "🐉", color: "#a855f7" },
  Multiplayer: { icon: "🌐", color: "#2563eb" },
  Other: { icon: "✨", color: "#64748b" }
};

function safeString(value) {
  return String(value || "").trim();
}

export function slugify(value) {
  return safeString(value)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeText(value) {
  return safeString(value).toLowerCase();
}

export function splitTags(value) {
  return safeString(value)
    .split(/[,;|]/)
    .map(tag => tag.trim())
    .filter(Boolean);
}

function findKnownCategory(value) {
  const normalized = normalizeText(value);
  return Object.keys(CATEGORY_META).find(category => normalizeText(category) === normalized);
}

export function categorizeGame({ name, tags, description, existingCategory }) {
  const text = `${name} ${tags} ${description} ${existingCategory}`.toLowerCase();
  const tokens = splitTags(text).concat(text.split(/\W+/));
  const score = Object.entries(CATEGORY_RULES).map(([category, keywords]) => {
    const matches = keywords.reduce((count, keyword) => {
      const lower = keyword.toLowerCase();
      return tokens.some(token => token.includes(lower)) ? count + 1 : count;
    }, 0);
    return { category, matches };
  });

  score.sort((a, b) => b.matches - a.matches);
  if (score[0]?.matches > 0) {
    return score[0].category;
  }

  const known = findKnownCategory(existingCategory);
  return known || "Other";
}

export function buildGameRecord(row, index) {
  const name = safeString(row.Name);
  const icon = safeString(row.Icon) || "https://via.placeholder.com/400x400?text=Game";
  const slug = slugify(row.Slug || name || `game-${index}`);
  const tags = splitTags(row.Tags).map(tag => tag.toLowerCase());
  const description = safeString(row.Description) || "Fast HTML5 fun with easy controls and instant play.";
  const instructions = safeString(row.Instructions) || "Tap or click to start. Use arrow keys or touch controls where available.";
  const relatedSlugs = splitTags(row.Related || row["Related Games"]).map(slugify);
  const category = categorizeGame({
    name,
    tags: tags.join(" "),
    description,
    existingCategory: row.Category
  });
  const isNew = tags.includes("new") || description.includes("new game") || index < 4;
  const isTrending = tags.includes("trending") || name.toLowerCase().includes("pro") || name.toLowerCase().includes("battle");

  return {
    ...row,
    Name: name,
    Icon: icon,
    Link: safeString(row.Link),
    slug,
    _id: `${slug}-${index}`,
    category,
    tags,
    description,
    instructions,
    relatedSlugs,
    isNew,
    isTrending,
    searchText: [name, category, description, tags.join(" ")].join(" "),
    cardUrl: `/game/${slug}`
  };
}
