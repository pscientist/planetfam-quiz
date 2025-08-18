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