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
  PawPrint,
  Heart,
  Calendar,
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

  // Dropdown action row open
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
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica]">
      
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
            placeholder="Buscar por nombre, raza, responsable o chip..."
            className="w-full h-[40px] pl-10 pr-4 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] transition-colors"
          />
        </div>

        {/* Filter Especie */}
        <div className="flex items-center gap-3">
          <select
            value={filterEspecie}
            onChange={(e) => setFilterEspecie(e.target.value)}
            className="h-[40px] px-3.5 pr-8 rounded-[8px] border border-[#cbd5e1] text-[13px] font-bold text-black bg-white cursor-pointer focus:outline-none focus:border-[#d50475]"
          >
            <option value="todas">Todas las especies</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Roedores/Conejos">Roedores/Conejos</option>
            <option value="Aves">Aves</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
      </div>

      {/* Tabla de mascotas */}
      <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                <th className="py-3 px-4">Mascota</th>
                <th className="py-3 px-4">Especie / Raza</th>
                <th className="py-3 px-4">Fecha Nac. / Edad</th>
                <th className="py-3 px-4">Sexo</th>
                <th className="py-3 px-4">Condición</th>
                <th className="py-3 px-4">Familiar Responsable</th>
                <th className="py-3 px-4">Nº Chip</th>
                <th className="py-3 px-4 text-right">Acciones</th>
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
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#fce7f3] text-[#d50475] flex items-center justify-center shrink-0">
                          <PawPrint className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{item.nombre}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-black">{item.especie}</span>
                        <span className="text-[12px] text-[#64748b]">{item.raza}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-black">{item.edad}</span>
                        <span className="text-[12px] text-[#64748b]">{item.fechaNacimiento}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#475569]">
                      {item.sexo}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="disponible">{item.condicionCorporal}</Badge>
                    </td>

                    <td className="py-3.5 px-4 text-[#475569] font-medium">
                      {item.familiarRelacionado}
                    </td>

                    <td className="py-3.5 px-4 text-[12px] text-[#64748b] font-mono">
                      {item.numeroChip}
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

                        {/* Dropdown de Acciones con separador */}
                        {activeMenuId === item.id && (
                          <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[200px] bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-[6px] border-0 flex flex-col text-left">
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Consultar cartilla de ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black text-left transition-colors cursor-pointer"
                            >
                              Ver cartilla veterinaria
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Solicitar consulta veterinaria para ${item.nombre}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full h-[36px] px-[12px] rounded-[6px] hover:bg-[#f8fafc] text-[13px] font-normal text-black text-left transition-colors cursor-pointer"
                            >
                              Pedir consulta veterinaria
                            </button>

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
                              Eliminar mascota
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-[860px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 flex flex-col gap-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
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
                  <label className="text-[14px] font-medium text-black">
                    Nombre<span className="text-[#d50475]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    placeholder="Nombre de la mascota"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Especie<span className="text-[#d50475]">*</span>
                  </label>
                  <select
                    required
                    value={formEspecie}
                    onChange={(e) => setFormEspecie(e.target.value)}
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                  >
                    <option value="">Selecciona una especie</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Roedores/Conejos">Roedores/Conejos</option>
                    <option value="Aves">Aves</option>
                    <option value="Peces, anfibios y reptiles">Peces, anfibios y reptiles</option>
                    <option value="Equino">Equino</option>
                    <option value="Ovino">Ovino</option>
                    <option value="Porcino">Porcino</option>
                    <option value="Vacuno">Vacuno</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>

              {/* Fila 2: Fecha de nacimiento (Día*, Mes*, Año*) y Sexo* (según media_1793946467703_53fff81a.png) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Fecha de nacimiento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={formDia}
                      onChange={(e) => setFormDia(e.target.value)}
                      placeholder="Día*"
                      className="h-[44px] px-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                    <select
                      value={formMes}
                      onChange={(e) => setFormMes(e.target.value)}
                      className="h-[44px] px-2 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                    >
                      <option value="">Mes*</option>
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                    <input
                      type="number"
                      min="1990"
                      max="2026"
                      value={formAno}
                      onChange={(e) => setFormAno(e.target.value)}
                      placeholder="Año*"
                      className="h-[44px] px-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Sexo<span className="text-[#d50475]">*</span>
                  </label>
                  <select
                    required
                    value={formSexo}
                    onChange={(e) => setFormSexo(e.target.value as any)}
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                  >
                    <option value="">Selecciona sexo</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>
              </div>

              {/* Fila 3: Raza y Condición corporal* (según media_1793946475392_19a8d61a.png) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">Raza</label>
                  <input
                    type="text"
                    value={formRaza}
                    onChange={(e) => setFormRaza(e.target.value)}
                    placeholder="Raza de la mascota"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Condición corporal<span className="text-[#d50475]">*</span>
                  </label>
                  <select
                    required
                    value={formCondicion}
                    onChange={(e) => setFormCondicion(e.target.value)}
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                  >
                    <option value="">Selecciona condición</option>
                    <option value="Delgado">Delgado</option>
                    <option value="Muy delgado">Muy delgado</option>
                    <option value="Obesidad">Obesidad</option>
                    <option value="Peso Ideal">Peso Ideal</option>
                    <option value="Sobrepeso">Sobrepeso</option>
                  </select>
                </div>
              </div>

              {/* Fila 4: Color primario (#000000) y Color secundario (#000000) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">Color primario</label>
                  <div className="flex items-center gap-2 h-[44px] px-2 rounded-[6px] border border-[#cbd5e1]">
                    <input
                      type="color"
                      value={formColorPrimario}
                      onChange={(e) => setFormColorPrimario(e.target.value)}
                      className="w-10 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={formColorPrimario}
                      onChange={(e) => setFormColorPrimario(e.target.value)}
                      className="flex-1 text-[13px] font-mono text-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">Color secundario</label>
                  <div className="flex items-center gap-2 h-[44px] px-2 rounded-[6px] border border-[#cbd5e1]">
                    <input
                      type="color"
                      value={formColorSecundario}
                      onChange={(e) => setFormColorSecundario(e.target.value)}
                      className="w-10 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={formColorSecundario}
                      onChange={(e) => setFormColorSecundario(e.target.value)}
                      className="flex-1 text-[13px] font-mono text-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Fila 5: Relacionar con familiares (según media_1793946482916_2a382c0e.png) y Número de chip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Relacionar con familiares
                  </label>
                  <select
                    value={formFamiliar}
                    onChange={(e) => setFormFamiliar(e.target.value)}
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                  >
                    <option value="">Selecciona un familiar responsable</option>
                    <option value="Carlos Damian">Carlos Damian (Titular)</option>
                    <option value="Elena Ruiz Morales">Elena Ruiz Morales (Cónyuge)</option>
                    <option value="Mateo Damian Ruiz">Mateo Damian Ruiz (Hijo)</option>
                    <option value="Lucía Damian Ruiz">Lucía Damian Ruiz (Hija)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-black">
                    Número de chip
                  </label>
                  <input
                    type="text"
                    value={formChip}
                    onChange={(e) => setFormChip(e.target.value)}
                    placeholder="Ej. 985141002345678"
                    className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
              </div>

              {/* Botón Guardar rosa a ancho completo o destacado como en la captura */}
              <div className="pt-4 flex flex-col items-stretch gap-2">
                <button
                  type="submit"
                  className="w-full h-[46px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[15px] font-bold uppercase cursor-pointer transition-colors shadow-xs"
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
