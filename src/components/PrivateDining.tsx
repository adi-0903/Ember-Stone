import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Wine, Tv, Sparkles, ArrowRight } from 'lucide-react';
import GoldUnderlineHeading from './GoldUnderlineHeading';
import PrivateDiningModal from './PrivateDiningModal';

export default function PrivateDining() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const amenities = [
    { icon: Users, label: 'Capacity: 8–22 Guests' },
    { icon: Wine, label: 'Dedicated Master Sommelier' },
    { icon: Sparkles, label: 'Custom Menus from $95pp' },
    { icon: Tv, label: 'Full 4K A/V & Acoustic Isolation' },
  ];

  return (
    <>
      <section
        id="private-dining"
        ref={sectionRef}
        className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 overflow-hidden bg-[#0d0905]"
      >
        {/* Background Image: Candlelit upscale dining room */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Private dining room with candlelit long dark wood table, crystal glassware, warm amber ambiance"
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.1]"
            loading="lazy"
          />
          {/* Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(13,9,5,0.95) 0%, rgba(13,9,5,0.85) 45%, rgba(13,9,5,0.7) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 20%, rgba(13,9,5,0.8) 100%)',
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <GoldUnderlineHeading
              subtitle="EXCLUSIVE CELLAR ROOM"
              alignment="center"
              className="mb-6"
            >
              An Evening All Your Own
            </GoldUnderlineHeading>

            <h3
              className="text-xl sm:text-2xl text-[#c9973e] italic font-light mb-6 tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Private Dining at Ember & Stone
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-[#f5f0e8]/85 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Our private dining sanctuary accommodates up to 22 seated guests, featuring a private hearth, dedicated sommelier, bespoke multi-course menu development, and a service team committed to making your occasion effortless and extraordinary.
            </p>

            {/* Amenity Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-12">
              {amenities.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={amenity.label}
                    className="p-3 sm:p-4 bg-[#0d0905]/80 backdrop-blur-md border border-[#3a2816] rounded-sm flex flex-col items-center justify-center space-y-2 text-center"
                  >
                    <Icon className="w-4 h-4 text-[#c9973e]" />
                    <span className="text-[10px] sm:text-[11px] tracking-[0.1em] text-[#f5f0e8]/80 font-normal">
                      {amenity.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                id="private-dining-cta"
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-medium text-[12px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-xl shadow-[#c9973e]/25 hover:shadow-[#c9973e]/40 hover:-translate-y-0.5 cursor-pointer flex items-center space-x-3"
              >
                <span>Inquire About Private Dining</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Private Dining Inquiry Modal */}
      <PrivateDiningModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
