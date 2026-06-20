import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { useGames } from "../hooks/useGames";
import { slugify } from "../utils/gameUtils";

export default function Home() {
  const { games, loading, CATEGORY_META } = useGames();

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Quake Play - Play for free online";
  }, []);

  // Categories
  const availableCategories = useMemo(() => {
    const grouped = games.reduce((acc, game) => {
      acc[game.category] = (acc[game.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { category: "All", count: games.length },

      ...Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .map(([category, count]) => ({
          category,
          count
        }))
    ];
  }, [games]);

  // Filter only by category
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      return (
        activeCategory === "All" ||
        game.category === activeCategory
      );
    });
  }, [games, activeCategory]);

  // Group categories
  const categoryGroups = useMemo(() => {
    const groups = filteredGames.reduce((acc, game) => {
      acc[game.category] = acc[game.category] || [];
      acc[game.category].push(game);
      return acc;
    }, {});

    return Object.entries(groups)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([category, items]) => ({
        category,
        items
      }));
  }, [filteredGames]);

  if (loading) {
    return <h2 className="loading-text">Loading Games...</h2>;
  }

  return (
    <div className="home-page">
      <div className="home-hero">
        <div>
          <h1 className="page-title">
            Play Free Online Games Instantly on Quake Play
          </h1>

          <p className="hero-copy">
            Discover hundreds of free online games including action,
            racing, puzzle, sports, arcade, strategy, and multiplayer
            games. No downloads required — play directly in your browser.
          </p>
        </div>
      </div>

      <div className="category-toolbar">
        {availableCategories.map((item) => (
          <button
            key={item.category}
            className={`category-pill ${
              activeCategory === item.category
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveCategory(item.category)
            }
          >
            {item.category}

            <span className="pill-count">
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {categoryGroups.length === 0 ? (
        <p className="no-results">
          No games found in this category.
        </p>
      ) : (
        categoryGroups.map(({ category, items }) => {
          const meta =
            CATEGORY_META[category] ||
            CATEGORY_META.Other;

          return (
            <section
              id={slugify(category)}
              key={category}
              className="category-section"
            >
              <div className="category-header">
                <div>
                  <span
                    className="category-label"
                    style={{
                      background: `${meta.color}22`,
                      color: meta.color
                    }}
                  >
                    {meta.icon} {category}
                  </span>

                  <span className="category-count">
                    {items.length} games
                  </span>
                </div>

                {items.length > 5 && (
                  <Link
                    className="category-view-more"
                    to={`/search?cat=${encodeURIComponent(
                      category
                    )}`}
                  >
                    View all
                  </Link>
                )}
              </div>

              {items.length > 5 ? (
                <div className="carousel-wrapper">
                  <button
                    className="carousel-btn left"
                    onClick={() => {
                      document
                        .getElementById(
                          `carousel-${slugify(category)}`
                        )
                        ?.scrollBy({
                          left: -900,
                          behavior: "smooth"
                        });
                    }}
                  >
                    ❮
                  </button>

                  <div
                    id={`carousel-${slugify(category)}`}
                    className="section-carousel"
                  >
                    {items.slice(0, 10).map((game) => (
                      <div
                        key={game._id}
                        className="carousel-card"
                      >
                        <GameCard game={game} />
                      </div>
                    ))}
                  </div>

                  <button
                    className="carousel-btn right"
                    onClick={() => {
                      document
                        .getElementById(
                          `carousel-${slugify(category)}`
                        )
                        ?.scrollBy({
                          left: 900,
                          behavior: "smooth"
                        });
                    }}
                  >
                    ❯
                  </button>
                </div>
              ) : (
                <div className="small-category-grid">
                  {items.map((game) => (
                    <div
                      key={game._id}
                      className="small-grid-card"
                    >
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}