import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Search,
  Upload,
  Trash2,
  Download,
  FileText,
  Check,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreVertical,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Dropdown } from '../design-system/atoms/Dropdown';

interface ModalDocumentosProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DocumentItem {
  id: string | number;
  fileName: string;
  name: string;
  category: string;
  date: string;
  size?: string;
}

const CATEGORY_OPTIONS = [
  { value: 'Informes médicos', label: 'Informes médicos' },
  { value: 'Analíticas', label: 'Analíticas' },
  { value: 'Imágenes radiológicas', label: 'Imágenes radiológicas' },
  { value: 'Psicología sanitaria', label: 'Psicología sanitaria' },
  { value: 'Nutrición', label: 'Nutrición' },
  { value: 'Coaching', label: 'Coaching' },
  { value: 'Otros documentos', label: 'Otros documentos' },
];

export const ModalDocumentos: React.FC<ModalDocumentosProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [docs, setDocs] = useState<DocumentItem[]>([
    {
      id: 'doc-1',
      fileName: 'fff.png',
      name: 'Informe de especialista traumatología',
      category: 'Informes médicos',
      date: '13/10/2026',
    },
    {
      id: 'doc-2',
      fileName: 'ggg.png',
      name: 'Resumen clínico de derivación',
      category: 'Informes médicos',
      date: '13/10/2026',
    },
    {
      id: 'doc-3',
      fileName: 'analitica_sangre_oct2026.pdf',
      name: 'Analítica general y bioquímica completa',
      category: 'Analíticas',
      date: '13/10/2026',
    },
    {
      id: 'doc-4',
      fileName: 'ecografia_tiroidea.jpg',
      name: 'Ecografía tiroidea y valoración',
      category: 'Imágenes radiológicas',
      date: '10/10/2026',
    },
    {
      id: 'doc-5',
      fileName: 'electrocardiograma_control.pdf',
      name: 'Electrocardiograma basal en reposo',
      category: 'Otros documentos',
      date: '02/10/2026',
    },
  ]);

  // Close action menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        fileName: file.name,
        name: baseName,
        category: 'Informes médicos',
        date: new Date().toLocaleDateString('es-ES'),
      };
      setDocs((prev) => [newDoc, ...prev]);
      showToast(`Archivo "${file.name}" subido correctamente.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string | number, name: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    setActiveMenuId(null);
    showToast(`"${name}" ha sido eliminado.`);
  };

  const handleDownload = (fileName: string) => {
    setActiveMenuId(null);
    showToast(`Descargando "${fileName}"...`);
  };

  const filteredDocs = docs.filter(
    (doc) =>
      doc.fileName.toLowerCase().includes(search.toLowerCase()) ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[880px] bg-white rounded-[14px] shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[92vh] overflow-y-auto custom-scrollbar-minimal cursor-default animate-scaleUp"
      >
        {/* Input file invisible para el subidor unificado */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />

        {/* Header del Modal */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
          <div className="flex flex-col">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug">
              Documentos - Informes médicos
            </h2>
            <p className="text-[13px] text-[#64748b] mt-0.5">
              Gestiona, sube o elimina tu documentación clínica adjunta organizada por tipo.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0"
            title="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Banner */}
        {feedbackMsg && (
          <div className="p-3 rounded-[8px] bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-[13px] font-medium flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#166534]" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Toolbar: Buscador a la izquierda + Único botón de SUBIR DOCUMENTO a la derecha */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-[420px]">
            <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, archivo o categoría..."
              className="w-full h-[40px] pl-9 pr-4 rounded-[8px] border border-[#cbd5e1] hover:border-black focus:border-black text-[13px] text-black placeholder:text-[#94a3b8] focus:outline-none transition-colors"
            />
          </div>

          <Button
            variant="primary"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-[40px] px-5 text-[13px] font-bold uppercase shrink-0"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>SUBIR DOCUMENTO</span>
          </Button>
        </div>

        {/* TABLA OFICIAL HOMOLOGADA DE DOCUMENTOS (más compacta y limpia) */}
        <div className="w-full border border-[#e2e8f0] rounded-none overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-white border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-black">
                <th className="py-2.5 px-3 border-r border-[#e2e8f0]">ARCHIVO ADJUNTO</th>
                <th className="py-2.5 px-3 border-r border-[#e2e8f0] min-w-[190px]">CATEGORÍA / TIPO</th>
                <th className="py-2.5 px-3 border-r border-[#e2e8f0]">NOMBRE *</th>
                <th className="py-2.5 px-3 border-r border-[#e2e8f0] whitespace-nowrap">FECHA</th>
                <th className="py-2.5 px-3 text-right w-[76px]">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] text-[13px] text-black">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#64748b]">
                    No se encontraron documentos registrados.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc, idx) => {
                  const isLastRow = idx >= filteredDocs.length - 2;
                  return (
                    <tr key={doc.id} className="hover:bg-[#f8fafc] transition-colors">
                      {/* Archivo adjunto */}
                      <td className="py-2 px-3 border-r border-[#e2e8f0]">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#64748b] shrink-0" />
                          <span className="font-semibold text-black truncate max-w-[150px] text-[12px]">
                            {doc.fileName}
                          </span>
                        </div>
                      </td>

                      {/* Dropdown de Categoría oficial de 7 tipos */}
                      <td className="py-1.5 px-2.5 border-r border-[#e2e8f0]">
                        <Dropdown
                          size="sm"
                          options={CATEGORY_OPTIONS}
                          value={doc.category}
                          onChange={(val) => {
                            setDocs((prev) =>
                              prev.map((d) => (d.id === doc.id ? { ...d, category: val } : d))
                            );
                            showToast(`Categoría actualizada a "${val}"`);
                          }}
                          placeholder="Seleccionar categoría"
                          dropUp={isLastRow}
                        />
                      </td>

                      {/* Nombre descriptivo editable compacto */}
                      <td className="py-1.5 px-2.5 border-r border-[#e2e8f0]">
                        <input
                          type="text"
                          value={doc.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDocs((prev) =>
                              prev.map((d) => (d.id === doc.id ? { ...d, name: val } : d))
                            );
                          }}
                          placeholder="Nombre del documento..."
                          className="w-full h-[32px] px-2 rounded-[6px] border border-[#cbd5e1] hover:border-black focus:border-black text-[12px] text-black focus:outline-none transition-colors"
                        />
                      </td>

                      {/* Fecha */}
                      <td className="py-2 px-3 border-r border-[#e2e8f0] text-[#64748b] whitespace-nowrap text-[12px]">
                        {doc.date}
                      </td>

                      {/* Acciones */}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleDownload(doc.fileName)}
                            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
                            title="Descargar"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(doc.id, doc.name)}
                            className="w-8 h-8 rounded-full hover:bg-[#fef2f2] flex items-center justify-center text-[#ef4444] cursor-pointer transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#64748b] pt-1">
          <span>
            Mostrando {filteredDocs.length} de {docs.length} documentos
          </span>
          <div className="inline-flex items-center rounded-[6px] border border-[#e2e8f0] overflow-hidden">
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
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] text-[#64748b]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#e2e8f0]">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
          >
            CANCELAR
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={onClose}
          >
            GUARDAR CAMBIOS
          </Button>
        </div>
      </div>
    </div>
  );
};
