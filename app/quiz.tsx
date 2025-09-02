import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, PanResponder, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
    // Fade animation for wrong answer modal
    const fadeAnim = useRef(new Animated.Value(0)).current;
    // Draggable popup position
    const initialPopupPosition = useRef({ x: 20, y: Dimensions.get('window').height * 0.55 }).current;
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

    // Country facts: 2 landmarks + 3 dinner dishes per country slug
    const countryFacts: { [key: string]: string } = {
        spain: "Landmarks: Sagrada Familia, Park Güell. Dishes: Paella, Gazpacho, Tortilla Española.",
        france: "Landmarks: Eiffel Tower, Louvre Museum. Dishes: Coq au Vin, Bouillabaisse, Ratatouille.",
        russia: "Landmarks: Red Square, Hermitage Museum. Dishes: Borscht, Beef Stroganoff, Pelmeni.",
        ethiopia: "Landmarks: Lalibela Churches, Simien Mountains. Dishes: Injera (with Doro Wat), Kitfo, Tibs.",
        nz: "Landmarks: Milford Sound, Sky Tower. Dishes: Hangi, Pavlova, Fish and Chips.",
        philippines: "Landmarks: Banaue Rice Terraces, Boracay Beach. Dishes: Adobo, Lechón, Sinigang.",
        png: "Landmarks: Kokoda Trail, Mount Wilhelm. Dishes: Mumu, Sago, Kokoda (fish dish).",
        sweden: "Landmarks: Vasa Museum, Ice Hotel. Dishes: Swedish Meatballs, Gravlax, Janssons Frestelse.",
        germany: "Landmarks: Brandenburg Gate, Neuschwanstein Castle. Dishes: Sauerbraten, Schnitzel, Bratwurst.",
        uk: "Landmarks: Big Ben, Stonehenge. Dishes: Fish and Chips, Shepherd's Pie, Bangers and Mash.",
        usa: "Landmarks: Statue of Liberty, Grand Canyon. Dishes: BBQ Ribs, Mac and Cheese, Apple Pie.",
        japan: "Landmarks: Mount Fuji, Fushimi Inari Shrine. Dishes: Sushi, Ramen, Tempura.",
        china: "Landmarks: Great Wall, Forbidden City. Dishes: Peking Duck, Dim Sum, Kung Pao Chicken.",
        india: "Landmarks: Taj Mahal, Red Fort. Dishes: Butter Chicken, Biryani, Masala Dosa.",
        australia: "Landmarks: Sydney Opera House, Uluru. Dishes: Meat Pie, Barramundi, Chicken Parmigiana.",
        mongolia: "Landmarks: Erdene Zuu Monastery, Gobi Desert. Dishes: Buuz, Khorkhog, Bansh.",
        norway: "Landmarks: Geirangerfjord, North Cape. Dishes: Fårikål, Lutefisk, Reindeer Steak.",
        iceland: "Landmarks: Blue Lagoon, Gullfoss. Dishes: Lamb Soup, Plokkfiskur, Skyr.",
        finland: "Landmarks: Suomenlinna, Santa Claus Village. Dishes: Karjalanpiirakka, Salmon Soup, Sautéed Reindeer.",
        netherlands: "Landmarks: Anne Frank House, Keukenhof Gardens. Dishes: Stamppot, Bitterballen, Erwtensoep.",
        switzerland: "Landmarks: Matterhorn, Jungfraujoch. Dishes: Fondue, Rösti, Raclette.",
        taiwan: "Landmarks: Taipei 101, Taroko Gorge. Dishes: Beef Noodle Soup, Gua Bao, Oyster Omelet.",
        hk: "Landmarks: Victoria Peak, Tian Tan Buddha. Dishes: Dim Sum, Char Siu, Egg Tarts.",
        malaysia: "Landmarks: Petronas Towers, Batu Caves. Dishes: Nasi Lemak, Rendang, Laksa.",
        laos: "Landmarks: Luang Prabang, Wat Phou. Dishes: Larb, Or Lam, Sticky Rice.",
        afghanistan: "Landmarks: Band-e-Amir, Minaret of Jam. Dishes: Kabuli Pulao, Mantu, Qabili Palaw.",
        colombia: "Landmarks: Cartagena Old City, Cocora Valley. Dishes: Bandeja Paisa, Ajiaco, Sancocho.",
        uzbekistan: "Landmarks: Registan Square, Itchan Kala. Dishes: Plov, Lagman, Samsa.",
        srilanka: "Landmarks: Sigiriya Rock, Temple of the Tooth. Dishes: Rice and Curry, Hoppers, Kottu Roti.",
        south_sudan: "Landmarks: Boma National Park, White Nile. Dishes: Asida, Ful Medames, Kisra.",
        saudi_arabia: "Landmarks: Masjid al-Haram, Mada'in Salih. Dishes: Kabsa, Mandi, Mutabbaq."
    };

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
            // Reset popup position
            pan.setValue(initialPopupPosition);
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();


        }
    };

    const handleClosePopup = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setIsCorrect(null);
            pan.setValue(initialPopupPosition);
        });
    };

    function getImageSource(slug: string) {
        const entry = countriesManifest[slug];
        if (!entry) return null;
        return entry;
    }

    const CARD_WIDTH = "92%";

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

                {/* Wrong Answer Draggable Popup (non-blocking) */}
                {isCorrect === false && (
                    <Animated.View
                        style={[
                            styles.draggableContainer,
                            { opacity: fadeAnim, transform: pan.getTranslateTransform() },
                        ]}
                        {...panResponder.panHandlers}
                        pointerEvents="auto"
                    >
                        <View style={{ position: "relative", padding: 16, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 12, width: "100%" }}>
                            <Text style={styles.countryFact}> {questions[currentQuestion].slug} :
                                {countryFacts[questions[currentQuestion].slug] || "More information coming soon!"}</Text>
                            <Pressable onPress={handleNextQuestion} style={{ position: "absolute", top: 8, right: 8, padding: 6 }}>
                                <Ionicons name="close" size={18} color="#6b7280" />
                            </Pressable>
                        </View>
                    </Animated.View>
                )}

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
    countryInfoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    countryInfoCard: {
        borderRadius: 20,
        overflow: "hidden",
        width: "85%",
    },
    countryInfoContent: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        gap: 16,
    },
    countryHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    countryName: {
        fontSize: 22,
        fontWeight: "900",
        fontFamily: "SpaceMono",
        color: "#E67E22",
        letterSpacing: 1,
    },
    correctAnswerText: {
        fontSize: 16,
        fontFamily: "SpaceMono",
        color: colors.textDark,
        textAlign: "center",
        marginBottom: 8,
    },
    factContainer: {
        backgroundColor: "rgba(230, 126, 34, 0.1)",
        borderRadius: 12,
        padding: 16,
        width: "100%",
        borderLeftWidth: 4,
        borderLeftColor: "#E67E22",
    },
    didYouKnow: {
        fontSize: 14,
        fontWeight: "800",
        fontFamily: "SpaceMono",
        color: "#E67E22",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    countryFact: {
        fontSize: 15,
        fontFamily: "SpaceMono",
        color: "#5D4037",
        lineHeight: 22,
        textAlign: "left",
    },
    autoProgressContainer: {
        alignItems: "center",
        gap: 8,
        marginTop: 8,
    },
    progressDots: {
        flexDirection: "row",
        gap: 6,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E67E22",
        opacity: 0.6,
    },
    autoProgressText: {
        fontSize: 12,
        fontFamily: "SpaceMono",
        color: "#9CA3AF",
        fontStyle: "italic",
    },
    draggableContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 100,
        width: "92%",
    },
});
