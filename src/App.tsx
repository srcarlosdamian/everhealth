import React, { useState } from 'react';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { HomeDashboard } from './components/HomeDashboard';

type ViewState = 'login' | 'onboarding' | 'home';

export function App() {
  const [view, setView] = useState<ViewState>('login');
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('Carlos Damián');

  const handleLogin = (submittedEmail: string) => {
    setEmail(submittedEmail);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('onboarding');
  };

  const handleFinishOnboarding = (userData: { name: string; lastName: string; email: string }) => {
    const fullName = [userData.name, userData.lastName].filter(Boolean).join(' ').trim();
    if (fullName) {
      setUserName(fullName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('home');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {view === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {view === 'onboarding' && (
        <Onboarding
          initialEmail={email}
          onBackToLogin={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView('login');
          }}
          onFinishOnboarding={handleFinishOnboarding}
        />
      )}

      {view === 'home' && (
        <HomeDashboard
          userName={userName}
          onLogout={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView('login');
          }}
        />
      )}
    </div>
  );
}

export default App;
