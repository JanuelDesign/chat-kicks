import React, { useState } from 'react';
import { ExternalLink, MessageCircle, Tag } from 'lucide-react';

export interface CardProduct {
  nombre: string;
  marca: string;
  precio: string;
  precio_anterior?: string;
  tallas_disponibles: string[];
  imagen: string;
  link: string;
}

interface ProductCardProps {
  product: CardProduct;
  onAskAboutProduct?: (productName: string, size?: string) => void;
  bcvRate?: number; // e.g. 45.0 Bs/$
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAskAboutProduct,
  bcvRate = 45.0,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.tallas_disponibles?.[0] || ''
  );

  // Parse numeric price for BCV calculation
  const numericPrice = parseFloat(product.precio.replace(/[^0-9.]/g, '')) || 0;
  const bcvPrice = (numericPrice * bcvRate).toLocaleString('es-VE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const hasOffer = Boolean(product.precio_anterior && product.precio_anterior.trim() !== '');

  // Generate pre-filled WhatsApp message
  const waText = encodeURIComponent(
    `Hola Kicks Venezuela. Estuve conversando con Marta y deseo concretar la compra del producto: ${product.nombre} (${product.marca})${
      selectedSize ? ` en talla ${selectedSize}` : ''
    }. ¿Tienen disponibilidad para envío?`
  );
  const waUrl = `https://wa.me/584242523184?text=${waText}`;

  // Brand style badges
  const brandBadges: Record<string, string> = {
    'Original Penguin': 'bg-blue-950 text-blue-300 border-blue-800',
    'Hey Dude': 'bg-amber-950 text-amber-300 border-amber-800',
    'Avia': 'bg-red-950 text-red-300 border-red-800',
    'Carven': 'bg-stone-800 text-stone-200 border-stone-700',
  };

  return (
    <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl overflow-hidden shadow-md hover:border-[#FEE000]/70 hover:shadow-xl transition-all flex flex-col group text-stone-100">
      {/* Product Image */}
      <div className="relative aspect-4/3 w-full bg-[#141414] overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              brandBadges[product.marca] || 'bg-stone-800 text-stone-200 border-stone-700'
            }`}
          >
            {product.marca}
          </span>
          {hasOffer && (
            <span className="text-[10px] font-extrabold bg-[#FEE000] text-[#1A1A1A] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Tag className="w-2.5 h-2.5" /> Oferta
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h4 className="font-heading font-bold text-sm text-stone-100 line-clamp-2 leading-snug">
            {product.nombre}
          </h4>

          {/* Pricing */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-heading font-extrabold text-[#FEE000] tracking-tight">
              {product.precio}
            </span>
            {hasOffer && (
              <span className="text-xs line-through text-stone-500 font-medium">
                {product.precio_anterior}
              </span>
            )}
            <span className="text-[11px] text-stone-400 ml-auto font-mono">
              ~ Bs. {bcvPrice}
            </span>
          </div>
          <p className="text-[10px] text-stone-400 italic mt-0.5">
            {hasOffer ? '*Súper Precio en divisas en efectivo' : '*Tasa oficial BCV'}
          </p>
        </div>

        {/* Sizes */}
        {product.tallas_disponibles && product.tallas_disponibles.length > 0 && (
          <div>
            <div className="text-[11px] text-stone-400 font-medium mb-1.5 flex items-center justify-between">
              <span>Tallas disponibles:</span>
              <span className="text-[#FEE000] font-bold">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
              {product.tallas_disponibles.map((talla) => {
                const isSelected = selectedSize === talla;
                return (
                  <button
                    key={talla}
                    type="button"
                    onClick={() => setSelectedSize(talla)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#FEE000] text-[#1A1A1A] border-[#FEE000] font-bold shadow-xs'
                        : 'bg-[#141414] text-stone-300 border-[#2D2D2D] hover:border-[#FEE000]/60'
                    }`}
                  >
                    {talla}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#2A2A2A] flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>

            {onAskAboutProduct && (
              <button
                type="button"
                onClick={() => onAskAboutProduct(product.nombre, selectedSize)}
                title="Consultar a Marta sobre disponibilidad o estilo"
                className="bg-[#242424] hover:bg-[#2F2F2F] text-[#FEE000] text-xs px-2.5 py-2 rounded-xl border border-[#333333] hover:border-[#FEE000]/60 transition-colors font-medium"
              >
                Preguntar
              </button>
            )}
          </div>

          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-stone-400 hover:text-stone-200 text-center flex items-center justify-center gap-1 py-1 hover:underline transition-colors"
          >
            <span>Ver en kicksvenezuela.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
