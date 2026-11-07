import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Video,
  Calendar,
  Clock,
  Filter,
  RotateCw,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  X,
  Trash2,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { SwitchToggle } from '../design-system/atoms/SwitchToggle';
import { StatusDotBadge } from '../design-system/atoms/StatusDotBadge';
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

// Datos basados exactamente en la captura oficial media_1794026161936_1c2a4eb3.jpg
const INITIAL_CONSULTAS: ConsultaCardItem[] = [
  {
    id: 'c1',
    type: 'chat',
    specialty: 'Medicina General',
    status: 'Pendiente de recomendación',
    date: '27/10/2026',
    time: '10:40',
    reason: 'test',
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
    reason: 'Primera consulta - Test',
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
    reason: 'test',
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

export const HistorialConsultas: React.FC<HistorialConsultasProps> = ({
  onOpenVideoModal,
  onOpenChatModal,
}) => {
  const [consultas, setConsultas] = useState<ConsultaCardItem[]>(INITIAL_CONSULTAS);
  const [soloInformes, setSoloInformes] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<ConsultaStatus[]>([]);
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<ConsultaStatus[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [tempDateFrom, setTempDateFrom] = useState('');
  const [tempDateTo, setTempDateTo] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal para confirmar cancelación
  const [cancellingConsultaId, setCancellingConsultaId] = useState<string | null>(null);

  // Abrir modal de filtros inicializando los temporales
  const handleOpenFilters = () => {
    setTempSelectedStatuses([...selectedStatuses]);
    setTempDateFrom(dateFrom);
    setTempDateTo(dateTo);
    setIsFilterModalOpen(true);
  };

  // Aplicar filtros
  const handleApplyFilters = () => {
    setSelectedStatuses([...tempSelectedStatuses]);
    setDateFrom(tempDateFrom);
    setDateTo(tempDateTo);
    setIsFilterModalOpen(false);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setTempSelectedStatuses([]);
    setTempDateFrom('');
    setTempDateTo('');
    setSelectedStatuses([]);
    setDateFrom('');
    setDateTo('');
  };

  const handleToggleTempStatus = (status: ConsultaStatus) => {
    if (tempSelectedStatuses.includes(status)) {
      setTempSelectedStatuses(tempSelectedStatuses.filter((s) => s !== status));
    } else {
      setTempSelectedStatuses([...tempSelectedStatuses, status]);
    }
  };

  // Confirmar cancelación de consulta
  const handleConfirmCancel = () => {
    if (!cancellingConsultaId) return;
    setConsultas((prev) =>
      prev.map((c) =>
        c.id === cancellingConsultaId ? { ...c, status: 'Cancelada' } : c
      )
    );
    setCancellingConsultaId(null);
  };

  // Simular refresco
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  // Filtrado de consultas
  const filteredConsultas = useMemo(() => {
    return consultas.filter((c) => {
      if (soloInformes && !c.hasInforme) return false;
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(c.status)) {
        return false;
      }
      return true;
    });
  }, [consultas, soloInformes, selectedStatuses]);

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6 font-[family-name:Helvetica] px-4 sm:px-6 py-4 animate-fadeIn">
      {/* ================= ENCABEZADO OFICIAL (media_1794026161936_1c2a4eb3.jpg) ================= */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-[#64748b] font-medium tracking-wide">
          Historial
        </span>
        <h1 className="text-[22px] sm:text-[26px] leading-[32px] font-bold text-black tracking-tight">
          Aquí puedes consultar o editar tu historial médico
        </h1>
      </div>

      {/* ================= BARRA DE ACCIÓN: VER SOLO INFORMES + FILTRAR ================= */}
      <div className="w-full flex items-center justify-between pt-2 pb-1 border-b border-[#f1f5f9]">
        {/* Toggle "Ver solo informes" */}
        <SwitchToggle
          checked={soloInformes}
          onChange={setSoloInformes}
          label="Ver solo informes"
        />

        {/* Botón Filtrar con embudo (exacto a la captura) */}
        <button
          type="button"
          onClick={handleOpenFilters}
          className="flex items-center gap-2 text-[14px] font-bold text-[#4a154b] hover:text-[#d50475] transition-colors cursor-pointer select-none"
        >
          <Filter className="w-[18px] h-[18px] fill-[#4a154b] stroke-[#4a154b]" />
          <span>Filtrar</span>
          {selectedStatuses.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#d50475]" />
          )}
        </button>
      </div>

      {/* ================= LISTA DE TARJETAS DE CONSULTAS ================= */}
      <div className="flex flex-col gap-4">
        {filteredConsultas.length === 0 ? (
          <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2 bg-white border border-[#e2e8f0] rounded-[6px]">
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
          filteredConsultas.map((c) => (
            <div
              key={c.id}
              className="w-full bg-white border border-[#e2e8f0] rounded-[6px] p-5 sm:p-6 flex flex-col gap-4 shadow-none transition-shadow hover:shadow-xs"
            >
              {/* Fila Superior: Icono de tipo + Especialidad a la izquierda; Dot + Estado a la derecha */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-black">
                  {c.type === 'chat' ? (
                    <MessageSquare className="w-[18px] h-[18px] text-[#475569] stroke-[2]" />
                  ) : (
                    <Video className="w-[18px] h-[18px] text-[#475569] stroke-[2]" />
                  )}
                  <span className="text-[15px] font-bold text-black leading-none">
                    {c.specialty}
                  </span>
                </div>

                {/* Dot coloreado + Estado (exacto a la captura) */}
                <StatusDotBadge status={c.status} />
              </div>

              {/* Línea divisoria muy sutil */}
              <div className="w-full h-[1px] bg-[#f8fafc]" />

              {/* Grid de 4 columnas de datos: Fecha, Hora, Motivo de la consulta, Profesional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
                {/* Columna Fecha */}
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#64748b] font-normal">Fecha:</span>
                  <div className="flex items-center gap-2 font-bold text-black text-[14px]">
                    <Calendar className="w-4 h-4 text-[#94a3b8] shrink-0" />
                    <span>{c.date}</span>
                  </div>
                </div>

                {/* Columna Hora */}
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#64748b] font-normal">Hora:</span>
                  <div className="flex items-center gap-2 font-bold text-black text-[14px]">
                    <Clock className="w-4 h-4 text-[#94a3b8] shrink-0" />
                    <span>{c.time}</span>
                  </div>
                </div>

                {/* Columna Motivo */}
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#64748b] font-normal">
                    Motivo de la consulta:
                  </span>
                  <span className="text-black text-[14px] font-normal break-words">
                    {c.reason}
                  </span>
                </div>

                {/* Columna Profesional */}
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#64748b] font-normal">
                    Profesional:
                  </span>
                  <span className="font-bold text-black text-[14px]">
                    {c.doctor}
                  </span>
                </div>
              </div>

              {/* ================= BOTONES DE ACCIÓN OFICIALES ================= */}
              {/* Dependiendo del estado exacto a media_1794026161936_1c2a4eb3.jpg:
                  - En proceso: [ Cancelar consulta ] (píldora contorno negro) y [ Acceder a la consulta ] (píldora magenta sólido)
                  - Pendiente de recomendación / Terminada: [ Ver conversación ] (píldora contorno morado #4a154b)
                  - Cancelada: sin botones */}
              {c.status === 'En proceso' && (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="pill-outline"
                    onClick={() => setCancellingConsultaId(c.id)}
                  >
                    Cancelar consulta
                  </Button>
                  <Button
                    variant="pill-primary"
                    onClick={() => {
                      if (c.type === 'video') onOpenVideoModal?.();
                      else onOpenChatModal?.();
                    }}
                  >
                    Acceder a la consulta
                  </Button>
                </div>
              )}

              {(c.status === 'Pendiente de recomendación' ||
                c.status === 'Terminada' ||
                c.status === 'Pendiente de informe') && (
                <div className="flex items-center justify-end pt-2">
                  <Button
                    variant="pill-purple"
                    onClick={() => onOpenChatModal?.()}
                  >
                    Ver conversación
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ================= BARRA INFERIOR: REFRESCO + PAGINACIÓN + CONTADOR ================= */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-8">
        {/* Botón Refresco a la izquierda */}
        <button
          type="button"
          onClick={handleRefresh}
          className="w-9 h-9 rounded-[6px] border border-[#cbd5e1] hover:bg-[#f8fafc] flex items-center justify-center text-black cursor-pointer transition-colors"
          title="Recargar consultas"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        {/* Paginación << < 1 > >> al centro */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            className="w-8 h-8 rounded-[4px] border border-[#e2e8f0] bg-white text-[#94a3b8] flex items-center justify-center cursor-not-allowed text-[12px]"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled
            className="w-8 h-8 rounded-[4px] border border-[#e2e8f0] bg-white text-[#94a3b8] flex items-center justify-center cursor-not-allowed text-[12px]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-[4px] border border-[#cbd5e1] bg-white font-bold text-black flex items-center justify-center text-[12px] shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            disabled
            className="w-8 h-8 rounded-[4px] border border-[#e2e8f0] bg-white text-[#94a3b8] flex items-center justify-center cursor-not-allowed text-[12px]"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled
            className="w-8 h-8 rounded-[4px] border border-[#e2e8f0] bg-white text-[#94a3b8] flex items-center justify-center cursor-not-allowed text-[12px]"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Contador a la derecha */}
        <span className="text-[13px] text-[#64748b] font-normal">
          {filteredConsultas.length} {filteredConsultas.length === 1 ? 'consulta' : 'consultas'} en total
        </span>
      </div>

      {/* ================= MODAL FILTROS (media_1794026169453_aa37a9fe.png) ================= */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-[560px] bg-white rounded-[10px] shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-scaleUp">
            {/* Header con título y cruz rosa/neutral */}
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

            {/* Grupo 1: Estado de la consulta */}
            <div className="flex flex-col gap-3">
              <span className="text-[14px] font-bold text-black">
                Estado de la consulta
              </span>

              {/* 2 Columnas de checkboxes exactas a media_1794026169453_aa37a9fe.png */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {/* Columna 1 */}
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

                {/* Columna 2 */}
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

            {/* Grupo 2: Seleccionar rango de fecha */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[14px] font-bold text-black">
                Seleccionar rango de fecha
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#475569] font-medium w-6">De</span>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={tempDateFrom}
                      onChange={(e) => setTempDateFrom(e.target.value)}
                      className="w-full h-[40px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#475569] font-medium w-6">A</span>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={tempDateTo}
                      onChange={(e) => setTempDateTo(e.target.value)}
                      className="w-full h-[40px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Grupo 3: Botones apilados verticalmente (exacto a media_1794026169453_aa37a9fe.png) */}
            <div className="flex flex-col gap-2.5 pt-3">
              {/* Botón Cerrar: píldora borde negro */}
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full h-[44px] rounded-full border border-black hover:bg-[#f8fafc] text-black text-[14px] font-bold transition-colors cursor-pointer"
              >
                Cerrar
              </button>

              {/* Botón Aplicar: píldora magenta sólido */}
              <button
                type="button"
                onClick={handleApplyFilters}
                className="w-full h-[44px] rounded-full bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                Aplicar
              </button>

              {/* Botón Limpiar filtros: texto centrado con icono de basurero */}
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full py-2 text-center text-[13px] text-black hover:text-[#d50475] flex items-center justify-center gap-1.5 cursor-pointer transition-colors select-none font-medium"
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
