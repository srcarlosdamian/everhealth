import React from 'react';
import { Globe, HeartPulse, ShieldCheck, Smartphone, Mail, Phone } from 'lucide-react';

interface V2FooterProps {
  onNavigate?: (view: 'home' | 'historial' | 'perfil') => void;
  onOpenChatModal?: () => void;
  onOpenVideoModal?: () => void;
}

export const V2Footer: React.FC<V2FooterProps> = ({
  onNavigate,
  onOpenChatModal,
  onOpenVideoModal,
}) => {
  return (
    <footer className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pb-8 pt-6">
      <div className="bg-[#0b1c34] text-white rounded-[24px] px-6 sm:px-12 py-12 sm:py-16 shadow-[0_20px_50px_rgba(11,28,52,0.18)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Left editorial statement & brand */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-[30px] sm:text-[36px] font-extrabold leading-[1.12] tracking-tight text-white">
                Cuidamos tu salud{' '}
                <span className="v2-serif italic font-normal text-[#f9a8d4]">
                  en cada momento.
                </span>
              </h2>
              <p className="text-[14px] text-slate-300 leading-relaxed max-w-[300px]">
                Atención médica digital inmediata, especialistas colegiados y seguimiento clínico en un solo lugar.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#d50475] flex items-center justify-center shadow-md">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-extrabold tracking-tight text-white">
                  EVER HEALTH
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
                  Portal de Telemedicina
                </span>
              </div>
            </div>
          </div>

          {/* Right multi-column links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3.5">
              <span className="text-[13px] font-bold text-white tracking-wide">Servicios</span>
              <ul className="flex flex-col gap-2.5 text-[13px] text-slate-300">
                <li>
                  <button
                    type="button"
                    onClick={onOpenVideoModal}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Videoconsulta
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenChatModal}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Chat médico 24/7
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('historial')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Historial clínico
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('perfil')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Mi suscripción
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-[13px] font-bold text-white tracking-wide">Especialidades</span>
              <ul className="flex flex-col gap-2.5 text-[13px] text-slate-300">
                <li>Medicina General</li>
                <li>Pediatría</li>
                <li>Dermatología</li>
                <li>Psicología</li>
                <li>Nutrición</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-[13px] font-bold text-white tracking-wide">Cuenta</span>
              <ul className="flex flex-col gap-2.5 text-[13px] text-slate-300">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('home')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Panel principal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('perfil')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Datos personales
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('perfil')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Seguridad y acceso
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('perfil')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Facturación
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-[13px] font-bold text-white tracking-wide">Soporte</span>
              <ul className="flex flex-col gap-2.5 text-[13px] text-slate-300">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#f472b6]" />
                  <span>soporte@everhealth.es</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#f472b6]" />
                  <span>911 23 12 14</span>
                </li>
                <li className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-white/10 text-[11px] font-semibold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    RGPD Certificado
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom divider & bar */}
        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/10 text-white font-medium">
              <Globe className="w-3.5 h-3.5" />
              Español (ES)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/10 text-white font-medium">
              <Smartphone className="w-3.5 h-3.5" />
              iOS & Android
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span>Privacidad</span>
            <span>Términos legales</span>
            <span>Estado del servicio</span>
            <span className="text-slate-500">© {new Date().getFullYear()} Ever Health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
