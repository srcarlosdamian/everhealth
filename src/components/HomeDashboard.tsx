import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EVR100Home } from './EVR100Home';
import { SolicitarChat } from './SolicitarChat';
import { CuestionarioMedico } from './CuestionarioMedico';
import { ModalVideoConsulta } from './ModalVideoConsulta';
import { ModalSolicitarChat } from './ModalSolicitarChat';
import { ModalDocumentos } from './ModalDocumentos';
import { LanguageSelector } from './LanguageSelector';
import { DesignSystemView } from '../design-system/showcase/DesignSystemView';
import { PlusCircle, Bell, HelpCircle, Palette } from 'lucide-react';

interface HomeDashboardProps {
  userName: string;
  onLogout: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ userName, onLogout }) => {
  const [currentView, setCurrentView] = useState<'home' | 'solicitar-chat' | 'cuestionario' | string>('home');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatModalTab, setChatModalTab] = useState<'agendar' | 'ahora'>('agendar');
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // If in questionnaire mode, render full-screen CuestionarioMedico (EVR - 45 through 107)
  if (currentView === 'cuestionario') {
    return (
      <CuestionarioMedico onBackToHome={() => setCurrentView('home')} />
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
          <div className="w-full max-w-[800px] flex items-center justify-end gap-[16px]">
            <button
              type="button"
              onClick={() => setIsDocsModalOpen(true)}
              className="text-[#d50475] hover:opacity-80 p-1 cursor-pointer"
              title="Documentos e informes (EVR-35)"
            >
              <PlusCircle className="w-[22px] h-[22px]" />
            </button>
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
            {/* Design System Art Button - to the left of ES */}
            <button
              type="button"
              onClick={() => setIsDesignSystemOpen(true)}
              className="h-[32px] px-2.5 rounded-[6px] border border-[#cbd5e1] hover:border-black bg-white hover:bg-[#f8fafc] text-black flex items-center gap-1.5 text-[12px] font-bold cursor-pointer transition-colors shadow-2xs"
              title="Sistema de Diseño & Componentes Atómicos"
            >
              <Palette className="w-[16px] h-[16px] text-black shrink-0" />
              <span className="hidden sm:inline">Design System</span>
            </button>
            <LanguageSelector />
          </div>
        </header>

        {/* Body Content - Mathematically centered in the remaining space next to Sidebar (width 800px) */}
        <main className="flex-1 px-4 sm:px-8 pt-[24px] pb-[48px] flex justify-center items-start">
          <div className="w-full max-w-[800px] mx-auto">
            {currentView === 'home' && (
              <EVR100Home
                userName={userName}
                onStartQuestionnaire={() => setCurrentView('cuestionario')}
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

            {currentView !== 'home' && currentView !== 'solicitar-chat' && (
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

      <DesignSystemView
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />
    </div>
  );
};
