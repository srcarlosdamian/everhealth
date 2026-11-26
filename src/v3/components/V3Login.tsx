import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface V3LoginProps {
  onLogin: (email: string) => void;
}

export const V3Login: React.FC<V3LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const heroSrc = `${import.meta.env.BASE_URL}assets/login-hero.png`;
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email.trim() || 'alejandro.navarro@everhealth.es');
  };

  return (
    <div className="v3-root flex items-center justify-center">
      {/* Misma arquitectura 2 columnas de V1/V2 */}
      <div className="w-full max-w-[1360px] min-h-screen lg:min-h-[900px] flex flex-col lg:flex-row items-center justify-center px-6 sm:px-12 lg:px-[64px] py-10 lg:py-[64px] gap-8 lg:gap-[48px]">
        
        {/* Columna Izquierda: 100% imagen limpia, sin degradado y sin borde */}
        <div
          onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
          className="w-full max-w-[660px] lg:w-[640px] h-[380px] sm:h-[520px] lg:h-[700px] shrink-0 rounded-[4px] overflow-hidden cursor-pointer select-none"
        >
          <img
            src={heroSrc}
            alt="Bienvenida a Ever Health"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* Columna Derecha: Formulario minimalista editorial (rosa + negro sobre fondo claro) */}
        <div className="w-full max-w-[500px] lg:w-[500px] bg-white rounded-[4px] p-6 sm:p-11 flex flex-col shrink-0">
          {/* Logo original de V1 */}
          <div className="mb-[32px]">
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              className="w-[230px] sm:w-[260px] h-auto object-contain object-left"
            />
          </div>

          {/* Heading Group editorial */}
          <div className="flex flex-col gap-[10px] mb-[30px]">
            <span className="v3-mono text-[11px] font-medium uppercase text-[#52534f] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d50475]" />
              INICIA SESIÓN
            </span>
            <h1 className="v3-serif text-[36px] sm:text-[42px] leading-[1.06] font-normal text-[#141514]">
              Te damos la bienvenida a tu{' '}
              <span className="text-[#d50475]">portal de salud</span>
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-[6px] mb-[20px]">
              <label htmlFor="v3-correo" className="text-[13px] font-medium text-[#141514]">
                Correo
              </label>
              <input
                id="v3-correo"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                className="w-full h-[48px] px-4 bg-[#f7f7f5] border-0 rounded-[4px] text-[14px] text-[#141514] placeholder:text-[#73746f] focus:outline-none focus:ring-1 focus:ring-[#141514] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-[6px] mb-[20px]">
              <label htmlFor="v3-password" className="text-[13px] font-medium text-[#141514]">
                Contraseña
              </label>
              <input
                id="v3-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full h-[48px] px-4 bg-[#f7f7f5] border-0 rounded-[4px] text-[14px] text-[#141514] placeholder:text-[#73746f] focus:outline-none focus:ring-1 focus:ring-[#141514] focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center mb-[24px]">
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-[13px] text-[#52534f]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-[2px] accent-[#d50475] cursor-pointer"
                />
                <span>Recuérdame</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-[48px] text-[14px] font-medium rounded-[4px] bg-[#141514] hover:bg-[#2a2b29] text-white transition-colors flex items-center justify-center gap-2 mb-[24px] cursor-pointer"
            >
              <span>Iniciar sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-[18px]">
              <button
                type="button"
                onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
                className="text-[13px] font-medium text-[#141514] hover:text-[#d50475] transition-colors cursor-pointer"
              >
                Recuperar contraseña
              </button>
              <button
                type="button"
                onClick={() => onLogin(email.trim() || 'alejandro.navarro@everhealth.es')}
                className="text-[13px] font-medium text-[#141514] hover:text-[#d50475] transition-colors cursor-pointer"
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
