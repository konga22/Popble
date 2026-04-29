import React from "react";
import { View } from "react-native";
import Text from "../../ui/AppText";

export type TipFeedCardProps = {
  accentColor: string;
  categoryIcon: string;
  category: string;
  body: string;
  timestamp: string;
  likes: number;
};

export default function TipFeedCard({
  accentColor,
  categoryIcon,
  category,
  body,
  timestamp,
  likes,
}: TipFeedCardProps) {
  return (
    <View
      className="bg-white rounded-[32px] pl-5 pr-4 py-4 flex-row gap-4"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: accentColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View className="flex-1 gap-2">
        <View className="flex-row items-center gap-2">
          <Text className="text-sm">{categoryIcon}</Text>
          <Text style={{ color: accentColor }} className="text-xs font-semibold">
            {category}
          </Text>
        </View>
        <Text className="text-muted text-sm leading-[22px]" numberOfLines={2}>
          {body}
        </Text>
        <View className="flex-row items-center gap-4">
          <Text className="text-body-muted text-[11px]">{timestamp}</Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-[10px]">❤️</Text>
            <Text className="text-heading text-[11px] font-semibold">{likes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
