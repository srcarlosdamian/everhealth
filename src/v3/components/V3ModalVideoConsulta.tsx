import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface V3ModalVideoConsultaProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPECIALTIES = [
  'Medicina General',
  'Psicología',
  'Sexología',
  'Nutrición',
  'Pediatría',
  'Dermatología',
];

const SLOTS = ['09:30', '10:30', '12:00', '16:00', '17:30', '19:00'];

export const V3ModalVideoConsulta: React.FC<V3ModalVideoConsultaProps> = ({ isOpen, onClose }) => {
  const [motivo, setMotivo] = useState('');
  const [specialty, setSpecialty] = useState('Medicina General');
  const [date, setDate] = useState('2026-10-28');
  const [slot, setSlot] = useState('12:00');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  const StepDot = ({ done }: { done: boolean }) => (
    <div
      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 ${
        done ? 'bg-[#141514] text-white' : 'bg-[#dadad3] text-[#52534f]'
      }`}
    >
      <Check className="w-3.5 h-3.5" />
    </div>
  );

  if (isConfirmed) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        onClick={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#141514]/50 backdrop-blur-xs p-4 overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[560px] bg-white rounded-[6px] shadow-[0_24px_60px_rgba(20,21,20,0.2)] p-6 sm:p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#eeeeea]">
            <div className="flex flex-col">
              <span className="v3-mono text-[10px] font-medium uppercase text-[#d50475]">
                VIDEOCONSULTA · CITA CONFIRMADA
              </span>
              <h2 className="v3-serif text-[26px] font-normal text-[#141514] mt-1">
                Cita confirmada con éxito
              </h2>
              <p className="text-[13px] text-[#52534f] mt-0.5">
                La sala se activará 15 minutos antes de la cita desde Inicio o Historial de Consultas.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-[4px] hover:bg-[#f7f7f5] flex items-center justify-center text-[#52534f] hover:text-[#141514] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full bg-[#f7f7f5] rounded-[4px] p-4 sm:p-5 flex flex-col divide-y divide-[#dadad3]">
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#52534f]">Especialidad</span>
              <span className="font-semibold text-[#141514]">{specialty}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#52534f]">Especialista</span>
              <span className="font-semibold text-[#141514]">Dr. Bruno Peñas</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#52534f]">Día</span>
              <span className="font-semibold text-[#141514]">{date}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#52534f]">Hora</span>
              <span className="font-semibold text-[#141514]">{slot}</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="h-[46px] px-6 rounded-[4px] bg-[#141514] hover:bg-[#2a2b29] text-white text-[13px] font-medium cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141514]/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[660px] bg-white rounded-[6px] shadow-[0_24px_60px_rgba(20,21,20,0.2)] p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#eeeeea]">
          <div>
            <h2 className="v3-serif text-[26px] font-normal text-[#141514]">Solicita tu video consulta</h2>
            <p className="text-[13px] text-[#52534f] mt-0.5">
              Completa los datos y el motivo de tu consulta para programar y confirmar tu cita médica.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-[4px] hover:bg-[#f7f7f5] flex items-center justify-center text-[#52534f] hover:text-[#141514] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={motivo.trim().length > 0} />
              <div className="w-[1.5px] flex-1 my-1 bg-[#dadad3] min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <label className="text-[13px] font-semibold text-[#141514]">
                Motivo de la consulta<span className="text-[#d50475]">*</span>
              </label>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe tus síntomas o motivo (ej. Consulta general para revisión)..."
                className="w-full p-3.5 rounded-[4px] bg-[#f7f7f5] border-0 text-[14px] text-[#141514] placeholder:text-[#73746f] focus:outline-none focus:ring-1 focus:ring-[#141514] focus:bg-white resize-none"
              />
            </div>
          </div>

          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={true} />
              <div className="w-[1.5px] flex-1 my-1 bg-[#dadad3] min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[10px]">
              <label className="text-[13px] font-semibold text-[#141514]">
                Especialidad requerida<span className="text-[#d50475]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SPECIALTIES.map((spec) => {
                  const active = specialty === spec;
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSpecialty(spec)}
                      className={`h-[44px] px-4 rounded-[4px] text-[13px] font-medium text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#141514] text-white'
                          : 'bg-[#f7f7f5] text-[#141514] hover:bg-[#eeeeea]'
                      }`}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={true} />
            </div>
            <div className="flex-1 flex flex-col gap-[10px]">
              <label className="text-[13px] font-semibold text-[#141514]">
                Fecha y horario<span className="text-[#d50475]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-[46px] px-4 rounded-[4px] bg-[#f7f7f5] border-0 text-[14px] font-medium text-[#141514] outline-none"
                />
                <div className="grid grid-cols-3 gap-2">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`h-[42px] rounded-[4px] text-[13px] font-medium cursor-pointer transition-colors ${
                        slot === s
                          ? 'bg-[#d50475] text-white'
                          : 'bg-[#f7f7f5] text-[#141514] hover:bg-[#141514] hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#eeeeea] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="h-[44px] px-5 rounded-[4px] bg-[#f7f7f5] hover:bg-[#dadad3] text-[#141514] text-[13px] font-medium cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => setIsConfirmed(true)}
            className="h-[44px] px-6 rounded-[4px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-medium cursor-pointer"
          >
            Confirmar cita
          </button>
        </div>
      </div>
    </div>
  );
};
