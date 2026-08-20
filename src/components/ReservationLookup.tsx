import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  AlertCircle,
  QrCode,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Armchair,
  RefreshCw,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LookedUpReservation {
  code: string;
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  date: string;
  time: string;
  partySize: string;
  seatingPreference?: string;
  dietaryPreference?: string;
  specialRequests?: string;
  createdAt?: string;
  emailStatus?: string;
}

interface ReservationLookupProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function ReservationLookup({ onClose, isModal = false }: ReservationLookupProps) {
  const [bookingId, setBookingId] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [overrideEmail, setOverrideEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<LookedUpReservation | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [showEmailEdit, setShowEmailEdit] = useState(false);

  const handleLookup = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setResendSuccess(null);

    const cleanId = bookingId.trim().toUpperCase();
    if (!cleanId) {
      setError('Please enter your Reservation Reference Code (e.g. ES-103515).');
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch('/api/reservations/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: cleanId,
          email: emailInput.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.found && data.reservation) {
        setReservation(data.reservation);
        setOverrideEmail(data.reservation.email);
      } else {
        setError(data.error || 'No active reservation found with this booking ID.');
        setReservation(null);
      }
    } catch (err: any) {
      console.error('Lookup request error:', err);
      setError('Network error occurred while retrieving your reservation. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleResendEmail = async () => {
    if (!reservation) return;
    setIsResending(true);
    setError(null);
    setResendSuccess(null);

    const targetEmail = overrideEmail.trim() || reservation.email;

    try {
      const response = await fetch('/api/reservations/resend-pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: reservation.code,
          targetEmail,
          ...reservation,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResendSuccess(`Confirmation email & QR pass successfully dispatched to ${targetEmail}!`);
        setShowEmailEdit(false);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#c9973e', '#f5f0e8', '#22c55e']
          });
        } catch {
          // safe
        }
      } else {
        setError(data.error || 'Unable to re-send email pass. Please verify the email address.');
      }
    } catch (err: any) {
      console.error('Resend error:', err);
      setError('Failed to contact email dispatch service.');
    } finally {
      setIsResending(false);
    }
  };

  const checkinParams = reservation
    ? new URLSearchParams({
        checkin: 'true',
        ref: reservation.code,
        name: reservation.name,
        party: reservation.partySize,
        date: reservation.date,
        time: reservation.time,
        seating: reservation.seatingPreference || 'main_dining',
        diet: reservation.dietaryPreference || 'all',
        requests: reservation.specialRequests || '',
      }).toString()
    : '';

  const qrImageUrl = reservation
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=2&color=0d0905&bgcolor=f5f0e8&data=${encodeURIComponent(
        `${window.location.origin}/?${checkinParams}`
      )}`
    : '';

  const content = (
    <div className="w-full bg-[#120c07] border border-[#3a2816] rounded-sm p-6 sm:p-8 shadow-2xl relative">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#2a1c10] pb-5 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#c9973e]/15 border border-[#c9973e]/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#c9973e]" />
          </div>
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-semibold block">
              Reservation Pass Recovery
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#f5f0e8] tracking-wide">
              Reservation Lookup & Pass Re-Send
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-[#f5f0e8]/50 hover:text-[#f5f0e8] hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <p className="text-xs text-[#f5f0e8]/75 mb-6 font-light leading-relaxed">
        Lost your digital dining pass or didn't receive the email? Enter your booking reference ID below to retrieve your reservation and instantly re-send the full QR code pass to your inbox.
      </p>

      {/* Lookup Form */}
      <form onSubmit={handleLookup} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7">
            <label className="block text-[10px] uppercase tracking-[0.15em] text-[#c9973e] mb-1.5 font-medium">
              Booking Reference ID *
            </label>
            <div className="relative">
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="e.g. ES-103515"
                className="w-full bg-[#0a0603] border border-[#3a2816] focus:border-[#c9973e] px-4 py-3 pl-10 text-sm text-[#f5f0e8] font-mono tracking-wider rounded-xs outline-none transition-colors"
                required
              />
              <Search className="w-4 h-4 text-[#c9973e]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-[10px] uppercase tracking-[0.15em] text-[#f5f0e8]/60 mb-1.5 font-medium">
              Email (Optional)
            </label>
            <div className="relative">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Verify with email"
                className="w-full bg-[#0a0603] border border-[#3a2816] focus:border-[#c9973e] px-4 py-3 pl-10 text-sm text-[#f5f0e8] rounded-xs outline-none transition-colors"
              />
              <Mail className="w-4 h-4 text-[#f5f0e8]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSearching || !bookingId.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-[#c9973e] hover:bg-[#b08332] disabled:opacity-50 text-[#0d0905] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-[#c9973e]/10"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Searching Records...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Look Up Booking</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 bg-[#2a1010] border border-[#7f1d1d] rounded-xs flex items-center space-x-2.5 text-xs text-[#fca5a5] mb-6"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Resend Success Message */}
      {resendSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#0a2312] border border-[#166534] rounded-xs flex items-center space-x-2.5 text-xs text-[#86efac] mb-6"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22c55e]" />
          <span>{resendSuccess}</span>
        </motion.div>
      )}

      {/* Found Reservation Display Card */}
      <AnimatePresence>
        {reservation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="p-5 sm:p-6 bg-[#0c0804] border border-[#c9973e]/40 rounded-sm space-y-5"
          >
            {/* Top Pass Title & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2a1c10] pb-4 gap-2">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#c9973e] block">
                  Active Table Reservation
                </span>
                <span className="text-xl font-serif text-[#f5f0e8] tracking-wide font-medium">
                  {reservation.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-[#c9973e]/20 border border-[#c9973e] text-[#c9973e] font-mono text-xs font-bold rounded-xs tracking-wider">
                  {reservation.code}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#22c55e]/20 border border-[#22c55e]/50 text-[#86efac] rounded-xs">
                  ✓ Confirmed VIP
                </span>
              </div>
            </div>

            {/* Metrics & QR Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Column: Details */}
              <div className="md:col-span-8 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#150e08] border border-[#2a1c10] p-2.5 rounded-xs">
                    <span className="text-[9px] uppercase tracking-wider text-[#c9973e] flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date
                    </span>
                    <span className="text-[#f5f0e8] font-medium block mt-0.5 truncate">
                      {reservation.date}
                    </span>
                  </div>

                  <div className="bg-[#150e08] border border-[#2a1c10] p-2.5 rounded-xs">
                    <span className="text-[9px] uppercase tracking-wider text-[#c9973e] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Time
                    </span>
                    <span className="text-[#f5f0e8] font-medium block mt-0.5">
                      {reservation.time}
                    </span>
                  </div>

                  <div className="bg-[#150e08] border border-[#2a1c10] p-2.5 rounded-xs col-span-2 sm:col-span-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#c9973e] flex items-center gap-1">
                      <Users className="w-3 h-3" /> Party
                    </span>
                    <span className="text-[#f5f0e8] font-medium block mt-0.5">
                      {reservation.partySize}
                    </span>
                  </div>
                </div>

                <div className="bg-[#150e08] border border-[#2a1c10] p-3 rounded-xs space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#c9973e] flex items-center gap-1">
                      <Armchair className="w-3 h-3" /> Seating Area:
                    </span>
                    <span className="text-[#f5f0e8] font-medium capitalize">
                      {reservation.seatingPreference?.replace('_', ' ') || 'Main Dining Room'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#c9973e] flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Registered Email:
                    </span>
                    <span className="text-[#f5f0e8] font-mono text-[11px] truncate max-w-[200px]">
                      {reservation.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-[#080503] border border-[#3a2816] rounded-xs text-center">
                {qrImageUrl ? (
                  <img
                    src={qrImageUrl}
                    alt="Recovered QR Code"
                    className="w-24 h-24 object-contain rounded-xs border border-[#3a2816] bg-white p-1"
                  />
                ) : (
                  <QrCode className="w-20 h-20 text-[#c9973e]" />
                )}
                <span className="text-[8px] uppercase tracking-widest text-[#c9973e] mt-1.5 font-mono">
                  Host Stand QR Pass
                </span>
              </div>
            </div>

            {/* Re-Send Email Action Box */}
            <div className="border-t border-[#2a1c10] pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-[#f5f0e8]/80">
                  <span>Send pass to: </span>
                  <span className="font-mono text-[#c9973e]">{overrideEmail}</span>
                  {!showEmailEdit && (
                    <button
                      onClick={() => setShowEmailEdit(true)}
                      className="ml-2 text-[10px] text-[#f5f0e8]/50 hover:text-[#c9973e] underline cursor-pointer"
                    >
                      Change Email
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-black text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-[#22c55e]/15 whitespace-nowrap"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Re-Send Email & QR Pass</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`/?${checkinParams}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Live Host Reception Pass"
                    className="p-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-[#3a2816] text-[#c9973e] rounded-xs transition-colors cursor-pointer shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Email Change Input */}
              {showEmailEdit && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="email"
                    value={overrideEmail}
                    onChange={(e) => setOverrideEmail(e.target.value)}
                    placeholder="Enter recipient email"
                    className="flex-1 bg-[#0a0603] border border-[#3a2816] focus:border-[#c9973e] px-3 py-1.5 text-xs text-[#f5f0e8] rounded-xs outline-none"
                  />
                  <button
                    onClick={() => setShowEmailEdit(false)}
                    className="px-3 py-1.5 bg-[#1f140a] border border-[#3a2816] text-[10px] text-[#f5f0e8]/70 hover:text-[#f5f0e8] rounded-xs"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isModal) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            className="relative w-full max-w-2xl z-10 my-8"
          >
            {content}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return content;
}
