import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Search,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ScanFace,
  Video,
  MessageSquare,
  FileSpreadsheet,
  HelpCircle,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

interface FAQItem {
  id: string;
  category: 'soporte' | 'biometria' | 'videoconsulta' | 'chat' | 'historial';
  categoryLabel: string;
  question: string;
  answer: React.ReactNode;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'todos',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>(['contact-directo', 'faq-bio-1']);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'todos', label: 'Todo' },
    { id: 'soporte', label: 'Soporte y contacto' },
    { id: 'biometria', label: 'Biometría' },
    { id: 'videoconsulta', label: 'Videoconsulta' },
    { id: 'chat', label: 'Chat médico' },
    { id: 'historial', label: 'Historia clínica' },
  ];

  const faqs: FAQItem[] = [
    {
      id: 'contact-directo',
      category: 'soporte',
      categoryLabel: 'Soporte y contacto',
      question: '¿Necesitas ayuda con soporte o contacto directo?',
      answer: (
        <div className="flex flex-col gap-3.5 text-[13px] text-[#475569]">
          <p className="leading-relaxed">
            Puedes comunicarte de manera directa con nuestro equipo técnico y de atención médica a través de los siguientes canales oficiales:
          </p>

          {/* Bloque A: Soporte General Ever Health */}
          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] flex flex-col gap-2.5">
            <span className="text-[12px] font-bold text-black uppercase tracking-wider">
              Atención General Ever Health
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between py-1 group">
                <a
                  href="mailto:soporte@everhealth.es"
                  className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span className="font-medium">soporte@everhealth.es</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard('soporte@everhealth.es', 'mail-general')}
                  className="p-1 rounded hover:bg-[#e2e8f0] text-[#64748b] transition-colors cursor-pointer"
                  title="Copiar correo"
                >
                  {copiedKey === 'mail-general' ? (
                    <span className="text-[11px] text-[#15803d] font-bold">Copiado</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <a
                  href="tel:911231214"
                  className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span className="font-medium">911 23 12 14</span>
                </a>
                <span className="text-[11px] text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                  L-D 24h
                </span>
              </div>

              <div className="flex items-center justify-between py-1 group">
                <div className="flex items-center gap-2.5 text-black">
                  <MapPin className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span className="truncate">C/ Naciones 10, 28006 Madrid</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('C/ Naciones 10, 28006 Madrid', 'addr-general')}
                  className="p-1 rounded hover:bg-[#e2e8f0] text-[#64748b] transition-colors cursor-pointer"
                  title="Copiar dirección"
                >
                  {copiedKey === 'addr-general' ? (
                    <span className="text-[11px] text-[#15803d] font-bold">Copiado</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Línea divisoria homologada como solicitó el usuario */}
          <hr className="border-[#f1f5f9] my-0.5" />

          {/* Bloque B: Soporte Especializado de Biometría Facial */}
          <div className="p-3 rounded-[8px] bg-[#fdf2f8] border border-[#fbcfe8] flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <ScanFace className="w-4 h-4 text-[#d50475]" />
              <span className="text-[12px] font-bold text-[#d50475] uppercase tracking-wider">
                Soporte de Biometría Facial
              </span>
            </div>

            <p className="text-[12px] text-[#64748b] leading-tight">
              Para dudas técnicas sobre escaneo facial rPPG, calibración de cámara o mediciones biométricas:
            </p>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between py-1 group">
                <a
                  href="mailto:biometria@everhealth.es"
                  className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#d50475] shrink-0" />
                  <span className="font-medium text-black">biometria@everhealth.es</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard('biometria@everhealth.es', 'mail-bio')}
                  className="p-1 rounded hover:bg-[#fce7f3] text-[#d50475] transition-colors cursor-pointer"
                  title="Copiar correo"
                >
                  {copiedKey === 'mail-bio' ? (
                    <span className="text-[11px] text-[#15803d] font-bold">Copiado</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <a
                  href="tel:918220518"
                  className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#d50475] shrink-0" />
                  <span className="font-medium text-black">918 220 518</span>
                </a>
                <span className="text-[11px] text-[#d50475] bg-white px-2 py-0.5 rounded border border-[#fbcfe8]">
                  Especialistas
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'faq-bio-1',
      category: 'biometria',
      categoryLabel: 'Biometría',
      question: '¿Qué es la biometría facial y cómo mide mis constantes vitales?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>
            Nuestra tecnología utiliza <strong>fotopletismografía remota (rPPG)</strong> a través de la cámara frontal de tu ordenador o teléfono. Detecta variaciones imperceptibles de color en la microcirculación cutánea del rostro causadas por cada latido sanguíneo.
          </p>
          <ul className="list-disc list-inside space-y-1 text-black font-medium pl-1">
            <li>Frecuencia cardíaca (pulsaciones por minuto)</li>
            <li>Variabilidad de la frecuencia cardíaca (HRV)</li>
            <li>Nivel estimado de estrés fisiológico</li>
            <li>Saturación estimada de oxígeno (SpO2)</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-bio-2',
      category: 'biometria',
      categoryLabel: 'Biometría',
      question: '¿Cuáles son las recomendaciones para que el escaneo sea óptimo?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>Para asegurar una lectura precisa de 25 segundos:</p>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li><strong>Luz frontal uniforme:</strong> Evita ventanas a tu espalda o luces fluorescentes parpadeantes.</li>
            <li><strong>Rostro despejado:</strong> Retira gafas de sol, sombreros o mascarillas.</li>
            <li><strong>Posición fija:</strong> Mantén tu cabeza dentro del óvalo guía sin hablar ni moverte.</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'faq-bio-3',
      category: 'biometria',
      categoryLabel: 'Biometría',
      question: '¿Se graban o almacenan mis imágenes o videos faciales?',
      answer: (
        <div className="flex items-start gap-3 p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#475569]">
          <ShieldCheck className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>No, nunca.</strong> El procesamiento óptico se ejecuta en tiempo real en la memoria del navegador. Ninguna imagen, fotografía o flujo de video se graba ni se sube a servidores, cumpliendo los más altos estándares del RGPD y secreto médico.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-1',
      category: 'videoconsulta',
      categoryLabel: 'Videoconsulta',
      question: '¿Cómo accedo a mi videoconsulta médica programada?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>
            Diez minutos antes de la hora fijada, en tu pantalla de <strong>Inicio</strong> se activará el botón <strong className="text-black">"Entrar a la sala"</strong> en la tarjeta de próxima cita. Al pulsar entrarás a la sala de espera virtual privada con tu médico asignado.
          </p>
          <p>
            También recibirás un aviso emergente en tus notificaciones con enlace directo a la videollamada.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-2',
      category: 'videoconsulta',
      categoryLabel: 'Videoconsulta',
      question: '¿Qué hago si tengo problemas con la cámara o el micrófono?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>
            Comprueba en la barra de direcciones de tu navegador que los permisos de cámara y micrófono figuren como <strong>"Permitir"</strong>. Si usas cascos o auriculares bluetooth, verifica que estén seleccionados como dispositivo predeterminado del sistema.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-chat-1',
      category: 'chat',
      categoryLabel: 'Chat médico',
      question: '¿Para qué casos es recomendable usar el Chat Médico?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>
            El chat médico ofrece respuesta rápida con médicos colegiados (tiempo medio estimado: 10 a 12 minutos). Es idóneo para:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Dudas sobre dosis o efectos secundarios de medicamentos.</li>
            <li>Orientación sobre síntomas leves o evolución de cuadros previos.</li>
            <li>Interpretación inicial de resultados diagnósticos.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-hist-1',
      category: 'historial',
      categoryLabel: 'Historia clínica',
      question: '¿Dónde puedo consultar y descargar mis informes y recetas?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>
            En la barra lateral haz clic en <strong>"Historia clínica"</strong> o <strong>"Historial consultas"</strong>. Desde allí puedes ver el resumen de cada consulta, consultar recomendaciones médicas y descargar recetas en formato PDF oficial.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-hist-2',
      category: 'historial',
      categoryLabel: 'Historia clínica',
      question: '¿Cómo añado perfiles de familiares o mascotas?',
      answer: (
        <div className="flex flex-col gap-2 text-[13px] text-[#475569] leading-relaxed">
          <p>
            Ever Health permite gestionar a tus dependientes desde una única cuenta. Accede a las secciones <strong>"Familiares"</strong> o <strong>"Mascotas"</strong> en la navegación para añadir nuevos perfiles y agendar consultas individualizadas.
          </p>
        </div>
      ),
    },
  ];

  // Filtering
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchCat =
        activeCategory === 'todos' || item.category === activeCategory;
      if (!matchCat) return false;
      if (!searchTerm.trim()) return true;

      const qLower = item.question.toLowerCase();
      const termLower = searchTerm.toLowerCase();
      return qLower.includes(termLower);
    });
  }, [faqs, activeCategory, searchTerm]);

  if (!isOpen) return null;

  const contentMarkup = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header Panel */}
      <div className="px-5 py-4 border-b border-[#f1f5f9] flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center text-[#d50475]">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[17px] font-bold text-black leading-tight flex items-center gap-1.5">
              <span>Help Center</span>
              <span className="text-[11px] font-normal text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded-[4px]">
                Ever Health
              </span>
            </h2>
            <span className="text-[12px] text-[#64748b]">
              Preguntas frecuentes y soporte en línea
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] text-black flex items-center justify-center transition-colors cursor-pointer"
          title="Cerrar Help Center"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="¿En qué podemos ayudarte? Ej. Biometría, Soporte..."
            className="w-full h-[40px] pl-9 pr-8 rounded-[8px] border border-[#cbd5e1] hover:border-black focus:border-black text-[13px] text-black placeholder:text-[#94a3b8] focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#94a3b8] hover:text-black cursor-pointer"
              title="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 border-b border-[#f1f5f9]">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`h-[28px] px-3 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#f1f5f9] hover:text-black border border-[#e2e8f0]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable FAQ Accordion List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2.5">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center gap-2 text-[#64748b]">
            <HelpCircle className="w-8 h-8 text-[#cbd5e1]" />
            <p className="text-[14px] font-bold text-black">No se encontraron resultados</p>
            <p className="text-[12px]">Prueba con otra palabra clave como "videoconsulta" o "teléfono".</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('todos');
              }}
              className="mt-2 text-[12px] font-bold text-[#d50475] hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openAccordionIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="border border-[#e2e8f0] rounded-[8px] overflow-hidden bg-white transition-all shadow-2xs"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className={`w-full px-4 py-3.5 flex items-start justify-between gap-3 text-left transition-colors cursor-pointer ${
                    isOpen ? 'bg-[#f8fafc]' : 'hover:bg-[#f8fafc]'
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                      {faq.categoryLabel}
                    </span>
                    <span className="text-[13px] font-bold text-black leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748b] shrink-0 mt-1 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-[#f1f5f9] animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Support Quick Callout */}
      <div className="px-5 py-3 border-t border-[#f1f5f9] bg-[#f8fafc] flex items-center justify-between gap-3 shrink-0">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-black uppercase tracking-wider">
            ¿Dudas urgentes?
          </span>
          <span className="text-[12px] text-[#64748b]">
            Escríbenos directamente a soporte
          </span>
        </div>
        <a
          href="mailto:soporte@everhealth.es"
          className="h-[34px] px-3.5 rounded-[6px] bg-black hover:bg-[#1e293b] text-white text-[12px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Enviar email</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* MODO DESKTOP (lg y superior): Cuadro lateral derecho estilo Gemini sin tapar la pantalla */}
      <div className="hidden lg:block">
        <aside
          className="fixed top-0 right-0 h-full w-[440px] max-w-[90vw] z-50 bg-white border-l border-[#e2e8f0] shadow-[-16px_0_40px_rgba(0,0,0,0.1)] flex flex-col font-[family-name:Helvetica] animate-slideInRight"
          aria-label="Panel Help Center"
        >
          {contentMarkup}
        </aside>
      </div>

      {/* MODO MOBILE (< lg): Modal centrado con backdrop adaptado para pantallas móviles */}
      <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-3 animate-fadeIn">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
        <div className="relative w-full max-w-[460px] max-h-[88vh] bg-white rounded-[14px] shadow-2xl flex flex-col overflow-hidden animate-scaleUp z-10 font-[family-name:Helvetica]">
          {contentMarkup}
        </div>
      </div>
    </>
  );
};