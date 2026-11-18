import { useEffect } from 'react';

/** Cierra un modal con la tecla Escape (comportamiento estándar de todos los modales). */
export const useEscapeClose = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
};
