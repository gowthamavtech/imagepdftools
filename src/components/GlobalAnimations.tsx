'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    let raf: number;

    // Dynamic imports keep GSAP/ScrollTrigger out of the server bundle.
    // ScrollTrigger accesses window during module init — it cannot be
    // statically imported in any file that Next.js evaluates on the server.
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        raf = requestAnimationFrame(() => {
          ctx = gsap.context(() => {
            gsap.set('[data-animate="hero"]', { opacity: 0, y: 20 });
            gsap.set('[data-animate="scroll"]', { opacity: 0, y: 16 });

            document.querySelectorAll('[data-animate-stagger]').forEach((parent) => {
              if (parent.children.length) {
                gsap.set(Array.from(parent.children), { opacity: 0, y: 14 });
              }
            });

            const heroes = gsap.utils.toArray<HTMLElement>('[data-animate="hero"]');
            if (heroes.length) {
              gsap.to(heroes, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: EASE_OUT,
                delay: 0.06,
              });
            }

            ScrollTrigger.batch('[data-animate="scroll"]', {
              onEnter: (batch) =>
                gsap.to(batch, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: EASE_OUT }),
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
                    duration: 0.38,
                    stagger: 0.055,
                    ease: EASE_OUT,
                  }),
              });
            });
          });
        });
      }
    );

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, [pathname]);

  return null;
}
