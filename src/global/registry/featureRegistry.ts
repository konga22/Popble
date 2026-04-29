export type GlobalFeature = {
  id: string;
  description: string;
  ownedBy: string[];
  scope: "app" | "navigation" | "theme" | "overlay";
};

export const FEATURE_REGISTRY: GlobalFeature[] = [
  {
    id: "expo-router-shell",
    description:
      "Expo Router 진입점, 루트 Stack, 안전 영역, 화면 공통 navigation props를 관리한다.",
    ownedBy: [
      "app/_layout.tsx",
      "app/*.tsx",
      "src/global/navigation/NavigationContext.tsx",
      "src/global/navigation/appRoutes.ts",
    ],
    scope: "navigation",
  },
  {
    id: "bottom-navigation",
    description:
      "앱 전역 하단 네비게이션 UI, 탭 설정, 활성 탭 애니메이션을 관리한다.",
    ownedBy: [
      "src/components/navigation/BottomNavBar.tsx",
      "src/components/navigation/BottomNavItem.tsx",
      "src/components/navigation/BottomNavIndicator.tsx",
      "src/global/navigation/tabConfig.ts",
      "src/global/navigation/useBottomNavAnimation.ts",
    ],
    scope: "navigation",
  },
  {
    id: "top-app-bar",
    description:
      "앱 전반에서 재사용하는 상단 앱 바의 logo/title/back 변형을 관리한다.",
    ownedBy: ["src/components/common/TopAppBar.tsx"],
    scope: "navigation",
  },
  {
    id: "typography",
    description:
      "브랜드 로고 폰트와 기본 텍스트 폰트 로딩, 공통 텍스트 위젯을 관리한다.",
    ownedBy: [
      "src/global/navigation/NavigationContext.tsx",
      "tailwind.config.js",
      "src/components/ui/AppText.tsx",
    ],
    scope: "theme",
  },
  {
    id: "theme-tokens",
    description:
      "NativeWind 색상 토큰과 JS 색상 상수를 같은 파스텔 팔레트로 유지한다.",
    ownedBy: ["tailwind.config.js", "src/constants/colors.ts"],
    scope: "theme",
  },
  {
    id: "mock-images",
    description:
      "Figma MCP 임시 asset URL 대신 mock/static 화면에서 쓰는 안정적인 이미지 URL을 관리한다.",
    ownedBy: ["src/constants/mockImages.ts"],
    scope: "theme",
  },
  {
    id: "home-feature-state",
    description:
      "홈 mock 데이터, 검색/상세/전체보기 route, 세션 내 저장/알림 상태를 관리한다.",
    ownedBy: [
      "src/features/home/homeData.ts",
      "src/features/home/HomeFeatureContext.tsx",
      "app/search.tsx",
      "app/popups/*.tsx",
      "src/screens/HomeScreen.tsx",
      "src/screens/HomeSearchScreen.tsx",
    ],
    scope: "app",
  },
];
