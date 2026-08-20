export interface CocktailItem {
  id: string;
  name: string;
  category: 'signature' | 'smoked' | 'zero-proof' | 'rare-spirits';
  flavorProfile: 'Smoky & Bold' | 'Bright & Citrusy' | 'Herbaceous & Crisp' | 'Rich & Decadent';
  price: string;
  spiritBase: string;
  ingredients: string[];
  description: string;
  garnish: string;
  glassware: string;
  iceType: string;
  ritualNote?: string;
  highlight?: string;
  abv?: string;
  image: string;
  tastingNotes: {
    smoke: number; // 0-100
    sweet: number;
    citrus: number;
    herbal: number;
    proof: number;
  };
}

export interface BarBiteItem {
  id: string;
  name: string;
  type: 'veg' | 'non-veg';
  price: string;
  origin: string;
  description: string;
  pairingCocktail: string;
  image: string;
  prepTime: string;
}

export interface RareSpiritItem {
  id: string;
  name: string;
  distillery: string;
  region: string;
  category: 'Single Malt Scotch' | 'Japanese Whisky' | 'Bourbon & Rye' | 'Artisanal Agave' | 'Aged Rum & Cognac';
  age: string;
  abv: string;
  price1oz: string;
  price2oz: string;
  caskType: string;
  description: string;
  nose: string;
  palate: string;
  finish: string;
  rarity: 'Vault Exclusive' | 'Allocated Batch' | 'Single Cask' | 'Rare Release';
  bottleColor: string; // for glowing liquid visual
}

export interface BarSeatArea {
  id: string;
  name: string;
  capacity: string;
  vibe: string;
  lighting: string;
  soundLevel: string;
  currentStatus: 'Walk-Ins Open' | 'Limited Stools' | 'Reservation Advised' | 'Full (Join Waitlist)';
  availableSpots: number;
  description: string;
  bestFor: string;
  image: string;
}

export const BAR_HERO_INFO = {
  title: 'THE HEARTH BAR',
  subheading: 'Cocktails Forged in Smoke, Ice & Shadow',
  description:
    'An intimate candlelit sanctuary where mixology is treated as wood-fired alchemy. Pull up a stool at the 18-seat solid walnut counter to witness hand-carved ice, tableside cherrywood smoking cloches, rare single-cask pours, and late-night culinary hearth bites.',
  hours: [
    { day: 'Monday – Thursday', time: '4:30 PM – 12:00 AM' },
    { day: 'Friday – Saturday', time: '4:30 PM – 2:00 AM' },
    { day: 'Sunday', time: '4:30 PM – 11:00 PM' },
  ],
  goldenHour: 'Daily Aperitivo Hour: 4:30 PM – 6:30 PM (Complimentary Marcona almonds & $14 bespoke wood-fire martinis)',
  walkInPolicy: '18 Walnut Bar Stools are permanently reserved for walk-ins without reservations. Velvet lounge booths available for reservation.',
};

