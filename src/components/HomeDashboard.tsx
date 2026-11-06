import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EVR100Home } from './EVR100Home';
import { SolicitarChat } from './SolicitarChat';
import { CuestionarioMedico } from './CuestionarioMedico';
import { DesignSystemPage } from './DesignSystemPage';
import { ModalVideoConsulta } from './ModalVideoConsulta';
import { ModalSolicitarChat } from './ModalSolicitarChat';
import { ModalDocumentos } from './ModalDocumentos';
import { Biometria } from './Biometria';
import { HistorialConsultas } from './HistorialConsultas';
import { HistoriaClinica } from './HistoriaClinica';
import { Familiares } from './Familiares';
import { LanguageSelector } from './LanguageSelector';
import { PlusCircle, Bell, HelpCircle, Palette } from 'lucide-react';

interface HomeDashboardProps {
  userName: string;
  onLogout: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ userName, onLogout }) => {
  const [currentView, setCurrentView] = useState<'home' | 'solicitar-chat' | 'cuestionario' | 'design-system' | string>('home');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatModalTab, setChatModalTab] = useState<'agendar' | 'ahora'>('agendar');
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  // If in biometria mode, render full-page Biometria
  if (currentView === 'biometria') {
    return (
      <Biometria onBackToHome={() => setCurrentView('home')} userName={userName} />
    );
  }

  // If in questionnaire mode, render full-screen CuestionarioMedico (EVR - 45 through 107)
  if (currentView === 'cuestionario') {
    return (
      <CuestionarioMedico onBackToHome={() => setCurrentView('home')} />
    );
  }

  // If in design-system mode, render full-page DesignSystemPage (no modal, same 800px max-width & sidebar)
  if (currentView === 'design-system') {
    return (
      <DesignSystemPage onBackToHome={() => setCurrentView('home')} />
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      {/* Sidebar with EVR-121 */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
        userName={userName}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="w-full h-[56px] px-4 sm:px-8 flex items-center justify-center border-b border-[#f1f5f9] lg:border-b-0">
          <div className={`w-full ${currentView === 'home' ? 'max-w-[800px]' : 'max-w-[1200px]'} flex items-center justify-end gap-[16px] transition-all`}>
            <button
              type="button"
              className="text-black hover:opacity-75 p-1 cursor-pointer"
              title="Notificaciones"
            >
              <Bell className="w-[20px] h-[20px]" />
            </button>
            <button
              type="button"
              className="text-black hover:opacity-75 p-1 cursor-pointer"
              title="Ayuda"
            >
              <HelpCircle className="w-[20px] h-[20px]" />
            </button>
            {/* Design System Art Icon - abre la página completa de sistema de diseño (no modal) */}
            <button
              type="button"
              onClick={() => setCurrentView('design-system')}
              className="text-black hover:opacity-75 p-1 cursor-pointer transition-opacity"
              title="Sistema de Diseño (Página completa)"
            >
              <Palette className="w-[20px] h-[20px]" />
            </button>
            <LanguageSelector />
          </div>
        </header>

        {/* Body Content - Home a 800px; resto de vistas a 1200px */}
        <main className="flex-1 px-4 sm:px-8 pt-[24px] pb-[48px] flex justify-center items-start">
          <div className={`w-full ${currentView === 'home' ? 'max-w-[800px]' : 'max-w-[1200px]'} mx-auto transition-all`}>
            {currentView === 'home' && (
              <EVR100Home
                userName={userName}
                onStartQuestionnaire={() => setCurrentView('cuestionario')}
                onStartBiometria={() => setCurrentView('biometria')}
                onOpenVideoModal={() => setIsVideoModalOpen(true)}
                onOpenChat={() => setCurrentView('solicitar-chat')}
              />
            )}

            {currentView === 'solicitar-chat' && (
              <SolicitarChat
                onOpenCalendarModal={() => {
                  setChatModalTab('agendar');
                  setIsChatModalOpen(true);
                }}
                onOpenNowModal={() => {
                  setChatModalTab('ahora');
                  setIsChatModalOpen(true);
                }}
              />
            )}

            {currentView === 'historial-consultas' && (
              <HistorialConsultas
                onOpenVideoModal={() => setIsVideoModalOpen(true)}
                onOpenChatModal={() => {
                  setChatModalTab('ahora');
                  setIsChatModalOpen(true);
                }}
                onOpenDocumentsModal={() => setIsDocsModalOpen(true)}
                defaultTab="consultas"
              />
            )}

            {currentView === 'historia-clinica' && (
              <HistorialConsultas
                onOpenVideoModal={() => setIsVideoModalOpen(true)}
                onOpenChatModal={() => {
                  setChatModalTab('ahora');
                  setIsChatModalOpen(true);
                }}
                onOpenDocumentsModal={() => setIsDocsModalOpen(true)}
                defaultTab="historia-clinica"
              />
            )}

            {currentView === 'familiares' && (
              <Familiares />
            )}

            {currentView !== 'home' &&
              currentView !== 'solicitar-chat' &&
              currentView !== 'historial-consultas' &&
              currentView !== 'historia-clinica' &&
              currentView !== 'familiares' && (
              <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-bold text-black">Sección: {currentView}</p>
                <p className="text-[14px]">Esta sección está conectada al flujo principal.</p>
                <button
                  type="button"
                  onClick={() => setCurrentView('home')}
                  className="px-6 py-2.5 bg-[#d50475] hover:bg-[#b00360] text-white rounded-[8px] font-bold text-[14px] cursor-pointer transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <ModalVideoConsulta
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <ModalSolicitarChat
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        defaultTab={chatModalTab}
      />

      <ModalDocumentos
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  );
};
