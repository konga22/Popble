import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../ui/AppText";
import { COLORS } from "../../constants/colors";
import {
  DISCOVERY_MENU_ITEMS,
  PRIMARY_MENU_ITEMS,
  type AppRoute,
  type MenuRouteItem,
} from "../../global/navigation/appRoutes";

type SideMenuProps = {
  activeRoute: AppRoute;
  onClose: () => void;
  onNavigate: (route: AppRoute) => void;
  visible: boolean;
};

type MenuGroupProps = {
  activeRoute: AppRoute;
  items: MenuRouteItem[];
  title: string;
  onNavigate: (route: AppRoute) => void;
};

function MenuGroup({ activeRoute, items, title, onNavigate }: MenuGroupProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-semibold text-muted">
          {title}
        </Text>
        <View className="h-px flex-1 bg-chip-border ml-3" />
      </View>
      <View className="gap-2">
        {items.map((item) => {
          const isActive = item.route === activeRoute;

          return (
            <TouchableOpacity
              key={item.route}
              activeOpacity={0.85}
              onPress={() => onNavigate(item.route)}
              accessibilityRole="button"
              accessibilityLabel={`${item.label} 화면으로 이동`}
              accessibilityState={{ selected: isActive }}
              accessibilityHint="선택하면 메뉴를 닫고 해당 화면으로 이동합니다"
              className={`min-h-[56px] flex-row items-center gap-3 rounded-[8px] border px-3 py-2 ${
                isActive
                  ? "border-primary/30 bg-[rgba(110,95,255,0.08)]"
                  : "border-transparent bg-transparent"
              }`}
            >
              <View
                className={`h-10 w-1 rounded-full ${
                  isActive ? "bg-primary" : "bg-transparent"
                }`}
              />
              <View
                className={`h-11 w-11 items-center justify-center rounded-[8px] border ${
                  isActive
                    ? "border-primary/20 bg-primary"
                    : "border-chip-border bg-surface"
                }`}
              >
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={isActive ? "white" : COLORS.iconMuted}
                />
              </View>
              <View className="min-w-0 flex-1 justify-center">
                <Text
                  className={`text-[15px] leading-5 ${
                    isActive ? "font-semibold text-heading" : "text-heading"
                  }`}
                >
                  {item.label}
                </Text>
                <Text className="mt-0.5 text-[12px] leading-4 text-muted">
                  {item.description}
                </Text>
              </View>
              <View className="items-end gap-1">
                {isActive ? (
                  <View className="rounded-[8px] bg-primary px-2 py-1">
                    <Text className="text-[10px] font-semibold leading-3 text-white">
                      현재
                    </Text>
                  </View>
                ) : null}
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={isActive ? COLORS.heading : COLORS.iconMuted}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function SideMenu({
  activeRoute,
  onClose,
  onNavigate,
  visible,
}: SideMenuProps) {
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(Math.max(width - 28, 312), 372);
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      translateX.setValue(-drawerWidth);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -drawerWidth,
        duration: 120,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 110,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setMounted(false);
      }
    });
  }, [drawerWidth, overlayOpacity, translateX, visible]);

  const handleNavigate = useCallback(
    (route: AppRoute) => {
      onNavigate(route);
      onClose();
    },
    [onClose, onNavigate]
  );

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={mounted}
      onRequestClose={onClose}
      animationType="none"
    >
      <View className="flex-1">
        <Animated.View
          className="absolute inset-0 bg-[rgba(18,18,22,0.48)]"
          style={{ opacity: overlayOpacity }}
        >
          <Pressable
            className="flex-1"
            accessibilityRole="button"
            accessibilityLabel="메뉴 닫기"
            accessibilityHint="탭하면 사이드 메뉴를 닫습니다"
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          className="absolute bottom-0 left-0 top-0 overflow-hidden border-r border-chip-border bg-surface"
          style={{
            width: drawerWidth,
            transform: [{ translateX }],
            shadowColor: "rgba(16, 16, 20, 0.16)",
            shadowOffset: { width: 12, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 30,
            elevation: 20,
          }}
        >
          <SafeAreaView
            className="flex-1 bg-surface"
            edges={["top", "bottom", "left"]}
          >
            <View className="border-b border-chip-border px-5 pb-4 pt-5">
              <View className="flex-row items-start justify-between gap-3">
                <View className="flex-1 gap-3">
                  <View className="gap-1">
                    <Text className="text-[11px] font-semibold text-muted">
                      팝업 안내
                    </Text>
                    <Text className="font-brand text-[28px] leading-8 text-heading">
                      오늘의 팝업 정보
                    </Text>
                    <Text className="max-w-[220px] text-[13px] leading-5 text-muted">
                      지도, 저장, 오픈 예정, 마감 임박 정보를 빠르게 확인해요.
                    </Text>
                  </View>
                  <View className="flex-row flex-wrap gap-2">
                    <View className="rounded-[8px] border border-chip-border bg-white px-2.5 py-1.5">
                      <Text className="text-[11px] font-semibold leading-4 text-heading">
                        현재 탭
                      </Text>
                    </View>
                    <View className="rounded-[8px] border border-chip-border bg-surface-secondary px-2.5 py-1.5">
                      <Text className="text-[11px] font-semibold leading-4 text-muted">
                        빠른 이동
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="메뉴 닫기"
                  accessibilityHint="탭하면 사이드 메뉴를 닫습니다"
                  className="h-11 w-11 items-center justify-center rounded-[8px] border border-chip-border bg-white"
                >
                  <Ionicons
                    name="close-outline"
                    size={22}
                    color={COLORS.heading}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              className="flex-1 px-4"
              contentContainerStyle={{
                paddingBottom: 28,
                paddingTop: 18,
                gap: 24,
              }}
              showsVerticalScrollIndicator={false}
            >
              <MenuGroup
                activeRoute={activeRoute}
                items={PRIMARY_MENU_ITEMS}
                title="주요 정보"
                onNavigate={handleNavigate}
              />
              <MenuGroup
                activeRoute={activeRoute}
                items={DISCOVERY_MENU_ITEMS}
                title="참여 정보"
                onNavigate={handleNavigate}
              />

              <View className="rounded-[8px] border border-chip-border bg-[rgba(255,255,255,0.9)] p-4">
                <View className="flex-row items-center justify-between">
                  <View className="gap-1">
                    <Text className="text-[11px] font-semibold text-muted">
                      저장 정보
                    </Text>
                    <Text className="text-[15px] font-semibold leading-5 text-heading">
                      저장한 팝업 12개
                    </Text>
                  </View>
                  <View className="rounded-[8px] bg-surface-secondary px-2.5 py-1.5">
                    <Text className="text-[11px] font-semibold leading-4 text-heading">
                      최신
                    </Text>
                  </View>
                </View>
                <Text className="mt-2 text-[13px] leading-5 text-muted">
                  오픈 예정과 종료 임박 알림을 한곳에서 확인해요.
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}
