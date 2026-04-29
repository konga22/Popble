import React from "react";
import TabScreenTransition from "../src/components/navigation/TabScreenTransition";
import MapScreen from "../src/screens/MapScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function MapRoute() {
  const screenProps = useAppScreenProps();

  return (
    <TabScreenTransition direction={screenProps.tabTransitionDirection}>
      <MapScreen {...screenProps} />
    </TabScreenTransition>
  );
}
