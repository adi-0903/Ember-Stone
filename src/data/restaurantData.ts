import { MenuItem, Testimonial } from '../types';

export const RESTAURANT_INFO = {
  name: 'EMBER & STONE',
  tagline: 'Where Fire Meets Finesse',
  subline: 'A global wood-fired culinary theater built on craft, international heritage, and reverence for the ingredient.',
  est: 'EST. 2019 — CHICAGO, IL',
  address: '742 W Randolph Street, Chicago, IL 60661',
  phone: '+1 312 555 0182',
  email: 'info@emberandstone.com',
  hours: [
    { days: 'Monday – Thursday', times: '5:00 PM – 10:00 PM' },
    { days: 'Friday – Saturday', times: '5:00 PM – 11:00 PM' },
    { days: 'Sunday', times: '5:00 PM – 9:00 PM' },
    { note: 'Global Cellar & Hearth Lounge opens daily at 4:30 PM' }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // ==================== STARTERS ====================
  // Non-Veg Starters
  {
    id: 's1',
    category: 'starters',
    dietaryType: 'non-veg',
    name: 'Wagyu Beef Tartare',
    country: 'Japan',
    region: 'Miyazaki',
    countryFlag: '🇯🇵',
    description: 'Hand-cut A5 Miyazaki wagyu, cured organic egg yolk, black truffle shavings, yuzu kosho, grissini',
    price: '$28',
    highlight: 'Chef Choice',
    dietary: ['A5 Wagyu', 'Raw'],
    pairing: 'Junmai Daiginjo Sake'
  },
  {
    id: 's2',
    category: 'starters',
    dietaryType: 'non-veg',
    name: 'Oysters on the Half Shell',
    country: 'France',
    region: 'Brittany',
    countryFlag: '🇫🇷',
    description: 'Six Pacific oysters, champagne mignonette, hand-grated fresh horseradish, lemon verbena mist',
    price: '$22',
    dietary: ['GF', 'Raw'],
    pairing: 'Veuve Clicquot Brut'
  },
  {
    id: 's3',
    category: 'starters',
    dietaryType: 'non-veg',
    name: 'Seared Duck Foie Gras',
    country: 'France',
    region: 'Gascony',
    countryFlag: '🇫🇷',
    description: 'Toasted artisanal brioche, sour Michigan cherry compote, candied walnut, 25-year aged Modena balsamic',
    price: '$32',
    highlight: 'French Classic'
  },
  {
    id: 's4',
    category: 'starters',
    dietaryType: 'non-veg',
    name: 'Ibérico Ham & Pan con Tomate',
    country: 'Spain',
    region: 'Jabugo',
    countryFlag: '🇪🇸',
    description: '48-month acorn-fed Jamón Ibérico de Bellota, charred hearth crystal bread, grated heirloom tomatoes, Arbequina olive oil',
    price: '$34',
    highlight: 'Heritage Cured',
    pairing: 'Rioja Reserva'
  },
  {
    id: 's5',
    category: 'starters',
    dietaryType: 'non-veg',
    name: 'Peruvian Hamachi Tiradito',
    country: 'Peru',
    region: 'Lima',
    countryFlag: '🇵🇪',
    description: 'Sashimi-grade yellowtail, smoked aji amarillo leche de tigre, charred sweet potato foam, crispy choclo corn',
    price: '$26',
    dietary: ['GF', 'Raw']
  },
  {
    id: 's6',
    category: 'starters',
    dietaryType: 'non-veg',
    name: 'Bone Marrow Custard',
    country: 'USA',
    region: 'Chicago',
    countryFlag: '🇺🇸',
    description: 'Roasted beef marrow, brioche soldiers, micro herbs, hand-harvested Brittany fleur de sel',
    price: '$18',
    highlight: 'House Specialty'
  },

  // Vegetarian Starters
  {
    id: 's7',
    category: 'starters',
    dietaryType: 'veg',
    name: 'Tandoori Truffle Burrata',
    country: 'India',
    region: 'Punjab & Puglia',
    countryFlag: '🇮🇳',
    description: 'Clay-oven charred spiced heirloom tomatoes, Pugliese burrata, fenugreek honey reduction, garlic butter naan crisps',
    price: '$24',
    highlight: 'Signature Fusion',
    dietary: ['Vegetarian']
  },
  {
    id: 's8',
    category: 'starters',
    dietaryType: 'veg',
    name: 'Charred Maitake & King Oyster Yakitori',
    country: 'Japan',
    region: 'Kyoto',
    countryFlag: '🇯🇵',
    description: 'Binchotan charcoal-grilled wild forest mushrooms, tare glaze, sansho pepper, whipped smoked tofu purée',
    price: '$20',
    highlight: 'Vegetarian',
    dietary: ['Vegetarian', 'Vegan option']
  },
  {
    id: 's9',
    category: 'starters',
    dietaryType: 'veg',
    name: 'Oaxacan Charred Avocado Tartare',
    country: 'Mexico',
    region: 'Oaxaca',
    countryFlag: '🇲🇽',
    description: 'Hearth-smoked Hass avocados, pickled shallots, pumpkin seed salsa macha, smoked cotija, blue corn tostadas',
    price: '$19',
    dietary: ['Vegetarian', 'GF']
  },
  {
    id: 's10',
    category: 'starters',
    dietaryType: 'veg',
    name: 'Smoked Stracciatella & Fig Carpaccio',
    country: 'Italy',
    region: 'Modena',
    countryFlag: '🇮🇹',
    description: 'Black Mission figs grilled over embers, fresh buffalo stracciatella, aged balsamic glaze, toasted pine nuts',
    price: '$22',
    dietary: ['Vegetarian', 'GF']
  },
  {
    id: 's11',
    category: 'starters',
    dietaryType: 'veg',
    name: 'Hearth-Roasted Beetroot Carpaccio',
    country: 'Greece',
    region: 'Crete',
    countryFlag: '🇬🇷',
    description: 'Salt-crusted roasted golden & ruby beets, whipped sheep’s milk feta, pistachio dukkah, pomegranate molasses',
    price: '$18',
    dietary: ['Vegetarian', 'GF']
  },

  // ==================== MAINS ====================
  // Non-Veg Mains
  {
    id: 'm1',
    category: 'mains',
    dietaryType: 'non-veg',
    name: '40-Day Dry-Aged Ribeye (16oz)',
    country: 'USA',
    region: 'Midwest',
    countryFlag: '🇺🇸',
    description: 'White oak-grilled over open hearth embers, roasted bone marrow butter, caramelized garlic jus',
    price: '$78',
    highlight: 'Signature Cut',
    pairing: 'Château Pichon Baron 2016'
  },
  {
    id: 'm2',
    category: 'mains',
    dietaryType: 'non-veg',
    name: 'Tomahawk Asado Criollo (32oz)',
    country: 'Argentina',
    region: 'Pampas',
    countryFlag: '🇦🇷',
    description: 'Dry-aged 30 days in salt chamber, wood-charred over Quebracho wood, table-side live carving, trio of hand-pounded chimichurris',
    price: '$155',
    highlight: 'Showcase For Two',
    pairing: 'Catena Zapata Malbec Argentino'
  },
  {
    id: 'm3',
    category: 'mains',
    dietaryType: 'non-veg',
    name: 'A5 Wagyu Striploin (6oz)',
    country: 'Japan',
    region: 'Kagoshima',
    countryFlag: '🇯🇵',
    description: 'Sear-seared on hot Ishiyaki lava stone, fresh wasabi root, smoked volcanic black salt, tare jus',
    price: '$125',
    highlight: 'BMS 11+ Wagyu',
    pairing: 'Hakutsuru Nishiki Junmai'
  },
  {
    id: 'm4',
    category: 'mains',
    dietaryType: 'non-veg',
    name: 'Whole Roasted Duck & Cherry Gastrique',
    country: 'France',
    region: 'Canard de Challans',
    countryFlag: '🇫🇷',
    description: 'Crispy skin, sour cherry reduction, duck fat-roasted fingerling potatoes, braised Belgian endive',
    price: '$62',
    pairing: 'Burgundy Pinot Noir'
  },
  {
    id: 'm5',
    category: 'mains',
    dietaryType: 'non-veg',
    name: 'Pan-Seared Mediterranean Halibut',
    country: 'Italy',
    region: 'Amalfi',
    countryFlag: '🇮🇹',
    description: 'Wild halibut, champagne beurre blanc, saffron emulsion, charred baby leeks, crispy caperberries',
    price: '$54',
    dietary: ['Wild-Caught', 'GF'],
    pairing: 'Vermentino di Sardegna'
  },
  {
    id: 'm6',
    category: 'mains',
    dietaryType: 'non-veg',
    name: 'Korean Galbi Short Rib',
    country: 'South Korea',
    region: 'Seoul',
    countryFlag: '🇰🇷',
    description: 'Prime short rib slow-braised for 48 hours then glazed over charcoal, fermented garlic gochujang reduction, charred scallion kimchi, sesame perilla crisp',
    price: '$66',
    highlight: 'Chef Special'
  },

  // Vegetarian Mains
  {
    id: 'm7',
    category: 'mains',
    dietaryType: 'veg',
    name: 'Hearth-Roasted Paneer Tikka Steak',
    country: 'India',
    region: 'Old Delhi',
    countryFlag: '🇮🇳',
    description: 'Artisanal buffalo paneer marinated in saffron yogurt, woodfire-charred, smoked makhani velouté, pickled onion pearls, charred mint kulcha',
    price: '$46',
    highlight: 'Chef Masterwork',
    dietary: ['Vegetarian'],
    pairing: 'Viognier / Spiced Gin Tonic'
  },
  {
    id: 'm8',
    category: 'mains',
    dietaryType: 'veg',
    name: 'Handmade Black Truffle Tagliolini',
    country: 'Italy',
    region: 'Piedmont',
    countryFlag: '🇮🇹',
    description: '30-egg yolk pasta, 36-month aged Parmigiano-Reggiano emulsion, mountain butter, shaved fresh black Norcia truffles',
    price: '$48',
    highlight: 'Handmade Daily',
    dietary: ['Vegetarian'],
    pairing: 'Barolo DOCG 2018'
  },
  {
    id: 'm9',
    category: 'mains',
    dietaryType: 'veg',
    name: 'Whole Wood-Roasted Cauliflower Mole Negro',
    country: 'Mexico',
    region: 'Oaxaca',
    countryFlag: '🇲🇽',
    description: 'Slow hearth-roasted head of Romanesco cauliflower, 28-ingredient Oaxacan dark mole, toasted sesame, pomegranate arils, warm heritage corn tortillas',
    price: '$42',
    highlight: 'Wood-Fired',
    dietary: ['Vegetarian', 'GF', 'Vegan option'],
    pairing: 'Mezcal Joven / Smokey Zinfandel'
  },
  {
    id: 'm10',
    category: 'mains',
    dietaryType: 'veg',
    name: 'Charred Eggplant Miso Dengaku & Crispy Polenta',
    country: 'Japan',
    region: 'Kyoto',
    countryFlag: '🇯🇵',
    description: 'Japanese baby eggplants caramelized with sweet saikyo miso, smoked shishito peppers, crispy golden truffle polenta cake',
    price: '$44',
    dietary: ['Vegetarian', 'GF'],
    pairing: 'Dry Riesling'
  },
  {
    id: 'm11',
    category: 'mains',
    dietaryType: 'veg',
    name: 'Wild Morels & Porcini Risotto',
    country: 'France',
    region: 'Lyon',
    countryFlag: '🇫🇷',
    description: 'Acquerello carnaroli rice, foraged Michigan morels, porcini dust, black garlic confit, 24-month Comté cheese',
    price: '$46',
    dietary: ['Vegetarian', 'GF'],
    pairing: 'Chardonnay Bourgogne'
  },

  // ==================== DESSERTS ====================
  // Vegetarian Desserts
  {
    id: 'd1',
    category: 'desserts',
    dietaryType: 'veg',
    name: 'Valrhona Chocolate Fondant',
    country: 'France',
    region: 'Tain-l’Hermitage',
    countryFlag: '🇫🇷',
    description: 'Molten dark 70% Guanaja chocolate center, smoked Maldon salted caramel, Tahitian vanilla bean gelato',
    price: '$16',
    highlight: 'Signature Dessert',
    dietary: ['Vegetarian']
  },
  {
    id: 'd2',
    category: 'desserts',
    dietaryType: 'veg',
    name: 'Classic Madagascar Crème Brûlée',
    country: 'France',
    region: 'Paris',
    countryFlag: '🇫🇷',
    description: 'Bourbon vanilla bean custard, torch-caramelized turbinado crust, macerated wild forest berries',
    price: '$14',
    dietary: ['Vegetarian', 'GF']
  },
  {
    id: 'd3',
    category: 'desserts',
    dietaryType: 'veg',
    name: 'Ember Apple Tarte Tatin',
    country: 'France',
    region: 'Normandy',
    countryFlag: '🇫🇷',
    description: 'Caramelized Honeycrisp apples, 15-year Calvados reduction, Normandy crème fraîche, toasted almond flakes',
    price: '$15',
    dietary: ['Vegetarian']
  },
  {
    id: 'd4',
    category: 'desserts',
    dietaryType: 'veg',
    name: 'Smoked Saffron Pistachio Kulfi',
    country: 'India',
    region: 'Kashmir',
    countryFlag: '🇮🇳',
    description: 'Slow-simmered rich clotted milk infused with Kashmiri saffron, hand-pounded green pistachio brittle, silver leaf',
    price: '$16',
    highlight: 'Hearth Chilled',
    dietary: ['Vegetarian', 'GF']
  },
  {
    id: 'd5',
    category: 'desserts',
    dietaryType: 'veg',
    name: 'Artisanal Global Cheese Selection',
    country: 'International',
    region: 'Europe & USA',
    countryFlag: '🌍',
    description: 'Three chef-selected aged raw cheeses (Manchego, Roquefort, Pleasant Ridge Reserve), wildflower honeycomb, Spanish quince paste, walnut sourdough',
    price: '$22',
    dietary: ['Vegetarian']
  },
  {
    id: 'd6',
    category: 'desserts',
    dietaryType: 'veg',
    name: 'Matcha Charcoal Mille-Feuille',
    country: 'Japan',
    region: 'Uji',
    countryFlag: '🇯🇵',
    description: 'Crisp activated charcoal puff pastry, ceremonial Uji matcha mousse, yuzu curd, roasted black sesame praline',
    price: '$17',
    dietary: ['Vegetarian']
  },

  // ==================== DRINKS ====================
  {
    id: 'dr1',
    category: 'drinks',
    dietaryType: 'veg',
    name: 'Smoked Cherry Wood Old Fashioned',
    country: 'USA',
    region: 'Kentucky',
    countryFlag: '🇺🇸',
    description: "Maker's Mark 46 Bourbon, smoked Angostura bitters, burnt orange peel, Luxardo maraschino cherry, charred wood infusion",
    price: '$18',
    highlight: 'Hearth Smoked',
    dietary: ['Cocktail']
  },
  {
    id: 'dr2',
    category: 'drinks',
    dietaryType: 'veg',
    name: 'Charred Orange Ember Negroni',
    country: 'Italy',
    region: 'Florence',
    countryFlag: '🇮🇹',
    description: 'Mancino Secco Vermouth, Campari infused with charred blood orange, Sipsmith London Dry gin, black walnut bitters',
    price: '$19',
    dietary: ['Cocktail']
  },
  {
    id: 'dr3',
    category: 'drinks',
    dietaryType: 'veg',
    name: 'Oaxacan Mezcalita de Humo',
    country: 'Mexico',
    region: 'Oaxaca',
    countryFlag: '🇲🇽',
    description: 'Single-village artisanal Mezcal, fresh lime, agave nectar, charred habanero rim, smoked rosemary sprig',
    price: '$19',
    highlight: 'Agave Craft'
  },
  {
    id: 'dr4',
    category: 'drinks',
    dietaryType: 'veg',
    name: 'Tokyo Hibiki Highball',
    country: 'Japan',
    region: 'Yamazaki',
    countryFlag: '🇯🇵',
    description: 'Hibiki Japanese Harmony Whisky, hand-carved ice spear, ultra-carbonated soda, lemon essence',
    price: '$24',
    highlight: 'Rare Japanese Whisky'
  },
  {
    id: 'dr5',
    category: 'drinks',
    dietaryType: 'veg',
    name: 'Château Pichon Baron 2016',
    country: 'France',
    region: 'Pauillac, Bordeaux',
    countryFlag: '🇫🇷',
    description: 'Dense blackberry, cedar, graphite, velvety tannins, full-bodied classic structure',
    price: '$28 / glass',
    highlight: 'Grand Cru Reserve'
  },
  {
    id: 'dr6',
    category: 'drinks',
    dietaryType: 'veg',
    name: 'Catena Zapata Malbec Argentino',
    country: 'Argentina',
    region: 'Mendoza',
    countryFlag: '🇦🇷',
    description: 'High-altitude old vines, violet aroma, dark plum, French oak spice, robust finish',
    price: '$24 / glass'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "The dry-aged ribeye and the saffron-smoked paneer steak both proved that fire is a universal language. The best dining experience in this city — full stop.",
    author: "James R.",
    source: "Chicago Tribune Dining Column",
    rating: 5
  },
  {
    id: 't2',
    quote: "Ember & Stone walks the line between global reverence and approachability perfectly. Their vegetarian tasting menu was just as phenomenal as their Wagyu.",
    author: "Mariana V.",
    source: "Google Reviews",
    rating: 5
  },
  {
    id: 't3',
    quote: "We hosted our entire international board dinner here. Marcus crafted bespoke dishes spanning 6 countries tailored for both veg and non-veg guests flawlessly.",
    author: "Alicia W.",
    source: "Private Dining Guest",
    rating: 5
  }
];

export const CHEF_INFO = {
  label: "EXECUTIVE CHEF",
  name: "Marcus DeLeon",
  bio: "Chef Marcus has spent two decades in Michelin-starred kitchens across Paris, Tokyo, Copenhagen, and New York before bringing his global fire-forward philosophy to Chicago. At Ember & Stone, he curates wood-fired masterpieces honoring both heritage vegetarian traditions and primal dry-aged cuts.",
  quote: "“I cook the way the world eats — through the flame, without boundaries or apology.”",
  accolades: ["James Beard Nominee 2022", "Michelin Guide Selected", "Global Hearth Master"]
};
