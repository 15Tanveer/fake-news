export type UserPlan = "guest" | "registered" | "paid";

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  plan: Exclude<UserPlan, "guest">;
}

export interface QuotaStatus {
  plan: UserPlan;
  used: number;
  limit: number | null;
  remaining: number | null;
  resetsAt: string | null;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface DetectResponse {
  label: string;
  accuracy: number;
  quota: QuotaStatus;
}
