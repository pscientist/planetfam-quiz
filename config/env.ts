// Environment configuration for API keys and sensitive data
// This file should be added to .gitignore to keep credentials secure

export const CONFIG = {
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL as string,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
    GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID as string,
};

// Development vs Production configuration
export const isDevelopment = __DEV__;

// You can also use environment-specific configs
export const getConfig = () => {
    if (isDevelopment) {
        return {
            ...CONFIG,
            // Override with development-specific values if needed
            // GOOGLE_API_KEY: 'dev_key_here',
        };
    }

    return CONFIG;
};

export default CONFIG;
