import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Text from "../../ui/AppText";

const FILTER_CHIPS = ["성수동", "홍대", "부산 해운대", "강남역"];

type Props = {
  active: string;
  onSelect: (value: string) => void;
};

export default function MapFilterChips({ active, onSelect }: Props) {
  return (
    <View className="absolute top-[80px] left-0 right-0 z-10">
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
              accessibilityLabel={`${chip} 지도 필터`}
              accessibilityState={{ selected: isActive }}
              className={`min-h-11 justify-center px-6 py-2.5 rounded-full ${
                isActive ? "bg-primary" : "bg-white/80"
              }`}
            >
              <Text className={`text-sm ${isActive ? "text-white" : "text-muted"}`}>
                {chip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
