import React from 'react';
import { Biometria } from './Biometria';

interface ModalBiometriaProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const ModalBiometria: React.FC<ModalBiometriaProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  if (!isOpen) return null;

  return (
    <Biometria
      isModal
      onClose={onClose}
      onBackToHome={onClose}
      userName={userName}
    />
  );
};
