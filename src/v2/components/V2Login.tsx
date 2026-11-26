import React, { useState } from 'react';
import { ArrowRight, HeartPulse, ShieldCheck, Video, MessageSquare, Lock, Mail } from 'lucide-react';
import { V2Footer } from './V2Footer';

interface V2LoginProps {
  onLogin: (email: string) => void;
}

export const V2Login: React.FC<V2LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const heroSrc = `${import.meta.env.BASE_URL}assets/login-hero.png`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email.trim() || 'alejandro.navarro@everhealth.es');
  };

  return (
    <div className="v2-root flex flex-col justify-between">
      {/* Top Bar */}
      <header className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[11px] bg-[#d50475] flex items-center justify-center shadow-sm">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-[20px] font-extrabold tracking-tight text-[#0b1c34]">
            EVER HEALTH
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0b1c34]/10 text-[#0b1c34]">
            v2
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onLogin('alejandro.navarro@everhealth.es')}
            className="hidden sm:inline-flex h-[44px] px-5 rounded-[12px] border border-[#cbd5e1] bg-white hover:border-[#0b1c34] text-[14px] font-bold text-[#0b1c34] items-center justify-center transition-colors cursor-pointer"
          >
            Acceso rápido
          </button>
          <button
            type="button"
            onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
            className="h-[44px] px-5 rounded-[12px] bg-[#0b1c34] hover:bg-[#142c4f] text-[14px] font-bold text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            Entrar al portal
          </button>
        </div>
      </header>

      {/* Main Gradient Hero Container */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="v2-gradient-hero rounded-[24px] sm:rounded-[28px] px-5 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-10 sm:pb-14 shadow-[0_24px_60px_rgba(11,28,52,0.12)]">
          {/* Hero Headline */}
          <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-4 mb-9 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[12px] font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              Portal de salud digital · Atención 24/7
            </span>
            <h1 className="text-[36px] sm:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
              Tu salud médica,{' '}
              <span className="v2-serif italic font-normal">sin esperas.</span>
            </h1>
            <p className="text-[15px] sm:text-[17px] text-white/90 max-w-[560px] leading-relaxed">
              Conecta por videoconsulta o chat médico con especialistas colegiados y consulta tu historial clínico desde cualquier dispositivo.
            </p>
          </div>

          {/* Elevated White Card inside Gradient */}
          <div className="max-w-[980px] mx-auto bg-white rounded-[24px] p-5 sm:p-8 lg:p-10 shadow-[0_24px_64px_rgba(11,28,52,0.18)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Login Form */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="flex flex-col gap-1.5 mb-6">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#d50475]">
                  Inicia sesión
                </span>
                <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0b1c34] leading-tight tracking-tight">
                  Bienvenido de nuevo
                </h2>
                <p className="text-[14px] text-[#475569]">
                  Ingresa tus credenciales para acceder a tus consultas y perfil médico.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="v2-email" className="text-[14px] font-bold text-[#0b1c34]">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64748b] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="v2-email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@everhealth.es"
                      className="w-full h-[50px] pl-11 pr-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] focus:ring-2 focus:ring-[#d50475]/15 text-[15px] text-[#0b1c34] placeholder:text-[#94a3b8] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="v2-password" className="text-[14px] font-bold text-[#0b1c34]">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#64748b] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="v2-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa tu contraseña"
                      className="w-full h-[50px] pl-11 pr-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] focus:ring-2 focus:ring-[#d50475]/15 text-[15px] text-[#0b1c34] placeholder:text-[#94a3b8] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[13px]">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-[#475569]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#d50475] cursor-pointer"
                    />
                    <span>Mantener sesión iniciada</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
                    className="font-bold text-[#0b1c34] hover:text-[#d50475] transition-colors cursor-pointer"
                  >
                    ¿Olvidaste tu clave?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-[52px] rounded-[12px] bg-[#d50475] hover:bg-[#b80364] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(213,4,117,0.28)] transition-all cursor-pointer mt-1"
                >
                  <span>Iniciar sesión</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-[12px] text-[#64748b]">
                  <span>Prototipo V2 · Acceso directo</span>
                  <button
                    type="button"
                    onClick={() => onLogin('alejandro.navarro@everhealth.es')}
                    className="font-bold text-[#0b1c34] hover:underline cursor-pointer"
                  >
                    Aviso de privacidad
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Visual Frame with image inside soft container */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="rounded-[20px] bg-[#f8f8f7] p-3 border border-[#e2e8f0] relative overflow-hidden">
                <div className="rounded-[16px] overflow-hidden h-[260px] sm:h-[340px] lg:h-[380px] relative">
                  <img
                    src={heroSrc}
                    alt="Atención médica Ever Health"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c34]/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/95 text-[#0b1c34] text-[12px] font-bold shadow-sm">
                      <Video className="w-3.5 h-3.5 text-[#d50475]" />
                      Videoconsultas HD
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/95 text-[#0b1c34] text-[12px] font-bold shadow-sm">
                      <MessageSquare className="w-3.5 h-3.5 text-[#2563eb]" />
                      Chat inmediato
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <V2Footer />
    </div>
  );
};
