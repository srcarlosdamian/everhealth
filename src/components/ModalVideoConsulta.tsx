import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ModalVideoConsultaProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalVideoConsulta: React.FC<ModalVideoConsultaProps> = ({ isOpen, onClose }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Sexología');
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [selectedTime, setSelectedTime] = useState<string>('09:30');
  const [motivo, setMotivo] = useState<string>('');

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
      onClick={(e) => {
        // Closes on clicking outside modal container
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[660px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto">
        
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
            <div
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all ${
                isStep1Done
                  ? 'bg-[#831843] text-white shadow-xs'
                  : 'border-2 border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
              }`}
            >
              {isStep1Done ? (
                <Check className="w-[14px] h-[14px] stroke-[3]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
              )}
            </div>

            {/* Vertical connector line 1 */}
            <div className={`w-[2px] flex-1 min-h-[140px] my-1 transition-colors ${
              isStep1Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
            }`} />

            {/* Step 2 Check */}
            <div
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all ${
                isStep2Done
                  ? 'bg-[#831843] text-white shadow-xs'
                  : 'border-2 border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
              }`}
            >
              {isStep2Done ? (
                <Check className="w-[14px] h-[14px] stroke-[3]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
              )}
            </div>

            {/* Vertical connector line 2 */}
            <div className={`w-[2px] flex-1 min-h-[200px] my-1 transition-colors ${
              isStep2Done ? 'bg-[#831843]/30' : 'bg-[#e2e8f0]'
            }`} />

            {/* Step 3 Check */}
            <div
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all ${
                isStep3Done
                  ? 'bg-[#831843] text-white shadow-xs'
                  : 'border-2 border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
              }`}
            >
              {isStep3Done ? (
                <Check className="w-[14px] h-[14px] stroke-[3]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
              )}
            </div>
          </div>

          {/* Steps Content */}
          <div className="flex-1 flex flex-col gap-[28px]">
            
            {/* Step 1: Motivo de la consulta */}
            <div className="flex flex-col gap-[8px]">
              <span className="text-[15px] font-bold text-black">Motivo de la consulta</span>
              <span className="text-[13px] text-[#64748b]">Describe el motivo de la consulta</span>
              <textarea
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe tus síntomas o motivo (ej. Consulta general para revisión)..."
                className={`w-full p-[12px] rounded-[6px] border text-[14px] text-black focus:outline-none transition-colors ${
                  motivo.trim().length > 0
                    ? 'border-[#cbd5e1] focus:border-[#831843]'
                    : 'border-[#cbd5e1] focus:border-[#d50475]'
                }`}
              />
            </div>

            {/* Step 2: Especialidad requerida */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-black">Especialidad requerida</span>
                <span className="text-[13px] text-[#64748b]">Selecciona una especialidad</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                {specialties.map((spec) => (
                  <label
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`p-[10px] rounded-[6px] border flex items-center gap-[10px] cursor-pointer transition-colors ${
                      selectedSpecialty === spec
                        ? 'border-[#831843] bg-[#fdf2f8]/50'
                        : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSpecialty === spec}
                      onChange={() => setSelectedSpecialty(spec)}
                      className="w-[16px] h-[16px] accent-[#831843] rounded-[3px]"
                    />
                    <span className="text-[14px] font-normal text-black">{spec}</span>
                  </label>
                ))}
              </div>

              <select className="w-full h-[40px] px-[12px] rounded-[6px] border border-[#cbd5e1] text-[14px] text-[#475569] bg-white">
                <option>Tipo de consulta: Primera vez</option>
                <option>Seguimiento</option>
              </select>

              <select className="w-full h-[40px] px-[12px] rounded-[6px] border border-[#cbd5e1] text-[14px] text-[#475569] bg-white">
                <option>Zona horaria: GMT-6 (Ciudad de México)</option>
                <option>GMT+1 (Madrid)</option>
              </select>
            </div>

            {/* Step 3: Horario disponible (Calendar + slots) */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-black">Horario disponible</span>
                <span className="text-[13px] text-[#64748b]">Selecciona el día y horario</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Mini Calendar matching EVR - 124 */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-3 w-full sm:w-[260px] bg-white">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f1f5f9] text-[13px] font-bold text-black">
                    <span>Octubre 2026</span>
                    <div className="flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4 text-[#64748b] cursor-pointer" />
                      <ChevronRight className="w-4 h-4 text-[#64748b] cursor-pointer" />
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#64748b] mb-1">
                    <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
                    <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                    <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                    <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
                    <button
                      type="button"
                      onClick={() => setSelectedDay(17)}
                      className="w-6 h-6 mx-auto rounded-full bg-[#831843] text-white font-bold flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      17
                    </button>
                    <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                    <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                  </div>
                </div>

                {/* Time slots column */}
                <div className="flex flex-col gap-2 w-full sm:w-[140px]">
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`h-[36px] rounded-[6px] border text-[13px] font-medium transition-colors cursor-pointer ${
                        selectedTime === time
                          ? 'border-[#831843] bg-[#fdf2f8] text-[#831843] font-bold'
                          : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected appointment banner */}
            <div className="bg-[#fdf2f8] rounded-[6px] px-[14px] py-[10px] flex items-center justify-between text-[13px] text-[#831843]">
              <div className="flex items-center gap-[8px] font-bold">
                <CalendarIcon className="w-[16px] h-[16px]" />
                <span>Cita seleccionada</span>
              </div>
              <span className="font-medium text-black">
                Sábado 17 de Octubre a las <strong className="font-bold">{selectedTime} hrs</strong>
              </span>
            </div>

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
                className={`h-[40px] px-[24px] rounded-[6px] text-[14px] font-bold transition-all cursor-pointer ${
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
