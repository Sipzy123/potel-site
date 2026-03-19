import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES, Category } from '../types';

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(CATEGORIES[0]);
  const location = useLocation();
  const isAdmin = new URLSearchParams(location.search).get('admin') === '1';

  return (
    <header className="flex flex-col w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 lg:px-20 py-4 bg-white border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2 py-2">
          <img
            src="/logo.png"
            alt="Potel Logo"
            className="h-16 md:h-20 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#29a847]/5 flex items-center justify-center text-[#29a847]">
              <MapPin size={18} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">12, Ichha Estate, Abrama,</p>
              <p className="text-slate-500">Valsad-396001, Gujarat.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#29a847]/5 flex items-center justify-center text-[#29a847]">
              <Phone size={18} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">(+91) 9998700754</p>
              <p className="text-slate-500">Call us for any query</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <select className="text-[10px] border border-slate-200 rounded px-2 py-1 outline-none bg-slate-50">
              <option>Select Language</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Gujarati</option>
            </select>
          </div>
        </div>

        {/* Hamburger hidden — FloatingDock handles mobile/tablet navigation */}
        <div className="lg:hidden w-8" />
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#29a847] px-6 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="hidden lg:flex items-center">
            <Link to="/" className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all ${location.pathname === '/' ? 'bg-white/20' : ''}`}>Home</Link>
            <Link to="/about" className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all ${location.pathname === '/about' ? 'bg-white/20' : ''}`}>About Us</Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveSubmenu('products')}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <Link to="/products" className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center gap-2 ${location.pathname.startsWith('/products') ? 'bg-white/20' : ''}`}>
                Products <ChevronDown size={14} />
              </Link>

              <AnimatePresence>
                {activeSubmenu === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[800px] bg-white shadow-2xl rounded-b-2xl overflow-hidden border border-slate-100 flex"
                  >
                    {/* Left Rail - Categories */}
                    <div className="w-1/3 bg-slate-50 p-4 border-r border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Categories</div>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <div
                            key={cat.name}
                            onMouseEnter={() => setHoveredCategory(cat)}
                            className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${hoveredCategory?.name === cat.name ? 'bg-[#29a847] text-white shadow-lg' : 'text-slate-600 hover:text-[#29a847] hover:bg-[#29a847]/5'}`}
                          >
                            {cat.name}
                            <ChevronRight size={14} className={hoveredCategory?.name === cat.name ? 'opacity-100' : 'opacity-0'} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Content - Subcategories */}
                    <div className="w-2/3 p-8 bg-white">
                      <div className="text-[10px] font-bold text-[#29a847] uppercase tracking-widest mb-6">Subcategories</div>
                      <div className="grid grid-cols-2 gap-4">
                        {hoveredCategory?.subcategories.map(sub => (
                          <Link
                            key={sub}
                            to={`/products?category=${hoveredCategory.name}&subcategory=${sub}`}
                            onClick={() => setActiveSubmenu(null)}
                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                          >
                            <span className="text-xs font-semibold text-slate-700 group-hover:text-[#29a847]">{sub}</span>
                            <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#29a847] group-hover:text-white transition-all">
                              <ArrowRight size={12} />
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-100">
                        <Link
                          to={`/products?category=${hoveredCategory?.name}`}
                          onClick={() => setActiveSubmenu(null)}
                          className="text-[10px] font-bold text-[#29a847] hover:underline flex items-center gap-2 uppercase tracking-widest"
                        >
                          View all {hoveredCategory?.name} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all ${location.pathname === '/contact' ? 'bg-white/20' : ''}`}>Contact Us</Link>
            {isAdmin && (
              <Link to="/admin" className="px-6 py-4 text-xs font-black text-red-200 hover:bg-red-800 transition-all uppercase tracking-widest">Admin</Link>
            )}
          </nav>

          <div className="flex items-center gap-4 py-2">
            {/* Search and Quote removed as per request */}
          </div>
        </div>
      </div>

      {/* Mobile menu removed — FloatingDock + ProductsSheet handle mobile/tablet navigation */}
    </header>
  );
};

export default Navbar;
