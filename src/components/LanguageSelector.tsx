import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: React.ReactNode;
}

// Crisp vector SVG flags matching Figma EVR - 73 (21x15 px)
const FlagES = () => (
  <svg viewBox="0 0 21 15" className="w-[21px] h-[15px] rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)] shrink-0" fill="none">
    <rect width="21" height="15" fill="#C60B1E" />
    <rect y="3.75" width="21" height="7.5" fill="#FFC400" />
    {/* Simplified Coat of arms */}
    <g transform="translate(4.5, 5.5) scale(0.65)">
      <rect x="0" y="0" width="4" height="5" rx="1" fill="#C60B1E" />
      <circle cx="2" cy="2.5" r="1" fill="#0038A8" />
      <rect x="1.5" y="-1.5" width="1" height="1.5" fill="#FFC400" />
    </g>
  </svg>
);

const FlagGB = () => (
  <svg viewBox="0 0 21 15" className="w-[21px] h-[15px] rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)] shrink-0" fill="none">
    <rect width="21" height="15" fill="#012169" />
    {/* White saltire */}
    <path d="M0 0L21 15M21 0L0 15" stroke="white" strokeWidth="2.5" />
    {/* Red saltire */}
    <path d="M0 0L21 15M21 0L0 15" stroke="#C8102E" strokeWidth="1.2" />
    {/* White cross */}
    <path d="M10.5 0V15M0 7.5H21" stroke="white" strokeWidth="4" />
    {/* Red cross */}
    <path d="M10.5 0V15M0 7.5H21" stroke="#C8102E" strokeWidth="2.2" />
  </svg>
);

const FlagFR = () => (
  <svg viewBox="0 0 21 15" className="w-[21px] h-[15px] rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)] shrink-0" fill="none">
    <rect width="7" height="15" fill="#002395" />
    <rect x="7" width="7" height="15" fill="#FFFFFF" />
    <rect x="14" width="7" height="15" fill="#ED2939" />
  </svg>
);

const FlagPT = () => (
  <svg viewBox="0 0 21 15" className="w-[21px] h-[15px] rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)] shrink-0" fill="none">
    <rect width="8.4" height="15" fill="#046A38" />
    <rect x="8.4" width="12.6" height="15" fill="#DA291C" />
    {/* Armillary sphere & shield */}
    <circle cx="8.4" cy="7.5" r="3" fill="#FFC400" />
    <circle cx="8.4" cy="7.5" r="2.2" fill="#FFFFFF" />
    <rect x="7.3" y="6.4" width="2.2" height="2.6" rx="0.5" fill="#0038A8" />
  </svg>
);

const FlagMX = () => (
  <svg viewBox="0 0 21 15" className="w-[21px] h-[15px] rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)] shrink-0" fill="none">
    <rect width="7" height="15" fill="#006847" />
    <rect x="7" width="7" height="15" fill="#FFFFFF" />
    <rect x="14" width="7" height="15" fill="#CE1126" />
    {/* Mexican coat of arms emblem */}
    <g transform="translate(10.5, 7.5) scale(0.6)">
      <circle cx="0" cy="0" r="2.2" fill="#996633" />
      <path d="M-2 1.5 Q0 3.2 2 1.5" stroke="#006847" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
);

const FlagGT = () => (
  <svg viewBox="0 0 21 15" className="w-[21px] h-[15px] rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)] shrink-0" fill="none">
    <rect width="7" height="15" fill="#4997D0" />
    <rect x="7" width="7" height="15" fill="#FFFFFF" />
    <rect x="14" width="7" height="15" fill="#4997D0" />
    {/* Quetzal and laurel wreath */}
    <g transform="translate(10.5, 7.5) scale(0.6)">
      <circle cx="0" cy="0" r="1.4" fill="#FFC400" />
      <path d="M-2.2 -1.5 Q-3 1.5 -0.5 2.5 M2.2 -1.5 Q3 1.5 0.5 2.5" stroke="#007934" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
);

const LANGUAGES: Language[] = [
  { code: 'ES', name: 'Español', flag: <FlagES /> },
  { code: 'EN', name: 'English', flag: <FlagGB /> },
  { code: 'FR', name: 'Français', flag: <FlagFR /> },
  { code: 'PT', name: 'Português', flag: <FlagPT /> },
  { code: 'MX', name: 'Español - Mexico', flag: <FlagMX /> },
  { code: 'GT', name: 'Español - Guatemala', flag: <FlagGT /> },
];

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language>(LANGUAGES[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button: Language Selector (74x32 matching Figma EVR - 73 / 1986:34084) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`h-[32px] px-[10px] rounded-[6px] border bg-white flex items-center gap-[8px] text-[14px] leading-[20px] font-bold text-black transition-colors cursor-pointer select-none ${
          isOpen ? 'border-[#d50475] ring-1 ring-[#d50475]' : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
        }`}
      >
        <Globe className="w-[18px] h-[18px] text-black shrink-0" />
        <span>{selected.code}</span>
      </button>

      {/* Dropdown Menu: Frame "drop" (280x296 matching Figma EVR - 73 / 1986:34059) */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-[280px] bg-white rounded-[8px] p-[8px] border border-[#e2e8f0] shadow-[0_4px_16px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.06)] animate-in fade-in zoom-in-95 duration-100 flex flex-col"
        >
          {LANGUAGES.map((lang) => {
            const isCurrent = lang.code === selected.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelected(lang);
                  setIsOpen(false);
                }}
                className={`w-full h-[40px] px-[8px] rounded-[6px] flex items-center gap-[12px] text-left transition-colors cursor-pointer ${
                  isCurrent ? 'bg-[#f1f5f9]' : 'hover:bg-[#f8fafc]'
                }`}
              >
                {/* Flag Icon (w: 21, h: 15) */}
                <div className="flex items-center justify-center shrink-0">
                  {lang.flag}
                </div>

                {/* Language Label (Helvetica 16px) */}
                <span className="text-[16px] leading-[24px] font-normal text-black truncate">
                  {lang.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
