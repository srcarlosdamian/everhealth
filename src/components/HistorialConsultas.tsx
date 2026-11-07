import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Filter,
  X,
  Trash2,
  Plus,
  Video,
  MessageSquare,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge, BadgeVariant } from '../design-system/atoms/Badge';
import { TextInput } from '../design-system/atoms/TextInput';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';

interface HistorialConsultasProps {
  onOpenVideoModal?: () => void;
  onOpenChatModal?: () => void;
  onOpenDocumentsModal?: () => void;
}

export type ConsultaStatus =
  | 'Pendiente'
  | 'En proceso'
  | 'Terminada'
  | 'Cancelada'
  | 'No asistida'
  | 'Pendiente de informe'
  | 'Esperando en chat'
  | 'Pendiente de recomendación'
  | 'Terminada (inactividad)'
  | 'Pendiente de receta electrónica'
  | 'Resuelta con médico a domicilio'
  | 'Resuelta con envío a centro médico'
  | 'Médico a domicilio (pendiente informe)'
  | 'Envío a centro médico (pendiente informe)';

export interface ConsultaCardItem {
  id: string;
  type: 'chat' | 'video';
  specialty: string;
  status: ConsultaStatus;
  date: string;
  time: string;
  reason: string;
  doctor: string;
  hasInforme?: boolean;
}

// Datos conservados exactamente como los solicitó el usuario
const INITIAL_CONSULTAS: ConsultaCardItem[] = [
  {
    id: 'c1',
    type: 'chat',
    specialty: 'Medicina General',
    status: 'Pendiente de recomendación',
    date: '27/10/2026',
    time: '10:40',
    reason: 'Videollamada para discutir detalles de mi última consulta',
    doctor: 'Bruno Peñas',
    hasInforme: true,
  },
  {
    id: 'c2',
    type: 'video',
    specialty: 'Psicología',
    status: 'En proceso',
    date: '27/10/2026',
    time: '10:10',
    reason: 'Primera consulta - Test de seguimiento psicológico',
    doctor: 'Bruno Peñas',
    hasInforme: false,
  },
  {
    id: 'c3',
    type: 'video',
    specialty: 'Medicina General',
    status: 'Cancelada',
    date: '30/09/2026',
    time: '19:37',
    reason: 'Consulta general de revisión de analíticas y síntomas',
    doctor: 'JOSE LUIS ROJANO TORRECILLA',
    hasInforme: false,
  },
  {
    id: 'c4',
    type: 'chat',
    specialty: 'Nutrición',
    status: 'Terminada',
    date: '15/09/2026',
    time: '11:30',
    reason: 'Revisión y seguimiento nutricional de rutina',
    doctor: 'Dra. Elena Ruiz',
    hasInforme: true,
  },
  {
    id: 'c5',
    type: 'video',
    specialty: 'Pediatría',
    status: 'Pendiente de informe',
    date: '10/09/2026',
    time: '09:15',
    reason: 'Consulta de control general de salud infantil',
    doctor: 'Dr. Alejandro Gómez',
    hasInforme: true,
  },
];

const ALL_STATUS_OPTIONS: { col1: ConsultaStatus[]; col2: ConsultaStatus[] } = {
  col1: [
    'Pendiente',
    'Terminada',
    'No asistida',
    'Esperando en chat',
    'Terminada (inactividad)',
    'Resuelta con médico a domicilio',
    'Médico a domicilio (pendiente informe)',
  ],
  col2: [
    'En proceso',
    'Cancelada',
    'Pendiente de informe',
    'Pendiente de recomendación',
    'Pendiente de receta electrónica',
    'Resuelta con envío a centro médico',
    'Envío a centro médico (pendiente informe)',
  ],
};

const mapStatusToBadgeVariant = (status: ConsultaStatus): BadgeVariant => {
  switch (status) {
    case 'En proceso':
      return 'disponible';
    case 'Pendiente':
    case 'Pendiente de recomendación':
    case 'Pendiente de informe':
      return 'limitada';
    case 'Cancelada':
    case 'No asistida':
    case 'Terminada (inactividad)':
      return 'no-disponible';
    case 'Terminada':
      return 'programada';
    default:
      return 'programada';
  }
};

const formatShortDate = (dateStr: string): string => {
  // Convert 27/10/2026 to "27 OCT"
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return `${day} ${months[monthIndex] || 'OCT'}`;
  }
  return dateStr;
};

