import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { useAppControllerContext } from "@mobile/core/providers/AppControllerProvider";

function HeaderRightAuth() {
  const app = useAppControllerContext();
  const router = useRouter();

  if (app.user) {
    return (
      <Pressable
        onPress={() => void app.logout()}
        style={{ paddingHorizontal: 10, paddingVertical: 6 }}
      >
        <Text style={{ color: "#34d399", fontWeight: "700" }}>Logout</Text>
      </Pressable>
    );
  }

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Pressable
        onPress={() => router.push("/auth/login")}
        style={{ borderWidth: 1, borderColor: "#22c55e", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 }}
      >
        <Text style={{ color: "#34d399", fontWeight: "700" }}>Sign In</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/auth/signup")}
        style={{ backgroundColor: "#22c55e", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

export default function TabsLayout() {
  const app = useAppControllerContext();

  if (app.booting) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0b1227" },
        headerTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#17171c",
          borderTopColor: "rgba(255,255,255,0.1)",
        },
        tabBarActiveTintColor: "#f59e0b",
        tabBarInactiveTintColor: "#c7c9d1",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Detector",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" size={size} color={color} />
          ),
          headerTitle: () => (
            <Image
              source={require("../../../assets/fake-news-logo.png")}
              resizeMode="contain"
              style={{ width: 120, height: 32 }}
            />
          ),
          headerRight: HeaderRightAuth,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
