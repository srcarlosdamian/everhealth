import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../atoms/Button';

interface ConfirmDeactivateModalProps {
  isOpen?: boolean;
  inlinePreview?: boolean;
  title?: string;
  entityName: string;
  descriptionPrefix?: string;
  descriptionSuffix?: string;
  consequenceNote?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDeactivateModal: React.FC<ConfirmDeactivateModalProps> = ({
  isOpen = true,
  inlinePreview = false,
  title = '¿Estás seguro que quieres dar de baja?',
  entityName,
  descriptionPrefix = 'Esta acción dará de baja a',
  descriptionSuffix = 'de tu unidad familiar.',
  consequenceNote = 'Ya no podrás solicitar consultas, gestionar tutores ni acceder a su historial médico compartido.',
  cancelText = 'CANCELAR',
  confirmText = 'DAR DE BAJA',
  onCancel,
  onConfirm,
}) => {
  if (!isOpen && !inlinePreview) return null;

  const dialogContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[480px] bg-white rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-6 sm:p-7 border border-[#e2e8f0] flex flex-col gap-4 cursor-default font-[family-name:Helvetica]"
    >
      {/* Header alineado con la X y con línea divisoria abajo */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
        <h3 className="text-[18px] sm:text-[19px] font-bold text-black tracking-tight leading-snug">
          {title}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0"
          title="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Descripción clara y directa como texto (sin recuadro de help text ni icono) */}
      <div className="flex flex-col gap-2 pt-1 text-[14px] leading-[22px] text-black font-normal">
        <p>
          {descriptionPrefix}{' '}
          <strong className="text-black font-bold">{entityName}</strong>{' '}
          {descriptionSuffix}
        </p>
        {consequenceNote && (
          <p className="text-[#475569]">
            {consequenceNote}
          </p>
        )}
      </div>

      {/* Botones de acción homologados: mismo peso, misma altura (40px) y mayúsculas */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f5f9]">
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
        >
          {cancelText}
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-xs"
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );

  if (inlinePreview) {
    return dialogContent;
  }

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
    >
      {dialogContent}
    </div>
  );
};
