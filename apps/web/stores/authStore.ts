import { create } from "zustand";

import {
  clearStoredSession,
  getQuotaStatus,
  loadStoredSession,
  loginUser,
  logoutUser,
  me,
  registerUser,
  saveSession,
} from "@/lib/api";
import { QuotaStatus, UserProfile } from "@/types/auth.types";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  quota: QuotaStatus;
  isLocked: boolean;

  showLogin: boolean;
  showSignup: boolean;

  initializeSession: () => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  signup: (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;

  refreshQuota: () => Promise<void>;
  setQuota: (quota: QuotaStatus) => void;

  openLogin: () => void;
  closeLogin: () => void;

  openSignup: () => void;
  closeSignup: () => void;
}

const defaultQuota: QuotaStatus = {
  plan: "guest",
  used: 0,
  limit: 5,
  remaining: 5,
  resetsAt: null,
};

function getIsLocked(quota: QuotaStatus): boolean {
  if (quota.limit === null) return false;
  return quota.used >= quota.limit;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  quota: defaultQuota,
  isLocked: false,

  showLogin: false,
  showSignup: false,

  initializeSession: async () => {
    const stored = loadStoredSession();
    if (!stored.token) {
      await get().refreshQuota();
      return;
    }

    try {
      const user = await me(stored.token);
      set({ user, token: stored.token });
      await get().refreshQuota();
    } catch {
      clearStoredSession();
      set({ user: null, token: null });
      await get().refreshQuota();
    }
  },

  login: async ({ email, password }) => {
    const data = await loginUser({ email, password });
    saveSession(data.token, data.user);

    set({
      user: data.user,
      token: data.token,
      isLocked: false,
    });

    await get().refreshQuota();
  },

  signup: async ({ email, password, firstName, lastName }) => {
    const data = await registerUser({
      email,
      password,
      firstName,
      lastName,
      plan: "registered",
    });

    saveSession(data.token, data.user);

    set({
      user: data.user,
      token: data.token,
      isLocked: false,
    });

    await get().refreshQuota();
  },

  logout: async () => {
    const token = get().token;
    if (token) {
      try {
        await logoutUser(token);
      } catch {
        // Best effort logout.
      }
    }

    clearStoredSession();

    set({
      user: null,
      token: null,
      isLocked: false,
      quota: defaultQuota,
      showLogin: false,
      showSignup: false,
    });

    await get().refreshQuota();
  },

  refreshQuota: async () => {
    const token = get().token || undefined;
    const quota = await getQuotaStatus(token);
    set({ quota, isLocked: getIsLocked(quota) });
  },

  setQuota: (quota) => set({ quota, isLocked: getIsLocked(quota) }),

  openLogin: () => set({ showLogin: true }),
  closeLogin: () => set({ showLogin: false }),

  openSignup: () => set({ showSignup: true }),
  closeSignup: () => set({ showSignup: false }),
}));
