import React, { useState } from 'react';
import './v2.css';
import { V2Login } from './components/V2Login';
import { V2Header, V2View } from './components/V2Header';
import { V2Home } from './components/V2Home';
import { V2Historial } from './components/V2Historial';
import { V2Perfil } from './components/V2Perfil';
import { V2Footer } from './components/V2Footer';
import { V2ModalSolicitarChat } from './components/V2ModalSolicitarChat';
import { V2ModalVideoConsulta } from './components/V2ModalVideoConsulta';

export const V2App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<V2View>('home');
  const [userEmail, setUserEmail] = useState('alejandro.navarro@everhealth.es');
  const [userName] = useState('Alejandro Navarro');
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: V2View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return <V2Login onLogin={handleLogin} />;
  }

  return (
    <div className="v2-root flex flex-col justify-between">
      <V2Header
        activeView={activeView}
        userName={userName}
        onNavigate={handleNavigate}
        onOpenChatModal={() => setChatModalOpen(true)}
        onOpenVideoModal={() => setVideoModalOpen(true)}
        onLogout={() => setIsAuthenticated(false)}
      />

      <main className="flex-1">
        {activeView === 'home' && (
          <V2Home
            userName={userName}
            onNavigate={handleNavigate}
            onOpenChatModal={() => setChatModalOpen(true)}
            onOpenVideoModal={() => setVideoModalOpen(true)}
          />
        )}
        {activeView === 'historial' && (
          <V2Historial
            onOpenChatModal={() => setChatModalOpen(true)}
            onOpenVideoModal={() => setVideoModalOpen(true)}
          />
        )}
        {activeView === 'perfil' && (
          <V2Perfil userName={userName} userEmail={userEmail} />
        )}
      </main>

      <V2Footer
        onNavigate={handleNavigate}
        onOpenChatModal={() => setChatModalOpen(true)}
        onOpenVideoModal={() => setVideoModalOpen(true)}
      />

      <V2ModalSolicitarChat
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />
      <V2ModalVideoConsulta
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};
