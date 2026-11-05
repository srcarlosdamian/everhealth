import React, { useState, useEffect } from 'react';
import { X, Check, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalSolicitarChatProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'agendar' | 'ahora';
}

export const ModalSolicitarChat: React.FC<ModalSolicitarChatProps> = ({
  isOpen,
  onClose,
  defaultTab = 'agendar',
}) => {
  const [tab, setTab] = useState<'agendar' | 'ahora'>(defaultTab);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Medicina General');
  const [selectedTime, setSelectedTime] = useState<string>('09:30');
  const [motivoChat, setMotivoChat] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const isStep1Done = true; // Assigned doctor
  const isStep2Done = Boolean(selectedSpecialty);
  const isStep3Done = motivoChat.trim().length > 0;
  const isStep4Done = Boolean(selectedTime);
  const isFullyComplete = isStep1Done && isStep2Done && isStep3Done && isStep4Done;

  const specialties = ['Medicina General', 'Psicología', 'Medicina', 'Nutrición'];

  const daysSchedule = [
    { day: 'HOY', date: '22 Oct', slots: ['09:30', '11:00', '12:30', '1:30'] },
    { day: 'MAÑANA', date: '23 Oct', slots: ['09:30', '11:00', '12:30', '1:30'] },
    { day: 'MIÉRCOLES', date: '25 Oct', slots: ['09:30', '11:00', '12:30', '1:30'] },
    { day: 'VIERNES', date: '25 Oct', slots: ['09:30', '', '', ''] },
    { day: 'DOMINGO', date: '27 Oct', slots: ['09:30', '11:00', '', '1:30'] },
    { day: 'DOMINGO', date: '27 Oct', slots: ['09:30', '11:00', '12:30', '1:30'] },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={(e) => {
        // Closes on clicking outside modal container
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[640px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e2e8f0]">
          <h2 className="text-[22px] leading-[28px] font-bold text-black">
            Solicitar chat
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Tab switch matching EVR - 9 and EVR - 120 */}
        <div className="inline-flex rounded-[8px] bg-[#f1f5f9] p-[3px] w-fit">
          <button
            type="button"
            onClick={() => setTab('agendar')}
            className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-bold transition-all cursor-pointer ${
              tab === 'agendar'
                ? 'bg-white text-black shadow-xs'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Agendar cita
          </button>
          <button
            type="button"
            onClick={() => setTab('ahora')}
            className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-bold transition-all cursor-pointer ${
              tab === 'ahora'
                ? 'bg-white text-black shadow-xs'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Hablar ahora
          </button>
        </div>

        {/* Stepper track + Content */}
        <div className="flex gap-[16px]">
          
          {/* Stepper Track with 900 Magenta Checks and Connecting Lines */}
          <div className="flex flex-col items-center pt-1 shrink-0 w-[28px]">
            {/* Step 1 */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#70083a] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className="w-[2px] flex-1 min-h-[90px] my-1 bg-[#70083a]/30" />

            {/* Step 2 */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#70083a] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className={`w-[2px] flex-1 min-h-[110px] my-1 transition-colors ${
              isStep3Done ? 'bg-[#70083a]/30' : 'bg-[#e2e8f0]'
            }`} />

            {/* Step 3 (Motivo) */}
            <div
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all ${
                isStep3Done
                  ? 'bg-[#70083a] text-white shadow-xs'
                  : 'border-2 border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
              }`}
            >
              {isStep3Done ? (
                <Check className="w-[14px] h-[14px] stroke-[3]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
              )}
            </div>
            <div className="w-[2px] flex-1 min-h-[120px] my-1 bg-[#e2e8f0]" />

            {/* Step 4 */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#70083a] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 flex flex-col gap-[24px]">
            
            {/* 1. Médico asignado (Con borde prominente garantizado en Hablar ahora y Agendar) */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">Médico asignado</span>
                <span className="text-[12px] text-[#64748b]">Especialista asignado para tu atención</span>
              </div>

              {/* Doctor Card with clean visible border */}
              <div className="p-3.5 rounded-[8px] border-2 border-[#e2e8f0] hover:border-[#cbd5e1] flex items-center justify-between gap-3 bg-white shadow-2xs transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center font-bold text-sm text-black shrink-0">
                    MF
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-black">María Fernández</span>
                    <span className="text-[12px] text-[#64748b]">Medicina General · Nutrición · Psicología</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-[4px] bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[11px] font-bold shrink-0">
                  Disponible
                </span>
              </div>
            </div>

            {/* 2. Especialidad requerida */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">Especialidad requerida</span>
                <span className="text-[12px] text-[#64748b]">Selecciona una especialidad</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {specialties.map((spec) => (
                  <label
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`p-2.5 rounded-[6px] border flex items-center gap-2.5 cursor-pointer text-[13px] transition-colors ${
                      selectedSpecialty === spec
                        ? 'border-[#70083a] bg-[#fdf2f8]/50 text-black font-medium'
                        : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSpecialty === spec}
                      onChange={() => setSelectedSpecialty(spec)}
                      className="w-4 h-4 accent-[#70083a] rounded"
                    />
                    <span>{spec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Motivo de la consulta */}
            <div className="flex flex-col gap-[6px]">
              <span className="text-[14px] font-bold text-black">Motivo de la consulta</span>
              <span className="text-[12px] text-[#64748b]">Describe el motivo de la consulta</span>
              <textarea
                rows={3}
                value={motivoChat}
                onChange={(e) => setMotivoChat(e.target.value)}
                placeholder="Escribe brevemente tu duda médica..."
                className="w-full p-2.5 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#70083a] transition-colors"
              />
            </div>

            {/* 4. Horario */}
            {tab === 'agendar' ? (
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black">Horario disponible</span>
                  <span className="text-[12px] text-[#64748b]">Selecciona día y horario disponible</span>
                </div>

                {/* Schedule cards */}
                <div className="relative flex items-center gap-1 overflow-x-auto py-1">
                  <button type="button" className="w-6 h-6 rounded-full border border-[#cbd5e1] flex items-center justify-center shrink-0 hover:bg-[#f8fafc]">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full text-center">
                    {daysSchedule.map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="text-[10px] font-bold text-[#64748b]">{col.day}</div>
                        <div className="text-[12px] font-bold text-black">{col.date}</div>
                        {col.slots.map((slot, sIdx) => (
                          slot ? (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`h-[28px] rounded-[4px] border text-[11px] font-medium transition-colors cursor-pointer ${
                                selectedTime === slot && idx === 1
                                  ? 'border-[#70083a] text-[#70083a] font-bold bg-[#fdf2f8]'
                                  : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                              }`}
                            >
                              {slot}
                            </button>
                          ) : (
                            <div key={sIdx} className="h-[28px] rounded-[4px] border border-[#f1f5f9] bg-[#f8fafc]" />
                          )
                        ))}
                      </div>
                    ))}
                  </div>
                  <button type="button" className="w-6 h-6 rounded-full border border-[#cbd5e1] flex items-center justify-center shrink-0 hover:bg-[#f8fafc]">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-[#fdf2f8] rounded-[6px] px-3 py-2 flex items-center justify-between text-[12px] text-[#70083a] mt-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Cita seleccionada</span>
                  </div>
                  <span className="font-medium text-black">
                    Mañana 23 de Octubre a las <strong className="font-bold">{selectedTime} hrs</strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black">Horario</span>
                  <span className="text-[12px] text-[#64748b]">Canal de atención inmediata</span>
                </div>

                <div className="bg-[#fdf2f8] rounded-[6px] px-3 py-2.5 flex items-center justify-between text-[13px] text-[#70083a] border border-[#fce7f3]">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Atención inmediata</span>
                  </div>
                  <span className="font-medium text-black">
                    Hoy · <strong className="font-bold text-[#70083a]">En línea ahora mismo</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
              {!isFullyComplete ? (
                <span className="text-[12px] text-[#94a3b8] italic">
                  * Describe el motivo para habilitar tu cita
                </span>
              ) : (
                <span className="text-[12px] text-[#166534] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Todo listo
                </span>
              )}

              <button
                type="button"
                onClick={onClose}
                className={`h-[38px] px-5 rounded-[6px] text-[13px] font-bold transition-all cursor-pointer ${
                  isFullyComplete
                    ? 'bg-[#d50475] hover:bg-[#b80364] text-white shadow-xs'
                    : 'bg-[#cbd5e1] text-[#64748b] hover:bg-[#94a3b8] hover:text-white'
                }`}
                title={!isFullyComplete ? 'Prototipo: Puedes pulsar para confirmar' : 'Confirmar cita'}
              >
                Confirmar cita
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
