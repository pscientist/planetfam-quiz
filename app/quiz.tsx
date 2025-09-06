import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, PanResponder, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import countriesManifest from "../assets/images/countries/countriesManifest";
import { countryFacts } from "../data/constants";
import { getQuestionsForRound } from "../data/questions";
import FlagCollection from "./components/FlagCollection";
import { useRound } from "./contexts/RoundContext";
import { useScore } from "./contexts/ScoreContext";

export default function QuizScreen() {
    const router = useRouter();
    const { score, incrementScore, addCollectedCountry, addAllCollectedCountry } = useScore();
    const { currentRound } = useRound();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { collectedCountries } = useScore();
    const [confettiVisible, setConfettiVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    // Fade animation for wrong answer modal

    const fadeAnim = useRef(new Animated.Value(0)).current;
    // Draggable popup position
    const initialPopupPosition = useRef({ x: 20, y: Dimensions.get('window').height * 0.50 }).current;
    const pan = useRef(new Animated.ValueXY(initialPopupPosition)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({ x: (pan.x as any)._value, y: (pan.y as any)._value });
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x, dy: pan.y },
            ], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    const questions = getQuestionsForRound(currentRound);

    // Add this after line 21
    if (!questions.length || currentQuestion >= questions.length || currentQuestion < 0) {
        return <Text>No questions available for round: {currentRound}</Text>;
    }

    const currentQuestionData = questions[currentQuestion];
    if (!currentQuestionData) {
        return <Text>Invalid question num: {currentQuestion} </Text>;
    }


    const handleNextQuestion = () => {
        // Reset popup state when moving to the next question
        setPopupVisible(false);
        fadeAnim.setValue(0);
        pan.setValue(initialPopupPosition);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsCorrect(null);
            // the last question    
        } else {
            setIsCorrect(null);
            router.replace({
                pathname: "/results",
                params: {
                    score: score.toString(),
                    total: questions.length.toString(),
                },
            });
        }
    };

    const handleOptionPress = (option: string) => {

        if (isCorrect !== null) return;// already answered

        if (option == questions[currentQuestion].answer) {
            setIsCorrect(true);
            incrementScore();
            addCollectedCountry(questions[currentQuestion].slug);
            addAllCollectedCountry(questions[currentQuestion].slug);
            setConfettiVisible(true);

            setTimeout(() => {
                setConfettiVisible(false);
            }, 3000);
        } else {
            setIsCorrect(false);
            // Reset popup position
            pan.setValue(initialPopupPosition);
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
            // Show popup automatically on wrong answers
            setPopupVisible(true);
        }

    };

    function getImageSource(slug: string) {
        const entry = countriesManifest[slug];
        if (!entry) return null;
        return entry;
    }

    return (
        <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <SafeAreaView style={styles.overlay}>

                {/* Score indicator */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Level:{currentRound}  Score:{score}  Total: {questions.length}
                    </Text>
                </View>

                {/* Flag collection */}
                <FlagCollection collectedCountries={collectedCountries} />

                {/* Flag image */}
                <Image style={styles.image}
                    source={getImageSource(questions[currentQuestion].slug)}
                    resizeMode="contain"
                />

                <View style={styles.spacer20} />

                {/* Options */}
                <BlurView intensity={40} tint="dark" style={styles.optionsCard}>
                    <FlatList
                        data={questions[currentQuestion].options}
                        keyExtractor={(item, i) => `${i}-${item}`}
                        renderItem={({ item }) => {
                            const isCorrectChoice = item == questions[currentQuestion].answer;

                            return (
                                <Pressable
                                    onPress={() => handleOptionPress(item)}
                                    style={({ pressed }) => [
                                        styles.option,
                                        isCorrect && isCorrectChoice && styles.optionCorrect,
                                        isCorrect === false && styles.optionWrong,
                                        pressed && styles.pressedScale,
                                    ]}
                                >
                                    <View style={styles.optionRow}>
                                        {isCorrect !== null && isCorrectChoice && (
                                            <View style={styles.checkBadge}>
                                                <Ionicons name="checkmark" size={16} color="#fff" />
                                            </View>
                                        )}
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isCorrect && isCorrectChoice && styles.optionTextCorrect,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        }}
                        contentContainerStyle={styles.optionsListContent}
                    />
                </BlurView>

                {/* Confetti */}
                {confettiVisible && (<ConfettiCannon
                    origin={{ x: Dimensions.get('window').width / 2, y: Dimensions.get('window').height * 0.3 }}
                    count={100}
                    explosionSpeed={1000}    // bigger initial kick
                    fallSpeed={2000}         // 2 seconds for falling
                    fadeOut                  // disappear quickly
                    autoStart
                />
                )}

                {/* Info popup - non-modal floating window */}
                {popupVisible && (
                    <View style={styles.floatingPopup}>
                        <View style={styles.floatingPopupContainer}>
                            <View style={styles.popupHeader}>
                                <Text style={styles.popupTitle}>{questions[currentQuestion].answer}</Text>
                                <Pressable onPress={() => { setPopupVisible(false); handleNextQuestion(); }} style={styles.popupCloseBtn}>
                                    <Ionicons name="close" size={18} color="#6b7280" />
                                </Pressable>
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={true}
                                style={styles.popupScrollView}
                                contentContainerStyle={styles.popupScrollContent}
                            >
                                <Text style={styles.popupText}>{countryFacts[questions[currentQuestion].slug]}</Text>
                            </ScrollView>

                        </View>
                    </View>
                )}

                {/* Info button for correct answers - opens popup on demand */}
                {isCorrect === true && (
                    <Pressable
                        onPress={() => {
                            pan.setValue(initialPopupPosition);
                            fadeAnim.setValue(1);
                            setPopupVisible(true);
                        }}
                        style={({ pressed }) => [styles.infoBtnSmall, pressed && styles.pressedOpacity]}
                    >
                        <Ionicons name="information-circle" size={22} color="#fff" />
                    </Pressable>
                )}

                {/* Next button for correct answers only */}
                {isCorrect === true && (
                    <Pressable
                        onPress={handleNextQuestion}
                        style={({ pressed }) => [styles.nextBtnSmall, pressed && styles.pressedOpacity]}
                    >

                        <Text style={styles.nextTextSmall}>→</Text>
                    </Pressable>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const colors = {
    friendlyPurple: "#D35400",
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    optionsCard: {
        width: "92%",
        borderRadius: 18,
        paddingVertical: 8,
        overflow: "hidden",
        marginBottom: 12,
    },
    image: {
        width: 450,
        height: 300,
        alignSelf: "center",
    },
    option: {
        borderRadius: 14,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.18)",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.85)",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    optionCorrect: {
        backgroundColor: "#E67E22",
        borderColor: "#ffffff",
    },
    optionWrong: {
        backgroundColor: "#e5e7eb",
        opacity: 0.4,
    },
    optionText: {
        fontSize: 18,
        fontWeight: "900",
        fontFamily: "SpaceMono",
        letterSpacing: 1,
        color: "#ffffff",
        textAlign: "center",
        textShadowColor: "rgba(0,0,0,0.35)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    optionTextCorrect: {
        color: "#ffffff",
        fontWeight: "900",
        fontFamily: "SpaceMono",
    },
    progressContainer: {
        top: 10,
    },
    progressText: {
        fontSize: 16,
        fontWeight: '800',
        fontFamily: 'SpaceMono',
        color: '#ffffff',
        letterSpacing: 1,
    },
    nextBtnSmall: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: colors.friendlyPurple,
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    nextTextSmall: {
        fontSize: 24,
        fontWeight: "800",
        color: "#fff",
    },
    infoBtnSmall: {
        position: 'absolute',
        bottom: 30,
        right: 80,
        backgroundColor: colors.friendlyPurple,
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    checkBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#22c55e",
        alignItems: "center",
        justifyContent: "center",
    },
    countryFact: {
        fontSize: 15,
        fontFamily: "SpaceMono",
        color: "#5D4037",
        lineHeight: 22,
        textAlign: "left",
    },
    countryFactContainer: {
        marginTop: 4,
    },
    factSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    factIcon: {
        marginRight: 6,
    },
    countryName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    draggableContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 100,
        width: "75%",
        maxHeight: 200,
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 12,
        padding: 16,
    },
    spacer20: {
        marginTop: 20,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "stretch",
        gap: 10,
    },
    optionsListContent: {
        gap: 6,
        padding: 6,
    },
    floatingPopup: {
        position: 'absolute',
        top: 440,
        // right: 20,
        zIndex: 100,
    },
    floatingPopupContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        maxHeight: 400,
        minHeight: 250,
        width: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    popupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    popupTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        fontFamily: 'SpaceMono',
    },
    popupCloseBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
    },
    popupScrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    popupScrollContent: {
        paddingVertical: 16,
        paddingBottom: 20,
    },
    popupText: {
        fontSize: 15,
        color: '#374151',
        marginBottom: 12,
        lineHeight: 22,
        fontFamily: 'SpaceMono',
    },
    popupNextBtn: {
        backgroundColor: colors.friendlyPurple,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    popupNextText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'SpaceMono',
    },
    pressedScale: {
        transform: [{ scale: 0.98 }],
    },
    pressedOpacity: {
        opacity: 0.8,
    },
});
