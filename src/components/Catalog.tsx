"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { CartItem } from './CartDrawer';

const FICTITIOUS_PRODUCTS = [
  { id: 1, name: 'Cemento Loma Negra 50kg', price: 9500, category: 'Obra Gruesa', image: '/obra-gruesa.png' },
  { id: 2, name: 'Hierro Acindar 8mm x 12m', price: 8200, category: 'Obra Gruesa', image: '/obra-gruesa.png' },
  { id: 3, name: 'Klaukol Impermeable 30kg', price: 12500, category: 'Obra Gruesa', image: '/obra-gruesa.png' },
  { id: 4, name: 'Ladrillo Hueco 18x18x33 (Pallet)', price: 145000, category: 'Obra Gruesa', image: '/obra-gruesa.png' },
  { id: 5, name: 'Arena Binder x Bolsón', price: 21000, category: 'Áridos', image: '/aridos.png' },
  { id: 6, name: 'Piedra Partida x Bolsón', price: 24000, category: 'Áridos', image: '/aridos.png' },
  { id: 7, name: 'Pintura Látex Interior 20L', price: 54000, category: 'Terminaciones', image: '/terminaciones.png' },
  { id: 8, name: 'Malla Sima 15x15 6mm', price: 32000, category: 'Obra Gruesa', image: '/obra-gruesa.png' },
  { id: 9, name: 'Tubo PVC 110mm x 4m', price: 11500, category: 'Sanitarios', image: '/sanitarios.png' },
];

const CATEGORIES = ['Todos', 'Obra Gruesa', 'Áridos', 'Terminaciones', 'Sanitarios', 'Herramientas', 'Electricidad'];

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('c');
  
  const [activeCategory, setActiveCategory] = useState(queryCategory && CATEGORIES.includes(queryCategory) ? queryCategory : 'Todos');
  const { addToCart } = useOutletContext<{ addToCart: (product: Omit<CartItem, 'quantity'>) => void }>();
  
  useEffect(() => {
    if (queryCategory && CATEGORIES.includes(queryCategory)) {
      setActiveCategory(queryCategory);
    }
  }, [queryCategory]);
  
  const filteredProducts = activeCategory === 'Todos' 
    ? FICTITIOUS_PRODUCTS 
    : FICTITIOUS_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">Catálogo de Materiales</h1>
            <p className="text-zinc-600 font-medium">Encontrá todo lo necesario al mejor precio garantizado.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-600 rounded-lg shrink-0 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-bold">Filtros</span>
          </div>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all duration-200 ${
                activeCategory === category 
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/20' 
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:border-red-200 hover:text-red-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={product.id} 
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-zinc-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                {product.category === 'Obra Gruesa' && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">MÁS VENDIDO</span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">{product.category}</p>
                <h3 className="text-lg font-bold text-zinc-900 mb-4 line-clamp-2 leading-tight flex-1">{product.name}</h3>
                
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-sm text-zinc-400 line-through mb-1">${(product.price * 1.2).toLocaleString('es-AR')}</p>
                    <p className="text-2xl font-black text-zinc-900">${product.price.toLocaleString('es-AR')}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })}
                  className="w-full bg-zinc-900 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:-rotate-12" />
                  Agregar al Presupuesto
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">No se encontraron productos</h3>
            <p className="text-zinc-500">Intenta probar con otra categoría o término de búsqueda.</p>
          </div>
        )}

      </div>
    </div>
  );
}
