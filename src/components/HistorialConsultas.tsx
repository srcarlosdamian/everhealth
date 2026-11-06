import React, { useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
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
  type: string;
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

// Datos exactos a la captura oficial media_1793983781902_1c877755.png
const INITIAL_CONSULTAS: ConsultaItem[] = [
  {
    id: '1',
    time: '7:50',
    dateStr: 'SAB 23',
    type: 'Videollamada',
    language: 'Español · Ever Health Test',
    patientName: 'Carlos Ruíz Reina',
    patientMeta: '24 años · +34 1597490 · carlos@mail.com',
    doctorName: 'Dr. Alejandro Gómez',
    doctorSpecialty: 'Medicina general · Ever Health Doctor',
    statusText: 'Pendiente',
    statusVariant: 'disponible',
    reason: 'Videollamada para discutir detalles de mi última consulta',
    canAccess: true,
  },
  {
    id: '2',
    time: '9:00',
    dateStr: 'VIE 22',
    type: 'Videollamada',
    language: 'Francés · Health Care Clinic',
    patientName: 'Sophie Dupont',
    patientMeta: '27 años · +34 1234567',
    doctorName: 'Dr. Jean-Claude',
    doctorSpecialty: 'Dermatología · Health Care Clinic',
    statusText: 'Pendiente informe',
    statusVariant: 'limitada',
    reason: 'Revisión y seguimiento dermatológico en curso.',
    canAccess: false,
  },
  {
    id: '3',
    time: '10:15',
    dateStr: 'JUE 21',
    type: 'Consulta telefónica',
    language: 'Alemán · Global Health',
    patientName: 'Hans Müller',
    patientMeta: '45 años · +34 7654321',
    doctorName: 'Dr. Klaus Schmidt',
    doctorSpecialty: 'Cardiología · Global Health',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Consulta médica de seguimiento cardiológico basal.',
    canAccess: false,
  },
  {
    id: '4',
    time: '11:00',
    dateStr: 'MIE 20',
    type: 'Videollamada',
    language: 'Italiano · Family Health',
    patientName: 'Giovanni Rossi',
    patientMeta: '38 años · +34 3216548',
    doctorName: 'Dr. Lucia Bianchi',
    doctorSpecialty: 'Ginecología · Family Health',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Chequeo rutinario de salud general.',
    canAccess: false,
  },
  {
    id: '5',
    time: '15:00',
    dateStr: 'MAR',
    type: 'Consulta presencial',
    language: 'Portugués · Wellness Center',
    patientName: 'Ana Costa',
    patientMeta: '22 años · +34 4567890',
    doctorName: 'Dr. Pedro Silva',
    doctorSpecialty: 'Nutrición · Wellness Center',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Plan nutricional y revisión de objetivos clínicos.',
    canAccess: false,
  },
  {
    id: '6',
    time: '16:30',
    dateStr: 'LUN 18',
    type: 'Videollamada',
    language: 'Español · Healthcare Solutions',
    patientName: 'Luis Pérez',
    patientMeta: '50 años · +34 9876543',
    doctorName: 'Dr. María López',
    doctorSpecialty: 'Oftalmología · Healthcare Solutions',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Valoración oftalmológica preventiva.',
    canAccess: false,
  },
  {
    id: '7',
    time: '10:00',
    dateStr: 'MAR 19',
    type: 'Reunión presencial',
    language: 'Inglés · Tech Innovations',
    patientName: 'Ana García',
    patientMeta: '35 años · +34 9123456',
    doctorName: 'Dr. John Smith',
    doctorSpecialty: 'Cardiología · Tech Innovations',
    statusText: 'Terminado',
    statusVariant: 'programada',
    reason: 'Reunión de valoración clínica empresarial.',
    canAccess: false,
  },
];

export const HistorialConsultas: React.FC<HistorialConsultasProps> = ({
  onOpenVideoModal,
  onOpenChatModal,
  onOpenDocumentsModal,
  defaultTab = 'consultas',
}) => {
  const [activeTab, setActiveTab] = useState<'consultas' | 'historia-clinica'>(defaultTab);
  const [subTab, setSubTab] = useState<'activos' | 'historial'>('historial');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'recientes' | 'antiguos'>('recientes');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>('1'); // Por defecto la fila 1 expandida como en la captura
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredConsultas = INITIAL_CONSULTAS.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.doctorName.toLowerCase().includes(q) ||
      c.patientName.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q) ||
      c.doctorSpecialty.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 font-[family-name:Helvetica]">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
            Consultas
          </h1>
          <p className="text-[14px] leading-[22px] text-[#475569]">
            Historial clínico integral, informes diagnósticos y gestión de citas pasadas y programadas.
          </p>
        </div>

        {/* Botón: Crear nueva consulta */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="h-[40px] px-[14px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
            <span>Crea nueva consulta</span>
          </button>

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
                <span>Chat médico</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Top Navigation Tabs */}
      <div className="w-full flex items-center justify-between border-b border-[#e2e8f0]">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('consultas')}
            className={`pb-3 text-[15px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'consultas' ? 'text-black' : 'text-[#64748b] hover:text-black'
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
              activeTab === 'historia-clinica' ? 'text-black' : 'text-[#64748b] hover:text-black'
            }`}
          >
            Historia clínica
            {activeTab === 'historia-clinica' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#d50475] rounded-full" />
            )}
          </button>
        </div>

        {activeTab === 'consultas' && (
          <div className="hidden sm:inline-flex rounded-[8px] bg-[#f1f5f9] p-[3px] mb-2">
            <button
              type="button"
              onClick={() => setSubTab('activos')}
              className={`px-[14px] py-[4px] rounded-[6px] text-[12px] font-bold transition-all cursor-pointer ${
                subTab === 'activos' ? 'bg-white text-black shadow-xs' : 'text-[#64748b] hover:text-black'
              }`}
            >
              Activos
            </button>
            <button
              type="button"
              onClick={() => setSubTab('historial')}
              className={`px-[14px] py-[4px] rounded-[6px] text-[12px] font-bold transition-all cursor-pointer ${
                subTab === 'historial' ? 'bg-white text-black shadow-xs' : 'text-[#64748b] hover:text-black'
              }`}
            >
              Historial
            </button>
          </div>
        )}
      </div>

      {/* ================= PESTAÑA 1: HISTORIAL CONSULTAS ================= */}
      {activeTab === 'consultas' && (
        <div className="flex flex-col gap-5">
          {/* Filter Row: Buscador a la izquierda + Recientes y Filtros a la derecha exacto a media_1793983781902_1c877755.png */}
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por paciente, médico, etc."
                className="w-full h-[40px] pl-10 pr-4 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Dropdown Recientes con menú flotante homologado */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  className="h-[40px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[13px] font-medium text-black bg-white hover:bg-[#f8fafc] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>{sortOrder === 'recientes' ? 'Recientes' : 'Más antiguos'}</span>
                  <ChevronDown className="w-4 h-4 text-black" />
                </button>

                {sortMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[150px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 border-0 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSortOrder('recientes');
                        setSortMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] transition-colors cursor-pointer ${
                        sortOrder === 'recientes'
                          ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                          : 'hover:bg-[#f1f5f9] text-black'
                      }`}
                    >
                      Recientes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortOrder('antiguos');
                        setSortMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] transition-colors cursor-pointer ${
                        sortOrder === 'antiguos'
                          ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                          : 'hover:bg-[#f1f5f9] text-black'
                      }`}
                    >
                      Más antiguos
                    </button>
                  </div>
                )}
              </div>

              {/* Botón Filtros */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="h-[40px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[13px] font-medium text-black bg-white hover:bg-[#f8fafc] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Filtros</span>
                  <ChevronDown className="w-4 h-4 text-black" />
                </button>

                {filterMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[180px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2 border-0 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => setFilterMenuOpen(false)}
                      className="w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f1f5f9] text-black cursor-pointer"
                    >
                      Todas las consultas
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMenuOpen(false)}
                      className="w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f1f5f9] text-black cursor-pointer"
                    >
                      Solo Videollamadas
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMenuOpen(false)}
                      className="w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] hover:bg-[#f1f5f9] text-black cursor-pointer"
                    >
                      Solo Presenciales
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabla de consultas: SIN BORDES REDONDEADOS (rounded-none), SIN FONDO GRIS, CON LÍNEAS DIVISORIAS VERTICALES */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-none divide-y divide-[#e2e8f0] overflow-hidden shadow-none">
            {filteredConsultas.length === 0 ? (
              <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2 bg-white">
                <FileText className="w-10 h-10 text-[#cbd5e1]" />
                <p className="text-[15px] font-bold text-black">No se encontraron consultas</p>
                <p className="text-[13px] text-[#64748b]">Intenta ajustar tus criterios de búsqueda o filtros.</p>
              </div>
            ) : (
              filteredConsultas.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div key={item.id} className="flex flex-col bg-white">
                    {/* Fila principal: dividida con líneas verticales border-r border-[#e2e8f0] exactas a la imagen */}
                    <div
                      onClick={() => toggleExpand(item.id)}
                      className="grid grid-cols-12 items-stretch cursor-pointer hover:bg-[#fafafa] bg-white transition-colors"
                    >
                      {/* Columna 1: Hora y Fecha (border-r) */}
                      <div className="col-span-2 sm:col-span-1 p-3.5 border-r border-[#e2e8f0] flex flex-col justify-center items-center text-center bg-white">
                        <span className="text-[15px] font-bold text-black leading-tight">
                          {item.time}
                        </span>
                        <span className="text-[11px] font-medium text-[#64748b] uppercase tracking-wider mt-0.5">
                          {item.dateStr}
                        </span>
                      </div>

                      {/* Columna 2: Tipo de consulta e idioma (SIN ICONOS como en la imagen, con border-r) */}
                      <div className="col-span-4 sm:col-span-3 p-3.5 border-r border-[#e2e8f0] flex flex-col justify-center bg-white">
                        <span className="text-[14px] font-bold text-black">
                          {item.type}
                        </span>
                        <span className="text-[12px] text-[#64748b] mt-0.5">
                          {item.language}
                        </span>
                      </div>

                      {/* Columna 3: Paciente, edad, teléfono, correo (con border-r) */}
                      <div className="col-span-3 sm:col-span-3 p-3.5 border-r border-[#e2e8f0] flex flex-col justify-center bg-white">
                        <span className="text-[14px] font-bold text-black">
                          {item.patientName}
                        </span>
                        <span className="text-[12px] text-[#64748b] mt-0.5 truncate">
                          {item.patientMeta}
                        </span>
                      </div>

                      {/* Columna 4: Profesional asignado y especialidad (con border-r) */}
                      <div className="col-span-3 sm:col-span-3 p-3.5 border-r border-[#e2e8f0] flex flex-col justify-center bg-white">
                        <span className="text-[14px] font-bold text-black">
                          {item.doctorName}
                        </span>
                        <span className="text-[12px] text-[#64748b] mt-0.5 truncate">
                          {item.doctorSpecialty}
                        </span>
                      </div>

                      {/* Columna 5: Estado Badge + Chevron toggle */}
                      <div className="col-span-12 sm:col-span-2 p-3.5 flex items-center justify-end gap-3 bg-white">
                        <Badge variant={item.statusVariant}>
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

                    {/* Fila expandible con detalles e información clínica: SIN FONDO GRIS, BOTONES EXACTOS */}
                    {isExpanded && (
                      <div className="p-4 sm:p-5 bg-white border-t border-[#e2e8f0] flex flex-col gap-4">
                        <p className="text-[14px] leading-[22px] text-black font-normal">
                          {item.reason}
                        </p>

                        {/* Botonera de acciones matching media_1793983781902_1c877755.png */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          {/* Botones izquierda: Acceder (magenta relleno), Historial, Notas internas, Tip de contrato (píldoras con borde rosa) */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenVideoModal?.();
                              }}
                              className="px-5 py-1.5 rounded-full bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer"
                            >
                              Acceder
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Ver historial de consultas');
                              }}
                              className="px-4 py-1.5 rounded-full border border-[#ff34b2] text-[#ff34b2] hover:bg-[#fdf2f8] bg-white text-[13px] font-medium transition-colors cursor-pointer"
                            >
                              Historial
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Notas internas');
                              }}
                              className="px-4 py-1.5 rounded-full border border-[#ff34b2] text-[#ff34b2] hover:bg-[#fdf2f8] bg-white text-[13px] font-medium transition-colors cursor-pointer"
                            >
                              Notas internas
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Tip de contrato');
                              }}
                              className="px-4 py-1.5 rounded-full border border-[#ff34b2] text-[#ff34b2] hover:bg-[#fdf2f8] bg-white text-[13px] font-medium transition-colors cursor-pointer"
                            >
                              Tip de contrato
                            </button>
                          </div>

                          {/* Botones derecha: Crear nuevo, Reasignar y Cancelar con borde y texto rosa */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsCreateOpen(true);
                              }}
                              className="px-3.5 py-1.5 rounded-[6px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-medium transition-colors cursor-pointer"
                            >
                              Crear nuevo
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Reasignar consulta');
                              }}
                              className="px-3.5 py-1.5 rounded-[6px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-medium transition-colors cursor-pointer"
                            >
                              Reasignar
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Consulta cancelada');
                              }}
                              className="px-3.5 py-1.5 rounded-[6px] border border-[#d50475] hover:bg-[#fdf2f8] bg-white text-[#d50475] text-[13px] font-medium transition-colors cursor-pointer"
                            >
                              Cancelar
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

          {/* Footer de Paginación exacto a media_1793983781902_1c877755.png: Mostrando de 1 a 10 de 200 entradas */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-[13px] text-[#64748b]">
              Mostrando de 1 a {filteredConsultas.length} de 200 entradas
            </span>

            {/* Paginador numérico cuadrado con bordes */}
            <div className="inline-flex items-center border border-[#cbd5e1] rounded-[4px] overflow-hidden bg-white">
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#d50475] font-bold text-[13px] hover:bg-[#fdf2f8] cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-black text-[13px] hover:bg-[#f8fafc] cursor-pointer"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-black text-[13px] hover:bg-[#f8fafc] cursor-pointer"
              >
                4
              </button>
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-black text-[13px] hover:bg-[#f8fafc] cursor-pointer"
              >
                5
              </button>
              <button
                type="button"
                className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 2: HISTORIA CLÍNICA ================= */}
      {activeTab === 'historia-clinica' && (
        <HistoriaClinica />
      )}

    </div>
  );
};
