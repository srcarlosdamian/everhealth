import React from 'react';

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  isSpecialPrimary?: boolean; // Solo para Solicitar una cita (Videoconsulta / Chat médico)
}

interface ActionMenuProps {
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
  return (
    <div
      className={`bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 border border-[#e2e8f0] flex flex-col gap-1 font-[family-name:Helvetica] ${className}`}
    >
      {items.map((item) => {
        const isSpecial = variant === 'solicitar-cita' || item.isSpecialPrimary;

        const content = (
          <div className="flex items-center gap-3 w-full">
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
              className={`text-[16px] transition-colors truncate ${
                isSpecial
                  ? 'font-bold uppercase text-black'
                  : 'font-normal text-black'
              }`}
            >
              {item.label}
            </span>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => onClose?.()}
              className="w-full px-3.5 py-2.5 rounded-[6px] hover:bg-[#f1f5f9] text-black transition-colors cursor-pointer select-none flex items-center text-left"
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              item.onClick?.();
              onClose?.();
            }}
            className="w-full px-3.5 py-2.5 rounded-[6px] hover:bg-[#f1f5f9] text-black transition-colors cursor-pointer select-none flex items-center text-left"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};
