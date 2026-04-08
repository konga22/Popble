import React from "react";
import { View } from "react-native";
import SectionHeader from "../../ui/SectionHeader";
import HorizontalCardList from "../../ui/HorizontalCardList";
import TrendingPopupCard from "../../cards/home/TrendingPopupCard";

const IMG_CARD1 =
  "https://www.figma.com/api/mcp/asset/f848b951-20b3-489e-8af8-f4c035108ce3";
const IMG_CARD2 =
  "https://www.figma.com/api/mcp/asset/53296507-c1f7-4e7f-ab83-1b1e1089f5dd";
const IMG_CARD3 =
  "https://www.figma.com/api/mcp/asset/f848b951-20b3-489e-8af8-f4c035108ce3";

const TRENDING_CARDS = [
  {
    image: IMG_CARD1,
    category: "Fashion · Seongsu",
    title: "스튜디오 무드: 여름 정원",
    until: "~ 08.24 까지",
    hot: true,
  },
  {
    image: IMG_CARD2,
    category: "Cafe · Hannam",
    title: "토요일 한정 디저트 랩 팝업",
    until: "~ 09.02 까지",
  },
  {
    image: IMG_CARD3,
    category: "Beauty · Seongsu",
    title: "글로우 뷰티 바 캡슐 스토어",
    until: "~ 09.08 까지",
  },
];

export default function HomeTrendingSection() {
  return (
    <View className="gap-4">
      <SectionHeader title="현재 인기 있는 팝업" actionLabel="전체보기" />
      <HorizontalCardList
        data={TRENDING_CARDS}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <TrendingPopupCard {...item} />}
      />
    </View>
  );
}
