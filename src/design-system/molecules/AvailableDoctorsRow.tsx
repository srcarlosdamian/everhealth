import React from 'react';

interface AvailableDoctorsRowProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AvailableDoctorsRow: React.FC<AvailableDoctorsRowProps> = ({
  title = 'Hay médicos disponibles',
  subtitle = 'Tiempo de espera estimado 12 min',
  className = '',
}) => {
  const doctorAvatar1 = `${import.meta.env.BASE_URL}assets/doctor-avatar-1.png`;
  const doctorAvatar2 = `${import.meta.env.BASE_URL}assets/doctor-avatar-2.png`;
  const doctorAvatar3 = `${import.meta.env.BASE_URL}assets/doctor-avatar-3.png`;

  return (
    <div className={`inline-flex items-center gap-[12px] ${className}`}>
      <div className="flex items-center shrink-0">
        <img
          src={doctorAvatar1}
          alt="Doctor 1"
          className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-10 shrink-0 border-2 border-white"
        />
        <img
          src={doctorAvatar2}
          alt="Doctor 2"
          className="w-[40px] h-[40px] rounded-full object-cover mr-[-8px] relative z-20 shrink-0 border-2 border-white"
        />
        <img
          src={doctorAvatar3}
          alt="Doctor 3"
          className="w-[40px] h-[40px] rounded-full object-cover relative z-30 shrink-0 border-2 border-white"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[12px] leading-[16px] font-bold text-black">
          {title}
        </p>
        <p className="text-[12px] leading-[16px] font-normal text-black">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
