import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { Checkbox } from '../design-system/atoms/Checkbox';
import { Radio } from '../design-system/atoms/Radio';
import { Button } from '../design-system/atoms/Button';
import { CalendarMonthGrid } from '../design-system/molecules/CalendarMonthGrid';
import { SelectedAppointmentBanner } from '../design-system/molecules/SelectedAppointmentBanner';
import { ModalCitaConfirmada } from './ModalCitaConfirmada';

interface ModalVideoConsultaProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalVideoConsulta: React.FC<ModalVideoConsultaProps> = ({ isOpen, onClose }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Sexología');
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [selectedTime, setSelectedTime] = useState<string>('09:30');
  const [motivo, setMotivo] = useState<string>('');
  const [tipoConsulta, setTipoConsulta] = useState<string>('Primera vez');
  const [zonaHoraria, setZonaHoraria] = useState<string>('GMT-6 (Ciudad de México)');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!isOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[660px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e2e8f0]">
          <h2 className="text-[22px] leading-[28px] font-bold text-black">
            Solicita tu video consulta
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-[20px] h-[20px]" />
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

        {/* Footer de confirmación: NO es un paso del stepper */}
        <div className="flex items-center justify-end pt-3 border-t border-[#f1f5f9]">
          <Button
            variant="primary"
            onClick={() => setIsSuccessModalOpen(true)}
            className="h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px] shadow-xs"
          >
            CONFIRMAR CITA
          </Button>
        </div>

        {/* Modal de Cita Confirmada */}
        <ModalCitaConfirmada
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            onClose();
          }}
          tipoCita="Videoconsulta"
          profesional={`Especialista en ${selectedSpecialty}`}
          fecha={`Sábado ${selectedDay} de Octubre`}
          hora={`${selectedTime} hrs`}
          onGoHome={() => {
            setIsSuccessModalOpen(false);
            onClose();
            window.location.hash = '#/home';
          }}
          onGoHistory={() => {
            setIsSuccessModalOpen(false);
            onClose();
            window.location.hash = '#/historial-consultas';
          }}
        />

      </div>
    </div>
  );
};
