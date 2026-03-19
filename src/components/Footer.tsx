import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, Globe, Link as LinkIcon } from 'lucide-react';

// ─── Footer image size guide ───────────────────────────────────────────────────
// Logo: any height, auto width — displayed at h-14 (56px tall)
// The footer itself has no fixed height; it grows with content.
// At full desktop width (max-w-7xl = 1280px) the 4-column grid is:
//   Col 1 (Logo + about): ~300px  |  Cols 2-3 (links): ~180px each  |  Col 4 (contact): ~260px
// Bottom bar: 48px tall (py-6)

const Footer = () => (
  <footer className="bg-white border-t border-slate-100">
    {/* Green accent bar */}
    <div className="h-1.5 bg-[#29a847] w-full" />

    {/*
      Grid layout:
        Mobile  (< sm):  1 column, stacked
        Tablet  (sm-md): 2 columns
        Desktop (lg+):   4 columns
    */}
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-12 md:py-16
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-8 sm:gap-10 lg:gap-12">

      {/* ── Col 1: Brand ── */}
      <div className="sm:col-span-2 lg:col-span-1">
        <Link to="/" className="inline-flex items-center mb-6">
          <img
            src="/logo.png"
            alt="Potel Logo"
            className="h-14 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>
        <p className="text-xs text-slate-500 leading-relaxed mb-5 max-w-xs">
          Pot-Tech electronic (Bombay) Pvt. Ltd. with a Brand Name of POTEL is a leading
          potentiometer, sensors &amp; Encoder manufacturer in India since 1985.
        </p>
        <Link to="/about" className="text-xs font-bold text-[#29a847] hover:underline">Read More »</Link>

        <div className="flex gap-4 mt-6">
          <a href="#" className="text-slate-400 hover:text-[#29a847] transition-colors"><Share2 size={16} /></a>
          <a href="#" className="text-slate-400 hover:text-[#29a847] transition-colors"><Globe size={16} /></a>
          <a href="#" className="text-slate-400 hover:text-[#29a847] transition-colors"><LinkIcon size={16} /></a>
        </div>
      </div>

      {/* ── Col 2: Quick Links ── */}
      <div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6">Quick Links</h4>
        <ul className="space-y-3 text-xs font-semibold text-slate-500">
          <li><Link to="/products" className="hover:text-[#29a847] transition-colors">Product Catalog</Link></li>
          <li><Link to="/contact"  className="hover:text-[#29a847] transition-colors">Custom Solutions</Link></li>
          <li><Link to="/about"    className="hover:text-[#29a847] transition-colors">Quality Control</Link></li>
          <li><Link to="/contact"  className="hover:text-[#29a847] transition-colors">Terms of Service</Link></li>
        </ul>
      </div>

      {/* ── Col 3: Categories ── */}
      <div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6">Categories</h4>
        <ul className="space-y-3 text-xs font-semibold text-slate-500">
          <li><Link to="/products?category=Potentiometers"                 className="hover:text-[#29a847] transition-colors">Rotary Potentiometers</Link></li>
          <li><Link to="/products?category=Linear+Sensors+(Transducers)"   className="hover:text-[#29a847] transition-colors">Linear Position Sensors</Link></li>
          <li><Link to="/products?category=Rotary+Angles+Sensors+(Encoders)" className="hover:text-[#29a847] transition-colors">Optical Encoders</Link></li>
          <li><Link to="/products"                                          className="hover:text-[#29a847] transition-colors">Tilt Sensors</Link></li>
        </ul>
      </div>

      {/* ── Col 4: Contact ── */}
      <div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6">Get In Touch</h4>
        <ul className="space-y-5 text-xs font-semibold text-slate-500">
          <li className="flex items-start gap-3">
            <MapPin size={15} className="text-[#29a847] shrink-0 mt-0.5" />
            <span className="leading-relaxed">POT-TECH ELECTRONICS PVT LTD<br />12, Ichha Estate, Abrama,<br />Valsad-396001, Gujarat – India.</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={15} className="text-[#29a847] shrink-0" />
            <a href="tel:+919998700754" className="hover:text-[#29a847] transition-colors">(+91) 9998700754</a>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={15} className="text-[#29a847] shrink-0" />
            <a href="mailto:info.potentiometer@gmail.com" className="hover:text-[#29a847] transition-colors break-all">
              info.potentiometer@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div className="bg-slate-900 py-5 px-5 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3
        text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center sm:text-left">
        <p>© 2024 Pot-Tech Electronics Private Limited. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
