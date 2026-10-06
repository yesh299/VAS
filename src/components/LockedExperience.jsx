import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './LockedExperience.css';

const VALID_KEY = "VAS2026";

/**
 * Implements the exact 3 states from the user's reference banner:
 * 1. Initial Load – Locked Experience (Calm floating orbit)
 * 2. Wrong Key – Error Message (Shake, turbulent disperse, red alert)
 * 3. Correct Key – Purse Assembly Animation (Golden energy vortex, pieces fly to center and physically assemble into the matching multi-material handbag)
 */
export default function LockedExperience({ onUnlockComplete }) {
  const [inputKey, setInputKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'error', 'assembling', 'assembled'

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const glowAuraRef = useRef(null);
  const vortexArcsRef = useRef(null);
  const assembledBagRef = useRef(null);

  // References for all 8 matching components
  const part1Ref = useRef(null); // Burgundy Flap
  const part2Ref = useRef(null); // Ivory Linen Panel
  const part3Ref = useRef(null); // Tan Leather Base Body
  const part4Ref = useRef(null); // Black Leather Handle with Gold Rings
  const part5Ref = useRef(null); // Brushed Gold Lock
  const part6Ref = useRef(null); // Red Tassel
  const part7Ref = useRef(null); // Black Zipper / Trim Rod
  const part8Ref = useRef(null); // Floating Gold Beads & Studs

  // Initial Positions matching Panel 1 of the user's reference image
  const partsConfig = [
    {
      id: 'burgundy-flap',
      name: 'Burgundy Top Flap',
      ref: part1Ref,
      initial: { top: '36%', left: '16%', rot: -22, scale: 1.0 },
      target: { top: '46%', left: '50%', rot: 0, scale: 1.0 },
      depth: 2.2,
    },
    {
      id: 'tan-leather-roll',
      name: 'Tan Leather Gusset & Base',
      ref: part2Ref,
      initial: { top: '45%', left: '36%', rot: 24, scale: 1.0 },
      target: { top: '56%', left: '50%', rot: 0, scale: 1.0 },
      depth: 1.6,
    },
    {
      id: 'black-rod',
      name: 'Black Edge Trim / Zipper',
      ref: part3Ref,
      initial: { top: '22%', left: '46%', rot: 42, scale: 0.95 },
      target: { top: '40%', left: '50%', rot: 0, scale: 0.9 },
      depth: 2.0,
    },
    {
      id: 'wood-toggle',
      name: 'Burnished Toggle Peg',
      ref: part4Ref,
      initial: { top: '18%', left: '60%', rot: 14, scale: 0.9 },
      target: { top: '48%', left: '50%', rot: 0, scale: 0.8 },
      depth: 1.4,
    },
    {
      id: 'ivory-linen',
      name: 'Ivory Woven Linen Panel',
      ref: part5Ref,
      initial: { top: '25%', left: '76%', rot: -14, scale: 1.05 },
      target: { top: '52%', left: '46%', rot: 0, scale: 1.0 },
      depth: 1.8,
    },
    {
      id: 'gold-hardware',
      name: 'Brushed Gold Monogram Clasp',
      ref: part6Ref,
      initial: { top: '40%', left: '64%', rot: -20, scale: 1.1 },
      target: { top: '54%', left: '52%', rot: 0, scale: 1.0 },
      depth: 2.8,
    },
    {
      id: 'burgundy-corner',
      name: 'Burgundy Structured Corner',
      ref: part7Ref,
      initial: { top: '64%', left: '74%', rot: 22, scale: 1.0 },
      target: { top: '50%', left: '54%', rot: 0, scale: 1.0 },
      depth: 2.1,
    },
    {
      id: 'red-tassel',
      name: 'Crimson Leather Tassel',
      ref: part8Ref,
      initial: { top: '54%', left: '58%', rot: 30, scale: 1.0 },
      target: { top: '62%', left: '42%', rot: 0, scale: 1.0 },
      depth: 1.9,
    },
  ];

  // 1. Idle Floating Animation (Panel 1)
  useEffect(() => {
    if (status === 'assembling' || status === 'assembled') return;

    const ctx = gsap.context(() => {
      partsConfig.forEach((p, idx) => {
        if (!p.ref.current) return;
        const dur = 3.2 + (idx % 4) * 0.5;
        const yOffset = 14 + (idx % 3) * 5;
        const rotOffset = 4 + (idx % 3) * 2;

        gsap.to(p.ref.current, {
          y: `+=${yOffset}`,
          x: idx % 2 === 0 ? '+=8' : '-=8',
          rotation: `+=${idx % 2 === 0 ? rotOffset : -rotOffset}`,
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.12,
        });
      });
    }, containerRef);

    // Mouse parallax
    const handleMouseMove = (e) => {
      if (status === 'assembling' || status === 'assembled') return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      partsConfig.forEach((p) => {
        if (p.ref.current) {
          const moveX = normX * 20 * p.depth;
          const moveY = normY * 20 * p.depth;
          p.ref.current.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${p.initial.rot}deg) scale(${p.initial.scale})`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [status]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmed = inputKey.trim().toUpperCase();

    if (trimmed === VALID_KEY) {
      triggerCorrectKeyAssembly();
    } else {
      triggerWrongKeyError();
    }
  };

  // 2. Wrong Key State (Panel 2)
  const triggerWrongKeyError = () => {
    setStatus('error');
    setErrorMsg('Invalid VAS Key');

    // Shake unlock box
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { x: -14 },
        {
          x: 14,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
          ease: 'sine.inOut',
          onComplete: () => {
            gsap.set(formRef.current, { x: 0 });
          },
        }
      );
    }

    // Pieces scatter slightly outward in turbulent reaction
    partsConfig.forEach((p, idx) => {
      if (!p.ref.current) return;
      const scatterX = idx % 2 === 0 ? 25 : -25;
      const scatterY = idx % 3 === 0 ? 20 : -20;
      gsap.to(p.ref.current, {
        x: `+=${scatterX}`,
        y: `+=${scatterY}`,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    });
  };

  // 3. Correct Key Assembly Timeline (Panel 3)
  const triggerCorrectKeyAssembly = () => {
    setStatus('assembling');
    setErrorMsg('');

    const allRefs = partsConfig.map((p) => p.ref.current).filter(Boolean);

    const tl = gsap.timeline({
      onComplete: () => {
        setStatus('assembled');
        // Cinematic pause and transition to main website
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.04,
          duration: 0.8,
          delay: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
            if (onUnlockComplete) onUnlockComplete();
          },
        });
      },
    });

    // Step A: Fade out bottom unlock form
    tl.to(formRef.current, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Step B: Ignite Golden Energy Vortex Arcs (Panel 3)
    if (vortexArcsRef.current) {
      tl.fromTo(
        vortexArcsRef.current,
        { opacity: 0, scale: 0.6, rotation: 0 },
        { opacity: 1, scale: 1.15, rotation: 180, duration: 1.6, ease: 'power2.inOut' },
        '-=0.2'
      );
    }

    // Step C: All floating pieces swirl and fly to center into matching handbag positions
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
          ease: 'power4.inOut',
        },
        i === 0 ? '-=1.4' : '<0.05'
      );
    });

    // Step D: Golden Energy Shockwave Flash
    if (glowAuraRef.current) {
      tl.fromTo(
        glowAuraRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 2.2, duration: 0.45, ease: 'power2.out' },
        '-=0.4'
      ).to(glowAuraRef.current, {
        opacity: 0,
        scale: 3.0,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    // Step E: Floating parts fuse smoothly into the completed matching handbag
    tl.to(
      allRefs,
      {
        opacity: 0,
        scale: 0.6,
        duration: 0.35,
        ease: 'power2.in',
      },
      '-=0.5'
    );

    // Step F: The Assembled Traditional Unique Luxury Purse emerges (Matching the exact colors!)
    if (assembledBagRef.current) {
      tl.fromTo(
        assembledBagRef.current,
        { opacity: 0, scale: 0.75, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: 'back.out(1.4)',
        },
        '-=0.4'
      )
      // Gentle floating breath
      .to(assembledBagRef.current, {
        scale: 1.03,
        y: -6,
        duration: 0.8,
        ease: 'sine.inOut',
      });
    }
  };

  const fillDemoKey = () => {
    setInputKey(VALID_KEY);
    setErrorMsg('');
  };

  return (
    <div ref={containerRef} className={`vas-locked-experience status-${status}`}>
      {/* Top Header Bar */}
      <header className="locked-header">
        <span className="locked-logo">VAS</span>
        <div className="locked-tagline">
          <span>More than a bag</span>
          <span className="tagline-sub">It's a story.</span>
        </div>
      </header>

      {/* Golden Energy Vortex Arcs (Panel 3) */}
      <div ref={vortexArcsRef} className="locked-vortex-arcs" aria-hidden="true">
        <svg viewBox="0 0 600 600" className="vortex-svg">
          <defs>
            <linearGradient id="vortexGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4DB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4BA93" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8A6A3A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 120 300 C 120 180, 240 100, 380 120 C 480 140, 520 250, 470 360 C 420 460, 280 500, 180 430" fill="none" stroke="url(#vortexGoldGrad)" strokeWidth="2.5" strokeDasharray="12 6" />
          <path d="M 180 260 C 200 160, 320 120, 420 180 C 500 240, 480 380, 390 440 C 290 490, 190 400, 220 310" fill="none" stroke="url(#vortexGoldGrad)" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Golden Aura Flash Shockwave */}
      <div ref={glowAuraRef} className="locked-golden-aura" aria-hidden="true" />

      {/* Floating Pieces Stage (Replicating exact colors of the bag) */}
      <div className="locked-floating-stage" aria-hidden="true">
        
        {/* 1. Burgundy Flap */}
        <div
          ref={part1Ref}
          className="locked-part-item part-burgundy-flap"
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
          className="locked-part-item part-tan-roll"
          style={{
            top: partsConfig[1].initial.top,
            left: partsConfig[1].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[1].initial.rot}deg)`,
          }}
        >
          {renderTanRollSVG()}
        </div>

        {/* 3. Black Edge Trim Rod */}
        <div
          ref={part3Ref}
          className="locked-part-item part-black-rod"
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
          className="locked-part-item part-wood-peg"
          style={{
            top: partsConfig[3].initial.top,
            left: partsConfig[3].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[3].initial.rot}deg)`,
          }}
        >
          {renderWoodPegSVG()}
        </div>

        {/* 5. Ivory Woven Linen Panel */}
        <div
          ref={part5Ref}
          className="locked-part-item part-ivory-linen"
          style={{
            top: partsConfig[4].initial.top,
            left: partsConfig[4].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[4].initial.rot}deg)`,
          }}
        >
          {renderIvoryLinenSVG()}
        </div>

        {/* 6. Gold Hardware Clasp & Rings */}
        <div
          ref={part6Ref}
          className="locked-part-item part-gold-clasp"
          style={{
            top: partsConfig[5].initial.top,
            left: partsConfig[5].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[5].initial.rot}deg)`,
          }}
        >
          {renderGoldClaspSVG()}
        </div>

        {/* 7. Burgundy Structured Corner Piece */}
        <div
          ref={part7Ref}
          className="locked-part-item part-burgundy-corner"
          style={{
            top: partsConfig[6].initial.top,
            left: partsConfig[6].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[6].initial.rot}deg)`,
          }}
        >
          {renderBurgundyCornerSVG()}
        </div>

        {/* 8. Red Tassel */}
        <div
          ref={part8Ref}
          className="locked-part-item part-red-tassel"
          style={{
            top: partsConfig[7].initial.top,
            left: partsConfig[7].initial.left,
            transform: `translate(-50%, -50%) rotate(${partsConfig[7].initial.rot}deg)`,
          }}
        >
          {renderRedTasselSVG()}
        </div>

      </div>

      {/* Assembled Multi-Material Luxury Handbag (Panel 3 - Exact Color & Part Match) */}
      <div ref={assembledBagRef} className="locked-assembled-masterpiece-stage">
        <div className="assembled-purse-halo" />

        {/* Assembled Handbag Artwork built from the exact pieces */}
        <div className="assembled-vector-bag-card">
          <svg viewBox="0 0 380 340" className="assembled-bag-svg">
            <defs>
              <linearGradient id="bagBurgundyFlap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9E2A3F" />
                <stop offset="50%" stopColor="#78192C" />
                <stop offset="100%" stopColor="#4A0C18" />
              </linearGradient>
              <linearGradient id="bagIvoryFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF9" />
                <stop offset="50%" stopColor="#F5ECE0" />
                <stop offset="100%" stopColor="#DCCEBA" />
              </linearGradient>
              <linearGradient id="bagTanBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0BC94" />
                <stop offset="60%" stopColor="#C29A70" />
                <stop offset="100%" stopColor="#966F48" />
              </linearGradient>
              <linearGradient id="bagBlackHandle" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3C3632" />
                <stop offset="100%" stopColor="#181514" />
              </linearGradient>
              <linearGradient id="bagGoldHardware" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF5DE" />
                <stop offset="35%" stopColor="#D4BA93" />
                <stop offset="70%" stopColor="#FFE7BD" />
                <stop offset="100%" stopColor="#8A6A3A" />
              </linearGradient>
              <filter id="bagGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#1C1814" floodOpacity="0.3" />
              </filter>
            </defs>

            <g filter="url(#bagGlowFilter)">
              {/* Black Rolled Handle with Gold Rings */}
              <path
                d="M 110 140 C 110 40, 270 40, 270 140"
                fill="none"
                stroke="url(#bagBlackHandle)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <rect x="98" y="125" width="24" height="18" rx="3" fill="url(#bagGoldHardware)" stroke="#5A4321" />
              <rect x="258" y="125" width="24" height="18" rx="3" fill="url(#bagGoldHardware)" stroke="#5A4321" />

              {/* Tan Leather Body Base & Side Gusset */}
              <path
                d="M 80 130 L 300 130 Q 330 130 335 160 L 350 290 Q 352 315 325 315 L 55 315 Q 28 315 30 290 L 45 160 Q 50 130 80 130 Z"
                fill="url(#bagTanBase)"
                stroke="#875E37"
                strokeWidth="1.5"
              />

              {/* Ivory Woven Linen Front Panel */}
              <path
                d="M 75 140 L 220 140 L 240 300 L 65 300 Z"
                fill="url(#bagIvoryFront)"
                stroke="#C5A880"
                strokeWidth="1.2"
              />
              {/* Linen saddle stitching */}
              <path d="M 82 148 L 214 148 L 232 292 L 72 292 Z" fill="none" stroke="#9A7B4D" strokeWidth="1" strokeDasharray="4 3" opacity="0.8" />

              {/* Burgundy Asymmetrical Flap (Matching Piece 1) */}
              <path
                d="M 70 130 L 310 130 Q 330 130 325 155 L 310 215 Q 295 240 260 250 L 190 275 Q 160 285 130 265 L 65 210 Q 45 190 50 160 Z"
                fill="url(#bagBurgundyFlap)"
                stroke="#A8394F"
                strokeWidth="1.5"
              />
              <path d="M 78 138 L 302 138 L 298 208 L 185 264 Q 160 274 135 256 L 60 202 Z" fill="none" stroke="#FFA8B8" strokeWidth="1" strokeDasharray="4 3" opacity="0.65" />

              {/* Brushed Gold Monogram Turnkey Clasp (Matching Piece 6) */}
              <rect x="160" y="225" width="55" height="65" rx="6" fill="url(#bagGoldHardware)" stroke="#5A4321" strokeWidth="1.5" />
              <text x="187" y="242" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" letterSpacing="1.5" fill="#3B2A14" fontWeight="700">VAS</text>
              <circle cx="187" cy="260" r="11" fill="#78192C" stroke="#FFF5DE" strokeWidth="1.2" />
              <rect x="184" y="252" width="6" height="16" rx="2" fill="url(#bagGoldHardware)" />

              {/* Crimson Tassel Hanging on the Left (Matching Piece 8) */}
              <path d="M 90 140 L 75 220" stroke="#8A6A3A" strokeWidth="2.5" />
              <rect x="68" y="220" width="14" height="12" rx="2" fill="url(#bagGoldHardware)" />
              <path d="M 75 232 L 60 295 L 90 295 Z" fill="url(#bagBurgundyFlap)" stroke="#A8394F" />
            </g>
          </svg>
        </div>

        {/* Exactly Requested User Typography Banner */}
        <div className="assembled-caption-box">
          <span className="assembled-title-badge">OBJECT 01 · ASSEMBLED</span>
          <p className="assembled-welcome-msg">Welcome to the inner world of VAS</p>
        </div>
      </div>

      {/* Center Bottom VAS Key Unlock Form */}
      <div ref={formRef} className="locked-bottom-form-wrap">
        <span className="locked-form-label">ENTER YOUR VAS KEY</span>

        <form onSubmit={handleSubmit} className="locked-input-group">
          <input
            type="text"
            value={inputKey}
            onChange={(e) => {
              setInputKey(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="VAS KEY"
            className={`locked-key-input ${status === 'error' ? 'error-state' : ''}`}
            autoComplete="off"
            spellCheck="false"
            aria-label="Enter VAS Key"
          />
          <button type="submit" className="locked-unlock-btn" data-cursor="pointer">
            UNLOCK
          </button>
        </form>

        {/* Error message matching Panel 2 */}
        {errorMsg && (
          <div className="locked-error-banner" role="alert">
            <span className="error-icon">▶</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Demo key hint */}
        <div className="locked-demo-hint">
          <span className="hint-txt">Demo Key:</span>
          <button
            type="button"
            onClick={fillDemoKey}
            className="demo-key-btn"
            title="Click to auto-fill VAS2026"
          >
            VAS2026
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Vector Piece Renderers with exact matching colors
// -------------------------------------------------------------

function renderBurgundyFlapSVG() {
  return (
    <svg viewBox="0 0 180 180" className="piece-svg-direct">
      <defs>
        <linearGradient id="pBurgundyFlap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9E2A3F" />
          <stop offset="40%" stopColor="#78192C" />
          <stop offset="100%" stopColor="#4A0C18" />
        </linearGradient>
        <filter id="pDropSh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#1C1814" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#pDropSh)">
        <path
          d="M 30 20 C 80 30, 140 70, 115 120 C 90 165, 165 140, 160 160 C 120 175, 50 150, 30 100 C 15 60, 10 35, 30 20 Z"
          fill="url(#pBurgundyFlap)"
          stroke="#A8394F"
          strokeWidth="1.2"
        />
        <path d="M 40 32 Q 90 70 75 125" fill="none" stroke="#FFA8B8" strokeWidth="2" opacity="0.6" />
      </g>
    </svg>
  );
}

function renderTanRollSVG() {
  return (
    <svg viewBox="0 0 140 180" className="piece-svg-direct">
      <defs>
        <linearGradient id="pTanRoll" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0BC94" />
          <stop offset="50%" stopColor="#C29A70" />
          <stop offset="100%" stopColor="#966F48" />
        </linearGradient>
      </defs>
      <g filter="url(#pDropSh)">
        <path d="M 45 15 L 120 40 Q 135 95 105 160 L 25 135 Q 15 75 45 15 Z" fill="url(#pTanRoll)" stroke="#875E37" strokeWidth="1.5" />
        <path d="M 52 24 L 115 45 L 100 148 L 34 128 Z" fill="none" stroke="#FFF3E2" strokeWidth="1" strokeDasharray="4 3" opacity="0.8" />
      </g>
    </svg>
  );
}

function renderBlackRodSVG() {
  return (
    <svg viewBox="0 0 160 40" className="piece-svg-direct">
      <g filter="url(#pDropSh)">
        <rect x="10" y="10" width="140" height="20" rx="4" fill="#221E1C" stroke="#4A4440" strokeWidth="1" />
        <line x1="20" y1="20" x2="140" y2="20" stroke="#D4BA93" strokeWidth="2" strokeDasharray="4 3" />
      </g>
    </svg>
  );
}

function renderWoodPegSVG() {
  return (
    <svg viewBox="0 0 30 110" className="piece-svg-direct">
      <g filter="url(#pDropSh)">
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
        <linearGradient id="pIvoryLinen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="60%" stopColor="#F5ECE0" />
          <stop offset="100%" stopColor="#DCCEBA" />
        </linearGradient>
      </defs>
      <g filter="url(#pDropSh)">
        <path d="M 30 15 L 135 30 L 120 145 L 20 125 Z" fill="url(#pIvoryLinen)" stroke="#B89768" strokeWidth="1.2" />
        <path d="M 36 24 L 126 36 L 112 135 L 28 118 Z" fill="none" stroke="#9A7B4D" strokeWidth="1" strokeDasharray="4 3" opacity="0.75" />
      </g>
    </svg>
  );
}

function renderGoldClaspSVG() {
  return (
    <svg viewBox="0 0 80 80" className="piece-svg-direct">
      <defs>
        <linearGradient id="pGoldClasp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5DE" />
          <stop offset="40%" stopColor="#D4BA93" />
          <stop offset="100%" stopColor="#8A6A3A" />
        </linearGradient>
      </defs>
      <g filter="url(#pDropSh)">
        <rect x="15" y="10" width="50" height="60" rx="6" fill="url(#pGoldClasp)" stroke="#5A4321" strokeWidth="1.5" />
        <text x="40" y="28" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fill="#3B2A14" fontWeight="700">VAS</text>
        <circle cx="40" cy="46" r="10" fill="#78192C" />
        <circle cx="40" cy="46" r="6" fill="url(#pGoldClasp)" />
      </g>
    </svg>
  );
}

function renderBurgundyCornerSVG() {
  return (
    <svg viewBox="0 0 160 140" className="piece-svg-direct">
      <g filter="url(#pDropSh)">
        <path d="M 20 20 L 145 35 L 120 120 L 50 110 Z" fill="url(#pBurgundyFlap)" stroke="#A8394F" strokeWidth="1.5" />
        <rect x="60" y="55" width="25" height="30" rx="3" fill="url(#pGoldClasp)" stroke="#5A4321" />
      </g>
    </svg>
  );
}

function renderRedTasselSVG() {
  return (
    <svg viewBox="0 0 70 120" className="piece-svg-direct">
      <g filter="url(#pDropSh)">
        <path d="M 35 10 L 35 50" stroke="#8A6A3A" strokeWidth="2.5" />
        <rect x="28" y="50" width="14" height="10" rx="2" fill="url(#pGoldClasp)" />
        <path d="M 35 60 L 15 110 L 55 110 Z" fill="url(#pBurgundyFlap)" stroke="#A8394F" />
      </g>
    </svg>
  );
}
