import React, { useState } from 'react';
import { useEscapeClose } from '../design-system/useEscapeClose';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, Video } from 'lucide-react';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { Checkbox } from '../design-system/atoms/Checkbox';
import { Radio } from '../design-system/atoms/Radio';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { CalendarMonthGrid } from '../design-system/molecules/CalendarMonthGrid';
import { SelectedAppointmentBanner } from '../design-system/molecules/SelectedAppointmentBanner';

interface ModalVideoConsultaProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterSala?: (specialty?: string, doctor?: string) => void;
}

export const ModalVideoConsulta: React.FC<ModalVideoConsultaProps> = ({ isOpen, onClose, onEnterSala }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Sexología');
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [selectedTime, setSelectedTime] = useState<string>('09:30');
  const [motivo, setMotivo] = useState<string>('');
  const [tipoConsulta, setTipoConsulta] = useState<string>('Primera vez');
  const [zonaHoraria, setZonaHoraria] = useState<string>('GMT-6 (Ciudad de México)');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEscapeClose(isOpen, onClose);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  const isStep1Done = motivo.trim().length > 0;
  const isStep2Done = Boolean(selectedSpecialty);
  const isStep3Done = Boolean(tipoConsulta && zonaHoraria);
  const isStep4Done = Boolean(selectedDay && selectedTime);
  const isFullyComplete = isStep1Done && isStep2Done && isStep3Done && isStep4Done;

  const specialties = [
    'Psicología',
    'Sexología',
    'Medicina General',
    'Medicina',
    'Nutrición',
    'Psicología/Coaching',
  ];

  const times = ['09:30', '11:00', '12:30', '1:30'];

  // VISTA 2: CITA CONFIRMADA CON ÉXITO (En el mismo modal, sin doble modal, estilo resumen/ticket)
  if (isConfirmed) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="videoconsulta-confirmada-title"
        className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn bg-black/50 backdrop-blur-xs p-4 overflow-y-auto custom-scrollbar-minimal font-[family-name:Helvetica]"
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[560px] bg-white rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#e2e8f0] p-6 sm:p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto custom-scrollbar-minimal cursor-default animate-scaleUp"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#16a34a]">
                VIDEOCONSULTA · CITA CONFIRMADA
              </span>
              <h2
                id="videoconsulta-confirmada-title"
                className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug mt-1"
              >
                Cita confirmada con éxito
              </h2>
              <p className="text-[13px] text-[#64748b] mt-0.5">
                Hemos programado tu cita médica. Recibirás un recordatorio antes del inicio de la sesión.
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
              <span className="font-bold text-black">{selectedSpecialty || 'Sexología'}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Modalidad</span>
              <span className="font-bold text-black">Videoconsulta</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Día</span>
              <span className="font-bold text-black">{selectedDay} de octubre de 2026</span>
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
              <span className="font-bold text-black">Dr. Bruno Peñas</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Zona horaria</span>
              <span className="font-medium text-black">{zonaHoraria}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[14px]">
              <span className="text-[#64748b] font-normal">Estado</span>
              <Badge variant="activa">Confirmada</Badge>
            </div>
          </div>

          {/* Aviso informativo de activación de sala */}
          <div className="p-3.5 bg-white border border-[#e2e8f0] rounded-[8px] flex items-start gap-3">
            <Video className="w-5 h-5 text-[#d50475] shrink-0 mt-0.5" />
            <p className="text-[13px] text-[#475569] leading-relaxed">
              La sala se activará <strong className="text-black font-semibold">15 minutos antes</strong> de la cita. Podrás acceder directamente desde la pantalla de Inicio o desde tu Historial de Consultas.
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
            {onEnterSala ? (
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  onEnterSala(selectedSpecialty, 'Dr. Bruno Peñas');
                }}
                className="w-full sm:w-auto bg-[#d50475] hover:bg-[#b80364]"
              >
                <Video className="w-4 h-4 mr-2" />
                <span>ENTRAR A LA SALA (EN VIVO)</span>
              </Button>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn bg-black/50 backdrop-blur-xs p-4 overflow-y-auto custom-scrollbar-minimal font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[660px] bg-white rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#e2e8f0] p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto custom-scrollbar-minimal cursor-default animate-scaleUp"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug">
            Solicita tu video consulta
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0"
            title="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Descripción general debajo de la línea divisoria superior */}
        <p className="text-[13.5px] leading-[20px] text-[#64748b] -mt-2">
          Completa los datos y el motivo de tu consulta para programar y confirmar tu cita médica.
        </p>

        {/* Form Body con Stepper vertical de exactamente 4 pasos */}
        <div className="flex flex-col">
          
          {/* PASO 1: Motivo de la consulta */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[28px]">
              <StepperCheck isCompleted={isStep1Done} />
              <div
                className={`w-[2px] flex-1 min-h-[30px] my-1 transition-colors ${
                  isStep1Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
                }`}
              />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[8px]">
              <label className="text-[14px] font-normal text-black leading-tight">
                Motivo de la consulta<span className="text-[#d50475]">*</span>
              </label>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe tus síntomas o motivo (ej. Consulta general para revisión)..."
                className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] text-[16px] text-black font-normal bg-white focus:outline-none focus:border-black hover:border-[#475569] transition-colors"
              />
            </div>
          </div>

          {/* PASO 2: Especialidad requerida */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[28px]">
              <StepperCheck isCompleted={isStep2Done} />
              <div
                className={`w-[2px] flex-1 min-h-[30px] my-1 transition-colors ${
                  isStep2Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
                }`}
              />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <label className="text-[14px] font-normal text-black leading-tight">
                  Especialidad requerida<span className="text-[#d50475]">*</span>
                </label>
                <span className="text-[12px] text-[#64748b] mt-0.5">Selecciona una especialidad médica</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`h-[42px] px-3.5 rounded-none border flex items-center gap-3 cursor-pointer transition-colors text-left ${
                      selectedSpecialty === spec
                        ? 'border-[#cbd5e1] bg-[#f8fafc] text-black font-semibold'
                        : 'border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] bg-white text-black font-normal'
                    }`}
                  >
                    <Radio checked={selectedSpecialty === spec} size="sm" />
                    <span className="text-[14px]">{spec}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PASO 3: Tipo de consulta y zona horaria */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[28px]">
              <StepperCheck isCompleted={isStep3Done} />
              <div
                className={`w-[2px] flex-1 min-h-[30px] my-1 transition-colors ${
                  isStep3Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
                }`}
              />
            </div>
            <div className="flex-1 pb-6 flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <label className="text-[14px] font-normal text-black leading-tight">
                  Tipo de consulta y zona horaria
                </label>
                <span className="text-[12px] text-[#64748b] mt-0.5">
                  Define la modalidad y el huso horario para tu atención
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                <Dropdown
                  label="Tipo de consulta"
                  value={tipoConsulta}
                  onChange={setTipoConsulta}
                  options={['Primera vez', 'Seguimiento']}
                />

                <Dropdown
                  label="Zona horaria"
                  value={zonaHoraria}
                  onChange={setZonaHoraria}
                  options={['GMT-6 (Ciudad de México)', 'GMT+1 (Madrid)', 'GMT+0 (Londres)']}
                />
              </div>
            </div>
          </div>

          {/* PASO 4: Horario disponible (Último paso del stepper) */}
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center shrink-0 w-[28px]">
              <StepperCheck isCompleted={isStep4Done} />
            </div>
            <div className="flex-1 flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <span className="text-[14px] font-normal text-black leading-tight">Horario disponible</span>
                <span className="text-[12px] text-[#64748b] mt-0.5">Selecciona el día y horario</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Calendario Mensual Homologado */}
                <CalendarMonthGrid
                  selectedDay={selectedDay}
                  onSelectDay={setSelectedDay}
                  selectedMonthName="Octubre 2026"
                  colorTheme="neutral"
                />

                {/* Columna de Franjas Horarias */}
                <div className="flex flex-col gap-2 w-full sm:w-[140px]">
                  {times.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'primary' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className="w-full h-[40px] text-[13px] font-bold rounded-[8px]"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Banner Homologado de Cita Seleccionada */}
              <SelectedAppointmentBanner
                dateText={`Sábado ${selectedDay} de Octubre`}
                timeText={`${selectedTime} hrs`}
              />
            </div>
          </div>

        </div>

        {/* Footer de confirmación: Transición interna a resumen/ticket sin doble modal */}
        <div className="flex items-center justify-end pt-3 border-t border-[#f1f5f9]">
          <button
            type="button"
            onClick={() => setIsConfirmed(true)}
            title={
              !isFullyComplete
                ? 'Campos obligatorios pendientes (prototipo: clic habilitado)'
                : undefined
            }
            className={`h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px] transition-all cursor-pointer select-none inline-flex items-center justify-center ${
              isFullyComplete
                ? 'bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white shadow-xs'
                : 'bg-[#cbd5e1] hover:bg-[#94a3b8] text-[#475569] shadow-none'
            }`}
          >
            CONFIRMAR CITA
          </button>
        </div>

      </div>
    </div>
  );
};
