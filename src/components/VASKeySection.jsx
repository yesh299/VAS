import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VASKeySection.css";

gsap.registerPlugin(ScrollTrigger);

const VALID_KEYS = [
  "VAS-026-KEY",
  "VAS-202-601",
  "VAS-202-626",
  "VAS-KEY-2026",
  "VAS-202-6XX",
];
const DEMO_KEY = "VAS-026-KEY";

const formatKeyInput = (val) => {
  const clean = val
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 9);
  const parts = [];
  for (let i = 0; i < clean.length; i += 3) {
    parts.push(clean.slice(i, i + 3));
  }
  return parts.join("-");
};

export default function VASKeySection({ isUnlocked, onUnlockSuccess }) {
  const [inputKey, setInputKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle', 'error', 'assembling', 'assembled'

  const sectionRef = useRef(null);
  const bottomControlsRef = useRef(null);
  const glowAuraRef = useRef(null);
  const vortexArcsRef = useRef(null);
  const assembledBagRef = useRef(null);

  // References for all 9 matching exploded pieces
  const part1Ref = useRef(null); // Burgundy Silk Flap
  const part2Ref = useRef(null); // Tan Leather Roll
  const part3Ref = useRef(null); // Black Trim Rod
  const part4Ref = useRef(null); // Wood Toggle Peg
  const part5Ref = useRef(null); // Ivory Linen Panel
  const part6Ref = useRef(null); // Gold Monogram Clasp
  const part7Ref = useRef(null); // Crimson Tassel
  const part8Ref = useRef(null); // Burgundy Corner
  const part9Ref = useRef(null); // Wavy Ivory Swatch

  const partsConfig = [
    {
      id: "burgundy-flap",
      name: "Burgundy Silk Flap",
      ref: part1Ref,
      initial: { top: "38%", left: "20%", rot: -20, scale: 1.0 },
      target: { top: "48%", left: "50%", rot: 0, scale: 0.95 },
      depth: 2.2,
    },
    {
      id: "tan-leather-roll",
      name: "Tan Leather Gusset",
      ref: part2Ref,
      initial: { top: "46%", left: "33%", rot: 24, scale: 1.0 },
      target: { top: "56%", left: "50%", rot: 0, scale: 0.95 },
      depth: 1.6,
    },
    {
      id: "black-rod",
      name: "Black Edge Trim",
      ref: part3Ref,
      initial: { top: "22%", left: "44%", rot: 42, scale: 0.95 },
      target: { top: "40%", left: "50%", rot: 0, scale: 0.85 },
      depth: 2.0,
    },
    {
      id: "wood-toggle",
      name: "Wood Toggle Peg",
      ref: part4Ref,
      initial: { top: "18%", left: "58%", rot: 14, scale: 0.9 },
      target: { top: "48%", left: "50%", rot: 0, scale: 0.75 },
      depth: 1.4,
    },
    {
      id: "ivory-linen",
      name: "Ivory Linen Panel",
      ref: part5Ref,
      initial: { top: "24%", left: "72%", rot: -14, scale: 1.05 },
      target: { top: "52%", left: "46%", rot: 0, scale: 0.95 },
      depth: 1.8,
    },
    {
      id: "gold-hardware",
      name: "Gold Monogram Clasp",
      ref: part6Ref,
      initial: { top: "38%", left: "64%", rot: -20, scale: 1.1 },
      target: { top: "54%", left: "52%", rot: 0, scale: 0.95 },
      depth: 2.8,
    },
    {
      id: "red-tassel",
      name: "Crimson Tassel",
      ref: part7Ref,
      initial: { top: "54%", left: "58%", rot: 30, scale: 1.0 },
      target: { top: "62%", left: "42%", rot: 0, scale: 0.95 },
      depth: 1.9,
    },
    {
      id: "burgundy-corner",
      name: "Burgundy Corner",
      ref: part8Ref,
      initial: { top: "64%", left: "72%", rot: 22, scale: 1.0 },
      target: { top: "50%", left: "54%", rot: 0, scale: 0.95 },
      depth: 2.1,
    },
    {
      id: "ivory-swatch",
      name: "Ivory Base Swatch",
      ref: part9Ref,
      initial: { top: "72%", left: "46%", rot: -8, scale: 1.0 },
      target: { top: "58%", left: "50%", rot: 0, scale: 0.95 },
      depth: 1.5,
    },
  ];

  // Idle Floating Animation for Exploded Pieces
  useEffect(() => {
    if (status === "assembling" || status === "assembled" || isUnlocked) return;

    const ctx = gsap.context(() => {
      partsConfig.forEach((p, idx) => {
        if (!p.ref.current) return;
        const dur = 3.4 + (idx % 4) * 0.45;
        const yOffset = 12 + (idx % 3) * 6;
        const rotOffset = 3 + (idx % 3) * 2;

        gsap.to(p.ref.current, {
          y: `+=${yOffset}`,
          x: idx % 2 === 0 ? "+=7" : "-=7",
          rotation: `+=${idx % 2 === 0 ? rotOffset : -rotOffset}`,
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.1,
        });
      });
    }, sectionRef);

    // Mouse parallax over the VAS Key Section
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    const handleMouseMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        if (status === "assembling" || status === "assembled" || isUnlocked) return;
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const normX = (pointerX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (pointerY - (rect.top + rect.height / 2)) / (rect.height / 2);
        partsConfig.forEach((p) => {
          if (p.ref.current) {
            const moveX = normX * 18 * p.depth;
            const moveY = normY * 18 * p.depth;
            p.ref.current.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${p.initial.rot}deg) scale(${p.initial.scale})`;
          }
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [status, isUnlocked]);

  // Form Submit Handler
  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const formatted = inputKey.trim().toUpperCase();
    const rawClean = formatted.replace(/[^A-Z0-9]/g, "");

    if (
      VALID_KEYS.includes(formatted) ||
      rawClean === "VAS2026" ||
      rawClean === "VAS026KEY" ||
      rawClean === "VAS202601" ||
      (rawClean.startsWith("VAS") && rawClean.length === 9)
    ) {
      triggerAssembly();
    } else {
      triggerWrongKey();
    }
  };

  // State 2: Wrong Key (Panel 2 from User Reference)
  const triggerWrongKey = () => {
    setStatus("error");
    setErrorMsg("Invalid VAS Key");

    if (bottomControlsRef.current) {
      gsap.fromTo(
        bottomControlsRef.current,
        { x: -14 },
        {
          x: 14,
          duration: 0.07,
          repeat: 5,
          yoyo: true,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(bottomControlsRef.current, { x: 0 });
          },
        },
      );
    }

    // Pieces scatter & tumble outwards
    partsConfig.forEach((p, idx) => {
      if (!p.ref.current) return;
      const scatterX = idx % 2 === 0 ? 30 : -30;
      const scatterY = idx % 3 === 0 ? 25 : -25;
      gsap.to(p.ref.current, {
        x: `+=${scatterX}`,
        y: `+=${scatterY}`,
        rotation: `+=${idx % 2 === 0 ? 15 : -15}`,
        duration: 0.45,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    });
  };

  // State 3: Correct Key Assembly (Panel 3 from User Reference)
  const triggerAssembly = () => {
    setStatus("assembling");
    setErrorMsg("");

    const allRefs = partsConfig.map((p) => p.ref.current).filter(Boolean);

    const tl = gsap.timeline({
      onComplete: () => {
        setStatus("assembled");
        if (onUnlockSuccess) {
          onUnlockSuccess();
        }
      },
    });

    // 1. Fade out bottom input controls to focus on the center stage
    if (bottomControlsRef.current) {
      tl.to(bottomControlsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    // 2. Ignite Golden Vortex Energy Arcs
    if (vortexArcsRef.current) {
      tl.fromTo(
        vortexArcsRef.current,
        { opacity: 0, scale: 0.5, rotation: 0 },
        {
          opacity: 1,
          scale: 1.2,
          rotation: 220,
          duration: 1.7,
          ease: "power2.inOut",
        },
        "-=0.2",
      );
    }

    // 3. Floating pieces fly and swirl inward toward center stage
    partsConfig.forEach((p, i) => {
      if (!p.ref.current) return;
      tl.to(
        p.ref.current,
        {
          top: p.target.top,
          left: p.target.left,
          x: 0,
          y: 0,
          rotation: p.target.rot,
          scale: p.target.scale,
          duration: 1.6,
          ease: "power4.inOut",
        },
        i === 0 ? "-=1.5" : "<0.04",
      );
    });

    // 4. Golden Aura Flash Shockwave
    if (glowAuraRef.current) {
      tl.fromTo(
        glowAuraRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 2.4, duration: 0.5, ease: "power2.out" },
        "-=0.4",
      ).to(glowAuraRef.current, {
        opacity: 0,
        scale: 3.2,
        duration: 0.6,
        ease: "power2.in",
      });
    }

    // 5. Floating parts dissolve into the assembled handbag
    tl.to(
      allRefs,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.35,
        ease: "power2.in",
      },
      "-=0.45",
    );

    // 6. Assembled Handbag emerges with exact user-requested caption
    if (assembledBagRef.current) {
      tl.fromTo(
        assembledBagRef.current,
        { opacity: 0, scale: 0.75, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
        },
        "-=0.35",
      );
    }
  };

  return (
    <section
      id="vas-key"
      ref={sectionRef}
      className={`vas-key-section status-${status}`}
    >
      {/* Warm Atmospheric Luxury Studio Spotlight */}
      <div className="vaskey-backdrop-glow" aria-hidden="true" />

      {/* Top Header Row */}
      <div className="vaskey-top-header container-luxury">
        <span className="vaskey-header-logo">VAS</span>
        <span className="vaskey-header-tagline">
          CARRY YOUR SPACE · OBJECT DISCOVERY
        </span>
      </div>

      {/* Golden Energy Vortex Arcs */}
      <div
        ref={vortexArcsRef}
        className="vaskey-vortex-arcs"
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 600" className="vortex-svg">
          <defs>
            <linearGradient
              id="vaskeyVortexGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFF7E6" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#D4BA93" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8A6A3A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 110 300 C 110 160, 230 80, 390 100 C 500 120, 540 240, 480 370 C 420 480, 260 520, 160 440"
            fill="none"
            stroke="url(#vaskeyVortexGrad)"
            strokeWidth="3"
            strokeDasharray="14 7"
          />
          <path
            d="M 170 250 C 190 140, 330 100, 440 160 C 520 220, 500 390, 400 450 C 290 500, 180 410, 210 300"
            fill="none"
            stroke="url(#vaskeyVortexGrad)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Golden Aura Flash Shockwave */}
      <div
        ref={glowAuraRef}
        className="vaskey-golden-aura"
        aria-hidden="true"
      />

      {/* Central 3D Floating Stage for Exploded Purse Pieces */}
      <div className="vaskey-floating-stage" aria-hidden="true">
        {/* 1. Burgundy Silk Flap */}
        <div
          ref={part1Ref}
          className="vaskey-part-item part-burgundy-flap"
          style={{
            top: partsConfig[0].initial.top,
            left: partsConfig[0].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[0].initial.rot}deg)`,
          }}
        >
          {renderBurgundyFlapSVG()}
        </div>

        {/* 2. Tan Leather Roll */}
        <div
          ref={part2Ref}
          className="vaskey-part-item part-tan-roll"
          style={{
            top: partsConfig[1].initial.top,
            left: partsConfig[1].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[1].initial.rot}deg)`,
          }}
        >
          {renderTanRollSVG()}
        </div>

        {/* 3. Black Edge Trim */}
        <div
          ref={part3Ref}
          className="vaskey-part-item part-black-rod"
          style={{
            top: partsConfig[2].initial.top,
            left: partsConfig[2].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[2].initial.rot}deg)`,
          }}
        >
          {renderBlackRodSVG()}
        </div>

        {/* 4. Wood Toggle Peg */}
        <div
          ref={part4Ref}
          className="vaskey-part-item part-wood-peg"
          style={{
            top: partsConfig[3].initial.top,
            left: partsConfig[3].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[3].initial.rot}deg)`,
          }}
        >
          {renderWoodPegSVG()}
        </div>

        {/* 5. Ivory Woven Linen */}
        <div
          ref={part5Ref}
          className="vaskey-part-item part-ivory-linen"
          style={{
            top: partsConfig[4].initial.top,
            left: partsConfig[4].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[4].initial.rot}deg)`,
          }}
        >
          {renderIvoryLinenSVG()}
        </div>

        {/* 6. Gold Hardware Clasp */}
        <div
          ref={part6Ref}
          className="vaskey-part-item part-gold-clasp"
          style={{
            top: partsConfig[5].initial.top,
            left: partsConfig[5].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[5].initial.rot}deg)`,
          }}
        >
          {renderGoldClaspSVG()}
        </div>

        {/* 7. Crimson Tassel */}
        <div
          ref={part7Ref}
          className="vaskey-part-item part-red-tassel"
          style={{
            top: partsConfig[6].initial.top,
            left: partsConfig[6].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[6].initial.rot}deg)`,
          }}
        >
          {renderRedTasselSVG()}
        </div>

        {/* 8. Burgundy Structured Corner */}
        <div
          ref={part8Ref}
          className="vaskey-part-item part-burgundy-corner"
          style={{
            top: partsConfig[7].initial.top,
            left: partsConfig[7].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[7].initial.rot}deg)`,
          }}
        >
          {renderBurgundyCornerSVG()}
        </div>

        {/* 9. Wavy Ivory Swatch */}
        <div
          ref={part9Ref}
          className="vaskey-part-item part-ivory-swatch"
          style={{
            top: partsConfig[8].initial.top,
            left: partsConfig[8].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[8].initial.rot}deg)`,
          }}
        >
          {renderIvorySwatchSVG()}
        </div>
      </div>

      {/* Assembled Multi-Material Luxury Handbag Result (High-Fashion Vitrine Showcase) */}
      <div ref={assembledBagRef} className="vaskey-assembled-masterpiece-stage">
        <div className="assembled-purse-halo" />

        {/* Unified Luxury Vitrine Exhibit Card */}
        <div className="assembled-vitrine-card">
          {/* Top Atelier Hallmark Header */}
          <div className="assembled-vitrine-header">
            <div className="vitrine-seal-badge">
              <span className="seal-sparkle">✦</span>
              <span className="seal-txt">ATELIER MASTERPIECE · UNLOCKED</span>
              <span className="seal-sparkle">✦</span>
            </div>
          </div>

          {/* Gilded Photo Display Frame */}
          <div className="assembled-photo-bag-card">
            <img
              src="/assets/products/assembled_purse_hero.jpg"
              alt="VAS Signature Handcrafted Ivory & Crimson Envelope Clutch on Travertine Plinth"
              className="assembled-photo-img"
            />
            <div className="assembled-photo-glow" />
            <div className="assembled-photo-tag-overlay">
              <span className="photo-tag-num">OBJECT 01</span>
              <span className="photo-tag-title">SIGNATURE ENVELOPE CLUTCH</span>
            </div>
          </div>

          {/* Editorial Story & Direct Unveil Action */}
          <div className="assembled-vitrine-body">
            <div className="assembled-vitrine-meta">
              <span className="assembled-title-badge">
                OBJECT 01 · ASSEMBLED
              </span>
              <h3 className="assembled-headline">
                Welcome to the inner world of VAS
              </h3>
              <p className="assembled-subtext">
                Sculpted from organic linen, Venetian silk-velvet &
                hand-burnished box calf leather.
              </p>
            </div>

            {/* Material Badges Row */}
            <div className="assembled-materials-chips">
              <span className="mat-chip">Raw Linen</span>
              <span className="mat-dot">·</span>
              <span className="mat-chip">Crimson Velvet</span>
              <span className="mat-dot">·</span>
              <span className="mat-chip">24K Brass</span>
              <span className="mat-dot">·</span>
              <span className="mat-chip">Travertine</span>
            </div>

            {/* Ultra-Luxury Gold-Accented CTA */}
            <a
              href="#map-section"
              className="assembled-explore-cta"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("map-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="cta-sparkle-icon">◆</span>
              <span>EXPLORE CRAFT MAP & INNER ARCHIVES</span>
              <span className="cta-arrow-icon">↓</span>
              <span className="cta-shimmer-sweep" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Controls Area (Enhanced Luxury Atelier Composition) */}
      <div ref={bottomControlsRef} className="vaskey-bottom-controls-wrap">
        <div className="vaskey-label-badge">
          <span className="label-line-left" />
          <svg viewBox="0 0 24 24" className="label-key-icon" fill="none">
            <circle
              cx="8.5"
              cy="12"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="8.5" cy="12" r="1.8" fill="currentColor" />
            <path
              d="M13 12L21 12M17 12L17 15.5M20.5 12L20.5 15.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span className="vaskey-bottom-label">ENTER YOUR VAS KEY</span>
          <span className="label-line-right" />
        </div>

        {/* Key Entry Form */}
        {status !== "assembling" && status !== "assembled" && (
          <form onSubmit={handleUnlockSubmit} className="vaskey-pill-form">
            <div
              className={`vaskey-pill-group ${status === "error" ? "pill-error" : ""}`}
            >
              <div className="input-prefix-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" className="prefix-svg" fill="none">
                  <circle
                    cx="7.5"
                    cy="10"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle cx="7.5" cy="10" r="1.5" fill="currentColor" />
                  <path
                    d="M11.5 10 L 17 10 M 14 10 L 14 13 M 16.5 10 L 16.5 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={inputKey}
                onChange={(e) => {
                  const formatted = formatKeyInput(e.target.value);
                  setInputKey(formatted);
                  if (errorMsg) setErrorMsg("");
                }}
                maxLength={11}
                placeholder="XXX-XXX-XXX"
                aria-label="Enter VAS Key (Format: XXX-XXX-XXX)"
                className="vaskey-pill-input"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="vaskey-pill-btn"
                data-cursor="pointer"
              >
                <span className="btn-text">UNLOCK</span>
                <span className="btn-arrow-icon">→</span>
                <span className="btn-shimmer-sweep" aria-hidden="true" />
              </button>
            </div>

            {/* Error message (State 2: Wrong Key Error Message) */}
            {errorMsg && (
              <p className="vaskey-error-msg" role="alert">
                <span className="error-icon">▶</span>
                <span>{errorMsg}</span>
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Vector Piece Renderers with exact matching colors
// -------------------------------------------------------------

function renderBurgundyFlapSVG() {
  return (
    <svg viewBox="0 0 180 180" className="piece-svg-direct">
      <defs>
        <linearGradient
          id="vkpBurgundyFlap"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#9E2A3F" />
          <stop offset="40%" stopColor="#78192C" />
          <stop offset="100%" stopColor="#4A0C18" />
        </linearGradient>
        <filter id="vkpDropSh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="#1C1814"
            floodOpacity="0.22"
          />
        </filter>
      </defs>
      <g filter="url(#vkpDropSh)">
        <path
          d="M 30 20 C 80 30, 140 70, 115 120 C 90 165, 165 140, 160 160 C 120 175, 50 150, 30 100 C 15 60, 10 35, 30 20 Z"
          fill="url(#vkpBurgundyFlap)"
          stroke="#A8394F"
          strokeWidth="1.2"
        />
        <path
          d="M 40 32 Q 90 70 75 125"
          fill="none"
          stroke="#FFA8B8"
          strokeWidth="2"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

function renderTanRollSVG() {
  return (
    <svg viewBox="0 0 140 180" className="piece-svg-direct">
      <defs>
        <linearGradient id="vkpTanRoll" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0BC94" />
          <stop offset="50%" stopColor="#C29A70" />
          <stop offset="100%" stopColor="#966F48" />
        </linearGradient>
      </defs>
      <g filter="url(#vkpDropSh)">
        <path
          d="M 45 15 L 120 40 Q 135 95 105 160 L 25 135 Q 15 75 45 15 Z"
          fill="url(#vkpTanRoll)"
          stroke="#875E37"
          strokeWidth="1.5"
        />
        <path
          d="M 52 24 L 115 45 L 100 148 L 34 128 Z"
          fill="none"
          stroke="#FFF3E2"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

function renderBlackRodSVG() {
  return (
    <svg viewBox="0 0 160 40" className="piece-svg-direct">
      <g filter="url(#vkpDropSh)">
        <rect
          x="10"
          y="10"
          width="140"
          height="20"
          rx="4"
          fill="#221E1C"
          stroke="#4A4440"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="20"
          x2="140"
          y2="20"
          stroke="#D4BA93"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      </g>
    </svg>
  );
}

function renderWoodPegSVG() {
  return (
    <svg viewBox="0 0 30 110" className="piece-svg-direct">
      <g filter="url(#vkpDropSh)">
        <path d="M 8 10 L 22 10 L 18 100 L 12 100 Z" fill="#7B4E28" rx="3" />
        <circle cx="15" cy="55" r="4" fill="#2B180A" />
      </g>
    </svg>
  );
}

function renderIvoryLinenSVG() {
  return (
    <svg viewBox="0 0 150 160" className="piece-svg-direct">
      <defs>
        <linearGradient id="vkpIvoryLinen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="60%" stopColor="#F5ECE0" />
          <stop offset="100%" stopColor="#DCCEBA" />
        </linearGradient>
      </defs>
      <g filter="url(#vkpDropSh)">
        <path
          d="M 30 15 L 135 30 L 120 145 L 20 125 Z"
          fill="url(#vkpIvoryLinen)"
          stroke="#B89768"
          strokeWidth="1.2"
        />
        <path
          d="M 36 24 L 126 36 L 112 135 L 28 118 Z"
          fill="none"
          stroke="#9A7B4D"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.75"
        />
      </g>
    </svg>
  );
}

function renderGoldClaspSVG() {
  return (
    <svg viewBox="0 0 80 80" className="piece-svg-direct">
      <defs>
        <linearGradient id="vkpGoldClasp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5DE" />
          <stop offset="40%" stopColor="#D4BA93" />
          <stop offset="100%" stopColor="#8A6A3A" />
        </linearGradient>
      </defs>
      <g filter="url(#vkpDropSh)">
        <rect
          x="15"
          y="10"
          width="50"
          height="60"
          rx="6"
          fill="url(#vkpGoldClasp)"
          stroke="#5A4321"
          strokeWidth="1.5"
        />
        <text
          x="40"
          y="28"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="8"
          fill="#3B2A14"
          fontWeight="700"
        >
          VAS
        </text>
        <circle cx="40" cy="46" r="10" fill="#78192C" />
        <circle cx="40" cy="46" r="6" fill="url(#vkpGoldClasp)" />
      </g>
    </svg>
  );
}

function renderBurgundyCornerSVG() {
  return (
    <svg viewBox="0 0 160 140" className="piece-svg-direct">
      <g filter="url(#vkpDropSh)">
        <path
          d="M 20 20 L 145 35 L 120 120 L 50 110 Z"
          fill="url(#vkpBurgundyFlap)"
          stroke="#A8394F"
          strokeWidth="1.5"
        />
        <rect
          x="60"
          y="55"
          width="25"
          height="30"
          rx="3"
          fill="url(#vkpGoldClasp)"
          stroke="#5A4321"
        />
      </g>
    </svg>
  );
}

function renderRedTasselSVG() {
  return (
    <svg viewBox="0 0 70 120" className="piece-svg-direct">
      <g filter="url(#vkpDropSh)">
        <path d="M 35 10 L 35 50" stroke="#8A6A3A" strokeWidth="2.5" />
        <rect
          x="28"
          y="50"
          width="14"
          height="10"
          rx="2"
          fill="url(#vkpGoldClasp)"
        />
        <path
          d="M 35 60 L 15 110 L 55 110 Z"
          fill="url(#vkpBurgundyFlap)"
          stroke="#A8394F"
        />
      </g>
    </svg>
  );
}

function renderIvorySwatchSVG() {
  return (
    <svg viewBox="0 0 200 90" className="piece-svg-direct">
      <g filter="url(#vkpDropSh)">
        <path
          d="M 15 45 Q 60 15 110 50 Q 160 85 185 45 L 175 65 Q 150 95 100 65 Q 50 35 10 65 Z"
          fill="url(#vkpIvoryLinen)"
          stroke="#C5A880"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
