import React, { useEffect } from 'react';
import { X, FileText, Download, CheckCheck, Clock, User, Stethoscope } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';

export interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  senderName: string;
  senderRole?: string;
  text: string;
  timestamp: string;
}

interface ModalConversacionChatProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
  specialty?: string;
  date?: string;
  time?: string;
  reason?: string;
  hasInforme?: boolean;
  onViewReport?: () => void;
}

export const ModalConversacionChat: React.FC<ModalConversacionChatProps> = ({
  isOpen,
  onClose,
  doctorName = 'Dr. Bruno Peñas',
  specialty = 'Medicina General',
  date = '27/10/2026',
  time = '10:40',
  reason = 'Consulta sobre dudas de medicación y evolución de síntomas leves.',
  hasInforme = true,
  onViewReport,
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

  const messages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'patient',
      senderName: 'Alejandro Navarro',
      text: `Hola doctor, he solicitado esta consulta por el siguiente motivo: "${reason}". Quería confirmar la pauta recomendada.`,
      timestamp: `${time}`,
    },
    {
      id: 'm2',
      sender: 'doctor',
      senderName: doctorName,
      senderRole: `${specialty} · Colegiado nº 282874102`,
      text: 'Buenos días, Alejandro. He revisado tus antecedentes clínicos y la descripción que facilitas. La pauta es segura siempre que la fiebre se mantenga por debajo de 38°C.',
      timestamp: '10:42',
    },
    {
      id: 'm3',
      sender: 'doctor',
      senderName: doctorName,
      senderRole: `${specialty} · Colegiado nº 282874102`,
      text: 'Te recomiendo mantener una hidratación abundante (2 litros de agua diarios), reposo relativo y suspender la toma fija de analgésicos en cuanto los síntomas remitan.',
      timestamp: '10:44',
    },
    {
      id: 'm4',
      sender: 'patient',
      senderName: 'Alejandro Navarro',
      text: 'Perfecto, me queda completamente claro. Muchas gracias por la rapidez de la respuesta.',
      timestamp: '10:46',
    },
    {
      id: 'm5',
      sender: 'doctor',
      senderName: doctorName,
      senderRole: `${specialty} · Colegiado nº 282874102`,
      text: 'A ti, Alejandro. He dejado firmado el informe de recomendaciones en tu expediente. Si los síntomas persisten más de 72 horas, solicita una videoconsulta de revisión.',
      timestamp: '10:48',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-[family-name:Helvetica]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[680px] h-[85vh] max-h-[720px] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-[#e2e8f0] flex flex-col overflow-hidden animate-scaleUp cursor-default"
      >
        {/* ================= HEADER DEL CHAT (ALINEADO CON LA X Y DIVISOR) ================= */}
        <div className="px-5 py-3.5 border-b border-[#f1f5f9] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] text-[#0f172a] font-bold text-[13px] flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-[#d50475]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-bold text-black tracking-tight leading-snug truncate">
                  {doctorName}
                </h3>
                <Badge variant="success">Finalizada</Badge>
              </div>
              <span className="text-[12px] text-[#64748b] leading-tight truncate">
                {specialty} · Ever Health · {date} a las {time}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0"
            title="Cerrar conversación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================= MOTIVO DE LA CONSULTA RESUMEN ================= */}
        <div className="px-5 py-2.5 bg-[#f8fafc] border-b border-[#e2e8f0] shrink-0 flex items-start gap-2 text-[12px]">
          <span className="font-bold text-black uppercase tracking-wider shrink-0">Motivo:</span>
          <span className="text-[#475569] leading-snug truncate">{reason}</span>
        </div>

        {/* ================= FEED DE MENSAJES SCROLLEABLE ================= */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3.5 bg-white custom-scrollbar-minimal">
          {/* Separador de fecha */}
          <div className="flex items-center justify-center my-1">
            <span className="text-[11px] font-medium text-[#64748b] bg-[#f1f5f9] px-3 py-1 rounded-full">
              Historial de chat · {date}
            </span>
          </div>

          {messages.map((m) => {
            const isDoctor = m.sender === 'doctor';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  isDoctor ? 'self-start' : 'self-end flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none ${
                    isDoctor
                      ? 'bg-[#f1f5f9] text-[#0f172a] border border-[#cbd5e1]'
                      : 'bg-[#d50475] text-white'
                  }`}
                >
                  {isDoctor ? 'DR' : 'AN'}
                </div>

                {/* Burbuja del Mensaje */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-1.5 px-0.5">
                    <span className="text-[11px] font-bold text-black">
                      {m.senderName}
                    </span>
                    <span className="text-[10px] text-[#94a3b8]">
                      {m.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-[10px] text-[13px] leading-relaxed ${
                      isDoctor
                        ? 'bg-[#f8fafc] border border-[#e2e8f0] text-black'
                        : 'bg-[#d50475] text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Banner de fin de consulta */}
          <div className="mt-3 p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-black">
              <CheckCheck className="w-4 h-4 text-[#16a34a]" />
              <span>Consulta médica finalizada con éxito</span>
            </div>
            <p className="text-[11px] text-[#64748b]">
              El historial de esta conversación se guarda de manera segura y confidencial en tu expediente.
            </p>
          </div>
        </div>

        {/* ================= FOOTER CON ACCIONES ================= */}
        <div className="px-5 py-3.5 border-t border-[#f1f5f9] flex items-center justify-between gap-3 shrink-0 bg-white">
          <span className="text-[12px] text-[#64748b] hidden sm:inline">
            Modo solo lectura (Consulta concluida)
          </span>

          <div className="flex items-center gap-2.5 ml-auto">
            {hasInforme && (
              <Button
                variant="outline"
                onClick={() => {
                  if (onViewReport) onViewReport();
                  else alert('Descargando informe médico en PDF...');
                }}
                className="h-[38px] px-4 text-[13px] font-bold uppercase rounded-[8px]"
              >
                <FileText className="w-4 h-4 text-[#d50475]" />
                <span>VER INFORME MÉDICO</span>
              </Button>
            )}

            <Button
              variant="primary"
              onClick={onClose}
              className="h-[38px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
            >
              CERRAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
