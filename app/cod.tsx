import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import countriesManifest from "../assets/images/countries/countriesManifest";
import { FONT_FAMILY } from "./constants";

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
    const imageSource = slug ? (countriesManifest as any)[slug] : undefined;
    const displayName = slug ? getDisplayName(slug) : "";

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <Stack.Screen options={{ title: "Country of the Day" }} />
            <View style={styles.overlay}>
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <Text style={styles.title}>Country of the Day</Text>

                    {slug ? (
                        <View style={styles.content}>
                            <Image source={imageSource} style={styles.flagImage} resizeMode="contain" />
                            <Text style={styles.countryName}>{displayName}</Text>
                            <Text style={styles.subtitle}>Changes daily at 00:00 UTC</Text>
                        </View>
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
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 18,
        alignItems: "center",
        overflow: "hidden",
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
    },
});


