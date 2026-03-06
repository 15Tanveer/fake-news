import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { UserProfile } from "../types";

type AppHeaderProps = {
  user: UserProfile | null;
  onGoLogin: () => void;
  onGoSignup: () => void;
  onGoAccount: () => void;
  onLogout: () => void;
};

export function AppHeader({ user, onGoLogin, onGoSignup, onGoAccount, onLogout }: AppHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/fake-news-logo.png")}
        resizeMode="contain"
        style={styles.logoImage}
      />

      {!user ? (
        <View style={styles.actions}>
          <Pressable style={styles.primaryBtn} onPress={onGoLogin}>
            <Text style={styles.primaryBtnText}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.secondaryBtn} onPress={onGoSignup}>
            <Text style={styles.secondaryBtnText}>Sign Up</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.menuWrap}>
          <Pressable style={styles.userIcon} onPress={() => setShowMenu((prev) => !prev)}>
            <Text style={styles.userIconText}>👤</Text>
          </Pressable>

          {showMenu ? (
            <View style={styles.menuCard}>
              <Pressable
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  onGoAccount();
                }}
              >
                <Text style={styles.menuItemText}>My Account</Text>
              </Pressable>

              <Pressable
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  onLogout();
                }}
              >
                <Text style={styles.menuItemText}>Logout</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoImage: {
    width: 128,
    height: 36,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  menuWrap: {
    position: "relative",
    alignItems: "flex-end",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  userIconText: {
    fontSize: 20,
  },
  menuCard: {
    position: "absolute",
    top: 46,
    right: 0,
    width: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "#0b1227",
    overflow: "hidden",
    zIndex: 20,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  menuItemText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#22c55e",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  secondaryBtnText: {
    color: "#34d399",
    fontWeight: "700",
  },
});
