import { useState, useEffect } from "react";
import Papa from "papaparse";
import { buildGameRecord, CATEGORY_META } from "../utils/gameUtils";

const CSV_URL = "https://docs.google.com/spreadsheets/d/1mZbunkAWxw_l5h8zHGNL6E19kULA32SJ-rCX93AdEQU/export?format=csv";

let cachedGames = null;

export function useGames() {
  const [games, setGames] = useState(cachedGames || []);
  const [loading, setLoading] = useState(!cachedGames);

  useEffect(() => {
    if (cachedGames) return;

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validGames = results.data
          .filter(g => g.Name && g.Link)
          .map((g, index) => buildGameRecord(g, index));

        cachedGames = validGames;
        setGames(validGames);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching games CSV:", err);
        setLoading(false);
      }
    });
  }, []);

  return { games, loading, CATEGORY_META };
}
