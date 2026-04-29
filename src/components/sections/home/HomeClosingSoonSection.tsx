import React from "react";
import { View } from "react-native";
import SectionHeader from "../../ui/SectionHeader";
import ClosingSoonItem from "../../cards/home/ClosingSoonItem";
import type { PopupSummary } from "../../../features/home/homeData";

type HomeClosingSoonSectionProps = {
  items: PopupSummary[];
  onOpenPopup: (popupId: string) => void;
  onOpenSection: () => void;
};

export default function HomeClosingSoonSection({
  items,
  onOpenPopup,
  onOpenSection,
}: HomeClosingSoonSectionProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title="종료 임박 팝업"
        actionLabel="Hurry Up!"
        onActionPress={onOpenSection}
      />
      <View className="gap-3">
        {items.map((item) => (
          <ClosingSoonItem
            key={item.id}
            image={item.image}
            title={item.title}
            subtitle={item.closingSubtitle ?? item.periodLabel}
            badge={item.closingBadge ?? item.periodLabel}
            urgent={item.urgent}
            onPress={() => onOpenPopup(item.id)}
          />
        ))}
      </View>
    </View>
  );
}