export const BAR_COCKTAILS: CocktailItem[] = [
  {
    id: 'c1',
    name: 'Ember & Oak Old Fashioned No. 742',
    category: 'smoked',
    flavorProfile: 'Smoky & Bold',
    price: '$22',
    spiritBase: 'Ember Private-Select 10-Yr Bourbon',
    ingredients: [
      'Charred White Oak Bitters',
      'Smoked Demerara Nectar',
      'Flamed Orange Oils',
      'Luxardo Black Maraschino',
    ],
    description:
      'Infused tableside with hickory smoke under a crystal cloche. Rich notes of burnt caramel, vanilla bean, and charred barrel staves.',
    garnish: 'Burnt orange disc & brandied cherry',
    glassware: 'Hand-Cut Double Rocks Crystal',
    iceType: '2.5" Smoked White Oak Ice Sphere',
    ritualNote: 'Smoked tableside over 120-year-old salvaged bourbon barrel wood',
    highlight: 'House Signature',
    abv: '34% ABV',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 95, sweet: 45, citrus: 40, herbal: 30, proof: 85 },
  },
  {
    id: 'c2',
    name: 'Oaxacan Midnight Mezcalita',
    category: 'smoked',
    flavorProfile: 'Smoky & Bold',
    price: '$20',
    spiritBase: 'Vago Espadín Artisanal Mezcal',
    ingredients: [
      'Fresh Pressed Key Lime',
      'Charred Pineapple Cordial',
      'Ancho Reyes Chile Liqueur',
      'Volcanic Black Salt Rim',
    ],
    description:
      'Smoldering pine and roasted agave harmonize with tropical acidity and a gentle lingering heat from charred habanero smoke.',
    garnish: 'Dehydrated blood orange wheel & flaming rosemary sprig',
    glassware: 'Charred Clay Copita Tumbler',
    iceType: 'Hand-Chiseled Smoked Agave Block',
    ritualNote: 'Charred rosemary mist expressed tableside with torch',
    highlight: 'Guest Favorite',
    abv: '24% ABV',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 85, sweet: 40, citrus: 80, herbal: 50, proof: 70 },
  },
  {
    id: 'c3',
    name: 'Tokyo Hibiki & Yuzu Mist Highball',
    category: 'signature',
    flavorProfile: 'Bright & Citrusy',
    price: '$26',
    spiritBase: 'Hibiki Japanese Harmony Whisky',
    ingredients: [
      'Cold-Pressed Kochi Yuzu',
      'Ultra-Chilled Japanese Soda (5.2 vol CO2)',
      'Sudachi Citrus Peel Oils',
      'Clear Hand-Cut Ice Pillar',
    ],
    description:
      'Crisp, effervescent, and crystal-clear. Hand-carved ice sphere with ultra-dense carbonation unlocking floral honey and sandalwood.',
    garnish: 'Kochi Yuzu zest twist express',
    glassware: 'Ultra-Thin Kimura Highball Glass',
    iceType: '3-Day Crystal Clear Ice Column',
    ritualNote: 'Poured over single-origin artisanal ice column at 32°F',
    highlight: 'Japanese Craft',
    abv: '18% ABV',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 20, sweet: 35, citrus: 90, herbal: 65, proof: 50 },
  },
  {
    id: 'c4',
    name: 'Black Truffle & Bone-Washed Manhattan',
    category: 'signature',
    flavorProfile: 'Rich & Decadent',
    price: '$25',
    spiritBase: 'WhistlePig 10-Yr Small Batch Rye',
    ingredients: [
      'Roasted Bone Marrow-Washed Rye',
      'Carpano Antica Formula Vermouth',
      'Black Winter Truffle Tincture',
      'Aztec Chocolate Bitters',
    ],
    description:
      'Velvety mouthfeel created from slow marrow fat-washing, balanced by decadent Italian vermouth and earthy winter black truffles.',
    garnish: 'Black truffle sphere & 24k edible gold leaf',
    glassware: 'Vintage Nick & Nora Coupe',
    iceType: 'Stirred to 28°F, Served Up',
    ritualNote: '48-hour bone marrow washed spirit served in chilled vintage crystal',
    highlight: 'Chef’s Selection',
    abv: '32% ABV',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 60, sweet: 60, citrus: 15, herbal: 40, proof: 88 },
  },
  {
    id: 'c5',
    name: 'Charred Saffron & Cardamom Cloud',
    category: 'signature',
    flavorProfile: 'Herbaceous & Crisp',
    price: '$21',
    spiritBase: 'Monkey 47 Schwarzwald Dry Gin',
    ingredients: [
      'Kashmiri Saffron Syrup',
      'Clarified Lime Juice',
      'Green Cardamom Smoke',
      'Aquafaba Velvet Foam',
    ],
    description:
      'A golden, silky cocktail drawing inspiration from Old Delhi hearth spices, bright German botanicals, and delicate aromatic smoke.',
    garnish: 'Toasted saffron threads & cardamom mist',
    glassware: 'Gold-Rimmed Flute Coupe',
    iceType: 'Sub-Zero Shaken & Double Strained',
    ritualNote: 'Foamed with botanical eggless cloud & flame-torched cardamom pod',
    highlight: 'Botanical Masterpiece',
    abv: '22% ABV',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 45, sweet: 55, citrus: 70, herbal: 90, proof: 65 },
  },
  {
    id: 'c6',
    name: 'Campari & Charred Blood Orange Spritz',
    category: 'signature',
    flavorProfile: 'Bright & Citrusy',
    price: '$18',
    spiritBase: 'Mancino Secco Vermouth & Campari',
    ingredients: [
      'Prosecco Superiore Valdobbiadene DOCG',
      'Flame-Seared Blood Orange Cordial',
      'Fever-Tree Soda',
      'Castelvetrano Olive',
    ],
    description:
      'The definitive Italian aperitivo elevated with hearth-roasted citrus caramel and sparkling botanical brightness.',
    garnish: 'Charred citrus disc & emerald olive',
    glassware: 'Stemmed Aperitivo Goblet',
    iceType: 'Clear Mountain Ice Cubes',
    highlight: 'Aperitivo Hour Special',
    abv: '12% ABV',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 30, sweet: 50, citrus: 95, herbal: 70, proof: 35 },
  },
  {
    id: 'c7',
    name: 'Smoked Blood Orange & Rosemary Elixir',
    category: 'zero-proof',
    flavorProfile: 'Bright & Citrusy',
    price: '$14',
    spiritBase: 'Seedlip Grove 42 Distilled Botanical',
    ingredients: [
      'Charred Blood Orange Puree',
      'Wild Rosemary Smoked Water',
      'Agave Nectar',
      'Mediterranean Tonic',
    ],
    description:
      'Zero-proof craftsmanship with full sensory depth. Charred herb smoke, bright citrus zest, and sparkling bitter balance.',
    garnish: 'Torched rosemary spear',
    glassware: 'Heavy Crystal Tumbler',
    iceType: 'Directional Hand-Cut Diamond Cube',
    highlight: 'Zero-Proof Botanical',
    abv: '0.0% ABV',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 75, sweet: 45, citrus: 85, herbal: 80, proof: 0 },
  },
  {
    id: 'c8',
    name: 'Kyoto Yuzu & Shiso Sparkling Nectar',
    category: 'zero-proof',
    flavorProfile: 'Herbaceous & Crisp',
    price: '$14',
    spiritBase: 'Botanical Shiso & Green Tea Infusion',
    ingredients: [
      'Japanese Kochi Yuzu Juice',
      'Muddled Purple Shiso Leaves',
      'Ginger Blossom Syrup',
      'Chilled Mountain Club Soda',
    ],
    description:
      'Refreshing and aromatic, pairing the sharp acidity of Japanese yuzu with earthy floral shiso and a gentle spicy ginger finish.',
    garnish: 'Fresh purple shiso leaf & crystallized ginger',
    glassware: 'Tall Fluted Collins Glass',
    iceType: 'Spear Ice Crystal',
    highlight: 'Zero-Proof Botanical',
    abv: '0.0% ABV',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    tastingNotes: { smoke: 10, sweet: 40, citrus: 90, herbal: 95, proof: 0 },
  },
];

