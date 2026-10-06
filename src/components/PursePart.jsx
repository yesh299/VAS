import React from 'react';
import './PursePart.css';

/**
 * High-fidelity luxury vector component for individual handbag parts
 * precisely tailored to the user's reference palette:
 * Burgundy Silk, Olive Leather, Ivory Flap, Gold Hardware, and Rolled Handle.
 */
export default function PursePart({ id, name, forwardRef, style, isAssembled }) {
  const renderPartContent = () => {
    switch (id) {
      case 'body':
        // Part 1: Main Leather Handbag Base Body
        return (
          <svg viewBox="0 0 320 220" className="part-svg body-svg">
            <defs>
              <linearGradient id="bodyLeatherV" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF9" />
                <stop offset="50%" stopColor="#F5ECE0" />
                <stop offset="100%" stopColor="#DFD2C0" />
              </linearGradient>
              <linearGradient id="sideGussetOlive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A7A5C" />
                <stop offset="100%" stopColor="#B3A284" />
              </linearGradient>
              <filter id="pShadowFilter" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#1C1814" floodOpacity="0.22" />
              </filter>
            </defs>

            <g filter="url(#pShadowFilter)">
              {/* Sculptural Base */}
              <path
                d="M 60 40 L 260 40 Q 285 40 290 70 L 305 180 Q 308 205 285 205 L 35 205 Q 12 205 15 180 L 30 70 Q 35 40 60 40 Z"
                fill="url(#bodyLeatherV)"
                stroke="#C5A880"
                strokeWidth="1.5"
              />
              {/* Olive Side Panels */}
              <path
                d="M 30 70 L 65 55 L 75 195 L 35 205 Q 12 205 15 180 Z"
                fill="url(#sideGussetOlive)"
                opacity="0.85"
              />
              <path
                d="M 290 70 L 255 55 L 245 195 L 285 205 Q 308 205 305 180 Z"
                fill="url(#sideGussetOlive)"
                opacity="0.85"
              />
              {/* Saddle Stitching */}
              <path
                d="M 68 50 L 252 50 L 275 195 L 45 195 Z"
                fill="none"
                stroke="#B89768"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.75"
              />
              {/* Gold Base Studs */}
              <circle cx="55" cy="202" r="4" fill="#D4BA93" stroke="#9A7B4D" strokeWidth="1" />
              <circle cx="265" cy="202" r="4" fill="#D4BA93" stroke="#9A7B4D" strokeWidth="1" />
            </g>
          </svg>
        );

      case 'burgundy-silk':
        // Part 2: Dramatic Flowing Burgundy Silk Ribbon Swatch
        return (
          <svg viewBox="0 0 200 160" className="part-svg ribbon-svg">
            <defs>
              <linearGradient id="burgundySilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9C2D43" />
                <stop offset="40%" stopColor="#75182B" />
                <stop offset="80%" stopColor="#540E1E" />
                <stop offset="100%" stopColor="#360611" />
              </linearGradient>
            </defs>
            <g filter="url(#pShadowFilter)">
              <path
                d="M 25 35 C 75 15, 145 65, 120 115 C 95 160, 175 130, 185 150 C 145 165, 75 140, 45 100 C 20 65, 10 45, 25 35 Z"
                fill="url(#burgundySilkGrad)"
                stroke="#A8394F"
                strokeWidth="1.2"
              />
              <path
                d="M 35 45 Q 85 75 75 115 Q 65 140 145 145"
                fill="none"
                stroke="#D86A82"
                strokeWidth="2"
                opacity="0.65"
              />
            </g>
          </svg>
        );

      case 'flap':
        // Part 3: Architectural Front Curved Ivory Flap
        return (
          <svg viewBox="0 0 300 160" className="part-svg flap-svg">
            <defs>
              <linearGradient id="flapLeatherV" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF9" />
                <stop offset="60%" stopColor="#F5ECE0" />
                <stop offset="100%" stopColor="#E5D6C3" />
              </linearGradient>
            </defs>
            <g filter="url(#pShadowFilter)">
              <path
                d="M 50 15 L 250 15 Q 275 15 270 45 L 260 85 Q 255 105 235 110 L 170 145 Q 150 155 130 145 L 65 110 Q 45 105 40 85 L 30 45 Q 25 15 50 15 Z"
                fill="url(#flapLeatherV)"
                stroke="#C5A880"
                strokeWidth="1.5"
              />
              <path
                d="M 54 22 L 246 22 L 254 82 L 165 136 Q 150 144 135 136 L 46 82 Z"
                fill="none"
                stroke="#9A7B4D"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.8"
              />
            </g>
          </svg>
        );

      case 'lock':
        // Part 4: Champagne Gold Monogram Clasp & Lock
        return (
          <svg viewBox="0 0 120 120" className="part-svg lock-svg">
            <defs>
              <linearGradient id="goldMetallicV" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="25%" stopColor="#D4BA93" />
                <stop offset="50%" stopColor="#FFECC7" />
                <stop offset="75%" stopColor="#B89768" />
                <stop offset="100%" stopColor="#7A5F35" />
              </linearGradient>
            </defs>
            <g filter="url(#pShadowFilter)">
              <rect x="30" y="20" width="60" height="70" rx="8" fill="url(#goldMetallicV)" stroke="#7A5F35" strokeWidth="1.5" />
              <text x="60" y="38" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" letterSpacing="2" fill="#4A381F" fontWeight="700">
                VAS
              </text>
              <circle cx="60" cy="58" r="14" fill="#9A7B4D" stroke="#FFF2D6" strokeWidth="1.5" />
              <rect x="57" y="48" width="6" height="20" rx="3" fill="url(#goldMetallicV)" />
              <circle cx="38" cy="28" r="2.5" fill="#4A381F" />
              <circle cx="82" cy="28" r="2.5" fill="#4A381F" />
            </g>
          </svg>
        );

      case 'handle':
        // Part 5: Rolled Calfskin Leather Arch Handle
        return (
          <svg viewBox="0 0 280 180" className="part-svg handle-svg">
            <defs>
              <linearGradient id="handleLeatherV" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF9" />
                <stop offset="50%" stopColor="#EFE6DA" />
                <stop offset="100%" stopColor="#D4BA93" />
              </linearGradient>
            </defs>
            <g filter="url(#pShadowFilter)">
              <path
                d="M 50 150 C 50 40, 230 40, 230 150"
                fill="none"
                stroke="url(#handleLeatherV)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 65 140 C 65 55, 215 55, 215 140"
                fill="none"
                stroke="#B89768"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <rect x="40" y="135" width="20" height="16" rx="3" fill="url(#goldMetallicV)" stroke="#7A5F35" />
              <circle cx="50" cy="155" r="8" fill="none" stroke="url(#goldMetallicV)" strokeWidth="3.5" />
              <rect x="220" y="135" width="20" height="16" rx="3" fill="url(#goldMetallicV)" stroke="#7A5F35" />
              <circle cx="230" cy="155" r="8" fill="none" stroke="url(#goldMetallicV)" strokeWidth="3.5" />
            </g>
          </svg>
        );

      case 'chain':
        // Part 6: Faceted Luxury Gold Curb Chain
        return (
          <svg viewBox="0 0 260 120" className="part-svg chain-svg">
            <g filter="url(#pShadowFilter)">
              <path
                d="M 30 20 Q 80 90 130 95 Q 180 90 230 20"
                fill="none"
                stroke="url(#goldMetallicV)"
                strokeWidth="6"
                strokeDasharray="10 4"
                strokeLinecap="round"
              />
              <circle cx="30" cy="20" r="7" fill="url(#goldMetallicV)" />
              <circle cx="230" cy="20" r="7" fill="url(#goldMetallicV)" />
            </g>
          </svg>
        );

      case 'clochette':
        // Part 7: Burgundy Leather Clochette & Monogram Key Tag
        return (
          <svg viewBox="0 0 80 140" className="part-svg clochette-svg">
            <g filter="url(#pShadowFilter)">
              <path d="M 40 10 L 40 60" stroke="#B89768" strokeWidth="2.5" strokeLinecap="round" />
              <path
                d="M 40 60 L 20 115 Q 40 125 60 115 Z"
                fill="url(#burgundySilkGrad)"
                stroke="#A8394F"
                strokeWidth="1.2"
              />
              <text
                x="40"
                y="102"
                textAnchor="middle"
                fontFamily="Cinzel, serif"
                fontSize="11"
                fill="#FFF0D4"
                fontWeight="700"
              >
                V
              </text>
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={forwardRef}
      className={`purse-part purse-part-${id} ${isAssembled ? 'assembled' : 'floating'}`}
      style={style}
      data-part-id={id}
      aria-label={name}
    >
      <div className="part-inner">
        {renderPartContent()}
        <span className="part-tag">{name}</span>
      </div>
    </div>
  );
}
