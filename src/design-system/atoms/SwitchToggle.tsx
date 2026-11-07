import React from 'react';

interface SwitchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`relative w-[40px] h-[20px] rounded-full transition-colors cursor-pointer ${
          checked ? 'bg-[#d50475]' : 'bg-[#cbd5e1]'
        }`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-white shadow-xs transition-all ${
            checked ? 'left-[22px]' : 'left-[2px]'
          }`}
        />
      </button>
      {label && (
        <span className="text-[14px] text-[#334155] font-normal">{label}</span>
      )}
    </label>
  );
};
