import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "../input/Input";

type FormInputProps = {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export function FormInput({
  name,
  control,
  label,
  placeholder,
  secureTextEntry,
}: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="gap-1">
          {label && <Text className="text-white font-semibold">{label}</Text>}

          <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />

          {error && (
            <Text className="text-red-400 text-xs">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}