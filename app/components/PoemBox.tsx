
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, Text, View } from 'react-native';
import poemData from '../../assets/poems3.json';
import { Poems } from '../lib/types';

export default function PoemBox({ countrySlug }: { countrySlug: string }) {

    const poems = poemData as Poems;

    return (<LinearGradient
        colors={["#B8860B", "#8B6914", "#704214"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.poemBox}
    >
        <Text style={styles.poemText}>
            {poems[countrySlug]?.[0]?.original}
        </Text>
        <View style={styles.poemSeparator} />
        <Text style={styles.poemTextEnglish}>
            {poems[countrySlug]?.[0]?.translation}

        </Text>
        <Text style={styles.poemTextAuthor}>
            ~ {poems[countrySlug]?.[0]?.author}
        </Text>
    </LinearGradient >
    );
}

const styles = StyleSheet.create({
    poemBox: {
        width: "100%",
        backgroundColor: "rgba(255, 245, 230, 0.3)",
        borderColor: "rgba(255, 224, 178, 0.4)",
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    poemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "rgba(255,255,255,1)",
        marginVertical: 8,
        alignSelf: "center",
        width: "75%",
    },
    poemText: {
        fontFamily: Platform.select({ ios: "serif", android: "serif", default: "serif" }),
        fontSize: 16,
        lineHeight: 22,
        color: "#fff",
        textAlign: "center",
        opacity: 1,
        fontStyle: "italic",
        letterSpacing: 1,
    },
    poemTextAuthor: {
        fontFamily: Platform.select({ ios: "serif", android: "serif", default: "serif" }),
        fontSize: 14,
        lineHeight: 20,
        color: "#fff",
        textAlign: "center",
        opacity: 1,
    },
    poemFlagEmoji: {
        position: "absolute",
        top: 6,
        left: 8,
        fontSize: 20,
        lineHeight: 20,
    },
    poemTextEnglish: {
        fontFamily: Platform.select({ ios: "serif", android: "serif", default: "serif" }),
        fontSize: 14,
        lineHeight: 22,
        color: "#fff",
        textAlign: "center",
        opacity: 1,
        fontStyle: "italic",
        letterSpacing: 1,
    },
});