import React from "react";
import ReviewScreen from "../src/screens/ReviewScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";

export default function ReviewRoute() {
  return <ReviewScreen {...useAppScreenProps()} />;
}
