import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'primary-blocked'
  | 'secondary'
  | 'outline'
  | 'inactive'
  | 'destructive'
  | 'consulta-primary'
  | 'consulta-secondary'
  | 'consulta-outline'
  | 'consulta-inactive'
  | 'modal-primary'
  | 'modal-outline'
  | 'pill-primary'
  | 'pill-outline'
  | 'pill-purple'
  | 'ghost';

export type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLocked?: boolean;
  tooltipText?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLocked = false,
  tooltipText,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isInactive = isLocked || disabled || variant === 'inactive' || variant === 'consulta-inactive' || variant === 'primary-blocked';
  const isSmall = size === 'sm';
  // El mensaje de "15 minutos antes" solo aplica a botones de cita (variantes inactive)
  const isScheduleLocked = variant === 'inactive' || variant === 'consulta-inactive';
  const defaultTooltip = isScheduleLocked ? 'Activo 15 minutos antes' : undefined;
  const label = tooltipText || defaultTooltip;

  const getStyles = () => {
    // Si es primario bloqueado (ej. formulario con campos obligatorios vacíos)
    if (variant === 'primary-blocked' || (isInactive && (variant === 'primary' || variant === 'modal-primary'))) {
      return isSmall
        ? 'h-[32px] px-3 rounded-[6px] bg-[#cbd5e1] text-[#475569] text-[11px] sm:text-[12px] font-bold uppercase cursor-not-allowed shadow-none select-none'
        : 'h-[40px] px-5 rounded-[8px] bg-[#cbd5e1] text-[#475569] text-[13px] font-bold uppercase cursor-not-allowed shadow-none select-none';
    }

    if (isInactive) {
      return isSmall
        ? 'h-[32px] px-3 rounded-[6px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[11px] sm:text-[12px] font-bold uppercase cursor-not-allowed'
        : 'h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[13px] font-bold uppercase cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
      case 'consulta-primary':
      case 'pill-primary':
      case 'modal-primary':
        return isSmall
          ? 'h-[32px] px-3 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[11px] sm:text-[12px] font-bold uppercase border border-transparent shadow-2xs'
          : 'h-[40px] px-5 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[13px] font-bold uppercase border border-transparent shadow-xs';
      case 'secondary':
      case 'consulta-secondary':
        return isSmall
          ? 'h-[32px] px-3 rounded-[6px] border border-[#fbcfe8] hover:border-[#d50475] bg-white hover:bg-[#f8fafc] text-[#d50475] text-[11px] sm:text-[12px] font-bold uppercase transition-colors'
          : 'h-[40px] px-5 rounded-[8px] border border-[#fbcfe8] hover:border-[#d50475] bg-white hover:bg-[#f8fafc] text-[#d50475] text-[13px] font-bold uppercase transition-colors';
      case 'outline':
      case 'consulta-outline':
      case 'pill-outline':
      case 'pill-purple':
      case 'modal-outline':
        return isSmall
          ? 'h-[32px] px-3 rounded-[6px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-white hover:bg-[#f8fafc] text-black text-[11px] sm:text-[12px] font-bold uppercase'
          : 'h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-white hover:bg-[#f8fafc] text-black text-[13px] font-bold uppercase';
      case 'destructive':
        return isSmall
          ? 'h-[32px] px-3 rounded-[6px] bg-[#ef4444] hover:bg-[#dc2626] text-white text-[11px] sm:text-[12px] font-bold uppercase shadow-2xs'
          : 'h-[40px] px-5 rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] text-white text-[13px] font-bold uppercase shadow-xs';
      case 'consulta-inactive':
        return isSmall
          ? 'h-[32px] px-3 rounded-[6px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[11px] sm:text-[12px] font-bold uppercase cursor-not-allowed'
          : 'h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[13px] font-bold uppercase cursor-not-allowed';
      case 'ghost':
        return isSmall
          ? 'h-[28px] px-2.5 rounded-[6px] bg-transparent hover:bg-[#f1f5f9] text-black text-[11px] sm:text-[12px] font-bold uppercase border-0'
          : 'px-2.5 py-1.5 rounded-[6px] bg-transparent hover:bg-[#f1f5f9] text-black text-[13px] font-medium border-0';
      default:
        return isSmall
          ? 'h-[32px] px-3 rounded-[6px] bg-[#d50475] text-white text-[11px] sm:text-[12px] font-bold uppercase'
          : 'h-[40px] px-5 rounded-[8px] bg-[#d50475] text-white text-[13px] font-bold uppercase';
    }
  };

  const buttonElement = (
    <button
      type="button"
      {...props}
      disabled={disabled || isInactive}
            className={`inline-flex items-center justify-center gap-[8px] transition-colors cursor-pointer select-none whitespace-nowrap ${getStyles()} ${className}`}
    >
      {children}
    </button>
  );

  if (label) {
    return (
      <div className="relative group inline-flex shrink-0">
        {buttonElement}
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-[#0f172a] text-white text-[13px] font-medium px-3 py-1.5 rounded-[6px] shadow-lg whitespace-nowrap z-30 select-none">
          {label}
        </span>
      </div>
    );
  }

  return buttonElement;
};
