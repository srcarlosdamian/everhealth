import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  MessageSquare,
  CalendarClock,
  ChevronDown,
  ArrowRight,
  Clock,
  Sparkles,
  FileText,
  UserCheck,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { V2View } from './V2Header';

interface V2HomeProps {
  userName: string;
  onNavigate: (view: V2View) => void;
  onOpenChatModal: () => void;
  onOpenVideoModal: () => void;
}

const UPCOMING_CONSULTATIONS = [
  {
    id: '1',
    time: 'Hoy · 16:00',
    badge: 'En 10 min',
    badgeType: 'active' as const,
    title: 'Videoconsulta · En espera',
    doctor: 'Dr. Bruno Peñas',
    specialty: 'Medicina General',
    type: 'video' as const,
  },
  {
    id: '2',
    time: 'Mañana · 11:30',
    badge: 'Confirmada',
    badgeType: 'scheduled' as const,
    title: 'Consulta dermatológica',
    doctor: 'Dra. Carmen Morales',
    specialty: 'Dermatología',
    type: 'video' as const,
  },
  {
    id: '3',
    time: 'Jue 17 · 18:00',
    badge: 'Programada',
    badgeType: 'scheduled' as const,
    title: 'Seguimiento nutricional',
    doctor: 'Dra. Elena Ruiz',
    specialty: 'Nutrición',
    type: 'chat' as const,
  },
];

