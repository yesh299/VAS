import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ExplodedPurseBackground.css';

/**
 * Full-screen floating exploded purse background covering the entire viewport/Hero section,
 * directly replicating the user's reference image with all 11+ floating luxury material pieces.
 */
export default function ExplodedPurseBackground({ className = '', interactive = true }) {
  const containerRef = useRef(null);
  const pieceRefs = useRef([]);

  // Exploded material pieces precisely matching the user's uploaded reference image
  const explodedPieces = [
    {
      id: 'burgundy-silk-large',
      name: 'Flowing Burgundy Silk Swatch',
      type: 'silk-banner',
      style: { top: '38%', left: '13%', width: '180px', height: '220px', zIndex: 4 },
      initialRot: -18,
      depth: 2.4,
      float: { y: 18, x: 10, rot: 5, dur: 4.2 },
    },
    {
      id: 'tan-leather-roll',
      name: 'Tan Leather Grain Gusset',
      type: 'tan-roll',
      style: { top: '44%', left: '38%', width: '140px', height: '180px', zIndex: 3 },
      initialRot: 28,
      depth: 1.6,
      float: { y: 14, x: -8, rot: 4, dur: 3.8 },
    },
    {
      id: 'black-edge-binding',
      name: 'Black Leather Trim Rod',
      type: 'black-rod',
      style: { top: '22%', left: '46%', width: '160px', height: '35px', zIndex: 3 },
      initialRot: 45,
      depth: 2.0,
      float: { y: -12, x: 6, rot: -3, dur: 4.5 },
    },
    {
      id: 'wood-toggle-peg',
      name: 'Burnished Wood Toggle',
      type: 'wood-peg',
      style: { top: '18%', left: '60%', width: '28px', height: '110px', zIndex: 2 },
      initialRot: 14,
      depth: 1.2,
      float: { y: 10, x: -5, rot: 3, dur: 3.2 },
    },
    {
      id: 'cream-leather-flap',
      name: 'Ivory Calfskin Flap',
      type: 'cream-flap',
      style: { top: '24%', left: '76%', width: '150px', height: '160px', zIndex: 3 },
      initialRot: -12,
      depth: 1.8,
      float: { y: -15, x: 8, rot: -4, dur: 3.9 },
    },
    {
      id: 'gold-hardware-ring',
      name: 'Gold Ring Carabiner',
      type: 'gold-ring',
      style: { top: '40%', left: '64%', width: '55px', height: '40px', zIndex: 2 },
      initialRot: -22,
      depth: 2.6,
      float: { y: 8, x: 4, rot: 6, dur: 2.8 },
    },
    {
      id: 'leather-cord-tassel',
      name: 'Leather Cord & Tassel',
      type: 'cord-tassel',
      style: { top: '54%', left: '59%', width: '90px', height: '50px', zIndex: 3 },
      initialRot: 32,
      depth: 1.5,
      float: { y: -10, x: -6, rot: -5, dur: 3.5 },
    },
    {
      id: 'burgundy-corner-frame',
      name: 'Burgundy Structured Corner',
      type: 'burgundy-corner',
      style: { top: '64%', left: '74%', width: '160px', height: '140px', zIndex: 4 },
      initialRot: 24,
      depth: 2.2,
      float: { y: 16, x: 8, rot: 4, dur: 4.4 },
    },
    {
      id: 'ivory-silk-swatch',
      name: 'Wavy Ivory Silk Swatch',
      type: 'ivory-silk',
      style: { top: '78%', left: '52%', width: '220px', height: '90px', zIndex: 3 },
      initialRot: -6,
      depth: 1.4,
      float: { y: -12, x: 10, rot: -3, dur: 4.8 },
    },
    {
      id: 'tan-corner-triangle',
      name: 'Tan Leather Corner',
      type: 'tan-corner',
      style: { top: '82%', left: '88%', width: '80px', height: '110px', zIndex: 2 },
      initialRot: 38,
      depth: 1.9,
      float: { y: 12, x: -7, rot: 5, dur: 3.6 },
    },
    {
      id: 'brass-stud-cluster-left',
      name: 'Polished Brass Studs',
      type: 'brass-studs',
      style: { top: '86%', left: '24%', width: '70px', height: '60px', zIndex: 2 },
      initialRot: 15,
      depth: 1.7,
      float: { y: -8, x: 5, rot: 4, dur: 3.0 },
    },
    {
      id: 'brass-stud-cluster-right',
      name: 'Brushed Gold Stud',
      type: 'brass-studs-sm',
      style: { top: '44%', left: '91%', width: '50px', height: '45px', zIndex: 2 },
      initialRot: -10,
      depth: 2.5,
      float: { y: 10, x: -6, rot: -5, dur: 2.9 },
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup continuous natural floating animations for all background pieces
      explodedPieces.forEach((p, idx) => {
        const el = pieceRefs.current[idx];
        if (!el) return;

        gsap.to(el, {
          y: `+=${p.float.y}`,
          x: `+=${p.float.x}`,
          rotation: `+=${p.float.rot}`,
          duration: p.float.dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.15,
        });
      });
    }, containerRef);

    // Mouse parallax tracking over full screen
    const handleMouseMove = (e) => {
      if (!interactive || !containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      explodedPieces.forEach((p, idx) => {
        const el = pieceRefs.current[idx];
        if (el) {
          const moveX = normX * 24 * p.depth;
          const moveY = normY * 24 * p.depth;
          el.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${p.initialRot}deg)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);

  return (
    <div ref={containerRef} className={`exploded-full-bg-container ${className}`} aria-hidden="true">
      {/* Warm Ambient Sunlight Gradient */}
      <div className="exploded-sunlight-radial" />

      {/* 11+ Exploded Floating Pieces across entire background */}
      {explodedPieces.map((piece, idx) => (
        <div
          key={piece.id}
          ref={(el) => (pieceRefs.current[idx] = el)}
          className={`exploded-piece-node piece-node-${piece.type}`}
          style={{
            ...piece.style,
            transform: `translate(-50%, -50%) rotate(${piece.initialRot}deg)`,
          }}
        >
          {renderExplodedPieceSVG(piece.type)}
        </div>
      ))}
    </div>
  );
}

/**
 * High-fidelity vector artwork for each piece in the user's reference image
 */
function renderExplodedPieceSVG(type) {
  switch (type) {
    case 'silk-banner':
      // The large dramatic burgundy silk ribbon on the left
      return (
        <svg viewBox="0 0 180 220" className="piece-svg-full">
          <defs>
            <linearGradient id="silkDrapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9C2D43" />
              <stop offset="35%" stopColor="#75182B" />
              <stop offset="70%" stopColor="#540E1E" />
              <stop offset="100%" stopColor="#360611" />
            </linearGradient>
            <filter id="silkShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor="#221A15" floodOpacity="0.28" />
            </filter>
          </defs>
          <g filter="url(#silkShadow)">
            <path
              d="M 40 10 C 90 20, 140 60, 110 110 C 80 160, 160 170, 170 200 C 130 215, 60 190, 40 140 C 20 90, 10 30, 40 10 Z"
              fill="url(#silkDrapeGrad)"
              stroke="#A8394F"
              strokeWidth="1.2"
            />
            {/* Satin Sheen Highlight Curves */}
            <path
              d="M 45 25 Q 95 65 80 120 Q 65 170 140 195"
              fill="none"
              stroke="#D86A82"
              strokeWidth="2.5"
              opacity="0.65"
            />
          </g>
        </svg>
      );

    case 'tan-roll':
      // Textured tan leather roll
      return (
        <svg viewBox="0 0 140 180" className="piece-svg-full">
          <defs>
            <linearGradient id="tanRollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E4C19A" />
              <stop offset="50%" stopColor="#C69E74" />
              <stop offset="100%" stopColor="#99724A" />
            </linearGradient>
          </defs>
          <g filter="url(#silkShadow)">
            <path
              d="M 45 15 L 120 40 Q 135 95 105 160 L 25 135 Q 15 75 45 15 Z"
              fill="url(#tanRollGrad)"
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

    case 'black-rod':
      // Black rolled edge binding / zip rod
      return (
        <svg viewBox="0 0 160 40" className="piece-svg-full">
          <defs>
            <linearGradient id="blackRodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A4440" />
              <stop offset="50%" stopColor="#221E1C" />
              <stop offset="100%" stopColor="#12100F" />
            </linearGradient>
          </defs>
          <g filter="url(#silkShadow)">
            <rect x="10" y="10" width="140" height="20" rx="4" fill="url(#blackRodGrad)" stroke="#6A625C" strokeWidth="1" />
            <line x1="20" y1="20" x2="140" y2="20" stroke="#D4BA93" strokeWidth="2" strokeDasharray="4 3" />
          </g>
        </svg>
      );

    case 'wood-peg':
      // Burnished wood toggle peg
      return (
        <svg viewBox="0 0 30 110" className="piece-svg-full">
          <defs>
            <linearGradient id="woodPegGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A87548" />
              <stop offset="50%" stopColor="#7B4E28" />
              <stop offset="100%" stopColor="#4F2E14" />
            </linearGradient>
          </defs>
          <g filter="url(#silkShadow)">
            <path d="M 8 10 L 22 10 L 18 100 L 12 100 Z" fill="url(#woodPegGrad)" rx="3" />
            <circle cx="15" cy="55" r="4" fill="#2B180A" />
          </g>
        </svg>
      );

    case 'cream-flap':
      // Ivory / cream calfskin flap
      return (
        <svg viewBox="0 0 150 160" className="piece-svg-full">
          <defs>
            <linearGradient id="creamFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="60%" stopColor="#F5ECE0" />
              <stop offset="100%" stopColor="#DCCEBA" />
            </linearGradient>
          </defs>
          <g filter="url(#silkShadow)">
            <path
              d="M 30 15 L 135 30 L 120 145 L 20 125 Z"
              fill="url(#creamFlapGrad)"
              stroke="#B89768"
              strokeWidth="1.2"
            />
            <path d="M 36 24 L 126 36 L 112 135 L 28 118 Z" fill="none" stroke="#9A7B4D" strokeWidth="1" strokeDasharray="4 3" opacity="0.75" />
          </g>
        </svg>
      );

    case 'gold-ring':
      // Gold hardware carabiner ring
      return (
        <svg viewBox="0 0 60 45" className="piece-svg-full">
          <defs>
            <linearGradient id="goldRingG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4DB" />
              <stop offset="40%" stopColor="#D4BA93" />
              <stop offset="100%" stopColor="#8A6A3A" />
            </linearGradient>
          </defs>
          <g filter="url(#silkShadow)">
            <ellipse cx="30" cy="22" rx="22" ry="14" fill="none" stroke="url(#goldRingG)" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'cord-tassel':
      // Leather tassel & toggle cord
      return (
        <svg viewBox="0 0 90 50" className="piece-svg-full">
          <g filter="url(#silkShadow)">
            <path d="M 10 25 Q 45 40 80 20" fill="none" stroke="#C49A6E" strokeWidth="4" strokeLinecap="round" />
            <rect x="70" y="14" width="14" height="14" rx="2" fill="#8C6239" />
          </g>
        </svg>
      );

    case 'burgundy-corner':
      // Burgundy structured frame corner with brass rivet
      return (
        <svg viewBox="0 0 160 140" className="piece-svg-full">
          <g filter="url(#silkShadow)">
            <path
              d="M 20 20 L 145 35 L 120 120 L 50 110 Z"
              fill="url(#silkDrapeGrad)"
              stroke="#A8394F"
              strokeWidth="1.5"
            />
            <rect x="60" y="55" width="25" height="30" rx="3" fill="url(#goldRingG)" stroke="#5A4321" />
          </g>
        </svg>
      );

    case 'ivory-silk':
      // Wavy ivory silk bottom layer
      return (
        <svg viewBox="0 0 220 90" className="piece-svg-full">
          <g filter="url(#silkShadow)">
            <path
              d="M 20 40 C 70 10, 130 65, 195 30 L 180 75 C 120 95, 60 50, 15 65 Z"
              fill="url(#creamFlapGrad)"
              stroke="#C5A880"
              strokeWidth="1"
            />
          </g>
        </svg>
      );

    case 'tan-corner':
      // Tan corner triangle
      return (
        <svg viewBox="0 0 80 110" className="piece-svg-full">
          <g filter="url(#silkShadow)">
            <path d="M 15 15 L 70 50 L 40 95 Z" fill="url(#tanRollGrad)" stroke="#875E37" />
          </g>
        </svg>
      );

    case 'brass-studs':
    case 'brass-studs-sm':
      // Gold studs cluster
      return (
        <svg viewBox="0 0 70 60" className="piece-svg-full">
          <g filter="url(#silkShadow)">
            <circle cx="25" cy="30" r="10" fill="url(#goldRingG)" />
            <circle cx="48" cy="22" r="7" fill="url(#goldRingG)" />
            <circle cx="42" cy="44" r="6" fill="url(#goldRingG)" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
