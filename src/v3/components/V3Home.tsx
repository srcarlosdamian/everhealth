import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
  Plus,
} from 'lucide-react';

interface V3HomeProps {
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

export const V3Home: React.FC<V3HomeProps> = ({
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
      {/* Title */}
      <div className="flex flex-col gap-1">
        <span className="v3-mono text-[11px] font-medium uppercase text-[#52534f] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d50475]" />
          PORTAL DEL PACIENTE
        </span>
        <h1 className="v3-serif text-[36px] sm:text-[42px] leading-[1.08] font-normal text-[#141514]">
          Bienvenido, <span className="text-[#d50475]">{displayName}</span>
        </h1>
      </div>

      {/* Card 1: Empieza tu historial médico (Bloque oscuro minimalista sin degradados) */}
      <section className="w-full bg-[#141514] text-white rounded-[4px] p-6 sm:p-[30px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[6px] flex-1 min-w-0">
          <h2 className="v3-serif text-[26px] leading-[1.15] font-normal text-white">
            Empieza tu historial médico
          </h2>
          <p className="text-[14px] leading-[22px] text-white/75 font-normal">
            Completa el formulario para conocer tu historial.
          </p>

          <div className="flex items-center gap-3 mt-[8px] max-w-[340px]">
            <div className="flex-1 h-[4px] bg-white/20 overflow-hidden">
              <div className="h-full bg-[#d50475] w-[15%]" />
            </div>
            <span className="v3-mono text-[11px] text-white/80">15%</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[10px] shrink-0 self-center md:self-auto w-full md:w-auto">
          <button
            type="button"
            onClick={onStartQuestionnaire}
            className="w-full md:w-auto h-[46px] px-5 rounded-[4px] bg-white hover:bg-[#eeeeea] text-[#141514] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Completa tu perfil médico</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </section>

      {/* Card 2: Atención inmediata (Blanco puro sobre fondo piedra #eeeeea, sin líneas) */}
      <section className="w-full bg-white rounded-[4px] p-5 sm:p-[28px] flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[4px]">
          <span className="v3-mono text-[11px] uppercase text-[#52534f] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d50475]" />
            ATENCIÓN INMEDIATA
          </span>
          <h2 className="v3-serif text-[26px] leading-[1.15] font-normal text-[#141514]">
            Atención médica en línea
          </h2>
          <p className="text-[14px] leading-[22px] text-[#52534f] font-normal">
            Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
          </p>
        </div>

        <div className="w-full h-px bg-[#eeeeea]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Doctores disponibles */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['BP', 'MF', 'CM'].map((ini, idx) => (
                <div
                  key={ini}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-white ring-2 ring-white ${
                    idx === 1 ? 'bg-[#d50475]' : 'bg-[#141514]'
                  }`}
                >
                  {ini}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#141514] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#d50475]" />
                12 médicos en línea
              </span>
              <span className="text-[12px] text-[#52534f]">Tiempo de espera &lt; 5 min</span>
            </div>
          </div>

          {/* Dropdown SOLICITA UNA CITA */}
          <div className="hidden md:block relative shrink-0" ref={solicitaDropdownRef}>
            <button
              type="button"
              onClick={() => setSolicitaDropdownOpen(!solicitaDropdownOpen)}
              className="h-[46px] px-5 rounded-[4px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white shrink-0" />
              <span>Solicita una cita</span>
            </button>

            {solicitaDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[280px] bg-white rounded-[4px] shadow-[0_16px_40px_rgba(20,21,20,0.16)] px-4 py-1 flex flex-col divide-y divide-[#eeeeea]">
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenVideoModal();
                  }}
                  className="w-full py-3.5 flex items-start gap-3 cursor-pointer text-left group"
                >
                  <Video className="w-[18px] h-[18px] text-[#141514] group-hover:text-[#d50475] mt-0.5 shrink-0 transition-colors" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#141514] group-hover:text-[#d50475] transition-colors">
                      Videoconsulta
                    </span>
                    <span className="text-[12px] text-[#52534f] leading-snug">
                      Agenda cita por especialidad con recetas e informes.
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSolicitaDropdownOpen(false);
                    onOpenChatModal();
                  }}
                  className="w-full py-3.5 flex items-start gap-3 cursor-pointer text-left group"
                >
                  <MessageSquare className="w-[18px] h-[18px] text-[#141514] group-hover:text-[#d50475] mt-0.5 shrink-0 transition-colors" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#141514] group-hover:text-[#d50475] transition-colors">
                      Chat médico
                    </span>
                    <span className="text-[12px] text-[#52534f] leading-snug">
                      Habla ahora o programa un chat para dudas rápidas.
                    </span>
                  </div>
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
            className="w-full h-[46px] px-4 rounded-[4px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Video className="w-4 h-4 text-white shrink-0" />
            <span>Solicitar videoconsulta</span>
          </button>
          <button
            type="button"
            onClick={onOpenChatModal}
            className="w-full h-[46px] px-4 rounded-[4px] bg-[#141514] text-white text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white shrink-0" />
            <span>Solicitar chat</span>
          </button>
          <button
            type="button"
            onClick={onStartBiometria}
            className="w-full h-[46px] px-4 rounded-[4px] bg-[#f7f7f5] text-[#141514] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ScanFace className="w-4 h-4 text-[#52534f] shrink-0" />
            <span>Biometría facial</span>
          </button>
        </div>
      </section>

      {/* Card 3: Escaneo biométrico */}
      <section className="hidden md:flex w-full bg-white rounded-[4px] p-5 sm:p-[28px] flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] min-w-0 flex-1">
          <h2 className="v3-serif text-[25px] leading-[1.15] font-normal text-[#141514]">
            Escaneo biométrico
          </h2>
          <p className="text-[14px] leading-[22px] text-[#52534f] font-normal">
            Mide tus signos vitales y pulso en segundos usando la cámara.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartBiometria}
          className="h-[46px] px-5 rounded-[4px] bg-[#f7f7f5] hover:bg-[#141514] hover:text-white text-[#141514] text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <ScanFace className="w-4 h-4 text-[#d50475] shrink-0" />
          <span>Iniciar escaneo</span>
        </button>
      </section>

      {/* Card 4: Próximas consultas */}
      <section className="w-full bg-white rounded-[4px] p-6 sm:p-[28px] flex flex-col">
        <div className="w-full flex items-center justify-between pb-[14px]">
          <h2 className="v3-serif text-[25px] leading-[1.15] font-normal text-[#141514]">
            Próximas consultas
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#eeeeea]">
          {visibleConsultations.map((item) => (
            <div
              key={item.id}
              className="py-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex flex-col sm:w-[140px] shrink-0">
                <span className="text-[15px] leading-[22px] font-semibold text-[#141514]">
                  {item.timeStr}
                </span>
                <span className="v3-mono text-[11px] uppercase text-[#52534f] mt-0.5">
                  {item.timeSub}
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[15px] leading-[22px] font-semibold text-[#141514]">
                  {item.title}
                </span>
                <span className="text-[13px] leading-[18px] text-[#52534f]">
                  {item.details}
                </span>
              </div>

              {item.isActive ? (
                <button
                  type="button"
                  onClick={onOpenVideoModal}
                  className="h-[44px] px-5 rounded-[4px] bg-[#141514] hover:bg-[#2a2b29] text-white text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Video className="w-4 h-4 text-[#d50475] shrink-0" />
                  <span>Entrar a la sala</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Activo 15 minutos antes de la cita"
                  className="h-[44px] px-5 rounded-[4px] bg-[#f7f7f5] text-[#94a3b8] text-[13px] font-medium flex items-center gap-2 cursor-not-allowed shrink-0"
                >
                  <Video className="w-4 h-4 text-[#94a3b8] shrink-0" />
                  <span>{item.actionText}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 mt-2 border-t border-[#eeeeea] flex items-center justify-between text-[13px]">
          <span className="text-[#52534f]">
            Mostrando {visibleConsultations.length} de {CONSULTATIONS.length} eventos
          </span>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="font-semibold text-[#d50475] hover:underline cursor-pointer"
          >
            {showAll ? 'Mostrar menos' : 'Cargar más'}
          </button>
        </div>
      </section>
    </div>
  );
};
