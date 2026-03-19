import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top of the page on every route change. */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
};

export default ScrollToTop;
