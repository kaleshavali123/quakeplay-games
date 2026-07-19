import { useState, useEffect } from "react";
import { buildGameRecord, CATEGORY_META } from "../utils/gameUtils";

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
        // rows are already filtered to have Name + Link by
        // generate-games-json.js, but buildGameRecord still runs here so
        // categories/display fields stay in sync with gameUtils.js.
        const validGames = rows.map((g, index) => buildGameRecord(g, index));

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