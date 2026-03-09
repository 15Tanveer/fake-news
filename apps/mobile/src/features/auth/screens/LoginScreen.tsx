import { Pressable, Text, TextInput, View } from "react-native";

type LoginScreenProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onGoSignup: () => void;
  onBackHome: () => void;
};

export function LoginScreen({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onSubmit,
  onGoSignup,
  onBackHome,
}: LoginScreenProps) {
  return (
    <View className="flex-1 justify-center p-4">
      <View className="bg-[#0b1227] border border-white/10 rounded-[20px] p-4 gap-3">
        <Text className="text-green-400 text-3xl font-black text-center">Login</Text>

        <TextInput
          className="border border-white/10 bg-white/5 rounded-xl text-white px-3 py-2.5"
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-white/10 bg-white/5 rounded-xl text-white px-3 py-2.5"
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View className="flex-row justify-end gap-2.5 mt-1">
          <Pressable
            className="border border-green-500 px-3 py-2 rounded-[10px]"
            onPress={onBackHome}
          >
            <Text className="text-green-400 font-bold">Back</Text>
          </Pressable>
          <Pressable
            className="bg-green-500 px-3 py-2 rounded-[10px]"
            onPress={onSubmit}
            disabled={loading}
          >
            <Text className="text-white font-bold">{loading ? "Logging in..." : "Login"}</Text>
          </Pressable>
        </View>

        <Pressable className="mt-1.5 items-center" onPress={onGoSignup}>
          <Text className="text-green-200 text-xs">Don&apos;t have an account? Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
