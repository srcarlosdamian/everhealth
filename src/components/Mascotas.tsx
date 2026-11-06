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
  PawPrint,
  Calendar,
  ChevronDown,
  FileSpreadsheet,
  Edit2,
  Trash2,
  Check,
} from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';

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
    familiarRelacionado: 'Carlos Damian',
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
  'Perro',
  'Gato',
  'Roedores/Conejos',
  'Aves',
  'Peces, anfibios y reptiles',
  'Equino',
  'Ovino',
  'Porcino',
  'Vacuno',
  'Otros',
];

const MESES_OPTIONS = [
  { val: '1', label: 'Enero' },
  { val: '2', label: 'Febrero' },
  { val: '3', label: 'Marzo' },
  { val: '4', label: 'Abril' },
  { val: '5', label: 'Mayo' },
  { val: '6', label: 'Junio' },
  { val: '7', label: 'Julio' },
  { val: '8', label: 'Agosto' },
  { val: '9', label: 'Septiembre' },
  { val: '10', label: 'Octubre' },
  { val: '11', label: 'Noviembre' },
  { val: '12', label: 'Diciembre' },
];

const CONDICION_OPTIONS = [
  'Delgado',
  'Muy delgado',
  'Obesidad',
  'Peso Ideal',
  'Sobrepeso',
];

const FAMILIARES_RESPONSABLES = [
  'Carlos Damian (Titular)',
  'Elena Ruiz Morales (Cónyuge)',
  'Mateo Damian Ruiz (Hijo)',
  'Lucía Damian Ruiz (Hija)',
  'Sin asignar',
];

const PET_COLOR_SWATCHES = [
  { name: 'Negro', hex: '#000000' },
  { name: 'Blanco', hex: '#ffffff' },
  { name: 'Marrón chocolate', hex: '#4a2c11' },
  { name: 'Castaño / Rojizo', hex: '#8b4513' },
  { name: 'Dorado / Canela', hex: '#d4a373' },
  { name: 'Crema / Arena', hex: '#f4a261' },
  { name: 'Gris plata', hex: '#94a3b8' },
  { name: 'Gris carbón', hex: '#334155' },
];

