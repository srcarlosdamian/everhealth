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
  ChevronLeft,
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
  MoreVertical,
  Download,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { Tooltip } from '../design-system/atoms/Tooltip';
import { StepperCheck } from '../design-system/atoms/StepperCheck';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';
import { Checkbox } from '../design-system/atoms/Checkbox';
import { Radio } from '../design-system/atoms/Radio';
import { CalendarMonthGrid } from '../design-system/molecules/CalendarMonthGrid';
import { CalendarDaySlots } from '../design-system/molecules/CalendarDaySlots';
import { SelectedAppointmentBanner } from '../design-system/molecules/SelectedAppointmentBanner';
import { ProgressCheckCircle } from '../design-system/atoms/ProgressCheckCircle';
import { AutosaveIndicator } from '../design-system/atoms/AutosaveIndicator';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { ColorPickerDropdown } from '../design-system/atoms/ColorPickerDropdown';
import { CompletionMedalIllustration } from '../design-system/atoms/CompletionMedalIllustration';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { AvailableDoctorsRow } from '../design-system/molecules/AvailableDoctorsRow';
import { AssignedDoctorCard } from '../design-system/molecules/AssignedDoctorCard';
import { NavigationFooter } from '../design-system/molecules/NavigationFooter';
import { HelpCenter } from './HelpCenter';
import { ChatMedicoActivo } from './ChatMedicoActivo';
import { PaginationEvents } from '../design-system/molecules/PaginationEvents';
import { TablePagination, TablePaginationCompact } from '../design-system/molecules/TablePagination';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';
import { LogoutConfirmModal } from '../design-system/molecules/LogoutConfirmModal';
import { ModalActionGroup } from '../design-system/molecules/ModalActionGroup';
import { Tabs } from '../design-system/molecules/Tabs';
import { Toast, ToastVariant } from '../design-system/atoms/Toast';

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
  { name: 'lucide/sliders-horizontal', icon: SlidersHorizontal, label: 'Configuración', category: 'Usuario & Perfil' },
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
  children: React.ReactNode;
}

