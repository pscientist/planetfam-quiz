import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import countriesManifest from "../assets/images/countries/countriesManifest";
import questions from "../data/questions";

export default function QuizScreen() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsCorrect(null);
        } else {
            router.push({
                pathname: "/results",
                params: {
                    score: score.toString(),
                    total: questions.length.toString(),
                },
            });
        }
    };

    const handleOptionPress = (option: string) => {
        if (option == questions[currentQuestion].answer) {
            setIsCorrect(true);
            setScore(score + 1);
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
                <Image
                    source={getImageSource(questions[currentQuestion].slug)}
                    resizeMode="contain"
                    style={{ marginBottom: 20 }}
                />

                <BlurView intensity={40} tint="dark" style={styles.optionsCard}>
                    <FlatList
                        data={questions[currentQuestion].options}
                        keyExtractor={(item, i) => `${i}-${item}`}
                        renderItem={({ item }) => {
                            const isCorrectChoice = item == questions[currentQuestion].answer;
                            return (
                                <TouchableOpacity
                                    onPress={() => handleOptionPress(item)}
                                    activeOpacity={0.9}
                                    style={[
                                        styles.option,
                                        isCorrect && isCorrectChoice && styles.optionCorrect,
                                        isCorrect === false && styles.optionWrong,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            isCorrect && isCorrectChoice && styles.optionTextCorrect,
                                            isCorrect === false && styles.optionTextWrong,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        contentContainerStyle={{ gap: 12, padding: 12 }}
                    />
                </BlurView>

                {isCorrect === false && (
                    <View style={styles.feedbackBox}>
                        <Text style={styles.niceTry}>Nice try!</Text>
                        <Text style={styles.correctLine}>
                            The correct answer is <Text style={styles.correctInline}>{questions[currentQuestion].answer}</Text>.
                        </Text>
                    </View>
                )}

                {isCorrect !== null && (
                    <Pressable onPress={handleNextQuestion} style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.8 }]}>
                        <Text style={styles.nextText}>Next</Text>
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
        justifyContent: "center",
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
        width: "95%",
        height: 200,
        marginBottom: 20,
        alignSelf: "center",
    },
    optionsContainer: {
        width: "100%",
        alignItems: "center",
    },
    optionButton: {
        backgroundColor: "#FFE0B2",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginVertical: 20,
        width: "80%",
        alignItems: "center",
    },
    option: {
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: "#FFE0B2",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    optionCorrect: {
        backgroundColor: "#E67E22",
    },
    optionWrong: {
        backgroundColor: "#e5e7eb",
        opacity: 0.4,
    },
    optionText: {
        fontSize: 22,
        fontWeight: "900",
        fontFamily: "SpaceMono",
        letterSpacing: 1,
        color: "#8B4000",
        textAlign: "center",
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
});