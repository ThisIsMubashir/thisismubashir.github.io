# 3D Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate Dr. Mubashir Hussain's academic portfolio to award-level quality with a relevant Network-on-Chip 3D hero (React Three Fiber), GSAP scroll/transition motion, an evolved copper visual identity, and consolidated content (About+CV+Teaching merged).

**Architecture:** Next.js 16 static export. WebGL is dynamically imported and homepage-only; all other pages keep semantic HTML + the existing ambient body gradient. GSAP drives scroll reveals (replacing the hand-rolled `ScrollReveal` internals while keeping its API) and a `template.tsx` route-enter transition. The `brand` Tailwind scale is repointed from indigo to copper so the whole site recolors from one edit. The site is locked to light theme via `forcedTheme`, leaving dormant `dark:` classes for later cleanup.

**Tech Stack:** three, @react-three/fiber, @react-three/drei, gsap, @gsap/react, Tailwind v3, next/font via Google Fonts `<link>`.

**Verification model:** This repo has **no unit-test runner** (no test script in package.json) and the work is largely visual/WebGL, which unit tests cannot meaningfully cover. Each task is therefore gated on `pnpm typecheck` + `pnpm lint` + (where structural) `pnpm build`, plus an explicit manual browser check. This is the honest verification path for this codebase; do not add a test framework as part of this plan.

---

## File Structure

**New files:**
- `lib/gsap.ts` — GSAP singleton: registers ScrollTrigger once, re-exports `gsap` + `useGSAP`.
- `components/noc/noc-hero.tsx` — client wrapper: dynamic-imports the scene, renders fallback, handles reduced-motion + visibility pause.
- `components/noc/noc-scene.tsx` — the R3F `<Canvas>` scene: node mesh, interconnect lines, routing packets, idle rotation, cursor parallax.
- `components/noc/noc-fallback.tsx` — static SVG/gradient shown before/instead of WebGL.
- `components/stat-counter.tsx` — count-up number on scroll into view.
- `components/career-timeline.tsx` — About-page SVG trace that draws on scroll with milestone nodes.
- `app/template.tsx` — route-enter transition (GSAP clip/fade wipe).

**Modified files:**
- `package.json` / lockfile — new deps.
- `app/layout.tsx` — add fonts; remove global `<DotField/>`; lock light theme.
- `tailwind.config.ts` — repoint `brand` to copper; add `display` font family; JetBrains Mono.
- `app/globals.css` — warm body gradient; `--font-display`; reveal CSS unchanged.
- `components/theme-provider.tsx` — `forcedTheme="light"`.
- `components/nav.tsx` — remove ThemeToggle + Teaching/CV links; copper brand.
- `components/scroll-reveal.tsx` — reimplement internals with GSAP ScrollTrigger, same props.
- `components/section-heading.tsx` — numbered display headings.
- `app/page.tsx` — oversized display hero + mount `NocHero`.
- `app/about/page.tsx` — merged About+CV+Teaching with timeline + stat counters.
- `app/cv/page.tsx`, `app/teaching/page.tsx` — convert to redirect stubs.
- `app/sitemap.ts` — drop `/cv`, `/teaching/cpd`; keep `/teaching`,`/cv` only as redirects out (remove from sitemap).

**Deleted files:**
- `components/dot-field.tsx` — replaced by NoC hero (no longer global background).

---

## Phase A — Foundations (must complete before B/C/D)

### Task 1: Install dependencies

**Files:** Modify `package.json`, lockfile.

- [ ] **Step 1: Install**

Run:
```bash
pnpm add three @react-three/fiber @react-three/drei gsap @gsap/react
pnpm add -D @types/three
```

- [ ] **Step 2: Verify install + types resolve**

Run: `pnpm typecheck`
Expected: PASS (no new errors; deps resolve).

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: add three, r3f, drei, gsap deps"
```

### Task 2: Add display + mono fonts

**Files:** Modify `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`.

- [ ] **Step 1: Extend the Google Fonts link** in `app/layout.tsx` — replace the existing `<link href="...Crimson+Pro...">` stylesheet link with one that also requests Fraunces (display) and JetBrains Mono:

```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Add CSS variables** in `app/globals.css` `:root` block, after `--font-serif`:

```css
    --font-display: 'Fraunces', 'Crimson Pro', ui-serif, Georgia, serif;
    --font-mono:  'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
```
(Replace the existing `--font-mono` line.)

