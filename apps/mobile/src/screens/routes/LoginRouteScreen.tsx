import { LoginScreen } from "@mobile/features/auth/screens/LoginScreen";
import { useAppController } from "@mobile/hooks/useAppController";

type AppController = ReturnType<typeof useAppController>;

type LoginRouteScreenProps = {
  app: AppController;
  onSuccess: () => void;
  onGoSignup: () => void;
  onBackHome: () => void;
};

export function LoginRouteScreen({
  app,
  onSuccess,
  onGoSignup,
  onBackHome,
}: LoginRouteScreenProps) {
  return (
    <LoginScreen
      email={app.loginEmail}
      setEmail={app.setLoginEmail}
      password={app.loginPassword}
      setPassword={app.setLoginPassword}
      loading={app.loading}
      onSubmit={async () => {
        const ok = await app.login();
        if (ok) onSuccess();
      }}
      onGoSignup={onGoSignup}
      onBackHome={onBackHome}
    />
  );
}
