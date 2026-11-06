import React, { useState } from 'react';
import {
  FileText,
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
  CheckCircle2,
  Calendar,
  Lock,
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

  const sections: ClinicalSection[] = [
    {
      id: 'documentos',
      title: 'Mis documentos médicos',
      lastEdited: '3 documentos adjuntos',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#d50475]" />,
      summary: 'Analíticas de sangre, ecografía tiroidea y electro de control.',
      status: 'Completado',
    },
    {
      id: 'general',
      title: 'Datos generales',
      lastEdited: 'Última edición el 12/10/2026',
      icon: <User className="w-5 h-5 text-[#2563eb]" />,
      summary: 'Estatura: 175 cm, Peso: 70 kg, IMC: 22.9 (Normopeso). Sin hipertensión.',
      status: 'Actualizado',
    },
    {
      id: 'alergias',
      title: 'Alergias',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <HeartPulse className="w-5 h-5 text-[#d50475]" />,
      summary: 'Sin alergias medicamentosas conocidas. Alergia primaveral a gramíneas.',
      status: 'Revisado',
    },
    {
      id: 'enfermedades',
      title: 'Enfermedades',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Activity className="w-5 h-5 text-[#059669]" />,
      summary: 'Sin enfermedades crónicas ni antecedentes familiares relevantes.',
      status: 'Revisado',
    },
    {
      id: 'quirurgicas',
      title: 'Quirúrgicas',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Scissors className="w-5 h-5 text-[#d97706]" />,
      summary: 'Apendicectomía laparoscópica en 2018 sin complicaciones.',
      status: 'Completado',
    },
    {
      id: 'medicamentos',
      title: 'Medicamentos',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Pill className="w-5 h-5 text-[#7c3aed]" />,
      summary: 'Sin tratamiento farmacológico habitual activo.',
      status: 'Completado',
    },
    {
      id: 'sustancias',
      title: 'Sustancias tóxicas',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Wine className="w-5 h-5 text-[#475569]" />,
      summary: 'No fumador. Consumo ocasional moderado.',
      status: 'Revisado',
    },
    {
      id: 'alimentacion',
      title: 'Alimentación',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Apple className="w-5 h-5 text-[#16a34a]" />,
      summary: 'Dieta mediterránea equilibrada, 3-4 comidas al día.',
      status: 'Completado',
    },
    {
      id: 'psicologia',
      title: 'Psicología',
      lastEdited: 'Última edición el 13/10/2026',
      icon: <Brain className="w-5 h-5 text-[#d50475]" />,
      summary: 'Cuestionario de bienestar emocional completado. Nivel de estrés: bajo.',
      status: 'Completado',
    },
    {
      id: 'biometria',
      title: 'Análisis Biométricos',
      lastEdited: 'Último escaneo el 27/10/2026',
      icon: <ScanFace className="w-5 h-5 text-[#0284c7]" />,
      summary: 'PPG facial: 71 LPM regular. Estimación de constantes en rango óptimo.',
      status: 'Actualizado',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica]">
      {/* Informative notice card (sin barra de porcentaje ni stepper) */}
      <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fce7f3] flex items-center justify-center text-[#d50475] shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#d50475]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-bold text-black">
              Tu historia clínica está disponible y sincronizada
            </h3>
            <p className="text-[13px] text-[#64748b] leading-tight mt-0.5">
              Puedes consultar y editar tus antecedentes de salud cuando tu equipo médico lo requiera.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-[12px] font-bold text-[#15803d] px-2.5 py-1 rounded-[6px] border border-[#cbd5e1] bg-white">
            100% REGISTRADO
          </span>
        </div>
      </div>

      {/* Grid of clinical categories matching the design card format */}
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
                <div className="w-10 h-10 rounded-[8px] bg-[#f8fafc] group-hover:bg-[#fce7f3] flex items-center justify-center shrink-0 transition-colors">
                  {sec.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] font-bold text-black truncate group-hover:text-[#d50475] transition-colors">
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

      {/* Bottom Button: Ver historia clínica completa */}
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
