import React from "react";
import { View } from "react-native";
import SectionHeader from "../../ui/SectionHeader";
import HorizontalCardList from "../../ui/HorizontalCardList";
import TrendingPopupCard from "../../cards/home/TrendingPopupCard";
import type { PopupSummary } from "../../../features/home/homeData";

type HomeTrendingSectionProps = {
  items: PopupSummary[];
  isPopupSaved: (popupId: string) => boolean;
  onOpenPopup: (popupId: string) => void;
  onOpenSection: () => void;
  onToggleSaved: (popupId: string) => void;
};

export default function HomeTrendingSection({
  items,
  isPopupSaved,
  onOpenPopup,
  onOpenSection,
  onToggleSaved,
}: HomeTrendingSectionProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title="현재 인기 있는 팝업"
        actionLabel="전체보기"
        onActionPress={onOpenSection}
      />
      <HorizontalCardList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrendingPopupCard
            image={item.image}
            category={item.category}
            title={item.title}
            until={item.periodLabel}
            hot={item.hot}
            isSaved={isPopupSaved(item.id)}
            onPress={() => onOpenPopup(item.id)}
            onToggleSaved={() => onToggleSaved(item.id)}
          />
        )}
      />
    </View>
  );
}
