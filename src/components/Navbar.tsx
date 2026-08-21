import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Phone, Clock, MapPin, ChevronDown, Info } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onReserveClick?: () => void;
  onToggleInfo?: () => void;
}

export default function Navbar({ onReserveClick, onToggleInfo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary clean desktop links (no clutter, no two-line wrapping)
  const primaryLinks = [
    { name: 'Menu', href: '/menu', isRoute: true },
    { name: 'Hearth Bar', href: '/bar', isRoute: true },
    { name: 'Philosophy', href: '#philosophy', isRoute: false },
    { name: 'Private Dining', href: '#private-dining', isRoute: false },
  ];

  // Secondary links placed elegantly in dropdown & mobile menu
  const secondaryLinks = [
    { name: 'Executive Chef', href: '#chef', isRoute: false, desc: 'Meet Chef Marcus DeLeon' },
    { name: 'Guest Reviews', href: '#testimonials', isRoute: false, desc: 'Michelin Guide & Critics Acclaim' },
    { name: 'Location & Hours', href: '#reservations', isRoute: false, desc: 'West Loop Chicago & Valet' },
  ];

  const handleNavClick = (link: { name: string; href: string; isRoute: boolean }) => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);

    if (link.isRoute) {
      navigate(link.href);
      return;
    }

    // If we are not on the home page and user clicked a section anchor
    if (location.pathname !== '/') {
      navigate('/' + link.href);
      return;
    }

    // Scroll directly to element
    const element = document.querySelector(link.href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleReserveDirect = () => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    if (location.pathname !== '/') {
      navigate('/#reservations');
    } else if (onReserveClick) {
      onReserveClick();
    } else {
      const el = document.getElementById('reservations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || location.pathname === '/menu' || location.pathname === '/bar'
            ? 'h-20 bg-[#0d0905]/95 backdrop-blur-xl border-b border-[#3a2816]/80 shadow-2xl shadow-black/80'
            : 'h-20 md:h-24 bg-gradient-to-b from-[#090604]/95 via-[#090604]/60 to-transparent border-b border-white/[0.03]'
        }`}
      >
        <div className="w-full max-w-[1680px] mx-auto h-full px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-4">
          {/* Brand Identity & Official Emblem (Left) */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            <Link
              to="/"
              className="group flex items-center gap-3.5 sm:gap-4 cursor-pointer"
              aria-label="Ember & Stone Home"
            >
              {/* Gold Ring Logo Frame */}
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#140c07] border border-[#c9973e]/50 shadow-xl shadow-black/90 ring-2 ring-[#c9973e]/20 group-hover:border-[#c9973e] group-hover:ring-[#c9973e]/40 group-hover:scale-105 transition-all duration-300 p-0.5 shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Ember & Stone"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col justify-center select-none">
                <span
                  className="text-[18px] sm:text-[21px] tracking-[0.24em] font-semibold text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors leading-none uppercase whitespace-nowrap"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  EMBER & STONE
                </span>
                <span className="text-[8.5px] sm:text-[9px] tracking-[0.38em] text-[#c9973e] uppercase mt-1 opacity-90 whitespace-nowrap font-medium">
                  Steakhouse · Chicago
                </span>
              </div>
            </Link>

            {/* Subtle Vertical Divider separating Brand from Nav */}
            <div className="hidden xl:block h-7 w-px bg-gradient-to-b from-transparent via-[#c9973e]/30 to-transparent ml-2" />
          </div>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 2xl:space-x-10" aria-label="Main Navigation">
            {primaryLinks.map((link) => {
              const isCurrentPage = link.isRoute && location.pathname === link.href;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative text-[11.5px] xl:text-[12px] tracking-[0.2em] uppercase transition-all py-1.5 cursor-pointer group whitespace-nowrap ${
                    isCurrentPage
                      ? 'text-[#c9973e] font-semibold'
                      : 'text-[#f5f0e8]/80 hover:text-[#f5f0e8]'
                  }`}
                >
                  <span className="group-hover:text-[#c9973e] transition-colors">{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#c9973e] transition-all duration-300 ${
                      isCurrentPage ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}

            {/* Elegant "Discover ▾" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1.5 text-[11.5px] xl:text-[12px] tracking-[0.2em] uppercase transition-all py-1.5 cursor-pointer whitespace-nowrap ${
                  moreDropdownOpen ? 'text-[#c9973e]' : 'text-[#f5f0e8]/80 hover:text-[#f5f0e8]'
                }`}
              >
                <span className="hover:text-[#c9973e] transition-colors">Discover</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#c9973e] transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-2 bg-[#120c07]/98 border border-[#c9973e]/40 rounded-sm shadow-2xl shadow-black backdrop-blur-2xl z-50"
                  >
                    <div className="space-y-1">
                      {secondaryLinks.map((subLink) => (
                        <button
                          key={subLink.name}
                          onClick={() => handleNavClick(subLink)}
                          className="w-full text-left p-2.5 rounded-xs hover:bg-[#1c130b] text-[#f5f0e8] hover:text-[#c9973e] transition-colors group cursor-pointer"
                        >
                          <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#f5f0e8]/90 group-hover:text-[#c9973e]">
                            {subLink.name}
                          </div>
                          <div className="text-[10px] text-[#f5f0e8]/50 group-hover:text-[#f5f0e8]/75 font-light mt-0.5">
                            {subLink.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Actions: Quick Info + Phone Concierge + Reserve Table CTA */}
          <div className="hidden sm:flex items-center space-x-3 md:space-x-4 shrink-0">
            {/* Quick Info Drawer Toggle Button */}
            {onToggleInfo && (
              <button
                id="navbar-info-toggle-btn"
                onClick={onToggleInfo}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#c9973e]/30 hover:border-[#c9973e] bg-[#140e08]/80 hover:bg-[#1f140b] text-[#f5f0e8]/85 hover:text-[#c9973e] transition-all text-[11px] tracking-[0.15em] uppercase cursor-pointer"
                title="Quick Info: Address, Hours & Contact"
              >
                <Info className="w-3.5 h-3.5 text-[#c9973e] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline font-medium">Info</span>
              </button>
            )}

            {/* Direct Phone Concierge */}
            <a
              href="tel:+13125550182"
              className="hidden 2xl:flex items-center space-x-2 text-[11px] tracking-[0.14em] text-[#f5f0e8]/70 hover:text-[#c9973e] transition-colors px-2 py-1 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#c9973e]" />
              <span className="font-mono">312.555.0182</span>
            </a>

            {/* Reserve Table CTA Button */}
            <button
              id="nav-reserve-btn"
              onClick={handleReserveDirect}
              className="relative group px-5 sm:px-6 py-2.5 bg-gradient-to-r from-[#c9973e] via-[#dca94e] to-[#c9973e] hover:from-[#dca94e] hover:to-[#ebbc63] text-[#0d0905] text-[11px] sm:text-[11.5px] tracking-[0.22em] uppercase font-bold transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(201,151,62,0.25)] hover:shadow-[0_6px_25px_rgba(201,151,62,0.4)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              Reserve Table
            </button>
          </div>

          {/* Mobile Menu & Quick Info Trigger Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {onToggleInfo && (
              <button
                id="mobile-info-toggle-btn"
                onClick={onToggleInfo}
                className="p-2 rounded-full border border-[#c9973e]/30 bg-[#140e08] text-[#c9973e] hover:text-[#d4a044] transition-colors cursor-pointer"
                aria-label="Restaurant Info"
              >
                <Info className="w-4.5 h-4.5" />
              </button>
            )}

            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f5f0e8] hover:text-[#c9973e] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#c9973e]" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 z-30 bg-[#0d0905]/98 backdrop-blur-2xl border-b border-[#3a2816] flex flex-col justify-between p-6 sm:p-8 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 pt-2">
              {/* Mobile Drawer Brand Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#3a2816]">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#180f08] border border-[#c9973e]/40 flex items-center justify-center p-0.5 shadow-md shadow-black">
                  <img src="/logo.jpg" alt="Ember & Stone" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <span className="text-base tracking-[0.2em] font-semibold text-[#f5f0e8] block" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    EMBER & STONE
                  </span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#c9973e] block -mt-0.5">
                    Steakhouse · Chicago
                  </span>
                </div>
              </div>

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9973e] font-mono mb-1">
                Navigation
              </span>

              {[
                { name: 'Home', href: '/', isRoute: true },
                { name: 'Full Food Menu', href: '/menu', isRoute: true },
                { name: 'The Hearth Bar & Lounge', href: '/bar', isRoute: true },
                { name: 'Our Philosophy', href: '#philosophy', isRoute: false },
                { name: 'Executive Chef', href: '#chef', isRoute: false },
                { name: 'Private Dining Sanctuary', href: '#private-dining', isRoute: false },
                { name: 'Reviews & Acclaim', href: '#testimonials', isRoute: false },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="text-left text-lg font-light tracking-[0.16em] text-[#f5f0e8] hover:text-[#c9973e] transition-colors uppercase border-b border-[#3a2816]/40 pb-2.5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="space-y-5 pt-6 border-t border-[#3a2816]">
              {/* Quick Info & Reserve CTA */}
              <div className="grid grid-cols-2 gap-2.5">
                {onToggleInfo && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onToggleInfo();
                    }}
                    className="py-3 bg-[#160f09] border border-[#c9973e]/50 text-[#c9973e] text-[11px] uppercase tracking-[0.15em] font-medium rounded-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Quick Info</span>
                  </button>
                )}
                <button
                  onClick={handleReserveDirect}
                  className={`py-3 bg-[#c9973e] text-[#0d0905] text-[11px] uppercase tracking-[0.15em] font-semibold rounded-xs text-center shadow-lg shadow-[#c9973e]/20 cursor-pointer ${
                    !onToggleInfo ? 'col-span-2' : ''
                  }`}
                >
                  Reserve Table
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-[#f5f0e8]/65">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c9973e] shrink-0 mt-0.5" />
                  <span>742 W Randolph St, Chicago</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#c9973e] shrink-0 mt-0.5" />
                  <span>Dinner Daily from 5:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
