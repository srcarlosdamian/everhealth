import React from 'react';
import { Badge, BadgeVariant } from '../atoms/Badge';

interface AssignedDoctorCardProps {
  initials?: string;
  name?: string;
  specialty?: string;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  className?: string;
}

export const AssignedDoctorCard: React.FC<AssignedDoctorCardProps> = ({
  initials = 'MF',
  name = 'Dr. Marcos Flores',
  specialty = 'Medicina General · Urgencias',
  badgeText = 'Disponible ahora',
  badgeVariant = 'disponible-ahora',
  className = '',
}) => {
  return (
    <div
      className={`border-2 border-[#e2e8f0] rounded-[8px] p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-[48px] h-[48px] rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-black text-[14px] shrink-0">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-black">{name}</span>
          <span className="text-[13px] text-[#64748b]">{specialty}</span>
        </div>
      </div>
      <Badge variant={badgeVariant}>{badgeText}</Badge>
    </div>
  );
};
