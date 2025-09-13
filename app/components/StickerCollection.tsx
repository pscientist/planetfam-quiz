import { getCompletedSlugsInOrder } from "@/data/questions";
import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import countriesManifest from "../../assets/images/countries/countriesManifest";
import { COUNTRY_NAMES, FLAG_EMOJIS, FONT_FAMILY } from "../../data/constants";
import { useRound } from "../contexts/RoundContext";

type StickerCollectionProps = {
    collectedCountries: string[];
    columns?: number;          // default 3
    showTitles?: boolean;      // show small country names under stickers
};

export default function StickerCollection({
    collectedCountries,
    columns = 3,
    showTitles = true,
}: StickerCollectionProps) {

    const { completedRounds } = useRound(); // array of round nnumbers

    const slugsByQuestions = useMemo(() => {
        return getCompletedSlugsInOrder(completedRounds);
    }, [completedRounds]);

    const colPct = `${Math.floor((100 - 8) / columns)}%`; // leave a bit of room for gaps

    const getImage = (slug: string) => {
        return (countriesManifest as any)[slug];
    };

    const getName = (slug: string) => COUNTRY_NAMES[slug] || slug;
    const getFlag = (slug: string) => FLAG_EMOJIS[slug] || "🏳️";

    return (
        <View style={styles.wrapper}>

            <ScrollView contentContainerStyle={styles.grid}>
                {slugsByQuestions.map((slug) => {
                    const collected = collectedCountries.includes(slug);
                    const img = getImage(slug);
                    const flag = getFlag(slug);

                    return (
                        <View key={slug} style={[styles.slot, { width: colPct }]}>
                            <View style={[styles.sticker, collected ? styles.stickerCollected : styles.stickerEmpty]}>
                                {collected ? (
                                    <Text style={[styles.flag]}>{flag}</Text>
                                ) : (
                                    <Image
                                        source={img}
                                        style={styles.image}
                                        resizeMode="cover"
                                        accessibilityLabel={`${getName(slug)} sticker`}
                                        opacity={0.65}
                                    />
                                )}

                                {/* {!collected && (
                                    <View style={styles.lockOverlay}>
                                        <Ionicons name="question-circle" size={35} color="#ffffff" />
                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>+0.5</Text>
                                    </View>
                                )} */}

                            </View>
                            {showTitles && (
                                <Text style={[styles.caption, !collected && styles.captionLocked]} numberOfLines={1}>
                                    {getName(slug)}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        gap: 8,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 4,
    },
    title: {
        fontFamily: FONT_FAMILY,
        fontSize: 18,
        fontWeight: "800",
        color: "#ffffff",
    },
    countPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    countText: {
        color: "#fff",
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: "800",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: 4,
        paddingBottom: 12,
        rowGap: 12,
    },
    slot: {
        alignItems: "flex-start",
    },
    sticker: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 12,
        overflow: "hidden",
        // borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        backgroundColor: "rgba(255,255,255,0.06)",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        position: "relative",
    },
    stickerCollected: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.35)",
    },
    stickerEmpty: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderStyle: "dashed",
        borderColor: "rgba(255,255,255,0.2)",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageLocked: {
        opacity: 0.25,
    },
    flag: {
        fontSize: 100,
        // textAlign: "center",
        // marginTop: "22%",
    },
    flagLocked: {
        opacity: 0.35,
    },
    caption: {
        marginTop: 6,
        fontSize: 12,
        color: "#ffffff",
        opacity: 0.95,
        fontFamily: FONT_FAMILY,
        fontWeight: "700",
        maxWidth: "100%",
    },
    captionLocked: {
        opacity: 0.6,
    },
    lockOverlay: {
        position: "absolute",
        right: 6,
        top: 6,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: 999,
        padding: 4,
    },
    // tapeTL: {
    //     position: "absolute",
    //     left: -6,
    //     top: 6,
    //     width: 32,
    //     height: 10,
    //     backgroundColor: "rgba(255,255,255,0.35)",
    //     transform: [{ rotate: "-18deg" }],
    //     borderRadius: 2,
    // },
    // tapeBR: {
    //     position: "absolute",
    //     right: -6,
    //     bottom: 6,
    //     width: 28,
    //     height: 9,
    //     backgroundColor: "rgba(255,255,255,0.25)",
    //     transform: [{ rotate: "16deg" }],
    //     borderRadius: 2,
    // },
});