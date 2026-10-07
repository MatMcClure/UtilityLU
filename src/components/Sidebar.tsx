import { useState } from "react";
import { maps } from "../data/maps";
import type { LineupSearchResult } from "../types";
import "../styles/Sidebar.css";

interface SidebarProps {
  onSelectLineup: (mapId: string, lineupId: string) => void;
}

function Sidebar({ onSelectLineup }: SidebarProps) {
  const [query, setQuery] = useState("");

  const allLineups: LineupSearchResult[] = maps.flatMap((map) =>
    map.lineups.map((lineup) => ({
      ...lineup,
      mapId: map.id,
      mapName: map.name,
    }))
  );

  const filteredLineups = allLineups.filter((lineup) =>
    lineup.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search lineups..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sidebar-search-input"
        />
        {query && (
          <button
            className="sidebar-clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {query && (
        <div className="sidebar-results">
          {filteredLineups.length === 0 ? (
            <p className="sidebar-no-results">No lineups found.</p>
          ) : (
            filteredLineups.map((lineup) => (
              <button
                key={lineup.id}
                className="sidebar-result"
                onClick={() => {
                  onSelectLineup(lineup.mapId, lineup.id);
                  setQuery("");
                }}
              >
                <img
                  src={lineup.image}
                  alt={lineup.title}
                  className="sidebar-result-thumb"
                />
                <div className="sidebar-result-info">
                  <span className="sidebar-result-title">{lineup.title}</span>
                  <span className="sidebar-result-meta">
                    {lineup.mapName} · {lineup.side} · {lineup.nadeType}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;