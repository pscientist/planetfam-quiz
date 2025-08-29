export const FONT_FAMILY = "SpaceMono";

// Font options for flag emojis - try different ones to see how flags look
export const FLAG_FONT_OPTIONS = {
    system: undefined, // Uses system default emoji font
    notoColorEmoji: "Noto Color Emoji", // Google's emoji font
    appleColorEmoji: "Apple Color Emoji", // Apple's emoji font (iOS/macOS)
    segoeUIEmoji: "Segoe UI Emoji", // Microsoft's emoji font (Windows)
    twemojiMozilla: "Twemoji Mozilla", // Twitter's emoji style
};

// You can set which font to use for flags here
export const FLAG_FONT = FLAG_FONT_OPTIONS.appleColorEmoji;

// Combined country data with flag emojis and names
export const COUNTRIES: { [key: string]: { flag: string; name: string } } = {
    brazil: { flag: '🇧🇷', name: "Brazil" },
    colombia: { flag: '🇨🇴', name: "Colombia" },
    ethiopia: { flag: '🇪🇹', name: "Ethiopia" },
    finland: { flag: '🇫🇮', name: "Finland" },
    france: { flag: '🇫🇷', name: "France" },
    germany: { flag: '🇩🇪', name: "Germany" },
    hk: { flag: '🇭🇰', name: "Hong Kong" },
    iceland: { flag: '🇮🇸', name: "Iceland" },
    india: { flag: '🇮🇳', name: "India" },
    laos: { flag: '🇱🇦', name: "Laos" },
    malaysia: { flag: '🇲🇾', name: "Malaysia" },
    mongolia: { flag: '🇲🇳', name: "Mongolia" },
    netherlands: { flag: '🇳🇱', name: "Netherlands" },
    norway: { flag: '🇳🇴', name: "Norway" },
    nz: { flag: '🇳🇿', name: "New Zealand" },
    nz_maori: { flag: '🇳🇿', name: "New Zealand Maori" },
    philipines: { flag: '🇵🇭', name: "Philippines" },
    png: { flag: '🇵🇬', name: "Papua New Guinea" },
    russia: { flag: '🇷🇺', name: "Russia" },
    saudi: { flag: '🇸🇦', name: "Saudi Arabia" },
    south_sudan: { flag: '🇸🇸', name: "South Sudan" },
    spain: { flag: '🇪🇸', name: "Spain" },
    srilanka: { flag: '🇱🇰', name: "Sri Lanka" },
    sweden: { flag: '🇸🇪', name: "Sweden" },
    switzerland: { flag: '🇨🇭', name: "Switzerland" },
    taiwan: { flag: '🇹🇼', name: "Taiwan" },
    thai: { flag: '🇹🇭', name: "Thailand" },
    thailand: { flag: '🇹🇭', name: "Thailand" },
    turkey: { flag: '🇹🇷', name: "Turkey" },
    uk: { flag: '🇬🇧', name: "United Kingdom" },
    usa: { flag: '🇺🇸', name: "United States" },
    uzbekistan: { flag: '🇺🇿', name: "Uzbekistan" },
    vietnam: { flag: '🇻🇳', name: "Vietnam" },
    zambia: { flag: '🇿🇲', name: "Zambia" },
    zimbabwe: { flag: '🇿🇼', name: "Zimbabwe" },
};

// Helper functions for backward compatibility
export const FLAG_EMOJIS = Object.fromEntries(
    Object.entries(COUNTRIES).map(([key, value]) => [key, value.flag])
);

export const COUNTRY_NAMES = Object.fromEntries(
    Object.entries(COUNTRIES).map(([key, value]) => [key, value.name])
);

// Supermarket shelf types and data
export type Item = { name: string; description: string };
export type Shelf = { id: string; city: string; country?: string; image: any; items: Item[] };

