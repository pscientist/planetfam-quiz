import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import type { UnsplashPhoto } from "../types/unsplash";
import { cacheImages } from "./imageCache";
import { unsplashCacheKey } from "./unsplashCacheKey";

const UNSPLASH_KEY = String(Constants.expoConfig?.extra?.unsplashKey || "");

export async function prefetchCountryImages(country: string, portrait = false) {
    if (!UNSPLASH_KEY) return;

    const orientation = portrait ? "portrait" : "landscape";
    const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(country)}&per_page=10&orientation=${orientation}`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    if (!res.ok) return;

    const data = await res.json();
    const results: UnsplashPhoto[] = (data?.results || [])
        .filter((p: UnsplashPhoto) => p.width >= (portrait ? 1080 : 1600))
        .slice(0, 5);

    if (!results.length) return;

    // Pre-cache list images (regular) and modal images (full)
    // cacheImages use the expo-file-system to store the images, 
    // and AsyncStorage to store the JSON meta data
    const regularMap = await cacheImages(results.map(p => p.urls.regular));
    const fullUrls = results.map(p => p.urls.full).filter(Boolean) as string[];
    const fullMap = await cacheImages(fullUrls);

    const withLocal = results.map((p) => ({
        ...p,
        localUri: regularMap[p.urls.regular] || p.urls.regular,
        ...(p.urls.full ? { localFullUri: fullMap[p.urls.full] || p.urls.full } : {}),
    }));

    const cacheKey = unsplashCacheKey(country, portrait);
    await AsyncStorage.setItem(cacheKey, JSON.stringify(withLocal));
}