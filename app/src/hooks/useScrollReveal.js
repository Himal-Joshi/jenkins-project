import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Cards with 3D flip-in perspective
      gsap.fromTo(
        el.querySelectorAll('.scroll-card'),
        {
          opacity: 0,
          y: 60,
          rotateX: 25,
          transformOrigin: 'center top',
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Section headers slide + fade
      gsap.fromTo(
        el.querySelectorAll('.scroll-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
