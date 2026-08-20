import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wine, Flame, ChevronRight, Check, X, ShieldCheck } from 'lucide-react';
import { RARE_SPIRITS, RareSpiritItem } from '../../data/barData';
import { barAudio } from '../../utils/barAudio';

interface VirtualBackbarProps {
  onOrderSpirit?: (spirit: RareSpiritItem, size: '1oz' | '2oz') => void;
}

export default function VirtualBackbar({ onOrderSpirit }: VirtualBackbarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpirit, setActiveSpirit] = useState<RareSpiritItem | null>(null);
  const [orderedNotice, setOrderedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Rare Vault Bottles' },
    { id: 'Single Malt Scotch', label: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Single Malt Scotch' },
    { id: 'Japanese Whisky', label: '🇯🇵 Japanese Whisky' },
    { id: 'Bourbon & Rye', label: '🪵 Bourbon & Rye' },
    { id: 'Artisanal Agave', label: '🌵 Artisanal Agave' },
    { id: 'Aged Rum & Cognac', label: '🍯 Aged Rum' },
  ];

  const filteredSpirits = RARE_SPIRITS.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  const handlePour = (spirit: RareSpiritItem, size: '1oz' | '2oz') => {
    barAudio.playGlassToast(0.35);
    setOrderedNotice(`Poured ${size} of ${spirit.name}`);
    setTimeout(() => setOrderedNotice(null), 3000);
    if (onOrderSpirit) {
      onOrderSpirit(spirit, size);
    }
  };

  return (
    <section id="spirits-vault" className="py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#0a0704] relative border-b border-[#3a2816]">
      {/* Ambient Shelf Backlight Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c9973e]/20 via-[#180e07]/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9973e]/10 border border-[#c9973e]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9973e] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Allocated & Single Cask Private Reserve</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-light text-[#f5f0e8] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Illuminated Spirits Vault
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#f5f0e8]/75 font-light max-w-xl leading-relaxed">
              Explore our lock-and-key backbar of rare Japanese whiskies, peated Islays, wild agave mezcals, and cask-strength ryes. Poured neat or over hand-carved directional ice.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-[10.5px] tracking-wider uppercase rounded-xs transition-all cursor-pointer ${
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

        {/* Notice Toast */}
        <AnimatePresence>
          {orderedNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-[#c9973e]/20 border border-[#c9973e] rounded-xs flex items-center justify-between text-xs text-[#f5f0e8]"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9973e]" />
                <span className="font-medium">{orderedNotice}</span>
                <span className="text-[#f5f0e8]/60 italic font-serif">· Added to your Hearth Bar Tab</span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9973e]">Neat Pour Ready</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Lighted Backbar Mahogany Shelf Rack */}
        <div className="relative p-6 sm:p-10 bg-[#120c07] border-2 border-[#3a2816] rounded-xs shadow-2xl overflow-hidden">
          {/* Wood grain highlight & glowing LED shelf runners */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9973e]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#21140a] border-t border-[#3a2816]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredSpirits.map((spirit) => (
              <div
                key={spirit.id}
                onClick={() => setActiveSpirit(spirit)}
                className="group relative bg-[#0e0905] border border-[#3a2816] hover:border-[#c9973e] rounded-xs p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#c9973e]/15"
              >
                {/* Glowing Liquid Ambient Backlight behind card */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                  style={{ backgroundColor: spirit.bottleColor }}
                />

                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#c9973e]/15 border border-[#c9973e]/30 text-[#c9973e] font-mono rounded-xs">
                      {spirit.rarity}
                    </span>
                    <span className="text-xs text-[#f5f0e8]/50 font-mono">{spirit.abv}</span>
                  </div>

                  {/* Bottle & Liquid Visual Accent */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-14 rounded-xs border border-[#c9973e]/40 flex items-center justify-center relative overflow-hidden shadow-inner"
                      style={{
                        background: `linear-gradient(to top, ${spirit.bottleColor} 65%, transparent 100%)`,
                      }}
                    >
                      <Wine className="w-5 h-5 text-[#f5f0e8]/90 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                    </div>

                    <div>
                      <h3
                        className="text-xl font-light text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors leading-snug"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {spirit.name}
                      </h3>
                      <p className="text-[11px] text-[#c9973e]/80 font-mono mt-0.5">
                        {spirit.region} · {spirit.age}
                      </p>
                    </div>
                  </div>

                  {/* Cask Wood Finish */}
                  <div className="p-2.5 bg-black/50 border border-[#3a2816] rounded-xs text-[11px] text-[#f5f0e8]/80 mb-4 font-light">
                    <span className="text-[#c9973e] font-medium">Cask:</span> {spirit.caskType}
                  </div>

                  {/* Quick Tasting Notes */}
                  <div className="space-y-1.5 text-xs text-[#f5f0e8]/70 font-light mb-4">
                    <div className="line-clamp-2">
                      <strong className="text-[#f5f0e8] font-normal">Palate:</strong> {spirit.palate}
                    </div>
                  </div>
                </div>

                {/* Pour Prices & Action */}
                <div className="pt-4 border-t border-[#3a2816] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-mono text-[#f5f0e8]/50">1 oz Taste</div>
                      <div className="text-sm text-[#c9973e] font-serif italic">{spirit.price1oz}</div>
                    </div>
                    <div className="w-[1px] h-6 bg-[#3a2816]" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-mono text-[#f5f0e8]/50">2 oz Neat</div>
                      <div className="text-sm text-[#c9973e] font-serif italic">{spirit.price2oz}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-[#c9973e] font-medium group-hover:translate-x-1 transition-transform">
                    <span>Inspect Vault</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spirit Inspect & Neat Pour Modal */}
      <AnimatePresence>
        {activeSpirit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#140e08] border border-[#c9973e]/50 rounded-xs p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden"
            >
              {/* Glowing Liquid Background */}
              <div
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: activeSpirit.bottleColor }}
              />

              <button
                onClick={() => setActiveSpirit(null)}
                className="absolute top-4 right-4 p-2 text-[#f5f0e8]/60 hover:text-[#c9973e] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#c9973e] mb-2">
                    <span>{activeSpirit.category}</span>
                    <span>·</span>
                    <span>{activeSpirit.abv}</span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl font-light text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {activeSpirit.name}
                  </h3>
                  <div className="text-xs text-[#c9973e] font-mono mt-1">
                    {activeSpirit.distillery} · {activeSpirit.region} ({activeSpirit.age})
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#f5f0e8]/80 font-light leading-relaxed">
                  {activeSpirit.description}
                </p>

                {/* Tasting Trio */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-black/50 border border-[#3a2816] rounded-xs text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#c9973e] font-semibold mb-1">👃 Nose</div>
                    <div className="text-[#f5f0e8]/80 font-light text-[11px] leading-relaxed">{activeSpirit.nose}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#c9973e] font-semibold mb-1">👅 Palate</div>
                    <div className="text-[#f5f0e8]/80 font-light text-[11px] leading-relaxed">{activeSpirit.palate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#c9973e] font-semibold mb-1">✨ Finish</div>
                    <div className="text-[#f5f0e8]/80 font-light text-[11px] leading-relaxed">{activeSpirit.finish}</div>
                  </div>
                </div>

                {/* Pour Request Buttons */}
                <div className="pt-4 border-t border-[#3a2816] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#f5f0e8]/60">
                    Served with crystal water dropper & single hand-carved ice sphere upon request.
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePour(activeSpirit, '1oz')}
                      className="px-4 py-2.5 bg-[#1f150c] hover:bg-[#2c1e11] border border-[#c9973e]/50 text-[#f5f0e8] text-[11px] tracking-wider uppercase rounded-xs transition-all cursor-pointer"
                    >
                      Pour 1 oz Taste ({activeSpirit.price1oz})
                    </button>
                    <button
                      onClick={() => handlePour(activeSpirit, '2oz')}
                      className="px-5 py-2.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] font-semibold tracking-wider uppercase rounded-xs transition-all shadow-lg shadow-[#c9973e]/20 cursor-pointer"
                    >
                      Pour 2 oz Neat ({activeSpirit.price2oz})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
