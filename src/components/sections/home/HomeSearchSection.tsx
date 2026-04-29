import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";
import type {
  TrendingKeyword,
  TrendingKeywordTone,
} from "../../../features/home/homeData";

const CHIP_TONE_CLASS: Record<
  TrendingKeywordTone,
  { bg: string; text: string }
> = {
  pink: { bg: "bg-chip-pink", text: "text-chip-pink-text" },
  sky: { bg: "bg-chip-sky", text: "text-chip-sky-text" },
  neutral: { bg: "bg-chip-neutral", text: "text-muted" },
};

type HomeSearchSectionProps = {
  keywords: TrendingKeyword[];
  onOpenSearch: (query?: string) => void;
};

export default function HomeSearchSection({
  keywords,
  onOpenSearch,
}: HomeSearchSectionProps) {
  return (
    <View className="gap-3.5">
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onOpenSearch()}
        accessibilityRole="button"
        accessibilityLabel="팝업 검색 열기"
        className="flex-row items-center rounded-full border border-chip-border bg-white px-5 py-4"
        style={{
          shadowColor: "rgba(15,23,42,0.04)",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 18,
          elevation: 2,
        }}
      >
        <Ionicons
          name="search-outline"
          size={18}
          color={COLORS.searchIcon}
          style={{ marginRight: 12 }}
        />
        <Text className="flex-1 text-[15px] leading-5 text-search-placeholder">
          지금 가장 핫한 팝업은?
        </Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 16 }}
      >
        <View className="flex-row items-center gap-2">
          <Text className="mr-1 text-[12px] font-semibold uppercase tracking-[1.4px] text-primary">
            Trending
          </Text>
          {keywords.map((keyword) => {
            const toneClass = CHIP_TONE_CLASS[keyword.tone];

            return (
              <TouchableOpacity
                key={keyword.id}
                className={`${toneClass.bg} min-h-11 justify-center rounded-full border border-chip-border px-4 py-2`}
                activeOpacity={0.85}
                onPress={() => onOpenSearch(keyword.query)}
                accessibilityRole="button"
                accessibilityLabel={`${keyword.rank}위 ${keyword.label} 검색어 보기`}
              >
                <Text className={`${toneClass.text} text-[13px] leading-4`}>
                  {keyword.rank} {keyword.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
