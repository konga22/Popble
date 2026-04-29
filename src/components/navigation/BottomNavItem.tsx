import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../ui/AppText";
import type { TabConfigItem, TabName } from "../../global/navigation/tabConfig";
import { COLORS } from "../../constants/colors";

type BottomNavItemProps = {
  activeTab: TabName;
  item: TabConfigItem;
  onPress: (tab: TabName) => void;
  scale: Animated.Value;
};

export default function BottomNavItem({
  activeTab,
  item,
  onPress,
  scale,
}: BottomNavItemProps) {
  const isActive = item.id === activeTab;

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      activeOpacity={0.86}
      accessibilityRole="tab"
      accessibilityLabel={`${item.label} 탭`}
      accessibilityState={{ selected: isActive }}
      hitSlop={{ bottom: 6, left: 4, right: 4, top: 6 }}
      className="min-h-[58px] flex-1 items-center justify-center"
    >
      <View className="h-[58px] w-full items-center justify-center px-0.5">
        <Animated.View
          className={`h-[54px] w-full items-center justify-center rounded-[8px] px-1 py-1 ${
            isActive ? "bg-heading" : "bg-transparent"
          }`}
          style={{ transform: [{ scale }] }}
        >
          <View
            className={`mb-1 h-[3px] w-6 rounded-[2px] ${
              isActive ? "bg-white" : "bg-transparent"
            }`}
            pointerEvents="none"
          />
          <View className="h-6 w-full items-center justify-center">
            <Ionicons
              name={isActive ? item.activeIcon : item.icon}
              size={22}
              color={isActive ? "white" : COLORS.iconMuted}
            />
          </View>
          <Text
            className={`mt-0.5 w-full text-center text-[11px] leading-[14px] ${
              isActive ? "font-semibold text-white" : "text-muted"
            }`}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.88}
          >
            {item.label}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
