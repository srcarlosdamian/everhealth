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
 * Átomo Checkbox homologado del Sistema de Diseño:
 * - Caja con esquinas suaves (rounded-[3px] en sm, rounded-[4px] en md).
 * - Estado desmarcado: fondo blanco/transparente, borde gris claro #cbd5e1 (hover: border-[#94a3b8]).
 * - Estado marcado: fondo rosa CTA #d50475, borde rosa CTA #d50475, icono Check blanco centrado.
 * - Los contenedores padre de selección en tarjetas son cuadrados (rounded-none).
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
      ? 'w-4 h-4 rounded-[3px]'
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
            ? 'bg-[#d50475] border-[#d50475] text-white shadow-2xs'
            : 'bg-white border-[#cbd5e1] hover:border-[#94a3b8] text-transparent'
        }`}
      >
        {checked && <Check className={`${iconClasses} text-white`} />}
      </div>
      {label && <span className="text-[14px] text-black leading-tight">{label}</span>}
    </div>
  );
};
