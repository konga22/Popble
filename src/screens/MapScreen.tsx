import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import BottomNavBar from "../components/common/BottomNavBar";
import TopAppBar from "../components/common/TopAppBar";
import MapSceneSection from "../components/sections/map/MapSceneSection";
import type { AppScreenProps } from "../global/navigation/appRoutes";

export default function MapScreen({
  activeTab,
  onOpenMenu,
  onTabPress,
}: AppScreenProps) {
  const [activeChip, setActiveChip] = useState("성수동");

  return (
    <View className="flex-1 bg-surface">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <TopAppBar
        variant="logo"
        rightIcon="search-outline"
        rightAccessibilityLabel="지도에서 팝업 검색"
        onLeftPress={onOpenMenu}
      />
      <MapSceneSection activeChip={activeChip} onSelectChip={setActiveChip} />
      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
