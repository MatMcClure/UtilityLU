import { useState } from "react";
import "../styles/Home.css";
import mirage from "../images/maps/mirage.jpg";
import inferno from "../images/maps/inferno.jpg";
import nuke from "../images/maps/nuke.jpg";
import dust2 from "../images/maps/dust2.jpg";
import anubis from "../images/maps/anubis.jpg";
import ancient from "../images/maps/ancient.jpg";
import overpass from "../images/maps/overpass.jpg";
import cache from "../images/maps/cache.jpeg";
import { useNavigate } from "react-router-dom";

const maps = [
  { id: "dust2", name: "Dust II", image: dust2 },
  { id: "mirage", name: "Mirage", image: mirage },
  { id: "nuke", name: "Nuke", image: nuke },
  { id: "ancient", name: "Ancient", image: ancient },
  { id: "inferno", name: "Inferno", image: inferno },
  { id: "overpass", name: "Overpass", image: overpass },
  { id: "anubis", name: "Anubis", image: anubis },
  { id: "cache", name: "Cache", image: cache },
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % maps.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? maps.length - 1 : prev - 1
    );
  };

  const previousIndex =
    currentImage === 0 ? maps.length - 1 : currentImage - 1;

  const nextIndex =
    currentImage === maps.length - 1 ? 0 : currentImage + 1;

  return (
    <main className="home">
      <div className="carousel-container">
        <h1 className="map-title">
          {maps[currentImage]?.name}
        </h1>

        <div className="carousel">
          <button className="arrow left" onClick={previousImage}>
            &#10094;
          </button>

          <img
            src={maps[previousIndex]?.image}
            alt={maps[previousIndex]?.name}
            className="side-image"
          />

          <img
            src={maps[currentImage]?.image}
            alt={maps[currentImage]?.name}
            className="main-image"
            onClick={() => setSelectedMap(maps[currentImage]!.id)}
          />

          <img
            src={maps[nextIndex]?.image}
            alt={maps[nextIndex]?.name}
            className="side-image"
          />

          <button className="arrow right" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
