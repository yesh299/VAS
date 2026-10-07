import React, { useEffect, useRef, useState } from 'react';
import { setupGlitterTrail } from '../animations/cursorAnimation';
import './CustomCursor.css';

export default function CustomCursor() {
  const glitterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;
    return setupGlitterTrail(glitterRef);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <canvas ref={glitterRef} className="cursor-glitter-canvas" />
    </div>
  );
}
