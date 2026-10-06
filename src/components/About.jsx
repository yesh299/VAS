import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandManifesto } from "../data/collections";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Left Column Quote
      gsap.from(leftColRef.current, {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Right Column Content & Stats
      gsap.from(rightColRef.current?.children, {
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Craft detail image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -40,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="vas-about section-spacing">
      <div className="container-luxury">
        {/* Editorial Subheader */}
        <div className="about-header">
          <span className="editorial-caption">MANIFESTO & HERITAGE</span>
          <div className="header-divider" />
        </div>

        {/* Main Two-Column Editorial Grid */}
        <div className="about-grid">
          {/* Left Column: Massive Serif Typography */}
          <div ref={leftColRef} className="about-col-left">
            <h2 ref={headingRef} className="about-heading">
              Form, material
              <br />
              <span className="about-heading-accent">and transformation.</span>
            </h2>

            <div
              className="about-craft-visual"
              data-cursor="view"
              data-cursor-text="CRAFT"
            >
              <img
                ref={imageRef}
                src="/assets/products/craft_detail.jpg"
                alt="Artisanal Hand-Stitched Grain Leather Craft"
                className="about-craft-img"
              />
              <div className="craft-caption">
                <span className="craft-badge">SADDLE STITCH N° 24</span>
                <span className="craft-desc">
                  Hand-stitched French linen thread & burnished edges
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Brand Story & Guild Metrics */}
          <div ref={rightColRef} className="about-col-right">
            <p className="about-lead-text">{brandManifesto.body1}</p>

            <p className="about-sub-text">{brandManifesto.body2}</p>

            {/* Guild Metrics */}
            <div className="about-stats-grid">
              {brandManifesto.stats.map((stat, idx) => (
                <div key={idx} className="about-stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Architectural Signature Seal */}
            <div className="about-seal-block">
              <div className="seal-ring">
                <svg
                  viewBox="0 0 100 100"
                  className="seal-svg animate-spin-slow"
                >
                  <path
                    id="sealCircle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="seal-text">
                    <textPath href="#sealCircle">
                      VAS ATELIER · HAUTE MAROQUINERIE · MMXXVI ·
                    </textPath>
                  </text>
                </svg>
                <span className="seal-center-v">V</span>
              </div>
              <div className="seal-meta">
                <span className="seal-meta-title">GENUINE ARCHIVAL CRAFT</span>
                <span className="seal-meta-sub">
                  Certified Sustainable Generational Guilds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
