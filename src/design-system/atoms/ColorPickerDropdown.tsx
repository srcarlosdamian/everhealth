import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

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

  const currentColorObj = DEFAULT_PET_COLORS.find(
    (c) => c.hex.toLowerCase() === (value || '').toLowerCase()
  );

  return (
    <div className={`flex flex-col gap-1.5 relative font-[family-name:Helvetica] ${className}`} ref={ref}>
      {label && (
        <label className="text-[14px] font-normal text-black leading-tight">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-[40px] px-3.5 rounded-[8px] border bg-white flex items-center justify-between cursor-pointer transition-colors ${
          open ? 'border-black ring-1 ring-black' : 'border-[#cbd5e1] hover:border-black'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-5 h-5 rounded-full border border-black/15 shrink-0 shadow-2xs"
            style={{ backgroundColor: value || '#d4a373' }}
          />
          <span className="text-[13px] font-medium text-black truncate">
            {currentColorObj ? `${currentColorObj.label} (${value})` : value}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#64748b] shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[270px] bg-white rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.14)] p-3.5 border border-[#e2e8f0] flex flex-col gap-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
              Colores habituales
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {DEFAULT_PET_COLORS.map((c) => {
              const isSelected = (value || '').toLowerCase() === c.hex.toLowerCase();
              const isWhite = c.hex.toLowerCase() === '#ffffff';
              return (
                <button
                  key={c.hex}
                  type="button"
                  title={c.label}
                  onClick={() => {
                    onChange(c.hex);
                    setOpen(false);
                  }}
                  className={`w-8 h-8 rounded-full border transition-all cursor-pointer flex items-center justify-center relative hover:scale-110 ${
                    isSelected
                      ? 'ring-2 ring-[#d50475] ring-offset-2 border-black/20'
                      : 'border-black/15 hover:border-black'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${isWhite ? 'text-black' : 'text-white'}`}
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-[#f1f5f9]" />

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
              Personalizado
            </label>
            <div className="h-[36px] px-2.5 rounded-[6px] border border-[#cbd5e1] hover:border-black focus-within:border-black flex items-center gap-2 bg-[#f8fafc] focus-within:bg-white transition-colors">
              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-black/15 cursor-pointer">
                <input
                  type="color"
                  value={value || '#d4a373'}
                  onChange={(e) => onChange(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  title="Elegir con selector del sistema"
                />
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: value || '#d4a373' }}
                />
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#D4A373"
                className="w-full text-[13px] font-mono font-medium text-black uppercase focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
