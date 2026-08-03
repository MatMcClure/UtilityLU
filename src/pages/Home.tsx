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

interface HomeProps {
  onSelectMap: (mapId: string) => void;
}

function Home({ onSelectMap }: HomeProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % maps.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? maps.length - 1 : prev - 1));
  };

  const previousIndex =
    currentImage === 0 ? maps.length - 1 : currentImage - 1;

  const nextIndex =
    currentImage === maps.length - 1 ? 0 : currentImage + 1;

  const currentMap = maps[currentImage]!;
  const previousMap = maps[previousIndex]!;
  const nextMap = maps[nextIndex]!;

  return (
    <main className="home">
      <div className="carousel-container">
        <h1 className="map-title">{currentMap.name}</h1>

        <div className="carousel">
          <button className="arrow left" onClick={previousImage}>
            &#10094;
          </button>

          <img
            src={previousMap.image}
            alt={previousMap.name}
            className="side-image"
          />

          <img
            src={currentMap.image}
            alt={currentMap.name}
            className="main-image"
            onClick={() => onSelectMap(currentMap.id)}
          />

          <img
            src={nextMap.image}
            alt={nextMap.name}
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
