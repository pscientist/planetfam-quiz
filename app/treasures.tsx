import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT_FAMILY, TROUPHY_REQ } from "../data/constants";
import StickerCollection from "./components/StickerCollection";
import { useScore } from "./contexts/ScoreContext";

export default function Treasures() {
    const router = useRouter();
    const { getAllCollectedCountries, getAllScoresCount, isDataLoaded, score } = useScore();

    const currentCount = getAllScoresCount();
    const hasTrophy = currentCount >= TROUPHY_REQ;
    // const hasCrown = currentCount >= CROWN_REQ;

    const collectedCountries = getAllCollectedCountries();

    // Calculate number of trophies earned
    const trophiesEarned = Math.floor(currentCount / TROUPHY_REQ);

    const renderTrophySection = () => (
        <View style={styles.trophySection}>
            <View style={styles.trophyContainer}>
                {/* Trophy */}
                <View style={[styles.trophyItem, hasTrophy && styles.trophyEarned]}>
                    <Ionicons
                        name="trophy"
                        size={32}
                        color={hasTrophy ? "#FFD700" : "#666"}
                    />
                    <Text style={[styles.trophyLabel, hasTrophy && styles.trophyLabelEarned]}>
                        {trophiesEarned > 1 ? `${trophiesEarned} Trophies` : `${trophiesEarned} Trophy`}
                    </Text>
                    <Text style={[styles.trophyProgress, hasTrophy && styles.trophyProgressEarned]}>
                        {hasTrophy ? "Earned!" : `${currentCount}/${TROUPHY_REQ}`}
                    </Text>
                </View>

                {/* Crown */}
                {/* <View style={[styles.trophyItem, hasCrown && styles.trophyEarned]}>
                    <Ionicons
                        name="diamond"
                        size={32}
                        color={hasCrown ? "#E6E6FA" : "#666"}
                    />
                    <Text style={[styles.trophyLabel, hasCrown && styles.trophyLabelEarned]}>
                        Crown
                    </Text>
                    <Text style={[styles.trophyProgress, hasCrown && styles.trophyProgressEarned]}>
                        {hasCrown ? "Earned!" : `${currentCount}/${CROWN_REQ}`}
                    </Text>
                </View> */}
            </View>
        </View>
    );

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <Stack.Screen options={{ title: "My Stamps" }} />
            <SafeAreaView style={styles.overlay}>
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.title}>My Passport</Text>
                        <View style={{ width: 36 }} />
                    </View>

                    {!isDataLoaded ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={styles.loadingText}>Loading your Stamps...</Text>
                        </View>
                    ) : collectedCountries.length > 0 ? (
                        <>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionTitle}>Achievements</Text>
                            </View>

                            {renderTrophySection()}

                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionTitle}>Stamps</Text>
                            </View>

                            <StickerCollection collectedCountries={collectedCountries} />
                        </>

                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="flag-outline" size={48} color="#fff" style={{ opacity: 0.7 }} />
                            <Text style={styles.emptyTitle}>No Stamps Yet</Text>
                            <Text style={styles.emptyText}>Play the quiz to start collecting Stamps!</Text>
                            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/quiz")}>
                                <Text style={styles.ctaText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </BlurView>
            </SafeAreaView>
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
        alignItems: "stretch",
        overflow: "scroll",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    backButton: {
        padding: 8,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 20,
    },
    title: {
        fontFamily: FONT_FAMILY,
        fontSize: 22,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    loadingText: {
        color: "#fff",
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        opacity: 0.9,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        gap: 8,
    },
    emptyTitle: {
        fontFamily: FONT_FAMILY,
        fontSize: 22,
        fontWeight: "800",
        color: "#fff",
        marginTop: 8,
    },
    emptyText: {
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        color: "#fff",
        opacity: 0.85,
        textAlign: "center",
        marginBottom: 10,
    },
    ctaButton: {
        backgroundColor: "#3498db",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    ctaText: {
        color: "#fff",
        fontFamily: FONT_FAMILY,
        fontSize: 16,
        fontWeight: "800",
    },
    // Trophy Section Styles
    trophySection: {
        marginBottom: 32,
    },
    trophyContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    trophyItem: {
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: 10,
        minWidth: 120,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.2)",
    },
    trophyEarned: {
        backgroundColor: "rgba(255,215,0,0.2)",
        borderColor: "#FFD700",
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    trophyLabel: {
        fontFamily: FONT_FAMILY,
        fontSize: 18,
        fontWeight: "600",
        color: "#ccc",
        marginTop: 8,
    },
    trophyLabelEarned: {
        color: "#fff",
        fontWeight: "800",
    },
    trophyProgress: {
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        color: "#999",
        marginTop: 4,
    },
    trophyProgressEarned: {
        color: "#FFD700",
        fontWeight: "600",
    },
    sectionTitle: {
        fontFamily: FONT_FAMILY,
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 15,
    },

});


