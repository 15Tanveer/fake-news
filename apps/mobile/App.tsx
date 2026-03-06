import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "./src/components/AppHeader";
import { BottomTabBar } from "./src/components/BottomTabBar";
import { useAppController } from "./src/hooks/useAppController";
import { AccountScreen } from "./src/screens/AccountScreen";
import { DetectorScreen } from "./src/screens/DetectorScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { SignupScreen } from "./src/screens/SignupScreen";

export default function App() {
  const app = useAppController();

  if (app.booting) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <StatusBar style="light" />
          <ActivityIndicator size="large" color="#34d399" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <AppHeader
          user={app.user}
          onGoLogin={() => app.setRoute("login")}
          onGoSignup={() => app.setRoute("signup")}
          onGoAccount={() => app.setRoute("account")}
          onLogout={() => void app.logout()}
        />

        {app.route === "detector" ? (
          <DetectorScreen
            text={app.text}
            setText={app.setText}
            loading={app.loading}
            isLocked={app.isLocked}
            onAnalyze={() => void app.analyze()}
            result={app.result}
            analyzedText={app.lastAnalyzedText}
            accuracy={app.accuracy}
            quotaLabel={app.quotaLabel}
            onGoLogin={() => app.setRoute("login")}
            onGoSignup={() => app.setRoute("signup")}
          />
        ) : null}

        {app.route === "account" ? <AccountScreen user={app.user} quota={app.quota} /> : null}

        {app.route === "login" ? (
          <LoginScreen
            email={app.loginEmail}
            setEmail={app.setLoginEmail}
            password={app.loginPassword}
            setPassword={app.setLoginPassword}
            loading={app.loading}
            onSubmit={() => void app.login()}
            onGoSignup={() => app.setRoute("signup")}
            onBackHome={() => app.setRoute("detector")}
          />
        ) : null}

        {app.route === "signup" ? (
          <SignupScreen
            firstName={app.signupFirstName}
            setFirstName={app.setSignupFirstName}
            lastName={app.signupLastName}
            setLastName={app.setSignupLastName}
            email={app.signupEmail}
            setEmail={app.setSignupEmail}
            password={app.signupPassword}
            setPassword={app.setSignupPassword}
            confirm={app.signupConfirm}
            setConfirm={app.setSignupConfirm}
            loading={app.loading}
            onSubmit={() => void app.signup()}
            onGoLogin={() => app.setRoute("login")}
            onBackHome={() => app.setRoute("detector")}
          />
        ) : null}

        {app.route === "detector" || app.route === "account" ? (
          <BottomTabBar route={app.route} onChangeRoute={app.setRoute} />
        ) : null}

        {app.errorMessage ? <Text style={styles.errorText}>{app.errorMessage}</Text> : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
