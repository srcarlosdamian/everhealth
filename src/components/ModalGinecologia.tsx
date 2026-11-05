import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ModalGinecologiaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ModalGinecologia: React.FC<ModalGinecologiaProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedPatologias, setSelectedPatologias] = useState<string[]>([]);
  const [embarazada, setEmbarazada] = useState<'si' | 'no' | null>(null);
  const [aborto, setAborto] = useState<'si' | 'no' | null>(null);
  const [hijos, setHijos] = useState<'si' | 'no' | null>(null);

  if (!isOpen) return null;

  const patologias = [
    { title: 'Mastitis', desc: 'Inflamación del tejido mamario' },
    { title: 'Mastopatía fibroquística', desc: 'Alteración benigna común' },
    { title: 'Mioma uterino', desc: 'Tumor benigno en miometrio' },
    { title: 'Endometriosis', desc: 'Presencia extrauterina' },
    { title: 'Candidiasis vaginal', desc: 'Infección micótica frecuente' },
    { title: 'Otras vaginitis', desc: 'Vaginosis, atróficas u otras' },
    { title: 'SOP (Ovario poliquístico)', desc: 'Desbalance hormonal / metabólico' },
  ];

  const togglePatologia = (title: string) => {
    setSelectedPatologias((prev) =>
      prev.includes(title) ? prev.filter((p) => p !== title) : [...prev, title]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[720px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[24px] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <h2 className="text-[22px] leading-[28px] font-bold text-black">
            Ginecología
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patologías Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold text-black">Patologías</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {patologias.map((item) => {
              const isChecked = selectedPatologias.includes(item.title);
              return (
                <div
                  key={item.title}
                  onClick={() => togglePatologia(item.title)}
                  className={`p-3 rounded-[8px] border flex items-start gap-3 cursor-pointer transition-colors ${
                    isChecked
                      ? 'border-[#d50475] bg-[#fdf2f8]/40'
                      : 'border-[#e2e8f0] hover:bg-[#f8fafc]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border mt-0.5 flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-[#d50475] border-[#d50475] text-white'
                        : 'border-[#cbd5e1] bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-black">{item.title}</span>
                    <span className="text-[12px] text-[#64748b]">{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Antecedentes Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold text-black">Antecedentes</h3>
          <div className="flex flex-col gap-3">
            
            {/* Pregunta 1 */}
            <div className="p-3.5 rounded-[8px] border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">¿Has estado embarazada alguna vez?</span>
                <span className="text-[12px] text-[#64748b]">Incluye partos a término, prematuros y abortos</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setEmbarazada('si')}
                  className={`h-7 px-3 rounded-[4px] border text-[12px] font-bold cursor-pointer ${
                    embarazada === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setEmbarazada('no')}
                  className={`h-7 px-3 rounded-[4px] border text-[12px] font-bold cursor-pointer ${
                    embarazada === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Pregunta 2 */}
            <div className="p-3.5 rounded-[8px] border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">¿Has tenido algún aborto?</span>
                <span className="text-[12px] text-[#64748b]">Ya sea de carácter espontáneo, retenido o terapéutico</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setAborto('si')}
                  className={`h-7 px-3 rounded-[4px] border text-[12px] font-bold cursor-pointer ${
                    aborto === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setAborto('no')}
                  className={`h-7 px-3 rounded-[4px] border text-[12px] font-bold cursor-pointer ${
                    aborto === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Pregunta 3 */}
            <div className="p-3.5 rounded-[8px] border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">¿Tienes hijos vivos actualmente?</span>
                <span className="text-[12px] text-[#64748b]">Partos vaginales y/o cesáreas.</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setHijos('si')}
                  className={`h-7 px-3 rounded-[4px] border text-[12px] font-bold cursor-pointer ${
                    hijos === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHijos('no')}
                  className={`h-7 px-3 rounded-[4px] border text-[12px] font-bold cursor-pointer ${
                    hijos === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#e2e8f0]">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] px-4 rounded-[6px] border border-[#d50475] text-[#d50475] hover:bg-[#fdf2f8] text-[13px] font-bold transition-colors cursor-pointer"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-[38px] px-5 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer"
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
};
