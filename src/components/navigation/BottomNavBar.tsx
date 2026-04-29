import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavItem from "./BottomNavItem";
import Text from "../ui/AppText";
import { TAB_CONFIG, type TabName } from "../../global/navigation/tabConfig";
import type { TabEventStatus } from "../../global/navigation/TabEventContext";
import useBottomNavAnimation from "../../global/navigation/useBottomNavAnimation";
import { COLORS } from "../../constants/colors";

type BottomNavBarProps = {
  activeTab: TabName;
  bottomOffset?: number;
  eventActionLabel: string;
  eventMessage: string;
  eventStatus: TabEventStatus;
  eventTab: TabName;
  onDismissEvent: () => void;
  onOpenEvent: () => void;
  onTabPress: (tab: TabName) => void;
  translateY?: Animated.Value;
};

export default function BottomNavBar({
  activeTab,
  bottomOffset = 0,
  eventActionLabel,
  eventMessage,
  eventStatus,
  eventTab,
  onDismissEvent,
  onOpenEvent,
  onTabPress,
  translateY,
}: BottomNavBarProps) {
  const { containerStyle, scaleByTab } = useBottomNavAnimation(
    activeTab,
    translateY
  );

  return (
    <Animated.View
      className="absolute bottom-0 left-0 right-0 z-20"
      style={[
        containerStyle,
        bottomOffset > 0 ? { bottom: -bottomOffset } : undefined,
      ]}
    >
      {eventStatus === "bubble" && activeTab !== eventTab ? (
        <View
          className="absolute bottom-[106px] left-4 right-4 z-30 rounded-[24px] border border-muted-subtle bg-surface-strong px-5 py-4"
          style={{
            shadowColor: COLORS.primaryShadow,
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 1,
            shadowRadius: 22,
            elevation: 16,
          }}
        >
          <View className="absolute bottom-[-10px] left-1/2 h-5 w-5 rotate-45 border-b border-r border-muted-subtle bg-surface-strong" />
          <View className="flex-row gap-3 pr-9">
            <View className="mt-1 h-11 w-11 items-center justify-center rounded-full bg-primary-light">
              <Ionicons name="gift" size={22} color={COLORS.primary} />
            </View>
            <View className="min-w-0 flex-1 gap-1.5">
              <Text className="text-[17px] font-semibold leading-6 text-heading">
                {eventMessage}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onOpenEvent}
                accessibilityRole="button"
                accessibilityLabel={eventActionLabel}
                className="min-h-9 self-start justify-center"
              >
                <Text className="text-[14px] font-semibold text-primary">
                  {eventActionLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onDismissEvent}
            accessibilityRole="button"
            accessibilityLabel="이벤트 알림 닫기"
            hitSlop={{ bottom: 8, left: 8, right: 8, top: 8 }}
            className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full bg-surface-secondary"
          >
            <Ionicons name="close" size={17} color={COLORS.bodyMuted} />
          </TouchableOpacity>
        </View>
      ) : null}

      <SafeAreaView
        edges={["bottom"]}
        className="overflow-hidden rounded-t-[30px] border border-muted-subtle bg-surface-strong"
        style={{
          shadowColor: COLORS.primaryShadow,
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 1,
          shadowRadius: 18,
          elevation: 14,
        }}
      >
        <View
          className="flex-row items-start gap-1 bg-surface-strong px-2 pb-1 pt-2.5"
        >
          {TAB_CONFIG.map((tab) => (
            <BottomNavItem
              key={tab.id}
              activeTab={activeTab}
              hasEventDot={eventStatus === "dot" && tab.id === eventTab}
              item={tab}
              onPress={onTabPress}
              scale={scaleByTab[tab.id]}
            />
          ))}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
