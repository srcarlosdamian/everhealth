import React, { useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Video,
  Phone,
  FileText,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
} from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';
import { HistoriaClinica } from './HistoriaClinica';

interface HistorialConsultasProps {
  onOpenVideoModal?: () => void;
  onOpenChatModal?: () => void;
  onOpenDocumentsModal?: () => void;
  defaultTab?: 'consultas' | 'historia-clinica';
}

interface ConsultaItem {
  id: string;
  time: string;
  dateStr: string;
  type: 'Videoconsulta' | 'Consulta telefónica' | 'Consulta presencial' | 'Chat médico';
  language: string;
  patientName: string;
  patientMeta: string;
  doctorName: string;
  doctorSpecialty: string;
  statusText: string;
  statusVariant: 'disponible' | 'confirmada' | 'en-espera' | 'programada' | 'no-disponible' | 'limitada';
  reason: string;
  canAccess?: boolean;
}

const INITIAL_CONSULTAS: ConsultaItem[] = [
  {
    id: '1',
    time: '10:40',
    dateStr: '27/10/2026',
    type: 'Videoconsulta',
    language: 'Español · Ever Health',
    patientName: 'Carlos Damian',
    patientMeta: 'Paciente principal · Titular',
    doctorName: 'Bruno Peñas',
    doctorSpecialty: 'Medicina General · Urgencias',
    statusText: 'Pendiente de recomendación',
    statusVariant: 'limitada',
    reason: 'Videollamada para discutir detalles y dudas de mi última consulta médica general.',
    canAccess: true,
  },
  {
    id: '2',
    time: '10:10',
    dateStr: '27/10/2026',
    type: 'Videoconsulta',
    language: 'Español · Ever Health',
    patientName: 'Carlos Damian',
    patientMeta: 'Paciente principal · Titular',
    doctorName: 'Bruno Peñas',
    doctorSpecialty: 'Psicología · Terapia conductual',
    statusText: 'En proceso',
    statusVariant: 'disponible',
    reason: 'Primera consulta - Test de bienestar y seguimiento emocional preventivo.',
    canAccess: true,
  },
  {
    id: '3',
    time: '19:37',
    dateStr: '30/09/2026',
    type: 'Videoconsulta',
    language: 'Español · Ever Health',
    patientName: 'Carlos Damian',
    patientMeta: 'Paciente principal · Titular',
    doctorName: 'Jose Luis Rojano Torrecilla',
    doctorSpecialty: 'Medicina General · Consulta rápida',
    statusText: 'Cancelada',
    statusVariant: 'no-disponible',
    reason: 'Revisión periódica y seguimiento de cuadro gripal estacional.',
    canAccess: false,
  },
  {
    id: '4',
    time: '16:00',
    dateStr: '15/09/2026',
    type: 'Consulta telefónica',
    language: 'Español · Ever Health',
    patientName: 'Carlos Damian',
    patientMeta: 'Paciente principal · Titular',
    doctorName: 'Dra. Carmen Morales',
    doctorSpecialty: 'Dermatología · Lesiones cutáneas',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Seguimiento de reacción alérgica en el antebrazo e indicación de pomada tópica.',
    canAccess: false,
  },
  {
    id: '5',
    time: '11:30',
    dateStr: '02/09/2026',
    type: 'Videoconsulta',
    language: 'Español · Ever Health',
    patientName: 'Carlos Damian',
    patientMeta: 'Paciente principal · Titular',
    doctorName: 'Dra. Carmen Morales',
    doctorSpecialty: 'Nutrición clínica · Plan de alimentación',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Ajuste de macronutrientes y valoración de parámetros biométricos basales.',
    canAccess: false,
  },
];

