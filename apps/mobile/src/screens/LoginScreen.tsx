import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type LoginScreenProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onGoSignup: () => void;
  onBackHome: () => void;
};

export function LoginScreen({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onSubmit,
  onGoSignup,
  onBackHome,
}: LoginScreenProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.actions}>
          <Pressable style={styles.secondaryBtn} onPress={onBackHome}>
            <Text style={styles.secondaryBtnText}>Back</Text>
          </Pressable>
          <Pressable style={styles.primaryBtn} onPress={onSubmit} disabled={loading}>
            <Text style={styles.primaryBtnText}>{loading ? "Logging in..." : "Login"}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.linkBtn} onPress={onGoSignup}>
          <Text style={styles.linkText}>Don&apos;t have an account? Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "center", padding: 16 },
  card: {
    backgroundColor: "#0b1227",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  title: { color: "#34d399", fontSize: 30, fontWeight: "900", textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 4 },
  primaryBtn: { backgroundColor: "#22c55e", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#22c55e",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  secondaryBtnText: { color: "#34d399", fontWeight: "700" },
  linkBtn: { marginTop: 6, alignItems: "center" },
  linkText: { color: "#a7f3d0", fontSize: 12 },
});
