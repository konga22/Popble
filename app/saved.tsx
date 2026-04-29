import React from "react";
import TabScreenTransition from "../src/components/navigation/TabScreenTransition";
import SavedScreen from "../src/screens/SavedScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function SavedRoute() {
  const screenProps = useAppScreenProps();

  return (
    <TabScreenTransition direction={screenProps.tabTransitionDirection}>
      <SavedScreen {...screenProps} />
    </TabScreenTransition>
  );
}
