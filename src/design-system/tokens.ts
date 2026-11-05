export const TOKENS = {
  colors: {
    primary: '#d50475',
    primaryHover: '#b80364',
    primaryActive: '#9d174d',
    primaryLight: '#fdf2f8',
    stepperCheck: '#70083a', // Dark magenta 900 for completed checkmarks
    stepperLine: '#e2e8f0',  // Stepper connecting vertical track
    textPrimary: '#000000',
    textSecondary: '#475569',
    textMuted: '#64748b',
    borderLight: '#e2e8f0',
    borderDefault: '#cbd5e1',
    bgLight: '#f8fafc',
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
      waiting: {
        bg: '#eff6ff',
        text: '#1e40af',
        border: '#bfdbfe',
      },
      confirmed: {
        bg: '#f0fdf4',
        text: '#166534',
        border: '#bbf7d0',
      },
      scheduled: {
        bg: '#f8fafc',
        text: '#64748b',
        border: '#e2e8f0',
      },
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, 'Arimo', sans-serif",
  },
} as const;
