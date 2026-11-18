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
      {/* ================= CONTENEDOR EXTERNO CON FONDO ROSA (#d50475) SEGÚN BOCETO ================= */}
      <div
        className="w-full max-w-[800px] max-h-[92vh] bg-[#d50475] rounded-[16px] p-4 sm:p-6 shadow-2xl flex flex-col relative animate-scaleUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera Rosa superior con Botón Cerrar Circular Blanco en la esquina superior derecha */}
        <div className="w-full flex items-center justify-between pb-3 sm:pb-4 text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-white/90">
              Historia Clínica Oficial
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white text-white hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Cerrar historia clínica"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* ================= TARJETA BLANCA SUPERPUESTA ("CUADRADO ENCIMA") SEGÚN BOCETO ================= */}
        <div className="w-full bg-white rounded-[12px] shadow-lg flex-1 overflow-y-auto custom-scrollbar-minimal p-5 sm:p-7 flex flex-col gap-6 relative z-10 border border-[#e2e8f0]/40">
          
          {/* Header del Paciente: Avatar cuadrado a la izquierda + Nombre y nacimiento a la derecha */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#f1f5f9] shrink-0">
            <div className="w-[60px] h-[60px] rounded-[8px] bg-[#f1f5f9] border border-[#cbd5e1] text-[#0f172a] font-bold text-[20px] flex items-center justify-center shrink-0 select-none shadow-2xs">
              {initials}
            </div>

            <div className="flex flex-col min-w-0">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug truncate">
                {patientName}
              </h2>
              <p className="text-[14px] text-[#475569] font-normal mt-0.5 truncate">
                {patientGenderBirth}
              </p>
            </div>
          </div>

          {/* 4 Métricas lineales según boceto: Cajas cuadradas limpias */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3 border border-[#cbd5e1] rounded-[8px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                35
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                años
              </span>
            </div>

            <div className="p-3 border border-[#cbd5e1] rounded-[8px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                70
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                Kgs. de peso
              </span>
            </div>

            <div className="p-3 border border-[#cbd5e1] rounded-[8px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                175
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                cm. de altura
              </span>
            </div>

            <div className="p-3 border border-[#cbd5e1] rounded-[8px] bg-white text-center flex flex-col items-center justify-center">
              <span className="text-[24px] sm:text-[26px] font-bold text-black leading-tight">
                22.9
              </span>
              <span className="text-[12px] text-[#64748b] font-medium mt-0.5">
                IMC (Normopeso)
              </span>
            </div>
          </div>

          {/* Acordeones clínicos lineales con líneas divisorias y flechas en 'v' */}
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
                    <span className="text-[15px] sm:text-[16px] font-bold text-black transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748b] group-hover:text-black transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="flex flex-col gap-2 pt-1 pb-2 text-[14px] leading-[22px] text-black animate-fadeIn px-2">
                      <p className="font-normal">{section.content}</p>
                      {section.extra && (
                        <p className="text-[13px] text-[#475569] font-medium italic">
                          {section.extra}
                        </p>
                      )}
                      {section.lastEdited && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#94a3b8] mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Actualizado el {section.lastEdited}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer de la tarjeta con última actualización oficial */}
          <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-[12px] text-[#64748b]">
            <span>Historial verificado por Ever Health Medical Services</span>
            <span className="font-medium text-black">Última actualización general: 13/10/2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
