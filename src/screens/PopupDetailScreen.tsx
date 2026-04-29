import React from "react";
import { Image, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavBar from "../components/common/BottomNavBar";
import TopAppBar from "../components/common/TopAppBar";
import Text from "../components/ui/AppText";
import { COLORS } from "../constants/colors";
import { getPopupById } from "../features/home/homeData";
import { useHomeFeature } from "../features/home/HomeFeatureContext";
import type { TabName } from "../global/navigation/tabConfig";

type PopupDetailScreenProps = {
  activeTab: TabName;
  popupId: string;
  onBack: () => void;
  onOpenMap: () => void;
  onTabPress: (tab: TabName) => void;
};

export default function PopupDetailScreen({
  activeTab,
  popupId,
  onBack,
  onOpenMap,
  onTabPress,
}: PopupDetailScreenProps) {
  const popup = getPopupById(popupId);
  const {
    isPopupReminderEnabled,
    isPopupSaved,
    togglePopupReminder,
    toggleSavedPopup,
  } = useHomeFeature();

  if (!popup) {
    return (
      <View className="flex-1 bg-surface">
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <TopAppBar
          variant="back"
          title="팝업 상세"
          rightIcon="home-outline"
          rightAccessibilityLabel="홈으로 이동"
          onLeftPress={onBack}
          onRightPress={onBack}
        />
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="alert-circle-outline" size={34} color={COLORS.primary} />
          <Text className="mt-4 text-center text-[18px] font-semibold text-heading">
            팝업을 찾을 수 없어요
          </Text>
          <Text className="mt-2 text-center text-[13px] leading-5 text-muted">
            이미 종료되었거나 주소가 바뀐 팝업일 수 있어요.
          </Text>
        </View>
        <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
      </View>
    );
  }

  const isSaved = isPopupSaved(popup.id);
  const reminderEnabled = isPopupReminderEnabled(popup.id);

  return (
    <View className="flex-1 bg-surface">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TopAppBar
        variant="back"
        title="팝업 상세"
        rightIcon={isSaved ? "bookmark" : "bookmark-outline"}
        rightAccessibilityLabel={isSaved ? "저장 해제" : "저장하기"}
        onLeftPress={onBack}
        onRightPress={() => toggleSavedPopup(popup.id)}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 96, paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: popup.image }}
          className="h-[360px] w-full"
          resizeMode="cover"
        />

        <View className="px-5 pt-6">
          <View className="flex-row flex-wrap items-center gap-2">
            <View className="rounded-full bg-primary-light px-3 py-1.5">
              <Text className="text-[12px] font-semibold text-primary">
                {popup.category}
              </Text>
            </View>
            {popup.hot ? (
              <View className="rounded-full bg-white px-3 py-1.5">
                <Text className="text-[12px] font-semibold text-urgent">HOT</Text>
              </View>
            ) : null}
            {popup.status === "comingSoon" ? (
              <View className="rounded-full bg-lavender px-3 py-1.5">
                <Text className="text-[12px] font-semibold text-lavender-dark">
                  {popup.dday}
                </Text>
              </View>
            ) : null}
          </View>

          <Text className="mt-4 text-[30px] font-semibold leading-9 text-heading">
            {popup.title}
          </Text>
          <Text className="mt-3 text-[15px] leading-6 text-muted">
            {popup.description}
          </Text>

          <View className="mt-6 gap-3 rounded-[28px] bg-white p-5">
            <View className="flex-row gap-3">
              <Ionicons name="location-outline" size={20} color={COLORS.primary} />
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-heading">
                  {popup.venue}
                </Text>
                <Text className="mt-1 text-[13px] leading-5 text-muted">
                  {popup.address}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-heading">
                  {popup.periodLabel}
                </Text>
                <Text className="mt-1 text-[13px] leading-5 text-muted">
                  운영 시간 {popup.hours}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-5 flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => toggleSavedPopup(popup.id)}
              accessibilityRole="button"
              accessibilityLabel={isSaved ? "저장 해제" : "저장하기"}
              className="min-h-14 flex-1 flex-row items-center justify-center gap-2 rounded-[18px] bg-primary"
            >
              <Ionicons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={18}
                color="white"
              />
              <Text className="text-[15px] font-semibold text-white">
                {isSaved ? "저장됨" : "저장하기"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => togglePopupReminder(popup.id)}
              accessibilityRole="button"
              accessibilityLabel={
                reminderEnabled ? "알림 해제" : "알림 받기"
              }
              className="min-h-14 flex-1 flex-row items-center justify-center gap-2 rounded-[18px] bg-primary-light"
            >
              <Ionicons
                name={reminderEnabled ? "notifications" : "notifications-outline"}
                size={18}
                color={COLORS.primary}
              />
              <Text className="text-[15px] font-semibold text-primary">
                {reminderEnabled ? "알림 중" : "알림 받기"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-7 gap-3">
            <Text className="text-[18px] font-semibold text-heading">
              방문 포인트
            </Text>
            {popup.highlights.map((highlight) => (
              <View
                key={highlight}
                className="flex-row items-center gap-3 rounded-[22px] bg-surface-secondary px-4 py-3"
              >
                <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Ionicons
                    name="checkmark"
                    size={17}
                    color={COLORS.primary}
                  />
                </View>
                <Text className="flex-1 text-[14px] leading-5 text-heading">
                  {highlight}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onOpenMap}
            accessibilityRole="button"
            accessibilityLabel="지도에서 위치 보기"
            className="mt-7 min-h-14 flex-row items-center justify-center gap-2 rounded-[18px] bg-heading"
          >
            <Ionicons name="map-outline" size={18} color="white" />
            <Text className="text-[15px] font-semibold text-white">
              지도에서 위치 보기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
