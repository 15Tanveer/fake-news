import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { Button } from "@mobile/components/ui/button/Button";
import { FormInput } from "@mobile/components/ui/form/FormInput";
import { SignupSchemaType, signupSchema } from "@mobile/schemas/auth.schema";

type SignupScreenProps = {
  loading: boolean;
  onSubmit: (data: SignupSchemaType) => void;
  onGoLogin: () => void;
  onBackHome: () => void;
};

export function SignupScreen({
  loading,
  onSubmit,
  onGoLogin,
  onBackHome,
}: SignupScreenProps) {
  const { control, handleSubmit } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <View className="flex-1 justify-center p-4">
      <View className="bg-[#0b1227] border border-white/10 rounded-2xl p-4 gap-3">
        <Text className="text-green-400 text-3xl font-black text-center">
          Sign Up
        </Text>

        <FormInput
          name="firstName"
          label="First Name"
          placeholder="First Name"
          control={control}
        />

        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          control={control}
        />

        <FormInput name="email" label="Email" placeholder="Email" control={control} />

        <FormInput
          name="password"
          label="Password"
          placeholder="Password"
          control={control}
          secureTextEntry
        />

        <FormInput
          name="confirm"
          label="Confirm Password"
          placeholder="Confirm Password"
          control={control}
          secureTextEntry
        />

        <View className="flex-row justify-end gap-2 mt-2">
          <Button title="Back" variant="secondary" onPress={onBackHome} />

          <Button
            title="Create"
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <Pressable className="mt-2 items-center" onPress={onGoLogin}>
          <Text className="text-green-200 text-xs">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
