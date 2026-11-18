import React from 'react';
import { ChatMedicoActivo } from './ChatMedicoActivo';

interface ModalChatMedicoActivoProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
  doctorSpecialty?: string;
  initialReason?: string;
  onEndChat?: () => void;
}

export const ModalChatMedicoActivo: React.FC<ModalChatMedicoActivoProps> = ({
  isOpen,
  onClose,
  doctorName,
  doctorSpecialty,
  initialReason,
  onEndChat,
}) => {
  if (!isOpen) return null;

  return (
    <ChatMedicoActivo
      doctorName={doctorName}
      doctorSpecialty={doctorSpecialty}
      initialReason={initialReason}
      onEndChat={onEndChat || onClose}
    />
  );
};
