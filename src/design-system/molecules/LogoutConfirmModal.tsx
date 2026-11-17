import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button, ButtonVariant } from '../atoms/Button';

export interface LogoutConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: ButtonVariant;
  inlinePreview?: boolean;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  title = '¿Estás seguro de cerrar sesión?',
  description = 'Tendrás que volver a iniciar sesión para acceder a tu cuenta médica y tus consultas.',
  cancelText = 'CANCELAR',
  confirmText = 'CERRAR SESIÓN',
  confirmVariant = 'primary',
  inlinePreview = false,
}) => {
  // Manejo de la tecla Escape para cerrar el modal
  useEffect(() => {
    if (!isOpen || inlinePreview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inlinePreview, onCancel]);

  if (!isOpen && !inlinePreview) return null;

  const dialogContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[440px] bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-6 sm:p-7 border border-[#e2e8f0] flex flex-col gap-4 cursor-default font-[family-name:Helvetica] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      {/* Encabezado minimalista: título y botón cerrar circular */}
      <div className="flex items-start justify-between gap-3">
        <h3
          id="logout-modal-title"
          className="text-[19px] sm:text-[20px] font-bold text-black tracking-tight leading-snug"
        >
          {title}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0 -mr-1 -mt-1"
          title="Cerrar"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* Descripción clara y directa en color negro homologado */}
      <p className="text-[14px] leading-[22px] text-[var(--color-page-subtitle)] font-normal">
        {description}
      </p>

      {/* Acciones de pie: Cancelar y Cerrar Sesión homologados a 40px y mayúsculas */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f5f9]">
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
        >
          {cancelText}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
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
