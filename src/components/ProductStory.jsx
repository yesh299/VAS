import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productStoryStages } from "../data/products";
import "./ProductStory.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProductStory() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const productVisualRef = useRef(null);
  const textStageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Safe, visible entrance animation
      if (textStageRef.current && productVisualRef.current) {
        gsap.fromTo(
          textStageRef.current,
          { y: 20, opacity: 0.8 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          productVisualRef.current,
          { y: 25, opacity: 0.8 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStage = productStoryStages[activeStageIndex];
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0.4, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [activeStageIndex]);

  return (
    <section id="story" ref={sectionRef} className="vas-product-story-section">
      <div ref={pinContainerRef} className="story-pin-container">
        {/* Warm Studio Ambient Light Spotlight */}
        <div className="story-parchment-backdrop">
          <div className="story-warm-spotlight" />
        </div>

        <div className="container-luxury story-content-grid">
          {/* Left Column: Interactive Story Step Narrative */}
          <div ref={textStageRef} className="story-narrative-column">
            <span className="editorial-caption story-atelier-caption">
              ATELIER PROCESS · CHAPTER {currentStage.step} OF 04
            </span>

            {/* Stepper Progress Bar */}
            <div className="story-progress-bar">
              {productStoryStages.map((st, i) => (
                <button
                  key={st.step}
                  type="button"
                  className={`progress-step-pill ${i === activeStageIndex ? "active" : ""} ${i < activeStageIndex ? "completed" : ""}`}
                  onClick={() => setActiveStageIndex(i)}
                  data-cursor="pointer"
                >
                  <span className="step-num">{st.step}</span>
                  <span className="step-label">{st.title}</span>
                </button>
              ))}
            </div>

            <div className="story-active-card">
              <h3 className="story-stage-title">{currentStage.title}</h3>
              <h4 className="story-stage-subtitle">{currentStage.subtitle}</h4>
              <p className="story-stage-desc">{currentStage.description}</p>

              <div className="story-detail-highlight">
                <span className="highlight-bullet">◈</span>
                <span className="highlight-text">{currentStage.detail}</span>
              </div>
            </div>

            {/* Floating Material Chip & Chapter Navigation */}
            <div className="story-action-row">
              <div className="story-material-chip">
                <span className="chip-key">FOCUS MATERIAL</span>
                <span className="chip-val">{currentStage.highlight}</span>
              </div>

              <div className="story-chapter-arrows">
                <button
                  type="button"
                  className="chapter-arrow-btn"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      prev > 0 ? prev - 1 : productStoryStages.length - 1
                    )
                  }
                  title="Previous Chapter"
                  aria-label="Previous Chapter"
                  data-cursor="pointer"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  className="chapter-arrow-btn active"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      prev < productStoryStages.length - 1 ? prev + 1 : 0
                    )
                  }
                  title="Next Chapter"
                  aria-label="Next Chapter"
                  data-cursor="pointer"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual that dynamically changes on chapter click */}
          <div className="story-visual-column">
            <div
              ref={productVisualRef}
              className="story-product-frame"
              data-cursor="view"
              data-cursor-text="INSPECT"
            >
              <img
                key={currentStage.step}
                ref={imgRef}
                src={currentStage.image}
                alt={`VAS Atelier ${currentStage.title} - ${currentStage.subtitle}`}
                className="story-product-img"
              />
              <div className="story-frame-glow" />
              <div className="story-floating-spec">
                <span className="spec-label">{currentStage.specLabel}</span>
                <span className="spec-serial">{currentStage.specSerial}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
