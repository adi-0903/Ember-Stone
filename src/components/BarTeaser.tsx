import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowRight, GlassWater, Clock, Disc3 } from 'lucide-react';
import GoldUnderlineHeading from './GoldUnderlineHeading';

export default function BarTeaser() {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-12 md:px-16 overflow-hidden bg-[#0a0704] border-t border-[#3a2816]">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=2000&q=80"
          alt="Atmospheric bar background with amber backlit spirits and crystal cocktail glass"
          className="w-full h-full object-cover object-center filter blur-sm brightness-75"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Atmosphere */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#c9973e] font-medium">
              <Flame className="w-3.5 h-3.5 text-[#c9973e]" />
              <span>THE HEARTH LOUNGE & SPEAKEASY</span>
            </div>

            <GoldUnderlineHeading subtitle="WHERE FIRE MEETS ALCHEMY">
              The Hearth Bar & Sanctuary
            </GoldUnderlineHeading>

            <p className="text-base sm:text-lg text-[#f5f0e8]/80 font-light leading-relaxed">
              Step past the dining room into an intimate, low-lit cocktail lounge where spirits are fat-washed with roasted bone marrow, bitters are smoked over charred oak staves, and directional ice is hand-carved to order.
            </p>

            {/* Vibe Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-[#140e08]/90 border border-[#3a2816] rounded-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-[#c9973e] font-mono">
                  <Clock className="w-3 h-3" />
                  <span>Opens 4:30 PM</span>
                </div>
                <div className="text-xs text-[#f5f0e8]">Daily Golden Aperitivo</div>
              </div>

              <div className="p-3.5 bg-[#140e08]/90 border border-[#3a2816] rounded-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-[#c9973e] font-mono">
                  <GlassWater className="w-3 h-3" />
                  <span>Walnut Counter</span>
                </div>
                <div className="text-xs text-[#f5f0e8]">Walk-Ins Welcome</div>
              </div>

              <div className="p-3.5 bg-[#140e08]/90 border border-[#3a2816] rounded-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-[#c9973e] font-mono">
                  <Disc3 className="w-3 h-3" />
                  <span>Vinyl Sessions</span>
                </div>
                <div className="text-xs text-[#f5f0e8]">Nightly from 8:00 PM</div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/bar"
                id="home-bar-teaser-btn"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-300 shadow-xl shadow-[#c9973e]/20 hover:shadow-[#c9973e]/35 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore the Bar & Lounge</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Cocktail Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-6 sm:p-8 bg-[#120c07] border border-[#c9973e]/40 rounded-xs shadow-2xl shadow-black overflow-hidden group">
              <div className="relative h-64 sm:h-72 w-full rounded-xs overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80"
                  alt="Ember & Oak Old Fashioned in crystal rocks glass with charred orange and smoke"
                  className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c07] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#0d0905]/85 border border-[#c9973e]/40 text-[#c9973e] text-[9.5px] uppercase tracking-widest font-mono rounded-xs backdrop-blur-md">
                  House Signature
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4
                    className="text-2xl font-light text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Ember & Oak Old Fashioned
                  </h4>
                  <span
                    className="text-2xl font-light text-[#c9973e] italic"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    $22
                  </span>
                </div>
                <p className="text-xs text-[#f5f0e8]/70 font-light leading-relaxed">
                  Infused tableside with hickory smoke under a bell cloche, featuring 10-Yr Private Select bourbon and flamed orange oils.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3a2816] flex items-center justify-between text-xs">
                <span className="text-[#c9973e] font-mono text-[10px] tracking-wider uppercase">
                  34% ABV · Smoky & Bold
                </span>
                <Link
                  to="/bar#cocktails"
                  className="text-[10px] uppercase tracking-widest text-[#f5f0e8]/60 hover:text-[#c9973e] flex items-center gap-1 transition-colors"
                >
                  View 8 Curated Cocktails &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
