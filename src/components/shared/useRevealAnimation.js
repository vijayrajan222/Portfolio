'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../VideoIntro/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useRevealAnimation
 * ---------------------
 * Fades + slides in every element matching `selector` inside the given
 * container ref as it scrolls into view, staggered. Pass the same
 * className to whatever you want revealed (e.g. `.reveal`) and this
 * takes care of the rest — one hook shared by every section so motion
 * stays consistent across the whole site.
 */
export function useRevealAnimation(containerRef, selector = '.reveal', options = {}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(containerRef.current.querySelectorAll(selector), { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = containerRef.current.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.set(targets, { autoAlpha: 0, y: options.y ?? 36 });

      ScrollTrigger.batch(targets, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: options.duration ?? 0.8,
            ease: 'power3.out',
            stagger: options.stagger ?? 0.1,
          }),
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, prefersReducedMotion]);
}
