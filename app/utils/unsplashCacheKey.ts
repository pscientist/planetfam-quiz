export function unsplashCacheKey(country: string, portrait: boolean) {
    return `unsplash:${country}:${portrait ? "p" : "l"}`;
}


