import React from "react";
import { View } from "react-native";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

type Props = {
  label: string;
  top: number;
  left: number;
  selected?: boolean;
};

export default function MapPin({ label, top, left, selected }: Props) {
  return (
    <View className="absolute items-center" style={{ top, left }}>
      <View
        className="w-9 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: selected ? COLORS.primary : `${COLORS.primary}b3` }}
      >
        <Text className="text-white text-base">📍</Text>
      </View>
      <View
        className="bg-white border rounded-full px-3 py-1 mt-1 shadow-sm"
        style={{ borderColor: `${COLORS.accentPink}4d` }}
      >
        <Text className="text-primary text-xs">{label}</Text>
      </View>
    </View>
  );
}
