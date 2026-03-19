import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingDock from '../components/FloatingDock';
import BackToTop from '../components/BackToTop';
import ScrollToTop from '../components/ScrollToTop';

const RootLayout = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50">
      {/* Scroll-to-top on every route change */}
      <ScrollToTop />

      <Navbar />

      {/* Main content — extra bottom padding on mobile/tablet so floating dock never covers content */}
      <div className="flex-1 pb-0 lg:pb-0">
        {/* On mobile/tablet add 88px at the bottom so the dock floats above footer cleanly */}
        <div className="pb-[88px] lg:pb-0">
          <Outlet />
        </div>
      </div>

      <Footer />

      {/* Floating dock — mobile/tablet only (renders nothing on lg+) */}
      <FloatingDock />

      {/* Back-to-top — desktop only (dock serves as anchor on mobile) */}
      <BackToTop />
    </div>
  );
};

export default RootLayout;
