import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, Pressable } from "react-native";

import { AccountRouteScreen } from "@mobile/screens/routes/AccountRouteScreen";
import { useAppController } from "@mobile/hooks/useAppController";
import { DrawerParamList } from "@mobile/navigation/types";
import { AppDrawerContent } from "./AppDrawerContent";
import { MainTabNavigator } from "./MainTabNavigator";

type AppController = ReturnType<typeof useAppController>;

const Drawer = createDrawerNavigator<DrawerParamList>();

type MainDrawerNavigatorProps = {
  app: AppController;
  onGoLogin: () => void;
  onGoSignup: () => void;
};

export function MainDrawerNavigator({
  app,
  onGoLogin,
  onGoSignup,
}: MainDrawerNavigatorProps) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <AppDrawerContent app={app} onGoLogin={onGoLogin} {...props} />
      )}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#0b1227" },
        headerTintColor: "#fff",
        drawerStyle: { backgroundColor: "#0c1939" },
        drawerActiveTintColor: "#34d399",
        drawerInactiveTintColor: "#cbd5e1",
        drawerPosition: "right",
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
            onPress={() => navigation.toggleDrawer()}
            style={{ paddingHorizontal: 12, paddingVertical: 8 }}
          >
            <Ionicons name="menu" size={22} color="#fff" />
          </Pressable>
        ),
      })}
    >
      <Drawer.Screen
        name="HomeTabs"
        options={{
          title: "Home",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <MainTabNavigator
            app={app}
            onGoLogin={onGoLogin}
            onGoSignup={onGoSignup}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Account"
        options={{
          title: "My Account",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <AccountRouteScreen app={app} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
