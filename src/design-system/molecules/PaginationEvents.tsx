import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationEventsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export const PaginationEvents: React.FC<PaginationEventsProps> = ({
  currentIndex,
  total,
  onNext,
  onPrev,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between pt-4 border-t border-[#f1f5f9] ${className}`}>
      {/* Left: 1 de 3 eventos */}
      <span className="text-[13px] font-bold text-[#475569]">
        {currentIndex + 1} de {total} eventos
      </span>

      {/* Right: linear buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`h-[30px] px-3 rounded-[6px] border text-[12px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            currentIndex === 0
              ? 'border-[#e2e8f0] text-[#cbd5e1] cursor-not-allowed bg-[#f8fafc]'
              : 'border-[#cbd5e1] text-black hover:border-black bg-white hover:bg-[#f8fafc]'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Anterior</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex >= total - 1}
          className={`h-[30px] px-3 rounded-[6px] border text-[12px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            currentIndex >= total - 1
              ? 'border-[#e2e8f0] text-[#cbd5e1] cursor-not-allowed bg-[#f8fafc]'
              : 'border-[#cbd5e1] text-black hover:border-black bg-white hover:bg-[#f8fafc]'
          }`}
        >
          <span>Siguiente</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
