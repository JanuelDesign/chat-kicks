import {
  KICKS_PRODUCTS,
  buscarProductos,
  obtenerProducto,
  Product,
} from '../data/products.ts';

export interface AdvisorResult {
  reply: string;
  productsBlock: string;
  events: Array<{ tipo: string; datos: any }>;
}

export function generateAdvisorResponse(
  userText: string,
  campanaActiva: string,
  origen: string
): AdvisorResult {
  const lower = (userText || '').toLowerCase().trim();
  const registeredEvents: Array<{ tipo: string; datos: any }> = [];

  // 1. Direct opening if origin is an ad for a specific product
  if (
    origen &&
    (origen.includes('hey-dude-wally-sox-charcoal') ||
      origen.toLowerCase().includes('wally sox') ||
      origen.includes('penguin-polo-clasico-earl-navy')) &&
    (!userText || userText === 'INIT' || lower === 'init')
  ) {
    const handle = origen.includes('penguin-polo-clasico-earl-navy')
      ? 'penguin-polo-clasico-earl-navy'
      : 'hey-dude-wally-sox-charcoal';
    const prod = obtenerProducto(handle);

    if (prod) {
      registeredEvents.push({
        tipo: 'anuncio_origen_abierto',
        datos: { handle: prod.handle, origen },
      });

      const jsonBlock = `<productos>\n${JSON.stringify(
        [
          {
            nombre: prod.nombre,
            marca: prod.marca,
            precio: `$${prod.precio.toFixed(2)}`,
            precio_anterior: prod.precio_anterior
              ? `$${prod.precio_anterior.toFixed(2)}`
              : '',
            tallas_disponibles: prod.tallas_disponibles,
            imagen: prod.imagen,
            link: prod.link,
          },
        ],
        null,
        2
      )}\n</productos>`;

      return {
        reply: `Bienvenido a Kicks Online Venezuela. Veo que tiene interés en el modelo ${prod.nombre}, confeccionado con materiales premium de ${prod.marca} para máxima comodidad.\n\n¿Desea que verifiquemos su talla para coordinar su envío a cualquier parte del país?`,
        productsBlock: jsonBlock,
        events: registeredEvents,
      };
    }
  }

  // 2. Initial greeting or organic visit
  if (!userText || userText === 'INIT' || lower === 'init' || lower.includes('hola') || lower.includes('buenas')) {
    let campaignMention = '';
    if (campanaActiva && campanaActiva.toLowerCase().includes('black friday')) {
      campaignMention = ' Le informo que nos encontramos en temporada especial de Black Friday.';
    }
    return {
      reply: `Bienvenido a Kicks Online Venezuela. Soy Marta, su asesora de compras, y con gusto le ayudo a encontrar lo que busca.${campaignMention}\n\n¿La compra es para usted o se trata de un obsequio?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 3. Gift shoppers
  if (
    lower.includes('regalo') ||
    lower.includes('obsequio') ||
    lower.includes('esposo') ||
    lower.includes('pareja') ||
    lower.includes('novio') ||
    lower.includes('novia') ||
    lower.includes('familiar')
  ) {
    return {
      reply: `Es un excelente detalle. Para orientarle con la opción ideal, me gustaría conocer más sobre esa persona.\n\n¿Me podría comentar qué estilo suele vestir (casual, deportivo o más elegante)?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 4. Authenticity doubts
  const isAuthenticityDoubt =
    (lower.includes('son original') ||
      lower.includes('son originales') ||
      lower.includes('es original') ||
      lower.includes('son autentic') ||
      lower.includes('son auténtic') ||
      lower.includes('réplica') ||
      lower.includes('replica') ||
      lower.includes('copia') ||
      lower.includes('imitacion') ||
      lower.includes('imitación')) &&
    !lower.includes('original penguin');

  if (isAuthenticityDoubt) {
    return {
      reply: `Con total certeza: en Kicks Online Venezuela todos nuestros productos son originales, procedentes directamente de distribuidores autorizados de Original Penguin, Avia, Hey Dude y Carven.\n\n¿Hay alguna de nuestras marcas oficiales que llame su atención en particular?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 5. Shipping questions (Exact policies from kicksvenezuela.com/pages/politica-de-envios)
  if (
    lower.includes('envio') ||
    lower.includes('envío') ||
    lower.includes('caracas') ||
    lower.includes('valencia') ||
    lower.includes('maracaibo') ||
    lower.includes('barquisimeto') ||
    lower.includes('puerto ordaz') ||
    lower.includes('maracay') ||
    lower.includes('tealca') ||
    lower.includes('mrw') ||
    lower.includes('zoom') ||
    lower.includes('domesa')
  ) {
    return {
      reply: `Despachamos a toda Venezuela por MRW, Zoom, Domesa y Tealca, con envío gratis en compras mayores a $50. En Caracas y Altos Mirandinos contamos con delivery propio por $3 (o su equivalente a tasa BCV).\n\n¿En qué ciudad o zona se encuentra para coordinar su entrega?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 6. Payment methods & BCV
  if (
    lower.includes('pago') ||
    lower.includes('zelle') ||
    lower.includes('bcv') ||
    lower.includes('paypal') ||
    lower.includes('efectivo') ||
    lower.includes('bolivar') ||
    lower.includes('bolívares') ||
    lower.includes('pago movil') ||
    lower.includes('pago móvil')
  ) {
    return {
      reply: `Aceptamos Zelle, PayPal, divisas en efectivo y bolívares (Pago Móvil / transferencia) a la tasa oficial del BCV.\n\n¿Qué tipo de prenda o calzado desea adquirir?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 7. Size doubts, returns & size guide (30 days policy)
  if (
    lower.includes('talla') ||
    lower.includes('guia') ||
    lower.includes('guía') ||
    lower.includes('no se mi talla') ||
    lower.includes('no sé mi talla') ||
    lower.includes('medida') ||
    lower.includes('cambio') ||
    lower.includes('devolucion') ||
    lower.includes('devolución')
  ) {
    return {
      reply: `Tiene total tranquilidad: dispone de 30 días para cambios por talla o modelo manteniendo etiquetas y empaque intacto. Puede consultar la guía en https://kicksvenezuela.com/pages/guia-de-tallas.\n\n¿Sabe qué talla calza habitualmente para verificar disponibilidad en catálogo?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 8. Closing / WhatsApp
  if (
    lower.includes('whatsapp') ||
    lower.includes('comprar') ||
    lower.includes('cerrar') ||
    lower.includes('asesor') ||
    lower.includes('pedido') ||
    lower.includes('disponibilidad')
  ) {
    registeredEvents.push({
      tipo: 'paso_a_whatsapp',
      datos: { origen: 'solicitud_cierre_chat' },
    });
    return {
      reply: `Con gusto le acompaño al siguiente paso. Un asesor de boutique verificará su pedido, talla y datos de envío de inmediato por WhatsApp: https://wa.me/584242523184.\n\n¿Desea que le prepare el resumen para enviárselo directamente?`,
      productsBlock: '',
      events: registeredEvents,
    };
  }

  // 9. Search products according to query
  let genero: string | undefined = undefined;
  if (lower.includes('caballero') || lower.includes('hombre')) genero = 'caballero';
  if (lower.includes('dama') || lower.includes('mujer')) genero = 'dama';

  let marca: string | undefined = undefined;
  if (lower.includes('penguin') || lower.includes('original penguin')) marca = 'Original Penguin';
  if (lower.includes('hey dude') || lower.includes('dude') || lower.includes('wally') || lower.includes('wendy')) marca = 'Hey Dude';
  if (lower.includes('avia')) marca = 'Avia';
  if (lower.includes('carven')) marca = 'Carven';

  let categoria: string | undefined = undefined;
  if (lower.includes('polo') || lower.includes('camisa') || lower.includes('ropa') || lower.includes('vestido') || lower.includes('short')) categoria = 'ropa';
  if (lower.includes('zapato') || lower.includes('mocas') || lower.includes('sneaker') || lower.includes('tenis') || lower.includes('calzado') || lower.includes('running') || lower.includes('bota')) categoria = 'calzado';

  // Search
  const matches = buscarProductos({
    genero,
    marca,
    categoria,
    texto: userText.replace(/(busco|quiero|tienen|para|en|de|los|las|un|una)/gi, '').trim(),
  }).slice(0, 3);

  if (matches.length > 0) {
    registeredEvents.push({
      tipo: 'producto_mostrado',
      datos: { handles: matches.map((m) => m.handle) },
    });

    const jsonBlock = `<productos>\n${JSON.stringify(
      matches.map((p) => ({
        nombre: p.nombre,
        marca: p.marca,
        precio: `$${p.precio.toFixed(2)}`,
        precio_anterior: p.precio_anterior ? `$${p.precio_anterior.toFixed(2)}` : '',
        tallas_disponibles: p.tallas_disponibles,
        imagen: p.imagen,
        link: p.link,
      })),
      null,
      2
    )}\n</productos>`;

    const brandNames = Array.from(new Set(matches.map((m) => m.marca))).join(' y ');
    return {
      reply: `He seleccionado estas alternativas de ${brandNames} que destacan por su versatilidad y excelente diseño.\n\n¿Alguna de estas opciones se ajusta a lo que tiene en mente?`,
      productsBlock: jsonBlock,
      events: registeredEvents,
    };
  }

  // 10. General discovery question
  return {
    reply: `Entendido. Disponemos de calzado y prendas 100% originales de Original Penguin, Hey Dude, Avia y Carven.\n\n¿Está buscando una prenda o calzado de estilo casual, deportivo o formal?`,
    productsBlock: '',
    events: registeredEvents,
  };
}
