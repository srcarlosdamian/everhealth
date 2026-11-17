import React from 'react';
import { Button } from '../atoms/Button';

export interface ModalActionGroupProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'destructive' | 'secondary';
  isConfirmDisabled?: boolean;
  confirmTooltipText?: string;
  infoText?: React.ReactNode;
  extraAction?: React.ReactNode;
  className?: string;
}

export const ModalActionGroup: React.FC<ModalActionGroupProps> = ({
  onCancel,
  onConfirm,
  cancelText = 'CANCELAR',
  confirmText = 'CONFIRMAR',
  confirmVariant = 'primary',
  isConfirmDisabled = false,
  confirmTooltipText = 'Estado incompleto / bloqueado',
  infoText,
  extraAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f1f5f9] ${className}`}>
      {infoText ? (
        <div className="text-[12px] text-[#64748b]">
          {infoText}
        </div>
      ) : (
        <div />
      )}

      <div className="flex flex-wrap items-center gap-2.5">
        {extraAction}

        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
        )}

        {onConfirm && (
          <Button
            variant={isConfirmDisabled ? 'inactive' : confirmVariant}
            onClick={isConfirmDisabled ? undefined : onConfirm}
            tooltipText={isConfirmDisabled ? confirmTooltipText : undefined}
          >
            {confirmText}
          </Button>
        )}
      </div>
    </div>
  );
};
