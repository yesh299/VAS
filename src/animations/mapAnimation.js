import { gsap } from 'gsap';

export function animateLocationPanelOpen(panelRef) {
  if (!panelRef.current) return;

  const elements = panelRef.current.querySelectorAll('.panel-anim-item');

  gsap.fromTo(
    panelRef.current,
    { opacity: 0, x: 40, scale: 0.98 },
    { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
  );

  if (elements.length > 0) {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.15,
      }
    );
  }
}

export function animateLocationTransition(panelRef, callback) {
  if (!panelRef.current) {
    if (callback) callback();
    return;
  }

  const elements = panelRef.current.querySelectorAll('.panel-anim-item');

  gsap.to(elements, {
    opacity: 0,
    y: -10,
    duration: 0.25,
    stagger: 0.03,
    ease: 'power2.in',
    onComplete: () => {
      if (callback) callback();
    },
  });
}
