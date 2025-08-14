import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Country!</Text>
      <Image
        source={require("../assets/images/afghanistan.webp")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.description}>Test your world smarts! Each round, you’ll get an image to guess the country. (eg. Afghanistan for the above)
        Ready?</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        router.push("/quiz");
        // router.push({
        //   pathname: "/results",
        //   params: {
        //     score: "7",
        //     total: "10",
        //   },
        // });
      }}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF8F0", // Light beige
  },
  logo: {
    width: "95%",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Comic Neue",
    fontSize: 25,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#8B4000", // Dark brown
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
    width: "75%",
  },
  description: {
    fontFamily: "Comic Neue",
    fontSize: 22,
    fontWeight: "500",
    color: "#5D4037", // Warm brown
    marginBottom: 32,
    textAlign: "left",
    width: "75%",
  },
  button: {
    backgroundColor: "#E67E22", // Orange
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
