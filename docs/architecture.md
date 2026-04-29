# Popble 아키텍처

Popble은 Expo SDK 54, React Native 0.81, TypeScript strict, NativeWind v4 기반 모바일 앱이다. 현재 Expo Router가 도입되어 `app/` route 파일이 진입점을 맡고, 실제 화면 UI는 `src/screens/`와 `src/components/`에 유지한다.

---

## 디렉토리 구조

```txt
Popble/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── search.tsx
│   ├── popups/
│   │   ├── [id].tsx
│   │   ├── submit.tsx
│   │   └── section/
│   │       └── [section].tsx
│   ├── map.tsx
│   ├── community.tsx
│   ├── community-feed.tsx
│   ├── review.tsx
│   ├── partner.tsx
│   ├── saved.tsx
│   └── profile.tsx
│
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── HomeSearchScreen.tsx
│   │   ├── HomeSearchScreen.tsx
│   │   ├── PopupCollectionScreen.tsx
│   │   ├── PopupDetailScreen.tsx
│   │   ├── PopupSubmissionScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── CommunityMainScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── ReviewScreen.tsx
│   │   ├── PartnerScreen.tsx
│   │   ├── SavedScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── components/
│   │   ├── cards/
│   │   ├── common/
│   │   ├── navigation/
│   │   ├── sections/
│   │   └── ui/
│   │
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── layout.ts
│   │   └── mockImages.ts
│   │
│   ├── features/
│   │   └── home/
│   │       ├── HomeFeatureContext.tsx
│   │       └── homeData.ts
│   │
│   └── global/
│       ├── navigation/
│       │   ├── NavigationContext.tsx
│       │   ├── appRoutes.ts
│       │   ├── tabConfig.ts
│       │   └── useBottomNavAnimation.ts
│       └── registry/
│           └── featureRegistry.ts
│
├── assets/
│   └── fonts/
├── App.tsx
├── global.css
├── tailwind.config.js
├── metro.config.js
├── babel.config.js
└── package.json
```

---

## Expo Router 구조

`package.json`의 `main`은 `expo-router/entry`다. 앱의 실제 route 진입은 `app/` 아래 파일이 담당한다.

| Route 파일 | 화면 | 연결 Screen |
|------------|------|-------------|
| `app/_layout.tsx` | 루트 레이아웃 | `NavigationRoot` |
| `app/index.tsx` | 홈 | `HomeScreen` |
| `app/search.tsx` | 홈 검색 | `HomeSearchScreen` |
| `app/popups/[id].tsx` | 팝업 상세 | `PopupDetailScreen` |
| `app/popups/section/[section].tsx` | 홈 섹션 전체보기 | `PopupCollectionScreen` |
| `app/popups/submit.tsx` | 팝업 제보 | `PopupSubmissionScreen` |
| `app/map.tsx` | 지도 | `MapScreen` |
| `app/community.tsx` | 커뮤니티 메인 | `CommunityMainScreen` |
| `app/community-feed.tsx` | 커뮤니티 피드 | `CommunityScreen` |
| `app/review.tsx` | 리뷰 & 별점 | `ReviewScreen` |
| `app/partner.tsx` | 팝업 파트너 | `PartnerScreen` |
| `app/saved.tsx` | 저장 | `SavedScreen` |
| `app/profile.tsx` | 마이 | `ProfileScreen` |

각 route 파일은 `useAppScreenProps()`를 호출해 화면에 공통 navigation props를 전달한다. `app/_layout.tsx`는 `SafeAreaProvider`와 `NavigationRoot`를 감싼다.

홈 신규 디자인은 정식 `HomeScreen`과 `HomeSearchScreen`에 반영되어 route에 연결되어 있다. 햄버거 메뉴도 정식 `SideMenu`를 전역 navigation shell에 연결한다.

`App.tsx`는 기존 수동 라우팅 진입점으로 남아 있지만, 현재 패키지 진입점은 Expo Router다. 새 화면은 `app/` route 파일과 `src/screens/*Screen.tsx`를 함께 추가하는 방식으로 확장한다.

---

## 화면 컴포넌트 구조 패턴

화면 파일은 조립 코드에 가깝게 유지한다.

