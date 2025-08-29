import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SHELVES } from './constants';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function Supermarket() {
    const [index, setIndex] = useState(0);
    const [zoomUri, setZoomUri] = useState<any | null>(null);
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 70 };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={SHELVES}
                keyExtractor={(s) => s.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={({ viewableItems }) => {
                    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index!);
                }}
                viewabilityConfig={viewabilityConfig}
                renderItem={({ item }) => (
                    <View style={{ width: WIDTH }}>
                        <Pressable onPress={() => setZoomUri(item.image)} accessibilityRole="imagebutton" accessibilityLabel={`${item.city} shelf, tap to zoom`} style={{ width: WIDTH }}>
                            <Image source={item.image} style={styles.image} resizeMode="cover" />
                        </Pressable>
                    </View>
                )}
            />

            {/* Minimal page indicator */}
            <View style={styles.pageBar}>
                <Text style={styles.city}>{SHELVES[index].city}</Text>
            </View>

            {/* Description card */}
            <View style={styles.card}>
                <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={true}>
                    {SHELVES[index].items.map((it, i) => (
                        <View key={i} style={styles.row}>
                            <Text style={styles.itemName}>{it.name}</Text>
                            <Text style={styles.itemDesc}>{it.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Fullscreen zoom */}
            <Modal visible={!!zoomUri} transparent animationType="fade" onRequestClose={() => setZoomUri(null)}>
                <View style={styles.zoomBackdrop}>
                    <Pressable style={styles.zoomBackdrop} onPress={() => setZoomUri(null)} />
                    <Image source={zoomUri ?? undefined} style={styles.zoomImage} resizeMode="contain" />
                    <Pressable style={styles.close} onPress={() => setZoomUri(null)} accessibilityRole="button" accessibilityLabel="Close">
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    image: { width: WIDTH, height: HEIGHT * 0.67 },
    pageBar: { paddingHorizontal: 20, paddingVertical: 10, marginTop: -100 },
    city: { fontSize: 18, fontWeight: '600', color: '#111' },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        borderRadius: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
    },
    row: { marginBottom: 12 },
    itemName: { fontSize: 18, fontWeight: '600', color: '#111' },
    itemDesc: { fontSize: 16, color: '#333', lineHeight: 22 },
    zoomBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomImage: { width: WIDTH * 0.95, height: HEIGHT * 0.85 },
    close: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    closeText: { fontSize: 14, fontWeight: '600', color: '#111' },
});
