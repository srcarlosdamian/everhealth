import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  emoji?: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  label?: string;
  required?: boolean;
  options: (string | DropdownOption)[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  helperText?: string;
  dropUp?: boolean;
  openUpward?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  required = false,
  options,
  value,
  placeholder = 'Selecciona una opción',
  onChange,
  className = '',
  disabled = false,
  helperText,
  dropUp = false,
  openUpward = false,
}) => {
  const isUp = dropUp || openUpward;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalizar opciones
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`flex flex-col gap-1.5 w-full relative font-[family-name:Helvetica] ${className}`} ref={containerRef}>
      {/* Título: Regular negro (como especificado por el usuario) */}
      {label && (
        <label className="text-[14px] font-normal text-black leading-tight flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-[#d50475]">*</span>}
        </label>
      )}

      {/* Botón activador del Dropdown */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full h-[44px] px-3.5 rounded-[8px] bg-white border text-left flex items-center justify-between transition-colors select-none cursor-pointer ${
          disabled ? 'opacity-60 cursor-not-allowed bg-[#f8fafc]' : ''
        } ${
          isOpen
            ? 'border-black ring-1 ring-black shadow-xs'
            : 'border-[#cbd5e1] hover:border-[#475569]'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {selectedOption?.emoji && (
            <span className="text-[16px] shrink-0 leading-none">{selectedOption.emoji}</span>
          )}
          {selectedOption?.icon && (
            <span className="w-4 h-4 text-[#64748b] shrink-0 flex items-center justify-center">
              {selectedOption.icon}
            </span>
          )}
          <span
            className={`text-[16px] font-normal truncate ${
              selectedOption ? 'text-black' : 'text-[#64748b]'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#64748b] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-black' : ''
          }`}
        />
      </button>

      {/* Menú flotante de opciones (100% neutro, sin rosas en hover) */}
      {isOpen && (
        <div
          className={`absolute left-0 z-50 w-full bg-white rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1 border border-[#e2e8f0] max-h-[240px] overflow-y-auto flex flex-col gap-[2px] animate-fadeIn ${
            isUp ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'
          }`}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-[6px] text-[16px] font-normal text-left flex items-center justify-between transition-colors cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#f1f5f9] text-black font-medium'
                    : 'text-black hover:bg-[#f1f5f9]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.emoji && <span className="text-[16px] shrink-0 leading-none">{opt.emoji}</span>}
                  {opt.icon && (
                    <span className="w-4 h-4 text-[#64748b] shrink-0 flex items-center justify-center">
                      {opt.icon}
                    </span>
                  )}
                  <span className="truncate">{opt.label}</span>
                </div>

                {isSelected && <Check className="w-4 h-4 text-black shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {helperText && (
        <span className="text-[12px] text-[#64748b] leading-tight">{helperText}</span>
      )}
    </div>
  );
};
