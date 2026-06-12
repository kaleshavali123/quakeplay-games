import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// Global ref to track the currently active card
const activeCardRef = { current: null };

export default function GameCard({ game, to = null }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);
  const lastTapTimeRef = useRef(0);

  // Use custom 'to' prop if provided, otherwise default navigation
  const navigationPath = to || `/game/${game.slug}`;

  // Handle card interaction (touch/click)
  const handleCardInteraction = (e) => {
    // Only prevent default on first tap (show overlay)
    if (!isActive) {
      e.preventDefault();
      
      // Close previous active card if any
      if (activeCardRef.current && activeCardRef.current !== cardRef.current) {
        const prevCard = activeCardRef.current.querySelector('.card');
        if (prevCard) {
          prevCard.classList.remove('active');
        }
      }
      
      // Set current card as active
      setIsActive(true);
      activeCardRef.current = cardRef.current;
      
      // Reset tap time for next potential tap
      lastTapTimeRef.current = Date.now();
    } else {
      // Second tap - allow navigation
      const timeSinceLastTap = Date.now() - lastTapTimeRef.current;
      
      // If tapped quickly again (double tap), navigate
      if (timeSinceLastTap < 500) {
        setIsActive(false);
        activeCardRef.current = null;
        // Let the link navigate
        return;
      }
    }
  };

  // Handle click on play button
  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    // Navigate immediately
    window.location.href = navigationPath;
  };

  // Close active state when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target) && isActive) {
        setIsActive(false);
        activeCardRef.current = null;
      }
    };

    if (isActive) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isActive]);

  return (
    <Link to={navigationPath} className="card-link" onClick={handleCardInteraction}>
      <div 
        ref={cardRef}
        className={`card ${isActive ? 'active' : ''}`}
        onTouchEnd={handleCardInteraction}
      >
        <div className="card-img-wrapper">
          <div className="card-badges">
            <span className="badge category-badge-card">{game.category}</span>
            {game.isTrending && <span className="badge badge-trending">Trending</span>}
            {game.isNew && <span className="badge badge-new">New</span>}
          </div>
          <img src={game.Icon} alt={game.Name} className="card-img" loading="lazy" />
          <div className="play-overlay">
            <button 
              className="play-now-btn"
              onClick={handlePlayButtonClick}
            >
              <span className="play-icon-small">▶</span> Play Now
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-title">{game.Name}</p>
        </div>
      </div>
    </Link>
  );
}