import React from "react";
import TabScreenTransition from "../src/components/navigation/TabScreenTransition";
import CommunityMainScreen from "../src/screens/CommunityMainScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function CommunityRoute() {
  const screenProps = useAppScreenProps();

  return (
    <TabScreenTransition direction={screenProps.tabTransitionDirection}>
      <CommunityMainScreen {...screenProps} />
    </TabScreenTransition>
  );
}
