import React from 'react';

interface PaginationEventsProps {
  visibleCount: number;
  totalCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}

export const PaginationEvents: React.FC<PaginationEventsProps> = ({
  visibleCount,
  totalCount,
  isExpanded,
  onToggle,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-between pt-4 border-t border-[#f1f5f9] ${className}`}
    >
      <span className="text-[13px] font-bold text-[#475569]">
        {visibleCount} de {totalCount} eventos
      </span>

      <button
        type="button"
        onClick={onToggle}
        className="text-[13px] leading-[20px] font-bold text-black hover:underline cursor-pointer transition-colors"
      >
        {isExpanded ? 'Mostrar menos' : 'Cargar más'}
      </button>
    </div>
  );
};
