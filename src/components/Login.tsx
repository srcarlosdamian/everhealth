import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prototype behavior: any info (or even empty) logs in and navigates to Registro - Onboarding
    onLogin(email || 'usuario@everhealth.com');
  };

  const heroSrc = `${import.meta.env.BASE_URL}assets/login-hero.png`;
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      {/* Main container matching EVR - 02 (1550 x 1024 proportions) */}
      <div className="w-full max-w-[1550px] min-h-screen lg:min-h-[1024px] flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:px-[124px] py-10 lg:py-[124px] gap-10 lg:gap-[80px]">
        
        {/* Left Image Frame (Frame 6: 722 x 776) */}
        <div className="w-full max-w-[722px] lg:w-[722px] h-[420px] sm:h-[580px] lg:h-[776px] shrink-0 overflow-hidden bg-[#f8fafc]">
          <img
            src={heroSrc}
            alt="Bienvenida a Ever Health"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Login Form Frame (Frame 5: 500 x 653, internal padding 24px -> 452px content width) */}
        <div className="w-full max-w-[500px] lg:w-[500px] p-[24px] flex flex-col shrink-0">
          {/* Logo (image 1: 293 x 61) */}
          <div className="mb-[32px]">
            <img
              src={logoSrc}
              alt="EVER HEALTH"
              className="w-[293px] h-[61px] object-contain object-left"
            />
          </div>

          {/* Frame 8: Heading Group */}
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <span className="text-[14px] leading-[20px] font-bold tracking-[0px] text-black uppercase">
              INICIA SESIÓN
            </span>
            <h1 className="text-[36px] leading-[40px] font-bold tracking-[0px] text-black">
              Te damos la bienvenida a tu portal de salud
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Frame 3: Correo (height 76px) */}
            <div className="flex flex-col gap-[4px] mb-[32px]">
              <label
                htmlFor="correo"
                className="text-[16px] leading-[24px] font-normal text-black"
              >
                Correo
              </label>
              <input
                id="correo"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475] focus:ring-1 focus:ring-[#d50475] transition-colors"
              />
            </div>

            {/* Frame 4: Contraseña (height 76px) */}
            <div className="flex flex-col gap-[4px] mb-[32px]">
              <label
                htmlFor="password"
                className="text-[16px] leading-[24px] font-normal text-black"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475] focus:ring-1 focus:ring-[#d50475] transition-colors"
              />
            </div>

            {/* Frame 7: Checkbox Recuerdame (height 24px) */}
            <div className="flex items-center mb-[32px] h-[24px]">
              <label className="inline-flex items-center gap-[8px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[18px] h-[18px] rounded-[4px] border border-[#cbd5e1] text-[#d50475] focus:ring-[#d50475] accent-[#d50475] cursor-pointer"
                />
                <span className="text-[16px] leading-[24px] font-normal text-black">
                  Recuerdame
                </span>
              </label>
            </div>

            {/* Button: Iniciar sesión (452 x 48, Pink/Pink-700 #d50475) */}
            <button
              type="submit"
              className="w-full h-[48px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[16px] leading-[24px] font-bold rounded-[8px] transition-colors flex items-center justify-center mb-[32px] cursor-pointer"
            >
              Iniciar sesión
            </button>

            {/* Frame 9: Footer Links (height 20px, gap 16px) */}
            <div className="flex items-center gap-[16px] h-[20px]">
              <button
                type="button"
                onClick={() => onLogin(email || 'usuario@everhealth.com')}
                className="text-[14px] leading-[20px] font-bold text-black hover:text-[#d50475] transition-colors"
              >
                Recuperar contraseña
              </button>
              <button
                type="button"
                onClick={() => onLogin(email || 'usuario@everhealth.com')}
                className="text-[14px] leading-[20px] font-bold text-black hover:text-[#d50475] transition-colors"
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
