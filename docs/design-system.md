# 팝업메이트 디자인 시스템

팝업메이트의 테마는 파스텔 퍼플 / 라벤더 드림이다. 색상 토큰은 `tailwind.config.js`와 `src/constants/colors.ts`를 기준으로 유지한다.

---

## 색상 팔레트

### Primary

| 토큰 | 헥스 | 용도 |
|------|------|------|
| `primary` | `#844d74` | 주요 액션, 로고, 강조 |
| `primary-light` | `#fadaec` | 활성 탭 배경, 칩 배경, 부드러운 강조 |
| `primary-dark` | `#774167` | 카테고리 레이블, 보조 강조 |

### Bubble / Accent

| 토큰 | 헥스 | 용도 |
|------|------|------|
| `bubble-logo` | `#b596f4` | 브랜드 로고 보조 버블 |
| `bubble-pink` | `#ffd8ef` | 핑크 계열 mock 이미지/배지 배경 |
| `bubble-sky` | `#cdefff` | 스카이 계열 mock 이미지/배지 배경 |
| `accent-pink` | `#f9b4e1` | FAB 그라디언트, 포인트 강조 |
| `accent-plum` | `#6b5780` | 플럼 계열 보조 텍스트/아이콘 |

### Lavender

| 토큰 | 헥스 | 용도 |
|------|------|------|
| `lavender` | `#e1c8f8` | D-Day 뱃지, 트렌딩 칩, 라벤더 배경 |
| `lavender-dark` | `#5f4b73` | 라벤더 배경 위 텍스트 |

### Surface

| 토큰 | 헥스 | 용도 |
|------|------|------|
| `surface` | `#fcf8fc` | 앱 전체 배경 |
| `surface-strong` | `#ffffff` | 카드/강한 표면 |
| `surface-secondary` | `#f6f2f8` | 카드 배경, 종료임박 아이템 |
| `muted-subtle` | `#eae7ed` | 검색바 배경, 비활성 칩 |

### Text / Status

| 토큰 | 헥스 | 용도 |
|------|------|------|
| `heading` | `#333238` | 제목, 강조 텍스트 |
| `muted` | `#605e65` | 본문, 서브 텍스트 |
| `body-muted` | `#7c7a80` | 본문 보조 텍스트 |
| `icon-muted` | `#8f8c95` | 비활성 아이콘 |
| `urgent` | `#a8364b` | 마감 임박, 경고 |

### 투명도 상수

| 상수 | 값 | 용도 |
|------|----|------|
| `shadowSoft` | `rgba(51,50,56,0.06)` | 부드러운 카드 그림자 |
| `overlay` | `rgba(51,50,56,0.38)` | 이미지 위 오버레이 |
| `primaryShadow` | `rgba(132,77,116,0.25)` | primary 계열 그림자 |
| `topBorder` | `rgba(15,23,42,0.04)` | 상단 경계선 |
| `navBorder` | `rgba(15,23,42,0.06)` | 네비게이션 경계선 |

---

## NativeWind 사용 규칙

- 색상은 `text-primary`, `bg-surface`, `bg-primary-light`처럼 Tailwind token class를 우선 사용한다.
- NativeWind가 지원하지 않는 그림자/그라디언트/동적 투명도만 `style={{}}`를 허용한다.
- 색상 상수가 필요한 JS 로직은 `src/constants/colors.ts`의 `COLORS`를 사용한다.
- `tailwind.config.js`와 `COLORS`는 같은 팔레트를 유지한다.

---

## 타이포그래피

### 폰트 패밀리

| 용도 | 폰트 | 토큰/사용 |
|------|------|-----------|
| 앱 기본 텍스트 | Moneygraphy Rounded | `font-sans`, `AppText` |
| 브랜드 로고 | YM Move Sans Bold | `font-brand`, `BrandLogo` |

폰트 로딩은 `src/global/navigation/NavigationContext.tsx`의 `NavigationRoot`에서 처리한다.

### 텍스트 스케일

