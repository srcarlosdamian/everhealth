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
  Edit2,
  Trash2,
} from 'lucide-react';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { ColorPickerDropdown } from '../design-system/atoms/ColorPickerDropdown';
import { ActionMenu } from '../design-system/molecules/ActionMenu';
import { ConfirmDeactivateModal } from '../design-system/molecules/ConfirmDeactivateModal';

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
      sexo: (formSexo as 'Femenino' | 'Masculino') || 'Femenino',
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
            <PawPrint className="w-6 h-6 text-[#64748b]" />
          </div>
          <p className="text-[14px] leading-[22px] text-[#475569]">
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

      {/* Tabla de mascotas */}
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
                          className="absolute right-0 top-[calc(100%+4px)] z-30 w-[225px]"
                          items={[
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

        {/* Paginación */}
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
              className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-black font-bold text-[13px] bg-[#f1f5f9]"
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-[820px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 overflow-visible relative animate-scaleUp">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-[#64748b]" />
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
