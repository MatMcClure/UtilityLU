import { useState, useEffect } from "react";
import type { Lineup } from "../types";
import "../styles/LineupModal.css";

interface LineupModalProps {
  lineup: Lineup;
  onClose: () => void;
}

function LineupModal({ lineup, onClose }: LineupModalProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomedImage) {
          setZoomedImage(null); // close zoom first, not the whole modal
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, zoomedImage]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="modal-header">
          <span className={`badge ${lineup.side.toLowerCase()}`}>
            {lineup.side} · {lineup.nadeType}
          </span>
          <h2>{lineup.title}</h2>
          <p className="modal-description">{lineup.description}</p>
        </div>

        {lineup.video ? (
          <video
            className="modal-video"
            src={lineup.video}
            controls
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            className="modal-video"
            src={lineup.image}
            alt={lineup.title}
          />
        )}

        {lineup.detailImages && lineup.detailImages.length > 0 && (
          <div className="modal-detail-images">
            {lineup.detailImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${lineup.title} detail ${index + 1}`}
                className="modal-detail-image zoomable"
                onClick={() => setZoomedImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {zoomedImage && (
        <div
          className="zoom-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setZoomedImage(null);
          }}
        >
          <img src={zoomedImage} alt="Zoomed crosshair reference" className="zoomed-image" />
          <button
            className="zoom-close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(null);
            }}
            aria-label="Close zoom"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default LineupModal;