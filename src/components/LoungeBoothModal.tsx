import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Calendar, Users, Mail, Phone, Clock, Wine, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoungeBoothModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '4 Guests (Booth)',
    seatingType: 'velvet_booth',
    date: new Date().toISOString().split('T')[0],
    time: '8:30 PM',
    notes: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = 'ES-BAR-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setConfirmationCode(code);
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c9973e', '#f5f0e8', '#8c6727'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#140e08] border border-[#c9973e]/50 rounded-xs p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#f5f0e8]/60 hover:text-[#c9973e] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-mono mb-2">
                <Sparkles className="w-3 h-3" />
                <span>HEARTH LOUNGE SEATING</span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-light text-[#f5f0e8] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Reserve a Cocktail Booth
              </h3>

              <p className="text-xs text-[#f5f0e8]/70 font-light mb-6">
                Direct table service in our low-lit velvet lounge with full cocktail & late-night bite menu.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3 py-2.5 bg-black/40 border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] text-xs rounded-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (312) 555-0199"
                      className="w-full px-3 py-2.5 bg-black/40 border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] text-xs rounded-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full px-3 py-2.5 bg-black/40 border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] text-xs rounded-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] mb-1">
                      Seating Zone
                    </label>
                    <select
                      value={formData.seatingType}
                      onChange={(e) => setFormData({ ...formData, seatingType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#0d0905] border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] text-xs rounded-xs outline-none"
                    >
                      <option value="velvet_booth">Velvet Lounge Booth (2-6 guests)</option>
                      <option value="walnut_bar">Walnut Counter Seating (1-3 guests)</option>
                      <option value="hearth_banquette">Hearth Banquette (4-8 guests)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] mb-1">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#0d0905] border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] text-xs rounded-xs outline-none"
                    >
                      <option value="5:00 PM">5:00 PM (Aperitivo)</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="8:00 PM">8:00 PM (Vinyl Session)</option>
                      <option value="9:30 PM">9:30 PM (Late Night)</option>
                      <option value="11:00 PM">11:00 PM (Nightcap)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#c9973e] mb-1">
                    Special Requests & Occasion
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g., Anniversary drinks, prefer a quiet corner, rare whiskey tasting."
                    className="w-full px-3 py-2.5 bg-black/40 border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] text-xs rounded-xs outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-[11px] tracking-[0.2em] uppercase rounded-xs transition-all shadow-xl shadow-[#c9973e]/20 cursor-pointer"
                >
                  Confirm Lounge Reservation
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#c9973e]/10 border border-[#c9973e] flex items-center justify-center mx-auto text-[#c9973e]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9973e] font-mono">
                  LOUNGE BOOTH CONFIRMED
                </span>
                <h3
                  className="text-3xl font-light text-[#f5f0e8]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  We Look Forward to Welcoming You
                </h3>
              </div>

              <div className="p-4 bg-black/50 border border-[#3a2816] rounded-xs space-y-2 text-xs text-[#f5f0e8]/80 text-left max-w-sm mx-auto">
                <div className="flex justify-between border-b border-[#3a2816] pb-1.5">
                  <span className="text-[#f5f0e8]/50">Confirmation Code:</span>
                  <span className="font-mono text-[#c9973e] font-bold">{confirmationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f5f0e8]/50">Guest:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f5f0e8]/50">Time & Zone:</span>
                  <span>{formData.time} · {formData.seatingType.replace('_', ' ')}</span>
                </div>
              </div>

              <p className="text-xs text-[#f5f0e8]/60 font-light">
                A confirmation has been recorded. Our Sommelier and Bartender team look forward to hosting you.
              </p>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#c9973e] text-[#0d0905] text-[11px] font-semibold tracking-wider uppercase rounded-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
