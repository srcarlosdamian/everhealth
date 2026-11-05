import React, { useState } from 'react';
import {
  X,
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Video,
  MessageSquare,
  ScanFace,
  Globe,
  Home,
  Plus,
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
  Palette,
  PlusCircle,
  ArrowLeft,
  SlidersHorizontal,
  LogOut,
} from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { StepperCheck } from '../atoms/StepperCheck';
import { PaginationEvents } from '../molecules/PaginationEvents';

interface DesignSystemViewProps {
  isOpen: boolean;
  onClose: () => void;
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
  { name: 'lucide/chevron-left', icon: ChevronLeft, label: 'Navegación anterior', category: 'Direccionales' },
  { name: 'lucide/chevron-down', icon: ChevronDown, label: 'Cargar más / Desplegable', category: 'Direccionales' },
  { name: 'lucide/chevron-up', icon: ChevronUp, label: 'Mostrar menos / Contraer', category: 'Direccionales' },
  { name: 'lucide/arrow-left', icon: ArrowLeft, label: 'Volver atrás', category: 'Direccionales' },
  { name: 'lucide/x', icon: X, label: 'Cerrar modal', category: 'Direccionales' },
];

export const DesignSystemView: React.FC<DesignSystemViewProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'atomos' | 'moleculas' | 'organismos' | 'tokens' | 'iconos'>('atomos');
  const [samplePageIndex, setSamplePageIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[960px] bg-white rounded-[12px] shadow-2xl my-8 flex flex-col max-h-[90vh] overflow-hidden border border-[#cbd5e1]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-black flex items-center gap-2">
                Ever Health · Atomic Design System
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#d50475] text-white">
                  Modular
                </span>
              </h2>
              <p className="text-[12px] text-[#64748b]">
                Estructura atómica: Modifica átomos centrales para sincronizar toda la app
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#e2e8f0] flex items-center justify-center text-black cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#e2e8f0] bg-white overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('atomos')}
            className={`pb-2.5 px-3 text-[13px] font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'atomos'
                ? 'border-black text-black'
                : 'border-transparent text-[#64748b] hover:text-black'
            }`}
          >
            1. Átomos (Elementos)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('moleculas')}
            className={`pb-2.5 px-3 text-[13px] font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'moleculas'
                ? 'border-black text-black'
                : 'border-transparent text-[#64748b] hover:text-black'
            }`}
          >
            2. Moléculas (Componentes)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('organismos')}
            className={`pb-2.5 px-3 text-[13px] font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'organismos'
                ? 'border-black text-black'
                : 'border-transparent text-[#64748b] hover:text-black'
            }`}
          >
            3. Organismos (Vistas / Tarjetas)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`pb-2.5 px-3 text-[13px] font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tokens'
                ? 'border-black text-black'
                : 'border-transparent text-[#64748b] hover:text-black'
            }`}
          >
            4. Tokens & Tipografía
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('iconos')}
            className={`pb-2.5 px-3 text-[13px] font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'iconos'
                ? 'border-black text-black'
                : 'border-transparent text-[#64748b] hover:text-black'
            }`}
          >
            5. Íconos Lucide Nativos
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          
          {/* TAB 1: ÁTOMOS */}
          {activeTab === 'atomos' && (
            <div className="space-y-6">
              
              {/* Badges Section */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Átomo: Badges & Tags</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Diferenciados por función: disponibilidad en tiempo real, estados de cita y porcentajes.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-[6px] border border-[#f1f5f9] bg-[#f8fafc] flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-[#64748b]">Disponibilidad</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="disponible" showDot>Disponible ahora</Badge>
                      <Badge variant="limitada" showDot>Disponibilidad limitada</Badge>
                      <Badge variant="no-disponible" showDot>No disponible</Badge>
                    </div>
                  </div>

                  <div className="p-3 rounded-[6px] border border-[#f1f5f9] bg-[#f8fafc] flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-[#64748b]">Estado de Consultas</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="confirmada">Confirmada</Badge>
                      <Badge variant="en-espera">En espera</Badge>
                      <Badge variant="programada">Programada</Badge>
                    </div>
                  </div>

                  <div className="p-3 rounded-[6px] border border-[#f1f5f9] bg-[#f8fafc] flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-[#64748b]">Porcentajes & Especialidades</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="porcentaje">10%</Badge>
                      <Badge variant="porcentaje">50%</Badge>
                      <Badge variant="especialidad">Medicina General</Badge>
                      <Badge variant="especialidad">Nutrición</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stepper & Checks Section */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Átomo: Stepper Checks (900 Magenta #831843)</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Checks circulares en tono Figma Pink 900 (`#831843`) con track divisor vertical. Cambian a círculo vacío cuando no están llenos.
                </p>

                <div className="flex items-start gap-8 p-4 bg-[#f8fafc] rounded-[6px] border border-[#f1f5f9]">
                  <div className="flex flex-col items-center">
                    <StepperCheck isCompleted={true} hasConnectingLine={true} />
                    <StepperCheck isCompleted={true} hasConnectingLine={true} />
                    <StepperCheck isCompleted={false} stepNumber={3} hasConnectingLine={false} />
                  </div>
                  <div className="flex flex-col justify-between h-[120px] text-[13px]">
                    <div>
                      <strong className="text-black font-bold">Paso 1: Motivo</strong>
                      <p className="text-[#64748b] text-[12px]">Completado (Check Pink 900 #831843)</p>
                    </div>
                    <div>
                      <strong className="text-black font-bold">Paso 2: Especialidad</strong>
                      <p className="text-[#64748b] text-[12px]">Completado (Check Pink 900 #831843)</p>
                    </div>
                    <div>
                      <strong className="text-black font-bold">Paso 3: Horario</strong>
                      <p className="text-[#64748b] text-[12px]">Pendiente (Círculo sin checkear)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Átomo: Botones</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Variantes principales: Primario rosa, Secundario outline, Botón lineal de navegación y Bloqueado en prototipo.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">
                    <Video className="w-4 h-4" />
                    <span>VIDEO CONSULTA</span>
                  </Button>
                  <Button variant="secondary">
                    <MessageSquare className="w-4 h-4" />
                    <span>CHAT MÉDICO</span>
                  </Button>
                  <Button variant="outline">
                    <span>ENTRAR A LA SALA</span>
                  </Button>
                  <Button variant="linear">
                    <span>Cargar más</span>
                  </Button>
                  <Button variant="primary" isLocked={true}>
                    <span>Confirmar tu cita (Bloqueada)</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOLÉCULAS */}
          {activeTab === 'moleculas' && (
            <div className="space-y-6">
              
              {/* Doctor Card with Border */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Molécula: Tarjeta de Médico con Borde</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Utilizada en 'Hablar ahora' con borde delimitador `#e2e8f0` y lista de especialidades.
                </p>

                <div className="border border-[#e2e8f0] rounded-[8px] p-3.5 bg-white flex items-center justify-between gap-4 max-w-[600px]">
                  <div className="flex items-center gap-3">
                    <div className="w-[50px] h-[50px] rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-black text-[14px]">
                      MF
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[15px] font-bold text-black">María Fernández</h4>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <Badge variant="especialidad">Medicina General</Badge>
                        <Badge variant="especialidad">Nutrición</Badge>
                        <Badge variant="especialidad">Psicología</Badge>
                      </div>
                    </div>
                  </div>
                  <Badge variant="disponible" showDot>Disponible ahora</Badge>
                </div>
              </div>

              {/* Pagination Molecule */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Molécula: Contador de Eventos & Cargar más</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Muestra '1 de 5 eventos' a la izquierda y botón de 'Cargar más' a la derecha para ver los restantes.
                </p>

                <div className="max-w-[600px] bg-[#f8fafc] p-4 rounded-[8px] border border-[#f1f5f9]">
                  <div className="p-3 bg-white rounded-[6px] border border-[#e2e8f0] mb-3 text-[13px] font-bold">
                    Contenido del evento activo
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0]">
                    <span className="text-[13px] font-bold text-[#475569]">1 de 5 eventos</span>
                    <button className="h-[30px] px-3 rounded-[6px] border border-[#cbd5e1] text-[12px] font-bold flex items-center gap-1 bg-white">
                      <span>Cargar más</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORGANISMOS */}
          {activeTab === 'organismos' && (
            <div className="space-y-6">
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Organismo: Escaneo Biométrico (Figma EVR - 100)</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Título arriba, descripción de una línea abajo sin icono a la izquierda. Botón con icono nativo Lucide (scan-face).
                </p>
                <div className="border border-[#e2e8f0] rounded-[8px] p-5 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[18px] font-bold text-black">
                      Escaneo biométrico
                    </h4>
                    <p className="text-[14px] text-[#475569]">
                      Mide tus signos vitales y pulso en segundos usando la cámara para complementar tu expediente.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="h-[38px] px-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-[#d50475] bg-white hover:bg-[#fdf2f8] text-[#d50475] text-[13px] font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                  >
                    <ScanFace className="w-5 h-5 text-[#d50475] stroke-[2]" />
                    <span className="whitespace-nowrap">INICIAR ESCANEO</span>
                  </button>
                </div>
              </div>

              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Organismo: Atención Inmediata (Limpia)</h3>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Eliminado el texto saturado por petición de usuarios.
                </p>
                <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-[14px] font-bold text-black">
                      Atención inmediata · Médicos en línea (Tiempo estimado 12 min)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="primary">
                      <Video className="w-4 h-4" />
                      <span>VIDEO CONSULTA</span>
                    </Button>
                    <Button variant="secondary">
                      <MessageSquare className="w-4 h-4" />
                      <span>CHAT MÉDICO</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TOKENS */}
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              {/* Pink Palette from Figma */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Paleta Pink (Figma: colors.pink)</h3>
                <p className="text-[12px] text-[#64748b] mb-3">
                  Tokens oficiales de Figma: Brand Primary (#d50475) y Stepper Check 900 (#831843).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {[
                    { label: '50', hex: '#fdf2f8' },
                    { label: '100', hex: '#fce7f3' },
                    { label: '200', hex: '#fbcfe8' },
                    { label: '300', hex: '#f9a8d4' },
                    { label: '400', hex: '#f472b6' },
                    { label: '500', hex: '#ec4899' },
                    { label: '600', hex: '#db2777' },
                    { label: '700', hex: '#be185d' },
                    { label: 'Brand', hex: '#d50475', isBrand: true },
                    { label: '800', hex: '#9d174d' },
                    { label: '900', hex: '#831843', isCheck: true },
                  ].map((c) => (
                    <div key={c.label} className="p-2 rounded-[6px] border border-[#e2e8f0] flex flex-col gap-1">
                      <div className="w-full h-8 rounded" style={{ backgroundColor: c.hex }} />
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-black">{c.label}</span>
                        <span className="text-[#64748b] font-mono">{c.hex}</span>
                      </div>
                      {c.isBrand && <span className="text-[9px] font-bold text-[#d50475]">Brand Primary</span>}
                      {c.isCheck && <span className="text-[9px] font-bold text-[#831843]">Stepper 900</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Blue Gray Neutrals from Figma */}
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <h3 className="text-[15px] font-bold text-black mb-1">Paleta Neutros 1: Blue Gray (Figma: colors.blueGray)</h3>
                <p className="text-[12px] text-[#64748b] mb-3">
                  Neutros primarios para fondos, bordes (#e2e8f0, #cbd5e1) y tipografías (#475569, #0f172a).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { label: '50', hex: '#f8fafc' },
                    { label: '100', hex: '#f1f5f9' },
                    { label: '200', hex: '#e2e8f0' },
                    { label: '300', hex: '#cbd5e1' },
                    { label: '400', hex: '#94a3b8' },
                    { label: '500', hex: '#64748b' },
                    { label: '600', hex: '#475569' },
                    { label: '700', hex: '#334155' },
                    { label: '800', hex: '#1e293b' },
                    { label: '900', hex: '#0f172a' },
                  ].map((c) => (
                    <div key={c.label} className="p-2 rounded-[6px] border border-[#e2e8f0] flex flex-col gap-1">
                      <div className="w-full h-7 rounded border border-[#e2e8f0]" style={{ backgroundColor: c.hex }} />
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-black">{c.label}</span>
                        <span className="text-[#64748b] font-mono">{c.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Base & Typography */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                  <h3 className="text-[15px] font-bold text-black mb-2">Base (Figma colors.base)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-[6px] border border-[#e2e8f0] flex flex-col gap-1">
                      <div className="w-full h-8 rounded bg-black" />
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>Black</span>
                        <span className="font-mono">#000000</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-[6px] border border-[#e2e8f0] flex flex-col gap-1">
                      <div className="w-full h-8 rounded bg-white border border-[#cbd5e1]" />
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>White</span>
                        <span className="font-mono">#ffffff</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                  <h3 className="text-[15px] font-bold text-black mb-2">Tipografía Oficial</h3>
                  <p className="text-[13px] leading-[22px] text-[#475569]">
                    Familia tipográfica: <strong className="text-black">Helvetica</strong> (estrictamente Helvetica, nada más).
                    <br />
                    <code className="bg-[#f1f5f9] px-2 py-0.5 rounded font-mono text-[12px] mt-1 inline-block">
                      Helvetica
                    </code>
                    <br />
                    <span className="text-[12px] text-[#64748b] mt-1 inline-block">
                      Pesos oficiales: 700 (Bold) para títulos y llamadas a la acción, 400 (Regular) para textos descriptivos.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ÍCONOS LUCIDE NATIVOS */}
          {activeTab === 'iconos' && (
            <div className="space-y-6">
              <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[15px] font-bold text-black">Catálogo de Íconos Lucide Nativos</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-black">
                    {ICONS_CATALOG.length} íconos activos
                  </span>
                </div>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Todos los íconos del sistema son Lucide nativos (svg escalables) sin librerías externas adicionales.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ICONS_CATALOG.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="p-3 rounded-[6px] border border-[#e2e8f0] hover:border-black bg-white flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-black shrink-0">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[12px] font-bold text-black truncate">{item.label}</span>
                            <span className="text-[10px] text-[#64748b] font-mono truncate">{item.name}</span>
                          </div>
                        </div>
                        <div className="text-[#d50475] shrink-0" title="Variante Pink">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between text-[12px] text-[#64748b]">
          <span>Ever Health UI Framework · Componentes 100% editables</span>
          <Button variant="outline" onClick={onClose} className="h-[32px] px-3 text-[12px]">
            Cerrar
          </Button>
        </div>

      </div>
    </div>
  );
};
