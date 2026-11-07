import React, { useState } from 'react';
import {
  FileSpreadsheet,
  ArrowRight,
  User,
  HeartPulse,
  Activity,
  Scissors,
  Pill,
  Wine,
  Apple,
  Brain,
  ScanFace,
  ChevronRight,
} from 'lucide-react';

interface HistoriaClinicaProps {
  onOpenDocumentsModal?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

interface ClinicalSection {
  id: string;
  title: string;
  lastEdited: string;
  icon: React.ReactNode;
  summary: string;
  status: 'Completado' | 'Actualizado' | 'Revisado';
}

export const HistoriaClinica: React.FC<HistoriaClinicaProps> = ({
  onOpenDocumentsModal,
  onNavigateToSection,
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Todos los iconos 100% neutros (#64748b) solicitados por el usuario
  const sections: ClinicalSection[] = [
    {
      id: 'documentos',
      title: 'Mis documentos médicos',
      lastEdited: '3 documentos adjuntos',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#64748b]" />,
      summary: 'Analíticas de sangre, ecografía tiroidea y electro de control.',
      status: 'Completado',
    },
    {
      id: 'general',
      title: 'Datos generales',
      lastEdited: 'Última edición el 12/10/2026',
      icon: <User className="w-5 h-5 text-[#64748b]" />,
      summary: 'Estatura: 175 cm, Peso: 70 kg, IMC: 22.9 (Normopeso). Sin hipertensión.',
      status: 'Actualizado',
    },
    {
      id: 'alergias',
      title: 'Alergias',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <HeartPulse className="w-5 h-5 text-[#64748b]" />,
      summary: 'Sin alergias medicamentosas conocidas. Alergia primaveral a gramíneas.',
      status: 'Revisado',
    },
    {
      id: 'enfermedades',
      title: 'Enfermedades',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Activity className="w-5 h-5 text-[#64748b]" />,
      summary: 'Sin enfermedades crónicas ni antecedentes familiares relevantes.',
      status: 'Revisado',
    },
    {
      id: 'quirurgicas',
      title: 'Quirúrgicas',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Scissors className="w-5 h-5 text-[#64748b]" />,
      summary: 'Apendicectomía laparoscópica en 2018 sin complicaciones.',
      status: 'Completado',
    },
    {
      id: 'medicamentos',
      title: 'Medicamentos',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Pill className="w-5 h-5 text-[#64748b]" />,
      summary: 'Sin tratamiento farmacológico habitual activo.',
      status: 'Completado',
    },
    {
      id: 'sustancias',
      title: 'Sustancias tóxicas',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Wine className="w-5 h-5 text-[#64748b]" />,
      summary: 'No fumador. Consumo ocasional moderado.',
      status: 'Revisado',
    },
    {
      id: 'alimentacion',
      title: 'Alimentación',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Apple className="w-5 h-5 text-[#64748b]" />,
      summary: 'Dieta mediterránea equilibrada, 3-4 comidas al día.',
      status: 'Completado',
    },
    {
      id: 'psicologia',
      title: 'Psicología',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Brain className="w-5 h-5 text-[#64748b]" />,
      summary: 'Cuestionario de bienestar emocional completado. Nivel de estrés: bajo.',
      status: 'Completado',
    },
    {
      id: 'biometria',
      title: 'Análisis Biométricos',
      lastEdited: 'Último escaneo el 27/10/2026',
      icon: <ScanFace className="w-5 h-5 text-[#64748b]" />,
      summary: 'PPG facial: 71 LPM regular. Estimación de constantes en rango óptimo.',
      status: 'Actualizado',
    },
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica] px-4 sm:px-6 py-4">
      {/* Encabezado limpio sin tabs (solicitado: tabs solo en sidebar) */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-[#64748b] font-medium tracking-wide">
          Historial
        </span>
        <h1 className="text-[22px] sm:text-[26px] leading-[32px] font-bold text-black tracking-tight">
          Historia clínica
        </h1>
        <p className="text-[14px] leading-[22px] text-[#64748b]">
          Consulta y edita tus antecedentes médicos, alergias, medicación y documentación clínica.
        </p>
      </div>

      {/* Grid de categorías clínicas con iconos 100% neutros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {sections.map((sec) => (
          <div
            key={sec.id}
            onClick={() => {
              if (sec.id === 'documentos') {
                onOpenDocumentsModal?.();
              } else {
                setSelectedSection(selectedSection === sec.id ? null : sec.id);
                onNavigateToSection?.(sec.id);
              }
            }}
            className="p-4 rounded-[10px] border border-[#e2e8f0] hover:border-[#475569] active:border-black bg-white flex flex-col gap-2.5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[8px] bg-[#f8fafc] group-hover:bg-[#f1f5f9] flex items-center justify-center shrink-0 transition-colors">
                  {sec.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] font-bold text-black truncate transition-colors">
                    {sec.title}
                  </span>
                  <span className="text-[12px] text-[#64748b] leading-tight">
                    {sec.lastEdited}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#94a3b8] group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            {/* Resumen clínico del registro */}
            <p className="text-[13px] leading-[19px] text-[#475569] pl-[52px]">
              {sec.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Botón inferior: Ver historia clínica completa */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={() => onOpenDocumentsModal?.()}
          className="w-full sm:w-auto min-w-[320px] h-[44px] px-6 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[14px] font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Ver historia clínica completa</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
};
