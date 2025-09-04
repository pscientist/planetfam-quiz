// components/InfoSheet.tsx (simplified, fixed-height, always-scrollable)
import { ScrollView, StyleSheet, Text, View } from "react-native";

type InfoSheetProps = {
    country: string;
    sections: {
        title: string;
        icon?: string;
        items: string[];
    }[];
    compact?: boolean;
};

export default function InfoSheet({ country, sections }: InfoSheetProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                <Text>Quisquam, quos voluptatum exercitationem dolor.</Text>
                <Text>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                <Text>Ut enim ad minim veniam, quis nostrud exercitation.</Text>
                <Text>Duis aute irure dolor in reprehenderit in voluptate velit esse.</Text>
                <Text>Excepteur sint occaecat cupidatat non proident.</Text>
                <Text>Sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                <Text>At vero eos et accusamus et iusto odio dignissimos.</Text>
                <Text>Et harum quidem rerum facilis est et expedita distinctio.</Text>
                <Text>Nam libero tempore, cum soluta nobis est eligendi optio.</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        width: "100%",
    },
    scroll: {
        flex: 1,
        height: 600,
    },
    scrollContent: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
});
