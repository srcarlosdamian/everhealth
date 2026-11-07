import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  Video,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge, BadgeVariant } from '../design-system/atoms/Badge';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { TablePagination } from '../design-system/molecules/TablePagination';
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
  | 'Pendiente de informe'
  | 'Pendiente de recomendación';

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

const INITIAL_CONSULTAS: ConsultaCardItem[] = [
  {
    id: 'c1',
    type: 'chat',
    specialty: 'Medicina General',
    status: 'Pendiente de recomendación',
    date: '27/10/2026',
    time: '10:40',
    reason: 'Consulta sobre dudas de medicación y evolución de síntomas leves.',
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
    reason: 'Primera consulta - Sesión de seguimiento y valoración psicológica.',
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
    reason: 'Revisión periódica de resultados analíticos de laboratorio.',
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
    reason: 'Revisión y ajuste del plan de alimentación y seguimiento mensual.',
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
    reason: 'Consulta de control general de salud infantil y calendario vacunal.',
    doctor: 'Dr. Alejandro Gómez',
    hasInforme: true,
  },
];

const STATUS_FILTER_OPTIONS = [
  { value: 'todos', label: 'Todos los estados' },
  { value: 'Pendiente de recomendación', label: 'Pendiente de recomendación' },
  { value: 'En proceso', label: 'En proceso' },
  { value: 'Pendiente de informe', label: 'Pendiente de informe' },
  { value: 'Terminada', label: 'Terminada' },
  { value: 'Cancelada', label: 'Cancelada' },
];

const ORDER_OPTIONS = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'antiguos', label: 'Más antiguos' },
];

const mapStatusToBadgeVariant = (status: ConsultaStatus): BadgeVariant => {
  switch (status) {
    case 'En proceso':
      return 'disponible';
    case 'Pendiente':
    case 'Pendiente de recomendación':
    case 'Pendiente de informe':
      return 'limitada';
    case 'Cancelada':
      return 'no-disponible';
    case 'Terminada':
      return 'programada';
    default:
      return 'programada';
  }
};

