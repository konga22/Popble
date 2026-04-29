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

export type ComingSoonCardProps = {
  image: string;
  dday: string;
  title: string;
  reminderEnabled: boolean;
  onPress: () => void;
  onToggleReminder: () => void;
};

export default function ComingSoonCard({
  image,
  dday,
  title,
  reminderEnabled,
  onPress,
  onToggleReminder,
}: ComingSoonCardProps) {
  const handleReminderPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleReminder();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${dday}`}
      className="w-[200px] h-[264px] bg-white rounded-[32px] shadow-sm border border-[rgba(179,177,184,0.1)] overflow-hidden"
    >
      <Image
        source={{ uri: image }}
        className="w-full h-[174px] rounded-[24px] m-3"
        resizeMode="cover"
      />
      <View className="flex-row items-center justify-between px-3 mt-1">
        <View className="bg-lavender rounded-2xl px-2 py-0.5">
          <Text className="text-lavender-dark text-[10px] font-bold">
            {dday}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleReminderPress}
          accessibilityRole="button"
          accessibilityLabel={reminderEnabled ? "오픈 알림 해제" : "오픈 알림 받기"}
          className="h-10 w-10 items-center justify-center rounded-full bg-primary-light"
        >
          <Ionicons
            name={reminderEnabled ? "notifications" : "notifications-outline"}
            size={17}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Text
        className="text-heading text-sm font-semibold px-3 mt-1"
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