export const HistorialConsultas: React.FC<HistorialConsultasProps> = ({
  onOpenVideoModal,
  onOpenChatModal,
}) => {
  const [consultas, setConsultas] = useState<ConsultaCardItem[]>(INITIAL_CONSULTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'espera' | 'calendario'>('calendario');
  const [selectedFilterTab, setSelectedFilterTab] = useState<'activos' | 'historial'>('historial');
  const [crearMenuOpen, setCrearMenuOpen] = useState(false);

  // La primera consulta SIEMPRE abierta por defecto, como lo solicitó el usuario
  const [expandedId, setExpandedId] = useState<string | null>('c1');

  // Filtros
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<ConsultaStatus[]>([]);
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<ConsultaStatus[]>([]);
  const [tempDateFrom, setTempDateFrom] = useState('');
  const [tempDateTo, setTempDateTo] = useState('');

  // Cancelar consulta
  const [cancellingConsultaId, setCancellingConsultaId] = useState<string | null>(null);

  const handleToggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenFilters = () => {
    setTempSelectedStatuses([...selectedStatuses]);
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    setSelectedStatuses([...tempSelectedStatuses]);
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setTempSelectedStatuses([]);
    setSelectedStatuses([]);
    setTempDateFrom('');
    setTempDateTo('');
  };

  const handleToggleTempStatus = (status: ConsultaStatus) => {
    if (tempSelectedStatuses.includes(status)) {
      setTempSelectedStatuses(tempSelectedStatuses.filter((s) => s !== status));
    } else {
      setTempSelectedStatuses([...tempSelectedStatuses, status]);
    }
  };

  const handleConfirmCancel = () => {
    if (!cancellingConsultaId) return;
    setConsultas((prev) =>
      prev.map((c) =>
        c.id === cancellingConsultaId ? { ...c, status: 'Cancelada' } : c
      )
    );
    setCancellingConsultaId(null);
  };

  const filteredConsultas = useMemo(() => {
    return consultas.filter((c) => {
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(c.status)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.doctor.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q) ||
          c.reason.toLowerCase().includes(q) ||
          c.status.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [consultas, selectedStatuses, searchQuery]);

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-5 font-[family-name:Helvetica] px-4 sm:px-6 py-4 animate-fadeIn">
      {/* ================= 1. CABECERA: TÍTULO, SUBTÍTULO & + CREA NUEVA CONSULTA ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
            Consultas
          </h1>
          <p className="text-[14px] leading-[22px] text-[#475569]">
            Gestiona las consultas programadas
          </p>
        </div>

        {/* Botón: + Crea nueva consulta con ActionMenu */}
        <div className="relative self-start sm:self-auto">
          <Button
            variant="primary"
            onClick={() => setCrearMenuOpen(!crearMenuOpen)}
            className="h-[42px] px-5 shadow-xs"
          >
            <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
            <span>Crea nueva consulta</span>
          </Button>

          {crearMenuOpen && (
            <ActionMenu
              variant="solicitar-cita"
              className="absolute right-0 top-[calc(100%+6px)] z-50 w-[210px]"
              items={[
                {
                  id: 'video',
                  label: 'VIDEOCONSULTA',
                  icon: <Video className="w-5 h-5" />,
                  onClick: () => {
                    setCrearMenuOpen(false);
                    onOpenVideoModal?.();
                  },
                },
                {
                  id: 'chat',
                  label: 'CHAT MÉDICO',
                  icon: <MessageSquare className="w-5 h-5" />,
                  onClick: () => {
                    setCrearMenuOpen(false);
                    onOpenChatModal?.();
                  },
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* ================= 2. PÍLDORAS SUPERIORES (SALA DE ESPERA / CALENDARIO & ACTIVOS / HISTORIAL) ================= */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        {/* Izquierda: Sala de espera | Calendario */}
        <div className="inline-flex items-center p-1 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
          <button
            type="button"
            onClick={() => setSelectedTab('espera')}
            className={`px-4 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer select-none ${
              selectedTab === 'espera'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Sala de espera
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('calendario')}
            className={`px-4 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer select-none ${
              selectedTab === 'calendario'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Calendario
          </button>
        </div>

        {/* Derecha: Activos | Historial */}
        <div className="inline-flex items-center p-1 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
          <button
            type="button"
            onClick={() => setSelectedFilterTab('activos')}
            className={`px-4 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer select-none ${
              selectedFilterTab === 'activos'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Activos
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilterTab('historial')}
            className={`px-4 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer select-none ${
              selectedFilterTab === 'historial'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Historial
          </button>
        </div>
      </div>

      {/* ================= 3. BUSCADOR & BOTÓN FILTROS ================= */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <TextInput
          placeholder="Buscar por paciente, médico, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-[#94a3b8]" />}
          containerClassName="flex-1 max-w-[580px]"
        />

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Dropdown Recientes */}
          <button
            type="button"
            className="h-[44px] px-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-[14px] text-black font-normal flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>Recientes</span>
            <ChevronDown className="w-4 h-4 text-[#64748b]" />
          </button>

          {/* Botón Filtros */}
          <button
            type="button"
            onClick={handleOpenFilters}
            className={`h-[44px] px-4 rounded-[8px] border text-[14px] font-medium bg-white flex items-center gap-2 cursor-pointer transition-colors ${
              selectedStatuses.length > 0
                ? 'border-[#d50475] text-[#d50475]'
                : 'border-[#cbd5e1] hover:border-black text-black'
            }`}
          >
            <Filter className="w-4 h-4 text-[#64748b]" />
            <span>Filtros</span>
            <ChevronDown className="w-4 h-4 text-[#64748b]" />
            {selectedStatuses.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#d50475]" />
            )}
          </button>
        </div>
      </div>

      {/* ================= 4. TABLA / ACORDEÓN ESTILO CALENDARIO (BOCETO OFICIAL) ================= */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-[8px] overflow-hidden flex flex-col divide-y divide-[#e2e8f0]">
        {filteredConsultas.length === 0 ? (
          <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2">
            <p className="text-[15px] font-bold text-black">No se encontraron consultas</p>
            <p className="text-[13px] text-[#64748b]">
              Prueba a restablecer los filtros para ver todas tus citas.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-2 text-[13px] font-bold text-[#d50475] hover:underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          filteredConsultas.map((c) => {
            const isExpanded = expandedId === c.id;
            const badgeVariant = mapStatusToBadgeVariant(c.status);

            return (
              <div
                key={c.id}
                className={`w-full flex flex-col transition-colors ${
                  isExpanded ? 'bg-[#fafafa]' : 'bg-white hover:bg-[#fafbfc]'
                }`}
              >
                {/* FILA PRINCIPAL: 5 COLUMNAS DIVIDIDAS */}
                <div
                  onClick={() => handleToggleRow(c.id)}
                  className="w-full py-4 px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 items-center gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0]">
                    {/* Columna 1: Hora y Día/Fecha (Tipo Calendario) */}
                    <div className="flex flex-col pr-2">
                      <span className="text-[16px] font-bold text-black leading-tight">
                        {c.time}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-0.5">
                        {formatShortDate(c.date)}
                      </span>
                    </div>

                    {/* Columna 2: Modalidad y Especialidad */}
                    <div className="flex flex-col sm:pl-4">
                      <span className="text-[15px] font-bold text-black leading-tight">
                        {c.type === 'video' ? 'Videollamada' : 'Chat médico'}
                      </span>
                      <span className="text-[12px] text-[#64748b] mt-0.5">
                        {c.specialty} · Ever Health
                      </span>
                    </div>

                    {/* Columna 3: Paciente / Solicitante */}
                    <div className="flex flex-col sm:pl-4">
                      <span className="text-[15px] font-bold text-black leading-tight">
                        Carlos Damián
                      </span>
                      <span className="text-[12px] text-[#64748b] mt-0.5">
                        Titular · contact@carlosdamian.com
                      </span>
                    </div>

                    {/* Columna 4: Profesional */}
                    <div className="flex flex-col sm:pl-4">
                      <span className="text-[15px] font-bold text-black leading-tight">
                        Dr. {c.doctor}
                      </span>
                      <span className="text-[12px] text-[#64748b] mt-0.5">
                        {c.specialty} · Ever Health Doctor
                      </span>
                    </div>
                  </div>

                  {/* Columna 5: Badge de Estado + Chevron del Acordeón */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#f1f5f9]">
                    <Badge variant={badgeVariant}>{c.status}</Badge>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRow(c.id);
                      }}
                      className="w-8 h-8 rounded-full hover:bg-[#e2e8f0] flex items-center justify-center text-black transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-black" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-black" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CONTENIDO EXPANDIDO DEL ACORDEÓN:
                    Motivo + Botonera de acciones oficiales con <Button /> */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 flex flex-col gap-4 border-t border-[#f1f5f9] animate-fadeIn">
                    {/* Motivo de la consulta */}
                    <p className="text-[14px] text-black font-normal leading-relaxed">
                      {c.reason}
                    </p>

                    {/* Fila de Botones: Acceder, Historial, Notas internas, Tip de contrato a la izquierda;
                        Crear nuevo, Reasignar, Cancelar a la derecha */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      {/* Botones de acción principales a la izquierda */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Button
                          variant="primary"
                          onClick={() => {
                            if (c.type === 'video') onOpenVideoModal?.();
                            else onOpenChatModal?.();
                          }}
                          className="h-[36px] px-4"
                        >
                          Acceder
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => onOpenChatModal?.()}
                          className="h-[36px] px-4"
                        >
                          Historial
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => alert(`Notas internas de la consulta ${c.id}`)}
                          className="h-[36px] px-4"
                        >
                          Notas internas
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => alert(`Tipo de contrato de la consulta`)}
                          className="h-[36px] px-4"
                        >
                          Tip de contrato
                        </Button>
                      </div>

                      {/* Botones de gestión a la derecha */}
                      <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-auto">
                        <Button
                          variant="outline"
                          onClick={() => setCrearMenuOpen(true)}
                          className="h-[36px] px-3.5 text-[12px]"
                        >
                          Crear nuevo
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => alert(`Reasignar profesional para la consulta ${c.id}`)}
                          className="h-[36px] px-3.5 text-[12px]"
                        >
                          Reasignar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => setCancellingConsultaId(c.id)}
                          className="h-[36px] px-3.5 text-[12px]"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ================= 5. PIE DE LISTA & PAGINACIÓN (EXACTO AL BOCETO) ================= */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-8 text-[13px] text-[#64748b]">
        <span>
          Mostrando de 1 a {filteredConsultas.length} de {consultas.length} entradas
        </span>

        {/* Paginación exacta << < 1 2 4 5 > >> */}
        <div className="inline-flex items-center border border-[#cbd5e1] rounded-[6px] overflow-hidden bg-white">
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-black font-bold text-[13px] bg-[#f1f5f9]"
          >
            1
          </button>
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            4
          </button>
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            5
          </button>
          <button
            type="button"
            className="w-9 h-9 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= MODAL FILTROS OFICIAL ================= */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-[560px] bg-white rounded-[10px] shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] font-bold text-black tracking-tight">Filtros</h2>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#d50475] hover:bg-[#fdf2f8] transition-colors cursor-pointer"
                aria-label="Cerrar filtros"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[14px] font-bold text-black">
                Estado de la consulta
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                <div className="flex flex-col gap-2.5">
                  {ALL_STATUS_OPTIONS.col1.map((st) => (
                    <label
                      key={st}
                      className="flex items-center gap-2.5 text-[13px] text-black cursor-pointer hover:text-[#d50475] transition-colors select-none"
                    >
                      <input
                        type="checkbox"
                        checked={tempSelectedStatuses.includes(st)}
                        onChange={() => handleToggleTempStatus(st)}
                        className="w-4 h-4 rounded border-[#cbd5e1] text-[#d50475] accent-[#d50475] cursor-pointer"
                      />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5">
                  {ALL_STATUS_OPTIONS.col2.map((st) => (
                    <label
                      key={st}
                      className="flex items-center gap-2.5 text-[13px] text-black cursor-pointer hover:text-[#d50475] transition-colors select-none"
                    >
                      <input
                        type="checkbox"
                        checked={tempSelectedStatuses.includes(st)}
                        onChange={() => handleToggleTempStatus(st)}
                        className="w-4 h-4 rounded border-[#cbd5e1] text-[#d50475] accent-[#d50475] cursor-pointer"
                      />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[14px] font-bold text-black">
                Seleccionar rango de fecha
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#475569] font-medium w-6">De</span>
                  <input
                    type="date"
                    value={tempDateFrom}
                    onChange={(e) => setTempDateFrom(e.target.value)}
                    className="w-full h-[40px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#475569] font-medium w-6">A</span>
                  <input
                    type="date"
                    value={tempDateTo}
                    onChange={(e) => setTempDateTo(e.target.value)}
                    className="w-full h-[40px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-3 border-t border-[#f1f5f9]">
              <Button
                variant="outline"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full h-[42px]"
              >
                Cerrar
              </Button>

              <Button
                variant="primary"
                onClick={handleApplyFilters}
                className="w-full h-[42px]"
              >
                Aplicar
              </Button>

              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full py-2 text-center text-[13px] text-black hover:text-[#d50475] flex items-center justify-center gap-1.5 cursor-pointer transition-colors font-medium"
              >
                <Trash2 className="w-4 h-4 text-black" />
                <span>Limpiar filtros</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL DE CONFIRMACIÓN PARA CANCELAR CONSULTA ================= */}
      {cancellingConsultaId && (
        <ConfirmDeactivateModal
          isOpen={!!cancellingConsultaId}
          title="¿Estás seguro de que quieres cancelar esta consulta?"
          entityName="esta consulta programada"
          descriptionPrefix="Esta acción cancelará"
          descriptionSuffix="y su estado pasará a Cancelada."
          consequenceNote="Podrás volver a solicitar una nueva consulta o chat médico cuando lo necesites."
          cancelText="Volver"
          confirmText="Sí, cancelar consulta"
          onCancel={() => setCancellingConsultaId(null)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  );
};
