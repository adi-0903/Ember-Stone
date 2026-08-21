import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Flame,
  Wine,
  Leaf,
  ZoomIn,
  X,
  Compass,
  UtensilsCrossed,
  Award
} from 'lucide-react';

export interface GalleryDish {
  id: string;
  name: string;
  category: 'hearth' | 'raw' | 'earth' | 'dessert' | 'cellar';
  categoryLabel: string;
  country: string;
  flag: string;
  region: string;
  price: string;
  dietaryType: 'veg' | 'non-veg';
  dietaryBadges: string[];
  description: string;
  sommelierPairing: string;
  woodType: string;
  aspect: 'tall' | 'wide' | 'square' | 'portrait';
  imageUrl: string;
  photographerCredit: string;
}

export const SIGNATURE_GALLERY_DISHES: GalleryDish[] = [
  {
    id: 'gal-1',
    name: '40-Day Dry-Aged Prime Ribeye',
    category: 'hearth',
    categoryLabel: 'Prime Hearth Cuts',
    country: 'USA',
    flag: '🇺🇸',
    region: 'Midwest Heritage Cattle',
    price: '$78',
    dietaryType: 'non-veg',
    dietaryBadges: ['Prime Cut', '30-Day Aged', 'GF'],
    description: 'White oak-grilled over roaring open hearth embers, finished with roasted bone marrow butter and caramelized roasted garlic jus.',
    sommelierPairing: 'Château Pichon Baron 2016 (Pauillac, Bordeaux)',
    woodType: 'White Oak & Hickory',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Ember Hearth Atelier',
  },
  {
    id: 'gal-2',
    name: 'A5 Miyazaki Wagyu on Ishiyaki Stone',
    category: 'hearth',
    categoryLabel: 'Prime Hearth Cuts',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'Kagoshima Prefecture',
    price: '$125',
    dietaryType: 'non-veg',
    dietaryBadges: ['BMS 11+', 'A5 Certified', 'GF'],
    description: 'Sizzled live on hot volcanic lava stone with freshly grated Shizuoka wasabi root, smoked black salt crystals, and aged tare reduction.',
    sommelierPairing: 'Hakutsuru Nishiki Junmai Daiginjo Sake',
    woodType: 'Binchotan Charcoal',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Kyoto Charcoal Archives',
  },
  {
    id: 'gal-3',
    name: 'Handmade Black Truffle Tagliolini',
    category: 'earth',
    categoryLabel: 'Handmade & Earth',
    country: 'Italy',
    flag: '🇮🇹',
    region: 'Piedmont & Norcia',
    price: '$48',
    dietaryType: 'veg',
    dietaryBadges: ['Vegetarian', 'Fresh Pasta', 'Black Truffle'],
    description: '30-egg yolk hand-rolled pasta ribbons coated in a velvety 36-month Parmigiano-Reggiano emulsion with shaved Umbrian black winter truffles.',
    sommelierPairing: 'Barolo DOCG 2018 (Piedmont, Italy)',
    woodType: 'Embers Warming',
    aspect: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Piedmont Truffle Guild',
  },
  {
    id: 'gal-4',
    name: 'Tandoori Truffle Burrata & Kulcha',
    category: 'earth',
    categoryLabel: 'Handmade & Earth',
    country: 'India & Italy',
    flag: '🇮🇳',
    region: 'Punjab & Puglia Fusion',
    price: '$24',
    dietaryType: 'veg',
    dietaryBadges: ['Vegetarian', 'Clay Oven', 'Signature'],
    description: 'Clay-oven charred spiced heirloom tomatoes paired with fresh pugliese burrata, cold-pressed fenugreek honey reduction, and blistered garlic naan.',
    sommelierPairing: 'Viognier 2021 / Spiced Botanical Gin',
    woodType: 'Applewood Clay Hearth',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Delhi Hearth Workshop',
  },
  {
    id: 'gal-5',
    name: 'Peruvian Hamachi Tiradito',
    category: 'raw',
    categoryLabel: 'Raw Bar & Crudos',
    country: 'Peru',
    flag: '🇵🇪',
    region: 'Pacific Coast, Lima',
    price: '$26',
    dietaryType: 'non-veg',
    dietaryBadges: ['Raw Bar', 'GF', 'Sashimi Grade'],
    description: 'Sashimi-grade Pacific yellowtail laced with smoked aji amarillo leche de tigre, charred sweet potato cloud, and crispy Andean choclo corn.',
    sommelierPairing: 'Albariño de Rías Baixas 2022',
    woodType: 'Cold Smoked Smokehouse',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Pacific Coast Fishery',
  },
  {
    id: 'gal-6',
    name: 'Whole Wood-Roasted Cauliflower Mole',
    category: 'earth',
    categoryLabel: 'Handmade & Earth',
    country: 'Mexico',
    flag: '🇲🇽',
    region: 'Oaxaca Valley',
    price: '$42',
    dietaryType: 'veg',
    dietaryBadges: ['Vegetarian', 'Vegan Option', 'GF'],
    description: 'Slow hearth-roasted Romanesco cauliflower crowned with a rich 28-ingredient Oaxacan dark chocolate mole, toasted sesame, and pomegranate seeds.',
    sommelierPairing: 'Oaxacan Artisanal Mezcal Joven',
    woodType: 'Mesquite & Cherrywood',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Oaxacan Culinary Arts',
  },
  {
    id: 'gal-7',
    name: 'Brittany Oysters on the Half Shell',
    category: 'raw',
    categoryLabel: 'Raw Bar & Crudos',
    country: 'France',
    flag: '🇫🇷',
    region: 'Brittany Coastline',
    price: '$22',
    dietaryType: 'non-veg',
    dietaryBadges: ['Raw Bar', 'GF', 'Ocean Fresh'],
    description: 'Six freshly shucked pristine Brittany oysters with crisp Champagne mignonette, micro-planed fresh horseradish, and Meyer lemon vapor.',
    sommelierPairing: 'Veuve Clicquot Brut Reserve',
    woodType: 'Chilled Ocean Ice',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Brittany Tidal Guild',
  },
  {
    id: 'gal-8',
    name: 'Smoked Woodfire Cocktail Alchemy',
    category: 'cellar',
    categoryLabel: 'Drinks & Cellar',
    country: 'Global',
    flag: '🥃',
    region: 'Cellar Reserve Bar',
    price: '$22',
    dietaryType: 'veg',
    dietaryBadges: ['Craft Mixology', 'Wood-Smoked'],
    description: '12-year bourbon infused with toasted walnut bitters, burnt orange peel, and hickory cloud trapped under hand-blown crystal cloche.',
    sommelierPairing: 'House Signature Smoked Pour',
    woodType: 'Hickory Planks',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Backbar Mixology Studio',
  },
  {
    id: 'gal-9',
    name: 'Valrhona Dark Chocolate Soufflé',
    category: 'dessert',
    categoryLabel: 'Desserts & Finishes',
    country: 'France',
    flag: '🇫🇷',
    region: 'Rhône Valley Chocolate',
    price: '$18',
    dietaryType: 'veg',
    dietaryBadges: ['Vegetarian', 'Baked to Order'],
    description: '70% Guanaja single-origin chocolate soufflé served with hearth-smoked Madagascar vanilla bean cream and gold leaf flakes.',
    sommelierPairing: 'Taylor Fladgate 20-Year Tawny Port',
    woodType: 'Wood Oven Bake',
    aspect: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Parisian Patisserie Studio',
  },
  {
    id: 'gal-10',
    name: 'Charred Binchotan Yakitori Skewers',
    category: 'hearth',
    categoryLabel: 'Prime Hearth Cuts',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'Kyoto Old Quarter',
    price: '$28',
    dietaryType: 'non-veg',
    dietaryBadges: ['Charcoal Grill', 'House Glaze'],
    description: 'Hand-skewered Jidori chicken thighs glazed with 15-year master tare sauce, scallion hearts, and fresh sansho pepper dust.',
    sommelierPairing: 'Echigo Koshihikari Craft Rice Beer',
    woodType: 'Wakayama Binchotan',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Kyoto Street Smoke',
  },
  {
    id: 'gal-11',
    name: 'Artisanal Hearth Sourdough & Cultured Butter',
    category: 'earth',
    categoryLabel: 'Handmade & Earth',
    country: 'France & USA',
    flag: '🥖',
    region: 'Naturally Fermented',
    price: '$14',
    dietaryType: 'veg',
    dietaryBadges: ['Vegetarian', 'Heritage Grain', 'House Starter'],
    description: 'Wood-fired crispy country loaf baked with 10-year sourdough starter, served warm with smoked sea-salt churned Normandy butter.',
    sommelierPairing: 'Crémant d’Alsace Brut',
    woodType: 'Red Oak Hearth',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Artisan Bakery Guild',
  },
  {
    id: 'gal-12',
    name: 'Kashmiri Saffron Kulfi Glacée',
    category: 'dessert',
    categoryLabel: 'Desserts & Finishes',
    country: 'India',
    flag: '🇮🇳',
    region: 'Pampore Saffron Valley',
    price: '$16',
    dietaryType: 'veg',
    dietaryBadges: ['Vegetarian', 'Pampore Saffron', 'GF'],
    description: 'Slow-simmered rich milk cream infused with highest-grade Kashmiri Mongra saffron, roasted pistachios, edible silver vark, and cardamom crisp.',
    sommelierPairing: 'Royal Tokaji 5 Puttonyos Aszú',
    woodType: 'Chilled Hearth Finish',
    aspect: 'tall',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1400&q=85',
    photographerCredit: 'Kashmiri Spice Vault',
  },
];

