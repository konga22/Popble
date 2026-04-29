import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "../../ui/AppText";

export type ClosingSoonItemProps = {
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  urgent?: boolean;
  onPress: () => void;
};

export default function ClosingSoonItem({
  image,
  title,
  subtitle,
  badge,
  urgent,
  onPress,
}: ClosingSoonItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle}, ${badge}`}
      className="flex-row items-center bg-surface-secondary rounded-[32px] p-3"
    >
      <Image
        source={{ uri: image }}
        className="rounded-[20px]"
        style={{ width: 64, height: 64 }}
        resizeMode="cover"
      />
      <View className="flex-1 pl-4">
        <Text className="text-heading text-sm font-semibold">{title}</Text>
        <Text className="text-muted text-xs mt-0.5">{subtitle}</Text>
      </View>
      <View
        className={`rounded-2xl px-2 py-1 ${
          urgent ? "bg-[rgba(249,115,134,0.2)]" : "bg-badge-muted"
        }`}
      >
        <Text
          className={`text-xs font-bold ${
            urgent ? "text-urgent" : "text-muted"
          }`}
        >
          {badge}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
