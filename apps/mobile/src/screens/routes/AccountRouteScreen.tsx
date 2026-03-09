import { AccountScreen } from "@mobile/features/account/screens/AccountScreen";
import { useAppController } from "@mobile/hooks/useAppController";

type AppController = ReturnType<typeof useAppController>;

type AccountRouteScreenProps = {
  app: AppController;
};

export function AccountRouteScreen({ app }: AccountRouteScreenProps) {
  return <AccountScreen user={app.user} quota={app.quota} />;
}
