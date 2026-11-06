import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, Mail, Phone, ChevronDown, HelpCircle, Check, Sparkles } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';

interface BiometriaProps {
  onBackToHome: () => void;
  userName?: string;
}

export const Biometria: React.FC<BiometriaProps> = ({ onBackToHome, userName = 'Carlos Damián' }) => {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const scanImgSrc = `${import.meta.env.BASE_URL}assets/biometria-scan.jpg`;

  // Flow stages:
  // 1: Formulario (Datos personales + clínicos con toggles)
  // 'loading': Barra de carga central (90% "Por favor, espere, la medición comenzará pronto...")
  // 2: Escaneo biométrico activo (FaceTime HD selector, ayuda, círculo de detección con histogramas de señal)
  const [stage, setStage] = useState<1 | 'loading' | 2>(1);
  const [loadProgress, setLoadProgress] = useState(30);

  // Form states
  const [nombre, setNombre] = useState('Carlos Damian');
  const [apellidos, setApellidos] = useState('descarlosdamian');
  const [email, setEmail] = useState('contact@carlosdamian.com');
  const [edad, setEdad] = useState('35');
  const [altura, setAltura] = useState('140');
  const [peso, setPeso] = useState('60');
  const [sexo, setSexo] = useState('Masculino');

  // Clinical toggles
  const [diabetes, setDiabetes] = useState('no'); // 'no' | 'tipo1' | 'tipo2'
  const [fuma, setFuma] = useState('no'); // 'si' | 'no'
  const [medicacionPresion, setMedicacionPresion] = useState('no'); // 'si' | 'no'
  const [aceptaTerminos, setAceptaTerminos] = useState(true);

  // Info support popover/dropdown state
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Camera selection for Stage 2
  const [selectedCamera, setSelectedCamera] = useState('Cámara FaceTime HD (C4E1:9BFB)');

  // Handle stage 1 -> loading -> stage 2
  const handleStartMeasurement = () => {
    setStage('loading');
    setLoadProgress(20);
  };

  useEffect(() => {
    if (stage === 'loading') {
      const timer1 = setTimeout(() => setLoadProgress(65), 500);
      const timer2 = setTimeout(() => setLoadProgress(90), 1000);
      const timer3 = setTimeout(() => {
        setStage(2);
      }, 1600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [stage]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-[family-name:Helvetica]">
      {/* Header: Logo Everhealth a la izquierda, a la derecha Info Icon (sin bordes) + ES */}
      <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white sticky top-0 z-40">
        <div className="w-full max-w-[800px] flex items-center justify-between">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBackToHome}
            className="h-[40px] w-auto object-contain object-left cursor-pointer"
          />

          <div className="flex items-center gap-3 relative">
            {/* Botón icono de información (sin bordes) que abre dropdown con email y teléfono */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSupportOpen(!isSupportOpen)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
                title="Información y soporte de biometría"
                aria-label="Información de contacto"
              >
                <Info className="w-5 h-5 text-black" />
              </button>

              {/* Dropdown con la información de soporte: email y teléfono */}
              {isSupportOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[290px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.14)] p-3 border-0 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[12px] font-bold text-black uppercase tracking-wider">
                      Soporte Biometría
                    </span>
                    <span className="text-[11px] font-medium text-[#64748b]">Ever Health</span>
                  </div>

                  {/* Email */}
                  <a
                    href="mailto:biometria@everhealth.es"
                    className="flex items-center gap-2.5 p-2 rounded-[6px] hover:bg-[#f8fafc] text-black transition-colors text-left group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#f1f5f9] group-hover:bg-[#fce7f3] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-black group-hover:text-[#d50475]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-[#64748b] leading-tight">Correo electrónico</span>
                      <span className="text-[13px] font-bold text-black truncate group-hover:text-[#d50475]">
                        biometria@everhealth.es
                      </span>
                    </div>
                  </a>

                  {/* Teléfono */}
                  <a
                    href="tel:918220518"
                    className="flex items-center gap-2.5 p-2 rounded-[6px] hover:bg-[#f8fafc] text-black transition-colors text-left group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#f1f5f9] group-hover:bg-[#fce7f3] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-black group-hover:text-[#d50475]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-[#64748b] leading-tight">Atención telefónica</span>
                      <span className="text-[13px] font-bold text-black truncate group-hover:text-[#d50475]">
                        918 220 518
                      </span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Container - Homologado a max-w-[800px] */}
      <main className="flex-1 w-full flex justify-center px-4 pt-8 pb-16">
        <div className="w-full max-w-[800px] flex flex-col gap-6">

          {/* Top navigation row con botón de volver */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (stage === 2) setStage(1);
                else onBackToHome();
              }}
              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Stepper Pill indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-black uppercase">
                {stage === 1 ? 'PASO 1/2 · REGISTRO' : stage === 'loading' ? 'CARGANDO' : 'PASO 2/2 · MEDICIÓN EN VIVO'}
              </span>
            </div>
          </div>

          {/* ================= FASE 1: FORMULARIO BIOMETRÍA ================= */}
          {stage === 1 && (
            <div className="flex flex-col gap-8">
              {/* Encabezado: Título y descripción */}
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#d50475]">
                  Biometría
                </span>
                <h1 className="text-[26px] sm:text-[30px] leading-[36px] font-bold text-black">
                  Bienvenido al sistema inteligente de diagnosis por imagen.
                </h1>
                <h2 className="text-[20px] leading-[28px] font-bold text-black mt-1">
                  Completa tus datos y empezamos
                </h2>
                <p className="text-[14px] leading-[22px] text-black font-normal">
                  Estimación digital de constantes biométricas en tiempo real a través de análisis de video facial y fotopletismografía sin contacto.
                </p>
              </div>

              {/* Formulario de campos */}
              <div className="flex flex-col gap-4">
                {/* Fila 1: Nombre y Apellidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Nombre</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Apellidos</label>
                    <input
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      placeholder="Tus apellidos"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

                {/* Fila 2: Email y Edad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tuemail@ejemplo.com"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Edad</label>
                    <input
                      type="number"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      placeholder="Tu edad"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

                {/* Fila 3: Altura, Peso y Sexo al nacer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Altura</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        placeholder="170"
                        className="w-full h-[44px] px-3.5 pr-10 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-black font-medium pointer-events-none">
                        cm
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Peso</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        placeholder="70"
                        className="w-full h-[44px] px-3.5 pr-10 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-black font-medium pointer-events-none">
                        kg
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">Sexo al nacer</label>
                    <div className="relative">
                      <select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        className="w-full h-[44px] px-3.5 pr-10 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] appearance-none cursor-pointer"
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-black absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preguntas clínicas con Toggles */}
              <div className="flex flex-col gap-6 pt-2">
                {/* Diabetes (No, Tipo 1, Tipo 2) */}
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] font-bold text-black">¿Tiene diabetes?</span>
                  <div>
                    <SegmentedToggle
                      value={diabetes}
                      onChange={(val) => setDiabetes(val)}
                      options={[
                        { label: 'No', value: 'no' },
                        { label: 'Tipo 1', value: 'tipo1' },
                        { label: 'Tipo 2', value: 'tipo2' },
                      ]}
                    />
                  </div>
                </div>

                {/* Fuma (Sí / No) */}
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] font-bold text-black">¿Fuma?</span>
                  <div>
                    <SegmentedToggle
                      value={fuma}
                      onChange={(val) => setFuma(val)}
                      options={[
                        { label: 'Sí', value: 'si' },
                        { label: 'No', value: 'no' },
                      ]}
                    />
                  </div>
                </div>

                {/* Medicación para presión arterial (Sí / No) */}
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] font-bold text-black">
                    ¿Está tomando medicación para la presión arterial?
                  </span>
                  <div>
                    <SegmentedToggle
                      value={medicacionPresion}
                      onChange={(val) => setMedicacionPresion(val)}
                      options={[
                        { label: 'Sí', value: 'si' },
                        { label: 'No', value: 'no' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox Acepto términos y política de privacidad */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                    className="w-4 h-4 rounded-[4px] accent-[#d50475] border-[#cbd5e1] cursor-pointer"
                  />
                  <span className="text-[14px] text-black">
                    He leído y acepto la{' '}
                    <span className="text-[#d50475] underline hover:opacity-80">
                      política de privacidad
                    </span>
                  </span>
                </label>
              </div>

              {/* Reusable Navigation Footer matching project standards */}
              <NavigationFooter
                onBack={onBackToHome}
                onNext={handleStartMeasurement}
                backText="Atrás"
                nextText="Continuar"
              />
            </div>
          )}

          {/* ================= FASE LOADING: BARRA CENTRAL DE CARGA ================= */}
          {stage === 'loading' && (
            <div className="min-h-[420px] flex flex-col items-center justify-center gap-6 py-16 text-center animate-fadeIn">
              {/* Barra de progreso redondeada matching boceto del usuario */}
              <div className="w-full max-w-[380px] h-[22px] bg-[#f1f5f9] rounded-full overflow-hidden p-[2px] border border-[#e2e8f0] relative flex items-center">
                <div
                  className="h-full bg-[#94a3b8] rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${loadProgress}%` }}
                >
                  <span className="text-[12px] font-bold text-white tracking-wide">
                    {loadProgress}%
                  </span>
                </div>
              </div>

              <p className="text-[15px] leading-[22px] text-black font-normal">
                Por favor, espere, la medición comenzará pronto...
              </p>
            </div>
          )}

          {/* ================= FASE 2: PROCESO BIOMÉTRICO (CÁMARA EN VIVO) ================= */}
          {stage === 2 && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Barra superior de controles del proceso biométrico */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setStage(1)}
                  className="text-[14px] font-bold text-black hover:text-[#d50475] flex items-center gap-1 transition-colors cursor-pointer w-fit"
                >
                  <span>&lt; Cancelar</span>
                </button>

                <div className="flex items-center gap-3 flex-1 sm:max-w-[420px]">
                  {/* Selector de cámara con field label flotante */}
                  <div className="relative flex-1">
                    <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#64748b] z-10">
                      Para comenzar, seleccione una cámara
                    </span>
                    <select
                      value={selectedCamera}
                      onChange={(e) => setSelectedCamera(e.target.value)}
                      className="w-full h-[42px] px-3.5 pr-8 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#d50475]"
                    >
                      <option value="Cámara FaceTime HD (C4E1:9BFB)">
                        Cámara FaceTime HD (C4E1:9BFB)
                      </option>
                      <option value="Cámara Externa USB 1080p">
                        Cámara Externa USB 1080p
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-black absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Botón Ayuda pill */}
                  <button
                    type="button"
                    className="h-[42px] px-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white flex items-center gap-1.5 text-[13px] font-bold text-black cursor-pointer transition-colors shrink-0"
                  >
                    <HelpCircle className="w-4 h-4 text-black" />
                    <span>Ayuda</span>
                  </button>
                </div>
              </div>

              {/* Visor Facial Biométrico con la fotografía del sujeto e histogramas */}
              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden">
                
                {/* Contenedor central con círculo facial */}
                <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
                  
                  {/* Histogramas y líneas de señal en las 4 esquinas */}
                  {/* Esquina superior izquierda */}
                  <div className="absolute -top-3 -left-6 flex flex-col items-start gap-1">
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-60">
                      {[15, 30, 45, 80, 60, 40, 25, 70, 95, 50, 20].map((h, i) => (
                        <div key={i} className="w-[3px] bg-[#64748b]" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="w-20 h-[1px] bg-[#94a3b8] transform -rotate-45 origin-left" />
                  </div>

                  {/* Esquina superior derecha */}
                  <div className="absolute -top-3 -right-6 flex flex-col items-end gap-1">
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-60 justify-end">
                      {[20, 50, 75, 40, 90, 85, 30, 60, 40, 25, 10].map((h, i) => (
                        <div key={i} className="w-[3px] bg-[#64748b]" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="w-20 h-[1px] bg-[#94a3b8] transform rotate-45 origin-right" />
                  </div>

                  {/* Esquina inferior izquierda */}
                  <div className="absolute -bottom-3 -left-6 flex flex-col items-start gap-1">
                    <div className="w-20 h-[1px] bg-[#94a3b8] transform rotate-45 origin-left" />
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-60">
                      {[10, 25, 60, 90, 40, 30, 75, 85, 45, 30, 15].map((h, i) => (
                        <div key={i} className="w-[3px] bg-[#64748b]" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>

                  {/* Esquina inferior derecha */}
                  <div className="absolute -bottom-3 -right-6 flex flex-col items-end gap-1">
                    <div className="w-20 h-[1px] bg-[#94a3b8] transform -rotate-45 origin-right" />
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-60 justify-end">
                      {[30, 60, 40, 70, 95, 80, 50, 35, 20, 45, 10].map((h, i) => (
                        <div key={i} className="w-[3px] bg-[#64748b]" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>

                  {/* Círculo con borde punteado que enmarca la imagen del rostro */}
                  <div className="w-full h-full rounded-full border-2 border-dashed border-[#94a3b8] p-1.5 flex items-center justify-center relative shadow-inner overflow-hidden">
                    <img
                      src={scanImgSrc}
                      alt="Escaneo facial biométrico"
                      className="w-full h-full rounded-full object-cover scale-105"
                    />

                    {/* Overlay semitransparente oscuro suave para legibilidad del texto */}
                    <div className="absolute inset-0 bg-black/25 rounded-full flex flex-col items-center justify-center text-center p-4">
                      {/* Puntos y líneas de guía facial */}
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs top-[36%] left-[46%]" />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs top-[42%] left-[42%]" />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs top-[66%] left-[43%]" />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs top-[68%] right-[40%]" />

                      <p className="text-[15px] sm:text-[16px] leading-[22px] font-bold text-white drop-shadow-md">
                        Su cara está demasiado lejos
                      </p>
                      <p className="text-[13px] sm:text-[14px] leading-[20px] font-medium text-white/95 drop-shadow-md mt-0.5">
                        Acérquese más a la cámara
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5 Estrellas verdes de calibración y calidad */}
                <div className="flex items-center gap-2 mt-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-[#10b981] text-[18px]">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Barra de navegación inferior */}
              <NavigationFooter
                onBack={() => setStage(1)}
                onNext={onBackToHome}
                backText="Cancelar"
                nextText="Finalizar escaneo"
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
