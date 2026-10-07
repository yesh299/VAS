import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";

export default function Navbar({ isUnlocked, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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

  useEffect(() => {
    const sections = ["hero", "about", "vas-key", "map-section", "collections", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isUnlocked]);

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
            <span className="vas-logo-sub">CARRY YOUR SPACE</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="vas-nav-desktop" aria-label="Main Navigation">
            <a
              href="#map-section"
              className={`vas-nav-link ${activeSection === "map-section" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "map-section")}
            >
              WORLD
            </a>

            <a
              href="#about"
              className={`vas-nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "about")}
            >
              ABOUT US
            </a>

            <a
              href="#vas-key"
              className={`vas-nav-link ${activeSection === "vas-key" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "vas-key")}
            >
              VAS KEY
              {isUnlocked ? (
                <span className="nav-badge">Unlocked</span>
              ) : (
                <span className="nav-key-indicator">Unlock Key</span>
              )}
            </a>

            {/* Curated Collections Link (Shown when unlocked) */}
            {isUnlocked && (
              <a
                href="#collections"
                className={`vas-nav-link ${activeSection === "collections" ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, "collections")}
              >
                COLLECTIONS
              </a>
            )}

            <a
              href="#contact"
              className={`vas-nav-link vas-nav-link-cta ${activeSection === "contact" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              CONTACT US
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
