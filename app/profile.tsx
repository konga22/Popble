import React from "react";
import TabScreenTransition from "../src/components/navigation/TabScreenTransition";
import ProfileScreen from "../src/screens/ProfileScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function ProfileRoute() {
  const screenProps = useAppScreenProps();

  return (
    <TabScreenTransition direction={screenProps.tabTransitionDirection}>
      <ProfileScreen {...screenProps} />
    </TabScreenTransition>
  );
}
