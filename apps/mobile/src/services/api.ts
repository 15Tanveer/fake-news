import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { AuthResponse, DetectResponse, QuotaStatus, UserProfile } from "../types";

export const STORAGE_TOKEN_KEY = "mobile_auth_token";
export const STORAGE_USER_KEY = "mobile_auth_user";
const STORAGE_GUEST_ID_KEY = "mobile_guest_id";

const rawApiBaseUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === "android" ? "http://10.0.2.2:8000" : "http://localhost:8000");
const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "").replace(/\/v1$/, "");

async function getGuestId(): Promise<string> {
  const existing = await AsyncStorage.getItem(STORAGE_GUEST_ID_KEY);
  if (existing) return existing;

  const id = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  await AsyncStorage.setItem(STORAGE_GUEST_ID_KEY, id);
  return id;
}

async function request<T>(path: string, init: RequestInit = {}, token?: string | null): Promise<T> {
  const guestId = await getGuestId();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-guest-id": guestId,
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...headers,
        ...(init.headers || {}),
      },
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE_URL}. Set EXPO_PUBLIC_API_URL if testing on a real device.`,
    );
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = (payload as { detail?: unknown }).detail;

    if (typeof detail === "string") throw new Error(detail);

    if (detail && typeof detail === "object" && "message" in detail) {
      throw new Error(String((detail as { message: string }).message));
    }

    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0] as { msg?: string };
      if (first?.msg) throw new Error(first.msg);
    }

    throw new Error(`Request failed (${response.status})`);
  }

  return payload as T;
}

export async function getStoredSession(): Promise<{ token: string | null; user: UserProfile | null }> {
  const token = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
  const rawUser = await AsyncStorage.getItem(STORAGE_USER_KEY);

  if (!rawUser) return { token, user: null };

  try {
    return { token, user: JSON.parse(rawUser) as UserProfile };
  } catch {
    return { token, user: null };
  }
}

export async function persistSession(token: string, user: UserProfile): Promise<void> {
  await AsyncStorage.setItem(STORAGE_TOKEN_KEY, token);
  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}

export async function clearSessionStorage(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
  await AsyncStorage.removeItem(STORAGE_USER_KEY);
}

export function fetchMe(token: string): Promise<{ user: UserProfile }> {
  return request<{ user: UserProfile }>("/v1/auth/me", { method: "GET" }, token);
}

export function fetchQuota(token?: string | null): Promise<QuotaStatus> {
  return request<QuotaStatus>("/v1/quota/status", { method: "GET" }, token);
}

export function loginRequest(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>(
    "/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    undefined,
  );
}

export function signupRequest(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>(
    "/v1/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ ...input, plan: "registered" }),
    },
    undefined,
  );
}

export function logoutRequest(token: string): Promise<{ message: string }> {
  return request<{ message: string }>("/v1/auth/logout", { method: "POST" }, token);
}

export function detectRequest(text: string, token?: string | null): Promise<DetectResponse> {
  return request<DetectResponse>(
    "/v1/detect",
    {
      method: "POST",
      body: JSON.stringify({ text }),
    },
    token,
  );
}
