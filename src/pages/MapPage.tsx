import { useState } from "react";
import "../styles/MapPage.css";
import { maps } from "../data/maps";
import type { Lineup } from "../types";

interface MapPageProps {
  mapId: string;
  onBack: () => void;
}

type NadeFilter = "All" | "Smoke" | "Molotov" | "Flash";
type SideFilter = "All" | "T" | "CT";

function MapPage({ mapId, onBack }: MapPageProps) {
  const map = maps.find((m) => m.id === mapId);
  const [nadeFilter, setNadeFilter] = useState<NadeFilter>("All");
  const [sideFilter, setSideFilter] = useState<SideFilter>("All");

  if (!map) {
    return (
      <main className="map-page">
        <p>Map not found.</p>
        <button onClick={onBack}>&larr; Back</button>
      </main>
    );
  }

  const filteredLineups: Lineup[] = map.lineups.filter((lineup) => {
    const matchesNade = nadeFilter === "All" || lineup.nadeType === nadeFilter;
    const matchesSide = sideFilter === "All" || lineup.side === sideFilter;
    return matchesNade && matchesSide;
  });

  const nadeTabs: { label: NadeFilter; icon: string }[] = [
    { label: "All", icon: "🗺️" },
    { label: "Smoke", icon: "💨" },
    { label: "Molotov", icon: "🔥" },
    { label: "Flash", icon: "⚡" }
  ];

  return (
    <main className="map-page">
      <header className="map-page-header">
        <button className="back-button" onClick={onBack}>
          &larr; Back to maps
        </button>
        <h1>{map.name} — Lineups</h1>
      </header>

      <nav className="nade-navbar">
        {nadeTabs.map((tab) => (
          <button
            key={tab.label}
            className={`nade-tab ${nadeFilter === tab.label ? "active" : ""}`}
            onClick={() => setNadeFilter(tab.label)}
          >
            <span className="nade-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="filter-bar">
        {(["All", "T", "CT"] as const).map((side) => (
          <button
            key={side}
            className={`filter-button ${sideFilter === side ? "active" : ""}`}
            onClick={() => setSideFilter(side)}
          >
            {side}
          </button>
        ))}
      </div>

      {filteredLineups.length === 0 ? (
        <p className="no-lineups">No lineups match this filter yet.</p>
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