import { SignupScreen } from "@mobile/features/auth/screens/SignupScreen";
import { useAppController } from "@mobile/hooks/useAppController";

type AppController = ReturnType<typeof useAppController>;

type SignupRouteScreenProps = {
  app: AppController;
  onSuccess: () => void;
  onGoLogin: () => void;
  onBackHome: () => void;
};

export function SignupRouteScreen({
  app,
  onSuccess,
  onGoLogin,
  onBackHome,
}: SignupRouteScreenProps) {
  return (
    <SignupScreen
      loading={app.loading}
      onSubmit={async (data) => {
        const ok = await app.signup(data);
        if (ok) onSuccess();
      }}
      onGoLogin={onGoLogin}
      onBackHome={onBackHome}
    />
  );
}
