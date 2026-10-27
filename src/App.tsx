import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { ChatMessage, ChatMessageData } from './components/ChatMessage.tsx';
import { CatalogView } from './components/CatalogView.tsx';
import { SizeGuideModal } from './components/SizeGuideModal.tsx';
import { StorePoliciesModal } from './components/StorePoliciesModal.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { PRESET_CAMPAIGNS, PRESET_ORIGINS } from './components/SimulationBar.tsx';
import {
  Send,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Lock,
} from 'lucide-react';

import { generateAdvisorResponse } from './services/advisorEngine.ts';
import { syncLiveKicksCatalog } from './data/liveSync.ts';
import { getAllProducts, setLiveCatalog } from './data/products.ts';

// Helper to safely fetch from /api/chat or fallback to local advisorEngine
async function callAdvisorApi(
  messagesHistory: Array<{ role: 'user' | 'assistant'; text: string }>,
  campana: string,
  orig: string
): Promise<{ reply: string; events?: any[] }> {
  const lastUserText = messagesHistory[messagesHistory.length - 1]?.text || '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        messages: messagesHistory,
        campanaActiva: campana,
        origen: orig,
      }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && typeof data.reply === 'string') {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend unavailable, using local advisor engine:', err);
  }

  // Graceful local engine fallback
  const fallback = generateAdvisorResponse(lastUserText, campana, orig);
  return {
    reply: fallback.productsBlock ? `${fallback.reply}\n\n${fallback.productsBlock}` : fallback.reply,
    events: fallback.events,
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'catalog' | 'policies'>('chat');
  const [campanaActiva, setCampanaActiva] = useState<string>(PRESET_CAMPAIGNS[0].value);
  const [origen, setOrigen] = useState<string>(PRESET_ORIGINS[0].value);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState<boolean>(false);
  const [loggedEvents, setLoggedEvents] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(getAllProducts().length);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync catalog directly from kicksvenezuela.com
  const handleSyncCatalog = async () => {
    setIsSyncing(true);
    try {
      const res = await syncLiveKicksCatalog();
      if (res.success && res.products.length > 0) {
        setLiveCatalog(res.products);
        setTotalProductsCount(res.products.length);
        setLoggedEvents((prev) => [
          {
            tipo: 'catalogo_sincronizado_shopify',
            timestamp: new Date().toISOString(),
            datos: { total: res.products.length, fuente: 'https://kicksvenezuela.com/products.json' },
          },
          ...prev,
        ]);
      }
    } catch (e) {
      console.warn('Sync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial greeting based on campaign & origin
  const initChat = async (currentCampana: string, currentOrigen: string) => {
    setIsLoading(true);
    try {
      const data = await callAdvisorApi(
        [{ role: 'user', text: 'INIT' }],
        currentCampana,
        currentOrigen
      );
      const initialMsg: ChatMessageData = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMsg]);

      if (data.events && Array.isArray(data.events)) {
        setLoggedEvents((prev) => [...(data.events || []), ...prev]);
      }
    } catch {
      const fallback = generateAdvisorResponse('INIT', currentCampana, currentOrigen);
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: fallback.productsBlock ? `${fallback.reply}\n\n${fallback.productsBlock}` : fallback.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount + sync live store products
  useEffect(() => {
    initChat(campanaActiva, origen);
    handleSyncCatalog();
  }, []);

  // Handle sending message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessageData = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const data = await callAdvisorApi(
        newHistory.map((m) => ({ role: m.role, text: m.text })),
        campanaActiva,
        origen
      );

      const assistantMsg: ChatMessageData = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (data.events && Array.isArray(data.events)) {
        setLoggedEvents((prev) => [...(data.events || []), ...prev]);
      }
    } catch {
      const fallback = generateAdvisorResponse(text, campanaActiva, origen);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          role: 'assistant',
          text: fallback.productsBlock ? `${fallback.reply}\n\n${fallback.productsBlock}` : fallback.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick inquiry about a specific product from cards or catalog
  const handleAskAboutProduct = (productName: string, size?: string) => {
    setActiveTab('chat');
    const query = size
      ? `Me interesa el producto "${productName}" en talla ${size}. ¿Tienen disponibilidad y cómo es el envío?`
      : `Deseo consultar sobre el producto "${productName}", ¿qué tallas tienen disponibles?`;
    handleSendMessage(query);
  };

  // Preset quick questions for the user
  const quickSuggestions = [
    'Es un obsequio para mi esposo',
    'Busco calzado casual para caballero',
    'Mocasines Hey Dude para dama',
    'Polos Original Penguin The Earl',
    '¿Qué métodos de pago aceptan?',
    '¿Cómo son los envíos a Valencia / Maracaibo?',
    '¿Los productos son 100% originales?',
    'Deseo cerrar mi pedido por WhatsApp',
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-stone-100 flex flex-col font-sans selection:bg-[#FEE000] selection:text-[#1A1A1A]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenPolicies={() => setIsPoliciesOpen(true)}
        onResetChat={() => initChat(campanaActiva, origen)}
        onSyncCatalog={handleSyncCatalog}
        isSyncing={isSyncing}
        totalProductsCount={totalProductsCount}
        campanaActiva={campanaActiva}
      />

      {/* Main Body */}
      <main className="flex-1 flex flex-col relative max-w-7xl w-full mx-auto font-sans">
        {/* TAB 1: Conversational Shopping Advisor (Marta) */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col h-[calc(100vh-80px)] sm:h-[calc(100vh-90px)]">
            {/* Advisor Subheader Info */}
            <div className="bg-[#181818] border-b border-[#282828] px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute inset-0 animate-ping"></div>
                </div>
                <span className="font-heading font-bold text-stone-200">
                  Marta • Asesora Virtual Oficial
                </span>
                <span className="hidden sm:inline text-stone-600">|</span>
                <span className="hidden sm:inline text-stone-400">
                  kicksvenezuela.com ({totalProductsCount} modelos disponibles)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/584242523184"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-heading font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">WhatsApp oficial: +58 424 252 3184</span>
                </a>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onAskAboutProduct={handleAskAboutProduct}
                  bcvRate={45.0}
                />
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 text-stone-400 text-xs pl-2 animate-pulse my-3 font-sans">
                  <div className="w-7 h-7 rounded-full bg-[#FEE000] text-[#1A1A1A] flex items-center justify-center font-heading font-black text-xs shadow">
                    M
                  </div>
                  <span>Marta está verificando el catálogo de kicksvenezuela.com y redactando su respuesta...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Strip */}
            <div className="px-4 py-2.5 bg-[#161616] border-t border-[#262626] overflow-x-auto scrollbar-none flex gap-2 font-heading">
              <span className="text-[11px] text-stone-400 font-semibold shrink-0 flex items-center gap-1 py-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FEE000]" /> Sugerencias:
              </span>
              {quickSuggestions.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(sug)}
                  disabled={isLoading}
                  className="text-[11px] bg-[#222222] hover:bg-[#2A2A2A] text-stone-200 hover:text-[#FEE000] px-3 py-1.5 rounded-full border border-[#333333] hover:border-[#FEE000]/60 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50 font-medium"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-[#1A1A1A] border-t border-[#2A2A2A]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 max-w-4xl mx-auto"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escriba a Marta sobre calzado, ropa, tallas, promociones o envíos..."
                  disabled={isLoading}
                  className="flex-1 bg-[#121212] border border-[#2E2E2E] rounded-2xl px-4 py-3.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#FEE000] disabled:opacity-50 shadow-inner font-sans"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-[#FEE000] hover:bg-[#ebd000] disabled:bg-[#252525] disabled:text-stone-600 text-[#1A1A1A] font-heading font-black p-3.5 rounded-2xl shadow-md transition-colors flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  title="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Elongated Privacy Notice Bar (Cleaned of shipping info as requested) */}
              <div className="w-full max-w-4xl mx-auto mt-2.5 py-2 px-5 rounded-xl bg-[#141414] border border-[#2B2B2B] text-stone-300 text-xs flex items-center justify-center gap-2 shadow-inner text-center font-medium">
                <ShieldCheck className="w-4 h-4 text-[#FEE000] shrink-0" />
                <span>Respetamos su privacidad: nunca solicitamos claves bancarias ni datos confidenciales.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Full Catalog View */}
        {activeTab === 'catalog' && (
          <div className="flex-1 overflow-y-auto">
            <CatalogView
              onAskAboutProduct={handleAskAboutProduct}
              bcvRate={45.0}
              onSyncCatalog={handleSyncCatalog}
              isSyncing={isSyncing}
            />
          </div>
        )}

        {/* TAB 3: Store Policies & Shipping */}
        {activeTab === 'policies' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto font-sans">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FEE000]/10 border border-[#FEE000]/30 text-[#FEE000] mb-3">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-100">
                Políticas de Compra, Envíos y Métodos de Pago
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1.5">
                Kicks Online Venezuela (kicksvenezuela.com) • Calzado y Ropa 100% Original
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-300">
              {/* Shipping card */}
              <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-[#FEE000] flex items-center gap-2">
                    <Truck className="w-5 h-5" /> Envíos a Nivel Nacional & Delivery
                  </h3>
                  <span className="bg-emerald-950 text-emerald-400 text-xs font-heading font-bold px-3 py-1 rounded-full border border-emerald-800/60">
                    Envío Gratis &gt; $50
                  </span>
                </div>
                <p className="leading-relaxed">
                  Realizamos despachos a todo el territorio nacional mediante <strong>MRW, Zoom, Domesa y Tealca</strong> con cobro en destino a la agencia o dirección de su preferencia.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#141414] p-3.5 rounded-xl border border-[#2B2B2B]">
                    <strong className="text-emerald-400 font-heading block mb-1">¡Envío Gratis!:</strong>
                    <span className="text-xs text-stone-400">
                      Disfrute de envío nacional gratuito en compras superiores a $50 en cualquier marca o categoría.
                    </span>
                  </div>
                  <div className="bg-[#141414] p-3.5 rounded-xl border border-[#2B2B2B]">
                    <strong className="text-[#FEE000] font-heading block mb-1">Delivery en Caracas:</strong>
                    <span className="text-xs text-stone-400">
                      Entregas en Caracas y Altos Mirandinos por tarifa fija de $3 (o su equivalente a tasa BCV).
                    </span>
                  </div>
                </div>
              </div>

              {/* Returns & changes card */}
              <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-heading font-bold text-base text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Política de Devoluciones y Cambios (30 Días)
                </h3>
                <p className="leading-relaxed">
                  Tiene un plazo de <strong>30 días naturales</strong> desde la recepción de su compra para solicitar un cambio de talla, cambio de modelo o devolución. El producto debe encontrarse sin uso, con etiquetas puestas y empaque intacto.
                </p>
              </div>

              {/* Payment methods card */}
              <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-heading font-bold text-base text-[#FEE000] flex items-center gap-2">
                  Métodos de Pago Aceptados
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-stone-300">
                  <li>
                    <strong className="text-stone-100">Métodos Disponibles:</strong> Aceptamos divisas en efectivo, transferencias <strong>Zelle</strong>, <strong>PayPal</strong> y <strong>Bolívares (Pago Móvil / transferencia) a la tasa oficial del BCV</strong>.
                  </li>
                </ul>
              </div>

              {/* Guarantees and actions */}
              <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-heading font-bold text-base text-stone-100 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Garantía de Originalidad
                </h3>
                <p className="leading-relaxed">
                  Todos los productos son adquiridos directamente de los distribuidores autorizados de{' '}
                  <strong>Original Penguin, Avia, Hey Dude y Carven</strong>.
                </p>
                <div className="pt-2 flex flex-wrap gap-2.5 font-heading">
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="bg-[#FEE000] hover:bg-[#ebd000] text-[#1A1A1A] font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow"
                  >
                    Consultar Guía de Tallas
                  </button>
                  <a
                    href="https://wa.me/584242523184"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Contactar Asesor Humano por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Discreet Admin Footer link for store operators only */}
      <footer className="border-t border-[#1F1F1F] py-2 px-4 bg-[#0E0E0E] flex items-center justify-between text-[11px] text-stone-500">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Kicks Online Venezuela</span>
          <span>•</span>
          <a
            href="https://kicksvenezuela.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-300 underline"
          >
            kicksvenezuela.com
          </a>
        </div>
        <button
          onClick={() => setIsAdminOpen(true)}
          title="Acceso exclusivo para administradores"
          className="text-stone-600 hover:text-[#FEE000] transition-colors flex items-center gap-1 font-mono text-[10px]"
        >
          <Lock className="w-3 h-3" />
          <span>Acceso Admin</span>
        </button>
      </footer>

      {/* Admin Panel Modal (Hidden from customers) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        campanaActiva={campanaActiva}
        setCampanaActiva={setCampanaActiva}
        origen={origen}
        setOrigen={setOrigen}
        onApplyAndReset={(newC, newO) => initChat(newC, newO)}
        onSyncCatalog={handleSyncCatalog}
        isSyncing={isSyncing}
        totalProductsCount={totalProductsCount}
        events={loggedEvents}
      />

      {/* Modals for Customers */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <StorePoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
      />
    </div>
  );
}
