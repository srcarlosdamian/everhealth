import React, { useState, useMemo } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { Badge, BadgeVariant } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';

interface SolicitarChatProps {
  onOpenCalendarModal: (doctorName?: string) => void;
  onOpenNowModal: (doctorName?: string) => void;
}

interface Doctor {
  id: string;
  name: string;
  initials?: string;
  badge: string;
  badgeType: 'disponible' | 'no-disponible' | 'limitada';
  specialties: string[];
  isFavorite?: boolean;
}

const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'María Fernández',
    badge: 'Disponible ahora',
    badgeType: 'disponible',
    specialties: ['Medicina General', 'Nutrición', 'Psicología'],
  },
  {
    id: '2',
    name: 'Ana Gómez',
    initials: 'AG',
    badge: 'No disponible',
    badgeType: 'no-disponible',
    specialties: ['Medicina General', 'Nutrición', 'Psicología'],
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Luis Pérez',
    badge: 'Disponible ahora',
    badgeType: 'disponible',
    specialties: ['Pediatría', 'Dermatología', 'Psiquiatría'],
  },
  {
    id: '4',
    name: 'Fernanda Romero',
    initials: 'AG',
    badge: 'No disponible',
    badgeType: 'no-disponible',
    specialties: ['Medicina General', 'Nutrición', 'Psicología'],
  },
  {
    id: '5',
    name: 'Benito Martínez',
    initials: 'BM',
    badge: 'Tiempo limitado',
    badgeType: 'limitada',
    specialties: ['Pediatría', 'Dermatología', 'Psiquiatría'],
  },
  {
    id: '6',
    name: 'Sofía Martínez',
    badge: 'No disponible',
    badgeType: 'no-disponible',
    specialties: ['Ginecología', 'Endocrinología', 'Cardiología'],
  },
  {
    id: '7',
    name: 'Javier López',
    badge: 'Disponible ahora',
    badgeType: 'disponible',
    specialties: ['Oftalmología', 'Otorrinolaringología', 'Rehabilitación'],
  },
  {
    id: '8',
    name: 'Clara Mendoza',
    initials: 'CM',
    badge: 'Disponible',
    badgeType: 'disponible',
    specialties: ['Ginecología', 'Fisioterapia', 'Terapeutas ocupacionales'],
  },
];

const SCHEDULE_DAYS = [
  { day: 'HOY', date: '22 Oct', slots: ['09:30', '11:00', '12:30'] },
  { day: 'MARTES', date: '23 Oct', slots: ['09:30', '11:00', '12:30'] },
  { day: 'JUEVES', date: '25 Oct', slots: ['09:30', '11:00', '12:30'] },
  { day: 'VIERNES', date: '25 Oct', slots: ['09:30', '11:00', '12:30'] },
  { day: 'DOMINGO', date: '27 Oct', slots: ['09:30', '11:00', '12:30'] },
];

const DISPONIBILIDAD_OPTIONS = [
  { value: 'todas', label: 'Disponibilidad' },
  { value: 'disponible', label: 'Disponible ahora' },
  { value: 'limitada', label: 'Tiempo limitado' },
  { value: 'no-disponible', label: 'No disponible' },
];

const ESPECIALIDAD_OPTIONS = [
  { value: 'todas', label: 'Especialidad' },
  { value: 'Medicina General', label: 'Medicina General' },
  { value: 'Nutrición', label: 'Nutrición' },
  { value: 'Psicología', label: 'Psicología' },
  { value: 'Pediatría', label: 'Pediatría' },
  { value: 'Dermatología', label: 'Dermatología' },
  { value: 'Ginecología', label: 'Ginecología' },
  { value: 'Oftalmología', label: 'Oftalmología' },
  { value: 'Cardiología', label: 'Cardiología' },
];

