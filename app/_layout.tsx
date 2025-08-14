import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
          letterSpacing: 3,
          textTransform: "uppercase",
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
        headerRight: () => (
          <Ionicons name="sparkles" size={20} color="#3b2f0b" style={{ marginRight: 12 }} />
        ),
      }}
    />
  );
}