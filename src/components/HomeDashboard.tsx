import React from 'react';
import {
  Home as HomeIcon,
  Plus,
  ScanFace,
  FileText,
  FileSpreadsheet,
  Users,
  Cat,
  ChevronDown,
  PlusCircle,
  Bell,
  HelpCircle,
  Globe,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Video,
  MessageSquare,
} from 'lucide-react';

interface HomeDashboardProps {
  userName: string;
  onLogout: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ userName, onLogout }) => {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const welcomeIlluSrc = `${import.meta.env.BASE_URL}assets/welcome-illustration.png`;
  const doctorIlluSrc = `${import.meta.env.BASE_URL}assets/doctor-illustration.png`;
  const doctorsAvatarsSrc = `${import.meta.env.BASE_URL}assets/doctors-avatars.png`;

  const displayName = userName.trim() || 'Carlos Damián';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'CD';

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      {/* Sidebar (244px width, border-right #e2e8f0) */}
      <aside className="w-full lg:w-[244px] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#e2e8f0] p-[16px] flex flex-col shrink-0">
        {/* Brand Logo */}
        <div className="pt-[12px] pb-[24px] px-[4px]">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onLogout}
            title="Volver al Login"
            className="w-[178px] h-[20px] object-contain object-left cursor-pointer"
          />
        </div>

        {/* User Selector Dropdown */}
        <button
          type="button"
          onClick={onLogout}
          title="Cerrar sesión / Volver al inicio"
          className="w-full h-[40px] px-[10px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] flex items-center justify-between mb-[16px] cursor-pointer"
        >
          <div className="flex items-center gap-[8px] truncate">
            <span className="w-[24px] h-[24px] rounded-full bg-[#f1f5f9] text-black text-[12px] font-black flex items-center justify-center shrink-0">
              {initials}
            </span>
            <span className="text-[14px] leading-[20px] font-normal text-black truncate">
              {displayName}
            </span>
          </div>
          <ChevronDown className="w-[16px] h-[16px] text-[#475569] shrink-0" />
        </button>

        {/* Active Navigation Item: Inicio */}
        <nav className="flex flex-col gap-[8px]">
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] bg-[#f1f5f9] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <HomeIcon className="w-[18px] h-[18px] text-black" />
            <span>Inicio</span>
          </button>

          <hr className="border-[#e2e8f0] my-[4px]" />

          {/* Solicitar una cita button */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <Plus className="w-[18px] h-[18px] text-black" />
            <span>Solicitar una cita</span>
          </button>

          <hr className="border-[#e2e8f0] my-[4px]" />

          {/* Biometría facial */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <ScanFace className="w-[18px] h-[18px] text-black" />
            <span>Biometría facial</span>
          </button>

          <hr className="border-[#e2e8f0] my-[4px]" />

          {/* Historial consultas */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <FileText className="w-[18px] h-[18px] text-black" />
            <span>Historial consultas</span>
          </button>

          {/* Historia clínica */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <FileSpreadsheet className="w-[18px] h-[18px] text-black" />
            <span>Historia clínica</span>
          </button>

          <hr className="border-[#e2e8f0] my-[4px]" />

          {/* Familiares */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <Users className="w-[18px] h-[18px] text-black" />
            <span>Familiares</span>
          </button>

          {/* Mascotas */}
          <button
            type="button"
            className="w-full h-[40px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] flex items-center gap-[10px] text-[14px] leading-[20px] font-normal text-black"
          >
            <Cat className="w-[18px] h-[18px] text-black" />
            <span>Mascotas</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (height 48px) */}
        <header className="w-full h-[48px] px-6 lg:px-[53px] flex items-center justify-end">
          <div className="w-full max-w-[1200px] mx-auto flex items-center justify-end gap-[15px]">
            <button type="button" className="text-[#d50475] hover:opacity-80">
              <PlusCircle className="w-[22px] h-[22px]" />
            </button>
            <button type="button" className="text-black hover:opacity-75">
              <Bell className="w-[20px] h-[20px]" />
            </button>
            <button type="button" className="text-black hover:opacity-75">
              <HelpCircle className="w-[20px] h-[20px]" />
            </button>
            <button
              type="button"
              className="h-[32px] px-[10px] rounded-[6px] border border-[#cbd5e1] bg-white flex items-center gap-[8px] text-[14px] leading-[20px] font-bold text-black"
            >
              <Globe className="w-[18px] h-[18px]" />
              <span>ES</span>
            </button>
          </div>
        </header>

        {/* Body Content (max-w 1200px) */}
        <main className="flex-1 px-6 lg:px-[53px] pt-[24px] pb-[48px]">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[40px]">
            
            {/* Welcome Section Banner (1200 x 204, bg #f8fafc) */}
            <section className="w-full bg-[#f8fafc] rounded-[8px] p-6 lg:p-[40px] flex flex-col sm:flex-row items-center gap-[32px]">
              <img
                src={welcomeIlluSrc}
                alt="Carpeta médica"
                className="w-[237px] h-[124px] object-contain shrink-0"
              />
              <div className="flex flex-col gap-[6px]">
                <h1 className="text-[28px] sm:text-[36px] leading-[34px] sm:leading-[40px] font-black text-black">
                  Bienvenido {displayName}
                </h1>
                <p className="text-[18px] sm:text-[20px] leading-[28px] font-normal text-black max-w-[677px]">
                  Desde tu portal puedes solicitar consultas médicas por chat o video en tiempo real, revisar tu historial clínico y actualizar tu información médica.
                </p>
              </div>
            </section>

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-[40px] items-start">
              
              {/* Left Column: Actividad Reciente */}
              <section className="w-full border border-[#e2e8f0] rounded-[8px] p-[17px] bg-white flex flex-col">
                <div className="pb-[16px] border-b border-[#e2e8f0] mb-[16px]">
                  <h2 className="text-[24px] leading-[32px] font-bold text-black">
                    Actividad Reciente
                  </h2>
                </div>

                {/* Activity Items List */}
                <div className="flex flex-col divide-y divide-[#e2e8f0]">
                  {/* Item 1: En espera */}
                  <div className="py-[14px] first:pt-0 flex flex-col gap-[4px]">
                    <span className="text-[16px] leading-[24px] font-bold text-black">
                      Consulta general
                    </span>
                    <div className="flex items-center gap-[8px] text-[14px] leading-[20px] text-black">
                      <span>Dr. Pérez</span>
                      <span>Medicina general</span>
                    </div>
                    <div className="flex items-center justify-between pt-[4px]">
                      <div className="text-[14px] leading-[20px]">
                        <span className="text-[#475569]">Hoy, 16:00 hrs </span>
                        <span className="font-bold text-[#334155]">Video consulta</span>
                      </div>
                      <span className="h-[28px] px-[8px] rounded-[6px] border border-[#cbd5e1] text-[#15803d] text-[14px] leading-[20px] font-bold inline-flex items-center gap-[4px]">
                        En espera
                        <ChevronRight className="w-[16px] h-[16px]" />
                      </span>
                    </div>
                  </div>

                  {/* Item 2: Pendiente */}
                  <div className="py-[14px] flex flex-col gap-[4px]">
                    <span className="text-[16px] leading-[24px] font-bold text-black">
                      Consulta general
                    </span>
                    <div className="flex flex-wrap items-center gap-[8px] text-[14px] leading-[20px] text-black">
                      <span>Dra. Gómez</span>
                      <span>Pediatria</span>
                      <span className="px-[7px] py-[2px] rounded-[4px] border border-[#e2e8f0] text-[14px] leading-[20px]">
                        Hijo(a) <strong className="font-black">Anna Torres</strong>
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-[4px]">
                      <div className="text-[14px] leading-[20px]">
                        <span className="text-[#475569]">Mañana, 16:00 hrs </span>
                        <span className="font-bold text-[#334155]">Chat</span>
                      </div>
                      <span className="h-[28px] px-[8px] rounded-[6px] border border-[#cbd5e1] text-[#334155] text-[14px] leading-[20px] font-bold inline-flex items-center">
                        Pendiente
                      </span>
                    </div>
                  </div>

                  {/* Item 3: Cancelada */}
                  <div className="py-[14px] flex flex-col gap-[4px]">
                    <span className="text-[16px] leading-[24px] font-bold text-black">
                      Consulta general
                    </span>
                    <div className="flex items-center gap-[8px] text-[14px] leading-[20px] text-black">
                      <span>Dr. Pérez</span>
                      <span>Medicina general</span>
                    </div>
                    <div className="flex items-center justify-between pt-[4px]">
                      <div className="text-[14px] leading-[20px]">
                        <span className="text-[#475569]">20 de septiembre </span>
                        <span className="font-bold text-[#334155]">Video consulta</span>
                      </div>
                      <span className="h-[28px] px-[8px] rounded-[6px] border border-[#cbd5e1] text-[#b91c1c] text-[14px] leading-[20px] font-bold inline-flex items-center">
                        Cancelada
                      </span>
                    </div>
                  </div>

                  {/* Items 4, 5, 6: Finalizada */}
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="py-[14px] flex flex-col gap-[4px]">
                      <span className="text-[16px] leading-[24px] font-bold text-black">
                        Consulta general
                      </span>
                      <div className="flex items-center gap-[8px] text-[14px] leading-[20px] text-black">
                        <span>Dr. Pérez</span>
                        <span>Medicina general</span>
                      </div>
                      <div className="flex items-center justify-between pt-[4px]">
                        <div className="text-[14px] leading-[20px]">
                          <span className="text-[#475569]">Hoy, 16:00 hrs </span>
                          <span className="font-bold text-[#334155]">Video consulta</span>
                        </div>
                        <span className="h-[28px] px-[8px] rounded-[6px] border border-[#cbd5e1] text-[#64748b] text-[14px] leading-[20px] font-bold inline-flex items-center">
                          Finalizada
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Pagination */}
                <div className="pt-[16px] border-t border-[#e2e8f0] mt-[8px] flex items-center justify-between">
                  <button
                    type="button"
                    className="text-[14px] leading-[20px] font-bold text-[#d50475] hover:underline uppercase"
                  >
                    VER HISTORIAL
                  </button>
                  <div className="inline-flex items-center rounded-[6px] border border-[#e2e8f0] overflow-hidden text-[14px] leading-[20px] text-[#64748b]">
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
                      <ChevronsLeft className="w-[14px] h-[14px]" />
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
                      <ChevronLeft className="w-[14px] h-[14px]" />
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center font-bold text-black bg-[#f8fafc] border-r border-[#e2e8f0]">
                      1
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
                      2
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
                      4
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
                      5
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
                      <ChevronRight className="w-[14px] h-[14px]" />
                    </button>
                    <button type="button" className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#f8fafc]">
                      <ChevronsRight className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Right Column: Atención inmediata + Mejora tu experiencia */}
              <div className="flex flex-col gap-[40px]">
                
                {/* Card 1: Atención inmediata */}
                <section className="w-full border border-[#e2e8f0] rounded-[8px] p-[16px] bg-white flex flex-col">
                  <div className="pb-[16px] border-b border-[#e2e8f0] flex items-center justify-between gap-2">
                    <h2 className="text-[24px] leading-[32px] font-bold text-black">
                      Atención inmediata
                    </h2>
                    <span className="h-[30px] px-[9px] rounded-[6px] border border-[#cbd5e1] text-[#15803d] text-[14px] leading-[20px] font-bold inline-flex items-center shrink-0">
                      Hay médicos disponibles
                    </span>
                  </div>

                  <div className="py-[24px] flex items-center justify-between gap-4">
                    <p className="text-[16px] leading-[24px] text-black max-w-[360px]">
                      Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento
                    </p>
                    <img
                      src={doctorsAvatarsSrc}
                      alt="Doctores disponibles"
                      className="w-[136px] h-[40px] object-contain shrink-0"
                    />
                  </div>

                  <div className="flex flex-col gap-[12px]">
                    <span className="text-[14px] leading-[20px] font-black text-[#475569] uppercase">
                      SOLICITA
                    </span>
                    <div className="flex flex-wrap items-center gap-[12px]">
                      <button
                        type="button"
                        className="h-[30px] px-[12px] rounded-[6px] border border-[#cbd5e1] hover:border-[#d50475] text-[#d50475] text-[14px] leading-[20px] font-bold inline-flex items-center gap-[8px] transition-colors"
                      >
                        <Video className="w-[16px] h-[16px]" />
                        <span>VIDEO CONSULTA</span>
                      </button>
                      <button
                        type="button"
                        className="h-[30px] px-[12px] rounded-[6px] border border-[#cbd5e1] hover:border-[#d50475] text-[#d50475] text-[14px] leading-[20px] font-bold inline-flex items-center gap-[8px] transition-colors"
                      >
                        <MessageSquare className="w-[16px] h-[16px]" />
                        <span>CHAT</span>
                      </button>
                      <button
                        type="button"
                        className="h-[30px] px-[12px] rounded-[6px] border border-[#cbd5e1] hover:border-[#d50475] text-[#d50475] text-[14px] leading-[20px] font-bold inline-flex items-center gap-[8px] transition-colors"
                      >
                        <ScanFace className="w-[16px] h-[16px]" />
                        <span>BIOMETRÍA FACIAL</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Card 2: Mejora tu experiencia */}
                <section className="w-full border border-[#e2e8f0] rounded-[8px] p-[16px] bg-white flex flex-col">
                  <div className="pb-[16px] border-b border-[#e2e8f0] flex items-center justify-between">
                    <h2 className="text-[24px] leading-[32px] font-bold text-black">
                      Mejora tu experiencia
                    </h2>
                    <span className="h-[28px] px-[8px] rounded-[6px] border border-[#cbd5e1] text-[#334155] text-[14px] leading-[20px] font-bold inline-flex items-center">
                      10%
                    </span>
                  </div>

                  <p className="text-[16px] leading-[24px] text-black py-[24px]">
                    Ayúdanos a cuidarte mejor. Antes de hablar con un médico, necesitamos conocer tu historial básico para que tu atención sea personalizada desde el primer segundo
                  </p>

                  <div className="mb-[24px]">
                    <button
                      type="button"
                      className="h-[36px] px-[16px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] leading-[20px] font-bold transition-colors"
                    >
                      Completar cuestionario médico
                    </button>
                  </div>

                  <div className="w-full h-[299px] bg-[#f8fafc] rounded-[6px] overflow-hidden flex items-end justify-center">
                    <img
                      src={doctorIlluSrc}
                      alt="Ilustración médico"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </section>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
