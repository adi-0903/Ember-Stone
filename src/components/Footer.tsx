import { MapPin, Phone, Instagram, Facebook, ArrowUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurantData';
import BrandLogo from './BrandLogo';

interface FooterProps {
  onOpenInfo?: () => void;
}

export default function Footer({ onOpenInfo }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Hearth Bar', href: '/bar' },
    { name: 'Philosophy', href: '/#philosophy' },
    { name: 'Private Dining', href: '/#private-dining' },
    { name: 'Reserve', href: '/#reservations' },
  ];

  return (
    <footer className="bg-[#070402] border-t border-[#3a2816] text-[#f5f0e8] py-8 sm:py-10 px-6 sm:px-12 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Compact Main Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#22170d]">
          {/* Brand Wordmark & Location */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-1 rounded-full bg-[#120c07] border border-[#c9973e]/30 shadow-md shadow-black">
              <BrandLogo size={26} variant="crimson" showGlow={true} idPrefix="footer-logo" />
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1.5 sm:gap-4">
              <h3
                className="text-xl sm:text-2xl tracking-[0.2em] font-semibold text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                EMBER & STONE
              </h3>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-mono">
                Chicago • West Loop
              </span>
            </div>
          </div>

          {/* Inline Navigation Links */}
          <nav className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#f5f0e8]/75">
            {navLinks.map((link) => (
              <span key={link.name}>
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className="hover:text-[#c9973e] transition-colors tracking-widest uppercase text-[11px]"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="hover:text-[#c9973e] transition-colors tracking-widest uppercase text-[11px]"
                  >
                    {link.name}
                  </Link>
                )}
              </span>
            ))}
            {onOpenInfo && (
              <button
                onClick={onOpenInfo}
                className="inline-flex items-center gap-1 text-[11px] uppercase font-mono text-[#c9973e] hover:text-[#d4a044] transition-colors cursor-pointer"
              >
                <Info className="w-3 h-3" />
                <span>Hours & Info</span>
              </button>
            )}
          </nav>

          {/* Quick Contact & Social */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="text-[#f5f0e8]/80 hover:text-[#c9973e] transition-colors font-mono text-[11px] flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#c9973e]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            <div className="flex items-center gap-2 border-l border-[#3a2816] pl-4">
              <a
                href="#"
                className="w-7 h-7 rounded-full border border-[#3a2816] flex items-center justify-center text-[#f5f0e8]/60 hover:text-[#c9973e] hover:border-[#c9973e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full border border-[#3a2816] flex items-center justify-center text-[#f5f0e8]/60 hover:text-[#c9973e] hover:border-[#c9973e] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Streamlined Bottom Sub-bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#f5f0e8]/45">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-[#c9973e]" />
            <span>{RESTAURANT_INFO.address}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} EMBER & STONE STEAKHOUSE.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#c9973e] hover:text-[#f5f0e8] transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
