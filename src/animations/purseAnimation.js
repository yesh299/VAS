import { gsap } from 'gsap';

/**
 * Creates idle floating animations for all individual purse parts
 */
export function startFloatingParts(partsRefs) {
  const tweens = [];

  partsRefs.forEach((part, index) => {
    if (!part) return;

    // Custom floating trajectories for each part
    const yDistance = 12 + (index % 3) * 6;
    const xDistance = 6 + (index % 2) * 5;
    const rot = 3 + (index % 4) * 2;
    const duration = 2.8 + index * 0.4;
    const delay = index * 0.15;

    const tween = gsap.to(part, {
      y: `+=${yDistance}`,
      x: index % 2 === 0 ? `+=${xDistance}` : `-=${xDistance}`,
      rotation: index % 2 === 0 ? `+=${rot}` : `-=${rot}`,
      duration: duration,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    tweens.push(tween);
  });

  return tweens;
}

/**
 * Animates the complete physical assembly of the purse components
 * @param {Array} partsRefs - References to all floating parts
 * @param {Object} completedRef - Reference to the completed purse container
 * @param {Object} glowRef - Reference to the golden flash / aura element
 * @param {Function} onComplete - Callback after cinematic pause
 */
export function assemblePurse({
  partsRefs,
  completedRef,
  glowRef,
  containerRef,
  onAssemblyComplete,
}) {
  const tl = gsap.timeline({
    onComplete: onAssemblyComplete,
  });

  // 1. Gather and snap parts to center coordinates
  // Parts converge from their dispersed floating points to (x:0, y:0, rotation:0, scale:1)
  tl.to(partsRefs, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    duration: 1.8,
    stagger: {
      amount: 0.35,
      from: 'random',
    },
    ease: 'power4.out',
  });

  // 2. Convergence impact: Golden shockwave flash & subtle pulse
  if (glowRef?.current) {
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1.8, duration: 0.4, ease: 'power2.out' },
      '-=0.4'
    ).to(glowRef.current, {
      opacity: 0,
      scale: 2.2,
      duration: 0.6,
      ease: 'power2.in',
    });
  }

  // 3. Completed purse reveal with soft shadow, glow, and subtle scale
  if (completedRef?.current) {
    tl.to(
      completedRef.current,
      {
        opacity: 1,
        scale: 1,
        filter: 'drop-shadow(0 20px 40px rgba(184, 151, 104, 0.45))',
        duration: 0.6,
        ease: 'back.out(1.2)',
      },
      '-=0.5'
    );

    // Cinematic pause & breath (0.8s hold)
    tl.to(
      completedRef.current,
      {
        scale: 1.04,
        y: -10,
        duration: 0.8,
        ease: 'sine.inOut',
      }
    );
  }

  // 4. Cinematic transition: purse elevates and gracefully unveils unlocked universe
  if (containerRef?.current) {
    tl.to(containerRef.current, {
      scale: 1.08,
      opacity: 0.9,
      duration: 0.6,
      ease: 'power3.inOut',
    });
  }

  return tl;
}
