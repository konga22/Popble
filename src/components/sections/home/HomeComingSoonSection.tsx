import React from "react";
import { View } from "react-native";
import SectionHeader from "../../ui/SectionHeader";
import HorizontalCardList from "../../ui/HorizontalCardList";
import ComingSoonCard from "../../cards/home/ComingSoonCard";

const IMG_COMING1 =
  "https://www.figma.com/api/mcp/asset/9dcf8936-36da-4e48-8dbf-97edc5c06fc1";
const IMG_COMING2 =
  "https://www.figma.com/api/mcp/asset/4106b3e6-a4aa-40b3-932a-bd96a4438ab0";
const IMG_COMING3 =
  "https://www.figma.com/api/mcp/asset/9dcf8936-36da-4e48-8dbf-97edc5c06fc1";

const COMING_SOON_ITEMS = [
  { image: IMG_COMING1, dday: "D-3", title: "러브썸 마켓 vol.2" },
  { image: IMG_COMING2, dday: "D-7", title: "사운드 스튜디오 전시" },
  { image: IMG_COMING3, dday: "D-10", title: "도심 속 피크닉 팝업" },
];

export default function HomeComingSoonSection() {
  return (
    <View className="gap-4">
      <SectionHeader title="곧 오픈할 팝업" actionLabel="D-Day 알림" />
      <HorizontalCardList
        data={COMING_SOON_ITEMS}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <ComingSoonCard {...item} />}
      />
    </View>
  );
}
