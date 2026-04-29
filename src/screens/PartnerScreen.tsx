import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import BottomNavBar from "../components/common/BottomNavBar";
import FAB from "../components/common/FAB";
import TopAppBar from "../components/common/TopAppBar";
import PartnerRecruitmentSection from "../components/sections/partner/PartnerRecruitmentSection";
import type { AppScreenProps } from "../global/navigation/appRoutes";

export default function PartnerScreen({
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
        title="팝업 파트너 구하기"
        rightIcon="options-outline"
        rightAccessibilityLabel="파트너 필터 열기"
        onLeftPress={onOpenMenu}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <PartnerRecruitmentSection />
      </ScrollView>

      <FAB icon="✍️" bottom={96} accessibilityLabel="파트너 모집글 작성" />
      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
