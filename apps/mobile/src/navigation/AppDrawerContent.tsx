import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppController } from "@mobile/hooks/useAppController";

type AppController = ReturnType<typeof useAppController>;

type AppDrawerContentProps = DrawerContentComponentProps & {
  app: AppController;
  onGoLogin: () => void;
};

function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.trim()?.charAt(0) ?? "";
  const last = lastName?.trim()?.charAt(0) ?? "";
  const value = `${first}${last}`.toUpperCase();
  return value || "G";
}

export function AppDrawerContent({ app, navigation, onGoLogin }: AppDrawerContentProps) {
  const insets = useSafeAreaInsets();
  const initials = getInitials(app.user?.firstName, app.user?.lastName);

  return (
    <View className="flex-1 bg-[#0c1939]">
      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0, flexGrow: 1 }}
      >
        <View
          className="px-4 pb-4 border-b border-white/10 relative"
          style={{ paddingTop: Math.max(insets.top, 12) + 8 }}
        >
          <View className="items-end mb-2 absolute top-12 right-2">
            <Pressable
              onPress={() => navigation.closeDrawer()}
              className="w-10 h-10 items-center justify-center"
            >
              <Text className="text-white text-3xl font-bold">×</Text>
            </Pressable>
          </View>

          <View className="flex-row gap-3 items-center">
            <View className="h-12 w-12 rounded-full bg-emerald-500 items-center justify-center">
              <Text className="text-white font-black text-lg">{initials}</Text>
            </View>

            <View>
              <Text className="text-white text-base font-bold">
                {app.user
                  ? `${app.user.firstName} ${app.user.lastName}`
                  : "Guest User"}
              </Text>

              <Text className="text-slate-300 text-xs mt-1">
                {app.user
                  ? app.user.email
                  : "Sign in to access registered quota"}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-2 py-3 gap-1">
          <Pressable
            onPress={() => navigation.navigate("HomeTabs")}
            className="flex-row items-center gap-3 rounded-xl px-3 py-3 bg-white/5"
          >
            <Text className="text-slate-100 text-sm font-semibold">Home</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Account")}
            className="flex-row items-center gap-3 rounded-xl px-3 py-3 bg-white/5"
          >
            <Text className="text-slate-100 text-sm font-semibold">
              My Account
            </Text>
          </Pressable>
        </View>
      </DrawerContentScrollView>

      <View className="p-4 border-t border-white/10">
        <Pressable
          onPress={async () => {
            navigation.closeDrawer();
            if (app.user) {
              await app.logout();
            } else {
              onGoLogin();
            }
          }}
          className="rounded-xl bg-red-500/90 px-4 py-3 items-center"
        >
          <Text className="text-white font-bold text-sm">
            {app.user ? "Logout" : "Login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
