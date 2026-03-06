import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type DetectorScreenProps = {
  text: string;
  setText: (value: string) => void;
  loading: boolean;
  isLocked: boolean;
  onAnalyze: () => void;
  result: string | null;
  analyzedText: string;
  accuracy: number;
  quotaLabel: string;
  onGoLogin: () => void;
  onGoSignup: () => void;
};

export function DetectorScreen({
  text,
  setText,
  loading,
  isLocked,
  onAnalyze,
  result,
  analyzedText,
  accuracy,
  quotaLabel,
  onGoLogin,
  onGoSignup,
}: DetectorScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          <Text style={styles.title}>Fake News Detector</Text>
          <Text style={styles.subtitle}>AI Powered News Authenticity Analysis</Text>

          <TextInput
            style={[styles.input, isLocked ? styles.disabledInput : null]}
            multiline
            value={text}
            editable={!isLocked && !loading}
            onChangeText={setText}
            placeholder="Paste news content here..."
            placeholderTextColor="#64748b"
          />

          <Pressable
            style={[styles.analyzeButton, loading || isLocked ? styles.disabledButton : null]}
            onPress={onAnalyze}
            disabled={loading || isLocked}
          >
            <Text style={styles.analyzeButtonText}>{loading ? "Analyzing..." : "Compare"}</Text>
          </Pressable>

          {result ? (
            <View style={styles.resultCard}>
              <Text style={[styles.resultTitle, result === "REAL" ? styles.realText : styles.fakeText]}>
                {result === "REAL" ? "Authentic News" : "Fake News Detected"}
              </Text>
              <View style={styles.analyzedBlock}>
                <Text style={styles.analyzedLabel}>Analyzed Content</Text>
                <Text style={styles.analyzedText}>{analyzedText}</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.accuracyWrap}>
            <View style={styles.accuracyHeader}>
              <Text style={styles.accuracyLabel}>Detection Accuracy</Text>
              <Text style={styles.accuracyLabel}>{accuracy}%</Text>
            </View>
            <View style={styles.accuracyBarBg}>
              <View style={[styles.accuracyBarFill, { width: `${accuracy}%` }]} />
            </View>
          </View>

          <Text style={styles.quotaText}>Prompts Used: {quotaLabel}</Text>
        </View>

        {isLocked ? (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockTitle}>Limit Reached</Text>
            <Text style={styles.lockText}>Your current prompt limit is reached. Login or signup to continue.</Text>
            <View style={styles.lockActions}>
              <Pressable style={styles.secondaryBtn} onPress={onGoSignup}>
                <Text style={styles.secondaryBtnText}>Sign Up</Text>
              </Pressable>
              <Pressable style={styles.primaryBtn} onPress={onGoLogin}>
                <Text style={styles.primaryBtnText}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 30 },
  cardWrap: { position: "relative" },
  card: {
    backgroundColor: "#0b1227",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },
  title: { color: "#34d399", textAlign: "center", fontSize: 28, fontWeight: "900" },
  subtitle: { color: "#94a3b8", textAlign: "center", marginBottom: 6 },
  input: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    color: "#ffffff",
    textAlignVertical: "top",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  disabledInput: { opacity: 0.6 },
  analyzeButton: {
    backgroundColor: "#10b981",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  analyzeButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  disabledButton: { opacity: 0.6 },
  resultCard: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    gap: 10,
  },
  resultTitle: { fontSize: 24, fontWeight: "800", textAlign: "center" },
  realText: { color: "#4ade80" },
  fakeText: { color: "#f87171" },
  analyzedBlock: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 10,
  },
  analyzedLabel: { color: "#94a3b8", fontSize: 12, marginBottom: 6, textTransform: "uppercase" },
  analyzedText: { color: "#e2e8f0", fontSize: 14 },
  accuracyWrap: { gap: 8 },
  accuracyHeader: { flexDirection: "row", justifyContent: "space-between" },
  accuracyLabel: { color: "#94a3b8", fontSize: 12 },
  accuracyBarBg: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  accuracyBarFill: { height: "100%", backgroundColor: "#10b981" },
  quotaText: { color: "#94a3b8", textAlign: "center", fontSize: 12 },
  lockOverlay: {
    position: "absolute",
    inset: 0,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    padding: 18,
    justifyContent: "center",
    gap: 10,
  },
  lockTitle: { color: "#fff", fontSize: 24, fontWeight: "900", textAlign: "center" },
  lockText: { color: "#cbd5e1", textAlign: "center", fontSize: 14 },
  lockActions: { flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 6 },
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
});
