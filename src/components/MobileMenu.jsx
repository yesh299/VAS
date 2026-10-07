import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose, onNavigate, isUnlocked }) {
  const menuRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.to(menuRef.current, {
        x: '0%',
        duration: 0.6,
        ease: 'power3.inOut',
      });

      const links = linksRef.current?.querySelectorAll('.mobile-nav-link');
      if (links) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.25,
          }
        );
      }
    } else {
      document.body.style.overflow = '';
      
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLink = (e, sectionId) => {
    onNavigate(e, sectionId);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={`vas-mobile-menu ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="mobile-menu-backdrop" onClick={onClose} />
      
      <div className="mobile-menu-content">
        <div className="mobile-menu-header">
          <span className="mobile-brand">VAS</span>
          <span className="mobile-subtitle">CARRY YOUR SPACE</span>
        </div>

        <nav ref={linksRef} className="mobile-nav-links">
          <a
            href="#hero"
            className="mobile-nav-link"
            onClick={(e) => handleLink(e, 'hero')}
          >
            <span className="mobile-num">01</span>
            <span className="mobile-text">Home</span>
          </a>

          <a
            href="#map-section"
            className="mobile-nav-link"
            onClick={(e) => handleLink(e, 'map-section')}
          >
            <span className="mobile-num">02</span>
            <span className="mobile-text">World (Craft Map)</span>
          </a>

          <a
            href="#about"
            className="mobile-nav-link"
            onClick={(e) => handleLink(e, 'about')}
          >
            <span className="mobile-num">03</span>
            <span className="mobile-text">About Us</span>
          </a>

          <a
            href="#vas-key"
            className="mobile-nav-link"
            onClick={(e) => handleLink(e, 'vas-key')}
          >
            <span className="mobile-num">04</span>
            <span className="mobile-text">VAS Key</span>
            {isUnlocked ? (
              <span className="mobile-badge">Unlocked</span>
            ) : (
              <span className="mobile-badge-lock">Unlock Key</span>
            )}
          </a>

          {/* Unlocked Services */}
          {isUnlocked && (
            <a
              href="#collections"
              className="mobile-nav-link"
              onClick={(e) => handleLink(e, 'collections')}
            >
              <span className="mobile-num">05</span>
              <span className="mobile-text">Curated Collections</span>
            </a>
          )}

          <a
            href="#contact"
            className="mobile-nav-link"
            onClick={(e) => handleLink(e, 'contact')}
          >
            <span className="mobile-num">{isUnlocked ? '06' : '05'}</span>
            <span className="mobile-text">Contact Us</span>
          </a>
        </nav>

        <div className="mobile-menu-footer">
          <p className="mobile-footer-tagline">
            VAS is developed with <strong>Mudra Essentials Pvt. Ltd.</strong>
          </p>
          <span className="mobile-copyright">© 2026 VAS. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
