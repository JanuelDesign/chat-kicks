import React, { useState } from 'react';
import { getAllProducts } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { Search, Filter, Sparkles, RefreshCcw } from 'lucide-react';

interface CatalogViewProps {
  onAskAboutProduct: (productName: string, size?: string) => void;
  bcvRate?: number;
  onSyncCatalog?: () => void;
  isSyncing?: boolean;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onAskAboutProduct,
  bcvRate = 45.0,
  onSyncCatalog,
  isSyncing = false,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('todas');
  const [selectedGender, setSelectedGender] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [onlyOffers, setOnlyOffers] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allProductsList = getAllProducts();
  const brands = ['todas', 'Original Penguin', 'Hey Dude', 'Avia', 'Carven'];
  const genders = [
    { label: 'Todos', value: 'todos' },
    { label: 'Caballero', value: 'caballero' },
    { label: 'Dama', value: 'dama' },
  ];
  const categories = [
    { label: 'Todas las categorías', value: 'todas' },
    { label: 'Calzado', value: 'calzado' },
    { label: 'Ropa', value: 'ropa' },
    { label: 'Accesorios', value: 'accesorios' },
  ];

  const filtered = allProductsList.filter((item) => {
    if (selectedBrand !== 'todas') {
      const matchBrand =
        item.marca.toLowerCase().includes(selectedBrand.toLowerCase()) ||
        selectedBrand.toLowerCase().includes(item.marca.toLowerCase());
      if (!matchBrand) return false;
    }
    if (selectedGender !== 'todos' && item.genero !== 'unisex' && item.genero !== selectedGender) {
      return false;
    }
    if (selectedCategory !== 'todas' && item.categoria !== selectedCategory) {
      return false;
    }
    if (onlyOffers && !item.en_oferta) {
      return false;
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const text = `${item.nombre} ${item.marca} ${item.descripcion} ${item.materiales} ${item.subcategoria}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-stone-100">
      {/* Title & Brand Intro */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C2C2C] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#FEE000] text-xs font-bold uppercase tracking-widest mb-1 font-heading">
            <Sparkles className="w-3.5 h-3.5" /> Catálogo Oficial Kicks Venezuela
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-100">
            Marcas 100% Originales Distribuidas
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
            Explore nuestra colección oficial de Original Penguin, Hey Dude, Avia y Carven para caballero y dama. Envíos a toda Venezuela.
          </p>
        </div>

        {/* Live sync card */}
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-md text-xs text-stone-300 shadow-sm">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-heading font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              <span>Sincronizado con kicksvenezuela.com</span>
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">
              {allProductsList.length} productos en inventario oficial.
            </p>
          </div>
          {onSyncCatalog && (
            <button
              onClick={onSyncCatalog}
              disabled={isSyncing}
              className="bg-[#FEE000] hover:bg-[#ebd000] disabled:opacity-60 text-[#1A1A1A] font-heading font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Actualizando...' : 'Actualizar'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4 mb-6 space-y-4 shadow-sm">
        {/* Brand Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#FEE000]" /> Marca:
          </span>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBrand(b)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-colors shrink-0 ${
                selectedBrand === b
                  ? 'bg-[#FEE000] text-[#1A1A1A] shadow'
                  : 'bg-[#222222] text-stone-300 hover:bg-[#2C2C2C]'
              }`}
            >
              {b === 'todas' ? 'Todas las Marcas' : b}
            </button>
          ))}
        </div>

        {/* Search, Gender, Category, Offers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-[#2A2A2A]">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por modelo, tela, color..."
              className="w-full bg-[#121212] border border-[#2F2F2F] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#FEE000]"
            />
          </div>

          {/* Gender Select */}
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="bg-[#121212] border border-[#2F2F2F] rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#FEE000]"
          >
            {genders.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#121212] border border-[#2F2F2F] rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#FEE000]"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Offers Checkbox */}
          <label className="flex items-center gap-2 bg-[#121212] border border-[#2F2F2F] rounded-xl px-3 py-2 cursor-pointer hover:border-[#FEE000]/60 transition-colors">
            <input
              type="checkbox"
              checked={onlyOffers}
              onChange={(e) => setOnlyOffers(e.target.checked)}
              className="accent-[#FEE000] rounded"
            />
            <span className="text-xs text-stone-200 font-medium select-none">
              Solo Súper Precios / Black Friday
            </span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-400 mb-4 px-1 font-heading">
        <span>Mostrando {filtered.length} de {allProductsList.length} productos</span>
        {onlyOffers && (
          <span className="text-[#FEE000] font-bold">Filtro de promoción activo</span>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-12 text-center">
          <p className="text-sm text-stone-400 mb-3">
            No se encontraron productos con los filtros seleccionados.
          </p>
          <button
            onClick={() => {
              setSelectedBrand('todas');
              setSelectedGender('todos');
              setSelectedCategory('todas');
              setOnlyOffers(false);
              setSearchQuery('');
            }}
            className="text-xs bg-[#FEE000] hover:bg-[#ebd000] text-[#1A1A1A] font-heading font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <ProductCard
              key={item.handle}
              product={{
                nombre: item.nombre,
                marca: item.marca,
                precio: `$${item.precio.toFixed(2)}`,
                precio_anterior: item.precio_anterior ? `$${item.precio_anterior.toFixed(2)}` : '',
                tallas_disponibles: item.tallas_disponibles,
                imagen: item.imagen,
                link: item.link,
              }}
              onAskAboutProduct={onAskAboutProduct}
              bcvRate={bcvRate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
