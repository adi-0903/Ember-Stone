import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import BrandLogo from './BrandLogo';

interface HeroProps {
  onReserveClick: () => void;
  onViewMenuClick: () => void;
}

export default function Hero({ onReserveClick, onViewMenuClick }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });

  // Scroll-linked subtle parallax for luxury depth
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center bg-[#0d0905]"
      aria-label="Hero Section"
    >
      {/* Background Video / Cinematic Atmosphere with scroll parallax */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full overflow-hidden">
        {/* High-quality cinematic food & flame video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.12]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-dish-in-a-restaurant-kitchen-41865-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-barbecue-steaks-on-a-charcoal-grill-42289-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback background image */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.65)'
          }}
        />
      </motion.div>

      {/* Atmospheric Vignette Gradients */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(13,9,5,0.7) 0%, transparent 30%, transparent 55%, rgba(13,9,5,0.98) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(13,9,5,0.92) 0%, rgba(13,9,5,0.7) 45%, rgba(13,9,5,0.2) 75%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[50vh] z-10 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 10% 90%, rgba(201,151,62,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Hero Content with Scroll Reveal */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16 pt-20">
        <motion.div
          ref={contentRef}
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="max-w-3xl"
        >
          {/* Eyebrow with reveal animation & Brand Emblem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex items-center space-x-3 mb-4"
          >
            <div className="flex items-center justify-center p-1 rounded-full bg-black/60 border border-[#c9973e]/40 shadow-md shadow-black">
              <BrandLogo size={22} variant="crimson" showGlow={true} idPrefix="hero-eyebrow-logo" />
            </div>
            <motion.span
              initial={{ width: 0 }}
              animate={isContentInView ? { width: 32 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="inline-block h-[1px] bg-[#c9973e]"
            />
            <span className="text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#c9973e] font-medium">
              {RESTAURANT_INFO.est}
            </span>
            <span className="inline-flex items-center text-[10px] tracking-[0.15em] uppercase text-[#f5f0e8]/50 pl-2">
              <Sparkles className="w-3 h-3 text-[#c9973e] mr-1.5 inline" /> Michelin Guide Selected
            </span>
          </motion.div>

          {/* Main H1 Title - Masked Luxury Rise Reveal on Scroll */}
          <div className="overflow-hidden pb-2 mb-6">
            <motion.h1
              initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
              animate={isContentInView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : { y: "110%", opacity: 0, filter: "blur(6px)" }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[106px] leading-[0.94] font-light text-[#f5f0e8] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Where Fire <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="italic text-[#c9973e] font-normal pr-2 inline-block"
              >
                Meets Finesse
              </motion.span>
            </motion.h1>
          </div>

          {/* Subline with smooth reveal */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#f5f0e8]/80 max-w-xl font-light leading-relaxed mb-10 tracking-wide"
          >
            {RESTAURANT_INFO.subline}
          </motion.p>

          {/* CTA Buttons - Staggered Luxury Elevation Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
          >
            <motion.button
              id="hero-reserve-cta"
              onClick={onReserveClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden px-8 py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-medium text-[12px] tracking-[0.2em] uppercase rounded-xs transition-all duration-300 shadow-xl shadow-[#c9973e]/20 hover:shadow-[#c9973e]/40 cursor-pointer text-center"
            >
              {/* Subtle luxury light sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10">Reserve Your Table</span>
            </motion.button>

            <motion.button
              id="hero-menu-cta"
              onClick={onViewMenuClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden px-8 py-4 border border-[#f5f0e8]/30 hover:border-[#c9973e] text-[#f5f0e8] hover:text-[#c9973e] bg-black/25 backdrop-blur-md font-medium text-[12px] tracking-[0.2em] uppercase rounded-xs transition-all duration-300 cursor-pointer text-center"
            >
              <span className="relative z-10">View the Menu</span>
            </motion.button>
          </motion.div>

          {/* Quick highlights bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 pt-8 border-t border-[#3a2816]/70 grid grid-cols-3 gap-4 max-w-lg text-[#f5f0e8]/70"
          >
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#c9973e]">Dry-Aging</div>
              <div className="text-sm font-serif text-[#f5f0e8]">40-Day Salt Chamber</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#c9973e]">Fuel</div>
              <div className="text-sm font-serif text-[#f5f0e8]">White Oak & Cherry</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#c9973e]">Cellar</div>
              <div className="text-sm font-serif text-[#f5f0e8]">450+ Curated Bottles</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        onClick={onViewMenuClick}
      >
        <span className="text-[9.5px] tracking-[0.3em] uppercase text-[#f5f0e8]/50 group-hover:text-[#c9973e] transition-colors mb-1.5 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#c9973e]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