export const SHELVES: Shelf[] = [
    {
        id: 'barcelona',
        city: 'Barcelona, Spain',
        country: 'spain',
        image: require('../assets/images/supermarket/barcelona.webp'),
        items: [
            { name: 'Jamón Ibérico slices', description: 'Premium dry-cured ham from acorn-fed pigs.' },
            { name: 'Manchego cheese wheels', description: 'Aged sheep milk cheese from La Mancha region.' },
            { name: 'Olive oil bottles', description: 'Extra virgin olive oil from Catalonian groves.' },
            { name: 'Saffron packets', description: 'Premium Spanish saffron threads for paella.' },
            { name: 'Marcona almonds', description: 'Sweet, buttery Spanish almonds.' },
            { name: 'Pimentón dulce', description: 'Sweet smoked paprika powder.' },
            { name: 'Turron bars', description: 'Traditional nougat candy with almonds and honey.' },
            { name: 'Cava bottles', description: 'Spanish sparkling wine from the region.' },
        ],
    },
    {
        id: 'beijing',
        city: 'Beijing, China',
        image: require('../assets/images/supermarket/beijing.webp'),
        items: [
            { name: 'Duck sauce jars', description: 'Sweet and savory sauce for Peking duck.' },
            { name: 'Jasmine tea boxes', description: 'Fragrant green tea leaves from Fujian province.' },
            { name: 'Soy sauce bottles', description: 'Dark, aged soy sauce for authentic flavoring.' },
            { name: 'Dried shiitake mushrooms', description: 'Premium mushrooms for traditional soups.' },
            { name: 'Rice wine bottles', description: 'Shaoxing cooking wine for marinades.' },
            { name: 'White pepper powder', description: 'Essential spice for Chinese cuisine.' },
            { name: 'Sesame oil bottles', description: 'Pure sesame oil for finishing dishes.' },
            { name: 'Moon cake boxes', description: 'Traditional pastries filled with lotus seed paste.' },
        ],
    },
    {
        id: 'colombo',
        city: 'Colombo, Sri Lanka',
        country: 'srilanka',
        image: require('../assets/images/supermarket/colombo.webp'),
        items: [
            { name: 'Ceylon tea packets', description: 'World-famous black tea from highland estates.' },
            { name: 'Coconut milk cans', description: 'Rich, creamy milk extracted from fresh coconuts.' },
            { name: 'Curry powder blends', description: 'Aromatic spice mixes for authentic curries.' },
            { name: 'Jaggery blocks', description: 'Unrefined palm sugar for desserts.' },
            { name: 'Rice flour bags', description: 'Fine flour for making hoppers and string hoppers.' },
            { name: 'Cardamom pods', description: 'Fragrant green cardamom for tea and sweets.' },
            { name: 'Dried fish packets', description: 'Maldive fish flakes for umami flavoring.' },
            { name: 'Kithul treacle bottles', description: 'Golden syrup tapped from kithul palm trees.' },
        ],
    },
    {
        id: 'frankfurt',
        city: 'Frankfurt, Germany',
        country: 'germany',
        image: require('../assets/images/supermarket/frankfurt.webp'),
        items: [
            { name: 'Bratwurst packages', description: 'Traditional German pork sausages.' },
            { name: 'Sauerkraut jars', description: 'Fermented cabbage, a German staple.' },
            { name: 'German mustard tubes', description: 'Coarse-grain mustard for sausages.' },
            { name: 'Black bread loaves', description: 'Dense, dark rye bread with seeds.' },
            { name: 'Beer bottles', description: 'Local Frankfurt brewery pilsner.' },
            { name: 'Spätzle packets', description: 'Fresh egg noodles from southwestern Germany.' },
            { name: 'Apple wine bottles', description: 'Frankfurt\'s signature alcoholic cider.' },
            { name: 'Lebkuchen cookies', description: 'Spiced gingerbread cookies with icing.' },
        ],
    },
    {
        id: 'hawaii',
        city: 'Hawaii, USA',
        country: 'usa',
        image: require('../assets/images/supermarket/hawaii.webp'),
        items: [
            { name: 'Poke bowls', description: 'Fresh ahi tuna cubes with seaweed and rice.' },
            { name: 'Macadamia nuts', description: 'Locally grown buttery nuts from Big Island.' },
            { name: 'Poi packets', description: 'Traditional taro root paste, a Hawaiian staple.' },
            { name: 'Spam cans', description: 'Popular canned meat for musubi and fried rice.' },
            { name: 'Coconut water bottles', description: 'Fresh coconut water from local farms.' },
            { name: 'Pineapple chunks', description: 'Sweet, juicy pineapple from Maui plantations.' },
            { name: 'Haupia mix', description: 'Coconut pudding dessert powder.' },
            { name: 'Kalua pig packages', description: 'Slow-cooked shredded pork, Hawaiian style.' },
        ],
    },
    {
        id: 'london',
        city: 'London, United Kingdom',
        country: 'uk',
        image: require('../assets/images/supermarket/london.webp'),
        items: [
            { name: 'Earl Grey tea boxes', description: 'Classic English breakfast tea with bergamot.' },
            { name: 'Digestive biscuits', description: 'Whole wheat biscuits perfect for tea time.' },
            { name: 'Bangers packages', description: 'Traditional British pork sausages.' },
            { name: 'Marmite jars', description: 'Yeast extract spread, a British favorite.' },
            { name: 'Cheddar cheese blocks', description: 'Sharp, aged English cheddar cheese.' },
            { name: 'HP Brown Sauce', description: 'Tangy sauce for full English breakfast.' },
            { name: 'Spotted dick pudding', description: 'Traditional steamed pudding with currants.' },
            { name: 'Fish & chips batter', description: 'Ready-mix batter for crispy fish coating.' },
        ],
    },
    {
        id: 'miami',
        city: 'Miami, USA',
        country: 'usa',
        image: require('../assets/images/supermarket/miami.webp'),
        items: [
            { name: 'Cuban bread loaves', description: 'Soft white loaves with a thin, crisp crust.' },
            { name: 'Pastelitos', description: 'Flaky pastries with guava and cream cheese.' },
            { name: 'Cafecito coffee packs', description: 'Dark, strong Cuban espresso for stovetop brewers.' },
            { name: 'Florida oranges', description: 'Sweet, juicy citrus from local groves.' },
            { name: 'Key lime pie slices', description: 'Tart, creamy slices made with Florida key limes.' },
            { name: 'Plantain chips bags', description: 'Crisp, lightly salted plantain chips.' },
            { name: 'Black beans cans', description: 'A staple for Cuban rice-and-beans dishes.' },
            { name: 'Mojo marinade bottles', description: 'Citrus-garlic marinade for pork and grilled meats.' },
        ],
    },
    {
        id: 'paris',
        city: 'Paris, France',
        country: 'france',
        image: require('../assets/images/supermarket/paris.webp'),
        items: [
            { name: 'Baguette bread', description: 'Classic French bread with crispy crust.' },
            { name: 'Camembert cheese wheels', description: 'Creamy, soft-ripened cheese from Normandy.' },
            { name: 'Macarons boxes', description: 'Delicate almond cookies in various flavors.' },
            { name: 'Pâté containers', description: 'Rich, smooth liver pâté for appetizers.' },
            { name: 'French wine bottles', description: 'Bordeaux red wine from renowned vineyards.' },
            { name: 'Croissant packages', description: 'Buttery, flaky pastries for breakfast.' },
            { name: 'Crème fraîche tubs', description: 'Thick, tangy cream for cooking and desserts.' },
            { name: 'Escargot cans', description: 'Prepared snails in garlic herb butter.' },
        ],
    },
    {
        id: 'singapore',
        city: 'Singapore',
        image: require('../assets/images/supermarket/singapore.webp'),
        items: [
            { name: 'Laksa paste jars', description: 'Spicy coconut curry base for noodle soup.' },
            { name: 'Kaya jam jars', description: 'Sweet coconut and egg jam for toast.' },
            { name: 'Hainanese chicken rice', description: 'Pre-seasoned rice for the national dish.' },
            { name: 'Chili crab sauce', description: 'Sweet and spicy sauce for seafood.' },
            { name: 'Pandan leaves', description: 'Fragrant leaves for coloring and flavoring desserts.' },
            { name: 'Satay spice mix', description: 'Aromatic spice blend for grilled meat skewers.' },
            { name: 'Bak kwa packages', description: 'Sweet barbecued pork jerky snacks.' },
            { name: 'Durian candy', description: 'Chewy candy made from the "king of fruits".' },
        ],
    },
    {
        id: 'taipei',
        city: 'Taipei, Taiwan',
        country: 'taiwan',
        image: require('../assets/images/supermarket/taipei.webp'),
        items: [
            { name: 'Bubble tea pearls', description: 'Chewy tapioca balls for Taiwan\'s famous drink.' },
            { name: 'Oolong tea leaves', description: 'Premium high-mountain oolong from Alishan.' },
            { name: 'Beef noodle soup base', description: 'Rich, spiced broth concentrate.' },
            { name: 'Pineapple cakes', description: 'Traditional pastries filled with pineapple jam.' },
            { name: 'Stinky tofu packages', description: 'Fermented tofu, a beloved street food.' },
            { name: 'Night market sausages', description: 'Sweet and savory Taiwanese sausages.' },
            { name: 'Scallion pancake mix', description: 'Flour mix for crispy green onion pancakes.' },
            { name: 'Brown sugar syrup', description: 'Caramelized sugar for bubble tea and desserts.' },
        ],
    },
    {
        id: 'vienna',
        city: 'Vienna, Austria',
        image: require('../assets/images/supermarket/vienna.webp'),
        items: [
            { name: 'Sachertorte slices', description: 'Famous chocolate cake with apricot jam.' },
            { name: 'Wiener schnitzel cutlets', description: 'Breaded veal cutlets, a Viennese specialty.' },
            { name: 'Apple strudel pastry', description: 'Thin pastry filled with spiced apples.' },
            { name: 'Mozart chocolate balls', description: 'Marzipan and nougat covered in dark chocolate.' },
            { name: 'Coffee beans', description: 'Premium beans for traditional Viennese coffee.' },
            { name: 'Goulash spice mix', description: 'Paprika-based seasoning for hearty stews.' },
            { name: 'Semmelknödel mix', description: 'Bread dumpling mix for traditional sides.' },
            { name: 'Elderflower syrup', description: 'Floral syrup for drinks and desserts.' },
        ],
    },
];


