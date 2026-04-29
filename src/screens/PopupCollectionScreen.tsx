import React from "react";
import { FlatList, StatusBar, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavBar from "../components/common/BottomNavBar";
import TopAppBar from "../components/common/TopAppBar";
import PopupListItem from "../components/cards/home/PopupListItem";
import Text from "../components/ui/AppText";
import { COLORS } from "../constants/colors";
import {
  HOME_SECTION_META,
  getPopupsBySection,
  isHomeSectionKey,
  type HomeSectionKey,
  type PopupSummary,
} from "../features/home/homeData";
import { useHomeFeature } from "../features/home/HomeFeatureContext";
import type { TabName } from "../global/navigation/tabConfig";

type PopupCollectionScreenProps = {
  activeTab: TabName;
  section: string;
  onBack: () => void;
  onOpenPopup: (popupId: string) => void;
  onTabPress: (tab: TabName) => void;
};

function resolveSection(section: string): HomeSectionKey {
  return isHomeSectionKey(section) ? section : "trending";
}

export default function PopupCollectionScreen({
  activeTab,
  section,
  onBack,
  onOpenPopup,
  onTabPress,
}: PopupCollectionScreenProps) {
  const sectionKey = resolveSection(section);
  const meta = HOME_SECTION_META[sectionKey];
  const popups = getPopupsBySection(sectionKey);
  const {
    isPopupReminderEnabled,
    isPopupSaved,
    togglePopupReminder,
    toggleSavedPopup,
  } = useHomeFeature();

  const renderPopup = ({ item }: { item: PopupSummary }) => (
    <PopupListItem
      popup={item}
      isSaved={isPopupSaved(item.id)}
      reminderEnabled={isPopupReminderEnabled(item.id)}
      onPress={() => onOpenPopup(item.id)}
      onToggleSaved={() => toggleSavedPopup(item.id)}
      onToggleReminder={() => togglePopupReminder(item.id)}
    />
  );

  return (
    <View className="flex-1 bg-surface">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TopAppBar
        variant="back"
        title={meta.title}
        rightIcon="filter-outline"
        rightAccessibilityLabel={`${meta.title} 필터`}
        onLeftPress={onBack}
      />

      <FlatList
        className="flex-1"
        data={popups}
        renderItem={renderPopup}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="gap-3 pb-5">
            <View className="rounded-[28px] bg-primary px-5 py-5">
              <View className="flex-row items-center gap-2">
                <Ionicons name="sparkles" size={17} color="white" />
                <Text className="text-[12px] font-semibold uppercase tracking-[1.2px] text-white/75">
                  팝업메이트 추천
                </Text>
              </View>
              <Text className="mt-2 text-[24px] font-semibold leading-8 text-white">
                {meta.title}
              </Text>
              <Text className="mt-2 text-[14px] leading-5 text-white/80">
                {meta.description}
              </Text>
            </View>
          </View>
        }
        contentContainerStyle={{
          paddingTop: 112,
          paddingHorizontal: 20,
          paddingBottom: 128,
        }}
      />

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
