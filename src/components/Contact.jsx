import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Bespoke Commission",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(contentRef.current?.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a brief note or message.";
    }
    return errs;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate luxury concierge transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      inquiryType: "Bespoke Commission",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" ref={sectionRef} className="vas-contact-section">
      <div className="container-luxury">
        {/* Main Editorial Headline */}
        <div className="contact-hero-header">
          <div className="contact-eyebrow-row">
            <span className="tag-dash" />
            <span className="editorial-caption">ATELIER CONCIERGE & INQUIRIES</span>
          </div>
          <h2 ref={headingRef} className="contact-main-heading">
            Connect With<br />
            <span className="contact-heading-italic">The House of VAS.</span>
          </h2>
          <p className="contact-intro-lead">
            For bespoke acquisitions, private viewings, object commissions, and press inquiries, our concierge is available to assist you with dedicated care.
          </p>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="contact-grid">
          
          {/* Left Column: Functional Contact Form */}
          <div className="contact-inquiry-box">
            <h3 className="inquiry-title">
              SEND AN ATELIER INQUIRY
            </h3>
            <p className="inquiry-desc">
              Every commission begins with a conversation. Share your intention or request a private consultation.
            </p>

            {submitted ? (
              <div className="inquiry-success-card">
                <div className="success-icon-badge">✓</div>
                <div className="success-content">
                  <h4 className="success-title">INQUIRY RECEIVED</h4>
                  <p className="success-sub">
                    Thank you, <strong className="success-name">{formData.name}</strong>. Our concierge will review your message regarding <em>{formData.inquiryType}</em> and respond shortly.
                  </p>
                  <button
                    type="button"
                    className="success-reset-btn"
                    onClick={handleReset}
                    data-cursor="pointer"
                  >
                    <span>Send Another Inquiry</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Inquiry Type Chips */}
                <div className="form-group-type">
                  <label className="input-field-label">INQUIRY NATURE</label>
                  <div className="form-type-selector">
                    {[
                      "Bespoke Commission",
                      "Private Salon Viewing",
                      "Object Acquisition",
                      "Press & Editorial",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`type-chip ${formData.inquiryType === type ? "active" : ""}`}
                        onClick={() => handleChange("inquiryType", type)}
                        data-cursor="pointer"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="form-row-dual">
                  <div className="form-field-group">
                    <label htmlFor="contact-name" className="input-field-label">
                      FULL NAME <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className={`contact-text-input ${errors.name ? "input-err" : ""}`}
                      aria-required="true"
                    />
                    {errors.name && <span className="field-error-msg">{errors.name}</span>}
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="contact-email" className="input-field-label">
                      EMAIL ADDRESS <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="e.g. name@example.com"
                      className={`contact-text-input ${errors.email ? "input-err" : ""}`}
                      aria-required="true"
                    />
                    {errors.email && <span className="field-error-msg">{errors.email}</span>}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="form-field-group">
                  <label htmlFor="contact-message" className="input-field-label">
                    YOUR MESSAGE OR COMMISSION DETAILS <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about the piece, material preference, or private appointment request..."
                    className={`contact-textarea ${errors.message ? "input-err" : ""}`}
                    aria-required="true"
                  />
                  {errors.message && <span className="field-error-msg">{errors.message}</span>}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-pill-btn"
                  data-cursor="pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="submit-spinner" />
                      <span>TRANSMITTING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT INQUIRY</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact & Verified Placeholders */}
          <div className="contact-details-box">
            <div className="contact-info-card">
              <span className="info-card-badge">DIRECT CHANNELS</span>
              <h4 className="info-card-title">Atelier Concierge</h4>
              <p className="info-card-text">
                Direct correspondence for private inquiries, acquisitions, and object provenance.
              </p>

              <div className="info-contact-points">
                <div className="point-item">
                  <span className="point-label">EMAIL CONCIERGE</span>
                  <a href="mailto:inquire@vas-official.com" className="point-value point-link">
                    inquire@vas-official.com
                  </a>
                </div>

                <div className="point-item">
                  <span className="point-label">PRIVATE APPOINTMENTS</span>
                  <span className="point-value">
                    Private viewing consultations arranged upon request.
                  </span>
                </div>

                <div className="point-item">
                  <span className="point-label">COMMISSION DESK</span>
                  <span className="point-value">
                    Monday — Friday · 10:00 — 18:00 IST
                  </span>
                </div>
              </div>
            </div>

            {/* Mudra Essentials Execution Attribution Highlight Card */}
            <div className="contact-company-card">
              <div className="company-card-header">
                <span className="company-card-tag">PRODUCTION & EXECUTION</span>
                <h5 className="company-card-name">Mudra Essentials Pvt. Ltd.</h5>
              </div>
              <p className="company-card-desc">
                VAS is the customer-facing luxury brand. Mudra Essentials Pvt. Ltd. is the company behind its development, manufacturing and execution.
              </p>
            </div>
          </div>

        </div>

        {/* Website Footer */}
        <div className="vas-footer-main">
          
          {/* Top Footer Row: Brand & Navigation */}
          <div className="footer-top-row">
            <div className="footer-brand-block">
              <span className="footer-brand-title">VAS</span>
              <span className="footer-brand-tagline">CARRY YOUR SPACE</span>
            </div>

            <nav className="footer-nav-links" aria-label="Footer Navigation">
              <a
                href="#map-section"
                className="footer-link"
                onClick={(e) => handleLinkClick(e, "map-section")}
              >
                WORLD
              </a>
              <a
                href="#about"
                className="footer-link"
                onClick={(e) => handleLinkClick(e, "about")}
              >
                ABOUT US
              </a>
              <a
                href="#vas-key"
                className="footer-link"
                onClick={(e) => handleLinkClick(e, "vas-key")}
              >
                VAS KEY
              </a>
              <a
                href="#contact"
                className="footer-link"
                onClick={(e) => handleLinkClick(e, "contact")}
              >
                CONTACT US
              </a>
            </nav>
          </div>

          {/* Bottom Footer Row: Attribution & Copyright */}
          <div className="footer-bottom-row">
            <div className="footer-attribution-line">
              <span>VAS is developed with <strong>Mudra Essentials Pvt. Ltd.</strong></span>
            </div>

            <div className="footer-copyright-line">
              <span>© 2026 VAS. All rights reserved.</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
