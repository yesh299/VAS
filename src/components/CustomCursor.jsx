import React, { useEffect, useRef, useState } from 'react';
import { setupCursorTracking } from '../animations/cursorAnimation';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);
    const cleanup = setupCursorTracking(dotRef, ringRef);

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorVariant(type);
        setCursorText(text);
      } else {
        const isClickable = e.target.closest('button, a, input, [role="button"]');
        if (isClickable) {
          setCursorVariant('pointer');
          setCursorText('');
        } else {
          setCursorVariant('default');
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
      setCursorText('');
    };

    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <div
        ref={dotRef}
        className={`cursor-dot cursor-${cursorVariant}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring cursor-ring-${cursorVariant}`}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </div>
  );
}
