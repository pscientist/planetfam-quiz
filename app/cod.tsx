import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import countriesManifest from "../assets/images/countries/countriesManifest";
import { FONT_FAMILY } from "../data/constants";
import CountrySceneryList from "./components/CountrySceneryList";

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

function getUtcDaysSinceEpochTz(timeZone: string): number {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-NZ', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(now);

    const year = Number(parts.find(p => p.type === 'year')?.value);
    const month = Number(parts.find(p => p.type === 'month')?.value);
    const day = Number(parts.find(p => p.type === 'day')?.value);

    const utcMidnightMs = Date.UTC(year, month - 1, day);
    return Math.floor(utcMidnightMs / 86400000);
}

function pickDailyCountrySlug(): string {
    const allSlugs = Object.keys(countriesManifest).sort();
    if (allSlugs.length === 0) return "";
    const dayIndex = getUtcDaysSinceEpochTz('Pacific/Auckland');
    const selectedIndex = dayIndex % allSlugs.length;
    return allSlugs[selectedIndex];
}

export default function CountryOfTheDay() {
    const slug = pickDailyCountrySlug();
    const imageSource = slug ? (countriesManifest as any)[slug] : undefined;
    const displayName = slug ? getDisplayName(slug) : "";

    const isLoading = false;
    const error = null;

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
                    <Text style={styles.title}>{displayName}</Text>
                    {slug ? (
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                            <View style={styles.content}>

                                <Image source={imageSource} style={styles.flagImage} resizeMode="contain" />

                                {/* Poem Box */}
                                <LinearGradient
                                    colors={["#B8860B", "#8B6914", "#704214"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.poemBox}
                                >
                                    {/* <View style={styles.poemBox}> */}
                                    <Text style={styles.poemFlagEmoji} accessibilityLabel="German flag">🇩🇪</Text>
                                    <Text style={styles.poemText}>
                                        {"\"Entre hermanos,\nel corazón late fuerte,\nsiempre unidos.\""}
                                    </Text>
                                    <View style={styles.poemSeparator} />
                                    <Text style={styles.poemTextEnglish}>
                                        {"♥ Among siblings,\nthe heart beats strong,\nforever united.♥"}
                                    </Text>
                                    {/* </View> */}
                                </LinearGradient>

                                {/* Images Section */}
                                <View style={styles.googleImagesSection}>

                                    {isLoading && (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="small" color="#fff" />
                                            <Text style={styles.loadingText}>Loading images...</Text>
                                        </View>
                                    )}

                                    {error && (
                                        <Text style={styles.errorText}>{error}</Text>
                                    )}

                                    <CountrySceneryList country={displayName} />

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
        fontSize: 22,
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
    poemBox: {
        width: "100%",
        backgroundColor: "rgba(255, 245, 230, 0.3)",
        borderColor: "rgba(255, 224, 178, 0.4)",
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // marginBottom: 16,
        // marginTop: -20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    poemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "rgba(255,255,255,1)",
        marginVertical: 8,
        alignSelf: "center",
        width: "75%",
    },
    poemText: {
        fontFamily: Platform.select({ ios: "serif", android: "serif", default: "serif" }),
        fontSize: 16,
        lineHeight: 22,
        color: "#fff",
        textAlign: "center",
        opacity: 1,
        fontStyle: "italic",
        letterSpacing: 1,
    },
    poemFlagEmoji: {
        position: "absolute",
        top: 6,
        left: 8,
        fontSize: 20,
        lineHeight: 20,
    },
    poemTextEnglish: {
        fontFamily: Platform.select({ ios: "serif", android: "serif", default: "serif" }),
        fontSize: 14,
        lineHeight: 22,
        color: "#fff",
        textAlign: "center",
        opacity: 1,
        fontStyle: "italic",
        letterSpacing: 1,
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


