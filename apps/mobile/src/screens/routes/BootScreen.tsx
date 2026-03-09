import { ActivityIndicator, View } from "react-native";

export function BootScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#0c1939]">
      <ActivityIndicator size="large" color="#34d399" />
    </View>
  );
}
