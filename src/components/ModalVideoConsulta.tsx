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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-[620px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto">
        
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

        {/* Section 1: Motivo de la consulta */}
        <div className="flex items-start gap-[14px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
            <Check className="w-[14px] h-[14px] stroke-[3]" />
          </div>
          <div className="flex-1 flex flex-col gap-[8px]">
            <span className="text-[15px] font-bold text-black">Motivo de la consulta</span>
            <span className="text-[13px] text-[#64748b]">Describe el motivo de la consulta</span>
            <textarea
              rows={3}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Describe tus síntomas o motivo..."
              className="w-full p-[12px] rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
            />
          </div>
        </div>

        {/* Section 2: Especialidad requerida */}
        <div className="flex items-start gap-[14px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
            <Check className="w-[14px] h-[14px] stroke-[3]" />
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
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
                      ? 'border-[#d50475] bg-[#fdf2f8]/40'
                      : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecialty === spec}
                    onChange={() => setSelectedSpecialty(spec)}
                    className="w-[16px] h-[16px] accent-[#d50475] rounded-[3px]"
                  />
                  <span className="text-[14px] font-normal text-black">{spec}</span>
                </label>
              ))}
            </div>

            <select className="w-full h-[40px] px-[12px] rounded-[6px] border border-[#cbd5e1] text-[14px] text-[#475569] bg-white">
              <option>Tipo de consulta</option>
              <option>Primera vez</option>
              <option>Seguimiento</option>
            </select>

            <select className="w-full h-[40px] px-[12px] rounded-[6px] border border-[#cbd5e1] text-[14px] text-[#475569] bg-white">
              <option>Zona horaria</option>
              <option>GMT-6 (Ciudad de México)</option>
              <option>GMT+1 (Madrid)</option>
            </select>
          </div>
        </div>

        {/* Section 3: Horario disponible (Calendar + slots) */}
        <div className="flex items-start gap-[14px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#d50475] text-white flex items-center justify-center shrink-0 mt-[2px]">
            <Check className="w-[14px] h-[14px] stroke-[3]" />
          </div>
          <div className="flex-1 flex flex-col gap-[12px]">
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-black">Horario disponible</span>
              <span className="text-[13px] text-[#64748b]">Selecciona el día</span>
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
                  {/* Empty offsets */}
                  <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                  <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                  <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
                  <button
                    type="button"
                    onClick={() => setSelectedDay(17)}
                    className="w-6 h-6 mx-auto rounded-full bg-[#d50475] text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    17
                  </button>
                  <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                  <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                </div>
              </div>

              {/* Time slots column */}
              <div className="flex flex-col gap-2 w-full sm:w-[130px]">
                {times.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`h-[36px] rounded-[6px] border text-[13px] font-medium transition-colors cursor-pointer ${
                      selectedTime === time
                        ? 'border-[#d50475] bg-[#fdf2f8] text-[#d50475] font-bold'
                        : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected banner matching EVR - 124 */}
        <div className="bg-[#fdf2f8] rounded-[6px] px-[14px] py-[10px] flex items-center justify-between text-[13px] text-[#d50475]">
          <div className="flex items-center gap-[8px] font-bold">
            <CalendarIcon className="w-[16px] h-[16px]" />
            <span>Cita seleccionada</span>
          </div>
          <span className="font-medium text-black">
            Mañana 21 de Octubre a las <strong className="font-bold">{selectedTime}</strong>
          </span>
        </div>

        {/* Confirm button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] px-[24px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold transition-colors cursor-pointer"
          >
            Confirmar cita
          </button>
        </div>

      </div>
    </div>
  );
};