export const SolicitarChat: React.FC<SolicitarChatProps> = ({
  onOpenCalendarModal,
  onOpenNowModal,
}) => {
  // All schedules collapsed by default as requested
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<'todos' | 'favoritos'>('todos');
  const [filterDisponibilidad, setFilterDisponibilidad] = useState('todas');
  const [filterEspecialidad, setFilterEspecialidad] = useState('todas');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      if (filterTab === 'favoritos' && !doc.isFavorite) return false;
      if (filterDisponibilidad !== 'todas' && doc.badgeType !== filterDisponibilidad) return false;
      if (filterEspecialidad !== 'todas' && !doc.specialties.includes(filterEspecialidad)) return false;
      return true;
    });
  }, [filterTab, filterDisponibilidad, filterEspecialidad]);

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[24px]">
      {/* Page Header matching EVR - 119 */}
      <div className="flex flex-col gap-[8px]">
        <h1 className="text-[32px] sm:text-[36px] font-bold text-black tracking-tight">
          Solicitar chat
        </h1>
        <p className="text-[14px] leading-[22px] text-[var(--color-page-subtitle)] max-w-[700px] font-normal">
          El chat es perfecto para preguntas generales. Para obtener recetas o informes médicos, agenda una videoconsulta con nuestro servicio médico.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#f1f5f9]">
        <div className="inline-flex rounded-[8px] bg-[#f1f5f9] p-[3px]">
          <button
            type="button"
            onClick={() => setFilterTab('todos')}
            className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-bold transition-all cursor-pointer ${
              filterTab === 'todos' ? 'bg-white text-black shadow-xs' : 'text-[#64748b] hover:text-black'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('favoritos')}
            className={`px-[16px] py-[6px] rounded-[6px] text-[13px] font-bold transition-all cursor-pointer ${
              filterTab === 'favoritos' ? 'bg-white text-black shadow-xs' : 'text-[#64748b] hover:text-black'
            }`}
          >
            Favoritos
          </button>
        </div>

        {/* Filtros desplegables homologados con el Sistema de Diseño (<Dropdown size="sm" />) */}
        <div className="flex flex-wrap items-center gap-[12px]">
          <div className="w-[180px]">
            <Dropdown
              size="sm"
              value={filterDisponibilidad}
              onChange={setFilterDisponibilidad}
              options={DISPONIBILIDAD_OPTIONS}
              placeholder="Disponibilidad"
            />
          </div>
          <div className="w-[180px]">
            <Dropdown
              size="sm"
              value={filterEspecialidad}
              onChange={setFilterEspecialidad}
              options={ESPECIALIDAD_OPTIONS}
              placeholder="Especialidad"
            />
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid (2 columns matching EVR - 119) */}
      {filteredDoctors.length === 0 ? (
        <div className="py-16 text-center text-[#64748b] flex flex-col items-center justify-center gap-2 bg-white rounded-[10px] border border-[#e2e8f0]">
          <p className="text-[15px] font-bold text-black">No se encontraron especialistas</p>
          <p className="text-[13px] text-[#64748b]">
            Prueba a cambiar los filtros de disponibilidad o especialidad.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterTab('todos');
              setFilterDisponibilidad('todas');
              setFilterEspecialidad('todas');
            }}
            className="mt-2 text-[13px] font-bold text-[#d50475] hover:underline cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          {filteredDoctors.map((doc) => {
            const isExpanded = expandedId === doc.id;
            return (
              <div
                key={doc.id}
                className="bg-white rounded-[10px] border border-[#e2e8f0] p-5 flex flex-col gap-4 shadow-xs"
              >
                {/* Doctor header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center font-bold text-[#0f172a] shrink-0">
                      {doc.initials || doc.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-bold text-black">{doc.name}</span>
                        <Badge
                          variant={
                            doc.badgeType === 'disponible'
                              ? 'success'
                              : doc.badgeType === 'limitada'
                              ? 'warning'
                              : 'neutral'
                          }
                        >
                          {doc.badge}
                        </Badge>
                      </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[12px] text-[#475569] mt-0.5">
                      {doc.specialties.map((s, i) => (
                        <span key={i}>{s}{i < doc.specialties.length - 1 ? ' ·' : ''}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="button" className="text-[#64748b] hover:text-[#d50475]">
                  <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-[#d50475] text-[#d50475]' : ''}`} />
                </button>
              </div>

              {/* Collapsible toggle (collapsed by default) */}
              <div className="border-t border-[#f1f5f9] pt-3">
                <button
                  type="button"
                  onClick={() => toggleExpand(doc.id)}
                  className="w-full flex items-center justify-between text-[13px] font-bold text-black hover:text-[#d50475] transition-colors cursor-pointer select-none"
                >
                  <span>Horarios disponibles</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#64748b]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748b]" />
                  )}
                </button>

                {/* Expanded schedules */}
                {isExpanded && (
                  <div className="mt-3 grid grid-cols-5 gap-2 text-center pt-2 border-t border-[#f1f5f9] animate-in fade-in duration-150">
                    {SCHEDULE_DAYS.map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-[#64748b]">{col.day}</span>
                        <span className="text-[11px] font-bold text-black">{col.date}</span>
                        {col.slots.map((slot, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => setSelectedSlot(`${doc.id}-${col.date}-${slot}`)}
                            className={`h-[28px] rounded-[4px] border text-[11px] font-medium transition-colors cursor-pointer ${
                              selectedSlot === `${doc.id}-${col.date}-${slot}`
                                ? 'border-[#d50475] text-white bg-[#d50475] font-bold shadow-xs'
                                : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-black'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
                {doc.badgeType === 'disponible' ? (
                  <button
                    type="button"
                    onClick={() => onOpenNowModal(doc.name)}
                    className="text-[12px] font-bold text-[#d50475] hover:underline tracking-wide uppercase cursor-pointer"
                  >
                    Hablemos ahora
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenCalendarModal(doc.name)}
                    className="text-[12px] font-bold text-[#d50475] hover:underline tracking-wide uppercase cursor-pointer"
                  >
                    Agendar cita
                  </button>
                )}

                {/* VER CALENDARIO: opens modal EVR - 9 as requested */}
                <Button
                  variant="outline"
                  onClick={() => onOpenCalendarModal(doc.name)}
                  className="h-[34px] px-3.5 text-[12px] font-bold tracking-wide"
                >
                  Ver calendario
                </Button>
              </div>

            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
