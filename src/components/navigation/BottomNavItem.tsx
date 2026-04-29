import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../ui/AppText";
import type { TabConfigItem, TabName } from "../../global/navigation/tabConfig";
import { COLORS } from "../../constants/colors";

type BottomNavItemProps = {
  activeTab: TabName;
  hasEventDot?: boolean;
  item: TabConfigItem;
  onPress: (tab: TabName) => void;
  scale: Animated.Value;
};

export default function BottomNavItem({
  activeTab,
  hasEventDot = false,
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
      className="min-h-[68px] flex-1 items-center justify-start"
    >
      <View className="h-[68px] w-full items-center justify-start px-0.5 pt-1">
        <Animated.View
          className="h-[58px] w-full items-center justify-start rounded-[10px] px-1 pt-1"
          style={{ transform: [{ scale }] }}
        >
          <View className="relative h-7 w-10 items-center justify-center">
            <Ionicons
              name={isActive ? item.activeIcon : item.icon}
              size={25}
              color={isActive ? COLORS.primary : COLORS.iconMuted}
            />
            {hasEventDot ? (
              <View className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-urgent" />
            ) : null}
          </View>
          <Text
            className={`mt-1.5 w-full text-center text-[12px] leading-[15px] ${
              isActive ? "font-semibold text-primary" : "text-icon-muted"
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
