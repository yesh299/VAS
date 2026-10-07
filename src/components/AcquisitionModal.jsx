import React, { useState } from 'react';
import './AcquisitionModal.css';

export default function AcquisitionModal({ collection, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!collection) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="vas-modal-backdrop" onClick={onClose}>
      <div className="vas-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          data-cursor="pointer"
        >
          ✕
        </button>

        <div className="modal-header">
          <span className="editorial-caption">BESPOKE ACQUISITION INQUIRY</span>
          <h3 className="modal-title">{collection.name}</h3>
          <p className="modal-origin">{collection.origin}</p>
        </div>

        {submitted ? (
          <div className="modal-success-content">
            <div className="modal-check-circle">✓</div>
            <h4>INQUIRY DOCKET REGISTERED</h4>
            <p>
              Your request for <em>{collection.name}</em> has been assigned to our Private Atelier Director. You will receive an accession dossier at <strong>{email}</strong> shortly.
            </p>
            <button className="modal-action-btn" onClick={onClose}>
              Return to Gallery
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-product-summary">
              <img src={collection.image} alt={collection.name} className="modal-thumb" />
              <div className="modal-summary-info">
                <span className="modal-summary-tag">{collection.tag}</span>
                <p className="modal-summary-desc">{collection.description}</p>
              </div>
            </div>

            <div className="modal-input-field">
              <label>FULL NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
              />
            </div>

            <div className="modal-input-field">
              <label>CONFIDENTIAL EMAIL</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. eleanor@vance-holdings.com"
              />
            </div>

            <div className="modal-input-field">
              <label>CITY / REGION FOR PRIVATE VIEWING</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New Delhi / Mumbai / Bengaluru"
              />
            </div>

            <button type="submit" className="modal-action-btn" data-cursor="pointer">
              <span>Submit Atelier Docket</span>
              <span>→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
