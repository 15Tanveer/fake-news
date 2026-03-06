"use client";

import { Lock } from "lucide-react";

export default function LockOverlay() {
  return (
    <div className="absolute inset-0 backdrop-blur-2xl bg-black/70 flex flex-col items-center justify-center z-40 rounded-3xl space-y-5 p-4 cursor-not-allowed overflow-hidden">
      <Lock size={50} className="text-green-400" />

      <h2 className="text-3xl font-bold text-white">
        Free Limit Reached
      </h2>

      <p className="text-gray-300 text-center max-w-lg">
        Please login or signup to continue using Fake News Detector AI.
      </p>
    </div>
  );
}