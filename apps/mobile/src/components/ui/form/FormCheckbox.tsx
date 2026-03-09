import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type FormCheckboxProps = {
  name: string;
  control: any;
  label: string;
};

export function FormCheckbox({ name, control, label }: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Pressable
          className="flex-row items-center gap-2"
          onPress={() => onChange(!value)}
        >
          <View
            className={`w-5 h-5 border rounded ${
              value ? "bg-green-500 border-green-500" : "border-gray-400"
            }`}
          />

          <Text className="text-white">{label}</Text>
        </Pressable>
      )}
    />
  );
}