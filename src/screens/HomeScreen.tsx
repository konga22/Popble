import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import TopAppBar from "../components/common/TopAppBar";
import BottomNavBar from "../components/common/BottomNavBar";
import FAB from "../components/common/FAB";
import HomeSearchSection from "../components/sections/home/HomeSearchSection";
import HomeBannerSection from "../components/sections/home/HomeBannerSection";
import HomeTrendingSection from "../components/sections/home/HomeTrendingSection";
import HomeComingSoonSection from "../components/sections/home/HomeComingSoonSection";
import HomeClosingSoonSection from "../components/sections/home/HomeClosingSoonSection";
import type { AppScreenProps } from "../global/navigation/appRoutes";

export default function HomeScreen({
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
      <TopAppBar onLeftPress={onOpenMenu} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 96, paddingBottom: 120, gap: 32 }}
        directionalLockEnabled
        disableScrollViewPanResponder
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 gap-8">
          <HomeSearchSection />
          <HomeBannerSection />
          <HomeTrendingSection />
          <HomeComingSoonSection />
          <HomeClosingSoonSection />
        </View>
      </ScrollView>

      <FAB bottom={96} />
      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
