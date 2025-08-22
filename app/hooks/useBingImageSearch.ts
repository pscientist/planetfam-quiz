import { useEffect, useState } from 'react';

// Dummy token for development - replace with real token in production
const BING_API_KEY = 'dummy_bing_api_key_12345';

interface BingImageResult {
    contentUrl: string;
    thumbnailUrl: string;
    name: string;
    width: number;
    height: number;
}

interface BingImageSearchResponse {
    value: BingImageResult[];
}

interface UseBingImageSearchResult {
    images: BingImageResult[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

interface UseBingImageSearchOptions {
    count?: number;
    autoFetch?: boolean;
}

export const useBingImageSearch = (
    country: string,
    options: UseBingImageSearchOptions = {}
): UseBingImageSearchResult => {
    const { count = 2, autoFetch = true } = options;

    const [images, setImages] = useState<BingImageResult[]>([]);
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
            const searchQuery = encodeURIComponent(`${country} country landmarks culture`);
            const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${searchQuery}&count=${count}&imageType=Photo&size=Medium`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': BING_API_KEY,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: BingImageSearchResponse = await response.json();

            // Filter out images that might not be suitable
            const validImages = data.value.filter(img =>
                img.contentUrl &&
                img.thumbnailUrl &&
                img.width > 200 &&
                img.height > 150
            );

            setImages(validImages);

            if (validImages.length === 0) {
                setError('No suitable images found for this country');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(`Failed to fetch images: ${errorMessage}`);
            console.error('Bing Image Search Error:', err);
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
    }, [country, count, autoFetch]); // dependencies array

    return {
        images,
        isLoading,
        error,
        refetch,
    };
};

export default useBingImageSearch;
