type MapPageProps = {
  mapName: string;
  onBack: () => void;
};

function MapPage({ mapName, onBack }: MapPageProps) {
  return (
    <div>
      <button onClick={onBack}>
        Back
      </button>

      <h1>{mapName} Lineups</h1>
    </div>
  );
}

export default MapPage;