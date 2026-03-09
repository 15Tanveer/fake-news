import { useEffect, useMemo, useState } from "react";

import {
  clearSessionStorage,
  detectRequest,
  fetchMe,
  fetchQuota,
  getStoredSession,
  loginRequest,
  logoutRequest,
  persistSession,
  signupRequest,
} from "../services/api";
import { QuotaStatus, UserProfile } from "../types";
import { SignupSchemaType } from "@mobile/schemas/auth.schema";

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

export function useAppController() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [quota, setQuota] = useState<QuotaStatus>(defaultQuota);

  const [text, setText] = useState("");
  const [lastAnalyzedText, setLastAnalyzedText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState(0);

  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const isLocked = useMemo(() => getIsLocked(quota), [quota]);
  const quotaLabel = quota.limit === null ? "Unlimited" : `${quota.used} / ${quota.limit}`;

  const loadSession = async (): Promise<void> => {
    setBooting(true);
    setErrorMessage(null);

    const stored = await getStoredSession();

    if (stored.token && stored.user) {
      try {
        const me = await fetchMe(stored.token);
        setToken(stored.token);
        setUser(me.user);
      } catch {
        await clearSessionStorage();
        setToken(null);
        setUser(null);
      }
    } else {
      setToken(null);
      setUser(null);
    }

    try {
      const freshQuota = await fetchQuota(stored.token);
      setQuota(freshQuota);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load quota");
    } finally {
      setBooting(false);
    }
  };

  useEffect(() => {
    void loadSession();
  }, []);

  const login = async (): Promise<boolean> => {
    setErrorMessage(null);

    if (!loginEmail || !loginPassword) {
      setErrorMessage("Please enter email and password");
      return false;
    }

    try {
      setLoading(true);
      const data = await loginRequest(loginEmail, loginPassword);
      await persistSession(data.token, data.user);

      setToken(data.token);
      setUser(data.user);
      setLoginEmail("");
      setLoginPassword("");

      const freshQuota = await fetchQuota(data.token);
      setQuota(freshQuota);
      return true;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupSchemaType): Promise<boolean> => {
    setErrorMessage(null);

    try {
      setLoading(true);

      const res = await signupRequest({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      await persistSession(res.token, res.user);

      setToken(res.token);
      setUser(res.user);

      const freshQuota = await fetchQuota(res.token);
      setQuota(freshQuota);
      return true;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setErrorMessage(null);

    if (token) {
      try {
        await logoutRequest(token);
      } catch {
        // best effort
      }
    }

    await clearSessionStorage();

    setToken(null);
    setUser(null);

    const freshQuota = await fetchQuota(undefined);
    setQuota(freshQuota);
  };

  const analyze = async (): Promise<void> => {
    setErrorMessage(null);

    if (isLocked || !text.trim()) {
      return;
    }

    try {
      setLoading(true);
      const textToAnalyze = text.trim();
      const data = await detectRequest(textToAnalyze, token);

      setResult(data.label);
      setAccuracy(data.accuracy);
      setQuota(data.quota);
      setLastAnalyzedText(textToAnalyze);
      setText("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Analyze failed");

      try {
        const freshQuota = await fetchQuota(token);
        setQuota(freshQuota);
      } catch {
        // ignore secondary error
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    quota,
    text,
    setText,
    lastAnalyzedText,
    result,
    accuracy,
    loading,
    booting,
    errorMessage,
    setErrorMessage,
    isLocked,
    quotaLabel,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    login,
    signup,
    logout,
    analyze,
  };
}
