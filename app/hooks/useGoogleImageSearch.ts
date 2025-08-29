import { useEffect, useState } from 'react';
import CONFIG from '../../config/env';

// Import API credentials from secure config
const { GOOGLE_API_KEY, GOOGLE_SEARCH_ENGINE_ID } = CONFIG;

interface GoogleImageResult {
    link: string;
    image: {
        thumbnailLink: string;
        width: number;
        height: number;
    };
    title: string;
}

interface GoogleImageSearchResponse {
    items: GoogleImageResult[];
}

interface UseGoogleImageSearchResult {
    images: GoogleImageResult[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

interface UseGoogleImageSearchOptions {
    count?: number;
    autoFetch?: boolean;
}

export const useGoogleImageSearch = (
    country: string,
    options: UseGoogleImageSearchOptions = {}
): UseGoogleImageSearchResult => {
    const { count = 5, autoFetch = true } = options;

    const [images, setImages] = useState<GoogleImageResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async () => {
        if (!country.trim()) {
            setError('Country name is required');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const searchQuery = encodeURIComponent(`${country}+landmarks+attractions`);
            // const url = `https://www.googleapis.com/customsearch/v1?
            //                 key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&
            //                 q=${searchQuery}&num=${count}&searchType=image&imgSize=medium`;
            const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${searchQuery}&num=${count}&searchType=image&imgSize=medium`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: GoogleImageSearchResponse = await response.json();

            // Filter out images that might not be suitable
            const validImages = (data.items || []).filter(img =>
                img.link &&
                img.image?.thumbnailLink &&
                img.image?.width > 200 &&
                img.image?.height > 150
            );

            setImages(validImages);

            if (validImages.length === 0) {
                setError('No suitable images found for this country');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(`Failed to fetch images: ${errorMessage}`);
            console.error('Google Image Search Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refetch = () => {
        fetchImages();
    };

    useEffect(() => {
        if (autoFetch && country) {
            fetchImages();
        }
    }, [country, count, autoFetch]);

    return {
        images,
        isLoading,
        error,
        refetch,
    };
};

export default useGoogleImageSearch;
