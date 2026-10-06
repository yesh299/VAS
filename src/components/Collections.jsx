import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collections } from "../data/collections";
import CollectionCard from "./CollectionCard";
import "./Collections.css";

gsap.registerPlugin(ScrollTrigger);

export default function Collections({ onInquire }) {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current?.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Cards Staggered Reveal
      const cards = cardsGridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCollections =
    filter === "all"
      ? collections
      : collections.filter((c) => c.category === filter);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="vas-collections-section section-spacing"
    >
      <div className="container-luxury">
        {/* Section Header */}
        <div ref={headerRef} className="collections-header">
          <div className="collections-header-left">
            <span className="editorial-caption">
              PERMANENT & CAPSULE ARCHIVE
            </span>
            <h2 className="collections-heading">CURATED EDITIONS</h2>
          </div>

          <div className="collections-header-right">
            <p className="collections-lead">
              Each edition represents an unhurried exploration of Indian
              generational craft, produced in strictly numbered micro-capsules.
            </p>

            {/* Filter Buttons */}
            <div className="collections-filters">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
                data-cursor="pointer"
              >
                All Editions ({collections.length})
              </button>
              <button
                className={`filter-btn ${filter === "silk" ? "active" : ""}`}
                onClick={() => setFilter("silk")}
                data-cursor="pointer"
              >
                Velvet & Zari
              </button>
              <button
                className={`filter-btn ${filter === "metal" ? "active" : ""}`}
                onClick={() => setFilter("metal")}
                data-cursor="pointer"
              >
                Silver & Filigree
              </button>
              <button
                className={`filter-btn ${filter === "leather" ? "active" : ""}`}
                onClick={() => setFilter("leather")}
                data-cursor="pointer"
              >
                Sculptural Leather
              </button>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div ref={cardsGridRef} className="collections-grid">
          {filteredCollections.map((col) => (
            <CollectionCard
              key={col.id}
              collection={col}
              onInquire={onInquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
