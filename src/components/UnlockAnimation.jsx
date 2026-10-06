import React, { useEffect, useRef } from 'react';
import { assemblePurse } from '../animations/purseAnimation';
import './UnlockAnimation.css';

export default function UnlockAnimation({
  partsRefs,
  isAssembling,
  onComplete,
}) {
  const completedRef = useRef(null);
  const glowRef = useRef(null);
  const assemblyStageRef = useRef(null);

  useEffect(() => {
    if (!isAssembling) return;

    const parts = partsRefs.current.filter(Boolean);

    const tl = assemblePurse({
      partsRefs: parts,
      completedRef: completedRef,
      glowRef: glowRef,
      containerRef: assemblyStageRef,
      onAssemblyComplete: onComplete,
    });

    return () => {
      tl.kill();
    };
  }, [isAssembling]);

  if (!isAssembling) return null;

  return (
    <div ref={assemblyStageRef} className="unlock-assembly-overlay">
      {/* Golden Aura / Shockwave Flash */}
      <div ref={glowRef} className="assembly-glow-shockwave" />

      {/* Completed Assembled Traditional & Unique Luxury Handbag */}
      <div ref={completedRef} className="completed-purse-stage">
        <div className="completed-purse-halo" />
        
        {/* Completed Masterpiece Artwork */}
        <div className="completed-purse-artwork">
          <div className="completed-bag-card">
            <img
              src="/assets/products/hero_purse.jpg"
              alt="VAS Completed Handcrafted Luxury Bag"
              className="completed-bag-img"
            />
            <div className="completed-lighting-overlay" />
          </div>
        </div>

        {/* Exact Caption Requested by User */}
        <div className="assembly-caption">
          <span className="assembly-title">OBJECT 01 · ASSEMBLED</span>
          <p className="assembly-desc">Welcome to the inner world of VAS</p>
        </div>
      </div>
    </div>
  );
}
