import React from "react";
import { View, ScrollView } from "react-native";
import CommunitySectionHeader from "./CommunitySectionHeader";
import MateCard, { type MateCardProps } from "../../cards/community/MateCard";
import { COLORS } from "../../../constants/colors";

type Props = {
  items: MateCardProps[];
};

export default function CommunityRecruitSection({ items }: Props) {
  return (
    <View className="gap-6">
      <View className="px-4">
        <CommunitySectionHeader
          badge="Recruit"
          badgeColor={COLORS.primaryLight}
          title="팝업 파트너 구하기"
          action="전체보기"
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16, paddingBottom: 16 }}
      >
        {items.map((item) => (
          <MateCard key={`${item.name}-${item.location}`} {...item} />
        ))}
      </ScrollView>
    </View>
  );
}
