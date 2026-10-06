import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./LocationPanel.css";

export default function LocationPanel({
  location,
  onClose,
  onExploreCollection,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (location && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [location?.id]);

  if (!location) return null;

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onExploreCollection) {
      onExploreCollection(location);
    } else {
      const colEl = document.getElementById("collections");
      if (colEl) colEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      ref={panelRef}
      className="vas-corner-story-card"
      role="region"
      aria-label={`Guild craft story for ${location.city}`}
    >
      {/* Top Tag & Subtle Close Button */}
      <div className="corner-card-header">
        <span className="corner-card-tag">GUILD STORY · {location.city.toUpperCase()}</span>
        <button
          className="corner-card-close-btn"
          onClick={onClose}
          aria-label="Close story"
          data-cursor="pointer"
        >
          ✕
        </button>
      </div>

      {/* Craft Title */}
      <h3 className="corner-card-title">{location.craft || location.title}</h3>

      {/* Compact Poetic Narrative (Concise & Refined) */}
      <p className="corner-card-story">{location.story}</p>

      {/* Bottom Underline Link (Matching Reference Image) */}
      <div className="corner-card-footer">
        <a
          href="#collections"
          className="corner-card-link"
          onClick={handleCtaClick}
          data-cursor="pointer"
        >
          Read the full collective
        </a>
      </div>
    </aside>
  );
}
