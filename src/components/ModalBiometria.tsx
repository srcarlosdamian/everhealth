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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="biometria-modal-title"
    >
      <div className="w-full max-w-[560px] bg-white rounded-[12px] shadow-2xl border border-[#e2e8f0] overflow-hidden flex flex-col max-h-[90vh] font-[family-name:Helvetica] animate-scaleUp">
        
        {/* ================= HEADER DEL MODAL ================= */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#f1f5f9] flex items-start justify-between gap-4 shrink-0 bg-white">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d50475]">
              SEGURIDAD & IDENTIFICACIÓN · BIOMETRÍA FACIAL
            </span>
            <h2 id="biometria-modal-title" className="text-[18px] sm:text-[20px] font-bold text-black leading-tight mt-1">
              ¿Qué es la biometría facial?
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#64748b] mt-0.5">
              Conoce cómo protegemos tu salud y tus datos antes de comenzar.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black transition-colors cursor-pointer shrink-0 -mr-1"
            aria-label="Cerrar modal"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= BODY INFORMATIVO ================= */}
        <div className="overflow-y-auto custom-scrollbar-minimal px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4">
          
          {/* Banner explicativo con icono */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-[8px] bg-[#fdf2f8] border border-[#fbcfe8]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#fbcfe8] text-[#d50475] shadow-xs">
              <ScanFace className="w-5 h-5 text-[#d50475]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-bold text-black">
                Tecnología médica avanzada en tu dispositivo
              </span>
              <p className="text-[13px] text-[#475569] leading-relaxed">
                Analiza micro-patrones ópticos y rasgos anatómicos de tu rostro para verificar tu identidad y estimar constantes fisiológicas clave en tiempo real.
              </p>
            </div>
          </div>

          {/* Tres pilares clave */}
          <div className="flex flex-col gap-2.5">
            {/* 1. Verificación médica */}
            <div className="flex items-start gap-3 p-3 rounded-[8px] bg-white border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0 text-black">
                <ShieldCheck className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-black">
                  Identificación médica segura y sin contraseñas
                </span>
                <p className="text-[12px] text-[#64748b] leading-relaxed">
                  Garantiza que solo tú accedas a tus recetas médicas, informes clínicos y citas confidenciales, evitando suplantaciones de identidad.
                </p>
              </div>
            </div>

            {/* 2. Estimación de constantes */}
            <div className="flex items-start gap-3 p-3 rounded-[8px] bg-white border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0 text-black">
                <Activity className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-black">
                  Estimación de pulso y variabilidad cardíaca (HRV)
                </span>
                <p className="text-[12px] text-[#64748b] leading-relaxed">
                  A través de la cámara frontal, calcula de forma no invasiva tu frecuencia cardíaca y nivel de bienestar en menos de 60 segundos.
                </p>
              </div>
            </div>

            {/* 3. Privacidad y RGPD */}
            <div className="flex items-start gap-3 p-3 rounded-[8px] bg-white border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0 text-black">
                <Lock className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-black">
                  Privacidad y cifrado de grado hospitalario
                </span>
                <p className="text-[12px] text-[#64748b] leading-relaxed">
                  Tus datos nunca se comparten con terceros. Se procesan de forma encriptada bajo cumplimiento estricto del RGPD y normativas sanitarias.
                </p>
              </div>
            </div>
          </div>

          {/* Caja de recomendaciones antes del escaneo */}
          <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-black">
              Requisitos antes de iniciar:
            </span>
            <ul className="text-[12px] text-[#64748b] flex flex-col gap-1 list-disc list-inside">
              <li>Colócate en un lugar con <strong className="text-black font-medium">buena iluminación frontal</strong>.</li>
              <li>Mantén tu rostro despejado <strong className="text-black font-medium">(sin gafas de sol, sombreros o mascarillas)</strong>.</li>
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
