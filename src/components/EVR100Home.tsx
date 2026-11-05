import React, { useState } from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
} from 'lucide-react';
import { PaginationEvents } from '../design-system/molecules/PaginationEvents';

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
];

export const EVR100Home: React.FC<EVR100HomeProps> = ({
  userName,
  onStartQuestionnaire,
  onOpenVideoModal,
  onOpenChat,
}) => {
  const [consultationIndex, setConsultationIndex] = useState(0);

  const doctorsAvatarsSrc = `${import.meta.env.BASE_URL}assets/doctors-avatars.png`;
  const displayName = userName.trim() || 'Carlos Damián';
  const currentConsultation = CONSULTATIONS[consultationIndex];

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

      {/* Card 2: Atención inmediata (Cleaned up, removed saturated text per request) */}
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

      {/* Card 3: Escaneo biométrico (En una sola línea, sin cortes) */}
      <section className="w-full bg-white rounded-[8px] px-6 py-4 sm:py-[18px] border border-[#e2e8f0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <ScanFace className="w-[20px] h-[20px] text-[#d50475] shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
            <h2 className="text-[16px] leading-[22px] font-bold text-black shrink-0">
              Escaneo biométrico:
            </h2>
            <p className="text-[13px] leading-[20px] text-[#475569] truncate">
              Mide tus signos vitales y pulso en segundos usando la cámara.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="h-[36px] px-[16px] rounded-[6px] border border-[#cbd5e1] hover:border-[#d50475] bg-white hover:bg-[#fdf2f8] text-[#d50475] text-[13px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer shrink-0"
        >
          <ScanFace className="w-[16px] h-[16px]" />
          <span>INICIAR ESCANEO</span>
        </button>
      </section>

      {/* Card 4: Próximas consultas (Solo muestra la primera, con paginación lineal 1 de 3) */}
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col">
        <h2 className="text-[22px] leading-[30px] font-bold text-black pb-[14px] border-b border-[#e2e8f0]">
          Próximas consultas
        </h2>

        {/* Active Consultation Item */}
        <div className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:w-[140px] shrink-0">
            <span className="text-[15px] leading-[22px] font-bold text-black">
              {currentConsultation.timeStr}
            </span>
            <span className="text-[13px] leading-[18px] text-[#64748b]">
              {currentConsultation.timeSub}
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-[15px] leading-[22px] font-bold text-black">
              {currentConsultation.title}
            </span>
            <span className="text-[13px] leading-[18px] text-[#64748b]">
              {currentConsultation.details}
            </span>
          </div>

          {currentConsultation.isActive ? (
            <button
              type="button"
              onClick={onOpenVideoModal}
              className="h-[36px] px-[16px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] text-[13px] font-bold text-black tracking-wide transition-colors cursor-pointer shrink-0"
            >
              {currentConsultation.actionText}
            </button>
          ) : (
            <span className="h-[36px] px-[14px] rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] text-[12px] font-medium text-[#94a3b8] tracking-wide inline-flex items-center justify-center shrink-0">
              {currentConsultation.actionText}
            </span>
          )}
        </div>

        {/* Pagination: 1 de 3 eventos & linear Siguiente buttons */}
        <PaginationEvents
          currentIndex={consultationIndex}
          total={CONSULTATIONS.length}
          onNext={() => setConsultationIndex((prev) => Math.min(CONSULTATIONS.length - 1, prev + 1))}
          onPrev={() => setConsultationIndex((prev) => Math.max(0, prev - 1))}
        />
      </section>
    </div>
  );
};
