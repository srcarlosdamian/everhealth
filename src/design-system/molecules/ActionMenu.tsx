import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  isSpecialPrimary?: boolean; // Solo para Solicitar una cita (Videoconsulta / Chat médico)
  copyable?: boolean;
  copyValue?: string;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  className?: string;
  variant?: 'standard' | 'solicitar-cita';
  onClose?: () => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  className = '',
  variant = 'standard',
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    // Use mousedown with capture or bubbling
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleItemClick = (item: ActionMenuItem, e: React.MouseEvent) => {
    // Si el item es copiable o representa una dirección/contacto
    const isAddressOrCopyable =
      item.copyable ||
      item.id === 'loc' ||
      item.label.toLowerCase().includes('naciones') ||
      item.label.toLowerCase().includes('madrid');

    if (isAddressOrCopyable) {
      const textToCopy = item.copyValue || item.label;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).catch(() => {});
      }
      setCopiedId(item.id);
      setCopiedNotice('Dirección copiada');
      setTimeout(() => {
        setCopiedId(null);
        setCopiedNotice(null);
      }, 2000);
    }

    if (item.onClick) {
      item.onClick();
    }

    if (!isAddressOrCopyable) {
      onClose?.();
    }
  };

  const hasPosition =
    className.includes('absolute') ||
    className.includes('fixed') ||
    className.includes('relative');
  const hasWidth = className.includes('w-');

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className={`${hasPosition ? '' : 'relative'} ${
        hasWidth ? '' : 'w-[280px]'
      } bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 border border-[#e2e8f0] flex flex-col gap-1 font-[family-name:Helvetica] ${className}`}
    >
      {items.map((item) => {
        const isSpecial = variant === 'solicitar-cita' || item.isSpecialPrimary;
        const isAddressOrCopyable =
          item.copyable ||
          item.id === 'loc' ||
          item.label.toLowerCase().includes('naciones') ||
          item.label.toLowerCase().includes('madrid');
        const isCopied = copiedId === item.id;

        const content = (
          <div className="flex items-center justify-between w-full min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {item.icon && (
                <span
                  className={`w-5 h-5 flex items-center justify-center shrink-0 ${
                    isSpecial ? 'text-[#d50475]' : 'text-[#64748b]'
                  }`}
                >
                  {item.icon}
                </span>
              )}
              <span
                className={`text-[16px] leading-[24px] font-normal text-black transition-colors truncate ${
                  isSpecial ? 'uppercase' : ''
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Feedback sutil al copiar dirección / portapapeles */}
            {isAddressOrCopyable && (
              <span className="shrink-0 ml-2">
                {isCopied ? (
                  <span className="text-[11px] font-medium text-[#15803d] bg-[#f0fdf4] px-1.5 py-0.5 rounded border border-[#bbf7d0] animate-fadeIn">
                    Copiado
                  </span>
                ) : (
                  <span className="text-[10px] text-[#94a3b8] opacity-0 group-hover:opacity-80 transition-opacity">
                    Copiar
                  </span>
                )}
              </span>
            )}
          </div>
        );

        if (item.href && !isAddressOrCopyable) {
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => onClose?.()}
              className="w-full px-3.5 py-2.5 rounded-[6px] hover:bg-[#f1f5f9] text-black transition-colors cursor-pointer select-none flex items-center text-left group"
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => handleItemClick(item, e)}
            className="w-full px-3.5 py-2.5 rounded-[6px] hover:bg-[#f1f5f9] text-black transition-colors cursor-pointer select-none flex items-center text-left group"
          >
            {content}
          </button>
        );
      })}

      {/* Notificación flotante muy sutil al copiar */}
      {copiedNotice && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap z-50 animate-fadeIn pointer-events-none">
          <Check className="w-3 h-3 text-[#22c55e]" />
          <span>{copiedNotice} al portapapeles</span>
        </div>
      )}
    </div>
  );
};

// Alias en español para máxima compatibilidad con el sistema de diseño
export const MenuAcciones = ActionMenu;
