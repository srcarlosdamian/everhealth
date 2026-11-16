import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Search,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Download,
  FileText,
  Check,
} from 'lucide-react';

interface ModalDocumentosProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DocItem {
  id: number;
  file: string;
  name: string;
}

export const ModalDocumentos: React.FC<ModalDocumentosProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [menuOpenDocId, setMenuOpenDocId] = useState<number | string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [docs, setDocs] = useState<DocItem[]>([
    { id: 1, file: 'analitica_sangre_oct2026.pdf', name: 'Analítica general y bioquímica' },
    { id: 2, file: 'ecografia_tiroidea.jpg', name: 'Valoración médica preoperatoria' },
    { id: 3, file: 'electrocardiograma_control.pdf', name: 'Electrocardiograma basal en reposo' },
    { id: 4, file: 'informe_oftalmologico.pdf', name: 'Revisión oftalmológica y agudeza visual' },
    { id: 5, file: 'receta_tratamiento_alergia.pdf', name: 'Pauta tratamiento antihistamínico' },
  ]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenDocId(null);
      }
    };
    if (menuOpenDocId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpenDocId]);

  if (!isOpen) return null;

  // Filtrado de documentos por nombre de archivo o título
  const filteredDocs = docs.filter(
    (doc) =>
      doc.file.toLowerCase().includes(search.toLowerCase()) ||
      doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNameChange = (id: number, newName: string) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, name: newName } : d)));
  };

  const handleDelete = (id: number, fileName: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    setMenuOpenDocId(null);
    setFeedbackMsg(`"${fileName}" ha sido eliminado`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleDownload = (fileName: string) => {
    setMenuOpenDocId(null);
    setFeedbackMsg(`Descargando "${fileName}"...`);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const newDoc: DocItem = {
        id: Date.now(),
        file: file.name,
        name: baseName,
      };
      setDocs((prev) => [newDoc, ...prev]);
      setFeedbackMsg(`Archivo "${file.name}" añadido`);
      setTimeout(() => setFeedbackMsg(null), 3000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[780px] bg-white rounded-[14px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto font-[family-name:Helvetica] cursor-default"
      >
        {/* Input file invisible */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <div>
            <h2 className="text-[22px] leading-[28px] font-bold text-black tracking-tight">
              Documentos - Informes médicos
            </h2>
            <p className="text-[13px] text-[#64748b] mt-0.5">
              Gestiona, sube o elimina tu documentación clínica adjunta.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback alert toast */}
        {feedbackMsg && (
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[8px] text-[13px] font-medium flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar documentos por nombre o archivo..."
            className="w-full h-[42px] pl-10 pr-4 rounded-[8px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475] transition-colors"
          />
        </div>

        {/* Archivos section header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-bold text-black">Archivos adjuntos</h3>
            <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569]">
              {docs.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-[36px] px-4 rounded-[6px] border border-[#d50475] text-[#d50475] hover:bg-[#fdf2f8] text-[13px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Subir documento</span>
          </button>
        </div>

        {/* Documents Table en Desktop / Cards en Mobile */}
        <div className="border border-[#e2e8f0] rounded-[10px] overflow-visible bg-white">
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0]">
              <tr>
                <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[11px]">
                  DOCUMENTO
                </th>
                <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[11px]">
                  NOMBRE PERSONALIZADO*
                </th>
                <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[11px] text-right">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-[#64748b]">
                    {search ? (
                      <div>
                        No se encontraron documentos para &quot;
                        <span className="font-semibold text-black">{search}</span>&quot;.
                      </div>
                    ) : (
                      <div>No tienes documentos adjuntos. Haz clic en &quot;Subir documento&quot;.</div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc, idx) => {
                  const isMenuOpen = menuOpenDocId === doc.id;
                  const isLastRow = idx === filteredDocs.length - 1 && filteredDocs.length > 2;

                  return (
                    <tr key={doc.id} className="hover:bg-[#f8fafc]/70 transition-colors">
                      <td className="py-3 px-4 font-medium text-[#334155] max-w-[220px]">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#94a3b8] shrink-0" />
                          <span className="truncate" title={doc.file}>
                            {doc.file}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          value={doc.name}
                          onChange={(e) => handleNameChange(doc.id, e.target.value)}
                          placeholder="Nombre descriptivo del archivo *"
                          className="w-full h-[36px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#d50475] transition-colors"
                        />
                      </td>
                      <td className="py-3 px-4 text-right relative">
                        <div className="inline-block relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenDocId(isMenuOpen ? null : doc.id);
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                              isMenuOpen
                                ? 'bg-[#f1f5f9] text-black ring-1 ring-[#cbd5e1]'
                                : 'text-[#64748b] hover:text-black hover:bg-[#f1f5f9]'
                            }`}
                            title="Opciones de archivo"
                            aria-label="Opciones de archivo"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Menú de opciones desplegable */}
                          {isMenuOpen && (
                            <div
                              ref={menuRef}
                              className={`absolute right-0 ${
                                isLastRow ? 'bottom-full mb-1' : 'top-full mt-1'
                              } w-[190px] bg-white rounded-[10px] shadow-xl border border-[#e2e8f0] py-1.5 z-50 animate-fadeIn text-left`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => handleDownload(doc.file)}
                                className="w-full px-3.5 py-2 text-[13px] font-medium text-[#334155] hover:bg-[#f8fafc] hover:text-black flex items-center gap-2.5 transition-colors cursor-pointer"
                              >
                                <Download className="w-4 h-4 text-[#64748b]" />
                                <span>Descargar archivo</span>
                              </button>

                              <div className="h-[1px] bg-[#f1f5f9] my-1" />

                              <button
                                type="button"
                                onClick={() => handleDelete(doc.id, doc.file)}
                                className="w-full px-3.5 py-2 text-[13px] font-bold text-[#ef4444] hover:bg-[#fef2f2] flex items-center gap-2.5 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-[#ef4444]" />
                                <span>Eliminar</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>

          {/* VISTA MOBILE: CARDS TIPO TABLA CON DISEÑO HOMOLOGADO */}
          <div className="block sm:hidden divide-y divide-[#f1f5f9] bg-white">
            {filteredDocs.length === 0 ? (
              <div className="py-8 text-center text-[#64748b] text-[13px] p-4">
                {search ? (
                  <div>No se encontraron documentos para &quot;<span className="font-semibold text-black">{search}</span>&quot;.</div>
                ) : (
                  <div>No tienes documentos adjuntos. Haz clic en &quot;Subir documento&quot;.</div>
                )}
              </div>
            ) : (
              filteredDocs.map((doc) => {
                const isMenuOpen = menuOpenDocId === `mobile-${doc.id}`;
                return (
                  <div key={doc.id} className="p-3.5 flex flex-col gap-2.5 bg-white hover:bg-[#f8fafc]/70 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <FileText className="w-4 h-4 text-[#94a3b8] shrink-0" />
                        <span className="truncate font-medium text-[13px] text-[#334155]" title={doc.file}>
                          {doc.file}
                        </span>
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenDocId(isMenuOpen ? null : `mobile-${doc.id}`);
                          }}
                          className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer"
                          title="Opciones"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {isMenuOpen && (
                          <div
                            ref={menuRef}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-[calc(100%+4px)] z-50 w-[190px] bg-white rounded-[10px] shadow-xl border border-[#e2e8f0] py-1.5 animate-scaleUp font-[family-name:Helvetica]"
                          >
                            <button
                              type="button"
                              onClick={() => handleDownload(doc.file)}
                              className="w-full px-3.5 py-2 text-[13px] font-medium text-[#334155] hover:bg-[#f8fafc] hover:text-black flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <Download className="w-4 h-4 text-[#64748b]" />
                              <span>Descargar archivo</span>
                            </button>
                            <div className="h-[1px] bg-[#f1f5f9] my-1" />
                            <button
                              type="button"
                              onClick={() => handleDelete(doc.id, doc.file)}
                              className="w-full px-3.5 py-2 text-[13px] font-bold text-[#ef4444] hover:bg-[#fef2f2] flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 text-[#ef4444]" />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Nombre personalizado*</span>
                      <input
                        type="text"
                        value={doc.name}
                        onChange={(e) => handleNameChange(doc.id, e.target.value)}
                        placeholder="Nombre descriptivo del archivo *"
                        className="w-full h-[36px] px-3 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#d50475] transition-colors"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#64748b] pt-1">
          <span>
            Mostrando {filteredDocs.length} de {docs.length} documentos
          </span>
          <div className="inline-flex items-center rounded-[6px] border border-[#e2e8f0] overflow-hidden">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0] text-[#64748b]"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0] text-[#64748b]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center font-bold text-black bg-[#f1f5f9] border-r border-[#e2e8f0]"
            >
              1
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0] text-[#64748b]"
            >
              2
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0] text-[#64748b]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] text-[#64748b]"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#e2e8f0]">
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] px-5 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] bg-white text-[13px] font-bold uppercase text-black transition-colors cursor-pointer"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] px-6 rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase transition-colors cursor-pointer shadow-xs"
          >
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    </div>
  );
};