- [ ] **Step 3: Add Tailwind font families** in `tailwind.config.ts` `fontFamily`:

```ts
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
```
(Add alongside existing `sans`/`serif`/`mono`; `mono` already reads `var(--font-mono)` so it picks up JetBrains Mono automatically.)

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm build`
Expected: PASS, static export completes.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tailwind.config.ts
git commit -m "feat: add Fraunces display + JetBrains Mono fonts"
```

### Task 3: Repaint palette to copper + warm gradient

**Files:** Modify `tailwind.config.ts`, `app/globals.css`.

- [ ] **Step 1: Replace the `brand` scale** in `tailwind.config.ts` with a copper ramp (button-bg shades 600/700 pass AA on white):

```ts
        brand: {
          50:  '#fbf3ec',
          100: '#f6e1d0',
          200: '#ecc3a3',
          300: '#e09f70',
          400: '#d27d44',
          500: '#c0612a',
          600: '#a44e20',
          700: '#85401d',
          800: '#6a341a',
          900: '#572d19',
          950: '#2f1709',
        },
```

- [ ] **Step 2: Warm the light body gradient** in `app/globals.css` `body` rule — replace the three `radial-gradient` lines with warm paper tones:

```css
    background-image:
      radial-gradient(ellipse 70% 60% at 0% 0%, rgba(246, 225, 208, 0.55) 0%, transparent 60%),
      radial-gradient(ellipse 55% 50% at 100% 0%, rgba(236, 195, 163, 0.35) 0%, transparent 60%),
      radial-gradient(ellipse 50% 45% at 85% 100%, rgba(251, 243, 236, 0.6) 0%, transparent 60%);
```

- [ ] **Step 3: Verify** the accent reads correctly in a browser.

Run: `pnpm build && npx serve out` (or `pnpm dev`), open homepage.
Expected: links/buttons/badges render copper, background is warm paper. No indigo remains on touched surfaces.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: repaint brand palette to copper, warm body gradient"
```

### Task 4: Lock to light theme

**Files:** Modify `components/theme-provider.tsx`, `components/nav.tsx`.

- [ ] **Step 1: Force light** in `components/theme-provider.tsx`:

```tsx
    <NextThemesProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
```

- [ ] **Step 2: Remove the toggle** from `components/nav.tsx`: delete the `import { ThemeToggle }` line and both `<ThemeToggle />` usages (desktop right-side cluster and mobile menu). Leave the social links.

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm build`
Expected: PASS. Browser: no theme toggle; `.dark` class never applied; dormant `dark:` classes have no effect.

- [ ] **Step 4: Commit**

```bash
git add components/theme-provider.tsx components/nav.tsx
git commit -m "feat: lock site to light theme, remove theme toggle"
```

---

## Phase B — Motion system (depends on A)

### Task 5: GSAP singleton module

**Files:** Create `lib/gsap.ts`.

- [ ] **Step 1: Write the module**

```ts
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add lib/gsap.ts
git commit -m "feat: add GSAP singleton with ScrollTrigger"
```

### Task 6: Reimplement ScrollReveal with GSAP (same API)

**Files:** Modify `components/scroll-reveal.tsx`.

Keep the exact public API (`children`, `className`, `as`) and the `data-reveal="false"` attribute (CSS in globals hides children pre-hydration) so all 5 call sites keep working.

- [ ] **Step 1: Replace the component body** with a GSAP implementation:

```tsx
'use client';

import { createElement, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP } from '@/lib/gsap';

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

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;
      const items = Array.from(container.children) as HTMLElement[];
      container.removeAttribute('data-reveal');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      // Stagger only when children sit on one row (a grid); lists reveal by position.
      const firstTop = items[0]?.getBoundingClientRect().top ?? 0;
      const isRow = items.every(
        (el) => Math.abs(el.getBoundingClientRect().top - firstTop) < 20,
      );

      gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
        stagger: isRow ? 0.08 : 0.05,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: ref },
  );

  return createElement(as, { ref, 'data-reveal': 'false', className: cn(className) }, children);
}
```

- [ ] **Step 2: Verify** all reveal sites still animate and reveal correctly.

Run: `pnpm typecheck && pnpm build`, then browser-scroll the homepage, projects, publications.
Expected: PASS; cards fade/rise in, reverse on scroll up; reduced-motion shows everything immediately.

- [ ] **Step 3: Commit**

