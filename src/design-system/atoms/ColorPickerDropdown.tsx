import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const DEFAULT_PET_COLORS = [
  { hex: '#000000', label: 'Negro' },
  { hex: '#ffffff', label: 'Blanco' },
  { hex: '#4a2c11', label: 'Marrón oscuro' },
  { hex: '#8b4513', label: 'Canela / Pardo' },
  { hex: '#d4a373', label: 'Dorado / Arena' },
  { hex: '#f4a261', label: 'Naranja / Rojizo' },
  { hex: '#94a3b8', label: 'Gris / Plata' },
  { hex: '#334155', label: 'Gris oscuro' },
];

interface ColorPickerDropdownProps {
  label?: string;
  value: string;
  onChange: (hex: string) => void;
  className?: string;
}

export const ColorPickerDropdown: React.FC<ColorPickerDropdownProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className={`flex flex-col gap-1.5 relative ${className}`} ref={ref}>
      {label && (
        <label className="text-[14px] font-normal text-black leading-tight">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-[44px] px-3.5 rounded-[8px] border bg-white flex items-center justify-between cursor-pointer transition-colors ${
          open ? 'border-black' : 'border-[#cbd5e1] hover:border-black'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-[4px] border border-[#cbd5e1] shrink-0 shadow-xs"
            style={{ backgroundColor: value }}
          />
          <span className="text-[16px] font-mono font-normal text-black">
            {value}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#64748b] shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[260px] bg-white rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] p-3 border border-[#e2e8f0] flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
            Colores habituales
          </span>
          <div className="grid grid-cols-4 gap-2">
            {DEFAULT_PET_COLORS.map((c) => (
              <button
                key={c.hex}
                type="button"
                title={c.label}
                onClick={() => {
                  onChange(c.hex);
                  setOpen(false);
                }}
                className={`w-9 h-9 rounded-[6px] border transition-all cursor-pointer flex items-center justify-center ${
                  value.toLowerCase() === c.hex.toLowerCase()
                    ? 'border-black ring-2 ring-black/20 scale-105'
                    : 'border-[#cbd5e1] hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <div className="w-full h-[1px] bg-[#f1f5f9] my-0.5" />
          <div className="flex items-center justify-between gap-2">
            <label className="text-[12px] text-[#64748b] font-medium">
              Personalizado:
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-7 h-7 rounded border border-[#cbd5e1] cursor-pointer p-0 bg-transparent"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-[82px] h-[30px] px-2 text-[12px] font-mono border border-[#cbd5e1] rounded bg-white text-black uppercase focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
