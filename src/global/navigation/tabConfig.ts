import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export type TabName = "home" | "map" | "community" | "saved" | "profile";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export type TabConfigItem = {
  id: TabName;
  icon: IoniconName;
  activeIcon: IoniconName;
  label: string;
  iconOffsetX?: number;
};

export const TAB_CONFIG: TabConfigItem[] = [
  {
    id: "home",
    icon: "home-outline",
    activeIcon: "home",
    label: "홈",
  },
  {
    id: "map",
    icon: "map-outline",
    activeIcon: "map",
    label: "지도",
  },
  {
    id: "community",
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
    label: "커뮤니티",
    iconOffsetX: 1,
  },
  {
    id: "saved",
    icon: "bookmark-outline",
    activeIcon: "bookmark",
    label: "저장",
  },
  {
    id: "profile",
    icon: "person-outline",
    activeIcon: "person",
    label: "마이",
  },
];
