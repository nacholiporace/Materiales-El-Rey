/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight, 
  HardHat, 
  Truck, 
  ShieldCheck, 
  Phone,
  Hammer,
  BrickWall,
  PaintBucket,
  Layers,
  Wrench,
  MessageCircle,
  Star,
  Clock,
  CreditCard,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { SiInstagram, SiWhatsapp, SiGooglemaps } from 'react-icons/si';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import FAQ from './components/FAQ';
import BrandsCTA from './components/BrandsCTA';
import Catalog from './components/Catalog';
import CartDrawer, { CartItem } from './components/CartDrawer';

const categories = [
  { id: 1, name: 'Obra Gruesa', icon: BrickWall, image: '/obra-gruesa.png' },
  { id: 2, name: 'Terminaciones', icon: PaintBucket, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, name: 'Herramientas', icon: Hammer, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1000' },
  { id: 4, name: 'Sanitarios', icon: Wrench, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000' },
  { id: 5, name: 'Electricidad', icon: Layers, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000' },
];

const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/541137221189" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="Chatear por WhatsApp"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center group"
  >
    <div className="w-8 h-8 flex items-center justify-center">
      {/* @ts-ignore */}
      <SiWhatsapp className="w-full h-full" />
    </div>
    <span className="absolute right-full mr-4 bg-white text-zinc-800 text-sm font-bold py-2 px-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      ¡Pedí presupuesto online!
    </span>
  </a>
);

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-2xl border border-zinc-100 bg-stone-50 shadow-sm hover:shadow-md max-w-xs w-full transition-shadow" key={i}>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-red-500 text-red-500" />
                    ))}
                  </div>
                  <div className="text-zinc-700 italic mb-5">"{text}"</div>
                  <div className="flex items-center gap-3 mt-auto">
                    <img src={image} alt={name} className="h-10 w-10 rounded-full object-cover shadow-sm bg-zinc-200" />
                    <div className="flex flex-col">
                      <div className="font-bold text-zinc-900 leading-tight">{name}</div>
                      <div className="text-zinc-500 text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonialsList = [
  {
    text: "Excelente atención de Materiales El Rey, compramos materiales para toda una obra completa en El Palomar y nunca fallaron.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Carlos M.",
    role: "Constructora CM",
  },
  {
    text: "El precio del acero y el cemento saca gran diferencia comparado con otros locales de la zona.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Lucía Fernández",
    role: "Arquitecta",
  },
  {
    text: "Compro todos los materiales en Materiales El Rey. Nunca fallan con el stock y sus choferes son unos genios descargando.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "Arq. Roberto D.",
    role: "Estudio BD",
  },
  {
    text: "Sus envíos exactos me hacen la vida más fácil. No tenés que lidiar con albañiles de brazos cruzados.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Maestro Mayor",
  },
  {
    text: "Compré hierro directo desde el WhatsApp de ellos. Rapidísimo y muy amables, totalmente recomendados en Cap. Claudio Rosales 1006, El Palomar.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Autoconstrucción",
  },
  {
    text: "Excelente servicio post venta. Me sobró arena y me orientaron para su correcta disposición.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Esteban V.",
    role: "Techeros Unidos",
  }
];

