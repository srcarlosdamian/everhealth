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
  PawPrint,
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
  Trash2,
  Edit2,
  MapPin,
  Grid,
  Square,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';
import { SwitchToggle } from '../design-system/atoms/SwitchToggle';
import { ProgressCheckCircle } from '../design-system/atoms/ProgressCheckCircle';
import { AutosaveIndicator } from '../design-system/atoms/AutosaveIndicator';
import { StatusDotBadge } from '../design-system/atoms/StatusDotBadge';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { ColorPickerDropdown } from '../design-system/atoms/ColorPickerDropdown';
import { CompletionMedalIllustration } from '../design-system/atoms/CompletionMedalIllustration';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { AvailableDoctorsRow } from '../design-system/molecules/AvailableDoctorsRow';
import { AssignedDoctorCard } from '../design-system/molecules/AssignedDoctorCard';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';
import { PaginationEvents } from '../design-system/molecules/PaginationEvents';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';

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
  { name: 'lucide/paw-print', icon: PawPrint, label: 'Mascotas', category: 'Navegación' },
  { name: 'lucide/sliders-horizontal', icon: SlidersHorizontal, label: 'Configuración de usuario', category: 'Usuario & Perfil' },
  { name: 'lucide/log-out', icon: LogOut, label: 'Cerrar sesión', category: 'Usuario & Perfil' },
  { name: 'lucide/video', icon: Video, label: 'Video consulta', category: 'Acciones' },
  { name: 'lucide/message-square', icon: MessageSquare, label: 'Chat médico', category: 'Acciones' },
  { name: 'lucide/calendar', icon: Calendar, label: 'Calendario y citas', category: 'Acciones' },
  { name: 'lucide/check', icon: Check, label: 'Check 900 de progreso', category: 'Acciones' },
  { name: 'lucide/file-up', icon: FileUp, label: 'Subir documentos', category: 'Acciones' },
  { name: 'lucide/search', icon: Search, label: 'Buscador', category: 'Acciones' },
  { name: 'lucide/star', icon: Star, label: 'Médicos favoritos', category: 'Acciones' },
  { name: 'lucide/palette', icon: Palette, label: 'Sistema de diseño', category: 'Header & Sistema' },
  { name: 'lucide/globe', icon: Globe, label: 'Selector de idioma', category: 'Header & Sistema' },
  { name: 'lucide/bell', icon: Bell, label: 'Notificaciones', category: 'Header & Sistema' },
  { name: 'lucide/help-circle', icon: HelpCircle, label: 'Soporte Ever Health', category: 'Header & Sistema' },
  { name: 'lucide/plus-circle', icon: PlusCircle, label: 'Acciones rápidas (+)', category: 'Header & Sistema' },
  { name: 'lucide/chevron-right', icon: ChevronRight, label: 'Navegación siguiente', category: 'Direccionales' },
  { name: 'lucide/chevron-down', icon: ChevronDown, label: 'Desplegable', category: 'Direccionales' },
  { name: 'lucide/chevron-up', icon: ChevronUp, label: 'Contraer', category: 'Direccionales' },
  { name: 'lucide/arrow-left', icon: ArrowLeft, label: 'Volver atrás', category: 'Direccionales' },
  { name: 'lucide/x', icon: X, label: 'Cerrar modal', category: 'Direccionales' },
];

interface StageBlockProps {
  title: string;
  componentTag: string;
  usedIn: string[];
  description: string;
  canvasMode: 'dots' | 'white';
  children: React.ReactNode;
}