export const Mascotas: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>(INITIAL_MASCOTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEspecie, setFilterEspecie] = useState('todas');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Modal Añadir Mascota
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Confirmación Dar de baja
  const [mascotaToDelete, setMascotaToDelete] = useState<Mascota | null>(null);

  // Form states based on images media_1793946441958_7cbf8a05.png - media_1793946482916_2a382c0e.png
  const [formNombre, setFormNombre] = useState('');
  const [formEspecie, setFormEspecie] = useState('');
  const [formDia, setFormDia] = useState('');
  const [formMes, setFormMes] = useState('');
  const [formAno, setFormAno] = useState('');
  const [formSexo, setFormSexo] = useState<'Femenino' | 'Masculino' | ''>('');
  const [formRaza, setFormRaza] = useState('');
  const [formCondicion, setFormCondicion] = useState('');
  const [formColorPrimario, setFormColorPrimario] = useState('#000000');
  const [formColorSecundario, setFormColorSecundario] = useState('#000000');
  const [formFamiliar, setFormFamiliar] = useState('');
  const [formChip, setFormChip] = useState('');

  // Dropdown menus open state inside modal
  const [especieMenuOpen, setEspecieMenuOpen] = useState(false);
  const [mesMenuOpen, setMesMenuOpen] = useState(false);
  const [sexoMenuOpen, setSexoMenuOpen] = useState(false);
  const [condicionMenuOpen, setCondicionMenuOpen] = useState(false);
  const [familiarMenuOpen, setFamiliarMenuOpen] = useState(false);
  const [colorPrimarioMenuOpen, setColorPrimarioMenuOpen] = useState(false);
  const [colorSecundarioMenuOpen, setColorSecundarioMenuOpen] = useState(false);

  // Table action row open
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleOpenModal = () => {
    setFormNombre('');
    setFormEspecie('');
    setFormDia('');
    setFormMes('');
    setFormAno('');
    setFormSexo('');
    setFormRaza('');
    setFormCondicion('');
    setFormColorPrimario('#000000');
    setFormColorSecundario('#000000');
    setFormFamiliar('');
    setFormChip('');
    setEspecieMenuOpen(false);
    setMesMenuOpen(false);
    setSexoMenuOpen(false);
    setCondicionMenuOpen(false);
    setFamiliarMenuOpen(false);
    setIsModalOpen(true);
  };

  const handleSaveMascota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNombre.trim() || !formEspecie) {
      alert('Por favor, ingresa el nombre y la especie de la mascota.');
      return;
    }

    const fechaNac = `${formDia.padStart(2, '0') || '01'}/${formMes.padStart(2, '0') || '01'}/${formAno || '2023'}`;
    const calculatedYears = formAno ? Math.max(0, 2026 - parseInt(formAno, 10)) : 1;

    const nueva: Mascota = {
      id: Date.now().toString(),
      nombre: formNombre.trim(),
      especie: formEspecie,
      fechaNacimiento: fechaNac,
      edad: `${calculatedYears} ${calculatedYears === 1 ? 'año' : 'años'}`,
      sexo: (formSexo as any) || 'Femenino',
      raza: formRaza.trim() || 'Mestizo',
      condicionCorporal: formCondicion || 'Peso Ideal',
      colorPrimario: formColorPrimario,
      colorSecundario: formColorSecundario,
      familiarRelacionado: formFamiliar || 'Carlos Damian',
      numeroChip: formChip.trim() || 'No registrado',
    };

    setMascotas([nueva, ...mascotas]);
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
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
              Mascotas
            </h1>
            <PawPrint className="w-6 h-6 text-[#d50475]" />
          </div>
          <p className="text-[14px] leading-[22px] text-[#475569]">
            Gestiona la información veterinaria de tus mascotas y sus responsables familiares.
          </p>
        </div>

        {/* Botón: Añadir mascota */}
        <button
          type="button"
          onClick={handleOpenModal}
          className="h-[40px] px-[14px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
          <span>Añadir mascota</span>
        </button>
      </div>

      {/* Filter Row: Search Input + Especie filter dropdown */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-[480px]">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, especie, raza, tutor..."
            className="w-full h-[40px] pl-10 pr-4 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] transition-colors"
          />
        </div>

        {/* Filter especie custom popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            className="h-[40px] px-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-black text-[13px] font-bold text-black bg-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>{filterEspecie === 'todas' ? 'Todas las especies' : filterEspecie}</span>
            <ChevronDown className="w-4 h-4 text-black" />
          </button>

          {filterMenuOpen && (
            <div className="absolute right-0 sm:right-auto sm:left-0 top-[calc(100%+4px)] z-50 w-[220px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 flex flex-col gap-[2px] max-h-[240px] overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setFilterEspecie('todas');
                  setFilterMenuOpen(false);
                }}
                className={`w-full h-[36px] px-[12px] rounded-[6px] text-[13px] text-left cursor-pointer transition-colors flex items-center ${
                  filterEspecie === 'todas'
                    ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                    : 'hover:bg-[#f1f5f9] text-[#475569]'
                }`}
              >
                Todas las especies
              </button>
              {ESPECIES_OPTIONS.map((esp) => (
                <button
                  key={esp}
                  type="button"
                  onClick={() => {
                    setFilterEspecie(esp);
                    setFilterMenuOpen(false);
                  }}
                  className={`w-full h-[36px] px-[12px] rounded-[6px] text-[13px] text-left cursor-pointer transition-colors flex items-center ${
                    filterEspecie === esp
                      ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                      : 'hover:bg-[#f1f5f9] text-[#475569]'
                  }`}
                >
                  {esp}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabla de mascotas estilo Ever Health: bordes cuadrados, fondo blanco y líneas divisorias */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-none overflow-visible">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-white border-b border-[#e2e8f0] text-[12px] font-bold uppercase tracking-wider text-black">
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Mascota</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Especie y Raza</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Edad</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Sexo</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Condición Corporal</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Familiar Asignado</th>
              <th className="py-3.5 px-4 border-r border-[#e2e8f0]">Nº Chip</th>
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#64748b]">
                  No se encontraron mascotas registradas.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                        {item.nombre.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black">{item.nombre}</span>
                      </div>
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

                  {/* Acciones Dropdown con iconos neutros: Solo Editar datos y Dar de baja mascota */}
                  <td className="py-3.5 px-4 text-right relative">
                    <div className="inline-block relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(activeMenuId === item.id ? null : item.id)
                        }
                        className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                        title="Acciones"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown de Acciones con iconos neutros */}
                      {activeMenuId === item.id && (
                        <div className="absolute right-0 top-[calc(100%+2px)] z-30 w-[190px] bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col text-left">
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Editar datos de ${item.nombre}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4 text-[#64748b] shrink-0" />
                            <span>Editar datos</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setMascotaToDelete(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#fef2f2] text-[13px] font-normal text-[#ef4444] flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-[#64748b] shrink-0" />
                            <span>Dar de baja mascota</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación exacta con bordes cuadrados */}
        <div className="p-4 bg-white border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#64748b]">
          <span>Mostrando {filtered.length} de {mascotas.length} mascotas</span>

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
              className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#d50475] font-bold text-[13px] bg-[#fdf2f8]"
            >
              1
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

      {/* ================= MODAL AÑADIR MASCOTA ================= */}
      {/* Construido según las capturas con fondo blanco limpio en inputs y sin scroll interno */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-[820px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 overflow-visible relative animate-scaleUp">
            {/* Modal Title */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-[#d50475]" />
                <h2 className="text-[20px] font-bold text-black">Añadir mascota</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMascota} className="flex flex-col gap-5">
              {/* Fila 1: Nombre* y Especie* (Inputs sin fondo gris, fondo blanco estándar) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    required
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    placeholder="Nombre*"
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black focus:outline-none focus:border-[#d50475] transition-colors"
                  />
                </div>

                {/* Dropdown Especie* */}
                <div className="flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setEspecieMenuOpen(!especieMenuOpen);
                      setMesMenuOpen(false);
                      setSexoMenuOpen(false);
                      setCondicionMenuOpen(false);
                      setFamiliarMenuOpen(false);
                      setColorPrimarioMenuOpen(false);
                      setColorSecundarioMenuOpen(false);
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white hover:border-black text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formEspecie ? 'text-black' : 'text-[#64748b]'}>
                      {formEspecie || 'Especie*'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {/* Dropdown menu */}
                  {especieMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border border-[#e2e8f0] max-h-[220px] overflow-y-auto flex flex-col gap-[1px]">
                      {ESPECIES_OPTIONS.map((esp) => (
                        <button
                          key={esp}
                          type="button"
                          onClick={() => {
                            setFormEspecie(esp);
                            setEspecieMenuOpen(false);
                          }}
                          className={`w-full h-[36px] px-4 rounded-[6px] text-[14px] text-left transition-colors cursor-pointer ${
                            formEspecie === esp
                              ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                              : 'hover:bg-[#f1f5f9] text-[#475569] hover:text-black'
                          }`}
                        >
                          {esp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 2: Fecha de nacimiento (Día*, Mes*, Año*) y Sexo* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold text-[#64748b]">Fecha de nacimiento</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={formDia}
                      onChange={(e) => setFormDia(e.target.value)}
                      placeholder="Día*"
                      className="h-[44px] px-3 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                    
                    {/* Dropdown Mes */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setMesMenuOpen(!mesMenuOpen);
                          setEspecieMenuOpen(false);
                          setSexoMenuOpen(false);
                          setCondicionMenuOpen(false);
                          setFamiliarMenuOpen(false);
                          setColorPrimarioMenuOpen(false);
                          setColorSecundarioMenuOpen(false);
                        }}
                        className="w-full h-[44px] px-2 rounded-[8px] border border-[#cbd5e1] bg-white hover:border-black text-[13px] text-black flex items-center justify-between cursor-pointer"
                      >
                        <span className={formMes ? 'text-black' : 'text-[#64748b] truncate'}>
                          {formMes ? MESES_OPTIONS.find((m) => m.val === formMes)?.label : 'Mes*'}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-black shrink-0" />
                      </button>

                      {mesMenuOpen && (
                        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[140px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border border-[#e2e8f0] max-h-[220px] overflow-y-auto flex flex-col gap-[1px]">
                          {MESES_OPTIONS.map((m) => (
                            <button
                              key={m.val}
                              type="button"
                              onClick={() => {
                                setFormMes(m.val);
                                setMesMenuOpen(false);
                              }}
                              className="w-full h-[32px] px-3 rounded-[4px] text-[13px] text-left hover:bg-[#f1f5f9] text-[#475569] hover:text-black cursor-pointer"
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="number"
                      min="1990"
                      max="2026"
                      value={formAno}
                      onChange={(e) => setFormAno(e.target.value)}
                      placeholder="Año*"
                      className="h-[44px] px-3 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

                {/* Dropdown Sexo* */}
                <div className="flex flex-col gap-1 justify-end relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSexoMenuOpen(!sexoMenuOpen);
                      setEspecieMenuOpen(false);
                      setMesMenuOpen(false);
                      setCondicionMenuOpen(false);
                      setFamiliarMenuOpen(false);
                      setColorPrimarioMenuOpen(false);
                      setColorSecundarioMenuOpen(false);
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white hover:border-black text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formSexo ? 'text-black' : 'text-[#64748b]'}>
                      {formSexo || 'Sexo*'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {/* Dropdown exacto: Femenino / Masculino */}
                  {sexoMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border border-[#e2e8f0] flex flex-col gap-[2px]">
                      {['Femenino', 'Masculino'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setFormSexo(s as any);
                            setSexoMenuOpen(false);
                          }}
                          className={`w-full h-[36px] px-4 rounded-[6px] text-[14px] text-left transition-colors cursor-pointer ${
                            formSexo === s
                              ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                              : 'hover:bg-[#f1f5f9] text-[#475569] hover:text-black'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 3: Raza y Condición corporal* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    value={formRaza}
                    onChange={(e) => setFormRaza(e.target.value)}
                    placeholder="Raza"
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>

                {/* Dropdown Condición corporal* */}
                <div className="flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setCondicionMenuOpen(!condicionMenuOpen);
                      setEspecieMenuOpen(false);
                      setMesMenuOpen(false);
                      setSexoMenuOpen(false);
                      setFamiliarMenuOpen(false);
                      setColorPrimarioMenuOpen(false);
                      setColorSecundarioMenuOpen(false);
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white hover:border-black text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formCondicion ? 'text-black' : 'text-[#64748b]'}>
                      {formCondicion || 'Condición corporal*'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {condicionMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border border-[#e2e8f0] flex flex-col gap-[2px]">
                      {CONDICION_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setFormCondicion(c);
                            setCondicionMenuOpen(false);
                          }}
                          className={`w-full h-[36px] px-4 rounded-[6px] text-[14px] text-left transition-colors cursor-pointer ${
                            formCondicion === c
                              ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                              : 'hover:bg-[#f1f5f9] text-[#475569] hover:text-black'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 4: Color primario y Color secundario con Picker en Dropdown elegante justo debajo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Color Primario */}
                <div className="flex flex-col gap-1 relative">
                  <span className="text-[12px] font-bold text-[#64748b]">Color primario</span>
                  <button
                    type="button"
                    onClick={() => {
                      setColorPrimarioMenuOpen(!colorPrimarioMenuOpen);
                      setColorSecundarioMenuOpen(false);
                      setEspecieMenuOpen(false);
                      setMesMenuOpen(false);
                      setSexoMenuOpen(false);
                      setCondicionMenuOpen(false);
                      setFamiliarMenuOpen(false);
                    }}
                    className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-[4px] border border-[#cbd5e1] shrink-0 shadow-xs"
                        style={{ backgroundColor: formColorPrimario }}
                      />
                      <span className="text-[13px] font-mono font-medium text-black">
                        {formColorPrimario}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {colorPrimarioMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[260px] bg-white rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] p-3 border border-[#e2e8f0] flex flex-col gap-2.5 animate-fadeIn">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                        Colores habituales
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {PET_COLOR_SWATCHES.map((swatch) => (
                          <button
                            key={swatch.hex}
                            type="button"
                            onClick={() => {
                              setFormColorPrimario(swatch.hex);
                              setColorPrimarioMenuOpen(false);
                            }}
                            title={swatch.name}
                            className={`w-9 h-9 rounded-[6px] border transition-all cursor-pointer flex items-center justify-center ${
                              formColorPrimario.toLowerCase() === swatch.hex.toLowerCase()
                                ? 'border-[#d50475] ring-2 ring-[#d50475]/30 scale-105'
                                : 'border-[#cbd5e1] hover:scale-105'
                            }`}
                            style={{ backgroundColor: swatch.hex }}
                          >
                            {formColorPrimario.toLowerCase() === swatch.hex.toLowerCase() && (
                              <Check
                                className={`w-4 h-4 ${
                                  swatch.hex === '#ffffff' || swatch.hex === '#f4a261'
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="w-full h-[1px] bg-[#f1f5f9] my-0.5" />

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="custom-p-color"
                          className="text-[12px] text-[#64748b] cursor-pointer"
                        >
                          Personalizado:
                        </label>
                        <input
                          id="custom-p-color"
                          type="color"
                          value={formColorPrimario}
                          onChange={(e) => setFormColorPrimario(e.target.value)}
                          className="w-7 h-7 rounded border border-[#cbd5e1] cursor-pointer p-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={formColorPrimario}
                          onChange={(e) => setFormColorPrimario(e.target.value)}
                          className="flex-1 h-[32px] px-2 text-[12px] font-mono border border-[#cbd5e1] rounded bg-white text-black uppercase"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Secundario */}
                <div className="flex flex-col gap-1 relative">
                  <span className="text-[12px] font-bold text-[#64748b]">Color secundario</span>
                  <button
                    type="button"
                    onClick={() => {
                      setColorSecundarioMenuOpen(!colorSecundarioMenuOpen);
                      setColorPrimarioMenuOpen(false);
                      setEspecieMenuOpen(false);
                      setMesMenuOpen(false);
                      setSexoMenuOpen(false);
                      setCondicionMenuOpen(false);
                      setFamiliarMenuOpen(false);
                    }}
                    className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-[4px] border border-[#cbd5e1] shrink-0 shadow-xs"
                        style={{ backgroundColor: formColorSecundario }}
                      />
                      <span className="text-[13px] font-mono font-medium text-black">
                        {formColorSecundario}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {colorSecundarioMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-260px bg-white rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] p-3 border border-[#e2e8f0] flex flex-col gap-2.5 animate-fadeIn">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                        Colores habituales
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {PET_COLOR_SWATCHES.map((swatch) => (
                          <button
                            key={swatch.hex}
                            type="button"
                            onClick={() => {
                              setFormColorSecundario(swatch.hex);
                              setColorSecundarioMenuOpen(false);
                            }}
                            title={swatch.name}
                            className={`w-9 h-9 rounded-[6px] border transition-all cursor-pointer flex items-center justify-center ${
                              formColorSecundario.toLowerCase() === swatch.hex.toLowerCase()
                                ? 'border-[#d50475] ring-2 ring-[#d50475]/30 scale-105'
                                : 'border-[#cbd5e1] hover:scale-105'
                            }`}
                            style={{ backgroundColor: swatch.hex }}
                          >
                            {formColorSecundario.toLowerCase() === swatch.hex.toLowerCase() && (
                              <Check
                                className={`w-4 h-4 ${
                                  swatch.hex === '#ffffff' || swatch.hex === '#f4a261'
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="w-full h-[1px] bg-[#f1f5f9] my-0.5" />

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="custom-s-color"
                          className="text-[12px] text-[#64748b] cursor-pointer"
                        >
                          Personalizado:
                        </label>
                        <input
                          id="custom-s-color"
                          type="color"
                          value={formColorSecundario}
                          onChange={(e) => setFormColorSecundario(e.target.value)}
                          className="w-7 h-7 rounded border border-[#cbd5e1] cursor-pointer p-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={formColorSecundario}
                          onChange={(e) => setFormColorSecundario(e.target.value)}
                          className="flex-1 h-[32px] px-2 text-[12px] font-mono border border-[#cbd5e1] rounded bg-white text-black uppercase"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 5: Relacionar con familiares (despliega hacia arriba para no cortar ni provocar scroll) y Número de chip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFamiliarMenuOpen(!familiarMenuOpen);
                      setEspecieMenuOpen(false);
                      setMesMenuOpen(false);
                      setSexoMenuOpen(false);
                      setCondicionMenuOpen(false);
                      setColorPrimarioMenuOpen(false);
                      setColorSecundarioMenuOpen(false);
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white hover:border-black text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formFamiliar ? 'text-black' : 'text-[#64748b]'}>
                      {formFamiliar || 'Relacionar con familiares'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {/* Popover desplegándose hacia arriba de forma natural */}
                  {familiarMenuOpen && (
                    <div className="absolute left-0 bottom-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_16px_36px_rgba(0,0,0,0.16)] p-[4px] border border-[#e2e8f0] flex flex-col gap-[2px] max-h-[220px] overflow-y-auto animate-fadeIn">
                      {FAMILIARES_RESPONSABLES.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => {
                            setFormFamiliar(f);
                            setFamiliarMenuOpen(false);
                          }}
                          className={`w-full h-[36px] px-4 rounded-[6px] text-[14px] text-left transition-colors cursor-pointer ${
                            formFamiliar === f
                              ? 'bg-[#fdf2f8] text-[#d50475] font-bold'
                              : 'hover:bg-[#f1f5f9] text-[#475569] hover:text-black'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    value={formChip}
                    onChange={(e) => setFormChip(e.target.value)}
                    placeholder="Número de chip"
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
              </div>

              {/* Botón Guardar en forma de píldora magenta en la parte inferior */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-[320px] h-[46px] rounded-[24px] bg-[#d50475] hover:bg-[#b80364] text-white text-[15px] font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DAR DE BAJA MASCOTA ================= */}
      {mascotaToDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-[460px] bg-white rounded-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-7 flex flex-col gap-5 animate-scaleUp">
            {/* Modal Title & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <h2 className="text-[18px] font-bold text-black">
                ¿Estás seguro que quieres dar de baja?
              </h2>
              <button
                type="button"
                onClick={() => setMascotaToDelete(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] leading-[22px] text-[#475569]">
                Esta acción dará de baja a <strong className="text-black font-bold">{mascotaToDelete.nombre}</strong> ({mascotaToDelete.especie}) de tu lista de mascotas.
              </p>
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] text-[13px] text-[#64748b] leading-[18px]">
                Ya no podrás solicitar consultas veterinarias ni consultar su historial médico y chip registrado ({mascotaToDelete.numeroChip}).
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMascotaToDelete(null)}
                className="px-4 h-[38px] rounded-[6px] border border-[#cbd5e1] hover:bg-[#f8fafc] text-black text-[13px] font-bold uppercase transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 h-[38px] rounded-[6px] bg-[#ef4444] hover:bg-[#dc2626] text-white text-[13px] font-bold uppercase transition-colors cursor-pointer shadow-xs"
              >
                Dar de baja
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
