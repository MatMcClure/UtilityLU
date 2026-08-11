import { useState } from "react";
import "../styles/Home.css";
import { maps } from "../data/maps";

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
          <button className="arrow left" onClick={previousImage} aria-label="Previous map">
            &#10094;
          </button>

          <img
            src={previousMap.image}
            alt={previousMap.name}
            className="side-image"
            onClick={previousImage}
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
            onClick={nextImage}
          />

          <button className="arrow right" onClick={nextImage} aria-label="Next map">
            &#10095;
          </button>
        </div>

        <p className="carousel-hint">Click the center map to view smoke lineups</p>
      </div>
    </main>
  );
}

export default Home;
