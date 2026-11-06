import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'linear' | 'ghost' | 'inactive';

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
    if (isLocked || variant === 'inactive') {
      return 'border border-[#cbd5e1] bg-transparent text-[#94a3b8] cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
        return 'bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white border border-transparent shadow-xs';
      case 'secondary':
        return 'border border-[#cbd5e1] hover:border-[#d50475] bg-transparent text-[#d50475]';
      case 'outline':
        return 'border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-transparent text-black';
      case 'linear':
        return 'border border-[#cbd5e1] hover:border-[#475569] bg-transparent text-black text-[12px]';
      case 'ghost':
        return 'bg-transparent hover:bg-[#f1f5f9] text-black border border-transparent';
      default:
        return 'bg-[#d50475] text-white';
    }
  };

  return (
    <button
      {...props}
      disabled={disabled || isLocked}
      className={`px-[12px] py-[4px] rounded-[8px] text-[14px] leading-[20px] font-bold uppercase flex items-center justify-center gap-[8px] transition-colors cursor-pointer select-none ${getStyles()} ${className}`}
    >
      {children}
    </button>
  );
};
