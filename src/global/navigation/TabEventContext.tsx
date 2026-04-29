import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { TabName } from "./tabConfig";

export type TabEventStatus = "bubble" | "dot" | "cleared";

type TabEventContextValue = {
  actionLabel: string;
  clearEvent: () => void;
  dismissEvent: () => void;
  message: string;
  status: TabEventStatus;
  targetTab: TabName;
};

const EVENT_TARGET_TAB: TabName = "community";
const TabEventContext = createContext<TabEventContextValue | null>(null);

export function TabEventProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<TabEventStatus>("bubble");

  const dismissEvent = useCallback(() => {
    setStatus((currentStatus) =>
      currentStatus === "bubble" ? "dot" : currentStatus
    );
  }, []);

  const clearEvent = useCallback(() => {
    setStatus("cleared");
  }, []);

  const value = useMemo<TabEventContextValue>(
    () => ({
      actionLabel: "이벤트 보기",
      clearEvent,
      dismissEvent,
      message: "오늘 볼 만한 팝업 이벤트가 있어요.",
      status,
      targetTab: EVENT_TARGET_TAB,
    }),
    [clearEvent, dismissEvent, status]
  );

  return (
    <TabEventContext.Provider value={value}>
      {children}
    </TabEventContext.Provider>
  );
}

export function useTabEvent() {
  const context = useContext(TabEventContext);

  if (!context) {
    throw new Error("useTabEvent must be used inside TabEventProvider.");
  }

  return context;
}
