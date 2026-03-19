import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Info, Package, Phone, X, ChevronRight, ArrowRight, Plus, Minus } from 'lucide-react';
import { CATEGORIES, Category } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface DockItem {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  special?: 'products';
}

// ─── Nav items (matches desktop navbar) ──────────────────────────────────────
const DOCK_ITEMS: DockItem[] = [
  {
    id: 'home', label: 'Home', path: '/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'about', label: 'About', path: '/about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="8" strokeLinecap="round" strokeWidth="2.5" />
        <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'products', label: 'Products', special: 'products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="2" width="9" height="9" rx="1.5" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'contact', label: 'Contact', path: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

// ─── Products bottom sheet ─────────────────────────────────────────────────────
const ProductsSheet = ({ onClose }: { onClose: () => void }) => {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const navigate = useNavigate();

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[850] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="fixed bottom-0 left-0 right-0 z-[860] bg-white rounded-t-3xl shadow-2xl"
        style={{ maxHeight: '82vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-slate-100">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Products</h2>
          <button onClick={onClose} className="size-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
            <X size={16} />
          </button>
        </div>

        {/* View all products */}
        <button
          onClick={() => go('/products')}
          className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-bold text-[#29a847] border-b border-slate-50 hover:bg-[#29a847]/5 transition-colors"
        >
          <span>View All Products</span>
          <ArrowRight size={16} />
        </button>

        {/* Category list — scrollable */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(82vh - 130px)' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="border-b border-slate-50 last:border-0">
              {/* Category row */}
              <button
                onClick={() => setOpenCat(openCat === cat.name ? null : cat.name)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-bold text-slate-700 pr-4 leading-snug">{cat.name}</span>
                <span className={`transition-transform flex-shrink-0 text-[#29a847] ${openCat === cat.name ? 'rotate-45' : ''}`}>
                  <Plus size={16} />
                </span>
              </button>

              {/* Subcategories */}
              <AnimatePresence>
                {openCat === cat.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-slate-50"
                  >
                    <div className="px-5 pt-1 pb-2 space-y-0.5">
                      {cat.subcategories.map(sub => (
                        <button
                          key={sub}
                          onClick={() => go(`/products?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`)}
                          className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[11px] font-medium text-slate-500 hover:text-[#29a847] hover:bg-white transition-all text-left"
                        >
                          {sub}
                          <ChevronRight size={12} className="text-slate-300 flex-shrink-0" />
                        </button>
                      ))}
                      {/* View all in category */}
                      <button
                        onClick={() => go(`/products?category=${encodeURIComponent(cat.name)}`)}
                        className="w-full flex items-center gap-2 py-2.5 px-3 text-[11px] font-black text-[#29a847] uppercase tracking-wider hover:bg-white rounded-xl transition-all"
                      >
                        <ArrowRight size={12} /> View all {cat.name}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

// ─── Floating Dock ─────────────────────────────────────────────────────────────
const FloatingDock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [showProducts, setShowProducts] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  // Close products sheet on navigation
  useEffect(() => { setShowProducts(false); }, [location.pathname]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (rect) setMouseX(e.clientX - rect.left);
  };

  const getScale = (idx: number) => {
    if (mouseX === null || !dockRef.current) return 1;
    const rect = dockRef.current.getBoundingClientRect();
    const itemW = rect.width / DOCK_ITEMS.length;
    const itemCenter = idx * itemW + itemW / 2;
    const dist = Math.abs(mouseX - itemCenter);
    const maxDist = 80;
    if (dist > maxDist) return 1;
    return 1 + (1 - dist / maxDist) * 0.35;
  };

  const isActive = (item: DockItem) => {
    if (item.special === 'products') return location.pathname.startsWith('/product');
    return item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path || '__none__');
  };

  const handleClick = (item: DockItem) => {
    setMouseX(null);
    setHovered(null);
    if (item.special === 'products') {
      setShowProducts(v => !v);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Dock — only on mobile/tablet (hidden lg+) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[800] pointer-events-none">
        <motion.div
          ref={dockRef}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260, delay: 0.3 }}
          className="flex items-end gap-2 px-4 py-3 pointer-events-auto"
          style={{
            background: 'rgba(15, 15, 15, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '9999px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(41,168,71,0.15) inset',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setMouseX(null); setHovered(null); }}
        >
          {DOCK_ITEMS.map((item, i) => {
            const scale = getScale(i);
            const active = isActive(item);
            const isProductsOpen = item.special === 'products' && showProducts;

            return (
              <div key={item.id} className="relative flex flex-col items-center">
                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute bottom-full mb-3 px-2.5 py-1 rounded-lg text-xs font-bold text-white whitespace-nowrap pointer-events-none"
                      style={{
                        background: 'rgba(30,30,30,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {item.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[rgba(30,30,30,0.95)]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Button */}
                <motion.button
                  onClick={() => handleClick(item)}
                  onMouseEnter={() => setHovered(i)}
                  animate={{ scale }}
                  transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                  style={{ transformOrigin: 'bottom center' }}
                  aria-label={item.label}
                  className={`
                    relative flex items-center justify-center rounded-full transition-colors duration-200
                    w-11 h-11 sm:w-12 sm:h-12
                    ${isProductsOpen
                      ? 'bg-[#29a847] text-white shadow-lg shadow-[#29a847]/40'
                      : active
                      ? 'bg-[#29a847]/20 text-[#29a847] ring-1 ring-[#29a847]/40'
                      : 'text-slate-300 hover:text-white'
                    }
                  `}
                  style={{
                    background: isProductsOpen
                      ? '#29a847'
                      : active
                      ? 'rgba(41,168,71,0.18)'
                      : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {item.icon}
                  {/* Active dot */}
                  {active && !isProductsOpen && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#29a847]" />
                  )}
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Products bottom sheet */}
      <AnimatePresence>
        {showProducts && (
          <ProductsSheet onClose={() => setShowProducts(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingDock;
