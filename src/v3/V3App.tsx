import React, { useState } from 'react';
import './v3.css';
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
import { V3Login } from './components/V3Login';
import { V3Home } from './components/V3Home';
import { V3Historial } from './components/V3Historial';
import { V3Perfil } from './components/V3Perfil';
import { V3ModalSolicitarChat } from './components/V3ModalSolicitarChat';
import { V3ModalVideoConsulta } from './components/V3ModalVideoConsulta';

type V3View = 'home' | 'historial-consultas' | 'mi-perfil';

export const V3App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<V3View>('home');
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

  const navigate = (view: V3View) => {
    setActiveView(view);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return <V3Login onLogin={handleLogin} />;
  }

  const sidebarItems: { id: V3View; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-[18px] h-[18px]" /> },
    { id: 'historial-consultas', label: 'Historial de consultas', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { id: 'mi-perfil', label: 'Mi perfil', icon: <User className="w-[18px] h-[18px]" /> },
  ];

  return (
    <div className="v3-root flex flex-col">
      {/* Top Header (sin línea divisoria) */}
      <header className="sticky top-0 z-40 w-full h-[68px] bg-white/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden w-10 h-10 rounded-[4px] hover:bg-[#f7f7f5] flex items-center justify-center text-[#141514] cursor-pointer"
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
          <div className="relative">
            <button
              type="button"
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="w-10 h-10 rounded-[4px] hover:bg-[#f7f7f5] flex items-center justify-center text-[#d50475] transition-colors cursor-pointer"
              title="Acciones rápidas"
            >
              <PlusCircle className="w-5 h-5" />
            </button>

            {quickActionsOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] w-[240px] bg-white rounded-[4px] shadow-[0_16px_40px_rgba(20,21,20,0.16)] p-2 z-50 flex flex-col divide-y divide-[#eeeeea]">
                <button
                  type="button"
                  onClick={() => {
                    setQuickActionsOpen(false);
                    setVideoModalOpen(true);
                  }}
                  className="w-full px-3 py-2.5 hover:bg-[#f7f7f5] text-[13px] font-medium text-[#141514] flex items-center gap-2.5 cursor-pointer text-left"
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
                  className="w-full px-3 py-2.5 hover:bg-[#f7f7f5] text-[13px] font-medium text-[#141514] flex items-center gap-2.5 cursor-pointer text-left"
                >
                  <MessageSquare className="w-4 h-4 text-[#141514]" />
                  <span>Solicitar chat médico</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="hidden sm:flex w-10 h-10 rounded-[4px] hover:bg-[#f7f7f5] items-center justify-center text-[#52534f] cursor-pointer"
            title="Notificaciones"
          >
            <Bell className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="hidden sm:flex w-10 h-10 rounded-[4px] hover:bg-[#f7f7f5] items-center justify-center text-[#52534f] cursor-pointer"
            title="Ayuda"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => navigate('mi-perfil')}
            className="h-10 pl-2 pr-3 rounded-[4px] bg-[#f7f7f5] hover:bg-[#eeeeea] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-[3px] bg-[#141514] text-white text-[11px] font-semibold flex items-center justify-center">
              {initials}
            </div>
            <span className="hidden sm:inline text-[13px] font-medium text-[#141514]">
              {userName.split(' ')[0]}
            </span>
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar (sin línea divisoria) */}
        <aside className="hidden lg:flex w-[250px] shrink-0 bg-white/80 flex-col justify-between p-4">
          <nav className="flex flex-col gap-1 pt-2">
            {sidebarItems.map((item) => {
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`w-full h-[44px] px-4 rounded-[4px] flex items-center gap-3 text-[13px] font-medium transition-colors cursor-pointer text-left ${
                    active
                      ? 'bg-[#141514] text-white'
                      : 'text-[#52534f] hover:bg-white hover:text-[#141514]'
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
            className="w-full h-[44px] px-4 rounded-[4px] text-[#52534f] hover:bg-white hover:text-[#d50475] flex items-center gap-3 text-[13px] font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Cerrar sesión</span>
          </button>
        </aside>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-[#141514]/40"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-[270px] bg-white h-full p-5 flex flex-col justify-between z-10 shadow-2xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-4 border-b border-[#eeeeea]">
                  <img src={logoSrc} alt="EVER HEALTH" className="h-[32px] w-auto object-contain" />
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-[4px] hover:bg-[#f7f7f5]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`w-full h-[44px] px-4 rounded-[4px] flex items-center gap-3 text-[13px] font-medium text-left ${
                      activeView === item.id
                        ? 'bg-[#141514] text-white'
                        : 'text-[#52534f] hover:bg-[#f7f7f5]'
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
                className="w-full h-[44px] px-4 rounded-[4px] bg-[#f7f7f5] text-[#d50475] flex items-center gap-3 text-[13px] font-medium"
              >
                <LogOut className="w-[18px] h-[18px]" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}

        {/* Main View Area (sin footer en Home) */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 px-4 sm:px-8 py-8 sm:py-10">
            {activeView === 'home' && (
              <V3Home
                userName={userName}
                onStartQuestionnaire={() => navigate('mi-perfil')}
                onStartBiometria={() => setVideoModalOpen(true)}
                onOpenVideoModal={() => setVideoModalOpen(true)}
                onOpenChatModal={() => setChatModalOpen(true)}
              />
            )}
            {activeView === 'historial-consultas' && (
              <V3Historial
                onOpenVideoModal={() => setVideoModalOpen(true)}
                onOpenChatModal={() => setChatModalOpen(true)}
              />
            )}
            {activeView === 'mi-perfil' && (
              <V3Perfil userName={userName} userEmail={userEmail} />
            )}
          </main>
        </div>
      </div>

      <V3ModalSolicitarChat isOpen={chatModalOpen} onClose={() => setChatModalOpen(false)} />
      <V3ModalVideoConsulta isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};
