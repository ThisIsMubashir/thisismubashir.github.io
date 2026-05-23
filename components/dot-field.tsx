'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  ox: number; // origin x
  oy: number; // origin y
  vx: number;
  vy: number;
}

const SPACING    = 32;   // px between dots
const DOT_R      = 1.6;  // dot radius px
const BUBBLE_R   = 110;  // cursor influence radius px
const REPEL      = 10;   // max repulsion speed
const SPRING     = 0.055; // how fast dots return home
const DAMPING    = 0.78;  // velocity decay per frame

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let mouse = { x: -9999, y: -9999 };

    // ── Build dot grid ────────────────────────────────────────────
    function buildGrid() {
      dots = [];
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      // Offset so grid is centred
      const offX = (W - (cols - 1) * SPACING) / 2;
      const offY = (H - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offX + c * SPACING;
          const oy = offY + r * SPACING;
          dots.push({ x: ox, y: oy, ox, oy, vx: 0, vy: 0 });
        }
      }
    }

    // ── Resize / DPR ─────────────────────────────────────────────
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    // ── Animation loop ────────────────────────────────────────────
    function tick() {
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        const dx   = d.x - mouse.x;
        const dy   = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cursor repulsion
        if (dist < BUBBLE_R && dist > 0.5) {
          const strength = (1 - dist / BUBBLE_R) ** 2; // quadratic falloff
          d.vx += (dx / dist) * strength * REPEL;
          d.vy += (dy / dist) * strength * REPEL;
        }

        // Spring back to origin
        d.vx += (d.ox - d.x) * SPRING;
        d.vy += (d.oy - d.y) * SPRING;

        // Damping
        d.vx *= DAMPING;
        d.vy *= DAMPING;

        // Integrate
        d.x += d.vx;
        d.y += d.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,50,182,0.13)'; // faint brand indigo
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    // ── Mouse / touch tracking ────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse = { x: -9999, y: -9999 };
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }
    function onTouchEnd() {
      mouse = { x: -9999, y: -9999 };
    }

    resize();
    tick();

    window.addEventListener('resize',     resize,      { passive: true });
    window.addEventListener('mousemove',  onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove',  onTouchMove, { passive: true });
    window.addEventListener('touchend',   onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
