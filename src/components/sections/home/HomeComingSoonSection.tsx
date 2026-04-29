import React from "react";
import { View } from "react-native";
import SectionHeader from "../../ui/SectionHeader";
import HorizontalCardList from "../../ui/HorizontalCardList";
import ComingSoonCard from "../../cards/home/ComingSoonCard";
import type { PopupSummary } from "../../../features/home/homeData";

type HomeComingSoonSectionProps = {
  items: PopupSummary[];
  isPopupReminderEnabled: (popupId: string) => boolean;
  onOpenPopup: (popupId: string) => void;
  onOpenSection: () => void;
  onToggleReminder: (popupId: string) => void;
};

export default function HomeComingSoonSection({
  items,
  isPopupReminderEnabled,
  onOpenPopup,
  onOpenSection,
  onToggleReminder,
}: HomeComingSoonSectionProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title="곧 오픈할 팝업"
        actionLabel="D-Day 알림"
        onActionPress={onOpenSection}
      />
      <HorizontalCardList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ComingSoonCard
            image={item.image}
            dday={item.dday ?? "Soon"}
            title={item.title}
            reminderEnabled={isPopupReminderEnabled(item.id)}
            onPress={() => onOpenPopup(item.id)}
            onToggleReminder={() => onToggleReminder(item.id)}
          />
        )}
      />
    </View>
  );
}
