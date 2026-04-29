# 팝업메이트 — Claude Code 총괄 가이드

## 프로젝트 개요

**팝업메이트**는 한국의 팝업 스토어를 발견·탐색·공유하는 모바일 앱이다.
피그마 파일: `C8fidVKmN9LrNnDkIVbLyu` (star_star_project)
테마: 파스텔 퍼플 / 라벤더 드림

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Expo (SDK 54) + React Native 0.81 |
| 언어 | TypeScript (strict) |
| 스타일링 | NativeWind v4 (Tailwind CSS) |
| 내비게이션 | (추후 Expo Router 도입 예정) |
| 상태관리 | (추후 결정) |
| 플랫폼 | iOS / Android / Web |

## 파일 구조

```
팝업메이트/
├── src/
│   ├── screens/        # 화면 단위 컴포넌트 (1파일 = 1화면)
│   ├── components/     # 재사용 컴포넌트
│   └── constants/      # 색상, 폰트, 스페이싱 상수
├── docs/
│   ├── design-system.md   # 색상·타이포·스페이싱 토큰
│   ├── architecture.md    # 파일 구조·패턴 상세
│   ├── conventions.md     # 코딩 컨벤션
│   └── screens.md         # 화면 목록 & 피그마 Node ID
├── assets/
├── App.tsx             # 진입점 (SafeAreaProvider + 화면)
├── global.css          # Tailwind 진입점
├── tailwind.config.js  # 디자인 토큰 정의
├── metro.config.js     # withNativeWind 설정
└── babel.config.js     # NativeWind 바벨 설정
```

## 핵심 규칙 (반드시 준수)

### 스타일링
- **모든 스타일은 NativeWind className으로** — StyleSheet 사용 금지
- 색상은 반드시 `tailwind.config.js`의 토큰 사용 (`text-primary`, `bg-surface` 등)
- 픽셀 고정값이 필요할 땐 `className="w-[64px]"` 형식 허용
- `style={{}}` prop은 그라디언트·그림자처럼 NativeWind가 지원 안 되는 경우만 허용

### 컴포넌트
- 화면 컴포넌트는 `src/screens/` — 이름은 `XxxScreen.tsx`
- 재사용 컴포넌트는 `src/components/` — 이름은 `XxxCard.tsx`, `XxxButton.tsx` 등
- 화면 안 서브 컴포넌트는 같은 파일에 위에 선언, 화면 컴포넌트가 파일 맨 아래 `export default`
- `any` 타입 사용 금지 — Props 인터페이스 반드시 정의

### 이미지
- 피그마 에셋 URL은 임시 (7일 만료) — 실제 에셋은 `assets/` 또는 CDN으로 교체 예정
- `Image` 컴포넌트에 항상 `resizeMode` 명시

### 네이티브 차이
- `div` → `View`, `p`/`span` → `Text`, `img` → `Image`
- `ScrollView`에 horizontal 스크롤 시 `showsHorizontalScrollIndicator={false}` 기본 적용
- 터치는 `TouchableOpacity` (activeOpacity={0.85}) 사용

## 현재 구현 상태

| 화면 | 상태 | 피그마 Node |
|------|------|-------------|
| 홈 (메인) | ✅ 완료 | 179:8 |
| 지도 메인 | ⬜ 미구현 | 179:169 |
| 커뮤니티 | ⬜ 미구현 | 179:281 |
| 리뷰 & 별점 | ⬜ 미구현 | 179:601 |
| 팝업 파트너 | ⬜ 미구현 | 181:756 |
| 리뷰 아카이브 | ⬜ 미구현 | 182:1122 |
| 커뮤니티 메인 | ⬜ 미구현 | 182:1276 |

## 참고 문서

- [디자인 시스템](./docs/design-system.md)
- [아키텍처](./docs/architecture.md)
- [코딩 컨벤션](./docs/conventions.md)
- [화면 목록](./docs/screens.md)
