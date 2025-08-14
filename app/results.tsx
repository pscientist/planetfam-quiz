import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ResultsScreen() {
    const { score = "0", total = "0" } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            {/* Game Over Header */}
            <View style={styles.header}>
                <Ionicons name="earth" size={32} color="#4CAF50" />
                <Text style={styles.gameOverText}>Final Score</Text>
            </View>

            {/* Score Section */}
            <Text style={styles.scoreText}>{score} / {total} points!</Text>
            <View style={styles.praiseContainer}>
                <Ionicons name="earth" size={24} color="#4CAF50" />
                <Text style={styles.praiseText}>Great job, explorer.</Text>
            </View>

            {/* Globe Image */}
            <View style={styles.globeContainer}>
                <Ionicons name="earth" size={200} color="#4CAF50" />
                <View style={styles.planeRoute}>
                    <Ionicons name="airplane" size={24} color="white" />
                </View>
            </View>

            {/* Fun Facts Section */}
            <View style={styles.factsContainer}>
                <Text style={styles.factsTitle}>Fun Facts:</Text>
                <View style={styles.factsList}>
                    <Text style={styles.factText}>• In Mongolia, people often drink salted milk tea called Suutei tsai.</Text>
                    <Text style={styles.factText}>• The Eiffel Tower grows taller in summer by about 15 cm due to heat expansion.</Text>
                    <Text style={styles.factText}>• Ghana is famous for its rich cocoa used in chocolate worldwide.</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.playAgainButton]}>
                    <Text style={styles.playAgainText}>Play Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.mainMenuButton]}>
                    <Text style={styles.mainMenuText}>Main Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFF8F0", // Light beige
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 40,
    },
    gameOverText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#E67E22", // Orange
    },
    scoreText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#8B4000", // Dark brown
        marginTop: 20,
    },
    praiseContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 10,
    },
    praiseText: {
        fontSize: 24,
        color: "#8B4000", // Dark brown
        fontWeight: "500",
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
    factsContainer: {
        backgroundColor: "#FFE0B2", // Light orange
        padding: 20,
        borderRadius: 15,
        width: "100%",
        marginBottom: 20,
    },
    factsTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#8B4000", // Dark brown
        marginBottom: 15,
    },
    factsList: {
        gap: 10,
    },
    factText: {
        fontSize: 16,
        color: "#5D4037", // Warm brown
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 15,
        marginTop: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        minWidth: 140,
        alignItems: "center",
    },
    playAgainButton: {
        backgroundColor: "#E67E22", // Orange
    },
    mainMenuButton: {
        backgroundColor: "#FFE0B2", // Light orange
    },
    playAgainText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    mainMenuText: {
        color: "#333",
        fontSize: 18,
        fontWeight: "500",
    },
});
