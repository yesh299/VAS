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

export function setupGlitterTrail(canvasRef) {
  const canvas = canvasRef.current;
  if (!canvas) return undefined;

  const context = canvas.getContext('2d');
  if (!context) return undefined;

  const particles = [];
  const maxParticles = 70;
  let width = 0;
  let height = 0;
  let lastX = -100;
  let lastY = -100;
  let targetX = -100;
  let targetY = -100;
  let trailX = -100;
  let trailY = -100;
  let animationFrame = 0;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const addParticle = (x, y) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.55;
    particles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.18,
      size: 0.7 + Math.random() * 1.7,
      life: 1,
      decay: 0.018 + Math.random() * 0.016,
      hue: Math.random() > 0.25 ? '218, 177, 104' : '255, 246, 218',
    });
    if (particles.length > maxParticles) particles.shift();
  };

  const handlePointerMove = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    const distance = Math.hypot(targetX - lastX, targetY - lastY);
    if (distance < 10) return;
    lastX = targetX;
    lastY = targetY;
    addParticle(targetX, targetY);
    if (distance > 32) addParticle(event.clientX, event.clientY);
  };

  const render = () => {
    context.clearRect(0, 0, width, height);
    trailX += (targetX - trailX) * 0.22;
    trailY += (targetY - trailY) * 0.22;
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.008;
      particle.life -= particle.decay;

      if (particle.life <= 0) {
        particles.splice(index, 1);
        continue;
      }

      context.globalAlpha = particle.life * 0.85;
      context.fillStyle = `rgb(${particle.hue})`;
      context.shadowColor = `rgba(${particle.hue}, ${particle.life * 0.8})`;
      context.shadowBlur = 7;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
      context.fill();
    }
    if (trailX > -50) {
      context.globalAlpha = 0.18;
      context.fillStyle = 'rgba(184, 151, 104, 0.9)';
      context.shadowColor = 'rgba(184, 151, 104, 0.45)';
      context.shadowBlur = 10;
      context.beginPath();
      context.arc(trailX, trailY, 2, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
    context.shadowBlur = 0;
    animationFrame = requestAnimationFrame(render);
  };

  resize();
  render();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', handlePointerMove, { passive: true });

  return () => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', handlePointerMove);
    cancelAnimationFrame(animationFrame);
    context.clearRect(0, 0, width, height);
  };
}
