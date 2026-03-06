import { ScrollView, StyleSheet, Text, View } from "react-native";

import { QuotaStatus, UserProfile } from "../types";

function formatResetDate(resetsAt: string | null): string {
  if (!resetsAt) return "No reset";
  const date = new Date(resetsAt);
  if (Number.isNaN(date.getTime())) return "No reset";
  return date.toLocaleDateString();
}

type AccountScreenProps = {
  user: UserProfile | null;
  quota: QuotaStatus;
};

export function AccountScreen({ user, quota }: AccountScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>My Account</Text>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Profile</Text>
          {user ? (
            <>
              <Text style={styles.sectionText}>Name: {user.firstName} {user.lastName}</Text>
              <Text style={styles.sectionText}>Email: {user.email}</Text>
            </>
          ) : (
            <Text style={styles.sectionText}>You are browsing as a guest user.</Text>
          )}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Monthly Quota</Text>
          <Text style={styles.sectionText}>Plan: {user?.plan || "guest"}</Text>
          <Text style={styles.sectionText}>Used: {quota.used}</Text>
          <Text style={styles.sectionText}>Limit: {quota.limit === null ? "Unlimited" : quota.limit}</Text>
          <Text style={styles.sectionText}>
            Remaining: {quota.remaining === null ? "Unlimited" : quota.remaining}
          </Text>
          <Text style={styles.sectionText}>Resets At: {formatResetDate(quota.resetsAt)}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Billing</Text>
          <Text style={styles.sectionText}>
            Status: {user?.plan === "paid" ? "Active subscription" : "No active subscription"}
          </Text>
          <Text style={styles.sectionText}>
            Next Billing: {user?.plan === "paid" ? "Configured by billing provider" : "Not applicable"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 30 },
  card: {
    backgroundColor: "#0b1227",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },
  title: { color: "#34d399", fontSize: 30, fontWeight: "900" },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 14,
    gap: 8,
  },
  sectionHeader: { color: "#fff", fontSize: 18, fontWeight: "800" },
  sectionText: { color: "#dbe3ef", fontSize: 14 },
});
