import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

type DetectorScreenProps = {
  text: string;
  setText: (value: string) => void;
  loading: boolean;
  isLocked: boolean;
  onAnalyze: () => void;
  result: string | null;
  analyzedText: string;
  accuracy: number;
  quotaLabel: string;
  onGoLogin: () => void;
  onGoSignup: () => void;
};

export function DetectorScreen({
  text,
  setText,
  loading,
  isLocked,
  onAnalyze,
  result,
  analyzedText,
  accuracy,
  quotaLabel,
  onGoLogin,
  onGoSignup,
}: DetectorScreenProps) {
  return (
    <ScrollView contentContainerClassName="flex items-center justify-center px-4 w-full h-full">
      <View className="w-full max-w-3xl">
        <View className="bg-[#0b1227] border border-white/10 rounded-[20px] p-4 gap-3.5">
          <Text className="text-[#34d399] text-center text-[28px] font-black">
            Fake News Detector
          </Text>
          <Text className="text-[#94a3b8] text-center mb-1.5">
            AI Powered News Authenticity Analysis
          </Text>

          <TextInput
            className={`min-h-40 text-start border border-white/10 bg-white/5 rounded-2xl text-white px-3 py-3 ${
              isLocked ? "opacity-60" : ""
            }`}
            multiline
            textAlignVertical="top"
            value={text}
            editable={!isLocked && !loading}
            onChangeText={setText}
            placeholder="Paste news content here..."
            placeholderTextColor="#64748b"
          />

          <Pressable
            className={`bg-emerald-500 rounded-2xl py-3.5 items-center ${
              loading || isLocked ? "opacity-60" : ""
            }`}
            onPress={onAnalyze}
            disabled={loading || isLocked}
          >
            <Text className="text-white text-base font-bold">
              {loading ? "Analyzing..." : "Compare"}
            </Text>
          </Pressable>

          {result ? (
            <View className="border border-white/10 rounded-2xl p-3.5 bg-white/5 gap-2.5">
              <Text
                className={`text-2xl font-extrabold text-center ${
                  result === "REAL" ? "text-green-400" : "text-red-400"
                }`}
              >
                {result === "REAL" ? "Authentic News" : "Fake News Detected"}
              </Text>
              <View className="bg-black/25 rounded-xl border border-white/10 p-2.5">
                <Text className="text-slate-400 text-xs mb-1.5 uppercase">
                  Analyzed Content
                </Text>
                <Text className="text-slate-200 text-sm">{analyzedText}</Text>
              </View>
            </View>
          ) : null}

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-slate-400 text-xs">Detection Accuracy</Text>
              <Text className="text-slate-400 text-xs">{accuracy}%</Text>
            </View>
            <View className="h-3 rounded-full bg-white/10 overflow-hidden">
              <View className="h-full bg-emerald-500" style={{ width: `${accuracy}%` }} />
            </View>
          </View>

          <Text className="text-slate-400 text-center text-xs">
            Prompts Used: {quotaLabel}
          </Text>
        </View>

        {isLocked ? (
          <View className="absolute inset-0 rounded-[20px] bg-black/75 border border-white/10 p-4 justify-center gap-2.5">
            <Text className="text-white text-2xl font-black text-center">
              Limit Reached
            </Text>
            <Text className="text-slate-300 text-center text-sm">
              Your current prompt limit is reached. Login or signup to continue.
            </Text>
            <View className="flex-row justify-center gap-2.5 mt-1.5">
              <Pressable
                className="border border-green-500 px-3 py-2 rounded-[10px]"
                onPress={onGoSignup}
              >
                <Text className="text-green-400 font-bold">Sign Up</Text>
              </Pressable>
              <Pressable className="bg-green-500 px-3 py-2 rounded-[10px]" onPress={onGoLogin}>
                <Text className="text-white font-bold">Sign In</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