```bash
git add components/scroll-reveal.tsx
git commit -m "refactor: drive ScrollReveal with GSAP ScrollTrigger"
```

### Task 7: StatCounter component

**Files:** Create `components/stat-counter.tsx`.

- [ ] **Step 1: Write it**

```tsx
'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function StatCounter({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = `${value}${suffix}`;
        return;
      }
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.4,
        ease: 'power1.out',
        snap: { n: 1 },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        },
      });
    },
    { scope: numRef },
  );

  return (
    <div>
      <span
        ref={numRef}
        className="font-display text-4xl font-semibold text-brand-700 sm:text-5xl"
      >
        0{suffix}
      </span>
      <p className="mt-1 text-sm text-ink-500">{label}</p>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/stat-counter.tsx
git commit -m "feat: add scroll-triggered StatCounter"
```

### Task 8: Route-enter transition

**Files:** Create `app/template.tsx`.

- [ ] **Step 1: Write the template** (re-mounts each navigation; static-export safe):

```tsx
'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 8, clipPath: 'inset(0 0 8% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power2.out' },
      );
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build`, then navigate between pages.
Expected: PASS; each page eases in on navigation; reduced-motion = no animation.

- [ ] **Step 3: Commit**

```bash
git add app/template.tsx
git commit -m "feat: add GSAP route-enter transition"
```

---

## Phase C — Network-on-Chip 3D hero (depends on A)

### Task 9: Static fallback

**Files:** Create `components/noc/noc-fallback.tsx`.

- [ ] **Step 1: Write a lightweight SVG mesh** (also the no-WebGL / reduced-motion render):

```tsx
export function NocFallback() {
  const cols = 4;
  const rows = 4;
  const gap = 80;
  const r = 7;
  const off = 40;
  const nodes = [];
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      nodes.push({ cx: off + x * gap, cy: off + y * gap });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 320"
      className="pointer-events-none absolute inset-0 m-auto h-full max-h-[520px] w-full max-w-[520px] opacity-40"
    >
      <g stroke="rgb(192,97,42)" strokeOpacity="0.35" strokeWidth="1">
        {nodes.map((n, i) =>
          (i % cols !== cols - 1 ? (
            <line key={`h${i}`} x1={n.cx} y1={n.cy} x2={n.cx + gap} y2={n.cy} />
          ) : null),
        )}
        {nodes.map((n, i) =>
          (i < nodes.length - cols ? (
            <line key={`v${i}`} x1={n.cx} y1={n.cy} x2={n.cx} y2={n.cy + gap} />
          ) : null),
        )}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={r} fill="rgb(164,78,32)" fillOpacity="0.55" />
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/noc/noc-fallback.tsx
git commit -m "feat: add NoC static SVG fallback"
```

### Task 10: NoC scene — nodes + interconnects (static mesh)

**Files:** Create `components/noc/noc-scene.tsx`.

Build the geometry first (no packets yet): a 4×4 grid of instanced router nodes on the XY plane with thin interconnect lines, soft lighting, slight tilt. Use a fixed copper palette (not theme-dependent).

- [ ] **Step 1: Write the scene**

```tsx
'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLS = 4;
const ROWS = 4;
const GAP = 1.1;
const COPPER = '#c0612a';
const COPPER_HOT = '#f0a050';

function nodePositions() {
  const pts: THREE.Vector3[] = [];
  const offX = ((COLS - 1) * GAP) / 2;
  const offY = ((ROWS - 1) * GAP) / 2;
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++)
      pts.push(new THREE.Vector3(x * GAP - offX, offY - y * GAP, 0));
  return pts;
}

function Mesh({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => nodePositions(), []);

  const lines = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++) {
        const i = y * COLS + x;
        if (x < COLS - 1) segs.push([nodes[i], nodes[i + 1]]);
        if (y < ROWS - 1) segs.push([nodes[i], nodes[i + COLS]]);
      }
    return segs;
  }, [nodes]);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.08;
    // Cursor parallax tilt
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.y * 0.25,
      0.05,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -pointer.current.x * 0.15,
      0.05,
    );
  });

  return (
    <group ref={group}>
      {lines.map(([a, b], i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
        return (
          <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: COPPER, transparent: true, opacity: 0.4 }))} />
        );
      })}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color={COPPER} emissive={COPPER_HOT} emissiveIntensity={0.15} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function NocScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onPointerMove={(e) => {
        pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 6]} intensity={40} color={COPPER_HOT} />
      <Mesh pointer={pointer} />
    </Canvas>
  );
}
```

