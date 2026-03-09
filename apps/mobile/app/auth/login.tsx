import { useRouter } from "expo-router";

import { useAppControllerContext } from "@mobile/core/providers/AppControllerProvider";
import { LoginScreen } from "@mobile/features/auth/screens/LoginScreen";

export default function LoginRoute() {
  const app = useAppControllerContext();
  const router = useRouter();

  return (
    <LoginScreen
      email={app.loginEmail}
      setEmail={app.setLoginEmail}
      password={app.loginPassword}
      setPassword={app.setLoginPassword}
      loading={app.loading}
      onSubmit={async () => {
        const ok = await app.login();
        if (ok) router.replace("/drawer/tabs");
      }}
      onGoSignup={() => router.replace("/auth/signup")}
      onBackHome={() => router.replace("/drawer/tabs")}
    />
  );
}
