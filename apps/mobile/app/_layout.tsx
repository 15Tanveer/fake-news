import "react-native-gesture-handler";
import "../global.css";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  AppControllerProvider,
  useAppControllerContext,
} from "@mobile/core/providers/AppControllerProvider";

function AppShell() {
  const app = useAppControllerContext();

  if (app.booting) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#34d399" />
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0c1939" } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="drawer" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
      </Stack>
      {app.errorMessage ? <Text style={styles.errorText}>{app.errorMessage}</Text> : null}
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppControllerProvider>
          <AppShell />
        </AppControllerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    backgroundColor: "#0c1939",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c1939",
  },
  errorText: {
    color: "#f87171",
    textAlign: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
