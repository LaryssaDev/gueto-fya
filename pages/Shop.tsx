import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import Carousel from '../components/Carousel.tsx';
import { BANNER_URL } from '../constants.ts';
import { ProductCategory } from '../types.ts';

const Shop: React.FC = () => {
  const { products, viewProduct, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'TODOS'>('TODOS');

  // Derive available categories from products
  const availableCategories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = activeCategory === 'TODOS' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Banner - Reduced size and Centered to give focus to products */}
      <div className="w-full flex justify-center px-2">
        <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-brand-gray/50">
          <img src={BANNER_URL} alt="Promoção Gueto Fya" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex space-x-2 px-1">
          <button
            onClick={() => setActiveCategory('TODOS')}
            className={`px-4 py-1.5 rounded-full font-bold uppercase text-xs whitespace-nowrap transition-all ${
              activeCategory === 'TODOS' 
                ? 'bg-brand-orange text-white shadow-lg shadow-orange-500/20' 
                : 'bg-brand-dark text-brand-light border border-brand-gray hover:border-brand-orange'
            }`}
          >
            Todos
          </button>
          {availableCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-bold uppercase text-xs whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-orange text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-brand-dark text-brand-light border border-brand-gray hover:border-brand-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid - 5 columns for desktop, 2 for mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-brand-dark rounded-lg overflow-hidden border border-brand-gray shadow-md group hover:border-brand-orange transition-colors">
            {/* Carousel Container */}
            <div className="aspect-square w-full relative bg-gray-900">
              <Carousel 
                images={product.images} 
                className="h-full w-full" 
                onClick={() => viewProduct(product.id)}
                showArrows={false}
              />
              <div className="absolute top-2 left-2 bg-brand-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                {product.category}
              </div>
            </div>

            <div className="p-3 flex flex-col space-y-2">
              <div 
                className="cursor-pointer"
                onClick={() => viewProduct(product.id)}
              >
                <h3 className="text-sm font-display font-bold truncate text-white leading-tight">{product.name}</h3>
                <p className="text-brand-orange font-bold text-base font-display mt-1">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-brand-white text-brand-black font-bold py-2 rounded uppercase hover:bg-brand-orange hover:text-white transition-all tracking-wider text-xs shadow-sm"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-20 text-brand-light text-sm">
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;