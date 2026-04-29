import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import PopupDetailScreen from "../../src/screens/PopupDetailScreen";
import { useAppScreenProps } from "../../src/global/navigation/NavigationContext";

export default function PopupDetailRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const screenProps = useAppScreenProps();
  const popupId = Array.isArray(id) ? id[0] ?? "" : id ?? "";

  return (
    <PopupDetailScreen
      activeTab={screenProps.activeTab}
      popupId={popupId}
      onBack={() => router.back()}
      onOpenMap={() => screenProps.onNavigate("map")}
      onTabPress={screenProps.onTabPress}
    />
  );
}
