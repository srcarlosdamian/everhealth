import React, { useState } from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
  ChevronDown,
  ChevronUp,
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
  const [showAll, setShowAll] = useState(false);

  const doctorsAvatarsSrc = `${import.meta.env.BASE_URL}assets/doctors-avatars.png`;
  const displayName = userName.trim() || 'Carlos Damián';
  
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
            <span className="px-[8px] py-[2px] rounded-[6px] border border-[#cbd5e1] text-[12px] font-bold text-black">
              10%
            </span>
          </div>

          {/* Progress Bar (10% pink, 90% gray) */}
          <div className="w-full h-[6px] bg-[#e2e8f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#d50475] rounded-full w-[10%]" />
          </div>

          <button
            type="button"
            onClick={onStartQuestionnaire}
            className="w-full h-[40px] mt-[4px] rounded-[8px] border border-[#cbd5e1] bg-white hover:bg-[#f1f5f9] text-[#0f172a] text-[13px] leading-[20px] font-bold tracking-wide flex items-center justify-center gap-[8px] transition-colors cursor-pointer"
          >
            <span>COMPLETA TU PERFIL MÉDICO</span>
            <ChevronRight className="w-[16px] h-[16px]" />
          </button>
        </div>
      </section>

      {/* Card 2: Atención inmediata */}
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[24px] border border-[#e2e8f0] flex flex-col gap-[16px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <h2 className="text-[20px] leading-[26px] font-bold text-black">
            Atención inmediata
          </h2>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-[12px]">
            <button
              type="button"
              onClick={onOpenVideoModal}
              className="h-[38px] px-[16px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer shadow-xs"
            >
              <Video className="w-[16px] h-[16px]" />
              <span>VIDEO CONSULTA</span>
            </button>
            <button
              type="button"
              onClick={onOpenChat}
              className="h-[38px] px-[16px] rounded-[6px] border border-[#d50475] bg-white hover:bg-[#fdf2f8] text-[#d50475] text-[13px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer"
            >
              <MessageSquare className="w-[16px] h-[16px]" />
              <span>CHAT MÉDICO</span>
            </button>
          </div>
        </div>

        {/* Doctors available info row */}
        <div className="pt-[14px] border-t border-[#f1f5f9] flex items-center gap-[14px]">
          <img
            src={doctorsAvatarsSrc}
            alt="Médicos disponibles"
            className="w-[120px] h-[36px] object-contain shrink-0"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-[14px] leading-[20px] font-bold text-black">
              Hay médicos disponibles
            </span>
            <span className="hidden sm:inline text-[#cbd5e1]">·</span>
            <span className="text-[13px] leading-[18px] text-[#64748b]">
              Tiempo de espera estimado 12 min
            </span>
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

      {/* Card 4: Próximas consultas (Carga más los restantes hasta máximo 5) */}
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col">
        <h2 className="text-[22px] leading-[30px] font-bold text-black pb-[14px] border-b border-[#e2e8f0]">
          Próximas consultas
        </h2>

        {/* Consultations List (1 initial, up to 5 on "Cargar más") */}
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

        {/* Footer: Event Counter + "Cargar más" Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9]">
          <span className="text-[13px] font-bold text-[#475569]">
            {visibleConsultations.length} de {CONSULTATIONS.length} eventos
          </span>

          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="h-[32px] px-3.5 rounded-[6px] border border-[#cbd5e1] hover:border-black bg-white hover:bg-[#f8fafc] text-black text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            {showAll ? (
              <>
                <span>Mostrar menos</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Cargar más</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
