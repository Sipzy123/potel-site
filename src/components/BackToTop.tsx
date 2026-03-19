import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

/** Floating "back to top" button — appears after scrolling 400 px down. */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          /* Desktop: bottom-right corner. Mobile: hidden — dock is there instead. */
          className="
            hidden lg:flex
            fixed bottom-8 right-8 z-[800]
            size-12 rounded-full
            bg-[#29a847] text-white
            items-center justify-center
            shadow-xl shadow-[#29a847]/30
            hover:bg-[#29a847]/90 hover:scale-110
            transition-all duration-200
          "
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
