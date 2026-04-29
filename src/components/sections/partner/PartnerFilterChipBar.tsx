import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

const FILTER_CHIPS = ["전체", "이번 주", "성수동", "홍대", "혼자 못 가요", "사진 필수"];

type Props = {
  active: string;
  onSelect: (value: string) => void;
};

export default function PartnerFilterChipBar({ active, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
    >
      {FILTER_CHIPS.map((chip) => {
        const isActive = chip === active;

        return (
          <TouchableOpacity
            key={chip}
            onPress={() => onSelect(chip)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`${chip} 파트너 필터`}
            accessibilityState={{ selected: isActive }}
            className={`min-h-11 justify-center px-5 py-2.5 rounded-full ${
              isActive ? "bg-primary" : "bg-white"
            }`}
            style={
              isActive
                ? undefined
                : {
                    borderWidth: 1,
                    borderColor: `${COLORS.primary}26`,
                  }
            }
          >
            <Text className={`text-sm ${isActive ? "text-white font-semibold" : "text-muted"}`}>
              {chip}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