export const RARE_SPIRITS: RareSpiritItem[] = [
  {
    id: 'rs1',
    name: 'Lagavulin 16-Year Distillers Edition',
    distillery: 'Lagavulin Distillery',
    region: 'Islay, Scotland',
    category: 'Single Malt Scotch',
    age: '16 Years',
    abv: '43.0% ABV',
    price1oz: '$18',
    price2oz: '$32',
    caskType: 'Pedro Ximénez Sherry Wood Cask Finish',
    description: 'The pinnacle of peated Islay Scotch, balancing intense peat smoke with lush, sweet dark fruit from Pedro Ximénez wood.',
    nose: 'Intense peat smoke, roasted malt, dark raisins, sea brine.',
    palate: 'Sweet sultanas, bonfire embers, iodine, spiced mocha.',
    finish: 'Tremendously long, peat-rich with lingering dark chocolate.',
    rarity: 'Allocated Batch',
    bottleColor: '#d97706',
  },
  {
    id: 'rs2',
    name: 'Hibiki Japanese Harmony 21-Year Reserve',
    distillery: 'Suntory Yamazaki & Hakushu',
    region: 'Osaka & Mount Kaikomagatake, Japan',
    category: 'Japanese Whisky',
    age: '21 Years',
    abv: '43.0% ABV',
    price1oz: '$38',
    price2oz: '$68',
    caskType: 'Mizunara Japanese Oak & Sherry Butts',
    description: 'A sublime harmonious masterpiece blending rare grain and malt whiskies matured meticulously for over two decades.',
    nose: 'Cooked fruit, dried apricot, sandalwood, Japanese incense.',
    palate: 'Silky unctuous honey, candied orange peel, Mizunara spice.',
    finish: 'Profoundly elegant, hint of smoke and subtle oak tannin.',
    rarity: 'Vault Exclusive',
    bottleColor: '#f59e0b',
  },
  {
    id: 'rs3',
    name: 'WhistlePig Boss Hog IX: Siren’s Song',
    distillery: 'WhistlePig Farm',
    region: 'Shoreham, Vermont, USA',
    category: 'Bourbon & Rye',
    age: 'Single Barrel Straight Rye',
    abv: '52.8% ABV (Cask Strength)',
    price1oz: '$42',
    price2oz: '$75',
    caskType: 'Greek Fig Nectar & Tentura Barrel Finish',
    description: 'Double cask finished in artisanal Greek fig and cinnamon spirits, unleashing opulent dark rye spice and spiced fruit.',
    nose: 'Cardamom, dried Smyrna figs, clove, roasted walnut.',
    palate: 'Black pepper explosion, dark toffee, stewed plums, ginger.',
    finish: 'Warm hearth embers, baking spice, long velvet finish.',
    rarity: 'Single Cask',
    bottleColor: '#b45309',
  },
  {
    id: 'rs4',
    name: 'Clase Azul Mezcal San Luis Potosí',
    distillery: 'Clase Azul Spirits',
    region: 'Estación Ipiña, San Luis Potosí, Mexico',
    category: 'Artisanal Agave',
    age: 'Wild Papalote Agave',
    abv: '44.0% ABV',
    price1oz: '$32',
    price2oz: '$58',
    caskType: 'Slow Roasted in Masonry Ovens & Red Clay Stills',
    description: 'Handcrafted from wild agave grown in the deserts of Central Mexico. Housed in a handmade artisanal red ceramic decanter.',
    nose: 'Smoked cedar, orange blossom, fresh pine needles, chili pepper.',
    palate: 'Cooked agave nectar, roasted hazelnut, herbal grassiness, mineral.',
    finish: 'Silky and persistent with gentle campfire smoke.',
    rarity: 'Vault Exclusive',
    bottleColor: '#ea580c',
  },
  {
    id: 'rs5',
    name: 'Yamazaki 12-Year Single Malt',
    distillery: 'Yamazaki Distillery',
    region: 'Kyoto, Japan',
    category: 'Japanese Whisky',
    age: '12 Years',
    abv: '43.0% ABV',
    price1oz: '$22',
    price2oz: '$40',
    caskType: 'American, Spanish & Japanese Mizunara Oak',
    description: 'Japan’s premier single malt, renowned for its delicate cedar notes, sweet vanilla, and succulent soft tropical fruits.',
    nose: 'Peach, pineapple, grapefruit, clove, candied orange.',
    palate: 'Coconut, cranberry, red currant, butterscotch.',
    finish: 'Sweet ginger, cinnamon, long refined Mizunara oak.',
    rarity: 'Allocated Batch',
    bottleColor: '#f59e0b',
  },
  {
    id: 'rs6',
    name: 'Dictador 20-Year Icon Reserve Solera Rum',
    distillery: 'Destilería Colombiana',
    region: 'Cartagena, Colombia',
    category: 'Aged Rum & Cognac',
    age: '20 Years Solera',
    abv: '40.0% ABV',
    price1oz: '$16',
    price2oz: '$28',
    caskType: 'Ex-Bourbon & Port Wine Barrels',
    description: 'Distilled from virgin sugar cane honey and aged solera-style, boasting intense dark honey, vanilla, and roasted Colombian coffee.',
    nose: 'Rich caramel, vanilla, Colombian roasted coffee, charred oak.',
    palate: 'Velvety dark chocolate, maple syrup, toasted pecan.',
    finish: 'Complex, dry wood smoke, sweet tobacco leaf.',
    rarity: 'Rare Release',
    bottleColor: '#78350f',
  },
];

