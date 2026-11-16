import React from 'react';

export interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

/**
 * Átomo Radio / Radial Homologado del Sistema de Diseño (Selección Única / Exclusiva):
 * - Forma circular (rounded-full).
 * - Tamaño estándar 'md' (20px) y compacto 'sm' (16px).
 * - Estado desmarcado: borde gris claro #cbd5e1, fondo blanco (hover: border-black).
 * - Estado marcado: borde negro neutral, punto central negro sólido (bg-black).
 * - Sin colores rosas; apariencia neutral y profesional.
 */
export const Radio: React.FC<RadioProps> = ({
  checked = false,
  onChange,
  name,
  value,
  label,
  disabled = false,
  size = 'md',
  className = '',
  id,
}) => {
  const outerSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const innerDotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onChange && !checked) {
      onChange(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <div
        role="radio"
        aria-checked={checked}
        id={id}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled && onChange && !checked) onChange(true);
          }
        }}
        className={`${outerSize} rounded-full border flex items-center justify-center transition-all shrink-0 ${
          checked
            ? 'border-black bg-white shadow-xs'
            : 'border-[#cbd5e1] hover:border-black bg-white'
        }`}
      >
        {checked && <div className={`${innerDotSize} rounded-full bg-black shrink-0`} />}
      </div>
      {label && <span className="text-[14px] text-black leading-tight">{label}</span>}
    </div>
  );
};
