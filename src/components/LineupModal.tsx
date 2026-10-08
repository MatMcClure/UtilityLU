import { useState, useEffect } from "react";
import type { Lineup } from "../types";
import "../styles/LineupModal.css";

interface LineupModalProps {
  lineup: Lineup;
  onClose: () => void;
  onPrevious?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
}

function LineupModal({ lineup, onClose, onPrevious, onNext }: LineupModalProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Reset any open zoom when switching to a different lineup
  useEffect(() => {
    setZoomedImage(null);
  }, [lineup.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomedImage) {
          setZoomedImage(null);
        } else {
          onClose();
        }
      } else if (!zoomedImage && e.key === "ArrowLeft") {
        onPrevious?.();
      } else if (!zoomedImage && e.key === "ArrowRight") {
        onNext?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrevious, onNext, zoomedImage]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      {onPrevious && (
        <button
          className="modal-arrow modal-arrow-left"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous lineup"
        >
          &#10094;
        </button>
      )}

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
            key={lineup.id}
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

      {onNext && (
        <button
          className="modal-arrow modal-arrow-right"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next lineup"
        >
          &#10095;
        </button>
      )}

      {zoomedImage && (
        <div
          className="zoom-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setZoomedImage(null);
          }}
        >
          <img src={zoomedImage} alt="Zoomed reference" className="zoomed-image" />
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