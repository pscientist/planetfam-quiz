import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import useUnsplashScenery, { UnsplashPhoto } from "../hooks/useUnsplashScenery";

export default function CountrySceneryList({ country, portrait = false }: { country: string; portrait?: boolean }) {
    const { loading, images, error } = useUnsplashScenery(country, portrait);

    if (loading) {
        return (
            <View style={[styles.card, styles.skeleton]}>
                <ActivityIndicator />
                <Text style={styles.skeletonText}>Loading a beautiful {country} scene…</Text>
            </View>
        );
    }

    if (!images || error) {
        return (
            <View style={[styles.card, styles.fallback]}>
                <Text style={styles.fallbackEmoji}>📸</Text>
                <Text style={styles.fallbackText}>Couldn’t find a nice scenery images right now.</Text>
                <Text style={styles.fallbackHint}>Try again, or show a PlanetFam illustration here.</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            {images.map((image: UnsplashPhoto) => (<View key={image.id} style={styles.card}>
                <Image
                    source={{ uri: image.urls?.regular || "https://placehold.co/600x400" }}
                    style={[styles.hero, portrait ? styles.portrait : styles.landscape]}
                    resizeMode="cover"
                    accessible
                    accessibilityLabel={`${country} scenery`}
                    accessibilityHint={image.description || image.alt_description || ""}
                />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.imageDescription}>{image.description || image.alt_description || ""}</Text>
                </View>
            </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        marginBottom: 12,
    },
    hero: {
        width: "100%",
        backgroundColor: "#e9eef5",
    },
    landscape: { aspectRatio: 16 / 9 },
    portrait: { aspectRatio: 9 / 16 },

    creditPill: {
        position: "absolute",
        right: 8,
        bottom: 8,
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    creditText: { color: "#fff", fontSize: 12, fontWeight: "600" },

    descriptionContainer: {
        backgroundColor: "#F7F9FC",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderTopWidth: 1,
        borderTopColor: "#E6EAF2",
    },

    imageDescription: {
        fontSize: 15,
        color: "#475467",
        fontWeight: "600",
        lineHeight: 21,
    },

    skeleton: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 28,
        gap: 8,
    },
    skeletonText: { color: "#667085", fontSize: 14 },

    fallback: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        gap: 6,
        backgroundColor: "#F8FAFF",
    },
    fallbackEmoji: { fontSize: 28 },
    fallbackText: { fontSize: 14, fontWeight: "700", color: "#101828" },
    fallbackHint: { fontSize: 12, color: "#667085" },
});
