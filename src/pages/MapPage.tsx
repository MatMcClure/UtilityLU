import { useState } from "react";
import "../styles/MapPage.css";
import { maps } from "../data/maps";
import type { Lineup } from "../types";

interface MapPageProps {
  mapId: string;
  onBack: () => void;
}

function MapPage({ mapId, onBack }: MapPageProps) {
  const map = maps.find((m) => m.id === mapId);
  const [filter, setFilter] = useState<"All" | "T" | "CT">("All");

  if (!map) {
    return (
      <main className="map-page">
        <p>Map not found.</p>
        <button onClick={onBack}>&larr; Back</button>
      </main>
    );
  }

  const filteredLineups: Lineup[] =
    filter === "All"
      ? map.lineups
      : map.lineups.filter((l) => l.side === filter);

  return (
    <main className="map-page">
      <header className="map-page-header">
        <button className="back-button" onClick={onBack}>
          &larr; Back to maps
        </button>
        <h1>{map.name} — Smoke Lineups</h1>
      </header>

      <div className="filter-bar">
        {(["All", "T", "CT"] as const).map((side) => (
          <button
            key={side}
            className={`filter-button ${filter === side ? "active" : ""}`}
            onClick={() => setFilter(side)}
          >
            {side}
          </button>
        ))}
      </div>

      {filteredLineups.length === 0 ? (
        <p className="no-lineups">No lineups added for this map yet.</p>
      ) : (
        <div className="lineup-grid">
          {filteredLineups.map((lineup) => (
            <div key={lineup.id} className="lineup-card">
              <img src={lineup.image} alt={lineup.title} className="lineup-image" />
              <div className="lineup-info">
                <span className={`badge ${lineup.side.toLowerCase()}`}>
                  {lineup.side} · {lineup.nadeType}
                </span>
                <h3>{lineup.title}</h3>
                <p>{lineup.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MapPage;
