import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Video,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  HeartPulse,
  ArrowUpRight,
} from 'lucide-react';

export type V2View = 'home' | 'historial' | 'perfil';

interface V2HeaderProps {
  activeView: V2View;
  userName: string;
  onNavigate: (view: V2View) => void;
  onOpenChatModal: () => void;
  onOpenVideoModal: () => void;
  onLogout: () => void;
}

export const V2Header: React.FC<V2HeaderProps> = ({
  activeView,
  userName,
  onNavigate,
  onOpenChatModal,
  onOpenVideoModal,
  onLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');

  const navItems: { id: V2View; label: string }[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'historial', label: 'Historial de consultas' },
    { id: 'perfil', label: 'Mi perfil' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8f8f7]/90 backdrop-blur-md border-b border-[#e2e8f0]/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[74px] flex items-center justify-between gap-4">
        {/* Left: Brand + Nav */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-[11px] bg-[#d50475] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[19px] font-extrabold tracking-tight text-[#0b1c34]">
                EVER HEALTH
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0b1c34]/10 text-[#0b1c34]">
                v2
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0b1c34] shadow-xs border border-[#e2e8f0]'
                      : 'text-[#475569] hover:text-[#0b1c34] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Solicitar consulta dropdown + User */}
        <div className="hidden md:flex items-center gap-3">
          {/* Solicitar consulta dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="h-[44px] px-5 rounded-[12px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#f472b6]" />
              <span>Solicitar consulta</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-[320px] bg-white rounded-[18px] shadow-[0_20px_50px_rgba(11,28,52,0.16)] border border-[#e2e8f0] p-2.5 z-50">
                <div className="px-3 py-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                    Elige tu modalidad
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenVideoModal();
                  }}
                  className="w-full flex items-start gap-3.5 p-3 rounded-[14px] hover:bg-[#f8f8f7] transition-colors text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-[#fdf2f8] text-[#d50475] flex items-center justify-center shrink-0 group-hover:bg-[#d50475] group-hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-[#0b1c34]">
                        Videoconsulta
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#d50475]" />
                    </div>
                    <p className="text-[12px] text-[#64748b] mt-0.5 leading-snug">
                      Agenda por fecha y especialidad con recetas e informes.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenChatModal();
                  }}
                  className="w-full flex items-start gap-3.5 p-3 rounded-[14px] hover:bg-[#f8f8f7] transition-colors text-left cursor-pointer group mt-1"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-[#0b1c34]">
                        Chat médico
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#2563eb]" />
                    </div>
                    <p className="text-[12px] text-[#64748b] mt-0.5 leading-snug">
                      Habla ahora o programa un chat para dudas rápidas.
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Profile pill */}
          <button
            type="button"
            onClick={() => onNavigate('perfil')}
            className="h-[44px] pl-2 pr-3.5 rounded-[12px] bg-white border border-[#e2e8f0] hover:border-[#0b1c34] flex items-center gap-2.5 transition-colors cursor-pointer"
            title="Configuración de usuario"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[#0b1c34] text-white text-[11px] font-bold flex items-center justify-center">
              {initials || <User className="w-3.5 h-3.5" />}
            </div>
            <span className="text-[13px] font-semibold text-[#0b1c34] max-w-[130px] truncate">
              {userName.split(' ')[0]}
            </span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="w-[44px] h-[44px] rounded-[12px] bg-white border border-[#e2e8f0] hover:border-[#e11d48] hover:text-[#e11d48] text-[#64748b] flex items-center justify-center transition-colors cursor-pointer"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden w-11 h-11 rounded-[12px] bg-white border border-[#e2e8f0] flex items-center justify-center text-[#0b1c34] cursor-pointer"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0] px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-[12px] text-left text-[15px] font-bold cursor-pointer ${
                activeView === item.id
                  ? 'bg-[#0b1c34] text-white'
                  : 'bg-[#f8f8f7] text-[#0b1c34]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVideoModal();
              }}
              className="h-[46px] rounded-[12px] bg-[#d50475] text-white text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Videoconsulta</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChatModal();
              }}
              className="h-[46px] rounded-[12px] bg-[#0b1c34] text-white text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat médico</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onLogout();
            }}
            className="w-full h-[44px] rounded-[12px] border border-[#e2e8f0] text-[#475569] text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      )}
    </header>
  );
};
