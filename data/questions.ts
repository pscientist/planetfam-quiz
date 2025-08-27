import countriesManifest from '../assets/images/countries/countriesManifest';

// Question interface
interface Question {
    id: number;
    image: any;
    options: string[];
    answer: string;
    slug: string;
}

// Round 1 - Original questions
// Order: Spain, France, Russia, Ethiopia, New Zealand, Philippines, Papua New Guinea, Sweden
const round1Questions: Question[] = [
    {
        id: 1,
        image: countriesManifest.spain,
        options: ["Spain", "UK", "Brazil", "USA"],
        answer: "Spain",
        slug: "spain",
    },
    {
        id: 2,
        image: countriesManifest.france,
        options: ["France", "UK", "USA", "Germany"],
        answer: "France",
        slug: "france",
    },
    {
        id: 3,
        image: countriesManifest.russia,
        options: ["Germany", "Mongolia", "Russia", "Sweden"],
        answer: "Russia",
        slug: "russia",
    },
    {
        id: 4,
        image: countriesManifest.ethiopia,
        options: ["Ethiopia", "Philippines", "Japan", "China"],
        answer: "Ethiopia",
        slug: "ethiopia",
    },
    {
        id: 5,
        image: countriesManifest.nz,
        options: ["Sweden", "New Zealand", "UK", "USA"],
        answer: "New Zealand",
        slug: "nz",
    },
    {
        id: 6,
        image: countriesManifest.philipines,
        options: ["Philippines", "Japan", "China", "India"],
        answer: "Philippines",
        slug: "philipines",
    },
    {
        id: 7,
        image: countriesManifest.png,
        options: ["Spain", "Papua New Guinea", "China", "Indonesia"],
        answer: "Papua New Guinea",
        slug: "png",
    },
    {
        id: 8,
        image: countriesManifest.sweden,
        options: ["Netherlands", "Sweden", "Russia", "UK"],
        answer: "Sweden",
        slug: "sweden",
    },
];

// Round 2 
// Order: Germany, Netherlands, UK, Sri Lanka, Switzerland, Finland, India, Saudi Arabia
const round2Questions: Question[] = [
    {
        id: 9,
        image: countriesManifest.germany,
        options: ["Germany", "Canada", "Spain", "New Zealand"],
        answer: "Germany",
        slug: "germany",
    },
    {
        id: 10,
        image: countriesManifest.netherlands,
        options: ["Spain", "Korea", "USA", "Netherlands"],
        answer: "Netherlands",
        slug: "netherlands",
    },
    {
        id: 11,
        image: null, // UK not in manifest - needs to be added
        options: ["Ireland", "UK", "France", "Netherlands"],
        answer: "UK",
        slug: "uk",
    },
    {
        id: 12,
        image: countriesManifest.srilanka,
        options: ["Indonesia", "Mexico", "UK", "Sri Lanka"],
        answer: "Sri Lanka",
        slug: "srilanka",
    },
    {
        id: 13,
        image: countriesManifest.switzerland,
        options: ["HK", "Switzerland", "Germany", "Canada"],
        answer: "Switzerland",
        slug: "switzerland",
    },
    {
        id: 14,
        image: countriesManifest.finland,
        options: ["Finland", "Italy", "USA", "UK"],
        answer: "Finland",
        slug: "finland",
    },
    {
        id: 15,
        image: countriesManifest.india,
        options: ["Pakistan", "Indonesia", "Thailand", "India"],
        answer: "India",
        slug: "india",
    },
    {
        id: 16,
        image: countriesManifest.saudi,
        options: ["South Africa", "Egypt", "Israel", "Saudi Arabia"],
        answer: "Saudi Arabia",
        slug: "saudi",
    },


];

// Round 3 - New countries
const round3Questions: Question[] = [
    {
        id: 17,
        image: countriesManifest.mongolia,
        options: ["Mongolia", "Japan", "China", "Thailand"],
        answer: "Mongolia",
        slug: "mongolia",
    },
    {
        id: 18,
        image: countriesManifest.taiwan,
        options: ["Thailand", "Indonesia", "Colombia", "Taiwan"],
        answer: "Taiwan",
        slug: "taiwan",
    },
    {
        id: 19,
        image: countriesManifest.norway,
        options: ["USA", "Norway", "Netherlands", "Belgium"],
        answer: "Norway",
        slug: "norway",
    },
    {
        id: 20,
        image: countriesManifest.laos,
        options: ["Laos", "Argentina", "South Africa", "China"],
        answer: "Laos",
        slug: "laos",
    },
    {
        id: 21,
        image: countriesManifest.nz_maori,
        options: ["Indonesia", "New Zealand Maori", "China", "Samoa"],
        answer: "New Zealand Maori",
        slug: "nz_maori",
    },
    {
        id: 22,
        image: countriesManifest.uzbekistan,
        options: ["Zimbabwe", "Uzbekistan", "Russia", "China"],
        answer: "Uzbekistan",
        slug: "uzbekistan",
    },
    {
        id: 23,
        image: countriesManifest.south_sudan,
        options: ["South Sudan", "Brazil", "Colombia", "Turkey"],
        answer: "South Sudan",
        slug: "south_sudan",
    },
    {
        id: 24,
        image: countriesManifest.colombia,
        options: ["Brazil", "South Africa", "Turkey", "Colombia"],
        answer: "Colombia",
        slug: "colombia",
    },

];

// Questions indexed by round number
const questionsByRound = {
    1: round1Questions,
    2: round2Questions,
    3: round3Questions,
};

// Helper function to get questions for a specific round
export const getQuestionsForRound = (round: number): Question[] => {
    return questionsByRound[round as keyof typeof questionsByRound] || [];
};

// Export individual rounds for backward compatibility
export { round1Questions, round2Questions, round3Questions };

// Export the indexed questions object
export { questionsByRound };

// Legacy export for backward compatibility
const questions = round1Questions;
export default questions;   