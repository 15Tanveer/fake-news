"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { useState } from "react";

import FakeNewsDetectorUI from "@/components/FakeNewsDetectorUI";
import { useAuthStore } from "@/stores/authStore";

export default function Home() {
  const { openLogin, openSignup, user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowMenu(false);
  };

  return (
    <div className="bg-[#0c1939] min-h-screen">
      <header className="flex justify-between items-center w-full px-5 md:px-10 py-3">
        <Image
          src="/logo/fake-news-logo.png"
          alt="Fake News Logo"
          width={150}
          height={40}
        />

        {!user ? (
          <div className="flex gap-4 items-center">
            <button onClick={openLogin} className="px-4 py-2 bg-green-500 rounded-lg">
              Sign In
            </button>

            <button
              onClick={openSignup}
              className="px-4 py-2 border border-green-500 text-green-400 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 mb-1 p-3 bg-transparent cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 p-2 border border-green-500 rounded-full"
              >
                <User className="text-green-400" />
              </button>
              <span className="text-green-400 capitalize">{user.firstName}</span>
            </div>

            {showMenu && (
              <div className="absolute right-0 top-20 w-40 bg-[#0c1939] rounded-xl shadow-xl overflow-hidden z-50 border border-white/10">
                <Link
                  href="/account"
                  onClick={() => setShowMenu(false)}
                  className="block w-full text-center px-4 py-3 hover:bg-green-500 text-white transition cursor-pointer"
                >
                  Account
                </Link>
                <button
                  onClick={() => void handleLogout()}
                  className="w-full text-center px-4 py-3 hover:bg-green-500 text-white transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center p-6">
        <FakeNewsDetectorUI />
      </main>
    </div>
  );
}
