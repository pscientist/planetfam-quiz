import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from 'expo-updates';
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { RoundProvider } from "./contexts/RoundContext";
import { ScoreProvider, useScore } from "./contexts/ScoreContext";

SplashScreen.preventAutoHideAsync();

function HomeButton() {
  const { resetScore } = useScore();
  const router = useRouter();
  const pathName = usePathname();
  const isInQuiz = pathName === "/quiz";

  const handleHomePress = () => {
    resetScore();
    router.replace('/menu');
  };

  return (
    <TouchableOpacity disabled={isInQuiz} onPress={handleHomePress}
      style={{ marginRight: 12, opacity: isInQuiz ? 0.5 : 1 }}>
      <Ionicons name="home" size={20} color="#3b2f0b" />
    </TouchableOpacity>
  );
}

function StackContent() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: "PlanetFam",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "SpaceMono",
          fontSize: 20,
          color: "#3b2f0b",
        },
        headerTintColor: "#3b2f0b",
        headerShadowVisible: false,
        headerBackground: () => (
          <LinearGradient
            colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        headerRight: () => <HomeButton />,
      }}
    />
  );
}

export default function RootLayout() {

  useEffect(() => {
    (async () => {
      try {
        const res = await Updates.checkForUpdateAsync();
        if (res.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch {
        console.log("Error checking for updates");
      }
    })();
  }, []);

  return (
    <RoundProvider>
      <ScoreProvider>
        <StackContent />
      </ScoreProvider>
    </RoundProvider>
  );
}