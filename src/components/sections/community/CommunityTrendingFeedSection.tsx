import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../../ui/AppText";
import TrendingPostCard, { type TrendingPostCardProps } from "../../cards/community/TrendingPostCard";
import { COLORS } from "../../../constants/colors";

type Props = {
  items: TrendingPostCardProps[];
};

export default function CommunityTrendingFeedSection({ items }: Props) {
  return (
    <View className="gap-5">
      {items.map((item) => (
        <TrendingPostCard key={`${item.rank}-${item.title}`} {...item} />
      ))}
      <TouchableOpacity
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="더 많은 인기글 보기"
        className="items-center py-4 rounded-full border"
        style={{ borderColor: `${COLORS.primary}33` }}
      >
        <Text className="text-primary text-sm font-semibold">더 많은 인기글 보기</Text>
      </TouchableOpacity>
    </View>
  );
}
