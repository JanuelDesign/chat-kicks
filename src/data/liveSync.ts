import { Product, KICKS_PRODUCTS } from './products.ts';

export interface SyncStatus {
  lastSyncTime: string | null;
  totalProducts: number;
  isSyncing: boolean;
  error?: string | null;
  source: 'live-shopify' | 'curated-cache';
}

// Global in-memory cache of live synced products
let cachedLiveProducts: Product[] = [...KICKS_PRODUCTS];
let lastSyncTimestamp: string | null = null;

// Map Shopify product JSON to our internal Product structure
export function mapShopifyProduct(shopifyProd: any): Product {
  const v0 = shopifyProd.variants?.[0] || {};
  const price = parseFloat(v0.price) || 0;
  const comparePrice = v0.compare_at_price ? parseFloat(v0.compare_at_price) : null;
  const isOnSale = Boolean(comparePrice && comparePrice > price);

  // Extract available sizes from all variants
  const availableVariants = shopifyProd.variants?.filter((v: any) => v.available !== false) || [];
  const sizes = Array.from(
    new Set(
      (availableVariants.length > 0 ? availableVariants : shopifyProd.variants || []).map((v: any) => {
        return v.title || v.option1 || 'Única';
      })
    )
  ) as string[];

  // Determine category & gender from title and tags
  const titleLower = (shopifyProd.title || '').toLowerCase();
  const tagsLower = (shopifyProd.tags || []).map((t: string) => t.toLowerCase()).join(' ');

  let genero: 'caballero' | 'dama' | 'unisex' = 'unisex';
  if (titleLower.includes('caballero') || tagsLower.includes('caballero') || titleLower.includes('hombre')) {
    genero = 'caballero';
  } else if (titleLower.includes('dama') || tagsLower.includes('dama') || titleLower.includes('mujer')) {
    genero = 'dama';
  }

  let categoria: 'calzado' | 'ropa' | 'accesorios' = 'calzado';
  let subcategoria = 'calzado';

  if (
    titleLower.includes('camisa') ||
    titleLower.includes('polo') ||
    titleLower.includes('chemise') ||
    titleLower.includes('franela') ||
    titleLower.includes('pantalon') ||
    titleLower.includes('pantalón') ||
    titleLower.includes('bermuda') ||
    titleLower.includes('short') ||
    titleLower.includes('vestido') ||
    titleLower.includes('chaqueta') ||
    shopifyProd.product_type === 'Textil' ||
    shopifyProd.product_type === 'Ropa'
  ) {
    categoria = 'ropa';
    if (titleLower.includes('polo') || titleLower.includes('chemise')) subcategoria = 'polos';
    else if (titleLower.includes('camisa')) subcategoria = 'camisas';
    else if (titleLower.includes('bermuda') || titleLower.includes('short')) subcategoria = 'shorts';
    else if (titleLower.includes('pantalon') || titleLower.includes('pantalón')) subcategoria = 'pantalones';
    else subcategoria = 'prendas';
  } else if (
    titleLower.includes('gorra') ||
    titleLower.includes('sombrero') ||
    titleLower.includes('medias') ||
    titleLower.includes('cinturon') ||
    titleLower.includes('cinturón')
  ) {
    categoria = 'accesorios';
    subcategoria = 'accesorios';
  } else {
    if (titleLower.includes('running') || titleLower.includes('deportivo')) subcategoria = 'running';
    else if (titleLower.includes('mocas') || titleLower.includes('loafer')) subcategoria = 'mocasines';
    else subcategoria = 'sneakers';
  }

  // Normalize vendor
  let marca: 'Original Penguin' | 'Avia' | 'Hey Dude' | 'Carven' = 'Original Penguin';
  const vendorLower = (shopifyProd.vendor || '').toLowerCase();
  if (vendorLower.includes('dude') || titleLower.includes('hey dude') || titleLower.includes('heydude')) {
    marca = 'Hey Dude';
  } else if (vendorLower.includes('carven') || titleLower.includes('carven')) {
    marca = 'Carven';
  } else if (vendorLower.includes('avia') || titleLower.includes('avia')) {
    marca = 'Avia';
  } else {
    marca = 'Original Penguin';
  }

  // Extract clean description
  const cleanDesc = (shopifyProd.body_html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || `${shopifyProd.title} 100% original de ${marca}. Disponible en Kicks Online Venezuela con envíos a todo el país.`;

  // Images
  const imgList = (shopifyProd.images || []).map((img: any) => img.src).filter(Boolean);
  const mainImg = imgList[0] || 'https://kicksvenezuela.com/cdn/shop/files/Untitled_500_x_250_px.png?v=1769809313&width=500';

  return {
    handle: shopifyProd.handle,
    nombre: shopifyProd.title,
    marca,
    genero,
    categoria,
    subcategoria,
    estilo: subcategoria === 'running' ? 'deportivo' : marca === 'Carven' ? 'elegante' : 'casual',
    precio: price,
    precio_anterior: comparePrice,
    tallas_disponibles: sizes.length > 0 ? sizes : ['Consultar con asesor'],
    colores: availableVariants.map((v: any) => v.option2).filter(Boolean),
    imagen: mainImg,
    imagenes: imgList.length > 0 ? imgList : [mainImg],
    descripcion: cleanDesc,
    materiales: '100% Original con garantía de autenticidad de Kicks Online Venezuela.',
    en_oferta: isOnSale,
    stock: 10,
    link: `https://kicksvenezuela.com/products/${shopifyProd.handle}`,
    destacado: isOnSale || Boolean(imgList.length > 1),
  };
}

// Fetch live products directly from kicksvenezuela.com Shopify JSON feed
export async function syncLiveKicksCatalog(): Promise<{
  success: boolean;
  total: number;
  products: Product[];
  error?: string;
}> {
  try {
    const pages = [1, 2];
    let allRawProducts: any[] = [];

    for (const page of pages) {
      const res = await fetch(`https://kicksvenezuela.com/products.json?limit=250&page=${page}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) break;
      const data = await res.json();
      if (!data.products || data.products.length === 0) break;
      allRawProducts = allRawProducts.concat(data.products);
    }

    if (allRawProducts.length > 0) {
      const mapped = allRawProducts.map(mapShopifyProduct);
      cachedLiveProducts = mapped;
      lastSyncTimestamp = new Date().toISOString();
      return {
        success: true,
        total: mapped.length,
        products: mapped,
      };
    }

    return {
      success: true,
      total: cachedLiveProducts.length,
      products: cachedLiveProducts,
    };
  } catch (err: any) {
    console.warn('Error syncing with kicksvenezuela.com, retaining cached catalog:', err);
    return {
      success: false,
      total: cachedLiveProducts.length,
      products: cachedLiveProducts,
      error: err.message,
    };
  }
}

export function getActiveProducts(): Product[] {
  return cachedLiveProducts.length > 0 ? cachedLiveProducts : KICKS_PRODUCTS;
}

export function getSyncStatus(): SyncStatus {
  return {
    lastSyncTime: lastSyncTimestamp,
    totalProducts: cachedLiveProducts.length,
    isSyncing: false,
    source: lastSyncTimestamp ? 'live-shopify' : 'curated-cache',
  };
}
