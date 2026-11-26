import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
  Plus,
} from 'lucide-react';

interface V2HomeProps {
  userName: string;
  onStartQuestionnaire?: () => void;
  onStartBiometria?: () => void;
  onOpenVideoModal: () => void;
  onOpenChatModal: () => void;
}

const CONSULTATIONS = [
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
    actionText: 'NO DISPONIBLE',
    isActive: false,
  },
  {
    id: '3',
    timeStr: 'Jue 17 · 18:00',
    timeSub: 'Programada',
    title: 'Consulta nutricional · Confirmada',
    details: 'Dra. Carmen Morales · Nutrición',
    actionText: 'NO DISPONIBLE',
    isActive: false,
  },
  {
    id: '4',
    timeStr: 'Lun 21 · 10:00',
    timeSub: 'Programada',
    title: 'Consulta psicológica · Confirmada',
    details: 'Lic. Roberto Silva · Psicología',
    actionText: 'NO DISPONIBLE',
    isActive: false,
  },
  {
    id: '5',
    timeStr: 'Mié 23 · 12:30',
    timeSub: 'Programada',
    title: 'Revisión médica · Confirmada',
    details: 'Dr. Alejandro Fuentes · Medicina interna',
    actionText: 'NO DISPONIBLE',
    isActive: false,
  },
];

