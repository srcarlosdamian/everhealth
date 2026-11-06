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
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'disponible',
  children,
  className = '',
}) => {
  // Homologated Badge Design System Rules per User Feedback:
  // - No badge has a background fill (all are bg-transparent).
  // - Border is light gray: border-[#cbd5e1].
  // - Typography: text-[12px] leading-[16px] font-bold across all.
  // - NO green dots or status dots (eliminados en Consultas y en el Sistema de Diseño per user request).
  // - "Disponible" & "Confirmada": text-[#15803d] (green 700).
  // - "En espera": text-[#2563eb] (blue).
  // - "Programada" & "No disponible": text-[#475569] (dark gray).
  // - "Tiempo limitado": text-[#b45309] (amber 700).

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

  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-[6px] text-[12px] leading-[16px] font-bold ${getVariantStyles()} ${className}`}
    >
      {children}
    </span>
  );
};
