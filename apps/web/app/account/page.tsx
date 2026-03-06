"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useAuthStore } from "@/stores/authStore";

function formatResetsAt(resetsAt: string | null): string {
  if (!resetsAt) return "No reset";
  const date = new Date(resetsAt);
  if (Number.isNaN(date.getTime())) return "No reset";
  return date.toLocaleDateString();
}

export default function AccountPage() {
  const { user, quota, initializeSession, refreshQuota } = useAuthStore();

  useEffect(() => {
    const load = async () => {
      await initializeSession();
      await refreshQuota();
    };

    void load();
  }, [initializeSession, refreshQuota]);

  const planName = user?.plan || "guest";
  const monthlyLimit = quota.limit === null ? "Unlimited" : String(quota.limit);
  const remaining = quota.remaining === null ? "Unlimited" : String(quota.remaining);
  const billingStatus = planName === "paid" ? "Active subscription" : "No active subscription";
  const nextBilling = planName === "paid" ? "Configured by billing provider" : "Not applicable";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-bold text-green-400">My Account</h1>
          <Link href="/" className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            Back
          </Link>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
          <h2 className="text-xl font-semibold">Profile</h2>
          {user ? (
            <>
              <p className="text-gray-300">
                Name: <span className="text-white">{user.firstName} {user.lastName}</span>
              </p>
              <p className="text-gray-300">
                Email: <span className="text-white">{user.email}</span>
              </p>
            </>
          ) : (
            <p className="text-gray-300">You are browsing as a guest user.</p>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
          <h2 className="text-xl font-semibold">Monthly Quota</h2>
          <p className="text-gray-300">
            Plan: <span className="text-white capitalize">{planName}</span>
          </p>
          <p className="text-gray-300">
            Used: <span className="text-white">{quota.used}</span>
          </p>
          <p className="text-gray-300">
            Limit: <span className="text-white">{monthlyLimit}</span>
          </p>
          <p className="text-gray-300">
            Remaining: <span className="text-white">{remaining}</span>
          </p>
          <p className="text-gray-300">
            Resets At: <span className="text-white">{formatResetsAt(quota.resetsAt)}</span>
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
          <h2 className="text-xl font-semibold">Billing</h2>
          <p className="text-gray-300">
            Status: <span className="text-white">{billingStatus}</span>
          </p>
          <p className="text-gray-300">
            Next Billing: <span className="text-white">{nextBilling}</span>
          </p>
          <p className="text-xs text-gray-400">
            Paid constraints and billing provider integration will be added in the next phase.
          </p>
        </section>
      </div>
    </main>
  );
}