const Reviews = () => {
  const firstColumn = testimonialsList.slice(0, 3);
  const secondColumn = testimonialsList.slice(3, 6);
  const thirdColumn = [...testimonialsList.slice(1, 4)]; 

  return (
    <section className="py-24 bg-white border-y border-zinc-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto z-10 relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-red-500 text-red-500" />)}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4 text-center">
            Lo que dicen en <span className="text-red-600 italic">Google Maps</span>
          </h2>
          <p className="text-zinc-600 text-center text-lg">
            Nuestros clientes valoran la puntualidad y la calidad de los materiales. 
            No lo decimos nosotros, lo dicen los constructores.
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[600px] overflow-hidden -mx-6 px-6">
          <TestimonialsColumn testimonials={firstColumn} duration={20} />
          <TestimonialsColumn testimonials={secondColumn} duration={25} className="hidden md:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={22} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ cartCount, onCartClick }: { cartCount: number, onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCatalogPage = location.pathname.includes('/catalogo');
  const isHeaderActive = isScrolled || isMenuOpen || isCatalogPage;

  return (
    <nav aria-label="Navegación principal" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHeaderActive ? 'bg-white/95 backdrop-blur-md py-3 border-b border-zinc-200 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-950 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 p-2 overflow-hidden transition-all duration-300 group-hover:scale-105">
            <img src="/logo-transparent.png" alt="Materiales El Rey Logo" className="w-full h-auto object-contain" />
          </div>
          <span className={`text-lg leading-tight md:text-2xl font-bold tracking-tighter transition-colors ${isHeaderActive ? 'text-zinc-900' : 'text-white'}`}>MATERIALES <span className="text-red-500">EL REY</span></span>
        </Link>

        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${isHeaderActive ? 'text-zinc-600' : 'text-white/80'}`}>
          <Link to="/" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Inicio</Link>
          <a href="/#productos" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Productos</a>
          <a href="/#faq" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Preguntas Frecuentes</a>
          <a href="/#proyectos" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Proyectos</a>
          <a href="/#contacto" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Contacto</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/catalogo')} aria-label="Buscar productos" className={`p-2 transition-colors duration-200 cursor-pointer text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-full bg-white/5 border border-white/10 md:bg-transparent md:border-transparent ${isHeaderActive ? 'md:text-zinc-600 md:hover:text-zinc-900' : 'md:text-white md:hover:text-red-400'}`}>
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>
          <button onClick={onCartClick} aria-label={`Carrito de cotización: ${cartCount} artículos`} className={`p-2 transition-colors duration-200 cursor-pointer relative focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-full bg-white/5 text-white border border-white/10 md:bg-transparent md:border-transparent ${isHeaderActive ? 'md:text-zinc-600 md:hover:text-zinc-900' : 'md:text-white md:hover:text-red-400'}`}>
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center" aria-hidden="true">{cartCount}</span>
            )}
          </button>
          <button aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMenuOpen} className={`md:hidden p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded ${isHeaderActive ? 'text-zinc-900' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 text-zinc-600 font-medium">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Inicio</Link>
              <a href="/#productos" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Productos</a>
              <a href="/#faq" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Preguntas Frecuentes</a>
              <a href="/#proyectos" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Proyectos</a>
              <a href="/#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Contacto</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[850px] md:h-screen md:min-h-[800px] flex items-center overflow-hidden pt-32 pb-16 md:pt-0 md:pb-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/fondo-local.jpg" 
          alt="Fachada Materiales El Rey" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/70 to-zinc-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm mt-4 md:mt-0">
              EL PALOMAR. GRAN BUENOS AIRES • Materiales Directos
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-6">
              TODO PARA <br />
              <span className="text-red-500">TU OBRA</span>
            </h1>
            <ul className="text-zinc-200 text-lg md:text-xl mb-10 space-y-3 font-medium">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500 w-6 h-6 flex-shrink-0" /> <span className="bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-md">Envíos express en el día (CABA y GBA)</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500 w-6 h-6 flex-shrink-0" /> <span className="bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-md">Acopio de materiales sin cargo por 6 meses</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500 w-6 h-6 flex-shrink-0" /> <span className="bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-md">Aceptamos Cuota Simple, Transferencia y Efectivo</span></li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" aria-hidden="true" />
                <label htmlFor="hero-search" className="sr-only">Buscar materiales de construcción</label>
                <input 
                  id="hero-search"
                  type="text" 
                  placeholder="¿Qué estás buscando hoy?" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus:border-red-500/50 transition-all duration-200 backdrop-blur-md"
                />
              </div>
              <a 
                href="https://wa.me/541137221189" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative flex h-14 items-center justify-center overflow-hidden rounded-xl bg-[#25D366] px-8 font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 ease-out hover:bg-[#20bd5a] hover:pr-14 focus:outline-none ring-offset-zinc-900 cursor-pointer"
              >
                <div className="flex items-center gap-3 transition-transform duration-300 ease-out group-hover:-translate-x-2">
                  <div className="w-6 h-6 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
                    {/* @ts-ignore */}
                    <SiWhatsapp className="w-full h-full" aria-hidden="true" />
                  </div>
                  <span>Cotizar por WhatsApp</span>
                </div>
                <div className="absolute right-5 flex items-center justify-center translate-x-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                  <Truck className="text-red-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Envío Express</p>
                  <p className="text-zinc-300 text-[11px] sm:text-xs">Zona El Palomar y alrededores</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                  <ShieldCheck className="text-red-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Garantía Total</p>
                  <p className="text-zinc-300 text-[11px] sm:text-xs">Materiales certificados</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-400"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Explorar</span>
        <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const Categories = () => {
  return (
    <section id="productos" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Categorías</p>
            <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">Todo para tu <span className="text-red-600 italic">obra</span></h2>
          </div>
          <Link to="/catalogo" className="text-red-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">
            Ver catálogo completo <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-6">
          {categories.map((cat, idx) => (
            <Link to={`/catalogo?c=${cat.name}`} key={cat.id} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                role="button"
                tabIndex={0}
                aria-label={`Explorar categoría ${cat.name}`}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500 focus-visible:ring-offset-2 w-full h-full block ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-0' : 'col-span-1 row-span-1 min-h-[300px] md:min-h-0'
                } ${idx === 1 ? 'md:col-span-2' : ''}`}
              >
              <img 
                src={cat.image} 
                alt={`Materiales de ${cat.name}`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 transform transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110 group-hover:bg-red-500 group-hover:border-red-500 shadow-lg">
                  <cat.icon className="text-white w-6 h-6 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true" />
                </div>
                
                <div className="mt-6 transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  <h3 className={`${idx === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold text-white mb-1`}>{cat.name}</h3>
                  <div className="overflow-hidden">
                    <p className="text-zinc-300 text-sm font-medium transform translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                      Explorar colección <span className="text-red-400 font-bold ml-1">→</span>
                    </p>
                  </div>
                </div>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="py-20 border-y border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="text-center">
          <p className="text-5xl font-bold text-zinc-900 mb-2 tracking-tighter">25+</p>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Años de Trayectoria</p>
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold text-red-600 mb-2 tracking-tighter">15k</p>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Clientes Satisfechos</p>
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold text-zinc-900 mb-2 tracking-tighter">500+</p>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Obras Abastecidas</p>
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold text-red-600 mb-2 tracking-tighter">24h</p>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Entrega Promedio</p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contacto" className="bg-white pt-24 pb-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-zinc-950 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 p-2 overflow-hidden">
                <img src="/logo-transparent.png" alt="Materiales El Rey Logo" className="w-full h-auto object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-zinc-900">MATERIALES <span className="text-red-500">EL REY</span></span>
            </div>
            <p className="text-zinc-600 max-w-sm mb-8">
              Tu punto central en El Palomar para la provisión de materiales para la construcción civil y arquitectónica.
            </p>
            <div className="flex gap-4 mt-6">
              {/* WhatsApp Social Icon */}
              <a 
                href="https://wa.me/541137221189" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp Oficial" 
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <div className="absolute inset-0 bg-[#25D366] translate-y-[100%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <div className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-white flex items-center justify-center">
                  {/* @ts-ignore */}
                  <SiWhatsapp className="w-full h-full" aria-hidden="true" />
                </div>
              </a>

              {/* Instagram Social Icon */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Oficial" 
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-[0_0_15px_rgba(225,48,108,0.4)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] translate-y-[100%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <div className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-white flex items-center justify-center">
                  {/* @ts-ignore */}
                  <SiInstagram className="w-full h-full" aria-hidden="true" />
                </div>
              </a>

              {/* Google Maps Social Icon */}
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Google Maps Oficial" 
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-[0_0_15px_rgba(66,133,244,0.4)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="absolute inset-0 bg-[#4285F4] translate-y-[100%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <div className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-white flex items-center justify-center">
                  {/* @ts-ignore */}
                  <SiGooglemaps className="w-full h-full" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-zinc-900 font-bold mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-red-500" /> Horarios de Atención</h5>
            <ul className="space-y-3 text-zinc-600 text-sm font-medium">
              <li className="flex justify-between border-b border-zinc-100 pb-2"><span>Lunes a Viernes:</span> <span className="text-zinc-900">08:00 - 17:00</span></li>
              <li className="flex justify-between border-b border-zinc-100 pb-2"><span>Sábados:</span> <span className="text-zinc-900">08:00 - 13:00</span></li>
              <li className="flex justify-between text-red-500 pt-1"><span>Domingos y Feriados:</span> <span>Cerrado</span></li>
            </ul>

            <h5 className="text-zinc-900 font-bold mt-8 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-red-500" /> Métodos de Pago</h5>
            <div className="flex gap-2 flex-wrap text-xs text-zinc-500">
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200 font-medium">Efectivo</span>
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200 font-medium">Transferencia</span>
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200 font-medium">Tarjetas / Cuota Simple</span>
            </div>
          </div>

          <div>
            <h5 className="text-zinc-900 font-bold mb-6">Soporte</h5>
            <ul className="space-y-4 text-zinc-600 text-sm">
              <li><a href="#" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Políticas de Envío</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Contacto Directo</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">© 2024 Materiales El Rey. El Palomar, BA. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-zinc-500 text-xs">
            <a href="#" className="hover:text-zinc-900 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Privacidad</a>
            <a href="#" className="hover:text-zinc-900 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function Layout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white selection:bg-red-500 selection:text-white font-sans flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-red-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold">Saltar al contenido principal</a>
      <FloatingWhatsApp />
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main id="main-content" className="flex-1">
        <Outlet context={{ addToCart }} />
      </main>
      
      <Footer />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FAQ />
      <BrandsCTA />
      <Reviews />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="catalogo" element={<Catalog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
