import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Video,
  MessageSquare,
  FileText,
  MoreVertical,
  X,
} from 'lucide-react';
import { V2Select } from './V2Select';

interface V2HistorialProps {
  onOpenVideoModal?: () => void;
  onOpenChatModal?: () => void;
}

type StatusType =
  | 'En proceso'
  | 'Pendiente de inicio'
  | 'Pendiente de recomendación'
  | 'Pendiente de informe'
  | 'Terminada'
  | 'Cancelada';

interface ConsultaItem {
  id: string;
  type: 'chat' | 'video';
  specialty: string;
  status: StatusType;
  date: string;
  time: string;
  reason: string;
  doctor: string;
  hasInforme?: boolean;
}

const INITIAL_CONSULTAS: ConsultaItem[] = [
  {
    id: 'c1',
    type: 'video',
    specialty: 'Psicología',
    status: 'En proceso',
    date: '27/10/2026',
    time: '10:10',
    reason: 'Primera consulta - Sesión de seguimiento y valoración psicológica.',
    doctor: 'Bruno Peñas',
  },
  {
    id: 'c2',
    type: 'chat',
    specialty: 'Medicina General',
    status: 'Pendiente de recomendación',
    date: '27/10/2026',
    time: '10:40',
    reason: 'Consulta sobre dudas de medicación y evolución de síntomas leves.',
    doctor: 'Bruno Peñas',
  },
  {
    id: 'c3',
    type: 'video',
    specialty: 'Medicina General',
    status: 'Pendiente de inicio',
    date: '28/10/2026',
    time: '12:00',
    reason: 'Control preventivo anual y revisión de tensión arterial.',
    doctor: 'Dra. María Fernández',
  },
  {
    id: 'c4',
    type: 'chat',
    specialty: 'Pediatría',
    status: 'Pendiente de informe',
    date: '26/10/2026',
    time: '16:15',
    reason: 'Consulta de control y dudas posvacunales en lactante.',
    doctor: 'Dr. Alejandro Gómez',
  },
  {
    id: 'c5',
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
    id: 'c6',
    type: 'video',
    specialty: 'Medicina General',
    status: 'Cancelada',
    date: '30/09/2026',
    time: '19:37',
    reason: 'Revisión periódica de resultados analíticos de laboratorio.',
    doctor: 'JOSE LUIS ROJANO TORRECILLA',
  },
];

