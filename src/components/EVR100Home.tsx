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
  onStartBiometria?: () => void;
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
    actionText: 'ACTIVO 15 MINUTOS ANTES',
    isActive: false,
  },
  {
    id: '3',
    timeStr: 'Jue 17 · 18:00',
    timeSub: 'Programada',
    title: 'Consulta nutricional · Confirmada',
    details: 'Dra. Carmen Morales · Nutrición',
    actionText: 'ACTIVO 15 MINUTOS ANTES',
    isActive: false,
  },
  {
    id: '4',
    timeStr: 'Lun 21 · 10:00',
    timeSub: 'Programada',
    title: 'Consulta psicológica · Confirmada',
    details: 'Lic. Roberto Silva · Psicología',
    actionText: 'ACTIVO 15 MINUTOS ANTES',
    isActive: false,
  },
  {
    id: '5',
    timeStr: 'Mié 23 · 12:30',
    timeSub: 'Programada',
    title: 'Revisión médica · Confirmada',
    details: 'Dr. Alejandro Fuentes · Medicina interna',
    actionText: 'ACTIVO 15 MINUTOS ANTES',
    isActive: false,
  },
];

export const EVR100Home: React.FC<EVR100HomeProps> = ({
  userName,
  onStartQuestionnaire,
  onStartBiometria,
  onOpenVideoModal,
  onOpenChat,
}) => {
  const [isConsultasOpen, setIsConsultasOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
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

      {/* Card 1: Empieza tu historial médica (Sin borde redondeado ni línea exterior) */}
      <section className="w-full bg-[#f8fafc] p-6 sm:p-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[8px] flex-1 min-w-0">
          <h2 className="text-[20px] leading-[28px] font-bold text-black">
            Empieza tu historial médica
          </h2>
          <p className="text-[16px] leading-[24px] text-black font-normal truncate">
            Completa el formulario para conocer tu historial.
          </p>

          <div className="flex flex-col gap-[6px] mt-2 max-w-[340px]">
            {/* Progress Bar (10% pink, 90% gray) */}
            <div className="w-full h-[6px] bg-[#e2e8f0] rounded-full overflow-hidden">
              <div className="h-full bg-[#d50475] rounded-full w-[10%]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[10px] shrink-0 self-center md:self-auto">
          {/* Único botón: Completa tu perfil médico */}
          <button
            type="button"
            onClick={onStartQuestionnaire}
            className="w-full px-[14px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-transparent text-black text-[14px] leading-[20px] font-bold uppercase flex items-center justify-center gap-[8px] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>COMPLETA TU PERFIL MÉDICO</span>
            <ChevronRight className="w-[18px] h-[18px] text-black shrink-0" />
          </button>
        </div>
      </section>

      {/* Card 2: Atención inmediata (Sin borde redondeado) */}
      <section className="w-full bg-white p-4 sm:p-[24px] border border-[#e2e8f0] flex flex-col gap-[16px]">
        {/* Title and subtitle */}
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-[20px] leading-[28px] font-bold text-black">
            Atención inmediata
          </h2>
          <p className="text-[16px] leading-[24px] text-black font-normal truncate">
            Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
          </p>
        </div>

        <div className="w-full border-t border-[#e2e8f0]" />

        {/* Bottom row: Doctors available + Action CTA Dropdown Button */}
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

          {/* Action CTA Dropdown: SOLICITA UNA CITA en mayúsculas, solo icono plus a la izquierda, dropdown sin borde */}
          <div className="relative shrink-0" ref={solicitaDropdownRef}>
            <button
              type="button"
              onClick={() => setSolicitaDropdownOpen(!solicitaDropdownOpen)}
              className="px-[12px] py-[4px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] leading-[20px] font-bold uppercase flex items-center gap-[8px] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-[20px] h-[20px] text-white shrink-0" />
              <span>SOLICITA UNA CITA</span>
            </button>

            {/* Dropdown Menu sin borde gris, solo sombra */}
            {solicitaDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[200px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] flex flex-col gap-[2px]">
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenVideoModal();
                  }}
                  className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold uppercase text-left transition-colors cursor-pointer"
                >
                  <Video className="w-[20px] h-[20px] text-[#d50475] shrink-0" />
                  <span>VIDEOCONSULTA</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenChat();
                  }}
                  className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold uppercase text-left transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-[20px] h-[20px] text-[#d50475] shrink-0" />
                  <span>CHAT MÉDICO</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Card 3: Escaneo biométrico (Sin borde redondeado, botón px-[12px] py-[4px] en mayúsculas) */}
      <section className="w-full bg-white p-4 sm:p-[24px] border border-[#e2e8f0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] min-w-0 flex-1">
          <h2 className="text-[20px] leading-[28px] font-bold text-black tracking-tight">
            Escaneo biométrico
          </h2>
          <p className="text-[16px] leading-[24px] text-black font-normal truncate">
            Mide tus signos vitales y pulso en segundos usando la cámara.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onStartBiometria) onStartBiometria();
          }}
          className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#d50475] bg-transparent text-[#d50475] text-[14px] leading-[20px] font-bold uppercase flex items-center gap-[8px] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          <ScanFace className="w-[20px] h-[20px] text-[#d50475] shrink-0" />
          <span>INICIAR ESCANEO</span>
        </button>
      </section>

      {/* Card 4: Próximas consultas (Siempre visible 1 elemento, Cargar más para ver el resto) */}
      <section className="w-full bg-white p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col transition-all">
        {/* Header con título */}
        <div className="w-full flex items-center justify-between pb-[14px] border-b border-[#e2e8f0]">
          <h2 className="text-[20px] leading-[28px] font-bold text-black">
            Próximas consultas
          </h2>
        </div>

        {/* Consultations List */}
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
                  className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-white text-black text-[14px] leading-[20px] font-bold uppercase transition-colors cursor-pointer shrink-0"
                >
                  {item.actionText}
                </button>
              ) : (
                <span className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[14px] leading-[20px] font-bold uppercase inline-flex items-center justify-center shrink-0">
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
      </section>
    </div>
  );
};
