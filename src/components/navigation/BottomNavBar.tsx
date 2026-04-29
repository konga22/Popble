import React from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavItem from "./BottomNavItem";
import { TAB_CONFIG, type TabName } from "../../global/navigation/tabConfig";
import useBottomNavAnimation from "../../global/navigation/useBottomNavAnimation";

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
  const { containerStyle, scaleByTab } = useBottomNavAnimation(
    activeTab,
    translateY
  );

  return (
    <Animated.View
      className="absolute bottom-0 left-0 right-0 z-20"
      style={containerStyle}
    >
      <SafeAreaView
        edges={["bottom"]}
        className="border-t border-chip-border bg-white"
      >
        <View
          className="flex-row items-center gap-1 px-2 pb-2 pt-2"
          style={{
            shadowColor: "rgba(16, 16, 20, 0.08)",
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 1,
            shadowRadius: 18,
            elevation: 12,
          }}
        >
          {TAB_CONFIG.map((tab) => (
            <BottomNavItem
              key={tab.id}
              activeTab={activeTab}
              item={tab}
              onPress={onTabPress}
              scale={scaleByTab[tab.id]}
            />
          ))}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
