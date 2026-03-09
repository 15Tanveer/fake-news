import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppRoute } from "../types";

type BottomTabBarProps = {
  route: AppRoute;
  onChangeRoute: (route: AppRoute) => void;
};

export function BottomTabBar({ route, onChangeRoute }: BottomTabBarProps) {
  const isHome = route === "detector";
  const isAccount = route === "account";

  return (
    <View className="px-4 pt-1 pb-3">
      <View className="flex-row items-center justify-between bg-[#17171c] rounded-[28px] px-5 py-3 border border-white/10">
        
        {/* Home icon */}
        <Pressable className="w-[42px] h-[32px] items-center justify-center">
          <Ionicons name="home-outline" size={20} color="#c7c9d1" />
        </Pressable>

        {/* Account */}
        <Pressable
          className="w-[42px] h-[32px] items-center justify-center"
          onPress={() => onChangeRoute("account")}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={isAccount ? "#f59e0b" : "#c7c9d1"}
          />
        </Pressable>

        {/* center slot */}
        <View className="w-[58px] h-[32px]" />

        {/* search */}
        <Pressable className="w-[42px] h-[32px] items-center justify-center">
          <Ionicons name="search-outline" size={20} color="#c7c9d1" />
        </Pressable>

        {/* menu */}
        <Pressable className="w-[42px] h-[32px] items-center justify-center">
          <Ionicons name="menu-outline" size={20} color="#c7c9d1" />
        </Pressable>
      </View>

      {/* Center Floating Button */}
      <Pressable
        onPress={() => onChangeRoute("detector")}
        className={`absolute self-center -top-3 w-[58px] h-[58px] rounded-full border-[3px] border-[#2a2a31] items-center justify-center
        ${isHome ? "bg-white shadow-lg" : "bg-white"}`}
      >
        <Ionicons name="scan-outline" size={22} color="#f59e0b" />
      </Pressable>
    </View>
  );
}