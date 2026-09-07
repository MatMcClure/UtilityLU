import { useState, useEffect } from "react";

const STORAGE_KEY = "savedLineupIds";

export function useSavedLineups() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const isSaved = (lineupId: string) => savedIds.includes(lineupId);

  const toggleSaved = (lineupId: string) => {
    setSavedIds((prev) =>
      prev.includes(lineupId)
        ? prev.filter((id) => id !== lineupId)
        : [...prev, lineupId]
    );
  };

  return { savedIds, isSaved, toggleSaved };
}
