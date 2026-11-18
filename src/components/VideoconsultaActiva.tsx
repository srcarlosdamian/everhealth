import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  MonitorUp,
  MoreVertical,
  PhoneOff,
  Info,
  Users,
  MessageSquare,
  Settings,
  X,
  Send,
  Paperclip,
  Check,
  Sparkles,
  ChevronDown,
  Volume2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';

interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
}

interface VideoconsultaActivaProps {
  doctorName?: string;
  doctorSpecialty?: string;
  consultationReason?: string;
  userName?: string;
  onBackToHome: () => void;
  onEndCall: () => void;
}

const CAMERA_OPTIONS = ['Cámara FaceTime HD', 'Cámara externa USB', 'Cámara virtual'];

export const VideoconsultaActiva: React.FC<VideoconsultaActivaProps> = ({
  doctorName = 'Dr. Bruno Peñas',
  doctorSpecialty = 'Medicina General · Ever Health',
  consultationReason = 'Primera consulta - Test',
  userName = 'Alejandro Navarro',
  onBackToHome,
  onEndCall,
}) => {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  // Fase: 'lobby' (Sala de espera / Pre-llamada) o 'call' (En la consulta Google Meet)
  const [phase, setPhase] = useState<'lobby' | 'call'>('lobby');

  // Estados de controles de medios
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isBackgroundBlur, setIsBackgroundBlur] = useState(false);

  // Paneles laterales en llamada (Chat abierto por defecto según la solicitud)
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isConfirmEndOpen, setIsConfirmEndOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('Cámara FaceTime HD');

  // Chat en la videoconsulta
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'doctor',
      text: `Hola ${userName}, ¡disculpa la espera! Si lo deseas utiliza este chat para anotar todo lo relativo a la consulta para que nada se te olvide.`,
      time: '10:30',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Referencias para la webcam real
  const lobbyVideoRef = useRef<HTMLVideoElement>(null);
  const callVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  // Reloj en tiempo real
  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Inicializar o detener la cámara
  useEffect(() => {
    let isMounted = true;

    const startMedia = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraPermission('denied');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        setCameraPermission('granted');

        // Asignar al video activo
        if (phase === 'lobby' && lobbyVideoRef.current) {
          lobbyVideoRef.current.srcObject = stream;
        } else if (phase === 'call' && callVideoRef.current) {
          callVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn('No se pudo acceder a la cámara o permisos denegados:', err);
        if (isMounted) setCameraPermission('denied');
      }
    };

    startMedia();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Sincronizar stream cuando cambia de fase o de estado de cámara
  useEffect(() => {
    if (streamRef.current) {
      // Activar / desactivar pistas de video
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = isCameraOn;
      });
      // Activar / desactivar pistas de audio
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMicOn;
      });

      if (phase === 'lobby' && lobbyVideoRef.current) {
        lobbyVideoRef.current.srcObject = isCameraOn ? streamRef.current : null;
      } else if (phase === 'call' && callVideoRef.current) {
        callVideoRef.current.srcObject = isCameraOn ? streamRef.current : null;
      }
    }
  }, [phase, isCameraOn, isMicOn]);

  // Auto-scroll del chat
  useEffect(() => {
    if (isChatOpen) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  // Envío de mensajes en la llamada
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'patient',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Respuesta simulada del médico a los 2 segundos
    setTimeout(() => {
      const docReply: Message = {
        id: `msg-doc-${Date.now()}`,
        sender: 'doctor',
        text: 'Perfecto, acabo de anotarlo en tu informe. Continuemos con la exploración clínica.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, docReply]);
    }, 1800);
  };

  // =========================================================================
  // VISTA 1: SALA DE ESPERA / PRE-LLAMADA (LOBBY MINIMALISTA CON FONDO BLANCO)
  // =========================================================================
  if (phase === 'lobby') {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col font-[family-name:Helvetica] text-black">
        {/* Top Header con botón volver atrás, logo Ever Health e info minimalista */}
        <header className="w-full h-[60px] px-4 sm:px-8 border-b border-[#f1f5f9] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="w-9 h-9 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer -ml-1"
              title="Volver al inicio"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              className="h-[28px] w-auto object-contain cursor-pointer"
              onClick={onBackToHome}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#d50475] bg-[#fdf2f8] px-2.5 py-1 rounded-[6px]">
              SALA DE ESPERA VIRTUAL
            </span>
          </div>
        </header>

        {/* Contenedor Principal con Max Width estilo Onboarding / Cuestionario */}
        <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Vista previa de cámara 16:9 con controles flotantes estilo Google Meet */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="w-full aspect-video bg-[#1e2022] rounded-[16px] overflow-hidden relative shadow-md border border-[#e2e8f0] flex items-center justify-center">
                {isCameraOn ? (
                  <video
                    ref={lobbyVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover -scale-x-100"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-white">
                    <div className="w-20 h-20 rounded-full bg-[#3c4043] flex items-center justify-center text-[26px] font-bold">
                      {userName
                        .split(' ')
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join('') || 'AN'}
                    </div>
                    <span className="text-[14px] text-gray-300 font-medium">Cámara desactivada</span>
                  </div>
                )}

                {/* Badge flotante en la esquina superior izquierda: Micrófono */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-[20px] text-white text-[11px] font-medium">
                  {isMicOn ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Micrófono listo</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="w-3 h-3 text-[#ea4335]" />
                      <span className="text-[#ea4335]">Micrófono silenciado</span>
                    </>
                  )}
                </div>

                {/* Badge flotante en la esquina superior derecha: Nombre del usuario */}
                <div className="absolute top-3.5 right-3.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-[20px] text-white text-[12px] font-medium">
                  {userName} (Tú)
                </div>

                {/* Barra flotante inferior de controles estilo Google Meet */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                  {/* Botón Micrófono */}
                  <button
                    type="button"
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                      isMicOn
                        ? 'bg-black/60 hover:bg-black/80 text-white'
                        : 'bg-[#ea4335] hover:bg-[#d93025] text-white'
                    }`}
                    title={isMicOn ? 'Silenciar micrófono' : 'Activar micrófono'}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>

                  {/* Botón Cámara */}
                  <button
                    type="button"
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                      isCameraOn
                        ? 'bg-black/60 hover:bg-black/80 text-white'
                        : 'bg-[#ea4335] hover:bg-[#d93025] text-white'
                    }`}
                    title={isCameraOn ? 'Apagar cámara' : 'Encender cámara'}
                  >
                    {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Indicador de estado de dispositivos debajo del cuadro de video */}
              <div className="flex items-center justify-between text-[12px] text-[#64748b] px-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>Conexión cifrada de extremo a extremo · Calidad HD</span>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="flex items-center gap-1.5 text-[12px] text-[#64748b] hover:text-black transition-colors cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isSettingsOpen}
                  >
                    <span>{selectedCamera}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSettingsOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-[240px] bg-white border border-[#e2e8f0] rounded-[8px] shadow-lg py-1 z-20">
                      {CAMERA_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedCamera(opt);
                            setIsSettingsOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-black hover:bg-[#f8fafc] cursor-pointer text-left"
                        >
                          <span>{opt}</span>
                          {selectedCamera === opt && <Check className="w-4 h-4 text-[#d50475]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información de la consulta & Botón Entrar */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d50475]">
                  {doctorSpecialty}
                </span>
                <h1 className="text-[28px] sm:text-[32px] font-bold text-black tracking-tight leading-tight">
                  {consultationReason}
                </h1>
                <p className="text-[14px] text-[#64748b] mt-1 leading-relaxed">
                  Ya puedes acceder a la consulta pinchando en el siguiente botón.
                </p>
              </div>

              {/* Estado del médico en la sala */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="w-11 h-11 rounded-full bg-[#e2e8f0] text-black font-bold text-[14px] flex items-center justify-center shrink-0">
                  BP
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-black">{doctorName}</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </div>
                  <span className="text-[12px] text-[#16a34a] font-medium">
                    En la sala listo para atenderte
                  </span>
                </div>
              </div>

              {/* Botón Principal Operativo Homologado (40px, mayúsculas, negrita) */}
              <div className="flex flex-col gap-2 pt-1">
                <Button
                  variant="primary"
                  onClick={() => setPhase('call')}
                  className="w-full justify-center h-[42px] text-[13px] font-bold uppercase tracking-wide shadow-md"
                >
                  <Video className="w-4 h-4 mr-2" />
                  <span>ENTRAR A LA CONSULTA</span>
                </Button>
                <span className="text-[11px] text-center text-[#94a3b8]">
                  Al entrar compartes audio y video con el facultativo médico colegiado.
                </span>
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // VISTA 2: EN LA VIDEOCONSULTA (ESTILO GOOGLE MEET: 2 VISTAS + CHAT LATERAL)
  // =========================================================================
  return (
    <div className="h-screen w-full bg-[#202124] text-white flex flex-col font-[family-name:Helvetica] overflow-hidden select-none">
      
      {/* Área Central: Cuadrícula de video (2 vistas lado a lado) + Chat lateral derecho */}
      <div className="flex-1 flex min-h-0 relative p-3 sm:p-4 gap-3 sm:gap-4 overflow-hidden">
        
        {/* Grilla de video: 2 vistas una al lado de otra (Doctor y Paciente) */}
        <div className="flex-1 flex min-w-0 h-full items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full h-full max-h-[84vh] items-center">
            
            {/* VISTA 1: MÉDICO (Dr. Bruno Peñas) */}
            <div className="relative w-full h-full bg-[#2d3135] rounded-[16px] overflow-hidden shadow-xl border border-white/10 flex items-center justify-center group">
              {/* Imagen realista de facultativo médico en consulta */}
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor Bruno Peñas en consulta"
                className="w-full h-full object-cover object-center"
              />

              {/* Chip inferior izquierdo con el nombre del doctor */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-[8px] flex items-center gap-2 text-white text-[13px] font-medium shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{doctorName}</span>
                <span className="text-[11px] text-gray-300 hidden sm:inline">· {doctorSpecialty.split('·')[0].trim()}</span>
              </div>

              {/* Indicador de audio activo del doctor */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs p-2 rounded-full text-white">
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* VISTA 2: PACIENTE (Alejandro Navarro / Tú con cámara real) */}
            <div className="relative w-full h-full bg-[#2d3135] rounded-[16px] overflow-hidden shadow-xl border border-white/10 flex items-center justify-center">
              {isCameraOn ? (
                <video
                  ref={callVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-white">
                  <div className="w-24 h-24 rounded-full bg-[#3c4043] flex items-center justify-center text-[32px] font-bold">
                    {userName
                      .split(' ')
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join('') || 'AN'}
                  </div>
                  <span className="text-[14px] text-gray-300 font-medium">Cámara desactivada</span>
                </div>
              )}

              {/* Chip inferior izquierdo con el nombre del paciente */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-[8px] flex items-center gap-2 text-white text-[13px] font-medium shadow-md">
                <span>{userName} (Tú)</span>
              </div>

              {/* Indicador de micrófono en la esquina inferior derecha */}
              <div className="absolute bottom-3 right-3">
                {isMicOn ? (
                  <div className="bg-black/60 backdrop-blur-xs p-2 rounded-full text-white">
                    <Mic className="w-4 h-4 text-emerald-400" />
                  </div>
                ) : (
                  <div className="bg-[#ea4335] p-2 rounded-full text-white">
                    <MicOff className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Indicador si tiene la mano levantada */}
              {isHandRaised && (
                <div className="absolute top-3 left-3 bg-[#1a73e8] text-white px-3 py-1.5 rounded-[20px] flex items-center gap-1.5 text-[12px] font-bold shadow-lg animate-bounce">
                  <Hand className="w-3.5 h-3.5" />
                  <span>Mano levantada</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* =========================================================================
            PANEL LATERAL DERECHO: CHAT EN VIVO DE GOOGLE MEET
            (Abierto por defecto, abarca toda la parte derecha, activable/desactivable)
           ========================================================================= */}
        {isChatOpen && (
          <aside
            aria-label="Chat de la videoconsulta"
            className="w-[340px] sm:w-[380px] shrink-0 h-full bg-white text-black rounded-[16px] shadow-2xl flex flex-col overflow-hidden animate-slideInRight border border-[#e2e8f0]"
          >
            {/* Header del chat */}
            <div className="h-[56px] px-4 border-b border-[#f1f5f9] flex items-center justify-between shrink-0">
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-black leading-snug">
                  Mensajes de la llamada
                </span>
                <span className="text-[11px] text-[#64748b]">
                  {doctorName} y tú
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer"
                title="Cerrar chat"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Aviso informativo de registro clínico */}
            <div className="px-4 py-2.5 bg-[#f8fafc] border-b border-[#f1f5f9] text-[11px] text-[#64748b] leading-relaxed">
              Los mensajes se comparten con el facultativo y quedan registrados en tu informe de consulta.
            </div>

            {/* Lista de mensajes scrollable */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar-minimal flex flex-col gap-3.5">
              {messages.map((msg) => {
                const isDoc = msg.sender === 'doctor';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      isDoc ? 'self-start' : 'self-end items-end'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="text-[11px] font-bold text-[#64748b]">
                        {isDoc ? doctorName : 'Tú'}
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">{msg.time}</span>
                    </div>
                    <div
                      className={`p-3 rounded-[12px] text-[13px] leading-relaxed font-normal ${
                        isDoc
                          ? 'bg-[#f1f5f9] text-black rounded-tl-none'
                          : 'bg-[#d50475] text-white rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatMessagesEndRef} />
            </div>

            {/* Composer / Input inferior del chat */}
            <div className="p-3 border-t border-[#f1f5f9] flex items-center gap-2 bg-white shrink-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Envía un mensaje al doctor..."
                className="flex-1 h-[40px] px-3.5 rounded-[20px] bg-[#f8fafc] border border-[#e2e8f0] focus:border-black focus:outline-none text-[13px] text-black placeholder:text-[#94a3b8]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  inputText.trim()
                    ? 'bg-[#d50475] text-white hover:bg-[#b80364]'
                    : 'bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed'
                }`}
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}

      </div>

      {/* =========================================================================
          BARRA DE CONTROL INFERIOR (PATRÓN EXACTO GOOGLE MEET)
         ========================================================================= */}
      <footer className="h-[76px] sm:h-[80px] w-full px-4 sm:px-6 flex items-center justify-between shrink-0 bg-[#202124] border-t border-white/10 z-20">
        
        {/* Izquierda: Hora y Detalles de la reunión */}
        <div className="hidden md:flex items-center gap-3 text-white">
          <span className="text-[14px] font-medium tracking-tight">
            {currentTime || '10:30'}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-[13px] text-gray-200 font-medium truncate max-w-[200px]">
            {consultationReason}
          </span>
        </div>

        {/* Centro: Controles circulares principales de Google Meet */}
        <div className="flex items-center gap-2.5 sm:gap-3 mx-auto md:mx-0">
          
          {/* 1. Micrófono (Toggle mute) */}
          <button
            type="button"
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isMicOn
                ? 'bg-[#3c4043] hover:bg-[#474a4d] text-white'
                : 'bg-[#ea4335] hover:bg-[#d93025] text-white'
            }`}
            title={isMicOn ? 'Desactivar micrófono' : 'Activar micrófono'}
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* 2. Cámara (Toggle video) */}
          <button
            type="button"
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isCameraOn
                ? 'bg-[#3c4043] hover:bg-[#474a4d] text-white'
                : 'bg-[#ea4335] hover:bg-[#d93025] text-white'
            }`}
            title={isCameraOn ? 'Desactivar cámara' : 'Activar cámara'}
          >
            {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* 3. Levantar la mano */}
          <button
            type="button"
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isHandRaised
                ? 'bg-[#1a73e8] text-white'
                : 'bg-[#3c4043] hover:bg-[#474a4d] text-white'
            }`}
            title={isHandRaised ? 'Bajar la mano' : 'Levantar la mano'}
          >
            <Hand className="w-5 h-5" />
          </button>

          {/* 4. Compartir pantalla */}
          <button
            type="button"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isScreenSharing
                ? 'bg-[#1a73e8] text-white'
                : 'bg-[#3c4043] hover:bg-[#474a4d] text-white'
            }`}
            title="Compartir pantalla"
          >
            <MonitorUp className="w-5 h-5" />
          </button>

          {/* 5. Más opciones */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#3c4043] hover:bg-[#474a4d] text-white flex items-center justify-center transition-colors cursor-pointer hidden sm:flex"
            title="Más opciones de llamada"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* 6. Botón Colgar / Finalizar llamada (Píldora roja Meet) */}
          <button
            type="button"
            onClick={() => setIsConfirmEndOpen(true)}
            className="w-14 sm:w-16 h-11 sm:h-12 rounded-[24px] bg-[#ea4335] hover:bg-[#d93025] text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
            title="Salir de la videoconsulta"
          >
            <PhoneOff className="w-5 h-5" />
          </button>

        </div>

        {/* Derecha: Botones de información, participantes y chat (activar/desactivar chat) */}
        <div className="flex items-center gap-2">
          
          {/* Información */}
          <button
            type="button"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isInfoOpen
                ? 'bg-white text-[#202124]'
                : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Detalles de la consulta"
          >
            <Info className="w-5 h-5" />
          </button>

          {/* Participantes */}
          <button
            type="button"
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
            title="Participantes (2)"
          >
            <div className="relative">
              <Users className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-[#d50475] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                2
              </span>
            </div>
          </button>

          {/* Chat (Toggle de panel lateral como Google Meet) */}
          <button
            type="button"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer relative ${
              isChatOpen
                ? 'bg-white text-[#202124]'
                : 'text-gray-300 hover:bg-white/10'
            }`}
            title={isChatOpen ? 'Cerrar chat de la llamada' : 'Abrir chat de la llamada'}
          >
            <MessageSquare className="w-5 h-5" />
            {!isChatOpen && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d50475]" />
            )}
          </button>

        </div>

      </footer>

      {/* Modal de confirmación para finalizar llamada */}
      {isConfirmEndOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-end-call-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-[family-name:Helvetica]"
          onClick={() => setIsConfirmEndOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[14px] p-6 sm:p-7 max-w-[480px] w-full text-black shadow-2xl flex flex-col gap-4 animate-scaleUp border border-[#e2e8f0]"
          >
            {/* Header con icono neutral, título y botón X alineado */}
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] flex items-center justify-center shrink-0">
                  <PhoneOff className="w-5 h-5 text-[#64748b]" />
                </div>
                <h3
                  id="confirm-end-call-title"
                  className="text-[18px] sm:text-[19px] font-bold text-black tracking-tight leading-snug"
                >
                  ¿Deseas finalizar la videoconsulta?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmEndOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0 -mr-1"
                title="Cerrar modal"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Descripción en color negro homologado */}
            <div className="flex flex-col gap-2 pt-1 text-[14px] leading-[22px] text-black font-normal">
              <p>
                Atención con <strong className="font-bold text-black">{doctorName}</strong>.
              </p>
              <p>
                La sesión con el facultativo concluirá. Tu informe médico y las recetas emitidas quedarán guardadas en tu Historia Clínica.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f5f9]">
              <Button
                variant="outline"
                onClick={() => setIsConfirmEndOpen(false)}
                className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
              >
                SEGUIR EN LA LLAMADA
              </Button>
              <Button
                variant="destructive"
                onClick={onEndCall}
                className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-xs"
              >
                FINALIZAR CONSULTA
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles de la consulta */}
      {isInfoOpen && (
        <div className="fixed bottom-[90px] right-4 w-[320px] bg-white text-black rounded-[12px] shadow-2xl p-4 border border-[#e2e8f0] z-40 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
            <span className="text-[13px] font-bold text-black">Detalles de la videoconsulta</span>
            <button
              type="button"
              onClick={() => setIsInfoOpen(false)}
              className="p-1 rounded-full hover:bg-[#f1f5f9] text-[#64748b]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-3 flex flex-col gap-2 text-[12px]">
            <div>
              <span className="text-[#64748b]">Especialidad:</span>
              <p className="font-bold text-black">{doctorSpecialty}</p>
            </div>
            <div>
              <span className="text-[#64748b]">Facultativo:</span>
              <p className="font-bold text-black">{doctorName}</p>
            </div>
            <div>
              <span className="text-[#64748b]">Motivo:</span>
              <p className="font-bold text-black">{consultationReason}</p>
            </div>
            <div>
              <span className="text-[#64748b]">Seguridad:</span>
              <p className="font-bold text-emerald-600">Cifrado de grado médico RGPD</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
