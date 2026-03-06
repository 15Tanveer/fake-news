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
import { AppRoute, QuotaStatus, UserProfile } from "../types";

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
  const [route, setRoute] = useState<AppRoute>("detector");

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

  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

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

  const login = async (): Promise<void> => {
    setErrorMessage(null);

    if (!loginEmail || !loginPassword) {
      setErrorMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const data = await loginRequest(loginEmail, loginPassword);
      await persistSession(data.token, data.user);

      setToken(data.token);
      setUser(data.user);
      setRoute("detector");
      setLoginEmail("");
      setLoginPassword("");

      const freshQuota = await fetchQuota(data.token);
      setQuota(freshQuota);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (): Promise<void> => {
    setErrorMessage(null);

    if (!signupFirstName || !signupLastName || !signupEmail || !signupPassword) {
      setErrorMessage("Please fill all signup fields");
      return;
    }

    if (signupPassword !== signupConfirm) {
      setErrorMessage("Password mismatch");
      return;
    }

    try {
      setLoading(true);
      const data = await signupRequest({
        firstName: signupFirstName,
        lastName: signupLastName,
        email: signupEmail,
        password: signupPassword,
      });

      await persistSession(data.token, data.user);

      setToken(data.token);
      setUser(data.user);
      setRoute("detector");
      setSignupFirstName("");
      setSignupLastName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirm("");

      const freshQuota = await fetchQuota(data.token);
      setQuota(freshQuota);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Signup failed");
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
    setRoute("detector");

    const freshQuota = await fetchQuota(undefined);
    setQuota(freshQuota);
  };

  const analyze = async (): Promise<void> => {
    setErrorMessage(null);

    if (isLocked || !text.trim()) {
      if (isLocked && !user) setRoute("login");
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
    route,
    setRoute,
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
    signupFirstName,
    setSignupFirstName,
    signupLastName,
    setSignupLastName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirm,
    setSignupConfirm,
    login,
    signup,
    logout,
    analyze,
  };
}
