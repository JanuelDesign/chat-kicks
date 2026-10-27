import React from 'react';
import { Sparkles, MessageCircle, Ruler, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'catalog' | 'policies';
  setActiveTab: (tab: 'chat' | 'catalog' | 'policies') => void;
  onOpenSizeGuide: () => void;
  onOpenPolicies: () => void;
  onResetChat: () => void;
  onSyncCatalog?: () => void;
  isSyncing?: boolean;
  totalProductsCount?: number;
  campanaActiva: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSizeGuide,
  onOpenPolicies,
  onResetChat,
  onSyncCatalog,
  isSyncing = false,
  totalProductsCount = 319,
}) => {
  return (
    <header className="bg-[#1A1A1A] border-b border-[#2C2C2C] text-stone-100 sticky top-0 z-30 shadow-lg">
      {/* Top Banner: Black Friday 01 al 30 de noviembre */}
      <div className="bg-[#FEE000] text-[#1A1A1A] px-4 py-2 text-xs sm:text-sm text-center font-heading font-extrabold flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 fill-current animate-pulse shrink-0" />
        <span className="tracking-tight">
          🔥 Black Friday: del 01 al 30 de noviembre • Súper Precios en productos seleccionados (solo divisas en efectivo)
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Official Logo Brand Identity */}
        <div className="flex items-center gap-3">
          <a
            href="https://kicksvenezuela.com"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3.5 transition-opacity hover:opacity-95"
            title="Ir a tienda oficial kicksvenezuela.com"
          >
            {/* The official Kicks Online yellow dotted K emblem */}
            <div className="relative p-1 bg-[#141414] rounded-2xl border-2 border-[#2F2F2F] group-hover:border-[#FEE000] transition-colors shadow-md overflow-hidden">
              <img
                src="/assets/aistudio/KICKS_2f8f0b44.png"
                alt="Kicks Online Venezuela"
                className="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-xl transform group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black tracking-wider text-stone-100 text-base sm:text-lg">
                  KICKS <span className="text-[#FEE000]">ONLINE</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-heading font-extrabold uppercase bg-[#FEE000] text-[#1A1A1A] px-2.5 py-0.5 rounded-full shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Original
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-semibold">Marta 24/7 en línea</span>
                <span className="hidden sm:inline text-stone-600">•</span>
                <span className="hidden sm:inline text-stone-400 font-medium">kicksvenezuela.com</span>
              </div>
            </div>
          </a>
        </div>

        {/* Navigation tabs */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#121212] p-1.5 rounded-2xl border border-[#2B2B2B] font-heading shadow-inner">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-[#FEE000] text-[#1A1A1A] shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Asesora Marta
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-[#FEE000] text-[#1A1A1A] shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            Catálogo Oficial ({totalProductsCount}+)
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'policies'
                ? 'bg-[#FEE000] text-[#1A1A1A] shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Envíos & Políticas
          </button>
        </div>

        {/* Actions (Guía Tallas, WhatsApp, Reiniciar) */}
        <div className="flex items-center gap-2 font-heading">
          <button
            onClick={onOpenSizeGuide}
            title="Guía de tallas oficial"
            className="hidden sm:flex items-center gap-1.5 text-xs text-stone-200 hover:text-[#FEE000] bg-[#222222] hover:bg-[#2A2A2A] px-3 py-2 rounded-xl border border-[#333333] transition-colors font-medium shadow-xs"
          >
            <Ruler className="w-3.5 h-3.5 text-[#FEE000]" />
            <span>Guía Tallas</span>
          </button>

          <a
            href="https://wa.me/584242523184"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl shadow transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={onResetChat}
            title="Reiniciar conversación con Marta"
            className="p-2 text-stone-400 hover:text-white hover:bg-[#252525] rounded-xl border border-[#333333] transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="flex lg:hidden border-t border-[#2A2A2A] bg-[#141414] px-2 py-1.5 gap-1.5 text-xs justify-around font-heading">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all ${
            activeTab === 'chat' ? 'bg-[#FEE000] text-[#1A1A1A]' : 'text-stone-400'
          }`}
        >
          Marta
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all ${
            activeTab === 'catalog' ? 'bg-[#FEE000] text-[#1A1A1A]' : 'text-stone-400'
          }`}
        >
          Catálogo ({totalProductsCount})
        </button>
        <button
          onClick={() => setActiveTab('policies')}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all ${
            activeTab === 'policies' ? 'bg-[#FEE000] text-[#1A1A1A]' : 'text-stone-400'
          }`}
        >
          Envíos & Políticas
        </button>
      </div>
    </header>
  );
};
