import React, { useState } from 'react';
import './v2.css';
import {
  Home,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Bell,
  HelpCircle,
  Video,
  MessageSquare,
} from 'lucide-react';
import { V2Login } from './components/V2Login';
import { V2Home } from './components/V2Home';
import { V2Historial } from './components/V2Historial';
import { V2Perfil } from './components/V2Perfil';
import { V2ModalSolicitarChat } from './components/V2ModalSolicitarChat';
import { V2ModalVideoConsulta } from './components/V2ModalVideoConsulta';

type V2View = 'home' | 'historial-consultas' | 'mi-perfil';

export const V2App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<V2View>('home');
  const [userEmail, setUserEmail] = useState('alejandro.navarro@everhealth.es');
  const [userName] = useState('Alejandro Navarro');

  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (view: V2View) => {
    setActiveView(view);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return <V2Login onLogin={handleLogin} />;
  }

  const sidebarItems: { id: V2View; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-[18px] h-[18px]" /> },
    { id: 'historial-consultas', label: 'Historial de consultas', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { id: 'mi-perfil', label: 'Mi perfil', icon: <User className="w-[18px] h-[18px]" /> },
  ];

  return (
    <div className="v2-root flex flex-col">
      {/* Top Header (Misma arquitectura V1: logo izquierda, acciones + usuario derecha) */}
      <header className="sticky top-0 z-40 w-full h-[68px] bg-white/95 backdrop-blur-md border-b border-[#e2e8f0]/70 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden w-10 h-10 rounded-[10px] hover:bg-[#f8f8f7] flex items-center justify-center text-[#0b1c34] cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center cursor-pointer"
          >
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              className="h-[36px] sm:h-[40px] w-auto object-contain object-left"
            />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Actions Dropdown (+) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="w-10 h-10 rounded-[10px] hover:bg-[#f8f8f7] flex items-center justify-center text-[#0b1c34] cursor-pointer"
              title="Acciones rápidas"
            >
              <PlusCircle className="w-5 h-5" />
            </button>

            {quickActionsOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[230px] bg-white rounded-[12px] shadow-[0_16px_40px_rgba(11,28,52,0.16)] p-2 z-50 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setQuickActionsOpen(false);
                    setVideoModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-[8px] hover:bg-[#f8f8f7] text-[13px] font-bold text-[#0b1c34] flex items-center gap-2.5 cursor-pointer text-left"
                >
                  <Video className="w-4 h-4 text-[#d50475]" />
                  <span>Solicitar videoconsulta</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickActionsOpen(false);
                    setChatModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-[8px] hover:bg-[#f8f8f7] text-[13px] font-bold text-[#0b1c34] flex items-center gap-2.5 cursor-pointer text-left"
                >
                  <MessageSquare className="w-4 h-4 text-[#4f6bff]" />
                  <span>Solicitar chat médico</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="hidden sm:flex w-10 h-10 rounded-[10px] hover:bg-[#f8f8f7] items-center justify-center text-[#475569] cursor-pointer"
            title="Notificaciones"
          >
            <Bell className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="hidden sm:flex w-10 h-10 rounded-[10px] hover:bg-[#f8f8f7] items-center justify-center text-[#475569] cursor-pointer"
            title="Ayuda"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => navigate('mi-perfil')}
            className="h-10 pl-2 pr-3 rounded-[10px] bg-[#f8f8f7] hover:bg-[#e2e8f0] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[#0b1c34] text-white text-[11px] font-bold flex items-center justify-center">
              {initials}
            </div>
            <span className="hidden sm:inline text-[13px] font-bold text-[#0b1c34]">
              {userName.split(' ')[0]}
            </span>
          </button>
        </div>
      </header>

      {/* Body: Sidebar Izquierda (V1) + Main Content */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-[250px] shrink-0 bg-white/70 border-r border-[#e2e8f0]/60 flex-col justify-between p-4">
          <nav className="flex flex-col gap-1.5 pt-2">
            {sidebarItems.map((item) => {
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`w-full h-[46px] px-4 rounded-[10px] flex items-center gap-3 text-[14px] font-bold transition-colors cursor-pointer text-left ${
                    active
                      ? 'bg-[#0b1c34] text-white'
                      : 'text-[#475569] hover:bg-white hover:text-[#0b1c34]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="w-full h-[44px] px-4 rounded-[10px] text-[#475569] hover:bg-white hover:text-[#e11d48] flex items-center gap-3 text-[14px] font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Cerrar sesión</span>
          </button>
        </aside>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-[#0b1c34]/40"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-[270px] bg-white h-full p-5 flex flex-col justify-between z-10 shadow-2xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
                  <span className="text-[17px] font-extrabold text-[#0b1c34]">EVER HEALTH</span>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-[#f8f8f7]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`w-full h-[46px] px-4 rounded-[10px] flex items-center gap-3 text-[14px] font-bold text-left ${
                      activeView === item.id
                        ? 'bg-[#0b1c34] text-white'
                        : 'text-[#475569] hover:bg-[#f8f8f7]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="w-full h-[46px] px-4 rounded-[10px] bg-[#f8f8f7] text-[#e11d48] flex items-center gap-3 text-[14px] font-bold"
              >
                <LogOut className="w-[18px] h-[18px]" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}

        {/* Main View Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 px-4 sm:px-8 py-8 sm:py-10">
            {activeView === 'home' && (
              <V2Home
                userName={userName}
                onStartQuestionnaire={() => navigate('mi-perfil')}
                onStartBiometria={() => setVideoModalOpen(true)}
                onOpenVideoModal={() => setVideoModalOpen(true)}
                onOpenChatModal={() => setChatModalOpen(true)}
              />
            )}
            {activeView === 'historial-consultas' && (
              <V2Historial
                onOpenVideoModal={() => setVideoModalOpen(true)}
                onOpenChatModal={() => setChatModalOpen(true)}
              />
            )}
            {activeView === 'mi-perfil' && (
              <V2Perfil userName={userName} userEmail={userEmail} />
            )}
          </main>
        </div>
      </div>

      <V2ModalSolicitarChat isOpen={chatModalOpen} onClose={() => setChatModalOpen(false)} />
      <V2ModalVideoConsulta isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};
