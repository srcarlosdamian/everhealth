import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  Video,
  MessageSquare,
  ScanFace,
  Plus,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { AvailableDoctorsRow } from '../design-system/molecules/AvailableDoctorsRow';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { PaginationEvents } from '../design-system/molecules/PaginationEvents';

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

export const EVR100Home: React.FC<EVR100HomeProps> = ({
  userName,
  onStartQuestionnaire,
  onStartBiometria,
  onOpenVideoModal,
  onOpenChat,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [solicitaDropdownOpen, setSolicitaDropdownOpen] = useState(false);
  const solicitaDropdownRef = useRef<HTMLDivElement>(null);

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

      {/* Card 1: Empieza tu historial médico (Sin borde redondeado ni línea exterior) */}
      <section className="w-full bg-[#f8fafc] p-6 sm:p-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[3px] flex-1 min-w-0">
          <h2 className="text-[20px] leading-[26px] font-bold text-black">
            Empieza tu historial médico
          </h2>
          <p className="text-[15px] leading-[22px] text-black font-normal truncate">
            Completa el formulario para conocer tu historial.
          </p>

          <div className="flex flex-col mt-[6px] max-w-[340px]">
            {/* Progress Bar (10% pink, 90% gray) pegado a la descripción */}
            <div className="w-full h-[6px] bg-[#e2e8f0] rounded-full overflow-hidden">
              <div className="h-full bg-[#d50475] rounded-full w-[10%]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[10px] shrink-0 self-center md:self-auto">
          {/* Único botón: Completa tu perfil médico */}
          <Button
            variant="outline"
            onClick={onStartQuestionnaire}
            className="w-full px-[14px] bg-transparent"
          >
            <span>COMPLETA TU PERFIL MÉDICO</span>
            <ChevronRight className="w-[18px] h-[18px] text-black shrink-0" />
          </Button>
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
          <AvailableDoctorsRow />

          {/* Action CTA Dropdown (Visible solo en Desktop / md:flex) */}
          <div className="hidden md:block relative shrink-0" ref={solicitaDropdownRef}>
            <Button
              variant="primary"
              onClick={() => setSolicitaDropdownOpen(!solicitaDropdownOpen)}
            >
              <Plus className="w-[20px] h-[20px] text-white shrink-0" />
              <span>SOLICITA UNA CITA</span>
            </Button>

            {/* Dropdown Menu sin borde gris, solo sombra */}
            {solicitaDropdownOpen && (
              <ActionMenu
                variant="solicitar-cita"
                className="absolute right-0 top-[calc(100%+6px)] z-50 w-[200px]"
                items={[
                  {
                    id: 'video',
                    label: 'VIDEOCONSULTA',
                    icon: <Video className="w-[20px] h-[20px]" />,
                    onClick: () => {
                      setSolicitaDropdownOpen(false);
                      onOpenVideoModal();
                    },
                  },
                  {
                    id: 'chat',
                    label: 'CHAT MÉDICO',
                    icon: <MessageSquare className="w-[20px] h-[20px]" />,
                    onClick: () => {
                      setSolicitaDropdownOpen(false);
                      onOpenChat();
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>

        {/* Versión Mobile: En vez de un dropdown que se sale, aparecen los tres botones juntos solicitados con iconos neutrales */}
        <div className="flex md:hidden flex-col gap-2 w-full pt-1">
          <button
            type="button"
            onClick={onOpenVideoModal}
            className="w-full h-[40px] px-3 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Video className="w-4 h-4 text-white shrink-0" />
            <span>Solicitar videoconsulta</span>
          </button>
          <button
            type="button"
            onClick={onOpenChat}
            className="w-full h-[40px] px-3 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#64748b] shrink-0" />
            <span>Solicitar chat</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onStartBiometria) onStartBiometria();
            }}
            className="w-full h-[40px] px-3 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ScanFace className="w-4 h-4 text-[#64748b] shrink-0" />
            <span>Biometría facial</span>
          </button>
        </div>
      </section>

      {/* Card 3: Escaneo biométrico (Visible solo en Desktop; en Mobile ya está agrupado arriba) */}
      <section className="hidden md:flex w-full bg-white p-4 sm:p-[24px] border border-[#e2e8f0] flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-[4px] min-w-0 flex-1">
          <h2 className="text-[20px] leading-[28px] font-bold text-black tracking-tight">
            Escaneo biométrico
          </h2>
          <p className="text-[16px] leading-[24px] text-black font-normal truncate">
            Mide tus signos vitales y pulso en segundos usando la cámara.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            if (onStartBiometria) onStartBiometria();
          }}
        >
          <ScanFace className="w-[20px] h-[20px] text-[#d50475] shrink-0" />
          <span>INICIAR ESCANEO</span>
        </Button>
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
                <Button variant="outline" onClick={onOpenVideoModal}>
                  {item.actionText}
                </Button>
              ) : (
                <Button variant="inactive" tooltipText="Activo 15 minutos antes">
                  {item.actionText}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Footer: Event Counter + "Cargar más / Mostrar menos" plain text */}
        <PaginationEvents
          visibleCount={visibleConsultations.length}
          totalCount={CONSULTATIONS.length}
          isExpanded={showAll}
          onToggle={() => setShowAll(!showAll)}
        />
      </section>
    </div>
  );
};
