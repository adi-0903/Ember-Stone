import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ArrowRight, Sparkles, Wine, UtensilsCrossed } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

interface PreloaderSlide {
  image: string;
  chapter: string;
  tag: string;
  title: string;
  subtitle: string;
  kenBurns: {
    initial: { scale: number; x: number; y: number };
    animate: { scale: number; x: number; y: number };
  };
}

const CURATED_SLIDES: PreloaderSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=2600&q=95',
    chapter: '01 / PROVENANCE',
    tag: 'RAW TERROIR & HARVEST',
    title: 'Dry-Aged Wagyu, Fresh Rosemary & Flaked Sea Salt',
    subtitle: 'Hand-selected cuts and farm-fresh botanicals prepared for the fire.',
    kenBurns: {
      initial: { scale: 1.05, x: -10, y: 10 },
      animate: { scale: 1.16, x: 10, y: -10 },
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2600&q=95',
    chapter: '02 / ELEMENT',
    tag: 'THE SACRED HEARTH',
    title: 'Roaring Red Oak Coals, Live Iron Grates & 800° Smoke',
    subtitle: 'Ancient open-flame alchemy unlocking deep caramelization and wood aroma.',
    kenBurns: {
      initial: { scale: 1.18, x: 15, y: -10 },
      animate: { scale: 1.06, x: -10, y: 10 },
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2600&q=95',
    chapter: '03 / VINTAGE',
    tag: 'FINE WINE & CELLAR',
    title: 'Grand Cru Decanting, Sommelier Pours & Old-World Vines',
    subtitle: 'Cellar-aged vintage Burgundy and Napa Cabernet flowing into crystal stemware.',
    kenBurns: {
      initial: { scale: 1.06, x: 0, y: 15 },
      animate: { scale: 1.17, x: 0, y: -15 },
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=2600&q=95',
    chapter: '04 / BOTANICALS',
    tag: 'ARTISANAL ESSENCE',
    title: 'Crushed Peppercorns, Smoked Spices & Rare Botanicals',
    subtitle: 'Cold-pressed aromatics and infused mountain herbs crafted with culinary precision.',
    kenBurns: {
      initial: { scale: 1.16, x: -12, y: -8 },
      animate: { scale: 1.05, x: 12, y: 8 },
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=2600&q=95',
    chapter: '05 / RECEPTION',
    tag: 'THE OPEN SALOON',
    title: 'Where Primal Fire Meets Modern High-End Finesse',
    subtitle: 'Welcome to an evening of wood-fired gastronomy, cocktails, and vinyl warmth.',
    kenBurns: {
      initial: { scale: 1.04, x: 5, y: 12 },
      animate: { scale: 1.15, x: -5, y: -12 },
    },
  },
];

const TOTAL_DURATION_MS = 5500;
const SLIDE_INTERVAL_MS = 1100;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload high-res background images immediately to prevent flashing
  useEffect(() => {
    CURATED_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Background image crossfade interval
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % CURATED_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(slideTimer);
  }, []);

  // Progress ticker and smooth completion sequence
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(pct);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        setIsFinished(true);
        setTimeout(onComplete, 750);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(onComplete, 200);
  };

  const currentSlide = CURATED_SLIDES[currentSlideIndex];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(12px)' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050403] flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Full-Screen Ken-Burns Image Canvas */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={currentSlide.image}
                initial={{
                  opacity: 0,
                  scale: currentSlide.kenBurns.initial.scale,
                  x: currentSlide.kenBurns.initial.x,
                  y: currentSlide.kenBurns.initial.y,
                }}
                animate={{
                  opacity: 1,
                  scale: currentSlide.kenBurns.animate.scale,
                  x: currentSlide.kenBurns.animate.x,
                  y: currentSlide.kenBurns.animate.y,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.0, ease: 'easeInOut' },
                  scale: { duration: 3.8, ease: [0.25, 0.1, 0.25, 1] },
                  x: { duration: 3.8, ease: [0.25, 0.1, 0.25, 1] },
                  y: { duration: 3.8, ease: [0.25, 0.1, 0.25, 1] },
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-[1.08]"
                />
              </motion.div>
            </AnimatePresence>

            {/* High-End Editorial Gradients & Atmospheric Vignette */}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060402] via-[#060402]/50 to-[#060402]/85" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#060402]/40 to-[#060402]/95" />

            {/* Subtle Film Grain Noise Overlay */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Floating Warm Golden Ember Sparks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 80,
                    x: `${15 + i * 14}%`,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    y: [-20, -180],
                    x: [`${15 + i * 14}%`, `${17 + i * 14 + (i % 2 ? 3 : -3)}%`],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: 'easeOut',
                  }}
                  className="absolute bottom-16 w-1 h-1 rounded-full bg-[#f3d489] shadow-[0_0_8px_#c9973e]"
                />
              ))}
            </div>
          </div>

          {/* Top Brand Header */}
          <header className="relative z-20 w-full px-6 sm:px-12 py-7 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full border border-[#c9973e]/50 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#c9973e] shadow-xl shadow-black/60 ring-1 ring-[#c9973e]/20">
                <Flame className="w-4.5 h-4.5 animate-pulse text-[#d4a044]" />
              </div>
              <div>
                <span className="text-[10.5px] tracking-[0.35em] uppercase text-[#c9973e] font-semibold block drop-shadow">
                  CHICAGO • WEST LOOP
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#f5f0e8]/75 font-light">
                  WOOD-FIRED HEARTH & CELLAR
                </span>
              </div>
            </div>

            {/* Skip / Direct Enter button */}
            <button
              id="skip-splash-button"
              onClick={handleSkip}
              className="group flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#c9973e]/40 bg-black/60 backdrop-blur-md text-[#f5f0e8] hover:text-[#d4a044] hover:border-[#d4a044] hover:bg-[#c9973e]/10 transition-all text-xs tracking-widest uppercase cursor-pointer shadow-lg shadow-black/50"
            >
              <span className="font-sans text-[11px] tracking-[0.25em]">ENTER DINING ROOM</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#c9973e]" />
            </button>
          </header>

          {/* Central Editorial Narrative & Brand Title */}
          <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Editorial Pill Marker */}
              <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-[#c9973e]/40 bg-black/65 backdrop-blur-md text-[#c9973e] text-xs tracking-[0.28em] uppercase font-medium mb-5 shadow-2xl">
                <Sparkles className="w-3.5 h-3.5 text-[#d4a044]" />
                <span>Wood-Fired Hearth • Alchemy Bar • Cellar Reserve</span>
              </div>

              {/* Main Restaurant Title */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#f5f0e8] tracking-[0.22em] pl-[0.22em] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                EMBER & STONE
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-xl font-serif italic text-[#d4a044] tracking-[0.25em] drop-shadow-md">
                Where Fire Meets Finesse
              </p>

              {/* Dynamic Editorial Slide Caption */}
              <div className="mt-8 min-h-[56px] flex items-center justify-center w-full max-w-2xl px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.chapter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45 }}
                    className="flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-sm bg-black/60 backdrop-blur-md border border-[#c9973e]/25 shadow-2xl"
                  >
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#d4a044] font-semibold">
                      <span>{currentSlide.chapter}</span>
                      <span className="text-white/30">•</span>
                      <span>{currentSlide.tag}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-[#f5f0e8]/95 font-light tracking-wide font-sans">
                      {currentSlide.title}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </main>

          {/* Bottom Progress & Editorial Slide Sequence */}
          <footer className="relative z-20 w-full px-6 sm:px-12 py-8 flex flex-col items-center">
            {/* Visual Slide Indicators */}
            <div className="flex items-center gap-2.5 mb-4.5">
              {CURATED_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-10 bg-gradient-to-r from-[#c9973e] to-[#f3d489] shadow-[0_0_10px_#c9973e]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${idx + 1}: ${slide.tag}`}
                />
              ))}
            </div>

            {/* 5.5-Second Gold Linear Progress Bar */}
            <div className="w-full max-w-lg h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#8a5d1e] via-[#c9973e] to-[#f3d489] shadow-[0_0_12px_#c9973e]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time / Status / Vignette labels */}
            <div className="w-full max-w-lg mt-3 flex items-center justify-between text-[11px] text-[#f5f0e8]/65 tracking-widest uppercase">
              <span className="font-light flex items-center gap-2">
                <UtensilsCrossed className="w-3 h-3 text-[#c9973e]" />
                <span>Preparing the Hearth...</span>
              </span>
              <span className="font-mono text-[#d4a044] font-medium">
                {Math.max(0, (TOTAL_DURATION_MS - (progress / 100) * TOTAL_DURATION_MS) / 1000).toFixed(1)}s
              </span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
