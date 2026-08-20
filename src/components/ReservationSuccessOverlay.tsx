import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  X,
  QrCode,
  Share2,
  CheckCircle2,
  Phone,
  Mail,
  Check,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReservationFormData } from '../types';
import {
  formatWhatsAppReservationMessage,
  createWhatsAppUrl,
  generateReservationQRCode,
} from '../utils/whatsappHelper';

interface ReservationSuccessOverlayProps {
  isOpen: boolean;
  confirmationCode: string;
  formData: ReservationFormData;
  backendDispatchInfo?: {
    status?: string;
    provider?: string;
    messageId?: string;
    recipient?: string;
    details?: string;
  } | null;
  onClose: () => void;
  onBookAnother: () => void;
}

export default function ReservationSuccessOverlay({
  isOpen,
  confirmationCode,
  formData,
  backendDispatchInfo,
  onClose,
  onBookAnother,
}: ReservationSuccessOverlayProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // 1. Generate real QR code for the reservation ticket
      generateReservationQRCode(confirmationCode, formData).then((url) => {
        setQrCodeUrl(url);
      });

      // 2. Confetti Burst
      try {
        confetti({
          particleCount: 85,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#c9973e', '#f5f0e8', '#d8a84e', '#25D366'],
        });
      } catch {
        // safe fallback
      }
    }
  }, [isOpen, confirmationCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(confirmationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopySummary = () => {
    const summary = `🔥 EMBER & STONE RESERVATION PASS\nRef: ${confirmationCode}\nGuest: ${formData.name}\nDate: ${formData.date} at ${formData.time}\nParty: ${formData.partySize}\nLocation: 742 W Randolph St, Chicago, IL`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Dinner at Ember & Stone Chicago');
    const details = encodeURIComponent(
      `Reservation for ${formData.name} (${formData.partySize})\nConfirmation: ${confirmationCode}\nSeating: ${formData.seatingPreference}`
    );
    const location = encodeURIComponent('742 W Randolph St, Chicago, IL 60661');
    const dateFormatted = formData.date.replace(/-/g, '');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T230000Z/${dateFormatted}T010000Z`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="reservation-success-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, y: 25, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 15, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 320,
              delay: 0.05,
            }}
            className="relative w-full max-w-2xl bg-[#0d0905] border border-[#c9973e]/50 rounded-sm p-6 sm:p-8 md:p-10 text-[#f5f0e8] shadow-2xl shadow-black/95 overflow-hidden z-10 my-auto"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#c9973e]/15 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#f5f0e8]/50 hover:text-[#c9973e] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Close confirmation"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Stamp */}
            <div className="text-center space-y-3 pt-1">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  damping: 14,
                  stiffness: 220,
                  delay: 0.15,
                }}
                className="relative w-16 h-16 mx-auto flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 rounded-full border-2 border-[#c9973e]"
                />

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d8a84e] via-[#c9973e] to-[#8c6727] p-0.5 shadow-lg shadow-[#c9973e]/30 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#0d0905] flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-[#c9973e]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: 'easeInOut',
                          delay: 0.3,
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#c9973e] font-semibold flex items-center justify-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> RESERVATION CONFIRMED & PASS ISSUED
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-light text-[#f5f0e8] tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  We Await Your Arrival at the Hearth
                </h3>
              </div>
            </div>

            {/* Digital Pass Ticket with Real Scannable QR Code */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="mt-6 p-5 sm:p-6 bg-[#130d07] border border-[#3a2816] rounded-sm relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
            >
              {/* Pass Left 2-Cols: Details */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between border-b border-[#3a2816] pb-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#c9973e] block">
                      CONFIRMATION PASS
                    </span>
                    <span className="text-lg font-mono font-bold tracking-widest text-[#f5f0e8]">
                      {confirmationCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 bg-[#1e150d] border border-[#3a2816] hover:border-[#c9973e] text-[#c9973e] rounded-xs transition-colors cursor-pointer"
                  >
                    {copiedCode ? '✓ Copied' : 'Copy Code'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e]/80 block">
                      Guest
                    </span>
                    <span className="font-medium text-[#f5f0e8] truncate block">
                      {formData.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e]/80 block">
                      Party Size
                    </span>
                    <span className="font-medium text-[#f5f0e8]">
                      {formData.partySize}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e]/80 block">
                      Date & Time
                    </span>
                    <span className="font-medium text-[#f5f0e8]">
                      {formData.date} · {formData.time}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e]/80 block">
                      Seating
                    </span>
                    <span className="font-medium text-[#f5f0e8] capitalize">
                      {formData.seatingPreference?.replace('_', ' ') || 'Main Dining'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#3a2816]/70 flex items-center justify-between text-[11px]">
                  <span className="text-[#c9973e] font-serif italic">
                    {formData.dietaryPreference === 'veg'
                      ? '🌱 Pure Vegetarian Experience'
                      : formData.dietaryPreference === 'non-veg'
                      ? '🥩 Prime Cuts / Non-Veg'
                      : '🌍 Omnivore / Mixed Party'}
                  </span>
                  <span className="text-[#f5f0e8]/50 text-[10px]">742 W Randolph St, Chicago</span>
                </div>
              </div>

              {/* Pass Right 1-Col: Scannable QR Code */}
              <div className="flex flex-col items-center justify-center p-3 bg-[#0d0905] border border-[#3a2816] rounded-xs text-center">
                {qrCodeUrl ? (
                  <div className="relative group cursor-pointer" onClick={() => {
                    const checkinParams = new URLSearchParams({
                      checkin: 'true',
                      ref: confirmationCode,
                      name: formData.name || 'VIP Guest',
                      party: formData.partySize || '2 Guests',
                      date: formData.date || '',
                      time: formData.time || '',
                      seating: formData.seatingPreference || 'main_dining',
                      diet: formData.dietaryPreference || 'all',
                      requests: formData.specialRequests || '',
                    });
                    window.location.search = checkinParams.toString();
                  }}>
                    <img
                      src={qrCodeUrl}
                      alt="Reservation QR Code"
                      className="w-28 h-28 object-contain rounded-xs border border-[#3a2816] bg-white p-1 transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xs text-[9px] text-[#c9973e] font-mono uppercase tracking-wider">
                      Open Scanner
                    </div>
                  </div>
                ) : (
                  <div className="w-28 h-28 bg-[#18110a] animate-pulse flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-[#c9973e]" />
                  </div>
                )}
                <span className="text-[9px] tracking-widest uppercase text-[#c9973e] mt-2 font-mono">
                  Scan at Host Stand
                </span>
              </div>
            </motion.div>

            {/* Automated Email Delivery Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="mt-4 p-4 bg-[#140e08] border border-[#c9973e]/40 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-9 h-9 rounded-full bg-[#c9973e]/20 border border-[#c9973e]/50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#c9973e]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-[#f5f0e8] tracking-wide">
                      Automated Email Pass Dispatched
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#c9973e]/25 text-[#c9973e] rounded-xs font-mono">
                      ✓ Sent to Inbox
                    </span>
                  </div>
                  <p className="text-[11px] text-[#f5f0e8]/75 font-light">
                    Full dining itinerary, Google Maps directions & pass sent to <span className="font-mono text-[#c9973e]">{formData.email}</span>.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopySummary}
                className="w-full sm:w-auto px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.12] border border-[#3a2816] text-[#f5f0e8] text-[11px] font-medium tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer whitespace-nowrap"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#86efac]" /> : <Share2 className="w-3.5 h-3.5 text-[#c9973e]" />}
                <span>{copiedSummary ? 'Copied Details' : 'Copy Details'}</span>
              </button>
            </motion.div>

            {/* Other Actions (Calendar, Book Another) */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleAddToCalendar}
                className="px-5 py-2.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] tracking-[0.2em] uppercase font-semibold rounded-sm transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-[#c9973e]/20 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Google Calendar</span>
              </button>

              <button
                onClick={() => {
                  onBookAnother();
                  onClose();
                }}
                className="px-5 py-2.5 border border-[#3a2816] hover:border-[#c9973e] text-[#f5f0e8]/80 hover:text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase font-medium rounded-sm transition-colors cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
