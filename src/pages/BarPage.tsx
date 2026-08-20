import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Flame,
  Sparkles,
  GlassWater,
  Disc3,
  Clock,
  MapPin,
  Leaf,
  ChevronRight,
  Info,
  X,
  Volume2,
  CalendarCheck,
  Wine,
  ShieldCheck,
  Plus,
  Check,
  Coffee,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GoldUnderlineHeading from '../components/GoldUnderlineHeading';
import LoungeBoothModal from '../components/LoungeBoothModal';
import HearthMusicPlayer from '../components/HearthMusicPlayer';
import BarFloatingEmbers from '../components/bar/BarFloatingEmbers';
import VirtualBackbar from '../components/bar/VirtualBackbar';
import CocktailAlchemyLab from '../components/bar/CocktailAlchemyLab';
import BarSeatRadar from '../components/bar/BarSeatRadar';
import BarTabDrawer, { TabItem } from '../components/bar/BarTabDrawer';
import {
  BAR_HERO_INFO,
  BAR_COCKTAILS,
  BAR_BITES,
  BAR_ATMOSPHERE,
  CocktailItem,
  RareSpiritItem,
  BarBiteItem
} from '../data/barData';
import { barAudio } from '../utils/barAudio';

export default function BarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('all');
  const [activeCocktail, setActiveCocktail] = useState<CocktailItem | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [barMood, setBarMood] = useState<'candlelight' | 'golden' | 'midnight'>('candlelight');

  // Bar Tab State
  const [tabItems, setTabItems] = useState<TabItem[]>([]);
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Tab Handlers
  const handleAddToTab = (item: {
    id: string;
    name: string;
    price: string;
    type: 'cocktail' | 'spirit' | 'custom' | 'bite';
  }) => {
    barAudio.playGlassToast(0.35);
    const priceNum = parseFloat(item.price.replace('$', '')) || 20;

    setTabItems((prev) => {
      const existing = prev.find((it) => it.id === item.id);
      if (existing) {
        return prev.map((it) =>
          it.id === item.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          priceNum,
          qty: 1,
          type: item.type,
        },
      ];
    });

    setAddedNotification(`Added “${item.name}” to Bar Tab`);
    setTimeout(() => setAddedNotification(null), 3000);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setTabItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.qty + delta;
            return newQty > 0 ? { ...it, qty: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as TabItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setTabItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearTab = () => {
    setTabItems([]);
  };

  // Filter cocktails
  const filteredCocktails = BAR_COCKTAILS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'smoked' && item.category === 'smoked') ||
      (selectedCategory === 'signature' && item.category === 'signature') ||
      (selectedCategory === 'zero-proof' && item.category === 'zero-proof');

    const matchesFlavor =
      selectedFlavor === 'all' || item.flavorProfile === selectedFlavor;

    return matchesCategory && matchesFlavor;
  });

  const flavorProfiles = [
    'all',
    'Smoky & Bold',
    'Bright & Citrusy',
    'Herbaceous & Crisp',
    'Rich & Decadent',
  ];

  // Dynamic Theme Styling based on Bar Mood
  const moodStyles = {
    candlelight: 'bg-[#0d0905] text-[#f5f0e8]',
    golden: 'bg-[#120a04] text-[#fbf6ec]',
    midnight: 'bg-[#060403] text-[#e8e2d8]',
  };

  return (
    <div className={`min-h-screen selection:bg-[#c9973e] selection:text-[#0d0905] relative transition-colors duration-700 ${moodStyles[barMood]}`}>
      {/* Floating Embers Particle Canvas */}
      <BarFloatingEmbers />

      {/* Floating Bar Tab Drawer */}
      <BarTabDrawer
        items={tabItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearTab={handleClearTab}
      />

      {/* Floating Add Notification */}
      <AnimatePresence>
        {addedNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 px-4 py-3 bg-[#c9973e] text-[#0d0905] font-semibold text-xs rounded-xs shadow-2xl flex items-center gap-2 border border-[#0d0905]"
          >
            <Check className="w-4 h-4" />
            <span>{addedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          1. CINEMATIC SPEAKEASY HERO
      ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[780px] w-full overflow-hidden flex items-center justify-center border-b border-[#3a2816] py-20 sm:py-24"
      >
        {/* Layered Visual Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=2400&q=85"
            alt="The Hearth Bar Sanctuary"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.2] scale-105 transition-transform duration-1000"
          />
          {/* Subtle warm animated ambient light pulses */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#0d0905]/70 to-[#0d0905]" />
        </div>

        {/* Ambient Gradient Overlays */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,9,5,0.7) 0%, rgba(13,9,5,0.2) 40%, rgba(13,9,5,0.85) 85%, rgba(13,9,5,1) 100%)',
          }}
        />

        {/* Hero Content with Scroll Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-20 max-w-5xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center pt-8 sm:pt-12"
        >
          {/* Live Speakeasy Status Radar Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-[#0d0905]/90 border border-[#c9973e]/50 rounded-full text-[11px] text-[#c9973e] tracking-widest uppercase mb-6 backdrop-blur-md shadow-2xl shadow-black"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono">Candlelit Cocktail Sanctuary</span>
            <span className="text-[#3a2816]">·</span>
            <span className="text-[#f5f0e8]/80 font-normal">18 Walnut Stools Open for Walk-Ins</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center justify-center space-x-3 text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-[#c9973e] font-medium mb-4"
          >
            <Flame className="w-4 h-4 text-[#c9973e]" />
            <span>ALCHEMICAL WOOD-FIRE MIXOLOGY</span>
            <Flame className="w-4 h-4 text-[#c9973e]" />
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden pb-2 mb-4">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-light text-[#f5f0e8] tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Hearth Bar <br />
              <span className="italic text-[#c9973e] font-normal text-3xl sm:text-5xl md:text-7xl">
                & Cocktail Sanctuary
              </span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-[#f5f0e8]/85 max-w-2xl font-light leading-relaxed mb-8"
          >
            {BAR_HERO_INFO.description}
          </motion.p>

          {/* Quick Info Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs text-[#f5f0e8]/60 font-light"
          >
            <span>✦ <strong>Golden Aperitivo:</strong> Daily 4:30 PM – 6:30 PM</span>
            <span>✦ <strong>Late-Night Hearth Bites:</strong> Served until 1:00 AM</span>
            <span>✦ <strong>Hi-Fi Vinyl Sessions:</strong> Nightly from 8:00 PM</span>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. ANALOG VINYL & CASSETTE MUSIC SANCTUARY (FEATURED AT START)
      ========================================================================= */}
      <section id="vinyl-sanctuary" className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-[#3a2816]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#c9973e]/10 border border-[#c9973e]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9973e] mb-3">
            <Disc3 className="w-3.5 h-3.5 text-[#c9973e]" />
            <span>Analog Sound Lounge & Cassette Deck</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-light text-[#f5f0e8] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            The Vinyl & Tape Sanctuary
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#f5f0e8]/75 font-light leading-relaxed">
            Immerse in curated retro Bollywood, Japanese jazz fusion, and lofi tape vibes while you sip. Featuring a physical mechanical cassette deck with real-time fireplace crackle and vintage tape hiss.
          </p>
        </div>

        {/* Vintage Cassette Music Console */}
        <div className="w-full max-w-4xl mx-auto">
          <HearthMusicPlayer />
        </div>
      </section>

      {/* =========================================================================
          4. THE VIBE & ATMOSPHERE PILLARS
      ========================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-[#3a2816]/70">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <GoldUnderlineHeading subtitle="THE CRAFT OF SHADOW & ICE" alignment="center">
            The Bar Sanctuary
          </GoldUnderlineHeading>
          <p className="mt-4 text-sm sm:text-base text-[#f5f0e8]/75 font-light leading-relaxed">
            Every cocktail is an orchestration of temperature, wood smoke, hand-carved ice, and single-barrel distillation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BAR_ATMOSPHERE.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="p-8 bg-[#120c07] border border-[#3a2816] hover:border-[#c9973e]/50 rounded-xs transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xs bg-[#c9973e]/10 border border-[#c9973e]/30 flex items-center justify-center text-[#c9973e]">
                  {idx === 0 && <GlassWater className="w-5 h-5" />}
                  {idx === 1 && <Flame className="w-5 h-5" />}
                  {idx === 2 && <Disc3 className="w-5 h-5" />}
                </div>
                <h3
                  className="text-2xl font-light text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#f5f0e8]/70 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3a2816]/70 flex items-center justify-between text-[10px] tracking-widest uppercase text-[#c9973e]/70">
                <span>Pillar 0{idx + 1}</span>
                <span className="font-mono">Live Nightly</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. THE ILLUMINATED SPIRITS VAULT (VIRTUAL BACKBAR)
      ========================================================================= */}
      <VirtualBackbar
        onOrderSpirit={(spirit, size) =>
          handleAddToTab({
            id: `spirit-${spirit.id}-${size}`,
            name: `${spirit.name} (${size} Neat Pour)`,
            price: size === '1oz' ? spirit.price1oz : spirit.price2oz,
            type: 'spirit',
          })
        }
      />

      {/* =========================================================================
          5. INTERACTIVE COCKTAIL COMPASS & MENU (VISUAL PHOTOGRAPHY)
      ========================================================================= */}
      <section id="cocktails" className="py-24 sm:py-32 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-[#3a2816]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <GoldUnderlineHeading subtitle="CURATED LIBATIONS & INFUSIONS">
              The Cocktail Anthology
            </GoldUnderlineHeading>
            <p className="mt-4 text-sm sm:text-base text-[#f5f0e8]/75 max-w-xl font-light leading-relaxed">
              Explore smoked classics, flame-torched botanicals, and zero-proof elixirs handcrafted by our Master Mixologist.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Libations' },
              { id: 'smoked', label: '🔥 Smoked & Hearth' },
              { id: 'signature', label: '✨ Signatures' },
              { id: 'zero-proof', label: '🌿 Zero-Proof' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase rounded-xs transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#c9973e] text-[#0d0905] font-semibold shadow-lg shadow-[#c9973e]/20'
                    : 'bg-[#140e08] border border-[#3a2816] text-[#f5f0e8]/70 hover:border-[#c9973e]/60 hover:text-[#f5f0e8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Flavor Compass Filter */}
        <div className="mb-12 p-4 bg-[#140e08] border border-[#3a2816] rounded-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-[#c9973e]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-widest font-mono">
              Flavor Compass Filter:
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {flavorProfiles.map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-xs transition-all cursor-pointer ${
                  selectedFlavor === flavor
                    ? 'bg-[#c9973e]/20 border border-[#c9973e] text-[#c9973e] font-medium'
                    : 'bg-black/30 border border-transparent text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                }`}
              >
                {flavor === 'all' ? 'All Profiles' : flavor}
              </button>
            ))}
          </div>
        </div>

        {/* Cocktails Grid with Visual Photography Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCocktails.map((cocktail) => (
              <motion.div
                key={cocktail.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#120c07] border border-[#3a2816] hover:border-[#c9973e] rounded-xs overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#c9973e]/15"
              >
                {/* Visual Drink Photo Header */}
                <div
                  className="relative h-48 w-full overflow-hidden cursor-pointer"
                  onClick={() => setActiveCocktail(cocktail)}
                >
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120c07] via-transparent to-black/40" />

                  {/* Top Badge & Price overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[#0d0905]/85 border border-[#c9973e]/40 text-[#c9973e] font-mono rounded-xs backdrop-blur-sm">
                      {cocktail.highlight || cocktail.flavorProfile}
                    </span>
                    <span
                      className="text-2xl font-light text-[#c9973e] italic drop-shadow-md"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {cocktail.price}
                    </span>
                  </div>

                  {/* Glassware & Ice Badge */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9.5px] font-mono text-[#f5f0e8]/80 bg-black/60 px-2 py-1 rounded-xs backdrop-blur-sm">
                    <span>🧊 {cocktail.iceType.split(' ')[0]}</span>
                    <span>🍸 {cocktail.glassware.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3
                      onClick={() => setActiveCocktail(cocktail)}
                      className="text-2xl font-light text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors mb-1 cursor-pointer"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {cocktail.name}
                    </h3>

                    {/* Spirit Base */}
                    <div className="text-[11px] text-[#c9973e]/90 font-medium tracking-wider uppercase mb-2">
                      {cocktail.spiritBase}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#f5f0e8]/70 font-light leading-relaxed mb-4">
                      {cocktail.description}
                    </p>

                    {/* Ingredients Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cocktail.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-[9px] px-2 py-0.5 bg-black/40 border border-[#3a2816] text-[#f5f0e8]/60 rounded-xs"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions: View Ritual & Order to Tab */}
                  <div className="pt-4 border-t border-[#3a2816]/70 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveCocktail(cocktail)}
                      className="text-[11px] text-[#f5f0e8]/70 hover:text-[#c9973e] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ritual Details</span>
                    </button>

                    <button
                      onClick={() =>
                        handleAddToTab({
                          id: cocktail.id,
                          name: cocktail.name,
                          price: cocktail.price,
                          type: 'cocktail',
                        })
                      }
                      className="px-3 py-1.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-[10.5px] uppercase tracking-wider rounded-xs flex items-center gap-1 transition-all shadow-md shadow-[#c9973e]/10 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Tab</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE COCKTAIL ALCHEMY LAB ("MIX YOUR OWN")
      ========================================================================= */}
      <CocktailAlchemyLab
        onOrderCustomDrink={(drink) =>
          handleAddToTab({
            id: `custom-${Date.now()}`,
            name: drink.name,
            price: drink.price,
            type: 'custom',
          })
        }
      />

      {/* =========================================================================
          7. LATE NIGHT HEARTH BAR BITES (CHEF'S SPECIALS)
      ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#110b06] border-b border-[#3a2816]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <GoldUnderlineHeading subtitle="SERVED UNTIL 1:00 AM NIGHTLY" alignment="center">
              Late-Night Hearth Bites
            </GoldUnderlineHeading>
            <p className="mt-4 text-sm sm:text-base text-[#f5f0e8]/75 font-light leading-relaxed">
              Elevated culinary snacks prepared in our wood-fired hearth specifically paired with our cocktail selections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BAR_BITES.map((bite) => (
              <div
                key={bite.id}
                className="bg-[#0d0905] border border-[#3a2816] hover:border-[#c9973e]/60 rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Photo Header */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={bite.image}
                    alt={bite.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1] transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0905] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-[#c9973e] font-mono bg-black/70 px-2 py-0.5 rounded-xs backdrop-blur-sm">
                      {bite.origin}
                    </span>
                    {bite.type === 'veg' ? (
                      <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-[#142012]/90 border border-[#2a4d22] text-[#86efac] rounded-xs font-semibold backdrop-blur-sm">
                        <Leaf className="w-2.5 h-2.5" /> Veg
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-[#20100a]/90 border border-[#522915] text-[#fdba74] rounded-xs font-semibold backdrop-blur-sm">
                        <Flame className="w-2.5 h-2.5" /> Non-Veg
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4
                        className="text-xl font-light text-[#f5f0e8]"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {bite.name}
                      </h4>
                      <span
                        className="text-lg font-light text-[#c9973e] italic"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {bite.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#f5f0e8]/70 font-light leading-relaxed mb-4">
                      {bite.description}
                    </p>
                  </div>

                  <div>
                    <div className="pt-3 border-t border-[#3a2816]/70 flex items-center justify-between text-[10px] text-[#c9973e] mb-3">
                      <span className="text-[#f5f0e8]/50 uppercase tracking-wider">Suggested Pairing:</span>
                      <span className="font-serif italic text-right truncate max-w-[160px]">{bite.pairingCocktail}</span>
                    </div>

                    <button
                      onClick={() =>
                        handleAddToTab({
                          id: bite.id,
                          name: bite.name,
                          price: bite.price,
                          type: 'bite',
                        })
                      }
                      className="w-full py-2 bg-[#18110a] hover:bg-[#c9973e] text-[#c9973e] hover:text-[#0d0905] border border-[#c9973e]/40 hover:border-[#c9973e] font-semibold text-[10px] uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Order Bite ({bite.price})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. LIVE BAR SEATING & FLOORPLAN RADAR
      ========================================================================= */}
      <BarSeatRadar onSelectBooth={() => setIsReserveModalOpen(true)} />

      {/* =========================================================================
          9. GOLDEN APERITIVO & FINAL CTA BANNER
      ========================================================================= */}
      <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#160f0a] border-t border-[#3a2816]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9973e] font-medium">
            WALK-IN BAR SEATING & LOUNGE BOOTHS
          </span>
          <h2
            className="text-3xl sm:text-5xl font-light text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Pull Up a Stool by the Hearth
          </h2>
          <p className="text-sm sm:text-base text-[#f5f0e8]/80 font-light max-w-xl mx-auto leading-relaxed">
            The 18-seat solid walnut bar is always reserved for walk-in guests without reservations. For parties of 4 or more, booth reservations are recommended.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="px-8 py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-[11px] tracking-[0.2em] uppercase rounded-xs transition-all shadow-xl shadow-[#c9973e]/20 cursor-pointer"
            >
              Reserve a Lounge Booth
            </button>
            <Link
              to="/menu"
              className="px-8 py-4 border border-[#f5f0e8]/30 hover:border-[#c9973e] text-[#f5f0e8] hover:text-[#c9973e] text-[11px] tracking-[0.2em] uppercase rounded-xs transition-all cursor-pointer"
            >
              View Full Food Menu
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. COCKTAIL DETAIL MODAL
      ========================================================================= */}
      <AnimatePresence>
        {activeCocktail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#140e08] border border-[#c9973e]/50 rounded-xs p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCocktail(null)}
                className="absolute top-4 right-4 p-2 text-[#f5f0e8]/60 hover:text-[#c9973e] cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                {/* Visual Photo */}
                <div className="sm:col-span-5 relative h-56 sm:h-full rounded-xs overflow-hidden border border-[#3a2816]">
                  <img
                    src={activeCocktail.image}
                    alt={activeCocktail.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e08] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-[#c9973e] bg-black/70 px-2 py-1 rounded-xs">
                    {activeCocktail.abv} · {activeCocktail.glassware}
                  </div>
                </div>

                {/* Details */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase text-[#c9973e] font-mono">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{activeCocktail.flavorProfile}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="text-2xl sm:text-3xl font-light text-[#f5f0e8]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {activeCocktail.name}
                    </h3>
                    <span
                      className="text-2xl font-light text-[#c9973e] italic shrink-0"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {activeCocktail.price}
                    </span>
                  </div>

                  <div className="p-2.5 bg-black/40 border border-[#3a2816] rounded-xs text-xs text-[#c9973e]">
                    Spirit Base: <span className="text-[#f5f0e8]">{activeCocktail.spiritBase}</span>
                  </div>

                  <p className="text-xs text-[#f5f0e8]/85 font-light leading-relaxed">
                    {activeCocktail.description}
                  </p>

                  {activeCocktail.ritualNote && (
                    <div className="p-3 bg-[#c9973e]/10 border border-[#c9973e]/30 rounded-xs space-y-1">
                      <div className="text-[9.5px] uppercase tracking-wider text-[#c9973e] font-mono font-semibold">
                        The Mixology Ritual:
                      </div>
                      <p className="text-xs text-[#f5f0e8]/90 italic font-serif">
                        “{activeCocktail.ritualNote}”
                      </p>
                    </div>
                  )}

                  {/* Flavor Radar Bars */}
                  <div className="space-y-1.5 text-[10px] font-mono text-[#f5f0e8]/70 pt-1">
                    <div className="flex justify-between items-center">
                      <span>Smoke & Oak Intensity:</span>
                      <div className="w-24 h-1.5 bg-[#3a2816] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c9973e]"
                          style={{ width: `${activeCocktail.tastingNotes.smoke}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Citrus & Acidity:</span>
                      <div className="w-24 h-1.5 bg-[#3a2816] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400"
                          style={{ width: `${activeCocktail.tastingNotes.citrus}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-[#3a2816] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveCocktail(null)}
                      className="px-4 py-2 bg-transparent hover:bg-white/5 text-[#f5f0e8]/60 text-[10.5px] uppercase tracking-wider rounded-xs cursor-pointer"
                    >
                      Close
                    </button>

                    <button
                      onClick={() => {
                        handleAddToTab({
                          id: activeCocktail.id,
                          name: activeCocktail.name,
                          price: activeCocktail.price,
                          type: 'cocktail',
                        });
                        setActiveCocktail(null);
                      }}
                      className="px-5 py-2.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] font-semibold tracking-wider uppercase rounded-xs transition-all shadow-lg shadow-[#c9973e]/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bar Tab ({activeCocktail.price})</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lounge Booth Reservation Modal */}
      <LoungeBoothModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}
