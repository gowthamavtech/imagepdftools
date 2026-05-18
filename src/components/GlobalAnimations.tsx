'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-animate="hero"]', { opacity: 0, y: 32 });
      gsap.set('[data-animate="scroll"]', { opacity: 0, y: 28 });

      document.querySelectorAll('[data-animate-stagger]').forEach((parent) => {
        if (parent.children.length) {
          gsap.set(Array.from(parent.children), { opacity: 0, y: 22 });
        }
      });

      const heroes = gsap.utils.toArray<HTMLElement>('[data-animate="hero"]');
      if (heroes.length) {
        gsap.to(heroes, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.08,
        });
      }

      ScrollTrigger.batch('[data-animate="scroll"]', {
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }),
        start: 'top 90%',
        once: true,
      });

      gsap.utils.toArray<HTMLElement>('[data-animate-stagger]').forEach((parent) => {
        const children = Array.from(parent.children) as HTMLElement[];
        if (!children.length) return;
        ScrollTrigger.create({
          trigger: parent,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.09,
              ease: 'power3.out',
            }),
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
