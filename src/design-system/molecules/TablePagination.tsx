import React from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface TablePaginationProps {
  currentPage?: number;
  totalPages?: number;
  visibleCount: number;
  totalCount: number;
  entityLabel?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  visibleCount,
  totalCount,
  entityLabel = 'entradas',
  onPageChange,
  className = '',
}) => {
  return (
    <div
      className={`p-4 bg-white border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#64748b] font-[family-name:Helvetica] ${className}`}
    >
      <span>
        Mostrando de 1 a {visibleCount} de {totalCount} {entityLabel}
      </span>

      <div className="inline-flex items-center border border-[#cbd5e1] rounded-[4px] overflow-hidden bg-white select-none">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(1)}
          className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
          title="Primera página"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
          title="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-black font-bold text-[13px] bg-[#f1f5f9]"
        >
          {currentPage}
        </button>

        {totalPages > 1 && (
          <button
            type="button"
            onClick={() => onPageChange?.(2)}
            className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] cursor-pointer transition-colors"
          >
            2
          </button>
        )}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="w-8 h-8 border-r border-[#cbd5e1] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
          title="Página siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(totalPages)}
          className="w-8 h-8 flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
          title="Última página"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
