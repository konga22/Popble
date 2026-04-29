import React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import TopAppBar from "../components/common/TopAppBar";
import BottomNavBar from "../components/common/BottomNavBar";
import FAB from "../components/common/FAB";
import CommunityMainHeroSection from "../components/sections/community/CommunityMainHeroSection";
import CommunityTrendingFeedSection from "../components/sections/community/CommunityTrendingFeedSection";
import type { TrendingPostCardProps } from "../components/cards/community/TrendingPostCard";
import { COLORS } from "../constants/colors";
import { MOCK_IMAGES } from "../constants/mockImages";
import type { AppScreenProps } from "../global/navigation/appRoutes";

const trendingItems: TrendingPostCardProps[] = [
  {
    rank: 1,
    image: MOCK_IMAGES.trendingPostA,
    category: "방문 후기",
    categoryColor: COLORS.primary,
    title: "성수 디올 팝업 웨이팅 꿀팁 총정리 🌸",
    body:
      "오전 10시 전에 도착하면 대기 없이 바로 입장 가능해요! 2층 포토존이 진짜 사진 맛집입니다. 직원분들도 너무 친절하셔서 기분 좋게 즐겼어요.",
    likes: 324,
    comments: 47,
    timestamp: "2시간 전 • 익명",
  },
  {
    rank: 2,
    image: MOCK_IMAGES.trendingPostB,
    category: "정보공유",
    categoryColor: COLORS.accentPlum,
    title: "이번 주 팝업 일정 총정리 (11/25~11/30)",
    body:
      "이번 주에 열리는 팝업들 한눈에 정리해봤어요. 오브제 마켓, 더현대 한정 컬래버, 청담 뷰티 팝업까지!",
    likes: 218,
    comments: 33,
    timestamp: "4시간 전 • 익명",
    indent: true,
  },
  {
    rank: 3,
    image: MOCK_IMAGES.trendingPostC,
    category: "파트너 모집",
    categoryColor: COLORS.urgent,
    title: "라벤더 팝업 같이 가실 분 구해요 💜",
    body:
      "이번 주 일요일 오후 2시에 라벤더 팝업 갈 예정인데 동행 구해요. 사진 좋아하시는 분 환영합니다!",
    likes: 156,
    comments: 28,
    timestamp: "6시간 전 • 익명",
  },
];

export default function CommunityMainScreen({
  activeTab,
  onOpenMenu,
  onTabPress,
}: AppScreenProps) {
  return (
    <View className="flex-1 bg-surface">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TopAppBar
        onLeftPress={onOpenMenu}
        rightAccessibilityLabel="커뮤니티 알림 보기"
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 120, gap: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 gap-10">
          <CommunityMainHeroSection />
          <CommunityTrendingFeedSection items={trendingItems} />
        </View>
      </ScrollView>

      <FAB icon="✍️" bottom={96} accessibilityLabel="커뮤니티 글 작성" />
      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