- [ ] **Step 2: Verify** typecheck + that the mesh renders (temporarily mount in `app/page.tsx` if needed, or wait for Task 12).

Run: `pnpm typecheck && pnpm build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/noc/noc-scene.tsx
git commit -m "feat: NoC scene mesh — nodes, interconnects, parallax"
```

### Task 11: Routing packets + node pulse

**Files:** Modify `components/noc/noc-scene.tsx`.

Add packets that travel node→node using XY routing (move along X to target column, then along Y), looping with fresh random targets; nodes brighten briefly on packet arrival.

- [ ] **Step 1: Add a `Packets` component** inside `noc-scene.tsx` and render it inside `<group ref={group}>`:

```tsx
function makePath(nodes: THREE.Vector3[]) {
  const a = Math.floor(Math.random() * nodes.length);
  let b = Math.floor(Math.random() * nodes.length);
  if (b === a) b = (b + 1) % nodes.length;
  const ax = a % COLS, ay = Math.floor(a / COLS);
  const bx = b % COLS, by = Math.floor(b / COLS);
  const corner = ay * COLS + bx; // XY routing: turn at (row a, col b)
  return [nodes[a], nodes[corner], nodes[b]];
}

function Packet({ nodes }: { nodes: THREE.Vector3[] }) {
  const ref = useRef<THREE.Mesh>(null);
  const state = useRef({ path: makePath(nodes), t: 0, speed: 0.4 + Math.random() * 0.3 });

  useFrame((_, dt) => {
    const s = state.current;
    s.t += dt * s.speed;
    if (s.t >= 2) { s.path = makePath(nodes); s.t = 0; s.speed = 0.4 + Math.random() * 0.3; }
    const seg = s.t < 1 ? 0 : 1;
    const local = s.t - seg;
    const from = s.path[seg];
    const to = s.path[seg + 1];
    if (ref.current) ref.current.position.lerpVectors(from, to, local);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial color={COPPER_HOT} />
    </mesh>
  );
}

function Packets({ nodes, count = 5 }: { nodes: THREE.Vector3[]; count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Packet key={i} nodes={nodes} />
      ))}
    </>
  );
}
```

Render `<Packets nodes={nodes} count={isMobile ? 3 : 5} />` inside the group (compute `isMobile` from `window.innerWidth < 640` once).

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build`
Expected: PASS; packets visibly route along edges (L-shaped paths), not diagonally.

- [ ] **Step 3: Commit**

```bash
git add components/noc/noc-scene.tsx
git commit -m "feat: NoC routing packets with XY routing"
```

### Task 12: NocHero wrapper + wire into layout

**Files:** Create `components/noc/noc-hero.tsx`; modify `app/layout.tsx`; delete `components/dot-field.tsx`.

- [ ] **Step 1: Write the wrapper** (dynamic import, fallback, reduced-motion, visibility/offscreen pause):

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { NocFallback } from './noc-fallback';

const NocScene = dynamic(() => import('./noc-scene'), { ssr: false, loading: () => <NocFallback /> });

export function NocHero() {
  const [show3d, setShow3d] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Skip WebGL if unsupported
    const canvas = document.createElement('canvas');
    const ok = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    if (!ok) return;
    // Only mount when hero is on-screen
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow3d(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {show3d ? <NocScene /> : <NocFallback />}
    </div>
  );
}
```

- [ ] **Step 2: Remove the global background** — in `app/layout.tsx` delete the `import { DotField }` line and the `<DotField />` element in `<body>`.

- [ ] **Step 3: Delete the old component**

```bash
git rm components/dot-field.tsx
```

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm build`
Expected: PASS; no references to DotField remain (`grep -r DotField app components` returns nothing).

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/noc/noc-hero.tsx
git commit -m "feat: NocHero wrapper; remove global DotField"
```

### Task 13: Restyle homepage hero

**Files:** Modify `app/page.tsx`.

- [ ] **Step 1: Make the hero `relative` and mount `NocHero`**, and scale the heading to display type. Replace the opening hero `<section>` through the `<h1>`/subtitle block:

