import { ScrollView, Text, View } from "react-native";

import { QuotaStatus, UserProfile } from "@mobile/types";

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
    <ScrollView contentContainerClassName="p-4 pb-8">
      <View className="bg-[#0b1227] border border-white/10 rounded-[20px] p-4 gap-3.5">
        <Text className="text-green-400 text-3xl font-black">My Account</Text>

        <View className="rounded-2xl border border-white/10 bg-white/5 p-3.5 gap-2">
          <Text className="text-white text-lg font-extrabold">Profile</Text>
          {user ? (
            <>
              <Text className="text-slate-200 text-sm">
                Name: {user.firstName} {user.lastName}
              </Text>
              <Text className="text-slate-200 text-sm">Email: {user.email}</Text>
            </>
          ) : (
            <Text className="text-slate-200 text-sm">You are browsing as a guest user.</Text>
          )}
        </View>

        <View className="rounded-2xl border border-white/10 bg-white/5 p-3.5 gap-2">
          <Text className="text-white text-lg font-extrabold">Monthly Quota</Text>
          <Text className="text-slate-200 text-sm">Plan: {user?.plan || "guest"}</Text>
          <Text className="text-slate-200 text-sm">Used: {quota.used}</Text>
          <Text className="text-slate-200 text-sm">
            Limit: {quota.limit === null ? "Unlimited" : quota.limit}
          </Text>
          <Text className="text-slate-200 text-sm">
            Remaining: {quota.remaining === null ? "Unlimited" : quota.remaining}
          </Text>
          <Text className="text-slate-200 text-sm">Resets At: {formatResetDate(quota.resetsAt)}</Text>
        </View>

        <View className="rounded-2xl border border-white/10 bg-white/5 p-3.5 gap-2">
          <Text className="text-white text-lg font-extrabold">Billing</Text>
          <Text className="text-slate-200 text-sm">
            Status: {user?.plan === "paid" ? "Active subscription" : "No active subscription"}
          </Text>
          <Text className="text-slate-200 text-sm">
            Next Billing: {user?.plan === "paid" ? "Configured by billing provider" : "Not applicable"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
