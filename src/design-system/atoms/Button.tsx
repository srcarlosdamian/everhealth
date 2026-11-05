import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'linear' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLocked?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLocked = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getStyles = () => {
    if (isLocked) {
      return 'bg-[#cbd5e1] text-[#64748b] border border-[#cbd5e1] cursor-pointer hover:bg-[#94a3b8] hover:text-white';
    }

    switch (variant) {
      case 'primary':
        return 'bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white border border-transparent shadow-xs';
      case 'secondary':
        return 'border border-[#d50475] bg-white hover:bg-[#fdf2f8] text-[#d50475]';
      case 'outline':
        return 'border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] text-black';
      case 'linear':
        return 'border border-[#cbd5e1] bg-white hover:border-black text-black px-3 py-1.5 text-[12px] font-bold rounded-[6px]';
      case 'ghost':
        return 'bg-transparent hover:bg-[#f1f5f9] text-black border border-transparent';
      default:
        return 'bg-[#d50475] text-white';
    }
  };

  return (
    <button
      {...props}
      className={`h-[38px] px-4 rounded-[6px] text-[13px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${getStyles()} ${className}`}
    >
      {children}
    </button>
  );
};
