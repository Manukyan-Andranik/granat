import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { useLanguage } from '../LanguageContext';

const NAV_LINKS = [
  { labelKey: 'nav_it', href: '#/it' },
  { labelKey: 'nav_smm', href: '#/smm' },
  { labelKey: 'nav_marketing', href: '#/marketing' },
  { labelKey: 'nav_dooh', href: '#/dooh' },
  { labelKey: 'nav_branding', href: '#/branding' },
];

export default function Navbar({ currentPage = 'home' }) {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopLangOpen, setDesktopLangOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const [isLight, setIsLight] = useState(() => {
    return typeof window !== 'undefined' ? document.documentElement.classList.contains('light') : false;
  });

  useEffect(() => {
    const onScroll = () => {
      if (currentPage === 'home') {
        setScrolled(window.scrollY > 60);
      } else {
        const container = document.querySelector('.it-page-container');
        if (container) {
          const handleContainerScroll = () => setScrolled(container.scrollTop > 60);
          container.addEventListener('scroll', handleContainerScroll, { passive: true });
          return () => container.removeEventListener('scroll', handleContainerScroll);
        }
      }
    };

    onScroll();
    if (currentPage === 'home') {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [currentPage]);

  // Sync isLight state with html class list
  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    checkTheme();
    
    const interval = setInterval(checkTheme, 500);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const nextLight = !isLight;
    setIsLight(nextLight);
    if (nextLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('granat_theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('granat_theme', 'dark');
    }
  };

  // Handle desktop language dropdown closing on click outside, Escape key, or focus loss
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setDesktopLangOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDesktopLangOpen(false);
      }
    };
    const handleFocusTracker = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setDesktopLangOpen(false);
      }
    };

    if (desktopLangOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', handleFocusTracker);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusTracker);
    };
  }, [desktopLangOpen]);

  const handleNavClick = (e, link) => {
    setMobileOpen(false);

    if (currentPage === 'it') {
      if (link.href === '#/it') {
        e.preventDefault();
        const container = document.querySelector('.it-page-container');
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      // HomePage
      if (link.href === '#/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.hash = '';
      } else if (link.href !== '#/it') {
        // Smooth scroll to services section on HomePage when clicking a service link
        setTimeout(() => {
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <motion.header
          animate={{
            maxWidth: scrolled ? '860px' : '1280px',
            y: scrolled ? 4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className={`mx-auto pointer-events-auto transition-all duration-700 ${
            scrolled
              ? 'glass-card rounded-full py-2.5 px-6 sm:px-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
              : 'bg-transparent py-4 px-0'
          }`}
        >
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            {/* Logo */}
            <motion.a
              href="#/"
              onClick={(e) => handleNavClick(e, { href: '#/' })}
              className="flex items-center gap-3 shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={logo}
                alt="GRANAT"
                className="h-8 sm:h-9 w-auto hover:brightness-110 transition-all animate-theme-img"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(215,38,56,0.4))' }}
              />
              <AnimatePresence>
                {!scrolled && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white"
                  >
                    GRANAT
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map((link) => {
                const isActive = (currentPage === 'it' && link.href === '#/it') || 
                                 (currentPage === 'home' && link.href === '#/' && !window.location.hash) ||
                                 (currentPage === 'home' && window.location.hash === link.href);

                return (
                  <motion.a
                    key={link.labelKey}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    whileHover={{ color: '#D72638', y: -1 }}
                    className={`text-[12px] mr-[5px] font-bold uppercase tracking-[0.2em] transition-colors relative group  ${
                      isActive ? 'text-granat-red' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {t(link.labelKey)}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-granat-red transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </motion.a>
                );
              })}
            </nav>

            {/* Controls and CTA Group */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Desktop Theme & Lang Controls */}
              <div className="hidden md:flex items-center gap-3">
                {/* Language Select Dropdown */}
                <div ref={langDropdownRef} className="relative pointer-events-auto">
                  <button
                    onClick={() => setDesktopLangOpen(!desktopLangOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={desktopLangOpen}
                    aria-label="Select Language"
                    className="flex items-center gap-1 w-[60px] h-[40px] overflow-hidden cursor-pointer transition-all border border-transparent px-1.5 hover:opacity-80"
                  >
                    <img
                      src={`/flags/${locale}.svg`}
                      alt={locale === 'hy' ? 'am' : locale}
                      className="w-[30px] h-[20px] object-cover rounded-sm shadow-sm"
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {desktopLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full pt-2 w-28 z-50 pointer-events-auto"
                      >
                        <div className="glass-card rounded-xl p-1.5 flex flex-col gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10">
                          {['en', 'ru', 'hy'].map((l) => (
                            <button
                              key={l}
                              onClick={() => {
                                setLocale(l);
                                setDesktopLangOpen(false);
                              }}
                              className={`flex items-center gap-2.5 w-full text-left px-2 py-1.5 rounded cursor-pointer transition-all ${
                                locale === l
                                  ? 'bg-granat-red/20 text-white font-bold'
                                  : 'hover:bg-white/5 text-white/60 hover:text-white'
                              }`}
                            >
                              <img
                                src={`/flags/${l}.svg`}
                                alt={l === 'hy' ? 'am' : l}
                                className="w-[30px] h-[20px] object-cover rounded-sm"
                              />
                              <span className="text-[12px] uppercase tracking-wider font-mono">
                                {l === 'hy' ? 'am' : l}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Switch */}
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 text-2xl rounded-full flex items-center justify-center text-white hover:bg-white/10 cursor-pointer transition-all"
                  aria-label="Toggle theme"
                >
                  {isLight ? '🌙' : '☀️'}
                </button>
              </div>

              {/* Start Project CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  if (currentPage === 'it') {
                    e.preventDefault();
                    const container = document.querySelector('.it-page-container');
                    if (container) {
                      container.scrollTo({ top: 4 * window.innerHeight, behavior: 'smooth' });
                    }
                  } else {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#D72638' }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/10 hover:border-transparent transition-all cursor-pointer"
              >
                {t('nav_start_project')}
              </motion.a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[2px] bg-white"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5 h-[2px] bg-white"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[2px] bg-white"
                />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu-overlay fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.labelKey}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-heading font-bold text-white/80 hover:text-granat-red transition-colors"
              >
                {t(link.labelKey)}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => {
                setMobileOpen(false);
                if (currentPage === 'it') {
                  e.preventDefault();
                  const container = document.querySelector('.it-page-container');
                  if (container) {
                    container.scrollTo({ top: 4 * window.innerHeight, behavior: 'smooth' });
                  }
                } else {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="mt-2 bg-granat-red text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full text-center"
            >
              {t('nav_start_project')}
            </motion.a>

            {/* Mobile theme/language settings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-white/10 w-[80%]"
            >
              {/* Mobile Language Selector Side by Side */}
              <div className="flex items-center justify-center gap-3 w-full">
                {['en', 'ru', 'hy'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all cursor-pointer ${
                      locale === l
                        ? 'border-granat-red bg-granat-red/10 text-white font-bold'
                        : 'border-white/5 bg-white/5 text-white/60'
                    }`}
                  >
                    <img
                      src={`/flags/${l}.svg`}
                      alt={l}
                      className="w-5 h-3.5 object-cover rounded-sm"
                    />
                    <span className="uppercase text-[10px] font-bold tracking-wider font-mono">
                      {l === 'hy' ? 'am' : l}
                    </span>
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs cursor-pointer transition-all"
              >
                {isLight ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
