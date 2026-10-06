import { gsap } from 'gsap';

export function setupCursorTracking(cursorDotRef, cursorRingRef) {
  if (!cursorDotRef.current || !cursorRingRef.current) return;

  const dot = cursorDotRef.current;
  const ring = cursorRingRef.current;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let hasMoved = false;

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!hasMoved) {
      hasMoved = true;
      ringX = mouseX;
      ringY = mouseY;
      gsap.set([dot, ring], { opacity: 1 });
    }

    // Instant dot movement
    gsap.to(dot, {
      x: mouseX,
      y: mouseY,
      duration: 0.08,
      ease: 'power2.out',
    });
  };

  // Smooth lerp for outer ring using ticker
  const updateRing = () => {
    if (!hasMoved) return;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    gsap.set(ring, {
      x: ringX,
      y: ringY,
    });
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  gsap.ticker.add(updateRing);

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    gsap.ticker.remove(updateRing);
  };
}
