import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "../../ui/AppText";

export default function MapRefreshButton() {
  return (
    <TouchableOpacity
      className="absolute top-[144px] right-6 z-10 w-12 h-12 bg-white rounded-full items-center justify-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="현재 지도 다시 검색"
    >
      <Text className="text-base">↻</Text>
    </TouchableOpacity>
  );
}
