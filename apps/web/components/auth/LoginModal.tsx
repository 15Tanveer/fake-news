"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const login = useAuthStore((s) => s.login);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setApiError(null);
    try {
      await login({ email: data.email, password: data.password });
      onClose();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xl z-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-md space-y-5 relative"
      >
        <button
          type="button"
          className="absolute right-5 top-4 text-white hover:text-red-400"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-3xl text-center text-green-400 font-bold">Login</h2>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl"
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        {apiError && <p className="text-red-400 text-sm">{apiError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
