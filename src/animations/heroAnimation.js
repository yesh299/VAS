import { gsap } from 'gsap';

export function animateHeroEntrance(refs) {
  const {
    navbarRef,
    badgeRef,
    headingRef,
    subtitleRef,
    imageWrapperRef,
    imageRef,
    scrollIndicatorRef,
  } = refs;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  // Set initial states
  if (badgeRef?.current) gsap.set(badgeRef.current, { opacity: 0, y: 20 });
  if (headingRef?.current) gsap.set(headingRef.current, { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' });
  if (subtitleRef?.current) gsap.set(subtitleRef.current, { opacity: 0, y: 25 });
  if (imageWrapperRef?.current) gsap.set(imageWrapperRef.current, { opacity: 0, scale: 0.92, y: 30 });
  if (scrollIndicatorRef?.current) gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -10 });

  // Sequence: Navbar -> Image -> Badge -> Heading -> Subtitle -> Scroll Indicator
  tl.to(imageWrapperRef.current, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.6,
    ease: 'power4.out',
  })
  .to(badgeRef.current, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=1.2')
  .to(headingRef.current, {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    duration: 1.2,
    ease: 'power3.out',
  }, '-=1.0')
  .to(subtitleRef.current, {
    opacity: 1,
    y: 0,
    duration: 0.9,
  }, '-=0.8')
  .to(scrollIndicatorRef.current, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.5');

  // Hero Image subtle floating parallax
  if (imageRef?.current) {
    gsap.to(imageRef.current, {
      y: -15,
      rotation: 0.8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  return tl;
}
