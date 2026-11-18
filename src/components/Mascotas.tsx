import React, { useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit2,
  Trash2,
  FileText,
  Calendar,
} from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { ColorPickerDropdown } from '../design-system/atoms/ColorPickerDropdown';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';
import { TablePagination } from '../design-system/molecules/TablePagination';
import { ModalHistoriaCompleta } from './ModalHistoriaCompleta';
import { ModalVideoConsulta } from './ModalVideoConsulta';

export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  fechaNacimiento: string;
  edad: string;
  sexo: 'Femenino' | 'Masculino';
  raza: string;
  condicionCorporal: string;
  colorPrimario: string;
  colorSecundario: string;
  familiarRelacionado: string;
  numeroChip: string;
}

const INITIAL_MASCOTAS: Mascota[] = [
  {
    id: '1',
    nombre: 'Luna',
    especie: 'Perro',
    fechaNacimiento: '15/03/2021',
    edad: '5 años',
    sexo: 'Femenino',
    raza: 'Golden Retriever',
    condicionCorporal: 'Peso Ideal',
    colorPrimario: '#d4a373',
    colorSecundario: '#ffffff',
    familiarRelacionado: 'Alejandro Navarro',
    numeroChip: '985141002345678',
  },
  {
    id: '2',
    nombre: 'Simba',
    especie: 'Gato',
    fechaNacimiento: '10/06/2022',
    edad: '4 años',
    sexo: 'Masculino',
    raza: 'Común europeo',
    condicionCorporal: 'Peso Ideal',
    colorPrimario: '#e76f51',
    colorSecundario: '#f4a261',
    familiarRelacionado: 'Elena Ruiz Morales',
    numeroChip: '985141009876543',
  },
  {
    id: '3',
    nombre: 'Copito',
    especie: 'Roedores/Conejos',
    fechaNacimiento: '01/02/2024',
    edad: '2 años',
    sexo: 'Masculino',
    raza: 'Conejo Belier',
    condicionCorporal: 'Delgado',
    colorPrimario: '#ffffff',
    colorSecundario: '#cccccc',
    familiarRelacionado: 'Mateo Damian Ruiz',
    numeroChip: '985141005544332',
  },
];

const ESPECIES_OPTIONS = [
  { value: 'Perro', label: 'Perro', emoji: '🐶' },
  { value: 'Gato', label: 'Gato', emoji: '🐱' },
  { value: 'Roedores/Conejos', label: 'Roedores/Conejos', emoji: '🐰' },
  { value: 'Aves', label: 'Aves', emoji: '🦜' },
  { value: 'Peces, anfibios y reptiles', label: 'Peces, anfibios y reptiles', emoji: '🐠' },
  { value: 'Equino', label: 'Equino', emoji: '🐴' },
  { value: 'Ovino', label: 'Ovino', emoji: '🐑' },
  { value: 'Porcino', label: 'Porcino', emoji: '🐷' },
  { value: 'Vacuno', label: 'Vacuno', emoji: '🐮' },
  { value: 'Otros', label: 'Otros', emoji: '🐾' },
];

