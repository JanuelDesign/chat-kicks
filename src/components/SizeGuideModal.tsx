import React, { useState } from 'react';
import { X, Ruler, HelpCircle, ExternalLink, ShieldAlert } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'men_shoes' | 'women_shoes' | 'apparel'>('men_shoes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-stone-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FEE000]/10 text-[#FEE000] border border-[#FEE000]/20">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-100">
                Guía de Tallas Oficial
              </h3>
              <p className="text-xs text-stone-400">
                Kicks Online Venezuela • Equivalencias US / EU / CM
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

        {/* Tabs */}
        <div className="px-5 pt-3 border-b border-stone-800/80 flex gap-2">
          <button
            onClick={() => setTab('men_shoes')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'men_shoes'
                ? 'border-[#FEE000] text-[#FEE000]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Calzado Caballero
          </button>
          <button
            onClick={() => setTab('women_shoes')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'women_shoes'
                ? 'border-[#FEE000] text-[#FEE000]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Calzado Dama
          </button>
          <button
            onClick={() => setTab('apparel')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'apparel'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Prendas de Ropa
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {tab === 'men_shoes' && (
            <div>
              <p className="text-stone-300 mb-3">
                Aplica para calzado <strong>Hey Dude</strong>, <strong>Original Penguin</strong>,{' '}
                <strong>Avia</strong> y <strong>Carven</strong>. Si su pie está entre dos tallas en Hey Dude, recomendamos elegir la talla superior.
              </p>
              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">US (Talla Americana)</th>
                      <th className="py-2.5 px-3">EU / VE (Europea/Venezuela)</th>
                      <th className="py-2.5 px-3">CM (Centímetros de pie)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 7</td>
                      <td className="py-2 px-3">EU 40</td>
                      <td className="py-2 px-3">25.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 8</td>
                      <td className="py-2 px-3">EU 41</td>
                      <td className="py-2 px-3">26.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 9</td>
                      <td className="py-2 px-3">EU 42</td>
                      <td className="py-2 px-3">27.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 10</td>
                      <td className="py-2 px-3">EU 43</td>
                      <td className="py-2 px-3">28.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 11</td>
                      <td className="py-2 px-3">EU 44</td>
                      <td className="py-2 px-3">29.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 12</td>
                      <td className="py-2 px-3">EU 45</td>
                      <td className="py-2 px-3">30.0 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'women_shoes' && (
            <div>
              <p className="text-stone-300 mb-3">
                Aplica para mocasines <strong>Hey Dude Wendy</strong>, calzado deportivo{' '}
                <strong>Avia</strong> y mocasines de vestir <strong>Carven</strong>.
              </p>
              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">US (Talla Dama)</th>
                      <th className="py-2.5 px-3">EU / VE (Europea/Venezuela)</th>
                      <th className="py-2.5 px-3">CM (Centímetros)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 6</td>
                      <td className="py-2 px-3">EU 36</td>
                      <td className="py-2 px-3">23.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 7</td>
                      <td className="py-2 px-3">EU 37</td>
                      <td className="py-2 px-3">24.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 8</td>
                      <td className="py-2 px-3">EU 38</td>
                      <td className="py-2 px-3">25.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 9</td>
                      <td className="py-2 px-3">EU 39</td>
                      <td className="py-2 px-3">26.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">US 10</td>
                      <td className="py-2 px-3">EU 40</td>
                      <td className="py-2 px-3">27.0 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'apparel' && (
            <div>
              <p className="text-stone-300 mb-3">
                Medidas para polos y camisas <strong>Original Penguin</strong> y <strong>Carven</strong> (Corte Heritage / Slim fit).
              </p>
              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Talla</th>
                      <th className="py-2.5 px-3">Pecho (Pulgadas / CM)</th>
                      <th className="py-2.5 px-3">Cuello (Camisas)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">S (Small)</td>
                      <td className="py-2 px-3">36 - 38" (91 - 96 cm)</td>
                      <td className="py-2 px-3">14.5 - 15"</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">M (Medium)</td>
                      <td className="py-2 px-3">39 - 41" (99 - 104 cm)</td>
                      <td className="py-2 px-3">15.5 - 16"</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">L (Large)</td>
                      <td className="py-2 px-3">42 - 44" (107 - 112 cm)</td>
                      <td className="py-2 px-3">16.5 - 17"</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">XL (Extra Large)</td>
                      <td className="py-2 px-3">45 - 47" (114 - 119 cm)</td>
                      <td className="py-2 px-3">17.5 - 18"</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold text-amber-400">XXL</td>
                      <td className="py-2 px-3">48 - 50" (122 - 127 cm)</td>
                      <td className="py-2 px-3">18.5 - 19"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Advice for Gift shoppers */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-amber-300 mb-1">
                ¿Está comprando para un obsequio?
              </h5>
              <p className="text-stone-300 leading-relaxed">
                Si no tiene certeza de la medida exacta, puede revisar disimuladamente la etiqueta interior de algún zapato que la persona use a diario. Además, nuestra política de cambios y devoluciones garantiza total tranquilidad.
              </p>
            </div>
          </div>

          {/* Official Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400">
            <a
              href="https://kicksvenezuela.com/pages/guia-de-tallas"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 inline-flex items-center gap-1.5 underline"
            >
              <span>Ver guía completa en kicksvenezuela.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://kicksvenezuela.com/pages/politica-de-devoluciones"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 inline-flex items-center gap-1.5 underline"
            >
              <span>Política de cambios y devoluciones</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
