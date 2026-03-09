import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAppController } from "@mobile/hooks/useAppController";
import { RootNavigator } from "@mobile/navigation/RootNavigator";
import { BootScreen } from "@mobile/screens/routes/BootScreen";

export default function App() {
  const app = useAppController();

  if (app.booting) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <BootScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigator app={app} />
      {app.errorMessage ? (
        <Text className="text-red-400 text-center px-4 pb-2">
          {app.errorMessage}
        </Text>
      ) : null}
    </SafeAreaProvider>
  );
}
