import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/common/BottomNavBar";
import Text from "../components/ui/AppText";
import { COLORS } from "../constants/colors";
import {
  getHomeFeed,
  type HomeSectionKey,
  type PopupSummary,
  type TrendingKeyword,
} from "../features/home/homeData";
import { useHomeFeature } from "../features/home/HomeFeatureContext";
import type { AppScreenProps } from "../global/navigation/appRoutes";

type HomeScreenProps = AppScreenProps & {
  onOpenPopup: (popupId: string) => void;
  onOpenPopupSection: (section: HomeSectionKey) => void;
  onOpenSearch: (query?: string) => void;
  onOpenSubmission: () => void;
};

type HomeHeaderProps = {
  onOpenSearch: () => void;
};

type ActionStatProps = {
  title: string;
  value: string;
  caption: string;
  image: string;
  headline: string;
  meta: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type InfoDigestStripProps = {
  savedCount: number;
  comingSoonCount: number;
  closingSoonCount: number;
  savedPreview: PopupSummary;
  comingSoonPreview: PopupSummary;
  closingSoonPreview: PopupSummary;
  onOpenSection: (section: HomeSectionKey) => void;
};

type PopularSearchSectionProps = {
  keywords: TrendingKeyword[];
  onOpenSearch: (query?: string) => void;
};

type SavedEditorialBoardProps = {
  items: PopupSummary[];
  savedCount: number;
  isPopupSaved: (popupId: string) => boolean;
  onOpenPopup: (popupId: string) => void;
  onOpenSection: () => void;
  onToggleSaved: (popupId: string) => void;
};

type OpeningTimelineProps = {
  items: PopupSummary[];
  isPopupReminderEnabled: (popupId: string) => boolean;
  onOpenPopup: (popupId: string) => void;
  onOpenSection: () => void;
  onToggleReminder: (popupId: string) => void;
};

type ClosingDigestProps = {
  items: PopupSummary[];
  onOpenPopup: (popupId: string) => void;
  onOpenSection: () => void;
};

function HomeHeader({ onOpenSearch }: HomeHeaderProps) {
  return (
    <View className="absolute left-0 right-0 top-0 z-20">
      <SafeAreaView edges={["top"]}>
        <View className="px-5 pt-2">
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.86}
              onPress={onOpenSearch}
              accessibilityRole="button"
              accessibilityLabel="팝업 검색 열기"
              className="h-12 min-w-0 flex-1 flex-row items-center gap-2 rounded-[8px] border border-white/30 bg-white px-3"
            >
              <Ionicons name="search-outline" size={18} color={COLORS.heading} />
              <Text
                className="min-w-0 flex-1 text-[14px] font-semibold text-heading"
                numberOfLines={1}
              >
                팝업명, 지역, 브랜드 검색
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.heading} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ActionStat({
  title,
  value,
  caption,
  image,
  headline,
  meta,
  iconName,
  onPress,
}: ActionStatProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} ${value}, ${headline}, ${meta}`}
      className="w-[206px] rounded-[8px] border border-chip-border bg-white p-3"
    >
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: image }}
            className="h-12 w-12 rounded-[8px]"
            resizeMode="cover"
          />
          <View className="h-8 w-8 items-center justify-center rounded-[8px] border border-chip-border bg-white">
            <Ionicons name={iconName} size={16} color={COLORS.heading} />
          </View>
        </View>
        <Text className="text-[11px] font-semibold text-heading">
          {caption}
        </Text>
      </View>
      <View className="mt-3 gap-1">
        <Text className="text-[12px] font-semibold text-muted">{value}</Text>
        <Text
          className="text-[15px] font-semibold leading-5 text-heading"
          numberOfLines={2}
        >
          {headline}
        </Text>
        <Text className="text-[12px] leading-4 text-muted" numberOfLines={1}>
          {meta}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function InfoDigestStrip({
  savedCount,
  comingSoonCount,
  closingSoonCount,
  savedPreview,
  comingSoonPreview,
  closingSoonPreview,
  onOpenSection,
}: InfoDigestStripProps) {
  return (
    <View className="gap-4 px-5">
      <View className="gap-1">
        <Text className="text-[12px] font-semibold text-muted">
          홈 정보 요약
        </Text>
        <Text className="text-[22px] font-semibold leading-7 text-heading">
          저장, 오픈 예정, 마감 임박
        </Text>
        <Text className="text-[13px] leading-5 text-muted">
          지금 확인할 팝업 상태를 빠르게 정리했어요.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingRight: 20 }}
      >
        <ActionStat
          title="저장한 팝업"
          value={`저장 ${savedCount}개`}
          caption="저장"
          image={savedPreview.image}
          headline={savedPreview.title}
          meta={`${savedPreview.area} · ${savedPreview.periodLabel}`}
          iconName="bookmark-outline"
          onPress={() => onOpenSection("trending")}
        />
        <ActionStat
          title="오픈 예정"
          value={`오픈 예정 ${comingSoonCount}개`}
          caption="오픈 예정"
          image={comingSoonPreview.image}
          headline={comingSoonPreview.title}
          meta={`${comingSoonPreview.dday ?? "Soon"} · ${comingSoonPreview.area}`}
          iconName="notifications-outline"
          onPress={() => onOpenSection("comingSoon")}
        />
        <ActionStat
          title="마감 임박"
          value={`마감 임박 ${closingSoonCount}개`}
          caption="마감 임박"
          image={closingSoonPreview.image}
          headline={closingSoonPreview.title}
          meta={`${closingSoonPreview.closingBadge ?? "마감 임박"} · ${
            closingSoonPreview.area
          }`}
          iconName="flash-outline"
          onPress={() => onOpenSection("closingSoon")}
        />
      </ScrollView>
    </View>
  );
}

function PopularSearchSection({
  keywords,
  onOpenSearch,
}: PopularSearchSectionProps) {
  return (
    <View className="gap-4 px-5">
      <View className="flex-row items-end justify-between gap-4">
        <View className="min-w-0 flex-1">
          <Text className="text-[12px] font-semibold text-muted">
            검색 정보
          </Text>
          <Text className="mt-1 text-[27px] font-semibold leading-8 text-heading">
            많이 찾는 검색어
          </Text>
          <Text className="mt-1 text-[13px] leading-5 text-muted">
            지역, 브랜드, 팝업명을 바로 눌러 검색할 수 있어요.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onOpenSearch()}
          accessibilityRole="button"
          accessibilityLabel="검색 화면 열기"
          className="min-h-11 justify-center rounded-[8px] border border-chip-border bg-white px-3"
        >
          <Text className="text-[13px] font-semibold text-heading">검색</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-2">
        {keywords.map((keyword) => {
          const isTopRank = keyword.rank === 1;

          return (
            <TouchableOpacity
              key={keyword.id}
              activeOpacity={0.86}
              onPress={() => onOpenSearch(keyword.query)}
              accessibilityRole="button"
              accessibilityLabel={`${keyword.rank}위 ${keyword.label} 검색`}
              className="min-h-[64px] flex-row items-center gap-3 rounded-[8px] border border-chip-border bg-white px-3 py-2"
            >
              <View
                className={`h-10 w-10 items-center justify-center rounded-[8px] ${
                  isTopRank ? "bg-heading" : "border border-chip-border bg-white"
                }`}
              >
                <Text
                  className={`text-[14px] font-semibold ${
                    isTopRank ? "text-white" : "text-heading"
                  }`}
                >
                  {keyword.rank}
                </Text>
              </View>

              <View className="min-w-0 flex-1">
                <Text
                  className="text-[16px] font-semibold leading-6 text-heading"
                  numberOfLines={1}
                >
                  {keyword.label}
                </Text>
                <Text className="text-[12px] leading-4 text-muted" numberOfLines={1}>
                  {keyword.query} 관련 팝업 검색
                </Text>
              </View>

              <View className="h-10 w-10 items-center justify-center rounded-[8px] border border-chip-border bg-white">
                <Ionicons name="search-outline" size={18} color={COLORS.heading} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function SavedEditorialBoard({
  items,
  savedCount,
  isPopupSaved,
  onOpenPopup,
  onOpenSection,
  onToggleSaved,
}: SavedEditorialBoardProps) {
  const featured = items[0];
  const sideItems = items.slice(1, 3);
  const isSaved = isPopupSaved(featured.id);

  const handleSavePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleSaved(featured.id);
  };

  return (
    <View className="gap-4 px-5">
      <View className="flex-row items-end justify-between gap-4">
        <View className="min-w-0 flex-1">
          <Text className="text-[12px] font-semibold text-muted">
            저장 정보
          </Text>
          <Text className="mt-1 text-[24px] font-semibold leading-8 text-heading">
            저장한 팝업
          </Text>
          <Text className="mt-1 text-[13px] leading-5 text-muted">
            다시 확인할 팝업 {savedCount}개를 모아봤어요.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenSection}
          accessibilityRole="button"
          accessibilityLabel="저장한 팝업 전체보기"
          className="min-h-11 justify-center rounded-[8px] bg-heading px-3"
        >
          <Text className="text-[13px] font-semibold text-white">저장 목록</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.86}
        onPress={() => onOpenPopup(featured.id)}
        accessibilityRole="button"
        accessibilityLabel={`${featured.title}, ${featured.area}, ${featured.periodLabel}`}
        className="overflow-hidden rounded-[8px] bg-heading"
      >
        <Image
          source={{ uri: featured.image }}
          className="h-[168px] w-full"
          resizeMode="cover"
        />
        <View className="gap-3 p-3">
          <View className="flex-row items-center justify-between gap-3">
            <View className="rounded-[8px] bg-white/10 px-3 py-1.5">
              <Text className="text-[12px] font-semibold text-white">
                {featured.category}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSavePress}
              accessibilityRole="button"
              accessibilityLabel={isSaved ? "저장 해제" : "저장하기"}
              className="h-11 w-11 items-center justify-center rounded-[8px] bg-white"
            >
              <Ionicons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={18}
                color={COLORS.heading}
              />
            </TouchableOpacity>
          </View>

          <View className="gap-1.5">
            <Text className="text-[20px] font-semibold leading-7 text-white">
              {featured.title}
            </Text>
            <Text className="text-[13px] leading-5 text-white">
              {featured.description}
            </Text>
          </View>

          <View className="flex-row items-center justify-between border-t border-white/20 pt-3">
            <View>
              <Text className="text-[12px] font-semibold text-white">
                {featured.area} · {featured.venue}
              </Text>
              <Text className="mt-1 text-[13px] font-semibold text-white">
                {featured.periodLabel}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={19} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      <View className="flex-row gap-3">
        {sideItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.86}
            onPress={() => onOpenPopup(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.area}`}
            className="min-w-0 flex-1 gap-2 rounded-[8px] border border-chip-border bg-white p-2"
          >
            <Image
              source={{ uri: item.image }}
              className="h-[78px] w-full rounded-[8px]"
              resizeMode="cover"
            />
            <View className="gap-1 px-1 pb-1">
              <Text
                className="text-[14px] font-semibold leading-5 text-heading"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text className="text-[12px] leading-4 text-muted" numberOfLines={1}>
                {item.area} · {item.periodLabel}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function OpeningTimeline({
  items,
  isPopupReminderEnabled,
  onOpenPopup,
  onOpenSection,
  onToggleReminder,
}: OpeningTimelineProps) {
  return (
    <View className="gap-4 px-5">
      <View className="flex-row items-end justify-between gap-4">
        <View className="min-w-0 flex-1">
          <Text className="text-[12px] font-semibold text-muted">
            오픈 일정
          </Text>
          <Text className="mt-1 text-[27px] font-semibold leading-8 text-heading">
            오픈 예정
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenSection}
          accessibilityRole="button"
          accessibilityLabel="오픈 예정 전체보기"
          className="min-h-11 justify-center rounded-[8px] border border-chip-border bg-white px-3"
        >
          <Text className="text-[13px] font-semibold text-heading">오픈 전체</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-0 overflow-hidden rounded-[8px] border border-chip-border bg-white">
        {items.map((item, index) => {
          const reminderEnabled = isPopupReminderEnabled(item.id);
          const handleReminderPress = (event: GestureResponderEvent) => {
            event.stopPropagation();
            onToggleReminder(item.id);
          };

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.86}
              onPress={() => onOpenPopup(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}, ${item.dday}, ${item.area}`}
              className={`flex-row gap-3 px-4 py-4 ${
                index === items.length - 1 ? "" : "border-b border-chip-border"
              }`}
            >
              <View className="items-center">
                <View className="h-11 w-11 items-center justify-center rounded-[8px] bg-heading">
                  <Text className="text-[12px] font-semibold text-white">
                    {item.dday ?? "Soon"}
                  </Text>
                </View>
                {index === items.length - 1 ? null : (
                  <View className="mt-2 h-10 w-px bg-chip-border" />
                )}
              </View>

              <Image
                source={{ uri: item.image }}
                className="h-[76px] w-[76px] rounded-[8px]"
                resizeMode="cover"
              />

              <View className="min-w-0 flex-1 justify-between">
                <View>
                  <Text
                    className="text-[16px] font-semibold leading-6 text-heading"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-[12px] leading-4 text-muted">
                    {item.area} · {item.periodLabel}
                  </Text>
                </View>
                <Text className="text-[12px] font-semibold text-heading">
                  {item.hours}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleReminderPress}
                accessibilityRole="button"
                accessibilityLabel={
                  reminderEnabled ? "오픈 알림 해제" : "오픈 알림 받기"
                }
                className="h-11 w-11 items-center justify-center rounded-[8px] border border-chip-border bg-white"
              >
                <Ionicons
                  name={reminderEnabled ? "notifications" : "notifications-outline"}
                  size={18}
                  color={COLORS.heading}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function ClosingDigest({ items, onOpenPopup, onOpenSection }: ClosingDigestProps) {
  return (
    <View className="gap-4 px-5">
      <View className="flex-row items-end justify-between gap-4">
        <View className="min-w-0 flex-1">
          <Text className="text-[12px] font-semibold text-urgent">
            마감 정보
          </Text>
          <Text className="mt-1 text-[27px] font-semibold leading-8 text-heading">
            종료 임박
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenSection}
          accessibilityRole="button"
          accessibilityLabel="종료 임박 전체보기"
          className="min-h-11 justify-center rounded-[8px] bg-urgent px-3"
        >
          <Text className="text-[13px] font-semibold text-white">마감 전체</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-3">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.86}
            onPress={() => onOpenPopup(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.closingBadge}, ${item.area}`}
            className="min-w-0 flex-1 overflow-hidden rounded-[8px] bg-white"
          >
            <ImageBackground
              source={{ uri: item.image }}
              className="h-[178px] justify-between p-3"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black/30" />
              <View className="self-start rounded-[8px] bg-white px-2.5 py-1.5">
                <Text className="text-[11px] font-semibold text-urgent">
                  {item.closingBadge ?? item.periodLabel}
                </Text>
              </View>
              <View className="gap-1">
                <Text
                  className="text-[16px] font-semibold leading-5 text-white"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text className="text-[12px] leading-4 text-white">
                  {item.area}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen({
  activeTab,
  onNavigate,
  onTabPress,
  onOpenPopup,
  onOpenPopupSection,
  onOpenSearch,
  onOpenSubmission,
}: HomeScreenProps) {
  const feed = getHomeFeed();
  const heroPopup = feed.trendingPopups[0];
  const {
    isPopupReminderEnabled,
    isPopupSaved,
    togglePopupReminder,
    toggleSavedPopup,
  } = useHomeFeature();

  const allHomePopups = [
    ...feed.trendingPopups,
    ...feed.comingSoonPopups,
    ...feed.closingSoonPopups,
  ];
  const savedPopups = allHomePopups.filter((popup) => isPopupSaved(popup.id));
  const savedPreview = savedPopups[0] ?? feed.trendingPopups[0];
  const savedBoardItems =
    savedPopups.length > 0 ? savedPopups : feed.trendingPopups;
  const comingSoonPreview = feed.comingSoonPopups[0];
  const closingSoonPreview = feed.closingSoonPopups[0];
  const savedCount = savedPopups.length;

  const comingSoonCount = feed.comingSoonPopups.length;
  const closingSoonCount = feed.closingSoonPopups.length;

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 132 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: heroPopup.image }}
          className="min-h-[500px] justify-between"
          resizeMode="cover"
        >
          <View className="absolute inset-0 bg-black/40" />
          <HomeHeader onOpenSearch={() => onOpenSearch()} />

          <SafeAreaView edges={["top"]} className="flex-1">
            <View className="flex-1 justify-end px-5 pb-6 pt-28">
              <View className="max-w-[336px] gap-3">
                <View className="flex-row items-center gap-2">
                  <View className="h-2 w-2 rounded-[8px] bg-white" />
                  <Text className="text-[13px] font-semibold text-white">
                    오늘의 팝업
                  </Text>
                </View>
                <Text className="text-[38px] font-semibold leading-[42px] text-white">
                  오늘 운영 중인{"\n"}팝업 한눈에 보기
                </Text>
                <Text className="text-[15px] leading-6 text-white">
                  지역, 일정, 저장, 마감 정보를 기준으로 필요한 곳만
                  확인하세요.
                </Text>
              </View>

              <View className="mt-6 gap-3">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => onNavigate("map")}
                  accessibilityRole="button"
                  accessibilityLabel="지도에서 팝업 보기"
                  className="min-h-12 flex-row items-center justify-center gap-2 rounded-[8px] bg-white px-4"
                >
                  <Ionicons name="map-outline" size={18} color={COLORS.heading} />
                  <Text className="text-[15px] font-semibold text-heading">
                    내 주변 지도 보기
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </SafeAreaView>
        </ImageBackground>

        <View className="gap-11 bg-white py-10">
          <SavedEditorialBoard
            items={savedBoardItems}
            savedCount={savedCount}
            isPopupSaved={isPopupSaved}
            onOpenPopup={onOpenPopup}
            onOpenSection={() => onOpenPopupSection("trending")}
            onToggleSaved={toggleSavedPopup}
          />

          <PopularSearchSection
            keywords={feed.trendingKeywords}
            onOpenSearch={onOpenSearch}
          />

          <InfoDigestStrip
            savedCount={savedCount}
            comingSoonCount={comingSoonCount}
            closingSoonCount={closingSoonCount}
            savedPreview={savedPreview}
            comingSoonPreview={comingSoonPreview}
            closingSoonPreview={closingSoonPreview}
            onOpenSection={onOpenPopupSection}
          />

          <OpeningTimeline
            items={feed.comingSoonPopups}
            isPopupReminderEnabled={isPopupReminderEnabled}
            onOpenPopup={onOpenPopup}
            onOpenSection={() => onOpenPopupSection("comingSoon")}
            onToggleReminder={togglePopupReminder}
          />

          <ClosingDigest
            items={feed.closingSoonPopups}
            onOpenPopup={onOpenPopup}
            onOpenSection={() => onOpenPopupSection("closingSoon")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenSubmission}
        accessibilityRole="button"
        accessibilityLabel="새 팝업 제보 작성"
        className="absolute bottom-24 right-5 z-20 min-h-12 flex-row items-center gap-2 rounded-[8px] bg-heading px-4"
      >
        <Ionicons name="add" size={18} color="white" />
        <Text className="text-[14px] font-semibold text-white">제보</Text>
      </TouchableOpacity>

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
