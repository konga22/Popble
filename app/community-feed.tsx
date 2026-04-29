import React from "react";
import CommunityScreen from "../src/screens/CommunityScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function CommunityFeedRoute() {
  return <CommunityScreen {...useAppScreenProps()} />;
}
