import React, { useState, useEffect } from 'react';
import { X, Leaf, Send, Star, Check } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';

interface ModalCalificacionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating?: (rating: number, comment: string, tags: string[]) => void;
}

const FEEDBACK_TAGS = [
  '⏱️ Puntualidad y rapidez',
  '🩺 Claridad del especialista',
  '💬 Trato humano y cercano',
  '📱 Calidad de videollamada',
  '📄 Facilidad con las recetas',
  '🔒 Privacidad y seguridad',
];

export const ModalCalificacion: React.FC<ModalCalificacionProps> = ({
  isOpen,
  onClose,
  onSubmitRating,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(7); // Por defecto 7 como en la imagen
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['🩺 Claridad del especialista']);
  const [isCommentExpanded, setIsCommentExpanded] = useState(true);

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

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (selectedRating === null) return;
    if (onSubmitRating) {
      onSubmitRating(selectedRating, comment, selectedTags);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-calificacion-title"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] max-h-[92vh] bg-white rounded-[14px] shadow-[0_24px_70px_rgba(0,0,0,0.22)] border border-[#e2e8f0] flex flex-col overflow-hidden animate-scaleUp cursor-default"
      >
        {/* ================= HEADER DEL MODAL ================= */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#f1f5f9] flex items-start justify-between gap-4 shrink-0 bg-white">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d50475]">
              ENCUESTA DE SATISFACCIÓN · ATENCIÓN MÉDICA
            </span>
            <h2 id="modal-calificacion-title" className="text-[19px] sm:text-[21px] font-bold text-black leading-tight mt-1">
              Valora tu experiencia con Ever Health
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#64748b] mt-0.5">
              Tu opinión nos ayuda a mejorar continuamente la calidad de nuestros servicios médicos.
            </p>
          </div>
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
        <div className="overflow-y-auto custom-scrollbar-minimal px-5 sm:px-6 py-5 flex flex-col gap-5">
          
          {/* Banner ecológico de ahorro de CO2 según la imagen de referencia */}
          <div className="flex items-center gap-3 p-3.5 rounded-[10px] bg-[#f0fdf4] border border-[#bbf7d0]">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#16a34a] border border-[#bbf7d0] shrink-0 shadow-xs">
              <Leaf className="w-5 h-5 text-[#16a34a]" />
            </div>
            <p className="text-[13px] text-[#166534] leading-relaxed">
              Gracias por confiar en <strong className="font-bold">Ever Health</strong>. Con esta consulta digital has ahorrado la emisión de <strong className="font-bold">1,73 kg de CO₂</strong> al evitar desplazamientos innecesarios.
            </p>
          </div>

          {/* Bloque de pregunta principal: Del 1 al 10 */}
          <div className="flex flex-col items-center text-center gap-3 py-1">
            <h3 className="text-[18px] sm:text-[20px] font-bold text-black leading-snug max-w-[500px]">
              Del 1 al 10, ¿qué tanto recomendarías nuestro servicio?
            </h3>
            
            <div className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748b] px-1">
              <span>1: Nada probable</span>
              <span>10: Muy probable</span>
            </div>

            {/* Escala interactiva del 1 al 10 (rellena en magenta hasta el número activo como en la captura) */}
            <div className="w-full flex items-center justify-between gap-1 sm:gap-2 pt-1 pb-2 overflow-x-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isHighlighted = currentDisplayRating !== null && num <= currentDisplayRating;
                const isCurrentExact = currentDisplayRating === num;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedRating(num)}
                    onMouseEnter={() => setHoverRating(num)}
                    onMouseLeave={() => setHoverRating(null)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-[13px] sm:text-[14px] flex items-center justify-center transition-all cursor-pointer shrink-0 select-none ${
                      isHighlighted
                        ? 'bg-[#d50475] text-white shadow-xs'
                        : 'bg-white border border-[#cbd5e1] text-black hover:border-[#d50475] hover:text-[#d50475]'
                    } ${isCurrentExact ? 'ring-2 ring-[#fbcfe8] ring-offset-2 scale-105' : ''}`}
                    title={`Puntuar con ${num} de 10`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            {selectedRating && (
              <span className="text-[12px] font-semibold text-[#d50475] -mt-1">
                Puntuación seleccionada: {selectedRating} de 10
              </span>
            )}
          </div>

          {/* Chips de aspectos destacados */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#f1f5f9]">
            <span className="text-[12px] font-bold uppercase tracking-wider text-black">
              ¿Qué aspectos destacarías de tu atención? (Opcional)
            </span>
            <div className="flex flex-wrap gap-2">
              {FEEDBACK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer border select-none ${
                      isSelected
                        ? 'bg-[#fdf2f8] border-[#fbcfe8] text-[#d50475] font-bold shadow-2xs'
                        : 'bg-white border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc]'
                    }`}
                  >
                    {isSelected && <span className="mr-1 text-[#d50475]">✓</span>}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Caja de comentario adicional con acordeón / campo expandible */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#f1f5f9]">
            <div className="flex items-center justify-between">
              <label
                htmlFor="feedback-comment"
                className="text-[12px] font-bold uppercase tracking-wider text-black cursor-pointer"
              >
                Añadir un comentario (opcional)
              </label>
              <span className="text-[11px] text-[#64748b]">
                {comment.length} / 500
              </span>
            </div>

            <textarea
              id="feedback-comment"
              rows={3}
              maxLength={500}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos qué podríamos mejorar o qué te gustó..."
              className="w-full p-3.5 rounded-[8px] border border-[#e2e8f0] focus:border-[#d50475] focus:ring-1 focus:ring-[#d50475] text-[14px] text-black placeholder:text-[#94a3b8] resize-none outline-none font-[family-name:Helvetica] transition-all bg-white"
            />
          </div>

        </div>

        {/* ================= FOOTER DEL MODAL ================= */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-[#f1f5f9] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 shrink-0 bg-white">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            CANCELAR
          </Button>
          <Button
            variant={selectedRating === null ? 'primary-blocked' : 'primary'}
            onClick={handleSubmit}
            disabled={selectedRating === null}
            tooltipText={selectedRating === null ? 'Selecciona una puntuación del 1 al 10' : undefined}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4 text-white" />
            <span>ENVIAR VALORACIÓN</span>
          </Button>
        </div>

      </div>
    </div>
  );
};
