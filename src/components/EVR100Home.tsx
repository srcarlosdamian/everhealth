import React from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
} from 'lucide-react';

interface EVR100HomeProps {
  userName: string;
  onStartQuestionnaire: () => void;
  onOpenVideoModal: () => void;
  onOpenChat: () => void;
}

export const EVR100Home: React.FC<EVR100HomeProps> = ({
  userName,
  onStartQuestionnaire,
  onOpenVideoModal,
  onOpenChat,
}) => {
  const doctorsAvatarsSrc = `${import.meta.env.BASE_URL}assets/doctors-avatars.png`;
  const displayName = userName.trim() || 'Carlos Damián';

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
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-[20px] leading-[26px] font-bold text-black">
            Atención inmediata
          </h2>
          <p className="text-[14px] leading-[20px] text-[#64748b]">
            Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
          </p>
        </div>

        <div className="pt-[16px] border-t border-[#f1f5f9] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Doctors available info */}
          <div className="flex items-center gap-[14px]">
            <img
              src={doctorsAvatarsSrc}
              alt="Médicos disponibles"
              className="w-[120px] h-[36px] object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[14px] leading-[20px] font-bold text-black">
                Hay médicos disponibles
              </span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">
                Tiempo de espera estimado 12 min
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-[12px]">
            <button
              type="button"
              onClick={onOpenVideoModal}
              className="h-[38px] px-[16px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer"
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
      </section>

      {/* Card 3: Escaneo biométrico */}
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] max-w-[560px]">
          <h2 className="text-[20px] leading-[26px] font-bold text-black">
            Escaneo biométrico
          </h2>
          <p className="text-[14px] leading-[20px] text-[#475569]">
            Mide tus signos vitales y pulso en segundos usando la cámara para complementar tu expediente.
          </p>
        </div>

        <button
          type="button"
          className="h-[38px] px-[16px] rounded-[6px] border border-[#cbd5e1] hover:border-[#d50475] bg-white hover:bg-[#fdf2f8] text-[#d50475] text-[13px] leading-[20px] font-bold flex items-center gap-[8px] transition-colors cursor-pointer shrink-0"
        >
          <ScanFace className="w-[18px] h-[18px]" />
          <span>INICIAR ESCANEO</span>
        </button>
      </section>

      {/* Card 4: Próximas consultas */}
      <section className="w-full bg-white rounded-[8px] p-6 sm:p-[28px] border border-[#e2e8f0] flex flex-col">
        <h2 className="text-[24px] leading-[32px] font-bold text-black pb-[16px] border-b border-[#e2e8f0]">
          Próximas consultas
        </h2>

        <div className="flex flex-col divide-y divide-[#f1f5f9]">
          {/* Row 1 */}
          <div className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:w-[140px] shrink-0">
              <span className="text-[15px] leading-[22px] font-bold text-black">Hoy · 16:00</span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">En 10 min</span>
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-[15px] leading-[22px] font-bold text-black">
                Video consulta · En espera
              </span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">
                Dr. Pérez · Paciente · Medicina general
              </span>
            </div>

            <button
              type="button"
              className="h-[36px] px-[16px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] text-[13px] font-bold text-black tracking-wide transition-colors cursor-pointer shrink-0"
            >
              ENTRAR A LA SALA
            </button>
          </div>

          {/* Row 2 */}
          <div className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:w-[140px] shrink-0">
              <span className="text-[15px] leading-[22px] font-bold text-black">Mañana · 11:30</span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">Confirmada</span>
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-[15px] leading-[22px] font-bold text-black">
                Consulta dermatológica · Confirmada
              </span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">
                Dra. Carmen Morales · Dermatología
              </span>
            </div>

            <span className="h-[36px] px-[14px] rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] text-[12px] font-medium text-[#94a3b8] tracking-wide inline-flex items-center justify-center shrink-0">
              ENLACE ACTIVO 15 MIN ANTES
            </span>
          </div>

          {/* Row 3 */}
          <div className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:w-[140px] shrink-0">
              <span className="text-[15px] leading-[22px] font-bold text-black">Jue 17 · 18:00</span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">Programada</span>
            </div>

            <div className="flex flex-col flex-1">
              <span className="text-[15px] leading-[22px] font-bold text-black">
                Consulta dermatológica · Confirmada
              </span>
              <span className="text-[13px] leading-[18px] text-[#64748b]">
                Dra. Carmen Morales · Nutrición
              </span>
            </div>

            <span className="h-[36px] px-[14px] rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] text-[12px] font-medium text-[#94a3b8] tracking-wide inline-flex items-center justify-center shrink-0">
              ENLACE ACTIVO 15 MIN ANTES
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
