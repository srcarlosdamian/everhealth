import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Calendar } from 'lucide-react';

interface ModalHistoriaCompletaProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  patientGenderBirth?: string;
  initials?: string;
}

interface AccordionSection {
  id: string;
  title: string;
  content: string;
  extra?: string;
}

const CLINICAL_SECTIONS: AccordionSection[] = [
  {
    id: 'alergias',
    title: 'Alergia a',
    content: 'No refiere reacciones alérgicas medicamentosas conocidas. No alergias alimentarias conocidas.',
  },
  {
    id: 'enfermedades',
    title: 'Enfermedades',
    content: 'No refiere enfermedades importantes.',
  },
  {
    id: 'quirurgicos',
    title: 'Antecedentes quirúrgicos',
    content: 'No refiere cirugías previas.',
  },
  {
    id: 'medicamentos',
    title: 'Medicamentos',
    content: 'No refiere tomar medicación habitual.',
  },
  {
    id: 'sustancias',
    title: 'Sustancias tóxicas',
    content: 'No refiere consumir sustancias tóxicas.',
  },
  {
    id: 'alimentacion',
    title: 'Alimentación',
    content: 'Considera que no realiza una alimentación adecuada.',
    extra: 'Problema de peso: Sobrepeso.',
  },
  {
    id: 'psicologia',
    title: 'Psicología',
    content: 'Ha experimentado situación difícil: Con la familia, Entorno laboral, Con abuso sexual.',
  },
];

export const ModalHistoriaCompleta: React.FC<ModalHistoriaCompletaProps> = ({
  isOpen,
  onClose,
  patientName = 'Alejandro Navarro',
  patientGenderBirth = 'Masculino, nacido el 28/05/1991',
  initials = 'CD',
}) => {
  // All open by default as in reference, but collapsible per user sketch
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([
    'alergias',
    'enfermedades',
    'quirurgicos',
    'medicamentos',
    'sustancias',
    'alimentacion',
    'psicologia',
  ]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fadeIn font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[760px] max-h-[92vh] bg-white rounded-[16px] shadow-2xl flex flex-col overflow-hidden animate-scaleUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= TOP PINK BANNER ================= */}
        <div className="w-full bg-[#d50475] pt-6 pb-8 px-6 relative flex flex-col items-center justify-center text-center shrink-0">
          {/* Botón cerrar X blanco en esquina superior derecha */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/15 hover:bg-black/30 flex items-center justify-center text-white absolute top-4 right-4 transition-colors cursor-pointer"
            title="Cerrar historia clínica"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Avatar circular CD con sombra */}
          <div className="w-[68px] h-[68px] rounded-full bg-white text-black font-bold text-[20px] flex items-center justify-center shadow-lg border-2 border-white/80 select-none mb-3">
            {initials}
          </div>

          {/* Nombre del paciente y datos */}
          <h2 className="text-[19px] sm:text-[21px] font-bold text-white tracking-tight leading-snug">
            {patientName}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-white/90 font-normal mt-0.5">
            {patientGenderBirth}
          </p>
        </div>

        {/* ================= CONTENIDO SCROLLEABLE ================= */}
        <div className="flex-1 overflow-y-auto custom-scrollbar-minimal px-6 sm:px-8 py-6 flex flex-col gap-6 bg-white">
          
          {/* 4 Métricas principales (Boceto: 4 recuadros horizontales) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[28px] font-bold text-black leading-tight">
                35
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                años
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[28px] font-bold text-black leading-tight">
                60
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                Kgs. de peso
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[28px] font-bold text-black leading-tight">
                140
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                m. de altura
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[28px] font-bold text-[#d50475] leading-tight">
                30.6
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                IMC (Sobrepeso)
              </span>
            </div>
          </div>

          {/* Fecha de última actualización */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#64748b] font-normal border-b border-[#f1f5f9] pb-3">
            <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Última actualización el 13/10/2026</span>
          </div>

          {/* ================= ACORDEONES CLÍNICOS (CON CHEVRON SEGÚN BOCETO) ================= */}
          <div className="flex flex-col divide-y divide-[#f1f5f9]">
            {CLINICAL_SECTIONS.map((section) => {
              const isOpen = openSectionIds.includes(section.id);
              return (
                <div key={section.id} className="py-3.5 flex flex-col gap-1.5 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group select-none"
                  >
                    <span className="text-[16px] font-bold text-black group-hover:text-[#d50475] transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748b] transition-transform duration-200 group-hover:text-black ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="text-[14px] text-[#475569] leading-relaxed pt-1 animate-fadeIn flex flex-col gap-1">
                      <p>{section.content}</p>
                      {section.extra && (
                        <p className="font-medium text-black">{section.extra}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
