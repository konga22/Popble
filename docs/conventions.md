# 팝업메이트 코딩 컨벤션

## 네이밍

### 파일명
| 종류 | 규칙 | 예시 |
|------|------|------|
| 화면 컴포넌트 | PascalCase + Screen | `HomeScreen.tsx` |
| 재사용 컴포넌트 | PascalCase | `TrendingCard.tsx`, `SearchBar.tsx` |
| 섹션 위젯 | PascalCase + Section | `TrendingSection.tsx`, `ReviewOverviewSection.tsx` |
| 상수 파일 | camelCase | `colors.ts`, `layout.ts` |
| 타입 파일 | camelCase | `index.ts` |
| hook 파일 | `use` + camelCase | `useBottomNavAnimation.ts` |
| 글로벌 설정 파일 | camelCase | `tabConfig.ts`, `featureRegistry.ts` |

### 컴포넌트/변수
```tsx
// 컴포넌트: PascalCase
function TrendingCard() {}
const SearchBar = () => {};

// Props 타입: 컴포넌트명 + Props
type TrendingCardProps = { title: string; image: string; };

// 로컬 변수: camelCase
const isActive = true;
const cardItems = [...];

// 상수: UPPER_SNAKE_CASE
const NAV_ITEMS = [...];
const PRIMARY_COLOR = "#844d74";
```

### 텍스트 컴포넌트

- 일반 텍스트는 공통 위젯인 `AppText`를 기본으로 사용한다
- 브랜드 로고 텍스트만 `font-brand`를 사용한다
- 화면 파일에서 폰트 적용을 개별적으로 흩뿌리기보다 공통 텍스트 위젯에서 기본 폰트를 관리한다

---

## TypeScript 규칙

```tsx
// ✅ Props 인터페이스 명시적 정의
type CardProps = {
  title: string;
  image: string;
  category?: string;   // 선택값은 ?
  onPress: () => void;
};

// ❌ any 사용 금지
const data: any = ...;

// ✅ 불명확한 타입은 unknown + type narrowing
const data: unknown = ...;
if (typeof data === "string") { ... }

// ✅ 배열 타입
const items: string[] = [];        // 기본형
const cards: TrendingCardProps[];  // 객체형
```

---

## 스타일링 규칙

### NativeWind 우선
```tsx
// ✅ NativeWind className 사용
<View className="flex-1 bg-surface px-4 gap-4" />

// ❌ StyleSheet 사용 금지
const styles = StyleSheet.create({ container: { flex: 1 } });

// ✅ style prop 허용 케이스: 그라디언트, 동적 계산값
<View
  className="rounded-full"
  style={{ backgroundColor: `rgba(132,77,116,${opacity})` }}
/>
```

### 색상 토큰 사용
```tsx
// ✅ tailwind.config.js 토큰 사용
<Text className="text-primary" />
<View className="bg-surface-secondary" />

// ❌ 하드코딩 금지 (토큰에 있는 색상은)
<Text className="text-[#844d74]" />   // primary가 있으면 쓰지 말 것

// ✅ 투명도·그림자처럼 토큰화하기 어려운 경우만 하드코딩 허용
<View className="bg-[rgba(252,248,252,0.85)]" />
```

### 클래스 순서 (권장)
```
레이아웃 → 크기 → 배경 → 테두리 → 여백 → 텍스트 → 기타
flex flex-row items-center → w-full h-16 → bg-surface → rounded-full border → px-4 py-2 → text-sm → shadow-md
```

---

## 컴포넌트 작성 규칙

### 파일 분리 기준

팝업메이트는 "작동하는 긴 파일"보다 "책임이 분리된 짧은 파일"을 우선한다.

- 화면 파일은 화면 조립만 담당하고, 카드/섹션/UI 구현은 별도 파일로 뺀다
- 화면 파일이 150줄을 넘기기 시작하면 분리 후보로 본다
- 화면 내부 서브 컴포넌트가 3개 이상이면 `sections/`, `cards/`, `ui/`로 분리한다
- 같은 UI가 2개 이상 화면에서 반복되면 즉시 공통 컴포넌트로 올린다
- 애니메이션, `useEffect`, 타이머, 제스처가 들어가면 hook 또는 별도 파일로 분리한다
- mock data, 필터 목록, 탭 설정처럼 "화면이 아닌 설정"은 화면 파일 밖으로 뺀다

권장 책임 분리:

