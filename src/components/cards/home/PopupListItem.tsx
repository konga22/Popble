import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";
import type { PopupSummary } from "../../../features/home/homeData";

type PopupListItemProps = {
  popup: PopupSummary;
  isSaved: boolean;
  reminderEnabled: boolean;
  onPress: () => void;
  onToggleSaved?: () => void;
  onToggleReminder?: () => void;
};

export default function PopupListItem({
  popup,
  isSaved,
  reminderEnabled,
  onPress,
  onToggleSaved,
  onToggleReminder,
}: PopupListItemProps) {
  const handleSavePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleSaved?.();
  };

  const handleReminderPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleReminder?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${popup.title}, ${popup.area}, ${popup.periodLabel}`}
      className="rounded-[28px] bg-white p-3"
      style={{
        shadowColor: COLORS.shadowSoft,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 3,
      }}
    >
      <View className="flex-row gap-3">
        <Image
          source={{ uri: popup.image }}
          className="h-[92px] w-[92px] rounded-[22px]"
          resizeMode="cover"
        />
        <View className="min-w-0 flex-1 justify-between py-0.5">
          <View>
            <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-primary">
              {popup.category}
            </Text>
            <Text
              className="mt-1 text-[16px] font-semibold leading-6 text-heading"
              numberOfLines={2}
            >
              {popup.title}
            </Text>
            <Text className="mt-1 text-[12px] leading-4 text-muted">
              {popup.area} · {popup.periodLabel}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="rounded-full bg-surface-secondary px-2.5 py-1">
              <Text className="text-[11px] font-semibold text-primary">
                {popup.status === "comingSoon" ? popup.dday ?? "Soon" : popup.hours}
              </Text>
            </View>
            {popup.status === "closingSoon" ? (
              <View className="rounded-full bg-[rgba(249,115,134,0.18)] px-2.5 py-1">
                <Text className="text-[11px] font-semibold text-urgent">
                  {popup.closingBadge}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="items-center gap-2">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSavePress}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? "저장 해제" : "저장하기"}
            className="h-11 w-11 items-center justify-center rounded-full bg-surface-secondary"
          >
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={19}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          {popup.status === "comingSoon" ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleReminderPress}
              accessibilityRole="button"
              accessibilityLabel={
                reminderEnabled ? "오픈 알림 해제" : "오픈 알림 받기"
              }
              className="h-11 w-11 items-center justify-center rounded-full bg-primary-light"
            >
              <Ionicons
                name={reminderEnabled ? "notifications" : "notifications-outline"}
                size={18}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
