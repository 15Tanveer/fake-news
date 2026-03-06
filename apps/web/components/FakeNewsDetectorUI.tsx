"use client";

import { useEffect, useState } from "react";

import { detectNews } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";

import AccuracyBar from "./AccuracyBar";
import GlassContainer from "./GlassContainer";
import ResultCard from "./ResultCard";
import TextInputPanel from "./TextInputPanel";
import LockOverlay from "./auth/LockOverlay";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignUpModal";

export default function FakeNewsDetectorUI() {
  const [text, setText] = useState("");
  const [lastAnalyzedText, setLastAnalyzedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const {
    user,
    token,
    quota,
    isLocked,
    showLogin,
    showSignup,
    initializeSession,
    refreshQuota,
    setQuota,
    openLogin,
    closeLogin,
    closeSignup,
  } = useAuthStore();

  useEffect(() => {
    void initializeSession();
  }, [initializeSession]);

  const handleAnalyze = async () => {
    if (isLocked || !text.trim()) {
      if (isLocked && !user) openLogin();
      return;
    }

    try {
      setLoading(true);
      const textToAnalyze = text.trim();
      const data = await detectNews(text, token || undefined);
      setResult(data.label);
      setAccuracy(data.accuracy || 0);
      setQuota(data.quota);
      setLastAnalyzedText(textToAnalyze);
      setText("");
    } catch (err) {
      await refreshQuota();
      if (!user) openLogin();
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const quotaLabel = quota.limit === null ? "Unlimited" : `${quota.used} / ${quota.limit}`;

  return (
    <div className="w-full flex items-center justify-center relative">
      <GlassContainer>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Fake News Detector
          </h1>

          <p className="text-gray-400 text-sm md:text-base">AI Powered News Authenticity Analysis</p>
        </div>

        <TextInputPanel
          text={text}
          setText={setText}
          loading={loading}
          onCompare={handleAnalyze}
          disabled={isLocked}
        />

        <ResultCard result={result} analyzedText={lastAnalyzedText} />

        <AccuracyBar accuracy={accuracy} />

        <p className="text-center text-sm text-gray-400">Prompts Used: {quotaLabel}</p>

        {isLocked && <LockOverlay />}
      </GlassContainer>

      {showLogin && <LoginModal onClose={closeLogin} />}
      {showSignup && <SignupModal onClose={closeSignup} />}
    </div>
  );
}
