import React, { useState } from 'react';
import { ProductCard, CardProduct } from './ProductCard.tsx';
import { Volume2, VolumeX, MessageCircle, ExternalLink } from 'lucide-react';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: ChatMessageData;
  onAskAboutProduct?: (productName: string, size?: string) => void;
  bcvRate?: number;
}

// Helper to extract JSON from <productos>...</productos>
function parseProductsBlock(content: string): { cleanText: string; products: CardProduct[] } {
  const match = content.match(/<productos>([\s\S]*?)<\/productos>/);
  if (!match) {
    return { cleanText: content, products: [] };
  }

  const rawJson = match[1].trim();
  let products: CardProduct[] = [];
  try {
    products = JSON.parse(rawJson);
  } catch (err) {
    console.error('Error parsing <productos> JSON:', err);
  }

  const cleanText = content.replace(/<productos>[\s\S]*?<\/productos>/g, '').trim();
  return { cleanText, products };
}

// Format markdown bold and links
function formatText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split('\n');

  return parts.map((paragraph, pIdx) => {
    if (!paragraph.trim()) return <div key={pIdx} className="h-2" />;

    // Parse bold text **...**
    const tokens = paragraph.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed text-sm">
        {tokens.map((token, tIdx) => {
          if (token.startsWith('**') && token.endsWith('**')) {
            return (
              <strong key={tIdx} className="font-bold text-white">
                {token.slice(2, -2)}
              </strong>
            );
          }

          // Handle links inside normal text
          const subTokens = token.split(urlRegex);
          return subTokens.map((sub, sIdx) => {
            if (sub.match(urlRegex)) {
              return (
                <a
                  key={sIdx}
                  href={sub}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FEE000] underline underline-offset-2 hover:text-[#fff266] font-semibold inline-flex items-center gap-0.5"
                >
                  {sub.includes('kicksvenezuela.com')
                    ? sub.replace('https://kicksvenezuela.com', '') || 'kicksvenezuela.com'
                    : sub.includes('wa.me')
                    ? 'WhatsApp Asesor'
                    : sub}
                  <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
                </a>
              );
            }
            return sub;
          });
        })}
      </p>
    );
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onAskAboutProduct,
  bcvRate = 45.0,
}) => {
  const isAssistant = message.role === 'assistant';
  const { cleanText, products } = parseProductsBlock(message.text);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  // Audio speech synthesis for Marta
  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick a natural Spanish female voice if present
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(
      (v) =>
        (v.lang.startsWith('es') || v.lang.includes('Spanish')) &&
        (v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('monica') ||
          v.name.toLowerCase().includes('paulina') ||
          v.name.toLowerCase().includes('marta') ||
          v.name.toLowerCase().includes('sofia'))
    ) || voices.find((v) => v.lang.startsWith('es'));

    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onend = () => setIsPlayingSpeech(false);
    utterance.onerror = () => setIsPlayingSpeech(false);

    setIsPlayingSpeech(true);
    window.speechSynthesis.speak(utterance);
  };

  // Check if message derives to WhatsApp
  const hasWhatsAppHandoff =
    cleanText.includes('wa.me') ||
    cleanText.toLowerCase().includes('asesor por whatsapp') ||
    cleanText.toLowerCase().includes('whatsapp de atención');

  return (
    <div
      className={`flex flex-col gap-2.5 ${
        isAssistant ? 'items-start' : 'items-end'
      } max-w-full my-2`}
    >
      <div
        className={`flex items-start gap-3 max-w-[92%] sm:max-w-[85%] ${
          isAssistant ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        {/* Avatar */}
        {isAssistant ? (
          <div className="w-8 h-8 rounded-full bg-[#FEE000] text-[#1A1A1A] p-0.5 shrink-0 shadow-md flex items-center justify-center font-heading font-black text-sm">
            M
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#252525] border border-[#3A3A3A] flex items-center justify-center text-stone-200 text-xs font-bold shrink-0 font-heading">
            Tú
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-3.5 shadow-sm font-sans ${
            isAssistant
              ? 'bg-[#1E1E1E] border border-[#2D2D2D] text-stone-200'
              : 'bg-[#FEE000] text-[#1A1A1A] font-medium shadow-md'
          }`}
        >
          {isAssistant && (
            <div className="flex items-center justify-between gap-3 mb-1.5 text-[11px] font-heading">
              <span className="text-[#FEE000] font-bold tracking-wide">
                Marta • Asesora Kicks Online
              </span>
              <button
                type="button"
                onClick={handlePlayVoice}
                title="Escuchar respuesta"
                className="text-stone-400 hover:text-[#FEE000] transition-colors flex items-center gap-1 text-[10px]"
              >
                {isPlayingSpeech ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span>Silenciar</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div className={isAssistant ? 'text-stone-200' : 'text-[#1A1A1A] font-medium'}>
            {formatText(cleanText)}
          </div>

          {/* Special WhatsApp Handoff CTA if mentioned in advice */}
          {isAssistant && hasWhatsAppHandoff && (
            <div className="mt-3 pt-2.5 border-t border-[#2D2D2D]">
              <a
                href="https://wa.me/584242523184"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Contactar Asesor Humano por WhatsApp</span>
              </a>
            </div>
          )}

          <div
            className={`text-[10px] mt-1.5 text-right font-mono ${
              isAssistant ? 'text-stone-500' : 'text-[#1A1A1A]/70'
            }`}
          >
            {message.timestamp}
          </div>
        </div>
      </div>

      {/* Product cards showcase (up to 3 products) */}
      {products.length > 0 && (
        <div className="w-full pl-11 pr-2 my-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((p, idx) => (
              <ProductCard
                key={`${p.nombre}-${idx}`}
                product={p}
                onAskAboutProduct={onAskAboutProduct}
                bcvRate={bcvRate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
