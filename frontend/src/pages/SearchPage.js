import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "../components/GameCard";
import { useGames } from "../hooks/useGames";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q")?.trim() || "";
  const activeCategory = searchParams.get("cat") || "All";

  const { games, loading } = useGames();

  useEffect(() => {
    document.title = q
      ? `Search: ${q} - Quake Play`
      : "Search Games - Quake Play";
  }, [q]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(games.map((game) => game.category))
    );

    return ["All", ...categories.sort()];
  }, [games]);

  const filteredGames = useMemo(() => {
    const query = q.toLowerCase();

    // In "All" category, apply search filtering
    if (activeCategory === "All") {
      return games.filter((game) => {
        const searchText = game.searchText?.toLowerCase() || "";

        return !query || searchText.includes(query);
      });
    }

    // In other categories, show all games of that category
    return games.filter(
      (game) => game.category === activeCategory
    );
  }, [games, q, activeCategory]);

  const handleCategoryChange = (category) => {
    const nextParams = {};

    // Keep search query in URL
    if (q) {
      nextParams.q = q;
    }

    if (category !== "All") {
      nextParams.cat = category;
    }

    setSearchParams(nextParams);
  };

  if (loading) {
    return <h2 className="loading-text">Loading Games...</h2>;
  }

  return (
    <div className="search-page">
      <div className="search-header-row">
        <div>
          <h2 className="page-title">Search Results</h2>

          <p className="hero-copy">
            Showing {filteredGames.length} game
            {filteredGames.length === 1 ? "" : "s"} in "
            {activeCategory}
            "
            {activeCategory === "All" && q
              ? ` for "${q}"`
              : ""}
            .
          </p>
        </div>
      </div>

      <div className="category-toolbar">
        {categoryOptions.map((category) => (
          <button
            key={category}
            className={`category-pill ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredGames.length === 0 ? (
        <p className="no-results">
          No games match your search.
          Try a broader keyword or different category.
        </p>
      ) : (
        <div className="grid">
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}