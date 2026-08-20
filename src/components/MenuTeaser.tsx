import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Flame } from 'lucide-react';
import GoldUnderlineHeading from './GoldUnderlineHeading';

export default function MenuTeaser() {
  const previewDishes = [
    {
      name: 'A5 Wagyu Striploin (6oz)',
      category: 'Mains',
      type: 'non-veg',
      flag: '🇯🇵',
      country: 'Kagoshima, Japan',
      price: '$125',
      desc: 'Sear-seared on hot Ishiyaki lava stone, fresh wasabi root, smoked volcanic black salt.'
    },
    {
      name: 'Hearth-Roasted Paneer Tikka Steak',
      category: 'Mains',
      type: 'veg',
      flag: '🇮🇳',
      country: 'Old Delhi, India',
      price: '$46',
      desc: 'Artisanal buffalo paneer in saffron yogurt, smoked makhani velouté, charred mint kulcha.'
    },
    {
      name: '40-Day Dry-Aged Ribeye (16oz)',
      category: 'Prime Cuts',
      type: 'non-veg',
      flag: '🇺🇸',
      country: 'Midwest, USA',
      price: '$78',
      desc: 'White oak-grilled over open hearth embers, roasted bone marrow butter, garlic jus.'
    },
    {
      name: 'Handmade Black Truffle Tagliolini',
      category: 'Handmade Pasta',
      type: 'veg',
      flag: '🇮🇹',
      country: 'Piedmont, Italy',
      price: '$48',
      desc: '30-egg yolk pasta, 36-month Parmigiano emulsion, shaved fresh Norcia black truffles.'
    }
  ];

  return (
    <section id="menu-preview" className="py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-20 bg-[#0d0905] text-[#f5f0e8] border-t border-[#3a2816]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <GoldUnderlineHeading subtitle="INTERNATIONAL HEARTH GASTRONOMY">
              The Culinary Anthology
            </GoldUnderlineHeading>
            <p className="mt-4 text-[#f5f0e8]/75 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              Experience wood-fired mastery across both Vegetarian and Non-Vegetarian traditions from Japan, France, Italy, India, Argentina, and Mexico.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/menu"
              id="view-full-menu-btn"
              className="inline-flex items-center space-x-3 px-7 py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[12px] font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-300 shadow-xl shadow-[#c9973e]/20 hover:shadow-[#c9973e]/35 hover:-translate-y-0.5 cursor-pointer self-start md:self-auto whitespace-nowrap"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* 4 Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {previewDishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#120c07] border border-[#3a2816] p-6 rounded-xs flex flex-col justify-between group hover:border-[#c9973e]/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#c9973e] font-mono">
                    {dish.flag} {dish.country}
                  </span>
                  {dish.type === 'veg' ? (
                    <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-[#142012] border border-[#2a4d22] text-[#86efac] rounded-xs font-semibold">
                      <Leaf className="w-2.5 h-2.5" /> Veg
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-[#20100a] border border-[#522915] text-[#fdba74] rounded-xs font-semibold">
                      <Flame className="w-2.5 h-2.5" /> Non-Veg
                    </span>
                  )}
                </div>

                <h4
                  className="text-xl font-light text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {dish.name}
                </h4>

                <p className="text-xs text-[#f5f0e8]/65 font-light leading-relaxed mb-4">
                  {dish.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#3a2816]/70 flex items-center justify-between">
                <span
                  className="text-lg font-light text-[#c9973e] italic"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {dish.price}
                </span>
                <Link
                  to="/menu"
                  className="text-[10px] uppercase tracking-widest text-[#f5f0e8]/50 group-hover:text-[#c9973e] flex items-center gap-1"
                >
                  View Details &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner with Direct Navigation to Menu Page */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 bg-[#181009] border border-[#3a2816] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9973e] font-semibold">
              30+ CULINARY MASTERWORKS & 2,000 VINTAGE CELLAR
            </span>
            <h5
              className="text-xl sm:text-2xl font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Starters, Wood-Fired Chops, Handmade Pastas & Rare Grand Crus
            </h5>
          </div>

          <Link
            to="/menu"
            className="px-6 py-3 border border-[#c9973e]/50 hover:border-[#c9973e] text-[#c9973e] hover:text-[#0d0905] hover:bg-[#c9973e] text-[11px] font-medium tracking-[0.2em] uppercase rounded-xs transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Explore 6 Cuisines &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
