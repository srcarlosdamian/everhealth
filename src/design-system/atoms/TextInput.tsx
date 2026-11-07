import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  mono?: boolean;
  containerClassName?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  leftIcon,
  mono = false,
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-[14px] font-normal text-black leading-tight">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <input
          type="text"
          {...props}
          className={`w-full h-[44px] ${
            leftIcon ? 'pl-11 pr-4' : 'px-4'
          } rounded-[8px] border border-[#cbd5e1] bg-white text-[16px] ${
            mono ? 'font-mono' : 'font-normal'
          } text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors ${className}`}
        />
      </div>
    </div>
  );
};
