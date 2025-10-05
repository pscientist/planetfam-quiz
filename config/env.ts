// Environment configuration for API keys and sensitive data
// This file should be added to .gitignore to keep credentials secure

export const CONFIG = {
    EXPO_PUBLIC_SUPABASE_URL: "https://tjsrxnuppwpllpsdvdvo.supabase.co",
    EXPO_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqc3J4bnVwcHdwbGxwc2R2ZHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTI0NTksImV4cCI6MjA3MzQ4ODQ1OX0.RzMV1nQB_3_YoXuumtRCktGg6j8rfatMFuzuEM2ru_c",
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
    GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID as string,
};

// env.ts
// export const EXPO_PUBLIC_SUPABASE_URL = "https://YOURPROJECT.supabase.co";
// export const EXPO_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1...";

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
