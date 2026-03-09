import { Text, View } from "react-native";

export function BillingScreen() {
  return (
    <View className="flex-1 bg-[#0c1939] p-4 gap-2.5">
      <Text className="text-emerald-400 text-[28px] font-black">Billing</Text>
      <Text className="text-slate-300 text-sm">
        Subscription and payments setup will be connected here.
      </Text>
    </View>
  );
}
