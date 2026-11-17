import React from 'react';
import { Button } from '../atoms/Button';

export interface DaySlotColumn {
  dayName: string;
  dateNumber: string;
  slots: string[];
}

export interface CalendarDaySlotsProps {
  days: DaySlotColumn[];
  selectedDay?: string;
  selectedTime?: string;
  onSelectSlot?: (day: string, time: string) => void;
  colorTheme?: 'neutral' | 'magenta';
  className?: string;
}

/**
 * Selector de Citas en Columnas de Días y Horarios:
 * - Tarjetas por día con nombre (Lun, Mar, etc.) y fecha (17 Oct).
 * - Franjas horarias 100% integradas con <Button /> estándar (altura 40px, esquinas 8px, texto 13px bold).
 * - Columna activa con borde magenta (#d50475) sobre fondo blanco limpio (sin fondos rosa claro).
 * - Franja seleccionada con botón primario magenta (#d50475) y texto blanco; inactivo con botón outline (#cbd5e1).
 */
export const CalendarDaySlots: React.FC<CalendarDaySlotsProps> = ({
  days,
  selectedDay,
  selectedTime,
  onSelectSlot,
  colorTheme = 'neutral',
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 ${className}`}>
      {days.map((col, idx) => {
        const fullDayKey = `${col.dayName} ${col.dateNumber}`;
        const isColumnActive = selectedDay === fullDayKey;

        return (
          <div
            key={idx}
            onClick={() => {
              if (col.slots.length > 0) {
                onSelectSlot?.(fullDayKey, col.slots[0]);
              }
            }}
            className={`p-2.5 rounded-[8px] flex flex-col gap-1.5 text-center cursor-pointer transition-all ${
              isColumnActive
                ? 'border-2 border-[#d50475] bg-white shadow-xs'
                : 'border border-[#cbd5e1] hover:border-[#94a3b8] bg-white'
            }`}
          >
            <span
              className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                isColumnActive ? 'text-[#d50475]' : 'text-[#64748b]'
              }`}
            >
              {col.dayName}
            </span>
            <span
              className={`text-[13px] font-bold transition-colors ${
                isColumnActive ? 'text-[#0f172a]' : 'text-black'
              }`}
            >
              {col.dateNumber}
            </span>

            <div className="flex flex-col gap-1.5 mt-1">
              {col.slots.map((slot, sIdx) => {
                const isSlotSelected = isColumnActive && selectedTime === slot;

                return (
                  <Button
                    key={sIdx}
                    variant={isSlotSelected ? 'primary' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSlot?.(fullDayKey, slot);
                    }}
                    className="w-full h-[40px] px-2 text-[13px] font-bold rounded-[8px]"
                  >
                    {slot}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
