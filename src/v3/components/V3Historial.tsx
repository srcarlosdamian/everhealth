import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  Video,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { V3Select } from './V3Select';

interface V3HistorialProps {
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

export const V3Historial: React.FC<V3HistorialProps> = ({
  onOpenVideoModal,
  onOpenChatModal,
}) => {
  const [consultas, setConsultas] = useState<ConsultaItem[]>(INITIAL_CONSULTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [orderSort, setOrderSort] = useState('recientes');
  const [expandedId, setExpandedId] = useState<string | null>('c1');
  const [crearMenuOpen, setCrearMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setCrearMenuOpen(false);
      }
    };
    if (crearMenuOpen) document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [crearMenuOpen]);

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
    setToast('Consulta cancelada correctamente.');
    setTimeout(() => setToast(null), 3000);
  };

  const getBadgeStyle = (status: StatusType) => {
    if (status === 'En proceso') return 'bg-[#fdf2f8] text-[#d50475]';
    if (status === 'Cancelada') return 'bg-[#f7f7f5] text-[#73746f]';
    if (status === 'Terminada') return 'bg-[#141514] text-white';
    return 'bg-[#eeeeea] text-[#141514]';
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141514] text-white px-5 py-3.5 rounded-[4px] shadow-xl text-[13px] font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="v3-mono text-[11px] font-medium uppercase text-[#52534f] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d50475]" />
            ATENCIÓN Y SEGUIMIENTO
          </span>
          <h1 className="v3-serif text-[34px] sm:text-[40px] leading-[1.08] font-normal text-[#141514]">
            Historial de consultas
          </h1>
          <p className="text-[14px] text-[#52534f]">
            Consulta el estado de tus citas médicas, videoconsultas e informes clínicos.
          </p>
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setCrearMenuOpen(!crearMenuOpen)}
            className="h-[46px] px-5 rounded-[4px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Solicitar consulta</span>
          </button>

          {crearMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[280px] bg-white rounded-[4px] shadow-[0_16px_40px_rgba(20,21,20,0.16)] px-4 py-1 flex flex-col divide-y divide-[#eeeeea]">
              <button
                type="button"
                onClick={() => {
                  setCrearMenuOpen(false);
                  onOpenVideoModal?.();
                }}
                className="w-full py-3.5 flex items-start gap-3 cursor-pointer text-left group"
              >
                <Video className="w-[18px] h-[18px] text-[#141514] group-hover:text-[#d50475] mt-0.5 shrink-0 transition-colors" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-semibold text-[#141514] group-hover:text-[#d50475] transition-colors">
                    Videoconsulta
                  </span>
                  <span className="text-[12px] text-[#52534f] leading-snug">
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
                <MessageSquare className="w-[18px] h-[18px] text-[#141514] group-hover:text-[#d50475] mt-0.5 shrink-0 transition-colors" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-semibold text-[#141514] group-hover:text-[#d50475] transition-colors">
                    Chat médico
                  </span>
                  <span className="text-[12px] text-[#52534f] leading-snug">
                    Habla ahora o programa un chat para dudas rápidas.
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Buscador & Filtros */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-[540px]">
          <Search className="w-4 h-4 text-[#52534f] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por paciente, médico, especialidad..."
            className="w-full h-[46px] pl-11 pr-4 rounded-[4px] bg-white border-0 text-[14px] text-[#141514] placeholder:text-[#73746f] focus:outline-none focus:ring-1 focus:ring-[#141514]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <V3Select
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

          <V3Select
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

      {/* Lista editorial minimalista */}
      <div className="w-full bg-white rounded-[4px] flex flex-col divide-y divide-[#eeeeea]">
        {filteredConsultas.length === 0 ? (
          <div className="py-16 text-center text-[#52534f] flex flex-col items-center justify-center gap-2">
            <p className="text-[15px] font-semibold text-[#141514]">No se encontraron consultas</p>
            <p className="text-[13px]">Prueba a cambiar el filtro de estado o la búsqueda.</p>
          </div>
        ) : (
          filteredConsultas.map((c) => {
            const isExpanded = expandedId === c.id;
            const doctorName =
              c.doctor.startsWith('Dr.') || c.doctor.startsWith('Dra.')
                ? c.doctor
                : `Dr. ${c.doctor}`;
            return (
              <div key={c.id} className="w-full flex flex-col">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  className="px-5 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-[96px] shrink-0 flex flex-col">
                      <span className="text-[14px] font-semibold text-[#141514] leading-tight">
                        {c.time} h
                      </span>
                      <span className="v3-mono text-[11px] text-[#52534f] mt-0.5">{c.date}</span>
                    </div>

                    <div className="w-9 h-9 rounded-[4px] bg-[#f7f7f5] text-[#141514] flex items-center justify-center shrink-0">
                      {c.type === 'video' ? (
                        <Video className="w-4 h-4 text-[#d50475]" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-[#141514]" />
                      )}
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-[15px] font-semibold text-[#141514]">
                          {c.specialty}
                        </span>
                        <span className="text-[13px] text-[#52534f]">· {doctorName}</span>
                      </div>
                      <p className="text-[13px] text-[#52534f] truncate mt-0.5">{c.reason}</p>
                    </div>
                  </div>

                  <div
                    className="flex flex-wrap items-center justify-between md:justify-end gap-3 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      className={`v3-mono px-2.5 py-1 rounded-[3px] text-[10px] font-medium uppercase ${getBadgeStyle(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>

                    {c.status === 'En proceso' && (
                      <button
                        type="button"
                        onClick={() =>
                          c.type === 'video' ? onOpenVideoModal?.() : onOpenChatModal?.()
                        }
                        className="h-[36px] px-3.5 rounded-[4px] bg-[#141514] hover:bg-[#2a2b29] text-white text-[12px] font-medium cursor-pointer transition-colors"
                      >
                        Entrar
                      </button>
                    )}

                    {c.hasInforme && (
                      <button
                        type="button"
                        onClick={() => {
                          setToast('Abriendo informe médico...');
                          setTimeout(() => setToast(null), 2500);
                        }}
                        className="h-[36px] px-3.5 rounded-[4px] bg-[#f7f7f5] hover:bg-[#141514] hover:text-white text-[#141514] text-[12px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#d50475]" />
                        <span>Informe</span>
                      </button>
                    )}

                    {(c.status === 'En proceso' || c.status.startsWith('Pendiente')) && (
                      <button
                        type="button"
                        onClick={() => handleCancel(c.id)}
                        className="h-[36px] px-3 rounded-[4px] text-[#52534f] hover:text-[#d50475] text-[12px] font-medium cursor-pointer transition-colors"
                      >
                        Cancelar
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : c.id)}
                      className="p-1 text-[#52534f] cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-4 pt-2 bg-[#f7f7f5] text-[13px] text-[#52534f]">
                    <span className="v3-mono text-[10px] uppercase text-[#141514] block mb-1">
                      Motivo completo
                    </span>
                    {c.reason}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
