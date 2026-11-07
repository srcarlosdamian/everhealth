import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Info, Mail, Phone, ChevronDown, HelpCircle, AlertCircle, Camera, VideoOff, Heart, RefreshCw, Check } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';

interface BiometriaProps {
  onBackToHome: () => void;
  userName?: string;
}

export const Biometria: React.FC<BiometriaProps> = ({ onBackToHome, userName = 'Carlos Damián' }) => {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const scanReadyImg = `${import.meta.env.BASE_URL}assets/scan-ready.jpg`;
  const scanFarImg = `${import.meta.env.BASE_URL}assets/scan-far.jpg`;
  const scanMeasuringImg = `${import.meta.env.BASE_URL}assets/scan-measuring.jpg`;

  // Flow stages:
  // 1: Formulario (Datos personales + clínicos con toggles)
  // 'loading': Barra de carga central (90% "Por favor, espere, la medición comenzará pronto...")
  // 2: Escaneo biométrico interactivo
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
  const [diabetes, setDiabetes] = useState('no');
  const [fuma, setFuma] = useState('no');
  const [medicacionPresion, setMedicacionPresion] = useState('no');
  const [aceptaTerminos, setAceptaTerminos] = useState(true);

  // Info support popover state
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Camera selector
  const [selectedCamera, setSelectedCamera] = useState('Cámara FaceTime HD (C4E1:9BFB)');

  // Prototype Simulation Controls
  // Distance / positioning state: 'far' (demasiado lejos) | 'ready' (bien posicionado, botón azul listo)
  const [positionState, setPositionState] = useState<'far' | 'ready'>('ready');
  
  // Real webcam state
  const [useRealWebcam, setUseRealWebcam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [webcamError, setWebcamError] = useState(false);

  // Measurement process states:
  // 'idle' (esperando a pulsar "Comenzar medición")
  // 'measuring' (midiendo: barra verde horizontal, pulso cardíaco, cuenta regresiva)
  // 'error' (modal de error simulado)
  // 'completed' (medición finalizada)
  const [measureStatus, setMeasureStatus] = useState<'idle' | 'measuring' | 'error' | 'completed'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [countdown, setCountdown] = useState(25);
  const [heartRate, setHeartRate] = useState(71);

  // Prototype Dropdown para forzar simulación de error
  const [simulatedOutcome, setSimulatedOutcome] = useState<'success' | 'blood_flow_error'>('blood_flow_error');

  // Activar / desactivar cámara web real
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (stage === 2 && useRealWebcam) {
      navigator.mediaDevices?.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn('Webcam permission denied or unavailable:', err);
          setWebcamError(true);
          setUseRealWebcam(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stage, useRealWebcam]);

  // Stage 1 -> loading transition
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
        setMeasureStatus('idle');
      }, 1600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [stage]);

  // Handle measurement progress during 'measuring'
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (stage === 2 && measureStatus === 'measuring') {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + 3;
          if (next >= 50 && simulatedOutcome === 'blood_flow_error' && prev < 50) {
            // Trigger failure at ~50%
            setMeasureStatus('error');
            return 50;
          }
          if (next >= 100) {
            setMeasureStatus('completed');
            return 100;
          }
          return next;
        });

        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
        // Heart rate slight fluctuation
        setHeartRate((prev) => Math.floor(69 + Math.random() * 5));
      }, 350);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage, measureStatus, simulatedOutcome]);

  const handleStartScan = () => {
    setMeasureStatus('measuring');
    setScanProgress(5);
    setCountdown(25);
  };

  const handleResetScan = () => {
    setMeasureStatus('idle');
    setScanProgress(0);
    setCountdown(25);
  };

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

              {/* Dropdown con la información de soporte - Homologado al estilo de "Solicita una cita" */}
              {isSupportOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[240px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col gap-[2px]">
                  <a
                    href="mailto:biometria@everhealth.es"
                    className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold text-left transition-colors cursor-pointer group"
                  >
                    <Mail className="w-[18px] h-[18px] text-[#d50475] shrink-0" />
                    <span className="truncate">biometria@everhealth.es</span>
                  </a>

                  <a
                    href="tel:918220518"
                    className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold text-left transition-colors cursor-pointer group"
                  >
                    <Phone className="w-[18px] h-[18px] text-[#d50475] shrink-0" />
                    <span>918 220 518</span>
                  </a>
                </div>
              )}
            </div>

            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full flex justify-center px-4 pt-8 pb-16">
        <div className="w-full max-w-[800px] flex flex-col gap-6">

          {/* Top navigation row con botón atrás transparente y PASO a la izquierda exacto al stepper */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                if (stage === 2) setStage(1);
                else onBackToHome();
              }}
              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer bg-transparent -ml-2"
              title="Atrás"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Stepper text indicator alineado a la izquierda homologado a PASO X/Y */}
            <span className="text-[13px] font-bold text-black uppercase tracking-wider">
              {stage === 1 ? 'PASO 1/2' : stage === 'loading' ? 'CARGANDO' : 'PASO 2/2'}
            </span>
          </div>

          {/* ================= FASE 1: FORMULARIO BIOMETRÍA ================= */}
          {stage === 1 && (
            <div className="flex flex-col gap-8">
              {/* Encabezado exacto a la estructura del stepper */}
              <div className="flex flex-col gap-1.5">
                <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
                  Biometría
                </h1>
                <p className="text-[15px] leading-[22px] text-[#475569] font-normal">
                  Bienvenido al sistema inteligente de diagnosis por imagen. Completa tus datos para estimar tus constantes biométricas en tiempo real.
                </p>
              </div>

              {/* Formulario de datos personales */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">
                      Nombre<span className="text-[#d50475]">*</span>
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">
                      Apellidos<span className="text-[#d50475]">*</span>
                    </label>
                    <input
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      placeholder="Tus apellidos"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">
                      Email<span className="text-[#d50475]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tuemail@ejemplo.com"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-medium text-black">
                      Edad<span className="text-[#d50475]">*</span>
                    </label>
                    <input
                      type="number"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      placeholder="Tu edad"
                      className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

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

              {/* Preguntas clínicas con tarjetas cuadradas con checks radiales (estilo Bienestar emocional) */}
              <div className="flex flex-col gap-6 pt-2">
                
                {/* 1. ¿Tiene diabetes? (3 opciones en tarjetas cuadradas con check radial único) */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[15px] font-bold text-black">¿Tiene diabetes?</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'no', label: 'No' },
                      { id: 'tipo1', label: 'Tipo 1' },
                      { id: 'tipo2', label: 'Tipo 2' },
                    ].map((opt) => {
                      const isSelected = diabetes === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setDiabetes(opt.id)}
                          className={`p-4 rounded-[8px] border transition-all cursor-pointer flex items-center gap-3 select-none ${
                            isSelected
                              ? 'border-[#d50475] bg-[#fdf2f8]/40 shadow-xs'
                              : 'border-[#cbd5e1] hover:border-black bg-white'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#d50475] bg-[#d50475] text-white'
                                : 'border-[#94a3b8] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-[14px] font-bold text-black">{opt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. ¿Fuma? (2 opciones en tarjetas cuadradas) */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[15px] font-bold text-black">¿Fuma?</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'si', label: 'Sí' },
                      { id: 'no', label: 'No' },
                    ].map((opt) => {
                      const isSelected = fuma === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setFuma(opt.id)}
                          className={`p-4 rounded-[8px] border transition-all cursor-pointer flex items-center gap-3 select-none ${
                            isSelected
                              ? 'border-[#d50475] bg-[#fdf2f8]/40 shadow-xs'
                              : 'border-[#cbd5e1] hover:border-black bg-white'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#d50475] bg-[#d50475] text-white'
                                : 'border-[#94a3b8] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-[14px] font-bold text-black">{opt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. ¿Está tomando medicación para la presión arterial? (2 opciones en tarjetas cuadradas) */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[15px] font-bold text-black">
                    ¿Está tomando medicación para la presión arterial?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'si', label: 'Sí' },
                      { id: 'no', label: 'No' },
                    ].map((opt) => {
                      const isSelected = medicacionPresion === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setMedicacionPresion(opt.id)}
                          className={`p-4 rounded-[8px] border transition-all cursor-pointer flex items-center gap-3 select-none ${
                            isSelected
                              ? 'border-[#d50475] bg-[#fdf2f8]/40 shadow-xs'
                              : 'border-[#cbd5e1] hover:border-black bg-white'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#d50475] bg-[#d50475] text-white'
                                : 'border-[#94a3b8] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-[14px] font-bold text-black">{opt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Checkbox Acepto términos */}
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
              
              {/* Barra de Controles Superiores: Selector de cámara y botón Ayuda */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => {
                    handleResetScan();
                    setStage(1);
                  }}
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

              {/* ================= BARRA DE CONTROLES DEL PROTOTIPO ================= */}
              {/* Dropdowns para simular: tipo de error en la prueba + distancia de rostro + cámara real */}
              <div className="w-full bg-[#f8fafc] border border-dashed border-[#94a3b8] rounded-[10px] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                
                {/* Dropdown de Resultado / Error del prototipo */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] font-bold text-black uppercase tracking-wider">
                      Simulación de resultado (Solo prototipo)
                    </label>
                    <span className="text-[10px] text-[#64748b]">No visible en versión final</span>
                  </div>
                  <div className="relative">
                    <select
                      value={simulatedOutcome}
                      onChange={(e) => setSimulatedOutcome(e.target.value as any)}
                      className="w-full h-[38px] px-3 pr-8 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#d50475]"
                    >
                      <option value="blood_flow_error">
                        Error: La medición del flujo sanguíneo no es fiable (Simular fallo)
                      </option>
                      <option value="success">
                        Éxito: Medición completa al 100% (Simular escaneo exitoso)
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-black absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-[#64748b] leading-tight">
                    Elige si la medición debe fallar al 50% con el modal de alerta o completarse con éxito.
                  </p>
                </div>

                {/* Toggles rápidos de posición y cámara web */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      setPositionState(positionState === 'far' ? 'ready' : 'far');
                      if (measureStatus === 'measuring') handleResetScan();
                    }}
                    className={`h-[38px] px-3 rounded-[6px] border text-[12px] font-bold uppercase transition-all cursor-pointer ${
                      positionState === 'ready'
                        ? 'border-[#2563eb] bg-[#eff6ff] text-[#2563eb]'
                        : 'border-[#94a3b8] bg-white text-[#64748b]'
                    }`}
                    title="Alternar entre distancia correcta o 'Su cara está demasiado lejos'"
                  >
                    {positionState === 'ready' ? 'Distancia: Centrado' : 'Distancia: Lejos'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUseRealWebcam(!useRealWebcam)}
                    className={`h-[38px] px-3 rounded-[6px] border text-[12px] font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                      useRealWebcam
                        ? 'border-[#10b981] bg-[#ecfdf5] text-[#10b981]'
                        : 'border-[#cbd5e1] bg-white text-black'
                    }`}
                    title="Encender webcam de tu equipo para probar encuadre real"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{useRealWebcam ? 'Webcam activa' : 'Usar mi cámara'}</span>
                  </button>
                </div>
              </div>

              {/* ================= VISOR FACIAL BIOMÉTRICO ================= */}
              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden select-none">
                
                {/* Cuadrante de cámara con encuadre ovalado/circular limpio */}
                <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
                  
                  {/* Histogramas en las 4 esquinas */}
                  <div className="absolute -top-2 -left-4 flex flex-col items-start gap-1 pointer-events-none">
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-70">
                      {[15, 30, 45, 80, 60, 40, 25, 70, 95, 50, 20].map((h, i) => (
                        <div
                          key={i}
                          className={`w-[3px] transition-colors duration-300 ${
                            measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#64748b]'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className={`w-20 h-[1.5px] transform -rotate-45 origin-left transition-colors ${
                      measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#94a3b8]'
                    }`} />
                  </div>

                  <div className="absolute -top-2 -right-4 flex flex-col items-end gap-1 pointer-events-none">
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-70 justify-end">
                      {[20, 50, 75, 40, 90, 85, 30, 60, 40, 25, 10].map((h, i) => (
                        <div
                          key={i}
                          className={`w-[3px] transition-colors duration-300 ${
                            measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#64748b]'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className={`w-20 h-[1.5px] transform rotate-45 origin-right transition-colors ${
                      measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#94a3b8]'
                    }`} />
                  </div>

                  <div className="absolute -bottom-2 -left-4 flex flex-col items-start gap-1 pointer-events-none">
                    <div className={`w-20 h-[1.5px] transform rotate-45 origin-left transition-colors ${
                      measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#94a3b8]'
                    }`} />
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-70">
                      {[10, 25, 60, 90, 40, 30, 75, 85, 45, 30, 15].map((h, i) => (
                        <div
                          key={i}
                          className={`w-[3px] transition-colors duration-300 ${
                            measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#64748b]'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -right-4 flex flex-col items-end gap-1 pointer-events-none">
                    <div className={`w-20 h-[1.5px] transform -rotate-45 origin-right transition-colors ${
                      measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#94a3b8]'
                    }`} />
                    <div className="w-16 h-8 flex items-end gap-[2px] opacity-70 justify-end">
                      {[30, 60, 40, 70, 95, 80, 50, 35, 20, 45, 10].map((h, i) => (
                        <div
                          key={i}
                          className={`w-[3px] transition-colors duration-300 ${
                            measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-[#64748b]'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Círculo / Oval de encuadre */}
                  <div
                    className={`w-full h-full rounded-full border-2 p-1.5 flex items-center justify-center relative shadow-inner overflow-hidden transition-all duration-300 ${
                      measureStatus === 'measuring'
                        ? 'border-[#22c55e]'
                        : positionState === 'ready'
                        ? 'border-dashed border-[#94a3b8]'
                        : 'border-dashed border-[#ef4444]'
                    }`}
                  >
                    {/* Contenido: Webcam en vivo o fotografía del usuario */}
                    {useRealWebcam ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full rounded-full object-cover transform -scale-x-100"
                      />
                    ) : (
                      <img
                        src={
                          measureStatus === 'measuring'
                            ? scanMeasuringImg
                            : positionState === 'ready'
                            ? scanReadyImg
                            : scanFarImg
                        }
                        alt="Escaneo facial biométrico"
                        className={`w-full h-full rounded-full object-cover transition-transform duration-500 ${
                          positionState === 'far' ? 'scale-90 opacity-90' : 'scale-105'
                        }`}
                      />
                    )}

                    {/* Guías y Puntos de tracking facial dinámicos */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      {/* Puntos de referencia facial con líneas rojas o blancas según estado */}
                      <div
                        className={`absolute w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                          measureStatus === 'measuring' ? 'bg-[#ef4444] animate-ping' : 'bg-white/90'
                        } ${positionState === 'far' ? 'top-[40%] left-[48%]' : 'top-[36%] left-[49%]'}`}
                      />
                      <div
                        className={`absolute w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                          measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-white/90'
                        } ${positionState === 'far' ? 'top-[44%] left-[44%]' : 'top-[42%] left-[45%]'}`}
                      />
                      <div
                        className={`absolute w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                          measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-white/90'
                        } ${positionState === 'far' ? 'top-[64%] left-[45%]' : 'top-[66%] left-[47%]'}`}
                      />
                      <div
                        className={`absolute w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                          measureStatus === 'measuring' ? 'bg-[#ef4444]' : 'bg-white/90'
                        } ${positionState === 'far' ? 'top-[66%] right-[42%]' : 'top-[68%] right-[44%]'}`}
                      />

                      {/* Leyendas dentro del círculo según estado */}
                      {positionState === 'far' && measureStatus === 'idle' && (
                        <div className="absolute inset-0 bg-black/35 rounded-full flex flex-col items-center justify-center text-center p-4">
                          <p className="text-[16px] leading-[22px] font-bold text-white drop-shadow-md">
                            Su cara está demasiado lejos
                          </p>
                          <p className="text-[14px] leading-[20px] font-medium text-white/95 drop-shadow-md mt-0.5">
                            Acérquese más a la cámara
                          </p>
                        </div>
                      )}

                      {positionState === 'ready' && measureStatus === 'idle' && (
                        <div className="absolute inset-0 bg-black/25 rounded-full flex flex-col items-center justify-center text-center p-4">
                          <p className="text-[17px] leading-[24px] font-bold text-white drop-shadow-md">
                            No se mueva.
                          </p>
                          <p className="text-[14px] leading-[20px] font-medium text-white/95 drop-shadow-md mt-0.5">
                            Todo está listo para comenzar la medición.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Badge contador de segundos durante la medición */}
                    {measureStatus === 'measuring' && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#22c55e] text-white text-[13px] font-bold px-3 py-0.5 rounded-full shadow-md flex items-center gap-1 z-20">
                        <span>{countdown}s</span>
                      </div>
                    )}
                  </div>

                  {/* Botón azul flotante "Comenzar medición" cuando la cara está bien ubicada */}
                  {positionState === 'ready' && measureStatus === 'idle' && (
                    <div className="absolute -bottom-5 z-30">
                      <button
                        type="button"
                        onClick={handleStartScan}
                        className="h-[44px] px-6 rounded-[10px] bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium text-[15px] shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        Comenzar medición
                      </button>
                    </div>
                  )}
                </div>

                {/* ================= INDICADOR DE PROGRESO HORIZONTAL VERDE ================= */}
                {/* Solicitado por el usuario: Loading abajo, de izquierda a derecha en verde con label a la izquierda */}
                <div className="w-full max-w-[420px] mt-8 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-black uppercase tracking-wider">
                      {measureStatus === 'measuring'
                        ? 'Cargando datos biométricos'
                        : measureStatus === 'completed'
                        ? 'Escaneo completado'
                        : 'Calibración de encuadre'}
                    </span>
                    <span className="text-[13px] font-bold text-[#10b981]">
                      {measureStatus === 'measuring'
                        ? `${scanProgress}%`
                        : measureStatus === 'completed'
                        ? '100%'
                        : positionState === 'ready'
                        ? 'Listo'
                        : 'Ajustando'}
                    </span>
                  </div>

                  {/* Barra de progreso verde horizontal */}
                  <div className="w-full h-[10px] bg-[#e2e8f0] rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-[#10b981] rounded-full transition-all duration-300 ease-out"
                      style={{
                        width:
                          measureStatus === 'measuring'
                            ? `${scanProgress}%`
                            : measureStatus === 'completed'
                            ? '100%'
                            : positionState === 'ready'
                            ? '25%'
                            : '5%',
                      }}
                    />
                  </div>
                </div>

                {/* ================= INDICADOR DE PULSO CARDÍACO (CORAZONCITO) ================= */}
                {/* Explicado al usuario: Fotopletismografía / Ritmo Cardíaco en tiempo real (LPM) */}
                <div className="mt-4 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-[#f1f5f9]">
                    <div className="w-6 h-6 rounded-full bg-[#fce7f3] flex items-center justify-center text-[#d50475]">
                      <Heart
                        className={`w-4 h-4 fill-current ${
                          measureStatus === 'measuring' ? 'animate-pulse' : ''
                        }`}
                      />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-bold text-black">
                        {measureStatus === 'measuring' ? heartRate : 71}
                      </span>
                      <span className="text-[11px] font-bold text-[#64748b]">LPM</span>
                    </div>
                    <span className="text-[11px] text-[#94a3b8]">|</span>
                    <span className="text-[11px] text-[#64748b] font-medium">
                      Ritmo Cardíaco (PPG)
                    </span>
                  </div>

                  {/* Estrellas de calibración */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-[17px] ${
                          star <= (positionState === 'ready' ? 4 : 3)
                            ? 'text-[#10b981]'
                            : 'text-[#cbd5e1]'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= MODAL DE ERROR REQUERIDO POR EL USUARIO ================= */}
              {/* "La medición del flujo sanguíneo no es fiable / Intente que la luz le dé en la cara..." */}
              {measureStatus === 'error' && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
                  <div className="w-full max-w-[440px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col items-center text-center gap-6 animate-scaleUp">
                    {/* Icono de advertencia rojo exacto a la imagen del usuario */}
                    <div className="w-16 h-16 rounded-full bg-[#fef2f2] flex items-center justify-center">
                      <AlertCircle className="w-10 h-10 text-[#ef4444] stroke-[2.2]" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-[18px] sm:text-[19px] font-bold text-black leading-snug">
                        La medición del flujo sanguíneo no es fiable
                      </h3>
                      <p className="text-[14px] leading-[22px] text-black font-normal">
                        Intente que la luz le dé en la cara de manera uniforme y permanezca quieto.
                      </p>
                    </div>

                    {/* Botón azul 'OK' matching exactamente la captura */}
                    <button
                      type="button"
                      onClick={handleResetScan}
                      className="w-full sm:w-[180px] h-[46px] rounded-[10px] bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-[15px] transition-colors cursor-pointer shadow-md hover:shadow-lg"
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}

              {/* Barra de navegación inferior */}
              <NavigationFooter
                onBack={() => {
                  handleResetScan();
                  setStage(1);
                }}
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
