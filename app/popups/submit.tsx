import React from "react";
import { useRouter } from "expo-router";
import PopupSubmissionScreen from "../../src/screens/PopupSubmissionScreen";
import { useAppScreenProps } from "../../src/global/navigation/NavigationContext";

export default function PopupSubmitRoute() {
  const router = useRouter();
  const screenProps = useAppScreenProps();

  return (
    <PopupSubmissionScreen
      activeTab={screenProps.activeTab}
      onBack={() => router.back()}
      onTabPress={screenProps.onTabPress}
    />
  );
}
