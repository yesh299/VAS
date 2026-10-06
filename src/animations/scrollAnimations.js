import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal(element, options = {}) {
  if (!element) return;

  const {
    y = 40,
    opacity = 0,
    duration = 1.0,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
  } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: start,
      toggleActions: 'play none none none',
    },
    y: y,
    opacity: opacity,
    duration: duration,
    delay: delay,
    stagger: stagger,
    ease: 'power3.out',
  });
}

export function initParallax(element, trigger, speed = 0.2) {
  if (!element || !trigger) return;

  return gsap.to(element, {
    scrollTrigger: {
      trigger: trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    y: speed * 100,
    ease: 'none',
  });
}
