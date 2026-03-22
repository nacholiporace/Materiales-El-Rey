"use client";

import { SiWhatsapp } from "react-icons/si";
import React from "react";

const repeatedBrands = (brands: any[], repeat = 4) => Array.from({ length: repeat }).flatMap(() => brands);

const BRANDS_ROW1 = [
  () => <div className="text-xl font-black text-[#e85d04] tracking-tighter">LOMA NEGRA</div>,
  () => <div className="text-xl font-black text-[#d90429] tracking-tight">Acindar</div>,
  () => <div className="px-3 py-1 bg-[#ffb703] text-[#023047] font-bold text-xl rounded">weber</div>,
  () => <div className="text-xl font-black text-[#2a9d8f] tracking-widest">KLAUKOL</div>,
  () => <div className="text-xl font-black text-[#0077b6] italic">Durlock</div>,
];

const BRANDS_ROW2 = [
  () => <div className="text-xl font-bold font-serif italic text-[#03045e]">Ferrum</div>,
  () => <div className="flex items-center gap-1"><div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#ffb703]"></div><span className="text-xl font-black text-[#d00000]">Sika</span></div>,
  () => <div className="text-xl font-black text-[#3a0ca3] tracking-tighter">SINTEPLAST</div>,
  () => <div className="text-xl font-black bg-black text-white w-10 h-10 flex items-center justify-center rounded-full leading-none">FV</div>,
  () => <div className="text-xl font-black text-[#00b4d8] uppercase">Amanco</div>,
];


export default function BrandsCTA() {
  return (
    <section id="proyectos" className="py-24 relative overflow-hidden bg-stone-50 border-t border-zinc-200">
      {/* Light grid background (From 21st.dev) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm rounded-full border border-zinc-200 bg-white text-zinc-800 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Trabajamos con Primeras Marcas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">¿Listo para comenzar tu gran proyecto?</h2>
          <p className="text-lg text-zinc-600 mb-8">Nuestros asesores están disponibles para ayudarte a calcular materiales y ofrecerte la mejor financiación.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/541137221189" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative flex h-14 items-center justify-center overflow-hidden rounded-xl bg-[#25D366] px-8 font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 ease-out hover:bg-[#20bd5a] hover:pr-14 focus:outline-none ring-offset-zinc-900 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* @ts-ignore */}
                <SiWhatsapp className="w-5 h-5" />
                Hablar con un asesor
              </span>
              <div className="absolute right-4 z-10 flex h-full items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
            <button className="h-14 px-8 rounded-xl border-2 border-zinc-200 font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm">
              Llamar ahora
            </button>
          </div>
          <p className="text-zinc-500 text-center text-sm mt-4">Respuesta en menos de 15 minutos</p>
        </div>

        {/* Carousel */}
        <div className="mt-20 overflow-hidden relative pb-2 max-w-5xl mx-auto">
          {/* Row 1 */}
          <div className="flex gap-6 whitespace-nowrap animate-scroll-left">
            {repeatedBrands(BRANDS_ROW1, 4).map((Brand, i) => (
              <div key={i} className="h-16 px-8 min-w-[160px] flex-shrink-0 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center">
                <Brand />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6 whitespace-nowrap mt-4 animate-scroll-right">
            {repeatedBrands(BRANDS_ROW2, 4).map((Brand, i) => (
              <div key={i} className="h-16 px-8 min-w-[160px] flex-shrink-0 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center">
                <Brand />
              </div>
            ))}
          </div>

          {/* Fade overlays */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
