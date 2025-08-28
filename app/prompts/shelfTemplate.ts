export function shelfPrompt({
    city,
    country = "China",
    language = "Chinese",
    style = "photo realistic",
}: {
    city: string;
    country?: string;
    language?: string;
    style?: "photo realistic" | "cartoon";
}) {
    return `PlanetFam Style Prompt — bright bold ${style} supermarket shelf, 9x16 vertical iPhone ratio, thin outline, gentle drop shadow.
A supermarket shelf in ${city} with ${country} food products.
Items: Shaoxing rice wine (2-3), soy sauce (2–3), lotus root (2–3), bitter melon (2–3), wonton wrappers (2–3), rice noodles (2–3), vacuum-packed duck necks (2–3), White Rabbit candy (2–3), green/jasmine tea tins (2–3), Tsingtao beer (2–3).
Labels in ${language} only.
No city name at the bottom.`;
}
