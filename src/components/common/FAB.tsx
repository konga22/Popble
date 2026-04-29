import React from "react";
import { TouchableOpacity, Animated } from "react-native";
import Text from "../ui/AppText";
import { COLORS } from "../../constants/colors";

type Props = {
  onPress?: () => void;
  icon?: string;
  bottom?: number;
  right?: number;
  accessibilityLabel?: string;
  /** 애니메이션 연결용 */
  scale?: Animated.Value;
};

/**
 * FAB (Floating Action Button)
 * - 그라디언트 배경 (primary → 핑크)
 * - scale prop 으로 pop-in 애니메이션 연결 가능
 */
export default function FAB({
  onPress,
  icon = "+",
  bottom = 96,
  right = 16,
  accessibilityLabel = "새 글 작성",
  scale,
}: Props) {
  const animStyle = scale ? { transform: [{ scale }] } : undefined;

  return (
    <Animated.View
      className="z-20"
      style={[{ position: "absolute", bottom, right }, animStyle]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        className="w-14 h-14 rounded-full items-center justify-center"
        style={{
          backgroundColor: COLORS.primary,
          shadowColor: COLORS.primaryShadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 1,
          shadowRadius: 30,
          elevation: 10,
        }}
      >
        <Text className="text-white text-[28px] leading-[30px] font-light">
          {icon}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
