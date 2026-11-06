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

  // Modal Añadir Familiar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(true);

  // Form states matching media_1793946349811_4eeea051.png
  const [formNombre, setFormNombre] = useState('');
  const [formApellidos, setFormApellidos] = useState('');
  const [formFechaNac, setFormFechaNac] = useState('');
  const [formSexo, setFormSexo] = useState('');
  const [formParentesco, setFormParentesco] = useState('');

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

  const handleDelete = (id: string) => {
    setFamiliares(familiares.filter((f) => f.id !== id));
    setActiveMenuId(null);
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

        {/* Filter parentesco */}
        <div className="flex items-center gap-3">
          <select
            value={filterParentesco}
            onChange={(e) => setFilterParentesco(e.target.value)}
            className="h-[40px] px-3.5 pr-8 rounded-[8px] border border-[#cbd5e1] text-[13px] font-bold text-black bg-white cursor-pointer focus:outline-none focus:border-[#d50475]"
          >
            <option value="todos">Todos los parentescos</option>
            <option value="Cónyuge">Cónyuge</option>
            <option value="Hijo/a">Hijo/a</option>
            <option value="Madre / Padre">Madre / Padre</option>
            <option value="Hermano/a">Hermano/a</option>
          </select>
        </div>
      </div>

      {/* Tabla de familiares estilo Ever Health */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                <th className="py-3 px-4">Familiar</th>
                <th className="py-3 px-4">Parentesco</th>
                <th className="py-3 px-4">Fecha de Nacimiento</th>
                <th className="py-3 px-4">Edad</th>
                <th className="py-3 px-4">Sexo al nacer</th>
                <th className="py-3 px-4">Tutor / Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9] text-[14px] text-black">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#64748b]">
                    No se encontraron familiares registrados.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-4">
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

                    <td className="py-3.5 px-4 font-medium text-[#475569]">
                      {item.parentesco}
                    </td>

                    <td className="py-3.5 px-4 text-[#64748b]">
                      {item.fechaNacimiento}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-black">
                      {item.edad} años
                    </td>

                    <td className="py-3.5 px-4 text-[#475569]">
                      {item.sexo}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.edad < 18 ? (
                        <div className="flex flex-col">
                          <Badge variant="confirmada">Menor a cargo</Badge>
                          <span className="text-[11px] text-[#64748b] mt-0.5">
                            {item.tutorAsignado || 'Tutor: Titular'}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="disponible">Adulto</Badge>
                      )}
                    </td>

                    {/* Acciones Dropdown */}
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

                        {/* Dropdown de Acciones sin iconos pero con separadores */}
                        {activeMenuId === item.id && (
                          <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[200px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col text-left">
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Consultar historial de ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black text-left transition-colors cursor-pointer"
                            >
                              Ver historial clínico
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Solicitar cita para ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black text-left transition-colors cursor-pointer"
                            >
                              Pedir cita para este familiar
                            </button>

                            {/* Separador */}
                            <div className="w-full h-[1px] bg-[#f1f5f9] my-1" />

                            <button
                              type="button"
                              onClick={() => {
                                alert(`Editar datos de ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black text-left transition-colors cursor-pointer"
                            >
                              Editar datos
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#fef2f2] text-[13px] font-normal text-[#ef4444] text-left transition-colors cursor-pointer"
                            >
                              Eliminar familiar
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
        <div className="p-4 bg-white border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#64748b]">
          <span>Mostrando {filtered.length} de {familiares.length} familiares</span>

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

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    ¿Qué sexo te asignaron al nacer?
                  </label>
                  <select
                    value={formSexo}
                    onChange={(e) => setFormSexo(e.target.value)}
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="No especificado">No especificado</option>
                  </select>
                </div>
              </div>

              {/* Fila 3: Parentesco */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-black">
                  Parentesco
                </label>
                <select
                  value={formParentesco}
                  onChange={(e) => setFormParentesco(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                >
                  <option value="">Selecciona el parentesco</option>
                  <option value="Cónyuge">Cónyuge</option>
                  <option value="Hijo/a">Hijo/a</option>
                  <option value="Madre / Padre">Madre / Padre</option>
                  <option value="Hermano/a">Hermano/a</option>
                  <option value="Otro">Otro</option>
                </select>
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

    </div>
  );
};
