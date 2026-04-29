import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";
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

  if (!scaleByTabRef.current) {
    scaleByTabRef.current = createScaleMap();
  }

  useEffect(() => {
    const animations = TAB_CONFIG.map((tab) =>
      Animated.spring(scaleByTabRef.current![tab.id], {
        toValue: tab.id === activeTab ? 1.02 : 1,
        useNativeDriver: true,
        tension: 150,
        friction: 18,
      })
    );

    Animated.parallel(animations).start();
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
