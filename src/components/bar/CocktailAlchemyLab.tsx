import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, GlassWater, Check, RotateCcw, Send, Layers } from 'lucide-react';
import { MIX_BASES, MIX_HEARTH_SMOKES, MIX_ICES, MIX_BITTERS } from '../../data/barData';
import { barAudio } from '../../utils/barAudio';

interface CustomDrink {
  name: string;
  base: typeof MIX_BASES[0];
  smoke: typeof MIX_HEARTH_SMOKES[0];
  ice: typeof MIX_ICES[0];
  bitter: typeof MIX_BITTERS[0];
  price: string;
}

interface CocktailAlchemyLabProps {
  onOrderCustomDrink?: (drink: CustomDrink) => void;
}

export default function CocktailAlchemyLab({ onOrderCustomDrink }: CocktailAlchemyLabProps) {
  const [selectedBase, setSelectedBase] = useState(MIX_BASES[0]);
  const [selectedSmoke, setSelectedSmoke] = useState(MIX_HEARTH_SMOKES[0]);
  const [selectedIce, setSelectedIce] = useState(MIX_ICES[0]);
  const [selectedBitter, setSelectedBitter] = useState(MIX_BITTERS[0]);

  const [isShaking, setIsShaking] = useState(false);
  const [mixedDrink, setMixedDrink] = useState<CustomDrink | null>(null);
  const [orderSent, setOrderSent] = useState(false);

  const handleCraftDrink = () => {
    setIsShaking(true);
    setOrderSent(false);
    barAudio.playShakerSound();

    setTimeout(() => {
      setIsShaking(false);
      barAudio.playGlassToast(0.35);

      // Generate dynamic evocative bespoke title
      const baseShort = selectedBase.name.split(' ')[0];
      const smokeShort = selectedSmoke.name.split(' ')[1] || 'Hearth';
      const titles = [
        `The ${smokeShort} & ${baseShort} Alchemical Elixir`,
        `Smoked ${selectedBase.name.split(' ')[1] || 'Spirit'} with ${selectedSmoke.name}`,
        `Hearth Fire Alchemy: ${selectedBase.name}`,
        `Bespoke Cloche No. ${Math.floor(Math.random() * 800 + 100)}`,
      ];
      const name = titles[Math.floor(Math.random() * titles.length)];

      const drink: CustomDrink = {
        name,
        base: selectedBase,
        smoke: selectedSmoke,
        ice: selectedIce,
        bitter: selectedBitter,
        price: '$23',
      };
      setMixedDrink(drink);
    }, 1200);
  };

  const handleSendToBar = () => {
    if (!mixedDrink) return;
    barAudio.playGlassToast(0.4);
    setOrderSent(true);
    if (onOrderCustomDrink) {
      onOrderCustomDrink(mixedDrink);
    }
  };

  return (
    <section id="alchemy-lab" className="py-24 sm:py-32 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-[#3a2816]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#c9973e]/10 border border-[#c9973e]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9973e] mb-3">
          <Flame className="w-3.5 h-3.5 text-[#c9973e]" />
          <span>Interactive Bartender Mixology Lab</span>
        </div>
        <h2
          className="text-3xl sm:text-5xl font-light text-[#f5f0e8] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Craft Your Bespoke Hearth Potion
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#f5f0e8]/75 font-light leading-relaxed">
          Select your spirit foundation, charred wood-smoke element, crystal ice geometry, and botanical elixir. Watch our virtual shaker fuse your custom creation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: The Mixology Selector Workbench */}
        <div className="lg:col-span-7 space-y-8 bg-[#120c07] border border-[#3a2816] p-6 sm:p-8 rounded-xs shadow-2xl">
          {/* Step 1: Base Spirit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e]">
                01 / Foundation Spirit Base
              </span>
              <span className="text-[#f5f0e8]/50 font-light">{selectedBase.abv}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MIX_BASES.map((base) => (
                <button
                  key={base.id}
                  onClick={() => setSelectedBase(base)}
                  className={`p-3 text-left rounded-xs border transition-all cursor-pointer flex items-center justify-between ${
                    selectedBase.id === base.id
                      ? 'bg-[#1e130a] border-[#c9973e] shadow-md shadow-[#c9973e]/10'
                      : 'bg-[#0d0905] border-[#3a2816] hover:border-[#c9973e]/40'
                  }`}
                >
                  <div>
                    <div className="text-xs font-medium text-[#f5f0e8]">{base.name}</div>
                    <div className="text-[10px] text-[#f5f0e8]/60 mt-0.5">{base.notes}</div>
                  </div>
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 ml-2 shrink-0"
                    style={{ backgroundColor: base.color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Wood-Fire Smoke & Hearth Infusion */}
          <div className="space-y-3 pt-4 border-t border-[#3a2816]/70">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e]">
              02 / Wood-Fire Cloche Smoke & Aromatics
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MIX_HEARTH_SMOKES.map((smoke) => (
                <button
                  key={smoke.id}
                  onClick={() => setSelectedSmoke(smoke)}
                  className={`p-3 text-left rounded-xs border transition-all cursor-pointer ${
                    selectedSmoke.id === smoke.id
                      ? 'bg-[#1e130a] border-[#c9973e] shadow-md shadow-[#c9973e]/10'
                      : 'bg-[#0d0905] border-[#3a2816] hover:border-[#c9973e]/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{smoke.icon}</span>
                    <span className="text-xs font-medium text-[#f5f0e8]">{smoke.name}</span>
                  </div>
                  <div className="text-[10px] text-[#f5f0e8]/60 mt-1">{smoke.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Ice Geometry */}
          <div className="space-y-3 pt-4 border-t border-[#3a2816]/70">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e]">
              03 / Hand-Carved Ice Architecture
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MIX_ICES.map((ice) => (
                <button
                  key={ice.id}
                  onClick={() => setSelectedIce(ice)}
                  className={`p-3 text-left rounded-xs border transition-all cursor-pointer ${
                    selectedIce.id === ice.id
                      ? 'bg-[#1e130a] border-[#c9973e] shadow-md shadow-[#c9973e]/10'
                      : 'bg-[#0d0905] border-[#3a2816] hover:border-[#c9973e]/40'
                  }`}
                >
                  <div className="text-xs font-medium text-[#f5f0e8]">{ice.name}</div>
                  <div className="text-[10px] text-[#f5f0e8]/60 mt-0.5">{ice.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Botanical Bitters & Nectars */}
          <div className="space-y-3 pt-4 border-t border-[#3a2816]/70">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e]">
              04 / Botanical Cordial & House Bitters
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MIX_BITTERS.map((bitter) => (
                <button
                  key={bitter.id}
                  onClick={() => setSelectedBitter(bitter)}
                  className={`p-2.5 text-left rounded-xs border transition-all cursor-pointer flex items-center justify-between ${
                    selectedBitter.id === bitter.id
                      ? 'bg-[#1e130a] border-[#c9973e]'
                      : 'bg-[#0d0905] border-[#3a2816] hover:border-[#c9973e]/40'
                  }`}
                >
                  <span className="text-xs text-[#f5f0e8]">{bitter.name}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: bitter.color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Craft Button */}
          <div className="pt-4">
            <button
              onClick={handleCraftDrink}
              disabled={isShaking}
              className="w-full py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-xs tracking-[0.2em] uppercase rounded-xs transition-all shadow-xl shadow-[#c9973e]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isShaking ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#0d0905]" />
                  <span>Torching Cloche & Shaking Live...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-[#0d0905]" />
                  <span>Torch Smoke & Shake Custom Potion ($23)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Live Glass & Smoke Visualizer */}
        <div className="lg:col-span-5 bg-[#0e0905] border border-[#3a2816] p-8 rounded-xs relative overflow-hidden flex flex-col justify-between min-h-[480px]">
          {/* Glowing Ambient Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: selectedBase.color }}
          />

          <div>
            <div className="flex items-center justify-between text-xs text-[#c9973e] font-mono mb-6">
              <span>HEARTH MIXOLOGY BENCH</span>
              <span>LIVE RITUAL</span>
            </div>

            {/* Cocktail Glass Visual */}
            <div className="relative my-8 flex flex-col items-center justify-center">
              <motion.div
                animate={
                  isShaking
                    ? {
                        rotate: [0, -12, 12, -8, 8, 0],
                        y: [0, -15, 10, -10, 5, 0],
                        scale: [1, 1.05, 0.98, 1.03, 1],
                      }
                    : {}
                }
                transition={{ repeat: isShaking ? Infinity : 0, duration: 0.25 }}
                className="relative flex flex-col items-center"
              >
                {/* Smoke Cloche Aura */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.4], y: [-5, -15, -5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-12 w-32 h-16 bg-gradient-to-t from-white/20 to-transparent blur-md rounded-full pointer-events-none"
                />

                {/* Glassware Render */}
                <div className="w-36 h-48 border-2 border-[#f5f0e8]/40 rounded-b-3xl relative overflow-hidden flex flex-col justify-end p-2 bg-white/5 backdrop-blur-xs shadow-2xl shadow-black">
                  {/* Liquid inside */}
                  <motion.div
                    animate={{ height: ['65%', '72%', '68%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-full rounded-b-2xl relative overflow-hidden transition-colors duration-500"
                    style={{
                      background: `linear-gradient(to top, ${selectedBase.color}, ${selectedBitter.color}88)`,
                    }}
                  >
                    {/* Floating Ice Sphere */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/30 border border-white/60 backdrop-blur-md shadow-inner flex items-center justify-center">
                      <span className="text-[8px] font-mono text-white/80">ICE</span>
                    </div>

                    {/* Smoke Swirl inside glass */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse" />
                  </motion.div>
                </div>

                {/* Stem and Base */}
                <div className="w-2.5 h-12 bg-white/30 border-x border-white/40" />
                <div className="w-20 h-2 bg-white/30 rounded-full border border-white/40" />
              </motion.div>

              {/* Smoke Description Pill */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-[#3a2816] rounded-full text-[10px] text-[#c9973e] font-mono">
                <span>{selectedSmoke.icon}</span>
                <span>{selectedSmoke.name}</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="pt-6 border-t border-[#3a2816]/80">
            {mixedDrink ? (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4
                    className="text-xl font-light text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {mixedDrink.name}
                  </h4>
                  <span className="text-xl font-light text-[#c9973e] italic">{mixedDrink.price}</span>
                </div>

                <p className="text-[11px] text-[#f5f0e8]/75 font-light leading-relaxed">
                  Infused with {mixedDrink.smoke.name}, poured over {mixedDrink.ice.name}, and balanced with {mixedDrink.bitter.name}.
                </p>

                <div className="pt-2">
                  {orderSent ? (
                    <div className="p-3 bg-[#c9973e]/20 border border-[#c9973e] text-xs text-[#f5f0e8] rounded-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c9973e]" />
                      <span>Order sent to Bartender! Added to your Hearth Bar Tab.</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleSendToBar}
                      className="w-full py-2.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] font-semibold tracking-wider uppercase rounded-xs transition-all shadow-md shadow-[#c9973e]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Bespoke Order to Bartender</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-[#f5f0e8]/50 font-light italic">
                Customize your ingredients above and press “Torch Smoke & Shake” to generate your unique cocktail alchemy.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
