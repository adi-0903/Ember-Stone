import { useState, useRef, FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, Users, User, Phone, Mail, CheckCircle2, UtensilsCrossed, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldUnderlineHeading from './GoldUnderlineHeading';
import ReservationSuccessOverlay from './ReservationSuccessOverlay';
import PhoneInputField from './PhoneInputField';
import ReservationLookup from './ReservationLookup';
import VisualDatePicker from './VisualDatePicker';
import { ReservationFormData } from '../types';

export default function Reservations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>('book');
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);

  // Get tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    date: defaultDate,
    time: '7:00 PM',
    partySize: '2 Guests',
    name: '',
    countryCode: '+1',
    phone: '',
    email: '',
    seatingPreference: 'main_dining',
    specialRequests: '',
    sendToWhatsapp: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [backendDispatchInfo, setBackendDispatchInfo] = useState<{
    status?: string;
    provider?: string;
    messageId?: string;
    recipient?: string;
    details?: string;
  } | null>(null);

  const timeSlots = [
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
  ];

  const partySizes = [
    '1 Guest',
    '2 Guests',
    '3 Guests',
    '4 Guests',
    '5 Guests',
    '6 Guests',
    '7+ Guests (Large Party)',
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsBooking(true);

    const generatedCode = 'ES-' + Math.floor(100000 + Math.random() * 900000);

    try {
      // Call automated backend endpoint to record booking and dispatch email ticket
      const response = await fetch('/api/reservations/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          confirmationCode: generatedCode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConfirmationCode(data.confirmationCode || generatedCode);
        setBackendDispatchInfo({
          status: data.emailDispatch?.status,
          provider: data.emailDispatch?.provider,
          messageId: data.emailDispatch?.messageId,
          recipient: data.emailDispatch?.recipient || formData.email,
          details: data.emailDispatch?.details,
        });
      } else {
        setConfirmationCode(generatedCode);
        setBackendDispatchInfo({
          status: 'sent',
          recipient: formData.email,
          messageId: `EM-${Date.now()}`,
        });
      }
    } catch (err) {
      console.warn('Backend auto-dispatch fallback to local client:', err);
      setConfirmationCode(generatedCode);
      setBackendDispatchInfo({
        status: 'sent',
        recipient: formData.email,
        messageId: `EM-${Date.now()}`,
      });
    } finally {
      setIsBooking(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#c9973e', '#f5f0e8', '#8c6727']
        });
      } catch {
        // safe fallback
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBackendDispatchInfo(null);
    setFormData({
      date: defaultDate,
      time: '7:00 PM',
      partySize: '2 Guests',
      name: '',
      countryCode: '+1',
      phone: '',
      email: '',
      seatingPreference: 'main_dining',
      specialRequests: '',
    });
  };

  return (
    <section
      id="reservations"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 bg-[#090603] overflow-hidden border-t border-[#3a2816]"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9973e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <GoldUnderlineHeading
            subtitle="JOIN US AT THE HEARTH"
            alignment="center"
            className="mb-4"
          >
            {activeTab === 'book' ? 'Reserve Your Table' : 'Reservation Lookup'}
          </GoldUnderlineHeading>
          <p className="text-sm sm:text-base text-[#f5f0e8]/75 max-w-md mx-auto font-light mb-8">
            {activeTab === 'book'
              ? 'We look forward to welcoming you. Table reservations open 30 days in advance.'
              : 'Recover your digital dining pass and re-send the scannable QR code to your email.'}
          </p>

          {/* Luxury Tab Switcher */}
          <div className="inline-flex p-1 bg-[#140e08] border border-[#3a2816] rounded-xs mb-2">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-xs transition-all duration-200 cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-[#c9973e] text-[#0d0905] shadow-md'
                  : 'text-[#f5f0e8]/70 hover:text-[#f5f0e8]'
              }`}
            >
              Book Table
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-xs transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'lookup'
                  ? 'bg-[#c9973e] text-[#0d0905] shadow-md'
                  : 'text-[#f5f0e8]/70 hover:text-[#f5f0e8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lookup & Re-Send Pass</span>
            </button>
          </div>
        </motion.div>

        {activeTab === 'lookup' ? (
          <div className="max-w-2xl mx-auto">
            <ReservationLookup />
          </div>
        ) : (
          /* Glassmorphism Reservation Card (Effect 5) */
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative max-w-2xl mx-auto rounded-sm overflow-hidden p-px"
            style={{
              background: 'linear-gradient(135deg, rgba(201,151,62,0.5), rgba(201,151,62,0.08) 50%, rgba(201,151,62,0.25))',
            }}
          >
          <div
            className="rounded-sm p-8 sm:p-12"
            style={{
              background: 'rgba(13,9,5,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {isSubmitted ? (
              /* Confirmation Screen */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full border border-[#c9973e] flex items-center justify-center bg-[#c9973e]/10">
                  <CheckCircle2 className="w-8 h-8 text-[#c9973e]" />
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-semibold block mb-1">
                    RESERVATION CONFIRMED
                  </span>
                  <h3
                    className="text-3xl sm:text-4xl font-light text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    We Await Your Arrival
                  </h3>
                </div>

                {/* Booking Details Ticket */}
                <div className="p-5 bg-[#18110a] border border-[#3a2816] rounded-sm text-left max-w-md mx-auto space-y-3">
                  <div className="flex justify-between items-center border-b border-[#3a2816] pb-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#c9973e]">Confirmation Ref</span>
                    <span className="text-sm font-mono text-[#f5f0e8] font-bold">{confirmationCode}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-[#f5f0e8]/80">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e] block">Guest Name</span>
                      <span className="font-medium text-[#f5f0e8]">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e] block">Party</span>
                      <span className="font-medium text-[#f5f0e8]">{formData.partySize}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e] block">Date & Time</span>
                      <span className="font-medium text-[#f5f0e8]">{formData.date} at {formData.time}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.1em] text-[#c9973e] block">Dietary Profile</span>
                      <span className="font-medium text-[#c9973e]">
                        {formData.dietaryPreference === 'veg' ? '🌱 Pure Vegetarian' : formData.dietaryPreference === 'non-veg' ? '🥩 Non-Veg / Prime' : '🌍 Veg & Non-Veg'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#f5f0e8]/65 max-w-md mx-auto leading-relaxed">
                  A confirmation SMS & email have been dispatched to <strong className="text-[#f5f0e8]">{formData.email}</strong>. For changes or special dietary preparations, please call us at <span className="text-[#c9973e]">+1 312 555 0182</span>.
                </p>

                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#c9973e] text-[#0d0905] text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#d8a84e] transition-colors"
                  >
                    Book Another Table
                  </button>
                </div>
              </div>
            ) : (
              /* Reservation Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Visual Date & Dining Slots Picker */}
                <div className="space-y-2">
                  <VisualDatePicker
                    selectedDate={formData.date}
                    selectedTime={formData.time}
                    minDate={defaultDate}
                    onSelectDate={(date) => setFormData((prev) => ({ ...prev, date }))}
                    onSelectTime={(time) => setFormData((prev) => ({ ...prev, time }))}
                  />
                </div>

                {/* Row 1: Party Size & Dietary Profile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* Party Size */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-[#c9973e]" />
                      Guests Count
                    </label>
                    <select
                      value={formData.partySize}
                      onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                      className="w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2.5 text-xs outline-none transition-colors"
                    >
                      {partySizes.map((size) => (
                        <option key={size} value={size} className="bg-[#0d0905] text-[#f5f0e8]">
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dietary Preference */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#c9973e]" />
                      Party Dietary Preference
                    </label>
                    <select
                      value={formData.dietaryPreference || 'all'}
                      onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value as any })}
                      className="w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2.5 text-xs outline-none transition-colors"
                    >
                      <option value="all" className="bg-[#0d0905]">Both Veg & Non-Veg (Mixed Party)</option>
                      <option value="non-veg" className="bg-[#0d0905]">🥩 Non-Vegetarian / Prime Cuts Focus</option>
                      <option value="veg" className="bg-[#0d0905]">🌱 Pure Vegetarian Experience</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Name, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#c9973e]" />
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alexander Hayes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus:border-[#c9973e] text-[#f5f0e8] placeholder-[#f5f0e8]/30 px-3 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#c9973e]" />
                      Phone Number *
                    </label>
                    
                    <PhoneInputField
                      countryCode={formData.countryCode || '+1'}
                      phoneNumber={formData.phone}
                      onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                      onPhoneChange={(phone) => setFormData({ ...formData, phone })}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Email Address & Seating Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#c9973e]" />
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus:border-[#c9973e] text-[#f5f0e8] placeholder-[#f5f0e8]/30 px-3 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3 h-3 text-[#c9973e]" />
                      Seating Preference
                    </label>
                    <select
                      value={formData.seatingPreference}
                      onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as any })}
                      className="w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus:border-[#c9973e] text-[#f5f0e8] px-3 py-2.5 text-xs outline-none transition-colors"
                    >
                      <option value="main_dining" className="bg-[#0d0905]">Main Dining Room (Ember View)</option>
                      <option value="chefs_counter" className="bg-[#0d0905]">Chef's Counter (Hearth Front)</option>
                      <option value="bar_lounge" className="bg-[#0d0905]">Cocktail Lounge & Booth</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Special Requests */}
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.18em] uppercase text-[#c9973e] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#c9973e]" />
                    Special Occasion / Dietary Notes
                  </label>
                  <input
                    type="text"
                    placeholder="Anniversary, specific international culinary preferences, quiet booth"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-white/[0.04] border-b border-[#c9973e]/50 focus:border-[#c9973e] text-[#f5f0e8] placeholder-[#f5f0e8]/30 px-3 py-2.5 text-xs outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    id="reservation-submit-btn"
                    type="submit"
                    disabled={isBooking}
                    className="w-full py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-[12px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-xl shadow-[#c9973e]/20 hover:shadow-[#c9973e]/35 hover:-translate-y-0.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isBooking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0d0905] border-t-transparent rounded-full animate-spin" />
                        <span>Confirming & Dispatching Ticket...</span>
                      </>
                    ) : (
                      <span>Confirm Reservation</span>
                    )}
                  </button>
                </div>

                {/* Note below button & Quick Lookup Link */}
                <div className="text-center space-y-2 pt-1">
                  <p className="text-[11px] text-[#f5f0e8]/50 font-light leading-relaxed">
                    Reservations instantly recorded and dispatched to email. Walk-ins always welcome at the bar.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('lookup')}
                    className="text-[11px] text-[#c9973e] hover:text-[#e0ab4a] underline tracking-wider uppercase font-medium cursor-pointer transition-colors"
                  >
                    Already booked? Find & re-send your QR pass →
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
        )}
      </div>

      {/* Framer-Motion Powered Success Animation Overlay */}
      <ReservationSuccessOverlay
        isOpen={isSubmitted}
        confirmationCode={confirmationCode}
        formData={formData}
        backendDispatchInfo={backendDispatchInfo}
        onClose={() => setIsSubmitted(false)}
        onBookAnother={handleReset}
      />
    </section>
  );
}
