import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About({ onStoryClick }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const brandCardRef = useRef(null);
  const companyCardRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current?.children, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 35,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Brand Pillar Card
      gsap.from(brandCardRef.current, {
        scrollTrigger: {
          trigger: brandCardRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      // Company Pillar Card
      gsap.from(companyCardRef.current, {
        scrollTrigger: {
          trigger: companyCardRef.current,
          start: "top 78%",
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        delay: 0.15,
        ease: "power3.out",
      });

      // Artisanal Visual & Parallax
      if (visualRef.current) {
        gsap.from(visualRef.current, {
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 80%",
          },
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="vas-about section-spacing">
      <div className="container-luxury">
        {/* Editorial Subheader */}
        <div ref={headerRef} className="about-editorial-header">
          <div className="about-eyebrow-row">
            <span className="tag-dash" />
            <span className="editorial-caption">BRAND PHILOSOPHY & PROVENANCE</span>
            <span className="about-header-pill">CARRY YOUR SPACE</span>
          </div>
          <h2 className="about-main-title">
            The Philosophy &<br />
            <span className="about-title-italic">The Making of VAS</span>
          </h2>
        </div>

        {/* Dual Editorial Columns */}
        <div className="about-pillars-grid">
          
          {/* Column 1: About VAS */}
          <div ref={brandCardRef} className="about-pillar-card brand-pillar">
            <div className="pillar-top-badge">
              <span className="pillar-num">01</span>
              <span className="pillar-category">CUSTOMER-FACING BRAND</span>
            </div>

            <h3 className="pillar-heading">About VAS</h3>

            <p className="pillar-lead-text">
              VAS is a design-led luxury object house built around the idea of{" "}
              <strong className="lead-strong">CARRY YOUR SPACE</strong>.
            </p>

            <p className="pillar-body-text">
              We see the clutch as more than an accessory. It is an object shaped by form, function, material and the stories of the places that inspire it. Through a considered design language and an editorial approach, VAS invites you to discover the connection between an object and the world around it.
            </p>

            <div className="pillar-focus-tags">
              <span className="focus-chip">Form & Proportion</span>
              <span className="focus-chip">Material Truth</span>
              <span className="focus-chip">Narrative of Place</span>
            </div>

            <div className="pillar-quote-box">
              <span className="quote-mark">“</span>
              <p className="quote-text">
                More than an accessory—an object connecting the personal space with the world that surrounds it.
              </p>
            </div>
          </div>

          {/* Column 2: The Company Behind VAS */}
          <div ref={companyCardRef} className="about-pillar-card company-pillar">
            <div className="pillar-top-badge badge-company">
              <span className="pillar-num">02</span>
              <span className="pillar-category">DEVELOPMENT & EXECUTION</span>
            </div>

            <h3 className="pillar-heading">The Company Behind VAS</h3>

            <p className="pillar-lead-text">
              VAS is developed and brought to life with{" "}
              <strong className="lead-strong company-highlight">Mudra Essentials Pvt. Ltd.</strong>, the company behind its development, manufacturing and execution.
            </p>

            <p className="pillar-body-text">
              Together, the brand and its making process bring the VAS vision into a physical object—where design intention, material and function come together.
            </p>

            {/* Core Distinction Hallmark Box */}
            <div className="brand-distinction-box">
              <div className="distinction-seal-icon">
                <svg viewBox="0 0 24 24" className="distinction-svg" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="distinction-content">
                <span className="distinction-label">IDENTITY DISTINCTION</span>
                <p className="distinction-statement">
                  VAS is the brand. Mudra Essentials Pvt. Ltd. is the company behind its creation.
                </p>
              </div>
            </div>

            <div className="pillar-execution-attributes">
              <div className="attrib-item">
                <span className="attrib-bullet">✦</span>
                <span className="attrib-txt">Precision Manufacturing & Atelier Execution</span>
              </div>
              <div className="attrib-item">
                <span className="attrib-bullet">✦</span>
                <span className="attrib-txt">Direct Realization of Design Intention</span>
              </div>
            </div>
          </div>

        </div>

        {/* Artisanal Craftsmanship Showcase Bar */}
        <div ref={visualRef} className="about-craftsmanship-strip">
          <div className="craft-strip-image-wrap">
            <img
              src="/assets/products/craft_detail.jpg"
              alt="Artisanal Hand-Stitched Leather and Craft Detail"
              className="craft-strip-img"
            />
            <div className="craft-strip-overlay" />
          </div>

          <div className="craft-strip-content">
            <div className="craft-strip-meta">
              <span className="strip-caption">CRAFTSMANSHIP & MAKING</span>
              <h4 className="strip-title">Physical Objects of Intention</h4>
              <p className="strip-desc">
                From hand-selected leathers and pure silk brocades to hand-burnished solid brass turnkeys, every component is shaped with unhurried dedication to materiality and longevity.
              </p>
            </div>

            {onStoryClick && (
              <button
                onClick={onStoryClick}
                className="strip-action-btn"
                data-cursor="pointer"
              >
                <span>EXPLORE VAS KEY ARCHIVE</span>
                <span className="btn-arrow">→</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
