// components/InfoSheet.tsx
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type InfoSheetProps = {
    country: string;
    flag?: string;            // "🇫🇷"
    sections: {
        title: string;          // "Landmarks" / "Dishes"
        icon?: string;          // "🏛️" / "🍽️"
        items: string[];        // label chips OR short sentences
    }[];
    compact?: boolean;        // if true, starts collapsed
};

export default function InfoSheet({
    country,
    flag,
    sections,
    compact = false,
}: InfoSheetProps) {
    const [expanded, setExpanded] = useState(!compact);

    // split long items into label + subtitle (optional: "Title: description")
    const parsed = useMemo(
        () =>
            sections.map((s) => ({
                ...s,
                items: s.items.map((txt) => txt.trim()),
            })),
        [sections]
    );

    return (
        <View style={styles.wrapper}>
            {/* Frosted glass background */}
            <BlurView intensity={40} tint={Platform.OS === "ios" ? "systemMaterialLight" : "light"} style={styles.card}>
                {/* Header strip */}
                <LinearGradient
                    colors={["#FFD56A", "#FF9B6A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.header}
                >
                    <Text style={styles.headerText}>
                        {flag ? `${flag}  ` : ""}{country}
                    </Text>

                    <Pressable onPress={() => setExpanded((v) => !v)} hitSlop={10} style={styles.chevron}>
                        <Text style={styles.chevronText}>{expanded ? "▾" : "▸"}</Text>
                    </Pressable>
                </LinearGradient>

                {/* Body */}
                {expanded && (
                    <View style={styles.body}>
                        {parsed.map((sec, idx) => (
                            <View key={idx} style={[styles.section, idx > 0 && styles.sectionGap]}>
                                <View style={styles.sectionTitleRow}>
                                    <Text style={styles.sectionIcon}>{sec.icon ?? "ℹ️"}</Text>
                                    <Text style={styles.sectionTitle}>{sec.title}</Text>
                                </View>

                                <View style={styles.chips}>
                                    {sec.items.map((it, i) => (
                                        <View key={i} style={styles.chip}>
                                            {/* first bold phrase before colon becomes the chip label */}
                                            <Text style={styles.chipText}>
                                                {it.includes(":") ? it.split(":")[0] : it}
                                            </Text>
                                            {it.includes(":") && (
                                                <Text style={styles.chipSub}>
                                                    {" " + it.slice(it.indexOf(":") + 1)}
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        width: "100%",
    },
    card: {
        borderRadius: 24,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.6)",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        color: "#3b2e0c",
        letterSpacing: 0.3,
    },
    chevron: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.35)",
    },
    chevronText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3b2e0c",
    },
    body: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: "rgba(255,255,255,0.75)",
    },
    section: {},
    sectionGap: { marginTop: 12, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.06)", paddingTop: 12 },
    sectionTitleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    sectionIcon: { fontSize: 18, marginRight: 6 },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#3c2f2f" },
    chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        maxWidth: "100%",
    },
    chipText: { fontWeight: "700", color: "#2c2c2c" },
    chipSub: { color: "#6b6b6b" },
});
