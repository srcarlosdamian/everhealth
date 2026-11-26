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
    if (status === 'En proceso') return 'bg-[#ecfdf5] text-[#047857]';
    if (status === 'Cancelada') return 'bg-[#fef2f2] text-[#b91c1c]';
    if (status === 'Terminada') return 'bg-[#f1f5f9] text-[#475569]';
    return 'bg-[#fffbeb] text-[#b45309]';
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c34] text-white px-5 py-3.5 rounded-[12px] shadow-xl text-[14px] font-semibold">
          {toast}
        </div>
      )}

      {/* 1. Header con título a la izquierda y dropdown SOLICITAR CONSULTA en rosa primario */}
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

      {/* 2. Buscador & Filtros (sin bordes duros, inputs amplios de 48px) */}
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

      {/* 3. Tabla / Acordeón estilo editorial con líneas divisorias horizontales sutiles sobre el fondo */}
      <div className="w-full border-t border-b border-[#cbd5e1]/70 flex flex-col divide-y divide-[#cbd5e1]/70">
        {filteredConsultas.length === 0 ? (
          <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2">
            <p className="text-[15px] font-bold text-[#0b1c34]">No se encontraron consultas</p>
            <p className="text-[13px]">Prueba a cambiar el filtro de estado o la búsqueda.</p>
          </div>
        ) : (
          filteredConsultas.map((c) => {
            const isExpanded = expandedId === c.id;
            return (
              <div key={c.id} className="w-full flex flex-col">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  className="w-full py-5 px-2 sm:px-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 cursor-pointer select-none hover:bg-white/60 transition-colors"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 items-center gap-4 lg:gap-6">
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-[#0b1c34] leading-tight">
                        {c.time}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mt-0.5">
                        {c.date}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#0b1c34] leading-tight">
                        {c.type === 'video' ? 'Videoconsulta' : 'Chat médico'}
                      </span>
                      <span className="text-[12px] text-[#64748b] mt-0.5">
                        {c.specialty} · Ever Health
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#0b1c34] leading-tight">
                        Alejandro Navarro
                      </span>
                      <span className="text-[12px] text-[#64748b] mt-0.5">
                        Titular
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#0b1c34] leading-tight">
                        {c.doctor.startsWith('Dr.') || c.doctor.startsWith('Dra.')
                          ? c.doctor
                          : `Dr. ${c.doctor}`}
                      </span>
                      <span className="text-[12px] text-[#64748b] mt-0.5">
                        {c.specialty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${getBadgeStyle(c.status)}`}>
                      {c.status}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#64748b]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#64748b]" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-3 sm:px-4 pb-5 pt-4 bg-white/80 rounded-[10px] mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                        Motivo de la consulta
                      </span>
                      <p className="text-[14px] text-[#0b1c34]">{c.reason}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {c.hasInforme && (
                        <button
                          type="button"
                          onClick={() => {
                            setToast('Abriendo informe médico...');
                            setTimeout(() => setToast(null), 2500);
                          }}
                          className="h-[44px] px-4 rounded-[10px] bg-white hover:bg-[#0b1c34] hover:text-white text-[#0b1c34] text-[13px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-[#d50475]" />
                          <span>VER INFORME MÉDICO</span>
                        </button>
                      )}

                      {(c.status === 'En proceso' || c.status.startsWith('Pendiente')) && (
                        <button
                          type="button"
                          onClick={() => handleCancel(c.id)}
                          className="h-[44px] px-4 rounded-[10px] bg-white hover:text-[#e11d48] text-[#475569] text-[13px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          CANCELAR CONSULTA
                        </button>
                      )}
                    </div>
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
