import React, { useState, useRef, useEffect } from 'react';
import { PhoneOff, Send, Paperclip, CheckCheck, Clock } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';

interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
}

interface ModalChatMedicoActivoProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
  doctorSpecialty?: string;
  onEndChat?: () => void;
}

export const ModalChatMedicoActivo: React.FC<ModalChatMedicoActivoProps> = ({
  isOpen,
  onClose,
  doctorName = 'Dr. Bruno Peñas',
  doctorSpecialty = 'Medicina General · Ever Health Doctor',
  onEndChat,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'doctor',
      text: 'Hola Alejandro, soy el Dr. Bruno Peñas. Acabo de recibir tu solicitud de chat prioritario. Cuéntame, ¿qué síntomas o dudas presentas en este momento?',
      time: '10:41',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `patient-${Date.now()}`,
      sender: 'patient',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const docReply: Message = {
        id: `doctor-${Date.now()}`,
        sender: 'doctor',
        text: 'He tomado nota de los síntomas que describes. Te adjuntaré las recomendaciones médicas en tu informe clínico y te indicaré las pautas de seguimiento.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, docReply]);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFinish = () => {
    if (onEndChat) {
      onEndChat();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fadeIn font-[family-name:Helvetica]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[760px] h-[85vh] max-h-[720px] bg-white rounded-[14px] shadow-2xl flex flex-col overflow-hidden animate-scaleUp border border-[#e2e8f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Información del especialista + Botón evidente de FINALIZAR CHAT (estilo Google Meet) */}
        <div className="px-5 py-3.5 bg-white border-b border-[#e2e8f0] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#f1f5f9] text-black font-bold text-[14px] flex items-center justify-center border border-[#cbd5e1] shrink-0">
                BP
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-black truncate">
                  {doctorName}
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                  En directo
                </span>
              </div>
              <span className="text-[12px] text-[#64748b] truncate">
                {doctorSpecialty}
              </span>
            </div>
          </div>

          {/* BOTÓN FINALIZAR CHAT: Ultra evidente estilo Google Meet con componente botón destructivo */}
          <button
            type="button"
            onClick={handleFinish}
            className="h-[38px] px-4 rounded-[8px] bg-[#ef4444] hover:bg-[#dc2626] active:bg-[#b91c1c] text-white text-[12px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs cursor-pointer transition-colors shrink-0"
            title="Finalizar consulta de chat"
          >
            <PhoneOff className="w-4 h-4" />
            <span>FINALIZAR CHAT</span>
          </button>
        </div>

        {/* Banner de sesión activa */}
        <div className="bg-[#f8fafc] px-5 py-2 border-b border-[#f1f5f9] flex items-center justify-between text-[12px] text-[#64748b]">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Consulta iniciada · Tiempo estimado de atención: 15 min</span>
          </div>
          <span className="font-mono text-[11px] text-[#059669] font-bold">
            Conexión cifrada de extremo a extremo
          </span>
        </div>

        {/* Feed de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f8fafc] flex flex-col gap-3.5">
          {messages.map((msg) => {
            const isDoctor = msg.sender === 'doctor';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  isDoctor ? 'self-start items-start' : 'self-end items-end'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#64748b]">
                  <span className="font-semibold">{isDoctor ? doctorName : 'Tú (Alejandro Navarro)'}</span>
                  <span>·</span>
                  <span>{msg.time}</span>
                </div>
                <div
                  className={`p-3.5 rounded-[12px] text-[14px] leading-[21px] shadow-2xs ${
                    isDoctor
                      ? 'bg-white text-black border border-[#e2e8f0] rounded-tl-none'
                      : 'bg-[#d50475] text-white rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
                {!isDoctor && (
                  <div className="flex items-center gap-1 text-[10px] text-[#94a3b8] mt-1 mr-1">
                    <span>Entregado</span>
                    <CheckCheck className="w-3 h-3 text-[#d50475]" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="self-start flex items-center gap-2 px-3 py-2 bg-white border border-[#e2e8f0] rounded-[10px] text-[12px] text-[#64748b] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#d50475] animate-ping" />
              <span>{doctorName} está escribiendo...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#e2e8f0] flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="w-10 h-10 rounded-full hover:bg-[#f1f5f9] text-[#64748b] hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Adjuntar documento o imagen"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje para el Dr. Bruno Peñas..."
            className="flex-1 h-[42px] px-4 rounded-[8px] border border-[#cbd5e1] hover:border-black focus:border-black text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none transition-colors"
          />

          <Button
            variant="primary"
            type="button"
            onClick={handleSendMessage}
            className="h-[42px] px-4 rounded-[8px] flex items-center justify-center shrink-0"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
