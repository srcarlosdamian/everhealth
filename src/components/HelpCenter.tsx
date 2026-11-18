import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Search,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Copy,
  HelpCircle,
  ShieldCheck,
  Clock,
  Lock,
} from 'lucide-react';
import { Toast, ToastVariant } from '../design-system/atoms/Toast';
import { Button } from '../design-system/atoms/Button';
import { Tabs, TabItem } from '../design-system/molecules/Tabs';

export interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

interface FAQItem {
  id: string;
  category: 'biometria' | 'videoconsulta' | 'chat' | 'historial';
  question: string;
  answer: React.ReactNode;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'soporte',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  // Todos cerrados por defecto según requerimiento
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);

  // Sincronizar categoría por defecto y cerrar acordeones al abrir
  useEffect(() => {
    if (isOpen) {
      setActiveCategory(defaultCategory);
      setOpenAccordionIds([]);
    }
  }, [isOpen, defaultCategory]);

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

  const showToast = (message: string, variant: ToastVariant = 'info') => {
    setToast({ message, variant });
  };

  const handleCopy = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    showToast(`${label} copiado al portapapeles: ${text}`, 'info');
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Categorías comenzando con Soporte técnico
  const categories: TabItem[] = [
    { id: 'soporte', label: 'Soporte técnico' },
    { id: 'biometria', label: 'Biometría' },
    { id: 'videoconsulta', label: 'Videoconsulta' },
    { id: 'chat', label: 'Chat médico' },
    { id: 'historial', label: 'Historia clínica' },
  ];

  // Preguntas frecuentes enriquecidas por categoría
  const faqs: FAQItem[] = [
    // --- BIOMETRÍA ---
    {
      id: 'faq-bio-1',
      category: 'biometria',
      question: '¿Qué es la biometría facial y cómo mide mis constantes vitales?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
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
      question: '¿Cuáles son las recomendaciones para que el escaneo sea óptimo?',
      answer: (
        <div className="flex flex-col gap-2.5 text-[14px] text-[#475569] leading-relaxed">
          <p>Para asegurar una medición biométrica precisa de 30 segundos:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li><strong>Encuadre facial:</strong> Mira a la cámara y sitúa tu rostro centrado dentro del círculo guía durante toda la medición.</li>
            <li><strong>Sin complementos:</strong> Quita gafas, sombreros y despeja el cabello de la frente para una lectura cutánea limpia.</li>
            <li><strong>Iluminación uniforme:</strong> Evita contraluces o fuentes de luz directa detrás de ti. Lo ideal es luz frontal difusa.</li>
            <li><strong>Inmovilidad total:</strong> Respira con calma y permanece quieto/a durante los 30 segundos hasta completarse el análisis.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-bio-3',
      category: 'biometria',
      question: '¿Se graban o almacenan mis imágenes o videos faciales?',
      answer: (
        <div className="flex items-start gap-3 p-3.5 bg-white border border-[#e2e8f0] text-[14px] text-[#475569]">
          <ShieldCheck className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>No, nunca.</strong> El procesamiento óptico se ejecuta 100% en tiempo real en la memoria local del navegador. Ninguna imagen, fotografía ni flujo de video se graba ni se sube a servidores, cumpliendo estrictamente con el RGPD y el secreto médico.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-bio-4',
      category: 'biometria',
      question: '¿Qué debo hacer si la cámara no detecta mi rostro o el escaneo falla?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Verifica que has concedido permisos de cámara al navegador. Si estás en una habitación con poca luz, acércate a una lámpara frontal. En caso de error recurrente, recarga la pestaña o prueba desde Google Chrome o Safari actualizados.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-bio-5',
      category: 'biometria',
      question: '¿Esta medición biométrica sustituye un diagnóstico presencial?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            No. El escaneo facial biométrico es una herramienta orientativa de bienestar y seguimiento de tendencias fisiológicas. En caso de urgencia, dolor torácico o síntomas agudos, debes acudir de inmediato al centro de urgencias más cercano o contactar al 112.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-bio-6',
      category: 'biometria',
      question: '¿Con qué frecuencia se recomienda realizar el escaneo biométrico?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Puedes realizarlo cuando desees comprobar tus constantes basales: por la mañana al despertar, antes o después de una consulta médica, o en momentos de fatiga o estrés para monitorizar tu recuperación a lo largo del tiempo.
          </p>
        </div>
      ),
    },

    // --- VIDEOCONSULTA ---
    {
      id: 'faq-video-1',
      category: 'videoconsulta',
      question: '¿Cómo accedo a mi videoconsulta médica programada?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Diez minutos antes de la hora fijada, en tu pantalla de <strong>Inicio</strong> se activará el botón <strong className="text-black">"Entrar a la sala"</strong> en la tarjeta de próxima cita. Al pulsar entrarás a la sala de espera virtual privada con tu médico asignado.
          </p>
          <p>
            También recibirás una notificación emergente en la campanita con enlace directo a la sala.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-2',
      category: 'videoconsulta',
      question: '¿Qué hago si tengo problemas con la cámara o el micrófono?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Comprueba en el icono de candado de la barra de direcciones de tu navegador que los permisos de cámara y micrófono figuren como <strong>"Permitir"</strong>. Si utilizas auriculares bluetooth o cascos externos, asegúrate de que estén seleccionados como dispositivo predeterminado en tu sistema operativo.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-3',
      category: 'videoconsulta',
      question: '¿Qué sucede si llego tarde o no puedo conectarme a tiempo?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            El facultativo mantendrá la sala abierta durante un margen de cortesía de 10 minutos. Si prevés que no podrás conectarte, te agradecemos cancelar o reprogramar la cita desde <strong>"Historial consultas"</strong> con antelación para permitir que otro paciente utilice ese turno.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-4',
      category: 'videoconsulta',
      question: '¿Puedo conectarme a la videoconsulta desde mi móvil o tablet?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Sí, la plataforma web de Ever Health es 100% responsiva. Puedes acceder directamente desde el navegador de tu smartphone o tablet (Safari en iOS o Chrome en Android) sin necesidad de descargar aplicaciones pesadas.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-5',
      category: 'videoconsulta',
      question: '¿Puede acompañarme un familiar durante la videollamada médica?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Por supuesto. Los acompañantes pueden estar presentes junto a ti frente a la cámara, lo cual es habitual y recomendado en consultas pediátricas con tus hijos o de atención a personas mayores.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-video-6',
      category: 'videoconsulta',
      question: '¿Recibiré un informe médico o receta electrónica tras finalizar la consulta?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Sí. Al concluir la llamada, el especialista redactará el informe clínico con el diagnóstico y recomendaciones, emitiendo recetas electrónicas oficiales descargables en formato PDF desde tu sección <strong>"Historia clínica"</strong>.
          </p>
        </div>
      ),
    },

    // --- CHAT MÉDICO ---
    {
      id: 'faq-chat-1',
      category: 'chat',
      question: '¿Para qué casos es recomendable usar el Chat Médico?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            El chat médico ofrece respuesta ágil con médicos colegiados. Es ideal para:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-black font-medium">
            <li>Dudas sobre dosis o efectos secundarios de medicamentos.</li>
            <li>Orientación sobre síntomas leves o evolución de cuadros previos.</li>
            <li>Interpretación inicial de resultados analíticos o informes.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-chat-2',
      category: 'chat',
      question: '¿Cuánto tiempo tarda un médico en responder a mi solicitud de chat?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            El tiempo medio estimado de conexión es de <strong>5 a 12 minutos</strong>. En el formulario de solicitud podrás ver en tiempo real el tiempo de espera estimado y el médico asignado disponible.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-chat-3',
      category: 'chat',
      question: '¿Puedo adjuntar fotografías o informes médicos durante la conversación?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Sí. En la parte inferior de la ventana de chat encontrarás el botón para adjuntar imágenes (fotografías de lesiones dérmicas, erupciones, etiquetas de medicamentos) o archivos PDF de analíticas previas.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-chat-4',
      category: 'chat',
      question: '¿Cómo se finaliza la consulta por chat y qué ocurre con la conversación?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            La consulta concluye pulsando el botón <strong>"Finalizar chat"</strong> en la cabecera. Al terminar, la transcripción completa y las indicaciones médicas quedan guardadas de forma segura y confidencial en tu <strong>"Historial consultas"</strong> para tu consulta posterior.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-chat-5',
      category: 'chat',
      question: '¿El servicio de chat médico está disponible las 24 horas del día?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Sí, el servicio de medicina general por chat cuenta con guardia médica activa las 24 horas del día, todos los días del año. Para especialidades como nutrición o psicología, la atención se presta en los horarios indicados en el directorio.
          </p>
        </div>
      ),
    },

    // --- HISTORIA CLÍNICA ---
    {
      id: 'faq-hist-1',
      category: 'historial',
      question: '¿Dónde puedo consultar y descargar mis informes y recetas?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            En la barra lateral haz clic en <strong>"Historia clínica"</strong> o <strong>"Historial consultas"</strong>. Desde allí puedes ver el resumen de cada consulta, consultar recomendaciones médicas y descargar recetas en formato PDF oficial.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-hist-2',
      category: 'historial',
      question: '¿Cómo añado perfiles de familiares o mascotas?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Ever Health permite gestionar a tus dependientes desde una única cuenta. Accede a las secciones <strong>"Familiares"</strong> o <strong>"Mascotas"</strong> en la navegación para añadir nuevos perfiles y agendar consultas individualizadas.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-hist-3',
      category: 'historial',
      question: '¿Quién tiene acceso a mi información médica y antecedentes?',
      answer: (
        <div className="flex items-start gap-3 p-3.5 bg-white border border-[#e2e8f0] text-[14px] text-[#475569]">
          <Lock className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Tu información médica está cifrada bajo estándares de seguridad hospitalaria (RGPD). Únicamente tú y los facultativos sanitarios colegiados que te atienden en consulta tienen acceso puntual a tus datos clínicos.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-hist-4',
      category: 'historial',
      question: '¿Cómo puedo subir o actualizar mis propios documentos médicos y análisis?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            En la sección <strong>"Historia clínica"</strong>, pulsa el botón <strong>"Subir documentos"</strong> o usa el menú de acciones rápidas (+). Podrás clasificar cada archivo (Analíticas, Informes médicos, Imágenes radiológicas u Otros) para que tu médico los revise antes de la consulta.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-hist-5',
      category: 'historial',
      question: '¿Qué formatos y tamaños de archivo están permitidos al subir documentos?',
      answer: (
        <div className="flex flex-col gap-2 text-[14px] text-[#475569] leading-relaxed">
          <p>
            Aceptamos archivos en formato <strong>PDF, JPG, PNG y DOCX</strong> con un tamaño de hasta <strong>10 MB</strong> por documento. Te recomendamos subir los informes en PDF legible para facilitar la visualización del médico.
          </p>
        </div>
      ),
    },
  ];

  // Filtering de preguntas
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchCat = item.category === activeCategory;
      if (!matchCat) return false;
      if (!searchTerm.trim()) return true;

      const qLower = item.question.toLowerCase();
      const termLower = searchTerm.toLowerCase();
      return qLower.includes(termLower);
    });
  }, [faqs, activeCategory, searchTerm]);

  // Chequeo si el término de búsqueda coincide con la información de Soporte Técnico
  const soporteMatchesSearch = useMemo(() => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const keywords = [
      'soporte',
      'tecnico',
      'técnico',
      'directo',
      'atencion',
      'atención',
      'general',
      'biometria',
      'biometría',
      'correo',
      'email',
      'telefono',
      'teléfono',
      'direccion',
      'dirección',
      'madrid',
      'naciones',
      'contacto',
      'ayuda',
      '911231214',
      '918220518',
    ];
    return keywords.some((k) => k.includes(term) || term.includes(k));
  }, [searchTerm]);

  if (!isOpen) return null;

  const contentMarkup = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header Panel minimalista: Sin icono, solo Help Center, y subtítulo conservado */}
      <div className="px-5 py-3.5 border-b border-[#f1f5f9] flex items-center justify-between gap-3 shrink-0 bg-white">
        <div className="flex flex-col">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-black leading-tight tracking-tight">
            Help Center
          </h2>
          <span className="text-[13px] text-[var(--color-page-subtitle)] font-normal mt-0.5">
            Preguntas frecuentes y soporte en línea
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] text-[#64748b] hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title="Cerrar Help Center"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
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
            placeholder="¿En qué podemos ayudarte? Ej. Biometría, Videoconsulta..."
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

      {/* Category Tabs: Deslizante horizontal minimalista */}
      <div className="px-5 py-2 shrink-0 border-b border-[#f1f5f9]">
        <Tabs
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="minimal"
        />
      </div>

      {/* Body Content: Cuadro estático para Soporte Técnico Directo, o Acordeones cerrados para otras categorías */}
      <div className="flex-1 overflow-y-auto custom-scrollbar-minimal px-5 py-4 flex flex-col gap-2.5">
        {activeCategory === 'soporte' ? (
          soporteMatchesSearch ? (
            /* Contenedor limpio sin borde exterior según especificación */
            <div className="bg-white p-2 flex flex-col gap-4 text-[14px]">
              {/* Título y descripción */}
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-bold text-black leading-tight">
                  Soporte Técnico Directo
                </h3>
                <p className="text-[13px] text-[var(--color-page-subtitle)] font-normal leading-relaxed">
                  Comunícate directamente con nuestro equipo de atención general o soporte técnico biométrico especializado.
                </p>
              </div>

              {/* Bloque 1: Atención General */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                  Atención General
                </span>

                <div className="flex flex-col divide-y divide-[#f1f5f9]">
                  {/* Correo general */}
                  <div className="flex items-center justify-between py-2 gap-2">
                    <a
                      href="mailto:soporte@everhealth.es"
                      className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors min-w-0"
                    >
                      <Mail className="w-4 h-4 text-[#64748b] shrink-0" />
                      <span className="font-normal text-[14px] truncate">soporte@everhealth.es</span>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleCopy('soporte@everhealth.es', 'Correo')}
                      title="Copiar correo"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>

                  {/* Teléfono general */}
                  <div className="flex items-center justify-between py-2 gap-2">
                    <a
                      href="tel:911231214"
                      className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#64748b] shrink-0" />
                      <span className="font-normal text-[14px]">911 23 12 14</span>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleCopy('911231214', 'Teléfono')}
                      title="Copiar teléfono"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>

                  {/* Dirección general */}
                  <div className="flex items-center justify-between py-2 gap-2">
                    <div className="flex items-center gap-2.5 text-black min-w-0">
                      <MapPin className="w-4 h-4 text-[#64748b] shrink-0" />
                      <span className="font-normal text-[14px] truncate">C/ Naciones 10, 28006 Madrid</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleCopy('C/ Naciones 10, 28006 Madrid', 'Dirección')}
                      title="Copiar dirección"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Línea divisoria minimalista */}
              <hr className="border-[#f1f5f9] my-0" />

              {/* Bloque 2: Soporte Biométrico */}
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                  Soporte Biométrico
                </span>

                <div className="flex flex-col divide-y divide-[#f1f5f9]">
                  {/* Correo biométrico */}
                  <div className="flex items-center justify-between py-2 gap-2">
                    <a
                      href="mailto:biometria@everhealth.es"
                      className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors min-w-0"
                    >
                      <Mail className="w-4 h-4 text-[#64748b] shrink-0" />
                      <span className="font-normal text-[14px] truncate">biometria@everhealth.es</span>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleCopy('biometria@everhealth.es', 'Correo de biometría')}
                      title="Copiar correo"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>

                  {/* Teléfono biométrico */}
                  <div className="flex items-center justify-between py-2 gap-2">
                    <a
                      href="tel:918220518"
                      className="flex items-center gap-2.5 text-black hover:text-[#d50475] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#64748b] shrink-0" />
                      <span className="font-normal text-[14px]">918 220 518</span>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleCopy('918220518', 'Teléfono de biometría')}
                      title="Copiar teléfono"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Horarios de atención */}
              <div className="pt-2 border-t border-[#f1f5f9] flex items-start gap-2.5 text-[12px] text-[#64748b] leading-relaxed">
                <Clock className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-black font-medium">Horario de soporte telefónico:</strong> Lunes a Viernes de 08:00 a 20:00 h. Consultas médicas urgentes y chat disponibles 24/7.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center gap-2 text-[#64748b]">
              <HelpCircle className="w-8 h-8 text-[#cbd5e1]" />
              <p className="text-[14px] font-bold text-black">No se encontraron resultados</p>
              <p className="text-[12px]">Prueba con otra palabra clave en Soporte técnico.</p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-2 text-[12px] font-bold text-[#d50475] hover:underline cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            </div>
          )
        ) : (
          /* Acordeones para Biometría, Videoconsulta, Chat médico e Historia clínica (cerrados por defecto) */
          filteredFaqs.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-2 text-[#64748b]">
              <HelpCircle className="w-8 h-8 text-[#cbd5e1]" />
              <p className="text-[14px] font-bold text-black">No se encontraron resultados</p>
              <p className="text-[12px]">Prueba con otra palabra clave en {categories.find((c) => c.id === activeCategory)?.label}.</p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-2 text-[12px] font-bold text-[#d50475] hover:underline cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openAccordionIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="border border-[#e2e8f0] rounded-none overflow-hidden bg-white transition-all shadow-2xs"
                >
                  {/* Accordion Trigger: Pregunta limpia a 14px */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-4 py-3.5 flex items-start justify-between gap-3 text-left transition-colors cursor-pointer bg-white hover:bg-[#fafafa]"
                  >
                    <span className="text-[14px] font-bold text-black leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#64748b] shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Content a 14px */}
                  {isOpen && (
                    <div className="px-4 pb-4 pt-2 border-t border-[#f1f5f9] animate-fadeIn bg-white text-[14px]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )
        )}
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

      {/* Toast Flotante para notificaciones de estado (copiar correo, llamada, dirección) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[360px] max-w-[calc(100vw-32px)]">
          <Toast
            variant={toast.variant}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </>
  );
};
