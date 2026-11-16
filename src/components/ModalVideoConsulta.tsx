import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { Checkbox } from '../design-system/atoms/Checkbox';
import { Radio } from '../design-system/atoms/Radio';
import { CalendarMonthGrid } from '../design-system/molecules/CalendarMonthGrid';
import { SelectedAppointmentBanner } from '../design-system/molecules/SelectedAppointmentBanner';

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

  if (!isOpen) return null;

  const isStep1Done = motivo.trim().length > 0;
  const isStep2Done = Boolean(selectedSpecialty);
  const isStep3Done = Boolean(selectedDay && selectedTime);
  const isFullyComplete = isStep1Done && isStep2Done && isStep3Done;

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

        {/* Form Body with Stepper Column (Checks 900 + Vertical Divider Line) */}
        <div className="flex gap-[16px]">
          
          {/* Stepper Track */}
          <div className="flex flex-col items-center pt-1 shrink-0 w-[28px]">
            {/* Step 1 Check */}
            <StepperCheck isCompleted={isStep1Done} />

            {/* Vertical connector line 1 */}
            <div className={`w-[2px] flex-1 min-h-[140px] my-1 transition-colors ${
              isStep1Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
            }`} />

            {/* Step 2 Check */}
            <StepperCheck isCompleted={isStep2Done} />

            {/* Vertical connector line 2 */}
            <div className={`w-[2px] flex-1 min-h-[200px] my-1 transition-colors ${
              isStep2Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
            }`} />

            {/* Step 3 Check */}
            <StepperCheck isCompleted={isStep3Done} />
          </div>

          {/* Steps Content */}
          <div className="flex-1 flex flex-col gap-[28px]">
            
            {/* Step 1: Motivo de la consulta */}
            <div className="flex flex-col gap-[8px]">
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

            {/* Step 2: Especialidad requerida */}
            <div className="flex flex-col gap-[14px]">
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
                    className={`h-[42px] px-3.5 rounded-[8px] border flex items-center justify-between cursor-pointer transition-colors text-left ${
                      selectedSpecialty === spec
                        ? 'border-black bg-[#f1f5f9] text-black font-semibold'
                        : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black font-normal'
                    }`}
                  >
                    <span className="text-[15px]">{spec}</span>
                    <Radio checked={selectedSpecialty === spec} size="sm" />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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

            {/* Step 3: Horario disponible (Calendar + slots) */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-black">Horario disponible</span>
                <span className="text-[13px] text-[#64748b]">Selecciona el día y horario</span>
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
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`h-[36px] rounded-[6px] border text-[13px] font-bold transition-all cursor-pointer ${
                        selectedTime === time
                          ? 'border-[#f472b6] bg-[#fce7f3] text-[#d50475] shadow-xs'
                          : 'border-[#cbd5e1] hover:border-[#f472b6] hover:text-[#d50475] bg-white text-black'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Banner Homologado de Cita Seleccionada */}
            <SelectedAppointmentBanner
              dateText={`Sábado ${selectedDay} de Octubre`}
              timeText={`${selectedTime} hrs`}
            />

            {/* Confirm button (Blocked visual state if not complete, but interactive prototype) */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
              {!isFullyComplete ? (
                <span className="text-[12px] text-[#94a3b8] italic">
                  * Completa el motivo de la consulta para activar tu cita
                </span>
              ) : (
                <span className="text-[12px] text-[#166534] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Todos los pasos completados
                </span>
              )}

              <button
                type="button"
                onClick={onClose}
                className={`h-[40px] px-6 rounded-[8px] text-[14px] font-bold transition-all cursor-pointer ${
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
