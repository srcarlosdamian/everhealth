/**
 * Ever Health Design System Tokens (Extracted directly from Figma PrimeNG Design System)
 */

export const TOKENS = {
  // Base Colors
  base: {
    black: '#000000',
    white: '#ffffff',
  },

  // Pink Palette (Figma colors.pink)
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    brand: '#d50475', // Ever Health Brand Primary
    800: '#9d174d',
    900: '#831843', // Stepper completed check
  },

  // Neutral Palette 1: Blue Gray (Figma colors.blueGray)
  blueGray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Neutral Palette 2: Gray (Figma colors.gray)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic Shortcuts
  colors: {
    primary: '#d50475',
    primaryHover: '#b80364',
    primaryActive: '#9d174d',
    primaryLight: '#fdf2f8',
    stepperCheck: '#831843', // Pink 900
    stepperLine: '#e2e8f0',  // BlueGray 200
    textPrimary: '#000000',
    textSecondary: '#475569', // BlueGray 600
    textMuted: '#64748b',     // BlueGray 500
    borderLight: '#e2e8f0',   // BlueGray 200
    borderDefault: '#cbd5e1', // BlueGray 300
    bgLight: '#f8fafc',       // BlueGray 50
    bgWhite: '#ffffff',
    status: {
      available: {
        bg: '#ecfdf5',
        text: '#065f46',
        border: '#a7f3d0',
        dot: '#10b981',
      },
      unavailable: {
        bg: '#f1f5f9',
        text: '#475569',
        border: '#cbd5e1',
        dot: '#94a3b8',
      },
      limited: {
        bg: '#fffbeb',
        text: '#92400e',
        border: '#fde68a',
        dot: '#f59e0b',
      },
    },
  },

  // Typography: Strictly Helvetica
  typography: {
    fontFamily: "Helvetica, 'Helvetica Neue', sans-serif",
  },
} as const;