const MESES_OPTIONS = [
  { value: '1', label: 'Enero' },
  { value: '2', label: 'Febrero' },
  { value: '3', label: 'Marzo' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Mayo' },
  { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
];

const CONDICION_OPTIONS = [
  'Delgado',
  'Muy delgado',
  'Obesidad',
  'Peso Ideal',
  'Sobrepeso',
];

const FAMILIARES_RESPONSABLES = [
  'Alejandro Navarro (Titular)',
  'Elena Ruiz Morales (Cónyuge)',
  'Mateo Damian Ruiz (Hijo)',
  'Lucía Damian Ruiz (Hija)',
  'Sin asignar',
];

interface MascotasProps {
  autoOpenAddModal?: boolean;
}

export const Mascotas: React.FC<MascotasProps> = ({ autoOpenAddModal = false }) => {
  const [mascotas, setMascotas] = useState<Mascota[]>(INITIAL_MASCOTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEspecie, setFilterEspecie] = useState('todas');

  // Modal Añadir / Editar Mascota
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (autoOpenAddModal) {
      setEditingMascota(null);
      setFormNombre('');
      setFormEspecie('');
      setFormDia('');
      setFormMes('');
      setFormAno('');
      setFormSexo('');
      setFormRaza('');
      setFormCondicion('Peso Ideal');
      setFormColorPrimario('#d4a373');
      setFormColorSecundario('#ffffff');
      setFormFamiliar('Alejandro Navarro');
      setFormChip('');
      setIsModalOpen(true);
    }
  }, [autoOpenAddModal]);
  const [editingMascota, setEditingMascota] = useState<Mascota | null>(null);

  // Modal Historial Clínico de Mascota
  const [selectedHistoryMascota, setSelectedHistoryMascota] = useState<Mascota | null>(null);

  // Modal Cita Veterinaria
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Modal Confirmación Dar de baja
  const [mascotaToDelete, setMascotaToDelete] = useState<Mascota | null>(null);

  // Form states
  const [formNombre, setFormNombre] = useState('');
  const [formEspecie, setFormEspecie] = useState('');
  const [formDia, setFormDia] = useState('');
  const [formMes, setFormMes] = useState('');
  const [formAno, setFormAno] = useState('');
  const [formSexo, setFormSexo] = useState<'Femenino' | 'Masculino' | ''>('');
  const [formRaza, setFormRaza] = useState('');
  const [formCondicion, setFormCondicion] = useState('');
  const [formColorPrimario, setFormColorPrimario] = useState('#d4a373');
  const [formColorSecundario, setFormColorSecundario] = useState('#ffffff');
  const [formFamiliar, setFormFamiliar] = useState('');
  const [formChip, setFormChip] = useState('');

  // Table action row open
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleOpenModal = () => {
    setEditingMascota(null);
    setFormNombre('');
    setFormEspecie('');
    setFormDia('');
    setFormMes('');
    setFormAno('');
    setFormSexo('');
    setFormRaza('');
    setFormCondicion('');
    setFormColorPrimario('#d4a373');
    setFormColorSecundario('#ffffff');
    setFormFamiliar('');
    setFormChip('');
    setIsModalOpen(true);
  };

  const handleEditMascota = (item: Mascota) => {
    setEditingMascota(item);
    setFormNombre(item.nombre);
    setFormEspecie(item.especie);
    const parts = item.fechaNacimiento.split('/');
    if (parts.length === 3) {
      setFormDia(parts[0]);
      setFormMes(parts[1].replace(/^0/, ''));
      setFormAno(parts[2]);
    }
    setFormSexo(item.sexo);
    setFormRaza(item.raza);
    setFormCondicion(item.condicionCorporal);
    setFormColorPrimario(item.colorPrimario || '#d4a373');
    setFormColorSecundario(item.colorSecundario || '#ffffff');
    setFormFamiliar(item.familiarRelacionado);
    setFormChip(item.numeroChip === 'No registrado' ? '' : item.numeroChip);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSaveMascota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNombre.trim() || !formEspecie) {
      alert('Por favor, ingresa el nombre y la especie de la mascota.');
      return;
    }

    const fechaNac = `${formDia.padStart(2, '0') || '01'}/${formMes.padStart(2, '0') || '01'}/${formAno || '2023'}`;
    const calculatedYears = formAno ? Math.max(0, 2026 - parseInt(formAno, 10)) : 1;

    if (editingMascota) {
      setMascotas(
        mascotas.map((m) =>
          m.id === editingMascota.id
            ? {
                ...m,
                nombre: formNombre.trim(),
                especie: formEspecie,
                fechaNacimiento: fechaNac,
                edad: `${calculatedYears} ${calculatedYears === 1 ? 'año' : 'años'}`,
                sexo: (formSexo as 'Femenino' | 'Masculino') || m.sexo,
                raza: formRaza.trim() || 'Mestizo',
                condicionCorporal: formCondicion || m.condicionCorporal,
                colorPrimario: formColorPrimario,
                colorSecundario: formColorSecundario,
                familiarRelacionado: formFamiliar || 'Alejandro Navarro',
                numeroChip: formChip.trim() || 'No registrado',
              }
            : m
        )
      );
      setEditingMascota(null);
    } else {
      const nueva: Mascota = {
        id: Date.now().toString(),
        nombre: formNombre.trim(),
        especie: formEspecie,
        fechaNacimiento: fechaNac,
        edad: `${calculatedYears} ${calculatedYears === 1 ? 'año' : 'años'}`,
        sexo: (formSexo as 'Femenino' | 'Masculino') || 'Femenino',
        raza: formRaza.trim() || 'Mestizo',
        condicionCorporal: formCondicion || 'Peso Ideal',
        colorPrimario: formColorPrimario,
        colorSecundario: formColorSecundario,
        familiarRelacionado: formFamiliar || 'Alejandro Navarro',
        numeroChip: formChip.trim() || 'No registrado',
      };

      setMascotas([nueva, ...mascotas]);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (mascotaToDelete) {
      setMascotas(mascotas.filter((m) => m.id !== mascotaToDelete.id));
      setMascotaToDelete(null);
    }
  };

  const filtered = mascotas.filter((m) => {
    if (filterEspecie !== 'todas' && m.especie !== filterEspecie) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.nombre.toLowerCase().includes(q) ||
        m.especie.toLowerCase().includes(q) ||
        m.raza.toLowerCase().includes(q) ||
        m.familiarRelacionado.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 font-[family-name:Helvetica]">
      {/* Header Row: Title, Description & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
            Mascotas
          </h1>
          <p className="text-[14px] leading-[22px] text-[var(--color-page-subtitle)] font-normal">
            Gestiona la información veterinaria de tus mascotas y sus responsables familiares.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenModal}
          className="h-[40px] px-[14px] self-start sm:self-auto"
        >
          <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
          <span>Añadir mascota</span>
        </Button>
      </div>

      {/* Filter Row: Search Input + Especie filter dropdown */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre, especie, raza, tutor..."
          leftIcon={<Search className="w-5 h-5" />}
          containerClassName="flex-1 max-w-[480px]"
        />

        <div className="w-full sm:w-[240px]">
          <Dropdown
            value={filterEspecie}
            onChange={setFilterEspecie}
            options={[
              { value: 'todas', label: 'Todas las especies' },
              ...ESPECIES_OPTIONS,
            ]}
          />
        </div>
      </div>

      {/* Contenedor de datos (Tabla en Desktop / Cards tipo tabla en Mobile) */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-none overflow-visible">
        {/* VISTA DESKTOP: TABLA COMPLETA (sin espacio extra forzado) */}
        <div className="hidden md:block overflow-x-auto custom-scrollbar-minimal">
          <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-white border-b border-[#e2e8f0] text-[12px] font-bold uppercase tracking-wider text-black">
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">MASCOTA</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">ESPECIE Y RAZA</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">EDAD</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">SEXO</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">CONDICIÓN CORPORAL</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">FAMILIAR ASIGNADO</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Nº CHIP</th>
              <th className="py-3.5 px-4 text-right w-[88px] min-w-[88px]">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#64748b]">
                  No se encontraron mascotas registradas.
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                        {item.nombre.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-black">{item.nombre}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    <div className="flex flex-col">
                      <span className="font-bold text-black">{item.especie}</span>
                      <span className="text-[12px] text-[#64748b]">{item.raza}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    <div className="flex flex-col">
                      <span className="font-medium text-black">{item.edad}</span>
                      <span className="text-[12px] text-[#64748b]">{item.fechaNacimiento}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                    {item.sexo}
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    <Badge
                      variant={
                        item.condicionCorporal === 'Peso Ideal'
                          ? 'disponible'
                          : item.condicionCorporal === 'Sobrepeso'
                          ? 'limitada'
                          : item.condicionCorporal === 'Obesidad'
                          ? 'no-disponible'
                          : 'programada'
                      }
                      className="w-fit"
                    >
                      {item.condicionCorporal}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569] font-medium">
                    {item.familiarRelacionado}
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[12px] text-[#64748b] font-mono">
                    {item.numeroChip}
                  </td>

                  <td className="py-3.5 px-4 text-right relative w-[88px] min-w-[88px]">
                    <div className="relative inline-flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === item.id ? null : item.id);
                        }}
                        className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                        title="Acciones"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === item.id && (
                        <ActionMenu
                          variant="standard"
                          onClose={() => setActiveMenuId(null)}
                          className={`absolute right-0 ${index >= filtered.length - 1 ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+4px)]'} z-50 w-[235px] text-left`}
                          items={[
                            {
                              id: 'historial',
                              label: 'Ver historial clínico',
                              icon: <FileText className="w-5 h-5" />,
                              onClick: () => {
                                setSelectedHistoryMascota(item);
                                setActiveMenuId(null);
                              },
                            },
                            {
                              id: 'cita',
                              label: 'Pedir cita veterinaria',
                              icon: <Calendar className="w-5 h-5" />,
                              onClick: () => {
                                setIsAppointmentModalOpen(true);
                                setActiveMenuId(null);
                              },
                            },
                            {
                              id: 'editar',
                              label: 'Editar datos',
                              icon: <Edit2 className="w-5 h-5" />,
                              onClick: () => {
                                handleEditMascota(item);
                              },
                            },
                            {
                              id: 'baja',
                              label: 'Dar de baja mascota',
                              icon: <Trash2 className="w-5 h-5" />,
                              onClick: () => {
                                setMascotaToDelete(item);
                                setActiveMenuId(null);
                              },
                            },
                          ]}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        {/* VISTA MOBILE: CARDS TIPO TABLA CON DISEÑO HOMOLOGADO */}
        <div className="block md:hidden divide-y divide-[#e2e8f0] bg-white">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#64748b] bg-white text-[14px]">
              No se encontraron mascotas registradas.
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className="p-4 flex flex-col gap-3.5 bg-white hover:bg-[#fafafa] transition-colors">
                {/* Cabecera de la Card: Avatar + Nombre + Especie/Raza + Botón Acciones */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[13px] flex items-center justify-center shrink-0">
                      {item.nombre.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-black text-[15px] leading-tight">
                        {item.nombre}
                      </span>
                      <span className="text-[12px] font-medium text-[#64748b] mt-0.5">
                        {item.especie} · {item.raza}
                      </span>
                    </div>
                  </div>

                  <div className="relative inline-flex items-center justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === `mobile-${item.id}` ? null : `mobile-${item.id}`);
                      }}
                      className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                      title="Acciones"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === `mobile-${item.id}` && (
                      <ActionMenu
                        variant="standard"
                        onClose={() => setActiveMenuId(null)}
                        className="absolute right-0 top-[calc(100%+4px)] z-50 w-[235px] text-left"
                        items={[
                          {
                            id: 'historial',
                            label: 'Ver historial clínico',
                            icon: <FileText className="w-5 h-5" />,
                            onClick: () => {
                              setSelectedHistoryMascota(item);
                              setActiveMenuId(null);
                            },
                          },
                          {
                            id: 'cita',
                            label: 'Pedir cita veterinaria',
                            icon: <Calendar className="w-5 h-5" />,
                            onClick: () => {
                              setIsAppointmentModalOpen(true);
                              setActiveMenuId(null);
                            },
                          },
                          {
                            id: 'editar',
                            label: 'Editar datos',
                            icon: <Edit2 className="w-5 h-5" />,
                            onClick: () => {
                              handleEditMascota(item);
                            },
                          },
                          {
                            id: 'baja',
                            label: 'Dar de baja mascota',
                            icon: <Trash2 className="w-5 h-5" />,
                            onClick: () => {
                              setMascotaToDelete(item);
                              setActiveMenuId(null);
                            },
                          },
                        ]}
                      />
                    )}
                  </div>
                </div>

                {/* Grid de campos tipo tabla con diseño idéntico a las columnas */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#f1f5f9] text-[13px]">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Edad y Nacimiento</span>
                    <span className="text-black font-normal mt-0.5">{item.edad} ({item.fechaNacimiento})</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Sexo</span>
                    <span className="text-[#475569] font-normal mt-0.5">{item.sexo}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Condición Corporal</span>
                    <div className="mt-0.5">
                      <Badge
                        variant={
                          item.condicionCorporal === 'Peso Ideal'
                            ? 'disponible'
                            : item.condicionCorporal === 'Sobrepeso'
                            ? 'limitada'
                            : item.condicionCorporal === 'Obesidad'
                            ? 'no-disponible'
                            : 'programada'
                        }
                        className="w-fit"
                      >
                        {item.condicionCorporal}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Familiar Asignado</span>
                    <span className="text-black font-medium mt-0.5">{item.familiarRelacionado}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Nº Chip</span>
                    <span className="font-mono text-[12px] text-[#475569] mt-0.5">{item.numeroChip}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        <TablePagination
          visibleCount={filtered.length}
          totalCount={mascotas.length}
          entityLabel="mascotas"
        />
      </div>

      {/* ================= MODAL AÑADIR MASCOTA ================= */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto custom-scrollbar-minimal animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[820px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto max-h-[90vh] custom-scrollbar-minimal relative animate-scaleUp cursor-default"
          >
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
              <h2 className="text-[20px] font-bold text-black tracking-tight leading-snug">
                {editingMascota ? 'Editar mascota' : 'Añadir mascota'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingMascota(null);
                }}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13.5px] leading-[20px] text-[var(--color-text-description)] font-normal -mt-3">
              Registra los datos de tu mascota para asociarla a tu unidad familiar y dar seguimiento a su historial veterinario.
            </p>

            <form onSubmit={handleSaveMascota} className="flex flex-col gap-5">
              {/* Fila 1: Nombre* y Especie* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Nombre*"
                  required
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  placeholder="Nombre de la mascota"
                />

                <Dropdown
                  label="Especie*"
                  value={formEspecie}
                  onChange={setFormEspecie}
                  placeholder="Selecciona la especie"
                  options={ESPECIES_OPTIONS}
                />
              </div>

              {/* Fila 2: Fecha de nacimiento y Sexo* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[14px] font-normal text-black leading-tight">
                    Fecha de nacimiento
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <TextInput
                      type="number"
                      min="1"
                      max="31"
                      value={formDia}
                      onChange={(e) => setFormDia(e.target.value)}
                      placeholder="Día*"
                    />
                    <Dropdown
                      value={formMes}
                      onChange={setFormMes}
                      placeholder="Mes*"
                      options={MESES_OPTIONS}
                    />
                    <TextInput
                      type="number"
                      min="1990"
                      max="2026"
                      value={formAno}
                      onChange={(e) => setFormAno(e.target.value)}
                      placeholder="Año*"
                    />
                  </div>
                </div>

                <Dropdown
                  label="Sexo*"
                  value={formSexo}
                  onChange={(val) => setFormSexo(val as 'Femenino' | 'Masculino')}
                  placeholder="Selecciona el sexo"
                  options={['Femenino', 'Masculino']}
                />
              </div>

              {/* Fila 3: Raza y Condición corporal* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Raza"
                  value={formRaza}
                  onChange={(e) => setFormRaza(e.target.value)}
                  placeholder="Ej. Golden Retriever, Mestizo..."
                />

                <Dropdown
                  label="Condición corporal*"
                  value={formCondicion}
                  onChange={setFormCondicion}
                  placeholder="Selecciona condición corporal"
                  options={CONDICION_OPTIONS}
                />
              </div>

              {/* Fila 4: Color primario y Color secundario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ColorPickerDropdown
                  label="Color primario"
                  value={formColorPrimario}
                  onChange={setFormColorPrimario}
                />
                <ColorPickerDropdown
                  label="Color secundario"
                  value={formColorSecundario}
                  onChange={setFormColorSecundario}
                />
              </div>

              {/* Fila 5: Relacionar con familiares y Número de chip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Dropdown
                  label="Relacionar con familiares"
                  value={formFamiliar}
                  onChange={setFormFamiliar}
                  placeholder="Selecciona responsable"
                  options={FAMILIARES_RESPONSABLES}
                  openUpward
                />

                <TextInput
                  label="Número de chip"
                  value={formChip}
                  onChange={(e) => setFormChip(e.target.value)}
                  placeholder="Ej. 985141002345678"
                  mono
                />
              </div>

              {/* Botón Guardar */}
              <div className="pt-2 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingMascota(null);
                  }}
                  className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
                >
                  CANCELAR
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]"
                >
                  {editingMascota ? 'GUARDAR CAMBIOS' : 'GUARDAR'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL HISTORIAL CLÍNICO DE MASCOTA ================= */}
      {selectedHistoryMascota && (
        <ModalHistoriaCompleta
          isOpen={!!selectedHistoryMascota}
          onClose={() => setSelectedHistoryMascota(null)}
          patientName={`${selectedHistoryMascota.nombre} (${selectedHistoryMascota.especie})`}
          patientGenderBirth={`${selectedHistoryMascota.sexo}, nacida el ${selectedHistoryMascota.fechaNacimiento} (${selectedHistoryMascota.edad}) · Raza: ${selectedHistoryMascota.raza} · Chip: ${selectedHistoryMascota.numeroChip}`}
          initials={selectedHistoryMascota.nombre.slice(0, 2).toUpperCase()}
        />
      )}

      {/* ================= MODAL CITA VETERINARIA ================= */}
      <ModalVideoConsulta
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* ================= MODAL DAR DE BAJA MASCOTA ================= */}
      {mascotaToDelete && (
        <ConfirmDeactivateModal
          isOpen={!!mascotaToDelete}
          entityName={`${mascotaToDelete.nombre} (${mascotaToDelete.especie})`}
          descriptionSuffix="de tu lista de mascotas."
          consequenceNote={`Ya no podrás solicitar consultas veterinarias ni consultar su historial médico y chip registrado (${mascotaToDelete.numeroChip}).`}
          onCancel={() => setMascotaToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};
