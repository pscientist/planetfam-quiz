import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import countriesManifest from "../assets/images/countries/countriesManifest";
import { FONT_FAMILY } from "./constants";
import { useGoogleImageSearch } from "./hooks/useGoogleImageSearch";

function getDisplayName(slug: string): string {
    const countryNames: { [key: string]: string } = {
        spain: "Spain",
        thai: "Thailand",
        russia: "Russia",
        ethiopia: "Ethiopia",
        nz: "New Zealand",
        philipines: "Philippines",
        png: "Papua New Guinea",
        sweden: "Sweden",
        germany: "Germany",
        netherlands: "Netherlands",
        uk: "United Kingdom",
        srilanka: "Sri Lanka",
        switzerland: "Switzerland",
        finland: "Finland",
        hk: "Hong Kong",
        saudi: "Saudi Arabia",
        afghanistan: "Afghanistan",
        colombia2: "Colombia",
        france: "France",
        india2: "India",
        japan_lunch: "Japan",
        south_sudan: "South Sudan",
    };
    return countryNames[slug] || slug;
}

function getUtcDaysSinceEpoch(): number {
    const now = new Date();
    const utcMidnightMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return Math.floor(utcMidnightMs / 86400000);
}

function pickDailyCountrySlug(): string {
    const allSlugs = Object.keys(countriesManifest).sort();
    if (allSlugs.length === 0) return "";
    const dayIndex = getUtcDaysSinceEpoch();
    const selectedIndex = dayIndex % allSlugs.length;
    return allSlugs[selectedIndex];
}

export default function CountryOfTheDay() {
    const slug = pickDailyCountrySlug();
    // const slug = "sweden";
    const imageSource = slug ? (countriesManifest as any)[slug] : undefined;
    const displayName = slug ? getDisplayName(slug) : "";

    // Use the Google image search hook
    const { images, isLoading, error } = useGoogleImageSearch(displayName);

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Stack.Screen options={{ title: "Country of the Day" }} />
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <Text style={styles.title}>Country of the Day</Text>
                    {slug ? (
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                            <View style={styles.content}>
                                <Image source={imageSource} style={styles.flagImage} resizeMode="contain" />

                                {/* Images Section */}
                                <View style={styles.googleImagesSection}>
                                    <Text style={styles.sectionTitle}>Discover {displayName}</Text>

                                    {isLoading && (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="small" color="#fff" />
                                            <Text style={styles.loadingText}>Loading images...</Text>
                                        </View>
                                    )}

                                    {error && (
                                        <Text style={styles.errorText}>{error}</Text>
                                    )}

                                    {images.length > 0 && (
                                        <View style={styles.imageScrollView}>
                                            {images.map((image, index) => (
                                                <View key={index} style={styles.googleImageContainer}>
                                                    <Image
                                                        source={{ uri: image.link }}
                                                        style={styles.googleImage}
                                                        resizeMode="cover"
                                                    />
                                                    <Text style={styles.imageCaption} numberOfLines={2}>
                                                        {image.title}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                        <Text style={styles.subtitle}>No countries available.</Text>
                    )}
                </BlurView>
            </View>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    card: {
        width: "92%",
        height: "85%",
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 18,
        alignItems: "center",
        overflow: "hidden",
    },
    scrollContainer: {
        flex: 1,
        width: "100%",
    },
    title: {
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 14,
        textAlign: "center",
        textShadowColor: "rgba(0,0,0,0.45)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 1,
    },
    content: {
        width: "100%",
        alignItems: "center",
    },
    flagImage: {
        width: "100%",
        height: 240,
        marginBottom: 12,
    },
    countryName: {
        fontFamily: FONT_FAMILY,
        fontSize: 22,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
        marginBottom: 6,
    },
    subtitle: {
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        color: "#ffffff",
        opacity: 0.9,
        textAlign: "center",
        marginBottom: 20,
    },
    googleImagesSection: {
        width: "100%",
        marginTop: 16,
    },
    sectionTitle: {
        fontFamily: FONT_FAMILY,
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        marginBottom: 12,
        textShadowColor: "rgba(0,0,0,0.3)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    loadingContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    loadingText: {
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        color: "#fff",
        marginTop: 8,
        opacity: 0.8,
    },
    errorText: {
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        color: "#ffcccc",
        textAlign: "center",
        paddingHorizontal: 16,
        marginVertical: 12,
    },
    imageScrollView: {
        marginVertical: 8,
    },
    googleImageContainer: {
        marginBottom: 16,
        alignItems: "center",
        width: "100%",
    },
    googleImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 8,
    },
    imageCaption: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        color: "#fff",
        textAlign: "center",
        opacity: 0.85,
        lineHeight: 16,
    },
});


