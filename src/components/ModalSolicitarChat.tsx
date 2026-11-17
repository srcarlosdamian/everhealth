import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { Radio } from '../design-system/atoms/Radio';
import { Button } from '../design-system/atoms/Button';
import { CalendarDaySlots } from '../design-system/molecules/CalendarDaySlots';
import { SelectedAppointmentBanner } from '../design-system/molecules/SelectedAppointmentBanner';
import { AssignedDoctorCard } from '../design-system/molecules/AssignedDoctorCard';

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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[660px] bg-white rounded-[14px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[92vh] overflow-y-auto animate-scaleUp cursor-default"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e2e8f0]">
          <div>
            <h2 className="text-[22px] leading-[28px] font-bold text-black">
              Solicitar chat
            </h2>
            <p className="text-[13px] text-[var(--color-page-subtitle)] mt-0.5 font-normal">
              Completa los datos requeridos para conectar con el especialista médico
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer shrink-0 -mr-1 -mt-1"
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Form Body con Stepper vertical estructurado paso a paso donde cada check está exactamente al lado del número */}
        <div className="flex flex-col">
          
          {/* PASO 1: Modalidad de atención */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepperCheck isCompleted={true} />
              <div className="w-[2px] flex-1 my-1 bg-[#831843]/30 min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[6px]">
              <div className="h-[26px] flex items-center">
                <label className="text-[14px] font-bold text-black leading-tight">
                  1. Modalidad de atención<span className="text-[#d50475]">*</span>
                </label>
              </div>
              <Dropdown
                value={modalidad}
                onChange={(val) => setModalidad(val as 'agendar' | 'ahora')}
                options={[
                  { value: 'agendar', label: 'Agendar cita (Elegir fecha y horario)' },
                  { value: 'ahora', label: 'Hablar ahora (Atención médica inmediata)' },
                ]}
                helperText="Elige si deseas agendar tu cita con anticipación o ser atendido en este momento"
              />
            </div>
          </div>

          {/* PASO 2: Médico asignado */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepperCheck isCompleted={true} />
              <div className="w-[2px] flex-1 my-1 bg-[#831843]/30 min-h-[30px]" />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[6px]">
              <div className="h-[26px] flex items-center">
                <span className="text-[14px] font-bold text-black leading-tight">
                  2. Médico asignado
                </span>
              </div>
              <span className="text-[12px] text-[#64748b] -mt-1">
                Especialista disponible para tu consulta
              </span>

              <AssignedDoctorCard
                initials="MF"
                name="Dra. María Fernández"
                specialty="Medicina General · Nutrición"
                badgeText="Disponible ahora"
                badgeVariant="disponible-ahora"
              />
            </div>
          </div>

          {/* PASO 3: Especialidad requerida* */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepperCheck isCompleted={isSpecialtyDone} />
              <div
                className={`w-[2px] flex-1 my-1 transition-colors min-h-[30px] ${
                  isMotivoDone ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
                }`}
              />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <div className="h-[26px] flex items-center">
                <label className="text-[14px] font-bold text-black leading-tight">
                  3. Especialidad requerida<span className="text-[#d50475]">*</span>
                </label>
              </div>
              <span className="text-[12px] text-[#64748b] -mt-1">
                Selecciona la rama de salud para tu consulta
              </span>

              <div className="grid grid-cols-2 gap-2">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`h-[42px] px-3.5 rounded-[8px] border text-[14px] flex items-center justify-between transition-colors cursor-pointer ${
                      selectedSpecialty === spec
                        ? 'border-black bg-[#f1f5f9] text-black font-semibold'
                        : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black font-normal'
                    }`}
                  >
                    <span>{spec}</span>
                    <Radio checked={selectedSpecialty === spec} size="sm" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PASO 4: Motivo de la consulta* */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepperCheck isCompleted={isMotivoDone} />
              <div
                className={`w-[2px] flex-1 my-1 transition-colors min-h-[30px] ${
                  isDayDone ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
                }`}
              />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <div className="h-[26px] flex items-center">
                <label className="text-[14px] font-bold text-black leading-tight">
                  4. Motivo de la consulta<span className="text-[#d50475]">*</span>
                </label>
              </div>
              <span className="text-[12px] text-[#64748b] -mt-1">
                Describe brevemente el síntoma o motivo
              </span>
              <textarea
                required
                rows={3}
                value={motivoChat}
                onChange={(e) => setMotivoChat(e.target.value)}
                placeholder="Escribe brevemente tu motivo de consulta (ej. dudas sobre medicación o dolor de garganta)..."
                className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] text-[15px] font-normal text-black bg-white focus:outline-none focus:border-black hover:border-[#475569] transition-colors"
              />
            </div>
          </div>

          {/* PASO 5: Día y Horario disponible* */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[26px]">
              <StepperCheck isCompleted={isDayDone} />
              {/* Sin línea vertical saliente en el último paso */}
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
              {modalidad === 'agendar' ? (
                <div className="flex flex-col gap-[10px]">
                  <div className="h-[26px] flex items-center">
                    <label className="text-[14px] font-bold text-black leading-tight">
                      5. Día y horario disponible<span className="text-[#d50475]">*</span>
                    </label>
                  </div>
                  <span className="text-[12px] text-[#64748b] -mt-1">
                    Elige la fecha y hora que mejor te acomode
                  </span>

                  <CalendarDaySlots
                    days={daysSchedule.map((d) => ({
                      dayName: d.day,
                      dateNumber: d.date,
                      slots: d.slots.filter(Boolean),
                    }))}
                    selectedDay={selectedDay}
                    selectedTime={selectedTime}
                    onSelectSlot={(day, time) => {
                      setSelectedDay(day);
                      setSelectedTime(time);
                    }}
                    colorTheme="neutral"
                  />

                  <SelectedAppointmentBanner
                    dateText={selectedDay}
                    timeText={`${selectedTime} hrs`}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-[8px]">
                  <div className="h-[26px] flex items-center">
                    <label className="text-[14px] font-bold text-black leading-tight">
                      5. Canal de atención inmediata<span className="text-[#d50475]">*</span>
                    </label>
                  </div>
                  <span className="text-[12px] text-[#64748b] -mt-1">
                    Atención médica prioritaria en tiempo real
                  </span>

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
            </div>
          </div>

        </div>

        {/* Footer con Botón de Confirmación y campos obligatorios */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#f1f5f9]">
          <span className="text-[12px] text-[var(--color-page-subtitle)]">
            <span className="text-[#d50475] font-bold">*</span> Campos obligatorios
          </span>

          <Button
            variant="primary"
            type="button"
            onClick={onClose}
            className="h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]"
          >
            CONFIRMAR CITA
          </Button>
        </div>

      </div>
    </div>
  );
};
