import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, ArrowRight, ShieldCheck, Zap, Check, ChevronDown } from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { id: 'profile',        label: 'Company Profile' },
    { id: 'journey',        label: 'Our Journey' },
    { id: 'vision',         label: 'Vision & Mission' },
    { id: 'quality',        label: 'Quality Policy' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  const activeLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-40 sm:h-52 md:h-64 bg-slate-900 overflow-hidden">
        <img
          src="https://picsum.photos/seed/industrial/1920/1080"
          className="w-full h-full object-cover opacity-40"
          alt="About Us"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 text-center">About Us</h1>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#29a847]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-8 md:py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Sidebar ────────────────────────────────────────────────── */}
          <div className="lg:w-1/4 flex-shrink-0">

            {/* Mobile: dropdown select */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 text-sm shadow-sm"
              >
                {activeLabel}
                <ChevronDown size={18} className={`transition-transform text-slate-400 ${mobileOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="mt-2 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg"
                  >
                    {tabs.map(tab => (
                      <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}
                        className={`w-full text-left px-5 py-3.5 text-sm font-bold border-b border-slate-50 last:border-0 transition-all
                          ${activeTab === tab.id ? 'bg-[#29a847]/5 text-[#29a847]' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {tab.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop: sticky sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-32">
                <div className="p-5 bg-[#29a847] text-white">
                  <h3 className="font-black uppercase tracking-widest text-xs">Navigation</h3>
                </div>
                <div className="flex flex-col">
                  {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-4 text-left text-xs font-bold uppercase tracking-wider transition-all border-b border-slate-50 last:border-0
                        ${activeTab === tab.id ? 'bg-slate-50 text-[#29a847] border-l-4 border-l-[#29a847]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-6 bg-[#29a847] rounded-2xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-lg font-black mb-3">Need Help?</h4>
                  <p className="text-xs text-white/80 mb-5 leading-relaxed">Contact our technical support team for custom solutions.</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#29a847] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Contact Us <ArrowRight size={13} />
                  </Link>
                </div>
                <Settings size={100} className="absolute -bottom-8 -right-8 text-white/10 group-hover:rotate-90 transition-transform duration-1000" />
              </div>
            </div>
          </div>

          {/* ── Content ────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-slate-100"
              >
                {activeTab === 'profile' && (
                  <div>
                    <span className="text-[10px] font-black text-[#29a847] uppercase tracking-[0.3em] mb-3 block">Who We Are</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">Company Profile</h2>
                    <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                      Pot-Tech electronic (Bombay) Pvt. Ltd. with a Brand Name of POTEL is a leading potentiometer, sensors &amp; Encoder manufacturer in India since 1985. We are an ISO 9001:2015 certified company, dedicated to providing high-precision electronic components for various industrial applications.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8 text-sm sm:text-base">
                      Our products are widely used in sectors such as Industrial Automation, Medical Electronics, Defense, Aerospace, and Consumer Electronics. With over three decades of experience, we have established ourselves as a trusted partner for both domestic and international clients.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {[
                        { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Rigorous testing protocols ensuring 100% compliance with international standards.' },
                        { icon: Zap,         title: 'Innovation Driven',  desc: 'Continuous R&D to develop next-generation sensing technologies.' },
                      ].map((item, i) => (
                        <div key={i} className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="size-10 bg-[#29a847] rounded-xl flex items-center justify-center text-white mb-4">
                            <item.icon size={20} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'journey' && (
                  <div>
                    <span className="text-[10px] font-black text-[#29a847] uppercase tracking-[0.3em] mb-3 block">Our History</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">Our Journey</h2>
                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                      {[
                        { year: '1985', title: 'Foundation',    desc: 'Established in Mumbai with a vision to manufacture precision potentiometers.' },
                        { year: '1995', title: 'Expansion',     desc: 'Moved to a larger facility in Valsad, Gujarat to meet growing demand.' },
                        { year: '2005', title: 'Tech Upgrade',  desc: 'Introduced automated production lines and advanced testing equipment.' },
                        { year: '2015', title: 'Global Reach',  desc: 'Started exporting to European and North American markets.' },
                        { year: '2023', title: 'Innovation Era',desc: 'Launched a new range of high-precision magnetic encoders.' },
                      ].map((item, idx) => (
                        <div key={idx} className="relative pl-12">
                          <div className="absolute left-0 top-1 size-10 rounded-full bg-white border-4 border-[#29a847] flex items-center justify-center z-10">
                            <div className="size-2 bg-[#29a847] rounded-full" />
                          </div>
                          <div className="text-[#29a847] font-black text-lg mb-0.5">{item.year}</div>
                          <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Our Vision</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base italic border-l-4 border-[#29a847] pl-5">
                        "To be the global leader in precision sensing technology, empowering industries with innovative and reliable electronic components."
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Our Mission</h3>
                      <ul className="space-y-3">
                        {[
                          'Deliver exceptional quality and precision in every component.',
                          'Foster a culture of continuous innovation and technical excellence.',
                          'Build long-term partnerships through transparency and reliability.',
                          'Contribute to the advancement of industrial automation worldwide.',
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                            <div className="size-5 rounded-full bg-[#29a847]/10 flex items-center justify-center text-[#29a847] shrink-0 mt-0.5">
                              <Check size={12} />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'quality' && (
                  <div>
                    <span className="text-[10px] font-black text-[#29a847] uppercase tracking-[0.3em] mb-3 block">Our Standards</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-5">Quality Policy</h2>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                      As an ISO 9001:2015 certified company, our quality management system ensures that every product meets the highest international standards before it leaves our facility.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'ISO 9001:2015', desc: 'Quality management system certification for consistent product quality.' },
                        { title: 'RoHS Compliant', desc: 'Restriction of Hazardous Substances compliance for all products.' },
                        { title: 'REACH Standards', desc: 'Full compliance with EU REACH regulations for chemical safety.' },
                        { title: '100% Testing',  desc: 'Every unit undergoes complete functional and parametric testing.' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <h4 className="text-[#29a847] font-black text-xs uppercase tracking-widest mb-2">{item.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'infrastructure' && (
                  <div>
                    <span className="text-[10px] font-black text-[#29a847] uppercase tracking-[0.3em] mb-3 block">Our Facilities</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-5">Infrastructure</h2>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                      Our state-of-the-art manufacturing facility in Valsad, Gujarat spans over 10,000 sq. ft. and is equipped with advanced CNC machines, automated assembly lines, and precision testing equipment.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { stat: '10,000+', label: 'Sq. Ft. Facility' },
                        { stat: '50+',     label: 'Product Models' },
                        { stat: '40+',     label: 'Years Experience' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 sm:p-6 bg-[#29a847]/5 border border-[#29a847]/10 rounded-2xl text-center">
                          <div className="text-2xl sm:text-4xl font-black text-[#29a847] mb-1">{item.stat}</div>
                          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Mobile CTA card — below content */}
            <div className="lg:hidden mt-6 p-6 bg-[#29a847] rounded-2xl text-white">
              <h4 className="text-lg font-black mb-2">Need Help?</h4>
              <p className="text-xs text-white/80 mb-4 leading-relaxed">Contact our technical support team for custom solutions.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#29a847] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest">
                Contact Us <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
