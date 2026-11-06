import React from 'react';

export type BadgeVariant =
  | 'disponible'
  | 'confirmada'
  | 'en-espera'
  | 'programada'
  | 'no-disponible'
  | 'limitada'
  | 'especialidad'
  | 'porcentaje';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'disponible',
  children,
  className = '',
  showDot = false,
}) => {
  // Homologated Badge Design System Rules per User Feedback:
  // - No badge has a background fill (all are bg-transparent).
  // - Border is light gray: border-[#cbd5e1] (gray 300).
  // - Typography: text-[12px] leading-[16px] font-bold (same weight across all).
  // - "Disponible" & "Confirmada" are unified: same component, border-[#cbd5e1], text-[#15803d] (green 700), optional green dot.
  // - "En espera": border-[#cbd5e1], text-[#2563eb] (blue), optional blue dot.
  // - "Programada" & "No disponible": border-[#cbd5e1], text-[#475569] (dark gray), optional gray dot.
  // - "Tiempo limitado": border-[#cbd5e1], text-[#b45309] (amber 700), optional yellow/orange dot.

  const getVariantStyles = () => {
    switch (variant) {
      case 'disponible':
      case 'confirmada':
        return 'bg-transparent text-[#15803d] border border-[#cbd5e1]';
      case 'en-espera':
        return 'bg-transparent text-[#2563eb] border border-[#cbd5e1]';
      case 'programada':
      case 'no-disponible':
        return 'bg-transparent text-[#475569] border border-[#cbd5e1]';
      case 'limitada':
        return 'bg-transparent text-[#b45309] border border-[#cbd5e1]';
      case 'especialidad':
        return 'bg-[#f1f5f9] text-[#334155] border border-transparent text-[11px] font-medium';
      case 'porcentaje':
        return 'bg-transparent text-black border border-[#cbd5e1] font-bold text-[12px] px-2 py-0.5';
      default:
        return 'bg-transparent text-[#475569] border border-[#cbd5e1]';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'disponible':
      case 'confirmada':
        return 'bg-[#15803d]';
      case 'en-espera':
        return 'bg-[#2563eb]';
      case 'programada':
      case 'no-disponible':
        return 'bg-[#64748b]';
      case 'limitada':
        return 'bg-[#b45309]';
      default:
        return 'bg-[#64748b]';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[12px] leading-[16px] font-bold transition-all ${getVariantStyles()} ${className}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${getDotColor()} shrink-0`} />
      )}
      {children}
    </span>
  );
};
