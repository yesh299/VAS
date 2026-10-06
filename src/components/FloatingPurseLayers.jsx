import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./FloatingPurseLayers.css";

/**
 * Realistic Interactive Floating Material Layers Component
 * Features the user's authentic reference artwork, continuous GSAP floating physics,
 * 3D mouse parallax tilt, and dynamic layer-by-layer hover annotations.
 */
export default function FloatingPurseLayers({
  isHero = false,
  className = "",
}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const cardRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    {
      id: "brass-zipper",
      num: "01",
      name: "24K Brushed Brass Zipper",
      subtitle:
        "Sculptural curved metallic teeth with hand-engraved monogram VAS pull tab",
      material: "Solid Jeweler-Grade Brass & 24K Satin Electroplate",
      pinTop: "21%",
      pinLeft: "78%",
      areaTop: "15%",
      areaHeight: "13%",
    },
    {
      id: "mulberry-silk",
      num: "02",
      name: "Handwoven Mulberry Silk Cushion",
      subtitle:
        "Cloud-soft contoured pillow flap woven by generational master artisans",
      material: "100% Organza Silk · Banaras Weaving Guild",
      pinTop: "34%",
      pinLeft: "28%",
      areaTop: "28%",
      areaHeight: "13%",
    },
    {
      id: "crimson-velvet",
      num: "03",
      name: "Deep Crimson Silk-Velvet",
      subtitle:
        "Tactile plush interlining providing acoustic dampening & rich warmth",
      material: "Venetian Silk-Cotton Velvet · Natural Crimson Dye",
      pinTop: "46%",
      pinLeft: "75%",
      areaTop: "41%",
      areaHeight: "13%",
    },
    {
      id: "olive-leather",
      num: "04",
      name: "Burnished Olive Box Calf Leather",
      subtitle:
        "Full-grain sculpted leather gusset with beeswax hand-burnished edges",
      material: "Tuscan Vegetable-Tanned Box Calf Leather",
      pinTop: "59%",
      pinLeft: "26%",
      areaTop: "54%",
      areaHeight: "14%",
    },
    {
      id: "raw-linen",
      num: "05",
      name: "Raw Organic Linen Base",
      subtitle:
        "Heavyweight organic linen foundation offering architectural structural rigidity",
      material: "Unbleached Organic European Flax Linen",
      pinTop: "73%",
      pinLeft: "72%",
      areaTop: "68%",
      areaHeight: "14%",
    },
    {
      id: "travertine-plinth",
      num: "06",
      name: "Roman Travertine Stone Plinth",
      subtitle:
        "Monolithic honed travertine stone pedestal with wild dried botanicals",
      material: "Honed Roman Travertine & Wild Flora",
      pinTop: "88%",
      pinLeft: "32%",
      areaTop: "82%",
      areaHeight: "18%",
    },
  ];

  // GSAP Gentle Sinusoidal Float Animation
  useEffect(() => {
    if (!stageRef.current) return;

    const floatTween = gsap.to(stageRef.current, {
      y: "-=12",
      rotation: 0.6,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => floatTween.kill();
  }, []);

  // 3D Mouse Parallax Tilt Effect
  const handleMouseMove = (e) => {
    if (!containerRef.current || !stageRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(stageRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    setActiveLayer(null);
    if (!stageRef.current) return;
    gsap.to(stageRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`floating-layers-showcase ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Floating Stage */}
      <div ref={stageRef} className="floating-stage-inner">
        {/* Ambient Lighting Halo */}
        <div className="layers-ambient-halo" aria-hidden="true" />

        {/* Authentic Material Layers Masterpiece Visual */}
        <div className="layers-visual-wrapper">
          <img
            src="/assets/products/material_layers_hero.png"
            alt="VAS Exploded Floating Material Layers Sculpture on Travertine Plinth"
            className="layers-photo-img"
          />
          <div className="layers-vignette-overlay" />
        </div>

        {/* Interactive Hover Zones & Pins for Each Layer */}
        <div className="layers-hotspot-container">
          {layers.map((layer) => {
            const isHovered = activeLayer?.id === layer.id;
            return (
              <div
                key={layer.id}
                className={`layer-interactive-zone ${isHovered ? "is-active-zone" : ""}`}
                style={{
                  top: layer.areaTop,
                  height: layer.areaHeight,
                }}
                onMouseEnter={() => setActiveLayer(layer)}
                onClick={() => setActiveLayer(layer)}
                data-cursor="pointer"
              >
                {/* Hotspot Pulsing Pin */}
                <div
                  className={`layer-hotspot-pin ${isHovered ? "pin-active" : ""}`}
                  style={{ top: "50%", left: layer.pinLeft }}
                >
                  <span className="pin-pulse" />
                  <span className="pin-core">
                    <span className="pin-number">{layer.num}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Dynamic Material Description Card (Appears on Hover) */}
      <div
        ref={cardRef}
        className={`floating-layer-info-card ${activeLayer ? "card-visible" : ""}`}
        aria-live="polite"
      >
        {activeLayer ? (
          <div className="info-card-content">
            <div className="info-card-header">
              <span className="info-badge-num">LAYER {activeLayer.num}</span>
              <span className="info-badge-dot" />
              <span className="info-badge-type">HAUTE MAROQUINERIE</span>
            </div>

            <h4 className="info-layer-title">{activeLayer.name}</h4>
            <p className="info-layer-sub">{activeLayer.subtitle}</p>

            <div className="info-material-pill">
              <span className="mat-sparkle">✦</span>
              <span className="mat-txt">{activeLayer.material}</span>
            </div>
          </div>
        ) : (
          <div className="info-card-hint">
            <span className="hint-icon">✦</span>
            <span className="hint-text">
              Hover over any floating material layer to inspect craft provenance
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
