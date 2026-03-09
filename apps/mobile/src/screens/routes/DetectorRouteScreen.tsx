import { DetectorScreen } from "@mobile/features/detector/screens/DetectorScreen";
import { useAppController } from "@mobile/hooks/useAppController";

type AppController = ReturnType<typeof useAppController>;

type DetectorRouteScreenProps = {
  app: AppController;
  onGoLogin: () => void;
  onGoSignup: () => void;
};

export function DetectorRouteScreen({
  app,
  onGoLogin,
  onGoSignup,
}: DetectorRouteScreenProps) {
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
      onGoLogin={onGoLogin}
      onGoSignup={onGoSignup}
    />
  );
}
