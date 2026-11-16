import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface AutosaveIndicatorProps {
  status?: 'saved' | 'error';
  text?: string;
  className?: string;
}

export const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({
  status = 'saved',
  text,
  className = '',
}) => {
  const isError = status === 'error';
  const displayText = text || (isError ? 'Error de conexión... reintentando' : 'Guardado');

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[12px] leading-[16px] font-normal shrink-0 ${
        isError
          ? 'bg-[#fef9c3] text-[#1e293b]'
          : 'bg-[#f1f5f9] text-[#1e293b]'
      } ${className}`}
    >
      <span>{displayText}</span>
      {!isError && (
        <CheckCircle2 className="w-4 h-4 text-[#1e293b] stroke-[2] shrink-0" />
      )}
    </div>
  );
};
