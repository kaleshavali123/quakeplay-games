import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import logoImg from "../assets/quakeplay-logo.png";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const nav = useNavigate();

  // Sync navbar input with URL query
  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const trimmed = q.trim();

    if (trimmed) {
      nav(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      nav("/search");
    }
  };

  const handleClearSearch = () => {
    // Clear input
    setQ("");

    // Remove search query and category filters
    nav("/search");
  };

  return (
    <div className="nav">
      <Link to="/" className="logo-link" aria-label="Home">
        <img
          src={logoImg}
          alt="QuakePlay Logo"
          className="logo-img"
          width="260"
          height="50"
        />
      </Link>

      <div className="search-container">
        <input
          className="search-input"
          placeholder="Search by name, category etc..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {q && (
          <button
            className="search-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}

        <button
          className="search-btn"
          onClick={handleSearch}
          aria-label="Search"
          type="button"
        >
          🔍
        </button>
      </div>
    </div>
  );
}