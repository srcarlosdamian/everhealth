import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface V3ModalSolicitarChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = [
  { day: 'HOY', date: '22 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
  { day: 'MAÑANA', date: '23 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
  { day: 'MIÉRCOLES', date: '25 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
  { day: 'VIERNES', date: '27 Oct', slots: ['09:30', '11:00', '', ''] },
];

export const V3ModalSolicitarChat: React.FC<V3ModalSolicitarChatProps> = ({ isOpen, onClose }) => {
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
                CHAT MÉDICO · CITA CONFIRMADA
              </span>
              <h2 className="v3-serif text-[26px] font-normal text-[#141514] mt-1">
                Cita confirmada con éxito
              </h2>
              <p className="text-[13px] text-[#52534f] mt-0.5">
                Hemos programado tu consulta por chat. Recibirás un recordatorio antes del inicio.
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
              <span className="text-[#52534f]">Modalidad</span>
              <span className="font-semibold text-[#141514]">
                {modalidad === 'ahora' ? 'Hablar ahora' : 'Cita agendada'}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#52534f]">Especialista</span>
              <span className="font-semibold text-[#141514]">Dra. María Fernández</span>
            </div>
            {modalidad === 'agendar' && (
              <div className="py-2.5 flex items-center justify-between text-[14px]">
                <span className="text-[#52534f]">Horario</span>
                <span className="font-semibold text-[#141514]">{selectedSlot}</span>
              </div>
            )}
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
        className="relative w-full max-w-[660px] bg-white rounded-[6px] shadow-[0_24px_60px_rgba(20,21,20,0.2)] p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#eeeeea]">
          <div>
            <h2 className="v3-serif text-[26px] font-normal text-[#141514]">Solicitar chat</h2>
            <p className="text-[13px] text-[#52534f] mt-0.5">
              Completa los datos requeridos para conectar con el especialista médico
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
              <StepDot done={true} />
              <div className="w-[1.5px] flex-1 my-1 bg-[#dadad3] min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <label className="text-[13px] font-semibold text-[#141514]">
                1. Modalidad de atención<span className="text-[#d50475]">*</span>
              </label>
              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as 'agendar' | 'ahora')}
                className="w-full h-[46px] px-4 rounded-[4px] bg-[#f7f7f5] border-0 text-[14px] font-medium text-[#141514] outline-none"
              >
                <option value="agendar">Agendar cita (Elegir fecha y horario)</option>
                <option value="ahora">Hablar ahora (Atención médica inmediata)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={true} />
              <div className="w-[1.5px] flex-1 my-1 bg-[#dadad3] min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <span className="text-[13px] font-semibold text-[#141514]">2. Médico y especialidad</span>
              <div className="bg-[#f7f7f5] rounded-[4px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#141514] text-white font-semibold text-[13px] flex items-center justify-center">
                    MF
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#141514]">Dra. María Fernández</div>
                    <div className="text-[12px] text-[#52534f]">{specialty} · Disponible</div>
                  </div>
                </div>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="h-[40px] px-3 rounded-[4px] bg-white border-0 text-[13px] font-medium text-[#141514] outline-none"
                >
                  <option value="Medicina General">Medicina General</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Dermatología">Dermatología</option>
                  <option value="Nutrición">Nutrición</option>
                </select>
              </div>
            </div>
          </div>

          {modalidad === 'agendar' && (
            <div className="flex gap-[16px]">
              <div className="flex flex-col items-center shrink-0 w-[26px]">
                <StepDot done={true} />
                <div className="w-[1.5px] flex-1 my-1 bg-[#dadad3] min-h-[30px]" />
              </div>
              <div className="flex-1 pb-6 flex flex-col gap-[8px]">
                <label className="text-[13px] font-semibold text-[#141514]">
                  3. Fecha y horario disponible<span className="text-[#d50475]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#f7f7f5] p-3.5 rounded-[4px]">
                  {DAYS.map((col) => (
                    <div key={col.date} className="flex flex-col gap-1.5">
                      <div className="text-center pb-1">
                        <div className="v3-mono text-[10px] text-[#52534f]">{col.day}</div>
                        <div className="text-[12px] font-semibold text-[#141514]">{col.date}</div>
                      </div>
                      {col.slots.map((s, idx) =>
                        s ? (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSlot(`${col.day} · ${col.date} · ${s}`)}
                            className={`h-[36px] rounded-[4px] text-[12px] font-medium cursor-pointer transition-colors ${
                              selectedSlot === `${col.day} · ${col.date} · ${s}`
                                ? 'bg-[#d50475] text-white'
                                : 'bg-white text-[#141514] hover:bg-[#141514] hover:text-white'
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

          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepDot done={motivo.trim().length > 0} />
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
              <label className="text-[13px] font-semibold text-[#141514]">
                {modalidad === 'agendar' ? '4.' : '3.'} Motivo de la consulta
              </label>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe brevemente tus síntomas o dudas médicas..."
                className="w-full p-3.5 rounded-[4px] bg-[#f7f7f5] border-0 text-[14px] text-[#141514] placeholder:text-[#73746f] focus:outline-none focus:ring-1 focus:ring-[#141514] focus:bg-white resize-none"
              />
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
            Confirmar chat
          </button>
        </div>
      </div>
    </div>
  );
};
