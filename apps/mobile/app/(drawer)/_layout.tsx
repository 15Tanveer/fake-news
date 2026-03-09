import { Ionicons } from "@expo/vector-icons";
import Drawer from "expo-router/build/layouts/Drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#0b1227" },
        headerTintColor: "#ffffff",
        drawerStyle: { backgroundColor: "#0c1939" },
        drawerActiveTintColor: "#34d399",
        drawerInactiveTintColor: "#cbd5e1",
        drawerLabelStyle: { marginLeft: -12 },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="billing"
        options={{
          title: "Billing",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
