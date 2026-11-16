import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarMonthGridProps {
  selectedDay?: number;
  onSelectDay?: (day: number) => void;
  selectedMonthName?: string;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  availableDays?: number[];
  colorTheme?: 'neutral' | 'magenta';
  className?: string;
}

/**
 * Calendario Mensual Homologado (Sistema de Diseño Everhealth):
 * - Cuadrícula de 7 columnas (D L M M J V S).
 * - Días con esquinas suaves de 6px (rounded-[6px]).
 * - Estado seleccionado con fondo rosa claro (#fce7f3), texto oscuro 950 (#0f172a) y borde rosa (#f472b6).
 * - Navegación mensual superior con chevrons discretos.
 */
export const CalendarMonthGrid: React.FC<CalendarMonthGridProps> = ({
  selectedDay = 17,
  onSelectDay,
  selectedMonthName = 'Octubre 2026',
  onPrevMonth,
  onNextMonth,
  availableDays,
  colorTheme = 'neutral',
  className = '',
}) => {
  // Octubre 2026 comienza en Jueves (offset de 4 días si la semana empieza en Domingo: D, L, M, M, J)
  const offsetDays = 4;
  const totalDays = 31;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const selectedClass =
    colorTheme === 'magenta'
      ? 'bg-[#d50475] text-white font-bold shadow-xs'
      : 'bg-[#fce7f3] text-[#0f172a] font-bold border border-[#f472b6] shadow-xs';

  return (
    <div className={`border border-[#e2e8f0] rounded-[8px] p-3.5 bg-white w-full sm:w-[270px] select-none ${className}`}>
      {/* Header con Nombre de Mes y Navegadores */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#f1f5f9] text-[13px] font-bold text-black">
        <span>{selectedMonthName}</span>
        <div className="flex items-center gap-1 text-[#64748b]">
          <button
            type="button"
            onClick={onPrevMonth}
            className="w-6 h-6 rounded-full hover:bg-[#f1f5f9] hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            title="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="w-6 h-6 rounded-full hover:bg-[#f1f5f9] hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            title="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#64748b] mb-1.5">
        <span>D</span>
        <span>L</span>
        <span>M</span>
        <span>M</span>
        <span>J</span>
        <span>V</span>
        <span>S</span>
      </div>

      {/* Cuadrícula de días */}
      <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
        {/* Espacios vacíos al inicio del mes */}
        {Array.from({ length: offsetDays }).map((_, idx) => (
          <span key={`empty-${idx}`} className="w-7 h-7" />
        ))}

        {/* Números del mes */}
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const isAvailable = availableDays ? availableDays.includes(day) : true;

          return (
            <button
              key={day}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectDay?.(day)}
              className={`w-7 h-7 mx-auto rounded-[6px] flex items-center justify-center transition-all ${
                isSelected
                  ? selectedClass
                  : isAvailable
                  ? 'hover:bg-[#f1f5f9] text-black font-normal cursor-pointer'
                  : 'text-[#cbd5e1] cursor-not-allowed'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