const StageBlock: React.FC<StageBlockProps> = ({
  title,
  componentTag,
  usedIn,
  description,
  canvasMode,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Cabecera estilo Atlassian Design System (Fuera del lienzo) */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[17px] font-bold text-black">{title}</h2>
            <code className="px-2 py-0.5 rounded-[4px] bg-[#f1f5f9] text-[#0f172a] font-mono text-[11px] font-bold border border-[#e2e8f0]">
              {componentTag}
            </code>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-[#64748b]">Usado en:</span>
            {usedIn.map((place) => (
              <span
                key={place}
                className="px-2 py-0.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[11px] font-medium text-[#475569]"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[13px] text-[#64748b] leading-relaxed">{description}</p>
      </div>

      {/* Lienzo (Stage Canvas) con cuaderno de puntitos o fondo blanco limpio:
          El componente se renderiza TAL CUAL ES adentro, sin contenedores falsos */}
      <div
        className={`w-full rounded-[8px] border border-[#e2e8f0] p-6 sm:p-8 transition-colors overflow-visible ${
          canvasMode === 'dots'
            ? 'bg-[#fcfcfd] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]'
            : 'bg-white'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState<
    'tokens' | 'atomos' | 'inputs' | 'moleculas' | 'organismos' | 'modales' | 'iconos'
  >('atomos');
  const [canvasMode, setCanvasMode] = useState<'dots' | 'white'>('dots');

  // Estados interactivos para probar los componentes reales en vivo
  const [demoToggle, setDemoToggle] = useState('si');
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoEspecie, setDemoEspecie] = useState('Perro');
  const [demoCondicion, setDemoCondicion] = useState('Peso Ideal');
  const [demoModalidad, setDemoModalidad] = useState('agendar');
  const [demoColor, setDemoColor] = useState('#d4a373');
  const [demoPaginationExpanded, setDemoPaginationExpanded] = useState(false);
  const [demoConfirmModalOpen, setDemoConfirmModalOpen] = useState(false);
  const [demoFormModalOpen, setDemoFormModalOpen] = useState(false);
  const [demoCitaMenuOpen, setDemoCitaMenuOpen] = useState(false);

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row font-[family-name:Helvetica]">
      {/* Sidebar - Navegación idéntica en estructura y ancho (244px) al Home */}
      <aside className="w-full lg:w-[244px] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#e2e8f0] p-[16px] flex flex-col shrink-0 bg-white">
        <div className="pt-[12px] pb-[20px] px-[4px]">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBackToHome}
            title="Volver al Inicio"
            className="h-[40px] w-auto object-contain object-left cursor-pointer"
          />
        </div>

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

        <div className="px-2 py-1 text-[11px] font-bold tracking-wider uppercase text-[#64748b]">
          Sistema de Diseño (SSOT)
        </div>

        <nav className="flex flex-col gap-[6px] mt-2">
          {[
            { id: 'tokens', label: '1. Tokens & Color', icon: Palette },
            { id: 'atomos', label: '2. Átomos (Badges/Btns)', icon: Layers },
            { id: 'inputs', label: '3. Inputs & Dropdowns', icon: Edit2 },
            { id: 'moleculas', label: '4. Moléculas & Menús', icon: Component },
            { id: 'organismos', label: '5. Organismos Reales', icon: Layout },
            { id: 'modales', label: '6. Modales & Diálogos', icon: X },
            { id: 'iconos', label: '7. Íconos Lucide', icon: Sparkles },
          ].map((sec) => {
            const IconComp = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id as any)}
                className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] transition-colors cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-[#f1f5f9] text-black font-bold'
                    : 'text-black hover:bg-[#f8fafc] font-normal'
                }`}
              >
                <IconComp className="w-[18px] h-[18px] text-[#64748b]" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header con selector de Lienzo (Puntitos vs Blanco) */}
        <header className="w-full h-[56px] px-4 sm:px-8 flex items-center justify-center border-b border-[#f1f5f9] bg-white sticky top-0 z-30">
          <div className="w-full max-w-[840px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-black">Ever Health Design System</span>
              <span className="text-[#cbd5e1]">/</span>
              <span className="text-[14px] text-[#64748b] capitalize">{activeSection}</span>
            </div>

            {/* Selector de fondo de lienzo (Puntitos vs Blanco) */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center p-0.5 rounded-[6px] bg-[#f1f5f9] border border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setCanvasMode('dots')}
                  className={`px-2.5 py-1 rounded-[4px] text-[12px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                    canvasMode === 'dots'
                      ? 'bg-white text-black shadow-xs font-bold'
                      : 'text-[#64748b] hover:text-black'
                  }`}
                  title="Ver sobre cuadrícula de puntos para distinguir fondos transparentes vs blancos"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Puntitos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCanvasMode('white')}
                  className={`px-2.5 py-1 rounded-[4px] text-[12px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                    canvasMode === 'white'
                      ? 'bg-white text-black shadow-xs font-bold'
                      : 'text-[#64748b] hover:text-black'
                  }`}
                  title="Ver sobre lienzo blanco liso"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Fondo blanco</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onBackToHome}
                className="text-[13px] font-bold text-black hover:text-[#d50475] transition-colors cursor-pointer hidden sm:inline"
              >
                Cerrar
              </button>
            </div>
          </div>
        </header>

        {/* Body Content */}
        <main className="flex-1 px-4 sm:px-8 pt-[24px] pb-[64px] flex justify-center items-start">
          <div className="w-full max-w-[840px] mx-auto flex flex-col gap-[32px]">

            {/* ================= SECCIÓN 1: TOKENS ================= */}
            {activeSection === 'tokens' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">1. Tokens de Color & Tipografía</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Única fuente de verdad para colores y tipografía Helvetica en toda la aplicación.
                  </p>
                </div>

                <StageBlock
                  title="Tipografía Oficial"
                  componentTag="font-[family-name:Helvetica]"
                  usedIn={['Toda la App']}
                  description="Familia tipográfica estrictamente Helvetica. Títulos de campo y opciones de menús/dropdowns en 16px regular negro."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-col gap-2 text-black">
                    <p className="text-[24px] font-bold">Helvetica Bold 700 — Encabezados y CTAs</p>
                    <p className="text-[16px] font-normal">Helvetica Regular 400 (16px) — Inputs, Dropdowns, Menús y Cuerpo</p>
                    <p className="text-[14px] font-normal text-[#64748b]">Helvetica Regular 400 (14px) — Subtítulos y etiquetas de campo</p>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Gama Pink (Acciones Primarias)"
                  componentTag="#d50475 / #831843"
                  usedIn={['Botones Primarios', 'Solicitar Cita', 'Stepper Check']}
                  description="Reservado exclusivamente para CTAs primarios, el botón + del header, y los checks de progreso (#831843). Prohibido en hovers de inputs o menús secundarios."
                  canvasMode={canvasMode}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {[
                      { shade: '50', hex: '#fdf2f8' },
                      { shade: '100', hex: '#fce7f3' },
                      { shade: '500', hex: '#ec4899' },
                      { shade: 'Brand CTA', hex: '#d50475' },
                      { shade: '800', hex: '#9d174d' },
                      { shade: '900 Check', hex: '#831843' },
                    ].map((item) => (
                      <div key={item.shade} className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#e2e8f0] bg-white">
                        <div className="w-full h-10 rounded-[4px]" style={{ backgroundColor: item.hex }} />
                        <span className="text-[12px] font-bold text-black">{item.shade}</span>
                        <span className="text-[11px] font-mono text-[#64748b]">{item.hex}</span>
                      </div>
                    ))}
                  </div>
                </StageBlock>

                <StageBlock
                  title="Gama Neutra: BlueGray"
                  componentTag="#64748b / #cbd5e1 / #f1f5f9"
                  usedIn={['Iconos', 'Bordes de Inputs', 'Hover de Menús']}
                  description="Todos los iconos de navegación, historia clínica, soporte y tablas usan #64748b. Los hovers de dropdowns y menús usan #f1f5f9."
                  canvasMode={canvasMode}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { shade: '50', hex: '#f8fafc' },
                      { shade: '100 (Hover)', hex: '#f1f5f9' },
                      { shade: '200 (Bordes)', hex: '#e2e8f0' },
                      { shade: '300 (Inputs)', hex: '#cbd5e1' },
                      { shade: '500 (Iconos)', hex: '#64748b' },
                    ].map((item) => (
                      <div key={item.shade} className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#e2e8f0] bg-white">
                        <div className="w-full h-10 rounded-[4px] border border-[#e2e8f0]" style={{ backgroundColor: item.hex }} />
                        <span className="text-[12px] font-bold text-black">{item.shade}</span>
                        <span className="text-[11px] font-mono text-[#64748b]">{item.hex}</span>
                      </div>
                    ))}
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 2: ÁTOMOS ================= */}
            {activeSection === 'atomos' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">2. Átomos del Sistema</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Cada elemento aquí es el componente React real importado desde <code>src/design-system/atoms/</code>, mostrado tal cual es sobre el lienzo sin contenedores adicionales.
                  </p>
                </div>

                {/* 1. Badges */}
                <StageBlock
                  title="Badges & Etiquetas de Estado"
                  componentTag="<Badge />"
                  usedIn={['Home', 'Solicitar Chat', 'Familiares', 'Mascotas', 'Cuestionario Médico']}
                  description="Sin fondo de relleno (transparente), borde gris #cbd5e1 y texto semántico en bold. Incluye la variante 'disponible-ahora' de la tarjeta de médico asignado."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="disponible">Disponible</Badge>
                    <Badge variant="disponible-ahora">Disponible ahora</Badge>
                    <Badge variant="en-espera">En espera</Badge>
                    <Badge variant="programada">Programada</Badge>
                    <Badge variant="confirmada">Menor a cargo</Badge>
                    <Badge variant="limitada">Tiempo limitado</Badge>
                    <Badge variant="no-disponible">No disponible</Badge>
                    <Badge variant="error-conexion">Error de conexión... reintentando</Badge>
                  </div>
                </StageBlock>

                {/* 2. StatusDotBadge */}
                <StageBlock
                  title="Indicador de Estado con Punto de Color"
                  componentTag="<StatusDotBadge />"
                  usedIn={['Historial de Consultas']}
                  description="Punto circular semántico + texto regular utilizado en la esquina superior derecha de cada tarjeta en el Historial de Consultas."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-wrap items-center gap-6">
                    <StatusDotBadge status="Pendiente de recomendación" />
                    <StatusDotBadge status="En proceso" />
                    <StatusDotBadge status="Cancelada" />
                    <StatusDotBadge status="Terminada" />
                  </div>
                </StageBlock>

                {/* 3. Botones Oficiales */}
                <StageBlock
                  title="Botones Estándar Figma & Píldoras de Consulta"
                  componentTag="<Button />"
                  usedIn={['Home', 'Historial de Consultas', 'Familiares', 'Mascotas', 'Modales']}
                  description="Variantes estándar de 8px en mayúsculas y variantes píldora (rounded-full) de Historial de Consultas. El estado 'inactive' incluye automáticamente el tooltip estilo Shadcn ('Activo 15 minutos antes')."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary">
                        <Plus className="w-[20px] h-[20px] text-white" />
                        <span>SOLICITA UNA CITA</span>
                      </Button>
                      <Button variant="secondary">
                        <ScanFace className="w-[20px] h-[20px] text-[#d50475]" />
                        <span>INICIAR ESCANEO</span>
                      </Button>
                      <Button variant="outline">
                        <span>COMPLETA TU PERFIL MÉDICO</span>
                        <ChevronRight className="w-[18px] h-[18px] text-black" />
                      </Button>
                      <Button variant="inactive" tooltipText="Activo 15 minutos antes">
                        NO DISPONIBLE
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="pill-primary">Acceder a la consulta</Button>
                      <Button variant="pill-outline">Cancelar consulta</Button>
                      <Button variant="pill-purple">Ver conversación</Button>
                      <Button variant="destructive">Dar de baja</Button>
                    </div>
                  </div>
                </StageBlock>

                {/* 4. AutosaveIndicator */}
                <StageBlock
                  title="Indicador de Autoguardado"
                  componentTag="<AutosaveIndicator />"
                  usedIn={['Cuestionario Médico', 'Mis Documentos Médicos']}
                  description="Píldora discreta #f1f5f9 con icono CheckCircle2 que confirma el guardado automático en formularios clínicos."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <AutosaveIndicator />
                    <Badge variant="error-conexion">Error de conexión... reintentando</Badge>
                  </div>
                </StageBlock>

                {/* 5. SegmentedToggle & SwitchToggle */}
                <StageBlock
                  title="Segmented Toggle (Sí/No) & Switch Toggle"
                  componentTag="<SegmentedToggle /> / <SwitchToggle />"
                  usedIn={['Cuestionario Médico', 'Historial de Consultas', 'Header Notificaciones']}
                  description="Selectores binarios interactivos reutilizados en preguntas clínicas y filtros de vistas."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-wrap items-center gap-8">
                    <SegmentedToggle
                      value={demoToggle}
                      onChange={(v) => setDemoToggle(v)}
                    />
                    <SwitchToggle
                      checked={demoSwitch}
                      onChange={setDemoSwitch}
                      label="Ver solo informes"
                    />
                  </div>
                </StageBlock>

                {/* 6. ProgressCheckCircle & StepperCheck */}
                <StageBlock
                  title="Anillos de Progreso & Stepper Check (#831843)"
                  componentTag="<ProgressCheckCircle /> / <StepperCheck />"
                  usedIn={['Cuestionario Médico', 'Modal Videoconsulta', 'Modal Solicitar Chat', 'Biometría']}
                  description="Indicadores de avance por sección y checks circulares para formularios multipaso con nomenclatura estricta PASO X/Y."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center gap-4">
                      <ProgressCheckCircle progress={25} size={24} />
                      <ProgressCheckCircle progress={60} size={24} />
                      <ProgressCheckCircle isCompleted size={24} />
                    </div>

                    <div className="flex items-center gap-3">
                      <StepperCheck isCompleted />
                      <StepperCheck isCompleted={false} stepNumber={2} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-black uppercase tracking-wider">PASO 1/2</span>
                      <span className="text-[#cbd5e1]">·</span>
                      <span className="text-[13px] font-bold text-black uppercase tracking-wider">PASO 1/8</span>
                    </div>
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 3: INPUTS & DROPDOWNS ================= */}
            {activeSection === 'inputs' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">3. Inputs & Dropdowns Reutilizables</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Todos los campos comparten altura de 44px, fondo blanco puro (<code>bg-white</code>), título regular negro, texto 16px regular negro, borde de foco oscuro neutro (<code>focus:border-black</code>) y hover neutral sin rosas.
                  </p>
                </div>

                {/* 1. TextInput */}
                <StageBlock
                  title="Input de Texto Estándar & Monospace"
                  componentTag="<TextInput />"
                  usedIn={['Familiares', 'Mascotas', 'Onboarding', 'Cuestionario Médico']}
                  description="Al hacer clic o foco en el input, el borde cambia a negro neutro (focus:border-black)."
                  canvasMode={canvasMode}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[680px]">
                    <TextInput
                      label="Nombre y apellidos*"
                      defaultValue="Carlos Damián"
                      placeholder="Ej. Carlos Damián"
                    />
                    <TextInput
                      label="Número de chip / identificador"
                      defaultValue="985141002345678"
                      placeholder="Ej. 985141002345678"
                      mono
                    />
                  </div>
                </StageBlock>

                {/* 2. Search Input */}
                <StageBlock
                  title="Input de Búsqueda con Icono"
                  componentTag="<TextInput leftIcon={<Search />} />"
                  usedIn={['Familiares', 'Mascotas', 'Historia Clínica']}
                  description="Variante del mismo componente TextInput con icono Search neutro a la izquierda y foco oscuro neutro."
                  canvasMode={canvasMode}
                >
                  <div className="max-w-[480px]">
                    <TextInput
                      placeholder="Buscar por nombre, especie, raza, tutor..."
                      leftIcon={<Search className="w-5 h-5" />}
                    />
                  </div>
                </StageBlock>

                {/* 3. Dropdown (con emoji/icono y texto regular) */}
                <StageBlock
                  title="Selector Desplegable Unificado (Con Emojis/Iconos o Texto Plano)"
                  componentTag="<Dropdown />"
                  usedIn={['Mascotas', 'Familiares', 'Modal Videoconsulta', 'Modal Solicitar Chat']}
                  description="16px regular negro en el botón y en la lista desplegable. Hover gris neutro (#f1f5f9) sin colores rosas. Soporta emojis o iconos a la izquierda."
                  canvasMode={canvasMode}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[680px]">
                    <Dropdown
                      label="Especie (Versión con Emoji)*"
                      value={demoEspecie}
                      onChange={setDemoEspecie}
                      options={[
                        { value: 'Perro', label: 'Perro', emoji: '🐶' },
                        { value: 'Gato', label: 'Gato', emoji: '🐱' },
                        { value: 'Aves', label: 'Aves', emoji: '🦜' },
                        { value: 'Roedores/Conejos', label: 'Roedores / Conejos', emoji: '🐰' },
                        { value: 'Otros', label: 'Otros', emoji: '🐾' },
                      ]}
                    />

                    <Dropdown
                      label="Condición corporal (Versión texto regular)"
                      value={demoCondicion}
                      onChange={setDemoCondicion}
                      options={['Peso Ideal', 'Delgado', 'Sobrepeso', 'Obesidad']}
                    />
                  </div>
                </StageBlock>

                {/* 4. Dropdown en Modales Médicos */}
                <StageBlock
                  title="Dropdown en Solicitud de Videoconsulta y Chat"
                  componentTag="<Dropdown />"
                  usedIn={['ModalVideoConsulta', 'ModalSolicitarChat']}
                  description="Reemplaza cualquier <select> nativo en los modales de consulta, garantizando el mismo chevron y tipografía 16px regular."
                  canvasMode={canvasMode}
                >
                  <div className="max-w-[420px]">
                    <Dropdown
                      label="1. Modalidad de atención"
                      required
                      value={demoModalidad}
                      onChange={setDemoModalidad}
                      options={[
                        { value: 'agendar', label: 'Agendar cita (Elegir fecha y horario)' },
                        { value: 'ahora', label: 'Hablar ahora (Atención médica inmediata)' },
                      ]}
                    />
                  </div>
                </StageBlock>

                {/* 5. ColorPickerDropdown */}
                <StageBlock
                  title="Selector de Color Flotante"
                  componentTag="<ColorPickerDropdown />"
                  usedIn={['Mascotas (Modal Añadir Mascota)']}
                  description="Despliega la paleta de colores habituales e input HEX justo debajo del campo con borde neutro oscuro al abrirse."
                  canvasMode={canvasMode}
                >
                  <div className="max-w-[280px]">
                    <ColorPickerDropdown
                      label="Color primario"
                      value={demoColor}
                      onChange={setDemoColor}
                    />
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 4: MOLÉCULAS & MENÚS ================= */}
            {activeSection === 'moleculas' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">4. Moléculas & Menús Unificados</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Componentes compuestos importados directamente desde <code>src/design-system/molecules/</code> y mostrados sin contenedores envolventes.
                  </p>
                </div>

                {/* 1. ActionMenu Unificado */}
                <StageBlock
                  title="Menú de Acciones Unificado (2 Únicas Variantes)"
                  componentTag="<ActionMenu />"
                  usedIn={['Header (+)', 'Header Soporte', 'Header Usuario', 'Sidebar', 'Biometría', 'Tablas Familiares/Mascotas']}
                  description="Unifica todos los menús desplegables de la app en un solo componente con 2 variantes: 'solicitar-cita' (iconos rosas + mayúsculas bold) y 'standard' (icono neutro #64748b a la izquierda + texto 16px regular negro + hover neutro #f1f5f9)."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-wrap items-start gap-8">
                    {/* Variante 1: Solicitar una cita */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                        Variante 1: &quot;solicitar-cita&quot;
                      </span>
                      <ActionMenu
                        variant="solicitar-cita"
                        className="w-[215px]"
                        items={[
                          {
                            id: 'video',
                            label: 'VIDEOCONSULTA',
                            icon: <Video className="w-5 h-5" />,
                          },
                          {
                            id: 'chat',
                            label: 'CHAT MÉDICO',
                            icon: <MessageSquare className="w-5 h-5" />,
                          },
                        ]}
                      />
                    </div>

                    {/* Variante 2A: Header Botón (+) */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                        Variante 2: &quot;standard&quot; (Header + / Tablas / Usuario)
                      </span>
                      <ActionMenu
                        variant="standard"
                        className="w-[260px]"
                        items={[
                          { id: '1', label: 'Solicitar una cita', icon: <Calendar className="w-5 h-5" /> },
                          { id: '2', label: 'Solicitar una videoconsulta', icon: <Video className="w-5 h-5" /> },
                          { id: '3', label: 'Biometría facial', icon: <ScanFace className="w-5 h-5" /> },
                          { id: '4', label: 'Añadir familia', icon: <Users className="w-5 h-5" /> },
                          { id: '5', label: 'Añadir mascota', icon: <PawPrint className="w-5 h-5" /> },
                        ]}
                      />
                    </div>

                    {/* Variante 2B: Soporte Ever Health */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                        Variante 2: &quot;standard&quot; (Soporte Ever Health)
                      </span>
                      <ActionMenu
                        variant="standard"
                        className="w-[280px]"
                        items={[
                          { id: 'mail', label: 'soporte@everhealth.es', icon: <Mail className="w-5 h-5" /> },
                          { id: 'tel', label: '911 23 12 14', icon: <Phone className="w-5 h-5" /> },
                          { id: 'loc', label: 'C/ Naciones 10, 28006 Madrid', icon: <MapPin className="w-5 h-5" /> },
                        ]}
                      />
                    </div>
                  </div>
                </StageBlock>

                {/* 2. AvailableDoctorsRow */}
                <StageBlock
                  title="Fila de Médicos Disponibles (Transparente)"
                  componentTag="<AvailableDoctorsRow />"
                  usedIn={['EVR100Home (Atención inmediata)']}
                  description="Observa sobre el fondo de puntitos que este componente NO tiene contenedor ni borde propio: son los 3 avatares superpuestos y las 2 líneas de texto."
                  canvasMode={canvasMode}
                >
                  <AvailableDoctorsRow />
                </StageBlock>

                {/* 3. AssignedDoctorCard */}
                <StageBlock
                  title="Tarjeta de Médico Asignado"
                  componentTag="<AssignedDoctorCard />"
                  usedIn={['ModalSolicitarChat', 'SolicitarChat']}
                  description="Este componente SÍ posee fondo blanco propio y borde de 2px (#e2e8f0), e integra internamente el átomo <Badge variant='disponible-ahora' />."
                  canvasMode={canvasMode}
                >
                  <AssignedDoctorCard />
                </StageBlock>

                {/* 4. NavigationFooter */}
                <StageBlock
                  title="Barra Inferior de Navegación de Formularios"
                  componentTag="<NavigationFooter />"
                  usedIn={['Onboarding', 'Cuestionario Médico', 'Mis Documentos Médicos']}
                  description="Barra con superficie #f8fafc y botones Atrás / Continuar reutilizada en todos los flujos paso a paso."
                  canvasMode={canvasMode}
                >
                  <NavigationFooter
                    onBack={() => {}}
                    onNext={() => {}}
                    backText="Atrás"
                    nextText="Continuar"
                  />
                </StageBlock>

                {/* 5. PaginationEvents */}
                <StageBlock
                  title="Paginador de Eventos (Cargar más / Mostrar menos)"
                  componentTag="<PaginationEvents />"
                  usedIn={['EVR100Home (Próximas consultas)']}
                  description="Pie de lista interactivo conectado directamente a la tarjeta de Próximas consultas en el Home."
                  canvasMode={canvasMode}
                >
                  <PaginationEvents
                    visibleCount={demoPaginationExpanded ? 5 : 1}
                    totalCount={5}
                    isExpanded={demoPaginationExpanded}
                    onToggle={() => setDemoPaginationExpanded(!demoPaginationExpanded)}
                  />
                </StageBlock>

                {/* 6. CompletionMedalIllustration */}
                <StageBlock
                  title="Ilustración de Finalización (Medalla en Podio)"
                  componentTag="<CompletionMedalIllustration />"
                  usedIn={['Cuestionario Médico (Pantalla de éxito)']}
                  description="Ilustración SVG vectorial sin fondo que se muestra al concluir el cuestionario médico."
                  canvasMode={canvasMode}
                >
                  <CompletionMedalIllustration size={140} />
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 5: ORGANISMOS ================= */}
            {activeSection === 'organismos' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">5. Organismos Ensamblados</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Bloques del Home e Historial de Consultas construidos combinando los átomos y moléculas anteriores.
                  </p>
                </div>

                {/* Organismo 1: Card Atención Inmediata */}
                <StageBlock
                  title="Card: Atención Inmediata"
                  componentTag="<AvailableDoctorsRow /> + <Button /> + <ActionMenu />"
                  usedIn={['EVR100Home']}
                  description="Combina la fila de médicos disponibles, el botón primario y el menú desplegable 'solicitar-cita'."
                  canvasMode={canvasMode}
                >
                  <section className="w-full bg-white p-6 border border-[#e2e8f0] flex flex-col gap-[16px]">
                    <div className="flex flex-col gap-[2px]">
                      <h3 className="text-[20px] leading-[28px] font-bold text-black">
                        Atención inmediata
                      </h3>
                      <p className="text-[16px] leading-[24px] text-black font-normal">
                        Nuestros doctores están en línea y listos para resolver tus dudas de salud en este momento.
                      </p>
                    </div>

                    <div className="w-full border-t border-[#e2e8f0]" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <AvailableDoctorsRow />

                      <div className="relative">
                        <Button
                          variant="primary"
                          onClick={() => setDemoCitaMenuOpen(!demoCitaMenuOpen)}
                        >
                          <Plus className="w-[20px] h-[20px] text-white" />
                          <span>SOLICITA UNA CITA</span>
                        </Button>

                        {demoCitaMenuOpen && (
                          <ActionMenu
                            variant="solicitar-cita"
                            className="absolute right-0 top-[calc(100%+6px)] z-50 w-[200px]"
                            items={[
                              {
                                id: 'video',
                                label: 'VIDEOCONSULTA',
                                icon: <Video className="w-5 h-5" />,
                                onClick: () => setDemoCitaMenuOpen(false),
                              },
                              {
                                id: 'chat',
                                label: 'CHAT MÉDICO',
                                icon: <MessageSquare className="w-5 h-5" />,
                                onClick: () => setDemoCitaMenuOpen(false),
                              },
                            ]}
                          />
                        )}
                      </div>
                    </div>
                  </section>
                </StageBlock>

                {/* Organismo 2: Tarjeta de Consulta (Historial de Consultas) */}
                <StageBlock
                  title="Card: Registro de Consulta Médica"
                  componentTag="<StatusDotBadge /> + <Button variant='pill-*' />"
                  usedIn={['Historial de Consultas']}
                  description="Estructura oficial de cada tarjeta en el Historial de Consultas: icono neutro + especialidad a la izquierda, StatusDotBadge a la derecha, 4 columnas de datos y botones píldora."
                  canvasMode={canvasMode}
                >
                  <div className="w-full bg-white border border-[#e2e8f0] rounded-[6px] p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-black">
                        <Video className="w-[18px] h-[18px] text-[#475569] stroke-[2]" />
                        <span className="text-[15px] font-bold text-black leading-none">
                          Psicología
                        </span>
                      </div>
                      <StatusDotBadge status="En proceso" />
                    </div>

                    <div className="w-full h-[1px] bg-[#f8fafc]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-[#64748b]">Fecha:</span>
                        <span className="font-bold text-black text-[14px]">27/10/2026</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-[#64748b]">Hora:</span>
                        <span className="font-bold text-black text-[14px]">10:10</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-[#64748b]">Motivo de la consulta:</span>
                        <span className="text-black text-[14px]">Primera consulta - Test</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-[#64748b]">Profesional:</span>
                        <span className="font-bold text-black text-[14px]">Bruno Peñas</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Button variant="pill-outline">Cancelar consulta</Button>
                      <Button variant="pill-primary">Acceder a la consulta</Button>
                    </div>
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 6: MODALES ================= */}
            {activeSection === 'modales' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">6. Modales del Sistema</h1>
                  <p className="text-[14px] text-[#64748b] mt-1">
                    Componentes modales reutilizados en Familiares, Mascotas e Historial de Consultas.
                  </p>
                </div>

                <StageBlock
                  title="Modal de Confirmación («Dar de baja / Cancelar»)"
                  componentTag="<ConfirmDeactivateModal />"
                  usedIn={['Familiares', 'Mascotas', 'Historial de Consultas']}
                  description="Componente único para confirmar bajas o cancelaciones. Mostrado aquí mismo sobre el lienzo de puntitos tal cual es."
                  canvasMode={canvasMode}
                >
                  <div className="flex flex-col items-start gap-4">
                    <ConfirmDeactivateModal
                      inlinePreview
                      entityName="Elena Ruiz Morales"
                      onCancel={() => {}}
                      onConfirm={() => setDemoConfirmModalOpen(true)}
                    />
                    <Button variant="primary" onClick={() => setDemoConfirmModalOpen(true)}>
                      Abrir modal con overlay en vivo
                    </Button>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Modal de Formulario («Añadir Familiar / Mascota»)"
                  componentTag="<TextInput /> + <Dropdown /> + <Button />"
                  usedIn={['Familiares', 'Mascotas']}
                  description="Construido íntegramente con los átomos TextInput y Dropdown (sin <select> nativos ni bordes rosas)."
                  canvasMode={canvasMode}
                >
                  <Button variant="primary" onClick={() => setDemoFormModalOpen(true)}>
                    Probar Modal de Formulario en vivo
                  </Button>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 7: ÍCONOS LUCIDE ================= */}
            {activeSection === 'iconos' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[28px] font-bold text-black">7. Catálogo de Íconos Lucide Nativos</h1>
                    <p className="text-[14px] text-[#64748b] mt-1">
                      Todos los iconos del sistema usan color neutro <code>#64748b</code> por defecto, excepto el icono <code>PlusCircle</code> del header y los iconos de <code>Solicitar una cita</code>.
                    </p>
                  </div>
                  <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f1f5f9] text-black shrink-0">
                    {ICONS_CATALOG.length} íconos activos
                  </span>
                </div>

                <StageBlock
                  title="Íconos Activos en la Aplicación"
                  componentTag="lucide-react"
                  usedIn={['Toda la App']}
                  description="Cada tarjeta muestra el icono en su tono neutro oficial (#64748b)."
                  canvasMode={canvasMode}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ICONS_CATALOG.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="p-3.5 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] shrink-0">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold text-black truncate">{item.label}</span>
                            <span className="text-[11px] text-[#64748b] font-mono truncate">{item.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </StageBlock>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Modal Interactivo de Demostración: ConfirmDeactivateModal real */}
      <ConfirmDeactivateModal
        isOpen={demoConfirmModalOpen}
        entityName="Elena Ruiz Morales"
        onCancel={() => setDemoConfirmModalOpen(false)}
        onConfirm={() => setDemoConfirmModalOpen(false)}
      />

      {/* Modal Interactivo de Demostración: Formulario usando TextInput y Dropdown reales */}
      {demoFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-[640px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-7 flex flex-col gap-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <h2 className="text-[20px] font-bold text-black">Añadir familiar</h2>
              <button
                type="button"
                onClick={() => setDemoFormModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput label="Nombre*" defaultValue="Mateo" placeholder="Nombre" />
                <TextInput label="Apellidos*" defaultValue="Damián Ruiz" placeholder="Apellidos" />
              </div>
              <Dropdown
                label="Parentesco*"
                value="Hijo/a"
                onChange={() => {}}
                options={['Hijo/a', 'Cónyuge', 'Madre / Padre', 'Otro']}
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f5f9]">
              <Button variant="outline" onClick={() => setDemoFormModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setDemoFormModalOpen(false)}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
