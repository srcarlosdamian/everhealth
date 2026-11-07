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
  cancelText = 'Cancelar',
  confirmText = 'Dar de baja',
  onCancel,
  onConfirm,
}) => {
  if (!isOpen && !inlinePreview) return null;

  const dialogContent = (
    <div className="w-full max-w-[460px] bg-white rounded-[12px] shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-6 border border-[#e2e8f0] flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#f1f5f9]">
        <h3 className="text-[17px] font-bold text-black">{title}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="w-7 h-7 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[14px] leading-[20px] text-[#475569]">
        {descriptionPrefix}{' '}
        <strong className="text-black font-bold">{entityName}</strong>{' '}
        {descriptionSuffix}
      </p>
      {consequenceNote && (
        <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-[6px] text-[12px] text-[#64748b] leading-[18px]">
          {consequenceNote}
        </div>
      )}
      <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#f1f5f9]">
        <Button variant="outline" onClick={onCancel} className="h-[36px] px-3.5 text-[12px]">
          {cancelText}
        </Button>
        <Button variant="destructive" onClick={onConfirm} className="h-[36px] px-3.5 text-[12px]">
          {confirmText}
        </Button>
      </div>
    </div>
  );

  if (inlinePreview) {
    return dialogContent;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      {dialogContent}
    </div>
  );
};
