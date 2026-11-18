import React from 'react';
import { Button } from '../atoms/Button';

interface NavigationFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  backText?: string;
  nextText?: string;
  isNextDisabled?: boolean;
  className?: string;
  hideBack?: boolean;
}

/**
 * Standard Step Navigation Footer (Sistema de Diseño Everhealth):
 * - Altura homologada de 40px, esquinas cuadradas suaves de 8px, mismo peso (font-bold) y en mayúsculas.
 * - Botón "Atrás": variante outline con borde gris claro #cbd5e1 y texto negro.
 * - Botón "Continuar" / CTA: variante primario rosa #d50475 con texto blanco.
 */
export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  onBack,
  onNext,
  backText = 'Atrás',
  nextText = 'Continuar',
  isNextDisabled = false,
  className = '',
  hideBack = false,
}) => {
  return (
    <div
      className={`w-full bg-[#f8fafc] rounded-[8px] p-4 flex items-center justify-between gap-4 mt-6 ${className}`}
    >
      <div>
        {!hideBack && onBack ? (
          <Button
            variant="outline"
            onClick={onBack}
            className="h-[40px] px-5 text-[14px] font-medium rounded-[8px]"
          >
            {backText}
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div>
        {onNext && (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={isNextDisabled}
            tooltipText={isNextDisabled ? 'Completa los campos obligatorios' : undefined}
            className={`h-[40px] px-6 text-[14px] font-medium rounded-[8px] ${
              isNextDisabled ? 'opacity-50' : ''
            }`}
          >
            {nextText}
          </Button>
        )}
      </div>
    </div>
  );
};
