import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, FileText, Download, Share2, Check, ArrowRight,
  Zap, Settings2, ShoppingCart, ChevronRight as CR,
} from 'lucide-react';
import { Product, ElectricalVariant } from '../types';

// ─── Shared spec table ─────────────────────────────────────────────────────────
const SpecTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-100 overflow-x-auto">
    <table className="w-full text-left text-sm min-w-[360px]">
      <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <tr>{headers.map(h => <th key={h} className="px-5 py-3">{h}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/60 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`px-5 py-3 ${j === 0 ? 'font-bold text-slate-900 uppercase tracking-tight text-xs' : 'text-slate-600 text-sm'}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Electrical variant detail content ────────────────────────────────────────
const VariantDetail = ({ active }: { active: ElectricalVariant }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={active.name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="space-y-5"
    >
      {/* Diagram images */}
      {active.diagram_images && active.diagram_images.length > 0 && (
        <div className={`grid gap-3 ${
          active.diagram_images.length === 1
            ? 'grid-cols-1'
            : active.diagram_images.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {active.diagram_images.map((img, i) => (
            <div key={i} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden flex items-center justify-center p-3">
              <img
                src={img}
                alt={`${active.name} diagram ${i + 1}`}
                className="max-w-full h-auto object-contain max-h-48 sm:max-h-56"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      {active.notes && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-amber-800 text-xs leading-relaxed italic">{active.notes}</p>
        </div>
      )}

      {/* Spec table */}
      {active.specs && active.specs.length > 0 && (
        <SpecTable
          headers={['Parameter', 'Value']}
          rows={active.specs.map(s => [s.parameter, s.result])}
        />
      )}

      {!active.diagram_images?.length && !active.specs?.length && !active.notes && (
        <p className="text-slate-400 text-sm italic text-center py-8">No details added yet.</p>
      )}
    </motion.div>
  </AnimatePresence>
);

// ─── Electrical variants panel ─────────────────────────────────────────────────
// Mobile  → horizontal scrollable pill tabs on top, content below
// Desktop → fixed left sidebar, scrollable content on right
const ElectricalVariantsPanel = ({ variants }: { variants: ElectricalVariant[] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = variants[activeIdx];

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm bg-white">

      {/* ── Mobile: horizontal pill tabs (< lg) ─────────────────────────── */}
      <div className="lg:hidden">
        {/* Scrollable pill row */}
        <div className="flex gap-2 overflow-x-auto px-4 pt-4 pb-3 border-b border-slate-100 bg-slate-50/60 scrollbar-none">
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap
                ${activeIdx === i
                  ? 'bg-[#29a847] text-white shadow-md shadow-[#29a847]/30'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#29a847]/40'
                }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Active variant label */}
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{active.name}</h3>
        </div>

        {/* Detail content */}
        <div className="px-4 pb-5">
          <VariantDetail active={active} />
        </div>
      </div>

      {/* ── Desktop: sidebar + detail (lg+) ─────────────────────────────── */}
      <div className="hidden lg:flex min-h-[400px]">
        {/* Left sidebar */}
        <div className="w-56 xl:w-64 flex-shrink-0 border-r border-slate-100 bg-slate-50">
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-full text-left px-5 py-4 text-xs font-bold transition-all border-b border-slate-100 last:border-0 flex items-center justify-between gap-2
                ${activeIdx === i
                  ? 'bg-[#29a847] text-white'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
            >
              <span className="leading-snug">{v.name}</span>
              {activeIdx === i && <CR size={14} className="flex-shrink-0 opacity-70" />}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0 p-6 xl:p-8">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4 mb-5">
            {active.name}
          </h3>
          <VariantDetail active={active} />
        </div>
      </div>
    </div>
  );
};

// ─── Tab definitions — all always shown ────────────────────────────────────────
const TABS = [
  { id: 'description', label: 'Description',      short: 'Info' },
  { id: 'electrical',  label: 'Electrical Specs',  short: 'Electrical' },
  { id: 'mechanical',  label: 'Mechanical Specs',  short: 'Mechanical' },
  { id: 'ordering',    label: 'Ordering Info',     short: 'Ordering' },
  { id: 'downloads',   label: 'Downloads',         short: 'Downloads' },
];

// ─── Main page ─────────────────────────────────────────────────────────────────
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/products')
      .then(r => r.json())
      .then((data: Product[]) => {
        const found = data.find(p => p.id === Number(id));
        if (found) {
          setProduct(found);
          setSelectedImage(found.image);
          setRelatedProducts(data.filter(p => p.category === found.category && p.id !== found.id).slice(0, 4));
        }
      });
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="size-12 border-4 border-[#29a847] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 font-bold">Loading product…</p>
      </div>
    </div>
  );

  const specs = (() => { try { return JSON.parse(product.specs || '{}'); } catch { return {}; } })();
  const gallery: string[] = product.images?.length
    ? [product.image, ...product.images.filter(u => u !== product.image)]
    : [product.image];

  // All tabs always shown — content renders when data exists, otherwise shows empty state
  const safeTab = TABS.find(t => t.id === activeTab) ? activeTab : 'description';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 py-3 px-5 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex-wrap">
          <Link to="/" className="hover:text-[#29a847] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-[#29a847] transition-colors">Products</Link>
          <ChevronRight size={12} />
          <Link to={`/products?category=${product.category}`} className="hover:text-[#29a847] transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      {/* Green header */}
      <div className="bg-[#29a847] py-6 sm:py-8 lg:py-12 px-5 sm:px-8 lg:px-20 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tight leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 justify-center md:justify-start mt-4">
              <span className="bg-white text-[#29a847] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {product.category}
              </span>
              <div className="size-10 bg-white rounded-full flex items-center justify-center p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/RoHS_logo.svg/1200px-RoHS_logo.svg.png" alt="RoHS" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          <div className="text-5xl lg:text-7xl font-black opacity-20 tracking-tighter hidden md:block">
            {product.subcategory?.split(' ').slice(0, 2).join(' ')}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-12">
        {/* Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10 lg:mb-20">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-3xl border border-slate-100 flex items-center justify-center p-5 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-full max-h-full object-contain"
                src={selectedImage || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-xl border-2 overflow-hidden bg-white p-2 transition-all ${selectedImage === img ? 'border-[#29a847] shadow-md' : 'border-slate-100 hover:border-slate-300'}`}>
                    <img src={img} className="w-full h-full object-contain" alt={`View ${idx + 1}`} referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-8">{product.brief_description || product.description}</p>

            {Object.keys(specs).length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                    <div className="text-[#29a847] text-[10px] font-black uppercase tracking-widest mb-1">{key.replace(/_/g, ' ')}</div>
                    <div className="text-slate-900 font-bold text-sm">{value as string}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto space-y-3">
              <button className="w-full bg-[#29a847] hover:bg-[#29a847]/90 text-white py-4 sm:py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#29a847]/20 transition-all group">
                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                Request Technical Quote
              </button>
              <div className="flex gap-3">
                <button className="flex-1 bg-white border border-slate-100 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-slate-600">
                  <Download size={16} className="text-[#29a847]" /> Download STEP
                </button>
                <button className="flex-1 bg-white border border-slate-100 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-slate-600">
                  <Share2 size={16} className="text-[#29a847]" /> Share Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10 lg:mb-20">
          {/* Tab bar — scrollable on mobile with short labels */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto scrollbar-none">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-5 lg:px-8 py-3.5 sm:py-4 lg:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all relative whitespace-nowrap flex-shrink-0
                  ${safeTab === tab.id ? 'text-[#29a847] bg-white' : 'text-slate-400 hover:text-slate-600'}`}>
                {/* Short label on mobile, full on sm+ */}
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {safeTab === tab.id && <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-[#29a847]" />}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={safeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>

                {/* ── Description ─────────────────────────────────── */}
                {safeTab === 'description' && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-3 sm:mb-4">Product Overview</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg">{product.description}</p>
                    </div>

                    {product.benefits?.length && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 sm:mb-5">Key Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {product.benefits.map((b, i) => (
                            <div key={i} className="flex gap-4 items-start">
                              <div className="size-8 rounded-lg bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0 mt-0.5">
                                <Check size={16} />
                              </div>
                              <p className="text-slate-700 font-medium text-sm leading-relaxed">{b}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.variants?.length && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Available Variants</h3>
                        <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 space-y-3">
                          {product.variants.map((v, i) => (
                            <div key={i} className="flex gap-3 items-start text-slate-600 text-sm">
                              <div className="size-1.5 rounded-full bg-[#29a847] mt-2 shrink-0" />
                              {v}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.mounting_info?.length && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Mounting Instructions</h3>
                        <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 space-y-4">
                          {product.mounting_info.map((info, i) => (
                            <div key={i} className="flex gap-4 items-start text-slate-600 text-sm">
                              <span className="font-black text-[#29a847] shrink-0">{i + 1}.</span>
                              {info}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.magnetic_cross_talk && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">Magnetic Cross Talk</h3>
                        <div className="bg-amber-50 border border-amber-200 p-7 rounded-2xl">
                          <p className="text-amber-800 text-sm leading-relaxed italic">{product.magnetic_cross_talk}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Electrical Specs ──────────────────────────────────── */}
                {safeTab === 'electrical' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847]">
                        <Zap size={20} />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Electrical Specifications</h2>
                    </div>

                    {product.electrical_variants?.length ? (
                      <ElectricalVariantsPanel variants={product.electrical_variants} />
                    ) : product.electrical?.length || product.electrical_options?.length ? (
                      <div className="space-y-8">
                        {product.electrical?.length && (
                          <div>
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Electrical Parameters</h3>
                            <SpecTable
                              headers={['Parameter', 'Result']}
                              rows={product.electrical.map(e => [e.parameter, e.result])}
                            />
                          </div>
                        )}
                        {product.electrical_options?.length && (
                          <div>
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Output Options</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {product.electrical_options.map((opt, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                                  <div className="text-[#29a847] text-[10px] font-black uppercase tracking-widest mb-2">{opt.option}</div>
                                  <p className="text-slate-600 text-sm">{opt.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-16 text-slate-300">
                        <Zap size={40} className="mx-auto mb-4 opacity-40" />
                        <p className="font-bold text-slate-400">No electrical specifications added yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Mechanical Specs ──────────────────────────────────── */}
                {safeTab === 'mechanical' && (
                  <div className="space-y-10">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847]">
                        <Settings2 size={20} />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Mechanical Specifications</h2>
                    </div>

                    {product.mechanical || product.material?.length || product.environment?.length ? (
                      <>
                        {product.mechanical && (
                          <div>
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Mechanical Parameters</h3>
                            <SpecTable
                              headers={['Parameter', 'Ball Bearing', 'Sleeve Bushing']}
                              rows={product.mechanical.parameters.map((p, i) => [
                                p,
                                product.mechanical!.ball_bearing[i],
                                product.mechanical!.sleeve_bushing[i],
                              ])}
                            />
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {product.material?.length && (
                            <div>
                              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Material</h3>
                              <SpecTable
                                headers={['Component', 'Material']}
                                rows={product.material.map(m => [m.component, m.material])}
                              />
                            </div>
                          )}
                          {product.environment?.length && (
                            <div>
                              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Environment</h3>
                              <SpecTable
                                headers={['Parameter', 'Value']}
                                rows={product.environment.map(e => [e.parameter, e.value])}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-16">
                        <Settings2 size={40} className="mx-auto mb-4 opacity-20 text-slate-400" />
                        <p className="font-bold text-slate-400">No mechanical specifications added yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Ordering Info ──────────────────────────────────────── */}
                {safeTab === 'ordering' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847]">
                        <ShoppingCart size={20} />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Ordering Information</h2>
                    </div>

                    {product.ordering_info ? (
                      <>
                        <div>
                          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Order Code Format</h3>
                          <div className="bg-[#29a847]/5 border border-[#29a847]/20 p-7 rounded-2xl">
                            <p className="text-[#29a847] font-mono text-sm font-bold leading-relaxed">{product.ordering_info}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                          <h4 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">How to Order</h4>
                          <ol className="space-y-3">
                            {['Use the order code format above to build your part number.',
                              'Contact our sales team via email or phone with your part number.',
                              'Receive a technical quote within 24 business hours.',
                              'Confirm the order and expected lead time with your sales rep.']
                              .map((step, i) => (
                                <li key={i} className="flex gap-4 text-sm text-slate-600">
                                  <span className="font-black text-[#29a847] shrink-0">{i + 1}.</span>
                                  {step}
                                </li>
                              ))}
                          </ol>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link to="/contact"
                            className="flex-1 bg-[#29a847] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#29a847]/90 transition-all shadow-lg shadow-[#29a847]/20">
                            <FileText size={16} /> Request a Quote
                          </Link>
                          <a href="tel:+919998700754"
                            className="flex-1 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                            Call Sales: +91 9998700754
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-16">
                        <ShoppingCart size={40} className="mx-auto mb-4 opacity-20 text-slate-400" />
                        <p className="font-bold text-slate-400">No ordering information added yet.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 max-w-sm mx-auto">
                          <Link to="/contact"
                            className="flex-1 bg-[#29a847] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#29a847]/90 transition-all shadow-lg shadow-[#29a847]/20">
                            <FileText size={16} /> Contact for Pricing
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Downloads ─────────────────────────────────────────── */}
                {safeTab === 'downloads' && (
                  <div className="space-y-5">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Downloads</h2>
                    {product.downloads?.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.downloads.map((file, i) => (
                          <a key={i} href={file.url || '#'}
                            className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#29a847]/30 transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="size-12 bg-white rounded-xl flex items-center justify-center text-[#29a847] shadow-sm group-hover:bg-[#29a847] group-hover:text-white transition-all">
                                <FileText size={22} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">{file.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{file.type} · {file.size}</p>
                              </div>
                            </div>
                            <Download size={20} className="text-[#29a847]" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <Download size={40} className="mx-auto mb-4 opacity-20 text-slate-400" />
                        <p className="font-bold text-slate-400">No downloads available for this product.</p>
                      </div>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Related Components</h2>
              <Link to="/products" className="text-xs font-black text-[#29a847] uppercase tracking-widest hover:underline">View All »</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`}
                  className="group bg-white rounded-3xl p-6 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-8 mb-6 overflow-hidden">
                    <img src={p.image} className="max-w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500" alt={p.name} referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] font-black text-[#29a847] uppercase tracking-widest mb-2 block">{p.category}</span>
                  <h4 className="text-slate-900 font-black text-sm mb-4 line-clamp-2 uppercase tracking-tight">{p.name}</h4>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In Stock</span>
                    <div className="size-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#29a847] transition-colors">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetailPage;
