import React, { useState, useRef, useEffect } from 'react';
import {
  Home as HomeIcon,
  Plus,
  ScanFace,
  FileText,
  FileSpreadsheet,
  Users,
  PawPrint,
  ChevronDown,
  MessageSquare,
  Video,
  SlidersHorizontal,
  LogOut,
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const displayName = userName.trim() || 'Carlos Damián';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'CD';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolicitarOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (solicitarOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solicitarOpen, userMenuOpen]);

  return (
    <aside className="hidden lg:flex w-[244px] min-h-screen border-r border-[#e2e8f0] p-[16px] flex-col shrink-0 bg-white">
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

      {/* User Selector Dropdown with Configuración de usuario & Cerrar sesión */}
      <div className="relative mb-[16px]" ref={userMenuRef}>
        <button
          type="button"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          title={displayName}
          className="w-full h-[40px] px-[10px] rounded-[8px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-[10px] min-w-0">
            <span className="w-[28px] h-[24px] rounded-[4px] bg-[#e2e8f0] text-black text-[12px] font-bold flex items-center justify-center shrink-0">
              {initials}
            </span>
            <span className="text-[14px] leading-[20px] font-normal text-black truncate">
              {displayName}
            </span>
          </div>
          <ChevronDown
            className={`w-[16px] h-[16px] text-black shrink-0 transition-transform duration-200 ${
              userMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu sin borde gris, solo sombra - matching media_1793946549334_0f96c0e9.png */}
        {userMenuOpen && (
          <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full bg-white rounded-[12px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={() => {
                setUserMenuOpen(false);
                onNavigate('mi-perfil');
              }}
              className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f1f5f9] flex items-center gap-[12px] text-[14px] leading-[20px] font-normal text-black text-left transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-[18px] h-[18px] text-black shrink-0" />
              <span>Configuración de usuario</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setUserMenuOpen(false);
                onLogout();
              }}
              className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f1f5f9] flex items-center gap-[12px] text-[14px] leading-[20px] font-normal text-black text-left transition-colors cursor-pointer"
            >
              <LogOut className="w-[18px] h-[18px] text-black shrink-0" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>

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

            {/* Dropdown Menu matching EVR - 121 sin borde gris, solo sombra */}
            {solicitarOpen && (
              <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] flex flex-col gap-[2px]">
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
            onClick={() => onNavigate('biometria')}
            className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
              currentView === 'biometria'
                ? 'bg-[#f1f5f9] text-black font-medium'
                : 'text-black hover:bg-[#f8fafc]'
            }`}
          >
            <ScanFace className="w-[18px] h-[18px] text-black" />
            <span>Biometría facial</span>
          </button>
        </div>

        <hr className="border-[#e2e8f0] my-[6px]" />

        {/* Historial consultas */}
        <button
          type="button"
          onClick={() => onNavigate('historial-consultas')}
          className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
            currentView === 'historial-consultas'
              ? 'bg-[#f1f5f9] text-black font-medium'
              : 'text-black hover:bg-[#f8fafc]'
          }`}
        >
          <FileText className="w-[18px] h-[18px] text-black" />
          <span>Historial consultas</span>
        </button>

        {/* Historia clínica */}
        <button
          type="button"
          onClick={() => onNavigate('historia-clinica')}
          className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
            currentView === 'historia-clinica'
              ? 'bg-[#f1f5f9] text-black font-medium'
              : 'text-black hover:bg-[#f8fafc]'
          }`}
        >
          <FileSpreadsheet className="w-[18px] h-[18px] text-black" />
          <span>Historia clínica</span>
        </button>

        <hr className="border-[#e2e8f0] my-[6px]" />

        {/* Familiares */}
        <button
          type="button"
          onClick={() => onNavigate('familiares')}
          className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
            currentView === 'familiares'
              ? 'bg-[#f1f5f9] text-black font-medium'
              : 'text-black hover:bg-[#f8fafc]'
          }`}
        >
          <Users className="w-[18px] h-[18px] text-black" />
          <span>Familiares</span>
        </button>

        {/* Mascotas */}
        <button
          type="button"
          onClick={() => onNavigate('mascotas')}
          className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal transition-colors cursor-pointer ${
            currentView === 'mascotas'
              ? 'bg-[#f1f5f9] text-black font-medium'
              : 'text-black hover:bg-[#f8fafc]'
          }`}
        >
          <PawPrint className="w-[18px] h-[18px] text-black" />
          <span>Mascotas</span>
        </button>
      </nav>
    </aside>
  );
};
