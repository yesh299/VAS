import React from 'react';
import './MapPoint.css';

export default function MapPoint({ location, isSelected, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={`vas-map-point-wrapper ${isSelected ? 'is-selected' : ''}`}
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
      }}
      onClick={() => onClick(location)}
      onMouseEnter={() => onMouseEnter && onMouseEnter(location)}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
      data-cursor="explore"
      data-cursor-text="DISCOVER"
      role="button"
      tabIndex={0}
      aria-label={`Explore craft story of ${location.state}, ${location.city}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(location);
        }
      }}
    >
      {/* Outer Radar Wave Ring */}
      <div className="point-radar-ring" />

      {/* Middle Glowing Aura */}
      <div className="point-aura" />

      {/* Core Interactive Point */}
      <div className="point-core">
        <div className="point-dot" />
      </div>

      {/* State / City Floating Label */}
      <div className="point-label-pill">
        <span className="point-state-name">{location.state}</span>
        <span className="point-city-name">{location.city}</span>
      </div>
    </div>
  );
}
