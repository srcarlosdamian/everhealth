import React from 'react';

/**
 * Variantes semánticas reutilizables para el componente Badge (Átomo del Sistema de Diseño).
 * 'success' / 'disponible' / 'a-cargo' / 'confirmada' son un mismo componente unificado
 * (borde gris #cbd5e1, fondo transparente, texto en verde #15803d, font-bold 12px)
 * que se reutiliza según su propósito funcional:
 *  - Disponibilidad médica (ej: "Disponible", "Disponible ahora")
 *  - Filiación / Dependientes (ej: "Menor a cargo", "Tutor legal")
 *  - Consulta activa / Confirmada (ej: "En proceso", "Confirmada")
 */
export type BadgeVariant =
  | 'success'          // Estado positivo / activo (Disponible, Disponible ahora, Menor a cargo, Tutor legal, Confirmada)
  | 'neutral'          // Estado neutro / inactivo (Programada, No disponible, Adulto)
  | 'info'             // Estado en espera / pendiente (En espera, Pendiente)
  | 'warning'          // Advertencia / tiempo limitado (Tiempo limitado)
  | 'error'            // Error de conexión / alerta de sistema (Error de conexión)
  | 'especialidad'     // Píldora de especialidad médica
  | 'porcentaje'       // Píldora de porcentaje métrico
  // Aliases funcionales retrocompatibles:
  | 'disponible'
  | 'disponible-ahora'
  | 'a-cargo'
  | 'confirmada'
  | 'en-espera'
  | 'programada'
  | 'no-disponible'
  | 'limitada'
  | 'error-conexion';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'success',
  children,
  className = '',
}) => {
  // Reglas homologadas del Átomo Badge en el Sistema de Diseño:
  // - Un solo componente visual reutilizable: sin fondo de relleno (bg-transparent por defecto).
  // - Borde uniforme gris sutil: border-[#cbd5e1] (gray 300).
  // - Tipografía: text-[12px] leading-[16px] font-bold unificada en todas las variantes.
  // - Sin puntos verdes/estados circulares extra (eliminados para mantener el badge limpio y legible).
  // - 'success' / 'disponible' / 'a-cargo' / 'confirmada': text-[#15803d] (green 700).
  // - 'info' / 'en-espera': text-[#2563eb] (blue 600).
  // - 'neutral' / 'programada' / 'no-disponible': text-[#475569] (slate 600).
  // - 'warning' / 'limitada': text-[#b45309] (amber 700).
  // - 'error' / 'error-conexion': bg-[#fef9c3] (amarillo suave), text-[#1e293b] (tono regular igual que autosave), sin borde (border-transparent).

  const isError = variant === 'error' || variant === 'error-conexion';

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
      case 'disponible':
      case 'disponible-ahora':
      case 'a-cargo':
      case 'confirmada':
        return 'bg-transparent text-[#15803d] border border-[#cbd5e1]';
      case 'info':
      case 'en-espera':
        return 'bg-transparent text-[#2563eb] border border-[#cbd5e1]';
      case 'neutral':
      case 'programada':
      case 'no-disponible':
        return 'bg-transparent text-[#475569] border border-[#cbd5e1]';
      case 'warning':
      case 'limitada':
        return 'bg-transparent text-[#b45309] border border-[#cbd5e1]';
      case 'error':
      case 'error-conexion':
        return 'bg-[#fef9c3] text-[#1e293b] border-transparent font-normal';
      case 'especialidad':
        return 'bg-[#f1f5f9] text-[#334155] border border-transparent text-[11px] font-medium';
      case 'porcentaje':
        return 'bg-transparent text-black border border-[#cbd5e1] font-bold text-[12px] px-2 py-0.5';
      default:
        return 'bg-transparent text-[#475569] border border-[#cbd5e1]';
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-[6px] text-[12px] leading-[16px] ${
        isError ? 'font-normal' : 'font-bold'
      } whitespace-nowrap ${getVariantStyles()} ${className}`}
    >
      {children}
    </span>
  );
};
