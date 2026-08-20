import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Flame, Compass, Sparkles, UtensilsCrossed } from 'lucide-react';
import GoldUnderlineHeading from './GoldUnderlineHeading';

interface PhilosophyFoodPhoto {
  url: string;
  fallbackUrl: string;
  category: 'veg' | 'non-veg';
  title: string;
  tag: string;
  description: string;
  alt: string;
}

const FALLBACK_MAIN = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80';

const PHILOSOPHY_FOOD_PHOTOS: PhilosophyFoodPhoto[] = [
  // 1. Non-Veg: Sizzling Herb-Basted Ribeye Steak
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=80',
    category: 'non-veg',
    title: 'Herb-Basted Prime Ribeye',
    tag: '🥩 Sizzling Wood-Fire Grill',
    description: 'Caramelized garlic butter glaze, roasted asparagus & rosemary smoke',
    alt: 'Gourmet cooked prime ribeye steak sizzling with garlic herb butter',
  },
  // 2. Veg: Truffle & Wild Mushroom Risotto / Pasta
  {
    url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=80',
    category: 'veg',
    title: 'Truffle & Wild Morel Risotto',
    tag: '🌱 Handcrafted Italian Craft',
    description: 'Creamy black truffle reduction, charred morels & 36-month Parmigiano',
    alt: 'Hot gourmet cooked wild mushroom risotto with freshly shaved truffles and cheese',
  },
  // 3. Non-Veg: Pan-Seared Crisp Skinned Hearth Salmon
  {
    url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
    category: 'non-veg',
    title: 'Crisp-Skinned Hearth Salmon',
    tag: '🥩 Ocean & Ember Searing',
    description: 'Charred Meyer lemon, butter-poached spears & champagne dill velouté',
    alt: 'Freshly cooked pan-seared salmon fillet with crispy golden skin and roasted greens',
  },
  // 4. Veg: Wood-Fired Neapolitan Buffalo Pizza
  {
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80',
    category: 'veg',
    title: 'Wood-Fired Buffalo Mozzarella',
    tag: '🌱 Neapolitan Hearth Craft',
    description: 'San Marzano tomato sugo, molten fresh mozzarella & blistered sweet basil',
    alt: 'Hot wood-fired pizza fresh out of the oven with melting mozzarella and fragrant basil',
  },
  // 5. Veg: Charred Saffron Vegetable Medley & Heritage Grains
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80',
    category: 'veg',
    title: 'Saffron-Smoked Hearth Harvest',
    tag: '🌱 Heritage Vegetarian Reverence',
    description: 'Charred baby carrots, roasted shallots, goat curd & pomegranate reduction',
    alt: 'Vibrant gourmet roasted cooked vegetarian dish with saffron glaze and micro herbs',
  },
];

export default function Philosophy() {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: '-80px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth automatic crossfade every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHILOSOPHY_FOOD_PHOTOS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentPhoto = PHILOSOPHY_FOOD_PHOTOS[currentIndex];

  const craftPillars = [
    {
      icon: Compass,
      title: 'Provenance First',
      desc: 'Sourced from independent multi-generational ranches in Illinois, Iowa, and Miyazaki Prefecture.',
    },
    {
      icon: Flame,
      title: 'Open Hearth Woodcraft',
      desc: 'Seasoned white oak and cherry hardwood, burning at controlled temperatures up to 800°F.',
    },
    {
      icon: Sparkles,
      title: 'Art of Restraint',
      desc: 'Sea salt, smoke, rendered bone marrow, and precise resting times — without superfluous masking.',
    },
  ];

  return (
    <section id="philosophy" className="relative w-full bg-[#0d0905] overflow-hidden border-t border-[#3a2816]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[750px]">
        {/* Left Column: Philosophy Text */}
        <div
          ref={textRef}
          className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-20 lg:py-28 bg-[#0d0905] relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <GoldUnderlineHeading
              subtitle="CRAFT · FIRE · ETHOS"
              className="mb-8"
            >
              Our Philosophy
            </GoldUnderlineHeading>

            <div className="space-y-6 text-[#f5f0e8]/85 text-base sm:text-lg font-light leading-relaxed">
              <p>
                Every dish that leaves our kitchen begins with a single question: <span className="text-[#f5f0e8] font-normal italic">does this do justice to what the land provided?</span> We source exclusively from family-owned ranches, farms, and fisheries — partners we visit in person, not vendors we email from an office.
              </p>

              <p>
                Our custom hearth burns aged white oak and sweet cherry wood, chosen specifically for the subtle aromatic smoke profile they impart to each cut. Every sear is an active dialogue between fierce heat, patient time, and culinary restraint.
              </p>

              <p className="text-[#c9973e] font-serif text-xl sm:text-2xl italic tracking-wide">
                “We don’t over-garnish. We don’t over-explain. We trust the ingredient — and we trust you.”
              </p>
            </div>

            {/* Three Craft Pillars */}
            <div className="mt-12 pt-8 border-t border-[#3a2816] grid grid-cols-1 sm:grid-cols-3 gap-6">
              {craftPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-[#c9973e]" />
                      <h4 className="text-[12px] tracking-[0.14em] uppercase font-medium text-[#f5f0e8]">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#f5f0e8]/60 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Full-Bleed 5-Gourmet-Food Crossfade */}
        <div className="relative h-[480px] lg:h-auto min-h-full w-full overflow-hidden bg-[#120c06]">
          {/* Multi-image Crossfade Layers */}
          <div className="absolute inset-0 w-full h-full">
            {PHILOSOPHY_FOOD_PHOTOS.map((photo, index) => {
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
                    opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                    scale: { duration: 6, ease: 'linear' },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Automatic fallback if CDN drops
                      const target = e.currentTarget;
                      if (target.src !== photo.fallbackUrl) {
                        target.src = photo.fallbackUrl;
                      } else {
                        target.src = FALLBACK_MAIN;
                      }
                    }}
                    className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08]"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Moody Overlay Gradients */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, rgba(13,9,5,0.7) 0%, transparent 40%, rgba(13,9,5,0.5) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to top, rgba(13,9,5,0.85) 0%, transparent 50%, rgba(13,9,5,0.4) 100%)',
            }}
          />

          {/* Floating Dynamic Artisan Stamp */}
          <div className="absolute bottom-8 right-8 z-20 bg-[#0d0905]/90 backdrop-blur-md border border-[#c9973e]/40 p-4 sm:p-5 max-w-xs text-right hidden sm:block shadow-2xl shadow-black/80 rounded-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-end gap-1 text-[9px] tracking-[0.2em] uppercase text-[#c9973e] font-semibold">
                  <UtensilsCrossed className="w-2.5 h-2.5 text-[#c9973e]" />
                  <span>{currentPhoto.tag}</span>
                </div>
                <h4
                  className="font-serif text-sm text-[#f5f0e8] font-normal"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {currentPhoto.title}
                </h4>
                <p className="text-[11px] text-[#f5f0e8]/70 font-light leading-tight">
                  {currentPhoto.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
