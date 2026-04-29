import React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import TopAppBar from "../components/common/TopAppBar";
import BottomNavBar from "../components/common/BottomNavBar";
import FAB from "../components/common/FAB";
import ReviewArchiveHeaderSection from "../components/sections/review/ReviewArchiveHeaderSection";
import ReviewRatingOverviewSection from "../components/sections/review/ReviewRatingOverviewSection";
import ReviewPostCard, {
  type ReviewPostCardProps,
} from "../components/cards/review/ReviewPostCard";
import { COLORS } from "../constants/colors";
import { MOCK_IMAGES } from "../constants/mockImages";
import type { AppScreenProps } from "../global/navigation/appRoutes";

const IMG_PROFILE1 = MOCK_IMAGES.reviewProfileA;
const IMG_REVIEW_MAIN = MOCK_IMAGES.reviewMain;
const IMG_PROFILE2 = MOCK_IMAGES.reviewProfileB;
const IMG_REVIEW1 = MOCK_IMAGES.reviewDessert;
const IMG_REVIEW2 = MOCK_IMAGES.reviewSpace;

const REVIEW_ITEMS: ReviewPostCardProps[] = [
  {
    avatar: IMG_PROFILE1,
    avatarBg: COLORS.accentPink,
    username: "@blooming_day",
    date: "2023.11.24",
    rating: 5,
    liked: true,
    featured: true,
    mainImage: IMG_REVIEW_MAIN,
    body:
      "입구부터 퍼지는 은은한 라벤더 향기가 너무 좋았어요! 사진 찍을 수 있는 스팟도 정말 많고 직원분들도 너무 친절하셔서 기분 좋게 즐기다 왔습니다. 꼭 한 번 방문해보세요. ✨",
    likes: 124,
    comments: 12,
  },
  {
    avatar: IMG_PROFILE2,
    avatarBg: COLORS.lavender,
    username: "@lavender_dreamer",
    date: "2023.11.22",
    rating: 4.5,
    dualImages: [IMG_REVIEW1, IMG_REVIEW2],
    body:
      "디저트가 생각보다 너무 맛있어서 놀랐어요! 특히 라벤더 마카롱은 향이 진하지 않고 은은해서 딱 제 스타일이었네요. 다음에도 꼭 다시 오고 싶어요!",
    likes: 89,
    comments: 5,
  },
];

export default function ReviewScreen({
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
        variant="title"
        title="리뷰 & 별점"
        rightIcon="star-outline"
        rightAccessibilityLabel="리뷰 평점 보기"
        onLeftPress={onOpenMenu}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 120, gap: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 gap-10">
          <ReviewArchiveHeaderSection />
          <ReviewRatingOverviewSection />

          <View className="gap-16">
            {REVIEW_ITEMS.map((item) => (
              <ReviewPostCard key={item.username} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>

      <FAB icon="✍️" bottom={96} accessibilityLabel="리뷰 작성" />
      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
