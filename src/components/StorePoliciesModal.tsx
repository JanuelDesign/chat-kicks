import React from 'react';
import { Truck, CreditCard, Clock, ShieldCheck, MessageCircle, ExternalLink, X, Gift, CheckCircle } from 'lucide-react';

interface StorePoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorePoliciesModal: React.FC<StorePoliciesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-stone-100 font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-100">
                Políticas Oficiales de Kicks Online Venezuela
              </h3>
              <p className="text-xs text-stone-400">
                Información extraída directamente de kicksvenezuela.com
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Card 1: Envíos y Delivery */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-sm">
                <Truck className="w-4 h-4" />
                <span>Envíos Nacionales & Delivery</span>
              </div>
              <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800/60">
                Envío Gratis &gt; $50
              </span>
            </div>
            <ul className="list-disc pl-5 text-stone-300 space-y-1.5 leading-relaxed">
              <li>
                <strong className="text-stone-100">Cobertura Nacional:</strong> Realizamos envíos a todo el territorio nacional por <strong>MRW, Zoom, Domesa o Tealca</strong> (Caracas, Maracaibo, Valencia, Barquisimeto, Maracay, Mérida y todas las ciudades principales).
              </li>
              <li>
                <strong className="text-emerald-400 font-semibold">¡Envío Gratis!:</strong> Ofrecemos <strong>envío gratis</strong> a nivel nacional en todas las compras superiores a <strong>$50</strong>.
              </li>
              <li>
                <strong className="text-stone-100">Delivery propio:</strong> Entregas locales exclusivas en <strong>Caracas y Altos Mirandinos</strong> por una tarifa fija de <strong>$3</strong> o su equivalente en bolívares a tasa oficial BCV.
              </li>
              <li>
                <strong className="text-stone-100">Seguimiento:</strong> Al despachar su pedido, le enviamos por WhatsApp su número de guía oficial para rastreo directo con la agencia de encomienda.
              </li>
            </ul>
          </div>

          {/* Card 2: Devoluciones y Cambios */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Política de Devoluciones y Cambios (30 Días)</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Dispone de <strong>30 días naturales</strong> desde la fecha de recepción para solicitar un cambio o devolución sin complicaciones.
            </p>
            <ul className="list-disc pl-5 text-stone-400 space-y-1">
              <li>
                <strong>Condiciones:</strong> El calzado o prenda debe estar en condiciones originales: sin uso, con etiquetas colocadas y en su empaque intacto.
              </li>
              <li>
                <strong>Motivos aceptados:</strong> Cambio de talla, defecto o daño de fábrica, producto diferente al solicitado, o insatisfacción estética.
              </li>
              <li>
                <strong>Proceso ágil:</strong> Comuníquese por WhatsApp (+58 424 252 3184) con su número de orden y le coordinaremos el cambio o reembolso (en 3 a 5 días hábiles).
              </li>
            </ul>
          </div>

          {/* Card 3: Métodos de Pago */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-heading font-bold text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Métodos de Pago Aceptados</span>
            </div>
            <ul className="list-disc pl-5 text-stone-300 space-y-1.5">
              <li>
                <strong className="text-stone-100">Métodos Aceptados:</strong> Aceptamos <strong>Zelle</strong>, <strong>PayPal</strong>, <strong>Divisas en efectivo</strong> y <strong>Bolívares (Pago Móvil / transferencia) a la tasa oficial del BCV</strong>.
              </li>
              <li>
                <strong className="text-stone-100">Seguridad:</strong> Nunca solicitamos datos bancarios confidenciales ni números de tarjeta en el chat.
              </li>
            </ul>
          </div>

          {/* Card 4: Originalidad & Atención */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 flex items-start gap-3">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-heading font-bold text-stone-200 mb-1">Horario y Canales de Atención</h5>
              <p className="text-stone-400 leading-relaxed">
                <strong className="text-stone-200">Marta (Asesora Virtual):</strong> Disponible las 24 horas.<br />
                <strong className="text-stone-200">Asesores Humanos:</strong> Lunes a viernes de 8:30 a. m. a 5:00 p. m. por WhatsApp oficial (+58 424 252 3184).
              </p>
            </div>
          </div>

          {/* Links directos oficiales */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-400 font-heading">
            <a
              href="https://kicksvenezuela.com/pages/politica-de-envios"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors flex items-center justify-between text-xs"
            >
              <span>Política de Envíos en la web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://kicksvenezuela.com/pages/politica-de-devoluciones"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors flex items-center justify-between text-xs"
            >
              <span>Política de Devoluciones (30 días)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://kicksvenezuela.com/pages/guia-de-tallas"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors flex items-center justify-between text-xs"
            >
              <span>Guía de Tallas Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://kicksvenezuela.com/pages/preguntas-frecuentes"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors flex items-center justify-between text-xs"
            >
              <span>Preguntas Frecuentes</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between font-heading">
          <a
            href="https://wa.me/584242523184"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Asesor WhatsApp: +58 424 252 3184</span>
          </a>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
