import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import countriesManifest from "../assets/images/countries/countriesManifest";
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

                <FlagCollection collectedCountries={collectedCountries} />

                <Image style={styles.image}
                    source={getImageSource(questions[currentQuestion].slug)}
                    resizeMode="contain"
                />

                <View style={{ marginTop: 20 }}></View>

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
                                        pressed && { transform: [{ scale: 0.98 }] },
                                    ]}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "stretch", gap: 10 }}>
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
                        contentContainerStyle={{ gap: 6, padding: 6 }}
                    />
                </BlurView>

                {confettiVisible && (<ConfettiCannon
                    origin={{ x: Dimensions.get('window').width / 2, y: Dimensions.get('window').height * 0.3 }}
                    count={100}
                    explosionSpeed={1000}    // bigger initial kick
                    fallSpeed={3000}         // end sooner
                    fadeOut                  // disappear quickly
                    autoStart
                />
                )}

                {/* Wrong Answer Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isCorrect === false}
                    onRequestClose={() => setIsCorrect(null)}
                >
                    <View style={styles.modalOverlay}>
                        <BlurView intensity={50} tint="dark" style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.niceTry}>Nice try!</Text>
                                <Text style={styles.correctLine}>
                                    The correct answer is <Text style={styles.correctInline}>{questions[currentQuestion].answer}</Text>.
                                </Text>
                                <Pressable
                                    onPress={handleNextQuestion}
                                    style={({ pressed }) => [styles.modalNextBtn, pressed && { opacity: 0.8 }]}
                                >
                                    <Text style={styles.nextText}>Continue</Text>
                                </Pressable>
                            </View>
                        </BlurView>
                    </View>
                </Modal>

                {/* Next button for correct answers only */}
                {isCorrect === true && (
                    <Pressable
                        onPress={handleNextQuestion}
                        style={({ pressed }) => [styles.nextBtnSmall, pressed && { opacity: 0.8 }]}
                    >

                        <Text style={styles.nextTextSmall}>→</Text>
                    </Pressable>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const colors = {
    bg: "#FFF8F0",
    card: "#FFF8F0",
    correctGreen: "#E67E22",
    correctGreenText: "#8B4000",
    wrongGrey: "#9ca3af",
    textDark: "#5D4037",
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F0",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 80,
        color: "#8B4000",
    },
    image: {
        width: 450,
        height: 300,
        alignSelf: "center",
    },
    optionsContainer: {
        width: "100%",
        alignItems: "center",
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
    optionTextWrong: {
        color: colors.wrongGrey,
        fontWeight: "600",
        fontFamily: "SpaceMono",
    },
    feedbackBox: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        gap: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        borderRadius: 20,
        overflow: "hidden",
        margin: 20,
        width: "85%",
    },
    modalContent: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        gap: 16,
    },
    modalNextBtn: {
        backgroundColor: colors.friendlyPurple,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: "center",
        marginTop: 8,
    },
    niceTry: {
        fontSize: 18,
        fontWeight: "800",
        fontFamily: "SpaceMono",
        color: colors.friendlyPurple,
    },
    correctLine: {
        fontSize: 16,
        fontFamily: "SpaceMono",
        color: colors.textDark,
    },
    correctInline: {
        color: colors.correctGreen,
        fontWeight: "900",
        fontFamily: "SpaceMono",
    },
    fact: {
        fontSize: 15,
        fontFamily: "SpaceMono",
        color: "#334155",
    },
    nextBtn: {
        marginTop: 4,
        backgroundColor: colors.friendlyPurple,
        borderRadius: 14,
        padding: 14,
        alignItems: "center",
    },
    nextText: {
        fontSize: 18,
        fontWeight: "800",
        fontFamily: "SpaceMono",
        color: "#fff",
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
    checkBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#22c55e",
        alignItems: "center",
        justifyContent: "center",
    },
});
