import React from 'react';

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  align?: 'center' | 'left' | 'right';
  forceVisible?: boolean;
  className?: string;
}

/**
 * Átomo Tooltip del Sistema de Diseño Everhealth:
 * - Píldora oscura compacta (bg-[#0f172a], slate-950) con texto blanco (text-[11px] font-medium).
 * - Radio de esquinas suave de 4px (rounded-[4px]) y sombra suave (shadow-lg).
 * - Posicionamiento centrado o alineado (left/center/right) sobre o bajo el elemento activador.
 * - Despliegue en hover con microinteracción fluida (opacity transition 150ms).
 * - Utilizado para aclaraciones contextuales sin saturar el diseño principal:
 *   sub-estados de badges ("De informe: Pendiente", "De recomendación: Pendiente"),
 *   acciones de botones ("Descargar informe", "Copiar correo") y controles de tabla.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  align = 'center',
  forceVisible = false,
  className = '',
}) => {
  const horizontalClasses =
    align === 'right'
      ? 'right-0 translate-x-0'
      : align === 'left'
      ? 'left-0 translate-x-0'
      : 'left-1/2 -translate-x-1/2';

  const verticalClasses =
    position === 'bottom'
      ? 'top-full mt-1.5'
      : 'bottom-full mb-1.5';

  return (
    <div className={`relative group inline-flex shrink-0 ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${verticalClasses} ${horizontalClasses} ${
          forceVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
        } transition-all duration-150 ease-out bg-[#0f172a] text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px] shadow-lg whitespace-nowrap z-50 select-none`}
      >
        {text}
      </span>
    </div>
  );
};
