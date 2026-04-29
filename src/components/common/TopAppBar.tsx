import React, { type ComponentProps } from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../ui/AppText";
import BrandLogo from "../ui/BrandLogo";
import { COLORS } from "../../constants/colors";

export type TopAppBarVariant = "logo" | "title" | "back";
type TopAppBarIconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  variant?: TopAppBarVariant;
  title?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: TopAppBarIconName;
  leftAccessibilityLabel?: string;
  rightAccessibilityLabel?: string;
};

export default function TopAppBar({
  variant = "logo",
  title,
  onLeftPress,
  onRightPress,
  rightIcon = "notifications-outline",
  leftAccessibilityLabel,
  rightAccessibilityLabel,
}: Props) {
  const isBack = variant === "back";
  const resolvedLeftLabel =
    leftAccessibilityLabel ?? (isBack ? "이전 화면으로 이동" : "메뉴 열기");
  const resolvedRightLabel =
    rightAccessibilityLabel ??
    (rightIcon === "notifications-outline" ? "알림 보기" : "상단 액션 실행");

  return (
    <View
      className="absolute left-0 right-0 top-0 z-10"
      style={{
        backgroundColor: COLORS.surfaceStrong,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.topBorder,
      }}
    >
      <SafeAreaView edges={["top"]}>
        <View className="h-16 flex-row items-center justify-between px-6">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onLeftPress}
            accessibilityRole="button"
            accessibilityLabel={resolvedLeftLabel}
            hitSlop={4}
            className="h-12 w-12 items-center justify-center rounded-full"
          >
            <Ionicons
              name={isBack ? "chevron-back" : "menu-outline"}
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {variant === "logo" ? (
            <BrandLogo size="sm" />
          ) : (
            <Text className="text-xl font-semibold tracking-tight text-primary">
              {title}
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onRightPress}
            accessibilityRole="button"
            accessibilityLabel={resolvedRightLabel}
            hitSlop={4}
            className="h-12 w-12 items-center justify-center rounded-full"
          >
            <Ionicons name={rightIcon} size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
