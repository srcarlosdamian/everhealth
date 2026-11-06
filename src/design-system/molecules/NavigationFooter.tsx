import React from 'react';

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
 * Standard Step Navigation Footer matching Figma spec (media_1793943084780_8476d117.png):
 * - Light gray background (#f8fafc, gray-50)
 * - "Atrás" button: white background, subtle border, sentence case
 * - "Continuar" button: brand pink (#d50475), sentence case
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
          <button
            type="button"
            onClick={onBack}
            className="h-[38px] px-5 rounded-[8px] border border-[#cbd5e1] hover:border-[#475569] active:border-black bg-transparent text-[14px] leading-[20px] font-normal text-black transition-colors cursor-pointer select-none"
          >
            {backText}
          </button>
        ) : (
          <div />
        )}
      </div>

      <div>
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            // Prototipo: siempre permite continuar, aunque se vea bloqueado
            className={`h-[38px] px-6 rounded-[8px] text-[14px] leading-[20px] font-medium text-white transition-colors select-none cursor-pointer ${
              isNextDisabled
                ? 'bg-[#cbd5e1] hover:bg-[#94a3b8]'
                : 'bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d]'
            }`}
          >
            {nextText}
          </button>
        )}
      </div>
    </div>
  );
};
