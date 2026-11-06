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

export const Mascotas: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>(INITIAL_MASCOTAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEspecie, setFilterEspecie] = useState('todas');

  // Modal Añadir Mascota
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = (id: string) => {
    setMascotas(mascotas.filter((m) => m.id !== id));
    setActiveMenuId(null);
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

        {/* Filter especie */}
        <div className="flex items-center gap-3">
          <select
            value={filterEspecie}
            onChange={(e) => setFilterEspecie(e.target.value)}
            className="h-[40px] px-3.5 pr-8 rounded-[8px] border border-[#cbd5e1] text-[13px] font-bold text-black bg-white cursor-pointer focus:outline-none focus:border-[#d50475]"
          >
            <option value="todas">Todas las especies</option>
            {ESPECIES_OPTIONS.map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de mascotas estilo Ever Health */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                <th className="py-3 px-5">Mascota</th>
                <th className="py-3 px-5">Especie y Raza</th>
                <th className="py-3 px-5">Edad</th>
                <th className="py-3 px-5">Sexo</th>
                <th className="py-3 px-5">Condición Corporal</th>
                <th className="py-3 px-5">Familiar Asignado</th>
                <th className="py-3 px-5">Nº Chip</th>
                <th className="py-3 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9] text-[14px] text-black">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#64748b]">
                    No se encontraron mascotas registradas.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#fce7f3] text-[#d50475] flex items-center justify-center shrink-0">
                          <PawPrint className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{item.nombre}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-black">{item.especie}</span>
                        <span className="text-[12px] text-[#64748b]">{item.raza}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-medium text-black">{item.edad}</span>
                        <span className="text-[12px] text-[#64748b]">{item.fechaNacimiento}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-[#475569]">
                      {item.sexo}
                    </td>

                    <td className="py-3.5 px-5">
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
                      >
                        {item.condicionCorporal}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-5 text-[#475569] font-medium">
                      {item.familiarRelacionado}
                    </td>

                    <td className="py-3.5 px-5 text-[12px] text-[#64748b] font-mono">
                      {item.numeroChip}
                    </td>

                    {/* Acciones Dropdown con iconos y separador */}
                    <td className="py-3.5 px-5 text-right relative">
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

                        {/* Dropdown de Acciones con iconos y separadores */}
                        {activeMenuId === item.id && (
                          <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[220px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col text-left">
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Consultar cartilla de ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                            >
                              <FileSpreadsheet className="w-4 h-4 text-[#d50475] shrink-0" />
                              <span>Ver cartilla veterinaria</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Solicitar consulta veterinaria para ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                            >
                              <Calendar className="w-4 h-4 text-[#2563eb] shrink-0" />
                              <span>Pedir consulta veterinaria</span>
                            </button>

                            <div className="w-full h-[1px] bg-[#f1f5f9] my-1" />

                            <button
                              type="button"
                              onClick={() => {
                                alert(`Editar datos de ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4 text-[#475569] shrink-0" />
                              <span>Editar datos</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#fef2f2] text-[13px] font-normal text-[#ef4444] flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 text-[#ef4444] shrink-0" />
                              <span>Eliminar mascota</span>
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
        </div>

        {/* Paginación */}
        <div className="p-4 sm:px-6 bg-white border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#64748b]">
          <span>Mostrando {filtered.length} de {mascotas.length} mascotas</span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black disabled:opacity-40"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-[6px] bg-[#d50475] text-white font-bold text-[13px] flex items-center justify-center shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded-[6px] border border-[#cbd5e1] bg-white flex items-center justify-center text-black disabled:opacity-40"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL AÑADIR MASCOTA ================= */}
      {/* Construido según las capturas media_1793946441958_7cbf8a05.png hasta media_1793946482916_2a382c0e.png */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[860px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
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
              {/* Fila 1: Nombre* y Especie* (según media_1793946461597_60028448.png) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    required
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    placeholder="Nombre*"
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] text-[14px] text-black focus:outline-none focus:border-[#d50475] focus:bg-white transition-colors"
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
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] hover:bg-white text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formEspecie ? 'text-black' : 'text-[#64748b]'}>
                      {formEspecie || 'Especie*'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {/* Dropdown menu exacto a media_1793946461597_60028448.png */}
                  {especieMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 max-h-[260px] overflow-y-auto flex flex-col gap-[1px]">
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

              {/* Fila 2: Fecha de nacimiento (Día*, Mes*, Año*) y Sexo* (según media_1793946467703_53fff81a.png) */}
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
                      className="h-[44px] px-3 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] text-[14px] text-black focus:outline-none focus:border-[#d50475] focus:bg-white"
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
                        }}
                        className="w-full h-[44px] px-2 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] hover:bg-white text-[13px] text-black flex items-center justify-between cursor-pointer"
                      >
                        <span className={formMes ? 'text-black' : 'text-[#64748b] truncate'}>
                          {formMes ? MESES_OPTIONS.find((m) => m.val === formMes)?.label : 'Mes*'}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-black shrink-0" />
                      </button>

                      {mesMenuOpen && (
                        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[140px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 max-h-[220px] overflow-y-auto flex flex-col gap-[1px]">
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
                      className="h-[44px] px-3 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] text-[14px] text-black focus:outline-none focus:border-[#d50475] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Dropdown Sexo* matching media_1793946467703_53fff81a.png */}
                <div className="flex flex-col gap-1 justify-end relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSexoMenuOpen(!sexoMenuOpen);
                      setEspecieMenuOpen(false);
                      setMesMenuOpen(false);
                      setCondicionMenuOpen(false);
                      setFamiliarMenuOpen(false);
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] hover:bg-white text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formSexo ? 'text-black' : 'text-[#64748b]'}>
                      {formSexo || 'Sexo*'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {/* Dropdown exacto: Femenino / Masculino */}
                  {sexoMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 flex flex-col gap-[2px]">
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
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] text-[14px] text-black focus:outline-none focus:border-[#d50475] focus:bg-white"
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
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] hover:bg-white text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formCondicion ? 'text-black' : 'text-[#64748b]'}>
                      {formCondicion || 'Condición corporal*'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {condicionMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 flex flex-col gap-[2px]">
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

              {/* Fila 4: Color primario (#000000) y Color secundario (#000000) según imagen 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold text-[#64748b]">Color primario</span>
                  <div className="flex items-center gap-3 h-[44px] px-3 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc]">
                    <div
                      className="flex-1 h-7 rounded-[4px] border border-black/10 cursor-pointer"
                      style={{ backgroundColor: formColorPrimario }}
                      onClick={() => {
                        const input = document.getElementById('color-p-picker') as HTMLInputElement;
                        input?.click();
                      }}
                    />
                    <input
                      id="color-p-picker"
                      type="color"
                      value={formColorPrimario}
                      onChange={(e) => setFormColorPrimario(e.target.value)}
                      className="hidden"
                    />
                    <input
                      type="text"
                      value={formColorPrimario}
                      onChange={(e) => setFormColorPrimario(e.target.value)}
                      className="w-[80px] text-[13px] font-mono text-black bg-transparent focus:outline-none text-right font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold text-[#64748b]">Color secundario</span>
                  <div className="flex items-center gap-3 h-[44px] px-3 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc]">
                    <div
                      className="flex-1 h-7 rounded-[4px] border border-black/10 cursor-pointer"
                      style={{ backgroundColor: formColorSecundario }}
                      onClick={() => {
                        const input = document.getElementById('color-s-picker') as HTMLInputElement;
                        input?.click();
                      }}
                    />
                    <input
                      id="color-s-picker"
                      type="color"
                      value={formColorSecundario}
                      onChange={(e) => setFormColorSecundario(e.target.value)}
                      className="hidden"
                    />
                    <input
                      type="text"
                      value={formColorSecundario}
                      onChange={(e) => setFormColorSecundario(e.target.value)}
                      className="w-[80px] text-[13px] font-mono text-black bg-transparent focus:outline-none text-right font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Fila 5: Relacionar con familiares y Número de chip */}
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
                    }}
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] hover:bg-white text-[14px] text-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formFamiliar ? 'text-black' : 'text-[#64748b]'}>
                      {formFamiliar || 'Relacionar con familiares'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {familiarMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 flex flex-col gap-[2px]">
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
                    className="h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] text-[14px] text-black focus:outline-none focus:border-[#d50475] focus:bg-white"
                  />
                </div>
              </div>

              {/* Botón Guardar en forma de píldora magenta al 100% de ancho en la parte inferior */}
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

    </div>
  );
};
