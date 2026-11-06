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
import { Mascotas } from './Mascotas';
import { MiPerfil } from './MiPerfil';
import { LanguageSelector } from './LanguageSelector';
import { PlusCircle, Bell, HelpCircle, Palette, Info, Mail, Phone, MapPin, FileText, Check, Trash2, X } from 'lucide-react';

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

  // Top Header Notifications State & Dropdown
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifSoundEnabled, setNotifSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Videoconsulta en 10 minutos',
      desc: 'Dr. Pérez te espera en la sala de espera virtual.',
      time: 'Hace 5 min',
    },
    {
      id: '2',
      title: 'Informe médico disponible',
      desc: 'La Dra. Carmen Morales ha adjuntado tu analítica clínica.',
      time: 'Hace 2 horas',
    },
    {
      id: '3',
      title: 'Recordatorio de cita dermatológica',
      desc: 'Mañana a las 11:30 tienes tu revisión programada.',
      time: 'Ayer',
    },
  ]);

  // Top Header Info / Support Dropdown
  const [isHeaderInfoOpen, setIsHeaderInfoOpen] = useState(false);

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
          <div className={`w-full ${currentView === 'home' ? 'max-w-[800px]' : 'max-w-[1200px]'} flex items-center justify-end gap-[16px] transition-all relative`}>
            
            {/* Botón de Notificaciones con puntito verde arriba a la derecha */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsHeaderInfoOpen(false);
                }}
                className="text-black hover:opacity-75 p-1 cursor-pointer relative"
                title="Notificaciones"
              >
                <Bell className="w-[20px] h-[20px]" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#10b981] ring-2 ring-white" />
                )}
              </button>

              {/* Dropdown de Notificaciones matching media_1793946759811_e5456969.png */}
              {isNotifOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[320px] bg-white rounded-[14px] shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-4 border-0 flex flex-col gap-3 animate-fadeIn">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-bold text-black">Notificaciones</h3>
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setNotifications([])}
                          className="text-[11px] font-bold text-[#d50475] hover:underline cursor-pointer"
                        >
                          Borrar todas
                        </button>
                      )}
                    </div>
                    <p className="text-[12px] text-[#64748b]">
                      Aquí puedes ver tus consultas pendientes de hoy
                    </p>
                  </div>

                  {/* Lista de notificaciones o estado vacío */}
                  <div className="flex flex-col divide-y divide-[#f1f5f9] max-h-[260px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
                        <div className="w-8 h-8 rounded-full border border-[#cbd5e1] flex items-center justify-center text-[#64748b]">
                          <Check className="w-4 h-4 text-[#64748b]" />
                        </div>
                        <span className="text-[14px] font-medium text-[#64748b]">
                          No hay notificaciones pendientes
                        </span>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className="py-2.5 flex items-start justify-between gap-2 group">
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold text-black leading-tight">
                              {notif.title}
                            </span>
                            <span className="text-[12px] text-[#64748b] leading-tight mt-0.5">
                              {notif.desc}
                            </span>
                            <span className="text-[10px] text-[#94a3b8] mt-1">
                              {notif.time}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setNotifications(notifications.filter((n) => n.id !== notif.id))
                            }
                            className="p-1 rounded-full text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fef2f2] cursor-pointer transition-colors shrink-0"
                            title="Eliminar notificación"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer del dropdown: Toggle Sonido de notificaciones */}
                  <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#475569] leading-tight">
                        Sonido, Activa o desactiva el sonido de las notificaciones.
                      </span>
                      <span className="text-[12px] font-bold text-black mt-0.5">
                        {notifSoundEnabled ? 'Activado' : 'Desactivado'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setNotifSoundEnabled(!notifSoundEnabled)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 relative shrink-0 cursor-pointer ${
                        notifSoundEnabled ? 'bg-[#d50475]' : 'bg-[#cbd5e1]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          notifSoundEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botón de Información / Soporte con Dropdown media_1793946721800_9884fe32.png */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsHeaderInfoOpen(!isHeaderInfoOpen);
                  setIsNotifOpen(false);
                }}
                className="text-black hover:opacity-75 p-1 cursor-pointer"
                title="Información y soporte Ever Health"
              >
                <Info className="w-[20px] h-[20px]" />
              </button>

              {/* Dropdown de Soporte e Info General con datos exactos de la imagen */}
              {isHeaderInfoOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[300px] bg-white rounded-[12px] shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-3 border-0 flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#f1f5f9]">
                    <span className="text-[12px] font-bold text-black uppercase tracking-wider">
                      Ever Health
                    </span>
                    <span className="text-[11px] font-medium text-[#64748b]">Soporte y contacto</span>
                  </div>

                  {/* Email */}
                  <a
                    href="mailto:soporte@everhealth.es"
                    className="flex items-center gap-2.5 p-2 rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] transition-colors text-left group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#f1f5f9] group-hover:bg-[#fce7f3] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-black group-hover:text-[#d50475]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#64748b] leading-tight">Email de atención</span>
                      <span className="text-[13px] font-bold truncate">
                        soporte@everhealth.es
                      </span>
                    </div>
                  </a>

                  {/* Teléfono */}
                  <a
                    href="tel:911231214"
                    className="flex items-center gap-2.5 p-2 rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] transition-colors text-left group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#f1f5f9] group-hover:bg-[#fce7f3] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-black group-hover:text-[#d50475]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#64748b] leading-tight">Teléfono directo</span>
                      <span className="text-[13px] font-bold">
                        911 23 12 14
                      </span>
                    </div>
                  </a>

                  {/* Dirección */}
                  <div className="flex items-center gap-2.5 p-2 rounded-[6px] text-black text-left">
                    <div className="w-7 h-7 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-black" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#64748b] leading-tight">Dirección fiscal</span>
                      <span className="text-[12px] font-medium text-black">
                        C/ Naciones 10, 28006 Madrid
                      </span>
                    </div>
                  </div>

                  {/* Términos y condiciones */}
                  <div className="pt-1.5 border-t border-[#f1f5f9] flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => alert('Consulta los Términos y condiciones en everhealth.es')}
                      className="text-[11px] font-bold text-[#64748b] hover:text-[#d50475] transition-colors cursor-pointer"
                    >
                      Términos y condiciones
                    </button>
                    <span className="text-[10px] text-[#94a3b8]">v2.4</span>
                  </div>
                </div>
              )}
            </div>

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

            {currentView === 'mascotas' && (
              <Mascotas />
            )}

            {currentView === 'mi-perfil' && (
              <MiPerfil userName={userName} />
            )}

            {currentView !== 'home' &&
              currentView !== 'solicitar-chat' &&
              currentView !== 'historial-consultas' &&
              currentView !== 'historia-clinica' &&
              currentView !== 'familiares' &&
              currentView !== 'mascotas' &&
              currentView !== 'mi-perfil' && (
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
