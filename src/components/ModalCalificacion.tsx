import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';

interface ModalCalificacionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating?: (rating: number, comment?: string) => void;
}

export const ModalCalificacion: React.FC<ModalCalificacionProps> = ({
  isOpen,
  onClose,
  onSubmitRating,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(7);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDisplayRating = hoverRating !== null ? hoverRating : selectedRating;

  const handleSubmit = () => {
    if (selectedRating === null) return;
    if (onSubmitRating) {
      onSubmitRating(selectedRating, comment);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-calificacion-title"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] bg-white rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#e2e8f0] flex flex-col overflow-hidden animate-scaleUp cursor-default"
      >
        {/* ================= HEADER DEL MODAL ================= */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#f1f5f9] flex items-center justify-between gap-4 shrink-0 bg-white">
          <h2
            id="modal-calificacion-title"
            className="text-[18px] sm:text-[20px] font-bold text-black tracking-tight leading-tight"
          >
            Valora tu experiencia
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0 -mr-1"
            aria-label="Cerrar modal"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= BODY DEL MODAL ================= */}
        <div className="px-5 sm:px-6 py-5 flex flex-col gap-5">
          {/* Mensaje sutil de ahorro de CO2 */}
          <p className="text-[13px] text-[#64748b] text-center leading-normal">
            Gracias por confiar en Ever Health. Con esta consulta digital has ahorrado la emisión de 1,73 kg de CO₂.
          </p>

          {/* Pregunta principal y escala del 1 al 10 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[15px] font-bold text-black text-center">
              Del 1 al 10, ¿qué tanto recomendarías nuestro servicio?
            </span>

            <div className="flex items-center justify-between text-[11px] text-[#64748b] px-0.5">
              <span>1: Nada probable</span>
              <span>10: Muy probable</span>
            </div>

            <div className="flex items-center justify-between gap-1 sm:gap-1.5 pt-0.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isHighlighted = currentDisplayRating !== null && num <= currentDisplayRating;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedRating(num)}
                    onMouseEnter={() => setHoverRating(num)}
                    onMouseLeave={() => setHoverRating(null)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-[13px] sm:text-[14px] flex items-center justify-center transition-all cursor-pointer select-none ${
                      isHighlighted
                        ? 'bg-[#d50475] text-white shadow-xs'
                        : 'bg-white border border-[#cbd5e1] text-black hover:border-[#d50475] hover:text-[#d50475]'
                    }`}
                    title={`Puntuar con ${num} de 10`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comentario opcional */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="feedback-comment"
              className="text-[13px] font-bold text-black cursor-pointer"
            >
              Añadir un comentario <span className="font-normal text-[#64748b]">(opcional)</span>
            </label>
            <textarea
              id="feedback-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos qué podríamos mejorar o qué te gustó..."
              className="w-full p-3 rounded-[8px] border border-[#e2e8f0] focus:border-[#d50475] focus:ring-1 focus:ring-[#d50475] text-[14px] text-black placeholder:text-[#94a3b8] resize-none outline-none font-[family-name:Helvetica] transition-all bg-white"
            />
          </div>
        </div>

        {/* ================= FOOTER DEL MODAL ================= */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-[#f1f5f9] flex items-center justify-end gap-3 shrink-0 bg-white">
          <Button
            variant="outline"
            onClick={onClose}
          >
            CANCELAR
          </Button>
          <Button
            variant={selectedRating === null ? 'primary-blocked' : 'primary'}
            onClick={handleSubmit}
            disabled={selectedRating === null}
          >
            ENVIAR
          </Button>
        </div>
      </div>
    </div>
  );
};
