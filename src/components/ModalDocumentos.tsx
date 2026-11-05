import React, { useState } from 'react';
import { X, Search, MoreVertical, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ModalDocumentosProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDocumentos: React.FC<ModalDocumentosProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState([
    { id: 1, file: 'nombre_documento.jpg', name: '' },
    { id: 2, file: 'nombre_documento.jpg', name: 'Valoración médica preoperatoria' },
    { id: 3, file: 'nombre_documento.jpg', name: '' },
    { id: 4, file: 'nombre_documento.jpg', name: '' },
    { id: 5, file: 'nombre_documento.jpg', name: '' },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-[760px] bg-white rounded-[12px] shadow-2xl p-6 sm:p-[28px] my-8 flex flex-col gap-[20px] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <h2 className="text-[22px] leading-[28px] font-bold text-black">
            Documentos - Informes médicos
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar documentos"
            className="w-full h-[42px] pl-10 pr-4 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
          />
        </div>

        {/* Archivos section header */}
        <div className="flex items-center justify-between pt-1">
          <h3 className="text-[18px] font-bold text-black">Archivos</h3>
          <button
            type="button"
            onClick={() => {
              setDocs([
                ...docs,
                { id: Date.now(), file: 'nuevo_documento.pdf', name: 'Nuevo informe clínico' },
              ]);
            }}
            className="h-[36px] px-4 rounded-[6px] border border-[#d50475] text-[#d50475] hover:bg-[#fdf2f8] text-[13px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Subir documento</span>
          </button>
        </div>

        {/* Documents Table matching EVR - 35 */}
        <div className="border border-[#e2e8f0] rounded-[8px] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0]">
              <tr>
                <th className="py-2.5 px-4 font-bold uppercase tracking-wider">DOCUMENTO</th>
                <th className="py-2.5 px-4 font-bold uppercase tracking-wider">NOMBRE*</th>
                <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {docs.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-[#f8fafc]/60">
                  <td className="py-3 px-4 font-medium text-[#334155]">{doc.file}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      defaultValue={doc.name}
                      placeholder="Nombre del archivo *"
                      className="w-full h-[36px] px-3 rounded-[5px] border border-[#cbd5e1] text-[13px] text-black focus:outline-none focus:border-[#d50475]"
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" className="text-[#64748b] hover:text-black">
                      <MoreVertical className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#64748b] pt-1">
          <span>Mostrando de 1 a 10 de 200 entradas</span>
          <div className="inline-flex items-center rounded-[6px] border border-[#e2e8f0] overflow-hidden">
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center font-bold text-black bg-[#f1f5f9] border-r border-[#e2e8f0]">
              1
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
              2
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
              4
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
              5
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] border-r border-[#e2e8f0]">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc]">
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#e2e8f0]">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] px-4 rounded-[6px] border border-[#cbd5e1] hover:bg-[#f8fafc] text-[13px] font-bold text-[#d50475] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] px-5 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold transition-colors cursor-pointer"
          >
            Actualizar documentos
          </button>
        </div>

      </div>
    </div>
  );
};
