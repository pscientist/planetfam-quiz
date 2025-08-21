// Round 1 - Original questions
// Order: Spain, Thailand, Russia, Ethiopia, New Zealand, Philippines, Papua New Guinea, Sweden
const round1Questions = [
    {
        id: 1,
        image: "../assets/images/countries/spain.webp",
        options: ["Spain", "UK", "Brazil", "USA"],
        answer: "Spain",
        slug: "spain",
    },
    {
        id: 2,
        image: "../assets/images/countries/thai.webp",
        options: ["Thailand", "Mongolia", "China", "Japan"],
        answer: "Thailand",
        slug: "thai",
    },
    {
        id: 3,
        image: "../assets/images/countries/russia.webp",
        options: ["Germany", "Mongolia", "Russia", "Sweden"],
        answer: "Russia",
        slug: "russia",
    },
    {
        id: 4,
        image: "../assets/images/countries/ethiopia.webp",
        options: ["Ethiopia", "Philippines", "Japan", "China"],
        answer: "Ethiopia",
        slug: "ethiopia",
    },
    {
        id: 5,
        image: "../assets/images/countries/nz.webp",
        options: ["Sweden", "New Zealand", "UK", "USA"],
        answer: "New Zealand",
        slug: "nz",
    },
    {
        id: 6,
        image: "../assets/images/countries/philippines.webp",
        options: ["Philippines", "Japan", "China", "India"],
        answer: "Philippines",
        slug: "philipines",
    },
    {
        id: 7,
        image: "../assets/images/countries/png.webp",
        options: ["Spain", "Papua New Guinea", "China", "Indonesia"],
        answer: "Papua New Guinea",
        slug: "png",
    },
    {
        id: 8,
        image: "../assets/images/countries/sweden.webp",
        options: ["Netherlands", "Sweden", "Russia", "UK"],
        answer: "Sweden",
        slug: "sweden",
    },
];

////////////////////////////////////////////////////////////

// Round 2
// Order: Germany, Netherlands, UK, Sri Lanka, Switzerland, Finland, Hong Kong, Saudi Arabia
const round2Questions = [
    {
        id: 9,
        image: "../assets/images/countries/germany.webp",
        options: ["Germany", "Canada", "Spain", "New Zealand"],
        answer: "Germany",
        slug: "germany",
    },
    {
        id: 10,
        image: "../assets/images/countries/netherlands.webp",
        options: ["Spain", "Korea", "USA", "Netherlands"],
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
        image: "../assets/images/countries/srilanka_optimized.webp",
        options: ["Indonesia", "Mexico", "UK", "Sri Lanka"],
        answer: "Sri Lanka",
        slug: "srilanka",
    },
    {
        id: 13,
        image: "../assets/images/countries/switzerland.webp",
        options: ["HK", "Switzerland", "Germany", "Canada"],
        answer: "Switzerland",
        slug: "switzerland",
    },
    {
        id: 14,
        image: "../assets/images/countries/finland.webp",
        options: ["Finland", "Italy", "USA", "UK"],
        answer: "Finland",
        slug: "finland",
    },
    {
        id: 15,
        image: "../assets/images/countries/india2_optimized.webp",
        options: ["Pakistan", "Indonesia", "Thailand", "India"],
        answer: "India",
        slug: "india",
    },
    {
        id: 16,
        image: "../assets/images/countries/saudi_optimized.webp",
        options: ["South Africa", "Egypt", "Israel", "Saudi Arabia"],
        answer: "Saudi Arabia",
        slug: "saudi",
    },
];

// Export both rounds and legacy questions for backward compatibility
const questions = round1Questions; // Keep original export for backward compatibility

export { round1Questions, round2Questions };
export default questions;   