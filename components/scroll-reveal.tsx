'use client';

import { createElement, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Scroll-driven reveal with full bidirectionality:
 *
 *  ↓ scroll down → element enters from below  → tilt up + fade in
 *  ↓ scroll down → element exits at top        → slide up + fade out
 *  ↑ scroll up   → everything reverses exactly
 *
 * Horizontal grids (cards on same row) get a cascading stagger.
 * Vertical lists (publications) reveal naturally by their differing Y positions.
 */

const ENTER_ZONE = 0.54; // fraction of vh over which entry plays
const EXIT_ZONE  = 0.46; // fraction of vh over which exit plays
const STAGGER_PX = 34;   // px shift per child for horizontal grids

export function ScrollReveal({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Respect user motion preferences — show everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.removeAttribute('data-reveal');
      (Array.from(container.children) as HTMLElement[]).forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const items = Array.from(container.children) as HTMLElement[];
    if (!items.length) return;

    // Hand visual control from CSS to JS
    container.removeAttribute('data-reveal');
    items.forEach(el => { el.style.willChange = 'opacity, transform'; });

    // Detect horizontal grid: all items share the same top edge
    const firstTop = items[0].getBoundingClientRect().top;
    const isGrid = items.every(el =>
      Math.abs(el.getBoundingClientRect().top - firstTop) < 20,
    );
    const stagger = isGrid ? STAGGER_PX : 0;

    // Smoothstep easing (s-curve, clamped to [0,1])
    function smooth(t: number) {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    }

    function update() {
      const vh = window.innerHeight;
      const enter = vh * ENTER_ZONE;
      const exit  = vh * EXIT_ZONE;

      items.forEach((el, i) => {
        const { top, height } = el.getBoundingClientRect();
        const cy = top + height / 2; // element centre in viewport

        if (cy > vh / 2) {
          // ── Below centre: entering ────────────────────────────────
          // Later cards (higher index) need to scroll further to fully reveal
          const dist = cy + i * stagger - vh / 2;
          const t = smooth(1 - Math.min(1, dist / enter));
          el.style.opacity = String(t);
          const rx = (18 * (1 - t)).toFixed(1);
          const ty = (28 * (1 - t)).toFixed(1);
          el.style.transform = t > 0.999
            ? 'none'
            : `perspective(900px) rotateX(${rx}deg) translateY(${ty}px)`;
        } else {
          // ── Above centre: exiting ─────────────────────────────────
          // Later cards (higher index) stay visible slightly longer
          const dist = Math.max(0, vh / 2 - cy - i * stagger);
          const t = smooth(Math.min(1, dist / exit));
          el.style.opacity = String(Math.max(0, 1 - t));
          const ty = (-20 * t).toFixed(1);
          el.style.transform = t < 0.001 ? 'none' : `translateY(${ty}px)`;
        }
      });
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set correct positions before first scroll

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // data-reveal="false" keeps children hidden via CSS until JS takes over
  return createElement(as, { ref, 'data-reveal': 'false', className: cn(className) }, children);
}
