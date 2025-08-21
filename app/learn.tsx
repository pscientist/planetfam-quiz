// app/learn.tsx
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Learn() {
    return (
        <ScrollView>
            <LinearGradient
                colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >
                <Stack.Screen options={{ title: "Learn" }} />
                <View style={styles.overlay}>
                    <BlurView intensity={40} tint="dark" style={styles.card}>
                        <Text style={styles.title}>Food Facts!</Text>
                        <Text style={{ fontFamily: "Arial", fontSize: 20, lineHeight: 30, color: "#fff", width: "100%", marginBottom: 20 }}>
                            Food can be a great way to learn about a country's culture and history!
                        </Text>

                        <View style={styles.list}>
                            <Text style={{ fontFamily: "Arial", fontSize: 20, lineHeight: 30, color: "#fff", width: "100%" }}>
                                Papa New Guinea
                            </Text>
                            <Image resizeMode="contain" source={require("../assets/images/learn_items/png_food_60kb.webp")} style={styles.image} />
                            <Text style={{ fontFamily: "Arial", fontSize: 20, lineHeight: 30, color: "#fff", width: "100%" }}>
                                Saudi Arabia
                            </Text>
                            <Image source={require("../assets/images/learn_items/saudi_food.webp")} style={styles.image} />

                            <Text style={{ fontFamily: "Arial", fontSize: 20, lineHeight: 30, color: "#fff", width: "100%" }}>
                                Russian
                            </Text>
                            <Image resizeMode="contain" source={require("../assets/images/learn_items/russian_food.webp")} style={styles.image} />
                        </View>
                    </BlurView>
                </View>
            </LinearGradient>
        </ScrollView>
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
        width: "100%",
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
    list: {
        width: "100%",
        gap: 8,
    },
    fact: {
        fontFamily: "SpaceMono",
        fontSize: 18,
        color: "#fff",
    },
    image: {
        width: "100%",
        height: 500,
        marginBottom: 10,
        alignSelf: "center",
    },
});

