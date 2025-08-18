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
    {
        id: 3,
        image: "../assets/images/countries/png.webp",
        options: ["Spain", "Papua New Guinea", "China", "Indonesia"],
        answer: "Papua New Guinea",
        slug: "png",
    },
    {
        id: 4,
        image: "../assets/images/countries/russia.webp",
        options: ["Germany", "Mongolia", "Russia", "Sweden"],
        answer: "Russia",
        slug: "russia",
    },
    {
        id: 5,
        image: "../assets/images/countries/philippines.webp",
        options: ["Philippines", "Japan", "China", "India"],
        answer: "Philippines",
        slug: "philipines",
    },
    {
        id: 6,
        image: "../assets/images/countries/spain.webp",
        options: ["Spain", "UK", "Brazil", "USA"],
        answer: "Spain",
        slug: "spain",
    },
    {
        id: 7,
        image: "../assets/images/countries/thai.webp",
        options: ["Thailand", "Mongolia", "China", "Japan"],
        answer: "Thailand",
        slug: "thai",
    },
    {
        id: 8,
        image: "../assets/images/countries/sweden.webp",
        options: ["Netherlands", "Sweden", "Russia", "UK"],
        answer: "Sweden",
        slug: "sweden",
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
    {
        id: 11,
        image: "../assets/images/countries/uk.webp",
        options: ["Ireland", "UK", "France", "Netherlands"],
        answer: "UK",
        slug: "uk",
    },
    {
        id: 12,
        image: "../assets/images/countries/usa.webp",
        options: ["Canada", "USA", "Mexico", "UK"],
        answer: "USA",
        slug: "usa",
    },
    {
        id: 13,
        image: "../assets/images/countries/swizerland.webp",
        options: ["Austria", "Switzerland", "Germany", "France"],
        answer: "Switzerland",
        slug: "swizerland",
    },
    {
        id: 14,
        image: "../assets/images/countries/finland_optimized_reduced.webp",
        options: ["Norway", "Finland", "Sweden", "Denmark"],
        answer: "Finland",
        slug: "finland",
    },
    {
        id: 15,
        image: "../assets/images/countries/hk.webp",
        options: ["Singapore", "Hong Kong", "Taiwan", "South Korea"],
        answer: "Hong Kong",
        slug: "hk",
    },
    {
        id: 16,
        image: "../assets/images/countries/colombia_optimized_reduced.webp",
        options: ["Venezuela", "Colombia", "Ecuador", "Peru"],
        answer: "Colombia",
        slug: "colombia",
    },
];

// Export both rounds and legacy questions for backward compatibility
const questions = round1Questions; // Keep original export for backward compatibility

export { round1Questions, round2Questions };
export default questions;   