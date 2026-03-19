import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, LayoutGrid, X } from 'lucide-react';
import { Product, CATEGORIES } from '../types';

const ProductsPage = () => {
  const [products, setProducts]               = useState<Product[]>([]);
  const [filteredProducts, setFiltered]        = useState<Product[]>([]);
  const [showTypeDrawer, setShowTypeDrawer]    = useState(false);
  const location     = useLocation();
  const params       = new URLSearchParams(location.search);
  const categoryFilter    = params.get('category');
  const subcategoryFilter = params.get('subcategory');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        let f = data;
        if (categoryFilter)    f = f.filter((p: Product) => p.category === categoryFilter);
        if (subcategoryFilter) f = f.filter((p: Product) => p.subcategory === subcategoryFilter);
        setFiltered(f);
      });
  }, [categoryFilter, subcategoryFilter]);

  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100 px-5 sm:px-8 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-2">
            Our Product Catalog
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
            High-precision rotary sensors, encoders, and transducers engineered for the most demanding industrial environments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-20 py-8">

        {/* ── Product type selector ──────────────────────────────────────── */}
        <div className="mb-8">

          {/* Mobile: "Product Type" button — replaces the wrong "Filter" label */}
          <div className="flex sm:hidden items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <button
              onClick={() => setShowTypeDrawer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm"
            >
              <LayoutGrid size={15} className="text-[#29a847]" />
              Product Type
              {categoryFilter && <span className="size-2 rounded-full bg-[#29a847] ml-0.5" />}
            </button>
          </div>

          {/* Tablet/Desktop: scrollable category chip row */}
          <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 pb-2 overflow-x-auto">
            <Link to="/products"
              className={`flex h-9 shrink-0 items-center px-4 rounded-full font-semibold text-xs transition-all ${!categoryFilter ? 'bg-[#29a847] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#29a847]'}`}>
              All Products
            </Link>
            {CATEGORIES.map(cat => (
              <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`flex h-9 shrink-0 items-center px-4 rounded-full font-semibold text-xs transition-all ${categoryFilter === cat.name ? 'bg-[#29a847] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#29a847]'}`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile product-type bottom drawer */}
        {showTypeDrawer && (
          <div className="fixed inset-0 z-50 sm:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTypeDrawer(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>
              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-[#29a847]" />
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Product Types</h3>
                </div>
                <button onClick={() => setShowTypeDrawer(false)}
                  className="size-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <X size={16} />
                </button>
              </div>
              {/* List */}
              <div className="overflow-y-auto flex-1 p-3">
                <Link to="/products" onClick={() => setShowTypeDrawer(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 ${!categoryFilter ? 'bg-[#29a847] text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                  All Product Types
                </Link>
                {CATEGORIES.map(cat => (
                  <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setShowTypeDrawer(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 ${categoryFilter === cat.name ? 'bg-[#29a847] text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active category badge on mobile */}
        {categoryFilter && (
          <div className="flex sm:hidden items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type:</span>
            <span className="flex items-center gap-1.5 bg-[#29a847]/10 text-[#29a847] text-xs font-bold px-3 py-1.5 rounded-full border border-[#29a847]/20">
              {categoryFilter}
              <Link to="/products" className="hover:text-[#29a847]/70 transition-colors">
                <X size={11} />
              </Link>
            </span>
          </div>
        )}

        {/* ── Product grid ────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <LayoutGrid size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">No products found for this type</p>
            <Link to="/products" className="text-[#29a847] text-sm font-bold mt-2 inline-block hover:underline">
              Browse all product types
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <motion.div
                layout key={product.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-[#29a847]/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden relative bg-slate-100">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.image}
                    referrerPolicy="no-referrer"
                  />
                  {product.is_featured === 1 && (
                    <span className="absolute top-3 left-3 bg-[#29a847] text-white text-[10px] uppercase font-black px-2 py-1 rounded-lg">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{product.name}</h4>
                    <span className="text-[#29a847] font-bold text-xs shrink-0">{product.price}</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-4 line-clamp-1">{product.subcategory}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-auto w-full py-2.5 sm:py-3 bg-[#29a847] text-white font-bold rounded-xl hover:bg-[#29a847]/90 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <FileText size={16} /> View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
