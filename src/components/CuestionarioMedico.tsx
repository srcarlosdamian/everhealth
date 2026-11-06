import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, AlertCircle, Info, Maximize2 } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { ModalGinecologia } from './ModalGinecologia';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';
import { ProgressCheckCircle } from '../design-system/atoms/ProgressCheckCircle';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';
import { CompletionMedalIllustration } from '../design-system/atoms/CompletionMedalIllustration';
import { MisDocumentosMedicos } from './MisDocumentosMedicos';

interface CuestionarioMedicoProps {
  onBackToHome: () => void;
}

export const CuestionarioMedico: React.FC<CuestionarioMedicoProps> = ({ onBackToHome }) => {
  const [step, setStep] = useState<number>(1);
  const [flowStage, setFlowStage] = useState<'questionnaire' | 'completed' | 'documents' | 'final-success'>('questionnaire');
  const [isGinecologiaOpen, setIsGinecologiaOpen] = useState(false);
  const [isStepsDropdownOpen, setIsStepsDropdownOpen] = useState(false);

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

  const stepsList = [
    { id: 1, name: 'Información general', isCompleted: peso !== '' && altura !== '', progress: (peso || altura) ? 50 : 0 },
    { id: 2, name: 'Alergias', isCompleted: true, progress: 100 },
    { id: 3, name: 'Enfermedades', isCompleted: false, progress: 45 },
    { id: 4, name: 'Intervenciones quirúrgicas', isCompleted: false, progress: 20 },
    { id: 5, name: 'Medicamentos', isCompleted: false, progress: 0 },
    { id: 6, name: 'Consumo de sustancias', isCompleted: false, progress: 0 },
    { id: 7, name: 'Alimentación', isCompleted: false, progress: 0 },
    { id: 8, name: 'Bienestar emocional', isCompleted: false, progress: 0 },
  ];

  // EVR - 116: Cuestionario completado
  if (flowStage === 'completed') {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col">
        <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white sticky top-0 z-40">
          <div className="w-full max-w-[800px] flex items-center justify-between">
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              onClick={onBackToHome}
              className="h-[40px] w-auto object-contain object-left cursor-pointer"
            />
            <LanguageSelector />
          </div>
        </header>

        <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-[600px] flex flex-col items-center text-center">
            <CompletionMedalIllustration size={180} className="mb-6" />
            <h1 className="text-[28px] font-bold text-black mb-2">Cuestionario completado</h1>
            <p className="text-[14px] leading-[22px] text-black max-w-[480px] mb-8 font-normal">
              Gracias por completar tu cuestionario de salud. Mantener tus datos actualizados ayuda a tu equipo médico a conocerte mejor.
            </p>
            <button
              type="button"
              onClick={() => setFlowStage('documents')}
              className="h-[40px] px-6 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[14px] font-medium transition-colors cursor-pointer"
            >
              Continuar y añadir documentos médicos
            </button>
          </div>
        </main>
      </div>
    );
  }

  // EVR - 117: Mis documentos médicos
  if (flowStage === 'documents') {
    return (
      <MisDocumentosMedicos
        onBack={() => setFlowStage('completed')}
        onSkip={() => setFlowStage('final-success')}
        onFinish={() => setFlowStage('final-success')}
      />
    );
  }

  // EVR - 118: Información de salud completada
  if (flowStage === 'final-success') {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col">
        <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white sticky top-0 z-40">
          <div className="w-full max-w-[800px] flex items-center justify-between">
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              onClick={onBackToHome}
              className="h-[40px] w-auto object-contain object-left cursor-pointer"
            />
            <LanguageSelector />
          </div>
        </header>

        <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-[600px] flex flex-col items-center text-center">
            <CompletionMedalIllustration size={180} className="mb-6" />
            <h1 className="text-[28px] font-bold text-black mb-2">Información de salud completada</h1>
            <p className="text-[14px] leading-[22px] text-black max-w-[500px] mb-8 font-normal">
              Has completado el cuestionario. Esta información ayudará a tu equipo médico a comprender mejor tus antecedentes de salud.
            </p>
            <button
              type="button"
              onClick={onBackToHome}
              className="h-[40px] px-8 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[14px] font-medium transition-colors cursor-pointer"
            >
              Finalizar
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Header homologado con max-w-[800px], sin botón de subir documentos */}
      <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white sticky top-0 z-40">
        <div className="w-full max-w-[800px] flex items-center justify-between">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBackToHome}
            className="h-[40px] w-auto object-contain object-left cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Container homologado con max-w-[800px] */}
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

            {/* Status indicator: Guardado sin línea, check no verde, texto más oscuro. Error de conexión sin borde */}
            {step === 4 ? (
              <span className="px-3 py-1 rounded-[6px] bg-[#fef9c3] text-[12px] font-medium text-[#854d0e] flex items-center gap-1.5 border-0">
                <span>Error de conexión... reintentando</span>
                <AlertCircle className="w-3.5 h-3.5" />
              </span>
            ) : (
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#1e293b]">
                <span>Guardado</span>
                <Check className="w-4 h-4 text-[#1e293b] stroke-[2.5]" />
              </div>
            )}
          </div>

          {/* Step Pill Dropdown con navegación no lineal y círculos de progreso a la derecha */}
          <div className="relative inline-block">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-black">PASO {step}/8</span>
              <button
                type="button"
                onClick={() => setIsStepsDropdownOpen(!isStepsDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-[10px] py-[3px] rounded-[6px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-transparent text-black text-[12px] font-bold uppercase transition-colors cursor-pointer select-none"
              >
                <span>{stepsInfo[step - 1]}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${isStepsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Menú desplegable con todas las 8 secciones para navegar libremente */}
            {isStepsDropdownOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[300px] sm:w-[350px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.14)] p-2 flex flex-col gap-1 border border-[#f1f5f9]">
                <div className="px-3 py-1.5 border-b border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Secciones del cuestionario</span>
                  <span className="text-[11px] text-[#94a3b8]">Opcional</span>
                </div>
                {stepsList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setStep(item.id);
                      setIsStepsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-[6px] flex items-center justify-between text-left transition-colors cursor-pointer ${
                      step === item.id
                        ? 'bg-[#f8fafc] text-black font-bold'
                        : 'hover:bg-[#f8fafc] text-[#334155]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[12px] font-bold text-[#94a3b8]">{item.id}.</span>
                      <span className="text-[13px] leading-tight truncate">{item.name}</span>
                    </div>
                    <ProgressCheckCircle
                      isCompleted={item.isCompleted}
                      progress={item.progress}
                      size={18}
                      className="shrink-0 ml-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= PASO 1/8: DATOS GENERALES (EVR - 45) ================= */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-black">Datos generales</h1>
                <p className="text-[14px] leading-[22px] text-black font-normal">
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

              {/* Informative box: neutral con ícono Lucide nativo Info */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-4 flex items-start gap-3">
                <Info className="w-[18px] h-[18px] text-[#475569] shrink-0 mt-0.5" />
                <div className="flex flex-col text-[13px] leading-[20px] text-black">
                  <strong className="font-bold text-black">Información clínica opcional</strong>
                  <span className="text-[#334155]">Si conoces tus valores para los siguientes parámetros clínicos, puedes añadirlos a continuación. No es necesario completar todos los campos.</span>
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Tienes alergia a algún medicamento o alimento?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasAlergias}
                  onChange={(val) => setHasAlergias(val as 'si' | 'no')}
                />
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Tienes o has tenido alguna enfermedad importante?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasEnfermedades}
                  onChange={(val) => setHasEnfermedades(val as 'si' | 'no')}
                />
              </div>

              {/* Disease Cards: sin bordes redondeados, progreso circular, icono modal expand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { title: 'Enfermedades cardíacas, pulmonares o vasculares', desc: 'Indica el diagnóstico y el tratamiento recibido, si lo hubo', progress: 35 },
                  { title: 'Enfermedades metabólicas o digestivas', desc: 'Indica el diagnóstico y el tratamiento recibido, si lo hubo', progress: 35 },
                  { title: 'Enfermedades reumatológicas, óseas o musculares', desc: 'Describe la enfermedad y las zonas del cuerpo afectadas', checked: true },
                  { title: 'Enfermedades del sistema nervioso, los ojos o el oído', desc: 'Indica el diagnóstico y los síntomas principales', progress: 35 },
                  { title: 'Enfermedades hematológicas', desc: 'Indica la enfermedad de la sangre y el tratamiento recibido, si lo hubo', checked: true },
                  { title: 'Enfermedades renales o urológicas', desc: 'Indica la enfermedad de los riñones o las vías urinarias', progress: 35 },
                  { title: 'Salud mental', desc: 'Indica el diagnóstico y el tratamiento psicológico o psiquiátrico recibido, si lo hubo', progress: 35 },
                  { title: 'Enfermedades infecciosas', desc: 'Indica la infección y cuándo la tuviste, si lo recuerdas', checked: true },
                  { title: 'Enfermedades dermatológicas', desc: 'Describe la enfermedad de la piel y las zonas afectadas', checked: true },
                  { title: 'Enfermedades ginecológicas', desc: 'Indica el diagnóstico y el tratamiento recibido, si lo hubo', isGineco: true, progress: 35 },
                  { title: 'Cáncer', desc: 'Indica el tipo de cáncer, la fecha aproximada del diagnóstico y el tratamiento recibido.', progress: 35 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setIsGinecologiaOpen(true)}
                    className="p-3.5 rounded-none border border-[#e2e8f0] hover:border-[#475569] active:border-black bg-white flex items-start justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <ProgressCheckCircle
                        isCompleted={item.checked}
                        progress={item.progress || 35}
                        size={22}
                        className="mt-0.5"
                      />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-black">{item.title}</span>
                        <span className="text-[12px] text-[#64748b] leading-tight mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                    <Maximize2 className="w-[24px] h-[24px] text-black shrink-0" />
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Te han realizado alguna intervención quirúrgica?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasCirugias}
                  onChange={(val) => setHasCirugias(val as 'si' | 'no')}
                />
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Tomas algún medicamento de forma habitual?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasMedicamentos}
                  onChange={(val) => setHasMedicamentos(val as 'si' | 'no')}
                />
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Consumes alcohol, tabaco u otras drogas?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasSustancias}
                  onChange={(val) => setHasSustancias(val as 'si' | 'no')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Alcohol', 'Tabaco', 'Otras drogas'].map((item) => (
                  <label key={item} className="p-3 rounded-[6px] border border-[#cbd5e1] hover:border-[#475569] flex items-center gap-2.5 cursor-pointer text-[14px] text-black font-medium transition-colors">
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Consideras que tienes alguna dificultad relacionada con tu alimentación?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasAlimentacion}
                  onChange={(val) => setHasAlimentacion(val as 'si' | 'no')}
                />
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
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  ¿Has vivido alguna situación difícil de superar en los últimos dos años?
                </p>
              </div>

              <div>
                <SegmentedToggle
                  value={hasEmocional}
                  onChange={(val) => setHasEmocional(val as 'si' | 'no')}
                />
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
                  <label key={item} className="p-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] flex items-center gap-3 cursor-pointer text-[14px] text-black font-medium transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-[#d50475]" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Footer Reusable Component matching Figma */}
          <NavigationFooter
            onBack={() => {
              if (step > 1) setStep(step - 1);
              else onBackToHome();
            }}
            onNext={() => {
              if (step < 8) setStep(step + 1);
              else setFlowStage('completed');
            }}
            nextText={step === 8 ? 'Finalizar cuestionario' : 'Continuar'}
          />

        </div>
      </main>

      {/* Modals */}
      <ModalGinecologia
        isOpen={isGinecologiaOpen}
        onClose={() => setIsGinecologiaOpen(false)}
        onConfirm={() => setIsGinecologiaOpen(false)}
      />
    </div>
  );
};
