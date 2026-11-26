import React, { useState, useEffect } from 'react';
import { X, Video, CheckCircle2, Calendar } from 'lucide-react';

interface V2ModalVideoConsultaProps {
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

export const V2ModalVideoConsulta: React.FC<V2ModalVideoConsultaProps> = ({ isOpen, onClose }) => {
  const [motivo, setMotivo] = useState('');
  const [specialty, setSpecialty] = useState('Medicina General');
  const [date, setDate] = useState('2026-10-28');
  const [slot, setSlot] = useState('12:00');
  const [confirmed, setConfirmed] = useState(false);

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
    setConfirmed(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-[#0b1c34]/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[640px] bg-white rounded-[24px] shadow-[0_24px_64px_rgba(11,28,52,0.22)] border border-[#e2e8f0] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#f1f5f9] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#fdf2f8] text-[#d50475] flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold text-[#0b1c34]">
                {confirmed ? 'Cita confirmada con éxito' : 'Solicitar videoconsulta'}
              </h2>
              <p className="text-[13px] text-[#64748b]">
                {confirmed
                  ? 'Resumen de tu cita médica programada.'
                  : 'Completa el motivo, especialidad y horario deseado.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-[#0b1c34] cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {confirmed ? (
          <div className="p-6 sm:p-8 flex flex-col gap-5 overflow-y-auto">
            <div className="flex items-center gap-3 p-4 rounded-[16px] bg-[#ecfdf5] text-[#047857]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-[14px] font-bold">
                La sala se habilitará 15 minutos antes de la cita.
              </span>
            </div>

            <div className="bg-[#f8f8f7] rounded-[18px] p-5 border border-[#e2e8f0] divide-y divide-[#e2e8f0] text-[14px]">
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Especialidad</span>
                <span className="font-bold text-[#0b1c34]">{specialty}</span>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Especialista</span>
                <span className="font-bold text-[#0b1c34]">Dr. Bruno Peñas</span>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Fecha</span>
                <span className="font-bold text-[#0b1c34]">{date}</span>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Hora</span>
                <span className="font-bold text-[#0b1c34]">{slot} h</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="h-[48px] px-7 rounded-[12px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[14px] font-bold cursor-pointer"
              >
                Volver al portal
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 flex flex-col gap-5 overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Motivo de la consulta</label>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe tus síntomas o el motivo de la videoconsulta..."
                className="w-full p-3.5 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] placeholder:text-[#94a3b8] outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#0b1c34]">Especialidad requerida</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SPECIALTIES.map((spec) => {
                  const active = specialty === spec;
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSpecialty(spec)}
                      className={`h-[44px] px-3 rounded-[12px] border text-[13px] font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-[#0b1c34] border-[#0b1c34] text-white'
                          : 'bg-[#f8f8f7] border-[#e2e8f0] text-[#0b1c34] hover:border-[#0b1c34]'
                      }`}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#0b1c34] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#d50475]" />
                  <span>Fecha</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#0b1c34]">Horario disponible</label>
                <div className="grid grid-cols-3 gap-2">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`h-[42px] rounded-[10px] text-[13px] font-bold transition-all cursor-pointer ${
                        slot === s
                          ? 'bg-[#d50475] text-white'
                          : 'bg-[#f8f8f7] border border-[#e2e8f0] text-[#0b1c34] hover:border-[#0b1c34]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="h-[48px] px-5 rounded-[12px] border border-[#cbd5e1] bg-white hover:border-[#0b1c34] text-[14px] font-bold text-[#0b1c34] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className="h-[48px] px-6 rounded-[12px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold cursor-pointer shadow-sm"
              >
                Confirmar videoconsulta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