export const V2Historial: React.FC<V2HistorialProps> = ({
  onOpenVideoModal,
  onOpenChatModal,
}) => {
  const [consultas, setConsultas] = useState<ConsultaItem[]>(INITIAL_CONSULTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [orderSort, setOrderSort] = useState('recientes');
  const [openMoreId, setOpenMoreId] = useState<string | null>(null);
  const [selectedConsulta, setSelectedConsulta] = useState<ConsultaItem | null>(null);
  const [crearMenuOpen, setCrearMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setCrearMenuOpen(false);
      }
      setOpenMoreId(null);
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedConsulta(null);
        setOpenMoreId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filteredConsultas = useMemo(() => {
    const list = consultas.filter((c) => {
      if (filterStatus === 'pendiente' && !c.status.startsWith('Pendiente')) return false;
      if (filterStatus !== 'todos' && filterStatus !== 'pendiente' && c.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.doctor.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q) ||
          c.reason.toLowerCase().includes(q)
        );
      }
      return true;
    });
    return orderSort === 'antiguas' ? [...list].reverse() : list;
  }, [consultas, filterStatus, searchQuery, orderSort]);

  const handleCancel = (id: string) => {
    setConsultas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Cancelada' } : c))
    );
    setSelectedConsulta((prev) => (prev && prev.id === id ? { ...prev, status: 'Cancelada' } : prev));
    setOpenMoreId(null);
    setToast('Consulta cancelada correctamente.');
    setTimeout(() => setToast(null), 3000);
  };

  const getBadgeStyle = (status: StatusType) => {
    if (status === 'En proceso') return 'bg-[#ecfdf5] text-[#047857]';
    if (status === 'Cancelada') return 'bg-[#fef2f2] text-[#b91c1c]';
    if (status === 'Terminada') return 'bg-[#f1f5f9] text-[#475569]';
    return 'bg-[#fffbeb] text-[#b45309]';
  };

  const formatDoctor = (doc: string) =>
    doc.startsWith('Dr.') || doc.startsWith('Dra.') ? doc : `Dr. ${doc}`;

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c34] text-white px-5 py-3.5 rounded-[12px] shadow-xl text-[14px] font-semibold">
          {toast}
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b1c34]/70">
            ATENCIÓN Y SEGUIMIENTO
          </span>
          <h1 className="v2-heading text-[32px] sm:text-[38px] font-bold text-[#0b1c34]">
            Historial de consultas
          </h1>
          <p className="text-[14px] text-[#475569]">
            Consulta el estado de tus citas médicas, videoconsultas e informes clínicos.
          </p>
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setCrearMenuOpen(!crearMenuOpen)}
            className="h-[46px] px-5 rounded-[10px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>SOLICITAR CONSULTA</span>
          </button>

          {crearMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[280px] bg-white rounded-[12px] shadow-[0_16px_40px_rgba(11,28,52,0.16)] px-4 py-1 flex flex-col divide-y divide-[#e2e8f0]">
              <button
                type="button"
                onClick={() => {
                  setCrearMenuOpen(false);
                  onOpenVideoModal?.();
                }}
                className="w-full py-3.5 flex items-start gap-3 cursor-pointer text-left group"
              >
                <Video className="w-[18px] h-[18px] text-[#0b1c34] group-hover:text-[#d50475] mt-0.5 shrink-0 transition-colors" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-bold text-[#0b1c34] group-hover:text-[#d50475] transition-colors">
                    Videoconsulta
                  </span>
                  <span className="text-[12px] text-[#64748b] leading-snug">
                    Agenda cita por especialidad con recetas e informes.
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrearMenuOpen(false);
                  onOpenChatModal?.();
                }}
                className="w-full py-3.5 flex items-start gap-3 cursor-pointer text-left group"
              >
                <MessageSquare className="w-[18px] h-[18px] text-[#0b1c34] group-hover:text-blue-500 mt-0.5 shrink-0 transition-colors" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-bold text-[#0b1c34] group-hover:text-blue-500 transition-colors">
                    Chat médico
                  </span>
                  <span className="text-[12px] text-[#64748b] leading-snug">
                    Habla ahora o programa un chat para dudas rápidas.
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Buscador & Filtros */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-[540px]">
          <Search className="w-4 h-4 text-[#64748b] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por paciente, médico, especialidad..."
            className="w-full h-[48px] pl-11 pr-4 rounded-[10px] bg-white border-0 text-[14px] text-[#0b1c34] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#d50475]/25"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <V2Select
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-full sm:w-[210px]"
            options={[
              { value: 'todos', label: 'Todos los estados' },
              { value: 'En proceso', label: 'En proceso' },
              { value: 'pendiente', label: 'Pendientes' },
              { value: 'Terminada', label: 'Terminadas' },
              { value: 'Cancelada', label: 'Canceladas' },
            ]}
          />

          <V2Select
            value={orderSort}
            onChange={setOrderSort}
            className="w-full sm:w-[170px]"
            options={[
              { value: 'recientes', label: 'Más recientes' },
              { value: 'antiguas', label: 'Más antiguas' },
            ]}
          />
        </div>
      </div>

      {/* 3. Tabla estilo Meetings con badges alineados, descripción truncada y botón More en todas las filas */}
      <div className="w-full bg-white rounded-[14px] flex flex-col divide-y divide-[#f1f5f9]">
        {filteredConsultas.length === 0 ? (
          <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2">
            <p className="text-[15px] font-bold text-[#0b1c34]">No se encontraron consultas</p>
            <p className="text-[13px]">Prueba a cambiar el filtro de estado o la búsqueda.</p>
          </div>
        ) : (
          filteredConsultas.map((c) => {
            const canCancel = c.status === 'En proceso' || c.status.startsWith('Pendiente');
            const isMoreOpen = openMoreId === c.id;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedConsulta(c)}
                className="px-5 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f8f8f7]/70 transition-colors cursor-pointer"
              >
                {/* Izquierda: Fecha/Hora + Icono + Info truncada */}
                <div className="flex items-center gap-4 min-w-0 flex-1 overflow-hidden">
                  <div className="w-[88px] shrink-0 flex flex-col">
                    <span className="text-[15px] font-bold text-[#0b1c34] leading-tight">
                      {c.time} h
                    </span>
                    <span className="text-[12px] text-[#64748b] mt-0.5">{c.date}</span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${
                      c.type === 'video'
                        ? 'bg-[#fdf2f8] text-[#d50475]'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {c.type === 'video' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[15px] font-bold text-[#0b1c34] shrink-0">
                        {c.specialty}
                      </span>
                      <span className="text-[13px] text-[#64748b] truncate">
                        · {formatDoctor(c.doctor)}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#64748b] truncate mt-0.5">{c.reason}</p>
                  </div>
                </div>

                {/* Derecha: Columna fija de Badges alineados + Acción + Botón More */}
                <div
                  className="flex items-center justify-between md:justify-end gap-3 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Badges alineados en la misma columna */}
                  <div className="md:w-[210px] flex md:justify-start">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${getBadgeStyle(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </div>

                  {/* Acción primaria/secundaria en ancho fijo */}
                  <div className="w-[100px] flex justify-end shrink-0">
                    {c.status === 'En proceso' && (
                      <button
                        type="button"
                        onClick={() =>
                          c.type === 'video' ? onOpenVideoModal?.() : onOpenChatModal?.()
                        }
                        className="h-[36px] px-3.5 rounded-[8px] bg-blue-50 hover:bg-blue-100 text-blue-600 text-[12px] font-bold uppercase cursor-pointer transition-colors"
                      >
                        ENTRAR
                      </button>
                    )}

                    {c.hasInforme && (
                      <button
                        type="button"
                        onClick={() => {
                          setToast('Abriendo informe médico...');
                          setTimeout(() => setToast(null), 2500);
                        }}
                        className="h-[36px] px-3 rounded-[8px] bg-[#f8f8f7] hover:bg-[#0b1c34] hover:text-white text-[#0b1c34] text-[12px] font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#d50475]" />
                        <span>INFORME</span>
                      </button>
                    )}
                  </div>

                  {/* Botón More en todas las filas (bloqueado si Terminada o Cancelada) */}
                  <div
                    className="relative"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      disabled={!canCancel}
                      onClick={() => setOpenMoreId(isMoreOpen ? null : c.id)}
                      aria-label="Más opciones"
                      title={canCancel ? 'Más opciones' : 'Sin acciones disponibles'}
                      className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition-colors ${
                        canCancel
                          ? 'hover:bg-[#f1f5f9] text-[#0b1c34] cursor-pointer'
                          : 'text-[#cbd5e1] cursor-not-allowed'
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isMoreOpen && canCancel && (
                      <div className="absolute right-0 top-[calc(100%+4px)] z-40 w-[190px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(11,28,52,0.16)] p-1.5 flex flex-col">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMoreId(null);
                            setSelectedConsulta(c);
                          }}
                          className="w-full px-3 py-2 rounded-[7px] hover:bg-[#f8f8f7] text-[13px] font-semibold text-[#0b1c34] text-left cursor-pointer"
                        >
                          Ver detalles
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancel(c.id)}
                          className="w-full px-3 py-2 rounded-[7px] hover:bg-[#fef2f2] text-[13px] font-semibold text-[#b91c1c] text-left cursor-pointer"
                        >
                          Cancelar consulta
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal con toda la información del evento al hacer clic en cualquier fila */}
      {selectedConsulta && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedConsulta(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1c34]/50 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[540px] bg-white rounded-[16px] shadow-[0_24px_60px_rgba(11,28,52,0.2)] p-6 sm:p-7 flex flex-col gap-5"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#f1f5f9]">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d50475]">
                  {selectedConsulta.type === 'video' ? 'VIDEOCONSULTA' : 'CHAT MÉDICO'}
                </span>
                <h2 className="v2-heading text-[22px] font-bold text-[#0b1c34]">
                  {selectedConsulta.specialty}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedConsulta(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f8f8f7] flex items-center justify-center text-[#64748b] hover:text-[#0b1c34] cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#f8f8f7] rounded-[12px] p-4 sm:p-5 flex flex-col divide-y divide-[#e2e8f0] text-[14px]">
              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-[#64748b]">Estado</span>
                <span
                  className={`px-3 py-0.5 rounded-full text-[12px] font-bold ${getBadgeStyle(
                    selectedConsulta.status
                  )}`}
                >
                  {selectedConsulta.status}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-[#64748b]">Especialista</span>
                <span className="font-bold text-[#0b1c34]">
                  {formatDoctor(selectedConsulta.doctor)}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-[#64748b]">Fecha y hora</span>
                <span className="font-bold text-[#0b1c34]">
                  {selectedConsulta.date} · {selectedConsulta.time} h
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-[#64748b]">Paciente</span>
                <span className="font-bold text-[#0b1c34]">Alejandro Navarro (Titular)</span>
              </div>
              <div className="pt-3 flex flex-col gap-1">
                <span className="text-[#64748b] text-[12px] font-bold uppercase tracking-wider">
                  Motivo de la consulta
                </span>
                <p className="text-[#0b1c34] leading-relaxed">{selectedConsulta.reason}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
              {(selectedConsulta.status === 'En proceso' ||
                selectedConsulta.status.startsWith('Pendiente')) && (
                <button
                  type="button"
                  onClick={() => handleCancel(selectedConsulta.id)}
                  className="h-[44px] px-4 rounded-[10px] bg-[#fef2f2] hover:bg-[#fee2e2] text-[#b91c1c] text-[13px] font-bold uppercase cursor-pointer"
                >
                  Cancelar consulta
                </button>
              )}

              {selectedConsulta.hasInforme && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedConsulta(null);
                    setToast('Abriendo informe médico...');
                    setTimeout(() => setToast(null), 2500);
                  }}
                  className="h-[44px] px-5 rounded-[10px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[13px] font-bold uppercase cursor-pointer"
                >
                  Ver informe
                </button>
              )}

              {selectedConsulta.status === 'En proceso' && (
                <button
                  type="button"
                  onClick={() => {
                    const type = selectedConsulta.type;
                    setSelectedConsulta(null);
                    if (type === 'video') onOpenVideoModal?.();
                    else onOpenChatModal?.();
                  }}
                  className="h-[44px] px-5 rounded-[10px] bg-blue-50 hover:bg-blue-100 text-blue-600 text-[13px] font-bold uppercase cursor-pointer"
                >
                  Entrar a la sala
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedConsulta(null)}
                className="h-[44px] px-5 rounded-[10px] bg-[#f8f8f7] hover:bg-[#e2e8f0] text-[#0b1c34] text-[13px] font-bold uppercase cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
