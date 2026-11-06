import React from 'react';

interface SegmentedToggleProps {
  value: string;
  onChange: (val: string) => void;
  options?: { label: string; value: string }[];
  className?: string;
}

export const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  value,
  onChange,
  options = [
    { label: 'Sí', value: 'si' },
    { label: 'No', value: 'no' },
  ],
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center bg-[#f1f5f9] p-[3px] rounded-[8px] select-none ${className}`}
      role="group"
    >
      {options.map((option) => {
        const isSelected = value.toLowerCase() === option.value.toLowerCase();
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-w-[44px] px-3.5 py-1 text-[14px] leading-[20px] transition-all cursor-pointer text-center ${
              isSelected
                ? 'bg-white text-black font-normal rounded-[6px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                : 'bg-transparent text-black font-normal hover:text-black/80'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
