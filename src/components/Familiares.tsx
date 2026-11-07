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
  Trash2,
  Edit2,
  Calendar,
  FileText,
} from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';
import { TablePagination } from '../design-system/molecules/TablePagination';

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

  // Modal Confirmación Dar de baja
  const [familiarToDelete, setFamiliarToDelete] = useState<Familiar | null>(null);

  // Form states
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

        <Button
          variant="primary"
          onClick={handleOpenModal}
          className="h-[40px] px-[14px] self-start sm:self-auto"
        >
          <Plus className="w-[18px] h-[18px] text-white stroke-[2.5]" />
          <span>Añadir familiar</span>
        </Button>
      </div>

      {/* Filter Row: Search Input + Parentesco filter dropdown */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre, apellidos, parentesco..."
          leftIcon={<Search className="w-5 h-5" />}
          containerClassName="flex-1 max-w-[480px]"
        />

        <div className="w-full sm:w-[240px]">
          <Dropdown
            value={filterParentesco}
            onChange={setFilterParentesco}
            options={[
              { value: 'todos', label: 'Todos los parentescos' },
              { value: 'Cónyuge', label: 'Cónyuge' },
              { value: 'Hijo/a', label: 'Hijo/a' },
              { value: 'Madre / Padre', label: 'Madre / Padre' },
              { value: 'Hermano/a', label: 'Hermano/a' },
            ]}
          />
        </div>
      </div>

      {/* Tabla de familiares */}
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
                      <span className="font-bold text-black">
                        {item.nombre} {item.apellidos}
                      </span>
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

                      {activeMenuId === item.id && (
                        <ActionMenu
                          variant="standard"
                          className="absolute right-0 top-[calc(100%+4px)] z-50 w-[235px]"
                          items={[
                            {
                              id: 'historial',
                              label: 'Ver historial clínico',
                              icon: <FileText className="w-5 h-5" />,
                              onClick: () => {
                                alert(`Consultar historial de ${item.nombre}`);
                                setActiveMenuId(null);
                              },
                            },
                            {
                              id: 'cita',
                              label: 'Pedir cita médica',
                              icon: <Calendar className="w-5 h-5" />,
                              onClick: () => {
                                alert(`Solicitar cita para ${item.nombre}`);
                                setActiveMenuId(null);
                              },
                            },
                            {
                              id: 'editar',
                              label: 'Editar datos',
                              icon: <Edit2 className="w-5 h-5" />,
                              onClick: () => {
                                alert(`Editar datos de ${item.nombre}`);
                                setActiveMenuId(null);
                              },
                            },
                            {
                              id: 'baja',
                              label: 'Dar de baja familiar',
                              icon: <Trash2 className="w-5 h-5" />,
                              onClick: () => {
                                setFamiliarToDelete(item);
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

        {/* Paginación */}
        <TablePagination
          visibleCount={filtered.length}
          totalCount={familiares.length}
          entityLabel="familiares"
        />
      </div>

      {/* ================= MODAL AÑADIR FAMILIAR ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-[800px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
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

            <form onSubmit={handleSaveFamiliar} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Nombre*"
                  required
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  placeholder="Nombre del familiar"
                />
                <TextInput
                  label="Apellidos*"
                  required
                  value={formApellidos}
                  onChange={(e) => setFormApellidos(e.target.value)}
                  placeholder="Apellidos del familiar"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Fecha de nacimiento"
                  type="date"
                  value={formFechaNac}
                  onChange={(e) => setFormFechaNac(e.target.value)}
                />

                <Dropdown
                  label="¿Qué sexo te asignaron al nacer?"
                  value={formSexo}
                  onChange={setFormSexo}
                  placeholder="Selecciona una opción"
                  options={['Femenino', 'Masculino', 'No especificado']}
                />
              </div>

              <Dropdown
                label="Parentesco"
                value={formParentesco}
                onChange={setFormParentesco}
                placeholder="Selecciona el parentesco"
                options={['Cónyuge', 'Hijo/a', 'Madre / Padre', 'Hermano/a', 'Otro']}
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="h-[42px] px-5"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="h-[42px] px-7"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DAR DE BAJA FAMILIAR ================= */}
      {familiarToDelete && (
        <ConfirmDeactivateModal
          isOpen={!!familiarToDelete}
          entityName={`${familiarToDelete.nombre} ${familiarToDelete.apellidos}`}
          onCancel={() => setFamiliarToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};