export const HistorialConsultas: React.FC<HistorialConsultasProps> = ({
  onOpenVideoModal,
  onOpenChatModal,
  onOpenDocumentsModal,
  defaultTab = 'consultas',
}) => {
  // Navigation tabs: 'consultas' | 'historia-clinica'
  const [activeTab, setActiveTab] = useState<'consultas' | 'historia-clinica'>(defaultTab);

  // Secondary sub-tabs: 'activos' | 'historial'
  const [subTab, setSubTab] = useState<'activos' | 'historial'>('historial');
  const [filterMode, setFilterMode] = useState<'todas' | 'informes'>('todas');

  // Search input
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown "Crea nueva consulta"
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Sorting
  const [sortOrder, setSortOrder] = useState<'recientes' | 'antiguos'>('recientes');

  // Expand / collapse state for rows
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredConsultas = INITIAL_CONSULTAS.filter((c) => {
    if (filterMode === 'informes' && c.statusVariant !== 'limitada' && c.statusText !== 'Terminado') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.doctorName.toLowerCase().includes(q) ||
        c.doctorSpecialty.toLowerCase().includes(q) ||
        c.reason.toLowerCase().includes(q) ||
        c.dateStr.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica]">
      
      {/* Breadcrumb / Section Header */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-bold text-[#64748b] uppercase tracking-wider">
          Historial
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
              {activeTab === 'consultas' ? 'Consultas' : 'Historia clínica'}
            </h1>
            <p className="text-[14px] leading-[22px] text-[#475569]">
              {activeTab === 'consultas'
                ? 'Gestiona y revisa todas tus consultas médicas y citas programadas'
                : 'Aquí puedes consultar o editar tus antecedentes y documentación médica'}
            </p>
          </div>

          {/* Action CTA: Crea nueva consulta Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsCreateOpen(!isCreateOpen)}
              className="h-[40px] px-[14px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
              <span>Crea nueva consulta</span>
            </button>

            {/* Dropdown menu homologado */}
            {isCreateOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[220px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col gap-[2px]">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    onOpenVideoModal?.();
                  }}
                  className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold uppercase text-left transition-colors cursor-pointer"
                >
                  <Video className="w-[18px] h-[18px] text-[#d50475] shrink-0" />
                  <span>Videoconsulta</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    onOpenChatModal?.();
                  }}
                  className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fdf2f8] text-black hover:text-[#d50475] flex items-center gap-[10px] text-[13px] leading-[20px] font-bold uppercase text-left transition-colors cursor-pointer"
                >
                  <FileText className="w-[18px] h-[18px] text-[#d50475] shrink-0" />
                  <span>Chat médico</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Navigation Tabs: Historial consultas vs Historia clínica */}
      <div className="w-full flex items-center justify-between border-b border-[#e2e8f0]">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('consultas')}
            className={`pb-3 text-[15px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'consultas'
                ? 'text-black'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Historial consultas
            {activeTab === 'consultas' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#d50475] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('historia-clinica')}
            className={`pb-3 text-[15px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'historia-clinica'
                ? 'text-black'
                : 'text-[#64748b] hover:text-black'
            }`}
          >
            Historia clínica
            {activeTab === 'historia-clinica' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#d50475] rounded-full" />
            )}
          </button>
        </div>

        {/* Secondary Switch (Activos / Historial) solo si estamos en pestaña de consultas */}
        {activeTab === 'consultas' && (
          <div className="hidden sm:inline-flex rounded-[8px] bg-[#f1f5f9] p-[3px] mb-2">
            <button
              type="button"
              onClick={() => setSubTab('activos')}
              className={`px-[14px] py-[4px] rounded-[6px] text-[12px] font-bold transition-all cursor-pointer ${
                subTab === 'activos'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-[#64748b] hover:text-black'
              }`}
            >
              Activos
            </button>
            <button
              type="button"
              onClick={() => setSubTab('historial')}
              className={`px-[14px] py-[4px] rounded-[6px] text-[12px] font-bold transition-all cursor-pointer ${
                subTab === 'historial'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-[#64748b] hover:text-black'
              }`}
            >
              Historial
            </button>
          </div>
        )}
      </div>

      {/* ================= PESTAÑA 1: HISTORIAL CONSULTAS ================= */}
      {activeTab === 'consultas' && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* Filter Row: Search Bar + Ver solo informes + Sorting Dropdown */}
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por médico, especialidad, motivo o fecha..."
                className="w-full h-[40px] pl-10 pr-4 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 px-3 h-[40px] rounded-[8px] border border-[#cbd5e1] bg-white cursor-pointer select-none hover:bg-[#f8fafc] transition-colors">
                <input
                  type="checkbox"
                  checked={filterMode === 'informes'}
                  onChange={(e) => setFilterMode(e.target.checked ? 'informes' : 'todas')}
                  className="w-4 h-4 rounded-[4px] accent-[#d50475] cursor-pointer"
                />
                <span className="text-[13px] font-bold text-black">Ver solo informes</span>
              </label>

              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="h-[40px] px-3.5 pr-8 rounded-[8px] border border-[#cbd5e1] text-[13px] font-bold text-black bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#d50475]"
                >
                  <option value="recientes">Recientes</option>
                  <option value="antiguos">Más antiguos</option>
                </select>
                <ChevronDown className="w-4 h-4 text-black absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Consultations Table / List Container */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] divide-y divide-[#e2e8f0] overflow-hidden shadow-xs">
            {filteredConsultas.length === 0 ? (
              <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2">
                <FileText className="w-10 h-10 text-[#cbd5e1]" />
                <p className="text-[15px] font-bold text-black">No se encontraron consultas</p>
                <p className="text-[13px] text-[#64748b]">Intenta ajustar tus criterios de búsqueda o filtros.</p>
              </div>
            ) : (
              filteredConsultas.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div key={item.id} className="flex flex-col transition-colors">
                    {/* Header row de la consulta */}
                    <div
                      onClick={() => toggleExpand(item.id)}
                      className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer hover:bg-[#fafafa]"
                    >
                      {/* Columna 1: Hora y Fecha */}
                      <div className="flex flex-col sm:w-[130px] shrink-0">
                        <span className="text-[17px] leading-[22px] font-bold text-black">
                          {item.time}
                        </span>
                        <span className="text-[12px] font-medium text-[#64748b] uppercase tracking-wider">
                          {item.dateStr}
                        </span>
                      </div>

                      {/* Columna 2: Tipo de consulta e idioma */}
                      <div className="flex flex-col sm:w-[200px] shrink-0">
                        <div className="flex items-center gap-2">
                          {item.type === 'Videoconsulta' ? (
                            <Video className="w-4 h-4 text-[#d50475] shrink-0" />
                          ) : (
                            <Phone className="w-4 h-4 text-[#2563eb] shrink-0" />
                          )}
                          <span className="text-[14px] font-bold text-black">{item.type}</span>
                        </div>
                        <span className="text-[12px] text-[#64748b] mt-0.5">{item.language}</span>
                      </div>

                      {/* Columna 3: Paciente */}
                      <div className="flex flex-col flex-1 min-w-[180px]">
                        <span className="text-[14px] font-bold text-black">{item.patientName}</span>
                        <span className="text-[12px] text-[#64748b] mt-0.5">{item.patientMeta}</span>
                      </div>

                      {/* Columna 4: Profesional asignado */}
                      <div className="flex flex-col flex-1 min-w-[200px]">
                        <span className="text-[14px] font-bold text-black">{item.doctorName}</span>
                        <span className="text-[12px] text-[#64748b] mt-0.5">{item.doctorSpecialty}</span>
                      </div>

                      {/* Columna 5: Estado Badge + Chevron toggle */}
                      <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                        <Badge variant={item.statusVariant} showDot={item.statusVariant === 'disponible' || item.statusVariant === 'limitada'}>
                          {item.statusText}
                        </Badge>

                        <button
                          type="button"
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
                          aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-black" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-black" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Fila expandible con detalles e información clínica */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 bg-[#f8fafc] border-t border-[#f1f5f9] flex flex-col gap-4 animate-fadeIn">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                            Motivo de la consulta
                          </span>
                          <p className="text-[14px] leading-[22px] text-black font-normal">
                            {item.reason}
                          </p>
                        </div>

                        {/* Botonera de acciones homologada */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#e2e8f0]">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.canAccess && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenVideoModal?.();
                                }}
                                className="px-[14px] py-[6px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase transition-colors cursor-pointer"
                              >
                                Acceder a la consulta
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenChatModal?.();
                              }}
                              className="px-[12px] py-[6px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-bold uppercase transition-colors cursor-pointer"
                            >
                              Ver conversación
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDocumentsModal?.();
                              }}
                              className="px-[12px] py-[6px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-bold uppercase transition-colors cursor-pointer"
                            >
                              Ver informe
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => e.stopPropagation()}
                              className="px-[12px] py-[6px] rounded-[8px] border border-[#cbd5e1] hover:border-[#ef4444] hover:text-[#ef4444] bg-white text-[#64748b] text-[13px] font-bold uppercase transition-colors cursor-pointer"
                            >
                              Cancelar cita
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer de Paginación */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-[13px] text-[#64748b]">
              Mostrando {filteredConsultas.length} de {INITIAL_CONSULTAS.length} consultas registradas
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black hover:bg-[#f8fafc] disabled:opacity-40 cursor-pointer"
                disabled
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black hover:bg-[#f8fafc] disabled:opacity-40 cursor-pointer"
                disabled
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="w-8 h-8 rounded-[6px] bg-[#d50475] text-white font-bold text-[13px] flex items-center justify-center cursor-pointer shadow-xs"
              >
                1
              </button>

              <button
                type="button"
                className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white text-black font-bold text-[13px] flex items-center justify-center hover:bg-[#f8fafc] cursor-pointer"
              >
                2
              </button>

              <button
                type="button"
                className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black hover:bg-[#f8fafc] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black hover:bg-[#f8fafc] cursor-pointer"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 2: HISTORIA CLÍNICA ================= */}
      {activeTab === 'historia-clinica' && (
        <HistoriaClinica
          onOpenDocumentsModal={onOpenDocumentsModal}
          onNavigateToSection={(sectionId) => {
            console.log('Navegar a sección clínica:', sectionId);
          }}
        />
      )}

    </div>
  );
};
