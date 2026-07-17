import { useParams } from "react-router-dom";
import { maps } from "../data/maps";

function MapPage() {
  const { mapId } = useParams();

  const map = maps.find((m) => m.id === mapId);

  if (!map) {
    return <h1>Map not found</h1>;
  }

  return (
    <div>
      <h1>{map.name}</h1>

      {/* Render the lineups for this map here */}
    </div>
  );
}

export default MapPage;
