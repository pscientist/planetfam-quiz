import Constants from "expo-constants";
import { useEffect, useState } from "react";

type UnsplashPhoto = {
  id: string;
  width: number;
  height: number;
  description?: string;
  alt_description?: string;
  urls: { regular: string; full?: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
};

const UNSPLASH_KEY = String(Constants.expoConfig?.extra?.unsplashKey || "");

async function fetchUnsplashPhotos(
  country: string,
  portrait = false,
  signal?: AbortSignal
): Promise<UnsplashPhoto[] | null> {
  if (!UNSPLASH_KEY) throw new Error("Missing Unsplash key.");

  const orientation = portrait ? "portrait" : "landscape";
  const query = `${country}`;
  // const query = "burma";

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=10&orientation=${orientation}`,
    {
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      signal, // 👈 pass the abort signal
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  const results: UnsplashPhoto[] = data?.results || [];

  if (!results.length) return null;

  const minW = portrait ? 1080 : 1600;
  return results.filter((p) => p.width >= minW).slice(0, 5) || null;
}

export default function useUnsplashScenery(country: string, portrait = false) {
  const [images, setImages] = useState<UnsplashPhoto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {

    async function load() {
      try {
        setLoading(true);
        const images = await fetchUnsplashPhotos(country, portrait, signal);
        setImages(images);

      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load image");
        }

      } finally {
        setLoading(false);
      }
    }

    load();

    // clean up function
    return () => {
      controller.abort();
    };

  }, [country, portrait]);

  return { images, error, loading };

};

export type { UnsplashPhoto };
