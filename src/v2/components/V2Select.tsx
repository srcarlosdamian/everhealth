import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface V2SelectOption {
  value: string;
  label: string;
}

interface V2SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: V2SelectOption[];
  className?: string;
}

export const V2Select: React.FC<V2SelectProps> = ({
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
        className="w-full h-[48px] px-4 rounded-[10px] bg-white text-[14px] font-semibold text-[#0b1c34] flex items-center justify-between gap-3 cursor-pointer transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#d50475]/25"
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#64748b] shrink-0 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-[12px] shadow-[0_16px_40px_rgba(11,28,52,0.16)] p-1.5 flex flex-col gap-0.5 min-w-[180px]"
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
                className={`w-full px-3 py-2.5 rounded-[8px] text-[13px] flex items-center justify-between gap-2 text-left cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#f8f8f7] text-[#0b1c34] font-bold'
                    : 'text-[#475569] hover:bg-[#f8f8f7] hover:text-[#0b1c34] font-medium'
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
