import { Redirect, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useRound } from "./contexts/RoundContext";

export default function Index() {

  const router = useRouter();
  const { areAllRoundsCompleted } = useRound();

  const handleStartQuiz = () => {
    // Don't increment if we're already at the correct round
    // The currentRound should already be set to the next round to play
    router.replace(`/quiz`);
  };

  // if all rounds are completed, redirect to cod
  // if (areAllRoundsCompleted()) { // debug
  if (true) {
    return <Redirect href="/cod" />;
  }

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
  buttonDisabled: {
    backgroundColor: "rgba(136, 136, 136, 0.3)",
    borderWidth: 2,
    borderColor: "rgba(136, 136, 136, 0.5)",
  },
  buttonTextDisabled: {
    color: "#888",
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "SpaceMono",
  },
});
