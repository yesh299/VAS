import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locations } from "../data/locations";
import MapPoint from "./MapPoint";
import LocationPanel from "./LocationPanel";
import "./IndiaMap.css";

gsap.registerPlugin(ScrollTrigger);

export default function IndiaMap({ onExploreCollection }) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]); // Default to Banarasi/UP
  const mapSectionRef = useRef(null);
  const mapSvgWrapperRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map Section entrance
      gsap.from(titleRef.current?.children, {
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(mapSvgWrapperRef.current, {
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: "top 75%",
        },
        scale: 0.94,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
      });
    }, mapSectionRef);

    return () => ctx.revert();
  }, []);

  const handlePointClick = (loc) => {
    setSelectedLocation(loc);
  };

  return (
    <section
      id="map-section"
      ref={mapSectionRef}
      className="vas-india-map-section"
    >
      <div className="container-luxury map-editorial-container">
        {/* Editorial 2-Column Header (Matching Reference Image 1) */}
        <div ref={titleRef} className="map-editorial-header-row">
          <div className="map-header-left">
            <h2 className="map-editorial-title">
              India, craft by<br />craft
            </h2>
          </div>
          <div className="map-header-right">
            <p className="map-editorial-subtitle">
              Many landscapes, one soul. Generational crafts preserved across time.
              <br className="desktop-br" />
              Hover a place to discover its name; tap to unveil the archive.
            </p>
          </div>
        </div>

        {/* Clean, Frameless Center Map Display */}
        <div className="map-center-showcase">
          <div ref={mapSvgWrapperRef} className="map-canvas-stage">
            {/* Illustrated Map */}
            <div className="india-illustrated-map-frame">
              <img
                src="/assets/map/india_craft_user_map.png"
                alt="Illustrated map of India and its craft heritage"
                className="india-illustrated-map-img"
              />
            </div>

            {/* Render Map Points for all 10 locations */}
            <div className="map-points-overlay">
              {locations.map((loc) => (
                <MapPoint
                  key={loc.id}
                  location={loc}
                  isSelected={selectedLocation?.id === loc.id}
                  onClick={handlePointClick}
                />
              ))}
            </div>

            {/* Compact Corner Story Card (Anchored to Bottom-Right Corner of Map) */}
            <LocationPanel
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
              onExploreCollection={onExploreCollection}
            />
          </div>
        </div>

        <button
          type="button"
          className="map-archives-cta"
          onClick={() => onExploreCollection?.(selectedLocation)}
          data-cursor="pointer"
        >
          Explore craft archives <span aria-hidden="true">→</span>
        </button>

        {/* Locations Directory Quick Selector */}
        <div className="map-quick-selector">
          <span className="quick-label">GUILD CARTOGRAPHY INDEX:</span>
          <div className="quick-pills-list">
            {locations.map((loc) => (
              <button
                key={loc.id}
                className={`quick-pill ${selectedLocation?.id === loc.id ? "active" : ""}`}
                onClick={() => setSelectedLocation(loc)}
                data-cursor="pointer"
              >
                <span className="quick-dot" />
                <span className="quick-name">{loc.state}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
