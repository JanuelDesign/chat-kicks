import React, { useState } from 'react';
import { Settings, Sparkles, Target, RotateCcw, X, Info } from 'lucide-react';

interface SimulationBarProps {
  isOpen: boolean;
  onClose: () => void;
  campanaActiva: string;
  setCampanaActiva: (val: string) => void;
  origen: string;
  setOrigen: (val: string) => void;
  onApplyAndReset: (newCampana: string, newOrigen: string) => void;
}

export const PRESET_CAMPAIGNS = [
  {
    label: 'Black Friday (01 al 30 de noviembre)',
    value:
      'Black Friday: del 01 al 30 de noviembre. Mensaje principal: Súper Precios en productos seleccionados. Condición: el precio promocional aplica solo en divisas en efectivo.',
  },
  {
    label: 'Nueva Colección Hey Dude & Penguin',
    value: 'Lanzamiento: Nueva colección de calzado Hey Dude y polos Original Penguin para la temporada.',
  },
  {
    label: 'Sin campaña activa',
    value: 'Catálogo regular sin promociones adicionales activas.',
  },
];

export const PRESET_ORIGINS = [
  {
    label: 'Meta Ad: Hey Dude Wally Sox Charcoal (Apertura directa)',
    value:
      'Meta Ads: Campaña de Anuncio Específico del producto Hey Dude Wally Sox Charcoal Grey (handle: hey-dude-wally-sox-charcoal)',
  },
  {
    label: 'Meta Ad: Polos Original Penguin The Earl',
    value:
      'Meta Ads: Campaña de Polos Original Penguin The Earl Piqué (handle: penguin-polo-clasico-earl-navy)',
  },
  {
    label: 'Visita Web Orgánica (kicksvenezuela.com)',
    value: 'Orgánico: Visita directa a la tienda kicksvenezuela.com',
  },
  {
    label: 'WhatsApp: Referido por recomendación',
    value: 'WhatsApp: Cliente referido buscando regalo para su esposo',
  },
];

export const SimulationBar: React.FC<SimulationBarProps> = ({
  isOpen,
  onClose,
  campanaActiva,
  setCampanaActiva,
  origen,
  setOrigen,
  onApplyAndReset,
}) => {
  const [tempCampana, setTempCampana] = useState(campanaActiva);
  const [tempOrigen, setTempOrigen] = useState(origen);

  if (!isOpen) return null;

  return (
    <div className="bg-stone-950 border-b border-amber-500/30 text-stone-200 px-4 py-4 animate-in slide-in-from-top duration-200 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-amber-400" />
            <h4 className="font-heading font-bold text-sm text-stone-100">
              Panel de Contexto de Marta ({"{{CAMPAÑA_ACTIVA}}"} & {"{{ORIGEN}}"})
            </h4>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
          {/* Campaign Config */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {"{{CAMPAÑA_ACTIVA}}"}
              </label>
            </div>
            <select
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              onChange={(e) => setTempCampana(e.target.value)}
              value={PRESET_CAMPAIGNS.some((c) => c.value === tempCampana) ? tempCampana : 'custom'}
            >
              {PRESET_CAMPAIGNS.map((c, i) => (
                <option key={i} value={c.value}>
                  {c.label}
                </option>
              ))}
              <option value="custom">Personalizado...</option>
            </select>
            <textarea
              value={tempCampana}
              onChange={(e) => setTempCampana(e.target.value)}
              rows={2}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-300 focus:outline-none focus:border-amber-500/80 font-mono"
              placeholder="Texto de la campaña activa..."
            />
          </div>

          {/* Origin Config */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> {"{{ORIGEN}}"}
              </label>
            </div>
            <select
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              onChange={(e) => setTempOrigen(e.target.value)}
              value={PRESET_ORIGINS.some((o) => o.value === tempOrigen) ? tempOrigen : 'custom'}
            >
              {PRESET_ORIGINS.map((o, i) => (
                <option key={i} value={o.value}>
                  {o.label}
                </option>
              ))}
              <option value="custom">Personalizado...</option>
            </select>
            <textarea
              value={tempOrigen}
              onChange={(e) => setTempOrigen(e.target.value)}
              rows={2}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-300 focus:outline-none focus:border-amber-500/80 font-mono"
              placeholder="Origen del cliente (Meta ad, WhatsApp, etc.)..."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-stone-800 text-xs">
          <p className="text-stone-400 flex items-center gap-1 text-[11px]">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Si el cliente proviene del anuncio de un producto específico, Marta abrirá directamente con ese producto (usando obtener_producto) sin saludo genérico.
            </span>
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setTempCampana(PRESET_CAMPAIGNS[0].value);
                setTempOrigen(PRESET_ORIGINS[0].value);
              }}
              className="px-3 py-1.5 text-stone-400 hover:text-stone-200 text-xs"
            >
              Restablecer Valores
            </button>
            <button
              onClick={() => {
                setCampanaActiva(tempCampana);
                setOrigen(tempOrigen);
                onApplyAndReset(tempCampana, tempOrigen);
                onClose();
              }}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Aplicar y Probar Marta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
