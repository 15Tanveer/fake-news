import { createContext, PropsWithChildren, useContext } from "react";

import { useAppController } from "@mobile/hooks/useAppController";

type AppController = ReturnType<typeof useAppController>;

const AppControllerContext = createContext<AppController | null>(null);

export function AppControllerProvider({ children }: PropsWithChildren) {
  const controller = useAppController();
  return (
    <AppControllerContext.Provider value={controller}>
      {children}
    </AppControllerContext.Provider>
  );
}

export function useAppControllerContext(): AppController {
  const context = useContext(AppControllerContext);
  if (!context) {
    throw new Error("useAppControllerContext must be used inside AppControllerProvider");
  }
  return context;
}
