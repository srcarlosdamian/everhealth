import React, { useState } from 'react';
import { HeartPulse, ArrowRight } from 'lucide-react';

interface V2LoginProps {
  onLogin: (email: string) => void;
}

export const V2Login: React.FC<V2LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const heroSrc = `${import.meta.env.BASE_URL}assets/login-hero.png`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email.trim() || 'alejandro.navarro@everhealth.es');
  };

  return (
    <div className="v2-root flex items-center justify-center">
      {/* Misma arquitectura 2 columnas de V1 (max-w-[1550px]) */}
      <div className="w-full max-w-[1550px] min-h-screen lg:min-h-[960px] flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:px-[100px] py-10 lg:py-[80px] gap-10 lg:gap-[72px]">
        
        {/* Columna Izquierda: Degradado -> Blanco -> Imagen adentro (como indicó la clienta) */}
        <div
          onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
          className="w-full max-w-[722px] lg:w-[700px] h-[400px] sm:h-[540px] lg:h-[740px] shrink-0 v2-gradient-mesh p-5 sm:p-8 rounded-[16px] flex items-center justify-center cursor-pointer select-none"
        >
          <div className="w-full h-full bg-white rounded-[12px] p-3 sm:p-4 shadow-[0_24px_60px_rgba(11,28,52,0.22)] overflow-hidden">
            <img
              src={heroSrc}
              alt="Bienvenida a Ever Health"
              className="w-full h-full object-cover object-center rounded-[8px] select-none"
            />
          </div>
        </div>

        {/* Columna Derecha: Mismo formulario V1 con superficie clara sin bordes y botones/inputs más amplios */}
        <div className="w-full max-w-[500px] lg:w-[500px] bg-white rounded-[16px] p-6 sm:p-10 flex flex-col shrink-0">
          {/* Logo */}
          <div className="mb-[28px] flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[10px] bg-[#d50475] flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-[22px] font-extrabold tracking-tight text-[#0b1c34]">
              EVER HEALTH
            </span>
          </div>

          {/* Heading Group */}
          <div className="flex flex-col gap-[8px] mb-[28px]">
            <span className="text-[13px] leading-[20px] font-bold tracking-wider text-[#d50475] uppercase">
              INICIA SESIÓN
            </span>
            <h1 className="text-[32px] sm:text-[36px] leading-[1.15] font-extrabold tracking-tight text-[#0b1c34]">
              Te damos la bienvenida a tu{' '}
              <span className="v2-serif italic font-normal text-[#d50475]">portal de salud</span>
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-[6px] mb-[22px]">
              <label htmlFor="v2-correo" className="text-[14px] font-bold text-[#0b1c34]">
                Correo
              </label>
              <input
                id="v2-correo"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                className="w-full h-[52px] px-4 bg-[#f8f8f7] border-0 rounded-[10px] text-[15px] text-[#0b1c34] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#d50475]/30 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-[6px] mb-[22px]">
              <label htmlFor="v2-password" className="text-[14px] font-bold text-[#0b1c34]">
                Contraseña
              </label>
              <input
                id="v2-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full h-[52px] px-4 bg-[#f8f8f7] border-0 rounded-[10px] text-[15px] text-[#0b1c34] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#d50475]/30 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center mb-[26px]">
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-[14px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#d50475] cursor-pointer"
                />
                <span>Recuérdame</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-[52px] text-[15px] font-bold rounded-[10px] bg-[#0b1c34] hover:bg-[#142c4f] text-white transition-colors flex items-center justify-center gap-2 mb-[24px] cursor-pointer"
            >
              <span>Iniciar sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-[16px]">
              <button
                type="button"
                onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
                className="text-[13px] font-bold text-[#0b1c34] hover:text-[#d50475] transition-colors cursor-pointer"
              >
                Recuperar contraseña
              </button>
              <button
                type="button"
                onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
                className="text-[13px] font-bold text-[#0b1c34] hover:text-[#d50475] transition-colors cursor-pointer"
              >
                Aviso privacidad
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
