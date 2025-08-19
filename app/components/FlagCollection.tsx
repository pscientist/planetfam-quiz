import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface FlagCollectionProps {
    collectedCountries: string[];
    title?: string;
}

export default function FlagCollection({ collectedCountries, title = "Flags Collected" }: FlagCollectionProps) {
    const getFlagEmoji = (slug: string) => {
        const flagMap: { [key: string]: string } = {
            spain: '🇪🇸',
            thai: '🇹🇭',
            russia: '🇷🇺',
            ethiopia: '🇪🇹',
            nz: '🇳🇿',
            philipines: '🇵🇭',
            png: '🇵🇬',
            sweden: '🇸🇪',
            germany: '🇩🇪',
            netherlands: '🇳🇱',
            uk: '🇬🇧',
            srilanka: '🇱🇰',
            switzerland: '🇨🇭',
            finland: '🇫🇮',
            hk: '🇭🇰',
            saudi: '🇸🇦'
        };
        return flagMap[slug] || '🏳️';
    };

    const getCountryName = (slug: string) => {
        const countryNames: { [key: string]: string } = {
            spain: "Spain",
            thai: "Thailand",
            russia: "Russia",
            ethiopia: "Ethiopia",
            nz: "New Zealand",
            philipines: "Philippines",
            png: "Papua New Guinea",
            sweden: "Sweden",
            germany: "Germany",
            netherlands: "Netherlands",
            uk: "United Kingdom",
            srilanka: "Sri Lanka",
            switzerland: "Switzerland",
            finland: "Finland",
            hk: "Hong Kong",
            saudi: "Saudi Arabia"
        };
        return countryNames[slug] || slug;
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flagsContainer}
                contentContainerStyle={styles.flagsContent}
            >
                {collectedCountries.map((slug, index) => {
                    return (
                        <View key={index} style={styles.flagItem}>
                            <Text style={styles.flagEmoji}>{getFlagEmoji(slug)}</Text>
                            <Text style={styles.countryName}>{getCountryName(slug)}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8,
        marginTop: -20,
    },
    title: {
        fontFamily: "SpaceMono",
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyText: {
        fontFamily: "SpaceMono",
        fontSize: 14,
        color: "#ffffff",
        opacity: 0.8,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    flagsContainer: {
        maxHeight: 120,
    },
    flagsContent: {
        paddingHorizontal: 4,
        gap: 8
    },
    flagItem: {
        alignItems: 'center',
        width: 60,
    },
    flagEmoji: {
        fontSize: 50,
        textAlign: 'center',
    },
    countryName: {
        fontSize: 13,
        color: "#ffffff",
        opacity: 0.9,
        textAlign: 'center',
        lineHeight: 13,
    },
});
