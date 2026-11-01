import { useState, useEffect } from "react";
import { buildGameRecord, CATEGORY_META } from "../utils/gameUtils";

// ADDED: Fisher-Yates shuffle (returns a new array)
function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let cachedGames = null;

export function useGames() {
  const [games, setGames] = useState(cachedGames || []);
  const [loading, setLoading] = useState(!cachedGames);

  useEffect(() => {
    if (cachedGames) return;

    fetch("/games.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`games.json request failed: ${res.status}`);
        }
        return res.json();
      })

      .then((rows) => {
        const validGames = shuffle(                      // ADDED: shuffle after building
          rows.map((g, index) => buildGameRecord(g, index))
        );

        cachedGames = validGames;
        setGames(validGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading games.json:", err);
        setLoading(false);
      });
  }, []);

  return { games, loading, CATEGORY_META };
}