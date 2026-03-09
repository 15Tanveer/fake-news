import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps = {
  name: string;
  control: any;
  label?: string;
  options: Option[];
};

export function FormSelect({
  name,
  control,
  label,
  options,
}: FormSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="gap-1">
          {label && <Text className="text-white font-semibold">{label}</Text>}

          <View className="border border-gray-700 rounded-lg">
            <Picker selectedValue={value} onValueChange={onChange}>
              {options.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>

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