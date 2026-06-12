import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGames } from "../hooks/useGames";

export default function PlayGame() {
  const { slug } = useParams();
  const nav = useNavigate();
  const gameSectionRef = useRef(null);
  const hasScrolledRef = useRef(false);

  const { games, loading } = useGames();

  if (loading) {
    return (
      <h2 className="loading-text">
        Loading Game...
      </h2>
    );
  }

  const game = games.find(
    (g) =>
      g.slug === slug ||
      g.Name.toLowerCase().replace(
        /[^a-z0-9]+/g,
        "-"
      ) === slug
  );

  useEffect(() => {
    if (!game || typeof window === "undefined") return;
    if (window.innerWidth > 768) return;

    const scrollToGameSection = () => {
      if (hasScrolledRef.current || !gameSectionRef.current) return;
      gameSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      hasScrolledRef.current = true;
    };

    const timer = window.setTimeout(scrollToGameSection, 150);
    requestAnimationFrame(scrollToGameSection);

    return () => window.clearTimeout(timer);
  }, [game]);

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

  return (
    <div className="play-game-page">
      {/* TOP BAR */}
      <div className="play-navbar">
        <button
          className="back-play-btn"
          onClick={() => nav(-1)}
        >
          ← Back
        </button>

        <h2>{game.Name}</h2>

        <button
          className="fullscreen-btn"
          onClick={() => {
            const iframe =
              document.querySelector(
                ".play-game-iframe"
              );

            if (iframe.requestFullscreen) {
              iframe.requestFullscreen();
            }
          }}
        >
          ⛶ Fullscreen
        </button>
      </div>

      {/* GAME IFRAME */}
      <div
        className="play-iframe-wrapper"
        ref={gameSectionRef}
      >
        <iframe
          src={game.Link}
          title={game.Name}
          allowFullScreen
          loading="lazy"
          className="play-game-iframe"
          onLoad={() => {
            if (window.innerWidth <= 768 && gameSectionRef.current && !hasScrolledRef.current) {
              gameSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              hasScrolledRef.current = true;
            }
          }}
        />
      </div>
    </div>
  );
}