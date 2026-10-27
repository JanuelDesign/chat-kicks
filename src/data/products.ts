export interface Product {
  handle: string;
  nombre: string;
  marca: 'Original Penguin' | 'Avia' | 'Hey Dude' | 'Carven';
  genero: 'caballero' | 'dama' | 'unisex';
  categoria: 'calzado' | 'ropa' | 'accesorios';
  subcategoria: string;
  estilo: 'casual' | 'deportivo' | 'elegante' | 'formal' | 'viaje';
  precio: number;
  precio_anterior: number | null;
  tallas_disponibles: string[];
  colores: string[];
  imagen: string;
  imagenes: string[];
  descripcion: string;
  materiales: string;
  en_oferta: boolean;
  stock: number;
  link: string;
  destacado?: boolean;
}

export const KICKS_PRODUCTS: Product[] = [
  // HEY DUDE - CABALLERO
  {
    handle: 'hey-dude-wally-sox-charcoal',
    nombre: 'Hey Dude Wally Sox Charcoal Grey',
    marca: 'Hey Dude',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'mocasines',
    estilo: 'casual',
    precio: 58.0,
    precio_anterior: 75.0,
    tallas_disponibles: ['US 7 / EU 40', 'US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44', 'US 12 / EU 45'],
    colores: ['Charcoal', 'Gris Jaspeado'],
    imagen: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'El mocasín ultraligero icónico de Hey Dude. Tejido elástico y transpirable Sox con plantilla ergonómica de espuma viscoelástica para máxima comodidad durante todo el día o viajes largos.',
    materiales: 'Capellada textil stretch transpirable, suela ultra ligera Flex & Fold, plantilla de espuma anatómica con forro de cuero.',
    en_oferta: true,
    stock: 14,
    link: 'https://kicksvenezuela.com/products/hey-dude-wally-sox-charcoal',
    destacado: true
  },
  {
    handle: 'hey-dude-wally-linen-beige',
    nombre: 'Hey Dude Wally Linen Desert Beige',
    marca: 'Hey Dude',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'mocasines',
    estilo: 'casual',
    precio: 62.0,
    precio_anterior: null,
    tallas_disponibles: ['US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    colores: ['Beige Arena', 'Khaki'],
    imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Diseño en lona fresca de mezcla de lino natural, ideal para climas cálidos y fines de semana relajados. Suela ultra flexible y cordones elásticos sin amarre.',
    materiales: 'Mezcla de lino y algodón transpirable, suela de EVA ultraligera.',
    en_oferta: false,
    stock: 8,
    link: 'https://kicksvenezuela.com/products/hey-dude-wally-linen-beige'
  },
  {
    handle: 'hey-dude-bradley-boot-cognac',
    nombre: 'Hey Dude Bradley Boot Cognac Brown',
    marca: 'Hey Dude',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'botines',
    estilo: 'casual',
    precio: 78.0,
    precio_anterior: 95.0,
    tallas_disponibles: ['US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    colores: ['Cognac', 'Marrón'],
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'La combinación perfecta entre la ligereza de Hey Dude y la robustez de un botín casual de invierno o viaje. Resistente al agua y con forro acolchado.',
    materiales: 'Eco-cuero repelente al agua, cuello acolchado, suela Ultra-grip.',
    en_oferta: true,
    stock: 6,
    link: 'https://kicksvenezuela.com/products/hey-dude-bradley-boot-cognac'
  },

  // HEY DUDE - DAMA
  {
    handle: 'hey-dude-wendy-sox-rose',
    nombre: 'Hey Dude Wendy Sox Dusty Rose',
    marca: 'Hey Dude',
    genero: 'dama',
    categoria: 'calzado',
    subcategoria: 'mocasines',
    estilo: 'casual',
    precio: 56.0,
    precio_anterior: 72.0,
    tallas_disponibles: ['US 6 / EU 36', 'US 7 / EU 37', 'US 8 / EU 38', 'US 9 / EU 39', 'US 10 / EU 40'],
    colores: ['Dusty Rose', 'Rosa Pastel'],
    imagen: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'El calzado favorito para damas que priorizan la comodidad absoluta sin perder estilo femenino. Diseño slip-on ultraligero que se adapta al pie como un guante.',
    materiales: 'Tejido textil Sox elástico transpirable, plantilla acolchada desmontable lavable.',
    en_oferta: true,
    stock: 12,
    link: 'https://kicksvenezuela.com/products/hey-dude-wendy-sox-rose',
    destacado: true
  },
  {
    handle: 'hey-dude-wendy-sparkle-stone',
    nombre: 'Hey Dude Wendy Sparkle Stone White',
    marca: 'Hey Dude',
    genero: 'dama',
    categoria: 'calzado',
    subcategoria: 'mocasines',
    estilo: 'casual',
    precio: 59.0,
    precio_anterior: null,
    tallas_disponibles: ['US 6 / EU 36', 'US 7 / EU 37', 'US 8 / EU 38', 'US 9 / EU 39'],
    colores: ['Blanco Perla', 'Silver Sparkle'],
    imagen: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Toque de brillo sutil en lona texturizada con la famosa silueta Wendy. Muy fácil de combinar con jeans, shorts o vestidos casuales.',
    materiales: 'Lona con destellos satinados, suela ligera de espuma patentada.',
    en_oferta: false,
    stock: 9,
    link: 'https://kicksvenezuela.com/products/hey-dude-wendy-sparkle-stone'
  },

  // ORIGINAL PENGUIN - CABALLERO (ROPA Y CALZADO)
  {
    handle: 'penguin-polo-clasico-earl-navy',
    nombre: 'Original Penguin Polo Clásico The Earl Piqué Navy',
    marca: 'Original Penguin',
    genero: 'caballero',
    categoria: 'ropa',
    subcategoria: 'polos',
    estilo: 'casual',
    precio: 48.0,
    precio_anterior: 65.0,
    tallas_disponibles: ['S', 'M', 'L', 'XL', 'XXL'],
    colores: ['Navy Azul Marino', 'Borde Blanco en Cuello'],
    imagen: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'El polo icónico de Original Penguin desde 1955. Corte Heritage Slim, tejido de algodón 100% orgánico piqué con el bordado Pete el pingüino en el pecho y vivos contrastantes.',
    materiales: '100% Algodón piqué de fibra suave, botones perlados resistentes.',
    en_oferta: true,
    stock: 18,
    link: 'https://kicksvenezuela.com/products/penguin-polo-clasico-earl-navy',
    destacado: true
  },
  {
    handle: 'penguin-polo-clasico-earl-white',
    nombre: 'Original Penguin Polo The Earl Pure White',
    marca: 'Original Penguin',
    genero: 'caballero',
    categoria: 'ropa',
    subcategoria: 'polos',
    estilo: 'casual',
    precio: 48.0,
    precio_anterior: 65.0,
    tallas_disponibles: ['S', 'M', 'L', 'XL'],
    colores: ['Blanco Puro', 'Vivos Negros'],
    imagen: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Polo The Earl en impecable blanco con detalles en ribete negro contrastante. Una prenda imprescindible de alta elegancia informal.',
    materiales: '100% Algodón piqué peinado de alta densidad.',
    en_oferta: true,
    stock: 15,
    link: 'https://kicksvenezuela.com/products/penguin-polo-clasico-earl-white'
  },
  {
    handle: 'penguin-sneakers-court-leather-white',
    nombre: 'Original Penguin Sneakers Retro Court Leather White',
    marca: 'Original Penguin',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'sneakers',
    estilo: 'casual',
    precio: 75.0,
    precio_anterior: 95.0,
    tallas_disponibles: ['US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    colores: ['Blanco', 'Detalle Azul Marino en Talón'],
    imagen: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Calzado tenis de corte retro en cuero legítimo. Silueta minimalista y refinada que combina con pantalones chinos, bermudas o jeans.',
    materiales: '100% Cuero genuino vacuno, forro interno transpirable, suela vulcanizada antideslizante.',
    en_oferta: true,
    stock: 10,
    link: 'https://kicksvenezuela.com/products/penguin-sneakers-court-leather-white',
    destacado: true
  },
  {
    handle: 'penguin-camisa-oxford-azul-cielo',
    nombre: 'Original Penguin Camisa Oxford Heritage Slim Azul Cielo',
    marca: 'Original Penguin',
    genero: 'caballero',
    categoria: 'ropa',
    subcategoria: 'camisas',
    estilo: 'casual',
    precio: 58.0,
    precio_anterior: null,
    tallas_disponibles: ['S', 'M', 'L', 'XL'],
    colores: ['Azul Cielo'],
    imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Camisa manga larga en tejido Oxford clásico con textura premium. Cuello abotonado button-down y corte entallado muy favorecedor.',
    materiales: '100% Algodón Oxford transpirable.',
    en_oferta: false,
    stock: 11,
    link: 'https://kicksvenezuela.com/products/penguin-camisa-oxford-azul-cielo'
  },
  {
    handle: 'penguin-shorts-stretch-khaki',
    nombre: 'Original Penguin Bermuda Casual Stretch Khaki',
    marca: 'Original Penguin',
    genero: 'caballero',
    categoria: 'ropa',
    subcategoria: 'shorts',
    estilo: 'casual',
    precio: 42.0,
    precio_anterior: 55.0,
    tallas_disponibles: ['30', '32', '34', '36'],
    colores: ['Khaki'],
    imagen: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Bermuda corte chino en algodón elástico suave. Diseñada para salidas informales, días de playa o paseos.',
    materiales: '98% Algodón, 2% Elastano para flexibilidad.',
    en_oferta: true,
    stock: 9,
    link: 'https://kicksvenezuela.com/products/penguin-shorts-stretch-khaki'
  },

  // ORIGINAL PENGUIN - DAMA
  {
    handle: 'penguin-vestido-pique-dama-navy',
    nombre: 'Original Penguin Vestido Casual Piqué Sport Navy',
    marca: 'Original Penguin',
    genero: 'dama',
    categoria: 'ropa',
    subcategoria: 'vestidos',
    estilo: 'casual',
    precio: 55.0,
    precio_anterior: 70.0,
    tallas_disponibles: ['XS', 'S', 'M', 'L'],
    colores: ['Navy', 'Bordado Pete al tono'],
    imagen: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Vestido tipo polo en algodón piqué premium para dama. Silueta deportiva y elegante que estiliza con frescura en días cálidos.',
    materiales: '95% Algodón piqué peinado, 5% Spandex.',
    en_oferta: true,
    stock: 7,
    link: 'https://kicksvenezuela.com/products/penguin-vestido-pique-dama-navy'
  },

  // AVIA - DEPORTIVO Y RUNNING (CABALLERO Y DAMA)
  {
    handle: 'avia-avi-motion-running-black',
    nombre: 'Avia Avi-Motion Pro Running Shoes Black/Volt',
    marca: 'Avia',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'running',
    estilo: 'deportivo',
    precio: 45.0,
    precio_anterior: 60.0,
    tallas_disponibles: ['US 8 / EU 41', 'US 8.5 / EU 42', 'US 9.5 / EU 43', 'US 10.5 / EU 44', 'US 11.5 / EU 45'],
    colores: ['Negro', 'Detalles Lima Volt'],
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Zapatillas de running de alto rendimiento Avia. Sistema de amortiguación Cantilever para retorno de energía y absorción de impacto en asfalto.',
    materiales: 'Malla transpirable Air-Mesh, entresuela de espuma EVA amortiguada Cantilever, suela con tracción duradera.',
    en_oferta: true,
    stock: 16,
    link: 'https://kicksvenezuela.com/products/avia-avi-motion-running-black',
    destacado: true
  },
  {
    handle: 'avia-retro-sport-lifestyle-830',
    nombre: 'Avia Retro 830 Classic Court Sneaker White/Navy',
    marca: 'Avia',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'sneakers',
    estilo: 'casual',
    precio: 52.0,
    precio_anterior: 65.0,
    tallas_disponibles: ['US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    colores: ['Blanco', 'Navy'],
    imagen: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Homenaje a los años 80 y 90 de Avia. Silueta clásica de baloncesto y corte urbano con acolchado perimetral y soporte en el arco plantar.',
    materiales: 'Capellada sintética reforzada de alta resistencia al roce, suela de goma vintage.',
    en_oferta: true,
    stock: 8,
    link: 'https://kicksvenezuela.com/products/avia-retro-sport-lifestyle-830'
  },
  {
    handle: 'avia-avi-aura-memory-foam-dama',
    nombre: 'Avia Avi-Aura Memory Foam Walking Sneaker Lilac',
    marca: 'Avia',
    genero: 'dama',
    categoria: 'calzado',
    subcategoria: 'running',
    estilo: 'deportivo',
    precio: 42.0,
    precio_anterior: 55.0,
    tallas_disponibles: ['US 6 / EU 36', 'US 7 / EU 37', 'US 8 / EU 38', 'US 9 / EU 39'],
    colores: ['Lila Suave', 'Blanco'],
    imagen: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Zapatillas para caminata y entrenamiento diario de dama. Plantilla anatómica de Memory Foam que amortigua cada pisada y alivia la presión articular.',
    materiales: 'Textil respirable, plantilla Memory Foam FoamFit, suela ultraliviana de tracción.',
    en_oferta: true,
    stock: 14,
    link: 'https://kicksvenezuela.com/products/avia-avi-aura-memory-foam-dama',
    destacado: true
  },
  {
    handle: 'avia-elevate-running-dama-teal',
    nombre: 'Avia Elevate Performance Runner Teal Grey',
    marca: 'Avia',
    genero: 'dama',
    categoria: 'calzado',
    subcategoria: 'running',
    estilo: 'deportivo',
    precio: 49.0,
    precio_anterior: 62.0,
    tallas_disponibles: ['US 6.5 / EU 37', 'US 7.5 / EU 38', 'US 8.5 / EU 39'],
    colores: ['Teal Aguamarina', 'Gris'],
    imagen: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Diseño anatómico femenino con soporte de arco reforzado y flexibilidad en el antepié para carreras o rutinas de gimnasio exigentes.',
    materiales: 'Capellada sin costuras de punto elástico técnico, suela de caucho de doble densidad.',
    en_oferta: true,
    stock: 9,
    link: 'https://kicksvenezuela.com/products/avia-elevate-running-dama-teal'
  },
  {
    handle: 'avia-activewear-top-leggings-dama',
    nombre: 'Conjunto Deportivo Avia Activewear Seamless Black',
    marca: 'Avia',
    genero: 'dama',
    categoria: 'ropa',
    subcategoria: 'activewear',
    estilo: 'deportivo',
    precio: 38.0,
    precio_anterior: null,
    tallas_disponibles: ['S', 'M', 'L'],
    colores: ['Negro'],
    imagen: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Conjunto de compresión suave sin costuras de Avia. Cintura alta de soporte que no se desliza durante el movimiento.',
    materiales: 'Poliamida y elastano con tecnología Dry-Wick para control del sudor.',
    en_oferta: false,
    stock: 12,
    link: 'https://kicksvenezuela.com/products/avia-activewear-top-leggings-dama'
  },

  // CARVEN - ELEGANTE Y FORMAL (CABALLERO Y DAMA)
  {
    handle: 'carven-loafer-cuero-marrone',
    nombre: 'Carven Mocasín Penny Loafer Cuero Nobuk Marrón',
    marca: 'Carven',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'mocasines',
    estilo: 'elegante',
    precio: 85.0,
    precio_anterior: 110.0,
    tallas_disponibles: ['US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    colores: ['Marrón Tabaco', 'Cuero Café'],
    imagen: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Distinción clásica parisina de Carven. Mocasín Penny confeccionado artesanalmente en cuero nobuk genuino con costuras reforzadas y suela de cuero con insertos antideslizantes.',
    materiales: '100% Cuero legítimo seleccionado, forro de badana suave transpirable, suela mixta.',
    en_oferta: true,
    stock: 7,
    link: 'https://kicksvenezuela.com/products/carven-loafer-cuero-marrone',
    destacado: true
  },
  {
    handle: 'carven-oxford-vestir-negro',
    nombre: 'Carven Zapato Formal Oxford Cap-Toe Negro',
    marca: 'Carven',
    genero: 'caballero',
    categoria: 'calzado',
    subcategoria: 'zapatos de vestir',
    estilo: 'formal',
    precio: 92.0,
    precio_anterior: 120.0,
    tallas_disponibles: ['US 8 / EU 41', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    colores: ['Negro Lustrado'],
    imagen: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'La máxima expresión de elegancia para trajes, bodas y ocasiones formales. Cuero lustrado de acabado fino con costura cap-toe tradicional.',
    materiales: '100% Cuero vacuno flor entera, vira cosida, plantilla de confort.',
    en_oferta: true,
    stock: 5,
    link: 'https://kicksvenezuela.com/products/carven-oxford-vestir-negro'
  },
  {
    handle: 'carven-polo-mercerizado-negro',
    nombre: 'Carven Polo Elegante Cuello Camisero Negro',
    marca: 'Carven',
    genero: 'caballero',
    categoria: 'ropa',
    subcategoria: 'polos',
    estilo: 'elegante',
    precio: 45.0,
    precio_anterior: 58.0,
    tallas_disponibles: ['M', 'L', 'XL'],
    colores: ['Negro Intenso'],
    imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Polo refinado en algodón mercerizado de caída sedosa y brillo discreto. Cuello estructurado tipo camisero para usar bajo blazer o con pantalones de vestir.',
    materiales: '100% Algodón mercerizado de fibra larga.',
    en_oferta: true,
    stock: 10,
    link: 'https://kicksvenezuela.com/products/carven-polo-mercerizado-negro'
  },
  {
    handle: 'carven-loafer-herraje-dama-nude',
    nombre: 'Carven Loafer con Herraje Dorado Cuero Nude Dama',
    marca: 'Carven',
    genero: 'dama',
    categoria: 'calzado',
    subcategoria: 'mocasines',
    estilo: 'elegante',
    precio: 79.0,
    precio_anterior: 98.0,
    tallas_disponibles: ['US 6 / EU 36', 'US 7 / EU 37', 'US 8 / EU 38', 'US 9 / EU 39'],
    colores: ['Nude', 'Oro pulido'],
    imagen: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
    imagenes: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
    ],
    descripcion: 'Zapato mocasín femenino sofisticado con aplique de herraje horsebit dorado. Líneas depuradas para combinar con sastrería de oficina o vestidos midi.',
    materiales: 'Cuero napa suave, plantilla acolchada con arco de apoyo, suela flexible.',
    en_oferta: true,
    stock: 8,
    link: 'https://kicksvenezuela.com/products/carven-loafer-herraje-dama-nude',
    destacado: true
  }
];

let liveCatalogCache: Product[] = [];

export function setLiveCatalog(products: Product[]) {
  if (products && products.length > 0) {
    liveCatalogCache = products;
  }
}

export function getAllProducts(): Product[] {
  return liveCatalogCache.length > 0 ? liveCatalogCache : KICKS_PRODUCTS;
}

// Helper search function conforming to the specified tool
export function buscarProductos({
  genero,
  categoria,
  marca,
  talla,
  precio_max,
  en_oferta,
  texto
}: {
  genero?: string;
  categoria?: string;
  marca?: string;
  talla?: string;
  precio_max?: number;
  en_oferta?: boolean;
  texto?: string;
}) {
  const currentList = getAllProducts();
  return currentList.filter((p) => {
    if (genero && genero !== 'todos' && genero !== 'unisex') {
      const g = genero.toLowerCase();
      if (p.genero !== 'unisex' && p.genero !== g) return false;
    }
    if (categoria && categoria !== 'todas') {
      const c = categoria.toLowerCase();
      if (p.categoria !== c && !p.subcategoria.toLowerCase().includes(c)) return false;
    }
    if (marca && marca !== 'todas') {
      const m = marca.toLowerCase();
      if (!p.marca.toLowerCase().includes(m) && !m.includes(p.marca.toLowerCase())) return false;
    }
    if (talla) {
      const cleanTalla = talla.toLowerCase().trim();
      const hasSize = p.tallas_disponibles.some((t) => t.toLowerCase().includes(cleanTalla));
      if (!hasSize) return false;
    }
    if (precio_max !== undefined && precio_max !== null && precio_max > 0) {
      if (p.precio > precio_max) return false;
    }
    if (en_oferta === true) {
      if (!p.en_oferta) return false;
    }
    if (texto && texto.trim().length > 0) {
      const cleanTokens = texto
        .toLowerCase()
        .replace(/[^\w\sáéíóúüñ]/gi, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !['busco', 'quiero', 'tienen', 'para', 'los', 'las', 'del', 'con', 'una', 'uno', 'por', 'que'].includes(w));

      if (cleanTokens.length > 0) {
        const haystack = `${p.nombre} ${p.marca} ${p.descripcion} ${p.estilo} ${p.subcategoria} ${p.handle} ${p.colores.join(' ')}`.toLowerCase();
        const matchesAny = cleanTokens.some((tok) => haystack.includes(tok));
        if (!matchesAny) return false;
      }
    }
    return true;
  });
}

export function obtenerProducto(handle: string) {
  const currentList = getAllProducts();
  return currentList.find((p) => p.handle.toLowerCase() === handle.toLowerCase()) || null;
}

export function generarLink(handle: string, variante?: string, tipo: 'producto' | 'carrito' | 'coleccion' = 'producto') {
  if (tipo === 'coleccion') {
    return `https://kicksvenezuela.com/collections/${handle}`;
  }
  if (tipo === 'carrito') {
    return `https://kicksvenezuela.com/cart/add?id=${variante || handle}`;
  }
  return `https://kicksvenezuela.com/products/${handle}${variante ? `?variant=${variante}` : ''}`;
}
