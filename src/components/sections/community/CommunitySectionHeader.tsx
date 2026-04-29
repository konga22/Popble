import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

type Props = {
  badge: string;
  badgeColor: string;
  title: string;
  action?: string;
};

function getBadgeTextColor(badgeColor: string) {
  if (badgeColor === COLORS.primaryLight) {
    return COLORS.primary;
  }
  if (badgeColor === COLORS.lavender) {
    return COLORS.accentPlum;
  }
  return COLORS.primaryDark;
}

export default function CommunitySectionHeader({ badge, badgeColor, title, action }: Props) {
  return (
    <View className="flex-row items-end justify-between">
      <View className="gap-1.5">
        <View className="self-start rounded-full px-3 py-0.5" style={{ backgroundColor: badgeColor }}>
          <Text
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: getBadgeTextColor(badgeColor) }}
          >
            {badge}
          </Text>
        </View>
        <Text className="text-heading text-2xl font-semibold tracking-tight">{title}</Text>
      </View>
      {action ? (
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={`${title} ${action}`}
          className="min-h-11 justify-center"
        >
          <Text className="text-primary text-sm">{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
