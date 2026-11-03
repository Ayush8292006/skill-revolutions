import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/site';
import Button from './Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur background after 50px
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (after 150px)
      if (currentScrollY > 150) {
        if (currentScrollY > lastY.current && !mobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "COURSES", path: "/courses", code: "01" },
    { label: "ABOUT", path: "/about", code: "02" },
    { label: "PLACEMENTS", path: "/placements", code: "03" },
    { label: "CONTACT", path: "/contact", code: "04" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-[120%]'
        } pt-3 sm:pt-4 px-3 sm:px-6`}
      >
        <div
          className={`max-w-[1440px] mx-auto flex items-center justify-between rounded-full pl-2 pr-2 sm:pr-2.5 py-2 transition-all duration-500 ${
            isScrolled ? 'glass-panel !rounded-full' : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="bg-white rounded-full pl-2 pr-2.5 py-1 flex items-center shadow-[0_8px_24px_-8px_rgba(70,48,18,0.24)] transition-transform duration-300 group-hover:scale-[1.03]">
              <img src={siteConfig.logo} alt="Skill Revolution" className="h-8 sm:h-9 w-auto object-contain" />
            </span>
            <span className="hidden sm:flex flex-col text-left">
              <span className="font-headline font-extrabold text-sm tracking-wide text-text uppercase leading-none">Skill Revolution</span>
              <span className="font-mono text-[9px] tracking-[0.24em] text-muted uppercase leading-tight mt-1">Training · Placements</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-line bg-white/60 p-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 lg:px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    isActive ? 'text-white' : 'text-muted hover:text-text'
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="navPill" className="absolute inset-0 rounded-full bg-accent -z-0" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phonePrimary}`}
              className="hidden lg:flex items-center gap-2 font-mono text-xs text-muted hover:text-text transition-colors px-2 py-1"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span className="tracking-wider">{siteConfig.contact.phonePrimary}</span>
            </a>
            <Button to="/contact" size="sm" variant="primary" icon="diagonal">
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-text border border-lineLight bg-surface/70 backdrop-blur"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/98 md:hidden pt-24 px-6 pb-12 flex flex-col justify-between"
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                <span>NAVIGATION DIRECTORY</span>
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="group flex items-baseline justify-between border-b border-line pb-3 text-2xl font-headline font-semibold text-text hover:text-accent"
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">HOME</span>
                  <span className="font-mono text-xs text-accent">00</span>
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group flex items-baseline justify-between border-b border-line pb-3 text-2xl font-headline font-semibold text-text hover:text-accent"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-accent">{link.code}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative z-10 space-y-4 pt-6 border-t border-line">
              <div className="flex flex-col gap-1 text-xs font-mono text-muted">
                <span>SR NAGAR · HYDERABAD</span>
                <span className="text-text">{siteConfig.contact.phonePrimary}</span>
                <span className="text-text">{siteConfig.contact.email}</span>
              </div>

              <div className="flex gap-3">
                <Button to="/contact" size="md" variant="primary" className="w-full justify-center">
                  Book Free Counselling
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

