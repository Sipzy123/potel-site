import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPage = () => (
  <main className="flex-1 bg-slate-50">

    {/* Hero banner */}
    <div className="relative h-44 sm:h-56 md:h-72 lg:h-80 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <img
        alt="Contact Hero"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpnlPrwT0sngNU-S3udYK8aKV7v3g9iZfOqQM_GY220xQ0J_xXz96EjDd1zsSuWNVGMOMlts5vez07ojLu8IKgdsdy43dYZ6xRu5g6u7ezBUPTpQO7tU1zJFp7rc8rkoMquWE-cTMAfeNwODE1nBGV7WeshW3cPbiY92iEogBLnC-bghx4rRFE1gi-wldam0shM0Gk0AbUHzcLoDJtCnNav-AxSnU1ka4_QeJrgmjMlo1diZ5jPqOKdzyOWPOOr9BnZ1dxftjs4vgp"
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-0 left-0 px-5 sm:px-8 lg:px-20 pb-6 z-20 max-w-7xl mx-auto w-full">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">Contact Us</h1>
        <p className="text-white/80 mt-1 text-xs sm:text-sm max-w-md">
          We are dedicated to providing the highest quality potentiometers and industrial components from Gujarat.
        </p>
      </div>
    </div>

    {/* Body */}
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Form ── */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Send us a message</h2>
          <p className="text-slate-500 text-sm mb-6">Our experts will get back to you within 24 hours.</p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Full Name</label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#29a847]/20 focus:border-[#29a847] px-4 py-3 outline-none text-sm transition-all"
                  placeholder="John Doe" type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Email Address</label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#29a847]/20 focus:border-[#29a847] px-4 py-3 outline-none text-sm transition-all"
                  placeholder="john@example.com" type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Phone</label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#29a847]/20 focus:border-[#29a847] px-4 py-3 outline-none text-sm transition-all"
                placeholder="+91 98765 43210" type="tel"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Subject</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#29a847]/20 focus:border-[#29a847] px-4 py-3 outline-none text-sm transition-all">
                <option>Product Inquiry</option>
                <option>Bulk Order Quote</option>
                <option>Technical Support</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Message</label>
              <textarea
                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#29a847]/20 focus:border-[#29a847] px-4 py-3 outline-none text-sm resize-none transition-all"
                placeholder="Tell us how we can help..." rows={5}
              />
            </div>

            <button
              className="bg-[#29a847] hover:bg-[#29a847]/90 text-white font-bold py-3.5 px-8 rounded-xl transition-all w-full shadow-lg shadow-[#29a847]/20 text-sm uppercase tracking-widest"
              type="submit"
            >
              Send Inquiry
            </button>
          </form>
        </div>

        {/* ── Info ── */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Our Office</h2>
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  title: 'Headquarters',
                  content: '12, Ichha Estate, Abrama,\nValsad-396001, Gujarat, India'
                },
                {
                  icon: Phone,
                  title: 'Phone Number',
                  content: '(+91) 9998700754',
                  href: 'tel:+919998700754'
                },
                {
                  icon: Mail,
                  title: 'Email Support',
                  content: 'info.potentiometer@gmail.com',
                  href: 'mailto:info.potentiometer@gmail.com'
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#29a847]/10 flex items-center justify-center text-[#29a847] flex-shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-slate-600 text-sm hover:text-[#29a847] transition-colors whitespace-pre-line">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-slate-600 text-sm whitespace-pre-line">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business hours */}
          <div className="bg-[#29a847] rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="font-black text-base uppercase tracking-widest mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm">
              {[
                { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
                { day: 'Sunday', time: 'Closed' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <span className="text-white/80 font-medium">{row.day}</span>
                  <span className="font-bold">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default ContactPage;
