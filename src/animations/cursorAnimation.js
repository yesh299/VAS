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
  const moveDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
  const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });

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
    moveDot(mouseX);
    moveDotY(mouseY);
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
