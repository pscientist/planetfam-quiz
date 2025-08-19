import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlagCollection from './components/FlagCollection';
import { useRound } from './contexts/RoundContext';
import { useScore } from './contexts/ScoreContext';

export default function ResultsScreen() {
    const { score = "0", total = "0" } = useLocalSearchParams();
    const router = useRouter();
    const { resetScore, resetCollectedCountries, getAllCollectedCountries } = useScore();
    const { incrementRound } = useRound();
    const allCollectedCountries = getAllCollectedCountries();

    const handlePlayAgain = () => {
        resetScore();
        incrementRound();
        resetCollectedCountries();
        router.replace("/quiz");
    };

    const handleMainMenu = () => {
        resetScore();
        router.replace('/menu');
    }

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <View style={styles.headerRow}>
                        <Ionicons name="earth" size={24} color="#fff" />
                        <Text style={styles.title}>Your Score</Text>
                    </View>

                    <Text style={styles.scoreText}>{score} / {total}</Text>
                    <Text style={styles.praiseText}>Great job, explorer.</Text>

                    <FlagCollection collectedCountries={allCollectedCountries} title="Flags Collected" scrollable={false} />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSecondary]}
                            onPress={handleMainMenu}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.buttonTextSecondary}>Main Menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSecondary]}
                            onPress={handlePlayAgain}
                            activeOpacity={0.9}
                        >
                            <Ionicons name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Play Again</Text>
                        </TouchableOpacity>
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
        alignItems: "center",
        overflow: "hidden",
        gap: 8,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    title: {
        fontFamily: "SpaceMono",
        fontSize: 24,
        fontWeight: "800",
        color: "#fff",
        textShadowColor: "rgba(0,0,0,0.45)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 1,
    },
    scoreText: {
        fontFamily: "SpaceMono",
        fontSize: 40,
        fontWeight: "900",
        color: "#fff",
        textShadowColor: "rgba(0,0,0,0.45)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 1,
        marginTop: 4,
    },
    praiseText: {
        fontFamily: "SpaceMono",
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        opacity: 0.95,
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.25)",
        marginVertical: 8,
    },
    factsTitle: {
        fontFamily: "SpaceMono",
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        alignSelf: "flex-start",
        marginBottom: 4,
    },
    factsList: {
        width: "100%",
        gap: 6,
    },
    factText: {
        fontFamily: "SpaceMono",
        fontSize: 15,
        color: "#ffffff",
        opacity: 0.95,
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 12,
        marginTop: 8,
    },
    button: {
        flex: 1,
        backgroundColor: "#E67E22",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    buttonSecondary: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.85)",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
        fontFamily: "SpaceMono",
    },
    buttonTextSecondary: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
        fontFamily: "SpaceMono",
    },
    buttonIcon: {
        marginRight: 8,
    },
    globeContainer: {
        position: "relative",
        marginVertical: 20,
    },
    planeRoute: {
        position: "absolute",
        top: "40%",
        left: "20%",
    },

});
