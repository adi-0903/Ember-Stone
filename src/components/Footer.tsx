import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Full Food Menu', href: '/menu' },
    { name: 'Hearth Bar & Lounge', href: '/bar' },
    { name: 'Philosophy', href: '/#philosophy' },
    { name: 'Executive Chef', href: '/#chef' },
    { name: 'Private Dining', href: '/#private-dining' },
    { name: 'Guest Reviews', href: '/#testimonials' },
    { name: 'Reservations', href: '/#reservations' },
  ];

  return (
    <footer className="bg-[#080503] border-t border-[#c9973e]/60 text-[#f5f0e8] pt-20 pb-12 px-6 sm:px-12 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 pb-16 border-b border-[#3a2816]">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3
                className="text-2xl tracking-[0.2em] font-semibold text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                EMBER & STONE
              </h3>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#c9973e]">
                Craft. Fire. Finesse.
              </p>
            </div>
            <p className="text-xs text-[#f5f0e8]/65 font-light leading-relaxed max-w-xs">
              A high-craft wood-fired steakhouse honoring exceptional international ranches, heritage butchery, and the primal beauty of open coals.
            </p>
            <div className="pt-2 text-[11px] tracking-[0.1em] text-[#f5f0e8]/40">
              CHICAGO · WEST LOOP
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c9973e] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#f5f0e8]/75">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a
                      href={link.href}
                      className="hover:text-[#c9973e] transition-colors tracking-wide"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="hover:text-[#c9973e] transition-colors tracking-wide"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c9973e] font-semibold">
              Hours of Service
            </h4>
            <div className="space-y-3 text-xs text-[#f5f0e8]/75">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="space-y-0.5">
                  {h.days && (
                    <div className="flex justify-between gap-2">
                      <span className="text-[#f5f0e8]/50">{h.days}</span>
                      <span className="text-[#f5f0e8] font-medium">{h.times}</span>
                    </div>
                  )}
                  {h.note && (
                    <p className="text-[11px] text-[#c9973e] italic pt-1 font-serif">
                      {h.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c9973e] font-semibold">
              Location & Contact
            </h4>
            <div className="space-y-3 text-xs text-[#f5f0e8]/75">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#c9973e] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#c9973e] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#c9973e] transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#c9973e] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#c9973e] transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#3a2816] flex items-center justify-center text-[#f5f0e8]/60 hover:text-[#c9973e] hover:border-[#c9973e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#3a2816] flex items-center justify-center text-[#f5f0e8]/60 hover:text-[#c9973e] hover:border-[#c9973e] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#f5f0e8]/45">
          <p>© {new Date().getFullYear()} EMBER & STONE STEAKHOUSE. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[#c9973e] hover:text-[#f5f0e8] transition-colors uppercase tracking-[0.15em] text-[10px] cursor-pointer"
          >
            <span>Return to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
