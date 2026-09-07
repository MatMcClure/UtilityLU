import "../styles/MapPage.css";
import { maps } from "../data/maps";
import { useSavedLineups } from "../hooks/useSavedLineups";
import type { Lineup, MapData } from "../types";

interface SavedLineupWithMap extends Lineup {
  mapName: string;
}

function SavedLineups() {
  const { savedIds, toggleSaved } = useSavedLineups();

  const savedLineups: SavedLineupWithMap[] = maps.flatMap((map: MapData) =>
    map.lineups
      .filter((lineup) => savedIds.includes(lineup.id))
      .map((lineup) => ({ ...lineup, mapName: map.name }))
  );

  return (
    <main className="map-page">
      <header className="map-page-header">
        <h1>Saved Lineups</h1>
      </header>

      {savedLineups.length === 0 ? (
        <p className="no-lineups">
          You haven't saved any lineups yet. Star a lineup on a map page to add it here.
        </p>
      ) : (
        <div className="lineup-grid">
          {savedLineups.map((lineup) => (
            <div key={lineup.id} className="lineup-card">
              <img src={lineup.image} alt={lineup.title} className="lineup-image" />
              <button
                className="save-button saved"
                onClick={() => toggleSaved(lineup.id)}
                aria-label="Remove from saved"
              >
                ★
              </button>
              <div className="lineup-info">
                <span className="map-tag">{lineup.mapName}</span>
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

export default SavedLineups;