export const BAR_BITES: BarBiteItem[] = [
  {
    id: 'bb1',
    name: 'A5 Wagyu & Brioche Sliders (2pc)',
    type: 'non-veg',
    price: '$24',
    origin: 'Miyazaki, Japan',
    description: 'Seared A5 Wagyu patties, black garlic aioli, caramelized shallot jam, warm buttered milk brioche.',
    pairingCocktail: 'Ember & Oak Old Fashioned No. 742',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    prepTime: '8 mins',
  },
  {
    id: 'bb2',
    name: 'Hearth-Smoked Saffron Paneer Kulcha Bites',
    type: 'veg',
    price: '$16',
    origin: 'Old Delhi, India',
    description: 'Charred baby paneer cubes, saffron makhani reduction, mini tandoori kulcha crisps, pickled onions.',
    pairingCocktail: 'Charred Saffron & Cardamom Cloud',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    prepTime: '6 mins',
  },
  {
    id: 'bb3',
    name: 'Black Truffle & Smoked Sea Salt Popcorn',
    type: 'veg',
    price: '$12',
    origin: 'Norcia, Italy',
    description: 'Tossed in rendered brown butter, shaved Umbrian black truffles, and white oak-smoked sea salt crystals.',
    pairingCocktail: 'Tokyo Hibiki & Yuzu Mist Highball',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80',
    prepTime: '3 mins',
  },
  {
    id: 'bb4',
    name: 'Pacific Oysters with Champagne Verbena Mist (6pc)',
    type: 'non-veg',
    price: '$24',
    origin: 'Brittany, France',
    description: 'Shucked live to order, pink peppercorn mignonette, hand-grated fresh horseradish, lemon verbena spray.',
    pairingCocktail: 'Campari & Charred Blood Orange Spritz',
    image: 'https://images.unsplash.com/photo-1533745848184-3db07256e163?auto=format&fit=crop&w=800&q=80',
    prepTime: '5 mins',
  },
  {
    id: 'bb5',
    name: 'Cast Iron Wood-Fired Marcona Almonds & Olives',
    type: 'veg',
    price: '$11',
    origin: 'Andalusia, Spain',
    description: 'Warm rosemary-infused Castelvetrano & Kalamata olives, toasted Spanish Marcona almonds with smoked paprika.',
    pairingCocktail: 'Oaxacan Midnight Mezcalita',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    prepTime: '4 mins',
  },
];

