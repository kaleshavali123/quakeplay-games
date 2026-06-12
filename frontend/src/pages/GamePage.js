import { useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useGames } from "../hooks/useGames";
import GameCard from "../components/GameCard";
import { CATEGORY_META } from "../utils/gameUtils";

function updateMetaTag(name, content, property = false) {
  if (!content) return;

  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");

    if (property) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }

    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function GamePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { games, loading } = useGames();
  const location = useLocation();

  const game = games.find(
    (g) =>
      g.slug === id ||
      g._id === id ||
      g.Name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
  );

  // SEO + META TAGS
  useEffect(() => {
    if (!game) return;

    document.title = `${game.Name} - Play for free on QuakePlay.com`;

    updateMetaTag("description", game.description);
    updateMetaTag("og:title", `${game.Name} - Quake Play`, true);
    updateMetaTag("og:description", game.description, true);
    updateMetaTag("og:type", "website", true);
  }, [game]);

  // SCROLL BEHAVIOR
  useEffect(() => {
    // Related games navigation
    if (location.hash === "#hero-overlay" && game) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 150);

      return;
    }

    // Normal navigation
    if (!location.hash && game) {
      window.scrollTo(0, 0);
    }
  }, [location.hash, game]);

  // LOADING STATE
  if (loading) {
    return <h2 className="loading-text">Loading Game...</h2>;
  }

  // GAME NOT FOUND
  if (!game) {
    return (
      <div className="not-found">
        <h2>Game Not Found</h2>

        <button
          className="btn-primary"
          onClick={() => nav("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const categoryMeta =
    CATEGORY_META[game.category] || CATEGORY_META.Other;

  const relatedList = games.filter(
    (other) =>
      other.category === game.category &&
      other.slug !== game.slug
  );

  return (
    <div className="modern-game-page">
      {/* HERO SECTION */}
      <div
        className="game-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.45),
              rgba(0,0,0,0.55)
            ),
            url(${game.Icon})
          `,
        }}
      >
        <div id="hero-overlay" className="hero-overlay">
          <img
            src={game.Icon}
            alt={game.Name}
            className="hero-game-image"
          />

          <h1 className="hero-game-title">
            {game.Name}
          </h1>

          <Link
            to={`/play/${game.slug}`}
            className="hero-play-btn"
          >
            ▶ Play
          </Link>
        </div>
      </div>

      {/* GAME DETAILS */}
      <section className="game-info-section">
        <div className="game-info-card">
          <h2>About this game</h2>

          <p>{game.description}</p>

          <h3>Instructions</h3>

          <p>{game.instructions}</p>

          <div className="game-links-row">
            <Link
              to="/search"
              className="btn-primary"
            >
              Browse More Games
            </Link>

            <button
              className="btn-back"
              onClick={() => nav(-1)}
            >
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
              {
                games.filter(
                  (g) =>
                    g.category === game.category &&
                    g.slug !== game.slug
                ).length
              }{" "}
              games
            </span>
          </div>
        </div>

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