type GalleryFilter = 'all' | 'hearth' | 'raw' | 'earth' | 'dessert' | 'cellar';

export default function MenuMasonryGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [selectedDish, setSelectedDish] = useState<GalleryDish | null>(null);

  const filterTabs: { id: GalleryFilter; label: string; icon: any }[] = [
    { id: 'all', label: 'All Creations (12)', icon: Sparkles },
    { id: 'hearth', label: 'Hearth & Charcoal', icon: Flame },
    { id: 'raw', label: 'Raw Bar & Crudos', icon: Compass },
    { id: 'earth', label: 'Handmade & Earth', icon: Leaf },
    { id: 'dessert', label: 'Desserts & Finishes', icon: UtensilsCrossed },
    { id: 'cellar', label: 'Drinks & Cellar', icon: Wine },
  ];

  const displayedDishes = activeFilter === 'all'
    ? SIGNATURE_GALLERY_DISHES
    : SIGNATURE_GALLERY_DISHES.filter((d) => d.category === activeFilter);

  return (
    <section className="mt-28 pt-20 border-t border-[#3a2816]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c9973e]/40 bg-[#1a120b] text-[#c9973e] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-[#d4a044]" />
            <span>VISUAL CULINARY ARCHIVE</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#f5f0e8] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            The Hearth Gallery
          </h2>
          <p className="mt-3 text-sm text-[#f5f0e8]/70 max-w-2xl font-light leading-relaxed">
            A photographic anthology of our wood-fired creations, raw bar crudos, hand-rolled pastas, and cellar vintages. Tap any card to examine the provenance, pairing, and tasting profile.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xs text-[11px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#c9973e] text-[#0d0905] font-bold shadow-md shadow-[#c9973e]/20 border border-[#c9973e]'
                    : 'bg-[#120c07] text-[#f5f0e8]/65 border border-[#3a2816] hover:border-[#c9973e]/60 hover:text-[#f5f0e8]'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-[#0d0905]' : 'text-[#c9973e]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence>
          {displayedDishes.map((dish, index) => (
            <motion.div
              layout
              key={dish.id}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.6,
                delay: (index % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setSelectedDish(dish)}
              className="break-inside-avoid group relative rounded-sm overflow-hidden border border-[#3a2816] bg-[#120c07] hover:border-[#c9973e] transition-all duration-500 shadow-xl cursor-pointer"
            >
              {/* Image Container with Aspect Ratio styling */}
              <div
                className={`relative w-full overflow-hidden bg-[#0a0604] ${
                  dish.aspect === 'tall'
                    ? 'h-[440px]'
                    : dish.aspect === 'portrait'
                    ? 'h-[360px]'
                    : 'h-[280px]'
                }`}
              >
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-108 group-hover:brightness-100 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0905] via-[#0d0905]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Top Badges: Country Flag & Dietary Type */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#0d0905]/80 backdrop-blur-md border border-[#3a2816] text-[#f5f0e8] text-[10.5px] font-serif italic shadow-md">
                    <span>{dish.flag}</span>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#d4a044]">
                      {dish.country}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {dish.dietaryType === 'veg' ? (
                      <span className="px-2 py-0.5 rounded-xs bg-[#142012]/90 backdrop-blur-md border border-[#2a4d22] text-[#86efac] text-[9px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1">
                        <Leaf className="w-2.5 h-2.5 text-[#4ade80]" />
                        Veg
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-xs bg-[#20100a]/90 backdrop-blur-md border border-[#522915] text-[#fdba74] text-[9px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 text-[#f97316]" />
                        Non-Veg
                      </span>
                    )}
                  </div>
                </div>

                {/* Zoom hover indicator pill */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0905]/90 backdrop-blur-md border border-[#c9973e] text-[#c9973e] text-[11px] font-mono uppercase tracking-widest shadow-2xl">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Provenance</span>
                  </div>
                </div>
              </div>

              {/* Dish Meta Content */}
              <div className="p-5 border-t border-[#3a2816]/70 bg-gradient-to-b from-[#120c07] to-[#0d0905]">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3
                    className="text-xl font-light text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {dish.name}
                  </h3>
                  <span
                    className="text-lg font-normal italic text-[#c9973e] whitespace-nowrap"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {dish.price}
                  </span>
                </div>

                <p className="text-xs text-[#f5f0e8]/70 font-light line-clamp-2 leading-relaxed mb-3">
                  {dish.description}
                </p>

                {/* Footer Badges & Wood Type */}
                <div className="pt-3 border-t border-[#3a2816]/50 flex items-center justify-between text-[10.5px]">
                  <div className="flex items-center gap-1 text-[#c9973e] font-mono text-[9px] uppercase tracking-wider">
                    <Flame className="w-2.5 h-2.5 text-[#f97316]" />
                    <span>{dish.woodType}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#f5f0e8]/50 font-serif italic">
                    <Wine className="w-2.5 h-2.5 text-[#c9973e]" />
                    <span className="truncate max-w-[140px]">{dish.sommelierPairing.split('(')[0]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Modal View */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
            className="fixed inset-0 z-[10001] bg-black/85 backdrop-blur-md p-4 sm:p-8 md:p-12 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0e0a06] border border-[#c9973e]/50 rounded-sm overflow-hidden shadow-2xl shadow-black my-auto grid grid-cols-1 md:grid-cols-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/75 border border-[#3a2816] text-[#f5f0e8] hover:text-[#c9973e] hover:border-[#c9973e] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dish preview"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="relative h-72 md:h-full min-h-[320px] bg-black">
                <img
                  src={selectedDish.imageUrl}
                  alt={selectedDish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a06] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0e0a06]" />
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#f5f0e8]/50 tracking-widest uppercase">
                  Photo: {selectedDish.photographerCredit}
                </div>
              </div>

              {/* Modal Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Category & Origin */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#c9973e] font-semibold px-2 py-0.5 bg-[#1a120b] border border-[#3a2816] rounded-xs">
                      {selectedDish.categoryLabel}
                    </span>
                    <span className="text-xs text-[#f5f0e8]/75 font-serif italic">
                      {selectedDish.flag} {selectedDish.region}, {selectedDish.country}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-light text-[#f5f0e8] leading-snug"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {selectedDish.name}
                    </h3>
                    <div className="text-xl font-serif italic text-[#c9973e] mt-1">
                      {selectedDish.price}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedDish.dietaryType === 'veg' ? (
                      <span className="px-2 py-0.5 rounded-xs bg-[#142012] border border-[#2a4d22] text-[#86efac] text-[9.5px] font-mono uppercase font-semibold flex items-center gap-1">
                        <Leaf className="w-2.5 h-2.5 text-[#4ade80]" /> Vegetarian
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-xs bg-[#20100a] border border-[#522915] text-[#fdba74] text-[9.5px] font-mono uppercase font-semibold flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 text-[#f97316]" /> Non-Vegetarian
                      </span>
                    )}

                    {selectedDish.dietaryBadges.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded-xs bg-[#1a120b] border border-[#3a2816] text-[#f5f0e8]/70 text-[9.5px] font-mono uppercase"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#f5f0e8]/80 font-light leading-relaxed pt-2">
                    {selectedDish.description}
                  </p>

                  {/* Gastronomic Notes */}
                  <div className="space-y-2 pt-3 border-t border-[#3a2816]">
                    <div className="flex items-start gap-2 text-xs">
                      <Flame className="w-3.5 h-3.5 text-[#f97316] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#f5f0e8]/50 uppercase font-mono text-[9.5px] block">Hearth Smoke & Wood:</span>
                        <span className="text-[#f5f0e8] font-light">{selectedDish.woodType}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs">
                      <Wine className="w-3.5 h-3.5 text-[#c9973e] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#f5f0e8]/50 uppercase font-mono text-[9.5px] block">Sommelier Reserve Pairing:</span>
                        <span className="text-[#c9973e] font-serif italic">{selectedDish.sommelierPairing}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-[#3a2816] flex items-center justify-between gap-3">
                  <span className="text-[10px] text-[#f5f0e8]/50 uppercase font-mono">
                    Cooked Daily Over Live Fire
                  </span>
                  <a
                    href="/#reservations"
                    onClick={() => setSelectedDish(null)}
                    className="px-4 py-2 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] text-[10.5px] font-bold uppercase tracking-wider rounded-xs transition-colors"
                  >
                    Reserve Table to Taste
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
