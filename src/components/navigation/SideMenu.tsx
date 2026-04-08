import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
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
import {
  DISCOVERY_MENU_ITEMS,
  PRIMARY_MENU_ITEMS,
  type AppRoute,
} from "../../global/navigation/appRoutes";

type SideMenuProps = {
  activeRoute: AppRoute;
  onClose: () => void;
  onNavigate: (route: AppRoute) => void;
  visible: boolean;
};

type MenuSectionProps = {
  activeRoute: AppRoute;
  items: typeof PRIMARY_MENU_ITEMS;
  title: string;
  onNavigate: (route: AppRoute) => void;
};

function MenuSection({
  activeRoute,
  items,
  title,
  onNavigate,
}: MenuSectionProps) {
  return (
    <View className="gap-3">
      <Text className="text-[12px] font-semibold uppercase tracking-[1.3px] text-primary">
        {title}
      </Text>
      <View className="gap-2">
        {items.map((item) => {
          const isActive = item.route === activeRoute;

          return (
            <TouchableOpacity
              key={item.route}
              activeOpacity={0.85}
              onPress={() => onNavigate(item.route)}
              className={`rounded-[24px] px-4 py-3 ${
                isActive ? "bg-primary-light" : "bg-white"
              }`}
              style={{
                shadowColor: "rgba(51,50,56,0.05)",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 1,
                shadowRadius: 18,
                elevation: 2,
              }}
            >
              <View className="flex-row items-start gap-3">
                <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-full bg-white">
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color={isActive ? "#844d74" : "#6d6974"}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className={`text-[15px] leading-5 ${
                      isActive ? "font-semibold text-primary" : "text-heading"
                    }`}
                  >
                    {item.label}
                  </Text>
                  <Text className="mt-1 text-[12px] leading-[18px] text-muted">
                    {item.description}
                  </Text>
                </View>
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
  const drawerWidth = Math.min(Math.max(width - 20, 320), 360);
  const translateX = useRef(new Animated.Value(-360)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -drawerWidth,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setMounted(false);
      }
    });
  }, [drawerWidth, overlayOpacity, translateX, visible]);

  const handleNavigate = useMemo(
    () => (route: AppRoute) => {
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
    >
      <View className="flex-1">
        <Animated.View
          className="absolute inset-0 bg-[rgba(51,50,56,0.38)]"
          style={{ opacity: overlayOpacity }}
        >
          <Pressable className="flex-1" onPress={onClose} />
        </Animated.View>

        <Animated.View
          className="absolute bottom-0 left-0 top-0 overflow-hidden rounded-r-[36px] bg-surface"
          style={{
            width: drawerWidth,
            transform: [{ translateX }],
            shadowColor: "rgba(51,50,56,0.16)",
            shadowOffset: { width: 12, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 28,
            elevation: 18,
          }}
        >
          <SafeAreaView className="flex-1 bg-surface" edges={["top", "bottom", "left"]}>
            <View className="flex-row items-start gap-3 px-5 pb-5 pt-4">
              <View className="flex-1 pr-1">
                <Text className="text-[24px] font-semibold leading-8 text-primary">
                  메뉴
                </Text>
                <Text className="mt-1 text-[13px] leading-[18px] text-muted">
                  원하는 화면으로 빠르게 이동해보세요.
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onClose}
                className="mt-0.5 h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-secondary"
              >
                <Ionicons name="close-outline" size={24} color="#844d74" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1 px-5"
              contentContainerStyle={{ paddingBottom: 28, gap: 24 }}
              showsVerticalScrollIndicator={false}
            >
              <MenuSection
                activeRoute={activeRoute}
                items={PRIMARY_MENU_ITEMS}
                title="Main"
                onNavigate={handleNavigate}
              />
              <MenuSection
                activeRoute={activeRoute}
                items={DISCOVERY_MENU_ITEMS}
                title="Explore"
                onNavigate={handleNavigate}
              />
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}
