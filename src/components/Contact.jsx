import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("bespoke");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <footer id="contact" ref={sectionRef} className="vas-contact-section">
      <div className="container-luxury">
        {/* Main Big Editorial Headline */}
        <div className="contact-hero-header">
          <span className="editorial-caption">ATELIER PRIVÉ & COMMISSIONS</span>
          <h2 ref={headingRef} className="contact-main-heading">
            Let's create
            <br />
            <span className="contact-heading-italic">
              something meaningful.
            </span>
          </h2>
        </div>

        {/* Content Columns */}
        <div ref={contentRef} className="contact-grid">
          {/* Left Column: Inquiry / Private Concierge */}
          <div className="contact-inquiry-box">
            <h3 className="inquiry-title">
              PRIVATE ACQUISITION & BESPOKE COMMISSIONS
            </h3>
            <p className="inquiry-desc">
              Each bespoke commission begins with a personal consultation with
              our master artisans to curate leather selections, custom
              hand-engraved monogram hardware, and heirloom provenance.
            </p>

            {submitted ? (
              <div className="inquiry-success-card">
                <span className="success-icon">✓</span>
                <div>
                  <h4 className="success-title">INQUIRY RECEIVED</h4>
                  <p className="success-sub">
                    Our atelier concierge will contact you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-type-selector">
                  <button
                    type="button"
                    className={`type-chip ${inquiryType === "bespoke" ? "active" : ""}`}
                    onClick={() => setInquiryType("bespoke")}
                  >
                    Bespoke Commission
                  </button>
                  <button
                    type="button"
                    className={`type-chip ${inquiryType === "private-view" ? "active" : ""}`}
                    onClick={() => setInquiryType("private-view")}
                  >
                    Private Atelier Viewing
                  </button>
                  <button
                    type="button"
                    className={`type-chip ${inquiryType === "press" ? "active" : ""}`}
                    onClick={() => setInquiryType("press")}
                  >
                    Press & Editorial
                  </button>
                </div>

                <div className="contact-input-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="contact-email-input"
                    aria-label="Email address for bespoke acquisition"
                  />
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    data-cursor="pointer"
                  >
                    <span>SUBMIT</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Global Ateliers & Direct Contact */}
          <div className="contact-locations-box">
            <div className="atelier-locations-list">
              <div className="atelier-city-card">
                <span className="city-name">PARIS</span>
                <span className="city-role">DESIGN STUDIO</span>
                <span className="city-addr">Place Vendôme, 75001 Paris</span>
              </div>
              <div className="atelier-city-card">
                <span className="city-name">NEW DELHI</span>
                <span className="city-role">HERITAGE ATELIER</span>
                <span className="city-addr">
                  Sundar Nagar, New Delhi 110003
                </span>
              </div>
              <div className="atelier-city-card">
                <span className="city-name">MILAN</span>
                <span className="city-role">LEATHERWORK GUILD</span>
                <span className="city-addr">
                  Via Monte Napoleone, 20121 Milano
                </span>
              </div>
              <div className="atelier-city-card">
                <span className="city-name">NEW YORK</span>
                <span className="city-role">PRIVATE SALON</span>
                <span className="city-addr">
                  Madison Avenue, New York, NY 10021
                </span>
              </div>
            </div>

            {/* Direct Connect & Socials */}
            <div className="contact-direct-links">
              <div className="direct-col">
                <span className="direct-label">DIRECT CONCIERGE</span>
                <a
                  href="mailto:atelier@vas-official.com"
                  className="direct-link"
                >
                  atelier@vas-official.com
                </a>
              </div>
              <div className="direct-col">
                <span className="direct-label">INSTAGRAM</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-link"
                >
                  @vas.official
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="vas-footer-bar">
          <div className="footer-left">
            <span className="footer-brand">VAS</span>
            <span className="footer-copyright">
              © 2026 VAS HAUTE MAROQUINERIE. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="footer-right">
            <span className="footer-quote">
              OBJECTS SHAPED BY TRANSFORMATION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
