# 팝업메이트 글로벌 기능 레지스트리

이 문서는 앱 전역에서 공유되는 기능의 위치와 책임을 기록한다.

목적:

- 화면 파일 안에서 전역 기능이 흩어지는 것을 막는다
- 어떤 기능이 global/constants 계층에 있어야 하는지 빠르게 판단한다
- 기능 추가 전에 파일 위치와 책임을 먼저 정리한다

---

## 글로벌 기능 기준

아래 중 하나라도 만족하면 글로벌 기능으로 본다.

- 2개 이상 화면에서 같은 상태나 동작을 공유한다
- 앱 루트에서 초기화되거나 정리되어야 한다
- 내비게이션, 탭, 인증, 모달, 토스트, 테마처럼 앱 전체 UX에 영향을 준다
- 한 화면 수정이 다른 화면 동작까지 바꿀 가능성이 있다

---

## 작성 규칙

- 글로벌 동작은 `src/global/` 아래에 둔다
- 전역 상수는 `src/constants/` 아래에 둔다
- 기능마다 진입 파일(entry)을 1개 둔다
- 화면은 내부 구현을 직접 복제하지 않고 entry/config를 import 한다
- 새 글로벌 기능을 만들면 이 문서의 레지스트리 표를 갱신한다

---

## 현재 구조

```txt
src/
├── global/
│   ├── navigation/
│   │   ├── NavigationContext.tsx
│   │   ├── appRoutes.ts
│   │   ├── tabConfig.ts
│   │   └── useBottomNavAnimation.ts
│   └── registry/
│       └── featureRegistry.ts
├── features/
│   └── home/
│       ├── HomeFeatureContext.tsx
│       └── homeData.ts
├── constants/
│   ├── colors.ts
│   ├── layout.ts
│   └── mockImages.ts
└── components/
    └── navigation/
        ├── BottomNavBar.tsx
        ├── BottomNavIndicator.tsx
        ├── BottomNavItem.tsx
        ├── SideMenu.tsx
        └── SideMenu.tsx
```

---

## 레지스트리

| 기능명 | 범위 | 위치 | 현재 상태 | 설명 |
|------|------|------|------|------|
| Expo Router Shell | 앱 전역 | `app/_layout.tsx`, `src/global/navigation/NavigationContext.tsx` | ✅ 구현 | SafeAreaProvider, Stack, font loading, navigation provider를 초기화 |
| App Routes | 앱 전역 | `src/global/navigation/appRoutes.ts` | ✅ 구현 | route 타입, href 매핑, 메뉴 항목, pathname 변환, active tab 계산 |
| Route Files | 앱 전역 | `app/*.tsx` | ✅ 구현 | Expo Router route에서 screen 컴포넌트와 공통 props 연결 |
| Bottom Navigation | 앱 전역 | `src/components/navigation/`, `src/global/navigation/` | ✅ 구현 | 탭 UI, indicator, 탭 아이템, animation hook 분리 |
| Route / Tab Config | 앱 전역 | `src/global/navigation/tabConfig.ts`, `src/global/navigation/appRoutes.ts` | ✅ 구현 | 탭 순서, 라벨, 아이콘, route 매핑 관리 |
| Side Menu | 앱 전역 | `src/components/navigation/SideMenu.tsx`, `NavigationContext.tsx` | ✅ 신규 디자인 적용 | 햄버거 메뉴와 route 이동 처리 |
| Top App Bar Preset | 앱 전역 | `src/components/common/TopAppBar.tsx` | ✅ 구현 | 화면별 title/logo/action 패턴을 공통 컴포넌트로 유지 |
| Theme Tokens | 앱 전역 | `tailwind.config.js`, `src/constants/colors.ts` | ✅ 구현 | 문서화된 pastel palette와 NativeWind 토큰 관리 |
| Layout Constants | 앱 전역 | `src/constants/layout.ts` | ✅ 구현 | top bar, FAB, nav padding, 화면 패딩, 섹션 간격 관리 |
| Mock Images | 앱 전역 | `src/constants/mockImages.ts` | ✅ 구현 | Figma MCP 임시 asset URL 대신 안정적인 mock image constants 제공 |
| Home Feature State | 홈/팝업 탐색 | `src/features/home/homeData.ts`, `src/features/home/HomeFeatureContext.tsx`, `src/screens/HomeScreen.tsx` | ✅ 신규 디자인 적용 | 홈 mock 데이터, 검색/상세/전체보기 route, 세션 내 저장/알림 상태 관리 |
| Feature Registry | 앱 전역 | `src/global/registry/featureRegistry.ts` | ✅ 구현 | 앱 기능 목록/메타데이터 관리 |
| Modal / Toast Manager | 앱 전역 | `src/global/overlay/` | ⬜ 미구현 | 전역 알림/오버레이 제어 후보 |
| Analytics / Tracking | 앱 전역 | `src/global/analytics/` | ⬜ 미구현 | 화면 진입, 탭 클릭, CTA 추적 후보 |

---

## 현재 라우트 매핑

| AppRoute | href | Active Tab |
|----------|------|------------|
| `home` | `/` | `home` |
| `map` | `/map` | `map` |
| `community` | `/community` | `community` |
| `saved` | `/saved` | `saved` |
| `profile` | `/profile` | `profile` |
| `community-feed` | `/community-feed` | `community` |
| `review` | `/review` | `community` |
| `partner` | `/partner` | `community` |

---

## 운영 메모

- 새 탭을 추가할 때는 `TabName`, `TAB_CONFIG`, `ROUTE_HREFS`, `NavigationRoot`의 `Stack.Screen`, `app/` route 파일을 함께 갱신한다.
- 탭이 아닌 커뮤니티 하위 화면은 `getActiveTab()`에서 커뮤니티 탭으로 매핑한다.
- 화면에서 Figma MCP asset URL을 직접 참조하지 않는다. 임시 이미지는 `MOCK_IMAGES`, 운영 이미지는 향후 CDN/asset 상수 계층을 사용한다.
- NativeWind 색상 토큰과 `COLORS` 상수는 같은 팔레트를 유지한다.
