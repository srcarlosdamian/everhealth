import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
  ChevronDown,
  Plus,
} from 'lucide-react';

interface EVR100HomeProps {
  userName: string;
  onStartQuestionnaire: () => void;
  onOpenVideoModal: () => void;
  onOpenChat: () => void;
}

interface Consultation {
  id: string;
  timeStr: string;
  timeSub: string;
  title: string;
  details: string;
  actionText: string;
  isActive: boolean;
}

const CONSULTATIONS: Consultation[] = [
  {
    id: '1',
    timeStr: 'Hoy · 16:00',
    timeSub: 'En 10 min',
    title: 'Video consulta · En espera',
    details: 'Dr. Pérez · Paciente · Medicina general',
    actionText: 'ENTRAR A LA SALA',
    isActive: true,
  },
  {
    id: '2',
    timeStr: 'Mañana · 11:30',
    timeSub: 'Confirmada',
    title: 'Consulta dermatológica · Confirmada',
    details: 'Dra. Carmen Morales · Dermatología',
    actionText: 'ENLACE ACTIVO 15 MIN ANTES',
    isActive: false,
  },
  {
    id: '3',
    timeStr: 'Jue 17 · 18:00',
    timeSub: 'Programada',
    title: 'Consulta nutricional · Confirmada',
    details: 'Dra. Carmen Morales · Nutrición',
    actionText: 'ENLACE ACTIVO 15 MIN ANTES',
    isActive: false,
  },
  {
    id: '4',
    timeStr: 'Lun 21 · 10:00',
    timeSub: 'Programada',
    title: 'Consulta psicológica · Confirmada',
    details: 'Lic. Roberto Silva · Psicología',
    actionText: 'ENLACE ACTIVO 15 MIN ANTES',
    isActive: false,
  },
  {
    id: '5',
    timeStr: 'Mié 23 · 12:30',
    timeSub: 'Programada',
    title: 'Revisión médica · Confirmada',
    details: 'Dr. Alejandro Fuentes · Medicina interna',
    actionText: 'ENLACE ACTIVO 15 MIN ANTES',
    isActive: false,
  },
];

