"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password mismatch",
    path: ["confirm"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupModal({ onClose }: { onClose: () => void }) {
  const signup = useAuthStore((s) => s.signup);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setApiError(null);
    try {
      await signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      onClose();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Signup failed");
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

        <h2 className="text-3xl text-center text-green-400 font-bold">Sign Up</h2>

        <div>
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl"
          />
          {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl"
          />
          {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
        </div>

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

        <div>
          <input
            type="password"
            {...register("confirm")}
            placeholder="Confirm Password"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl"
          />
          {errors.confirm && <p className="text-red-400 text-sm">{errors.confirm.message}</p>}
        </div>

        {apiError && <p className="text-red-400 text-sm">{apiError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
