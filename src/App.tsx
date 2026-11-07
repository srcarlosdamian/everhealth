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
  // Siempre arrancar en 'login' para que desarrolladores y usuarios vean primero el login y el stepper
  const [route, setRoute] = useState<string>('login');
  const [email, setEmail] = useState<string>('contact@carlosdamian.com');
  const [userName, setUserName] = useState<string>('Carlos Damián');

  // Al abrir o recargar la página, forzar siempre la entrada en login
  useEffect(() => {
    window.location.hash = '#/login';
    setRoute('login');

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (!hash || hash === '' || hash === 'login') {
        setRoute('login');
      } else if (VALID_ROUTES.includes(hash)) {
        setRoute(hash === 'inicio' ? 'home' : hash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
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
