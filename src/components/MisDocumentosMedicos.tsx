import React, { useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';

interface MisDocumentosMedicosProps {
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const MisDocumentosMedicos: React.FC<MisDocumentosMedicosProps> = ({
  onBack,
  onSkip,
  onFinish,
}) => {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'informes',
      title: 'Informes médicos',
      desc: 'Informes de consultas, diagnósticos y valoraciones de especialistas.',
      completed: true,
    },
    {
      id: 'analiticas',
      title: 'Analíticas',
      desc: 'Resultados de análisis de sangre, orina y otras pruebas de laboratorio.',
      completed: false,
    },
    {
      id: 'pruebas-imagen',
      title: 'Pruebas de imagen',
      desc: 'Radiografías, resonancias, ecografías y otras pruebas de imagen.',
      completed: false,
    },
    {
      id: 'salud-mental',
      title: 'Salud mental',
      desc: 'Informes de psicología o psiquiatría relacionados con tu salud.',
      completed: false,
    },
    {
      id: 'nutricion',
      title: 'Nutrición',
      desc: 'Informes nutricionales, planes de alimentación y pautas de seguimiento.',
      completed: false,
    },
    {
      id: 'coaching',
      title: 'Coaching',
      desc: 'Documentos de tus sesiones, objetivos y actividades de seguimiento.',
      completed: false,
    },
    {
      id: 'otros',
      title: 'Otros documentos',
      desc: 'Electrocardiogramas, espirometrías y otros documentos médicos que quieras aportar.',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Header homologado max-w-[800px] */}
      <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white sticky top-0 z-40">
        <div className="w-full max-w-[800px] flex items-center justify-between">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBack}
            className="h-[40px] w-auto object-contain object-left cursor-pointer"
          />
          <LanguageSelector />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full flex justify-center px-4 pt-8 pb-16">
        <div className="w-full max-w-[800px] flex flex-col gap-6">
          
          {/* Top navigation row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer bg-transparent -ml-2"
              title="Atrás"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Status indicator: Guardado con fondo gris claro y check Lucide */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f1f5f9] text-[12px] font-medium text-[#1e293b]">
              <span>Guardado</span>
              <CheckCircle2 className="w-4 h-4 text-[#1e293b] stroke-[2]" />
            </div>
          </div>

          {/* PASO EXTRA */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-black uppercase tracking-wider">
              PASO EXTRA
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-black">Mis documentos médicos</h1>
            <p className="text-[14px] leading-[22px] text-black font-normal">
              Adjunta informes, resultados y otros documentos para complementar tu historia clínica.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-[#f0f9ff]/60 border border-[#bae6fd] rounded-[8px] p-4 flex items-start gap-3">
            <Info className="w-[18px] h-[18px] text-[#0284c7] shrink-0 mt-0.5" />
            <div className="flex flex-col text-[13px] leading-[20px] text-black">
              <strong className="font-bold text-black">Información opcional</strong>
              <span className="text-[#334155]">
                Puedes omitir este paso y añadir tus documentos más adelante desde la sección de análisis clínico.
              </span>
            </div>
          </div>

          {/* 7 Category Cards Grid (EVR - 117) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="p-3.5 rounded-none border border-[#e2e8f0] hover:border-[#475569] active:border-black bg-white flex items-start justify-between gap-3 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      cat.completed
                        ? 'border border-black text-black'
                        : 'border border-[#cbd5e1]'
                    }`}
                  >
                    {cat.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-black">{cat.title}</span>
                    <span className="text-[12px] text-[#64748b] leading-tight mt-0.5">{cat.desc}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-black shrink-0 mt-0.5" />
              </div>
            ))}
          </div>

          {/* Navigation Footer: Omitir a la izquierda, Finalizar a la derecha */}
          <NavigationFooter
            onBack={onSkip}
            onNext={onFinish}
            backText="Omitir"
            nextText="Finalizar"
          />

        </div>
      </main>

      {/* Mini Upload Feedback Dialog when clicking a category */}
      {activeCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActiveCategory(null)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-[12px] p-6 shadow-xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[18px] font-bold text-black">
              Subir {categories.find((c) => c.id === activeCategory)?.title}
            </h3>
            <div className="border-2 border-dashed border-[#cbd5e1] rounded-[8px] p-8 text-center flex flex-col items-center gap-2">
              <span className="text-[14px] text-[#475569]">Arrastra tus archivos aquí o haz clic para explorar</span>
              <span className="text-[12px] text-[#94a3b8]">PDF, JPG o PNG hasta 25MB</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="px-4 py-2 rounded-[6px] border border-[#cbd5e1] text-[13px] font-bold text-black"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="px-4 py-2 rounded-[6px] bg-[#d50475] text-white text-[13px] font-bold"
              >
                Guardar archivo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
