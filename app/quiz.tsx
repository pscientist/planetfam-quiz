import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import countriesManifest from '../assets/images/countries/countriesManifest';
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
                pathname: '/results',
                params: {
                    score: score.toString(),
                    total: questions.length.toString()
                }
            });
        }
    }

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
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Image
                    source={getImageSource(questions[currentQuestion].slug)}
                    resizeMode="contain"
                    style={{ marginBottom: 50 }}
                />
                <FlatList
                    data={questions[currentQuestion].options}
                    keyExtractor={(item, i) => `${i}-${item}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => handleOptionPress(item)}
                                style={[
                                    styles.option,
                                    isCorrect && item == questions[currentQuestion].answer && styles.optionCorrect,
                                    isCorrect === false && styles.optionWrong,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        isCorrect && item == questions[currentQuestion].answer && styles.optionTextCorrect,
                                        isCorrect === false && styles.optionTextWrong,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={{ gap: 12 }}
                />

                {/* wrong answer feedback */}
                {isCorrect === false && (
                    <View style={styles.feedbackBox}>
                        <Text style={styles.niceTry}>Nice try!</Text>
                        <Text style={styles.correctLine}>
                            The correct answer is{" "}
                            <Text style={styles.correctInline}>
                                {questions[currentQuestion].answer}
                            </Text>
                            .
                        </Text>
                    </View>
                )}

                {/* Got the answer, prompt for next question */}
                {isCorrect !== null && (
                    <Pressable onPress={handleNextQuestion} style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.8 }]}>
                        <Text style={styles.nextText}>Next</Text>
                    </Pressable>
                )}
            </SafeAreaView >
        </View >
    );
}

const colors = {
    bg: "#FFF8F0",  // Light beige background
    card: "#FFF8F0", // Light beige
    correctGreen: "#E67E22", // Orange instead of green
    correctGreenText: "#8B4000", // Dark brown
    wrongGrey: "#9ca3af",
    textDark: "#5D4037", // Warm brown
    friendlyPurple: "#D35400", // Darker orange instead of purple
};

const styles = StyleSheet.create({
    modalButton: {
        backgroundColor: "#E67E22", // Orange
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        padding: 20,
        height: "50%",
    },
    modalText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#E67E22", // Orange
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F0", // Light beige
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 80,
        color: "#8B4000", // Dark brown
    },
    image: {
        width: "95%",      // or "80%" for responsive width
        height: 200,     // adjust as needed for aspect ratio
        marginBottom: 20, // optional: space below image
        alignSelf: "center", // center the image
    },
    optionsContainer: {
        width: "100%",
        alignItems: "center",
    },
    optionButton: {
        backgroundColor: "#FFE0B2", // Light orange
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginVertical: 20,
        width: "80%",
        alignItems: "center",
    },
    option: {
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 100,
        backgroundColor: "#FFE0B2", // Light orange
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionCorrect: {
        backgroundColor: "#E67E22", // Orange
    },
    optionWrong: {
        backgroundColor: "#e5e7eb",
        opacity: 0.4, // faded grey look
    },
    optionText: {
        fontSize: 23,
        fontWeight: "700",
        color: '#8B4000', // even darker orange
        textAlign: 'center',
    },
    optionTextCorrect: {
        color: "#ffffff",
        fontWeight: "900", // bold for correct
    },
    optionTextWrong: {
        color: colors.wrongGrey,
        fontWeight: "600",
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
        color: colors.friendlyPurple,
    },
    correctLine: {
        fontSize: 16,
        color: colors.textDark,
    },
    correctInline: {
        color: colors.correctGreen,
        fontWeight: "900",
    },
    fact: {
        fontSize: 15,
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
        color: "#fff",
    },
});