import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppRoute } from "../types";

type BottomTabBarProps = {
  route: AppRoute;
  onChangeRoute: (route: AppRoute) => void;
};

export function BottomTabBar({ route, onChangeRoute }: BottomTabBarProps) {
  const isHome = route === "detector";
  const isAccount = route === "account";

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Pressable style={styles.tab}>
          <Text style={styles.icon}>◍</Text>
        </Pressable>

        <Pressable style={styles.tab} onPress={() => onChangeRoute("account")}>
          <Text style={[styles.icon, isAccount ? styles.activeIcon : null]}>◎</Text>
        </Pressable>

        <View style={styles.centerSlot} />

        <Pressable style={styles.tab}>
          <Text style={styles.icon}>⌁</Text>
        </Pressable>

        <Pressable style={styles.tab}>
          <Text style={styles.icon}>☰</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.centerButton, isHome ? styles.centerButtonActive : null]}
        onPress={() => onChangeRoute("detector")}
      >
        <Text style={styles.centerButtonIcon}>≡</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 2,
    backgroundColor: "transparent",
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#17171c",
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  tab: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  centerSlot: {
    width: 58,
    height: 32,
  },
  icon: {
    color: "#c7c9d1",
    fontSize: 18,
    fontWeight: "700",
  },
  activeIcon: {
    color: "#f59e0b",
  },
  centerButton: {
    position: "absolute",
    alignSelf: "center",
    top: -10,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#f5f5f7",
    borderWidth: 3,
    borderColor: "#2a2a31",
    alignItems: "center",
    justifyContent: "center",
  },
  centerButtonActive: {
    shadowColor: "#f59e0b",
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  centerButtonIcon: {
    color: "#f59e0b",
    fontSize: 18,
    fontWeight: "900",
  },
});
