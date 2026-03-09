import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { TextArea } from "../textarea/TextArea";

type FormTextareaProps = {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
};

export function FormTextarea({
  name,
  control,
  label,
  placeholder,
}: FormTextareaProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="gap-1">
          {label && <Text className="text-white font-semibold">{label}</Text>}

          <TextArea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
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