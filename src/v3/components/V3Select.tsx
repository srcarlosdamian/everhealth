import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface V3SelectOption {
  value: string;
  label: string;
}

interface V3SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: V3SelectOption[];
  className?: string;
}

export const V3Select: React.FC<V3SelectProps> = ({
  value,
  onChange,
  options,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-[46px] px-4 rounded-[4px] bg-white text-[14px] font-medium text-[#141514] flex items-center justify-between gap-3 cursor-pointer transition-colors hover:bg-[#f7f7f5] focus:outline-none focus:ring-1 focus:ring-[#141514]"
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#52534f] shrink-0 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white rounded-[4px] shadow-[0_16px_40px_rgba(20,21,20,0.14)] p-1 flex flex-col gap-0.5 min-w-[180px]"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-[3px] text-[13px] flex items-center justify-between gap-2 text-left cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#eeeeea] text-[#141514] font-semibold'
                    : 'text-[#52534f] hover:bg-[#f7f7f5] hover:text-[#141514] font-normal'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {active && <Check className="w-3.5 h-3.5 text-[#d50475] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
