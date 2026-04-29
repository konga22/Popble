import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { TabName } from "./tabConfig";

type IoniconName = ComponentProps<typeof Ionicons>["name"];
export type TabTransitionDirection = "left" | "right" | "none";

export type AppRoute =
  | TabName
  | "community-feed"
  | "partner"
  | "review"
  | "search";

export type AppScreenProps = {
  activeTab: TabName;
  tabTransitionDirection: TabTransitionDirection;
  onOpenMenu: () => void;
  onNavigate: (route: AppRoute) => void;
  onTabPress: (tab: TabName) => void;
};

export type MenuRouteItem = {
  route: AppRoute;
  label: string;
  description: string;
  icon: IoniconName;
};

export const ROUTE_HREFS: Record<AppRoute, string> = {
  home: "/",
  map: "/map",
  community: "/community",
  saved: "/saved",
  profile: "/profile",
  "community-feed": "/community-feed",
  review: "/review",
  partner: "/partner",
  search: "/search",
};

export const PRIMARY_MENU_ITEMS: MenuRouteItem[] = [
  {
    route: "home",
    label: "홈",
    description: "오늘 운영 중인 팝업과 주요 정보를 확인합니다.",
    icon: "home-outline",
  },
  {
    route: "map",
    label: "지도",
    description: "내 주변 팝업을 지도 기반으로 탐색합니다.",
    icon: "map-outline",
  },
  {
    route: "community",
    label: "커뮤니티",
    description: "방문 후기와 실시간 글을 확인합니다.",
    icon: "chatbubble-ellipses-outline",
  },
  {
    route: "saved",
    label: "저장",
    description: "저장한 팝업 정보를 모아봅니다.",
    icon: "bookmark-outline",
  },
  {
    route: "profile",
    label: "마이",
    description: "알림, 저장, 제보 상태를 관리합니다.",
    icon: "person-outline",
  },
];

export const DISCOVERY_MENU_ITEMS: MenuRouteItem[] = [
  {
    route: "community-feed",
    label: "커뮤니티 피드",
    description: "동행, 교환, 현장 팁 글을 확인합니다.",
    icon: "newspaper-outline",
  },
  {
    route: "review",
    label: "리뷰 & 별점",
    description: "방문 후기와 별점 정보를 확인합니다.",
    icon: "star-outline",
  },
  {
    route: "partner",
    label: "팝업 파트너",
    description: "동행 모집과 파트너 정보를 확인합니다.",
    icon: "people-outline",
  },
];

export function getRouteHref(route: AppRoute) {
  return ROUTE_HREFS[route];
}

export function getRouteFromPathname(pathname: string): AppRoute {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const matchedRoute = Object.entries(ROUTE_HREFS).find(
    ([, href]) => href === normalizedPath
  );

  return matchedRoute ? (matchedRoute[0] as AppRoute) : "home";
}

export function getActiveTab(route: AppRoute): TabName {
  switch (route) {
    case "community-feed":
    case "partner":
    case "review":
      return "community";
    case "search":
      return "home";
    default:
      return route;
  }
}
