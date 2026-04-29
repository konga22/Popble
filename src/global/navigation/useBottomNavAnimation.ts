import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";
import { TAB_CONFIG, type TabName } from "./tabConfig";

type ScaleMap = Record<TabName, Animated.Value>;

function createScaleMap(): ScaleMap {
  return TAB_CONFIG.reduce<ScaleMap>((accumulator, tab) => {
    accumulator[tab.id] = new Animated.Value(1);
    return accumulator;
  }, {} as ScaleMap);
}

type UseBottomNavAnimationResult = {
  containerStyle?: {
    transform: Array<{ translateY: Animated.Value }>;
  };
  scaleByTab: ScaleMap;
};

export default function useBottomNavAnimation(
  activeTab: TabName,
  translateY?: Animated.Value
): UseBottomNavAnimationResult {
  const scaleByTabRef = useRef<ScaleMap | null>(null);
  const previousActiveTabRef = useRef<TabName>(activeTab);

  if (!scaleByTabRef.current) {
    scaleByTabRef.current = createScaleMap();
  }

  useEffect(() => {
    const scaleByTab = scaleByTabRef.current!;
    const previousActiveTab = previousActiveTabRef.current;

    if (previousActiveTab === activeTab) {
      scaleByTab[activeTab].setValue(1.01);
      return undefined;
    }

    const affectedTabs = [previousActiveTab, activeTab];
    const animations = affectedTabs.map((tabName) =>
      Animated.timing(scaleByTab[tabName], {
        toValue: tabName === activeTab ? 1.01 : 1,
        duration: 90,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    const animation = Animated.parallel(animations);

    previousActiveTabRef.current = activeTab;
    animation.start();

    return () => animation.stop();
  }, [activeTab]);

  const containerStyle = useMemo(
    () => (translateY ? { transform: [{ translateY }] } : undefined),
    [translateY]
  );

  return {
    containerStyle,
    scaleByTab: scaleByTabRef.current,
  };
}
