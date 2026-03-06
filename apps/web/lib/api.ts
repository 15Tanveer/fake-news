import { AuthResponse, DetectResponse, QuotaStatus, UserProfile } from "@/types/auth.types";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
const SESSION_TOKEN_KEY = "fake_auth_token";
const SESSION_USER_KEY = "fake_auth_user";
const GUEST_ID_KEY = "fake_guest_id";

function getGuestId(): string {
  if (typeof window === "undefined") return "server";

  const existing = localStorage.getItem(GUEST_ID_KEY);
  if (existing) return existing;

  const fallback = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : fallback;

  localStorage.setItem(GUEST_ID_KEY, id);
  return id;
}

export function saveSession(token: string, user: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_TOKEN_KEY, token);
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

export function loadStoredSession(): { token: string | null; user: UserProfile | null } {
  if (typeof window === "undefined") return { token: null, user: null };

  const token = localStorage.getItem(SESSION_TOKEN_KEY);
  const rawUser = localStorage.getItem(SESSION_USER_KEY);

  if (!rawUser) return { token, user: null };

  try {
    return { token, user: JSON.parse(rawUser) as UserProfile };
  } catch {
    return { token, user: null };
  }
}

export function clearStoredSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(SESSION_USER_KEY);
}

function buildHeaders(token?: string): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-guest-id": getGuestId(),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...buildHeaders(token),
        ...(init.headers || {}),
      },
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE_URL}. Ensure FastAPI is running and CORS allows your web origin.`,
    );
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = (payload as { detail?: unknown }).detail;

    if (typeof detail === "string") {
      throw new Error(detail);
    }

    if (detail && typeof detail === "object" && "message" in detail) {
      throw new Error(String((detail as { message: string }).message));
    }

    throw new Error("Request failed");
  }

  return payload as T;
}

export function registerUser(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  plan?: "registered" | "paid";
}): Promise<AuthResponse> {
  return request<AuthResponse>("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...input, plan: input.plan || "registered" }),
  });
}

export function loginUser(input: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function me(token: string): Promise<UserProfile> {
  const data = await request<{ user: UserProfile }>("/v1/auth/me", { method: "GET" }, token);
  return data.user;
}

export async function logoutUser(token: string): Promise<void> {
  await request<{ message: string }>("/v1/auth/logout", { method: "POST" }, token);
}

export function getQuotaStatus(token?: string): Promise<QuotaStatus> {
  return request<QuotaStatus>("/v1/quota/status", { method: "GET" }, token);
}

export function detectNews(text: string, token?: string): Promise<DetectResponse> {
  return request<DetectResponse>(
    "/v1/detect",
    {
      method: "POST",
      body: JSON.stringify({ text }),
    },
    token,
  );
}
