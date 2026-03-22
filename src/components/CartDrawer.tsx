"use client";

import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { motion, AnimatePresence } from 'motion/react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const WHATSAPP_NUMBER = "541137221189";

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = "👷🏻‍♂️ *NUEVO PRESUPUESTO WEB* 👷🏻‍♂️\n\nHola Materiales El Rey, me gustaría solicitar cotización (con envío) para los siguientes materiales:\n\n";
    
    items.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.name}\n`;
    });
    
    message += `\n*Total de lista aproximado:* $${total.toLocaleString('es-AR')}\n\n`;
    message += "_Por favor confirmar si hay stock disponible y métodos de pago._";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Solo en móvil para que en desktop el cliente pueda seguir navegando) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[100] md:hidden"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Tu Cotización</h2>
                <span className="bg-zinc-100 text-zinc-600 text-sm font-bold px-2 py-0.5 rounded-full">{items.length}</span>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                  <ShoppingCart className="w-20 h-20 mb-6 text-zinc-200" />
                  <p className="text-xl font-bold text-zinc-900 mb-2">Tu lista está vacía</p>
                  <p className="text-center max-w-xs">Explora nuestro catálogo y suma los materiales que necesitas cotizar para tu obra.</p>
                  <button onClick={onClose} className="mt-8 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors">
                    Ver materiales
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h4 className="text-zinc-900 font-bold leading-tight mb-2 pr-6">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-red-600 font-black">${item.price.toLocaleString('es-AR')}</p>
                          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-lg p-1">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm text-zinc-600">
                              {item.quantity === 1 ? <Trash2 className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4" />}
                            </button>
                            <span className="font-bold w-6 text-center text-zinc-900 text-sm">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm text-zinc-600">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-zinc-100 p-6 bg-stone-50">
                <div className="flex items-center justify-between mb-4">
                   <p className="text-zinc-600 font-medium">Subtotal estimado</p>
                   <p className="text-zinc-900 font-black text-xl">${total.toLocaleString('es-AR')}</p>
                </div>
                <p className="text-xs text-zinc-500 mb-6">* Los precios son estimativos y pueden variar según stock, promociones vigentes y costo de envío según la zona.</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#25D366]/20 transition-colors"
                >
                  {/* @ts-ignore */}
                  <SiWhatsapp className="w-6 h-6" />
                  Solicitar Cotización por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
