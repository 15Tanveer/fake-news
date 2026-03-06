export type UserPlan = "guest" | "registered" | "paid";

export type UserProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  plan: "registered" | "paid";
};

export type QuotaStatus = {
  plan: UserPlan;
  used: number;
  limit: number | null;
  remaining: number | null;
  resetsAt: string | null;
};

export type DetectResponse = {
  label: string;
  accuracy: number;
  quota: QuotaStatus;
};

export type AuthResponse = {
  token: string;
  user: UserProfile;
};

export type AppRoute = "detector" | "account" | "login" | "signup";
