import React, { useState, useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import VASKeySection from "./components/VASKeySection";
import IndiaMap from "./components/IndiaMap";
import Collections from "./components/Collections";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import AcquisitionModal from "./components/AcquisitionModal";
import { collections } from "./data/collections";
import "./styles/globals.css";

export default function App() {
  // Smooth scrolling with Lenis
  const lenisRef = useLenis();

  // State Management: VAS Key state & Bespoke Modal inquiry
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Force page to always start at top (Hero section) on refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Clear any anchor hash from URL so browser does not jump down
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [lenisRef]);

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    // Automatically smooth scroll directly to "India, craft by craft" section
    setTimeout(() => {
      ScrollTrigger.refresh();
      const mapEl = document.getElementById("map-section");
      if (mapEl) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(mapEl, { duration: 1.4, offset: -20 });
        } else {
          mapEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 350);
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.2, offset: -10 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleExploreCollectionFromMap = (location) => {
    const matched = collections.find(
      (c) => c.region.includes(location.state) || c.id === location.id,
    );
    if (matched) {
      setSelectedInquiry(matched);
    } else {
      handleScrollToSection("collections");
    }
  };

  return (
    <div className="vas-experience-app">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Luxury Navigation Bar */}
      <Navbar isUnlocked={isUnlocked} onNavigate={handleScrollToSection} />

      <main>
        {/* 1. Hero Section (Clean editorial with signature assembled handbag & plinth) */}
        <Hero
          onExploreClick={() => handleScrollToSection("vas-key")}
          onScrollClick={() => handleScrollToSection("about")}
        />

        {/* 2. Brand Manifesto & About Section */}
        <About onStoryClick={() => handleScrollToSection("vas-key")} />

        {/* 3. Dedicated VAS Key Section (Exploded pieces float in background, and assemble on entering VAS2026) */}
        <VASKeySection
          isUnlocked={isUnlocked}
          onUnlockSuccess={handleUnlockSuccess}
        />

        {/* 4. UNLOCKED INNER SERVICES & ARCHIVES: Revealed when user enters valid VAS Key! */}
        {isUnlocked && (
          <div className="vas-unlocked-services-reveal">
            {/* Interactive India Map Section ("CRAFTED ACROSS INDIA") */}
            <IndiaMap onExploreCollection={handleExploreCollectionFromMap} />

            {/* Haute Maroquinerie Collections Section ("CURATED EDITIONS") */}
            <Collections onInquire={(col) => setSelectedInquiry(col)} />
          </div>
        )}

        {/* 5. Contact, Global Ateliers & Brand Footer (Follows directly after Curated Editions) */}
        <Contact onGetInTouch={() => setSelectedInquiry(collections[0])} />
      </main>

      {/* Acquisition & Bespoke Modal */}
      {selectedInquiry && (
        <AcquisitionModal
          collection={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
      )}
    </div>
  );
}
