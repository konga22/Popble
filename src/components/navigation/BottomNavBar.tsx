import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavItem from "./BottomNavItem";
import Text from "../ui/AppText";
import { TAB_CONFIG, type TabName } from "../../global/navigation/tabConfig";
import type { TabEventStatus } from "../../global/navigation/TabEventContext";
import useBottomNavAnimation from "../../global/navigation/useBottomNavAnimation";

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
  bottomOffset = 16,
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
          className="absolute bottom-[112px] left-4 right-4 z-30 rounded-[28px] border border-white/10 bg-[#24242f] px-5 py-4"
          style={{
            shadowColor: "rgba(12, 12, 18, 0.28)",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 1,
            shadowRadius: 24,
            elevation: 16,
          }}
        >
          <View className="absolute bottom-[-10px] left-1/2 h-5 w-5 rotate-45 border-b border-r border-white/10 bg-[#24242f]" />
          <View className="flex-row gap-3 pr-9">
            <View className="mt-1 h-11 w-11 items-center justify-center rounded-full bg-[#ffbf47]">
              <Text className="text-[19px] font-semibold leading-6 text-white">
                W
              </Text>
            </View>
            <View className="min-w-0 flex-1 gap-1.5">
              <Text className="text-[18px] font-semibold leading-7 text-white">
                {eventMessage}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onOpenEvent}
                accessibilityRole="button"
                accessibilityLabel={eventActionLabel}
                className="min-h-9 self-start justify-center"
              >
                <Text className="text-[14px] font-semibold text-white/55">
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
            className="absolute right-4 top-4 h-11 w-11 items-center justify-center rounded-full bg-white/10"
          >
            <Ionicons name="close" size={20} color="rgba(255,255,255,0.72)" />
          </TouchableOpacity>
        </View>
      ) : null}

      <SafeAreaView edges={["bottom"]} className="bg-transparent">
        <View
          className="flex-row items-center gap-1 overflow-hidden rounded-t-[32px] border border-white/10 bg-[#14141c] px-2 pb-2 pt-3"
          style={{
            shadowColor: "rgba(12, 12, 18, 0.24)",
            shadowOffset: { width: 0, height: -10 },
            shadowOpacity: 1,
            shadowRadius: 24,
            elevation: 18,
          }}
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
