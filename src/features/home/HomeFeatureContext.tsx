import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { getAllHomePopups } from "./homeData";

type HomeFeatureContextValue = {
  savedPopupIds: string[];
  reminderPopupIds: string[];
  isPopupSaved: (popupId: string) => boolean;
  isPopupReminderEnabled: (popupId: string) => boolean;
  toggleSavedPopup: (popupId: string) => void;
  togglePopupReminder: (popupId: string) => void;
};

const HomeFeatureContext = createContext<HomeFeatureContextValue | null>(null);

function getInitialIds(key: "isSaved" | "reminderEnabled") {
  return getAllHomePopups()
    .filter((popup) => popup[key])
    .map((popup) => popup.id);
}

function toggleId(items: string[], nextId: string) {
  return items.includes(nextId)
    ? items.filter((item) => item !== nextId)
    : [...items, nextId];
}

export function HomeFeatureProvider({ children }: PropsWithChildren) {
  const [savedPopupIds, setSavedPopupIds] = useState<string[]>(() =>
    getInitialIds("isSaved")
  );
  const [reminderPopupIds, setReminderPopupIds] = useState<string[]>(() =>
    getInitialIds("reminderEnabled")
  );

  const toggleSavedPopup = useCallback((popupId: string) => {
    setSavedPopupIds((currentIds) => toggleId(currentIds, popupId));
  }, []);

  const togglePopupReminder = useCallback((popupId: string) => {
    setReminderPopupIds((currentIds) => toggleId(currentIds, popupId));
  }, []);

  const isPopupSaved = useCallback(
    (popupId: string) => savedPopupIds.includes(popupId),
    [savedPopupIds]
  );

  const isPopupReminderEnabled = useCallback(
    (popupId: string) => reminderPopupIds.includes(popupId),
    [reminderPopupIds]
  );

  const value = useMemo<HomeFeatureContextValue>(
    () => ({
      savedPopupIds,
      reminderPopupIds,
      isPopupSaved,
      isPopupReminderEnabled,
      toggleSavedPopup,
      togglePopupReminder,
    }),
    [
      isPopupReminderEnabled,
      isPopupSaved,
      reminderPopupIds,
      savedPopupIds,
      togglePopupReminder,
      toggleSavedPopup,
    ]
  );

  return (
    <HomeFeatureContext.Provider value={value}>
      {children}
    </HomeFeatureContext.Provider>
  );
}

export function useHomeFeature() {
  const context = useContext(HomeFeatureContext);

  if (!context) {
    throw new Error("useHomeFeature must be used inside HomeFeatureProvider.");
  }

  return context;
}
