import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export type InlineMessageVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

interface InlineMessageProps {
  variant?: InlineMessageVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CONFIG = {
  neutral: { Icon: Info, color: 'text-[#64748b]', box: 'bg-[#f8fafc] border-[#e2e8f0]' },
  info: { Icon: Info, color: 'text-[#0284c7]', box: 'bg-[#f0f9ff] border-[#bae6fd]' },
  success: { Icon: CheckCircle2, color: 'text-[#16a34a]', box: 'bg-[#f0fdf4] border-[#bbf7d0]' },
  warning: { Icon: AlertTriangle, color: 'text-[#d97706]', box: 'bg-[#fffbeb] border-[#fde68a]' },
  error: { Icon: AlertCircle, color: 'text-[#e11d48]', box: 'bg-[#fff1f2] border-[#fecdd3]' },
} as const;

/**
 * Mensaje en línea (callout): informa dentro del flujo de un formulario o modal.
 * Título en negrita negro + descripción en gris. Siempre 14px / 13px.
 */
export const InlineMessage: React.FC<InlineMessageProps> = ({
  variant = 'neutral',
  title,
  children,
  className = '',
}) => {
  const { Icon, color, box } = CONFIG[variant];
  return (
    <div
      role="note"
      className={`p-4 rounded-[8px] border flex items-start gap-3 ${box} ${className}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color}`} />
      <div className="flex flex-col gap-1 min-w-0">
        {title && <p className="font-bold text-black text-[14px] leading-snug">{title}</p>}
        <p className="text-[13px] text-[#64748b] leading-relaxed">{children}</p>
      </div>
    </div>
  );
};
