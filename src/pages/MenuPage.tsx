import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wine,
  Utensils,
  Coffee,
  Globe,
  Leaf,
  Flame,
  Filter,
  ArrowLeft,
  Calendar,
  Search,
  BookOpen
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import GoldUnderlineHeading from '../components/GoldUnderlineHeading';

type Category = 'starters' | 'mains' | 'desserts' | 'drinks';
type DietaryFilter = 'all' | 'veg' | 'non-veg';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('mains');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: Category; label: string; icon: typeof Utensils; note: string }[] = [
    { id: 'starters', label: 'Starters', icon: Utensils, note: 'Small plates, raw bar & hearth crudos from Japan, France, India & Peru' },
    { id: 'mains', label: 'Mains', icon: Sparkles, note: 'Wood-fired prime cuts, aged chops, hand-rolled pasta & tandoori hearth steaks' },
    { id: 'desserts', label: 'Desserts', icon: Coffee, note: 'Decadent hearth finishes, Kashmiri saffron kulfi & French soufflés' },
    { id: 'drinks', label: 'Drinks & Cellar', icon: Wine, note: 'Smoked vintage cocktails & Grand Cru international reserve selections' },
  ];

  // Extract unique countries available in the active category
  const availableCountries = useMemo(() => {
    const countriesInCat = MENU_ITEMS.filter((item) => item.category === activeCategory).map((item) => ({
      country: item.country,
      flag: item.countryFlag || '🌍',
    }));

    const uniqueMap = new Map<string, string>();
    countriesInCat.forEach((c) => {
      if (!uniqueMap.has(c.country)) {
        uniqueMap.set(c.country, c.flag);
      }
    });

    return Array.from(uniqueMap.entries()).map(([country, flag]) => ({ country, flag }));
  }, [activeCategory]);

  // Filter items based on Category, Dietary, Country, and Search Query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = item.category === activeCategory;
      const matchesDietary =
        dietaryFilter === 'all'
          ? true
          : dietaryFilter === 'veg'
          ? item.dietaryType === 'veg'
          : item.dietaryType === 'non-veg';
      const matchesCountry = selectedCountry === 'all' || item.country === selectedCountry;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesDietary && matchesCountry && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, selectedCountry, searchQuery]);

  // Counts for tabs
  const vegCount = MENU_ITEMS.filter((i) => i.category === activeCategory && i.dietaryType === 'veg').length;
  const nonVegCount = MENU_ITEMS.filter((i) => i.category === activeCategory && i.dietaryType === 'non-veg').length;

  return (
    <div className="min-h-screen bg-[#0d0905] text-[#f5f0e8] pt-28 pb-32 px-6 sm:px-10 md:px-16 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Navigation Back */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3a2816]">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#c9973e] hover:text-[#f5f0e8] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Page</span>
          </Link>

          <div className="flex items-center space-x-2 text-[11px] text-[#f5f0e8]/50 uppercase tracking-widest font-mono">
            <Link to="/" className="hover:text-[#c9973e]">Home</Link>
            <span>/</span>
            <span className="text-[#c9973e]">The Menu</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c9973e] font-semibold block mb-3">
              CULINARY ANTHOLOGY & WINE CELLAR
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-light text-[#f5f0e8] tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The Global Hearth Menu
            </h1>
            <p className="mt-4 text-[#f5f0e8]/75 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              Prepared daily over white oak and cherry embers. Featuring parallel <span className="text-[#86efac] font-medium">Vegetarian</span> and <span className="text-[#fdba74] font-medium">Non-Vegetarian</span> courses from Japan, France, Italy, India, Argentina, Mexico, and beyond.
            </p>
          </div>

          {/* Quick Reserve CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/#reservations"
              className="px-6 py-3 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-lg shadow-[#c9973e]/20 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>

        {/* Quick Search & Dietary Badges Legend */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#120c07] p-4 sm:p-5 rounded-sm border border-[#3a2816]">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#c9973e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dish, ingredient, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a120b] border border-[#3a2816] focus:border-[#c9973e] text-[#f5f0e8] placeholder-[#f5f0e8]/40 pl-9 pr-3 py-2 text-xs rounded-xs outline-none transition-colors"
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs w-full md:w-auto justify-start md:justify-end">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#142012] border border-[#2a4d22] text-[#86efac] rounded-sm">
              <Leaf className="w-3.5 h-3.5 text-[#4ade80]" />
              <span className="text-[10px] tracking-[0.15em] uppercase font-semibold">Veg Selection</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#20100a] border border-[#522915] text-[#fdba74] rounded-sm">
              <Flame className="w-3.5 h-3.5 text-[#f97316]" />
              <span className="text-[10px] tracking-[0.15em] uppercase font-semibold">Non-Veg Selection</span>
            </div>
          </div>
        </div>

        {/* Primary Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-[#3a2816] pb-4 mb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedCountry('all');
                }}
                className={`relative px-5 sm:px-6 py-2.5 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#0d0905] bg-[#c9973e] shadow-md shadow-[#c9973e]/20 font-semibold'
                    : 'text-[#f5f0e8]/70 hover:text-[#c9973e] hover:bg-[#1a120b]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Dietary (Veg / Non-Veg) & Global Country Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-[#120c07] p-4 sm:p-5 rounded-sm border border-[#3a2816]">
          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] font-semibold flex items-center gap-1 mr-2 hidden sm:flex">
              <Filter className="w-3 h-3" /> Filter:
            </span>

            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase rounded-xs transition-colors cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'bg-[#c9973e]/25 text-[#c9973e] border border-[#c9973e]'
                  : 'text-[#f5f0e8]/60 hover:text-[#f5f0e8] border border-transparent'
              }`}
            >
              All ({vegCount + nonVegCount})
            </button>

            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                dietaryFilter === 'veg'
                  ? 'bg-[#142012] text-[#86efac] border border-[#4ade80]'
                  : 'text-[#f5f0e8]/60 hover:text-[#86efac] border border-transparent'
              }`}
            >
              <Leaf className="w-3 h-3 text-[#4ade80]" />
              Vegetarian ({vegCount})
            </button>

            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                dietaryFilter === 'non-veg'
                  ? 'bg-[#20100a] text-[#fdba74] border border-[#f97316]'
                  : 'text-[#f5f0e8]/60 hover:text-[#fdba74] border border-transparent'
              }`}
            >
              <Flame className="w-3 h-3 text-[#f97316]" />
              Non-Veg ({nonVegCount})
            </button>
          </div>

          {/* Country / Cuisine Origin Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] font-semibold flex items-center gap-1 mr-1">
              <Globe className="w-3 h-3" /> Origin:
            </span>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#1a120b] text-[#f5f0e8] border border-[#3a2816] focus:border-[#c9973e] px-3 py-1.5 text-xs rounded-xs outline-none cursor-pointer"
            >
              <option value="all">🌍 All Countries & Origins</option>
              {availableCountries.map(({ country, flag }) => (
                <option key={country} value={country}>
                  {flag} {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Note */}
        <div className="mb-8 text-xs sm:text-sm text-[#c9973e] italic font-serif tracking-wide flex items-center space-x-2">
          <span>—</span>
          <span>{categories.find((c) => c.id === activeCategory)?.note}</span>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-[#3a2816] rounded-sm bg-[#120c07] space-y-3">
            <p className="text-lg font-serif italic text-[#f5f0e8]/70">
              No dishes found matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setDietaryFilter('all');
                setSelectedCountry('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#c9973e] text-[#0d0905] text-[11px] font-semibold uppercase tracking-[0.18em] rounded-sm cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${dietaryFilter}-${selectedCountry}-${searchQuery}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-4"
            >
              {filteredItems.map((item: MenuItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group py-5 px-4 rounded-sm border-b border-[#3a2816] bg-[#0d0905] hover:bg-[#150e09]/70 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Name, Badges, Price */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <h3
                            className="text-xl sm:text-2xl font-light text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {item.name}
                          </h3>

                          {/* Veg vs Non-Veg Badge */}
                          {item.dietaryType === 'veg' ? (
                            <span
                              className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 bg-[#142012] border border-[#2a4d22] text-[#86efac] rounded-xs font-semibold"
                              title="Vegetarian Dish"
                            >
                              <Leaf className="w-2.5 h-2.5 text-[#4ade80]" />
                              Veg
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 bg-[#20100a] border border-[#522915] text-[#fdba74] rounded-xs font-semibold"
                              title="Non-Vegetarian Dish"
                            >
                              <Flame className="w-2.5 h-2.5 text-[#f97316]" />
                              Non-Veg
                            </span>
                          )}

                          {/* Highlight Tag */}
                          {item.highlight && (
                            <span className="text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 border border-[#c9973e]/50 text-[#c9973e] rounded-xs font-sans">
                              {item.highlight}
                            </span>
                          )}
                        </div>

                        {/* Country & Region Heritage */}
                        <div className="flex items-center gap-1.5 text-xs text-[#c9973e] font-serif italic">
                          <span>{item.countryFlag || '🌍'}</span>
                          <span>
                            {item.region ? `${item.region}, ` : ''}{item.country}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <span
                        className="text-lg sm:text-xl font-normal italic text-[#c9973e] whitespace-nowrap pt-0.5"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-[#f5f0e8]/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Sommelier Pairing & Dietary Tags */}
                  {(item.pairing || item.dietary) && (
                    <div className="mt-3.5 pt-2 border-t border-[#3a2816]/60 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                      {item.pairing ? (
                        <div className="flex items-center space-x-1.5 text-[#c9973e]/90 font-serif italic text-xs">
                          <Wine className="w-3 h-3 text-[#c9973e] inline shrink-0" />
                          <span>Pairing: {item.pairing}</span>
                        </div>
                      ) : (
                        <div />
                      )}

                      {item.dietary && (
                        <div className="flex items-center space-x-1.5">
                          {item.dietary.map((d) => (
                            <span
                              key={d}
                              className="text-[9px] px-1.5 py-0.5 bg-[#1a120b] border border-[#3a2816] text-[#f5f0e8]/65 uppercase font-mono rounded-xs"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Global Dual Tasting Menu Banner */}
        <div className="mt-20 p-8 sm:p-12 border border-[#3a2816] bg-[#120c07] rounded-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973e] font-semibold block">
              PARALLEL GLOBAL TASTINGS
            </span>
            <h4
              className="text-2xl sm:text-3xl font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Omnivore & Pure Vegetarian Seven-Course Experiences
            </h4>
            <p className="text-xs sm:text-sm text-[#f5f0e8]/75 font-light leading-relaxed">
              We offer two parallel degustation journeys crafted nightly by Executive Chef Marcus: the <strong className="text-[#fdba74]">Global Hearth Prime Tour</strong> (featuring A5 Wagyu, Argentine Asado & Brittany Oysters) and the <strong className="text-[#86efac]">Global Botanical Earth Tour</strong> (featuring Tandoori Paneer, Oaxacan Mole Cauliflower & Kyoto Binchotan mushrooms). $195 per guest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              to="/#reservations"
              className="text-center px-6 py-3.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 rounded-sm font-semibold shadow-md shadow-[#c9973e]/20"
            >
              Book Tasting Experience
            </Link>
            <Link
              to="/#private-dining"
              className="text-center px-6 py-3.5 border border-[#c9973e] text-[#c9973e] hover:bg-[#c9973e]/10 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 rounded-sm font-medium"
            >
              Inquire Custom Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
