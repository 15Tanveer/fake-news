import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAppController } from "@mobile/hooks/useAppController";
import { LoginRouteScreen } from "@mobile/screens/routes/LoginRouteScreen";
import { SignupRouteScreen } from "@mobile/screens/routes/SignupRouteScreen";
import { MainDrawerNavigator } from "./MainDrawerNavigator";
import { RootStackParamList } from "./types";

type AppController = ReturnType<typeof useAppController>;

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  app: AppController;
};

export function RootNavigator({ app }: RootNavigatorProps) {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#0c1939", card: "#0b1227", text: "#fff" },
      }}
    >
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: { backgroundColor: "#0b1227" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#0c1939" },
        }}
      >
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {({ navigation }) => (
            <MainDrawerNavigator
              app={app}
              onGoLogin={() => navigation.navigate("Login")}
              onGoSignup={() => navigation.navigate("Signup")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Login" options={{ title: "Login" }}>
          {({ navigation }) => (
            <LoginRouteScreen
              app={app}
              onSuccess={() => navigation.replace("Main")}
              onGoSignup={() => navigation.replace("Signup")}
              onBackHome={() => navigation.replace("Main")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Signup" options={{ title: "Sign Up" }}>
          {({ navigation }) => (
            <SignupRouteScreen
              app={app}
              onSuccess={() => navigation.replace("Main")}
              onGoLogin={() => navigation.replace("Login")}
              onBackHome={() => navigation.replace("Main")}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