export const EVR100Home: React.FC<EVR100HomeProps> = ({
  userName,
  onStartQuestionnaire,
  onOpenVideoModal,
  onOpenChat,
}) => {
  const [isConsultasOpen, setIsConsultasOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [solicitaDropdownOpen, setSolicitaDropdownOpen] = useState(false);
  const solicitaDropdownRef = useRef<HTMLDivElement>(null);

  const doctorAvatar1 = `${import.meta.env.BASE_URL}assets/doctor-avatar-1.png`;
  const doctorAvatar2 = `${import.meta.env.BASE_URL}assets/doctor-avatar-2.png`;
  const doctorAvatar3 = `${import.meta.env.BASE_URL}assets/doctor-avatar-3.png`;
  const displayName = userName.trim() || 'Carlos Damián';
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solicitaDropdownRef.current && !solicitaDropdownRef.current.contains(event.target as Node)) {
        setSolicitaDropdownOpen(false);
      }
    };
    if (solicitaDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solicitaDropdownOpen]);

  // Show only 1 initially, or all 5 (max 5) when "Cargar más" is clicked
  const visibleConsultations = showAll ? CONSULTATIONS.slice(0, 5) : CONSULTATIONS.slice(0, 1);

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-[24px]">
      {/* Title: Bienvenido Carlos Damián (Helvetica Bold 32px) */}
      <h1 className="text-[32px] sm:text-[36px] leading-[40px] font-bold text-black tracking-tight">
        Bienvenido {displayName}
      </h1>

      {/* Card 1: Empieza por tu historia médica */}
      <section className="w-full bg-[#f8fafc] rounded-[8px] p-6 sm:p-[28px] border border-[#f1f5f9] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[6px] max-w-[420px]">
          <h2 className="text-[20px] leading-[26px] font-bold text-black">
            Empieza por tu historia médica
          </h2>
          <p className="text-[14px] leading-[20px] text-[#475569]">
            Completa tu cuestionario médico para que conozcamos tu historia médica
          </p>
        </div>

        <div className="w-full md:w-[380px] flex flex-col gap-[12px]">
          <div className="flex items-center justify-between text-[14px] leading-[20px]">
            <span className="text-black font-normal">Completar cuestionario médico</span>
          </div>

          {/* Progress Bar (10% pink, 90% gray) */}
          <div className="w-full h-[6px] bg-[#e2e8f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#d50475] rounded-full w-[10%]" />
          </div>

          <button
            type="button"
            onClick={onStartQuestionnaire}
            className="w-full h-[40px] mt-[4px] rounded-[8px] border border-[#cbd5e1] bg-transparent hover:bg-black/5 text-[#0f172a] text-[13px] leading-[20px] font-bold tracking-wide flex items-center justify-center gap-[8px] transition-colors cursor-pointer"
          >
            <span>COMPLETA TU PERFIL MÉDICO</span>
            <ChevronRight className="w-[16px] h-[16px]" />
          </button>
        </div>
      </section>

      {/* Card 2: Atención inmediata */}
      <section className="w-full bg-white rounded-[8px] p-4 sm:p-[24px] border border-[#e2e8f0] flex flex-col gap-[16px]">
        {/* Title and subtitle */}
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-[20px] leading-[28px] font-bold text-black">
            Atención inmediata
          </h2>
          <p className="text-[14px] leading-[20px] text-[#64748b]">
            Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
          </p>
        </div>

        <div className="w-full border-t border-[#e2e8f0]" />

        {/* Bottom row: Doctors available + Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Doctors available info */}
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center shrink-0">
              <img
                src={doctorAvatar1}
                alt="Doctor 1"
                className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-10 shrink-0 border-2 border-white"
              />
              <img
                src={doctorAvatar2}
                alt="Doctor 2"
                className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-20 shrink-0 border-2 border-white"
              />
              <img
                src={doctorAvatar3}
                alt="Doctor 3"
                className="w-[40px] h-[40px] rounded-full object-cover relative z-30 shrink-0 border-2 border-white"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[12px] leading-[16px] font-bold text-black">
                Hay médicos disponibles
              </p>
              <p className="text-[12px] leading-[16px] font-normal text-black">
                Tiempo de espera estimado 12 min
              </p>
            </div>
          </div>

          {/* Action CTA Dropdown: Solicita una cita en color CTA */}
          <div className="relative shrink-0" ref={solicitaDropdownRef}>
            <button
              type="button"
              onClick={() => setSolicitaDropdownOpen(!solicitaDropdownOpen)}
              className="h-[40px] px-[16px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-[18px] h-[18px]" />
              <span>Solicita una cita</span>
              <ChevronDown
                className={`w-[16px] h-[16px] transition-transform duration-200 ${
                  solicitaDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {solicitaDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[220px] bg-white rounded-[10px] border border-[#cbd5e1] shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-[6px] flex flex-col gap-[2px]">
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenVideoModal();
                  }}
                  className="w-full h-[38px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold text-left transition-colors cursor-pointer"
                >
                  <Video className="w-[16px] h-[16px] text-[#d50475]" />
                  <span>Videoconsulta</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenChat();
                  }}
                  className="w-full h-[38px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold text-left transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-[16px] h-[16px] text-[#d50475]" />
                  <span>Chat Médico</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Card 3: Escaneo biométrico (Título arriba, descripción de una línea abajo, sin icono a la izquierda; icono nativo lucide/scan-face en el botón) */}
      <section className="w-full bg-white rounded-[8px] p-5 sm:p-[24px] border border-[#e2e8f0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] min-w-0 flex-1">
          <h2 className="text-[20px] leading-[28px] font-bold text-black tracking-tight">
            Escaneo biométrico
          </h2>
          <p className="text-[14px] leading-[22px] text-[#475569]">
            Mide tus signos vitales y pulso en segundos usando la cámara para complementar tu expediente.
          </p>
        </div>

        <button
          type="button"
          className="h-[38px] px-[14px] rounded-[8px] border border-[#cbd5e1] hover:border-[#d50475] bg-white hover:bg-[#fdf2f8] text-[#d50475] text-[14px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer shrink-0"
        >
          <ScanFace className="w-[20px] h-[20px] text-[#d50475] stroke-[2]" />
          <span className="whitespace-nowrap">INICIAR ESCANEO</span>
        </button>
      </section>

      {/* Card 4: Próximas consultas (Cerrado por defecto, abre al hacer clic en el chevrón derecho) */}
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col transition-all">
        {/* Header con título y chevrón interactivo a la derecha */}
        <div
          onClick={() => setIsConsultasOpen(!isConsultasOpen)}
          className={`w-full flex items-center justify-between cursor-pointer select-none transition-colors group ${
            isConsultasOpen ? 'pb-[14px] border-b border-[#e2e8f0]' : ''
          }`}
          title={isConsultasOpen ? 'Contraer próximas consultas' : 'Desplegar próximas consultas'}
        >
          <h2 className="text-[22px] leading-[30px] font-bold text-black group-hover:text-[#d50475] transition-colors">
            Próximas consultas
          </h2>
          <button
            type="button"
            className="p-1 text-black group-hover:text-[#d50475] transition-colors cursor-pointer"
            aria-label={isConsultasOpen ? 'Contraer consultas' : 'Desplegar todas las consultas'}
          >
            <ChevronDown
              className={`w-[22px] h-[22px] transition-transform duration-200 ${
                isConsultasOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Contenido desplegable: se muestra todo al abrir */}
        {isConsultasOpen && (
          <>
            {/* Consultations List (Muestra todo) */}
            <div className="flex flex-col divide-y divide-[#f1f5f9]">
              {visibleConsultations.map((item) => (
                <div
                  key={item.id}
                  className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex flex-col sm:w-[140px] shrink-0">
                    <span className="text-[15px] leading-[22px] font-bold text-black">
                      {item.timeStr}
                    </span>
                    <span className="text-[13px] leading-[18px] text-[#64748b]">
                      {item.timeSub}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1">
                    <span className="text-[15px] leading-[22px] font-bold text-black">
                      {item.title}
                    </span>
                    <span className="text-[13px] leading-[18px] text-[#64748b]">
                      {item.details}
                    </span>
                  </div>

                  {item.isActive ? (
                    <button
                      type="button"
                      onClick={onOpenVideoModal}
                      className="h-[36px] px-[16px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] text-[13px] font-bold text-black tracking-wide transition-colors cursor-pointer shrink-0"
                    >
                      {item.actionText}
                    </button>
                  ) : (
                    <span className="h-[36px] px-[14px] rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] text-[12px] font-medium text-[#94a3b8] tracking-wide inline-flex items-center justify-center shrink-0">
                      {item.actionText}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Footer: Event Counter + "Cargar más / Mostrar menos" plain text */}
            <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9]">
              <span className="text-[13px] font-bold text-[#475569]">
                {visibleConsultations.length} de {CONSULTATIONS.length} eventos
              </span>

              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="text-[13px] leading-[20px] font-bold text-black hover:underline cursor-pointer transition-colors"
              >
                {showAll ? 'Mostrar menos' : 'Cargar más'}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
