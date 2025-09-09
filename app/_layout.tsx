import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from 'expo-updates';
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RoundProvider, useRound } from "./contexts/RoundContext";
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
      <Ionicons name="home" size={30} color="#3b2f0b" />
    </TouchableOpacity>
  );
}

function HeaderTitle() {
  const { score } = useScore();
  const { currentRound, getNextRoundToPlay, getTotalRounds } = useRound();

  return (
    <View style={styles.scoresBar}>
      {(() => {
        const nextRound = getNextRoundToPlay();
        const totalRounds = getTotalRounds();
        const completedCount = nextRound === 0 ? totalRounds : Math.max(0, nextRound - 1);
        const progress = totalRounds > 0 ? completedCount / totalRounds : 0;
        const progressPercent = Math.round(progress * 100);
        return (
          <View style={{ alignItems: "center" }}>
            <View style={styles.levelRow}>
              <Text style={styles.levelText}>Level {completedCount} / {totalRounds}</Text>
              <Text style={styles.levelText}>{progressPercent}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        );
      })()}
    </View>
  );
}

function AppHeader({ navigation, back }: any) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#FFD700", "#E0AA3E", "#E6D5B8"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ paddingTop: insets.top, paddingBottom: 8 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12 }}>
        {back ? (
          <TouchableOpacity onPress={navigation.goBack} style={{ paddingRight: 8 }}>
            <Ionicons name="chevron-back" size={28} color="#3b2f0b" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 28 }} />
        )}
        <HeaderTitle />
        <HomeButton />
      </View>
    </LinearGradient>
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
        header: (props) => <AppHeader {...props} />,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "SpaceMono",
          fontSize: 20,
          color: "#3b2f0b",
        },
        headerTintColor: "#3b2f0b",
        headerShadowVisible: false,
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
        console.log("Error checking for Expo updates");
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

const styles = StyleSheet.create({
  scoresBar: {
    paddingVertical: 2,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  titleText: {
    color: "#3b2f0b",
    fontFamily: "SpaceMono",
    fontSize: 14,
  },
  levelRow: {
    marginTop: 2,
    width: 180,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelText: {
    color: "#3b2f0b",
    fontFamily: "SpaceMono",
    fontSize: 14,
  },
  progressTrack: {
    marginTop: 4,
    width: 180,
    height: 8,
    backgroundColor: "rgba(59,47,11,0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b2f0b",
  },
});