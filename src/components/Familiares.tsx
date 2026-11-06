import React, { useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  X,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserCheck,
  User,
  Trash2,
  Edit2,
  Calendar,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';

export interface Familiar {
  id: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  edad: number;
  sexo: string;
  parentesco: string;
  esTutor?: boolean;
  tutorAsignado?: string;
}

const INITIAL_FAMILIARES: Familiar[] = [
  {
    id: '1',
    nombre: 'Elena',
    apellidos: 'Ruiz Morales',
    fechaNacimiento: '14/05/1990',
    edad: 36,
    sexo: 'Femenino',
    parentesco: 'Cónyuge',
    esTutor: true,
  },
  {
    id: '2',
    nombre: 'Mateo',
    apellidos: 'Damian Ruiz',
    fechaNacimiento: '22/08/2018',
    edad: 8,
    sexo: 'Masculino',
    parentesco: 'Hijo/a',
    tutorAsignado: 'Carlos Damian (Titular)',
  },
  {
    id: '3',
    nombre: 'Lucía',
    apellidos: 'Damian Ruiz',
    fechaNacimiento: '10/11/2021',
    edad: 5,
    sexo: 'Femenino',
    parentesco: 'Hijo/a',
    tutorAsignado: 'Elena Ruiz (Cónyuge)',
  },
  {
    id: '4',
    nombre: 'Rosa',
    apellidos: 'Morales Silva',
    fechaNacimiento: '03/02/1962',
    edad: 64,
    sexo: 'Femenino',
    parentesco: 'Madre / Padre',
    esTutor: false,
  },
  {
    id: '5',
    nombre: 'Javier',
    apellidos: 'Damian Ortiz',
    fechaNacimiento: '18/09/1959',
    edad: 67,
    sexo: 'Masculino',
    parentesco: 'Madre / Padre',
    esTutor: false,
  },
];

export const Familiares: React.FC = () => {
  const [familiares, setFamiliares] = useState<Familiar[]>(INITIAL_FAMILIARES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterParentesco, setFilterParentesco] = useState('todos');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Modal Añadir Familiar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(true);

  // Modal Confirmación Dar de baja
  const [familiarToDelete, setFamiliarToDelete] = useState<Familiar | null>(null);

  // Form states matching media_1793946349811_4eeea051.png
  const [formNombre, setFormNombre] = useState('');
  const [formApellidos, setFormApellidos] = useState('');
  const [formFechaNac, setFormFechaNac] = useState('');
  const [formSexo, setFormSexo] = useState('');
  const [formParentesco, setFormParentesco] = useState('');
  const [sexoDropdownOpen, setSexoDropdownOpen] = useState(false);
  const [parentescoDropdownOpen, setParentescoDropdownOpen] = useState(false);

  // Dropdown action row open
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleOpenModal = () => {
    setFormNombre('');
    setFormApellidos('');
    setFormFechaNac('');
    setFormSexo('');
    setFormParentesco('');
    setShowWarningAlert(true);
    setIsModalOpen(true);
  };

  const handleSaveFamiliar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNombre.trim() || !formApellidos.trim()) {
      alert('Por favor, ingresa al menos nombre y apellidos.');
      return;
    }

    const nuevo: Familiar = {
      id: Date.now().toString(),
      nombre: formNombre.trim(),
      apellidos: formApellidos.trim(),
      fechaNacimiento: formFechaNac || '01/01/2000',
      edad: formFechaNac ? calculateAge(formFechaNac) : 25,
      sexo: formSexo || 'No especificado',
      parentesco: formParentesco || 'Otro',
      esTutor: formParentesco === 'Cónyuge',
    };

    setFamiliares([nuevo, ...familiares]);
    setIsModalOpen(false);
  };

  const calculateAge = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      return Math.max(0, 2026 - year);
    }
    return 10;
  };

  const handleConfirmDelete = () => {
    if (familiarToDelete) {
      setFamiliares(familiares.filter((f) => f.id !== familiarToDelete.id));
      setFamiliarToDelete(null);
    }
  };

  const filtered = familiares.filter((f) => {
    if (filterParentesco !== 'todos' && f.parentesco !== filterParentesco) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.nombre.toLowerCase().includes(q) ||
        f.apellidos.toLowerCase().includes(q) ||
        f.parentesco.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica]">
      
      {/* Header Row: Title, Description & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
            Familiares
          </h1>
          <p className="text-[14px] leading-[22px] text-[#475569]">
            Gestiona los miembros de tu unidad familiar y administra sus tutores médicos.
          </p>
        </div>

        {/* Botón: Agregar un nuevo familiar */}
        <button
          type="button"
          onClick={handleOpenModal}
          className="h-[40px] px-[14px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
          <span>Añadir familiar</span>
        </button>
      </div>

      {/* Filter Row: Search Input + Parentesco filter dropdown */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-[480px]">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, apellidos, parentesco..."
            className="w-full h-[40px] pl-10 pr-4 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] transition-colors"
          />
        </div>

        {/* Filter parentesco con dropdown flotante homologado */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            className="h-[40px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[13px] font-medium text-black bg-white hover:bg-[#f8fafc] flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>{filterParentesco === 'todos' ? 'Todos los parentescos' : filterParentesco}</span>
            <ChevronDown className="w-4 h-4 text-black" />
          </button>

          {filterMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[200px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 border-0 flex flex-col gap-1">
              {['todos', 'Cónyuge', 'Hijo/a', 'Madre / Padre', 'Hermano/a'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setFilterParentesco(p);
                    setFilterMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] transition-colors cursor-pointer ${
                    filterParentesco === p ? 'bg-[#fdf2f8] text-[#d50475] font-bold' : 'hover:bg-[#f1f5f9] text-black'
                  }`}
                >
                  {p === 'todos' ? 'Todos los parentescos' : p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabla de familiares: SIN BORDES REDONDEADOS (rounded-none), SIN FONDO GRIS, CON LÍNEAS DIVISORIAS VERTICALES exacto a media_1793983844153_dad569fa.png */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-none shadow-none overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-white border-b border-[#e2e8f0] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-black">
              <th className="py-3 px-4 border-r border-[#e2e8f0]">Nombre y Apellidos</th>
              <th className="py-3 px-4 border-r border-[#e2e8f0]">Parentesco</th>
              <th className="py-3 px-4 border-r border-[#e2e8f0]">Fecha de Nacimiento</th>
              <th className="py-3 px-4 border-r border-[#e2e8f0]">Edad</th>
              <th className="py-3 px-4 border-r border-[#e2e8f0]">Sexo al nacer</th>
              <th className="py-3 px-4 border-r border-[#e2e8f0]">Tutor / Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#64748b] bg-white">
                  No se encontraron familiares registrados.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#fafafa] bg-white transition-colors">
                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[12px] flex items-center justify-center shrink-0">
                        {item.nombre[0]}
                        {item.apellidos[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black">
                          {item.nombre} {item.apellidos}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-[#475569]">
                    {item.parentesco}
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#64748b]">
                    {item.fechaNacimiento}
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-bold text-black">
                    {item.edad} años
                  </td>

                  <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-[#475569]">
                    {item.sexo}
                  </td>

                  {/* Tutor / Estado con badge en auto / w-fit sin estirarse */}
                  <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                    {item.esTutor ? (
                      <Badge variant="disponible" className="w-fit">Tutor legal</Badge>
                    ) : item.edad < 18 ? (
                      <div className="flex flex-col items-start gap-1">
                        <Badge variant="confirmada" className="w-fit">Menor a cargo</Badge>
                        <span className="text-[11px] text-[#64748b]">
                          {item.tutorAsignado || 'Tutor: Titular'}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="programada" className="w-fit">Adulto</Badge>
                    )}
                  </td>

                  {/* Acciones Dropdown con iconos y separadores */}
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

                      {/* Dropdown de Acciones con iconos y separadores */}
                      {activeMenuId === item.id && (
                        <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[210px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col text-left">
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Consultar historial de ${item.nombre}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                          >
                            <FileText className="w-4 h-4 text-[#64748b] shrink-0" />
                            <span>Ver historial clínico</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Solicitar cita para ${item.nombre}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                          >
                            <Calendar className="w-4 h-4 text-[#64748b] shrink-0" />
                            <span>Pedir cita médica</span>
                          </button>

                          {/* Separador */}
                          <div className="w-full h-[1px] bg-[#f1f5f9] my-1" />

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
                              setFamiliarToDelete(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full h-[36px] px-[10px] rounded-[6px] hover:bg-[#fef2f2] text-[13px] font-normal text-[#ef4444] flex items-center gap-[10px] text-left transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-[#64748b] shrink-0" />
                            <span>Dar de baja familiar</span>
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
          <span>Mostrando de 1 a {filtered.length} de {familiares.length} familiares</span>

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

      {/* ================= MODAL AÑADIR FAMILIAR ================= */}
      {/* Basado exactamente en la captura media_1793946349811_4eeea051.png */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-[800px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
            {/* Modal Title */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <h2 className="text-[20px] font-bold text-black">Añadir familiar</h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Aviso amarillo de tutores (exacto a la imagen 2) */}
            {showWarningAlert && (
              <div className="w-full bg-[#fef9c3] border border-[#fef08a] rounded-[8px] p-3.5 flex items-start justify-between gap-3 text-[#854d0e]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#fde047] flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-3.5 h-3.5 text-[#854d0e]" />
                  </div>
                  <p className="text-[13px] leading-[18px]">
                    Si vas a añadir familiares adultos y menores, es recomendable empezar por <strong>los adultos</strong>. Así luego, si es el caso, es más fácil seleccionarlos como tutores de los menores.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWarningAlert(false)}
                  className="text-[#854d0e] hover:opacity-70 p-0.5 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Formulario con campos exactos: Nombre*, Apellidos*, Fecha Nacimiento, Sexo asignado al nacer, Parentesco */}
            <form onSubmit={handleSaveFamiliar} className="flex flex-col gap-5">
              {/* Fila 1: Nombre* y Apellidos* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Nombre<span className="text-[#d50475]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    placeholder="Nombre del familiar"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Apellidos<span className="text-[#d50475]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formApellidos}
                    onChange={(e) => setFormApellidos(e.target.value)}
                    placeholder="Apellidos del familiar"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
              </div>

              {/* Fila 2: Fecha de nacimiento (--/--/----) y Sexo asignado al nacer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    value={formFechaNac}
                    onChange={(e) => setFormFechaNac(e.target.value)}
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label className="text-[14px] font-medium text-black">
                    ¿Qué sexo te asignaron al nacer?
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setSexoDropdownOpen(!sexoDropdownOpen);
                      setParentescoDropdownOpen(false);
                    }}
                    className="h-[44px] px-3.5 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black bg-white hover:border-black flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={formSexo ? 'text-black' : 'text-[#94a3b8]'}>
                      {formSexo || 'Selecciona una opción'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  </button>

                  {/* Dropdown de opciones con sombra flotante sin borde gris */}
                  {sexoDropdownOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 flex flex-col gap-[2px]">
                      {['Femenino', 'Masculino', 'No especificado'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setFormSexo(opt);
                            setSexoDropdownOpen(false);
                          }}
                          className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f1f5f9] text-[14px] text-black text-left cursor-pointer transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 3: Parentesco con dropdown homologado */}
              <div className="flex flex-col gap-1 relative">
                <label className="text-[14px] font-medium text-black">
                  Parentesco
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setParentescoDropdownOpen(!parentescoDropdownOpen);
                    setSexoDropdownOpen(false);
                  }}
                  className="h-[44px] px-3.5 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black bg-white hover:border-black flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className={formParentesco ? 'text-black' : 'text-[#94a3b8]'}>
                    {formParentesco || 'Selecciona el parentesco'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-black shrink-0" />
                </button>

                {parentescoDropdownOpen && (
                  <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[4px] border-0 flex flex-col gap-[2px]">
                    {['Cónyuge', 'Hijo/a', 'Madre / Padre', 'Hermano/a', 'Otro'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormParentesco(opt);
                          setParentescoDropdownOpen(false);
                        }}
                        className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f1f5f9] text-[14px] text-black text-left cursor-pointer transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: Guardar (Botón rosa centrado o a la derecha como en la captura) */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 h-[42px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[14px] font-bold uppercase cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-7 h-[42px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase cursor-pointer transition-colors shadow-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DAR DE BAJA FAMILIAR ================= */}
      {familiarToDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-[460px] bg-white rounded-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-7 flex flex-col gap-5 animate-scaleUp">
            {/* Modal Title & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <h2 className="text-[18px] font-bold text-black">
                ¿Estás seguro que quieres dar de baja?
              </h2>
              <button
                type="button"
                onClick={() => setFamiliarToDelete(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] leading-[22px] text-[#475569]">
                Esta acción dará de baja a <strong className="text-black font-bold">{familiarToDelete.nombre} {familiarToDelete.apellidos}</strong> de tu unidad familiar.
              </p>
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] text-[13px] text-[#64748b] leading-[18px]">
                Ya no podrás solicitar consultas, gestionar tutores ni acceder a su historial clínico compartido.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFamiliarToDelete(null)}
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
