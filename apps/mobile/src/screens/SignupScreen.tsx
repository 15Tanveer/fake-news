import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type SignupScreenProps = {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirm: string;
  setConfirm: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onGoLogin: () => void;
  onBackHome: () => void;
};

export function SignupScreen({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
  loading,
  onSubmit,
  onGoLogin,
  onBackHome,
}: SignupScreenProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#94a3b8"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#94a3b8"
          value={lastName}
          onChangeText={setLastName}
        />

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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <View style={styles.actions}>
          <Pressable style={styles.secondaryBtn} onPress={onBackHome}>
            <Text style={styles.secondaryBtnText}>Back</Text>
          </Pressable>
          <Pressable style={styles.primaryBtn} onPress={onSubmit} disabled={loading}>
            <Text style={styles.primaryBtnText}>{loading ? "Creating..." : "Create"}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.linkBtn} onPress={onGoLogin}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
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
