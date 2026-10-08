import { useState, useEffect } from "react";
import "../styles/MapPage.css";
import { maps } from "../data/maps";
import type { Lineup } from "../types";
import { useSavedLineups } from "../hooks/useSavedLineups";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import LineupModal from "../components/LineupModal";

interface MapPageProps {
  mapId: string;
  initialLineupId?: string;
  onViewSaved: () => void;
  onSelectLineup: (mapId: string, lineupId: string) => void;
}

type NadeFilter = "All" | "Smoke" | "Flash" | "Molotov" | "HE";
type SideFilter = "All" | "T" | "CT";

function MapPage({ mapId, initialLineupId, onViewSaved, onSelectLineup }: MapPageProps) {
  const map = maps.find((m) => m.id === mapId);
  const [nadeFilter, setNadeFilter] = useState<NadeFilter>("All");
  const [sideFilter, setSideFilter] = useState<SideFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLineup, setSelectedLineup] = useState<Lineup | null>(null);
  const { isSaved, toggleSaved } = useSavedLineups();

  // If we arrived here via sidebar search with a specific lineup targeted,
  // open that lineup's modal automatically.
  useEffect(() => {
    if (initialLineupId && map) {
      const target = map.lineups.find((l) => l.id === initialLineupId);
      if (target) {
        setSelectedLineup(target);
      }
    }
  }, [initialLineupId, map]);

  if (!map) {
    return (
      <main className="map-page">
        <TopBar onViewSaved={onViewSaved} />
        <p>Map not found.</p>
      </main>
    );
  }

  const filteredLineups: Lineup[] = map.lineups.filter((lineup) => {
    const matchesNade = nadeFilter === "All" || lineup.nadeType === nadeFilter;
    const matchesSide = sideFilter === "All" || lineup.side === sideFilter;
    const matchesSearch = lineup.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    return matchesNade && matchesSide && matchesSearch;
  });

  // ⬇️ paste the new navigation block here
  const navList = selectedLineup && filteredLineups.some((l) => l.id === selectedLineup.id)
    ? filteredLineups
    : map.lineups;

  const selectedIndex = selectedLineup
    ? navList.findIndex((l) => l.id === selectedLineup.id)
    : -1;

  const canNavigate = navList.length > 1 && selectedIndex !== -1;

  const showPreviousLineup = () => {
    if (!canNavigate) return;
    const prev = selectedIndex === 0 ? navList.length - 1 : selectedIndex - 1;
    setSelectedLineup(navList[prev]!);
  };

  const showNextLineup = () => {
    if (!canNavigate) return;
    const next = (selectedIndex + 1) % navList.length;
    setSelectedLineup(navList[next]!);
  };

  const nadeTabs: { label: NadeFilter; icon: string }[] = [
    { label: "All", icon: "🗺️" },
    { label: "Smoke", icon: "💨" },
    { label: "Flash", icon: "⚡" },
    { label: "Molotov", icon: "🔥" },
    { label: "HE", icon: "💥" },
  ];

  return (
    <main className="map-page">
      <Sidebar onSelectLineup={onSelectLineup} />
      <TopBar onViewSaved={onViewSaved} />

      <header className="map-page-header">
        <h1>{map.name} — Lineups</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search lineups by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

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
        <p className="no-lineups">No lineups match your search/filter.</p>
      ) : (
        <div className="lineup-grid">
          {filteredLineups.map((lineup) => (
            <div
              key={lineup.id}
              className="lineup-card"
              onClick={() => setSelectedLineup(lineup)}
            >
              <img src={lineup.image} alt={lineup.title} className="lineup-image" />
              <button
                className={`save-button ${isSaved(lineup.id) ? "saved" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaved(lineup.id);
                }}
                aria-label={isSaved(lineup.id) ? "Remove from saved" : "Save lineup"}
              >
                {isSaved(lineup.id) ? "★" : "☆"}
              </button>
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

      {selectedLineup && (
        <LineupModal
          lineup={selectedLineup}
          onClose={() => setSelectedLineup(null)}
          onPrevious={canNavigate ? showPreviousLineup : undefined}
          onNext={canNavigate ? showNextLineup : undefined}
        />
      )}
    </main>
  );
}

export default MapPage;