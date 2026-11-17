import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

/**
 * Molécula Tabs (Navegación horizontal por pestañas):
 * - Cumple con el diseño oficial de Ever Health:
 * - Pestaña activa: texto rosa (#d50475), peso font-bold, indicador inferior rosa (#d50475) de 2.5px superpuesto al borde inferior.
 * - Pestañas inactivas: texto neutral (#475569), peso font-medium, hover a negro (#000000).
 * - Borde inferior continuo #e2e8f0 en todo el ancho del contenedor.
 * - Soporte responsivo de desplazamiento horizontal fluido en dispositivos móviles.
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
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
