import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, UserCheck, Globe, Headset, Rocket } from 'lucide-react';
import { Product, CATEGORIES } from '../types';

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

      {/* ── Hero Slider ────────────────────────────────────────────────────── */}
      {/* Mobile: 480px | Tablet: 560px | Desktop: 800px */}
      <div className="relative h-[480px] md:h-[560px] lg:h-[800px] w-full overflow-hidden bg-slate-900">
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
            {/* Gradient: full overlay on mobile, left-heavy on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20 lg:bg-gradient-to-r lg:from-slate-900 lg:via-slate-900/60 lg:to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content — centred on mobile, left-aligned on desktop */}
        <div className="relative z-10 h-full flex items-center px-5 sm:px-8 lg:px-20 max-w-7xl mx-auto w-full">
          <div className="w-full lg:max-w-3xl text-center lg:text-left">

            <motion.div
              key={`tag-${currentSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#29a847] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6"
            >
              {slides[currentSlide].tag}
            </motion.div>

            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-black leading-tight lg:leading-none tracking-tighter mb-3 md:mb-4"
            >
              {slides[currentSlide].title}
              <br />
              <span className="text-[#29a847]">{slides[currentSlide].subtitle}</span>
            </motion.h1>

            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-10 max-w-sm sm:max-w-lg mx-auto lg:mx-0"
            >
              {slides[currentSlide].desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start justify-center lg:justify-start"
            >
              <Link
                to="/products"
                className="group flex items-center gap-3 bg-[#29a847] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-[#29a847]/90 transition-all shadow-2xl shadow-[#29a847]/40 w-full sm:w-auto justify-center"
              >
                Explore Products
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white/20 transition-all w-full sm:w-auto text-center"
              >
                Request Quote
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-20 z-20 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-10 bg-[#29a847]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        {/* Watermark — hidden on mobile to avoid clutter */}
        <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none opacity-[0.03] rotate-90">
          <span className="text-[20vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">PRECISION</span>
        </div>
      </div>

      {/* ── Core Product Lines ─────────────────────────────────────────────── */}
      <div className="bg-slate-50 py-14 md:py-20 lg:py-24 px-5 sm:px-8 lg:px-20 relative overflow-hidden">
        {/* Watermark — desktop only */}
        <div className="hidden lg:block absolute top-0 left-0 pointer-events-none select-none opacity-[0.02] -translate-x-1/4">
          <span className="text-[15vw] font-black text-slate-900 whitespace-nowrap uppercase tracking-tighter">SENSORS</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-16 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="text-[#29a847] font-black tracking-[0.3em] uppercase text-xs mb-2">Manufacturing Excellence</h2>
              <h3 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">Core Product Lines</h3>
            </motion.div>
            <Link to="/products" className="group text-[#29a847] font-bold flex items-center gap-2 hover:underline text-sm shrink-0">
              View all 50+ products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 1 col → 2 col (tablet) → 3 col (desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {CATEGORIES.slice(0, 3).map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                {/* Portrait image — shorter on mobile */}
                <div className="aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5] bg-slate-200 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={
                      idx === 0
                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDbEJHZjSPCaaiBq2YmLoBubHKWBTPBLV6IW74usbU7X-6Q8OrULUA9gJ5p71eplmJxmzwDIxZV5sg-gdcVKkArQSe5C2c2A1TX3eNJspihmX_T2TpehclCUlMbofiq9n_ypWDmfw60TZSvBX9WSprU-P_yhFaJjWOopjK9Y5Imms1FQ8W7Y2L2RPAwiuUZQlhJ4_3TmXqEOW5zJqv0YrKng5LxRutGSPHLRWjwTTFJiKqxKb76sj1qjfEqwn4jQuWcu0BWLv_SG0Mr"
                        : idx === 1
                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDPKHe3AMVNf5njsWcGJ66VPZU8kzJ1-G2CymqxGZHwMyzjzyWUyNsetp_L3SZxuKUNFgvcfQatGqVq1VulefBnyTYkxWIgBgo_uqfUrgQBzAV5AivYMbw01mYrqSmo7QLhVyrbTO-z9nHt9xuyAUxQNArSUQqRHwKEa-3vaEQYU6Wm7v-eU_GKZ8ctkSD8qLDv09W_fZRDmtpwPLa04443EjVD9llr55-XzwEh4uaW619tBqj2UukAUJOOAh2RrniQX-pempfQyKQX"
                        : "https://lh3.googleusercontent.com/aida-public/AB6AXuDzd2RlMP7AUTJhKmd98Cne7RvDlchXFL99X8a8N_sCDUV_30e6fiEFlO2B3_fyEnBX43vWmCsOf3crCl170nho0_AVwLBlaS2PEEOQFA3gLAEaHIypKswxMOY7lqPftAj4GZErQwdIR0ACjNNN8XC9sAVy2jiiCEraLV9xeilmx7zstkm0khBjkGl0hbUlVjJx3zrIkOOYcpVntJUk8IDTBXMjuHgjp_ZhaBYOJQWqJ23ew_Lvt8QejG34OelhCSYq_3MwidTujOhi"
                    }
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link to={`/products?category=${cat.name}`} className="w-full bg-[#29a847] text-white py-3 rounded-xl font-bold text-sm text-center block shadow-xl">
                      View Collection
                    </Link>
                  </div>
                </div>
                <div className="p-5 md:p-6 lg:p-8">
                  <h4 className="text-slate-900 text-lg md:text-xl lg:text-2xl font-black tracking-tight mb-2">{cat.name}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    High-precision components engineered for seismic monitoring and industrial automation.
                  </p>
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

      {/* ── Trust Section ──────────────────────────────────────────────────── */}
      <div className="py-16 md:py-24 lg:py-32 px-5 sm:px-8 lg:px-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#29a847 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center relative z-10">
          <div className="w-full lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}>
              <h2 className="text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-8 leading-tight lg:leading-none tracking-tighter">
                Decades of Industrial <br />
                <span className="text-[#29a847]">Manufacturing Trust</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-12">
                Since 1985, Pot-Tech Electronics has been the backbone of seismic monitoring and industrial control in India. Our parts are engineered to withstand the most demanding environments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              {[
                { icon: UserCheck, title: "Quality Assured",  desc: "100% rigorous QC testing on every batch." },
                { icon: Globe,     title: "Global Standards", desc: "REACH & RoHS compliant manufacturing." },
                { icon: Headset,   title: "Expert Support",   desc: "Dedicated engineers for custom specs." },
                { icon: Rocket,    title: "Rapid Delivery",   desc: "Optimized logistics for global shipping." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="size-12 md:size-14 rounded-2xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-base md:text-lg mb-1">{item.title}</h5>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image — full width on mobile, right column on desktop */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[4/5]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Wc-smDMpnZi9cF8lketZy0AhDa5tXd8GjcIUkcTq8iNwjDcbn0KDrpidDytXIyVSqzQ6mO0qvejTCG96YmZd7w0k95GAOidJEenP7HNpgrx_B7XMLGINXvuUiGJvEyQjlDgZFhi5J-LFjjV8e5EYzD2qSvs3ToMmyvDkmFTHuSf_NrvIDzhmJsRckgYQxhBK6w-7wA9-4Vz5PFaN3L6A3KwkRbdYkTICaoxx4cSsoWuxFSzoYTfUSORh4X84pQEgPw2IKYiobdAb"
                alt="Quality Inspection"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 size-48 md:size-64 bg-[#29a847] rounded-[3rem] -z-10 opacity-10 blur-3xl" />
            <div className="absolute -top-8 -left-8 size-48 md:size-64 bg-slate-900 rounded-[3rem] -z-10 opacity-5 blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <div className="py-16 md:py-20 lg:py-24 px-5 sm:px-8 lg:px-20 bg-slate-900 overflow-hidden relative">
        {/* Watermark — desktop only */}
        <div className="hidden lg:block absolute top-0 right-0 pointer-events-none select-none opacity-[0.05] translate-x-1/4">
          <span className="text-[20vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">CUSTOM</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">
          <div className="lg:w-2/3">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-tight lg:leading-none">
              Need a Custom <br />
              <span className="text-[#29a847]">Seismic Solution?</span>
            </h2>
            <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto lg:mx-0">
              Our R&D team specializes in designing bespoke earthquake parts and sensors for unique industrial applications.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
            <Link
              to="/contact"
              className="bg-[#29a847] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-xl hover:bg-[#29a847]/90 transition-all shadow-2xl shadow-[#29a847]/40 text-center"
            >
              Get a Quote
            </Link>
            <Link
              to="/about"
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-xl hover:bg-white/10 transition-all text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
};

export default HomePage;
