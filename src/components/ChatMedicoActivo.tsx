import React, { useState, useRef, useEffect } from 'react';
import {
  PhoneOff,
  Send,
  Paperclip,
  CheckCheck,
  Clock,
  AlertCircle,
  FileText,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { LanguageSelector } from './LanguageSelector';

export interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
  attachment?: string;
}

interface ChatMedicoActivoProps {
  doctorName?: string;
  doctorSpecialty?: string;
  initialReason?: string;
  onEndChat: () => void;
}

export const ChatMedicoActivo: React.FC<ChatMedicoActivoProps> = ({
  doctorName = 'Dra. María Fernández',
  doctorSpecialty = 'Medicina General · Ever Health',
  initialReason = 'Consulta médica inmediata',
  onEndChat,
}) => {
  const doctorInitials = (doctorName || 'Dra. María Fernández')
    .replace(/^Dr\.\s*|^Dra\.\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'MF';

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConfirmEndOpen, setIsConfirmEndOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mensaje inicial contextual del especialista
  useEffect(() => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const reasonText = initialReason && initialReason.trim().length > 0
      ? `Acabo de recibir tu consulta respecto a: "${initialReason}".`
      : 'Acabo de recibir tu solicitud de chat médico prioritario.';

    setMessages([
      {
        id: 'msg-initial',
        sender: 'doctor',
        text: `Hola Alejandro, soy ${doctorName}. ${reasonText} Cuéntame con calma qué síntomas o inquietudes presentas para poder orientarte.`,
        time: nowTime,
      },
    ]);
  }, [doctorName, initialReason]);

  // Auto-scroll al recibir o enviar mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `patient-${Date.now()}`,
      sender: 'patient',
      text: userText,
      time: nowTime,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Respuesta simulada del especialista tras 1.3s
    setTimeout(() => {
      setIsTyping(false);
      const docReplyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const docReply: Message = {
        id: `doctor-${Date.now()}`,
        sender: 'doctor',
        text: 'He tomado nota de los síntomas que describes. Te adjuntaré las recomendaciones médicas en tu informe clínico y te indicaré las pautas de seguimiento.',
        time: docReplyTime,
      };
      setMessages((prev) => [...prev, docReply]);
    }, 1300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg: Message = {
        id: `patient-file-${Date.now()}`,
        sender: 'patient',
        text: `Documento adjunto para valoración: ${file.name}`,
        attachment: file.name,
        time: nowTime,
      };
      setMessages((prev) => [...prev, newMsg]);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            id: `doctor-reply-${Date.now()}`,
            sender: 'doctor',
            text: `He recibido el archivo "${file.name}". Lo estoy revisando ahora mismo para emitir mi valoración médica.`,
            time: replyTime,
          },
        ]);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full min-h-screen bg-white flex flex-col font-[family-name:Helvetica] overflow-hidden select-text">
      {/* Input invisible para adjuntos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      {/* 1. Header Superior Homologado a Onboarding / Cuestionario Médico (56px, max-w-[800px], logo + LanguageSelector) */}
      <header className="w-full h-[56px] border-b border-[#f1f5f9] flex items-center justify-center px-4 bg-white shrink-0 sticky top-0 z-40">
        <div className="w-full max-w-[800px] flex items-center justify-between">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            className="h-[36px] sm:h-[40px] w-auto object-contain object-left"
          />
          <LanguageSelector />
        </div>
      </header>

      {/* 2. Barra del especialista médico asignado + Botón FINALIZAR CHAT */}
      <div className="w-full bg-white border-b border-[#f1f5f9] shrink-0">
        <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-3">
          {/* Identidad del médico asignado */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              {/* Cuadrado como lo hemos venido manejando */}
              <div className="w-10 h-10 rounded-[6px] bg-[#f1f5f9] text-black font-bold text-[13px] flex items-center justify-center border border-[#e2e8f0]">
                {doctorInitials}
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-[2px]"
                title="Especialista disponible"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-black truncate leading-tight">
                  {doctorName}
                </span>
                {/* Estatus homologado al Sistema de Diseño (Átomo Badge) */}
                <Badge variant="success">En proceso</Badge>
              </div>
              <span className="text-[12px] text-[#64748b] font-normal truncate leading-tight mt-0.5">
                {doctorSpecialty}
              </span>
            </div>
          </div>

          {/* ÚNICA vía de salida: Botón FINALIZAR CHAT */}
          <button
            type="button"
            onClick={() => setIsConfirmEndOpen(true)}
            className="h-[36px] px-3.5 sm:px-4 rounded-[6px] bg-[#ef4444] hover:bg-[#dc2626] active:bg-[#b91c1c] text-white text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors shrink-0 select-none"
            title="Finalizar consulta de chat"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>FINALIZAR CHAT</span>
          </button>
        </div>
      </div>

      {/* 3. Sub-información de consulta y tiempo de atención */}
      <div className="w-full bg-white border-b border-[#f1f5f9] shrink-0">
        <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-[13px] text-[#64748b] font-normal">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="font-normal text-black truncate">
              {initialReason || 'Consulta médica inmediata'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-normal text-[#64748b] shrink-0">
            <div className="flex items-center gap-1.5 text-[#64748b]">
              <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
              <span className="font-normal">Tiempo de atención: 15 min</span>
            </div>

            {/* Elemento con borde redondeado para Conexión cifrada */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#cbd5e1] text-[#15803d] text-[11px] font-medium bg-white">
              <ShieldCheck className="w-3 h-3 text-[#15803d]" />
              <span>Conexión cifrada</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4. Feed de Mensajes Minimalista: Fondo blanco, burbuja usuario gris 300, doctor gris 50, SIN BORDES */}
      <main className="flex-1 w-full bg-white overflow-y-auto custom-scrollbar-minimal px-4 sm:px-6 py-6">
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-4">
          {/* Mensaje de bienvenida del sistema */}
          <div className="text-center my-2">
            <span className="inline-block px-3 py-1 rounded-[4px] bg-[#f8fafc] text-[#64748b] text-[12px] font-normal">
              Chat médico activo con {doctorName}. Las respuestas se registran en tu historia clínica.
            </span>
          </div>

          {messages.map((msg) => {
            const isDoctor = msg.sender === 'doctor';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${
                  isDoctor ? 'self-start items-start' : 'self-end items-end'
                }`}
              >
                {/* Remitente y hora en regular */}
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#64748b] font-normal">
                  <span>{isDoctor ? doctorName : 'Tú'}</span>
                  <span>·</span>
                  <span>{msg.time}</span>
                </div>

                {/* Burbuja de mensaje:
                    - Doctor: gris 50 (bg-[#f8fafc]), texto negro, sin borde (border-none)
                    - Usuario: gris 300 (bg-[#cbd5e1]), texto negro, sin borde (border-none) */}
                <div
                  className={`p-3.5 rounded-[12px] text-[14px] leading-relaxed font-normal text-black border-none select-text ${
                    isDoctor
                      ? 'bg-[#f8fafc] rounded-tl-[2px]'
                      : 'bg-[#cbd5e1] rounded-tr-[2px]'
                  }`}
                >
                  {msg.attachment && (
                    <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-black/10 font-medium text-[12px]">
                      <FileText className="w-4 h-4 text-black shrink-0" />
                      <span className="truncate">{msg.attachment}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Estado de entrega para mensajes del usuario */}
                {!isDoctor && (
                  <div className="flex items-center gap-1 text-[10px] text-[#64748b] mt-1 mr-1 font-normal">
                    <span>Entregado</span>
                    <CheckCheck className="w-3 h-3 text-[#d50475]" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Indicador de escritura del médico */}
          {isTyping && (
            <div className="self-start flex items-center gap-2 px-3.5 py-2.5 bg-[#f8fafc] border-none rounded-[12px] rounded-tl-[2px] text-[13px] text-[#64748b] font-normal">
              <span className="w-2 h-2 rounded-full bg-[#d50475] animate-ping" />
              <span>{doctorName} está escribiendo...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 5. Barra Inferior de Entrada: Minimalista y contenida en max-w-[800px] */}
      <footer className="w-full bg-white border-t border-[#f1f5f9] shrink-0 p-3 sm:p-4">
        <div className="w-full max-w-[800px] mx-auto flex items-center gap-2">
          {/* Botón adjuntar archivo */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-[6px] hover:bg-[#f1f5f9] text-[#64748b] hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Adjuntar documentación médica o imagen"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Campo de texto de mensaje */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Escribe tu mensaje para ${doctorName}...`}
            className="flex-1 h-[42px] px-4 rounded-[6px] border border-[#cbd5e1] hover:border-black focus:border-black text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none transition-colors"
          />

          {/* Botón de envío */}
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="h-[42px] px-4 rounded-[6px] bg-[#d50475] hover:bg-[#b80364] active:bg-[#9d174d] text-white flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </footer>

      {/* Modal Minimalista de Confirmación de Salida (Única vía de salida: Finalizar) */}
      {isConfirmEndOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-end-chat-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn font-[family-name:Helvetica]"
          onClick={() => setIsConfirmEndOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] bg-white rounded-[14px] shadow-2xl p-6 sm:p-7 flex flex-col gap-4 animate-scaleUp cursor-default border border-[#e2e8f0]"
          >
            {/* Header del Diálogo: Icono oficial PhoneOff neutro según el sistema de diseño, título y botón X alineado */}
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] flex items-center justify-center shrink-0">
                  <PhoneOff className="w-5 h-5 text-[#64748b]" />
                </div>
                <h3
                  id="confirm-end-chat-title"
                  className="text-[18px] sm:text-[19px] font-bold text-black tracking-tight leading-snug"
                >
                  ¿Deseas finalizar la consulta de chat?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmEndOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0 -mr-1"
                title="Cerrar modal"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explicación médica homologada en color negro (text-black), con la atención médica a la doctora abajo */}
            <div className="flex flex-col gap-2.5 pt-1 text-[14px] leading-[22px] text-black font-normal">
              <p>
                Atención con <strong className="font-bold text-black">{doctorName}</strong>.
              </p>
              <p>
                Al finalizar la sesión, el especialista registrará las conclusiones médicas y las recomendaciones en tu historia clínica. Esta conversación quedará guardada de forma segura para tus futuras consultas.
              </p>
            </div>

            {/* Botones de acción homologados: Outline + Destructive */}
            <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#f1f5f9]">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsConfirmEndOpen(false)}
                className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px]"
              >
                CONTINUAR EN EL CHAT
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  setIsConfirmEndOpen(false);
                  onEndChat();
                }}
                className="h-[40px] px-5 text-[13px] font-bold uppercase rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-xs"
              >
                FINALIZAR CONSULTA
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
