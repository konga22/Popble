import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { useFonts } from "expo-font";
import SideMenu from "../../components/navigation/SideMenu";
import { HomeFeatureProvider } from "../../features/home/HomeFeatureContext";
import {
  getActiveTab,
  getRouteFromPathname,
  getRouteHref,
  type AppRoute,
  type AppScreenProps,
  type TabTransitionDirection,
} from "./appRoutes";
import { TAB_CONFIG, type TabName } from "./tabConfig";

const AppNavigationContext = createContext<AppScreenProps | null>(null);

function getTabIndex(tabName: TabName) {
  return Math.max(
    TAB_CONFIG.findIndex((tab) => tab.id === tabName),
    0
  );
}

export function useAppScreenProps() {
  const context = useContext(AppNavigationContext);

  if (!context) {
    throw new Error("useAppScreenProps must be used inside AppNavigationProvider.");
  }

  return context;
}

function AppNavigationProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const activeRoute = getRouteFromPathname(pathname);
  const activeTab = getActiveTab(activeRoute);
  const [menuVisible, setMenuVisible] = useState(false);
  const [tabTransitionDirection, setTabTransitionDirection] =
    useState<TabTransitionDirection>("none");

  useEffect(() => {
    if (!TAB_CONFIG.some((tab) => tab.id === activeRoute)) {
      setTabTransitionDirection("none");
    }
  }, [activeRoute]);

  const navigateToRoute = useCallback(
    (nextRoute: AppRoute) => {
      if (!TAB_CONFIG.some((tab) => tab.id === nextRoute)) {
        setTabTransitionDirection("none");
      }

      router.replace(getRouteHref(nextRoute));
      setMenuVisible(false);
    },
    [router]
  );

  const handleTabPress = useCallback(
    (nextTab: TabName) => {
      const currentIndex = getTabIndex(activeTab);
      const nextIndex = getTabIndex(nextTab);
      const nextDirection =
        nextIndex > currentIndex
          ? "right"
          : nextIndex < currentIndex
            ? "left"
            : "none";

      setTabTransitionDirection(nextDirection);
      navigateToRoute(nextTab);
    },
    [activeTab, navigateToRoute]
  );

  const screenProps = useMemo<AppScreenProps>(
    () => ({
      activeTab,
      tabTransitionDirection,
      onOpenMenu: () => setMenuVisible(true),
      onNavigate: navigateToRoute,
      onTabPress: handleTabPress,
    }),
    [activeTab, handleTabPress, navigateToRoute, tabTransitionDirection]
  );

  return (
    <AppNavigationContext.Provider value={screenProps}>
      <View className="flex-1 bg-surface">
        {children}
        <SideMenu
          activeRoute={activeRoute}
          onClose={() => setMenuVisible(false)}
          onNavigate={navigateToRoute}
          visible={menuVisible}
        />
      </View>
    </AppNavigationContext.Provider>
  );
}

export default function NavigationRoot() {
  const [fontsLoaded] = useFonts({
    "Moneygraphy-Rounded": require("../../../assets/fonts/Moneygraphy-Rounded.ttf"),
    "MoveSans-Bold": require("../../../assets/fonts/MoveSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppNavigationProvider>
      <HomeFeatureProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ animation: "none" }} />
          <Stack.Screen name="map" options={{ animation: "none" }} />
          <Stack.Screen name="community" options={{ animation: "none" }} />
          <Stack.Screen name="saved" options={{ animation: "none" }} />
          <Stack.Screen name="profile" options={{ animation: "none" }} />
          <Stack.Screen name="community-feed" />
          <Stack.Screen name="review" />
          <Stack.Screen name="partner" />
          <Stack.Screen name="search" options={{ animation: "none" }} />
          <Stack.Screen name="popups/[id]" />
          <Stack.Screen name="popups/section/[section]" />
          <Stack.Screen name="popups/submit" />
        </Stack>
      </HomeFeatureProvider>
    </AppNavigationProvider>
  );
}
