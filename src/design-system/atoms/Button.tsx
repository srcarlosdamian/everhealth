import React from 'react';

export type ButtonVariant =
  | 'primary'
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLocked?: boolean;
  tooltipText?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLocked = false,
  tooltipText,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isInactive = isLocked || variant === 'inactive';

  const getStyles = () => {
    if (isInactive) {
      return 'h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[13px] font-bold uppercase cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
      case 'consulta-primary':
      case 'pill-primary':
      case 'modal-primary':
        return 'h-[40px] px-5 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[13px] font-bold uppercase border border-transparent shadow-xs';
      case 'secondary':
      case 'consulta-secondary':
        return 'h-[40px] px-5 rounded-[8px] border border-[#fbcfe8] hover:border-[#d50475] bg-white hover:bg-[#f8fafc] text-[#d50475] text-[13px] font-bold uppercase transition-colors';
      case 'outline':
      case 'consulta-outline':
      case 'pill-outline':
      case 'pill-purple':
      case 'modal-outline':
        return 'h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-white hover:bg-[#f8fafc] text-black text-[13px] font-bold uppercase';
      case 'destructive':
        return 'h-[40px] px-5 rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] text-white text-[13px] font-bold uppercase shadow-xs';
      case 'consulta-inactive':
        return 'h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[13px] font-bold uppercase cursor-not-allowed';
      case 'ghost':
        return 'px-2.5 py-1.5 rounded-[6px] bg-transparent hover:bg-[#f1f5f9] text-black text-[13px] font-medium';
      default:
        return 'h-[40px] px-5 rounded-[8px] bg-[#d50475] text-white text-[13px] font-bold uppercase';
    }
  };

  const buttonElement = (
    <button
      type="button"
      {...props}
      disabled={disabled || isInactive}
      title={tooltipText || (isInactive ? 'Activo 15 minutos antes' : undefined)}
      className={`inline-flex items-center justify-center gap-[8px] transition-colors cursor-pointer select-none whitespace-nowrap ${getStyles()} ${className}`}
    >
      {children}
    </button>
  );

  if (isInactive || tooltipText) {
    const label = tooltipText || 'Activo 15 minutos antes';
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
