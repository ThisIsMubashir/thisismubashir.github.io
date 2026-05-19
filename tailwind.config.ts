import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * Design tokens for the Mubashir Hussain portfolio.
 *
 * Brand direction:  Academic indigo
 * Typography feel:  Geometric sans (Inter in prod; system stack fallback)
 * Density:          Comfortable
 *
 * Source of truth: DESIGN_SYSTEM.md.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1100px' },
    },
    extend: {
      colors: {
        // === Brand: Academic indigo ==========================================
        brand: {
          50:  '#eef1ff',
          100: '#dde3ff',
          200: '#bdc8ff',
          300: '#94a4ff',
          400: '#677dff',
          500: '#4259f5',
          600: '#2e3fe1',
          700: '#2532b6',
          800: '#212d92',
          900: '#1f2a75',
          950: '#161a44',
        },
        // === Neutrals (ink) ===================================================
        ink: {
          50:  '#f8f8f7',
          100: '#ececea',
          200: '#d6d6d2',
          300: '#b3b3ad',
          400: '#83837c',
          500: '#5a5a55',
          600: '#3f3f3c',
          700: '#2a2a28',
          800: '#1a1a1a',
          900: '#111111',
          950: '#0a0a0a',
        },
        // === Semantic =========================================================
        success: { 50: '#ecfdf5', 500: '#10b981', 600: '#059669', 900: '#064e3b' },
        warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#d97706', 900: '#78350f' },
        danger:  { 50: '#fef2f2', 500: '#ef4444', 600: '#dc2626', 900: '#7f1d1d' },
        info:    { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 900: '#1e3a8a' },
      },
      fontFamily: {
        // Geometric-leaning. `Inter` slots in via next/font when network is available.
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Reserved for the rare editorial moment (hero, quotes).
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Type scale (~1.20 ratio, comfortable density).
        'xs':   ['0.75rem',  { lineHeight: '1.5' }],    // 12 / 18
        'sm':   ['0.875rem', { lineHeight: '1.55' }],   // 14 / 22
        'base': ['1rem',     { lineHeight: '1.7' }],    // 16 / 27
        'lg':   ['1.125rem', { lineHeight: '1.65' }],   // 18 / 30
        'xl':   ['1.25rem',  { lineHeight: '1.55' }],   // 20 / 31
        '2xl':  ['1.5rem',   { lineHeight: '1.4' }],    // 24 / 34
        '3xl':  ['1.875rem', { lineHeight: '1.3' }],    // 30 / 39
        '4xl':  ['2.25rem',  { lineHeight: '1.2' }],    // 36 / 43
        '5xl':  ['3rem',     { lineHeight: '1.1' }],    // 48 / 53
      },
      letterSpacing: {
        tightish: '-0.015em',
        wider: '0.06em',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        // Subtle, editorial elevation. Keep these soft.
        xs: '0 1px 1px rgba(17, 17, 17, 0.04)',
        sm: '0 1px 2px rgba(17, 17, 17, 0.06)',
        md: '0 4px 12px -2px rgba(17, 17, 17, 0.07)',
        lg: '0 12px 32px -8px rgba(17, 17, 17, 0.12)',
        focus: '0 0 0 3px rgba(66, 89, 245, 0.35)',
      },
      transitionDuration: {
        instant: '80ms',
        fast: '140ms',
        DEFAULT: '180ms',
        slow: '280ms',
      },
      transitionTimingFunction: {
        // Soft-out for UI; ease-in-out for movement.
        DEFAULT: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      spacing: {
        // Adds a comfortable section rhythm on top of the default scale.
        section: '4rem',
        'section-lg': '6rem',
      },
      typography: ({ theme }: { theme: (k: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-links': theme('colors.brand.700'),
            '--tw-prose-invert-links': theme('colors.brand.300'),
            maxWidth: '70ch',
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
