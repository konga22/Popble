import React from "react";
import { Animated } from "react-native";
import NavigationBottomNavBar from "../navigation/BottomNavBar";
import type { TabName } from "../../global/navigation/tabConfig";

export type { TabName } from "../../global/navigation/tabConfig";

type BottomNavBarProps = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  translateY?: Animated.Value;
};

export default function BottomNavBar({
  activeTab,
  onTabPress,
  translateY,
}: BottomNavBarProps) {
  return (
    <NavigationBottomNavBar
      activeTab={activeTab}
      onTabPress={onTabPress}
      translateY={translateY}
    />
  );
}
