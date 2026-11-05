import React from 'react';
import { Check } from 'lucide-react';

interface StepperCheckProps {
  isCompleted?: boolean;
  hasConnectingLine?: boolean;
  stepNumber?: number;
  className?: string;
}

export const StepperCheck: React.FC<StepperCheckProps> = ({
  isCompleted = true,
  hasConnectingLine = false,
  stepNumber,
  className = '',
}) => {
  return (
    <div className={`relative flex flex-col items-center shrink-0 ${className}`}>
      {/* Circle: dark magenta 900 when completed (#70083a / #831843), border gray when incomplete */}
      <div
        className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all z-10 ${
          isCompleted
            ? 'bg-[#70083a] text-white shadow-xs'
            : 'border-2 border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
        }`}
      >
        {isCompleted ? (
          <Check className="w-[14px] h-[14px] stroke-[3]" />
        ) : (
          stepNumber && <span className="text-[11px] font-bold">{stepNumber}</span>
        )}
      </div>

      {/* Connecting Vertical Line */}
      {hasConnectingLine && (
        <div className="w-[2px] bg-[#e2e8f0] flex-1 min-h-[40px] my-1" />
      )}
    </div>
  );
};
