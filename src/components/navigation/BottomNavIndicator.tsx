import React from "react";
import { View } from "react-native";

type BottomNavIndicatorProps = {
  visible: boolean;
};

export default function BottomNavIndicator({
  visible,
}: BottomNavIndicatorProps) {
  if (!visible) {
    return null;
  }

  return (
    <View
      className="absolute h-[52px] w-[88px] rounded-[26px] bg-[rgba(255,216,238,0.78)]"
      pointerEvents="none"
    />
  );
}
