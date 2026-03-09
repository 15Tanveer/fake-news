import { useRouter } from "expo-router";

import { useAppControllerContext } from "@mobile/core/providers/AppControllerProvider";
import { SignupScreen } from "@mobile/features/auth/screens/SignupScreen";

export default function SignupRoute() {
  const app = useAppControllerContext();
  const router = useRouter();

  return (
    <SignupScreen
      loading={app.loading}
      onSubmit={async (data) => {
        const ok = await app.signup(data);
        if (ok) router.replace("/drawer/tabs");
      }}
      onGoLogin={() => router.replace("/auth/login")}
      onBackHome={() => router.replace("/drawer/tabs")}
    />
  );
}
