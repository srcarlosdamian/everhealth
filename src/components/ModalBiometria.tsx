import React, { useEffect } from 'react';
import { X, ScanFace, ShieldCheck, Activity, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';

interface ModalBiometriaProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProcess: () => void;
}

export const ModalBiometria: React.FC<ModalBiometriaProps> = ({
  isOpen,
  onClose,
  onStartProcess,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn font-[family-name:Helvetica]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="biometria-modal-title"
    >
      <div className="w-full max-w-[560px] bg-white rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#e2e8f0] overflow-hidden flex flex-col max-h-[90vh] font-[family-name:Helvetica] animate-scaleUp">
        
        {/* ================= HEADER DEL MODAL ================= */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#f1f5f9] flex items-center justify-between gap-4 shrink-0 bg-white">
          <h2 id="biometria-modal-title" className="text-[18px] sm:text-[20px] font-bold text-black tracking-tight leading-tight">
            ¿Qué es la biometría facial?
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0 -mr-1"
            aria-label="Cerrar modal"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================= BODY INFORMATIVO ================= */}
        <div className="overflow-y-auto custom-scrollbar-minimal px-4 sm:px-6 py-5 flex flex-col gap-5">
          
          {/* Descripción general reubicada abajo del header */}
          <p className="text-[14px] leading-[22px] text-black font-normal">
            Conoce cómo protegemos tu salud y tus datos antes de comenzar.
          </p>

          {/* Listado con iconos (formato lista sin cards) */}
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0 text-[#64748b] mt-0.5">
                <ScanFace className="w-4 h-4 text-[#64748b]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-bold text-black leading-snug">
                  Tecnología médica avanzada en tu dispositivo
                </span>
                <p className="text-[14px] text-black leading-[22px] font-normal">
                  Analiza micro-patrones ópticos y rasgos anatómicos de tu rostro para verificar tu identidad y estimar constantes fisiológicas clave en tiempo real.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0 text-[#64748b] mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#64748b]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-bold text-black leading-snug">
                  Identificación médica segura y sin contraseñas
                </span>
                <p className="text-[14px] text-black leading-[22px] font-normal">
                  Garantiza que solo tú accedas a tus recetas médicas, informes clínicos y citas confidenciales, evitando suplantaciones de identidad.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0 text-[#64748b] mt-0.5">
                <Activity className="w-4 h-4 text-[#64748b]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-bold text-black leading-snug">
                  Estimación de pulso y variabilidad cardíaca (HRV)
                </span>
                <p className="text-[14px] text-black leading-[22px] font-normal">
                  A través de la cámara frontal, calcula de forma no invasiva tu frecuencia cardíaca y nivel de bienestar en menos de 60 segundos.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0 text-[#64748b] mt-0.5">
                <Lock className="w-4 h-4 text-[#64748b]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-bold text-black leading-snug">
                  Privacidad y cifrado de grado hospitalario
                </span>
                <p className="text-[14px] text-black leading-[22px] font-normal">
                  Tus datos nunca se comparten con terceros. Se procesan de forma encriptada bajo cumplimiento estricto del RGPD y normativas sanitarias.
                </p>
              </div>
            </li>
          </ul>

          {/* Requisitos antes de iniciar (sin fondo, todo en 14px) */}
          <div className="flex flex-col gap-2 pt-3 border-t border-[#f1f5f9]">
            <span className="text-[14px] font-bold text-black">
              Requisitos antes de iniciar:
            </span>
            <ul className="text-[14px] text-black leading-[22px] flex flex-col gap-1.5 list-disc list-inside font-normal">
              <li>Colócate en un lugar con <strong className="font-bold text-black">buena iluminación frontal</strong>.</li>
              <li>Mantén tu rostro despejado <strong className="font-bold text-black">(sin gafas de sol, sombreros o mascarillas)</strong>.</li>
              <li>Permite el acceso a la cámara cuando el navegador te lo solicite.</li>
            </ul>
          </div>

        </div>

        {/* ================= FOOTER DEL MODAL ================= */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#f1f5f9] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 shrink-0 bg-white">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            CANCELAR
          </Button>
          <Button
            variant="primary"
            onClick={onStartProcess}
            className="w-full sm:w-auto"
          >
            <ScanFace className="w-4 h-4 text-white" />
            <span>INICIAR PROCESO</span>
          </Button>
        </div>

      </div>
    </div>
  );
};
