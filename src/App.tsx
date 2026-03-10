import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  useNavigate,
  useParams
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  Globe, 
  Headset, 
  Rocket,
  Share2,
  Link as LinkIcon,
  Send,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ShoppingCart,
  FileText,
  Download,
  Play,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  Plus,
  Trash2,
  Zap,
  Check
} from 'lucide-react';
import { Product, CATEGORIES, Category } from './types';

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Wc-smDMpnZi9cF8lketZy0AhDa5tXd8GjcIUkcTq8iNwjDcbn0KDrpidDytXIyVSqzQ6mO0qvejTCG96YmZd7w0k95GAOidJEenP7HNpgrx_B7XMLGINXvuUiGJvEyQjlDgZFhi5J-LFjjV8e5EYzD2qSvs3ToMmyvDkmFTHuSf_NrvIDzhmJsRckgYQxhBK6w-7wA9-4Vz5PFaN3L6A3KwkRbdYkTICaoxx4cSsoWuxFSzoYTfUSORh4X84pQEgPw2IKYiobdAb" 
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

        <button className="lg:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-slate-100 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-3 text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-50">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="py-3 text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-50">About Us</Link>
              
              <div className="flex flex-col">
                <button 
                  onClick={() => setActiveSubmenu(activeSubmenu === 'mobile-products' ? null : 'mobile-products')}
                  className="py-3 text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-50 flex items-center justify-between"
                >
                  Products <ChevronDown size={16} className={`transition-transform ${activeSubmenu === 'mobile-products' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeSubmenu === 'mobile-products' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50"
                    >
                      {CATEGORIES.map(cat => (
                        <div key={cat.name} className="flex flex-col border-b border-slate-100 last:border-0">
                          <button 
                            onClick={() => setHoveredCategory(hoveredCategory?.name === cat.name ? null : cat)}
                            className="px-6 py-3 text-xs font-bold text-slate-700 flex items-center justify-between"
                          >
                            {cat.name} <Plus size={14} className={`transition-transform ${hoveredCategory?.name === cat.name ? 'rotate-45' : ''}`} />
                          </button>
                          
                          {hoveredCategory?.name === cat.name && (
                            <div className="bg-white px-8 py-2 space-y-2">
                              {cat.subcategories.map(sub => (
                                <Link 
                                  key={sub}
                                  to={`/products?category=${cat.name}&subcategory=${sub}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block py-2 text-[11px] font-medium text-slate-500 hover:text-[#29a847]"
                                >
                                  {sub}
                                </Link>
                              ))}
                              <Link 
                                to={`/products?category=${cat.name}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2 text-[11px] font-bold text-[#29a847] uppercase tracking-wider"
                              >
                                View All {cat.name}
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="py-3 text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-50">Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-slate-100">
    {/* Green Top Bar */}
    <div className="h-2 bg-[#29a847] w-full"></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Wc-smDMpnZi9cF8lketZy0AhDa5tXd8GjcIUkcTq8iNwjDcbn0KDrpidDytXIyVSqzQ6mO0qvejTCG96YmZd7w0k95GAOidJEenP7HNpgrx_B7XMLGINXvuUiGJvEyQjlDgZFhi5J-LFjjV8e5EYzD2qSvs3ToMmyvDkmFTHuSf_NrvIDzhmJsRckgYQxhBK6w-7wA9-4Vz5PFaN3L6A3KwkRbdYkTICaoxx4cSsoWuxFSzoYTfUSORh4X84pQEgPw2IKYiobdAb" 
            alt="Potel Logo" 
            className="h-16 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          Pot-Tech electronic (Bombay) Pvt. Ltd. with a Brand Name of POTEL is a leading potentiometer, sensors & Encoder manufacturer in India since 1985.
        </p>
        <Link to="/about" className="text-xs font-bold text-[#29a847] hover:underline">Read More »</Link>
        
        <div className="flex gap-4 mt-8">
          <a href="#" className="text-slate-400 hover:text-[#29a847] transition-all"><Share2 size={16} /></a>
          <a href="#" className="text-slate-400 hover:text-[#29a847] transition-all"><Globe size={16} /></a>
          <a href="#" className="text-slate-400 hover:text-[#29a847] transition-all"><LinkIcon size={16} /></a>
        </div>
      </div>

      <div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
        <ul className="space-y-4 text-xs font-semibold text-slate-500">
          <li><Link to="/products" className="hover:text-[#29a847] transition-colors">Product Catalog</Link></li>
          <li><Link to="/contact" className="hover:text-[#29a847] transition-colors">Custom Solutions</Link></li>
          <li><Link to="/about" className="hover:text-[#29a847] transition-colors">Quality Control</Link></li>
          <li><Link to="/contact" className="hover:text-[#29a847] transition-colors">Terms of Service</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Categories</h4>
        <ul className="space-y-4 text-xs font-semibold text-slate-500">
          <li><Link to="/products?category=Potentiometers" className="hover:text-[#29a847] transition-colors">Rotary Potentiometers</Link></li>
          <li><Link to="/products?category=Sensors" className="hover:text-[#29a847] transition-colors">Linear Position Sensors</Link></li>
          <li><Link to="/products?category=Encoders" className="hover:text-[#29a847] transition-colors">Optical Encoders</Link></li>
          <li><Link to="/products" className="hover:text-[#29a847] transition-colors">Joystick Controls</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Get In Touch</h4>
        <ul className="space-y-6 text-xs font-semibold text-slate-500">
          <li className="flex items-start gap-3">
            <MapPin size={16} className="text-[#29a847] shrink-0" />
            <span>POT-TECH ELECTRONICS PVT LTD 12, Ichha Estate, Abrama, Valsad-396001, Gujarat - India.</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={16} className="text-[#29a847] shrink-0" />
            <span>(+91) 9998700754</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="text-[#29a847] shrink-0" />
            <span>info.potentiometer@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-slate-900 py-6 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <p>© 2024 Pot-Tech Electronics Private Limited. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Seismic Precision",
      subtitle: "Earthquake Monitoring Components",
      desc: "Advanced tilt and speed sensors designed for critical seismic monitoring and industrial safety systems.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8aOEcPhwghWaE0BrbkgpA0k9efNXItPfvM4XdW8Bj68Ds6WiXfUYj7WM9pkNZ1LuOg8iaMskPOSSInYFmeQlHbY73NXVYGiXsFDLpiRvz0ZBLwKB5vQJjpXOyqo-qhrLO3rQ0Gkvfuz2e6tSH62MkDahhier_Inb_jQ-pzkF2zy58xqGaFC8z-4iqkN5ilaXURjSK1a1BKY6o20zSb2FMvCJsxBgeISHwexK9VKz_jyuEOq9hnvTcYENsyBFPW-o1gG6vbwJLRiKJ",
      tag: "Industrial Grade"
    },
    {
      title: "Motion Control",
      subtitle: "High-Resolution Encoders",
      desc: "Precision rotary and linear encoders providing sub-micron accuracy for automated manufacturing units.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkA0yOhUxqHp4yLDaqXR1IY4Ql1jfL6yh2R1xJY6D7lzuEbacRGcJoy-J0seL35u8LfnK1BU5vF6Kf0TUYcbgzLDXWvL-JsGf8TFjkkcId42UWaIET_k-IZT_yJ9ZqtmdKgKVwXtIiqG_dkdF4LX44Q_t9i32Ilz8E4eDVurOyFuAywuONXBTkZoJ5OiEW0K0Uhh-GdiEpJdLujYNee1YCmXz2Y4fMH0nogwY7jPH7ZgfXwSAvwGtD42gMh_DFU-rSAvBs8jnalNiQ",
      tag: "Next-Gen Tech"
    },
    {
      title: "Global Standards",
      subtitle: "ISO 9001:2015 Certified",
      desc: "Manufacturing excellence with 100% QC testing on every batch of potentiometers and transducers.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIZKO7ahBhorwxWBlDUxO3QjSsA_oviIPTkEtL0hVNypKZRNGRduh3gZLK75tjq2buV_DmjF1lvxia8Arj2gxZmFvIGWAK3HWUzpiRaZc1sxtVYVy9RaUPNDIdD2tSrXCqOD9rqLBlgHFWnTgWxisRuoPFubHTI-c4aoX1UZ-qEcbEKiQJcPiIfKVfLUyr5k3fRAAz_rhn3RfjUe8o9MQ026OK2Cqy-3VbeAWQM_rTpCkL4CyF8VT3rAyD4ll8Ba6n0a6ywezIsaNN",
      tag: "Quality First"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.filter((p: Product) => p.is_featured)));
  }, []);

  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero Slider Section */}
      <div className="relative h-[600px] lg:h-[800px] w-full overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover opacity-40 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div
              key={`tag-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#29a847] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6"
            >
              {slides[currentSlide].tag}
            </motion.div>
            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white text-5xl lg:text-8xl font-black leading-none tracking-tighter mb-4"
            >
              {slides[currentSlide].title}
              <br />
              <span className="text-[#29a847]">{slides[currentSlide].subtitle}</span>
            </motion.h1>
            <motion.p 
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
            >
              {slides[currentSlide].desc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="group flex items-center gap-3 bg-[#29a847] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#29a847]/90 transition-all shadow-2xl shadow-[#29a847]/40">
                Explore Products
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                Request Quote
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-6 lg:left-20 z-20 flex gap-3">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-12 bg-[#29a847]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        {/* Watermark Background Text */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none opacity-[0.03] rotate-90">
          <span className="text-[20vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">PRECISION</span>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Products", value: "50+" },
            { label: "Experience", value: "35Y+" },
            { label: "Global Clients", value: "500+" },
            { label: "QC Testing", value: "100%" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-5xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-[#29a847] uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Product Lines with Watermark */}
      <div className="bg-slate-50 py-24 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none select-none opacity-[0.02] -translate-x-1/4">
          <span className="text-[15vw] font-black text-slate-900 whitespace-nowrap uppercase tracking-tighter">SENSORS</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-[#29a847] font-black tracking-[0.3em] uppercase text-xs mb-3">Manufacturing Excellence</h2>
              <h3 className="text-slate-900 text-4xl lg:text-5xl font-black tracking-tighter">Core Product Lines</h3>
            </motion.div>
            <Link to="/products" className="group text-[#29a847] font-bold flex items-center gap-2 hover:underline">
              View all 50+ products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {CATEGORIES.slice(0, 3).map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={idx === 0 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDbEJHZjSPCaaiBq2YmLoBubHKWBTPBLV6IW74usbU7X-6Q8OrULUA9gJ5p71eplmJxmzwDIxZV5sg-gdcVKkArQSe5C2c2A1TX3eNJspihmX_T2TpehclCUlMbofiq9n_ypWDmfw60TZSvBX9WSprU-P_yhFaJjWOopjK9Y5Imms1FQ8W7Y2L2RPAwiuUZQlhJ4_3TmXqEOW5zJqv0YrKng5LxRutGSPHLRWjwTTFJiKqxKb76sj1qjfEqwn4jQuWcu0BWLv_SG0Mr" : idx === 1 ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDPKHe3AMVNf5njsWcGJ66VPZU8kzJ1-G2CymqxGZHwMyzjzyWUyNsetp_L3SZxuKUNFgvcfQatGqVq1VulefBnyTYkxWIgBgo_uqfUrgQBzAV5AivYMbw01mYrqSmo7QLhVyrbTO-z9nHt9xuyAUxQNArSUQqRHwKEa-3vaEQYU6Wm7v-eU_GKZ8ctkSD8qLDv09W_fZRDmtpwPLa04443EjVD9llr55-XzwEh4uaW619tBqj2UukAUJOOAh2RrniQX-pempfQyKQX" : "https://lh3.googleusercontent.com/aida-public/AB6AXuDzd2RlMP7AUTJhKmd98Cne7RvDlchXFL99X8a8N_sCDUV_30e6fiEFlO2B3_fyEnBX43vWmCsOf3crCl170nho0_AVwLBlaS2PEEOQFA3gLAEaHIypKswxMOY7lqPftAj4GZErQwdIR0ACjNNN8XC9sAVy2jiiCEraLV9xeilmx7zstkm0khBjkGl0hbUlVjJx3zrIkOOYcpVntJUk8IDTBXMjuHgjp_ZhaBYOJQWqJ23ew_Lvt8QejG34OelhCSYq_3MwidTujOhi"} 
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link to={`/products?category=${cat.name}`} className="w-full bg-[#29a847] text-white py-3 rounded-xl font-bold text-center block shadow-xl">
                      View Collection
                    </Link>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-slate-900 text-2xl font-black tracking-tight mb-3">{cat.name}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">High-precision components engineered for seismic monitoring and industrial automation.</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.subcategories.slice(0, 2).map(sub => (
                      <span key={sub} className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded-md uppercase">{sub}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section with Animated Grid */}
      <div className="py-32 px-6 lg:px-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#29a847 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-slate-900 text-5xl lg:text-6xl font-black mb-8 leading-none tracking-tighter">Decades of Industrial <br /><span className="text-[#29a847]">Manufacturing Trust</span></h2>
              <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-12">
                Since 1985, Pot-Tech Electronics has been the backbone of seismic monitoring and industrial control in India. Our parts are engineered to withstand the most demanding environments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { icon: UserCheck, title: "Quality Assured", desc: "100% rigorous QC testing on every batch." },
                { icon: Globe, title: "Global Standards", desc: "REACH & RoHS compliant manufacturing." },
                { icon: Headset, title: "Expert Support", desc: "Dedicated engineers for custom specs." },
                { icon: Rocket, title: "Rapid Delivery", desc: "Optimized logistics for global shipping." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="size-14 rounded-2xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-lg mb-1">{item.title}</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Wc-smDMpnZi9cF8lketZy0AhDa5tXd8GjcIUkcTq8iNwjDcbn0KDrpidDytXIyVSqzQ6mO0qvejTCG96YmZd7w0k95GAOidJEenP7HNpgrx_B7XMLGINXvuUiGJvEyQjlDgZFhi5J-LFjjV8e5EYzD2qSvs3ToMmyvDkmFTHuSf_NrvIDzhmJsRckgYQxhBK6w-7wA9-4Vz5PFaN3L6A3KwkRbdYkTICaoxx4cSsoWuxFSzoYTfUSORh4X84pQEgPw2IKYiobdAb" alt="Inspection" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -right-10 size-64 bg-[#29a847] rounded-[3rem] -z-10 opacity-10 blur-3xl"></div>
            <div className="absolute -top-10 -left-10 size-64 bg-slate-900 rounded-[3rem] -z-10 opacity-5 blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section - Modern Glassmorphism */}
      <div className="py-24 px-6 lg:px-20 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.05] translate-x-1/4">
          <span className="text-[20vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">CUSTOM</span>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-2/3">
            <h2 className="text-white text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-none">Need a Custom <br /><span className="text-[#29a847]">Seismic Solution?</span></h2>
            <p className="text-slate-400 text-xl max-w-2xl">Our R&D team specializes in designing bespoke earthquake parts and sensors for unique industrial applications.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link to="/contact" className="bg-[#29a847] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#29a847]/90 transition-all shadow-2xl shadow-[#29a847]/40 text-center">
              Get a Quote
            </Link>
            <Link to="/about" className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all text-center">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Company Profile' },
    { id: 'journey', label: 'Our Journey' },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'quality', label: 'Quality Policy' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-64 bg-slate-900 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/industrial/1920/1080" 
          className="w-full h-full object-cover opacity-40"
          alt="About Us"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">About Us</h1>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#29a847]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-32">
              <div className="p-6 bg-[#29a847] text-white">
                <h3 className="font-black uppercase tracking-widest text-xs">Navigation</h3>
              </div>
              <div className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-widest transition-all border-b border-slate-50 last:border-0 ${activeTab === tab.id ? 'bg-slate-50 text-[#29a847] border-l-4 border-l-[#29a847]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 p-8 bg-[#29a847] rounded-2xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-4">Need Help?</h4>
                <p className="text-xs text-white/80 mb-6 leading-relaxed">Contact our technical support team for custom solutions.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#29a847] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
              <Settings size={120} className="absolute -bottom-10 -right-10 text-white/10 group-hover:rotate-90 transition-transform duration-1000" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl p-10 lg:p-16 shadow-sm border border-slate-100"
              >
                {activeTab === 'profile' && (
                  <div>
                    <span className="text-[10px] font-black text-[#29a847] uppercase tracking-[0.3em] mb-4 block">Who We Are</span>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">Company Profile</h2>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 leading-relaxed mb-6">
                        Pot-Tech electronic (Bombay) Pvt. Ltd. with a Brand Name of POTEL is a leading potentiometer, sensors & Encoder manufacturer in India since 1985. We are an ISO 9001:2015 certified company, dedicated to providing high-precision electronic components for various industrial applications.
                      </p>
                      <p className="text-slate-600 leading-relaxed mb-8">
                        Our products are widely used in sectors such as Industrial Automation, Medical Electronics, Defense, Aerospace, and Consumer Electronics. With over three decades of experience, we have established ourselves as a trusted partner for both domestic and international clients.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="size-12 bg-[#29a847] rounded-xl flex items-center justify-center text-white mb-6">
                            <ShieldCheck size={24} />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">Quality Assurance</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Rigorous testing protocols ensuring 100% compliance with international standards.</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="size-12 bg-[#29a847] rounded-xl flex items-center justify-center text-white mb-6">
                            <Zap size={24} />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">Innovation Driven</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Continuous R&D to develop next-generation sensing technologies.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'journey' && (
                  <div>
                    <span className="text-[10px] font-black text-[#29a847] uppercase tracking-[0.3em] mb-4 block">Our History</span>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">Our Journey</h2>
                    <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                      {[
                        { year: '1985', title: 'Foundation', desc: 'Established in Mumbai with a vision to manufacture precision potentiometers.' },
                        { year: '1995', title: 'Expansion', desc: 'Moved to a larger facility in Valsad, Gujarat to meet growing demand.' },
                        { year: '2005', title: 'Tech Upgrade', desc: 'Introduced automated production lines and advanced testing equipment.' },
                        { year: '2015', title: 'Global Reach', desc: 'Started exporting to European and North American markets.' },
                        { year: '2023', title: 'Innovation Era', desc: 'Launched a new range of high-precision magnetic encoders.' }
                      ].map((item, idx) => (
                        <div key={idx} className="relative pl-12">
                          <div className="absolute left-0 top-1 size-10 rounded-full bg-white border-4 border-[#29a847] flex items-center justify-center z-10">
                            <div className="size-2 bg-[#29a847] rounded-full"></div>
                          </div>
                          <div className="text-[#29a847] font-black text-xl mb-1">{item.year}</div>
                          <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Our Vision</h3>
                      <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-[#29a847] pl-6">
                        "To be the global leader in precision sensing technology, empowering industries with innovative and reliable electronic components."
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Our Mission</h3>
                      <ul className="space-y-4">
                        {[
                          'Deliver exceptional quality and precision in every component.',
                          'Foster a culture of continuous innovation and technical excellence.',
                          'Build long-term partnerships through transparency and reliability.',
                          'Contribute to the advancement of industrial automation worldwide.'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-slate-600">
                            <div className="size-6 rounded-full bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0 mt-1">
                              <Check size={14} />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');
  const subcategoryFilter = queryParams.get('subcategory');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        let filtered = data;
        if (categoryFilter) {
          filtered = filtered.filter((p: Product) => p.category === categoryFilter);
        }
        if (subcategoryFilter) {
          filtered = filtered.filter((p: Product) => p.subcategory === subcategoryFilter);
        }
        setFilteredProducts(filtered);
      });
  }, [categoryFilter, subcategoryFilter]);

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 md:px-20 py-10">
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-tight">Our Product Catalog</h1>
          <p className="text-slate-600 text-lg max-w-2xl">Discover high-precision rotary sensors, encoders, and transducers engineered for reliability in the most demanding industrial environments.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-2">
          <Link to="/products" className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full font-semibold text-sm transition-all ${!categoryFilter ? 'bg-[#29a847] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#29a847]'}`}>
            All Products
          </Link>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.name}
              to={`/products?category=${cat.name}`} 
              className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full font-semibold text-sm transition-all ${categoryFilter === cat.name ? 'bg-[#29a847] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#29a847]'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col border border-slate-100 bg-white rounded-xl overflow-hidden hover:border-[#29a847]/50 transition-colors group"
            >
              <div className="h-64 overflow-hidden relative bg-slate-100">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={product.image} 
                  referrerPolicy="no-referrer"
                />
                {product.is_featured === 1 && (
                  <span className="absolute top-4 left-4 bg-[#29a847] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Featured</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <span className="text-[#29a847] font-bold">{product.price}</span>
                </div>
                <p className="text-slate-500 text-sm mb-6">{product.description}</p>
                <Link 
                  to={`/product/${product.id}`}
                  className="w-full py-3 bg-[#29a847] text-white font-bold rounded-lg hover:bg-[#29a847]/90 transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Product) => p.id === Number(id));
        setProduct(found);
        setSelectedImage(found?.image || null);
        if (found) {
          setRelatedProducts(data.filter((p: Product) => p.category === found.category && p.id !== found.id).slice(0, 4));
        }
      });
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  const specs = JSON.parse(product.specs || '{}');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-4 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-[#29a847] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-[#29a847] transition-colors">Products</Link>
          <ChevronRight size={12} />
          <Link to={`/products?category=${product.category}`} className="hover:text-[#29a847] transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square bg-white rounded-3xl border border-slate-100 flex items-center justify-center p-12 shadow-sm relative overflow-hidden group">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-full h-auto object-contain" 
                src={selectedImage || product.image} 
                alt={product.name} 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-6 left-6 bg-[#29a847] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                Premium Quality
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[product.image, "https://picsum.photos/seed/tech1/400/400", "https://picsum.photos/seed/tech2/400/400", "https://picsum.photos/seed/tech3/400/400"].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl border-2 transition-all overflow-hidden bg-white p-2 ${selectedImage === img ? 'border-[#29a847] shadow-md' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt={`Thumbnail ${idx}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#29a847] font-black text-[10px] tracking-[0.3em] uppercase">{product.category}</span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tighter">{product.name}</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Key Specs Boxes */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                <div key={key} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[#29a847] text-[10px] font-black uppercase tracking-widest mb-2">{key.replace('_', ' ')}</div>
                  <div className="text-slate-900 font-bold text-sm">{value as string}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <button className="w-full bg-[#29a847] hover:bg-[#29a847]/90 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#29a847]/20 transition-all group">
                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                Request Technical Quote
              </button>
              <div className="flex gap-4">
                <button className="flex-1 bg-white border border-slate-100 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-slate-600">
                  <Download size={16} className="text-[#29a847]" />
                  Download STEP
                </button>
                <button className="flex-1 bg-white border border-slate-100 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-slate-600">
                  <Share2 size={16} className="text-[#29a847]" />
                  Share Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-20">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {['description', 'specifications', 'downloads'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-[#29a847] bg-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#29a847]" />}
              </button>
            ))}
          </div>
          <div className="p-10 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose prose-slate max-w-none"
              >
                {activeTab === 'description' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Product Overview</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      The {product.name} is engineered for maximum precision and durability in industrial environments. Utilizing advanced resistive technology, it provides reliable feedback for critical control systems.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="flex gap-4">
                        <div className="size-10 rounded-xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0">
                          <Check size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">High Linearity</h4>
                          <p className="text-xs text-slate-500">Exceptional signal accuracy across the entire range of motion.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="size-10 rounded-xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0">
                          <Check size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">Robust Housing</h4>
                          <p className="text-xs text-slate-500">Industrial-grade materials resistant to vibration and shock.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'specifications' && (
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <tr>
                          <th className="px-6 py-4">Parameter</th>
                          <th className="px-6 py-4">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {Object.entries(specs).map(([key, value]) => (
                          <tr key={key} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-900 uppercase tracking-tight text-xs">{key.replace('_', ' ')}</td>
                            <td className="px-6 py-4 text-slate-600">{value as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'downloads' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Technical Datasheet', size: '1.2 MB', type: 'PDF' },
                      { name: 'Installation Manual', size: '2.5 MB', type: 'PDF' },
                      { name: '3D STEP Model', size: '4.8 MB', type: 'STEP' },
                      { name: 'Quality Certificate', size: '0.5 MB', type: 'PDF' }
                    ].map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#29a847]/30 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="size-12 bg-white rounded-xl flex items-center justify-center text-[#29a847] shadow-sm group-hover:bg-[#29a847] group-hover:text-white transition-all">
                            <FileText size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{file.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <button className="text-[#29a847] hover:text-[#29a847]/80 transition-colors">
                          <Download size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Related Components</h2>
              <Link to="/products" className="text-xs font-black text-[#29a847] uppercase tracking-widest hover:underline">View All Products »</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="group bg-white rounded-3xl p-6 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-8 mb-6 relative overflow-hidden">
                    <img src={p.image} className="max-w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500" alt={p.name} referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] font-black text-[#29a847] uppercase tracking-widest mb-2 block">{p.category}</span>
                  <h4 className="text-slate-900 font-black text-lg mb-4 line-clamp-1 uppercase tracking-tight">{p.name}</h4>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In Stock</span>
                    <div className="size-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#29a847] transition-colors">
                      <ArrowRight size={16} />
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

const ContactPage = () => (
  <main className="flex-1">
    <div className="px-6 md:px-20 lg:px-40 pt-8 pb-4">
      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <img alt="Contact Hero" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpnlPrwT0sngNU-S3udYK8aKV7v3g9iZfOqQM_GY220xQ0J_xXz96EjDd1zsSuWNVGMOMlts5vez07ojLu8IKgdsdy43dYZ6xRu5g6u7ezBUPTpQO7tU1zJFp7rc8rkoMquWE-cTMAfeNwODE1nBGV7WeshW3cPbiY92iEogBLnC-bghx4rRFE1gi-wldam0shM0Gk0AbUHzcLoDJtCnNav-AxSnU1ka4_QeJrgmjMlo1diZ5jPqOKdzyOWPOOr9BnZ1dxftjs4vgp" referrerPolicy="no-referrer" />
        <div className="absolute bottom-0 left-0 p-8 z-20">
          <h1 className="text-white text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-white/80 mt-2 max-w-lg">We are dedicated to providing the highest quality potentiometers and industrial components from our hub in Gujarat.</p>
        </div>
      </div>
    </div>

    <div className="px-6 md:px-20 lg:px-40 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="flex flex-col gap-6">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-slate-900">Send us a message</h2>
          <p className="text-slate-600 mt-2">Have a technical query or need a quote? Our experts will get back to you within 24 hours.</p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input className="w-full rounded-lg border-slate-200 bg-white text-slate-900 focus:ring-[#29a847] focus:border-[#29a847] px-4 py-3 outline-none border" placeholder="John Doe" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input className="w-full rounded-lg border-slate-200 bg-white text-slate-900 focus:ring-[#29a847] focus:border-[#29a847] px-4 py-3 outline-none border" placeholder="john@example.com" type="email" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Subject</label>
            <select className="w-full rounded-lg border-slate-200 bg-white text-slate-900 focus:ring-[#29a847] focus:border-[#29a847] px-4 py-3 outline-none border">
              <option>Product Inquiry</option>
              <option>Bulk Order Quote</option>
              <option>Technical Support</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Message</label>
            <textarea className="w-full rounded-lg border-slate-200 bg-white text-slate-900 focus:ring-[#29a847] focus:border-[#29a847] px-4 py-3 outline-none border resize-none" placeholder="Tell us how we can help..." rows={5}></textarea>
          </div>
          <button className="bg-[#29a847] hover:bg-[#29a847]/90 text-white font-bold py-4 px-8 rounded-lg transition-all w-full md:w-auto shadow-md shadow-[#29a847]/20" type="submit">
            Send Inquiry
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Office</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-[#29a847]/10 flex items-center justify-center text-[#29a847] flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Headquarters</p>
                <p className="text-slate-600">Plot No. 42-B, GIDC Electronics Estate,<br />Sector 26, Gandhinagar - 382028,<br />Gujarat, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-[#29a847]/10 flex items-center justify-center text-[#29a847] flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Phone Number</p>
                <p className="text-slate-600">+91 79 2321 45XX</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-[#29a847]/10 flex items-center justify-center text-[#29a847] flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Email Support</p>
                <p className="text-slate-600">info@potentiometer.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: CATEGORIES[0].name,
    subcategory: CATEGORIES[0].subcategories[0],
    description: '',
    price: '',
    image: '',
    specs: { supply_voltage: '', resolution: '' },
    is_featured: false
  });

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      const data = await res.json();
      setProducts([...products, { ...newProduct, id: data.id, specs: JSON.stringify(newProduct.specs), is_featured: newProduct.is_featured ? 1 : 0 }]);
      setNewProduct({
        name: '',
        category: CATEGORIES[0].name,
        subcategory: CATEGORIES[0].subcategories[0],
        description: '',
        price: '',
        image: '',
        specs: { supply_voltage: '', resolution: '' },
        is_featured: false
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard - Manage Products</h1>
      
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus /> Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              className="w-full p-3 border rounded-lg" 
              placeholder="Product Name" 
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="w-full p-3 border rounded-lg"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value, subcategory: CATEGORIES.find(c => c.name === e.target.value)?.subcategories[0] || ''})}
              >
                {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <select 
                className="w-full p-3 border rounded-lg"
                value={newProduct.subcategory}
                onChange={e => setNewProduct({...newProduct, subcategory: e.target.value})}
              >
                {CATEGORIES.find(c => c.name === newProduct.category)?.subcategories.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <textarea 
              className="w-full p-3 border rounded-lg" 
              placeholder="Description" 
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                className="w-full p-3 border rounded-lg" 
                placeholder="Price (e.g. $124.99)" 
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <input 
                className="w-full p-3 border rounded-lg" 
                placeholder="Image URL" 
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                className="w-full p-3 border rounded-lg" 
                placeholder="Supply Voltage" 
                value={newProduct.specs.supply_voltage}
                onChange={e => setNewProduct({...newProduct, specs: {...newProduct.specs, supply_voltage: e.target.value}})}
              />
              <input 
                className="w-full p-3 border rounded-lg" 
                placeholder="Resolution" 
                value={newProduct.specs.resolution}
                onChange={e => setNewProduct({...newProduct, specs: {...newProduct.specs, resolution: e.target.value}})}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={newProduct.is_featured}
                onChange={e => setNewProduct({...newProduct, is_featured: e.target.checked})}
              />
              <span className="text-sm font-medium">Featured Product</span>
            </label>
            <button className="w-full bg-[#29a847] text-white py-3 rounded-lg font-bold hover:bg-[#29a847]/90">Add Product</button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Existing Products</h2>
          <div className="space-y-4">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={p.image} className="size-12 object-cover rounded" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.category} - {p.subcategory}</p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