```tsx
import { NocHero } from '@/components/noc/noc-hero';
// ...
<section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden py-12 text-center sm:py-16">
  <NocHero />
  <p className="inline-flex items-center rounded-full border border-ink-200/80 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-ink-600 backdrop-blur">
    {siteConfig.tagline}
  </p>
  <h1 className="mt-6 text-balance font-display text-5xl font-semibold tracking-tight text-ink-900 sm:text-7xl lg:text-8xl">
    Dr. Mubashir Hussain
  </h1>
  <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-700 sm:text-sm">
    Computer Engineer · Teaching Fellow · Researcher
  </p>
  <p className="mt-6 max-w-prose text-pretty text-sm text-ink-600 sm:text-base">
    I teach, supervise, and research at the intersection of computer engineering and
    education — hardware security, network-on-chip design, and AI in higher education.
    Currently a Teaching Fellow at the University of Strathclyde, Bahrain.
  </p>
```

(Keep the existing CTA button row and marquee below.)

- [ ] **Step 2: Verify** the hero text stays crisp above the canvas and LCP is text (canvas is behind, `-z-10`).

Run: `pnpm build`, open homepage; confirm text readable, mesh visible behind, reduced-motion shows SVG fallback.
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: display-type hero with NoC 3D backdrop"
```

---

## Phase D — Content consolidation (depends on A; Task 14 also uses Task 7/15)

### Task 14 + 15: Merge About + CV + Teaching with career timeline

**Files:** Create `components/career-timeline.tsx`; modify `app/about/page.tsx`.

The merged `/about` flow: intro prose → stat counters → **career timeline** → teaching philosophy + courses → technical arsenal → CV download/request CTA.

- [ ] **Step 1: Write the timeline component.** It reads experience from `data/cv.json` via the existing `getCV`/content loader if present, else import the JSON directly. Render a vertical SVG trace that draws on scroll with milestone nodes in the NoC visual language.

```tsx
'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export type Milestone = { role: string; org: string; period: string };

