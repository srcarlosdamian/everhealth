import React from 'react';

export type BadgeVariant =
  | 'disponible'
  | 'no-disponible'
  | 'limitada'
  | 'porcentaje'
  | 'especialidad'
  | 'confirmada'
  | 'en-espera'
  | 'programada';

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
  const getVariantStyles = () => {
    switch (variant) {
      case 'disponible':
        return 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]';
      case 'no-disponible':
        return 'bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]';
      case 'limitada':
        return 'bg-[#fffbeb] text-[#92400e] border border-[#fde68a]';
      case 'porcentaje':
        return 'bg-white text-black border border-[#cbd5e1] font-bold text-[12px] px-2 py-0.5';
      case 'especialidad':
        return 'bg-[#f1f5f9] text-[#334155] border border-transparent text-[11px] font-medium';
      case 'confirmada':
        return 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]';
      case 'en-espera':
        return 'bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]';
      case 'programada':
        return 'bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]';
      default:
        return 'bg-[#f1f5f9] text-black border border-[#cbd5e1]';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'disponible':
        return 'bg-[#10b981]';
      case 'no-disponible':
        return 'bg-[#94a3b8]';
      case 'limitada':
        return 'bg-[#f59e0b]';
      default:
        return 'bg-transparent';
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
