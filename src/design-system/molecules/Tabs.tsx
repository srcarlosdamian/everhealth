import React from 'react';

export type TabsVariant = 'line' | 'minimal';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: TabsVariant;
  className?: string;
}

/**
 * Molécula Tabs (Navegación horizontal por pestañas):
 * 
 * 1. Variante 'line' (Por defecto - Perfil, Sistema de Diseño, vistas maestras):
 * - Pestaña activa: texto rosa (#d50475), peso font-bold, indicador inferior rosa de 2.5px superpuesto.
 * - Pestañas inactivas: texto neutral (#475569), peso font-medium, hover a negro.
 * - Borde inferior continuo #e2e8f0.
 * 
 * 2. Variante 'minimal' (Help Center, filtros ligeros y navegación secundaria):
 * - Sin línea inferior ni indicador inferior (border-0).
 * - Deslizante horizontal minimalista y limpio con scroll suave y no-scrollbar.
 * - Inactiva: fondo gris 50/100 suave (bg-slate-50), texto gris 400 (text-slate-400), hover sutil a 500.
 * - Activa: fondo gris 100 (bg-slate-100), texto sube a gris 500 máximo (text-slate-500 font-medium, nunca negro).
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'line',
  className = '',
}) => {
  if (variant === 'minimal') {
    return (
      <div className={`w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 py-1 ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`px-3 py-1.5 rounded-[6px] text-[13px] leading-[18px] transition-colors cursor-pointer select-none whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-100 text-slate-500 font-medium'
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100/70 hover:text-slate-500 font-normal'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded font-medium ${
                    isActive ? 'bg-slate-200 text-slate-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Variante 'line' estándar
  return (
    <div className={`w-full border-b border-[#e2e8f0] overflow-x-auto no-scrollbar ${className}`}>
      <div className="flex items-center gap-6 sm:gap-8 min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative py-3.5 px-0.5 text-[15px] sm:text-[16px] leading-[22px] transition-colors cursor-pointer select-none flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'text-[#d50475] font-bold'
                  : 'text-[#475569] font-medium hover:text-black'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#fce7f3] text-[#d50475]' : 'bg-[#f1f5f9] text-[#64748b]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {/* Indicador activo rosa inferior pegado a la línea divisoria */}
              {isActive && (
                <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-[#d50475] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
