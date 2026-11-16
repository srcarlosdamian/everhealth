import React from 'react';

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
 * - Franjas horarias seleccionables con botones táctiles.
 * - Estado seleccionado neutral (borde negro y fondo negro para la franja activa).
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
            className={`p-2.5 rounded-[8px] border flex flex-col gap-1.5 text-center cursor-pointer transition-all ${
              isColumnActive
                ? 'border-black bg-[#f8fafc] shadow-xs'
                : 'border-[#cbd5e1] hover:border-[#94a3b8] bg-white'
            }`}
          >
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
              {col.dayName}
            </span>
            <span className="text-[13px] font-bold text-black">{col.dateNumber}</span>

            <div className="flex flex-col gap-1.5 mt-1">
              {col.slots.map((slot, sIdx) => {
                const isSlotSelected = isColumnActive && selectedTime === slot;

                return (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSlot?.(fullDayKey, slot);
                    }}
                    className={`h-[28px] rounded-[6px] border text-[11px] font-bold transition-all cursor-pointer ${
                      isSlotSelected
                        ? colorTheme === 'magenta'
                          ? 'bg-[#d50475] text-white border-[#d50475]'
                          : 'bg-black text-white border-black'
                        : 'bg-white text-black border-[#cbd5e1] hover:border-black'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
