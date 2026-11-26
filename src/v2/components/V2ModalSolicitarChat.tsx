import React, { useState, useEffect } from 'react';
import { X, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

interface V2ModalSolicitarChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = [
  { day: 'Hoy', date: '22 Oct', slots: ['09:30', '11:00', '12:30'] },
  { day: 'Mañana', date: '23 Oct', slots: ['09:30', '11:00', '13:30'] },
  { day: 'Miércoles', date: '25 Oct', slots: ['10:00', '12:30', '16:00'] },
];

export const V2ModalSolicitarChat: React.FC<V2ModalSolicitarChatProps> = ({ isOpen, onClose }) => {
  const [modalidad, setModalidad] = useState<'agendar' | 'ahora'>('agendar');
  const [specialty, setSpecialty] = useState('Medicina General');
  const [selectedSlot, setSelectedSlot] = useState('Hoy · 22 Oct · 11:00');
  const [motivo, setMotivo] = useState('');
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
        className="w-full max-w-[620px] bg-white rounded-[24px] shadow-[0_24px_64px_rgba(11,28,52,0.22)] border border-[#e2e8f0] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#f1f5f9] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold text-[#0b1c34]">
                {confirmed ? 'Chat confirmado con éxito' : 'Solicitar chat médico'}
              </h2>
              <p className="text-[13px] text-[#64748b]">
                {confirmed
                  ? 'Tu consulta ha sido registrada correctamente.'
                  : 'Elige modalidad, especialidad y motivo de tu consulta.'}
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
                {modalidad === 'ahora'
                  ? 'Conectando con el especialista de guardia...'
                  : 'Te enviaremos un recordatorio 15 minutos antes.'}
              </span>
            </div>

            <div className="bg-[#f8f8f7] rounded-[18px] p-5 border border-[#e2e8f0] divide-y divide-[#e2e8f0] text-[14px]">
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Modalidad</span>
                <span className="font-bold text-[#0b1c34]">
                  {modalidad === 'ahora' ? 'Hablar ahora' : 'Cita agendada'}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Especialidad</span>
                <span className="font-bold text-[#0b1c34]">{specialty}</span>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748b]">Especialista</span>
                <span className="font-bold text-[#0b1c34]">Dra. María Fernández</span>
              </div>
              {modalidad === 'agendar' && (
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#64748b]">Horario</span>
                  <span className="font-bold text-[#0b1c34]">{selectedSlot}</span>
                </div>
              )}
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
            {/* Modality toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#0b1c34]">Modalidad de atención</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModalidad('agendar')}
                  className={`p-3.5 rounded-[14px] border text-left transition-all cursor-pointer ${
                    modalidad === 'agendar'
                      ? 'border-[#0b1c34] bg-[#0b1c34] text-white'
                      : 'border-[#e2e8f0] bg-[#f8f8f7] text-[#0b1c34]'
                  }`}
                >
                  <div className="text-[14px] font-bold">Agendar cita</div>
                  <div className={`text-[12px] ${modalidad === 'agendar' ? 'text-slate-300' : 'text-[#64748b]'}`}>
                    Elegir día y horario
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setModalidad('ahora')}
                  className={`p-3.5 rounded-[14px] border text-left transition-all cursor-pointer ${
                    modalidad === 'ahora'
                      ? 'border-[#d50475] bg-[#d50475] text-white'
                      : 'border-[#e2e8f0] bg-[#f8f8f7] text-[#0b1c34]'
                  }`}
                >
                  <div className="text-[14px] font-bold">Hablar ahora</div>
                  <div className={`text-[12px] ${modalidad === 'ahora' ? 'text-pink-100' : 'text-[#64748b]'}`}>
                    Atención médica inmediata
                  </div>
                </button>
              </div>
            </div>

            {/* Specialty */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Especialidad</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#0b1c34] text-[14px] text-[#0b1c34] outline-none"
              >
                <option value="Medicina General">Medicina General</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Nutrición">Nutrición</option>
              </select>
            </div>

            {/* Schedule grid if agendar */}
            {modalidad === 'agendar' && (
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-[#0b1c34] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#2563eb]" />
                  <span>Selecciona fecha y horario</span>
                </label>
                <div className="grid grid-cols-3 gap-3 bg-[#f8f8f7] p-4 rounded-[16px] border border-[#e2e8f0]">
                  {DAYS.map((col) => (
                    <div key={col.date} className="flex flex-col gap-2">
                      <div className="text-center">
                        <div className="text-[11px] font-bold uppercase text-[#64748b]">{col.day}</div>
                        <div className="text-[13px] font-extrabold text-[#0b1c34]">{col.date}</div>
                      </div>
                      {col.slots.map((slot) => {
                        const key = `${col.day} · ${col.date} · ${slot}`;
                        const active = selectedSlot === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedSlot(key)}
                            className={`h-[38px] rounded-[10px] text-[13px] font-bold transition-all cursor-pointer ${
                              active
                                ? 'bg-[#d50475] text-white shadow-xs'
                                : 'bg-white border border-[#e2e8f0] text-[#0b1c34] hover:border-[#0b1c34]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Motivo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Motivo de consulta</label>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe brevemente tus síntomas o dudas médicas..."
                className="w-full p-3.5 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#0b1c34] text-[14px] text-[#0b1c34] placeholder:text-[#94a3b8] outline-none resize-none"
              />
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
                Confirmar chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
