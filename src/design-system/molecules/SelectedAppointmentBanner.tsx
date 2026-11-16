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
 * - Tarjeta informativa sin línea (border-0) con fondo rosa claro (#fdf2f8) y radio de 8px.
 * - Icono y título en color rosa CTA (#d50475).
 * - Fecha y hora en texto oscuro 950 (#0f172a).
 */
export const SelectedAppointmentBanner: React.FC<SelectedAppointmentBannerProps> = ({
  dateText,
  timeText,
  title = 'Cita seleccionada',
  className = '',
}) => {
  return (
    <div
      className={`bg-[#fdf2f8] border-0 rounded-[8px] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[13px] ${className}`}
    >
      <div className="flex items-center gap-2 font-bold text-[#d50475]">
        <Calendar className="w-4 h-4 text-[#d50475] shrink-0" />
        <span>{title}</span>
      </div>
      <span className="font-normal text-[#0f172a]">
        {dateText} a las <strong className="font-bold text-[#0f172a]">{timeText}</strong>
      </span>
    </div>
  );
};
