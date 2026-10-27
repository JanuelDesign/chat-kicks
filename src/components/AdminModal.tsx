import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  Sparkles,
  Target,
  RefreshCcw,
  Activity,
  X,
  CheckCircle2,
  Info,
  RotateCcw,
} from 'lucide-react';
import { PRESET_CAMPAIGNS, PRESET_ORIGINS } from './SimulationBar.tsx';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  campanaActiva: string;
  setCampanaActiva: (val: string) => void;
  origen: string;
  setOrigen: (val: string) => void;
  onApplyAndReset: (newCampana: string, newOrigen: string) => void;
  onSyncCatalog: () => void;
  isSyncing: boolean;
  totalProductsCount: number;
  events: any[];
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  campanaActiva,
  setCampanaActiva,
  origen,
  setOrigen,
  onApplyAndReset,
  onSyncCatalog,
  isSyncing,
  totalProductsCount,
  events,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'campaign' | 'sync' | 'events'>('campaign');

  const [tempCampana, setTempCampana] = useState(campanaActiva);
  const [tempOrigen, setTempOrigen] = useState(origen);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === 'kicks' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN incorrecto. Ingrese 1234 para acceder.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1A1A1A] border border-[#333333] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#141414] border-b border-[#2A2A2A] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FEE000] text-[#1A1A1A] flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-stone-100 flex items-center gap-2">
                Panel de Administración Kicks Online
                <span className="text-[10px] font-sans bg-[#FEE000]/20 text-[#FEE000] px-2 py-0.5 rounded-full border border-[#FEE000]/40">
                  Uso Exclusivo Interno
                </span>
              </h3>
              <p className="text-[11px] text-stone-400">
                Configuración de campañas, origen del cliente y telemetría de Marta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FEE000]/10 border border-[#FEE000]/30 text-[#FEE000] flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <h4 className="font-heading font-bold text-lg text-stone-100">
              Acceso Restringido a Administradores
            </h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Esta sección está oculta para los clientes finales. Ingrese el PIN de administrador para configurar la asesora.
            </p>
            <form onSubmit={handlePinSubmit} className="max-w-xs mx-auto space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN (por defecto: 1234)"
                autoFocus
                className="w-full bg-[#121212] border border-[#333333] rounded-xl px-4 py-2.5 text-center text-sm text-stone-100 focus:outline-none focus:border-[#FEE000]"
              />
              {pinError && <p className="text-xs text-red-400">{pinError}</p>}
              <button
                type="submit"
                className="w-full bg-[#FEE000] hover:bg-[#ebd000] text-[#1A1A1A] font-heading font-bold py-2.5 rounded-xl text-xs transition-colors shadow"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sub-tabs */}
            <div className="flex border-b border-[#2A2A2A] bg-[#141414] px-4 pt-2 gap-2 text-xs font-heading">
              <button
                onClick={() => setActiveSubTab('campaign')}
                className={`px-3 py-2 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'campaign'
                    ? 'border-[#FEE000] text-[#FEE000]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Campaña & Origen
              </button>
              <button
                onClick={() => setActiveSubTab('sync')}
                className={`px-3 py-2 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'sync'
                    ? 'border-[#FEE000] text-[#FEE000]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                Sincronización ({totalProductsCount})
              </button>
              <button
                onClick={() => setActiveSubTab('events')}
                className={`px-3 py-2 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'events'
                    ? 'border-[#FEE000] text-[#FEE000]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Eventos ({events.length})
              </button>
            </div>

            {/* Sub-tab Body */}
            <div className="flex-1 overflow-y-auto p-5 text-xs text-stone-200 space-y-4">
              {activeSubTab === 'campaign' && (
                <div className="space-y-4">
                  {/* Campaign configuration */}
                  <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 space-y-2.5">
                    <label className="font-heading font-bold text-[#FEE000] flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4" /> Contexto de Campaña Activa:
                    </label>
                    <select
                      className="w-full bg-[#1E1E1E] border border-[#333333] rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#FEE000]"
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
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg p-2.5 text-xs text-stone-300 focus:outline-none focus:border-[#FEE000] font-mono leading-relaxed"
                      placeholder="Ej: Black Friday del 01 al 30 de noviembre..."
                    />
                  </div>

                  {/* Origin configuration */}
                  <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 space-y-2.5">
                    <label className="font-heading font-bold text-[#FEE000] flex items-center gap-1.5 text-xs">
                      <Target className="w-4 h-4" /> Origen del Cliente (Simulación):
                    </label>
                    <select
                      className="w-full bg-[#1E1E1E] border border-[#333333] rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#FEE000]"
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
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg p-2.5 text-xs text-stone-300 focus:outline-none focus:border-[#FEE000] font-mono leading-relaxed"
                      placeholder="Origen del cliente (Meta ad, anuncio de calzado específico, etc.)..."
                    />
                  </div>

                  <div className="bg-[#121212] p-3 rounded-lg border border-[#282828] flex items-start gap-2 text-[11px] text-stone-400">
                    <Info className="w-4 h-4 text-[#FEE000] shrink-0 mt-0.5" />
                    <span>
                      Marta adapta su primer mensaje de acuerdo al origen y campaña activa. Si el origen es un anuncio con handle específico, abrirá de inmediato recomendando ese modelo sin preguntas genéricas.
                    </span>
                  </div>
                </div>
              )}

              {activeSubTab === 'sync' && (
                <div className="space-y-4">
                  <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-heading font-bold text-sm text-stone-100">
                          Catálogo Shopify en Vivo
                        </h4>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          Fuente de datos: <code className="text-[#FEE000]">kicksvenezuela.com/products.json</code>
                        </p>
                      </div>
                      <span className="bg-emerald-950 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-800/60 font-semibold">
                        {totalProductsCount} Productos Sincronizados
                      </span>
                    </div>

                    <p className="text-stone-300 leading-relaxed text-xs">
                      Marta utiliza exclusivamente este catálogo para responder con nombres exactos, precios vigentes en dólares y bolívares (BCV), tallas en inventario y enlaces directos a la tienda online.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={onSyncCatalog}
                        disabled={isSyncing}
                        className="bg-[#FEE000] hover:bg-[#ebd000] disabled:opacity-60 text-[#1A1A1A] font-heading font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors shadow"
                      >
                        <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Sincronizando con kicksvenezuela.com...' : 'Sincronizar Inventario Ahora'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'events' && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-400">
                    Registro de llamadas a herramientas internas (<code>buscar_productos</code>, <code>obtener_producto</code>, <code>registrar_evento</code>) ejecutadas silenciosamente por Marta:
                  </p>
                  {events.length === 0 ? (
                    <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-8 text-center text-stone-500">
                      No hay eventos registrados en esta sesión aún.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {events.map((evt, idx) => (
                        <div
                          key={idx}
                          className="bg-[#141414] border border-[#282828] rounded-xl p-3 text-xs space-y-1 font-mono"
                        >
                          <div className="flex items-center justify-between text-stone-400 text-[10px]">
                            <span className="text-[#FEE000] font-bold">{evt.tipo}</span>
                            <span>{evt.timestamp ? new Date(evt.timestamp).toLocaleTimeString() : 'Ahora'}</span>
                          </div>
                          <pre className="text-[11px] text-stone-300 overflow-x-auto p-1.5 bg-[#0D0D0D] rounded-md">
                            {JSON.stringify(evt.datos, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#141414] border-t border-[#2A2A2A] px-5 py-3 flex items-center justify-between">
              <button
                onClick={() => {
                  setTempCampana(PRESET_CAMPAIGNS[0].value);
                  setTempOrigen(PRESET_ORIGINS[0].value);
                }}
                className="text-xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                Restablecer Valores
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 text-xs text-stone-400 hover:text-white transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setCampanaActiva(tempCampana);
                    setOrigen(tempOrigen);
                    onApplyAndReset(tempCampana, tempOrigen);
                    onClose();
                  }}
                  className="bg-[#FEE000] hover:bg-[#ebd000] text-[#1A1A1A] font-heading font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Aplicar y Probar Marta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
