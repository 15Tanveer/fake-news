import { View } from "react-native"
import { cn } from "@mobile/lib/cn"

type Props = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: Props) {
  return (
    <View
      className={cn(
        "bg-[#0b1227] border border-white/10 rounded-2xl p-4 space-y-3",
        className
      )}
    >
      {children}
    </View>
  )
}