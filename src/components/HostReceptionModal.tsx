import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Users,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  X,
  Printer,
  ShieldCheck,
  Armchair
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HostCheckInDetails {
  ref: string;
  name: string;
  party: string;
  date: string;
  time: string;
  seating?: string;
  diet?: string;
  requests?: string;
}

export default function HostReceptionModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<HostCheckInDetails | null>(null);
  const [isSeated, setIsSeated] = useState(false);

  useEffect(() => {
    const isCheckin = searchParams.get('checkin') === 'true';
    const ref = searchParams.get('ref');

    if (isCheckin && ref) {
      setDetails({
        ref: ref || 'ES-000000',
        name: searchParams.get('name') || 'Honored VIP Guest',
        party: searchParams.get('party') || '2 Guests',
        date: searchParams.get('date') || 'Today',
        time: searchParams.get('time') || '7:00 PM',
        seating: searchParams.get('seating') || 'Main Dining Room',
        diet: searchParams.get('diet') || 'Standard Experience',
        requests: searchParams.get('requests') || '',
      });
      setIsOpen(true);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#c9973e', '#f5f0e8', '#8c6727']
        });
      } catch {
        // safe
      }
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    // Clear checkin query params without full page reload
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('checkin');
    newParams.delete('ref');
    newParams.delete('name');
    newParams.delete('party');
    newParams.delete('date');
    newParams.delete('time');
    newParams.delete('seating');
    newParams.delete('diet');
    newParams.delete('requests');
    setSearchParams(newParams);
  };

  const handleMarkSeated = () => {
    setIsSeated(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#c9973e', '#f5f0e8']
      });
    } catch {
      // safe
    }
  };

  if (!isOpen || !details) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Reception Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#120c07] border border-[#c9973e]/50 rounded-sm shadow-2xl shadow-black overflow-hidden z-10 my-8"
        >
          {/* Top Host Header Banner */}
          <div className="bg-gradient-to-r from-[#1c1209] via-[#2a1a0c] to-[#1c1209] border-b border-[#3a2816] px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#c9973e]/20 border border-[#c9973e] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#c9973e]" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-semibold block">
                  Host Stand • Reception Check-In
                </span>
                <h2 className="text-base sm:text-lg font-serif text-[#f5f0e8] tracking-wide">
                  Ember & Stone VIP Guest Pass
                </h2>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 text-[#f5f0e8]/50 hover:text-[#f5f0e8] hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Status Alert */}
            <div className={`p-4 rounded-sm border flex items-center justify-between transition-colors ${
              isSeated
                ? 'bg-[#0f2415] border-[#22c55e]/50 text-[#86efac]'
                : 'bg-[#1a1208] border-[#c9973e]/40 text-[#c9973e]'
            }`}>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${isSeated ? 'text-[#22c55e]' : 'text-[#c9973e]'}`} />
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase">
                    {isSeated ? 'Party Seated & Active Table' : 'Verified Booking • Table Reserved'}
                  </div>
                  <div className="text-[11px] text-[#f5f0e8]/70">
                    {isSeated ? 'Welcome cocktail service initiated' : 'Guest arrived at host reception'}
                  </div>
                </div>
              </div>

              <span className="font-mono text-xs font-bold px-2 py-1 bg-black/40 border border-current rounded-xs">
                {details.ref}
              </span>
            </div>

            {/* Guest & Party Hero */}
            <div className="border-b border-[#3a2816] pb-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e]/80">Primary Guest</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f5f0e8] mt-1 tracking-wide">
                {details.name}
              </h3>
            </div>

            {/* Key Reservation Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-[#18110a] border border-[#2a1c10] p-3.5 rounded-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#c9973e] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Party Size
                </span>
                <span className="text-sm font-semibold text-[#f5f0e8] block mt-1">
                  {details.party}
                </span>
              </div>

              <div className="bg-[#18110a] border border-[#2a1c10] p-3.5 rounded-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#c9973e] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Reserved Time
                </span>
                <span className="text-sm font-semibold text-[#f5f0e8] block mt-1">
                  {details.time}
                </span>
              </div>

              <div className="bg-[#18110a] border border-[#2a1c10] p-3.5 rounded-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-[#c9973e] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Date
                </span>
                <span className="text-sm font-semibold text-[#f5f0e8] block mt-1 truncate">
                  {details.date}
                </span>
              </div>
            </div>

            {/* Seating & Dietary Preferences */}
            <div className="space-y-2 bg-[#18110a] border border-[#2a1c10] p-4 rounded-xs">
              <div className="flex items-center justify-between text-xs border-b border-[#2a1c10] pb-2">
                <span className="text-[#c9973e] flex items-center gap-1.5">
                  <Armchair className="w-3.5 h-3.5" /> Seating Area:
                </span>
                <span className="text-[#f5f0e8] font-medium capitalize">
                  {details.seating.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#c9973e] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Experience / Notes:
                </span>
                <span className="text-[#f5f0e8]/80 text-right max-w-[240px] truncate">
                  {details.requests || details.diet}
                </span>
              </div>
            </div>

            {/* Host Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!isSeated ? (
                <button
                  onClick={handleMarkSeated}
                  className="flex-1 py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-xs tracking-[0.18em] uppercase rounded-sm transition-all duration-200 shadow-lg shadow-[#22c55e]/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Seat Guest at Table</span>
                </button>
              ) : (
                <div className="flex-1 py-3.5 bg-[#14261a] border border-[#22c55e]/50 text-[#86efac] font-medium text-xs tracking-[0.18em] uppercase rounded-sm flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  <span>Table In Service</span>
                </div>
              )}

              <button
                onClick={() => window.print()}
                className="px-4 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] border border-[#3a2816] text-[#f5f0e8] text-xs font-medium tracking-wider uppercase rounded-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#c9973e]" />
                <span>Print Slip</span>
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="bg-[#0b0704] border-t border-[#2a1c10] px-6 py-3 text-center">
            <p className="text-[10px] text-[#f5f0e8]/50 tracking-wider">
              Ember & Stone Concierge System • 742 W Randolph St, Chicago, IL
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
