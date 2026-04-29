import React from "react";
import PartnerScreen from "../src/screens/PartnerScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function PartnerRoute() {
  return <PartnerScreen {...useAppScreenProps()} />;
}
