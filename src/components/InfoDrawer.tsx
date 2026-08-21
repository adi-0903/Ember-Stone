import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Phone,
  Clock,
  Mail,
  Car,
  Compass,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Flame,
  Wine,
  Sparkles,
  Info
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservations?: () => void;
}

export default function InfoDrawer({ isOpen, onClose, onOpenReservations }: InfoDrawerProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'Ember & Stone, 742 W Randolph St, Chicago, IL 60661'
    )}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.aside
            id="restaurant-info-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-md bg-[#0e0a06] border-l border-[#3a2816] text-[#f5f0e8] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-drawer-title"
          >
            {/* Header with Ember Flare */}
            <div className="relative p-6 sm:p-7 border-b border-[#3a2816] bg-gradient-to-b from-[#180f08] to-[#0e0a06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#c9973e]/50 bg-[#120c07] flex items-center justify-center text-[#c9973e] shadow-md shadow-black">
                  <Flame className="w-4.5 h-4.5 text-[#d4a044] animate-pulse" />
                </div>
                <div>
                  <h2
                    id="info-drawer-title"
                    className="text-xl sm:text-2xl font-light tracking-[0.15em] text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    EMBER & STONE
                  </h2>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-mono">
                    Essential Guest Guide & Contact
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#160e09] border border-[#3a2816] hover:border-[#c9973e] text-[#f5f0e8]/80 hover:text-[#c9973e] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Info Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-7 custom-scrollbar">
              
              {/* SECTION: Address & Directions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] uppercase font-mono tracking-[0.25em] text-[#c9973e] flex items-center gap-1.5 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#d4a044]" />
                    Location & Valet
                  </span>
                  <button
                    onClick={() => handleCopy(RESTAURANT_INFO.address, 'address')}
                    className="text-[10px] uppercase font-mono text-[#f5f0e8]/50 hover:text-[#c9973e] flex items-center gap-1 transition-colors cursor-pointer"
                    title="Copy Address"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="w-3 h-3 text-[#86efac]" />
                        <span className="text-[#86efac]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-sm bg-[#140e08] border border-[#3a2816] space-y-2.5">
                  <p className="text-base text-[#f5f0e8] font-light leading-snug">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-[#f5f0e8]/65 font-light leading-relaxed">
                    Located in Chicago's Fulton Market / West Loop Dining Corridor.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={getGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xs bg-[#c9973e]/15 hover:bg-[#c9973e]/25 text-[#d4a044] border border-[#c9973e]/40 text-xs font-mono tracking-wider uppercase transition-colors"
                    >
                      <Compass className="w-3 h-3" />
                      <span>Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-75" />
                    </a>

                    <div className="flex items-center gap-1.5 text-xs text-[#f5f0e8]/60 font-light">
                      <Car className="w-3.5 h-3.5 text-[#c9973e]" />
                      <span>Valet at Entrance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Operating Hours */}
              <div className="space-y-3">
                <span className="text-[10.5px] uppercase font-mono tracking-[0.25em] text-[#c9973e] flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#d4a044]" />
                  Dining Room & Lounge Hours
                </span>

                <div className="p-4 rounded-sm bg-[#140e08] border border-[#3a2816] space-y-3">
                  <div className="space-y-2">
                    {RESTAURANT_INFO.hours.map((h, i) => {
                      if ('note' in h && h.note) {
                        return (
                          <div
                            key={i}
                            className="pt-2 border-t border-[#3a2816]/60 flex items-start gap-2 text-xs text-[#c9973e] font-serif italic"
                          >
                            <Wine className="w-3.5 h-3.5 text-[#d4a044] shrink-0 mt-0.5" />
                            <span>{h.note}</span>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-[#3a2816]/30 last:border-0"
                        >
                          <span className="text-[#f5f0e8]/80 font-light">{h.days}</span>
                          <span className="text-[#f5f0e8] font-mono font-medium tracking-wide text-xs">
                            {h.times}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#f5f0e8]/60 font-light">
                    <span>Kitchen Closes: 45 min prior</span>
                    <span className="text-[#86efac] flex items-center gap-1 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
                      Live Hearth Daily
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION: Direct Contact & Concierge */}
              <div className="space-y-3">
                <span className="text-[10.5px] uppercase font-mono tracking-[0.25em] text-[#c9973e] flex items-center gap-1.5 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#d4a044]" />
                  Contact & Concierge
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Phone Box */}
                  <div className="p-3.5 rounded-sm bg-[#140e08] border border-[#3a2816] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-mono text-[#f5f0e8]/50">Host Desk</span>
                      <button
                        onClick={() => handleCopy(RESTAURANT_INFO.phone, 'phone')}
                        className="text-[9.5px] uppercase font-mono text-[#f5f0e8]/50 hover:text-[#c9973e] transition-colors"
                      >
                        {copiedField === 'phone' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-sm font-mono text-[#f5f0e8] hover:text-[#c9973e] transition-colors font-medium flex items-center gap-1.5"
                    >
                      <Phone className="w-3 h-3 text-[#c9973e]" />
                      <span>{RESTAURANT_INFO.phone}</span>
                    </a>
                  </div>

                  {/* Email Box */}
                  <div className="p-3.5 rounded-sm bg-[#140e08] border border-[#3a2816] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-mono text-[#f5f0e8]/50">Inquiries</span>
                      <button
                        onClick={() => handleCopy(RESTAURANT_INFO.email, 'email')}
                        className="text-[9.5px] uppercase font-mono text-[#f5f0e8]/50 hover:text-[#c9973e] transition-colors"
                      >
                        {copiedField === 'email' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-xs font-mono text-[#f5f0e8] hover:text-[#c9973e] transition-colors truncate flex items-center gap-1.5"
                    >
                      <Mail className="w-3 h-3 text-[#c9973e]" />
                      <span className="truncate">{RESTAURANT_INFO.email}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SECTION: Quick Guidelines */}
              <div className="p-4 rounded-sm bg-[#120a05] border border-[#3a2816]/70 space-y-2 text-xs text-[#f5f0e8]/75 font-light">
                <div className="text-[10px] uppercase font-mono text-[#c9973e] tracking-widest flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#d4a044]" />
                  <span>Guest Hospitality Guidelines</span>
                </div>
                <ul className="space-y-1.5 pt-1 text-[11.5px] text-[#f5f0e8]/70">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c9973e]" />
                    <span><strong>Dress Code:</strong> Smart Casual & Elegant Evening Attire</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c9973e]" />
                    <span><strong>Corkage Policy:</strong> $45 per 750ml (Max 2 bottles, non-list)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c9973e]" />
                    <span><strong>Private Dining:</strong> 8 to 40 guests in the Ember Sanctuary</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Footer Action */}
            <div className="p-5 border-t border-[#3a2816] bg-[#0c0805] space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenReservations) {
                    onOpenReservations();
                  } else {
                    const el = document.getElementById('reservations');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs text-center shadow-lg shadow-[#c9973e]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve a Table Online</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 bg-transparent text-[#f5f0e8]/60 hover:text-[#f5f0e8] text-[11px] uppercase tracking-widest text-center transition-colors cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
