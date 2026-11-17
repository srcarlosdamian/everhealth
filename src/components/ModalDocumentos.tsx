import React, { useState, useRef } from 'react';
import {
  X,
  FileText,
  Activity,
  Image as ImageIcon,
  Brain,
  Utensils,
  Target,
  Folder,
  Download,
  Trash2,
  Check,
} from 'lucide-react';

interface ModalDocumentosProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttachedFile {
  id: string;
  name: string;
  date: string;
  url?: string;
}

interface CategoryDoc {
  id: string;
  title: string;
  desc: string;
  maxSize: string;
  icon: React.ReactNode;
  files: AttachedFile[];
}

export const ModalDocumentos: React.FC<ModalDocumentosProps> = ({ isOpen, onClose }) => {
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'informes-medicos': true, // Abierto por defecto con fff.png y ggg.png
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetCategory, setTargetCategory] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryDoc[]>([
    {
      id: 'informes-medicos',
      title: 'Informes médicos',
      desc: 'Informes de especialistas que consideres de relevancia',
      maxSize: 'Máx.100Mb',
      icon: <FileText className="w-5 h-5 text-[#64748b]" />,
      files: [
        { id: 'f-1', name: 'fff.png', date: '13/10/2026' },
        { id: 'f-2', name: 'ggg.png', date: '13/10/2026' },
      ],
    },
    {
      id: 'analiticas',
      title: 'Analíticas',
      desc: 'Análisis de sangre u orina',
      maxSize: 'Máx.100Mb',
      icon: <Activity className="w-5 h-5 text-[#64748b]" />,
      files: [],
    },
    {
      id: 'imagenes-radiologicas',
      title: 'Imágenes radiológicas',
      desc: 'Radiografías, resonancias o diferentes pruebas de imagen',
      maxSize: 'Máx.100Mb',
      icon: <ImageIcon className="w-5 h-5 text-[#64748b]" />,
      files: [],
    },
    {
      id: 'psicologia-sanitaria',
      title: 'Psicología sanitaria',
      desc: 'Informes y test realizados',
      maxSize: 'Máx.100Mb',
      icon: <Brain className="w-5 h-5 text-[#64748b]" />,
      files: [],
    },
    {
      id: 'nutricion',
      title: 'Nutrición',
      desc: 'Informes y pautas nutricionales',
      maxSize: 'Máx.100Mb',
      icon: <Utensils className="w-5 h-5 text-[#64748b]" />,
      files: [],
    },
    {
      id: 'coaching',
      title: 'Coaching',
      desc: 'Pruebas y tareas realizadas',
      maxSize: 'Máx.100Mb',
      icon: <Target className="w-5 h-5 text-[#64748b]" />,
      files: [],
    },
    {
      id: 'otros-documentos',
      title: 'Otros documentos',
      desc: 'Electrocardiogramas, espirometrías u otras pruebas médicas de interés',
      maxSize: 'Máx.100Mb',
      icon: <Folder className="w-5 h-5 text-[#64748b]" />,
      files: [],
    },
  ]);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleTriggerUpload = (catId: string) => {
    setTargetCategory(catId);
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && targetCategory) {
      const file = files[0];
      const today = new Date();
      const dateFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(
        today.getMonth() + 1
      ).padStart(2, '0')}/${today.getFullYear()}`;

      const newFile: AttachedFile = {
        id: `f-${Date.now()}`,
        name: file.name,
        date: dateFormatted,
      };

      setCategories((prev) =>
        prev.map((c) =>
          c.id === targetCategory
            ? { ...c, files: [...c.files, newFile] }
            : c
        )
      );

      // Asegurar que la categoría quede desplegada
      setOpenCategories((prev) => ({ ...prev, [targetCategory]: true }));
      showFeedback(`Archivo "${file.name}" subido con éxito.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteFile = (catId: string, fileId: string, fileName: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, files: c.files.filter((f) => f.id !== fileId) }
          : c
      )
    );
    showFeedback(`Archivo "${fileName}" eliminado.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn font-[family-name:Helvetica]">
      {/* File input invisible */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx"
      />

      {/* Contenedor del Modal con tamaño amplio según lo solicitado */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[12px] shadow-2xl border border-[#e2e8f0] w-full max-w-[800px] max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp"
      >
        {/* Cabecera del Modal */}
        <div className="px-6 py-5 border-b border-[#e2e8f0] flex items-start justify-between gap-4 shrink-0 bg-white">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight leading-snug">
              Sube y visualiza archivos relevantes sobre tu historial médico
            </h2>
            <p className="text-[13px] text-[#64748b] leading-tight">
              Máx. 100Mb. Formatos permitidos: PDF, JPG, JPEG, PNG, DOC, DOCX, XLSX
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer shrink-0 -mr-1 -mt-1"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notificación flotante / feedback */}
        {feedbackMsg && (
          <div className="mx-6 mt-4 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[8px] text-[13px] font-medium flex items-center gap-2 animate-fadeIn shrink-0">
            <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Lista de categorías de documentos con scroll vertical */}
        <div className="px-6 py-6 overflow-y-auto flex-1 flex flex-col gap-4">
          {categories.map((cat) => {
            const hasFiles = cat.files.length > 0;
            const isFilesOpen = openCategories[cat.id];

            return (
              <div
                key={cat.id}
                className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 flex flex-col gap-3 shadow-xs hover:border-[#cbd5e1] transition-all"
              >
                {/* Fila superior: Ícono + Título + Descripción */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-[16px] font-bold text-black leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[13px] text-[#475569] leading-snug">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Fila de Botones: Subir documento y Ocultar/Ver documentos */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleTriggerUpload(cat.id)}
                    className="h-[36px] px-5 rounded-full bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[13px] font-medium transition-colors cursor-pointer select-none"
                  >
                    Subir documento
                  </button>

                  {hasFiles && (
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className="h-[36px] px-5 rounded-full bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white text-[13px] font-medium transition-colors cursor-pointer select-none"
                    >
                      {isFilesOpen ? 'Ocultar documentos' : 'Ver documentos'}
                    </button>
                  )}
                </div>

                {/* Nota de tamaño máximo */}
                <span className="text-[11px] text-[#94a3b8] leading-none">
                  {cat.maxSize}
                </span>

                {/* Lista de archivos adjuntos (desplegada) */}
                {hasFiles && isFilesOpen && (
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-3 flex flex-col gap-2 mt-1">
                    {cat.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-3 text-[13px] py-1 px-2 rounded-[6px] hover:bg-white transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            onClick={() =>
                              showFeedback(`Descargando archivo "${file.name}"...`)
                            }
                            className="text-[#2563eb] hover:underline font-medium cursor-pointer truncate"
                            title="Haz clic para descargar"
                          >
                            {file.name}
                          </span>
                          <span className="text-[#64748b] shrink-0 font-normal">
                            ({file.date})
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              showFeedback(`Descargando archivo "${file.name}"...`)
                            }
                            className="p-1 rounded-[4px] text-[#64748b] hover:text-black hover:bg-[#e2e8f0] transition-colors cursor-pointer"
                            title="Descargar"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteFile(cat.id, file.id, file.name)
                            }
                            className="p-1 rounded-[4px] text-[#ef4444] hover:text-[#b91c1c] hover:bg-[#fee2e2] transition-colors cursor-pointer"
                            title="Eliminar archivo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pie del Modal */}
        <div className="px-6 py-4 border-t border-[#e2e8f0] flex items-center justify-end bg-[#f8fafc]">
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] px-6 rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[14px] font-medium transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