export const V2Home: React.FC<V2HomeProps> = ({
  userName,
  onNavigate,
  onOpenChatModal,
  onOpenVideoModal,
}) => {
  const [heroDropdownOpen, setHeroDropdownOpen] = useState(false);
  const heroDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (heroDropdownRef.current && !heroDropdownRef.current.contains(e.target as Node)) {
        setHeroDropdownOpen(false);
      }
    };
    if (heroDropdownOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [heroDropdownOpen]);

  const firstName = userName.split(' ')[0] || 'Alejandro';

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-10">
      {/* Hero Banner with Gradient */}
      <section className="v2-gradient-hero rounded-[24px] p-6 sm:p-10 lg:p-12 text-white shadow-[0_20px_50px_rgba(11,28,52,0.14)] relative overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[12px] font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Tu espacio de salud personal
            </span>
            <h1 className="text-[32px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight">
              Hola, {firstName}.{' '}
              <span className="v2-serif italic font-normal text-white/95">
                ¿Cómo te sientes hoy?
              </span>
            </h1>
            <p className="text-[15px] sm:text-[16px] text-white/90 max-w-[540px] leading-relaxed">
              Agenda una videoconsulta con especialistas o inicia un chat médico en segundos. Todo tu seguimiento queda guardado en tu historial.
            </p>

            {/* Primary CTA Row with Solicitar consulta Dropdown */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="relative" ref={heroDropdownRef}>
                <button
                  type="button"
                  onClick={() => setHeroDropdownOpen((v) => !v)}
                  className="h-[48px] px-6 rounded-[12px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[14px] font-bold flex items-center gap-2.5 shadow-lg transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#f472b6]" />
                  <span>Solicitar consulta</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${heroDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {heroDropdownOpen && (
                  <div className="absolute left-0 mt-2.5 w-[300px] bg-white text-[#0b1c34] rounded-[18px] shadow-[0_20px_50px_rgba(11,28,52,0.22)] border border-[#e2e8f0] p-2 z-30">
                    <button
                      type="button"
                      onClick={() => {
                        setHeroDropdownOpen(false);
                        onOpenVideoModal();
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-[12px] hover:bg-[#f8f8f7] text-left cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-[10px] bg-[#fdf2f8] text-[#d50475] flex items-center justify-center shrink-0">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold">Videoconsulta</div>
                        <div className="text-[12px] text-[#64748b]">Cita programada por especialidad</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHeroDropdownOpen(false);
                        onOpenChatModal();
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-[12px] hover:bg-[#f8f8f7] text-left cursor-pointer mt-1"
                    >
                      <div className="w-10 h-10 rounded-[10px] bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold">Chat médico</div>
                        <div className="text-[12px] text-[#64748b]">Atención inmediata o agendada</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onNavigate('historial')}
                className="h-[48px] px-6 rounded-[12px] bg-white/95 hover:bg-white text-[#0b1c34] text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Ver historial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Highlight Card inside Hero */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md text-[#0b1c34] rounded-[20px] p-6 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2f8] text-[#d50475] text-[12px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#d50475] animate-pulse" />
                  Próxima cita
                </span>
                <span className="text-[12px] font-semibold text-[#64748b]">Hoy · 16:00 h</span>
              </div>

              <div>
                <h3 className="text-[18px] font-extrabold text-[#0b1c34]">
                  Videoconsulta · Medicina General
                </h3>
                <p className="text-[13px] text-[#475569] mt-0.5">
                  Dr. Bruno Peñas · Sala lista en 10 minutos
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenVideoModal}
                className="w-full h-[46px] rounded-[12px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Gestionar videoconsulta</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button
          type="button"
          onClick={onOpenVideoModal}
          className="bg-white rounded-[20px] p-6 border border-[#e2e8f0] hover:border-[#d50475] hover:shadow-[0_12px_32px_rgba(11,28,52,0.08)] transition-all text-left flex flex-col gap-4 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#fdf2f8] text-[#d50475] flex items-center justify-center group-hover:bg-[#d50475] group-hover:text-white transition-colors">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[18px] font-extrabold text-[#0b1c34]">Solicitar videoconsulta</h3>
            <p className="text-[14px] text-[#475569] mt-1 leading-relaxed">
              Elige especialidad, día y horario para recibir atención médica por video con recetas.
            </p>
          </div>
          <span className="text-[13px] font-bold text-[#d50475] inline-flex items-center gap-1 mt-auto">
            Agendar ahora <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenChatModal}
          className="bg-white rounded-[20px] p-6 border border-[#e2e8f0] hover:border-[#2563eb] hover:shadow-[0_12px_32px_rgba(11,28,52,0.08)] transition-all text-left flex flex-col gap-4 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#eff6ff] text-[#2563eb] flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[18px] font-extrabold text-[#0b1c34]">Solicitar chat médico</h3>
            <p className="text-[14px] text-[#475569] mt-1 leading-relaxed">
              Resuelve dudas médicas puntuales al instante o programa una conversación escrita.
            </p>
          </div>
          <span className="text-[13px] font-bold text-[#2563eb] inline-flex items-center gap-1 mt-auto">
            Iniciar chat <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('perfil')}
          className="bg-white rounded-[20px] p-6 border border-[#e2e8f0] hover:border-[#0b1c34] hover:shadow-[0_12px_32px_rgba(11,28,52,0.08)] transition-all text-left flex flex-col gap-4 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#f1f5f9] text-[#0b1c34] flex items-center justify-center group-hover:bg-[#0b1c34] group-hover:text-white transition-colors">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[18px] font-extrabold text-[#0b1c34]">Configuración y perfil</h3>
            <p className="text-[14px] text-[#475569] mt-1 leading-relaxed">
              Actualiza tus datos personales, seguridad de acceso y detalles de tu suscripción.
            </p>
          </div>
          <span className="text-[13px] font-bold text-[#0b1c34] inline-flex items-center gap-1 mt-auto">
            Ir a mi perfil <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </section>

      {/* Upcoming Consultations */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[24px] font-extrabold text-[#0b1c34] tracking-tight">
              Próximas consultas
            </h2>
            <p className="text-[14px] text-[#475569]">
              Resumen de tus citas programadas y accesos disponibles
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('historial')}
            className="h-[42px] px-4 rounded-[10px] bg-white border border-[#cbd5e1] hover:border-[#0b1c34] text-[13px] font-bold text-[#0b1c34] inline-flex items-center gap-2 transition-colors cursor-pointer w-fit"
          >
            <FileText className="w-4 h-4" />
            <span>Historial completo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {UPCOMING_CONSULTATIONS.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[20px] p-6 border border-[#e2e8f0] flex flex-col justify-between gap-5 shadow-xs"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#475569]">
                    <Clock className="w-3.5 h-3.5 text-[#0b1c34]" />
                    {c.time}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      c.badgeType === 'active'
                        ? 'bg-[#fdf2f8] text-[#d50475]'
                        : 'bg-[#f1f5f9] text-[#475569]'
                    }`}
                  >
                    {c.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-[17px] font-extrabold text-[#0b1c34]">{c.title}</h3>
                  <p className="text-[13px] text-[#475569] mt-1">
                    {c.doctor} · {c.specialty}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={c.type === 'video' ? onOpenVideoModal : onOpenChatModal}
                className={`w-full h-[44px] rounded-[12px] text-[13px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  c.badgeType === 'active'
                    ? 'bg-[#d50475] hover:bg-[#b80364] text-white'
                    : 'bg-[#f8f8f7] hover:bg-[#e2e8f0] text-[#0b1c34]'
                }`}
              >
                <CalendarClock className="w-4 h-4" />
                <span>{c.badgeType === 'active' ? 'Entrar a la sala' : 'Ver detalles'}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Feature Banner (Inspired by reference screenshot 1 & 4) */}
      <section className="v2-gradient-soft rounded-[24px] p-6 sm:p-10 border border-[#e2e8f0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col gap-3">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#2563eb]">
            <ShieldCheck className="w-4 h-4" />
            Atención médica sin fricción
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0b1c34] leading-tight">
            <span className="v2-serif italic font-normal text-[#d50475]">“</span>
            Más tiempo contigo, menos trámites en tu día a día.
            <span className="v2-serif italic font-normal text-[#d50475]">”</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#475569] leading-relaxed max-w-[540px]">
            Todos nuestros especialistas están colegiados y tus informes médicos quedan disponibles de forma cifrada en tu perfil.
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap gap-4 justify-start lg:justify-end">
          <div className="bg-white rounded-[18px] p-5 border border-[#e2e8f0] flex-1 min-w-[140px]">
            <div className="text-[28px] font-extrabold text-[#0b1c34]">24/7</div>
            <div className="text-[12px] font-semibold text-[#475569] mt-1">
              Disponibilidad médica continua
            </div>
          </div>
          <div className="bg-white rounded-[18px] p-5 border border-[#e2e8f0] flex-1 min-w-[140px]">
            <div className="text-[28px] font-extrabold text-[#d50475]">&lt; 15m</div>
            <div className="text-[12px] font-semibold text-[#475569] mt-1">
              Tiempo medio de atención
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
