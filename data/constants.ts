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

// Country facts: 2 landmarks + 3 dinner dishes per country slug
export const countryFacts: { [key: string]: string } = {
    spain: "Landmarks: Sagrada Familia: Famous Barcelona cathedral with Gaudí towers. Dishes: Paella: Valencia rice dish with seafood and saffron. Gazpacho: Andalusian cold tomato soup with vegetables.Tortilla Española: Spanish potato and egg omelette.",
    france: "Landmarks: Eiffel Tower: Famous iron tower in Paris. Dishes: Crossiants",
    russia: "Landmarks: Red Square: Famous historic square in Moscow. Hermitage Museum: World-famous art museum in St. Petersburg. Dishes: Borscht: Traditional beetroot soup with sour cream. Beef Stroganoff: Russian beef strips in sour cream sauce. Pelmeni: Russian meat dumplings in broth.",
    ethiopia: "Landmarks: Lalibela Churches: Ancient rock-hewn churches in Ethiopia. Simien Mountains: Dramatic mountain range with unique wildlife. Dishes: Injera (with Doro Wat): Ethiopian flatbread with spicy chicken stew. Kitfo: Ethiopian raw beef with spices. Tibs: Ethiopian sautéed meat with vegetables.",
    nz: "Landmarks: Milford Sound: Spectacular New Zealand fjord with waterfalls. Sky Tower: Tallest building in Auckland, New Zealand. Dishes: Hangi: Maori earth oven cooked meal. Pavlova: New Zealand meringue dessert with fruit. Fish and Chips: Classic New Zealand battered fish with chips.",
    philippines: "Landmarks: Banaue Rice Terraces: Ancient mountain rice terraces in Philippines. Boracay Beach: Famous white sand beach in Philippines. Dishes: Adobo: Filipino meat stew with soy sauce. Lechón: Filipino whole roasted suckling pig. Sinigang: Filipino sour soup with tamarind.",
    png: "Landmarks: Kokoda Trail: Historic WWII trail in Papua New Guinea. Mount Wilhelm: Highest mountain in Papua New Guinea. Dishes: Mumu: Traditional PNG earth oven cooking method. Sago: PNG staple starch from palm trees. Kokoda (fish dish): PNG fish dish with coconut cream.",
    sweden: "Landmarks: Vasa Museum: Stockholm museum with 17th century warship. Ice Hotel: Swedish hotel made of ice. Dishes: Swedish Meatballs: Swedish meatballs in cream sauce. Gravlax: Swedish cured salmon with dill. Janssons Frestelse: Swedish potato and anchovy casserole.",
    germany: "Landmarks: Brandenburg Gate: Famous Berlin gate and German symbol. Neuschwanstein Castle: Famous fairy tale castle in Bavaria. Dishes: Sauerbraten: German slow-cooked marinated beef roast. Schnitzel: German breaded and fried meat cutlet. Bratwurst: Traditional German grilled pork sausage.",
    uk: "Landmarks: Big Ben: Famous London clock tower bell. Stonehenge: Ancient stone circle monument in England. Dishes: Fish and Chips: Classic British battered fish with fries. Shepherd's Pie: British meat pie with mashed potatoes. Bangers and Mash: British sausages with mashed potatoes.",
    usa: "Landmarks: Statue of Liberty: Famous New York harbor welcoming statue. Grand Canyon: Massive Arizona desert canyon landmark. Dishes: BBQ Ribs: American slow-smoked pork ribs. Mac and Cheese: American creamy pasta with cheese. Apple Pie: Classic American dessert with apples.",
    japan: "Landmarks: Mount Fuji: Japan's highest and sacred mountain. Fushimi Inari Shrine: Kyoto shrine with orange torii gates. Dishes: Sushi: Japanese vinegared rice with seafood. Ramen: Japanese noodle soup with broth. Tempura: Japanese deep-fried battered seafood and vegetables.",
    china: "Landmarks: Great Wall: Ancient defensive wall across northern China. Forbidden City: Imperial palace complex in Beijing, China. Dishes: Peking Duck: Famous Beijing crispy roasted duck. Dim Sum: Chinese steamed dumplings and small dishes. Kung Pao Chicken: Chinese spicy chicken with peanuts.",
    india: "Landmarks: Taj Mahal: Famous white marble mausoleum in Agra. Red Fort: Historic fort complex in Delhi. Dishes: Butter Chicken: Indian creamy tomato chicken curry. Biryani: Indian spiced rice with meat. Masala Dosa: Indian crispy crepe with potato filling.",
    australia: "Landmarks: Sydney Opera House: Iconic Sydney harbor performing arts venue. Uluru: Sacred red rock formation in desert. Dishes: Meat Pie: Australian meat pie with gravy. Barramundi: Australian native freshwater fish with lemon. Chicken Parmigiana: Australian breaded chicken with tomato sauce.",
    mongolia: "Landmarks: Erdene Zuu Monastery: Ancient Buddhist monastery in Karakorum, Mongolia. Gobi Desert: Vast desert landscape in southern Mongolia. Dishes: Buuz: Mongolian steamed meat dumplings with onions. Khorkhog: Mongolian hot stone cooked meat. Bansh: Mongolian fried meat filled pastries.",
    norway: "Landmarks: Geirangerfjord: Spectacular Norwegian fjord with steep cliffs. North Cape: Northernmost point of mainland Europe. Dishes: Fårikål: Norwegian lamb and cabbage simmered stew. Lutefisk: Norwegian dried and lye-treated cod. Reindeer Steak: Norwegian reindeer meat with herbs.",
    iceland: "Landmarks: Blue Lagoon: Famous geothermal spa with silica mud. Gullfoss: Powerful two-tier Icelandic waterfall. Dishes: Lamb Soup: Traditional Icelandic lamb soup with root vegetables. Plokkfiskur: Icelandic fish and potato mashed stew. Skyr: Icelandic yogurt-like cultured dairy product.",
    finland: "Landmarks: Suomenlinna: Historic sea fortress near Helsinki, Finland. Santa Claus Village: Christmas-themed village in Rovaniemi, Lapland. Dishes: Karjalanpiirakka: Finnish Karelian rye pies with filling. Salmon Soup: Finnish creamy salmon soup with vegetables. Sautéed Reindeer: Finnish reindeer meat sautéed with sauce.",
    netherlands: "Landmarks: Anne Frank House: Historic Amsterdam house and Holocaust museum. Keukenhof Gardens: Famous Dutch tulip and flower gardens. Dishes: Stamppot: Dutch mashed potatoes with kale and carrots. Bitterballen: Dutch deep-fried meat ragout balls. Erwtensoep: Dutch thick pea soup with sausage.",
    switzerland: "Landmarks: Matterhorn: Iconic triangular Alpine mountain peak. Jungfraujoch: High-altitude Swiss railway station with views. Dishes: Fondue: Swiss melted cheese dip with bread. Rösti: Swiss crispy fried potato pancake. Raclette: Swiss melted cheese scraped onto potatoes.",
    taiwan: "Landmarks: Taipei 101: Former world's tallest building in Taipei. Taroko Gorge: Spectacular marble gorge with hiking trails. Dishes: Beef Noodle Soup: Taiwanese beef noodle soup with tendon. Gua Bao: Taiwanese braised pork sandwich buns. Oyster Omelet: Taiwanese oyster and egg pancake.",
    hk: "Landmarks: Victoria Peak: Scenic Hong Kong mountain with city views. Tian Tan Buddha: Large bronze Buddha statue in Hong Kong. Dishes: Dim Sum: Chinese steamed dumplings and small dishes. Char Siu: Chinese barbecued pork with sweet sauce. Egg Tarts: Portuguese-style custard tarts from Hong Kong.",
    malaysia: "Landmarks: Petronas Towers: Iconic twin skyscrapers in Kuala Lumpur. Batu Caves: Hindu temple cave complex in Malaysia. Dishes: Nasi Lemak: Malaysian coconut rice with sambal. Rendang: Malaysian slow-cooked beef curry with coconut. Laksa: Malaysian noodle soup with curry.",
    laos: "Landmarks: Luang Prabang: UNESCO World Heritage city in Laos. Wat Phou: Ancient Khmer temple complex in Laos. Dishes: Larb: Laotian minced meat salad with herbs. Or Lam: Laotian beef stew with vegetables. Sticky Rice: Laotian steamed glutinous rice staple.",
    afghanistan: "Landmarks: Band-e-Amir: Afghanistan's first national park with lakes. Minaret of Jam: Ancient brick minaret in Afghanistan. Dishes: Kabuli Pulao: Afghan rice dish with lamb and carrots. Mantu: Afghan steamed dumplings with meat. Qabili Palaw: Afghan rice with lamb and raisins.",
    colombia: "Landmarks: Cartagena Old City: Historic colonial walled city in Colombia. Cocora Valley: Colombian valley with tall wax palms. Dishes: Bandeja Paisa: Colombian plate with beans and meats. Ajiaco: Colombian chicken soup with corn. Sancocho: Colombian meat and root vegetable stew.",
    uzbekistan: "Landmarks: Registan Square: Historic square with ancient madrasas in Samarkand. Itchan Kala: Ancient walled city in Khiva, Uzbekistan. Dishes: Plov: Uzbek rice dish with meat and carrots. Lagman: Uzbek hand-pulled noodles with meat. Samsa: Uzbek baked pastries with meat filling.",
    srilanka: "Landmarks: Sigiriya Rock: Ancient rock fortress in Sri Lanka. Temple of the Tooth: Buddhist temple with sacred relic. Dishes: Rice and Curry: Sri Lankan rice with various curries. Hoppers: Sri Lankan bowl-shaped rice pancakes with egg. Kottu Roti: Sri Lankan chopped roti with vegetables.",
    south_sudan: "Landmarks: Boma National Park: South Sudan's national park with wildlife. White Nile: Major river flowing through South Sudan. Dishes: Asida: South Sudanese traditional millet porridge. Ful Medames: South Sudanese fava bean stew with spices. Kisra: South Sudanese fermented sorghum flatbread.",
    saudi_arabia: "Landmarks: Masjid al-Haram: Grand mosque in Mecca, Saudi Arabia. Mada'in Salih: Ancient Nabataean rock-cut city in Saudi. Dishes: Kabsa: Saudi Arabian spiced rice with meat. Mandi: Saudi Arabian slow-cooked meat with rice. Mutabbaq: Saudi Arabian layered pancake with cheese."
};


