import React from 'react';
import { Activity, X, CheckCircle2, Clock } from 'lucide-react';

interface EventItem {
  id?: string;
  timestamp?: string;
  tipo: string;
  datos?: any;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
}

export const EventsModal: React.FC<EventsModalProps> = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl text-stone-100">
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-100">
                Eventos Silenciosos Registrados
              </h3>
              <p className="text-xs text-stone-400">
                Auditoría de llamadas a registrar_evento(tipo, datos)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 text-xs">
          {events.length === 0 ? (
            <div className="text-center py-10 text-stone-500">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aún no se han ejecutado eventos en esta sesión.</p>
              <p className="text-[11px] text-stone-600 mt-1">
                Los eventos se registran cuando Marta muestra productos, gestiona dudas o deriva a WhatsApp.
              </p>
            </div>
          ) : (
            events.map((ev, i) => (
              <div
                key={i}
                className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {ev.tipo}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    {ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : 'Reciente'}
                  </span>
                </div>
                {ev.datos && Object.keys(ev.datos).length > 0 && (
                  <pre className="text-[11px] text-stone-400 bg-stone-900/60 p-2 rounded-lg overflow-x-auto font-mono">
                    {JSON.stringify(ev.datos, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
