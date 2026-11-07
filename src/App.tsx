import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { HomeDashboard } from './components/HomeDashboard';

const VALID_ROUTES = [
  'login',
  'onboarding',
  'home',
  'inicio',
  'solicitar-chat',
  'historial-consultas',
  'historia-clinica',
  'familiares',
  'mascotas',
  'mi-perfil',
  'biometria',
  'cuestionario',
  'design-system',
];

const getRouteFromHash = (): string => {
  const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!hash || hash === '') return 'login'; // Ruta inicial: Pantalla de Login
  if (hash === 'inicio') return 'home';
  if (VALID_ROUTES.includes(hash)) return hash;
  return 'login';
};

export function App() {
  const [route, setRoute] = useState<string>(getRouteFromHash());
  const [email, setEmail] = useState<string>('contact@carlosdamian.com');
  const [userName, setUserName] = useState<string>('Carlos Damián');

  // Synchronize route with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRouteFromHash();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // If no initial hash in URL, set hash to current route
    if (!window.location.hash) {
      window.location.hash = `#/${route}`;
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newRoute: string) => {
    const normalized = newRoute === 'inicio' ? 'home' : newRoute;
    window.location.hash = `#/${normalized}`;
    setRoute(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (submittedEmail: string) => {
    setEmail(submittedEmail);
    navigate('onboarding');
  };

  const handleFinishOnboarding = (userData: { name: string; lastName: string; email: string }) => {
    const fullName = [userData.name, userData.lastName].filter(Boolean).join(' ').trim();
    if (fullName) {
      setUserName(fullName);
    }
    navigate('home');
  };

  // Render standalone Login
  if (route === 'login') {
    return (
      <div className="min-h-screen bg-white text-black font-[family-name:Helvetica]">
        <Login
          onLogin={handleLogin}
          onBypassToHome={() => navigate('home')}
        />
      </div>
    );
  }

  // Render standalone Onboarding
  if (route === 'onboarding') {
    return (
      <div className="min-h-screen bg-white text-black font-[family-name:Helvetica]">
        <Onboarding
          initialEmail={email}
          onBackToLogin={() => navigate('login')}
          onFinishOnboarding={handleFinishOnboarding}
        />
      </div>
    );
  }

  // Dashboard views: home, biometria, cuestionario, solicitar-chat, historial-consultas, historia-clinica, familiares, mascotas, mi-perfil, design-system
  return (
    <div className="min-h-screen bg-white text-black font-[family-name:Helvetica]">
      <HomeDashboard
        userName={userName}
        currentView={route}
        onNavigate={navigate}
        onLogout={() => navigate('login')}
      />
    </div>
  );
}

export default App;
