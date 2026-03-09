import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions } from "@react-navigation/native";
import { Image, Pressable } from "react-native";

import { useAppController } from "@mobile/hooks/useAppController";
import { TabsParamList } from "@mobile/navigation/types";
import { AccountRouteScreen } from "@mobile/screens/routes/AccountRouteScreen";
import { DetectorRouteScreen } from "@mobile/screens/routes/DetectorRouteScreen";

type AppController = ReturnType<typeof useAppController>;

const Tabs = createBottomTabNavigator<TabsParamList>();

type MainTabNavigatorProps = {
  app: AppController;
  onGoLogin: () => void;
  onGoSignup: () => void;
};

export function MainTabNavigator({
  app,
  onGoLogin,
  onGoSignup,
}: MainTabNavigatorProps) {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0b1227" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#17171c", borderTopColor: "rgba(255,255,255,0.1)" },
        tabBarActiveTintColor: "#f59e0b",
        tabBarInactiveTintColor: "#c7c9d1",
      }}
    >
      <Tabs.Screen
        name="Detector"
        options={({ navigation }) => ({
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../assets/fake-news-logo.png")}
              resizeMode="contain"
              style={{ width: 120, height: 32, marginLeft: 10 }}
            />
          ),
          headerTitle: "",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingHorizontal: 12, paddingVertical: 8 }}
            >
              <Ionicons name="menu" size={22} color="#fff" />
            </Pressable>
          ),
        })}
      >
        {() => (
          <DetectorRouteScreen
            app={app}
            onGoLogin={onGoLogin}
            onGoSignup={onGoSignup}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Account"
        options={({ navigation }) => ({
          title: "My Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../assets/fake-news-logo.png")}
              resizeMode="contain"
              style={{ width: 120, height: 32, marginLeft: 10 }}
            />
          ),
          headerTitle: "",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingHorizontal: 12, paddingVertical: 8 }}
            >
              <Ionicons name="menu" size={22} color="#fff" />
            </Pressable>
          ),
        })}
      >
        {() => <AccountRouteScreen app={app} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
