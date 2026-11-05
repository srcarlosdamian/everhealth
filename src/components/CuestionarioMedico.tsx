import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, FileUp, AlertCircle } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { ModalGinecologia } from './ModalGinecologia';
import { ModalDocumentos } from './ModalDocumentos';

interface CuestionarioMedicoProps {
  onBackToHome: () => void;
}

export const CuestionarioMedico: React.FC<CuestionarioMedicoProps> = ({ onBackToHome }) => {
  const [step, setStep] = useState<number>(1);
  const [isGinecologiaOpen, setIsGinecologiaOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Form states
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [hasAlergias, setHasAlergias] = useState<'si' | 'no'>('no');
  const [hasEnfermedades, setHasEnfermedades] = useState<'si' | 'no'>('si');
  const [hasCirugias, setHasCirugias] = useState<'si' | 'no'>('no');
  const [hasMedicamentos, setHasMedicamentos] = useState<'si' | 'no'>('no');
  const [hasSustancias, setHasSustancias] = useState<'si' | 'no'>('no');
  const [hasAlimentacion, setHasAlimentacion] = useState<'si' | 'no'>('no');
  const [hasEmocional, setHasEmocional] = useState<'si' | 'no'>('no');

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  const calculateIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura) / 100;
    if (p > 0 && a > 0) {
      return (p / (a * a)).toFixed(1);
    }
    return '';
  };

  const stepsInfo = [
    'INFORMACIÓN GENERAL',
    'ALERGIAS',
    'ENFERMEDADES',
    'INTERVENCIONES QUIRÚRGICAS',
    'MEDICAMENTOS',
    'CONSUMO DE SUSTANCIAS',
    'ALIMENTACIÓN',
    'BIENESTAR EMOCIONAL',
  ];

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Header with 40px logo height */}
      <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white sticky top-0 z-40">
        <div className="w-full max-w-[900px] flex items-center justify-between">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBackToHome}
            className="h-[40px] w-auto object-contain object-left cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDocsOpen(true)}
              className="h-[32px] px-3 rounded-[6px] border border-[#cbd5e1] hover:border-[#d50475] text-[#d50475] text-[12px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Subir documentos (EVR-35)"
            >
              <FileUp className="w-4 h-4" />
              <span className="hidden sm:inline">Documentos</span>
            </button>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full flex justify-center px-4 pt-8 pb-16">
        <div className="w-full max-w-[800px] flex flex-col gap-6">
          
          {/* Top navigation row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else onBackToHome();
              }}
              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Status indicator */}
            {step === 4 ? (
              <span className="px-3 py-1 rounded-[6px] bg-[#fef9c3] border border-[#fef08a] text-[12px] font-medium text-[#854d0e] flex items-center gap-1.5">
                <span>Error de conexión... reintentado</span>
                <AlertCircle className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="px-3 py-1 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] text-[12px] font-medium text-[#475569] flex items-center gap-1.5">
                <span>Guardado</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              </span>
            )}
          </div>

          {/* Step Pill */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-black">PASO {step}/8</span>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#f1f5f9] text-[12px] font-bold text-black uppercase">
              <span>{stepsInfo[step - 1]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
            </div>
          </div>

          {/* ================= PASO 1/8: DATOS GENERALES (EVR - 45) ================= */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Datos generales</h1>
                <p className="text-[14px] text-[#475569]">
                  Registro de medidas antropométricas básicas (peso, altura, índice de masa corporal) y parámetros clínicos opcionales como tensión arterial y análisis de laboratorio.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Peso</label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ingresa tu peso"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Altura</label>
                  <input
                    type="number"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ingresa tu altura"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Índice de masa corporal</label>
                  <input
                    type="text"
                    readOnly
                    value={calculateIMC()}
                    placeholder="Cálculo del peso y la altura"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] bg-[#f8fafc] text-[14px] text-black"
                  />
                </div>
              </div>

              {/* Informative box */}
              <div className="bg-[#f0f9ff] border border-[#e0f2fe] rounded-[8px] p-4 flex items-start gap-3">
                <span className="text-[#0284c7] font-bold">ⓘ</span>
                <div className="flex flex-col text-[13px] text-[#0369a1]">
                  <strong className="font-bold">Información clínica opcional</strong>
                  <span>Si conoces tus valores para los siguientes parámetros clínicos, puedes añadirlos a continuación. No es necesario completar todos los campos.</span>
                </div>
              </div>

              {/* Clinical parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Tensión arterial (mmHg)</label>
                  <input placeholder="Ingresa tu presión sistólica y diastólica" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Glucosa (mg/dl)</label>
                  <input placeholder="Ingresa tu nivel de glucosa" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Hemoglobina glicosilada (%)</label>
                  <input placeholder="Ingresa tu porcentaje de HbA1c" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Colesterol LDL (mg/dl)</label>
                  <input placeholder="Ingresa tu nivel de colesterol LDL" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Colesterol HDL (mg/dl)</label>
                  <input placeholder="Ingresa tu nivel de colesterol HDL" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Triglicéridos (mg/dl)</label>
                  <input placeholder="Ingresa tu nivel de triglicéridos" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Creatinina (mg/dl)</label>
                  <input placeholder="Ingresa tu nivel de creatinina" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] text-black">Hemoglobina (g/dl)</label>
                  <input placeholder="Ingresa tu nivel de hemoglobina" className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]" />
                </div>
              </div>
            </div>
          )}

          {/* ================= PASO 2/8: ALERGIAS (EVR - 47) ================= */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Alergias</h1>
                <p className="text-[14px] text-[#475569]">
                  ¿Tienes alergia a algún medicamento o alimento?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasAlergias('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasAlergias === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasAlergias('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasAlergias === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">Alergias alimentarias</label>
                <textarea
                  rows={3}
                  placeholder="Indica los alimentos que te causan alergia y la reacción que presentas."
                  className="w-full p-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">Alergias a medicamentos</label>
                <textarea
                  rows={3}
                  placeholder="Indica los medicamentos que te causan alergia y la reacción que presentas."
                  className="w-full p-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">Otras alergias</label>
                <textarea
                  rows={3}
                  placeholder="Indica otras sustancias que te causan alergia, como polen, ácaros o látex, y la reacción que presentas."
                  className="w-full p-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>
          )}

          {/* ================= PASO 3/8: ENFERMEDADES (EVR - 48) ================= */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Enfermedades</h1>
                <p className="text-[14px] text-[#475569]">
                  ¿Tienes o has tenido alguna enfermedad importante?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasEnfermedades('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasEnfermedades === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasEnfermedades('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasEnfermedades === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              {/* Disease Cards (All open Ginecología as user instructed: "No importa cuál selecciones en enfermedades, que siempre te mande a ginecología") */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { title: 'Enfermedades cardíacas, pulmonares o vasculares', desc: 'Indica el diagnóstico y el tratamiento recibido, si lo hubo' },
                  { title: 'Enfermedades metabólicas o digestivas', desc: 'Indica el diagnóstico y el tratamiento recibido, si lo hubo' },
                  { title: 'Enfermedades reumatológicas, óseas o musculares', desc: 'Describe la enfermedad y las zonas del cuerpo afectadas' },
                  { title: 'Enfermedades del sistema nervioso, los ojos o el oído', desc: 'Indica el diagnóstico y los síntomas principales' },
                  { title: 'Enfermedades hematológicas', desc: 'Indica la enfermedad de la sangre y el tratamiento recibido, si lo hubo', checked: true },
                  { title: 'Enfermedades renales o urológicas', desc: 'Indica la enfermedad de los riñones o las vías urinarias' },
                  { title: 'Salud mental', desc: 'Indica el diagnóstico y el tratamiento psicológico o psiquiátrico recibido, si lo hubo' },
                  { title: 'Enfermedades infecciosas', desc: 'Indica la infección y cuándo la tuviste, si lo recuerdas', checked: true },
                  { title: 'Enfermedades dermatológicas', desc: 'Describe la enfermedad de la piel y las zonas afectadas', checked: true },
                  { title: 'Enfermedades ginecológicas', desc: 'Indica el diagnóstico y el tratamiento recibido, si lo hubo', isGineco: true },
                  { title: 'Cáncer', desc: 'Indica el tipo de cáncer, la fecha aproximada del diagnóstico y el tratamiento recibido.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setIsGinecologiaOpen(true)}
                    className="p-3.5 rounded-[8px] border border-[#e2e8f0] hover:border-[#d50475] hover:bg-[#fdf2f8]/30 flex items-start justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-[#cbd5e1] flex items-center justify-center shrink-0 mt-0.5">
                        {item.checked && <div className="w-2.5 h-2.5 rounded-full bg-[#d50475]" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-black">{item.title}</span>
                        <span className="text-[12px] text-[#64748b] leading-tight mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                    <span className="text-[#94a3b8] text-sm">›</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PASO 4/8: INTERVENCIONES QUIRÚRGICAS (EVR - 103) ================= */}
          {step === 4 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Intervenciones quirúrgicas</h1>
                <p className="text-[14px] text-[#475569]">
                  ¿Te han realizado alguna intervención quirúrgica?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasCirugias('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasCirugias === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasCirugias('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasCirugias === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">¿Qué intervenciones quirúrgicas te han realizado?</label>
                <textarea
                  rows={4}
                  placeholder="Indica el tipo de intervención y la fecha aproximada. Si hubo complicaciones, descríbelas."
                  className="w-full p-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>
          )}

          {/* ================= PASO 5/8: MEDICAMENTOS (EVR - 104) ================= */}
          {step === 5 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Medicamentos</h1>
                <p className="text-[14px] text-[#475569]">
                  Tomas algún medicamento de forma habitual?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasMedicamentos('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasMedicamentos === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasMedicamentos('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasMedicamentos === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">¿Qué medicamentos tomas?</label>
                <textarea
                  rows={4}
                  placeholder="Indica el nombre de cada medicamento, la dosis y la frecuencia con la que lo tomas."
                  className="w-full p-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>
          )}

          {/* ================= PASO 6/8: CONSUMO DE SUSTANCIAS TÓXICAS (EVR - 105) ================= */}
          {step === 6 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Consumo de sustancias tóxicas</h1>
                <p className="text-[14px] text-[#475569]">
                  ¿Consumes alcohol, tabaco u otras drogas?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasSustancias('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasSustancias === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasSustancias('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasSustancias === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Alcohol', 'Tabaco', 'Otras drogas'].map((item) => (
                  <label key={item} className="p-3 rounded-[6px] border border-[#cbd5e1] hover:bg-[#f8fafc] flex items-center gap-2.5 cursor-pointer text-[14px] text-black font-medium">
                    <input type="checkbox" className="w-4 h-4 accent-[#d50475]" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">¿Qué cantidad consumes y con qué frecuencia?</label>
                <textarea
                  rows={4}
                  placeholder="Indica la cantidad y la frecuencia de consumo de cada sustancia seleccionada."
                  className="w-full p-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>
          )}

          {/* ================= PASO 7/8: ALIMENTACIÓN (EVR - 106) ================= */}
          {step === 7 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Alimentación</h1>
                <p className="text-[14px] text-[#475569]">
                  ¿Consideras que tienes alguna dificultad relacionada con tu alimentación?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasAlimentacion('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasAlimentacion === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasAlimentacion('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasAlimentacion === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">¿Cuál es tu situación?</label>
                <select className="w-full h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-[#64748b] bg-white">
                  <option>Selecciona una opción</option>
                  <option>Dieta equilibrada</option>
                  <option>Apetito disminuido</option>
                  <option>Restricción de gluten/lactosa</option>
                  <option>Trastorno de la conducta alimentaria</option>
                </select>
              </div>
            </div>
          )}

          {/* ================= PASO 8/8: BIENESTAR EMOCIONAL (EVR - 107) ================= */}
          {step === 8 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Bienestar emocional</h1>
                <p className="text-[14px] text-[#475569]">
                  ¿Has vivido alguna situación difícil de superar en los últimos dos años?
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasEmocional('si')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasEmocional === 'si' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setHasEmocional('no')}
                  className={`h-8 px-4 rounded-[6px] border text-[13px] font-bold cursor-pointer ${
                    hasEmocional === 'no' ? 'bg-[#d50475] text-white border-[#d50475]' : 'border-[#cbd5e1] text-black hover:bg-[#f8fafc]'
                  }`}
                >
                  No
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Dificultades familiares',
                  'Dificultades con un hijo o una hija',
                  'Dificultades de pareja',
                  'Dificultades en el entorno laboral',
                  'Violencia física',
                  'Violencia psicológica',
                  'Abuso sexual',
                  'Accidente',
                  'Desastre natural',
                  'Atentado o conflicto armado',
                  'Duelo por la pérdida de un ser querido',
                ].map((item) => (
                  <label key={item} className="p-3.5 rounded-[8px] border border-[#cbd5e1] hover:bg-[#f8fafc] flex items-center gap-3 cursor-pointer text-[14px] text-black font-medium">
                    <input type="checkbox" className="w-4 h-4 accent-[#d50475]" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="w-full flex items-center justify-between pt-6 border-t border-[#f1f5f9] mt-4">
            <button
              type="button"
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else onBackToHome();
              }}
              className="h-[38px] px-4 rounded-[6px] border border-[#cbd5e1] hover:bg-[#f8fafc] text-[13px] font-bold text-[#0f172a] transition-colors cursor-pointer"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => {
                if (step < 8) setStep(step + 1);
                else onBackToHome();
              }}
              className="h-[38px] px-6 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer"
            >
              {step === 8 ? 'Finalizar cuestionario' : 'Continuar'}
            </button>
          </div>

        </div>
      </main>

      {/* Modals */}
      <ModalGinecologia
        isOpen={isGinecologiaOpen}
        onClose={() => setIsGinecologiaOpen(false)}
        onConfirm={() => setIsGinecologiaOpen(false)}
      />

      <ModalDocumentos
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
};