- `screens/`: 조립
- `components/sections/`: 섹션
- `components/cards/`: 반복 아이템
- `components/ui/`: 작은 공통 위젯
- `components/navigation/`: 하단 네비게이션 계열 UI
- `global/`: 전역 로직, 탭 설정, 애니메이션 hook, 앱 셸

이 규칙의 목적은 기능이 꼬이지 않게 하고, 파일 길이를 줄이고, 수정 영향 범위를 작게 유지하는 것이다.

### 서브 컴포넌트 위치
```tsx
// ✅ 화면 파일 내부 전용 서브 컴포넌트는 화면 위에 선언
function SectionHeader({ title }: { title: string }) {
  return <Text className="text-heading text-xl font-semibold">{title}</Text>;
}

export default function HomeScreen() {
  return <View><SectionHeader title="인기 팝업" /></View>;
}
```

다만 아래 조건이면 화면 내부 선언으로 두지 말고 별도 파일로 뺀다.

- 해당 서브 컴포넌트가 40줄 이상일 때
- props 타입이 따로 필요할 때
- 애니메이션, 상태, 리스트 렌더링을 가질 때
- 다른 화면에서도 재사용 가능성이 있을 때

### 리스트 렌더링
```tsx
// ✅ map + key (고유 ID 사용)
{items.map((item) => (
  <Card key={item.id} {...item} />
))}

// ❌ index를 key로 사용 금지 (순서 변경 가능한 리스트)
{items.map((item, index) => <Card key={index} />)}  // 금지
```

### 터치 컴포넌트
```tsx
// ✅ 기본: TouchableOpacity
<TouchableOpacity activeOpacity={0.85} onPress={handlePress}>

// ✅ 복잡한 피드백 필요 시: Pressable
<Pressable style={({ pressed }) => pressed && { opacity: 0.7 }}>
```

### 하단 네비게이션 규칙

하단 네비게이션은 애니메이션이 들어가는 전역 UI로 취급한다.

- `BottomNavBar`는 컨테이너 역할만 맡는다
- 탭 아이템은 `BottomNavItem`으로 분리한다
- indicator, slide, scale, hide/show는 `useBottomNavAnimation` 같은 hook으로 분리한다
- 탭 라벨/아이콘/순서는 `tabConfig.ts` 한 파일에서 관리한다
- 화면 파일은 네비게이션 애니메이션 세부 구현을 직접 가지지 않는다

### 글로벌 기능 규칙

- 2개 이상 화면에서 쓰는 상태/설정/동작은 `src/global/` 또는 `src/constants/`로 이동한다
- 글로벌 기능 추가 시 `docs/global-features.md`에 기능명, 범위, 파일 위치, 설명을 기록한다
- 전역 기능은 진입 파일(entry)을 하나 두고, 화면에서는 그 경로만 import 한다
- 화면에서 전역 탭 정의, 전역 필터 정의, 전역 모달 제어를 중복 선언하지 않는다

---

## 이미지 규칙

```tsx
// ✅ 항상 resizeMode 명시
<Image source={{ uri: imageUrl }} resizeMode="cover" />

// ✅ 로컬 이미지
<Image source={require("../../assets/images/banner.png")} resizeMode="contain" />

// ✅ 크기 명시 (Image는 크기가 없으면 렌더 안 됨)
<Image source={{ uri: url }} style={{ width: 64, height: 64 }} resizeMode="cover" />
```

---

## 주석 규칙

```tsx
// ─── 섹션 구분선 (파일 내 섹션 분리)  ────────────────────────
// 한 줄 설명 (자명하지 않은 로직만)
/* 여러 줄 주석은 사용 안 함 */

// TODO: 미구현 항목 표시
// FIXME: 버그/수정 필요 항목
```

---

## 금지 사항

| 금지 | 이유 |
|------|------|
| `StyleSheet.create()` | NativeWind 일관성 |
| `any` 타입 | 타입 안전성 |
| `console.log` (커밋 시) | 프로덕션 노이즈 |
| 하드코딩 컬러 (토큰 있는 경우) | 디자인 토큰 일관성 |
| index를 key로 사용 | 리스트 리렌더 버그 |
| `// @ts-ignore` | 타입 문제는 해결해야 함 |

---

## 커밋 메시지

```
feat: 홈 화면 트렌딩 섹션 추가
fix: 하단 네비바 safe area 여백 수정
style: 카드 모서리 반지름 디자인 토큰으로 변경
refactor: TrendingCard 재사용 컴포넌트 분리
chore: NativeWind v4 설정 추가
```
