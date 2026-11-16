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
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
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
import { PaginationEvents } from '../design-system/molecules/PaginationEvents';
import { TablePagination } from '../design-system/molecules/TablePagination';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';
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
        <p className="text-[13px] text-[#64748b] leading-relaxed">{description}</p>
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
                  <p className="text-[14px] text-[#64748b] mt-1">
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
                          {demoButtonsWithIcons && <Plus className="w-[18px] h-[18px] text-white" />}
                          <span>SOLICITA UNA CITA</span>
                        </Button>

                        {/* Secundario Rosa (borde rosa clarito #fbcfe8) */}
                        <Button variant="secondary">
                          {demoButtonsWithIcons && <ScanFace className="w-[18px] h-[18px] text-[#d50475]" />}
                          <span>INICIAR ESCANEO</span>
                        </Button>

                        {/* Secundario Neutro (borde gris) */}
                        <Button variant="outline">
                          <span>COMPLETA TU PERFIL MÉDICO</span>
                          {demoButtonsWithIcons && <ChevronRight className="w-[18px] h-[18px] text-black" />}
                        </Button>

                        {/* Destructivo Rojo */}
                        <Button variant="destructive">
                          {demoButtonsWithIcons && <Trash2 className="w-[16px] h-[16px] text-white" />}
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
                          Altura 38px · Mismo peso · Mayúsculas
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Primario Consulta */}
                        <Button variant="consulta-primary">
                          {demoButtonsWithIcons && <Video className="w-4 h-4 text-white" />}
                          <span>ACCEDER A LA CONSULTA</span>
                        </Button>

                        {/* Secundario Rosa Consulta */}
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
                        ✓ Mismo peso y mayúsculas en ambos tamaños
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#fdf2f8] border border-[#fbcfe8] text-[#9d174d] font-medium">
                        ✓ Borde secundario rosa homologado a <strong>#fbcfe8</strong> (rosa clarito)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        ✓ Variantes espejo completas (Primario, Secundario Rosa, Secundario Neutro, Destructivo, Bloqueado)
                      </span>
                    </div>

                    <div className="h-[1px] bg-[#f1f5f9] w-full my-2" />

                    {/* 3. Circular Icon Buttons */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-black">
                          3. Botones Circulares de Acción e Icono (Rounded-full)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Uso reservado exclusivamente para interacción con iconos: chevrons de acordeón, cierre de modales y navegación.
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <div className="flex items-center gap-2 border border-[#e2e8f0] rounded-[8px] p-2 bg-[#f8fafc]">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-black transition-colors cursor-pointer"
                            title="Desplegar acordeón"
                          >
                            <ChevronDown className="w-5 h-5 text-black" />
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-black transition-colors cursor-pointer"
                            title="Plegar acordeón"
                          >
                            <ChevronUp className="w-5 h-5 text-black" />
                          </button>
                          <span className="text-[12px] text-[#475569] font-medium pr-2">
                            Acordeón tabla consultas
                          </span>
                        </div>

                        <div className="flex items-center gap-2 border border-[#e2e8f0] rounded-[8px] p-2 bg-[#f8fafc]">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-black transition-colors cursor-pointer"
                            title="Cerrar modal"
                          >
                            <X className="w-5 h-5 text-black" />
                          </button>
                          <span className="text-[12px] text-[#475569] font-medium pr-2">
                            Cerrar modal
                          </span>
                        </div>

                        <div className="flex items-center gap-2 border border-[#e2e8f0] rounded-[8px] p-2 bg-[#f8fafc]">
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#64748b] transition-colors cursor-pointer"
                            title="Mes anterior"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#64748b] transition-colors cursor-pointer"
                            title="Mes siguiente"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <span className="text-[12px] text-[#475569] font-medium pr-2">
                            Navegador de calendario
                          </span>
                        </div>

                        <div className="flex items-center gap-2 border border-[#e2e8f0] rounded-[8px] p-2 bg-[#f8fafc]">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-black transition-colors cursor-pointer"
                            title="Volver atrás"
                          >
                            <ArrowLeft className="w-5 h-5 text-black" />
                          </button>
                          <span className="text-[12px] text-[#475569] font-medium pr-2">
                            Atrás navegación
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-[#f1f5f9] w-full" />

                    {/* 4. Modal Action Buttons & Comparison */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-black">
                          4. Botones de Modales y Diálogos (Comparativa de Acciones en Ventanas Modales)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Conjunto de botones utilizados en ventanas emergentes. Todos homologados con esquinas de 8px (cuadrados) y orden estándar (secundario a la izquierda, primario a la derecha).
                        </span>
                      </div>

                      {/* Muestrario de Botones de Modal */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                        {/* Tarjeta A: Confirmar Cita (Activo vs Deshabilitado) */}
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
                            <Button variant="modal-primary">Confirmar cita</Button>
                            <button
                              type="button"
                              disabled
                              className="h-[40px] px-6 rounded-[8px] bg-[#cbd5e1] text-[#64748b] text-[14px] font-bold cursor-not-allowed select-none"
                              title="Estado incompleto / bloqueado"
                            >
                              Confirmar cita (Bloqueado)
                            </button>
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
                              h: 42px · r: 8px
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Button variant="outline" className="h-[42px] px-5">Cancelar</Button>
                            <Button variant="primary" className="h-[42px] px-7">Guardar</Button>
                          </div>
                          <span className="text-[11px] text-[#64748b]">
                            Botones principales de envío de formulario en mayúsculas bold.
                          </span>
                        </div>

                        {/* Tarjeta C: Diálogo Crítico de Baja */}
                        <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] font-bold text-black">
                              C. Diálogo Crítico de Confirmación (Baja)
                            </span>
                            <span className="text-[11px] text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                              h: 36px · r: 8px
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Button variant="outline" className="h-[36px] px-4 text-[12px]">Cancelar</Button>
                            <Button variant="destructive" className="h-[36px] px-4 text-[12px]">Dar de baja</Button>
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
                              h: 38px · r: 8px
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <button
                              type="button"
                              className="h-[38px] px-4 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] text-black text-[13px] font-bold transition-colors cursor-pointer"
                            >
                              Descartar
                            </button>
                            <button
                              type="button"
                              className="h-[38px] px-5 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer shadow-xs"
                            >
                              Confirmar
                            </button>
                            <button
                              type="button"
                              className="h-[36px] px-3.5 rounded-[8px] border border-[#d50475] text-[#d50475] hover:bg-[#fdf2f8] text-[12px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Subir doc</span>
                            </button>
                          </div>
                          <span className="text-[11px] text-[#64748b]">
                            Usado en <code>ModalGinecologia</code> y <code>ModalDocumentos</code>.
                          </span>
                        </div>
                      </div>

                      {/* Tabla comparativa técnica */}
                      <div className="mt-2 border border-[#e2e8f0] rounded-[8px] overflow-hidden">
                        <table className="w-full text-left text-[12px]">
                          <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] font-bold">
                            <tr>
                              <th className="py-2.5 px-3">Botón / Acción</th>
                              <th className="py-2.5 px-3">Altura</th>
                              <th className="py-2.5 px-3">Borde</th>
                              <th className="py-2.5 px-3">Tipografía</th>
                              <th className="py-2.5 px-3">Fondo / Color</th>
                              <th className="py-2.5 px-3">Modal de Uso</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#f1f5f9] text-[#334155]">
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Confirmar cita</td>
                              <td className="py-2 px-3 font-mono">40px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3">Sentence case 14px bold</td>
                              <td className="py-2 px-3 text-[#d50475] font-medium">#d50475 (Blanco texto)</td>
                              <td className="py-2 px-3 text-[#64748b]">VideoConsulta / SolicitarChat</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-[#64748b]">Confirmar cita (Bloqueado)</td>
                              <td className="py-2 px-3 font-mono">40px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3">Sentence case 14px bold</td>
                              <td className="py-2 px-3 text-[#64748b]">#cbd5e1 (Gris deshabilitado)</td>
                              <td className="py-2 px-3 text-[#64748b]">VideoConsulta (incompleto)</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Guardar</td>
                              <td className="py-2 px-3 font-mono">42px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3 uppercase">Mayúsculas 14px bold</td>
                              <td className="py-2 px-3 text-[#d50475] font-medium">#d50475 (Primario)</td>
                              <td className="py-2 px-3 text-[#64748b]">Familiares / Mascotas</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Cancelar (Formulario)</td>
                              <td className="py-2 px-3 font-mono">42px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3 uppercase">Mayúsculas 14px bold</td>
                              <td className="py-2 px-3">Borde #cbd5e1 / Blanco</td>
                              <td className="py-2 px-3 text-[#64748b]">Familiares / Mascotas</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-[#ef4444]">Dar de baja</td>
                              <td className="py-2 px-3 font-mono">36px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3">Sentence case 12px bold</td>
                              <td className="py-2 px-3 text-[#ef4444] font-medium">#ef4444 (Destructivo)</td>
                              <td className="py-2 px-3 text-[#64748b]">ConfirmDeactivateModal</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Cancelar (Confirmación)</td>
                              <td className="py-2 px-3 font-mono">36px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3">Sentence case 12px bold</td>
                              <td className="py-2 px-3">Borde #cbd5e1 / Blanco</td>
                              <td className="py-2 px-3 text-[#64748b]">ConfirmDeactivateModal</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Descartar / Cancelar</td>
                              <td className="py-2 px-3 font-mono">38px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3">Sentence case 13px bold</td>
                              <td className="py-2 px-3">Borde #cbd5e1 / Blanco</td>
                              <td className="py-2 px-3 text-[#64748b]">Ginecología / Documentos</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Confirmar / Actualizar</td>
                              <td className="py-2 px-3 font-mono">38px</td>
                              <td className="py-2 px-3 font-mono">8px</td>
                              <td className="py-2 px-3">Sentence case 13px bold</td>
                              <td className="py-2 px-3 text-[#d50475] font-medium">#d50475 (Primario)</td>
                              <td className="py-2 px-3 text-[#64748b]">Ginecología / Documentos</td>
                            </tr>
                            <tr className="hover:bg-[#f8fafc]/50">
                              <td className="py-2 px-3 font-bold text-black">Cerrar modal (X)</td>
                              <td className="py-2 px-3 font-mono">32px (w-8 h-8)</td>
                              <td className="py-2 px-3 font-mono">Circular (full)</td>
                              <td className="py-2 px-3">Icono Lucide X</td>
                              <td className="py-2 px-3">Hover #f1f5f9</td>
                              <td className="py-2 px-3 text-[#64748b]">Cabecera de todos los modales</td>
                            </tr>
                          </tbody>
                        </table>
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
                  description="Controles de selección múltiple (cuadrados) y única (radiales) con foco negro."
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
                                className={`h-[44px] px-4 rounded-[8px] border flex items-center justify-between cursor-pointer transition-colors select-none ${
                                  isChecked
                                    ? 'border-black bg-[#f8fafc] text-black font-semibold'
                                    : 'border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-black font-normal'
                                }`}
                              >
                                <span className="text-[14px]">{sintoma}</span>
                                <Checkbox checked={isChecked} size="sm" />
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
                                className={`h-[44px] px-4 rounded-[8px] border flex items-center justify-between cursor-pointer transition-colors select-none ${
                                  isSel
                                    ? 'border-black bg-[#f8fafc] text-black font-semibold'
                                    : 'border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-black font-normal'
                                }`}
                              >
                                <span className="text-[14px]">{opt}</span>
                                <Radio checked={isSel} size="sm" />
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
                  description="Calendario mensual y turnos en columnas con selección en rosa suave y banner de confirmación sin línea."
                >
                  <div className="flex flex-col gap-8">
                    {/* Modelo 1: Calendario Mensual + Franjas de Hora Adyacentes */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-black">
                          1. Calendario Mensual con Franjas de Hora Adyacentes (Videoconsulta)
                        </span>
                        <span className="text-[12px] text-[#64748b]">
                          Navegación de mes con chevrons discretos y cuadrícula de días (D L M M J V S). Día seleccionado con fondo rosa claro (#fce7f3), borde (#f472b6) y texto oscuro 950 (#0f172a). Franja horaria seleccionada en botón secundario rosa CTA (#d50475).
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
                            <button
                              key={time}
                              type="button"
                              onClick={() => setDemoCalendarTime(time)}
                              className={`h-[36px] rounded-[6px] border text-[13px] font-bold transition-all cursor-pointer ${
                                demoCalendarTime === time
                                  ? 'border-[#f472b6] bg-[#fce7f3] text-[#d50475] shadow-xs'
                                  : 'border-[#cbd5e1] hover:border-black bg-white text-black'
                              }`}
                            >
                              {time}
                            </button>
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
                          Visualización por días de la semana con franjas horarias directas. Columna activa con fondo rosa claro (#fdf2f8), cabecera rosa CTA (#d50475), fecha oscuro 950 (#0f172a) y franja seleccionada con botón secundario rosa (#fce7f3) y texto rosa CTA (#d50475).
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
                  description="Mensajes flotantes no invasivos de retroalimentación para acciones como copiar datos (correo, dirección), iniciar llamadas telefónicas, guardar cambios o eliminar archivos. Reemplazan los checks en línea garantizando consistencia visual."
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
                          className="h-[36px] text-[12px]"
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
                          className="h-[36px] text-[12px]"
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
                          className="h-[36px] text-[12px]"
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
                          className="h-[36px] text-[12px]"
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
                          className="h-[36px] text-[12px]"
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
                        <div className="flex flex-col gap-1.5">
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
                        <div className="flex flex-col gap-1.5">
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
                        <div className="flex flex-col gap-1.5">
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
                        <div className="flex flex-col gap-1.5">
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

                    {/* Catálogo oficial de mensajes Toast documentados */}
                    <div className="flex flex-col gap-2 pt-2">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                        Catálogo de Mensajes Toast del Sistema
                      </span>
                      <div className="w-full border border-[#e2e8f0] rounded-[8px] overflow-x-auto bg-white">
                        <table className="w-full text-left text-[12px] border-collapse">
                          <thead className="bg-[#f8fafc] text-black border-b border-[#e2e8f0] font-bold">
                            <tr>
                              <th className="py-2.5 px-3 border-r border-[#e2e8f0]">Evento / Acción</th>
                              <th className="py-2.5 px-3 border-r border-[#e2e8f0]">Variante</th>
                              <th className="py-2.5 px-3 border-r border-[#e2e8f0]">Mensaje Oficial</th>
                              <th className="py-2.5 px-3 border-r border-[#e2e8f0]">Ubicación</th>
                              <th className="py-2.5 px-3">Duración</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                            <tr className="hover:bg-[#fafafa]">
                              <td className="py-2 px-3 font-bold text-black border-r border-[#e2e8f0]">
                                Copiar correo soporte
                              </td>
                              <td className="py-2 px-3 border-r border-[#e2e8f0]">
                                <span className="px-2 py-0.5 rounded bg-[#f0f9ff] text-[#0284c7] font-bold text-[11px]">Info</span>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] border-r border-[#e2e8f0]">
                                Correo copiado: soporte@everhealth.es
                              </td>
                              <td className="py-2 px-3 text-[#64748b] border-r border-[#e2e8f0]">
                                Help Center
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">3200ms</td>
                            </tr>
                            <tr className="hover:bg-[#fafafa]">
                              <td className="py-2 px-3 font-bold text-black border-r border-[#e2e8f0]">
                                Copiar dirección física
                              </td>
                              <td className="py-2 px-3 border-r border-[#e2e8f0]">
                                <span className="px-2 py-0.5 rounded bg-[#f0f9ff] text-[#0284c7] font-bold text-[11px]">Info</span>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] border-r border-[#e2e8f0]">
                                Dirección copiada: C/ Naciones 10, 28006 Madrid
                              </td>
                              <td className="py-2 px-3 text-[#64748b] border-r border-[#e2e8f0]">
                                Help Center
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">3200ms</td>
                            </tr>
                            <tr className="hover:bg-[#fafafa]">
                              <td className="py-2 px-3 font-bold text-black border-r border-[#e2e8f0]">
                                Iniciar llamada
                              </td>
                              <td className="py-2 px-3 border-r border-[#e2e8f0]">
                                <span className="px-2 py-0.5 rounded bg-[#f0f9ff] text-[#0284c7] font-bold text-[11px]">Info</span>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] border-r border-[#e2e8f0]">
                                Iniciando llamada a 911 23 12 14...
                              </td>
                              <td className="py-2 px-3 text-[#64748b] border-r border-[#e2e8f0]">
                                Help Center
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">3200ms</td>
                            </tr>
                            <tr className="hover:bg-[#fafafa]">
                              <td className="py-2 px-3 font-bold text-black border-r border-[#e2e8f0]">
                                Subir documento
                              </td>
                              <td className="py-2 px-3 border-r border-[#e2e8f0]">
                                <span className="px-2 py-0.5 rounded bg-[#f0fdf4] text-[#16a34a] font-bold text-[11px]">Success</span>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] border-r border-[#e2e8f0]">
                                Archivo '[nombre]' añadido correctamente
                              </td>
                              <td className="py-2 px-3 text-[#64748b] border-r border-[#e2e8f0]">
                                Modal Documentos
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">3000ms</td>
                            </tr>
                            <tr className="hover:bg-[#fafafa]">
                              <td className="py-2 px-3 font-bold text-black border-r border-[#e2e8f0]">
                                Eliminar documento
                              </td>
                              <td className="py-2 px-3 border-r border-[#e2e8f0]">
                                <span className="px-2 py-0.5 rounded bg-[#fff1f2] text-[#e11d48] font-bold text-[11px]">Error</span>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] border-r border-[#e2e8f0]">
                                '[nombre]' ha sido eliminado
                              </td>
                              <td className="py-2 px-3 text-[#64748b] border-r border-[#e2e8f0]">
                                Modal Documentos
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">3000ms</td>
                            </tr>
                            <tr className="hover:bg-[#fafafa]">
                              <td className="py-2 px-3 font-bold text-black border-r border-[#e2e8f0]">
                                Calibración biométrica
                              </td>
                              <td className="py-2 px-3 border-r border-[#e2e8f0]">
                                <span className="px-2 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-bold text-[11px]">Warning</span>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] border-r border-[#e2e8f0]">
                                Iluminación baja. Acerca tu rostro a la luz
                              </td>
                              <td className="py-2 px-3 text-[#64748b] border-r border-[#e2e8f0]">
                                Biometría Facial
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">4000ms</td>
                            </tr>
                          </tbody>
                        </table>
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
                  <p className="text-[14px] text-[#64748b] mt-1">
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
                  <p className="text-[14px] text-[#64748b] mt-1">
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

                {/* 5. PaginationEvents */}
                <StageBlock
                  title="Paginador de Eventos"
                  componentTag="<PaginationEvents />"
                  usedIn={['Inicio (Próximas consultas)']}
                  description="Pie interactivo para expandir o contraer citas programadas."
                >
                  <PaginationEvents
                    visibleCount={demoPaginationExpanded ? 5 : 1}
                    totalCount={5}
                    isExpanded={demoPaginationExpanded}
                    onToggle={() => setDemoPaginationExpanded(!demoPaginationExpanded)}
                  />
                </StageBlock>

                {/* 6. TablePagination */}
                <StageBlock
                  title="Paginación de Tablas"
                  componentTag="<TablePagination />"
                  usedIn={['Historial de Consultas', 'Familiares', 'Mascotas']}
                  description="Controles numéricos de paginación y contador de registros."
                >
                  <TablePagination
                    visibleCount={5}
                    totalCount={20}
                    entityLabel="registros"
                  />
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
                          <span className="text-[15px] font-bold text-black leading-tight">Carlos Damián</span>
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

                {/* Organismo 3: Tabla de Gestión Principal (Familiares) */}
                <StageBlock
                  title="Tabla de Gestión Principal (Familiares)"
                  componentTag="<table className='w-full text-left border-collapse bg-white'>"
                  usedIn={['Familiares']}
                  description="Patrón maestro de tablas de página completa: contenedor sin redondear, cabecera blanca, texto en negro mayúsculas, divisores verticales de columna y badges de estado legal."
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full bg-white border border-[#e2e8f0] rounded-none shadow-none overflow-x-auto">
                      <table className="w-full text-left border-collapse bg-white">
                        <thead>
                          <tr className="bg-white border-b border-[#e2e8f0] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-black">
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Nombre y Apellidos</th>
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Parentesco</th>
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Nacimiento</th>
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Edad</th>
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Sexo al nacer</th>
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Condición</th>
                            <th className="py-3 px-4 border-r border-[#e2e8f0]">Tutor Asignado</th>
                            <th className="py-3 px-4 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black bg-white">
                          <tr className="hover:bg-[#fafafa] bg-white transition-colors">
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                  ER
                                </div>
                                <span className="font-bold text-black">Elena Ruiz Morales</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                              Cónyuge
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                              14/05/1990
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-normal text-black">
                              36 años
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Femenino
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <Badge variant="success" className="w-fit">Tutor legal</Badge>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[13px] text-[#94a3b8]">
                              —
                            </td>
                            <td className="py-3.5 px-4 text-right relative">
                              <div className="inline-block relative">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDemoFamiliarMenuOpen(demoFamiliarMenuOpen === 1 ? null : 1)
                                  }
                                  className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                                  title="Acciones"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                {demoFamiliarMenuOpen === 1 && (
                                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#e2e8f0] rounded-[8px] shadow-lg py-1 z-50 text-left">
                                    <button
                                      type="button"
                                      onClick={() => setDemoFamiliarMenuOpen(null)}
                                      className="w-full px-4 py-2 text-[13px] text-left hover:bg-[#f8fafc] text-black font-medium"
                                    >
                                      Ver detalle
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDemoFamiliarMenuOpen(null)}
                                      className="w-full px-4 py-2 text-[13px] text-left hover:bg-[#f8fafc] text-black font-medium"
                                    >
                                      Editar familiar
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#fafafa] bg-white transition-colors">
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                  MD
                                </div>
                                <span className="font-bold text-black">Mateo Damian Ruiz</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                              Hijo/a
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                              22/08/2018
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-normal text-black">
                              8 años
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Masculino
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <Badge variant="success" className="w-fit">Menor a cargo</Badge>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[13px] font-medium text-black">
                              Carlos Damian (Titular)
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#fafafa] bg-white transition-colors">
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                  LD
                                </div>
                                <span className="font-bold text-black">Lucía Damian Ruiz</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                              Hijo/a
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                              10/11/2021
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-normal text-black">
                              5 años
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Femenino
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <Badge variant="success" className="w-fit">Menor a cargo</Badge>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[13px] font-medium text-black">
                              Elena Ruiz (Cónyuge)
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#fafafa] bg-white transition-colors">
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                  RM
                                </div>
                                <span className="font-bold text-black">Rosa Morales Silva</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                              Madre / Padre
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                              03/02/1962
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-normal text-black">
                              64 años
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Femenino
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <Badge variant="neutral" className="w-fit">Adulto</Badge>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[13px] text-[#94a3b8]">
                              —
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Especificaciones clave de Familiares */}
                    <div className="flex flex-wrap gap-2 text-[12px]">
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Contenedor: <strong>rounded-none</strong> + borde #e2e8f0
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Cabecera: <strong>bg-white</strong> + texto negro 12px negrita uppercase
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Columnas divididas: <strong>Nacimiento</strong> (acortado) y <strong>Tutor Asignado</strong> en columna independiente
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Edad: <strong>text-black font-normal</strong> (peso regular, sin bold)
                      </span>
                    </div>
                  </div>
                </StageBlock>

                {/* Organismo 4: Tabla con Datos Secundarios (Mascotas) */}
                <StageBlock
                  title="Tabla con Datos Secundarios (Mascotas)"
                  componentTag="<table className='w-full text-left border-collapse table-auto'>"
                  usedIn={['Mascotas']}
                  description="Variante que comparte el patrón maestro de Familiares (cuadrada y con divisores verticales), adaptada para soportar dos líneas por celda y badges de clasificación física."
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full bg-white border border-[#e2e8f0] rounded-none overflow-x-auto">
                      <table className="w-full text-left border-collapse table-auto">
                        <thead>
                          <tr className="bg-white border-b border-[#e2e8f0] text-[12px] font-bold uppercase tracking-wider text-black">
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Mascota</th>
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Especie y Raza</th>
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Edad</th>
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Sexo</th>
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Condición Corporal</th>
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Familiar Asignado</th>
                            <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Nº Chip</th>
                            <th className="py-3.5 px-4 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black">
                          <tr className="hover:bg-[#f8fafc] transition-colors">
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                  MA
                                </div>
                                <span className="font-bold text-black">Max</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex flex-col">
                                <span className="font-bold text-black">Perro</span>
                                <span className="text-[12px] text-[#64748b]">Golden Retriever</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex flex-col">
                                <span className="font-medium text-black">3 años</span>
                                <span className="text-[12px] text-[#64748b]">10/05/2023</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Macho
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <Badge variant="disponible" className="w-fit">Peso Ideal</Badge>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Carlos Damián
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-mono text-[13px] text-[#64748b]">
                              981098123456789
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#f8fafc] transition-colors">
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                                  LU
                                </div>
                                <span className="font-bold text-black">Luna</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex flex-col">
                                <span className="font-bold text-black">Gato</span>
                                <span className="text-[12px] text-[#64748b]">Siamés</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <div className="flex flex-col">
                                <span className="font-medium text-black">2 años</span>
                                <span className="text-[12px] text-[#64748b]">14/02/2024</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Hembra
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                              <Badge variant="limitada" className="w-fit">Sobrepeso</Badge>
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                              Elena Ruiz
                            </td>
                            <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-mono text-[13px] text-[#64748b]">
                              981098998877665
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[12px]">
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Consistencia: Comparte 100% el estilo de contenedor, divisores y cabecera de <strong>Familiares</strong>.
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Celdas dobles: Titular 14px bold + Subtexto 12px gris (#64748b).
                      </span>
                    </div>
                  </div>
                </StageBlock>

                {/* Organismo 5: Tabla de Modales (ModalDocumentos) */}
                <StageBlock
                  title="Tabla en Modales (Documentos Médicos)"
                  componentTag="<table className='w-full text-left text-[13px]'>"
                  usedIn={['ModalDocumentos', 'Historia Clínica']}
                  description="Variante compacta para diálogos modales. Nota: Presenta divergencias visuales con respecto a Familiares (cabecera gris, sin divisores verticales y bordes redondeados)."
                >
                  <div className="flex flex-col gap-4">
                    <div className="border border-[#e2e8f0] rounded-[10px] overflow-visible bg-white">
                      <table className="w-full text-left text-[13px]">
                        <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0]">
                          <tr>
                            <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[11px]">
                              DOCUMENTO
                            </th>
                            <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[11px]">
                              NOMBRE PERSONALIZADO*
                            </th>
                            <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[11px] text-right">
                              ACCIONES
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1f5f9]">
                          <tr className="hover:bg-[#f8fafc]/70 transition-colors">
                            <td className="py-3 px-4 font-medium text-[#334155] max-w-[220px]">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#94a3b8] shrink-0" />
                                <span className="truncate">ecografia_tiroidea.jpg</span>
                              </div>
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={demoDocInputName}
                                onChange={(e) => setDemoDocInputName(e.target.value)}
                                placeholder="Nombre descriptivo del archivo *"
                                className="w-full h-[36px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#d50475]"
                              />
                            </td>
                            <td className="py-3 px-4 text-right relative">
                              <div className="inline-block relative">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDemoModalDocMenuOpen(demoModalDocMenuOpen === 1 ? null : 1)
                                  }
                                  className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer"
                                  title="Opciones"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                {demoModalDocMenuOpen === 1 && (
                                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#e2e8f0] rounded-[8px] shadow-lg py-1 z-50 text-left">
                                    <button
                                      type="button"
                                      onClick={() => setDemoModalDocMenuOpen(null)}
                                      className="w-full px-3.5 py-2 text-[13px] flex items-center gap-2 hover:bg-[#f8fafc] text-[#334155]"
                                    >
                                      <Download className="w-4 h-4 text-[#64748b]" />
                                      <span>Descargar</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDemoModalDocMenuOpen(null)}
                                      className="w-full px-3.5 py-2 text-[13px] flex items-center gap-2 hover:bg-[#fef2f2] text-[#ef4444] font-bold"
                                    >
                                      <Trash2 className="w-4 h-4 text-[#ef4444]" />
                                      <span>Eliminar</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#f8fafc]/70 transition-colors">
                            <td className="py-3 px-4 font-medium text-[#334155]">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#94a3b8] shrink-0" />
                                <span className="truncate">analitica_sangre.pdf</span>
                              </div>
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                defaultValue="Analítica general y bioquímica"
                                className="w-full h-[36px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#d50475]"
                              />
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[12px]">
                      <span className="px-2.5 py-1 rounded bg-[#fff1f2] border border-[#fecdd3] text-[#9f1239] font-medium">
                        Divergencia 1: Cabecera gris (bg-[#f8fafc]) y texto gris (#64748b)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#fff1f2] border border-[#fecdd3] text-[#9f1239] font-medium">
                        Divergencia 2: Sin divisores verticales de columna (no tiene border-r)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] font-medium">
                        Divergencia 3: Contenedor rounded-[10px] (adaptado a la ventana modal)
                      </span>
                    </div>
                  </div>
                </StageBlock>

                {/* Organismo 6: Matriz Comparativa y Diagnóstico de Tablas */}
                <StageBlock
                  title="Comparativa de Tablas: Diagnóstico & Homologación"
                  componentTag="Matriz de Análisis y Decisiones de Diseño"
                  usedIn={['Familiares', 'Mascotas', 'ModalDocumentos', 'Historial Consultas']}
                  description="Comparación exhaustiva de todas las tablas para determinar qué se mejora, qué se cambia y qué se quita para lograr consistencia en todo el producto."
                >
                  <div className="flex flex-col gap-6">
                    {/* Tabla comparativa técnica */}
                    <div className="w-full border border-[#e2e8f0] rounded-[8px] overflow-x-auto bg-white">
                      <table className="w-full text-left text-[12px] border-collapse">
                        <thead className="bg-[#f8fafc] text-black border-b border-[#e2e8f0] font-bold">
                          <tr>
                            <th className="py-3 px-3.5 border-r border-[#e2e8f0]">Atributo Visual</th>
                            <th className="py-3 px-3.5 border-r border-[#e2e8f0]">Tabla Familiares (Maestra)</th>
                            <th className="py-3 px-3.5 border-r border-[#e2e8f0]">Tabla Mascotas</th>
                            <th className="py-3 px-3.5 border-r border-[#e2e8f0]">Tabla en Modales</th>
                            <th className="py-3 px-3.5 font-bold text-[#d50475]">Diagnóstico & Qué Hacer</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Bordes exteriores
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-[11px] border-r border-[#e2e8f0]">
                              rounded-none
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-[11px] border-r border-[#e2e8f0]">
                              rounded-none
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-[11px] text-[#d50475] font-bold border-r border-[#e2e8f0]">
                              rounded-[10px]
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px]">
                              <strong>Mantener o estandarizar a 8px:</strong> En páginas completas encaja `rounded-none`, pero en modales debe ser redondeada para respetar el radio del diálogo.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Fondo de cabecera
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              Blanco (bg-white)
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              Blanco (bg-white)
                            </td>
                            <td className="py-2.5 px-3.5 text-[#d50475] font-bold border-r border-[#e2e8f0]">
                              Gris (bg-[#f8fafc])
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px]">
                              <span className="text-[#d50475] font-bold">CAMBIAR:</span> Cambiar el fondo del modal a blanco (`bg-white`) con borde inferior `#e2e8f0` para máxima coherencia con Familiares.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Color texto cabecera
                            </td>
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Negro (text-black 12px)
                            </td>
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Negro (text-black 12px)
                            </td>
                            <td className="py-2.5 px-3.5 text-[#64748b] border-r border-[#e2e8f0]">
                              Gris (#64748b 11px)
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px]">
                              <span className="text-[#d50475] font-bold">CAMBIAR:</span> Estandarizar cabecera en modales a `text-black` font-bold uppercase para evitar que se vea apagada.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Líneas verticales (Columnas)
                            </td>
                            <td className="py-2.5 px-3.5 text-[#16a34a] font-bold border-r border-[#e2e8f0]">
                              Sí (border-r #e2e8f0)
                            </td>
                            <td className="py-2.5 px-3.5 text-[#16a34a] font-bold border-r border-[#e2e8f0]">
                              Sí (border-r #e2e8f0)
                            </td>
                            <td className="py-2.5 px-3.5 text-[#ef4444] font-bold border-r border-[#e2e8f0]">
                              No tiene líneas verticales
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px]">
                              <span className="text-[#d50475] font-bold">DECISIÓN:</span> Es la diferencia más notoria. Se puede: <strong>A)</strong> Agregar `border-r` al modal, o <strong>B)</strong> Quitar `border-r` de Familiares para un look más moderno y limpio sin cuadrícula rígida.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Divisores de filas
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              divide-y divide-[#e2e8f0]
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              divide-y divide-[#e2e8f0]
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              divide-y divide-[#f1f5f9]
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px]">
                              <strong>HOMOLOGAR:</strong> Unificar el color de borde de fila a `#e2e8f0` en todas las tablas.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Padding vertical celda
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              py-3.5 (14px)
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              py-3.5 (14px)
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              py-2.5 / py-2 (10px)
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px]">
                              <strong>MANTENER DIFERENCIADO:</strong> Los modales tienen altura máxima restringida (max-h 90vh) y llevan inputs de 36px, por lo que py-2.5 es el espaciado óptimo.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Distribución de Tutela / Asignación
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0] text-[11px]">
                              Separada: <strong>Condición</strong> (badge) + <strong>Tutor Asignado</strong> (columna)
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0] text-[11px]">
                              Separada: <strong>Condición Corporal</strong> + <strong>Familiar Asignado</strong>
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0] text-[11px] text-[#64748b]">
                              N/A (Documentación clínica)
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px] text-[#16a34a] font-bold">
                              ✓ HOMOLOGADO: Tanto Familiares como Mascotas aprovechan el ancho completo con 8 columnas dedicadas.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Peso tipográfico en Edad
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0] text-[11px]">
                              Regular (`font-normal text-black`)
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0] text-[11px]">
                              Regular (`font-medium text-black`)
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0] text-[11px] text-[#64748b]">
                              N/A
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px] text-[#16a34a] font-bold">
                              ✓ HOMOLOGADO: La edad se muestra sin negrita agresiva para balancear la jerarquía visual con el nombre.
                            </td>
                          </tr>

                          <tr className="hover:bg-[#fafafa]">
                            <td className="py-2.5 px-3.5 font-bold text-black border-r border-[#e2e8f0]">
                              Menú de acciones
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              MoreVertical flotante
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              MoreVertical flotante
                            </td>
                            <td className="py-2.5 px-3.5 border-r border-[#e2e8f0]">
                              MoreVertical flotante
                            </td>
                            <td className="py-2.5 px-3.5 text-[11px] text-[#16a34a] font-bold">
                              ✓ HOMOLOGADO: Todas las tablas utilizan el mismo botón circular de 32px con MoreVertical y menú emergente.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Resumen de mejoras recomendadas */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-4 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-[#d50475]" />
                        <h4 className="text-[14px] font-bold text-black">
                          Resumen: 3 acciones para homologar la tabla de modales
                        </h4>
                      </div>
                      <ul className="text-[13px] text-[#334155] space-y-1.5 list-disc pl-5">
                        <li>
                          <strong>1. Cabecera limpia:</strong> Cambiar el fondo gris `bg-[#f8fafc]` a blanco `bg-white` y el texto a `text-black` negrita mayúsculas.
                        </li>
                        <li>
                          <strong>2. Divisores verticales:</strong> Decidir si aplicar `border-r border-[#e2e8f0]` a la tabla de modales o, alternativamente, retirar las líneas verticales de Familiares y Mascotas si se busca un diseño más minimalista.
                        </li>
                        <li>
                          <strong>3. Borde de fila consistente:</strong> Cambiar `divide-[#f1f5f9]` por `divide-[#e2e8f0]` para mantener idéntico contraste en todas las líneas.
                        </li>
                      </ul>
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
                  title="Footers de Modales"
                  componentTag="Modal Footers & Actions"
                  usedIn={['Videoconsulta', 'Solicitar Chat', 'Familiares', 'Mascotas']}
                  description="Alineación estándar: textos de estado a la izquierda y botones de acción a la derecha."
                >
                  <div className="flex flex-col gap-6">
                    {/* 1. Footer Citas */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          1. Footer de Citas Médicas (Video Consulta / Solicitar Chat)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Texto de pasos a la izquierda + Botón 40px magenta a la derecha
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#166534] font-medium">
                          <Check className="w-4 h-4" />
                          <span>Todos los pasos completados</span>
                        </div>
                        <Button variant="modal-primary">Confirmar cita</Button>
                      </div>
                    </div>

                    {/* 2. Footer Formularios */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          2. Footer de Formularios de Datos (Familiares y Mascotas)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Botones 42px mayúsculas: Cancelar (outline) + Guardar (primario)
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center justify-end gap-3 shadow-xs">
                        <Button variant="outline" className="h-[42px] px-5">Cancelar</Button>
                        <Button variant="primary" className="h-[42px] px-7">Guardar</Button>
                      </div>
                    </div>

                    {/* 3. Footer Confirmación Crítica */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          3. Footer de Diálogo de Confirmación (Dar de baja)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Botones 36px sentence case: Cancelar (outline) + Dar de baja (destructivo)
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center justify-end gap-2.5 shadow-xs">
                        <Button variant="outline" className="h-[36px] px-4 text-[12px]">Cancelar</Button>
                        <Button variant="destructive" className="h-[36px] px-4 text-[12px]">Dar de baja</Button>
                      </div>
                    </div>

                    {/* 4. Footer Clínico y Documental */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-black">
                          4. Footer de Modales Clínicos y Documentales (Ginecología / Documentos)
                        </span>
                        <span className="text-[11px] text-[#64748b]">
                          Botones 38px: Descartar / Cancelar (outline #cbd5e1) + Confirmar / Actualizar (primario)
                        </span>
                      </div>
                      <div className="p-4 rounded-[8px] border border-[#e2e8f0] bg-white flex items-center justify-end gap-3 shadow-xs">
                        <button
                          type="button"
                          className="h-[38px] px-4 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] text-black text-[13px] font-bold transition-colors cursor-pointer"
                        >
                          Descartar
                        </button>
                        <button
                          type="button"
                          className="h-[38px] px-5 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          Confirmar
                        </button>
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
