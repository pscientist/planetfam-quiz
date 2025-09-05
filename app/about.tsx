
// app/about.tsx
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function About() {
    return (
        <ScrollView>
            <LinearGradient
                colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >
                <Stack.Screen options={{ title: "About" }} />
                <View style={styles.overlay}>
                    <BlurView intensity={40} tint="dark" style={styles.card}>
                        <Text style={styles.title}>Why PlanetFam?</Text>
                        <Text style={styles.tagline}> Learn about the World through people, not headlines</Text>
                        <Text style={styles.body}>
                            In a world full of conflict and stereotypes,
                            we seem to forget that’re all just people — with families,
                            friends, and food we love to share.
                        </Text>
                        <Image style={{ ...styles.image, marginBottom: 20 }}
                            resizeMode="contain"
                            source={require("../assets/images/conflicts_30percent.webp")}
                        />
                        <Text style={styles.body}>
                            PlanetFam Quiz was inspired by coffee afternoons with an Eritrean family in Auckland, New Zealand. There are a lot more in common
                            between us than differences.
                        </Text>
                        <Image resizeMode="stretch" source={require("../assets/images/coffee_20percent.webp")}
                            style={{ ...styles.image, width: "100%", height: 230, marginBottom: 20 }} />
                        <Text style={{ ...styles.body, marginBottom: 50 }}>
                            Guess the country, explore its architecture, and discover the beauty of dining traditions around the world.
                        </Text>

                        {/* <View style={styles.logoContainer}> */}
                        <Image
                            resizeMode="contain"
                            source={require("../assets/images/company_logo.webp")}
                            style={styles.companyLogo}
                        />
                        <Text style={styles.copyrightText}>
                            © 2025 PlanetFam. All rights reserved.
                        </Text>
                        {/* </View> */}
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

    },
    tagline: {
        fontFamily: "SpaceMono",
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
        marginBottom: 25,
        marginTop: 10,
    },
    body: {
        fontFamily: "Arial",
        fontSize: 17,
        lineHeight: 28,
        color: "#fff",
        width: "100%",
        marginBottom: 20,
        textAlign: "justify",
    },
    imageContainer: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        alignSelf: "center",
    },
    image: {
        // width: "100%",
        // height: 400,
        // marginBottom: 10,
        alignSelf: "center",
    },
    logoContainer: {
        width: "100%",
        alignItems: "center",
        marginVertical: 30,
        paddingVertical: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    companyLogo: {
        width: 400,
        height: 120,
        maxWidth: "90%",
    },
    copyrightText: {
        fontFamily: "Arial",
        fontSize: 12,
        color: "rgba(255,255,255,0.7)",
        marginTop: 15,
        textAlign: "center",
        fontStyle: "italic",
    },
});

