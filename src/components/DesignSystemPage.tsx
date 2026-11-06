import React, { useState } from 'react';
import {
  ArrowLeft,
  Palette,
  Layers,
  Component,
  Layout,
  Sparkles,
  Check,
  Video,
  MessageSquare,
  ScanFace,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Home,
  FileText,
  FileSpreadsheet,
  Users,
  Cat,
  Calendar,
  FileUp,
  Search,
  Star,
  Bell,
  HelpCircle,
  PlusCircle,
  SlidersHorizontal,
  LogOut,
  Mail,
  Phone,
  X,
  Globe,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';
import { ProgressCheckCircle } from '../design-system/atoms/ProgressCheckCircle';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';
import { CompletionMedalIllustration } from '../design-system/atoms/CompletionMedalIllustration';

interface DesignSystemPageProps {
  onBackToHome: () => void;
}

const ICONS_CATALOG = [
  { name: 'lucide/scan-face', icon: ScanFace, label: 'Escaneo biométrico / Biometría', category: 'Biometría & Acciones' },
  { name: 'lucide/home', icon: Home, label: 'Inicio', category: 'Navegación' },
  { name: 'lucide/plus', icon: Plus, label: 'Solicitar una cita', category: 'Navegación' },
  { name: 'lucide/file-text', icon: FileText, label: 'Historial consultas', category: 'Navegación' },
  { name: 'lucide/file-spreadsheet', icon: FileSpreadsheet, label: 'Historia clínica', category: 'Navegación' },
  { name: 'lucide/users', icon: Users, label: 'Familiares', category: 'Navegación' },
  { name: 'lucide/cat', icon: Cat, label: 'Mascotas', category: 'Navegación' },
  { name: 'lucide/sliders-horizontal', icon: SlidersHorizontal, label: 'Configuración de usuario', category: 'Usuario & Perfil' },
  { name: 'lucide/log-out', icon: LogOut, label: 'Cerrar sesión', category: 'Usuario & Perfil' },
  { name: 'lucide/video', icon: Video, label: 'Video consulta', category: 'Acciones' },
  { name: 'lucide/message-square', icon: MessageSquare, label: 'Chat médico', category: 'Acciones' },
  { name: 'lucide/calendar', icon: Calendar, label: 'Calendario y citas', category: 'Acciones' },
  { name: 'lucide/check', icon: Check, label: 'Check 900 de progreso', category: 'Acciones' },
  { name: 'lucide/file-up', icon: FileUp, label: 'Subir documentos', category: 'Acciones' },
  { name: 'lucide/search', icon: Search, label: 'Buscador de documentos', category: 'Acciones' },
  { name: 'lucide/star', icon: Star, label: 'Médicos favoritos', category: 'Acciones' },
  { name: 'lucide/palette', icon: Palette, label: 'Sistema de diseño', category: 'Header & Sistema' },
  { name: 'lucide/globe', icon: Globe, label: 'Selector de idioma', category: 'Header & Sistema' },
  { name: 'lucide/bell', icon: Bell, label: 'Notificaciones', category: 'Header & Sistema' },
  { name: 'lucide/help-circle', icon: HelpCircle, label: 'Ayuda', category: 'Header & Sistema' },
  { name: 'lucide/plus-circle', icon: PlusCircle, label: 'Acceso rápido documentos', category: 'Header & Sistema' },
  { name: 'lucide/chevron-right', icon: ChevronRight, label: 'Navegación siguiente', category: 'Direccionales' },
  { name: 'lucide/chevron-down', icon: ChevronDown, label: 'Cargar más / Desplegable', category: 'Direccionales' },
  { name: 'lucide/chevron-up', icon: ChevronUp, label: 'Mostrar menos / Contraer', category: 'Direccionales' },
  { name: 'lucide/arrow-left', icon: ArrowLeft, label: 'Volver atrás', category: 'Direccionales' },
  { name: 'lucide/x', icon: X, label: 'Cerrar modal', category: 'Direccionales' },
];

export const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState<'tokens' | 'atomos' | 'moleculas' | 'organismos' | 'iconos'>('tokens');
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [demoToggle, setDemoToggle] = useState('si');

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;
  const doctorAvatar1 = `${import.meta.env.BASE_URL}assets/doctor-avatar-1.png`;
  const doctorAvatar2 = `${import.meta.env.BASE_URL}assets/doctor-avatar-2.png`;
  const doctorAvatar3 = `${import.meta.env.BASE_URL}assets/doctor-avatar-3.png`;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      {/* Sidebar - Navegación idéntica en estructura y ancho (244px) al Home */}
      <aside className="w-full lg:w-[244px] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#e2e8f0] p-[16px] flex flex-col shrink-0 bg-white">
        {/* Brand Logo - 40px height */}
        <div className="pt-[12px] pb-[20px] px-[4px]">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBackToHome}
            title="Volver al Inicio"
            className="h-[40px] w-auto object-contain object-left cursor-pointer"
          />
        </div>

        {/* Botón Volver a la App */}
        <button
          type="button"
          onClick={onBackToHome}
          className="w-full h-[40px] px-[12px] rounded-[8px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] flex items-center justify-between mb-[16px] text-[13px] font-bold text-black transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-[8px]">
            <ArrowLeft className="w-[16px] h-[16px] text-black" />
            <span>Volver a Inicio</span>
          </div>
          <span className="text-[11px] text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">App</span>
        </button>

        {/* Categoría / Encabezado */}
        <div className="px-2 py-1 text-[11px] font-bold tracking-wider uppercase text-[#64748b]">
          Sistema de Diseño
        </div>

        {/* Navigation Sections */}
        <nav className="flex flex-col gap-[6px] mt-2">
          <button
            type="button"
            onClick={() => setActiveSection('tokens')}
            className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
              activeSection === 'tokens'
                ? 'bg-[#f1f5f9] text-black font-bold'
                : 'text-black hover:bg-[#f8fafc] font-normal'
            }`}
          >
            <Palette className="w-[18px] h-[18px] text-black" />
            <span>1. Tokens & Color</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('atomos')}
            className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
              activeSection === 'atomos'
                ? 'bg-[#f1f5f9] text-black font-bold'
                : 'text-black hover:bg-[#f8fafc] font-normal'
            }`}
          >
            <Layers className="w-[18px] h-[18px] text-black" />
            <span>2. Átomos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('moleculas')}
            className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
              activeSection === 'moleculas'
                ? 'bg-[#f1f5f9] text-black font-bold'
                : 'text-black hover:bg-[#f8fafc] font-normal'
            }`}
          >
            <Component className="w-[18px] h-[18px] text-black" />
            <span>3. Moléculas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('organismos')}
            className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
              activeSection === 'organismos'
                ? 'bg-[#f1f5f9] text-black font-bold'
                : 'text-black hover:bg-[#f8fafc] font-normal'
            }`}
          >
            <Layout className="w-[18px] h-[18px] text-black" />
            <span>4. Organismos</span>
          </button>

          <hr className="border-[#e2e8f0] my-[6px]" />

          <button
            type="button"
            onClick={() => setActiveSection('iconos')}
            className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
              activeSection === 'iconos'
                ? 'bg-[#f1f5f9] text-black font-bold'
                : 'text-black hover:bg-[#f8fafc] font-normal'
            }`}
          >
            <Sparkles className="w-[18px] h-[18px] text-black" />
            <span>5. Íconos Lucide</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="w-full h-[56px] px-4 sm:px-8 flex items-center justify-center border-b border-[#f1f5f9] lg:border-b-0">
          <div className="w-full max-w-[800px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-black">Ever Health Design System</span>
              <span className="text-[#cbd5e1]">/</span>
              <span className="text-[14px] text-[#64748b] capitalize">{activeSection}</span>
            </div>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-[13px] font-bold text-black hover:text-[#d50475] transition-colors cursor-pointer"
            >
              Cerrar página
            </button>
          </div>
        </header>

        {/* Body Content - Exactamente centrado con max-w-[800px] igual que el Home */}
        <main className="flex-1 px-4 sm:px-8 pt-[24px] pb-[48px] flex justify-center items-start">
          <div className="w-full max-w-[800px] mx-auto flex flex-col gap-[24px]">

            {/* SECCIÓN 1: TOKENS DE COLOR & FUENTE */}
            {activeSection === 'tokens' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[28px] font-bold text-black">Tokens de Color & Tipografía</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Valores extraídos con precisión desde los componentes oficiales de Figma (`nodeId: 202:3` y `415:2732`).
                  </p>
                </div>

                {/* Tipografía Helvetica Estricta */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-3">
                  <h2 className="text-[18px] font-bold text-black">Tipografía Oficial</h2>
                  <p className="text-[14px] text-[#475569] leading-relaxed">
                    Familia tipográfica: <strong className="text-black">Helvetica</strong> (estrictamente Helvetica sin fuentes externas ni fallbacks).
                  </p>
                  <div className="p-4 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] font-[family-name:Helvetica] text-black">
                    <p className="text-[20px] font-bold">Helvetica Bold 700 - Títulos, Botones y Acciones</p>
                    <p className="text-[14px] font-normal mt-1">Helvetica Regular 400 - Párrafos, descripciones y textos secundarios.</p>
                  </div>
                </div>

                {/* Pink 50 - 900 */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Gama Pink (Figma Tokens)</h2>
                    <p className="text-[12px] text-[#64748b]">Incluye el rosa marca `#d50475` y el rosa oscuro `#831843` (check 900).</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {[
                      { shade: '50', hex: '#fdf2f8' },
                      { shade: '100', hex: '#fce7f3' },
                      { shade: '200', hex: '#fbcfe8' },
                      { shade: '300', hex: '#f9a8d4' },
                      { shade: '400', hex: '#f472b6' },
                      { shade: '500', hex: '#ec4899' },
                      { shade: '600', hex: '#db2777' },
                      { shade: '700', hex: '#be185d' },
                      { shade: 'Brand CTA', hex: '#d50475' },
                      { shade: '800', hex: '#9d174d' },
                      { shade: '900 Check', hex: '#831843' },
                    ].map((item) => (
                      <div key={item.shade} className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc]">
                        <div className="w-full h-10 rounded-[4px]" style={{ backgroundColor: item.hex }} />
                        <span className="text-[12px] font-bold text-black">{item.shade}</span>
                        <span className="text-[10px] font-mono text-[#64748b]">{item.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BlueGray 50 - 900 */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Gama Neutra: BlueGray</h2>
                    <p className="text-[12px] text-[#64748b]">Bordes (`#e2e8f0`), inputs (`#cbd5e1`) y textos secundarios (`#64748b`).</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { shade: '50', hex: '#f8fafc' },
                      { shade: '100', hex: '#f1f5f9' },
                      { shade: '200 (Bordes)', hex: '#e2e8f0' },
                      { shade: '300 (Inputs)', hex: '#cbd5e1' },
                      { shade: '400', hex: '#94a3b8' },
                      { shade: '500 (Textos)', hex: '#64748b' },
                      { shade: '600', hex: '#475569' },
                      { shade: '700', hex: '#334155' },
                      { shade: '800', hex: '#1e293b' },
                      { shade: '900', hex: '#0f172a' },
                    ].map((item) => (
                      <div key={item.shade} className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#e2e8f0] bg-white">
                        <div className="w-full h-8 rounded-[4px]" style={{ backgroundColor: item.hex }} />
                        <span className="text-[11px] font-bold text-black">{item.shade}</span>
                        <span className="text-[10px] font-mono text-[#64748b]">{item.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 2: ÁTOMOS */}
            {activeSection === 'atomos' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[28px] font-bold text-black">Átomos del Sistema</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Componentes atómicos indivisibles: Badges oficiales, Toggles segmentados, Anillos de progreso, Botones e Inputs.
                  </p>
                </div>

                {/* 1. Badges oficiales de Figma */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Badges & Etiquetas</h2>
                    <p className="text-[13px] text-[#64748b]">
                      Estados clínicos y disponibilidad homologados: sin fondo de relleno (`bg-transparent`), borde gris claro (`border-[#cbd5e1]`) y tipografía bold homogénea.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="disponible" showDot>Disponible</Badge>
                    <Badge variant="en-espera">En espera</Badge>
                    <Badge variant="confirmada">Confirmada</Badge>
                    <Badge variant="programada">Programada</Badge>
                    <Badge variant="limitada" showDot>Tiempo limitado</Badge>
                    <Badge variant="no-disponible" showDot>No disponible</Badge>
                    <span className="px-3 py-1 rounded-[6px] bg-[#fef9c3] text-[12px] font-medium text-[#854d0e] border-0 inline-flex items-center gap-1.5">
                      <span>Error de conexión... reintentando</span>
                    </span>
                    <span className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[14px] leading-[20px] font-bold uppercase inline-flex items-center justify-center">
                      ACTIVO 15 MINUTOS ANTES
                    </span>
                  </div>
                </div>

                {/* 2. Segmented Toggle (Sí / No) */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Segmented Toggle (Sí / No)</h2>
                    <p className="text-[13px] text-[#64748b]">Campo estilo píldora segmentada con fondo gris claro y selector activo blanco con elevación sutil.</p>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <SegmentedToggle
                      value={demoToggle}
                      onChange={(v) => setDemoToggle(v)}
                    />
                    <span className="text-[14px] text-black">
                      Valor seleccionado: <strong className="uppercase font-bold">{demoToggle}</strong>
                    </span>
                  </div>
                </div>

                {/* 3. Anillos de Progreso y Check Neutral */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Progress Check Circle (Anillos de Progreso)</h2>
                    <p className="text-[13px] text-[#64748b]">Indicadores circulares SVG: trazo gris con arco negro en progreso y check neutral al completarse.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="flex items-center gap-2">
                      <ProgressCheckCircle progress={25} size={24} />
                      <span className="text-[13px] text-black">25% (Inicio)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressCheckCircle progress={50} size={24} />
                      <span className="text-[13px] text-black">50% (Medio)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressCheckCircle progress={80} size={24} />
                      <span className="text-[13px] text-black">80% (Avanzado)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressCheckCircle isCompleted size={24} />
                      <span className="text-[13px] font-bold text-black">Completado (Check)</span>
                    </div>
                  </div>
                </div>

                {/* 4. Botones Oficiales Figma */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Botones Estándar Figma (`px-[12px] py-[4px]`, Mayúsculas)</h2>
                    <p className="text-[13px] text-[#64748b]">Altura estándar compacta de 28-30px, texto 14px en mayúsculas, iconos Lucide de 20px.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="px-[12px] py-[4px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] leading-[20px] font-bold uppercase flex items-center gap-[8px] shadow-xs cursor-pointer">
                      <Plus className="w-[20px] h-[20px] text-white" />
                      <span>SOLICITA UNA CITA</span>
                    </button>
                    <button className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#d50475] bg-transparent text-[#d50475] text-[14px] leading-[20px] font-bold uppercase flex items-center gap-[8px] cursor-pointer">
                      <ScanFace className="w-[20px] h-[20px] text-[#d50475]" />
                      <span>INICIAR ESCANEO</span>
                    </button>
                    <button className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-transparent text-black text-[14px] leading-[20px] font-bold uppercase flex items-center gap-[8px] cursor-pointer">
                      <span>COMPLETA TU PERFIL MÉDICO</span>
                      <ChevronRight className="w-[18px] h-[18px] text-black" />
                    </button>
                    <span className="px-[12px] py-[4px] rounded-[8px] border border-[#cbd5e1] bg-transparent text-[#94a3b8] text-[14px] leading-[20px] font-bold uppercase">
                      INACTIVO
                    </span>
                    <button className="text-[13px] font-bold text-black hover:underline cursor-pointer">
                      Cargar más
                    </button>
                  </div>
                </div>

                {/* 5. Stepper Checks 900 */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <h2 className="text-[18px] font-bold text-black">Stepper con Check Pink 900 (`#831843`)</h2>
                  <p className="text-[13px] text-[#64748b]">
                    Indicador con línea continua que se chequea cuando los campos están completados.
                  </p>
                  <div className="flex items-center gap-6 p-4 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="flex flex-col items-center">
                      <div className="w-[26px] h-[26px] rounded-full bg-[#831843] text-white flex items-center justify-center">
                        <Check className="w-[14px] h-[14px] stroke-[3]" />
                      </div>
                      <div className="w-[2px] h-[30px] bg-[#e2e8f0]" />
                      <div className="w-[26px] h-[26px] rounded-full bg-[#831843] text-white flex items-center justify-center">
                        <Check className="w-[14px] h-[14px] stroke-[3]" />
                      </div>
                      <div className="w-[2px] h-[30px] bg-[#e2e8f0]" />
                      <div className="w-[26px] h-[26px] rounded-full border-2 border-[#cbd5e1] bg-white" />
                    </div>
                    <div className="flex flex-col justify-between h-[116px] text-[13px]">
                      <div>
                        <strong className="text-black">Paso 1: Motivo</strong>
                        <p className="text-[#64748b]">Completado (Check Pink 900)</p>
                      </div>
                      <div>
                        <strong className="text-black">Paso 2: Especialidad</strong>
                        <p className="text-[#64748b]">Completado (Check Pink 900)</p>
                      </div>
                      <div>
                        <strong className="text-black">Paso 3: Horario</strong>
                        <p className="text-[#64748b]">Pendiente (Círculo sin checkear)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 3: MOLÉCULAS */}
            {activeSection === 'moleculas' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[28px] font-bold text-black">Moléculas</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Combinaciones funcionales de átomos: Fila de médicos disponibles, tarjetas de doctor con borde, etc.
                  </p>
                </div>

                {/* Molécula: Fila de Médicos disponibles con 3 Avatars Overlapping */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <h2 className="text-[18px] font-bold text-black">Fila de Médicos Disponibles & Espera</h2>
                  <div className="flex items-center gap-[12px] p-2 bg-transparent rounded-none">
                    <div className="flex items-center shrink-0">
                      <img
                        src={doctorAvatar1}
                        alt="Doctor 1"
                        className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-10 shrink-0 border-2 border-white"
                      />
                      <img
                        src={doctorAvatar2}
                        alt="Doctor 2"
                        className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-20 shrink-0 border-2 border-white"
                      />
                      <img
                        src={doctorAvatar3}
                        alt="Doctor 3"
                        className="w-[40px] h-[40px] rounded-full object-cover relative z-30 shrink-0 border-2 border-white"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[12px] leading-[16px] font-bold text-black">
                        Hay médicos disponibles
                      </p>
                      <p className="text-[12px] leading-[16px] font-normal text-black">
                        Tiempo de espera estimado 12 min
                      </p>
                    </div>
                  </div>
                </div>

                {/* Molécula: Tarjeta de Médico con Borde */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <h2 className="text-[18px] font-bold text-black">Tarjeta de Médico Asignado (Con borde #e2e8f0)</h2>
                  <div className="border-2 border-[#e2e8f0] rounded-[8px] p-4 bg-white flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[48px] h-[48px] rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-black text-[14px]">
                        MF
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-black">Dr. Marcos Flores</span>
                        <span className="text-[13px] text-[#64748b]">Medicina General · Urgencias</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-[6px] bg-[#fdf2f8] text-[#d50475] text-[12px] font-bold">
                      Disponible ahora
                    </span>
                  </div>
                </div>

                {/* Molécula: NavigationFooter (Componente de navegación estandarizado) */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Barra de Navegación (`NavigationFooter`)</h2>
                    <p className="text-[13px] text-[#64748b]">Componente reutilizable en Onboarding, Cuestionario y Documentos. Superficie #f8fafc con botones en minúsculas/normales (Atrás outline blanco y Continuar rosa).</p>
                  </div>
                  <NavigationFooter
                    onBack={() => {}}
                    onNext={() => {}}
                    backText="Atrás"
                    nextText="Continuar"
                  />
                </div>

                {/* Molécula: Ilustración de Finalización / Medalla con Podio */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4 items-center">
                  <div className="w-full">
                    <h2 className="text-[18px] font-bold text-black">Ilustración de Cuestionario Completado (EVR - 116 / 118)</h2>
                    <p className="text-[13px] text-[#64748b]">Medalla circular con check rosa sobre podio lineal.</p>
                  </div>
                  <CompletionMedalIllustration size={160} />
                </div>

                {/* Molécula: Catálogo de Dropdowns y Menús Desplegables */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">Catálogo de Dropdowns (Sin bordes grises, con sombra flotante)</h2>
                    <p className="text-[13px] text-[#64748b]">Menús desplegables con sombra suave `shadow-[0_12px_32px_rgba(0,0,0,0.12)]` y esquinas de 10px.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                    {/* Dropdown 1: Solicitar cita */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[13px] font-bold text-black">1. Dropdown «Solicita una cita»</span>
                      <div className="w-[200px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] flex flex-col gap-[2px] border-0">
                        <div className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] font-bold uppercase transition-colors cursor-pointer">
                          <Video className="w-[18px] h-[18px] text-[#d50475]" />
                          <span>Videoconsulta</span>
                        </div>
                        <div className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] font-bold uppercase transition-colors cursor-pointer">
                          <MessageSquare className="w-[18px] h-[18px] text-[#d50475]" />
                          <span>Chat médico</span>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown 2: Soporte e Información (Biometría / Header) */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[13px] font-bold text-black">2. Dropdown «Info & Soporte Biometría»</span>
                      <div className="w-[220px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col gap-[2px]">
                        <div className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold transition-colors cursor-pointer">
                          <Mail className="w-[18px] h-[18px] text-[#d50475] shrink-0" />
                          <span className="truncate">biometria@everhealth.es</span>
                        </div>
                        <div className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold transition-colors cursor-pointer">
                          <Phone className="w-[18px] h-[18px] text-[#d50475] shrink-0" />
                          <span>918 220 518</span>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown 3: Acciones en Tablas (Sin iconos, con separadores) */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[13px] font-bold text-black">3. Dropdown «Acciones de Tabla»</span>
                      <div className="w-[210px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col text-left">
                        <div className="w-full h-[34px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center transition-colors cursor-pointer">
                          Ver historial clínico
                        </div>
                        <div className="w-full h-[34px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center transition-colors cursor-pointer">
                          Pedir cita médica
                        </div>
                        <div className="w-full h-[1px] bg-[#f1f5f9] my-1" />
                        <div className="w-full h-[34px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center transition-colors cursor-pointer">
                          Editar datos
                        </div>
                        <div className="w-full h-[34px] px-[12px] rounded-[6px] hover:bg-[#fef2f2] text-[13px] font-normal text-[#ef4444] flex items-center transition-colors cursor-pointer">
                          Eliminar registro
                        </div>
                      </div>
                    </div>

                    {/* Dropdown 4: Configuración de usuario & Cerrar sesión (media_1793946549334_0f96c0e9.png) */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[13px] font-bold text-black">4. Dropdown «Usuario / Sidebar»</span>
                      <div className="w-[210px] bg-white rounded-[12px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col gap-[2px] text-left">
                        <div className="w-full h-[38px] px-[12px] rounded-[6px] hover:bg-[#f1f5f9] flex items-center gap-[12px] text-[14px] leading-[20px] font-normal text-black transition-colors cursor-pointer">
                          <SlidersHorizontal className="w-[18px] h-[18px] text-black shrink-0" />
                          <span>Configuración de usuario</span>
                        </div>
                        <div className="w-full h-[38px] px-[12px] rounded-[6px] hover:bg-[#f1f5f9] flex items-center gap-[12px] text-[14px] leading-[20px] font-normal text-black transition-colors cursor-pointer">
                          <LogOut className="w-[18px] h-[18px] text-black shrink-0" />
                          <span>Cerrar sesión</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN 4: ORGANISMOS */}
            {activeSection === 'organismos' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[28px] font-bold text-black">Organismos</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Secciones modulares del Home ensambladas con componentes atómicos.
                  </p>
                </div>

                {/* Organismo 1: Card Atención Inmediata con CTA Dropdown */}
                <div className="border border-[#e2e8f0] rounded-[8px] p-6 bg-white flex flex-col gap-4">
                  <h2 className="text-[18px] font-bold text-black">Card: Atención Inmediata</h2>
                  <section className="w-full bg-white rounded-[8px] p-4 sm:p-[24px] border border-[#e2e8f0] flex flex-col gap-[16px]">
                    <div className="flex flex-col gap-[2px]">
                      <h3 className="text-[20px] leading-[28px] font-bold text-black">
                        Atención inmediata
                      </h3>
                      <p className="text-[14px] leading-[20px] text-[#64748b]">
                        Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
                      </p>
                    </div>

                    <div className="w-full border-t border-[#e2e8f0]" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-[12px]">
                        <div className="flex items-center shrink-0">
                          <img
                            src={doctorAvatar1}
                            alt="Doctor 1"
                            className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-10 shrink-0 border-2 border-white"
                          />
                          <img
                            src={doctorAvatar2}
                            alt="Doctor 2"
                            className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-20 shrink-0 border-2 border-white"
                          />
                          <img
                            src={doctorAvatar3}
                            alt="Doctor 3"
                            className="w-[40px] h-[40px] rounded-full object-cover relative z-30 shrink-0 border-2 border-white"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[12px] leading-[16px] font-bold text-black">
                            Hay médicos disponibles
                          </p>
                          <p className="text-[12px] leading-[16px] font-normal text-black">
                            Tiempo de espera estimado 12 min
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                          className="h-[40px] px-[16px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold flex items-center gap-[8px] cursor-pointer shadow-xs"
                        >
                          <Plus className="w-[18px] h-[18px]" />
                          <span>Solicita una cita</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>

                        {demoDropdownOpen && (
                          <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[200px] bg-white rounded-[10px] border border-[#cbd5e1] shadow-lg p-1.5 flex flex-col gap-1">
                            <div className="w-full h-9 px-3 rounded hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-2 text-[13px] font-bold cursor-pointer">
                              <Video className="w-4 h-4 text-[#d50475]" />
                              <span>Videoconsulta</span>
                            </div>
                            <div className="w-full h-9 px-3 rounded hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-2 text-[13px] font-bold cursor-pointer">
                              <MessageSquare className="w-4 h-4 text-[#d50475]" />
                              <span>Chat Médico</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* SECCIÓN 5: ÍCONOS LUCIDE */}
            {activeSection === 'iconos' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[28px] font-bold text-black">Catálogo de Íconos Lucide Nativos</h1>
                    <p className="text-[14px] text-[#64748b] mt-1">
                      Todos los íconos del sistema son Lucide nativos (svg escalables) sin librerías externas.
                    </p>
                  </div>
                  <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f1f5f9] text-black shrink-0">
                    {ICONS_CATALOG.length} íconos activos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ICONS_CATALOG.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="p-3.5 rounded-[8px] border border-[#e2e8f0] hover:border-black bg-white flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-black shrink-0">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold text-black truncate">{item.label}</span>
                            <span className="text-[11px] text-[#64748b] font-mono truncate">{item.name}</span>
                          </div>
                        </div>
                        <div className="text-[#d50475] shrink-0" title="Color Marca">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
