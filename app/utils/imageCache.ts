import { Paths } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

const CACHE_DIR = Paths.cache + 'images/';

async function ensureDir() {
    const info = await FileSystem.getInfoAsync(CACHE_DIR);
    if (!info.exists) {
        await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
    }
}

/**
 * Converts a URL to a unique, filesystem-safe filename using a hash function.
 * This ensures consistent naming for the same URL while avoiding filesystem conflicts.
 */
function filenameFor(url: string) {
    // Simple hash function to convert URL to a number
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        // djb2 hash algorithm: hash * 33 + charCode
        hash = ((hash << 5) - hash) + url.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer
    }
    // Return absolute value of hash with .img extension
    return `${Math.abs(hash)}.img`;
}

/**
 * Downloads and caches images locally to improve app performance and reduce network usage.
 * Falls back to the original URL if caching fails.
 */
export async function cacheImage(url: string): Promise<string> {
    try {
        // Ensure cache directory exists
        await ensureDir();
        // Generate unique filename for the image URL
        const fileUri = CACHE_DIR + filenameFor(url);
        // Check if image is already cached
        const info = await FileSystem.getInfoAsync(fileUri);
        if (info.exists) return fileUri;
        // Download image from the server to the cache if not already cached
        const { uri } = await FileSystem.downloadAsync(url, fileUri);
        return uri;
    } catch {
        return url; // fallback to remote if caching fails
    }
}

/**
 * Batch caches multiple images concurrently for improved performance.
 * Returns a mapping from original URLs to their cached/local URIs.
 */
export async function cacheImages(urls: string[]): Promise<Record<string, string>> {
    // Process all URLs concurrently using Promise.all for better performance
    const entries = await Promise.all(urls.map(async u => [u, await cacheImage(u)] as const));
    // Convert array of [url, cachedUri] pairs to an object mapping
    return Object.fromEntries(entries);
}

