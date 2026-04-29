import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/common/BottomNavBar";
import PopupListItem from "../components/cards/home/PopupListItem";
import Text from "../components/ui/AppText";
import { COLORS } from "../constants/colors";
import {
  getHomeFeed,
  searchHomePopups,
  type PopupSummary,
} from "../features/home/homeData";
import { useHomeFeature } from "../features/home/HomeFeatureContext";
import type { TabName } from "../global/navigation/tabConfig";

type HomeSearchScreenProps = {
  activeTab: TabName;
  initialQuery?: string;
  onBack: () => void;
  onOpenPopup: (popupId: string) => void;
  onTabPress: (tab: TabName) => void;
};

type SearchTopBarProps = {
  detailOpen: boolean;
  query: string;
  onBack: () => void;
  onChangeQuery: (value: string) => void;
  onClearQuery: () => void;
  onSubmitQuery: () => void;
  onToggleDetail: () => void;
};

type DetailFilter = {
  id: string;
  label: string;
  query: string;
  iconName: keyof typeof Ionicons.glyphMap;
};

type SearchRankingItem = {
  id: string;
  rank: number;
  label: string;
  meta: string;
  query: string;
};

type DetailSearchPanelProps = {
  onSelect: (query: string) => void;
};

type RecentSearchSectionProps = {
  onSelect: (query: string) => void;
  recentSearches: RecentSearchItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

type SearchPromoBannerProps = {
  popup: PopupSummary;
  onOpenPopup: (popupId: string) => void;
};

type SearchRankingSectionProps = {
  onSelect: (query: string) => void;
};

type ExploreShortcut = {
  id: string;
  label: string;
  query: string;
  note: string;
};

type SearchResultHeaderProps = {
  hasQuery: boolean;
  query: string;
  resultCount: number;
};

const DETAIL_FILTERS: DetailFilter[] = [
  {
    id: "open-now",
    label: "운영 중",
    query: "성수",
    iconName: "time-outline",
  },
  {
    id: "coming-soon",
    label: "오픈 예정",
    query: "오픈",
    iconName: "notifications-outline",
  },
  {
    id: "closing-soon",
    label: "종료 임박",
    query: "종료",
    iconName: "flash-outline",
  },
  {
    id: "reservation",
    label: "예약 추천",
    query: "예약",
    iconName: "calendar-outline",
  },
  {
    id: "photo",
    label: "포토존",
    query: "포토존",
    iconName: "camera-outline",
  },
];

type RecentSearchItem = {
  id: string;
  label: string;
  query: string;
};

const RECENT_SEARCHES: RecentSearchItem[] = [
  { id: "recent-seongsu", label: "성수 팝업", query: "성수" },
  { id: "recent-sanrio", label: "산리오 마켓", query: "마켓" },
  { id: "recent-dessert", label: "디저트", query: "디저트" },
  { id: "recent-beauty", label: "뷰티 샘플", query: "뷰티" },
];

const SEARCH_RANKINGS: SearchRankingItem[] = [
  {
    id: "rank-seongsu-dior",
    rank: 1,
    label: "성수 디올",
    meta: "성수동 패션 팝업",
    query: "성수",
  },
  {
    id: "rank-sanrio",
    rank: 2,
    label: "산리오 마켓",
    meta: "굿즈 마켓 정보",
    query: "마켓",
  },
  {
    id: "rank-dessert",
    rank: 3,
    label: "한남 디저트",
    meta: "예약제 디저트 팝업",
    query: "디저트",
  },
  {
    id: "rank-ending",
    rank: 4,
    label: "오늘 종료",
    meta: "마감 임박 팝업",
    query: "종료",
  },
  {
    id: "rank-weekend",
    rank: 5,
    label: "주말 예약",
    meta: "주말 방문 예약 키워드",
    query: "예약",
  },
];

const EXPLORE_SHORTCUTS: ExploreShortcut[] = [
  {
    id: "explore-seongsu",
    label: "성수",
    query: "성수",
    note: "운영 중 팝업",
  },
  {
    id: "explore-hannam",
    label: "한남",
    query: "한남",
    note: "디저트 / 패션",
  },
  {
    id: "explore-reservation",
    label: "예약제",
    query: "예약",
    note: "인기 테마",
  },
  {
    id: "explore-closing",
    label: "종료 임박",
    query: "종료",
    note: "오늘 마감",
  },
];

const SEARCH_ENTRY_STAGGER_MS = 8;
const SEARCH_TOP_BAR_ENTRY_DURATION_MS = 95;
const SEARCH_CONTENT_ENTRY_DURATION_MS = 110;
const SEARCH_RANKING_SLIDE_DURATION_MS = 170;

function SearchTopBar({
  detailOpen,
  query,
  onBack,
  onChangeQuery,
  onClearQuery,
  onSubmitQuery,
  onToggleDetail,
}: SearchTopBarProps) {
  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="gap-3 px-4 pb-4 pt-2">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="검색 닫기"
            className="h-12 w-11 items-center justify-center rounded-[8px] border border-chip-border bg-white"
          >
            <Ionicons name="chevron-back" size={21} color={COLORS.heading} />
          </TouchableOpacity>

          <View className="h-12 min-w-0 flex-1 flex-row items-center rounded-[8px] border border-chip-border bg-white px-3">
            <Ionicons
              name="search-outline"
              size={18}
              color={COLORS.searchIcon}
            />
            <TextInput
              value={query}
              onChangeText={onChangeQuery}
              autoFocus
              placeholder="팝업명, 지역, 브랜드 검색"
              placeholderTextColor={COLORS.searchPlaceholder}
              className="ml-2 min-h-12 flex-1 text-[15px] text-heading"
              returnKeyType="search"
              onSubmitEditing={onSubmitQuery}
            />
            {query.trim().length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onClearQuery}
                accessibilityRole="button"
                accessibilityLabel="검색어 지우기"
                className="h-10 w-10 items-center justify-center rounded-[8px]"
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={COLORS.iconMuted}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onToggleDetail}
            accessibilityRole="button"
            accessibilityLabel="상세 검색 열기"
            accessibilityState={{ expanded: detailOpen }}
            className={`h-12 w-12 items-center justify-center rounded-[8px] ${
              detailOpen
                ? "border border-heading bg-white"
                : "border border-chip-border bg-white"
            }`}
          >
            <Ionicons
              name="options-outline"
              size={19}
              color={COLORS.heading}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function DetailSearchPanel({ onSelect }: DetailSearchPanelProps) {
  return (
    <View className="gap-3 rounded-[8px] border border-chip-border bg-surface p-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[12px] font-semibold text-primary">
            상세 검색
          </Text>
          <Text className="mt-1 text-[18px] font-semibold text-heading">
            조건으로 빠르게 좁히기
          </Text>
        </View>
        <Ionicons name="options-outline" size={20} color={COLORS.primary} />
      </View>

      <View className="flex-row flex-wrap gap-2">
        {DETAIL_FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            activeOpacity={0.85}
            onPress={() => onSelect(filter.query)}
            accessibilityRole="button"
            accessibilityLabel={`${filter.label} 조건 검색`}
            className="min-h-11 flex-row items-center gap-2 rounded-[8px] bg-surface-secondary px-3"
          >
            <Ionicons
              name={filter.iconName}
              size={15}
              color={COLORS.primary}
            />
            <Text className="text-[13px] font-semibold text-heading">
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function RecentSearchSection({
  onSelect,
  recentSearches,
  onRemove,
  onClearAll,
}: RecentSearchSectionProps) {
  const displaySearches = recentSearches;

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[12px] font-semibold text-primary">
            최근 검색어
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          {displaySearches.length > 0 ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClearAll}
              accessibilityRole="button"
              accessibilityLabel="최근 검색어 전체 삭제"
              className="rounded-full bg-surface-secondary px-3 py-1"
            >
              <Text className="text-[12px] font-semibold text-heading">
                전체 삭제
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 20 }}
      >
        {displaySearches.slice(0, 8).map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onSelect(item.query)}
            accessibilityRole="button"
            accessibilityLabel={`${item.label} 검색`}
            className="min-h-10 flex-row items-center gap-2 rounded-full border border-chip-border bg-surface pl-3 pr-1.5"
          >
            <Ionicons name="time-outline" size={15} color={COLORS.iconMuted} />
            <Text className="max-w-[126px] text-[13px] font-semibold text-heading">
              {item.label}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={(event) => {
                event.stopPropagation();
                onRemove(item.id);
              }}
              accessibilityRole="button"
              accessibilityLabel={`${item.label} 검색어 삭제`}
              className="h-8 w-8 items-center justify-center rounded-full bg-surface-secondary"
            >
              <Ionicons name="close" size={14} color={COLORS.iconMuted} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function SearchPromoBanner({ popup, onOpenPopup }: SearchPromoBannerProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => onOpenPopup(popup.id)}
      accessibilityRole="button"
      accessibilityLabel={`${popup.title} 추천 정보 열기`}
      className="overflow-hidden rounded-[8px]"
    >
      <ImageBackground
        source={{ uri: popup.image }}
        className="min-h-[142px] justify-between p-4"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/40" />
        <View className="self-start rounded-[8px] bg-white px-2.5 py-1.5">
          <Text className="text-[11px] font-semibold text-heading">
            추천 정보
          </Text>
        </View>

        <View className="gap-2">
          <Text className="text-[22px] font-semibold leading-7 text-white">
            이번 주 확인할 팝업
          </Text>
          <Text className="text-[13px] font-semibold text-white/82">
            {popup.title} · {popup.periodLabel}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function SearchRankingSection({ onSelect }: SearchRankingSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (SEARCH_RANKINGS.length < 2) {
      return undefined;
    }

    const scheduleNext = () => {
      timerRef.current = setTimeout(() => {
        if (animatingRef.current) {
          scheduleNext();
          return;
        }

        animatingRef.current = true;
        const nextIndex =
          (activeIndexRef.current + 1) % SEARCH_RANKINGS.length;

        slide.setValue(0);
        Animated.timing(slide, {
          toValue: 1,
          duration: SEARCH_RANKING_SLIDE_DURATION_MS,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start(({ finished }) => {
          animatingRef.current = false;
          if (!finished) {
            return;
          }

          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
          slide.setValue(0);
          scheduleNext();
        });
      }, 2600);
    };

    scheduleNext();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      slide.stopAnimation();
      slide.setValue(0);
      animatingRef.current = false;
    };
  }, [slide]);

  const currentItem = SEARCH_RANKINGS[activeIndex];
  const nextItem = SEARCH_RANKINGS[(activeIndex + 1) % SEARCH_RANKINGS.length];
  const tickerLayerStyle = {
    bottom: 0,
    left: 0,
    position: "absolute" as const,
    right: 0,
    top: 0,
  };
  const currentCardStyle = {
    opacity: slide.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        translateY: slide.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -14],
        }),
      },
    ],
  };
  const nextCardStyle = {
    opacity: slide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: slide.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        }),
      },
    ],
  };

  return (
    <View className="gap-2">
      <Text className="text-[12px] font-semibold text-primary">
        실시간 인기 검색어
      </Text>
      <View className="relative h-11 overflow-hidden rounded-full border border-chip-border bg-surface">
        <Animated.View
          pointerEvents="auto"
          style={[tickerLayerStyle, currentCardStyle]}
        >
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={() => onSelect(currentItem.query)}
            accessibilityRole="button"
            accessibilityLabel={`${currentItem.rank}위 ${currentItem.label} 검색`}
            className="h-11 flex-row items-center gap-2 rounded-full px-3"
          >
            <View className="h-7 min-w-7 items-center justify-center rounded-full bg-heading px-2">
              <Text className="text-[12px] font-semibold text-white">
                {currentItem.rank}
              </Text>
            </View>
            <Text className="min-w-0 flex-1 text-[13px] font-semibold text-heading" numberOfLines={1}>
              {currentItem.label}
            </Text>
            <Text className="text-[11px] font-semibold text-muted" numberOfLines={1}>
              {currentItem.meta}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[tickerLayerStyle, nextCardStyle]}
        >
          <View className="h-11 flex-row items-center gap-2 rounded-full bg-surface px-3">
            <View className="h-7 min-w-7 items-center justify-center rounded-full bg-heading px-2">
              <Text className="text-[12px] font-semibold text-white">
                {nextItem.rank}
              </Text>
            </View>
            <Text className="min-w-0 flex-1 text-[13px] font-semibold text-heading" numberOfLines={1}>
              {nextItem.label}
            </Text>
            <Text className="text-[11px] font-semibold text-muted" numberOfLines={1}>
              {nextItem.meta}
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

