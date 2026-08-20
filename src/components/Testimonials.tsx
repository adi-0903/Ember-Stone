import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, Quote as QuoteIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';
import GoldUnderlineHeading from './GoldUnderlineHeading';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 sm:py-32 px-6 sm:px-12 bg-[#0a0704] border-t border-[#3a2816] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
        <QuoteIcon className="w-96 h-96 text-[#c9973e] -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <GoldUnderlineHeading
            subtitle="CRITICAL ACCLAIM & GUEST VOICES"
            alignment="center"
            className="mb-14"
          >
            What Our Guests Say
          </GoldUnderlineHeading>

          {/* Slider Container */}
          <div className="min-h-[220px] sm:min-h-[190px] flex items-center justify-center relative px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* 5-Star Rating Indicator */}
                <div className="flex justify-center items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c9973e] text-[#c9973e]" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote
                  className="text-2xl sm:text-3xl md:text-[32px] leading-relaxed font-light italic text-[#f5f0e8]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  “{current.quote}”
                </blockquote>

                {/* Attribution */}
                <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#c9973e]">
                  {current.author} — <span className="text-[#f5f0e8]/60 normal-case italic font-serif text-sm tracking-normal">{current.source}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left & Right arrow controls */}
            <button
              onClick={handlePrev}
              className="absolute left-0 p-2 text-[#f5f0e8]/40 hover:text-[#c9973e] transition-colors"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 p-2 text-[#f5f0e8]/40 hover:text-[#c9973e] transition-colors"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center items-center space-x-3 mt-10">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-1.5 bg-[#c9973e]'
                    : 'w-2 h-2 bg-[#3a2816] hover:bg-[#c9973e]/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
