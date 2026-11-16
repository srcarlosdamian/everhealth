import React from 'react';
import { Info, X } from 'lucide-react';
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
      className="w-full max-w-[480px] bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-6 sm:p-7 border border-[#e2e8f0] flex flex-col gap-4 cursor-default"
    >
      {/* Header sin icono inicial y botón cerrar circular */}
      <div className="flex items-start justify-between gap-3">
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

      {/* Descripción clara y destacada */}
      <p className="text-[14px] leading-[22px] text-[#475569]">
        {descriptionPrefix}{' '}
        <strong className="text-black font-bold">{entityName}</strong>{' '}
        {descriptionSuffix}
      </p>

      {/* Callout de consecuencia / aclaración con icono informativo */}
      {consequenceNote && (
        <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex items-start gap-2.5 text-[12.5px] text-[#475569] leading-[19px]">
          <Info className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
          <div>{consequenceNote}</div>
        </div>
      )}

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