export const BAR_SEAT_AREAS: BarSeatArea[] = [
  {
    id: 'counter',
    name: '18-Seat Solid Walnut Counter',
    capacity: '1 - 2 Guests per spot',
    vibe: 'High Energy Mixology Theater',
    lighting: '1800K Spotlit Warm Amber',
    soundLevel: 'Dynamic (Shakers & Conversation)',
    currentStatus: 'Walk-Ins Open',
    availableSpots: 4,
    description: 'Front-row view of the bartenders torching cloches, hand-carving crystal ice pillars, and shaking bespoke elixirs. Never requires reservation.',
    bestFor: 'Solo diners, cocktail connoisseurs, dates',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fireplace',
    name: 'The Hearthside Chesterfield Booths',
    capacity: '3 - 6 Guests',
    vibe: 'Intimate, Romantic & Warm',
    lighting: 'Direct Fireplace Glow & Candles',
    soundLevel: 'Mellow & Conversation-Friendly',
    currentStatus: 'Reservation Advised',
    availableSpots: 1,
    description: 'Plush tufted leather banquettes wrapped around roaring hickory hearth fire. Dedicated bottle service and tableside smoking rituals.',
    bestFor: 'Double dates, celebratory drinks, private conversation',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'vinyl',
    name: 'Analog Vinyl Listening Alcove',
    capacity: '2 - 4 Guests',
    vibe: 'Audiophile Sanctuary & Mid-Century',
    lighting: 'Low Filament Bulbs & Brass Sconces',
    soundLevel: 'Acoustically Tuned Hi-Fi',
    currentStatus: 'Walk-Ins Open',
    availableSpots: 2,
    description: 'Nestled next to the McIntosh tube amplifiers and vintage turntable setup. Browse vinyl sleeves while sipping rare single-cask pours.',
    bestFor: 'Music lovers, nightcaps, creative talks',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'omakase',
    name: 'The Secret Spirits Vault (Chef’s Nook)',
    capacity: '2 - 4 Guests (Private)',
    vibe: 'Exclusive Speakeasy Omakase',
    lighting: 'Backlit Bottle Display Glow',
    soundLevel: 'Whisper Quiet & Exclusive',
    currentStatus: 'Reservation Advised',
    availableSpots: 1,
    description: 'A hidden mahogany corner with our Head Mixologist guiding a 4-flight custom spirit and hearth cocktail pairing ritual.',
    bestFor: 'VIP anniversaries, spirits masterclass, ultra-premium experience',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
];

export const BAR_ATMOSPHERE = [
  {
    title: 'Hand-Carved Directional Ice',
    desc: 'Block-frozen for 72 hours and hand-shaped into crystal-clear spheres and columns to minimize dilution and maximize spirit clarity.',
  },
  {
    title: 'Wood-Fired Table Smoking',
    desc: 'Salvaged 120-year-old bourbon barrel staves and cherry hardwood torched tableside to perfume your glass.',
  },
  {
    title: 'Curated Vinyl & Low-Frequency Sound',
    desc: 'Analog vintage turntable spinning warm Japanese jazz, rare funk, and ambient dub from 8:00 PM nightly.',
  },
];

export const MIX_BASES = [
  { id: 'bourbon', name: '10-Yr Smoked Rye Whiskey', color: '#d97706', abv: '45% ABV', notes: 'Oak, Caramel, Warm Pepper' },
  { id: 'mezcal', name: 'Oaxacan Artisanal Mezcal', color: '#ea580c', abv: '46% ABV', notes: 'Wild Agave, Campfire Pine' },
  { id: 'gin', name: 'Kyoto Yuzu & Forest Gin', color: '#fef08a', abv: '43% ABV', notes: 'Juniper, Yuzu Peel, Sansho' },
  { id: 'rum', name: '12-Yr Dark Caribbean Rum', color: '#92400e', abv: '40% ABV', notes: 'Black Molasses, Vanilla, Cacao' },
  { id: 'zero', name: 'Distilled Botanical Elixir (0%)', color: '#86efac', abv: '0.0% ABV', notes: 'Rosemary, Blood Orange, Cardamom' },
];

export const MIX_HEARTH_SMOKES = [
  { id: 'cherrywood', name: 'Charred Cherrywood Cloche', icon: '🍒', desc: 'Sweet, fruity hardwood smoke with subtle vanilla aroma' },
  { id: 'rosemary', name: 'Torched Wild Rosemary', icon: '🌿', desc: 'Earthy, herbaceous flame mist expressed on the glass' },
  { id: 'cinnamon', name: 'Fire-Roasted Ceylon Cinnamon', icon: '🔥', desc: 'Warm holiday spice smoke with glowing red ember' },
  { id: 'cardamom', name: 'Toasted Cardamom Pod Fog', icon: '✨', desc: 'Exotic Indian spiced incense fog' },
];

export const MIX_ICES = [
  { id: 'diamond', name: '2.5" Hand-Carved Diamond Sphere', desc: 'Ultra-slow melt, crystal clarity' },
  { id: 'pillar', name: 'Dense Highball Crystal Pillar', desc: 'For effervescent sparkling drinks' },
  { id: 'smoked_cube', name: 'Charred Oak Smoked King Cube', desc: 'Releases oak tannin as it cools' },
  { id: 'frozen_coupe', name: 'Sub-Zero Chilled Nick & Nora (No Ice)', desc: 'Silky, ice-cold up pour' },
];

export const MIX_BITTERS = [
  { id: 'orange', name: 'Flame-Seared Blood Orange Bitters', color: '#f97316' },
  { id: 'truffle', name: 'Winter Black Truffle Tincture', color: '#451a03' },
  { id: 'saffron', name: 'Kashmiri Golden Saffron Cordial', color: '#eab308' },
  { id: 'demerara', name: 'White Oak Smoked Demerara Nectar', color: '#78350f' },
];
