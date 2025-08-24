import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlagCollection from "./components/FlagCollection";
import { FONT_FAMILY } from "./constants";
import { useScore } from "./contexts/ScoreContext";

export default function Treasures() {
    const router = useRouter();
    const { loadAllCollectedCountries } = useScore();
    const [flags, setFlags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const loaded = await loadAllCollectedCountries();
            setFlags(loaded);
            setIsLoading(false);
        })();
    }, []);

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <Stack.Screen options={{ title: "My Treasures" }} />
            <SafeAreaView style={styles.overlay}>
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.title}>My Treasures</Text>
                        <View style={{ width: 36 }} />
                    </View>

                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={styles.loadingText}>Loading your flags...</Text>
                        </View>
                    ) : flags.length > 0 ? (
                        <FlagCollection collectedCountries={flags} scrollable={true} />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="flag-outline" size={48} color="#fff" style={{ opacity: 0.7 }} />
                            <Text style={styles.emptyTitle}>No Flags Yet</Text>
                            <Text style={styles.emptyText}>Play the quiz to start collecting flags!</Text>
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
});


