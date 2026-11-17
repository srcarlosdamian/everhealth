import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Calendar } from 'lucide-react';

interface ModalHistoriaCompletaProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  patientGenderBirth?: string;
  initials?: string;
  initialSectionId?: string;
}

interface AccordionSection {
  id: string;
  title: string;
  content: string;
  extra?: string;
  lastEdited?: string;
}

const CLINICAL_SECTIONS: AccordionSection[] = [
  {
    id: 'general',
    title: 'Datos generales',
    content: 'Estatura: 175 cm, Peso: 70 kg, IMC: 22.9 (Normopeso). Sin hipertensión arterial ni antecedentes metabólicos de riesgo.',
    lastEdited: '12/10/2026',
  },
  {
    id: 'alergias',
    title: 'Alergias',
    content: 'Sin alergias medicamentosas conocidas. Alergia primaveral estacional a gramíneas controlada.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'enfermedades',
    title: 'Enfermedades',
    content: 'Sin enfermedades crónicas ni antecedentes familiares de relevancia cardiovascular o metabólica.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'quirurgicos',
    title: 'Quirúrgicas',
    content: 'Apendicectomía laparoscópica en 2018 sin complicaciones postoperatorias.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'medicamentos',
    title: 'Medicamentos',
    content: 'Sin tratamiento farmacológico habitual activo.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'sustancias',
    title: 'Sustancias tóxicas',
    content: 'No fumador. Consumo ocasional moderado de alcohol en eventos sociales.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'alimentacion',
    title: 'Alimentación',
    content: 'Dieta mediterránea equilibrada, 3 a 4 comidas al día con ingesta adecuada de agua y frutas.',
    extra: 'Estado nutricional: Normopeso.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'psicologia',
    title: 'Psicología',
    content: 'Cuestionario de bienestar emocional completado. Nivel de estrés actual: bajo, descanso reparador.',
    lastEdited: '13/10/2026',
  },
  {
    id: 'biometria',
    title: 'Análisis Biométricos',
    content: 'PPG facial: 71 LPM regular. Estimación de constantes fisiológicas en rango óptimo.',
    lastEdited: '27/10/2026',
  },
];

export const ModalHistoriaCompleta: React.FC<ModalHistoriaCompletaProps> = ({
  isOpen,
  onClose,
  patientName = 'Alejandro Navarro',
  patientGenderBirth = 'Masculino, nacido el 28/05/1991',
  initials = 'AN',
  initialSectionId,
}) => {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([
    'general',
    'alergias',
    'enfermedades',
    'quirurgicos',
    'medicamentos',
    'sustancias',
    'alimentacion',
    'psicologia',
    'biometria',
  ]);

  useEffect(() => {
    if (initialSectionId) {
      setOpenSectionIds((prev) => (prev.includes(initialSectionId) ? prev : [initialSectionId, ...prev]));
    }
  }, [initialSectionId]);

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
        className="w-full max-w-[760px] max-h-[92vh] bg-white rounded-[14px] shadow-2xl flex flex-col overflow-hidden animate-scaleUp relative border border-[#e2e8f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= TOP PINK ACCENT BAR CON BOTÓN CERRAR X ================= */}
        <div className="w-full bg-[#d50475] h-[48px] px-4 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Cerrar historia clínica"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* ================= FICHA DE USUARIO: AVATAR CUADRADO + DATOS (SEGÚN BOCETO) ================= */}
        <div className="px-6 sm:px-8 pt-5 pb-4 border-b border-[#f1f5f9] flex items-center gap-4 shrink-0 bg-white">
          {/* Avatar cuadrado a la izquierda en un contenedor */}
          <div className="w-[56px] h-[56px] rounded-[8px] bg-[#f1f5f9] border border-[#cbd5e1] text-[#0f172a] font-bold text-[18px] flex items-center justify-center shrink-0 select-none">
            {initials}
          </div>

          {/* Nombre y Apellido a la derecha + Datos de nacimiento */}
          <div className="flex flex-col min-w-0">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black tracking-tight leading-snug truncate">
              {patientName}
            </h2>
            <p className="text-[14px] text-[#475569] font-normal mt-0.5 truncate">
              {patientGenderBirth}
            </p>
          </div>
        </div>

        {/* ================= CONTENIDO SCROLLEABLE ================= */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 flex flex-col gap-6 bg-white">
          
          {/* 4 Métricas lineales según boceto: sin fondo gris, solo bordes limpios */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 border border-[#e2e8f0] rounded-[6px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                35
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                años
              </span>
            </div>

            <div className="p-3 border border-[#e2e8f0] rounded-[6px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                70
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                Kgs. de peso
              </span>
            </div>

            <div className="p-3 border border-[#e2e8f0] rounded-[6px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                175
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                cm. de altura
              </span>
            </div>

            <div className="p-3 border border-[#e2e8f0] rounded-[6px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                22.9
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                IMC (Normopeso)
              </span>
            </div>
          </div>

          {/* ================= ACORDEONES CLÍNICOS LINEALES ================= */}
          {/* Hover gris sutil (no rosa), textos a 16px font-bold y contenido a 16px regular en negro */}
          <div className="flex flex-col divide-y divide-[#e2e8f0] border-t border-[#e2e8f0]">
            {CLINICAL_SECTIONS.map((section) => {
              const isOpen = openSectionIds.includes(section.id);
              return (
                <div key={section.id} className="py-3.5 flex flex-col gap-2 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full py-1.5 px-2 -mx-2 rounded-[4px] flex items-center justify-between text-left cursor-pointer group select-none hover:bg-[#f8fafc] transition-colors"
                  >
                    <span className="text-[16px] font-bold text-black transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748b] transition-transform duration-200 group-hover:text-black ${
                        isOpen ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="text-[16px] text-black leading-relaxed pt-1 animate-fadeIn flex flex-col gap-1.5 px-1">
                      <p>{section.content}</p>
                      {section.extra && (
                        <p className="font-semibold text-black">{section.extra}</p>
                      )}
                      {section.lastEdited && (
                        <span className="text-[12px] text-[#64748b] pt-1">
                          Última edición el {section.lastEdited}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fecha de última actualización al final de todo el contenido */}
          <div className="flex items-center justify-center gap-1.5 text-[12px] text-[#64748b] font-normal pt-2 pb-1 border-t border-[#f1f5f9]">
            <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Última actualización general el 13/10/2026</span>
          </div>

        </div>
      </div>
    </div>
  );
};
