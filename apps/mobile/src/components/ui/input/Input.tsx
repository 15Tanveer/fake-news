import { TextInput } from "react-native"
import { cn } from "@mobile/lib/cn"

type Props = {
  value?: string
  onChange?: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  className?: string
}

export function Input({
  value,
  onChange,
  placeholder,
  secureTextEntry,
  className,
}: Props) {
  return (
    <TextInput
      className={cn(
        "border border-white/10 bg-white/5 rounded-xl text-white px-3 py-2",
        className
      )}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
    />
  )
}