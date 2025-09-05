import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT_FAMILY } from "../data/constants";
import { useRound } from "./contexts/RoundContext";

export default function Menu() {
    const router = useRouter();
    const { areAllRoundsCompleted, currentRound, getTotalRounds, incrementRound, resetCompletedRounds } = useRound();

    const handlePlayPress = () => {
        router.replace("/quiz");
    };

    const handleResetRounds = () => {
        Alert.alert(
            "Reset rounds?",
            "This will clear completed rounds and set you back to Round 1.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Reset", style: "destructive", onPress: () => resetCompletedRounds() },
            ]
        );
    };

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <Stack.Screen options={{ title: "Main Menu" }} />
            <View style={styles.overlay}>
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <Text style={styles.title}>Main Menu</Text>

                    <View style={styles.list}>
                        {areAllRoundsCompleted() ? (
                            <View style={[styles.item, styles.item]}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>New Rounds Coming Soon!</Text>
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={handlePlayPress}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="home" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>Play</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        )}
                        <Link href="/supermarket" asChild>
                            <TouchableOpacity style={styles.item} activeOpacity={0.9}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="book" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>World Supermarket!!</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        </Link>
                        <Link href="/cod" asChild>
                            <TouchableOpacity style={styles.item} activeOpacity={0.9}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="flag" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>Country of the Day</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        </Link>
                        <Link href="/about" asChild>
                            <TouchableOpacity style={styles.item} activeOpacity={0.9}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="information-circle" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>Story</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        </Link>

                        <Link href="/treasures" asChild>
                            <TouchableOpacity style={styles.item} activeOpacity={0.9}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="trophy" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>My Treasures</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        </Link>

                        {__DEV__ && (
                            <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={handleResetRounds}>
                                <View style={styles.itemLeft}>
                                    <Ionicons name="refresh" size={20} color="#fff" style={styles.itemIcon} />
                                    <Text style={styles.itemText}>Reset Rounds (Debug)</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        )}

                    </View>
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
        alignItems: "stretch",
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
    list: {
        gap: 10,
    },
    item: {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemIcon: {
        marginRight: 10,
    },
    itemText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
        fontFamily: FONT_FAMILY,
    },
    itemDisabled: {
        backgroundColor: "rgba(136, 136, 136, 0.15)",
        opacity: 0.6,
    },
    itemTextDisabled: {
        color: "#888",
        fontSize: 18,
        fontWeight: "800",
        fontFamily: FONT_FAMILY,
    },
});
