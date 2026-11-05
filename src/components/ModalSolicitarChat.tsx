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

  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-[620px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto">
        
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

        {/* Médico asignado */}
        <div className="flex items-start gap-[14px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
            <Check className="w-[14px] h-[14px] stroke-[3]" />
          </div>
          <div className="flex-1 flex flex-col gap-[8px]">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-black">Médico asignado</span>
              <span className="text-[12px] text-[#64748b]">Especialista asignado</span>
            </div>

            <div className="p-3 rounded-[8px] border border-[#e2e8f0] flex items-center gap-3 bg-[#f8fafc]">
              <div className="w-10 h-10 rounded-full bg-[#e2e8f0] overflow-hidden flex items-center justify-center font-bold text-sm text-[#0f172a]">
                MF
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">María Fernández</span>
                <span className="text-[12px] text-[#64748b]">Medicina General · Nutrición · Psicología</span>
              </div>
            </div>
          </div>
        </div>

        {/* Especialidad requerida */}
        <div className="flex items-start gap-[14px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
            <Check className="w-[14px] h-[14px] stroke-[3]" />
          </div>
          <div className="flex-1 flex flex-col gap-[10px]">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-black">Especialidad requerida</span>
              <span className="text-[12px] text-[#64748b]">Selecciona una especialidad</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specialties.map((spec) => (
                <label
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`p-2.5 rounded-[6px] border flex items-center gap-2.5 cursor-pointer text-[13px] ${
                    selectedSpecialty === spec
                      ? 'border-[#d50475] bg-[#fdf2f8]/40 text-black font-medium'
                      : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecialty === spec}
                    onChange={() => setSelectedSpecialty(spec)}
                    className="w-4 h-4 accent-[#d50475] rounded"
                  />
                  <span>{spec}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Motivo de la consulta */}
        <div className="flex items-start gap-[14px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
            <Check className="w-[14px] h-[14px] stroke-[3]" />
          </div>
          <div className="flex-1 flex flex-col gap-[6px]">
            <span className="text-[14px] font-bold text-black">Motivo de la consulta</span>
            <span className="text-[12px] text-[#64748b]">Describe el motivo de la consulta</span>
            <textarea
              rows={3}
              placeholder="Escribe el motivo..."
              className="w-full p-2.5 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#d50475]"
            />
          </div>
        </div>

        {/* Horario section */}
        {tab === 'agendar' ? (
          <div className="flex items-start gap-[14px]">
            <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className="flex-1 flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">Horario disponible</span>
                <span className="text-[12px] text-[#64748b]">Selecciona día y horario disponible</span>
              </div>

              {/* Schedule cards matching EVR - 9 */}
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
                                ? 'border-[#d50475] text-[#d50475] font-bold bg-[#fdf2f8]'
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

              <div className="bg-[#fdf2f8] rounded-[6px] px-3 py-2 flex items-center justify-between text-[12px] text-[#d50475] mt-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Cita seleccionada</span>
                </div>
                <span className="font-medium text-black">
                  Mañana 21 de Octubre a las <strong className="font-bold">{selectedTime} hrs</strong>
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[38px] px-5 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer"
                >
                  Confirmar cita
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-[14px]">
            <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className="flex-1 flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">Horario</span>
                <span className="text-[12px] text-[#64748b]">Canal de atención inmediata</span>
              </div>

              <div className="bg-[#fdf2f8] rounded-[6px] px-3 py-2.5 flex items-center justify-between text-[13px] text-[#d50475]">
                <div className="flex items-center gap-1.5 font-bold">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Cita seleccionada</span>
                </div>
                <span className="font-medium text-black">
                  Hoy, 20 Oct <strong className="font-bold text-[#d50475]">Ahora mismo</strong>
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[38px] px-5 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer"
                >
                  Entrar al chat ahora
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
