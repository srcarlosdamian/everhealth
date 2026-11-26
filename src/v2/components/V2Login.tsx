import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface V2LoginProps {
  onLogin: (email: string) => void;
}

export const V2Login: React.FC<V2LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const heroSrc = `${import.meta.env.BASE_URL}assets/v2-login-hero.jpg`;
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email.trim() || 'alejandro.navarro@everhealth.es');
  };

  return (
    <div className="v2-root flex items-center justify-center">
      {/* Misma arquitectura 2 columnas de V1, con imagen redondeada más cerca del bloque Ever Health */}
      <div className="w-full max-w-[1360px] min-h-screen lg:min-h-[900px] flex flex-col lg:flex-row items-center justify-center px-6 sm:px-12 lg:px-[64px] py-10 lg:py-[64px] gap-8 lg:gap-[40px]">
        
        {/* Columna Izquierda: 100% imagen con borde redondeado, sin degradado y sin línea */}
        <div
          onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
          className="w-full max-w-[660px] lg:w-[640px] h-[380px] sm:h-[520px] lg:h-[700px] shrink-0 rounded-[20px] overflow-hidden cursor-pointer select-none"
        >
          <img
            src={heroSrc}
            alt="Bienvenida a Ever Health"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* Columna Derecha: Formulario limpio con logo original de V1 */}
        <div className="w-full max-w-[500px] lg:w-[500px] bg-white rounded-[14px] p-6 sm:p-10 flex flex-col shrink-0">
          {/* Logo original de V1 */}
          <div className="mb-[28px]">
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              className="w-[240px] sm:w-[270px] h-auto object-contain object-left"
            />
          </div>

          {/* Heading Group: una sola tipografía, un solo peso y color */}
          <div className="flex flex-col gap-[8px] mb-[28px]">
            <span className="text-[13px] leading-[20px] font-bold tracking-wider text-[#d50475] uppercase">
              INICIA SESIÓN
            </span>
            <h1 className="v2-heading text-[34px] sm:text-[38px] leading-[1.1] font-bold text-[#0b1c34]">
              Te damos la bienvenida a tu portal de salud
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-[6px] mb-[22px]">
              <label htmlFor="v2-correo" className="text-[14px] font-semibold text-[#0b1c34]">
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
              <label htmlFor="v2-password" className="text-[14px] font-semibold text-[#0b1c34]">
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
                className="text-[13px] font-semibold text-[#0b1c34] hover:text-[#d50475] transition-colors cursor-pointer"
              >
                Recuperar contraseña
              </button>
              <button
                type="button"
                onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
                className="text-[13px] font-semibold text-[#0b1c34] hover:text-[#d50475] transition-colors cursor-pointer"
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
