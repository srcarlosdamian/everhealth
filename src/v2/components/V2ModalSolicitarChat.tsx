import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface V2ModalSolicitarChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = [
  { day: 'HOY', date: '22 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
  { day: 'MAÑANA', date: '23 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
  { day: 'MIÉRCOLES', date: '25 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
  { day: 'VIERNES', date: '27 Oct', slots: ['09:30', '11:00', '', ''] },
];

export const V2ModalSolicitarChat: React.FC<V2ModalSolicitarChatProps> = ({ isOpen, onClose }) => {
  const [modalidad, setModalidad] = useState<'agendar' | 'ahora'>('agendar');
  const [specialty, setSpecialty] = useState('Medicina General');
  const [selectedSlot, setSelectedSlot] = useState('HOY · 22 Oct · 11:00');
  const [motivo, setMotivo] = useState('');
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
        done ? 'bg-[#0b1c34] text-white' : 'bg-[#e2e8f0] text-[#64748b]'
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1c34]/50 backdrop-blur-xs p-4 overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[560px] bg-white rounded-[16px] shadow-[0_24px_60px_rgba(11,28,52,0.2)] p-6 sm:p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#f1f5f9]">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#16a34a]">
                CHAT MÉDICO · CITA CONFIRMADA
              </span>
              <h2 className="text-[22px] font-extrabold text-[#0b1c34] mt-1">
                Cita confirmada con éxito
              </h2>
              <p className="text-[13px] text-[#64748b] mt-0.5">
                Hemos programado tu consulta por chat. Recibirás un recordatorio antes del inicio.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-[#f8f8f7] flex items-center justify-center text-[#64748b] hover:text-[#0b1c34] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full bg-[#f8f8f7] rounded-[12px] p-4 sm:p-5 flex flex-col divide-y divide-[#e2e8f0]">
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b]">Especialidad</span>
              <span className="font-bold text-[#0b1c34]">{specialty}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b]">Modalidad</span>
              <span className="font-bold text-[#0b1c34]">
                {modalidad === 'ahora' ? 'Hablar ahora' : 'Cita agendada'}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b]">Especialista</span>
              <span className="font-bold text-[#0b1c34]">Dra. María Fernández</span>
            </div>
            {modalidad === 'agendar' && (
              <div className="py-2.5 flex items-center justify-between text-[14px]">
                <span className="text-[#64748b]">Horario</span>
                <span className="font-bold text-[#0b1c34]">{selectedSlot}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="h-[46px] px-6 rounded-[10px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[13px] font-bold uppercase cursor-pointer"
            >
              VOLVER AL INICIO
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1c34]/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[660px] bg-white rounded-[16px] shadow-[0_24px_60px_rgba(11,28,52,0.2)] p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
          <div>
            <h2 className="text-[22px] font-extrabold text-[#0b1c34]">Solicitar chat</h2>
            <p className="text-[13px] text-[#64748b] mt-0.5">
              Completa los datos requeridos para conectar con el especialista médico
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-[#f8f8f7] flex items-center justify-center text-[#64748b] hover:text-[#0b1c34] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper vertical V1 */}
        <div className="flex flex-col">
          {/* Paso 1 */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={true} />
              <div className="w-[2px] flex-1 my-1 bg-[#d50475]/30 min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <label className="text-[14px] font-bold text-[#0b1c34]">
                1. Modalidad de atención<span className="text-[#d50475]">*</span>
              </label>
              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as 'agendar' | 'ahora')}
                className="w-full h-[48px] px-4 rounded-[10px] bg-[#f8f8f7] border-0 text-[14px] font-semibold text-[#0b1c34] outline-none"
              >
                <option value="agendar">Agendar cita (Elegir fecha y horario)</option>
                <option value="ahora">Hablar ahora (Atención médica inmediata)</option>
              </select>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={true} />
              <div className="w-[2px] flex-1 my-1 bg-[#d50475]/30 min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <span className="text-[14px] font-bold text-[#0b1c34]">2. Médico y especialidad</span>
              <div className="bg-[#f8f8f7] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-[#0b1c34] text-white font-bold text-[13px] flex items-center justify-center">
                    MF
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#0b1c34]">Dra. María Fernández</div>
                    <div className="text-[12px] text-[#64748b]">{specialty} · Disponible</div>
                  </div>
                </div>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="h-[42px] px-3 rounded-[8px] bg-white border-0 text-[13px] font-bold text-[#0b1c34] outline-none"
                >
                  <option value="Medicina General">Medicina General</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Dermatología">Dermatología</option>
                  <option value="Nutrición">Nutrición</option>
                </select>
              </div>
            </div>
          </div>

          {/* Paso 3 (si agendar) */}
          {modalidad === 'agendar' && (
            <div className="flex gap-[16px]">
              <div className="flex flex-col items-center shrink-0 w-[26px]">
                <StepDot done={true} />
                <div className="w-[2px] flex-1 my-1 bg-[#d50475]/30 min-h-[30px]" />
              </div>
              <div className="flex-1 pb-6 flex flex-col gap-[8px]">
                <label className="text-[14px] font-bold text-[#0b1c34]">
                  3. Fecha y horario disponible<span className="text-[#d50475]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#f8f8f7] p-3.5 rounded-[12px]">
                  {DAYS.map((col) => (
                    <div key={col.date} className="flex flex-col gap-1.5">
                      <div className="text-center pb-1">
                        <div className="text-[10px] font-bold text-[#64748b]">{col.day}</div>
                        <div className="text-[12px] font-extrabold text-[#0b1c34]">{col.date}</div>
                      </div>
                      {col.slots.map((s, idx) =>
                        s ? (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSlot(`${col.day} · ${col.date} · ${s}`)}
                            className={`h-[36px] rounded-[8px] text-[12px] font-bold cursor-pointer transition-colors ${
                              selectedSlot === `${col.day} · ${col.date} · ${s}`
                                ? 'bg-[#d50475] text-white'
                                : 'bg-white text-[#0b1c34] hover:bg-[#0b1c34] hover:text-white'
                            }`}
                          >
                            {s}
                          </button>
                        ) : (
                          <div key={idx} className="h-[36px]" />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paso final: Motivo */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={motivo.trim().length > 0} />
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
              <label className="text-[14px] font-bold text-[#0b1c34]">
                {modalidad === 'agendar' ? '4.' : '3.'} Motivo de la consulta
              </label>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe brevemente tus síntomas o dudas médicas..."
                className="w-full p-3.5 rounded-[10px] bg-[#f8f8f7] border-0 text-[14px] text-[#0b1c34] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#d50475]/25 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="h-[46px] px-5 rounded-[10px] bg-[#f8f8f7] hover:bg-[#e2e8f0] text-[#0b1c34] text-[13px] font-bold uppercase cursor-pointer"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={() => setIsConfirmed(true)}
            className="h-[46px] px-6 rounded-[10px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase cursor-pointer"
          >
            CONFIRMAR CHAT
          </button>
        </div>
      </div>
    </div>
  );
};
