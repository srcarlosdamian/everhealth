import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AutosaveIndicatorProps {
  text?: string;
  className?: string;
}

export const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({
  text = 'Guardado',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#f1f5f9] text-[12px] font-medium text-[#1e293b] shrink-0 ${className}`}
    >
      <span>{text}</span>
      <CheckCircle2 className="w-4 h-4 text-[#1e293b] stroke-[2] shrink-0" />
    </div>
  );
};
