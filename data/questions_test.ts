// Question interface

interface Question {
    id: number,
    image: string,
    options: string[],
    answer: string,
    slug: string

}
// Round 1 - Original questions
const round1Questions: Question[] = [
    {
        id: 1,
        image: "../assets/images/countries/norway.webp",
        options: ["Norway", "New Zealand", "UK", "USA"],
        answer: "Norway",
        slug: "norway",
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
const round2Questions: Question[] = [
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

// Round 3 - Test questions
const round3Questions: Question[] = [
    {
        id: 17,
        image: "../assets/images/countries/taiwan.webp",
        options: ["Korea", "Japan", "China", "Taiwan"],
        answer: "Taiwan",
        slug: "taiwan",
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

