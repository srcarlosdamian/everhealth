import React, { useState, useRef, useEffect } from 'react';
import {
  Home as HomeIcon,
  Plus,
  ScanFace,
  FileText,
  FileSpreadsheet,
  Users,
  Cat,
  ChevronDown,
  MessageSquare,
  Video,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenVideoModal: () => void;
  userName: string;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenVideoModal,
  userName,
  onLogout,
}) => {
  const [solicitarOpen, setSolicitarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const displayName = userName.trim() || 'Carlos Damián';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'CD';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolicitarOpen(false);
      }
    };
    if (solicitarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solicitarOpen]);

  return (
    <aside className="w-full lg:w-[244px] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#e2e8f0] p-[16px] flex flex-col shrink-0 bg-white">
      {/* Brand Logo - 40px height as requested */}
      <div className="pt-[12px] pb-[24px] px-[4px]">
        <img
          src={logoSrc}
          alt="EVER HEALTH"
          onClick={() => onNavigate('home')}
          title="Ever Health"
          className="h-[40px] w-auto object-contain object-left cursor-pointer"
        />
      </div>

      {/* User Selector Dropdown */}
      <button
        type="button"
        onClick={onLogout}
        title="Cerrar sesión / Volver al inicio"
        className="w-full h-[40px] px-[10px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] flex items-center justify-between mb-[16px] cursor-pointer"
      >
        <div className="flex items-center gap-[8px] truncate">
          <span className="w-[24px] h-[24px] rounded-full bg-[#f1f5f9] text-black text-[12px] font-bold flex items-center justify-center shrink-0">
            {initials}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-black truncate">
            {displayName}
          </span>
        </div>
        <ChevronDown className="w-[16px] h-[16px] text-[#475569] shrink-0" />
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-[6px]">
        {/* Inicio */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
            currentView === 'home'
              ? 'bg-[#f1f5f9] text-black font-medium'
              : 'text-black hover:bg-[#f8fafc]'
          }`}
        >
          <HomeIcon className="w-[18px] h-[18px] text-black" />
          <span>Inicio</span>
        </button>

        <hr className="border-[#e2e8f0] my-[6px]" />

        {/* Group: Solicitar una cita + Biometría facial (WITHOUT dividing hr as requested) */}
        <div className="flex flex-col gap-[6px] relative" ref={dropdownRef}>
          {/* Solicitar una cita Button with dropdown (EVR - 121) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSolicitarOpen(!solicitarOpen)}
              className={`w-full h-[40px] px-[12px] rounded-[6px] border flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
                solicitarOpen
                  ? 'border-[#cbd5e1] bg-[#f8fafc] text-black'
                  : 'border-[#cbd5e1] bg-white hover:bg-[#f8fafc] text-black'
              }`}
            >
              <Plus className="w-[18px] h-[18px] text-black" />
              <span>Solicitar una cita</span>
            </button>

            {/* Dropdown Menu matching EVR - 121 */}
            {solicitarOpen && (
              <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[6px] border border-[#cbd5e1] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-[4px] flex flex-col gap-[2px]">
                <button
                  type="button"
                  onClick={() => {
                    setSolicitarOpen(false);
                    onNavigate('solicitar-chat');
                  }}
                  className="w-full h-[36px] px-[10px] rounded-[4px] hover:bg-[#f1f5f9] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black text-left transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-[16px] h-[16px] text-black" />
                  <span>Solicitar chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSolicitarOpen(false);
                    onOpenVideoModal();
                  }}
                  className="w-full h-[36px] px-[10px] rounded-[4px] hover:bg-[#f1f5f9] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black text-left transition-colors cursor-pointer"
                >
                  <Video className="w-[16px] h-[16px] text-black" />
                  <span>Solicitar video consulta</span>
                </button>
              </div>
            )}
          </div>

          {/* Biometría facial (placed directly next to Solicitar una cita without hr) */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black cursor-pointer"
          >
            <ScanFace className="w-[18px] h-[18px] text-black" />
            <span>Biometría facial</span>
          </button>
        </div>

        <hr className="border-[#e2e8f0] my-[6px]" />

        {/* Historial consultas */}
        <button
          type="button"
          className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black cursor-pointer"
        >
          <FileText className="w-[18px] h-[18px] text-black" />
          <span>Historial consultas</span>
        </button>

        {/* Historia clínica */}
        <button
          type="button"
          onClick={() => onNavigate('cuestionario')}
          className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black cursor-pointer"
        >
          <FileSpreadsheet className="w-[18px] h-[18px] text-black" />
          <span>Historia clínica</span>
        </button>

        <hr className="border-[#e2e8f0] my-[6px]" />

        {/* Familiares */}
        <button
          type="button"
          className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black cursor-pointer"
        >
          <Users className="w-[18px] h-[18px] text-black" />
          <span>Familiares</span>
        </button>

        {/* Mascotas */}
        <button
          type="button"
          className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black cursor-pointer"
        >
          <Cat className="w-[18px] h-[18px] text-black" />
          <span>Mascotas</span>
        </button>
      </nav>
    </aside>
  );
};
