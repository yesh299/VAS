import React, { useEffect, useRef } from 'react';
import PursePart from './PursePart';
import { startFloatingParts } from '../animations/purseAnimation';
import './FloatingPurse.css';

export default function FloatingPurse({ isAssembling, isUnlocked, partsRefs }) {
  const containerRef = useRef(null);
  const tweensRef = useRef([]);

  // Parts definition with initial floating spatial distributions
  const partsConfig = [
    {
      id: 'body',
      name: 'Main Calfskin Shell',
      refIndex: 0,
      initialStyle: { top: '35%', left: '46%', transform: 'translate(-50%, -50%) rotate(-4deg)' },
      depth: 1.2,
    },
    {
      id: 'flap',
      name: 'Curved Top Flap',
      refIndex: 1,
      initialStyle: { top: '15%', left: '22%', transform: 'translate(-50%, -50%) rotate(8deg)' },
      depth: 2.0,
    },
    {
      id: 'lock',
      name: 'Brushed Brass Clasp',
      refIndex: 2,
      initialStyle: { top: '65%', left: '26%', transform: 'translate(-50%, -50%) rotate(-12deg)' },
      depth: 2.8,
    },
    {
      id: 'handle',
      name: 'Rolled Arch Handle',
      refIndex: 3,
      initialStyle: { top: '12%', left: '76%', transform: 'translate(-50%, -50%) rotate(-6deg)' },
      depth: 1.6,
    },
    {
      id: 'chain',
      name: 'Faceted Curb Chain',
      refIndex: 4,
      initialStyle: { top: '70%', left: '74%', transform: 'translate(-50%, -50%) rotate(10deg)' },
      depth: 2.4,
    },
    {
      id: 'clochette',
      name: 'Leather Key Clochette',
      refIndex: 5,
      initialStyle: { top: '48%', left: '86%', transform: 'translate(-50%, -50%) rotate(15deg)' },
      depth: 3.0,
    },
  ];

  // Start floating animations on mount
  useEffect(() => {
    if (isAssembling || isUnlocked) return;

    const currentRefs = partsRefs.current.filter(Boolean);
    tweensRef.current = startFloatingParts(currentRefs);

    // Mouse parallax listener
    const handleMouseMove = (e) => {
      if (isAssembling || isUnlocked) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      partsConfig.forEach((cfg) => {
        const el = partsRefs.current[cfg.refIndex];
        if (el) {
          const moveX = mouseX * 18 * cfg.depth;
          const moveY = mouseY * 18 * cfg.depth;
          el.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      tweensRef.current.forEach((t) => t.kill());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAssembling, isUnlocked]);

  // Kill tweens when assembly begins
  useEffect(() => {
    if (isAssembling) {
      tweensRef.current.forEach((t) => t.kill());
    }
  }, [isAssembling]);

  return (
    <div
      ref={containerRef}
      className={`floating-purse-container ${isAssembling ? 'assembling' : ''} ${isUnlocked ? 'assembled' : ''}`}
      aria-hidden="true"
    >
      <div className="floating-ambient-particles">
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
      </div>

      {partsConfig.map((part) => (
        <PursePart
          key={part.id}
          id={part.id}
          name={part.name}
          forwardRef={(el) => (partsRefs.current[part.refIndex] = el)}
          style={part.initialStyle}
          isAssembled={isUnlocked}
        />
      ))}
    </div>
  );
}