export const V2Home: React.FC<V2HomeProps> = ({
  userName,
  onStartQuestionnaire,
  onStartBiometria,
  onOpenVideoModal,
  onOpenChatModal,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [solicitaDropdownOpen, setSolicitaDropdownOpen] = useState(false);
  const solicitaDropdownRef = useRef<HTMLDivElement>(null);

  const displayName = userName.trim() || 'Alejandro Navarro';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solicitaDropdownRef.current && !solicitaDropdownRef.current.contains(event.target as Node)) {
        setSolicitaDropdownOpen(false);
      }
    };
    if (solicitaDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [solicitaDropdownOpen]);

  const visibleConsultations = showAll ? CONSULTATIONS.slice(0, 5) : CONSULTATIONS.slice(0, 1);

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-[20px]">
      {/* Title: misma arquitectura V1 */}
      <h1 className="text-[32px] sm:text-[38px] leading-[1.15] font-extrabold text-[#0b1c34] tracking-tight">
        Bienvenido{' '}
        <span className="v2-serif italic font-normal text-[#d50475]">{displayName}</span>
      </h1>

      {/* Card 1: Empieza tu historial médico (sin bordes, fondo claro con acento sutil) */}
      <section className="w-full v2-gradient-soft rounded-[14px] p-6 sm:p-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
          <h2 className="text-[20px] leading-[26px] font-extrabold text-[#0b1c34]">
            Empieza tu historial médico
          </h2>
          <p className="text-[15px] leading-[22px] text-[#475569] font-normal">
            Completa el formulario para conocer tu historial.
          </p>

          <div className="flex flex-col mt-[8px] max-w-[340px]">
            <div className="w-full h-[7px] bg-white rounded-full overflow-hidden">
              <div className="h-full v2-gradient-bar rounded-full w-[15%]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[10px] shrink-0 self-center md:self-auto w-full md:w-auto">
          <button
            type="button"
            onClick={onStartQuestionnaire}
            className="w-full md:w-auto h-[46px] px-5 rounded-[10px] bg-white hover:bg-[#0b1c34] hover:text-white text-[#0b1c34] text-[13px] font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>COMPLETA TU PERFIL MÉDICO</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </section>

      {/* Card 2: Atención inmediata (sin líneas/bordes exteriores, fondo blanco sobre fondo gris #f8f8f7) */}
      <section className="w-full bg-white rounded-[14px] p-5 sm:p-[28px] flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-[20px] leading-[28px] font-extrabold text-[#0b1c34]">
            Atención inmediata
          </h2>
          <p className="text-[15px] leading-[22px] text-[#475569] font-normal">
            Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
          </p>
        </div>

        <div className="w-full h-px bg-[#f1f5f9]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Doctores disponibles */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['BP', 'MF', 'CM'].map((ini, idx) => (
                <div
                  key={ini}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white ring-2 ring-white ${
                    idx === 0 ? 'bg-[#0b1c34]' : idx === 1 ? 'bg-[#d50475]' : 'bg-[#4f6bff]'
                  }`}
                >
                  {ini}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#0b1c34] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                12 médicos en línea
              </span>
              <span className="text-[12px] text-[#64748b]">Tiempo de espera &lt; 5 min</span>
            </div>
          </div>

          {/* Dropdown SOLICITA UNA CITA (Desktop) */}
          <div className="hidden md:block relative shrink-0" ref={solicitaDropdownRef}>
            <button
              type="button"
              onClick={() => setSolicitaDropdownOpen(!solicitaDropdownOpen)}
              className="h-[46px] px-5 rounded-[10px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white shrink-0" />
              <span>SOLICITA UNA CITA</span>
            </button>

            {solicitaDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[240px] bg-white rounded-[12px] shadow-[0_16px_40px_rgba(11,28,52,0.16)] p-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenVideoModal();
                  }}
                  className="w-full px-3.5 py-3 rounded-[8px] hover:bg-[#f8f8f7] text-[#0b1c34] text-[13px] font-bold flex items-center gap-3 cursor-pointer text-left"
                >
                  <Video className="w-5 h-5 text-[#d50475]" />
                  <span>VIDEOCONSULTA</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenChatModal();
                  }}
                  className="w-full px-3.5 py-3 rounded-[8px] hover:bg-[#f8f8f7] text-[#0b1c34] text-[13px] font-bold flex items-center gap-3 cursor-pointer text-left"
                >
                  <MessageSquare className="w-5 h-5 text-[#4f6bff]" />
                  <span>CHAT MÉDICO</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Versión Mobile */}
        <div className="flex md:hidden flex-col gap-2.5 w-full pt-1">
          <button
            type="button"
            onClick={onOpenVideoModal}
            className="w-full h-[46px] px-4 rounded-[10px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Video className="w-4 h-4 text-white shrink-0" />
            <span>Solicitar videoconsulta</span>
          </button>
          <button
            type="button"
            onClick={onOpenChatModal}
            className="w-full h-[46px] px-4 rounded-[10px] bg-[#0b1c34] text-white text-[13px] font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white shrink-0" />
            <span>Solicitar chat</span>
          </button>
          <button
            type="button"
            onClick={onStartBiometria}
            className="w-full h-[46px] px-4 rounded-[10px] bg-[#f8f8f7] text-[#0b1c34] text-[13px] font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ScanFace className="w-4 h-4 text-[#64748b] shrink-0" />
            <span>Biometría facial</span>
          </button>
        </div>
      </section>

      {/* Card 3: Escaneo biométrico (Desktop, sin bordes) */}
      <section className="hidden md:flex w-full bg-white rounded-[14px] p-5 sm:p-[28px] flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] min-w-0 flex-1">
          <h2 className="text-[20px] leading-[28px] font-extrabold text-[#0b1c34] tracking-tight">
            Escaneo biométrico
          </h2>
          <p className="text-[15px] leading-[22px] text-[#475569] font-normal">
            Mide tus signos vitales y pulso en segundos usando la cámara.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartBiometria}
          className="h-[46px] px-5 rounded-[10px] bg-[#f8f8f7] hover:bg-[#0b1c34] hover:text-white text-[#0b1c34] text-[13px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <ScanFace className="w-4 h-4 text-[#d50475] shrink-0" />
          <span>INICIAR ESCANEO</span>
        </button>
      </section>

      {/* Card 4: Próximas consultas (misma arquitectura V1, sin bordes exteriores) */}
      <section className="w-full bg-white rounded-[14px] p-6 sm:p-[28px] flex flex-col">
        <div className="w-full flex items-center justify-between pb-[14px]">
          <h2 className="text-[20px] leading-[28px] font-extrabold text-[#0b1c34]">
            Próximas consultas
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#f1f5f9]">
          {visibleConsultations.map((item) => (
            <div
              key={item.id}
              className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex flex-col sm:w-[140px] shrink-0">
                <span className="text-[15px] leading-[22px] font-bold text-[#0b1c34]">
                  {item.timeStr}
                </span>
                <span className="text-[13px] leading-[18px] text-[#64748b]">
                  {item.timeSub}
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[15px] leading-[22px] font-bold text-[#0b1c34]">
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
                  className="h-[44px] px-5 rounded-[10px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[13px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Video className="w-4 h-4 text-[#f472b6] shrink-0" />
                  <span>ENTRAR A LA SALA</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Activo 15 minutos antes de la cita"
                  className="h-[44px] px-5 rounded-[10px] bg-[#f8f8f7] text-[#94a3b8] text-[13px] font-bold uppercase flex items-center gap-2 cursor-not-allowed shrink-0"
                >
                  <Video className="w-4 h-4 text-[#94a3b8] shrink-0" />
                  <span>{item.actionText}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 mt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[13px]">
          <span className="text-[#64748b]">
            Mostrando {visibleConsultations.length} de {CONSULTATIONS.length} eventos
          </span>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="font-bold text-[#d50475] hover:underline cursor-pointer"
          >
            {showAll ? 'Mostrar menos' : 'Cargar más'}
          </button>
        </div>
      </section>
    </div>
  );
};
