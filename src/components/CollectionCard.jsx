import React from "react";
import "./CollectionCard.css";

export default function CollectionCard({ collection, onInquire }) {
  return (
    <article
      className="vas-collection-card"
      data-cursor="view"
      data-cursor-text="INQUIRE"
    >
      {/* Product Imagery */}
      <div className="collection-card-image-wrap">
        <img
          src={collection.image}
          alt={collection.name}
          className="collection-card-img"
        />
        <div className="collection-card-gradient" />

        {/* Origin & Tag Badges */}
        <div className="collection-card-badges">
          <span className="collection-tag">{collection.tag}</span>
          <span className="collection-subtitle">{collection.subtitle}</span>
        </div>
      </div>

      {/* Card Metadata & Story */}
      <div className="collection-card-info">
        <div className="collection-origin-line">
          <span className="origin-icon">◈</span>
          <span className="origin-text">{collection.origin}</span>
        </div>

        <h3 className="collection-name">{collection.name}</h3>

        <p className="collection-desc">{collection.description}</p>

        <div className="collection-materials-box">
          <span className="materials-label">COMPOSITION:</span>
          <span className="materials-text">{collection.materials}</span>
        </div>

        {/* Action Link */}
        <div className="collection-action-row">
          <span className="collection-price-tag">{collection.price}</span>
          <button
            onClick={() => onInquire && onInquire(collection)}
            className="collection-inquire-btn"
            data-cursor="pointer"
          >
            <span>Acquisition Details</span>
            <span className="inquire-arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
