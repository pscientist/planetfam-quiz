import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import countriesManifest from '../assets/images/countries/countriesManifest';
import questions from "../data/questions";

export default function QuizScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [score, setScore] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setModalVisible(true);
        }
    }

    const handleOptionPress = (option: string) => {
        if (option == questions[currentQuestion].answer) {
            setScore(score + 1);
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    };

    function getImageSource(slug: string) {
        const entry = countriesManifest[slug];
        if (!entry) return null;
        return entry;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Guess the Country!</Text>
            <Image
                source={getImageSource(questions[currentQuestion].slug)}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option) =>
                    <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
                        <Text>{option}</Text>
                    </TouchableOpacity>)
                }
            </View>
            <Modal visible={modalVisible} transparent={false} animationType="fade">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Correct!</Text>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={() => { setModalVisible(false); handleNextQuestion(); }}>
                        <Text style={styles.modalButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalButton: {
        backgroundColor: "green",
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
        color: "green",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 400,
    },
    optionsContainer: {
        width: "100%",
        alignItems: "center",
    },
    optionButton: {
        backgroundColor: "#F5E6C5",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginVertical: 6,
        width: "80%",
        alignItems: "center",
    },
    optionText: {
        fontSize: 23,
    },
});