```tsx
import React from "react";
import { ScrollView, View } from "react-native";
import type { AppScreenProps } from "../global/navigation/appRoutes";

export default function ExampleScreen({
  activeTab,
  onOpenMenu,
  onNavigate,
  onTabPress,
}: AppScreenProps) {
  return (
    <View className="flex-1 bg-surface">
      {/* TopAppBar, sections, FAB, BottomNavBar */}
    </View>
  );
}
```

원칙:

- `src/screens/*Screen.tsx`: 화면 레이아웃 조립, 공통 navigation props 연결
- `src/components/sections/`: 화면별 큰 섹션
- `src/components/cards/`: 리스트/그리드 반복 카드
- `src/components/ui/`: 텍스트, 로고, 수평 리스트 같은 작은 공통 UI
- `src/components/navigation/`: 하단 네비게이션, 탭 아이템, 인디케이터, 사이드 메뉴
- `src/global/navigation/`: route 매핑, tab config, navigation context, animation hook
- `src/constants/`: 색상, 레이아웃, mock image constants

---

## 전역 내비게이션

현재 내비게이션은 Expo Router와 `src/global/navigation/NavigationContext.tsx`가 함께 담당한다.

| 파일 | 책임 |
|------|------|
| `NavigationContext.tsx` | `Stack`, font loading, SideMenu, route 이동 함수, screen props provider |
| `appRoutes.ts` | 앱 route 타입, href 매핑, 메뉴 항목, pathname 변환, active tab 계산 |
| `tabConfig.ts` | 하단 탭 순서, 라벨, Ionicons 아이콘 |
| `useBottomNavAnimation.ts` | 하단 nav indicator/아이템 애니메이션 계산 |

하단 탭:

```txt
home | map | community | saved | profile
```

보조 route:

```txt
community-feed | review | partner
```

보조 route는 하단 탭에서 `community` active 상태로 매핑된다.

---

## 하단 네비게이션 구현

하단 네비게이션은 구현 완료된 전역 기능이다.

```txt
src/components/navigation/
├── BottomNavBar.tsx
├── BottomNavIndicator.tsx
└── BottomNavItem.tsx

src/global/navigation/
├── tabConfig.ts
└── useBottomNavAnimation.ts
```

규칙:

- 탭 순서, 라벨, 아이콘은 `TAB_CONFIG`에서 관리한다
- 화면은 `activeTab`, `onTabPress`만 전달한다
- indicator 이동과 탭 애니메이션은 `useBottomNavAnimation.ts`에서 관리한다
- route와 탭 매핑은 `appRoutes.ts`에서 관리한다

---

## 레이아웃 상수

고정 레이아웃 값은 `src/constants/layout.ts`의 `APP_LAYOUT`에 둔다.

| 키 | 값 | 용도 |
|----|----|------|
| `topAppBarHeight` | `64` | 상단 바 높이 |
| `bottomNavBottomPadding` | `24` | 하단 safe area 여백 |
| `fabSize` | `56` | FAB 크기 |
| `screenHorizontalPadding` | `16` | 기본 화면 좌우 패딩 |
| `sectionGap` | `32` | 섹션 간격 |

새 화면에서 같은 값을 반복해야 하면 임의 숫자보다 `APP_LAYOUT`을 우선한다.

---

## Mock 이미지

Figma MCP asset URL은 만료될 수 있으므로 화면 코드에서 직접 사용하지 않는다. 현재 mock/static 화면 이미지는 `src/constants/mockImages.ts`의 `MOCK_IMAGES`를 사용한다.

향후 운영 에셋 적용 시에도 화면 파일에 URL을 흩뿌리지 말고, 로컬 `assets/` 또는 CDN 상수 계층으로 교체한다.

---

## 상태 관리 계획

| 상태 종류 | 현재/계획 |
|-----------|-----------|
| 라우팅/탭 상태 | Expo Router + `NavigationContext` |
| 사이드 메뉴 표시 | `NavigationContext` 내부 `useState` |
| 서버 데이터 | 추후 React Query 검토 |
| 전역 상태 | 인증/사용자 상태 도입 시 Zustand 등 검토 |
| 폼 | 작성/필터 폼 도입 시 React Hook Form 검토 |

---

## 의존성 정책

- 패키지 추가 전 Expo SDK 54 호환성을 확인한다
- Expo 관리 패키지는 `npx expo install`을 우선한다
- peer dependency 충돌은 `--legacy-peer-deps`로 덮기보다 원인을 먼저 확인한다
- TypeScript 확인은 `npm run typecheck` 또는 `npm run check`를 사용한다
