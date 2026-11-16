import React, { useEffect } from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  id?: string;
  variant?: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
  inline?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  message,
  duration = 3200,
  onClose,
  className = '',
  inline = false,
}) => {
  useEffect(() => {
    if (inline || !onClose || duration <= 0) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, inline]);

  const config = {
    info: {
      border: 'border-[#bae6fd]',
      bg: 'bg-white',
      badgeBg: 'bg-[#f0f9ff]',
      icon: <Info className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />,
      text: 'text-[#0f172a]',
      sub: 'text-[#334155]',
    },
    success: {
      border: 'border-[#bbf7d0]',
      bg: 'bg-white',
      badgeBg: 'bg-[#f0fdf4]',
      icon: <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />,
      text: 'text-[#0f172a]',
      sub: 'text-[#166534]',
    },
    warning: {
      border: 'border-[#fde68a]',
      bg: 'bg-white',
      badgeBg: 'bg-[#fffbeb]',
      icon: <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />,
      text: 'text-[#0f172a]',
      sub: 'text-[#92400e]',
    },
    error: {
      border: 'border-[#fecdd3]',
      bg: 'bg-white',
      badgeBg: 'bg-[#fff1f2]',
      icon: <AlertCircle className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />,
      text: 'text-[#0f172a]',
      sub: 'text-[#9f1239]',
    },
  }[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${inline ? 'relative w-full' : 'shadow-xl animate-fadeIn'} ${
        config.bg
      } border ${config.border} rounded-[8px] p-3 flex items-start justify-between gap-3 font-[family-name:Helvetica] ${className}`}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <div className={`p-1 rounded-[6px] ${config.badgeBg}`}>
          {config.icon}
        </div>
        <div className="flex flex-col min-w-0">
          {title && (
            <span className={`text-[13px] font-bold ${config.text} leading-tight`}>
              {title}
            </span>
          )}
          <span className={`text-[12.5px] ${config.sub} leading-snug`}>
            {message}
          </span>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[#94a3b8] hover:text-black p-0.5 rounded transition-colors cursor-pointer shrink-0 mt-0.5"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
