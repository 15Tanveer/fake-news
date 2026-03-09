import { TextInput } from "react-native"
import { cn } from "@mobile/lib/cn"

type Props = {
  value?: string
  onChange?: (text: string) => void
  placeholder?: string
  className?: string
}

export function TextArea({
  value,
  onChange,
  placeholder,
  className,
}: Props) {
  return (
    <TextInput
      multiline
      numberOfLines={5}
      className={cn(
        "min-h-32 border border-white/10 bg-white/5 rounded-xl text-white px-3 py-3",
        className
      )}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChange}
    />
  )
}