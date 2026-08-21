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
            ? 'h-20 bg-[#0d0905]/95 backdrop-blur-md border-b border-[#3a2816] shadow-xl shadow-black/70'
            : 'h-20 md:h-24 bg-gradient-to-b from-[#0d0905]/90 via-[#0d0905]/40 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark (clicking goes Home) */}
          <Link
            to="/"
            className="group flex flex-col justify-center cursor-pointer shrink-0"
          >
            <span
              className="text-[17px] sm:text-[20px] tracking-[0.22em] font-semibold text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              EMBER & STONE
            </span>
            <span className="text-[8.5px] tracking-[0.35em] text-[#c9973e] uppercase -mt-0.5 opacity-85 whitespace-nowrap">
              Steakhouse · Chicago
            </span>
          </Link>

          {/* Desktop Nav Links - Clean, Spacious, Single-Line */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8" aria-label="Main Navigation">
            {primaryLinks.map((link) => {
              const isCurrentPage = link.isRoute && location.pathname === link.href;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative text-[11.5px] tracking-[0.18em] uppercase transition-colors py-1 cursor-pointer group whitespace-nowrap ${
                    isCurrentPage
                      ? 'text-[#c9973e] font-semibold'
                      : 'text-[#f5f0e8]/85 hover:text-[#c9973e]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#c9973e] transition-all duration-300 ${
                      isCurrentPage ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}

            {/* Elegant "Discover ▾" Dropdown for Secondary Links */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center space-x-1 text-[11.5px] tracking-[0.18em] uppercase text-[#f5f0e8]/85 hover:text-[#c9973e] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                <span>Discover</span>
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-2 bg-[#120c07] border border-[#c9973e]/40 rounded-xs shadow-2xl shadow-black backdrop-blur-xl z-50"
                  >
                    <div className="space-y-1">
                      {secondaryLinks.map((subLink) => (
                        <button
                          key={subLink.name}
                          onClick={() => handleNavClick(subLink)}
                          className="w-full text-left p-2.5 rounded-xs hover:bg-[#1c130b] text-[#f5f0e8] hover:text-[#c9973e] transition-colors group cursor-pointer"
                        >
                          <div className="text-[11px] tracking-[0.14em] uppercase font-medium">
                            {subLink.name}
                          </div>
                          <div className="text-[10px] text-[#f5f0e8]/50 group-hover:text-[#f5f0e8]/75 font-light">
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

          {/* Right Action: Quick Info Toggle + Direct Reservation CTA */}
          <div className="hidden sm:flex items-center space-x-3.5 md:space-x-4">
            {/* Quick Info Drawer Toggle Button */}
            {onToggleInfo && (
              <button
                id="navbar-info-toggle-btn"
                onClick={onToggleInfo}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-xs border border-[#3a2816] hover:border-[#c9973e]/80 bg-[#140e08]/90 hover:bg-[#1f140b] text-[#f5f0e8]/85 hover:text-[#c9973e] transition-all text-[11px] font-mono tracking-wider uppercase cursor-pointer"
                title="Quick Info: Address, Hours & Contact"
              >
                <Info className="w-3.5 h-3.5 text-[#c9973e] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline">Info</span>
              </button>
            )}

            <a
              href="tel:+13125550182"
              className="hidden 2xl:flex items-center space-x-2 text-[11px] tracking-[0.1em] text-[#f5f0e8]/70 hover:text-[#c9973e] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#c9973e]" />
              <span>312.555.0182</span>
            </a>

            <button
              id="nav-reserve-btn"
              onClick={handleReserveDirect}
              className="px-5 sm:px-6 py-2.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 rounded-xs shadow-md shadow-[#c9973e]/20 hover:shadow-[#c9973e]/30 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
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
                className="p-2 rounded-xs border border-[#3a2816] bg-[#140e08] text-[#c9973e] hover:text-[#d4a044] transition-colors cursor-pointer"
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
