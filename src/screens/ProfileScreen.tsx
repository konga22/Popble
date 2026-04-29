import React from "react";
import { ScrollView, TouchableOpacity, View, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TopAppBar from "../components/common/TopAppBar";
import BottomNavBar from "../components/common/BottomNavBar";
import Text from "../components/ui/AppText";
import type { AppScreenProps } from "../global/navigation/appRoutes";
import { COLORS } from "../constants/colors";

const PROFILE_MENU = [
  { label: "내 리뷰 관리", icon: "create-outline" as const },
  { label: "알림 설정", icon: "notifications-outline" as const },
  { label: "방문 히스토리", icon: "time-outline" as const },
  { label: "고객센터", icon: "help-circle-outline" as const },
];

export default function ProfileScreen({
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
        title="마이"
        rightIcon="settings-outline"
        rightAccessibilityLabel="설정 열기"
        onLeftPress={onOpenMenu}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 112, paddingBottom: 120, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 gap-5">
          <View className="rounded-[32px] bg-surface-secondary p-6">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Ionicons name="person" size={28} color={COLORS.primary} />
            </View>
            <Text className="mt-4 text-[24px] font-semibold leading-8 text-heading">
              Popble Mate
            </Text>
            <Text className="mt-1 text-[14px] leading-5 text-muted">
              저장한 팝업 12개, 작성한 리뷰 8개, 파트너 매칭 3회
            </Text>

            <View className="mt-5 flex-row gap-3">
              <View className="flex-1 rounded-[24px] bg-white px-4 py-3">
                <Text className="text-[12px] text-muted">저장</Text>
                <Text className="mt-1 text-[20px] font-semibold text-heading">
                  12
                </Text>
              </View>
              <View className="flex-1 rounded-[24px] bg-white px-4 py-3">
                <Text className="text-[12px] text-muted">리뷰</Text>
                <Text className="mt-1 text-[20px] font-semibold text-heading">
                  8
                </Text>
              </View>
              <View className="flex-1 rounded-[24px] bg-white px-4 py-3">
                <Text className="text-[12px] text-muted">배지</Text>
                <Text className="mt-1 text-[20px] font-semibold text-heading">
                  5
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-3">
            {PROFILE_MENU.map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`${item.label} 열기`}
                className="rounded-[26px] bg-white px-4 py-4"
                style={{
                  shadowColor: "rgba(51,50,56,0.06)",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 20,
                  elevation: 4,
                }}
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                    <Ionicons name={item.icon} size={18} color={COLORS.primary} />
                  </View>
                  <Text className="flex-1 text-[15px] font-medium leading-5 text-heading">
                    {item.label}
                  </Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color={COLORS.iconMuted}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
