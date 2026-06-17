import { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useGames } from "../hooks/useGames";
import GameCard from "../components/GameCard";
import { CATEGORY_META } from "../utils/gameUtils";

// Helper Functions for Vanilla DOM Meta Updates
function updateMetaTag(name, content, property = false) {
  if (!content) return;
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (property) element.setAttribute("property", name);
    else element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateCanonicalUrl(url) {
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function GamePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { games, loading } = useGames();
  const location = useLocation();

  // Find current game cleanly
  const game = useMemo(() => {
    if (!games) return null;
    return games.find(
      (g) =>
        g.slug === id ||
        g._id === id ||
        g.Name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
    );
  }, [games, id]);

  // Performance Cache: Filter Related Games Once
  const relatedList = useMemo(() => {
    if (!game || !games) return [];
    return games.filter((other) => other.category === game.category && other.slug !== game.slug);
  }, [games, game]);

  // SEO + META TAGS EFFECT
  useEffect(() => {
    if (!game) return;
    
    const pageTitle = `Play ${game.Name} Online for Free | Quake Play`;
    const pageDescription = `Play ${game.Name} online for free on Quake Play. ${game.description || ""}`;

    document.title = pageTitle;

    // Core SEO tags
    updateMetaTag("description", pageDescription);
    updateMetaTag("og:title", pageTitle, true);
    updateMetaTag("og:description", pageDescription, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:image", game.Icon, true);
    updateMetaTag("og:url", `https://quakeplay.com/game/${game.slug}`, true);

    // Twitter Tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", pageDescription);
    updateMetaTag("twitter:image", game.Icon);

    // Canonical Link
    updateCanonicalUrl(`https://quakeplay.com/game/${game.slug}`);

    // Manage Schema injection
    const oldSchema = document.getElementById("game-schema");
    if (oldSchema) oldSchema.remove();

    const schema = document.createElement("script");
    schema.id = "game-schema";
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: game.Name,
      description: pageDescription,
      image: game.Icon,
      genre: game.category,
      url: `https://quakeplay.com/game/${game.slug}`,
      publisher: {
        "@type": "Organization",
        name: "Quake Play",
      },
    });
    document.head.appendChild(schema);

    return () => {
      const existing = document.getElementById("game-schema");
      if (existing) existing.remove();
    };
  }, [game]);

  // SCROLL BEHAVIOR
  useEffect(() => {
    if (location.hash === "#hero-overlay" && game) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
      return;
    }
    if (!location.hash && game) {
      window.scrollTo(0, 0);
    }
  }, [location.hash, game]);

  if (loading) return <div className="loading-text">Loading Game...</div>;

  if (!game) {
    return (
      <div className="error-state">
        <h1>Game Not Found</h1>
        <button className="btn-primary" onClick={() => nav("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const categoryMeta = CATEGORY_META[game.category] || CATEGORY_META.Other;

  return (
    <div className="game-page-wrapper">
      {/* HERO SECTION */}
      <div
        className="game-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${game.Icon})`,
        }}
      >

        <div id="hero-overlay" className="hero-overlay">
          <img
            src={game.Icon}
            alt={`${game.Name} Online Game`}
            className="hero-game-image"
            loading="eager" 
          />
          <h1 className="hero-game-title">Play {game.Name} Online for Free</h1>
          <Link to={`/play/${game.slug}`} className="hero-play-btn">
            ▶ Play
          </Link>
        </div>
      </div>

      {/* GAME DETAILS */}
      <section className="game-info-section">
        <div className="game-info-card">
          <h2>About {game.Name}</h2>
          <p>{game.description}</p>

          <h3>Game Overview</h3>
          <p>
            {game.Name} is a popular {game.category} game available on Quake Play. 
            Enjoy instant gameplay directly in your browser without downloading or installing anything.
          </p>

          <h3>Instructions</h3>
          <p>{game.instructions}</p>

          <div className="game-links-row">
            <Link to="/search" className="btn-primary">
              Browse More Games
            </Link>
            <button className="btn-back" onClick={() => nav(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </section>

      {/* RELATED GAMES */}
      <section className="related-section">
        <div className="category-header">
          <div>
            <span
              className="category-label"
              style={{
                background: `${categoryMeta.color}22`,
                color: categoryMeta.color,
              }}
            >
              {categoryMeta.icon} {game.category} Games
            </span>
            <span className="category-count">
              {relatedList.length} games
            </span>
          </div>
        </div>

        <h2 style={{ marginBottom: "20px" }}>More {game.category} Games</h2>

        <div className="grid related-games-grid">
          {relatedList.map((related) => (
            <GameCard
              key={related._id}
              game={related}
              to={`/game/${related.slug}#hero-overlay`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}