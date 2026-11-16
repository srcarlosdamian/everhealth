import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

/**
 * Átomo Checkbox homologado del Sistema de Diseño (Estilo Biometría Neutral):
 * - Caja cuadrada con esquinas ligeramente redondeadas (rounded-[4px]).
 * - Estado desmarcado: fondo blanco, borde gris claro #cbd5e1 (hover: border-black).
 * - Estado marcado: fondo negro neutral (bg-black), borde negro (border-black), icono Check blanco centrado.
 * - Sin colores rosas para mantener una apariencia neutral y profesional.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
  id,
}) => {
  const boxClasses =
    size === 'sm'
      ? 'w-4 h-4 rounded-[4px]'
      : 'w-5 h-5 rounded-[4px]';

  const iconClasses =
    size === 'sm'
      ? 'w-3 h-3 stroke-[3]'
      : 'w-3.5 h-3.5 stroke-[3]';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onChange) {
      onChange(!checked);
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
        role="checkbox"
        aria-checked={checked}
        id={id}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled && onChange) onChange(!checked);
          }
        }}
        className={`${boxClasses} border flex items-center justify-center transition-all shrink-0 ${
          checked
            ? 'bg-black border-black text-white shadow-xs'
            : 'bg-white border-[#cbd5e1] hover:border-black text-transparent'
        }`}
      >
        {checked && <Check className={`${iconClasses} text-white`} />}
      </div>
      {label && <span className="text-[14px] text-black leading-tight">{label}</span>}
    </div>
  );
};
