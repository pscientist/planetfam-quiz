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


