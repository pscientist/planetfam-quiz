// Question interface
// Round 1 - Original questions
const round1Questions = [
    {
        id: 1,
        image: "../assets/images/countries/nz.webp",
        options: ["Sweden", "New Zealand", "UK", "USA"],
        answer: "New Zealand",
        slug: "nz",
    },
    {
        id: 2,
        image: "../assets/images/countries/ethiopia.webp",
        options: ["Ethiopia", "Philippines", "Japan", "China"],
        answer: "Ethiopia",
        slug: "ethiopia",
    },

];

// Round 2 - New questions using remaining countries
const round2Questions = [
    {
        id: 9,
        image: "../assets/images/countries/germany.webp",
        options: ["Germany", "Austria", "Netherlands", "Belgium"],
        answer: "Germany",
        slug: "germany",
    },
    {
        id: 10,
        image: "../assets/images/countries/netherlands.webp",
        options: ["Belgium", "Netherlands", "Denmark", "Germany"],
        answer: "Netherlands",
        slug: "netherlands",
    },

];

// Export both rounds and legacy questions for backward compatibility
const questions = round1Questions; // Keep original export for backward compatibility

export { round1Questions, round2Questions };
export default questions;   
];

// Round 3 - Test questions
const round3Questions: Question[] = [
    {
        id: 17,
        image: "../assets/images/countries/japan_lunch_optimized.webp",
        options: ["Korea", "Japan", "China", "Thailand"],
        answer: "Japan",
        slug: "japan",
    },
    {
        id: 18,
        image: "../assets/images/countries/usa.webp",
        options: ["Canada", "USA", "Mexico", "Australia"],
        answer: "USA",
        slug: "usa",
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