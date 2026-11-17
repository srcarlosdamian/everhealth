import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';

interface ModalCitaConfirmadaProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome?: () => void;
  onGoHistory?: () => void;
  tipoCita?: string;
  profesional?: string;
  fecha?: string;
  hora?: string;
}

export const ModalCitaConfirmada: React.FC<ModalCitaConfirmadaProps> = ({
  isOpen,
  onClose,
  onGoHome,
  onGoHistory,
  tipoCita = 'Videoconsulta médica',
  profesional = 'Dr. Bruno Peñas',
  fecha = 'Sábado 24 de Octubre',
  hora = '10:00 hrs',
}) => {
  if (!isOpen) return null;

  const illustrationSrc = `${import.meta.env.BASE_URL}assets/welcome-illustration.png`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] bg-white rounded-[14px] shadow-2xl p-6 border border-[#e2e8f0] flex flex-col gap-4 animate-scaleUp cursor-default"
      >
        {/* Header alineado con la X y con línea divisoria abajo */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
          <h3 className="text-[18px] sm:text-[19px] font-bold text-black tracking-tight leading-snug">
            ¡Cita confirmada con éxito!
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ilustración de bienvenida y éxito */}
        <div className="flex justify-center py-2">
          <img
            src={illustrationSrc}
            alt="Cita confirmada"
            className="h-[120px] w-auto object-contain"
          />
        </div>

        {/* Descripción directa en texto */}
        <div className="flex flex-col gap-1.5 text-center px-2">
          <p className="text-[15px] font-bold text-black">
            Tu cita de {tipoCita} ha quedado agendada
          </p>
          <p className="text-[13px] text-[#475569] leading-relaxed">
            Profesional asignado: <strong className="text-black font-semibold">{profesional}</strong> para el <strong className="text-black font-semibold">{fecha}</strong> a las <strong className="text-black font-semibold">{hora}</strong>. Hemos enviado la confirmación y enlace a tu correo electrónico.
          </p>
        </div>

        {/* Botones de acción: IR AL HOME y IR AL HISTORIAL */}
        <div className="flex items-center justify-center gap-3 pt-3 mt-1 border-t border-[#f1f5f9]">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              onClose();
              if (onGoHome) onGoHome();
            }}
            className="flex-1 justify-center h-[40px] text-[13px] font-bold uppercase rounded-[8px]"
          >
            IR AL HOME
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={() => {
              onClose();
              if (onGoHistory) onGoHistory();
            }}
            className="flex-1 justify-center h-[40px] text-[13px] font-bold uppercase rounded-[8px]"
          >
            IR AL HISTORIAL
          </Button>
        </div>
      </div>
    </div>
  );
};
