import { useState } from "react";
import "../styles/Home.css";
import mirage from "../images/mirage.jpg";
import inferno from "../images/inferno.jpg";
import nuke from "../images/nuke.jpg";
import dust2 from "../images/dust2.jpg";
import anubis from "../images/anubis.jpg";
import ancient from "../images/ancient.jpg";
import overpass from "../images/overpass.jpg";
import cache from "../images/cache.jpeg";

const images = [
  dust2,
  mirage,
  nuke,
  ancient,
  inferno,
  overpass,
  anubis,
  cache,
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const previousIndex =
    currentImage === 0 ? images.length - 1 : currentImage - 1;

  const nextIndex =
    currentImage === images.length - 1 ? 0 : currentImage + 1;

  return (
    <main className="home">
      <div className="carousel">
        <button className="arrow left" onClick={previousImage}>
          &#10094;
        </button>

        <img
          src={images[previousIndex]}
          alt="Previous Map"
          className="side-image"
        />

        <img
          src={images[currentImage]}
          alt="Current Map"
          className="main-image"
        />

        <img
          src={images[nextIndex]}
          alt="Next Map"
          className="side-image"
        />

        <button className="arrow right" onClick={nextImage}>
          &#10095;
        </button>
      </div>
    </main>
  );
}

export default Home;