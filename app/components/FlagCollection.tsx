import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COUNTRY_NAMES, FLAG_EMOJIS } from '../constants';

interface FlagCollectionProps {
    collectedCountries: string[];
    title?: string;
    scrollable?: boolean;
}

export default function FlagCollection({ collectedCountries, title = "Flags Collected", scrollable = true }: FlagCollectionProps) {
    const getFlagEmoji = (slug: string) => {
        return FLAG_EMOJIS[slug] || '🏳️';
    };

    const getCountryName = (slug: string) => {
        return COUNTRY_NAMES[slug] || slug;
    };

    const flagItems = collectedCountries.map((slug, index) => {
        return (
            <View key={index} style={styles.flagItem}>
                <Text style={styles.flagEmoji}>{getFlagEmoji(slug)}</Text>
                <Text style={styles.countryName}>{getCountryName(slug)}</Text>
            </View>
        );
    });

    return (
        <View style={styles.container}>
            {scrollable ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    style={styles.flagsContainer}
                    contentContainerStyle={styles.flagsContent}
                >
                    {flagItems}
                </ScrollView>
            ) : (
                <View style={[styles.flagsContainer, styles.boxContainer]}>
                    <View style={[styles.flagsContent, styles.boxContent]}>
                        {flagItems}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        marginVertical: 8,
        marginTop: 12,
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
        flex: 0,
    },
    flagsContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 4,
    },
    boxContainer: {
        flex: 0,
        marginTop: 15,
    },
    boxContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 4,
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
