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
  'consultas',
  'historia-clinica',
  'familiares',
  'mascotas',
  'mi-perfil',
  'biometria',
  'cuestionario',
  'design-system',
];

const ROUTE_ALIASES: Record<string, string> = {
  inicio: 'home',
  dashboard: 'home',
  consultas: 'historial-consultas',
  historial: 'historial-consultas',
  clinica: 'historia-clinica',
  perfil: 'mi-perfil',
  chat: 'solicitar-chat',
  design: 'design-system',
  'sistema-de-diseno': 'design-system',
};

const resolveRoute = (input: string | null | undefined): string | null => {
  if (!input) return null;
  const clean = input.replace(/^#\/?/, '').replace(/\/$/, '').trim().toLowerCase();
  if (!clean) return null;
  if (ROUTE_ALIASES[clean]) return ROUTE_ALIASES[clean];
  if (VALID_ROUTES.includes(clean)) return clean;
  return null;
};

const getInitialRoute = (): string => {
  // 1. Soporte para enlaces con query params (?route=onboarding, ?p=onboarding, ?view=onboarding)
  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const queryRoute = params.get('route') || params.get('p') || params.get('view');
    const resolvedFromQuery = resolveRoute(queryRoute);
    if (resolvedFromQuery) return resolvedFromQuery;
  }

  // 2. Soporte para enlaces con hash (#/onboarding, #onboarding, #/home, #/consultas, etc.)
  if (typeof window !== 'undefined' && window.location.hash) {
    const resolvedFromHash = resolveRoute(window.location.hash);
    if (resolvedFromHash) return resolvedFromHash;
  }

  // 3. Si se accede a la raíz pura sin ruta específica, arrancar en login
  return 'login';
};

export function App() {
  const [route, setRoute] = useState<string>(() => getInitialRoute());
  const [email, setEmail] = useState<string>('contact@carlosdamian.com');
  const [userName, setUserName] = useState<string>('Carlos Damián');

  // Sincronizar ruta y escuchar cambios de hash en el navegador para permitir enlaces directos compartibles
  useEffect(() => {
    const initialRoute = getInitialRoute();
    const currentHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();

    // Solo si no hay hash en la URL (ej. acceso directo a https://.../everhealth/), fijamos #/login
    if (!currentHash || currentHash === '') {
      window.location.hash = `#/${initialRoute}`;
    } else {
      setRoute(initialRoute);
    }

    const handleHashChange = () => {
      const targetRoute = getInitialRoute();
      setRoute(targetRoute);
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
