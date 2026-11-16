import React from 'react';
import { Calendar } from 'lucide-react';

export interface SelectedAppointmentBannerProps {
  dateText: string;
  timeText: string;
  title?: string;
  className?: string;
}

/**
 * Banner de Cita Médica Seleccionada:
 * - Tarjeta informativa neutral de 8px de radio.
 * - Icono calendario Lucide.
 * - Texto claro de confirmación de día y hora agendada.
 */
export const SelectedAppointmentBanner: React.FC<SelectedAppointmentBannerProps> = ({
  dateText,
  timeText,
  title = 'Cita seleccionada',
  className = '',
}) => {
  return (
    <div
      className={`bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[13px] ${className}`}
    >
      <div className="flex items-center gap-2 font-bold text-black">
        <Calendar className="w-4 h-4 text-black shrink-0" />
        <span>{title}</span>
      </div>
      <span className="font-normal text-[#475569]">
        {dateText} a las <strong className="font-bold text-black">{timeText}</strong>
      </span>
    </div>
  );
};
