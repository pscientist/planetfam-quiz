
// app/about.tsx
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function About() {
    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <Stack.Screen options={{ title: "About" }} />
            <View style={styles.overlay}>
                <BlurView intensity={40} tint="dark" style={styles.card}>
                    <Text style={styles.title}>About PlanetFam</Text>
                    <Text style={styles.body}>
                        PlanetFam Quiz was inspired by coffee afternoons with an Eritrean family in Auckland, New Zealand.
                        In a world full of conflict and stereotypes, I wanted to create a game that reminds us we’re all just people — with families, friends, and food we love to share.
                        Guess the country, explore its architecture, and discover the beauty of dining traditions around the world.
                    </Text>
                    <Image source={require("../assets/images/tw_eri.webp")} style={styles.image} />

                </BlurView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
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
        fontFamily: "SpaceMono",
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 10,
        textAlign: "center",
        textShadowColor: "rgba(0,0,0,0.45)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        letterSpacing: 1,
    },
    body: {
        fontFamily: "Arial",
        fontSize: 20,
        lineHeight: 30,
        color: "#fff",
        width: "92%",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        alignSelf: "center",
    },
});

