import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'inactive'
  | 'pill-primary'
  | 'pill-outline'
  | 'pill-purple'
  | 'destructive'
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
      return 'px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[14px] leading-[20px] font-bold uppercase cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
        return 'px-[12px] py-[4px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[14px] leading-[20px] font-bold uppercase border border-transparent shadow-xs';
      case 'secondary':
        return 'px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#d50475] bg-transparent text-[#d50475] text-[14px] leading-[20px] font-bold uppercase';
      case 'outline':
        return 'px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-white text-black text-[14px] leading-[20px] font-bold uppercase';
      case 'pill-primary':
        return 'h-[38px] px-6 rounded-full bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold shadow-xs';
      case 'pill-outline':
        return 'h-[38px] px-6 rounded-full border border-black hover:bg-[#f8fafc] bg-white text-black text-[13px] font-bold';
      case 'pill-purple':
        return 'h-[38px] px-6 rounded-full border border-[#4a154b] text-[#4a154b] hover:bg-[#faf5ff] bg-white text-[13px] font-bold';
      case 'destructive':
        return 'px-4 h-[38px] rounded-[6px] bg-[#ef4444] hover:bg-[#dc2626] text-white text-[13px] font-bold uppercase shadow-xs';
      case 'ghost':
        return 'px-2.5 py-1.5 rounded-[6px] bg-transparent hover:bg-[#f1f5f9] text-black text-[13px] font-medium';
      default:
        return 'px-[12px] py-[4px] rounded-[8px] bg-[#d50475] text-white text-[14px] leading-[20px] font-bold uppercase';
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