const StageBlock: React.FC<StageBlockProps> = ({
  title,
  componentTag,
  usedIn,
  description,
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
            <span className="text-[11px] font-bold text-[#64748b]">Usado en:</span>
            {usedIn.map((place) => (
              <span
                key={place}
                className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] text-[11px] font-bold text-[#0f172a]"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[13px] text-[var(--color-text-description)] leading-relaxed font-normal">{description}</p>
      </div>

      {/* Lienzo (Stage Canvas): Siempre fondo blanco limpio */}
      <div className="w-full rounded-[8px] border border-[#e2e8f0] p-6 sm:p-8 transition-colors overflow-visible bg-white">
        {children}
      </div>
    </div>
  );
};

export const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState<
    'tokens' | 'atomos' | 'inputs' | 'moleculas' | 'organismos' | 'modales' | 'iconos'
  >('atomos');

  // Estados interactivos para probar los componentes reales en vivo
  const [demoToggle, setDemoToggle] = useState('si');
  const [demoMultipleChecks, setDemoMultipleChecks] = useState<string[]>(['Fiebre', 'Tos']);
  const [demoRadioSpecialty, setDemoRadioSpecialty] = useState<string>('Sexología');
  const [demoCalendarDay, setDemoCalendarDay] = useState<number>(17);
  const [demoCalendarTime, setDemoCalendarTime] = useState<string>('09:30');
  const [demoSlotDay, setDemoSlotDay] = useState<string>('MAÑANA 23 Oct');
  const [demoSlotTime, setDemoSlotTime] = useState<string>('09:30');
  const [demoEspecie, setDemoEspecie] = useState('Perro');
  const [demoCondicion, setDemoCondicion] = useState('Peso Ideal');
  const [demoModalidad, setDemoModalidad] = useState('agendar');
  const [demoColor, setDemoColor] = useState('#d4a373');
  const [demoPaginationExpanded, setDemoPaginationExpanded] = useState(false);
  const [demoConfirmModalOpen, setDemoConfirmModalOpen] = useState(false);
  const [demoLogoutModalOpen, setDemoLogoutModalOpen] = useState(false);
  const [demoActiveTab, setDemoActiveTab] = useState('datos-personales');
  const [demoMinimalTab, setDemoMinimalTab] = useState('soporte');
  const [demoFormModalOpen, setDemoFormModalOpen] = useState(false);
  const [demoHelpCenterOpen, setDemoHelpCenterOpen] = useState(false);
  const [demoCitaMenuOpen, setDemoCitaMenuOpen] = useState(false);
  const [demoFamiliarMenuOpen, setDemoFamiliarMenuOpen] = useState<number | null>(null);
  const [demoModalDocMenuOpen, setDemoModalDocMenuOpen] = useState<number | null>(null);
  const [demoDocInputName, setDemoDocInputName] = useState('Valoración médica preoperatoria');
  const [demoActiveToast, setDemoActiveToast] = useState<{
    message: string;
    variant: ToastVariant;
    title?: string;
  } | null>(null);
  const [demoButtonsWithIcons, setDemoButtonsWithIcons] = useState(true);
  const [demoForceTooltips, setDemoForceTooltips] = useState(false);
  const [demoChatActivoOpen, setDemoChatActivoOpen] = useState(false);

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  if (demoChatActivoOpen) {
    return (
      <ChatMedicoActivo
        doctorName="Dra. María Fernández"
        doctorSpecialty="Medicina General · Ever Health"
        initialReason="Consulta médica de demostración en Sistema de Diseño"
        onEndChat={() => {
          setDemoChatActivoOpen(false);
          setDemoActiveToast({
            variant: 'success',
            message: 'Consulta finalizada con éxito. Informe médico guardado.',
          });
        }}
      />
    );
  }

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
            { id: 'atomos', label: '2. Átomos', icon: Layers },
            { id: 'inputs', label: '3. Inputs & Forms', icon: Edit2 },
            { id: 'moleculas', label: '4. Moléculas', icon: Component },
            { id: 'organismos', label: '5. Organismos & Tablas', icon: Layout },
            { id: 'modales', label: '6. Modales', icon: X },
            { id: 'iconos', label: '7. Íconos Lucide', icon: Sparkles },
          ].map((sec) => {
            const IconComp = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id as any)}
                className={`w-full h-[40px] px-[12px] rounded-[6px] flex items-center gap-[10px] text-[14px] leading-[20px] text-left transition-colors cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none ${
                  activeSection === sec.id
                    ? 'bg-[#f1f5f9] text-black font-bold'
                    : 'text-black hover:bg-[#f8fafc] font-normal'
                }`}
              >
                <IconComp className="w-[18px] h-[18px] text-[#64748b] shrink-0" />
                <span className="truncate whitespace-nowrap">{sec.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="w-full h-[56px] px-4 sm:px-8 flex items-center justify-center border-b border-[#f1f5f9] bg-white sticky top-0 z-30">
          <div className="w-full max-w-[840px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-black">Ever Health Design System</span>
              <span className="text-[#cbd5e1]">/</span>
              <span className="text-[14px] text-[#64748b] capitalize">{activeSection}</span>
            </div>

            <div className="flex items-center gap-3">
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
                  <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                    Única fuente de verdad para colores y tipografía Helvetica en toda la aplicación.
                  </p>
                </div>

                <StageBlock
                  title="Tipografía"
                  componentTag="font-[family-name:Helvetica]"
                  usedIn={['Toda la aplicación']}
                  description="Familia Helvetica con escala de 11px a 32px y textos regulares en inputs."
                >
                  <div className="flex flex-col gap-2 text-black">
                    <p className="text-[24px] font-bold">Helvetica Bold 700 — Encabezados y CTAs</p>
                    <p className="text-[16px] font-normal">Helvetica Regular 400 (16px) — Inputs, Dropdowns, Menús y Cuerpo</p>
                    <p className="text-[14px] font-normal text-[#64748b]">Helvetica Regular 400 (14px) — Subtítulos y etiquetas de campo</p>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Paleta Primaria (Pink)"
                  componentTag="#d50475 / #831843"
                  usedIn={['Botones CTA', 'Checks de Progreso', 'Selección']}
                  description="Rosa principal #d50475 y tonos claros #fdf2f8 / #fce7f3 para selección."
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
                  title="Paleta Neutra (Slate)"
                  componentTag="#64748b / #cbd5e1 / #f1f5f9"
                  usedIn={['Iconos', 'Bordes', 'Fondos', 'Textos']}
                  description="Escala de grises para bordes (#e2e8f0), iconos (#64748b) y textos (#0f172a)."
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

                <StageBlock
                  title="Tokens de Subtítulos y Descripciones (Variables CSS)"
                  componentTag="--color-page-subtitle / --color-text-description"
                  usedIn={['Todas las páginas (Perfil, Familiares, Mascotas, Consultas, Chat, Biometría)']}
                  description="Variables CSS para subtítulos y descripciones de página homologados en color negro (#000000) o tono oscuro por defecto, sustituyendo cualquier gris claro previo."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                      <div className="w-full h-8 rounded-[4px] bg-black" />
                      <span className="text-[13px] font-bold text-black">--color-page-subtitle</span>
                      <span className="text-[12px] font-mono text-black">#000000 (Negro para subtítulos de página)</span>
                    </div>
                    <div className="flex flex-col gap-1 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                      <div className="w-full h-8 rounded-[4px] bg-black" />
                      <span className="text-[13px] font-bold text-black">--color-text-description</span>
                      <span className="text-[12px] font-mono text-black">#000000 (Negro para descripciones de bloque)</span>
                    </div>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Scrollbar Minimalista Homologado"
                  componentTag=".custom-scrollbar-minimal"
                  usedIn={[
                    'ModalSolicitarChat',
                    'ModalDocumentos',
                    'HelpCenter',
                    'Dropdown',
                    'ModalConversacionChat',
                    'ModalEditarHistoriaClinica',
                    'Tabs',
                    'Tablas de Familiares y Mascotas',
                  ]}
                  description="Barra de desplazamiento ultra-delgada (5px) con carril transparente y pulgar cilíndrico redondeado en gris suave (#cbd5e1 con hover #94a3b8), eliminando el scrollbar nativo tosco de los navegadores."
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2 text-[12px]">
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Grosor: <strong>5px</strong> (width & height)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Carril: <strong>transparent</strong> (sin fondo gris pesado)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Pulgar: <strong>#cbd5e1</strong> (hover #94a3b8) con <strong>border-radius: 9999px</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Cross-browser: <strong>scrollbar-width: thin</strong> + <strong>::-webkit-scrollbar</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {/* Demo Vertical */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[12px] font-bold text-black uppercase tracking-wider">Demo Scroll Vertical</span>
                        <div className="h-[140px] p-3 rounded-[8px] border border-[#e2e8f0] bg-white overflow-y-auto custom-scrollbar-minimal flex flex-col gap-2 text-[13px] text-[#475569]">
                          <p className="font-semibold text-black">1. Modalidad de atención seleccionada</p>
                          <p>Elige si deseas agendar tu cita médica con anticipación o ser atendido en este momento.</p>
                          <p className="font-semibold text-black">2. Especialista disponible</p>
                          <p>Dra. María Fernández · Medicina General y Nutrición clínica.</p>
                          <p className="font-semibold text-black">3. Canal prioritario</p>
                          <p>Conexión inmediata con médicos listos y espera estimada menor a 5 minutos.</p>
                          <p className="font-semibold text-black">4. Confirmación de consulta</p>
                          <p>Tus datos clínicos y motivos se envían de forma cifrada de extremo a extremo.</p>
                        </div>
                      </div>

                      {/* Demo Horizontal */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[12px] font-bold text-black uppercase tracking-wider">Demo Scroll Horizontal</span>
                        <div className="p-3 rounded-[8px] border border-[#e2e8f0] bg-white overflow-x-auto custom-scrollbar-minimal flex items-center gap-2 text-[13px] text-black">
                          {['Medicina General', 'Pediatría', 'Nutrición', 'Psicología', 'Ginecología', 'Oftalmología', 'Dermatología', 'Endocrinología'].map((item) => (
                            <span key={item} className="px-3 py-1.5 rounded-[6px] bg-[#f8fafc] border border-[#cbd5e1] whitespace-nowrap text-[12px] font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 2: ÁTOMOS ================= */}
            {activeSection === 'atomos' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">2. Átomos del Sistema</h1>
                  <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                    Cada elemento aquí es el componente React real importado desde <code>src/design-system/atoms/</code>, mostrado tal cual es sobre el lienzo sin contenedores adicionales.
                  </p>
                </div>

                {/* 1. Badges */}
                <StageBlock
                  title="Badges de Estado"
                  componentTag="<Badge />"
                  usedIn={['Historial de Consultas', 'Solicitar Chat', 'Familiares', 'Mascotas', 'Inicio']}
                  description="Etiquetas de estado semánticas con bordes suaves, colores estándar y tooltips interactivos."
                >
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 1. Disponibilidad Médica */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Disponibilidad Médica en Tiempo Real
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Especialistas activos para atención inmediata en Home y directorio
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="success">Disponible</Badge>
                          <Badge variant="success">Disponible ahora</Badge>
                        </div>
                      </div>

                      {/* 2. Filiación y Dependientes a Cargo */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Filiación y Dependientes a Cargo
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Tutela legal y menores a cargo en módulo de Familiares
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="success">Menor a cargo</Badge>
                          <Badge variant="success">Tutor legal</Badge>
                        </div>
                      </div>

                      {/* 3. Consultas en Curso y Citas Confirmadas */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Consultas Activas y Confirmadas
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Consultas en progreso o citas validadas en Historial
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="success">En proceso</Badge>
                          <Badge variant="success">Confirmada</Badge>
                        </div>
                      </div>

                      {/* 4. Citas Programadas y Fuera de Servicio */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Citas Programadas e Inactividad
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Consultas en agenda futura o médicos fuera de turno
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="neutral">Programada</Badge>
                          <Badge variant="neutral">No disponible</Badge>
                        </div>
                      </div>

                      {/* 5. Sala de Espera Virtual */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Sala de Espera y Turnos
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Pacientes aguardando turno en sala virtual de videoconsulta
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="info">En espera</Badge>
                        </div>
                      </div>

                      {/* 6. Disponibilidad Temporal Reducida */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Tiempo o Cupo Limitado & Estados Pendientes
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Turnos de guardia y consultas pendientes (etiqueta compacta 'Pendiente' con tooltip al pasar el cursor)
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <Badge variant="warning">Tiempo limitado</Badge>
                          <Badge variant="limitada" tooltipText="De recomendación: Pendiente">Pendiente (hover: recomendación)</Badge>
                          <Badge variant="limitada" tooltipText="De informe: Pendiente">Pendiente (hover: informe)</Badge>
                        </div>
                      </div>

                      {/* 7. Alertas de Conectividad y Red */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">
                            Alertas de Conexión y Sistema
                          </span>
                          <span className="text-[12px] text-[#64748b]">
                            Avisos de reconexión o fallas temporales de red en telemedicina
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="error">Error de conexión... reintentando</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* 1.1 Tooltips y Elementos de Información Flotante */}
                <StageBlock
                  title="Tooltips y Elementos de Información Flotante"
                  componentTag="<Tooltip text='...' /> / <Badge tooltipText='...' />"
                  usedIn={['Historial de Consultas', 'Badges de Estado', 'Botones de Acción', 'Iconos de Tabla']}
                  description="Píldoras flotantes oscuras (#0f172a) con microanimación de escala y fade para desglosar información contextual y sub-estados sin saturar las tablas ni romper el layout."
                >
                  <div className="flex flex-col gap-6">
                    {/* Control interactivo para forzar tooltips visibles */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                        Muestrario de Estados con Tooltip Contextual
                      </span>
                      <label className="flex items-center gap-2 text-[13px] font-medium text-black cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={demoForceTooltips}
                          onChange={(e) => setDemoForceTooltips(e.target.checked)}
                          className="w-4 h-4 rounded border-[#cbd5e1] text-[#d50475] focus:ring-0 cursor-pointer accent-[#d50475]"
                        />
                        <span>Mantener tooltips siempre visibles</span>
                      </label>
                    </div>

                    {/* Simulación fiel de la tabla de Consultas (como en la captura del usuario) */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-black">
                          1. Desglose de Sub-Estados en Tablas de Historial (Caso de Uso Real)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          La tabla muestra la etiqueta concisa 'Pendiente' o 'Terminada' para mantener las columnas alineadas; al pasar el cursor (hover), se despliega el sub-estado exacto ('De informe: Pendiente', 'De recomendación: Pendiente').
                        </span>
                      </div>

                      <div className="border border-[#e2e8f0] rounded-[8px] bg-white divide-y divide-[#f1f5f9] max-w-[560px]">
                        {/* Fila 1: Consulta Terminada */}
                        <div className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#fafafa] transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-black">Dra. Elena Ruiz</span>
                            <span className="text-[12px] text-[#64748b]">· Nutrición</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Tooltip text="Consulta finalizada e informe emitido" forceVisible={demoForceTooltips}>
                              <Badge variant="neutral">Terminada</Badge>
                            </Tooltip>
                            <ChevronDown className="w-4 h-4 text-[#64748b]" />
                          </div>
                        </div>

                        {/* Fila 2: Consulta Pendiente de informe (Exacto a la captura) */}
                        <div className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#fafafa] transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-black">Dr. Alejandro Gómez</span>
                            <span className="text-[12px] text-[#64748b]">· Pediatría</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Tooltip text="De informe: Pendiente" forceVisible={demoForceTooltips}>
                              <Badge variant="limitada">Pendiente</Badge>
                            </Tooltip>
                            <ChevronDown className="w-4 h-4 text-[#64748b]" />
                          </div>
                        </div>

                        {/* Fila 3: Consulta Pendiente de recomendación */}
                        <div className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#fafafa] transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-black">Dr. Javier Ortiz</span>
                            <span className="text-[12px] text-[#64748b]">· Medicina general</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Tooltip text="De recomendación: Pendiente" forceVisible={demoForceTooltips}>
                              <Badge variant="limitada">Pendiente</Badge>
                            </Tooltip>
                            <ChevronDown className="w-4 h-4 text-[#64748b]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Tooltips en Botones de Acción y Controles */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-black">
                          2. Aclaraciones Flotantes en Botones y Controles de Acción
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Identifican la acción sin requerir texto largo en el botón (útil para botones de iconos y barras de herramientas).
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <Tooltip text="Descargar informe médico en PDF" forceVisible={demoForceTooltips}>
                          <button
                            type="button"
                            className="h-[36px] px-3 rounded-[6px] border border-[#cbd5e1] hover:border-black bg-white flex items-center gap-2 text-[12px] font-bold text-black cursor-pointer transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-black" />
                            <span>Descargar</span>
                          </button>
                        </Tooltip>

                        <Tooltip text="Iniciar llamada telefónica directa: 911 23 12 14" forceVisible={demoForceTooltips}>
                          <button
                            type="button"
                            className="h-[36px] px-3 rounded-[6px] border border-[#cbd5e1] hover:border-black bg-white flex items-center gap-2 text-[12px] font-bold text-black cursor-pointer transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-black" />
                            <span>Llamar soporte</span>
                          </button>
                        </Tooltip>

                        <Tooltip text="Centro de ayuda y soporte (Help Center)" forceVisible={demoForceTooltips}>
                          <button
                            type="button"
                            className="w-9 h-9 rounded-full border border-[#cbd5e1] hover:border-black bg-white flex items-center justify-center text-black cursor-pointer transition-colors"
                          >
                            <Info className="w-4 h-4 text-black" />
                          </button>
                        </Tooltip>

                        <Tooltip text="Eliminar permanentemente este registro" forceVisible={demoForceTooltips}>
                          <button
                            type="button"
                            className="w-9 h-9 rounded-full border border-[#fecdd3] hover:bg-[#fef2f2] flex items-center justify-center text-[#e11d48] cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    {/* 3. Ficha Técnica y Especificaciones del Componente */}
                    <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex flex-col gap-2.5">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                        Especificación Técnica del Átomo Tooltip
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                        <div className="flex flex-col">
                          <span className="text-[#64748b]">Fondo & Sombra</span>
                          <span className="font-bold text-black">#0f172a (Slate-950) · shadow-lg</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#64748b]">Tipografía</span>
                          <span className="font-bold text-black">11px font-medium blanco (#fff)</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#64748b]">Radio & Padding</span>
                          <span className="font-bold text-black">rounded-[4px] · px-2 py-0.5</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#64748b]">Microinteracción</span>
                          <span className="font-bold text-black">Fade + scale-95 a scale-100 (150ms)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* 2. Botones */}
                <StageBlock
                  title="Botones Estándar & Operaciones de Consulta"
                  componentTag="<Button /> / Modal Actions"
                  usedIn={['Inicio', 'Consultas', 'Historia Clínica', 'Familiares', 'Mascotas', 'Modales']}
                  description="Botones con radio estándar homologado de 8px (cuadrados). Mismo peso, mismo tamaño y en mayúsculas en ambos niveles. Incluye toggle para verlos con y sin íconos, variantes completas (primario, secundario rosa con borde #fbcfe8, secundario neutro, destructivo y bloqueado)."
                >
                  <div className="flex flex-col gap-6">
                    {/* Control interactivo para alternar con / sin iconos */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                        Muestrario de Variantes Homologadas
                      </span>
                      <label className="flex items-center gap-2 text-[13px] font-medium text-black cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={demoButtonsWithIcons}
                          onChange={(e) => setDemoButtonsWithIcons(e.target.checked)}
                          className="w-4 h-4 rounded border-[#cbd5e1] text-[#d50475] focus:ring-0 cursor-pointer accent-[#d50475]"
                        />
                        <span>Mostrar con íconos</span>
                      </label>
                    </div>

                    {/* 1. Botones Estándar / Medianos (Nivel 1) */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black uppercase tracking-wide">
                          1. Botones Estándar / Medianos (Header, CTAs Globales)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Altura 40px · Mismo peso · Mayúsculas
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Primario CTA */}
                        <Button variant="primary">
                          {demoButtonsWithIcons && <Plus className="w-4 h-4 text-white" />}
                          <span>SOLICITA UNA CITA</span>
                        </Button>

                        {/* Secundario Rosa (borde rosa clarito #fbcfe8, sin fondo rosa claro) */}
                        <Button variant="secondary">
                          {demoButtonsWithIcons && <ScanFace className="w-4 h-4 text-[#d50475]" />}
                          <span>INICIAR ESCANEO</span>
                        </Button>

                        {/* Secundario Neutro (borde gris) */}
                        <Button variant="outline">
                          <span>COMPLETA TU PERFIL MÉDICO</span>
                          {demoButtonsWithIcons && <ChevronRight className="w-4 h-4 text-black" />}
                        </Button>

                        {/* Destructivo Rojo */}
                        <Button variant="destructive">
                          {demoButtonsWithIcons && <Trash2 className="w-4 h-4 text-white" />}
                          <span>DAR DE BAJA</span>
                        </Button>

                        {/* Bloqueado / No disponible */}
                        <Button variant="inactive" tooltipText="Activo 15 minutos antes">
                          <span>NO DISPONIBLE</span>
                        </Button>
                      </div>
                    </div>

                    {/* División visual entre las dos filas como solicitó el usuario */}
                    <div className="h-[1px] bg-[#e2e8f0] w-full my-1" />

                    {/* 2. Botones Operativos de Consulta (Nivel 2) */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black uppercase tracking-wide">
                          2. Botones Operativos de Consulta (Fila de Historial & Detalle)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Altura 40px · Mismo peso · Mayúsculas
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Primario Consulta */}
                        <Button variant="consulta-primary">
                          {demoButtonsWithIcons && <Video className="w-4 h-4 text-white" />}
                          <span>ACCEDER A LA CONSULTA</span>
                        </Button>

                        {/* Secundario Rosa Consulta (sin fondo rosa claro) */}
                        <Button variant="consulta-secondary">
                          {demoButtonsWithIcons && <Calendar className="w-4 h-4 text-[#d50475]" />}
                          <span>REAGENDAR CITA</span>
                        </Button>

                        {/* Secundario Neutro Conversación */}
                        <Button variant="consulta-outline">
                          {demoButtonsWithIcons && <MessageSquare className="w-4 h-4 text-[#64748b]" />}
                          <span>VER CONVERSACIÓN</span>
                        </Button>

                        {/* Secundario Neutro Cancelar */}
                        <Button variant="consulta-outline">
                          {demoButtonsWithIcons && <X className="w-4 h-4 text-[#64748b]" />}
                          <span>CANCELAR CONSULTA</span>
                        </Button>

                        {/* Destructivo Consulta */}
                        <Button variant="destructive">
                          {demoButtonsWithIcons && <Trash2 className="w-4 h-4 text-white" />}
                          <span>DAR DE BAJA</span>
                        </Button>

                        {/* Bloqueado Consulta */}
                        <Button variant="consulta-inactive" tooltipText="Activo 15 minutos antes">
                          <span>NO DISPONIBLE</span>
                        </Button>
                      </div>
                    </div>

                    {/* Especificaciones clave */}
                    <div className="flex flex-wrap gap-2 text-[12px] pt-1">
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        ✓ Altura estándar 40px, mismo peso bold y mismo tamaño de texto (13px) en todos los botones
                      </span>
                      <span className="px-2.5 py-1 rounded bg-white border border-[#fbcfe8] text-[#d50475] font-medium">
                        ✓ Botón secundario sin fondo rosa claro (fondo blanco, borde #fbcfe8 y texto magenta)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        ✓ Mismo tamaño de icono (16px) en todos los botones
                      </span>
                    </div>

                    <div className="h-[1px] bg-[#f1f5f9] w-full my-2" />

                    {/* 3. Avatar de Usuario / Iniciales (Homologado) */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-black">
                          3. Avatar con Iniciales (Cuadrado / Homologado)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Elemento estándar para identificar usuarios y dependientes en Sidebar, Perfil y Fichas. Alineación vertical centrada con fondo neutral #f1f5f9 y borde #cbd5e1.
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <div className="flex items-center gap-3 p-3 border border-[#e2e8f0] rounded-[8px] bg-white">
                          <div className="w-[30px] h-[30px] rounded-[6px] bg-[#f1f5f9] text-[#0f172a] font-bold text-[12px] flex items-center justify-center shrink-0 border border-[#cbd5e1] leading-none text-center">
                            <span className="leading-none select-none">AN</span>
                          </div>
                          <span className="text-[13px] font-medium text-black">Small (30x30px - Inputs)</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 border border-[#e2e8f0] rounded-[8px] bg-white">
                          <div className="w-[40px] h-[40px] rounded-[6px] bg-[#f1f5f9] text-[#0f172a] font-bold text-[14px] flex items-center justify-center shrink-0 border border-[#cbd5e1] leading-none text-center">
                            <span className="leading-none select-none">AN</span>
                          </div>
                          <span className="text-[13px] font-medium text-black">Medium (40x40px - Sidebar)</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 border border-[#e2e8f0] rounded-[8px] bg-white">
                          <div className="w-[56px] h-[56px] rounded-[8px] bg-[#f1f5f9] text-[#0f172a] font-bold text-[18px] flex items-center justify-center shrink-0 border border-[#cbd5e1] leading-none text-center">
                            <span className="leading-none select-none">AN</span>
                          </div>
                          <span className="text-[13px] font-medium text-black">Large (56x56px - Historia Clínica)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* 4. AutosaveIndicator */}
                <StageBlock
                  title="Autoguardado"
                  componentTag="<AutosaveIndicator />"
                  usedIn={['Cuestionario Médico', 'Mis Documentos Médicos']}
                  description="Avisos discretos de guardado automático con estados 'Guardado' y 'Error'."
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <AutosaveIndicator status="saved" />
                    <AutosaveIndicator status="error" />
                  </div>
                </StageBlock>

                {/* 5. SegmentedToggle */}
                <StageBlock
                  title="Segmented Toggle"
                  componentTag="<SegmentedToggle />"
                  usedIn={['Biometría', 'Cuestionario Médico', 'Modal Ginecología']}
                  description="Selector binario Sí/No con botón seleccionado en negro y radio de 6px."
                >
                  <div className="flex flex-wrap items-center gap-8">
                    <SegmentedToggle
                      value={demoToggle}
                      onChange={(v) => setDemoToggle(v)}
                    />
                  </div>
                </StageBlock>

                {/* 6. Checkbox & Radio */}
                <StageBlock
                  title="Checkbox & Radio"
                  componentTag="<Checkbox /> / <Radio />"
                  usedIn={['Biometría', 'Modales de Consulta', 'Login', 'Cuestionario Médico']}
                  description="Controles de selección múltiple (cuadrados) y única (radiales) con acento rosa CTA y contenedores de tarjeta cuadrados (rounded-none)."
                >
                  <div className="flex flex-col gap-8">
                    {/* PARTE A: Checkboxes Cuadrados (Selección Múltiple) */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-black">
                          A. Selección Múltiple — Checkboxes Cuadrados (Estilo Biometría)
                        </span>
                        <span className="text-[12px] text-[#64748b]">Permite chequear varias opciones</span>
                      </div>

                      {/* Estados puros de Checkbox */}
                      <div className="flex flex-wrap items-center gap-6 pt-1">
                        <Checkbox checked={true} label="Marcado" />
                        <Checkbox checked={false} label="Desmarcado" />
                        <Checkbox checked={true} disabled label="Deshabilitado marcado" />
                        <Checkbox checked={false} disabled label="Deshabilitado desmarcado" />
                      </div>

                      {/* Ejemplo interactivo múltiple en tarjetas */}
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-[12px] font-medium text-[#475569]">
                          Ejemplo de selección múltiple (puedes marcar o desmarcar varios síntomas):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-[620px]">
                          {['Fiebre', 'Tos frecuente', 'Cansancio'].map((sintoma) => {
                            const isChecked = demoMultipleChecks.includes(sintoma);
                            return (
                              <div
                                key={sintoma}
                                onClick={() => {
                                  setDemoMultipleChecks((prev) =>
                                    prev.includes(sintoma)
                                      ? prev.filter((s) => s !== sintoma)
                                      : [...prev, sintoma]
                                  );
                                }}
                                className={`h-[44px] px-3.5 rounded-none border flex items-center gap-3 cursor-pointer transition-colors select-none ${
                                  isChecked
                                    ? 'border-[#cbd5e1] bg-[#f8fafc] text-black font-semibold'
                                    : 'border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] bg-white text-black font-normal'
                                }`}
                              >
                                <Checkbox checked={isChecked} size="sm" />
                                <span className="text-[14px]">{sintoma}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-[#f1f5f9] w-full" />

                    {/* PARTE B: Radiales / Radio Buttons (Selección Única) */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-black">
                          B. Selección Única / Exclusiva — Radiales Circulares (Radio Buttons)
                        </span>
                        <span className="text-[12px] text-[#64748b]">Solo una opción a la vez (sin doble check)</span>
                      </div>

                      {/* Estados puros de Radio */}
                      <div className="flex flex-wrap items-center gap-6 pt-1">
                        <Radio checked={true} label="Seleccionado" />
                        <Radio checked={false} label="Sin seleccionar" />
                        <Radio checked={true} disabled label="Deshabilitado seleccionado" />
                        <Radio checked={false} disabled label="Deshabilitado sin seleccionar" />
                      </div>

                      {/* Ejemplo interactivo exclusivo en tarjetas de especialidad */}
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-[12px] font-medium text-[#475569]">
                          Ejemplo de selección única (al hacer clic en una se desmarca la otra):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-[480px]">
                          {['Sexología', 'Medicina General'].map((opt) => {
                            const isSel = demoRadioSpecialty === opt;
                            return (
                              <div
                                key={opt}
                                onClick={() => setDemoRadioSpecialty(opt)}
                                className={`h-[44px] px-3.5 rounded-none border flex items-center gap-3 cursor-pointer transition-colors select-none ${
                                  isSel
                                    ? 'border-[#cbd5e1] bg-[#f8fafc] text-black font-semibold'
                                    : 'border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] bg-white text-black font-normal'
                                }`}
                              >
                                <Radio checked={isSel} size="sm" />
                                <span className="text-[14px]">{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* 7. Calendarios de Citas & Selectores de Horario */}
                <StageBlock
                  title="Calendario y Horarios"
                  componentTag="<CalendarMonthGrid /> / <CalendarDaySlots />"
                  usedIn={['Modal Videoconsulta', 'Modal Solicitar Chat']}
                  description="Calendario mensual y turnos en columnas integrados con el sistema de botones estándar (altura 40px, esquinas 8px, texto 13px bold, primario #d50475 al seleccionar, sin fondos rosa claro)."
                >
                  <div className="flex flex-col gap-8">
                    {/* Modelo 1: Calendario Mensual + Franjas de Hora Adyacentes */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-black">
                          1. Calendario Mensual con Franjas de Hora Adyacentes (Videoconsulta)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Navegación de mes con chevrons discretos y cuadrícula de días (D L M M J V S). Día seleccionado homologado con botón primario magenta (#d50475) y texto blanco. Franja horaria con botones estándar &lt;Button /&gt; (40px de altura, esquinas 8px, texto 13px bold, primario activo y outline inactivo). Sin fondos rosa claro.
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start pt-1">
                        <CalendarMonthGrid
                          selectedDay={demoCalendarDay}
                          onSelectDay={setDemoCalendarDay}
                          selectedMonthName="Octubre 2026"
                          colorTheme="neutral"
                        />

                        <div className="flex flex-col gap-2 w-full sm:w-[140px]">
                          <span className="text-[12px] font-bold text-[#64748b]">Horario disponible</span>
                          {['09:30', '11:00', '16:15', '18:00'].map((time) => (
                            <Button
                              key={time}
                              variant={demoCalendarTime === time ? 'primary' : 'outline'}
                              onClick={() => setDemoCalendarTime(time)}
                              className="w-full h-[40px] text-[13px] font-bold rounded-[8px]"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-[430px] pt-1">
                        <SelectedAppointmentBanner
                          dateText={`Sábado ${demoCalendarDay} de Octubre`}
                          timeText={`${demoCalendarTime} hrs`}
                        />
                      </div>
                    </div>

                    <div className="h-[1px] bg-[#f1f5f9] w-full" />

                    {/* Modelo 2: Selector de Días y Franjas Horarias en Columnas */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-black">
                          2. Selector de Días y Turnos en Columnas (Solicitar Chat / Turnos Médicos)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Visualización por días de la semana con franjas horarias directas. Columna activa con borde magenta (#d50475) sobre fondo blanco limpio. Franjas horarias 100% integradas con &lt;Button /&gt; estándar (altura 40px, esquinas 8px, texto 13px bold, primario activo #d50475 y outline inactivo #cbd5e1). Sin fondos rosa claro.
                        </span>
                      </div>

                      <div className="max-w-[560px] pt-1">
                        <CalendarDaySlots
                          days={[
                            { dayName: 'HOY', dateNumber: '22 Oct', slots: ['09:30', '11:00'] },
                            { dayName: 'MAÑANA', dateNumber: '23 Oct', slots: ['09:30', '11:00'] },
                            { dayName: 'MIÉRCOLES', dateNumber: '25 Oct', slots: ['09:30', '11:00'] },
                            { dayName: 'VIERNES', dateNumber: '27 Oct', slots: ['09:30', '11:00'] },
                          ]}
                          selectedDay={demoSlotDay}
                          selectedTime={demoSlotTime}
                          onSelectSlot={(day, time) => {
                            setDemoSlotDay(day);
                            setDemoSlotTime(time);
                          }}
                          colorTheme="neutral"
                        />
                      </div>

                      <div className="max-w-[560px] pt-1">
                        <SelectedAppointmentBanner
                          dateText={demoSlotDay}
                          timeText={`${demoSlotTime} hrs`}
                        />
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* 8. ProgressCheckCircle & StepperCheck */}
                <StageBlock
                  title="Progreso y Stepper Check"
                  componentTag="<ProgressCheckCircle /> / <StepperCheck />"
                  usedIn={['Cuestionario Médico', 'Modal Videoconsulta', 'Modal Solicitar Chat', 'Biometría']}
                  description="Anillos circulares de porcentaje y checks multipaso en tono vino #831843."
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

                {/* 9. Notificaciones Toast */}
                <StageBlock
                  title="Notificaciones Toast de Estado"
                  componentTag="<Toast variant='info' | 'success' | 'warning' | 'error' />"
                  usedIn={['Help Center', 'Modal Documentos', 'Historia Clínica', 'Familiares', 'Mascotas']}
                  description="Mensajes flotantes de retroalimentación sin bordes (border-0), con sombra flotante y textos neutrales negros (#000000) tanto en título como en descripción. Reemplazan los checks en línea garantizando consistencia visual."
                >
                  <div className="flex flex-col gap-6">
                    {/* Botones para probar toasts flotantes en vivo */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                        Probar Toasts en Vivo (Flotante)
                      </span>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            setDemoActiveToast({
                              variant: 'info',
                              title: 'Copiado al portapapeles',
                              message: 'Correo copiado: soporte@everhealth.es',
                            })
                          }
                          className="h-[40px] text-[13px] font-bold uppercase"
                        >
                          Probar Copiar Correo (Info)
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            setDemoActiveToast({
                              variant: 'info',
                              title: 'Llamada telefónica',
                              message: 'Iniciando llamada al 911 23 12 14...',
                            })
                          }
                          className="h-[40px] text-[13px] font-bold uppercase"
                        >
                          Probar Llamada (Info)
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            setDemoActiveToast({
                              variant: 'success',
                              title: 'Operación exitosa',
                              message: 'Documento guardado correctamente.',
                            })
                          }
                          className="h-[40px] text-[13px] font-bold uppercase"
                        >
                          Probar Guardado (Success)
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            setDemoActiveToast({
                              variant: 'warning',
                              title: 'Alerta de sistema',
                              message: 'Verifica la iluminación frontal de tu cámara.',
                            })
                          }
                          className="h-[40px] text-[13px] font-bold uppercase"
                        >
                          Probar Alerta (Warning)
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            setDemoActiveToast({
                              variant: 'error',
                              title: 'Elemento eliminado',
                              message: 'Archivo eliminado de tu historia clínica.',
                            })
                          }
                          className="h-[40px] text-[13px] font-bold uppercase"
                        >
                          Probar Eliminación (Error)
                        </Button>
                      </div>
                    </div>

                    {/* Previews visuales estáticos de las 4 variantes */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                        Variantes Oficiales del Sistema
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* 1. Info */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-[8px] bg-[#f8fafc]">
                          <span className="text-[11px] font-bold text-[#0284c7] uppercase">
                            Info (Copiar datos & Llamadas)
                          </span>
                          <Toast
                            inline
                            variant="info"
                            title="Copiado al portapapeles"
                            message="Dirección copiada: C/ Naciones 10, 28006 Madrid"
                          />
                        </div>

                        {/* 2. Success */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-[8px] bg-[#f8fafc]">
                          <span className="text-[11px] font-bold text-[#16a34a] uppercase">
                            Success (Confirmación & Guardado)
                          </span>
                          <Toast
                            inline
                            variant="success"
                            title="Documento añadido"
                            message="Archivo 'analitica_sangre.pdf' guardado con éxito."
                          />
                        </div>

                        {/* 3. Warning */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-[8px] bg-[#f8fafc]">
                          <span className="text-[11px] font-bold text-[#d97706] uppercase">
                            Warning (Recomendaciones & Permisos)
                          </span>
                          <Toast
                            inline
                            variant="warning"
                            title="Permisos de cámara"
                            message="Comprueba que tu navegador tenga habilitado el acceso a la cámara."
                          />
                        </div>

                        {/* 4. Error */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-[8px] bg-[#f8fafc]">
                          <span className="text-[11px] font-bold text-[#e11d48] uppercase">
                            Error (Eliminación & Bajas)
                          </span>
                          <Toast
                            inline
                            variant="error"
                            title="Documento eliminado"
                            message="Se ha eliminado el informe de antecedentes médicos."
                          />
                        </div>
                      </div>
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
                  <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                    Todos los campos comparten altura de 44px, fondo blanco puro (<code>bg-white</code>), título regular negro, texto 16px regular negro, borde de foco oscuro neutro (<code>focus:border-black</code>) y hover neutral sin rosas.
                  </p>
                </div>

                {/* 1. TextInput */}
                <StageBlock
                  title="Input de Texto"
                  componentTag="<TextInput />"
                  usedIn={['Familiares', 'Mascotas', 'Cuestionario Médico']}
                  description="Campos de texto estándar con altura de 44px, etiqueta superior y foco negro."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[680px]">
                    <TextInput
                      label="Nombre y apellidos*"
                      defaultValue="Alejandro Navarro"
                      placeholder="Ej. Alejandro Navarro"
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
                  title="Input de Búsqueda"
                  componentTag="<TextInput leftIcon={<Search />} />"
                  usedIn={['Historial de Consultas', 'Solicitar Chat', 'Help Center']}
                  description="Buscador con icono de lupa integrado para filtrar tablas y directorios."
                >
                  <div className="max-w-[480px]">
                    <TextInput
                      placeholder="Buscar por nombre, especie, raza, tutor..."
                      leftIcon={<Search className="w-5 h-5" />}
                    />
                  </div>
                </StageBlock>

                {/* 3. Dropdown */}
                <StageBlock
                  title="Dropdown Selector"
                  componentTag="<Dropdown />"
                  usedIn={['Solicitar Chat', 'Historial', 'Mascotas', 'Familiares', 'Modales de Consulta']}
                  description="Selector personalizado con ChevronDown en tamaño Standard (44px) y Compacto (36px)."
                >
                  <div className="flex flex-col gap-6">
                    {/* Tamaño Standard (Formularios y Modales) */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[13px] font-bold text-black uppercase tracking-wider">
                        1. Tamaño Standard (size="default", h-44px) para formularios
                      </span>
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
                    </div>

                    {/* Tamaño Compacto (Filtros en barras como Solicitar Chat e Historial) */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-[#f1f5f9]">
                      <span className="text-[13px] font-bold text-black uppercase tracking-wider">
                        2. Tamaño Compacto (size="sm", h-36px) para barras de filtros
                      </span>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="w-[180px]">
                          <Dropdown
                            size="sm"
                            value="disponible"
                            onChange={() => {}}
                            options={[
                              { value: 'todas', label: 'Disponibilidad: Todas' },
                              { value: 'disponible', label: 'Disponible ahora' },
                              { value: 'limitada', label: 'Disponibilidad limitada' },
                            ]}
                          />
                        </div>

                        <div className="w-[180px]">
                          <Dropdown
                            size="sm"
                            value="Medicina General"
                            onChange={() => {}}
                            options={[
                              { value: 'todas', label: 'Especialidad: Todas' },
                              { value: 'Medicina General', label: 'Medicina General' },
                              { value: 'Pediatría', label: 'Pediatría' },
                              { value: 'Nutrición', label: 'Nutrición' },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* 4. ColorPickerDropdown */}
                <StageBlock
                  title="Selector de Color"
                  componentTag="<ColorPickerDropdown />"
                  usedIn={['Mascotas']}
                  description="Paleta flotante con tonos de mascota e input de código HEX."
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
                  <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                    Componentes compuestos importados directamente desde <code>src/design-system/molecules/</code> y mostrados sin contenedores envolventes.
                  </p>
                </div>

                {/* 1. ActionMenu */}
                <StageBlock
                  title="Menú de Acciones"
                  componentTag="<ActionMenu />"
                  usedIn={['Historial de Consultas', 'Familiares', 'Mascotas', 'Inicio']}
                  description="Menú desplegable de 280px para acciones rápidas y opciones de fila."
                >
                  <div className="flex flex-wrap items-start gap-8">
                    {/* Variante 1: Solicitar cita */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                        Variante 1: &quot;solicitar-cita&quot;
                      </span>
                      <ActionMenu
                        variant="solicitar-cita"
                        className="w-[280px]"
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

                    {/* Variante 2: Standard */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                        Variante 2: &quot;standard&quot;
                      </span>
                      <ActionMenu
                        variant="standard"
                        className="w-[280px]"
                        items={[
                          { id: '1', label: 'Solicitar chat', icon: <MessageSquare className="w-5 h-5" /> },
                          { id: '2', label: 'Solicitar videoconsulta', icon: <Video className="w-5 h-5" /> },
                          { id: '3', label: 'Biometría facial', icon: <ScanFace className="w-5 h-5" /> },
                          { id: '4', label: 'Añadir familia', icon: <Users className="w-5 h-5" /> },
                          { id: '5', label: 'Añadir mascota', icon: <PawPrint className="w-5 h-5" /> },
                        ]}
                      />
                    </div>
                  </div>
                </StageBlock>

                {/* 2. AvailableDoctorsRow */}
                <StageBlock
                  title="Médicos Disponibles"
                  componentTag="<AvailableDoctorsRow />"
                  usedIn={['Inicio (Atención Inmediata)']}
                  description="Avatares superpuestos con tiempo estimado de espera."
                >
                  <AvailableDoctorsRow />
                </StageBlock>

                {/* 3. AssignedDoctorCard */}
                <StageBlock
                  title="Médico Asignado"
                  componentTag="<AssignedDoctorCard />"
                  usedIn={['Modal Solicitar Chat']}
                  description="Ficha del doctor colegiado con avatar, nombre y especialidad."
                >
                  <AssignedDoctorCard />
                </StageBlock>

                {/* 4. NavigationFooter */}
                <StageBlock
                  title="Barra de Navegación"
                  componentTag="<NavigationFooter />"
                  usedIn={['Biometría', 'Cuestionario Médico', 'Onboarding']}
                  description="Barra inferior fija con botones Atrás y Siguiente / Finalizar."
                >
                  <NavigationFooter
                    onBack={() => {}}
                    onNext={() => {}}
                    backText="Atrás"
                    nextText="Continuar"
                  />
                </StageBlock>

                {/* 5. PaginationEvents (Paginación de Carga Progresiva) */}
                <StageBlock
                  title="1. Paginador de Eventos Progresivo"
                  componentTag="<PaginationEvents />"
                  usedIn={['Inicio (Próximas consultas)', 'EVR-18']}
                  description="Control interactivo de carga progresiva para expandir o contraer listados temporales de citas y eventos."
                >
                  <PaginationEvents
                    visibleCount={demoPaginationExpanded ? 5 : 1}
                    totalCount={5}
                    isExpanded={demoPaginationExpanded}
                    onToggle={() => setDemoPaginationExpanded(!demoPaginationExpanded)}
                  />
                </StageBlock>

                {/* 6. TablePagination (Paginación Maestra de Gestión) */}
                <StageBlock
                  title="2. Paginación Maestra de Tablas (Estándar 5 Controles)"
                  componentTag="<TablePagination />"
                  usedIn={['Historial de Consultas', 'Familiares', 'Mascotas', 'Gestión Médica']}
                  description="Controles numéricos completos de paginación para tablas maestras: salto a primera página, anterior, páginas activas (1, 2), siguiente y última página, con contador dinámico de entradas."
                >
                  <TablePagination
                    currentPage={1}
                    totalPages={3}
                    visibleCount={5}
                    totalCount={20}
                    entityLabel="registros"
                  />
                </StageBlock>

                {/* 6b. TablePaginationCompact (Paginación Compacta de Modales) */}
                <StageBlock
                  title="3. Paginación Compacta de Modales (3 Controles: Anterior, Página, Siguiente)"
                  componentTag="<TablePaginationCompact />"
                  usedIn={['ModalDocumentos (Informes médicos)', 'Modales con tablas auxiliares']}
                  description="Variante ultra-compacta diseñada para el espacio reducido de modales y diálogos. Consta de 3 botones (< 1 >) y contador de registros simplificado."
                >
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <TablePaginationCompact
                      currentPage={1}
                      totalPages={2}
                      visibleCount={5}
                      totalCount={10}
                      entityLabel="documentos"
                    />
                  </div>
                </StageBlock>

                {/* 7. CompletionMedalIllustration */}
                <StageBlock
                  title="Ilustración de Medalla"
                  componentTag="<CompletionMedalIllustration />"
                  usedIn={['Cuestionario Médico']}
                  description="Ilustración vectorial de medalla al finalizar cuestionarios."
                >
                  <CompletionMedalIllustration size={140} />
                </StageBlock>

                {/* 8. ModalActionGroup (Composición de Botones de Modal) */}
                <StageBlock
                  title="Barras de Acción de Modal & Diálogos (Composición de Botones)"
                  componentTag="<ModalActionGroup /> + <Button />"
                  usedIn={['ModalVideoConsulta', 'ModalSolicitarChat', 'Familiares', 'Mascotas', 'ModalDocumentos', 'ConfirmDeactivateModal']}
                  description="Composición homologada de botones para modales y diálogos. Clasificada como Molécula (composición de átomos) y construida exclusivamente con nuestro componente <Button /> del sistema, garantizando mismo peso bold, altura de 40px, esquinas de 8px y todas las acciones en MAYÚSCULAS."
                >
                  <div className="flex flex-col gap-6">
                    {/* Demostración interactiva de la Molécula ModalActionGroup */}
                    <div className="p-4 rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-3">
                      <span className="text-[12px] font-bold text-black uppercase tracking-wider">
                        Demostración del Componente Reutilizable &lt;ModalActionGroup /&gt;
                      </span>
                      <ModalActionGroup
                        infoText="* Todos los campos son obligatorios"
                        onCancel={() => alert('Cancelar pulsado')}
                        onConfirm={() => alert('Guardar pulsado')}
                        cancelText="CANCELAR"
                        confirmText="GUARDAR"
                      />
                    </div>

                    {/* Muestrario de Composiciones de Botones de Modal (Tarjetas A, B, C, D) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {/* Tarjeta A: Modal de Citas (Video / Chat) */}
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-black">
                            A. Modal de Citas (Video / Chat)
                          </span>
                          <span className="text-[11px] text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                            h: 40px · r: 8px
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button variant="primary">
                            CONFIRMAR CITA
                          </Button>
                          <Button variant="inactive" tooltipText="Estado incompleto / bloqueado">
                            CONFIRMAR CITA (BLOQUEADO)
                          </Button>
                        </div>
                        <span className="text-[11px] text-[#64748b]">
                          Usado en <code>ModalVideoConsulta</code> y <code>ModalSolicitarChat</code>.
                        </span>
                      </div>

                      {/* Tarjeta B: Formulario Guardar / Cancelar */}
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-black">
                            B. Formularios de Datos (Familiares / Mascotas)
                          </span>
                          <span className="text-[11px] text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                            h: 40px · r: 8px
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button variant="outline">
                            CANCELAR
                          </Button>
                          <Button variant="primary">
                            GUARDAR
                          </Button>
                        </div>
                        <span className="text-[11px] text-[#64748b]">
                          Mismo tamaño, mismo peso bold y ambos en mayúsculas en formularios.
                        </span>
                      </div>

                      {/* Tarjeta C: Diálogo Crítico de Baja */}
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-black">
                            C. Diálogo Crítico de Confirmación (Baja)
                          </span>
                          <span className="text-[11px] text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                            h: 40px · r: 8px
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button variant="outline">
                            CANCELAR
                          </Button>
                          <Button variant="destructive">
                            DAR DE BAJA
                          </Button>
                        </div>
                        <span className="text-[11px] text-[#64748b]">
                          Usado en <code>ConfirmDeactivateModal</code> para acciones destructivas.
                        </span>
                      </div>

                      {/* Tarjeta D: Clínico & Documental */}
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-black">
                            D. Modales Clínicos & Documentales
                          </span>
                          <span className="text-[11px] text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                            h: 40px · r: 8px
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Button variant="outline">
                            DESCARTAR
                          </Button>
                          <Button variant="primary">
                            CONFIRMAR
                          </Button>
                          <Button variant="secondary">
                            <Plus className="w-4 h-4 text-[#d50475]" />
                            <span>SUBIR DOC</span>
                          </Button>
                        </div>
                        <span className="text-[11px] text-[#64748b]">
                          Usado en <code>ModalGinecologia</code> y <code>ModalDocumentos</code>.
                        </span>
                      </div>
                    </div>

                    {/* Reglas de Arquitectura y Estándar Homologado */}
                    <div className="p-4 rounded-[8px] bg-[#fff1f2] border border-[#fecdd3] flex flex-col gap-2.5 text-[12px] text-[#881337]">
                      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[#9f1239]">
                        <AlertCircle className="w-4 h-4 shrink-0 text-[#e11d48]" />
                        <span>Reglas Homologadas de Modales y Notificaciones</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed pl-1">
                        <li>
                          <strong>Un Solo Botón Primario por Modal:</strong> Prohibido doble botón primario rosa en cualquier ventana emergente. Las acciones complementarias (ej. "SUBIR DOCUMENTO") deben ser estrictamente <code>variant="secondary"</code>.
                        </li>
                        <li>
                          <strong>Toasts Flotantes en Bottom-Right:</strong> Todo check o confirmación de éxito ("Archivo subido", "Categoría guardada") debe emitirse como <code>&lt;Toast /&gt;</code> flotante en <code>fixed bottom-6 right-6 z-[9999]</code> exterior al modal, nunca como banner dentro del diálogo.
                        </li>
                        <li>
                          <strong>Formularios de Prototipo:</strong> Si faltan campos obligatorios, el CTA se muestra en gris (<code>bg-[#cbd5e1] text-[#475569]</code>), pero al tratarse de un prototipo interactivo, el clic se mantiene siempre operativo sin bloquear la navegación.
                        </li>
                        <li>
                          <strong>Dropdowns en Tablas de Modal:</strong> Las tablas contenedoras deben usar <code>overflow-visible</code> con dropdowns de alto z-index (<code>z-[90]</code> y <code>z-[100]</code>) y <code>dropUp</code> en filas inferiores para evitar cualquier barra de scroll indeseada.
                        </li>
                      </ul>
                    </div>
                  </div>
                </StageBlock>

                {/* Molécula: Navegación por Pestañas (Tabs) */}
                <StageBlock
                  title="Navegación Horizontal por Pestañas (Tabs)"
                  componentTag="<Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} variant='line' | 'minimal' />"
                  usedIn={['MiPerfil (Configuración de Cuenta)', 'HelpCenter']}
                  description="Molécula oficial para navegación horizontal por pestañas. Soporta variante 'line' (maestra con indicador rosa) y variante 'minimal' (deslizante ligero sin líneas, tonos 50/100 y texto 500 al seleccionar)."
                >
                  <div className="flex flex-col gap-8">
                    {/* Variante 1: Estándar con Línea */}
                    <div className="w-full bg-white p-6 border border-[#e2e8f0] rounded-[10px]">
                      <div className="flex flex-col gap-1 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[17px] font-bold text-black">Variante 1: Línea (Estándar / Perfil)</span>
                          <span className="px-2 py-0.5 rounded bg-[#fce7f3] text-[#d50475] text-[11px] font-bold">variant="line"</span>
                        </div>
                        <span className="text-[13px] text-[var(--color-page-subtitle)] font-normal">
                          Pestaña activa en rosa (#d50475) con indicador inferior de 2.5px superpuesto al borde continuo #e2e8f0.
                        </span>
                      </div>

                      <Tabs
                        tabs={[
                          { id: 'datos-personales', label: 'Datos personales' },
                          { id: 'seguridad', label: 'Seguridad' },
                        ]}
                        activeTab={demoActiveTab}
                        onChange={setDemoActiveTab}
                        variant="line"
                      />

                      <div className="mt-4 p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                          Pestaña activa: <strong className="text-black capitalize">{demoActiveTab.replace('-', ' ')}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Variante 2: Minimalista sin Líneas (Help Center) */}
                    <div className="w-full bg-white p-6 border border-[#e2e8f0] rounded-[10px]">
                      <div className="flex flex-col gap-1 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[17px] font-bold text-black">Variante 2: Minimalista Deslizante (Help Center)</span>
                          <span className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] text-[11px] font-bold">variant="minimal"</span>
                        </div>
                        <span className="text-[13px] text-[var(--color-page-subtitle)] font-normal">
                          Sin línea inferior. Fondo en escala gris 50/100 suave, texto inactivo en gris 400 y activo en gris 500 máximo (sin negro).
                        </span>
                      </div>

                      <div className="p-3 bg-[#ffffff] border border-[#f1f5f9] rounded-[8px]">
                        <Tabs
                          tabs={[
                            { id: 'soporte', label: 'Soporte técnico' },
                            { id: 'biometria', label: 'Biometría' },
                            { id: 'videoconsulta', label: 'Videoconsulta' },
                            { id: 'chat', label: 'Chat médico' },
                            { id: 'historial', label: 'Historia clínica' },
                          ]}
                          activeTab={demoMinimalTab}
                          onChange={setDemoMinimalTab}
                          variant="minimal"
                        />
                      </div>

                      <div className="mt-4 p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                          Categoría Help Center seleccionada: <strong className="text-slate-600 capitalize">{demoMinimalTab}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 5: ORGANISMOS ================= */}
            {activeSection === 'organismos' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">5. Organismos Ensamblados</h1>
                  <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                    Bloques del Home e Historial de Consultas construidos combinando los átomos y moléculas anteriores.
                  </p>
                </div>

                {/* Organismo 1: Card Atención Inmediata */}
                <StageBlock
                  title="Card Atención Inmediata"
                  componentTag="<AvailableDoctorsRow /> + <Button /> + <ActionMenu />"
                  usedIn={['Inicio']}
                  description="Bloque de bienvenida y acceso directo a videoconsulta o chat."
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
                            className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[225px] w-auto shadow-xl"
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

                {/* Organismo 2: Fila de Consulta */}
                <StageBlock
                  title="Fila de Consulta"
                  componentTag="<Badge /> + <Button />"
                  usedIn={['Historial de Consultas']}
                  description="Fila de tabla con hora, profesional, badge de estado y panel desplegable."
                >
                  <div className="w-full bg-white border border-[#e2e8f0] rounded-none overflow-hidden flex flex-col">
                    <div className="w-full py-4 px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 items-center gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0]">
                        <div className="flex flex-col pr-2">
                          <span className="text-[16px] font-bold text-black leading-tight">10:40</span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-0.5">27 OCT</span>
                        </div>
                        <div className="flex flex-col sm:pl-4">
                          <span className="text-[15px] font-bold text-black leading-tight">Videoconsulta</span>
                          <span className="text-[12px] text-[#64748b] mt-0.5">Medicina General · Ever Health</span>
                        </div>
                        <div className="flex flex-col sm:pl-4">
                          <span className="text-[15px] font-bold text-black leading-tight">Alejandro Navarro</span>
                          <span className="text-[12px] text-[#64748b] mt-0.5">Titular · contact@carlosdamian.com</span>
                        </div>
                        <div className="flex flex-col sm:pl-4">
                          <span className="text-[15px] font-bold text-black leading-tight">Dr. Bruno Peñas</span>
                          <span className="text-[12px] text-[#64748b] mt-0.5">Medicina General · Ever Health Doctor</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-4 shrink-0">
                        <Badge variant="limitada" tooltipText="De recomendación: Pendiente">Pendiente</Badge>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer focus:outline-none focus:ring-0"
                        >
                          <ChevronUp className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                    <div className="px-4 sm:px-6 pb-5 pt-2 flex flex-col gap-4 border-t border-[#f1f5f9] bg-white">
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-normal text-[#64748b]">Motivo de la consulta:</span>
                        <p className="text-[14px] text-black font-normal">Consulta sobre dudas de medicación y evolución de síntomas leves.</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#f8fafc]">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Button variant="consulta-primary">Acceder a la videoconsulta</Button>
                          <Button variant="consulta-outline">
                            <MessageSquare className="w-4 h-4 text-[#64748b]" />
                            <span>Ver conversación</span>
                          </Button>
                          <Button variant="consulta-outline">
                            <FileText className="w-4 h-4 text-[#64748b]" />
                            <span>Ver informe médico</span>
                          </Button>
                        </div>
                        <Button variant="consulta-outline">Cancelar consulta</Button>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                {/* Organismo 3: Patrón Maestro de Tablas Homologadas */}
                <StageBlock
                  title="Patrón Maestro de Tablas Homologadas"
                  componentTag="<table className='w-full text-left border-collapse bg-white'>"
                  usedIn={['Familiares', 'Mascotas', 'ModalDocumentos']}
                  description="Estructura reticular unificada para todas las vistas de gestión: contenedor plano sin redondear (rounded-none), cabecera blanca con títulos en mayúsculas negras (font-bold text-black uppercase), divisores de columna (border-r border-[#e2e8f0]) y filas con hover (#fafafa)."
                >
                  <div className="w-full bg-white border border-[#e2e8f0] rounded-none shadow-none overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white">
                      <thead>
                        <tr className="bg-white border-b border-[#e2e8f0] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-black">
                          <th className="py-3 px-4 border-r border-[#e2e8f0]">REGISTRO / NOMBRE</th>
                          <th className="py-3 px-4 border-r border-[#e2e8f0]">CATEGORÍA</th>
                          <th className="py-3 px-4 border-r border-[#e2e8f0]">FECHA</th>
                          <th className="py-3 px-4 border-r border-[#e2e8f0]">ESTADO / CONDICIÓN</th>
                          <th className="py-3 px-4 border-r border-[#e2e8f0]">RESPONSABLE</th>
                          <th className="py-3 px-4 text-right">ACCIONES</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black bg-white">
                        <tr className="hover:bg-[#fafafa] bg-white transition-colors">
                          <td className="py-3 px-4 border-r border-[#e2e8f0]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                ER
                              </div>
                              <span className="font-bold text-black">Elena Ruiz Morales</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                            Cónyuge
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                            14/05/1990
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0]">
                            <Badge variant="success" className="w-fit">Tutor legal</Badge>
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0] text-[13px] text-[#94a3b8]">
                            —
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] inline-flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-[#fafafa] bg-white transition-colors">
                          <td className="py-3 px-4 border-r border-[#e2e8f0]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#fdf2f8] text-[var(--color-primary)] font-bold text-[12px] flex items-center justify-center shrink-0">
                                LU
                              </div>
                              <div>
                                <span className="font-bold text-black block leading-tight">Luna</span>
                                <span className="text-[12px] text-[#64748b]">Perro · Golden Retriever</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                            Mascota
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                            15/03/2021
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0]">
                            <Badge variant="programada" className="w-fit">Peso Ideal</Badge>
                          </td>
                          <td className="py-3 px-4 border-r border-[#e2e8f0] text-[13px] font-medium text-black">
                            Alejandro Navarro
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] inline-flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 6: MODALES ================= */}
            {activeSection === 'modales' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-[28px] font-bold text-black">6. Modales del Sistema</h1>
                  <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                    Componentes modales y estándares de interacción homologados en toda la aplicación.
                  </p>
                </div>

                {/* Banner de Reglas Oficiales de Modales */}
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] p-5 flex flex-col gap-2.5">
                  <span className="text-[14px] font-bold text-black">
                    Reglas Generales de Modales Homologados
                  </span>
                  <ul className="text-[13px] text-[#475569] space-y-2 list-disc list-inside">
                    <li>
                      <strong className="text-black font-semibold">1. Encabezado homologado y alineación con la X:</strong> Ningún modal lleva iconos decorativos antes del título. El encabezado se alinea perfectamente con el botón circular de cierre (&times;) de 32px y cuenta siempre con su línea divisoria inferior (`flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]`).
                    </li>
                    <li>
                      <strong className="text-black font-semibold">2. Descripción de contexto y pie de acciones:</strong> Todos los modales incluyen un texto descriptivo breve debajo de la cabecera explicando el contexto o la acción a realizar. Las acciones inferiores van separadas con línea divisoria (`pt-3 border-t border-[#f1f5f9]`) con botones de 40px en mayúsculas (CANCELAR y botón de acción principal o destructiva).
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Cierre por clic exterior:</strong> Todo modal debe cerrarse al hacer clic en el backdrop/overlay exterior.
                    </li>
                  </ul>
                </div>

                <StageBlock
                  title="Modal de Confirmación"
                  componentTag="<ConfirmDeactivateModal />"
                  usedIn={['Familiares', 'Mascotas', 'Historial de Consultas']}
                  description="Diálogo de advertencia para confirmación de bajas o cancelaciones."
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
                  title="Modal Minimalista de Cierre de Sesión"
                  componentTag="<LogoutConfirmModal />"
                  usedIn={['Sidebar', 'HomeDashboard (Header & Mobile Drawer)']}
                  description="Modal minimalista de confirmación de salida. Diseño ligero con título, descripción en negro y botones homologados CANCELAR / CERRAR SESIÓN."
                >
                  <div className="flex flex-col items-start gap-4">
                    <LogoutConfirmModal
                      inlinePreview
                      isOpen={true}
                      onCancel={() => {}}
                      onConfirm={() => setDemoLogoutModalOpen(true)}
                    />
                    <Button variant="primary" onClick={() => setDemoLogoutModalOpen(true)}>
                      Abrir modal de cierre de sesión en vivo
                    </Button>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Modal de Formulario"
                  componentTag="<TextInput /> + <Dropdown /> + <Button />"
                  usedIn={['Familiares', 'Mascotas']}
                  description="Estructura modal para creación y edición de datos con inputs y dropdowns."
                >
                  <Button variant="primary" onClick={() => setDemoFormModalOpen(true)}>
                    Probar Modal de Formulario en vivo
                  </Button>
                </StageBlock>

                <StageBlock
                  title="Footers de Modales (Composiciones)"
                  componentTag="<ModalActionGroup />"
                  usedIn={['Videoconsulta', 'Solicitar Chat', 'Familiares', 'Mascotas', 'Documentos']}
                  description="Composiciones de barra inferior en ventanas modales. Construidas íntegramente con nuestro sistema de botones (<Button />), garantizando mismo peso bold, altura de 40px, esquinas de 8px y todas las acciones en MAYÚSCULAS."
                >
                  <div className="flex flex-col gap-6">
                    {/* 1. Footer Citas */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          1. Footer de Citas Médicas (Video Consulta / Solicitar Chat)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Texto de pasos a la izquierda + Botón 40px mayúsculas magenta a la derecha
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#166534] font-medium">
                          <Check className="w-4 h-4" />
                          <span>Todos los pasos completados</span>
                        </div>
                        <Button variant="modal-primary" className="h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]">
                          CONFIRMAR CITA
                        </Button>
                      </div>
                    </div>

                    {/* 2. Footer Formularios */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          2. Footer de Formularios de Datos (Familiares y Mascotas)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Botones 40px mayúsculas: CANCELAR (outline) + GUARDAR (primario)
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center justify-end gap-3 shadow-xs">
                        <Button variant="outline" className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]">
                          CANCELAR
                        </Button>
                        <Button variant="primary" className="h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]">
                          GUARDAR
                        </Button>
                      </div>
                    </div>

                    {/* 3. Footer Confirmación Crítica */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          3. Footer de Diálogo de Confirmación (Dar de baja)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Botones 40px mayúsculas: CANCELAR (outline) + DAR DE BAJA (destructivo)
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center justify-end gap-3 shadow-xs">
                        <Button variant="outline" className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]">
                          CANCELAR
                        </Button>
                        <Button variant="destructive" className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] text-white">
                          DAR DE BAJA
                        </Button>
                      </div>
                    </div>

                    {/* 4. Footer Clínico y Documental */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          4. Footer de Modales Clínicos y Documentales (Ginecología / Documentos)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Botones 40px mayúsculas: DESCARTAR (outline #cbd5e1) + CONFIRMAR (primario)
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center justify-end gap-3 shadow-xs">
                        <Button variant="outline" className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]">
                          DESCARTAR
                        </Button>
                        <Button variant="primary" className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]">
                          CONFIRMAR
                        </Button>
                      </div>
                    </div>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Help Center"
                  componentTag="<HelpCenter />"
                  usedIn={['Header (Info)', 'Biometría', 'Mobile Drawer']}
                  description="Panel lateral derecho en desktop y modal en mobile con soporte unificado y FAQs."
                >
                  <div className="flex flex-col items-start gap-3">
                    <Button variant="primary" onClick={() => setDemoHelpCenterOpen(true)}>
                      Abrir Help Center en vivo
                    </Button>
                    <span className="text-[12px] text-[#64748b]">
                      Prueba en escritorio (panel derecho sin modal) o reduce la ventana para ver el modo modal móvil.
                    </span>
                  </div>
                </StageBlock>

                <StageBlock
                  title="Pantalla Completa: Chat Médico Activo (Estilo Onboarding)"
                  componentTag="<ChatMedicoActivo />"
                  usedIn={['Hablar ahora', 'Solicitar chat prioritario']}
                  description="Experiencia de chat médico en pantalla completa dedicada (estilo Onboarding), contenida en max-w-[760px] con fondo blanco, header separado con línea, subtítulos en peso regular, burbujas gris 300 (paciente) y gris 50 (médico) sin bordes, y salida exclusiva mediante el botón FINALIZAR CHAT."
                >
                  <div className="flex flex-col items-start gap-3">
                    <Button variant="primary" onClick={() => setDemoChatActivoOpen(true)}>
                      Abrir Chat Médico en Pantalla Completa
                    </Button>
                    <span className="text-[12px] text-[#64748b]">
                      Prueba la experiencia de conversación completa, el flujo de respuesta médica y el diálogo de finalización segura.
                    </span>
                  </div>
                </StageBlock>
              </div>
            )}

            {/* ================= SECCIÓN 7: ÍCONOS LUCIDE ================= */}
            {activeSection === 'iconos' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[28px] font-bold text-black">7. Catálogo de Íconos Lucide Nativos</h1>
                    <p className="text-[14px] text-[var(--color-page-subtitle)] mt-1 font-normal">
                      Todos los iconos del sistema usan color neutro <code>#64748b</code> por defecto, excepto el icono <code>PlusCircle</code> del header y los iconos de <code>Solicitar una cita</code>.
                    </p>
                  </div>
                  <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f1f5f9] text-black shrink-0">
                    {ICONS_CATALOG.length} íconos activos
                  </span>
                </div>

                <StageBlock
                  title="Catálogo de Íconos"
                  componentTag="lucide-react"
                  usedIn={['Toda la aplicación']}
                  description="Íconos oficiales Lucide en tono neutro #64748b."
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

      {/* Modal Interactivo de Demostración: LogoutConfirmModal */}
      <LogoutConfirmModal
        isOpen={demoLogoutModalOpen}
        onCancel={() => setDemoLogoutModalOpen(false)}
        onConfirm={() => setDemoLogoutModalOpen(false)}
      />

      {/* Modal Interactivo de Demostración: Formulario usando TextInput y Dropdown reales */}
      {demoFormModalOpen && (
        <div
          onClick={() => setDemoFormModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[640px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-7 flex flex-col gap-5 animate-scaleUp cursor-default"
          >
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
              <h2 className="text-[20px] font-bold text-black tracking-tight leading-snug">Añadir familiar</h2>
              <button
                type="button"
                onClick={() => setDemoFormModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[13.5px] leading-[20px] text-[#64748b] -mt-2">
              Si vas a añadir familiares adultos y menores, es recomendable empezar por <strong className="font-semibold text-[#334155]">los adultos</strong>. Así luego, si es el caso, es más fácil seleccionarlos como tutores de los menores.
            </p>
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
              <Button
                variant="outline"
                className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
                onClick={() => setDemoFormModalOpen(false)}
              >
                CANCELAR
              </Button>
              <Button
                variant="primary"
                className="h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]"
                onClick={() => setDemoFormModalOpen(false)}
              >
                GUARDAR
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Help Center Demo */}
      <HelpCenter
        isOpen={demoHelpCenterOpen}
        onClose={() => setDemoHelpCenterOpen(false)}
      />

      {/* Toast flotante para demostración interactiva en Sistema de Diseño */}
      {demoActiveToast && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[360px] max-w-[calc(100vw-32px)]">
          <Toast
            variant={demoActiveToast.variant}
            title={demoActiveToast.title}
            message={demoActiveToast.message}
            onClose={() => setDemoActiveToast(null)}
          />
        </div>
      )}
    </div>
  );
};
