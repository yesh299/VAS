import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";

export default function Navbar({ isUnlocked, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className={`vas-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="vas-navbar-inner container-luxury">
          {/* Logo */}
          <a
            href="#hero"
            className="vas-logo"
            onClick={(e) => handleLinkClick(e, "hero")}
          >
            <span className="vas-logo-text">VAS</span>
            <span className="vas-logo-sub">HAUTE MAROQUINERIE</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="vas-nav-desktop" aria-label="Main Navigation">
            <a
              href="#about"
              className="vas-nav-link"
              onClick={(e) => handleLinkClick(e, "about")}
            >
              About
            </a>

            <a
              href="#vas-key"
              className="vas-nav-link"
              onClick={(e) => handleLinkClick(e, "vas-key")}
            >
              VAS Key
              {isUnlocked ? (
                <span className="nav-badge">Unlocked</span>
              ) : (
                <span className="nav-key-indicator">Unlock Key</span>
              )}
            </a>

            {/* Private Services & Collections Links (Shown only after VAS Key is entered) */}
            {isUnlocked && (
              <>
                <a
                  href="#map-section"
                  className="vas-nav-link"
                  onClick={(e) => handleLinkClick(e, "map-section")}
                >
                  Craft Map
                </a>

                <a
                  href="#collections"
                  className="vas-nav-link"
                  onClick={(e) => handleLinkClick(e, "collections")}
                >
                  Collections
                </a>
              </>
            )}

            <a
              href="#contact"
              className="vas-nav-link vas-nav-link-cta"
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className={`vas-hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            data-cursor="pointer"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleLinkClick}
        isUnlocked={isUnlocked}
      />
    </>
  );
}