| 역할 | 크기 | Line Height | 클래스 예시 |
|------|------|-------------|-------------|
| 로고 | 24px | 32px | `text-2xl font-brand` |
| 섹션 헤딩 | 20px | 28px | `text-xl font-semibold` |
| 카드 타이틀 | 16px | 24px | `text-base` |
| 카드 서브 | 14px | 20px | `text-sm` |
| 카테고리 레이블 | 11px | 16.5px | `text-[11px] font-bold uppercase` |
| 캡션 / 날짜 | 12px | 16px | `text-xs` |
| 네비 레이블 | 10px | 15px | `text-[10px]` |

---

## 스페이싱과 레이아웃

반복되는 레이아웃 숫자는 `src/constants/layout.ts`의 `APP_LAYOUT`을 기준으로 한다.

| 상수 | 값 | 용도 |
|------|----|------|
| `topAppBarHeight` | `64` | TopAppBar 높이 |
| `bottomNavBottomPadding` | `24` | BottomNav safe area 여백 |
| `fabSize` | `56` | FAB 크기 |
| `screenHorizontalPadding` | `16` | 화면 기본 좌우 패딩 |
| `sectionGap` | `32` | 섹션 간격 |

### 클래스 기준

```txt
수평 패딩:     px-4 (16px)
섹션 간격:     gap-8 (32px)
컴포넌트 내부: gap-4 (16px)
아이템 간격:   gap-3 (12px)
```

---

## 고정 크기 컴포넌트

| 컴포넌트 | 크기 |
|----------|------|
| TopAppBar | `h-16` (64px) |
| BottomNavBar | 하단 safe area 포함 약 95px |
| FAB | `w-14 h-14` (56px) |
| 검색바 | `h-16` (64px) |
| 필터 칩 | `h-10`, `px-4` |
| 아바타 큰 사이즈 | 48×48px |
| 아바타 중간 사이즈 | 40×40px |
| 썸네일 작은 사이즈 | 64×64px |

---

## 카드 패턴

```txt
트렌딩 카드:      w-[260px], 이미지 h-[325px], rounded-[32px]
커밍순 카드:      w-[200px] h-[264px], 이미지 174×174, rounded-[32px]
파트너 카드:      w-full, 이미지 full-width h-[256px]
종료임박 아이템:  rounded-[32px] p-3, 썸네일 64×64
리뷰 카드:        작성자/별점/본문/이미지 조합
커뮤니티 카드:    모집/교환/팁 유형별 전용 card component
```

---

## 모서리 반지름

| 용도 | 값 | 클래스 |
|------|----|--------|
| 카드 대 | 32px | `rounded-[32px]` |
| 카드 중 | 24px | `rounded-[24px]` |
| 버튼 / 칩 | pill | `rounded-full` |
| 뱃지 | 16px | `rounded-2xl` |
| 검색바 | pill | `rounded-full` |
| 네비바 상단 | 32px | `rounded-tl-[32px] rounded-tr-[32px]` |

---

## 그림자와 그라디언트

NativeWind의 `shadow-*`를 우선 사용하되, 색상/투명도 조정이 필요한 경우 `COLORS` 상수를 참조한다.

```tsx
// FAB 예시
style={{ shadowColor: COLORS.primary, shadowOpacity: 0.25 }}
```

React Native 그라디언트는 `expo-linear-gradient`를 사용한다.

```tsx
import { LinearGradient } from "expo-linear-gradient";

<LinearGradient
  colors={[COLORS.primary, COLORS.accentPink]}
  start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 0 }}
/>
```

---

## 이미지

- 화면에서 Figma MCP asset URL을 직접 사용하지 않는다.
- 현재 mock/static 이미지는 `src/constants/mockImages.ts`의 `MOCK_IMAGES`를 사용한다.
- 실제 운영 이미지는 추후 `assets/` 또는 CDN 상수 계층으로 교체한다.
- React Native `Image`에는 항상 `resizeMode`를 명시한다.

---

## 아이콘

- 기본 아이콘은 `@expo/vector-icons/Ionicons`를 우선 사용한다.
- 탭 아이콘은 `src/global/navigation/tabConfig.ts`에서 관리한다.
- 브랜드 전용 아이콘은 향후 `assets/icons/`와 `react-native-svg` 사용을 검토한다.
