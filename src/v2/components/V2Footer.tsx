import React from 'react';
import { Globe, HeartPulse, ShieldCheck, Smartphone, Mail, Phone } from 'lucide-react';

interface V2FooterProps {
  onNavigate?: (view: 'home' | 'historial-consultas' | 'mi-perfil') => void;
  onOpenChatModal?: () => void;
  onOpenVideoModal?: () => void;
}

export const V2Footer: React.FC<V2FooterProps> = ({
  onNavigate,
  onOpenChatModal,
  onOpenVideoModal,
}) => {
  return (
    <footer className="w-full px-4 sm:px-6 pb-6 pt-4">
      <div className="max-w-[1200px] mx-auto bg-[#0b1c34] text-white rounded-[20px] px-6 sm:px-10 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-[26px] sm:text-[32px] font-extrabold leading-[1.14] tracking-tight text-white">
                Cuidamos tu salud{' '}
                <span className="v2-serif italic font-normal text-[#f9a8d4]">
                  en cada momento.
                </span>
              </h2>
              <p className="text-[13px] text-slate-300 leading-relaxed max-w-[280px]">
                Atención médica digital inmediata, especialistas colegiados y seguimiento clínico en un solo lugar.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] bg-[#d50475] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-[17px] font-extrabold tracking-tight text-white">
                EVER HEALTH
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-white">Servicios</span>
              <ul className="flex flex-col gap-2 text-[13px] text-slate-300">
                <li>
                  <button type="button" onClick={onOpenVideoModal} className="hover:text-white cursor-pointer text-left">
                    Videoconsulta
                  </button>
                </li>
                <li>
                  <button type="button" onClick={onOpenChatModal} className="hover:text-white cursor-pointer text-left">
                    Chat médico 24/7
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate?.('historial-consultas')} className="hover:text-white cursor-pointer text-left">
                    Historial de consultas
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate?.('mi-perfil')} className="hover:text-white cursor-pointer text-left">
                    Mi suscripción
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-white">Especialidades</span>
              <ul className="flex flex-col gap-2 text-[13px] text-slate-300">
                <li>Medicina General</li>
                <li>Pediatría</li>
                <li>Dermatología</li>
                <li>Psicología</li>
                <li>Nutrición</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-white">Cuenta</span>
              <ul className="flex flex-col gap-2 text-[13px] text-slate-300">
                <li>
                  <button type="button" onClick={() => onNavigate?.('home')} className="hover:text-white cursor-pointer text-left">
                    Inicio
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate?.('mi-perfil')} className="hover:text-white cursor-pointer text-left">
                    Datos personales
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate?.('mi-perfil')} className="hover:text-white cursor-pointer text-left">
                    Seguridad
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate?.('mi-perfil')} className="hover:text-white cursor-pointer text-left">
                    Facturación
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-white">Soporte</span>
              <ul className="flex flex-col gap-2 text-[13px] text-slate-300">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#f472b6]" />
                  <span>soporte@everhealth.es</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#f472b6]" />
                  <span>911 23 12 14</span>
                </li>
                <li className="pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white/10 text-[11px] font-semibold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    RGPD Certificado
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/10 text-white font-medium">
              <Globe className="w-3.5 h-3.5" />
              Español (ES)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/10 text-white font-medium">
              <Smartphone className="w-3.5 h-3.5" />
              iOS & Android
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span>Privacidad</span>
            <span>Términos legales</span>
            <span className="text-slate-500">© {new Date().getFullYear()} Ever Health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
