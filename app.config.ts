import 'dotenv/config';

export default {
    expo: {
        name: "PlanetFam Quiz",
        slug: "my-app",
        version: "1.0.3",
        orientation: "portrait",
        icon: "./assets/images/PlanetFam_Icon_1024.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        runtimeVersion: { policy: "sdkVersion" },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.cathyapp1234.my-app",
            buildNumber: "28"
        },
        android: {
            package: "com.radiantleaf.planetfam",
            versionCode: 28,
            permissions: [],
            adaptiveIcon: {
                foregroundImage: "./assets/images/PlanetFam_Icon_1024.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/PlanetFam_Icon_1024.png"
        },
        plugins: [
            "expo-router",
            "expo-updates",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash_with_background_fill.png",
                    resizeMode: "cover",
                    backgroundColor: "#0f172a"
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            router: {},
            eas: {
                projectId: "3467d2f9-6a13-442e-b023-effabe78ccee"
            },
            unsplashKey: process.env.UNSPLASH_KEY,
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY
        },
        owner: "cathyapp1234",
        updates: {
            url: "https://u.expo.dev/3467d2f9-6a13-442e-b023-effabe78ccee"
        }
    }
};
