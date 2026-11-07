import React, { useState, useEffect } from 'react';
import { X, Check, Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';
import { Dropdown } from '../design-system/atoms/Dropdown';

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
  // Solicitado por el usuario:
  // En vez de un toggle poco obvio, el modal cuenta con un Paso 1 que es un dropdown
  // para seleccionar la modalidad: 'Agendar cita' o 'Hablar ahora'.
  const [modalidad, setModalidad] = useState<'agendar' | 'ahora'>(defaultTab);

  // Campos obligatorios solicitados con asterisco (*)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Medicina General');
  const [motivoChat, setMotivoChat] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('MAÑANA 23 Oct');
  const [selectedTime, setSelectedTime] = useState<string>('09:30');

  useEffect(() => {
    if (isOpen) {
      setModalidad(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  // Validación de obligatoriedad: especialidad*, motivo* y día*
  const isSpecialtyDone = Boolean(selectedSpecialty);
  const isMotivoDone = motivoChat.trim().length > 0;
  const isDayDone = modalidad === 'ahora' ? true : Boolean(selectedDay && selectedTime);
  const isFullyComplete = isSpecialtyDone && isMotivoDone && isDayDone;

  const specialties = ['Medicina General', 'Psicología', 'Nutrición', 'Pediatría'];

  const daysSchedule = [
    { day: 'HOY', date: '22 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
    { day: 'MAÑANA', date: '23 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
    { day: 'MIÉRCOLES', date: '25 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
    { day: 'VIERNES', date: '27 Oct', slots: ['09:30', '11:00', '', ''] },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn font-[family-name:Helvetica]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[660px] bg-white rounded-[14px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[92vh] overflow-y-auto animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e2e8f0]">
          <div>
            <h2 className="text-[22px] leading-[28px] font-bold text-black">
              Solicitar chat
            </h2>
            <p className="text-[13px] text-[#64748b] mt-0.5">
              Completa los datos requeridos para conectar con el especialista médico
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Stepper Track + Formulario */}
        <div className="flex gap-[16px]">
          
          {/* Stepper Track con viñetas conectadas */}
          <div className="flex flex-col items-center pt-1 shrink-0 w-[28px]">
            {/* Paso 1: Modalidad */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#d50475] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className="w-[2px] flex-1 min-h-[64px] my-1 bg-[#d50475]/30" />

            {/* Paso 2: Médico asignado */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#d50475] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className="w-[2px] flex-1 min-h-[85px] my-1 bg-[#d50475]/30" />

            {/* Paso 3: Especialidad */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#d50475] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
            <div className={`w-[2px] flex-1 min-h-[90px] my-1 transition-colors ${
              isMotivoDone ? 'bg-[#d50475]/30' : 'bg-[#e2e8f0]'
            }`} />

            {/* Paso 4: Motivo */}
            <div
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all ${
                isMotivoDone
                  ? 'bg-[#d50475] text-white shadow-xs'
                  : 'border-2 border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
              }`}
            >
              {isMotivoDone ? (
                <Check className="w-[14px] h-[14px] stroke-[3]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
              )}
            </div>
            <div className="w-[2px] flex-1 min-h-[95px] my-1 bg-[#e2e8f0]" />

            {/* Paso 5: Horario / Día */}
            <div className="w-[26px] h-[26px] rounded-full bg-[#d50475] text-white flex items-center justify-center shadow-xs">
              <Check className="w-[14px] h-[14px] stroke-[3]" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 flex flex-col gap-[22px]">
            
            {/* PASO 1 (DROPDOWN HOMOLOGADO): Modalidad de atención */}
            <div className="flex flex-col gap-[6px]">
              <Dropdown
                label="1. Modalidad de atención"
                required
                value={modalidad}
                onChange={(val) => setModalidad(val as 'agendar' | 'ahora')}
                options={[
                  { value: 'agendar', label: 'Agendar cita (Elegir fecha y horario)' },
                  { value: 'ahora', label: 'Hablar ahora (Atención médica inmediata)' },
                ]}
                helperText="Elige si deseas agendar tu cita con anticipación o ser atendido en este momento"
              />
            </div>

            {/* PASO 2: Médico asignado con Badge homologado */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-normal text-black leading-tight">2. Médico asignado</span>
                <span className="text-[12px] text-[#64748b] mt-0.5">Especialista disponible para tu consulta</span>
              </div>

              <div className="p-3.5 rounded-[8px] border-2 border-[#e2e8f0] bg-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] flex items-center justify-center font-bold text-black text-sm shrink-0">
                    MF
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-black">Dra. María Fernández</span>
                    <span className="text-[13px] text-[#64748b]">Medicina General · Nutrición</span>
                  </div>
                </div>
                <Badge variant="disponible">Disponible</Badge>
              </div>
            </div>

            {/* PASO 3: Especialidad requerida* (Obligatorio) */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex flex-col">
                <label className="text-[14px] font-bold text-black">
                  3. Especialidad requerida<span className="text-[#d50475]">*</span>
                </label>
                <span className="text-[12px] text-[#64748b]">Selecciona la rama de salud para tu consulta</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`h-[42px] px-3.5 rounded-[8px] border text-[15px] font-normal flex items-center justify-between transition-colors cursor-pointer ${
                      selectedSpecialty === spec
                        ? 'border-black bg-[#f1f5f9] text-black font-semibold'
                        : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                    }`}
                  >
                    <span>{spec}</span>
                    {selectedSpecialty === spec && (
                      <Check className="w-4 h-4 text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 4: Motivo de la consulta* (Obligatorio) */}
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px] font-normal text-black leading-tight">
                4. Motivo de la consulta<span className="text-[#d50475]">*</span>
              </label>
              <span className="text-[12px] text-[#64748b]">Describe brevemente el síntoma o motivo</span>
              <textarea
                required
                rows={3}
                value={motivoChat}
                onChange={(e) => setMotivoChat(e.target.value)}
                placeholder="Escribe brevemente tu motivo de consulta (ej. dudas sobre medicación o dolor de garganta)..."
                className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] text-[16px] font-normal text-black bg-white focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* PASO 5: Día y Horario disponible* (Obligatorio) */}
            {modalidad === 'agendar' ? (
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col">
                  <label className="text-[14px] font-bold text-black">
                    5. Día y horario disponible<span className="text-[#d50475]">*</span>
                  </label>
                  <span className="text-[12px] text-[#64748b]">Elige la fecha y hora que mejor te acomode</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {daysSchedule.map((col, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDay(`${col.day} ${col.date}`)}
                      className={`p-2 rounded-[6px] border flex flex-col gap-1 text-center cursor-pointer transition-colors ${
                        selectedDay === `${col.day} ${col.date}`
                          ? 'border-[#d50475] bg-[#fdf2f8]'
                          : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#64748b]">{col.day}</span>
                      <span className="text-[12px] font-bold text-black">{col.date}</span>
                      <div className="flex flex-col gap-1 mt-1">
                        {col.slots.slice(0, 2).map((slot, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDay(`${col.day} ${col.date}`);
                              setSelectedTime(slot);
                            }}
                            className={`h-[26px] rounded-[4px] border text-[11px] font-bold transition-colors cursor-pointer ${
                              selectedTime === slot && selectedDay === `${col.day} ${col.date}`
                                ? 'bg-[#d50475] text-white border-[#d50475]'
                                : 'bg-white text-black border-[#cbd5e1]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#fdf2f8] rounded-[6px] px-3 py-2 flex items-center justify-between text-[12px] text-[#d50475]">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Cita seleccionada:</span>
                  </div>
                  <span className="font-bold text-black">
                    {selectedDay} a las {selectedTime} hrs
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col">
                  <label className="text-[14px] font-bold text-black">
                    5. Canal de atención inmediata<span className="text-[#d50475]">*</span>
                  </label>
                  <span className="text-[12px] text-[#64748b]">Atención médica prioritaria en tiempo real</span>
                </div>

                <div className="bg-[#fdf2f8] rounded-[6px] px-3.5 py-2.5 flex items-center justify-between text-[13px] text-[#d50475] border border-[#fce7f3]">
                  <div className="flex items-center gap-2 font-bold">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Conexión inmediata</span>
                  </div>
                  <span className="font-bold text-black">
                    Médicos listos · Espera estimada 5 min
                  </span>
                </div>
              </div>
            )}

            {/* Botón de Confirmación */}
            <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
              <span className="text-[12px] text-[#64748b]">
                <span className="text-[#d50475] font-bold">*</span> Campos obligatorios
              </span>

              <button
                type="button"
                onClick={onClose}
                className="h-[40px] px-6 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white font-bold text-[14px] uppercase transition-colors cursor-pointer shadow-xs"
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
