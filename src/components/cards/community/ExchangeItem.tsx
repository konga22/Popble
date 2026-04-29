import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Text from "../../ui/AppText";

export type ExchangeItemProps = {
  image: string;
  label: string;
  title: string;
  time: string;
};

export default function ExchangeItem({ image, label, title, time }: ExchangeItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${label}, ${time}`}
      className="flex-1 bg-white rounded-[32px] overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View className="h-40 relative">
        <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        <View className="absolute top-2 left-2 bg-white/60 rounded-md flex-row items-center gap-1 px-2 py-1">
          <Text className="text-[10px]">✓</Text>
          <Text className="text-primary text-[10px]">영수증 인증 완료</Text>
        </View>
      </View>
      <View className="p-3 gap-1">
        <Text className="text-primary text-xs">{label}</Text>
        <Text className="text-heading text-sm font-semibold">{title}</Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-muted text-[10px]">{time}</Text>
          <Text className="text-base">🤍</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
