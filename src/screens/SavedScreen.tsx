import React from "react";
import { ScrollView, TouchableOpacity, View, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TopAppBar from "../components/common/TopAppBar";
import BottomNavBar from "../components/common/BottomNavBar";
import Text from "../components/ui/AppText";
import type { AppScreenProps } from "../global/navigation/appRoutes";
import { COLORS } from "../constants/colors";

const SAVED_POPUPS = [
  {
    title: "오브제 마켓 vol.2",
    subtitle: "성수동 • 내일 오픈",
    icon: "sparkles-outline" as const,
    tone: "bg-primary-light",
  },
  {
    title: "네온 드림 디지털 전시",
    subtitle: "한남동 • D-7",
    icon: "flash-outline" as const,
    tone: "bg-lavender",
  },
  {
    title: "글로우 뷰티 클로젯",
    subtitle: "청담동 • 이번 주 종료",
    icon: "heart-outline" as const,
    tone: "bg-surface-secondary",
  },
];

export default function SavedScreen({
  activeTab,
  onOpenMenu,
  onTabPress,
}: AppScreenProps) {
  return (
    <View className="flex-1 bg-surface">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TopAppBar
        variant="title"
        title="저장한 팝업"
        rightIcon="search-outline"
        rightAccessibilityLabel="저장한 팝업 검색"
        onLeftPress={onOpenMenu}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 120, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 gap-5">
          <View className="rounded-[32px] bg-primary p-6">
            <Text className="text-[13px] font-semibold tracking-[1.1px] text-white/75">
              Saved Summary
            </Text>
            <Text className="mt-2 text-[30px] font-semibold leading-9 text-white">
              다시 보고 싶은 팝업을
              {"\n"}
              한곳에 모아봤어요
            </Text>
            <Text className="mt-3 text-[14px] leading-5 text-white/80">
              저장한 팝업 12개, 곧 오픈 예정 3개, 종료 임박 2개
            </Text>
          </View>

          <View className="gap-3">
            {SAVED_POPUPS.map((item) => (
              <TouchableOpacity
                key={item.title}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`${item.title}, ${item.subtitle}`}
                className={`rounded-[28px] px-4 py-4 ${item.tone}`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-white">
                    <Ionicons name={item.icon} size={20} color={COLORS.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[16px] font-semibold leading-6 text-heading">
                      {item.title}
                    </Text>
                    <Text className="mt-0.5 text-[13px] leading-5 text-muted">
                      {item.subtitle}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
