import React from 'react';

export type ConsultationStatusType =
  | 'Pendiente de recomendación'
  | 'En proceso'
  | 'Cancelada'
  | 'Terminada'
  | 'Pendiente';

interface StatusDotBadgeProps {
  status: ConsultationStatusType | string;
  className?: string;
}

export const StatusDotBadge: React.FC<StatusDotBadgeProps> = ({
  status,
  className = '',
}) => {
  const getDotColor = (s: string) => {
    switch (s) {
      case 'Pendiente de recomendación':
      case 'Pendiente':
        return 'bg-[#f59e0b]';
      case 'En proceso':
        return 'bg-[#84cc16]';
      case 'Cancelada':
        return 'bg-[#a855f7]';
      default:
        return 'bg-[#64748b]';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDotColor(status)}`} />
      <span className="text-[13px] font-normal text-[#475569]">{status}</span>
    </div>
  );
};
