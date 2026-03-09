import { Pressable, Text } from "react-native"
import { cn } from "@mobile/lib/cn"

type ButtonProps = {
  title: string
  onPress: () => void
  loading?: boolean
  variant?: "primary" | "secondary"
  className?: string
  textClassName?: string
}

export function Button({
  title,
  onPress,
  loading,
  variant = "primary",
  className,
  textClassName,
}: ButtonProps) {

  const variants = {
    primary: "bg-green-500",
    secondary: "border border-green-500",
  }

  const textVariants = {
    primary: "text-white font-bold",
    secondary: "text-green-400 font-bold",
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className={cn(
        "px-4 py-2 rounded-lg items-center justify-center",
        variants[variant],
        className
      )}
    >
      <Text className={cn(textVariants[variant], textClassName)}>
        {loading ? "Loading..." : title}
      </Text>
    </Pressable>
  )
}