import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Video,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
  Calendar,
  User,
} from 'lucide-react';

interface V2HistorialProps {
  onOpenChatModal: () => void;
  onOpenVideoModal: () => void;
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

const INITIAL_DATA: ConsultaItem[] = [
  {
    id: 'c1',
    type: 'video',
    specialty: 'Psicología',
    status: 'En proceso',
    date: '27/10/2026',
    time: '10:10',
    reason: 'Primera consulta - Sesión de seguimiento y valoración psicológica.',
    doctor: 'Dr. Bruno Peñas',
  },
  {
    id: 'c2',
    type: 'chat',
    specialty: 'Medicina General',
    status: 'Pendiente de recomendación',
    date: '27/10/2026',
    time: '10:40',
    reason: 'Consulta sobre dudas de medicación y evolución de síntomas leves.',
    doctor: 'Dr. Bruno Peñas',
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
    doctor: 'Dr. José Luis Rojano',
  },
];

export const V2Historial: React.FC<V2HistorialProps> = ({
  onOpenChatModal,
  onOpenVideoModal,
}) => {
  const [consultas, setConsultas] = useState<ConsultaItem[]>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'video' | 'chat'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('c1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  const filtered = useMemo(() => {
    return consultas.filter((c) => {
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          c.doctor.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q) ||
          c.reason.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [consultas, search, typeFilter]);

  const handleCancel = (id: string) => {
    setConsultas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Cancelada' } : c))
    );
    setToast('Consulta cancelada correctamente.');
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusStyle = (status: StatusType) => {
    if (status === 'En proceso') return 'bg-[#ecfdf5] text-[#047857]';
    if (status === 'Cancelada') return 'bg-[#fef2f2] text-[#b91c1c]';
    if (status === 'Terminada') return 'bg-[#f1f5f9] text-[#475569]';
    return 'bg-[#fffbeb] text-[#b45309]';
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-7">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c34] text-white px-5 py-3.5 rounded-[14px] shadow-xl text-[14px] font-semibold">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#d50475]">
            Tus citas y atenciones
          </span>
          <h1 className="text-[32px] sm:text-[38px] font-extrabold text-[#0b1c34] tracking-tight mt-1">
            Historial de consultas
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#475569] mt-1">
            Revisa el estado de tus videoconsultas, chats médicos e informes clínicos.
          </p>
        </div>

        {/* Solicitar consulta dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="h-[48px] px-5 rounded-[12px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Solicitar consulta</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[16px] shadow-[0_20px_50px_rgba(11,28,52,0.16)] border border-[#e2e8f0] p-2 z-30">
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenVideoModal();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-[12px] hover:bg-[#f8f8f7] text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-[10px] bg-[#fdf2f8] text-[#d50475] flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#0b1c34]">Videoconsulta</div>
                  <div className="text-[12px] text-[#64748b]">Agendar fecha y hora</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenChatModal();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-[12px] hover:bg-[#f8f8f7] text-left cursor-pointer mt-1"
              >
                <div className="w-9 h-9 rounded-[10px] bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#0b1c34]">Chat médico</div>
                  <div className="text-[12px] text-[#64748b]">Hablar ahora o agendar</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#e2e8f0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748b] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por especialista, especialidad o motivo..."
            className="w-full h-[46px] pl-11 pr-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#0b1c34] text-[14px] text-[#0b1c34] placeholder:text-[#94a3b8] outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 bg-[#f8f8f7] p-1.5 rounded-[12px] border border-[#e2e8f0]">
          {(
            [
              { id: 'all', label: 'Todas' },
              { id: 'video', label: 'Videoconsulta' },
              { id: 'chat', label: 'Chat médico' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTypeFilter(t.id)}
              className={`px-4 py-2 rounded-[9px] text-[13px] font-bold transition-all cursor-pointer ${
                typeFilter === t.id
                  ? 'bg-[#0b1c34] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0b1c34]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Consultations List */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[20px] p-12 border border-[#e2e8f0] text-center flex flex-col items-center gap-2">
            <p className="text-[16px] font-bold text-[#0b1c34]">No hay consultas con esos filtros</p>
            <p className="text-[14px] text-[#64748b]">Prueba limpiando la búsqueda o cambiando de modalidad.</p>
          </div>
        ) : (
          filtered.map((c) => {
            const isExpanded = expandedId === c.id;
            return (
              <div
                key={c.id}
                className="bg-white rounded-[20px] border border-[#e2e8f0] overflow-hidden transition-shadow hover:shadow-[0_10px_30px_rgba(11,28,52,0.06)]"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  className="w-full p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${
                        c.type === 'video'
                          ? 'bg-[#fdf2f8] text-[#d50475]'
                          : 'bg-[#eff6ff] text-[#2563eb]'
                      }`}
                    >
                      {c.type === 'video' ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <MessageSquare className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[16px] font-extrabold text-[#0b1c34]">
                          {c.type === 'video' ? 'Videoconsulta' : 'Chat médico'} · {c.specialty}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusStyle(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#475569]">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#64748b]" />
                          {c.doctor}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                          {c.date} · {c.time} h
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center text-[#64748b]">
                    <span className="text-[12px] font-semibold">
                      {isExpanded ? 'Ocultar' : 'Ver detalle'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-[#f1f5f9] bg-[#f8f8f7]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 max-w-[640px]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                        Motivo de la consulta
                      </span>
                      <p className="text-[14px] text-[#0b1c34] leading-relaxed">{c.reason}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {c.hasInforme && (
                        <button
                          type="button"
                          onClick={() => {
                            setToast('Abriendo informe médico...');
                            setTimeout(() => setToast(null), 2500);
                          }}
                          className="h-[42px] px-4 rounded-[10px] bg-white border border-[#cbd5e1] hover:border-[#0b1c34] text-[13px] font-bold text-[#0b1c34] inline-flex items-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-[#d50475]" />
                          <span>Ver informe</span>
                        </button>
                      )}

                      {(c.status === 'En proceso' || c.status.startsWith('Pendiente')) && (
                        <button
                          type="button"
                          onClick={() => handleCancel(c.id)}
                          className="h-[42px] px-4 rounded-[10px] bg-white border border-[#cbd5e1] hover:border-[#e11d48] hover:text-[#e11d48] text-[13px] font-bold text-[#475569] transition-colors cursor-pointer"
                        >
                          Cancelar consulta
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