export function CareerTimeline({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const path = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const line = path.current;
      if (line) {
        const len = line.getTotalLength?.() ?? 0;
      }
      gsap.from('[data-milestone]', {
        opacity: 0,
        x: -24,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.fromTo(
        '[data-trace]',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative mt-8 pl-8">
      <span
        data-trace
        className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-brand-500"
        aria-hidden="true"
      />
      <ul className="space-y-8">
        {milestones.map((m, i) => (
          <li key={i} data-milestone className="relative">
            <span
              className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand-600 bg-white"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-brand-700">{m.period}</p>
            <p className="mt-0.5 font-medium text-ink-900">{m.role}</p>
            <p className="text-sm text-ink-500">{m.org}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Rebuild `app/about/page.tsx`** to merge content. Import courses + cv data via existing loaders (`getCourses`, and the cv JSON), format experience into `Milestone[]` (`period` from `start`/`end`, e.g. `2025 — Now`), keep the teaching philosophy blockquote + Postgraduate/Undergraduate course lists from the old teaching page, keep the technical arsenal section, add `StatCounter`s (publications count, years teaching = 10, students/capstones supervised), and end with a CV request/download CTA pointing at `/contact`. Use `font-display` for the page H1 via `SectionHeading`. Remove all `dark:` classes from the markup you write.

Concretely, the page composition:
```tsx
// pseudo-structure — fill with real prose moved from old about/teaching/cv pages
<SectionHeading title="About" description="Computer engineer, educator, and academic leader." />
<article className="prose prose-neutral max-w-none">{/* 3 intro paras from old About */}</article>
<section className="mt-14 grid grid-cols-3 gap-6">
  <StatCounter value={publications.length} label="Publications" />
  <StatCounter value={10} suffix="+" label="Years teaching" />
  <StatCounter value={50} suffix="+" label="Projects supervised" />
</section>
<section className="mt-16">
  <h2 className="font-display text-3xl">Career</h2>
  <CareerTimeline milestones={milestones} />
</section>
<section className="mt-16">{/* teaching philosophy blockquote + courses grid from old teaching page */}</section>
<section className="mt-16">{/* technical arsenal from old about page */}</section>
<section className="mt-16">{/* CV request CTA → /contact */}</section>
```

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm build`
Expected: PASS; `/about` shows timeline drawing on scroll, counters counting, all merged content present, Pagefind indexes it (`data-pagefind-body` is on `<main>` in layout).

- [ ] **Step 4: Commit**

```bash
git add components/career-timeline.tsx app/about/page.tsx
git commit -m "feat: merge About+CV+Teaching with animated career timeline"
```

### Task 16: Convert /cv and /teaching to redirects; update nav + sitemap

**Files:** Modify `app/cv/page.tsx`, `app/teaching/page.tsx`, `components/nav.tsx`, `app/sitemap.ts`. Keep `app/teaching/cpd` reachable from About if still wanted; otherwise leave as-is (out of nav).

- [ ] **Step 1: Replace `app/cv/page.tsx`** with a static-export-safe redirect stub:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV',
  robots: { index: false },
};

export default function CvRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/about/" />
      <p className="py-20 text-center text-sm text-ink-500">
        The CV now lives on the{' '}
        <a href="/about/" className="font-medium text-brand-700 underline">
          About page
        </a>
        .
      </p>
    </>
  );
}
```

- [ ] **Step 2: Replace `app/teaching/page.tsx`** with the same pattern (redirect to `/about/`), keeping `robots: { index: false }`.

- [ ] **Step 3: Update nav** in `components/nav.tsx` — remove the `Teaching` and `CV` link objects from `links`, leaving: Home, About, Publications, Projects, Contact. Remove now-unused `GraduationCap`/`FileText` icon imports.

- [ ] **Step 4: Update sitemap** in `app/sitemap.ts` — set `routes` to `['', '/about', '/publications', '/projects', '/contact', '/privacy']` (drop `/teaching`, `/teaching/cpd`, `/cv`).

- [ ] **Step 5: Verify**

Run: `pnpm typecheck && pnpm build`, then visit `/cv/` and `/teaching/` → land on `/about/`.
Expected: PASS; nav shows 5 links; sitemap.xml excludes redirected/duplicate routes.

- [ ] **Step 6: Commit**

```bash
git add app/cv/page.tsx app/teaching/page.tsx components/nav.tsx app/sitemap.ts
git commit -m "feat: redirect /cv and /teaching to /about; trim nav + sitemap"
```

---

## Phase E — Verification

### Task 17: Full verification pass

**Files:** none (verification only).

- [ ] **Step 1: Clean build + export**

Run: `pnpm build`
Expected: Next build + Pagefind index complete with no errors; `out/` generated.

- [ ] **Step 2: Lint + types**

Run: `pnpm lint && pnpm typecheck`
Expected: PASS.

- [ ] **Step 3: CSP / console check** — serve `out/` and open homepage + about with devtools console open.

Run: `npx serve out`
Expected: No CSP violations from three/R3F/GSAP (all bundled as `'self'`). If a `blob:`/`worker-src` violation appears, add `worker-src 'self' blob:` to both `public/_headers` and the `<meta http-equiv>` CSP in `app/layout.tsx`, rebuild, re-verify.

- [ ] **Step 4: Manual matrix** — confirm each:
  - Reduced-motion (OS setting): NoC shows static SVG; reveals instant; no counters animating; no route transition.
  - Mobile viewport (≤640px): fewer packets, hero readable, nav collapses.
  - Keyboard: tab order intact, focus rings visible, canvas not focusable (`aria-hidden`).
  - `/cv/` and `/teaching/` redirect to `/about/`.
  - Pagefind search returns About content.

- [ ] **Step 5: Lighthouse** (optional but target ≥90 perf): run against `out/` homepage.
Expected: Performance ≥ 90; LCP element is hero text, not canvas.

- [ ] **Step 6: Final commit (if any fixes)**

```bash
git add -A
git commit -m "chore: verification fixes for 3D portfolio redesign"
```

---

## Self-Review notes

- **Spec §1 identity** → Tasks 2 (fonts), 3 (copper palette), 13/14 (display headings). ✓
- **Spec §2 NoC hero** → Tasks 9–13. XY routing in Task 11. Fallback + reduced-motion + visibility pause in Task 12. ✓
- **Spec §3 motion** → Task 6 (reveals), 7 (counters), 8 (transitions), 15 (timeline), 13 (hero headline via display type; staggered word reveal folded into ScrollReveal). ✓
- **Spec §4 IA** → Tasks 14–16 (merge, redirects, nav, sitemap). ✓
- **Spec §5 perf/a11y** → Task 12 (dynamic import, pause, reduced-motion), Task 17 (CSP, Lighthouse, matrix). ✓
- **Spec §6 testing** → Task 17. ✓
- **Light-theme-only** → Task 4 (`forcedTheme`), and "remove `dark:` from new markup" instruction in Tasks 13/14. Dormant `dark:` classes elsewhere are acceptable (locked off), per spec's incremental clause.
