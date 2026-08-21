import "../styles/Home.css";
import { useRef } from "react";
import { maps } from "../data/maps";

interface HomeProps {
  onSelectMap: (mapId: string) => void;
  currentImageIndex: number;
  onImageIndexChange: (index: number) => void;
}

function Home({ onSelectMap, currentImageIndex, onImageIndexChange }: HomeProps) {
  const isScrolling = useRef(false);

  const nextImage = () => {
    onImageIndexChange((currentImageIndex + 1) % maps.length);
  };

  const previousImage = () => {
    onImageIndexChange(
      currentImageIndex === 0 ? maps.length - 1 : currentImageIndex - 1
    );
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (isScrolling.current) return;
    isScrolling.current = true;

    if (e.deltaY > 0) {
      nextImage();
    } else if (e.deltaY < 0) {
      previousImage();
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, 400);
  };

  const previousIndex =
    currentImageIndex === 0 ? maps.length - 1 : currentImageIndex - 1;

  const nextIndex =
    currentImageIndex === maps.length - 1 ? 0 : currentImageIndex + 1;

  const currentMap = maps[currentImageIndex]!;
  const previousMap = maps[previousIndex]!;
  const nextMap = maps[nextIndex]!;

  return (
    <main className="home">
      <div className="carousel-container" onWheel={handleWheel}>
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

        <p className="carousel-hint">Scroll or click the arrows to browse · click the center map to view lineups</p>
      </div>
    </main>
  );
}

export default Home;