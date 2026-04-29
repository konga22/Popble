import React from "react";
import { View } from "react-native";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

const STAR_STEPS = [1, 2, 3, 4, 5] as const;

type StarsProps = {
  rating: number;
  size?: number;
};

function Stars({ rating, size = 14 }: StarsProps) {
  return (
    <View className="flex-row gap-0.5">
      {STAR_STEPS.map((step) => (
        <Text
          key={`star-${step}`}
          style={{ fontSize: size, color: COLORS.primary }}
        >
          {step <= Math.floor(rating) ? "★" : step - 0.5 <= rating ? "½" : "☆"}
        </Text>
      ))}
    </View>
  );
}

export default function ReviewRatingOverviewSection() {
  const filterTags = [
    "# 분위기 최고",
    "# 빠른 입장",
    "# 사진 맛집",
    "# 친절한 직원",
  ];

  return (
    <View
      className="bg-white rounded-[32px] p-8 items-center gap-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View className="items-center gap-2">
        <Text
          className="text-primary font-extrabold"
          style={{ fontSize: 60, lineHeight: 64 }}
        >
          4.8
        </Text>
        <Stars rating={4.8} size={20} />
        <Text className="text-muted text-sm font-semibold">
          1,248개의 생생한 리뷰
        </Text>
      </View>

      <View className="gap-2">
        <View className="flex-row gap-2 justify-center">
          <View className="bg-primary-light rounded-full px-4 py-2">
            <Text className="text-primary-dark text-xs">{filterTags[0]}</Text>
          </View>
          <View className="bg-lavender rounded-full px-4 py-2">
            <Text className="text-lavender-dark text-xs">{filterTags[1]}</Text>
          </View>
        </View>
        <View className="flex-row gap-2 justify-center">
          <View className="bg-muted-subtle rounded-full px-4 py-2">
            <Text className="text-muted text-xs">{filterTags[2]}</Text>
          </View>
          <View className="bg-muted-subtle rounded-full px-4 py-2">
            <Text className="text-muted text-xs">{filterTags[3]}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