function SearchResultHeader({
  hasQuery,
  query,
  resultCount,
}: SearchResultHeaderProps) {
  return (
    <View className="gap-1">
      <Text className="text-[12px] font-semibold text-primary">추천 팝업</Text>
      <Text className="text-[22px] font-semibold leading-7 text-heading">
        {hasQuery ? "검색 결과" : "바로 확인할 팝업"}
      </Text>
      <Text className="text-[13px] leading-5 text-muted">
        {hasQuery
          ? `"${query.trim()}" 기준 ${resultCount}개를 찾았어요.`
          : "최근 검색 흐름과 운영 정보를 기준으로 골랐어요."}
      </Text>
    </View>
  );
}

export default function HomeSearchScreen({
  activeTab,
  initialQuery = "",
  onBack,
  onOpenPopup,
  onTabPress,
}: HomeSearchScreenProps) {
  const searchEntry = useRef(new Animated.Value(0)).current;
  const contentEntry = useRef(new Animated.Value(0)).current;
  const [query, setQuery] = useState(initialQuery);
  const [detailOpen, setDetailOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(
    initialQuery.trim()
      ? [
          {
            id: "recent-current",
            label: initialQuery.trim(),
            query: initialQuery.trim(),
          },
          ...RECENT_SEARCHES,
        ]
      : RECENT_SEARCHES,
  );
  const feed = getHomeFeed();
  const {
    isPopupReminderEnabled,
    isPopupSaved,
    togglePopupReminder,
    toggleSavedPopup,
  } = useHomeFeature();

  const results = useMemo(() => searchHomePopups(query), [query]);
  const hasQuery = query.trim().length > 0;
  const promotedPopup = feed.comingSoonPopups[0] ?? feed.trendingPopups[0];

  useEffect(() => {
    searchEntry.setValue(0);
    contentEntry.setValue(0);

    const entryAnimation = Animated.stagger(SEARCH_ENTRY_STAGGER_MS, [
      Animated.timing(searchEntry, {
        toValue: 1,
        duration: SEARCH_TOP_BAR_ENTRY_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentEntry, {
        toValue: 1,
        duration: SEARCH_CONTENT_ENTRY_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    entryAnimation.start();

    return () => entryAnimation.stop();
  }, [contentEntry, searchEntry]);

  const searchEntryStyle = useMemo(
    () => ({
      opacity: searchEntry,
      transform: [
        {
          translateY: searchEntry.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 0],
          }),
        },
        {
          scale: searchEntry.interpolate({
            inputRange: [0, 1],
            outputRange: [0.98, 1],
          }),
        },
      ],
    }),
    [searchEntry],
  );
  const contentEntryStyle = useMemo(
    () => ({
      opacity: contentEntry,
      transform: [
        {
          translateY: contentEntry.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
      ],
    }),
    [contentEntry],
  );

  const updateRecentSearches = (value: string) => {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return;
    }

    setRecentSearches((current) => {
      const nextItem: RecentSearchItem = {
        id: `recent-${trimmed}-${Date.now()}`,
        label: trimmed,
        query: trimmed,
      };

      const filtered = current.filter((item) => item.query !== trimmed);
      return [nextItem, ...filtered].slice(0, 8);
    });
  };

  const handleSelectQuery = (value: string) => {
    setQuery(value);
    updateRecentSearches(value);
  };

  const handleRemoveRecentSearch = (id: string) => {
    setRecentSearches((current) => current.filter((item) => item.id !== id));
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const renderPopup = ({ item }: { item: PopupSummary }) => (
    <PopupListItem
      popup={item}
      isSaved={isPopupSaved(item.id)}
      reminderEnabled={isPopupReminderEnabled(item.id)}
      onPress={() => onOpenPopup(item.id)}
      onToggleSaved={() => toggleSavedPopup(item.id)}
      onToggleReminder={() => togglePopupReminder(item.id)}
    />
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={searchEntryStyle}>
        <SearchTopBar
          detailOpen={detailOpen}
          query={query}
          onBack={onBack}
          onChangeQuery={setQuery}
          onClearQuery={() => setQuery("")}
          onSubmitQuery={() => updateRecentSearches(query)}
          onToggleDetail={() => setDetailOpen((current) => !current)}
        />
      </Animated.View>

      <Animated.View style={[{ flex: 1 }, contentEntryStyle]}>
        <FlatList
          className="flex-1"
          data={results}
          renderItem={renderPopup}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListHeaderComponent={
            <View className="gap-7 pb-5">
              {detailOpen ? <DetailSearchPanel onSelect={handleSelectQuery} /> : null}

              <SearchRankingSection onSelect={handleSelectQuery} />

              <RecentSearchSection
                onSelect={handleSelectQuery}
                recentSearches={recentSearches}
                onRemove={handleRemoveRecentSearch}
                onClearAll={handleClearRecentSearches}
              />

              <SearchPromoBanner
                popup={promotedPopup}
                onOpenPopup={onOpenPopup}
              />

              <View className="gap-3 rounded-[8px] border border-chip-border bg-surface p-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-[12px] font-semibold text-primary">
                      추천 탐색
                    </Text>
                    <Text className="mt-1 text-[18px] font-semibold text-heading">
                      지금 많이 보는 테마
                    </Text>
                  </View>
                  <View className="rounded-[8px] bg-surface-secondary px-2 py-1">
                    <Text className="text-[11px] font-semibold text-muted">
                      바로 이동
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-2">
                  {EXPLORE_SHORTCUTS.map((shortcut) => (
                    <TouchableOpacity
                      key={shortcut.id}
                      activeOpacity={0.85}
                      onPress={() => handleSelectQuery(shortcut.query)}
                      accessibilityRole="button"
                      accessibilityLabel={`${shortcut.label} 탐색`}
                      className="min-h-11 flex-1 basis-[46%] rounded-[8px] border border-chip-border bg-white px-3 py-2"
                    >
                      <Text className="text-[14px] font-semibold text-heading">
                        {shortcut.label}
                      </Text>
                      <Text className="mt-1 text-[12px] leading-4 text-muted">
                        {shortcut.note}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <SearchResultHeader
                hasQuery={hasQuery}
                query={query}
                resultCount={results.length}
              />
            </View>
          }
          ListEmptyComponent={
            <View className="items-center rounded-[8px] bg-surface-secondary px-6 py-10">
              <Ionicons name="sparkles-outline" size={28} color={COLORS.primary} />
              <Text className="mt-3 text-[17px] font-semibold text-heading">
                검색 결과가 없어요
              </Text>
              <Text className="mt-2 text-center text-[13px] leading-5 text-muted">
                지역명, 브랜드명, 카테고리로 다시 찾아보세요.
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingTop: 12,
            paddingBottom: 132,
          }}
        />
      </Animated.View>

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
