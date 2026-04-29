import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import PopupCollectionScreen from "../../../src/screens/PopupCollectionScreen";
import { useAppScreenProps } from "../../../src/global/navigation/NavigationContext";

export default function PopupSectionRoute() {
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section?: string | string[] }>();
  const screenProps = useAppScreenProps();
  const sectionKey = Array.isArray(section) ? section[0] ?? "" : section ?? "";

  return (
    <PopupCollectionScreen
      activeTab={screenProps.activeTab}
      section={sectionKey}
      onBack={() => router.back()}
      onOpenPopup={(popupId) => router.push(`/popups/${popupId}`)}
      onTabPress={screenProps.onTabPress}
    />
  );
}
