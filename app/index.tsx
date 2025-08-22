import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const debug = true;

export default function Index() {

  if (debug) {
    return <Redirect href="/cod" />;
  }

  const router = useRouter();
  return (
    <LinearGradient
      colors={['#FFD700', '#E0AA3E', '#E6D5B8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <BlurView intensity={40} tint="dark" style={styles.card}>
          <Text style={styles.title}>Guess the Country!</Text>
          <Image
            source={require("../assets/images/afghanistan.webp")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.description}>
            Test your world smarts! Each round, you'll get an image to guess the country. Ready?
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/quiz");
            }}
            activeOpacity={0.9}
          >
            <Ionicons name="sparkles" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Start Quiz</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIconTrailing} />
          </TouchableOpacity>
        </BlurView>
      </View>
    </LinearGradient>
  );
}

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
  card: {
    width: "92%",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    width: "95%",
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    fontFamily: "SpaceMono",
    fontSize: 34,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#fff",
    marginBottom: 6,
    marginTop: 4,
    textAlign: "center",
    width: "90%",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  description: {
    fontFamily: "SpaceMono",
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
    width: "90%",
  },
  button: {
    backgroundColor: "#E67E22",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "SpaceMono",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonIconTrailing: {
    marginLeft: 8,
  },
});
