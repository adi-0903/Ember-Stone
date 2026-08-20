import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Flame } from 'lucide-react';
import { CHEF_INFO } from '../data/restaurantData';

const CHEF_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
    alt: 'Executive Chef Marcus DeLeon in chef coat in warm amber hearth kitchen',
  },
  {
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Chef working over live blazing wood-fired hearth grill',
  },
  {
    url: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Master chef with plating tweezers finishing a luxury dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
    alt: 'Hearth kitchen and master chef in culinary theater',
  },
];

export default function ChefFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth automatic crossfade every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CHEF_PHOTOS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="chef"
      ref={containerRef}
      className="relative min-h-[600px] h-[85vh] max-h-[880px] w-full overflow-hidden border-t border-b border-[#3a2816] bg-[#0d0905]"
    >
      {/* Background Multi-Image Smooth Crossfade */}
      <div className="absolute inset-0 w-full h-full bg-[#100a06]">
        {CHEF_PHOTOS.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.div
              key={photo.url}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.03 : 1,
              }}
              transition={{
                opacity: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 6, ease: 'linear' },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== photo.fallbackUrl) {
                    target.src = photo.fallbackUrl;
                  }
                }}
                className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.08]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Atmospheric Multi-layer Gradients */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(13,9,5,0.96) 0%, rgba(13,9,5,0.85) 38%, rgba(13,9,5,0.45) 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(13,9,5,0.96) 0%, rgba(13,9,5,0.45) 45%, transparent 100%)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-8 sm:px-12 md:px-16 flex flex-col justify-end pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#c9973e] font-medium mb-3">
            <Flame className="w-3.5 h-3.5 text-[#c9973e]" />
            <span>{CHEF_INFO.label}</span>
          </div>

          {/* Chef Name */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-light text-[#f5f0e8] tracking-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {CHEF_INFO.name}
          </h2>

          {/* Quote */}
          <p
            className="text-xl sm:text-2xl italic text-[#c9973e] font-serif mb-5 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {CHEF_INFO.quote}
          </p>

          {/* Bio */}
          <p className="text-sm sm:text-base text-[#f5f0e8]/80 font-light leading-relaxed mb-8">
            {CHEF_INFO.bio}
          </p>

          {/* Accolades */}
          <div className="flex flex-wrap gap-2.5">
            {CHEF_INFO.accolades.map((accolade) => (
              <div
                key={accolade}
                className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#0d0905]/80 backdrop-blur-md border border-[#3a2816] text-[10px] sm:text-[11px] tracking-[0.1em] text-[#f5f0e8]/85 uppercase rounded-xs"
              >
                <Award className="w-3 h-3 text-[#c9973e]" />
                <span>{accolade}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
