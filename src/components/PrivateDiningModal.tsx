import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Calendar, Users, Mail, Phone, Clock, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivateDiningModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '12',
    date: '',
    eventType: 'corporate',
    notes: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c9973e', '#f5f0e8', '#8c6727']
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '12',
      date: '',
      eventType: 'corporate',
      notes: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-[#120c07] border border-[#c9973e]/50 rounded-sm p-6 sm:p-10 z-10 shadow-2xl shadow-black/80"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#f5f0e8]/50 hover:text-[#c9973e] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full border border-[#c9973e] flex items-center justify-center bg-[#c9973e]/10">
                  <CheckCircle className="w-8 h-8 text-[#c9973e]" />
                </div>
                <h3
                  className="text-3xl font-light text-[#f5f0e8]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#f5f0e8]/75 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#c9973e]">{formData.name || 'valued guest'}</span>. Our private event sommelier and events coordinator will review your request and contact you within 24 hours to craft your tailored evening.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#c9973e] text-[#0d0905] uppercase tracking-[0.18em] text-[11px] font-medium rounded-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-semibold block mb-1">
                    BESPOKE OCCASIONS
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-light text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Private Dining Inquiry
                  </h3>
                  <p className="text-xs text-[#f5f0e8]/65 mt-1 font-light">
                    For groups of 8 to 22 guests. Custom tasting menus, wine pairings & AV setups.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g., Victoria Sterling"
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Optional"
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (312) 000-0000"
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Estimated Date *
                      </label>
                      <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Guest Count *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      >
                        <option value="8">8 Guests</option>
                        <option value="10">10 Guests</option>
                        <option value="12">12 Guests</option>
                        <option value="16">16 Guests</option>
                        <option value="20">20 Guests</option>
                        <option value="22">22 Guests (Full Room)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                        Occasion Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors"
                      >
                        <option value="corporate">Executive Dinner</option>
                        <option value="celebration">Anniversary / Birthday</option>
                        <option value="rehearsal">Intimate Reception</option>
                        <option value="wine_tasting">Sommelier Tasting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-[#c9973e] mb-1 font-medium">
                      Special Dietary or A/V Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific wine preferences, presentation screen requirements, or allergies..."
                      className="w-full bg-[#1a120b] border-b border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2 outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-md shadow-[#c9973e]/20"
                    >
                      Submit Private Dining Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
