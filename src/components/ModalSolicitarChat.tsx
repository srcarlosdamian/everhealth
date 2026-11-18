import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { Radio } from '../design-system/atoms/Radio';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { CalendarDaySlots } from '../design-system/molecules/CalendarDaySlots';
import { SelectedAppointmentBanner } from '../design-system/molecules/SelectedAppointmentBanner';
import { AssignedDoctorCard } from '../design-system/molecules/AssignedDoctorCard';

export interface ImmediateChatPayload {
  doctorName: string;
  specialty: string;
  reason: string;
}

interface ModalSolicitarChatProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'agendar' | 'ahora';
  doctorName?: string;
  onStartImmediateChat?: (payload?: ImmediateChatPayload) => void;
}

export const ModalSolicitarChat: React.FC<ModalSolicitarChatProps> = ({
  isOpen,
  onClose,
  defaultTab = 'agendar',
  doctorName = 'Dra. María Fernández',
  onStartImmediateChat,
}) => {
  const [modalidad, setModalidad] = useState<'agendar' | 'ahora'>(defaultTab);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  // Doctor asignado dinámico
  const docInfo = useMemo(() => {
    const raw = doctorName || 'Dra. María Fernández';
    const clean = raw.replace(/^Dr\.\s*|^Dra\.\s*/i, '');
    const isFemale =
      raw.startsWith('Dra.') ||
      clean.startsWith('María') ||
      clean.startsWith('Ana') ||
      clean.startsWith('Fernanda') ||
      clean.startsWith('Clara') ||
      clean.startsWith('Sofía');
    const title = isFemale ? 'Dra. ' : 'Dr. ';
    const fullName = raw.startsWith('Dr.') || raw.startsWith('Dra.') ? raw : `${title}${clean}`;
    const initials =
      clean
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join('') || 'MF';

    let specialty = 'Medicina General · Nutrición';
    if (/Luis/i.test(clean)) specialty = 'Pediatría · Dermatología';
    else if (/Javier/i.test(clean)) specialty = 'Oftalmología · Otorrinolaringología';
    else if (/Clara/i.test(clean)) specialty = 'Ginecología · Fisioterapia';
    else if (/Bruno/i.test(clean)) specialty = 'Medicina General · Sexología';
    else if (/Ana/i.test(clean)) specialty = 'Medicina General · Psicología';
    else if (/Benito/i.test(clean)) specialty = 'Pediatría · Psiquiatría';
    else if (/Sofía/i.test(clean)) specialty = 'Ginecología · Cardiología';

    return { fullName, initials, specialty };
  }, [doctorName]);

  if (!isOpen) return null;

  // Validación de obligatoriedad: especialidad*, motivo* y día*
  const isSpecialtyDone = Boolean(selectedSpecialty);
  const isMotivoDone = motivoChat.trim().length > 0;
  const isDayDone = modalidad === 'ahora' ? true : Boolean(selectedDay && selectedTime);
  const isAllRequiredDone = isSpecialtyDone && isMotivoDone && isDayDone;

  const specialties = ['Medicina General', 'Psicología', 'Nutrición', 'Pediatría'];

  // VISTA 2: CITA CONFIRMADA (En el mismo modal, sin doble modal, estilo resumen/ticket)
  if (isConfirmed) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-confirmado-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto custom-scrollbar-minimal font-[family-name:Helvetica]"
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[560px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto custom-scrollbar-minimal cursor-default animate-scaleUp"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#16a34a]">
                CHAT MÉDICO · CITA CONFIRMADA
              </span>
              <h2
                id="chat-confirmado-title"
                className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug mt-1"
              >
                Cita confirmada con éxito
              </h2>
              <p className="text-[13px] text-[#64748b] mt-0.5">
                Hemos programado tu consulta por chat. Recibirás un recordatorio antes del inicio.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0 -mr-1"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Listado en formato resumen / ticket */}
          <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] p-4 sm:p-5 flex flex-col divide-y divide-[#e2e8f0]">
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Especialidad</span>
              <span className="font-bold text-black">{selectedSpecialty || 'Medicina General'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Modalidad</span>
              <span className="font-bold text-black">Chat médico programado</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Día</span>
              <span className="font-bold text-black">{selectedDay}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Hora</span>
              <span className="font-bold text-black">{selectedTime} hrs</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Paciente</span>
              <span className="font-bold text-black">Alejandro Navarro (Titular)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Profesional asignado</span>
              <span className="font-bold text-black">{docInfo.fullName}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Estado</span>
              <Badge variant="activa">Confirmada</Badge>
            </div>
          </div>

          {/* Aviso informativo de activación */}
          <div className="p-3.5 bg-white border border-[#e2e8f0] rounded-[8px] flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-[#d50475] shrink-0 mt-0.5" />
            <p className="text-[13px] text-[#475569] leading-relaxed">
              El chat médico se habilitará <strong className="text-black font-semibold">15 minutos antes</strong> de la cita. Podrás iniciar la conversación desde tu Historial de Consultas.
            </p>
          </div>

          {/* Footer de navegación */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3.5 border-t border-[#f1f5f9]">
            <Button
              variant="outline"
              onClick={() => {
                handleClose();
                window.location.hash = '#/historial-consultas';
              }}
              className="w-full sm:w-auto"
            >
              IR AL HISTORIAL
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                window.location.hash = '#/home';
              }}
              className="w-full sm:w-auto"
            >
              VOLVER AL INICIO
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const daysSchedule = [
    { day: 'HOY', date: '22 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
    { day: 'MAÑANA', date: '23 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
    { day: 'MIÉRCOLES', date: '25 Oct', slots: ['09:30', '11:00', '12:30', '13:30'] },
    { day: 'VIERNES', date: '27 Oct', slots: ['09:30', '11:00', '', ''] },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto custom-scrollbar-minimal animate-fadeIn font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[660px] bg-white rounded-[14px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[92vh] overflow-y-auto custom-scrollbar-minimal animate-scaleUp cursor-default"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug">
              Solicitar chat
            </h2>
            <p className="text-[13px] text-[var(--color-page-subtitle)] mt-0.5 font-normal">
              Completa los datos requeridos para conectar con el especialista médico
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0"
            title="Cerrar"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
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
                initials={docInfo.initials}
                name={docInfo.fullName}
                specialty={docInfo.specialty}
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
                  isSpecialtyDone ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
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
                    className={`h-[42px] px-3.5 rounded-none border text-[14px] flex items-center gap-3 transition-colors cursor-pointer ${
                      selectedSpecialty === spec
                        ? 'border-[#cbd5e1] bg-[#f8fafc] text-black font-semibold'
                        : 'border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] bg-white text-black font-normal'
                    }`}
                  >
                    <Radio checked={selectedSpecialty === spec} size="sm" />
                    <span>{spec}</span>
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

          <button
            type="button"
            onClick={() => {
              if (modalidad === 'ahora') {
                handleClose();
                onStartImmediateChat?.({
                  doctorName: docInfo.fullName,
                  specialty: selectedSpecialty,
                  reason: motivoChat.trim() || 'Consulta médica inmediata',
                });
              } else {
                setIsConfirmed(true);
              }
            }}
            title={
              !isAllRequiredDone
                ? 'Campos obligatorios pendientes (prototipo: clic habilitado)'
                : undefined
            }
            className={`h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px] transition-all cursor-pointer select-none inline-flex items-center justify-center ${
              isAllRequiredDone
                ? 'bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white shadow-xs'
                : 'bg-[#cbd5e1] hover:bg-[#94a3b8] text-[#475569] shadow-none'
            }`}
          >
            {modalidad === 'ahora' ? 'INICIAR CHAT AHORA' : 'CONFIRMAR CITA'}
          </button>
        </div>

      </div>
    </div>
  );
};
