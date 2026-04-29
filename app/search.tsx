import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import HomeSearchScreen from "../src/screens/HomeSearchScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function SearchRoute() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string | string[] }>();
  const screenProps = useAppScreenProps();
  const initialQuery = Array.isArray(q) ? q[0] ?? "" : q ?? "";

  return (
    <HomeSearchScreen
      activeTab={screenProps.activeTab}
      initialQuery={initialQuery}
      onBack={() => router.back()}
      onOpenPopup={(popupId) => router.push(`/popups/${popupId}`)}
      onTabPress={screenProps.onTabPress}
    />
  );
}
