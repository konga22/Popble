import React, { useCallback, useEffect } from "react";
import { Animated } from "react-native";
import NavigationBottomNavBar from "../navigation/BottomNavBar";
import type { TabName } from "../../global/navigation/tabConfig";
import { useTabEvent } from "../../global/navigation/TabEventContext";

export type { TabName } from "../../global/navigation/tabConfig";

const DEFAULT_BOTTOM_NAV_OFFSET = 0;

type BottomNavBarProps = {
  activeTab: TabName;
  bottomOffset?: number;
  onTabPress: (tab: TabName) => void;
  translateY?: Animated.Value;
};

export default function BottomNavBar({
  activeTab,
  bottomOffset = DEFAULT_BOTTOM_NAV_OFFSET,
  onTabPress,
  translateY,
}: BottomNavBarProps) {
  const {
    actionLabel,
    clearEvent,
    dismissEvent,
    message,
    status,
    targetTab,
  } = useTabEvent();

  useEffect(() => {
    if (activeTab === targetTab) {
      clearEvent();
    }
  }, [activeTab, clearEvent, targetTab]);

  const handleTabPress = useCallback(
    (nextTab: TabName) => {
      if (nextTab === targetTab) {
        clearEvent();
      }

      onTabPress(nextTab);
    },
    [clearEvent, onTabPress, targetTab]
  );

  return (
    <NavigationBottomNavBar
      activeTab={activeTab}
      bottomOffset={bottomOffset}
      eventActionLabel={actionLabel}
      eventMessage={message}
      eventStatus={status}
      eventTab={targetTab}
      onDismissEvent={dismissEvent}
      onOpenEvent={() => handleTabPress(targetTab)}
      onTabPress={handleTabPress}
      translateY={translateY}
    />
  );
}
