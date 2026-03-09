import { AccountScreen } from "@mobile/features/account/screens/AccountScreen";
import { useAppControllerContext } from "@mobile/core/providers/AppControllerProvider";

export default function AccountRoute() {
  const app = useAppControllerContext();
  return <AccountScreen user={app.user} quota={app.quota} />;
}
