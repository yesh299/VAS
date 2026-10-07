import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FloatingPurseLayers from './FloatingPurseLayers';
import './Hero.css';

export default function Hero({ onExploreClick, onScrollClick }) {
  const [viewMode, setViewMode] = useState('exploded'); // Default: 'exploded' (Material Layers)
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);
  const visualStageRef = useRef(null);
  const scrollRef = useRef(null);
  const ambientHaloRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      headingRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.1 },
      '-=0.5'
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.7'
    )
    .fromTo(
      btnRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      visualStageRef.current,
      { opacity: 0, scale: 0.94, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power4.out' },
      '-=1.0'
    )
    .fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    return () => tl.kill();
  }, []);

  return (
    <section id="hero" className="vas-hero-panel5">
      {/* Warm Ivory Atmospheric Ambient Lighting */}
      <div ref={ambientHaloRef} className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-subtle-mesh-texture" aria-hidden="true" />

      <div className="container-luxury hero-grid-panel5">
        
        {/* Left Column: Editorial Headline & Actions */}
        <div className="hero-left-content">
          <div ref={tagRef} className="hero-editorial-tag">
            <span className="tag-dash" />
            <span className="tag-txt">DESIGN-LED LUXURY OBJECT HOUSE</span>
            <span className="tag-badge-green">ATELIER ARCHIVE</span>
          </div>

          <h1 ref={headingRef} className="hero-main-title">
            CARRY YOUR<br />
            <span className="hero-title-italic">SPACE.</span>
          </h1>

          <p ref={subtitleRef} className="hero-lead-desc">
            More than an accessory—an object shaped by form, function, material, and the stories of the places that inspire it. Discover the connection between an object and the world around it.
          </p>

          <div ref={btnRef} className="hero-action-row">
            <button
              onClick={onExploreClick}
              className="hero-explore-pill-btn"
              data-cursor="pointer"
            >
              <span>DISCOVER VAS KEY</span>
              <span className="btn-arrow">→</span>
            </button>

            {/* View Mode Toggle: Material Layers (Default) & Assembled Form */}
            <div className="hero-mode-toggle">
              <button
                className={`toggle-tab ${viewMode === 'exploded' ? 'active' : ''}`}
                onClick={() => setViewMode('exploded')}
                data-cursor="pointer"
              >
                Material Layers
              </button>
              <button
                className={`toggle-tab ${viewMode === 'assembled' ? 'active' : ''}`}
                onClick={() => setViewMode('assembled')}
                data-cursor="pointer"
              >
                Assembled Form
              </button>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div
            ref={scrollRef}
            className="hero-scroll-bottom"
            onClick={onScrollClick}
            role="button"
            tabIndex={0}
            data-cursor="pointer"
          >
            <span className="scroll-txt">Scroll to explore philosophy</span>
            <span className="scroll-icon-arrow">↓</span>
          </div>
        </div>

        {/* Right Column: Handcrafted Luxury Handbag Masterpiece */}
        <div ref={visualStageRef} className="hero-right-visual">
          {viewMode === 'assembled' ? (
            <div className="hero-silk-plinth-frame" data-cursor="view" data-cursor-text="VIEW">
              <div className="hero-image-vignette" />
              <img
                src="/assets/products/hero_purse.jpg"
                alt="VAS Signature Assembled Clutch on Draped Silk"
                className="hero-silk-img"
              />
              <div className="hero-silk-lighting-glow" />
              <div className="hero-sculpture-badge">
                <span className="sculpture-badge-num">OBJECT 01 · ASSEMBLED FORM</span>
                <span className="sculpture-badge-sub">Travertine Plinth & Hand-Burnished Box Calf</span>
              </div>
            </div>
          ) : (
            <div className="hero-floating-sculpture-card" data-cursor="view" data-cursor-text="INTERACT">
              <FloatingPurseLayers isHero={true} />
              <div className="hero-sculpture-badge">
                <span className="sculpture-badge-num">OBJECT 01 · MATERIAL STUDY</span>
                <span className="sculpture-badge-sub">Ivory Silk · Burgundy Velvet · Olive Leather · Brass</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
