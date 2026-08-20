import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2400&q=90',
    title: 'Wood-Fired A5 Wagyu & Dry-Aged Cuts',
    tag: 'CULINARY ARTISTRY',
  },
  {
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=2400&q=90',
    title: 'Smoked Alchemy & Barrel-Aged Spirits',
    tag: 'BEVERAGE CRAFT',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=90',
    title: 'Handmade Black Truffle Tagliolini',
    tag: 'AUTHENTIC GASTRONOMY',
  },
  {
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=2400&q=90',
    title: 'Charred Agave & Botanical Infusions',
    tag: 'SIGNATURE COCKTAILS',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=90',
    title: 'Intimate Dining by the Open Hearth',
    tag: 'ATMOSPHERE & AMBIENCE',
  },
];

const TOTAL_DURATION_MS = 5000;
const SLIDE_INTERVAL_MS = 1200;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload high-res background images immediately
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Background image crossfade interval
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(slideTimer);
  }, []);

  // 5-second progress ticker and completion handler
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(pct);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        setIsFinished(true);
        setTimeout(onComplete, 700);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(onComplete, 200);
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050403] flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Full Screen Background Image Slideshow with Smooth Crossfade & Slow Pan */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={currentSlide.image}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Gradient Overlays for High Legibility & Warm Dining Atmosphere */}
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/40 to-[#070503]/80" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#070503]/40 to-[#070503]/90" />
          </div>

          {/* Top Brand Header */}
          <header className="relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#c9973e]/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#c9973e] shadow-lg shadow-black/50">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9973e] font-semibold block drop-shadow">
                  CHICAGO • RANDOLPH ST
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/75 font-light">
                  FINE DINING & HEARTH
                </span>
              </div>
            </div>

            {/* Skip / Direct Enter button */}
            <button
              id="skip-splash-button"
              onClick={handleSkip}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9973e]/40 bg-black/60 backdrop-blur-md text-[#f5f0e8] hover:text-[#c9973e] hover:border-[#c9973e] transition-all text-xs tracking-widest uppercase cursor-pointer shadow-lg shadow-black/50"
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </header>

          {/* Central Elegant Typography */}
          <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9973e]/40 bg-black/60 backdrop-blur-md text-[#c9973e] text-xs tracking-[0.25em] uppercase font-medium mb-5 shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-[#c9973e]" />
                Wood-Fired Hearth & Alchemy Bar
              </div>

              {/* Main Restaurant Brand Title */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#f5f0e8] tracking-[0.2em] pl-[0.2em] drop-shadow-2xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                EMBER & STONE
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-lg font-serif italic text-[#c9973e] tracking-[0.2em] drop-shadow">
                Where Fire Meets Finesse
              </p>

              {/* Dynamic Tagline changing with the food/cocktail background */}
              <div className="mt-8 h-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 px-3.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10"
                  >
                    <span className="text-[10px] tracking-widest uppercase text-[#c9973e] font-semibold">
                      {currentSlide.tag}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs sm:text-sm text-[#f5f0e8]/90 font-light tracking-wide">
                      {currentSlide.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </main>

          {/* Bottom Progress & Slide Indicators (5-second duration) */}
          <footer className="relative z-20 w-full px-6 sm:px-12 py-8 flex flex-col items-center">
            {/* Slide pill dots */}
            <div className="flex items-center gap-2 mb-4">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-[#c9973e]'
                      : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* 5-Second Gold Linear Progress Bar */}
            <div className="w-full max-w-md h-[2px] bg-white/15 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#8a5d1e] via-[#c9973e] to-[#f3d489]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time / Status */}
            <div className="w-full max-w-md mt-2 flex items-center justify-between text-[11px] text-[#f5f0e8]/60 tracking-widest uppercase">
              <span className="font-light">Opening Dining Room...</span>
              <span className="font-mono text-[#c9973e]">
                {((TOTAL_DURATION_MS - (progress / 100) * TOTAL_DURATION_MS) / 1000).toFixed(1)}s
              </span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
