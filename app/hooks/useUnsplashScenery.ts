import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import type { UnsplashPhoto } from "../types/unsplash";
import { prefetchCountryImages } from "../utils/prefetchCountryImages";
import { unsplashCacheKey } from "../utils/unsplashCacheKey";

type CachedUnsplashPhoto = UnsplashPhoto & { localUri?: string; localFullUri?: string };

export default function useUnsplashScenery(country: string, portrait = false) {
  const [images, setImages] = useState<CachedUnsplashPhoto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = unsplashCacheKey(country, portrait);

    async function load() {
      setLoading(true);
      try {
        // 1) Try cache first (offline-first)
        const cached = await AsyncStorage.getItem(cacheKey);
        if (!cancelled && cached) {
          setImages(JSON.parse(cached));
          setError(null);
        }

        // 2) If nothing cached yet, populate via preloader then re-read
        if (!cached) {
          await prefetchCountryImages(country, portrait); // AsyncStorage.setItem
          const after = await AsyncStorage.getItem(cacheKey);
          if (!cancelled && after) {
            setImages(JSON.parse(after));
            setError(null);
          } else if (!cancelled) {
            setImages(null);
            setError("No images available.");
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load images");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (country) load();
    return () => {
      cancelled = true;
    };
  }, [country, portrait]);

  return { images, error, loading };
}