const formatShortDate = (dateStr: string): string => {
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
  onOpenDocumentsModal,
}) => {
  const [consultas, setConsultas] = useState<ConsultaCardItem[]>(INITIAL_CONSULTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [orderSort, setOrderSort] = useState('recientes');
  const [crearMenuOpen, setCrearMenuOpen] = useState(false);

  // La primera consulta abierta por defecto, como lo solicitó el usuario
  const [expandedId, setExpandedId] = useState<string | null>('c1');

  // Cancelar consulta
  const [cancellingConsultaId, setCancellingConsultaId] = useState<string | null>(null);

  const handleToggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
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
      if (filterStatus !== 'todos' && c.status !== filterStatus) {
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
  }, [consultas, filterStatus, searchQuery]);

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 font-[family-name:Helvetica] px-4 sm:px-6 py-4 animate-fadeIn">
      {/* ================= 1. CABECERA: TÍTULO, SUBTÍTULO & + CREA NUEVA CONSULTA ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
            Consultas
          </h1>
          <p className="text-[14px] leading-[22px] text-[#475569]">
            Gestiona las consultas programadas y revisa tu historial clínico.
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

      {/* ================= 2. BUSCADOR & FILTROS CON INPUTS Y DROPDOWNS HOMOLOGADOS ================= */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <TextInput
          placeholder="Buscar por paciente, médico, especialidad..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-[#94a3b8]" />}
          containerClassName="flex-1 max-w-[540px]"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Dropdown Filtro por Estado (Input/Dropdown homologado, sin modales raros) */}
          <div className="w-full sm:w-[220px]">
            <Dropdown
              value={filterStatus}
              onChange={setFilterStatus}
              options={STATUS_FILTER_OPTIONS}
            />
          </div>

          {/* Dropdown Ordenación Recientes */}
          <div className="w-full sm:w-[170px]">
            <Dropdown
              value={orderSort}
              onChange={setOrderSort}
              options={ORDER_OPTIONS}
            />
          </div>
        </div>
      </div>

      {/* ================= 3. TABLA / ACORDEÓN (FONDO 100% BLANCO, SIN FONDOS GRISES AL ABRIR) ================= */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-none overflow-hidden flex flex-col divide-y divide-[#e2e8f0]">
        {filteredConsultas.length === 0 ? (
          <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2 bg-white">
            <p className="text-[15px] font-bold text-black">No se encontraron consultas</p>
            <p className="text-[13px] text-[#64748b]">
              Prueba a cambiar el filtro de estado o la búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterStatus('todos');
                setSearchQuery('');
              }}
              className="mt-2 text-[13px] font-bold text-[#d50475] hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          filteredConsultas.map((c) => {
            const isExpanded = expandedId === c.id;
            const badgeVariant = mapStatusToBadgeVariant(c.status);

            return (
              <div
                key={c.id}
                className="w-full flex flex-col bg-white transition-colors"
              >
                {/* FILA PRINCIPAL: 5 COLUMNAS DIVIDIDAS (FONDO BLANCO PURO) */}
                <div
                  onClick={() => handleToggleRow(c.id)}
                  className="w-full py-4 px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 cursor-pointer select-none bg-white hover:bg-[#fafafa]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 items-center gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0]">
                    {/* Columna 1: Hora y Día/Fecha */}
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
                        {c.type === 'video' ? 'Videoconsulta' : 'Chat médico'}
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
                      className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
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
                    Fondo blanco puro (sin fondo gris), motivo y SOLO las acciones reales del paciente */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-5 pt-2 flex flex-col gap-4 border-t border-[#f1f5f9] bg-white animate-fadeIn">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-normal text-[#64748b]">
                        Motivo de la consulta:
                      </span>
                      <p className="text-[14px] text-black font-normal leading-relaxed">
                        {c.reason}
                      </p>
                    </div>

                    {/* Botones de acción reales del paciente (sin botones internos clínicos que no van) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#f8fafc]">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Botón principal según el estado */}
                        {c.status === 'En proceso' && (
                          <Button
                            variant="primary"
                            onClick={() => {
                              if (c.type === 'video') onOpenVideoModal?.();
                              else onOpenChatModal?.();
                            }}
                            className="h-[38px] px-5"
                          >
                            {c.type === 'video' ? 'Acceder a la videoconsulta' : 'Acceder al chat'}
                          </Button>
                        )}

                        {/* Ver conversación / historial si es chat o consulta terminada */}
                        {(c.type === 'chat' || c.status === 'Terminada' || c.status === 'Pendiente de recomendación') && (
                          <Button
                            variant="outline"
                            onClick={() => onOpenChatModal?.()}
                            className="h-[38px] px-4"
                          >
                            <MessageSquare className="w-4 h-4 text-[#64748b]" />
                            <span>Ver conversación</span>
                          </Button>
                        )}

                        {/* Ver informe médico si tiene informe */}
                        {c.hasInforme && (
                          <Button
                            variant="outline"
                            onClick={() => onOpenDocumentsModal?.()}
                            className="h-[38px] px-4"
                          >
                            <FileText className="w-4 h-4 text-[#64748b]" />
                            <span>Ver informe médico</span>
                          </Button>
                        )}
                      </div>

                      {/* Botón de Cancelar consulta si está en proceso o pendiente */}
                      {(c.status === 'En proceso' || c.status === 'Pendiente' || c.status === 'Pendiente de recomendación') && (
                        <Button
                          variant="outline"
                          onClick={() => setCancellingConsultaId(c.id)}
                          className="h-[38px] px-4 text-[#ef4444] hover:border-[#ef4444]"
                        >
                          Cancelar consulta
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Paginación idéntica y homologada con TablePagination */}
        <TablePagination
          visibleCount={filteredConsultas.length}
          totalCount={consultas.length}
          entityLabel="consultas"
        />
      </div>

      {/* ================= MODAL DE CONFIRMACIÓN PARA CANCELAR CONSULTA ================= */}
      {cancellingConsultaId && (
        <ConfirmDeactivateModal
          isOpen={!!cancellingConsultaId}
          title="¿Estás seguro de que quieres cancelar esta consulta?"
          entityName="esta consulta programada"
          descriptionPrefix="Esta acción cancelará"
          descriptionSuffix="y su estado pasará a Cancelada."
          consequenceNote="Podrás volver a solicitar una nueva videoconsulta o chat médico cuando lo necesites."
          cancelText="Volver"
          confirmText="Sí, cancelar consulta"
          onCancel={() => setCancellingConsultaId(null)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  );
};
