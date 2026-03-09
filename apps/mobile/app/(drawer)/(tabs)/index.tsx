import { useRouter } from "expo-router";

import { useAppControllerContext } from "@mobile/core/providers/AppControllerProvider";
import { DetectorScreen } from "@mobile/features/detector/screens/DetectorScreen";

export default function DetectorRoute() {
  const app = useAppControllerContext();
  const router = useRouter();

  return (
    <DetectorScreen
      text={app.text}
      setText={app.setText}
      loading={app.loading}
      isLocked={app.isLocked}
      onAnalyze={() => void app.analyze()}
      result={app.result}
      analyzedText={app.lastAnalyzedText}
      accuracy={app.accuracy}
      quotaLabel={app.quotaLabel}
      onGoLogin={() => router.push("/auth/login")}
      onGoSignup={() => router.push("/auth/signup")}
    />
  );
}
